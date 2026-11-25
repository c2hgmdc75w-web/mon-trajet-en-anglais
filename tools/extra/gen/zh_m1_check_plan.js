// Vérifie le plan : chaque phrase n'utilise que des caractères déjà introduits, le mot à mot
// redonne la phrase, le pinyin a autant de syllabes que de caractères.
const plan = require('./zh_m1_plan.js');
const han = t => [...t].filter(c => /\p{Script=Han}/u.test(c));
const VOW = /[aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/gi;
const syl = py => py.replace(/[.,!?;:…]/g, ' ').split(/\s+/).filter(Boolean).reduce((n, t) => n + t.split("'").reduce((k, x) => k + ((x.match(VOW) || []).length), 0) + (/[^e]r$/i.test(t) && !/^[eēéěè]r$/i.test(t) ? 1 : 0), 0);
const known = new Set(); let err = 0, total = 0;
for (const L of plan) {
  for (const [, zh] of L.elements) han(zh).forEach(c => known.add(c));
  if (L.phrases.length !== 10) { console.log(`L${L.n} : ${L.phrases.length} phrases`); err++; }
  for (const [fr, zh, py, lit] of L.phrases) {
    total++;
    const bad = han(zh).filter(c => !known.has(c)); if (bad.length) { console.log(`L${L.n} « ${zh} » caractères pas encore appris : ${bad.join('')}`); err++; }
    const pairs = lit.split(/(?<=\p{Script=Han})\s/u).map(x => x.split('|'));
    if (pairs.map(p => p[1]).join('') !== han(zh).join('')) { console.log(`L${L.n} « ${zh} » mot à mot ≠ phrase : ${pairs.map(p => p[1]).join(' ')}`); err++; }
    if (syl(py) !== han(zh).length) { console.log(`L${L.n} « ${zh} » pinyin ${py} : ${syl(py)} syllabes pour ${han(zh).length} caractères`); err++; }
  }
  for (const [fr, zh] of L.elements) { const n = L.phrases.filter(p => p[1].includes(zh)).length; if (!n && L.n > 1) { console.log(`L${L.n} élément ${zh} (${fr}) absent des phrases`); } }
}
console.log(`${plan.length} leçons, ${total} phrases, ${plan.reduce((n, L) => n + L.elements.length, 0)} éléments, ${known.size} caractères, ${err} erreur(s)`);
