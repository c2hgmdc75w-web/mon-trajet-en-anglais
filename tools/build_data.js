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

function build(code, levels) {
  const PFIX = readJson('phrase_fix', code), FIX = readJson('tips_fix', code), SAY = readJson('tips_say', code);
  const used = { PFIX: new Set(), FIX: new Set(), SAY: new Set() };
  let phrases = 0, tips = 0, says = 0;
  levels.forEach((lv, a) => lv.modules.forEach((m, b) => m.lessons.forEach((l, c) => {
    if (!l || !l.phrases) return;
    const id = `${a}-${b}-${c}`;
    const lf = PFIX[id]; if (lf) { used.PFIX.add(id); if (lf.title) l.title = lf.title; }
    l.phrases.forEach((p, i) => {
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
  for (const [name, obj] of [['phrase_fix', PFIX], ['tips_fix', FIX], ['tips_say', SAY]]) {
    const set = used[name === 'phrase_fix' ? 'PFIX' : name === 'tips_fix' ? 'FIX' : 'SAY'];
    const orphan = Object.keys(obj).filter(k => !set.has(k) && !(name === 'tips_say' && !Object.keys(obj[k]).length));
    if (orphan.length) throw new Error(`${code} : ${name} contient des clés qui ne correspondent à rien : ${orphan.slice(0, 8).join(', ')}`);
  }
  const js = `/* Mon Trajet — contenu « ${code} » (${phrases} phrases, ${tips} points de grammaire). Fichier généré par tools/build_data.js, ne pas éditer à la main. */\nwindow.MT_DATA = window.MT_DATA || {};\nwindow.MT_DATA['${code}'] = ${JSON.stringify(levels)};\n`;
  const file = path.join(OUT, code + '.js');
  const before = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (before !== js) fs.writeFileSync(file, js);
  console.log(code.padEnd(5), phrases, 'phrases', tips, 'tips', says, 'mots natifs', Math.round(js.length / 1024) + ' Ko', before === js ? '(inchangé)' : before === null ? '(créé)' : '(MODIFIÉ)');
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
