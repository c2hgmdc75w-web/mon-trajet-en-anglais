// node check_vocab.js <a-b>  → vérifie vocab_<a-b>.json
const fs = require('fs'); const m = process.argv[2];
const IN = JSON.parse(fs.readFileSync(`in_${m}.json`, 'utf8'));
let V; try { V = JSON.parse(fs.readFileSync(`vocab_${m}.json`, 'utf8')); } catch (e) { console.log('JSON INVALIDE ou absent : ' + e.message); process.exit(1); }
const err = []; const seenTgt = new Map();
const TONE = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;
for (const L of IN.lessons) {
  const list = V[L.id];
  if (!Array.isArray(list)) { err.push(`${L.id} : manquant`); continue; }
  if (list.length !== 6) err.push(`${L.id} : ${list.length} mots au lieu de 6`);
  const all = L.phrases.map(p => p.tgt).join('');
  list.forEach((w, i) => {
    const at = `${L.id}[${i}]`;
    for (const k of ['fr', 'tgt', 'ro']) if (typeof w[k] !== 'string' || !w[k].trim()) err.push(`${at} ${k} vide`);
    if (Object.keys(w).some(k => !['fr', 'tgt', 'ro'].includes(k))) err.push(`${at} champ inattendu`);
    if (!w.tgt) return;
    if (!/^[一-鿿]+$/.test(w.tgt)) err.push(`${at} tgt doit être uniquement des caractères chinois : ${w.tgt}`);
    if (!all.includes(w.tgt)) err.push(`${at} « ${w.tgt} » n'apparaît dans aucune phrase de la leçon`);
    if (w.ro && /[一-鿿]/.test(w.ro)) err.push(`${at} ro contient des caractères chinois`);
    if (w.ro && !TONE.test(w.ro) && !/^(de|le|ma|ne|ba|zi|me|men|ge)$/i.test(w.ro)) err.push(`${at} ro sans ton : ${w.ro}`);
    if (w.ro && /[A-Z]/.test(w.ro[0]) && !/^[A-Z]/.test(w.fr)) err.push(`${at} ro : pas de majuscule (sauf nom propre) : ${w.ro}`);
    if (w.fr && /[.!?]$/.test(w.fr.trim())) err.push(`${at} fr : pas de ponctuation finale (c'est un mot) : ${w.fr}`);
    if (w.tgt.length > 4) err.push(`${at} trop long pour un mot de vocabulaire : ${w.tgt}`);
    if (seenTgt.has(w.tgt)) err.push(`${at} « ${w.tgt} » déjà choisi en ${seenTgt.get(w.tgt)} (choisir un autre mot)`); else seenTgt.set(w.tgt, at);
  });
}
for (const k of Object.keys(V)) if (!IN.lessons.some(L => L.id === k)) err.push(`clé inconnue ${k}`);
if (err.length) { console.log(err.length + ' ERREUR(S)\n' + err.slice(0, 60).join('\n')); process.exit(1); }
console.log(`OK ${m} : ${Object.keys(V).length} leçons, ${Object.values(V).flat().length} mots`);
