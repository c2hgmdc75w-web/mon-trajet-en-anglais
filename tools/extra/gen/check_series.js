// node check_series.js → vérifie series.json
const fs = require('fs');
let S; try { S = JSON.parse(fs.readFileSync('series.json', 'utf8')); } catch (e) { console.log('JSON INVALIDE ou absent : ' + e.message); process.exit(1); }
const PLAN = require('./series_plan.json');
const TONE = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;
const err = []; const seen = new Map();
for (const p of PLAN) {
  const s = S[p.id]; if (!s) { err.push(`${p.id} manquante (${p.theme})`); continue; }
  if (!s.title || !s.title.trim()) err.push(`${p.id} titre vide`);
  if (typeof s.intro !== 'string' || s.intro.length < 30 || s.intro.length > 450) err.push(`${p.id} intro : 30 à 450 caractères (${(s.intro || '').length})`);
  if (s.intro && /[一-鿿]/.test(s.intro)) err.push(`${p.id} intro : pas de caractères chinois (lue par la voix française ; pinyin entre « » si besoin)`);
  if (!Array.isArray(s.chunks) || s.chunks.length < 2 || s.chunks.length > 5) { err.push(`${p.id} chunks : 2 à 5 groupes`); continue; }
  let n = 0;
  s.chunks.forEach((c, ci) => {
    if (!Array.isArray(c) || c.length < 3 || c.length > 5) err.push(`${p.id} groupe ${ci} : 3 à 5 éléments`);
    (c || []).forEach((w, i) => {
      n++; const at = `${p.id}[${ci}][${i}]`;
      for (const k of ['fr', 'tgt', 'ro']) if (typeof w[k] !== 'string' || !w[k].trim()) err.push(`${at} ${k} vide`);
      if (!w.tgt) return;
      if (!/^[一-鿿]+$/.test(w.tgt)) err.push(`${at} tgt uniquement en caractères : ${w.tgt}`);
      if (w.tgt.length > 6) err.push(`${at} trop long : ${w.tgt}`);
      if (w.ro && !TONE.test(w.ro)) err.push(`${at} ro sans ton : ${w.ro}`);
      if (w.fr && /[.!?]$/.test(w.fr.trim())) err.push(`${at} fr sans ponctuation finale`);
      if (seen.has(w.tgt) && !p.allowRepeat) err.push(`${at} « ${w.tgt} » déjà dans ${seen.get(w.tgt)}`); else seen.set(w.tgt, at);
    });
  });
  if (n < 8 || n > 16) err.push(`${p.id} : ${n} éléments (8 à 16)`);
}
for (const k of Object.keys(S)) if (!PLAN.some(p => p.id === k)) err.push(`clé inconnue ${k}`);
if (err.length) { console.log(err.length + ' ERREUR(S)\n' + err.slice(0, 60).join('\n')); process.exit(1); }
console.log(`OK séries : ${Object.keys(S).length}`);
