// node zh_m1_check_script.js <numéro de leçon>   → vérifie zh_script_0-0-<n-1>.md contre le plan
const fs = require('fs'), path = require('path');
const plan = require('./zh_m1_plan.js');
const n = parseInt(process.argv[2]); const L = plan.find(x => x.n === n);
const file = path.join(__dirname, `zh_script_0-0-${n - 1}.md`);
if (!L) { console.log('leçon inconnue'); process.exit(1); }
if (!fs.existsSync(file)) { console.log('fichier absent : ' + file); process.exit(1); }
const err = [], warn = [];
const hanOf = t => [...t].filter(c => /\p{Script=Han}/u.test(c)).join('');
const steps = []; let lineNo = 0;
for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
  lineNo++; let m;
  if ((m = line.match(/^##\s+(?:\d+\.\s*)?(.+?)\s+—\s+≈?.*$/))) steps.push(['sec', m[1].trim(), lineNo]);
  else if ((m = line.match(/^- \*\*FR\*\* — (.+)$/))) steps.push(['f', m[1].trim(), lineNo]);
  else if ((m = line.match(/^- \*\*中文\*\* — (.+?)\s+\*\((.+)\)\*\s*$/))) steps.push(['z', m[1].trim(), lineNo, m[2].trim()]);
  else if ((m = line.match(/^- \*\(silence ([\d,\.]+) s\)\*\s*$/))) steps.push(['w', Math.round(parseFloat(m[1].replace(',', '.')) * 1000), lineNo]);
  else if (/^- /.test(line)) err.push(`ligne ${lineNo} : format non reconnu → ${line.slice(0, 70)}`);
  else if (/^## /.test(line)) err.push(`ligne ${lineNo} : titre de partie sans durée (« ## 3. Titre — ≈ 1 min 30 s »)`);
}
const secs = steps.filter(s => s[0] === 'sec').map(s => s[1]);
const need = n >= 2 ? [/^Titre/i, /^Rappel/i, /^Oreille/i, /^On mélange/i, /^Petite conversation/i, /^Test/i, /^Clôture/i] : [];
let pos = -1;
for (const re of need) { const i = secs.findIndex((t, k) => k > pos && re.test(t)); if (i < 0) err.push(`partie manquante ou mal placée : ${re} (ordre : Titre…, Rappel, Oreille, les nouveautés, On mélange, Petite conversation, Test, Clôture)`); else pos = i; }
// vocabulaire autorisé
const known = new Set(); plan.filter(x => x.n <= n).forEach(x => x.elements.forEach(e => [...hanOf(e[1])].forEach(c => known.add(c))));
const zs = steps.filter(s => s[0] === 'z');
for (const z of zs) {
  const bad = [...hanOf(z[1])].filter(c => !known.has(c));
  if (bad.length) err.push(`ligne ${z[2]} : « ${z[1]} » contient des caractères pas encore appris (${[...new Set(bad)].join('')})`);
  if (!hanOf(z[1])) err.push(`ligne ${z[2]} : ligne 中文 sans caractère chinois`);
  if (/[A-Za-zÀ-ÿ]/.test(z[1])) err.push(`ligne ${z[2]} : pas de lettres latines dans la partie chinoise`);
}
// pinyin des phrases de référence et des éléments
const pyOf = new Map(); plan.filter(x => x.n <= n).forEach(x => { x.phrases.forEach(p => pyOf.set(hanOf(p[1]), p[2])); x.elements.forEach(e => { if (!pyOf.has(hanOf(e[1]))) pyOf.set(hanOf(e[1]), e[2]); }); });
const normPy = t => t.toLowerCase().replace(/[.,!?;:…\s]/g, '');
for (const z of zs) { const ref = pyOf.get(hanOf(z[1])); if (ref && normPy(ref) !== normPy(z[3])) err.push(`ligne ${z[2]} : pinyin de « ${z[1]} » = ${z[3]}, attendu ${ref}`); }
// phrases de référence et éléments nouveaux
const zset = zs.map(z => hanOf(z[1]));
for (const p of L.phrases) if (!zset.includes(hanOf(p[1]))) err.push(`phrase de référence absente : ${p[0]} — ${p[1]}`);
for (const e of L.elements) { const k = zset.filter(t => t.includes(hanOf(e[1]))).length; if (k < 5) err.push(`élément nouveau « ${e[1]} » (${e[0]}) dit seulement ${k} fois (minimum 5)`); }
// rappels des leçons précédentes
const inSec = re => { const out = []; let on = false; for (const s of steps) { if (s[0] === 'sec') on = re.test(s[1]); else if (on) out.push(s); } return out; };
if (n >= 2) {
  const rz = inSec(/^Rappel/i).filter(s => s[0] === 'z').map(s => hanOf(s[1]));
  const from = k => { const P = plan.find(x => x.n === k); return P ? rz.filter(t => P.phrases.some(p => hanOf(p[1]) === t)).length : -1; };
  if (from(n - 1) < 3) err.push(`Rappel : au moins 3 phrases de référence de la leçon ${n - 1} (trouvé ${from(n - 1)})`);
  if (n - 3 >= 1 && from(n - 3) < 1) err.push(`Rappel : au moins 1 phrase de référence de la leçon ${n - 3}`);
  if (n - 7 >= 1 && from(n - 7) < 1) err.push(`Rappel : au moins 1 phrase de référence de la leçon ${n - 7}`);
  const test = inSec(/^Test/i); const groups = test.filter((s, i) => s[0] === 'f' && test[i + 1] && test[i + 1][0] === 'w' && test[i + 2] && test[i + 2][0] === 'z').length;
  if (groups < 6) err.push(`Test : au moins 6 groupes « FR / silence / 中文 » (trouvé ${groups})`);
  const tz = test.filter(s => s[0] === 'z').map(s => hanOf(s[1]));
  const old = tz.filter(t => plan.some(x => x.n < n && x.phrases.some(p => hanOf(p[1]) === t))).length;
  if (old < 2) err.push(`Test : au moins 2 phrases de leçons précédentes (trouvé ${old})`);
  const conv = inSec(/^Petite conversation/i).filter(s => s[0] === 'z').length; if (conv < 8) err.push(`Petite conversation : 4 à 6 répliques, dites deux fois (trouvé ${conv} lignes chinoises)`);
  const mix = inSec(/^On mélange/i); const mg = mix.filter((s, i) => s[0] === 'f' && mix[i + 1] && mix[i + 1][0] === 'w' && mix[i + 2] && mix[i + 2][0] === 'z').length; if (mg < 5) err.push(`On mélange : au moins 5 groupes « FR / silence / 中文 » (trouvé ${mg})`);
}
// français
for (const f of steps.filter(s => s[0] === 'f')) {
  if (/\p{Script=Han}/u.test(f[1])) err.push(`ligne ${f[2]} : caractères chinois dans une ligne FR`);
  if (/[\[\]()\/=*_]/.test(f[1])) err.push(`ligne ${f[2]} : pas de crochets, parenthèses ou symboles dans le français (lu à voix haute)`);
  if (f[1].length > 190) err.push(`ligne ${f[2]} : phrase française trop longue (${f[1].length} caractères) : la couper en deux lignes`);
  if (/\b(jeu|elleu|mo ta mo|tu va|tu a)\b/.test(f[1])) err.push(`ligne ${f[2]} : écrire le français normalement (je, elle, mot à mot, tu vas) : l'appli corrige la prononciation toute seule`);
}
// silences après une consigne de production
steps.forEach((s, i) => { if (s[0] === 'w' && (s[1] < 1500 || s[1] > 6000)) err.push(`ligne ${s[2]} : silence de ${s[1] / 1000} s (entre 1,5 et 6 s)`); });
// durée
let ms = 0; steps.forEach((s, i) => { if (s[0] === 'f') ms += 350 + s[1].length / 15 * 1000 + 350; else if (s[0] === 'z') ms += 300 + [...hanOf(s[1])].length * 330 / 0.85 + 350; else if (s[0] === 'w') ms += s[1]; });
const min = ms / 60000; if (min < 10.5 || min > 16.5) err.push(`durée estimée ${min.toFixed(1)} min (attendu : entre 11 et 16 min)`);
const remarks = steps.filter((s, i) => s[0] === 'f' && s[1].length > 45 && !/^(À toi|Leçon|Écoute|Encore|Le test|Bravo|Demain|Aujourd'hui)/.test(s[1])).length;
if (err.length) { console.log(`${err.length} ERREUR(S) leçon ${n}\n` + err.slice(0, 50).join('\n')); process.exit(1); }
console.log(`OK leçon ${n} : ${secs.length} parties, ${zs.length} lignes chinoises, ${steps.filter(s => s[0] === 'w').length} silences, durée estimée ${min.toFixed(1)} min`);
