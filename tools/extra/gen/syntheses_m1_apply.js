// Groupes C à F (langues éloignées) : dans le module 1 du niveau 1, les 20 points de grammaire
// (un après chaque leçon) sont remplacés par 4 synthèses, après les leçons 5, 10, 15 et 20,
// comme pour le chinois. Les explications restent dans les leçons (mot à mot et remarques).
//
// Source : tools/extra/gen/syntheses_m1.json
//   { "<code>": { "0-0-4": { title, body, example, exampleRo?, lit?, say: { "<passage entre « »>": "<voix native>" } }, … } }
// Écrit :
//   tools/extra/<code>.json    tipsReplace : null pour les leçons sans synthèse, la synthèse sinon
//   tools/tips_say/<code>.json say des 4 synthèses ; les anciennes entrées 0-0-* sont retirées
//   tools/tips_fix/<code>.json anciennes corrections 0-0-* retirées (les points de grammaire n'existent plus)
//
// Usage (depuis la racine du dépôt) :
//   node tools/extra/gen/syntheses_m1_apply.js && node tools/build_data.js
const fs = require('fs'), path = require('path');
const TOOLS = path.join(__dirname, '..', '..');
const SRC = JSON.parse(fs.readFileSync(path.join(__dirname, 'syntheses_m1.json'), 'utf8'));
const read = f => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
// garde la présentation du fichier : une ligne par leçon si c'était déjà le cas
const write = (f, o) => {
  const compact = fs.existsSync(f) && /^\{\n"/.test(fs.readFileSync(f, 'utf8'));
  fs.writeFileSync(f, compact
    ? '{\n' + Object.entries(o).map(([k, v]) => JSON.stringify(k) + ': ' + JSON.stringify(v)).join(',\n') + '\n}\n'
    : JSON.stringify(o, null, 1) + '\n');
};
const ANCHORS = ['0-0-4', '0-0-9', '0-0-14', '0-0-19'];

for (const [code, syn] of Object.entries(SRC)) {
  const keys = Object.keys(syn).sort();
  if (keys.join() !== [...ANCHORS].sort().join()) throw new Error(`${code} : il faut exactement 4 synthèses (${ANCHORS.join(', ')})`);
  // tools/extra/<code>.json
  const fx = path.join(TOOLS, 'extra', code + '.json'), extra = read(fx);
  extra.tipsReplace = extra.tipsReplace || {};
  for (let i = 0; i < 20; i++) {
    const id = `0-0-${i}`, s = syn[id];
    if (!s) { extra.tipsReplace[id] = null; continue; }
    const tip = { title: s.title, example: s.example, body: s.body };
    if (s.exampleRo) tip.exampleRo = s.exampleRo;
    if (s.lit) tip.lit = s.lit;
    extra.tipsReplace[id] = tip;
  }
  write(fx, extra);
  // tools/tips_say/<code>.json
  const fs_ = path.join(TOOLS, 'tips_say', code + '.json'), say = read(fs_);
  const newSay = {};
  ANCHORS.forEach(id => { newSay[id] = syn[id].say; }); // le module 1 en tête, comme avant
  for (const [k, v] of Object.entries(say)) if (!k.startsWith('0-0-')) newSay[k] = v;
  write(fs_, newSay);
  // tools/tips_fix/<code>.json
  const ff = path.join(TOOLS, 'tips_fix', code + '.json');
  if (fs.existsSync(ff)) {
    const fix = read(ff), kept = {};
    for (const [k, v] of Object.entries(fix)) if (!k.startsWith('0-0-')) kept[k] = v;
    write(ff, kept);
  }
  console.log(code.padEnd(4), '4 synthèses installées');
}
