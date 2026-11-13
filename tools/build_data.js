// (Re)construit www/data/<code>.js.
//
// SOURCE DE VÉRITÉ : le fichier déjà construit www/data/<code>.js lui-même
// (il contient tout : phrases, points de grammaire). Les dossiers de travail
// d'origine (<code>_content, anciens dépôts) ne sont plus nécessaires : ils
// disparaissent d'une session à l'autre.
//
// Sur ce contenu, on applique des surcouches (toutes rejouables sans effet de
// bord : relancer le script ne change rien si rien n'a changé) :
//   tools/phrase_fix/<code>.json  { "<niv>-<mod>-<leçon>#<phrase>": { fr?, tgt?, ro?, lit? },
//                                   "<niv>-<mod>-<leçon>": { title? } }      corrections de phrases / titres
//   tools/tips_fix/<code>.json    { "<niv>-<mod>-<leçon>": { title?, body?, example?, exampleRo?, lit? } }
//   tools/tips_say/<code>.json    { "<niv>-<mod>-<leçon>": { "<passage entre « »>": "<texte lu par la voix native>" } }
//   tools/extra/<code>.json       { vocab: { "<niv>-<mod>-<leçon>": [ {fr, tgt, ro?}, … ] },        mots de vocabulaire (évaluations mixtes)
//                                   series: { "<niv>-<mod>-<leçon>": { title, intro, chunks: [[{fr, tgt, ro?}, …], …] } },   séries fermées
//                                   notes: { "<niv>-<mod>-<leçon>": [ { lit, note, say }, … une par phrase ] },   mot à mot parlé + explication par phrase
//                                   words: { "<niv>-<mod>-<leçon>#<phrase>": [ "mot cible 1", … ] } }   découpe à la main quand l'alignement automatique sur le mot à mot échoue
//
// Usage :
//   node tools/build_data.js                 toutes les langues
//   node tools/build_data.js zh he           seulement ces langues
//   node tools/build_data.js --import <code> <chemin/data.js> [clé]
//        importe une NOUVELLE langue depuis un data.js classique (LEVELS, phrases {fr, <clé>, ro?, lit?})
//
// Format commun d'une phrase : { fr, tgt, ro?, lit? } ; module : id/name/desc/
// totalPhrases/lessonsCount/lessons ; leçon : title, phrases,
// tip? { title, example, body, exampleRo?, lit?, say? }.
const fs = require('fs'), vm = require('vm'), path = require('path');
const OUT = path.join(__dirname, '..', 'www', 'data');
const readJson = (dir, code) => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, dir, code + '.json'), 'utf8')); } catch (e) { if (e.code === 'ENOENT') return {}; throw new Error(`${dir}/${code}.json illisible : ${e.message}`); } };

function loadBuilt(code) {
  const window = {};
  new Function('window', fs.readFileSync(path.join(OUT, code + '.js'), 'utf8'))(window);
  if (!window.MT_DATA || !window.MT_DATA[code]) throw new Error(code + ' : www/data/' + code + '.js ne définit pas MT_DATA');
  return window.MT_DATA[code];
}
function importClassic(code, file, key) {
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8') + ';globalThis.__L = LEVELS;', ctx);
  return ctx.__L.map(lv => ({
    id: lv.id, name: lv.name, freeLessonsPerModule: lv.freeLessonsPerModule,
    modules: lv.modules.map(m => ({
      id: m.id, name: m.name, desc: m.desc, totalPhrases: m.totalPhrases, lessonsCount: m.lessonsCount,
      lessons: m.lessons.map(l => {
        if (!l || !l.phrases) return l;
        const lesson = { title: l.title, phrases: l.phrases.map(p => {
          const q = { fr: p.fr, tgt: p[key] };
          if (!q.tgt) throw new Error(code + ' : phrase sans cible : ' + p.fr);
          if (p.ro) q.ro = p.ro; if (p.lit) q.lit = p.lit; return q;
        }) };
        if (l.tip) { lesson.tip = { title: l.tip.title, example: l.tip.example, body: l.tip.body };
          if (l.tip.exampleRo) lesson.tip.exampleRo = l.tip.exampleRo; if (l.tip.lit) lesson.tip.lit = l.tip.lit; }
        return lesson;
      })
    }))
  }));
}

