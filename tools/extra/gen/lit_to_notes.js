// Mot à mot dit à voix haute pour les langues qui n'avaient qu'un mot à mot affiché
// (indonésien, polonais, turc, vietnamien) : transforme le champ `lit` des phrases du
// niveau 1 (« je · travailler · à · Jakarta ») en paires [français dit, mot cible] et les
// écrit dans tools/extra/<code>.json (clé notes, explication vide).
//
// 1. Le français : les étiquettes de grammaire entre crochets sont dites en clair
//    (« [question] » → « petit mot de question ») ou retirées quand elles sont collées
//    à un mot (« voisin [instrumental] » → « voisin »).
// 2. La cible : les mots de la phrase sont regroupés pour donner autant de morceaux que
//    de mots français. Quand les nombres diffèrent (vietnamien : un mot = souvent deux
//    syllabes), un aligneur choisit le découpage le plus cohérent avec les autres phrases.
//    Ce qui reste ambigu est donné à la main dans lit_words_manual.json.
//
// Usage (depuis la racine du dépôt) :
//   node tools/extra/gen/lit_to_notes.js            id pl tr vi
//   node tools/extra/gen/lit_to_notes.js vi         une seule langue
// puis : node tools/build_data.js id pl tr vi
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const MANUAL = JSON.parse(fs.readFileSync(path.join(__dirname, 'lit_words_manual.json'), 'utf8'));

function loadBuilt(code) {
  const window = {};
  new Function('window', fs.readFileSync(path.join(ROOT, 'www', 'data', code + '.js'), 'utf8'))(window);
  return window.MT_DATA[code];
}

// Étiquette seule (le mot cible n'a pas d'équivalent français) → ce que dit la voix.
const TAG_ALONE = {
  'question': 'petit mot de question', 'question : déjà ?': 'petit mot de question',
  'question : pas encore ?': 'petit mot de question', "question : n'est-ce pas": "n'est-ce pas",
  'question surprise': 'petit mot de surprise', 'question : surprise': 'petit mot de surprise',
  'classificateur': 'petit mot de comptage', 'politesse': 'petit mot de politesse',
  'accompli': 'petit mot du passé', 'déjà vécu': 'petit mot du passé', 'expérience': 'petit mot du passé',
  'futur': 'petit mot du futur', 'en cours': "petit mot de l'action en cours",
  'négation': 'pas', 'ne… pas': 'pas', 'pluriel': 'petit mot du pluriel',
  'onze à dix-neuf': 'petit mot des nombres de onze à dix-neuf',
  'adoucissant': 'petit mot pour adoucir', 'incitation': 'petit mot pour encourager',
  'insistance': "petit mot d'insistance", 'affirmatif': "petit mot d'affirmation", 'affirmation': "petit mot d'affirmation",
  'particule': 'petit mot', 'proposition': 'petit mot de proposition', 'est-ce': 'est-ce que',
  "d'accord ?": "d'accord", 'oui poli': 'oui',
};
// Étiquette collée à un mot : la plupart sont des indications de grammaire, retirées.
const TAG_ATTACHED = { 'question': 'est-ce que', 'ne… pas': 'pas', 'son': 'son', 'sa': 'sa', 'ses': 'ses', 'politesse': '', 'classificateur': '' };

function spokenFr(tok, tgt) {
  tok = tok.trim().replace(/[«»"]/g, '').replace(/\s*n°/g, ' numéro').replace(/\s+/g, ' ').trim();
  // parenthèse : retirée si elle redonne le mot cible (« crêpe (bánh khoái) ») ou si elle
  // ne fait que préciser l'emploi (« ne pas (ordre) ») ; sinon dite après une virgule
  // (« grand frère (vous) » → « grand frère, vous »).
  tok = tok.replace(/\s*\(([^)]*)\)/g, (all, inner) =>
    (norm(tgt).includes(norm(inner.trim())) || /^ordre$/i.test(inner.trim())) ? '' : ', ' + inner.trim());
  const alone = tok.match(/^\[([^\]]+)\]$/);
  if (alone) { const t = alone[1].trim(); return TAG_ALONE[t] !== undefined ? TAG_ALONE[t] : t.replace(/\s*\?$/, ''); }
  // « [question]-vous », « aimer-[présent]-je », « voisin [instrumental] », « café[acc.] »
  const parts = tok.split(/(\[[^\]]*\])/).filter(x => x !== '');
  const out = [];
  for (let p of parts) {
    const m = p.match(/^\[([^\]]+)\]$/);
    if (m) { const r = TAG_ATTACHED[m[1].trim()]; if (r) out.push(r); continue; }
    p = p.replace(/^-+|-+$/g, '').trim();
    if (p) out.push(p);
  }
  // l'ordre est celui du mot cible (« enfant-[son] ») : on le garde
  return out.join(' ').replace(/\s+/g, ' ').trim();
}