// Leçons expliquées : découpe la phrase cible mot par mot, alignée sur le mot à mot
// français (note.lit, mots séparés par des virgules). Chinois : on suit les mots du
// pinyin (ro) ; si le mot à mot est plus fin (ex. « zhège » = ce + petit mot de
// comptage), on coupe les mots du pinyin caractère par caractère quand c'est sans
// ambiguïté, sinon il faut une découpe à la main dans extra.words.
const VOW = /[aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/gi;
function alignWords(code, pid, p, litText, manual) {
  const fr = litText.replace(/\s*[?!.…]+\s*$/, '').split(/,\s+|[?!]\s+/).map(x => x.trim()).filter(Boolean);
  let tg;
  if (manual) tg = manual.slice();
  else if (!/\p{Script=Han}/u.test(p.tgt)) tg = p.tgt.replace(/[.,!?;:…¿¡«»"()]/g, ' ').split(/\s+/).filter(Boolean);
  else {
    const han = [...p.tgt].filter(ch => /[\p{Script=Han}A-Za-z0-9]/u.test(ch));
    const toks = (p.ro || '').replace(/[.,!?;:…，。？！“”"()]/g, ' ').split(/\s+/).filter(Boolean);
    const syl = toks.map(t => t.split("'").reduce((n, x) => n + ((x.match(VOW) || []).length), 0));
    // « r » final du pékinois (儿) : un caractère de plus sans voyelle en pinyin.
    let pos = 0;
    toks.forEach((t, i) => { pos += syl[i]; if (/[^e]r$|[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]er$/i.test(t) && han[pos] === '儿' && syl[i] > 0 && !(syl[i] === 1 && /^[eēéěè]r$/i.test(t))) { syl[i]++; pos++; } });
    if (syl.reduce((a, b) => a + b, 0) !== han.length) throw new Error(`${code} ${pid} : pinyin et caractères ne correspondent pas (${p.ro} / ${p.tgt}) : ajouter une découpe dans extra.words`);
    pos = 0; const groups = syl.map(n => { const g = han.slice(pos, pos + n).join(''); pos += n; return g; });
    if (groups.length === fr.length) tg = groups;
    else if (han.length === fr.length) tg = han;
    else {
      // couper entièrement certains mots de plusieurs caractères : solution unique seulement
      const multi = groups.map((g, i) => [...g].length > 1 ? i : -1).filter(i => i >= 0);
      const need = fr.length - groups.length, sols = [];
      for (let mask = 1; mask < (1 << multi.length) && need > 0; mask++) {
        let gain = 0; multi.forEach((gi, b) => { if (mask >> b & 1) gain += [...groups[gi]].length - 1; });
        if (gain === need) sols.push(mask);
      }
      if (sols.length !== 1) throw new Error(`${code} ${pid} : mot à mot (${fr.length} mots : ${fr.join(' | ')}) impossible à aligner sur « ${groups.join(' ')} » : ajouter une découpe dans extra.words`);
      tg = []; groups.forEach((g, i) => { const b = multi.indexOf(i); if (b >= 0 && (sols[0] >> b & 1)) tg.push(...g); else tg.push(g); });
    }
  }
  if (tg.length !== fr.length) throw new Error(`${code} ${pid} : ${fr.length} mots français pour ${tg.length} mots cibles (${fr.join(' | ')} / ${tg.join(' | ')})`);
  if (/\p{Script=Han}/u.test(p.tgt) && tg.join('') !== [...p.tgt].filter(ch => /[\p{Script=Han}A-Za-z0-9]/u.test(ch)).join('')) throw new Error(`${code} ${pid} : la découpe « ${tg.join(' ')} » ne redonne pas la phrase ${p.tgt}`);
  return fr.map((f, i) => [f, tg[i]]);
}

function build(code, levels) {
  const PFIX = readJson('phrase_fix', code), FIX = readJson('tips_fix', code), SAY = readJson('tips_say', code);
  const EXTRA = readJson('extra', code), VOC = EXTRA.vocab || {}, SER = EXTRA.series || {}, NOTES = EXTRA.notes || {}, WORDS = EXTRA.words || {};
  const used = { PFIX: new Set(), FIX: new Set(), SAY: new Set(), VOC: new Set(), SER: new Set(), NOTES: new Set(), WORDS: new Set() };
  let vocabN = 0, seriesN = 0; const alignErr = [];
  let phrases = 0, tips = 0, says = 0;
  levels.forEach((lv, a) => lv.modules.forEach((m, b) => m.lessons.forEach((l, c) => {
    if (!l || !l.phrases) return;
    const id = `${a}-${b}-${c}`;
    const lf = PFIX[id]; if (lf) { used.PFIX.add(id); if (lf.title) l.title = lf.title; }
    if (VOC[id]) { used.VOC.add(id); l.vocab = VOC[id]; vocabN += VOC[id].length; } else delete l.vocab;
    if (SER[id]) { used.SER.add(id); l.series = SER[id]; seriesN++; } else delete l.series;
    const nt = NOTES[id];
    if (nt) { used.NOTES.add(id); if (nt.length !== l.phrases.length) throw new Error(`${code} ${id} : ${nt.length} notes pour ${l.phrases.length} phrases`); }
    l.phrases.forEach((p, i) => {
      if (nt) { p.note = { lit: nt[i].lit, text: nt[i].note, say: nt[i].say || {} }; try { p.note.words = alignWords(code, `${id}#${i}`, p, nt[i].lit, WORDS[`${id}#${i}`]); } catch (e) { alignErr.push(e.message); } if (WORDS[`${id}#${i}`]) used.WORDS.add(`${id}#${i}`); } else delete p.note;
      phrases++;
      const pf = PFIX[`${id}#${i}`]; if (!pf) return; used.PFIX.add(`${id}#${i}`);
      for (const k of ['fr', 'tgt', 'ro', 'lit']) if (k in pf) { if (pf[k] === null || pf[k] === '') delete p[k]; else p[k] = pf[k]; }
    });
    if (!l.tip) return;
    tips++;
    const fx = FIX[id];
    if (fx) { used.FIX.add(id); for (const k of ['title', 'body', 'example', 'exampleRo', 'lit']) if (fx[k]) l.tip[k] = fx[k]; }
    const sy = SAY[id];
    if (sy && Object.keys(sy).length) { used.SAY.add(id); l.tip.say = sy; says += Object.keys(sy).length; } else delete l.tip.say;
  })));
  if (alignErr.length) throw new Error(alignErr.length + ' phrase(s) à découper à la main :\n' + alignErr.join('\n'));
  for (const [name, obj] of [['phrase_fix', PFIX], ['tips_fix', FIX], ['tips_say', SAY]]) {
    const set = used[name === 'phrase_fix' ? 'PFIX' : name === 'tips_fix' ? 'FIX' : 'SAY'];
    const orphan = Object.keys(obj).filter(k => !set.has(k) && !(name === 'tips_say' && !Object.keys(obj[k]).length));
    if (orphan.length) throw new Error(`${code} : ${name} contient des clés qui ne correspondent à rien : ${orphan.slice(0, 8).join(', ')}`);
  }
  for (const [name, obj, set] of [['extra.vocab', VOC, used.VOC], ['extra.series', SER, used.SER], ['extra.notes', NOTES, used.NOTES], ['extra.words', WORDS, used.WORDS]]) {
    const orphan = Object.keys(obj).filter(k => !set.has(k));
    if (orphan.length) throw new Error(`${code} : ${name} contient des clés qui ne correspondent à rien : ${orphan.slice(0, 8).join(', ')}`);
  }
  const js = `/* Mon Trajet — contenu « ${code} » (${phrases} phrases, ${tips} points de grammaire). Fichier généré par tools/build_data.js, ne pas éditer à la main. */\nwindow.MT_DATA = window.MT_DATA || {};\nwindow.MT_DATA['${code}'] = ${JSON.stringify(levels)};\n`;
  const file = path.join(OUT, code + '.js');
  const before = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (before !== js) fs.writeFileSync(file, js);
  console.log(code.padEnd(5), phrases, 'phrases', tips, 'tips', says, 'mots natifs', ...(vocabN || seriesN ? [vocabN, 'mots de vocabulaire', seriesN, 'séries'] : []), Math.round(js.length / 1024) + ' Ko', before === js ? '(inchangé)' : before === null ? '(créé)' : '(MODIFIÉ)');
}

const args = process.argv.slice(2);
if (args[0] === '--import') {
  const [, code, file, key] = args;
  if (!code || !file) { console.error('Usage : node tools/build_data.js --import <code> <chemin/data.js> [clé]'); process.exit(1); }
  build(code, importClassic(code, file, key || code));
} else {
  const all = fs.readdirSync(OUT).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, '')).sort();
  const codes = args.length ? args : all;
  for (const code of codes) {
    if (!all.includes(code)) { console.error(code + ' : www/data/' + code + '.js introuvable (nouvelle langue : utiliser --import)'); process.exit(1); }
    build(code, loadBuilt(code));
  }
}