const norm = t => t.normalize('NFC').toLowerCase();
const tgtWords = t => t.replace(/[.,!?;:…¿¡«»"()“”]/g, ' ').split(/\s+/).filter(Boolean);

// Tous les découpages de n mots en k morceaux contigus.
function* compositions(n, k, start = 0) {
  if (k === 1) { yield [n - start]; return; }
  for (let len = 1; len <= n - start - (k - 1); len++) for (const rest of compositions(n, k - 1, start + len)) yield [len, ...rest];
}

function run(code) {
  const L = loadBuilt(code);
  const manual = MANUAL[code] || {};
  const items = [];
  L[0].modules.forEach((m, b) => m.lessons.forEach((l, c) => l.phrases.forEach((p, i) => {
    if (!p.lit) throw new Error(`${code} 0-${b}-${c}#${i} : pas de mot à mot`);
    const fr = p.lit.split(/\s*·\s*/).map(t => spokenFr(t, p.tgt));
    if (fr.some(f => !f)) throw new Error(`${code} 0-${b}-${c}#${i} : mot français vide (${p.lit})`);
    items.push({ id: `0-${b}-${c}`, i, p, fr, tg: tgtWords(p.tgt), words: null });
  })));
  // dictionnaire français → morceaux cibles, appris sur les phrases déjà alignées
  const dict = new Map(), known = new Set();
  const learn = w => w.forEach(([f, t]) => { const k = norm(f); if (!dict.has(k)) dict.set(k, new Map()); const d = dict.get(k); d.set(norm(t), (d.get(norm(t)) || 0) + 1); known.add(norm(t)); });
  for (const it of items) {
    const key = `${it.id}#${it.i}`;
    if (manual[key]) {
      const tg = manual[key];
      if (tg.length !== it.fr.length) throw new Error(`${code} ${key} : découpe à la main de ${tg.length} morceaux pour ${it.fr.length} mots français`);
      it.words = it.fr.map((f, j) => [f, tg[j]]); learn(it.words);
    } else if (it.fr.length === it.tg.length) { it.words = it.fr.map((f, j) => [f, it.tg[j]]); learn(it.words); }
  }
  // phrases restantes : on choisit le découpage le mieux noté, tant que ça progresse
  const score = (it, comp) => {
    let s = 0, pos = 0;
    comp.forEach((len, j) => {
      const g = it.tg.slice(pos, pos + len), gt = norm(g.join(' ')); pos += len;
      const d = dict.get(norm(it.fr[j]));
      if (d && d.has(gt)) s += 10 + d.get(gt);
      else if (known.has(gt)) s += 3;
      if (len > 1) {
        // nom propre : tous les mots commencent par une majuscule, comme le mot français
        if (g.every(w => /^\p{Lu}/u.test(w)) && /^\p{Lu}/u.test(it.fr[j])) s += 6;
        else if (!known.has(gt)) s -= 2 * (len - 1);
      }
    });
    return s;
  };
  let progress = true;
  while (progress) {
    progress = false;
    for (const it of items) {
      if (it.words || it.fr.length > it.tg.length) continue;
      let best = -Infinity, bestC = [], n = 0;
      for (const comp of compositions(it.tg.length, it.fr.length)) {
        if (++n > 200000) break;
        const s = score(it, comp);
        if (s > best) { best = s; bestC = [comp]; } else if (s === best) bestC.push(comp);
      }
      if (bestC.length !== 1) continue;
      let pos = 0;
      it.words = bestC[0].map((len, j) => { const g = it.tg.slice(pos, pos + len).join(' '); pos += len; return [it.fr[j], g]; });
      learn(it.words); progress = true;
    }
  }
  const left = items.filter(it => !it.words);
  const orphan = Object.keys(manual).filter(k => !items.some(it => `${it.id}#${it.i}` === k));
  if (orphan.length) throw new Error(`${code} : lit_words_manual.json contient des clés inconnues : ${orphan.join(', ')}`);
  if (left.length) {
    console.log(`${code} : ${left.length} phrase(s) à découper à la main dans lit_words_manual.json :`);
    left.forEach(it => console.log(`  "${it.id}#${it.i}": ${JSON.stringify(it.fr)}  ←  ${it.p.tgt}`));
    return false;
  }
  // écriture : tools/extra/<code>.json, clé notes (les autres clés, comme tipsReplace, sont gardées)
  const file = path.join(ROOT, 'tools', 'extra', code + '.json');
  const extra = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const notes = {};
  items.forEach(it => { (notes[it.id] = notes[it.id] || [])[it.i] = { words: it.words, note: '' }; });
  extra.notes = notes;
  fs.writeFileSync(file, JSON.stringify(extra, null, 1) + '\n');
  console.log(`${code} : ${items.length} phrases, mot à mot écrit dans tools/extra/${code}.json`);
  return true;
}

const codes = process.argv.slice(2).length ? process.argv.slice(2) : ['id', 'pl', 'tr', 'vi'];
let ok = true;
for (const c of codes) ok = run(c) && ok;
process.exit(ok ? 0 : 1);
