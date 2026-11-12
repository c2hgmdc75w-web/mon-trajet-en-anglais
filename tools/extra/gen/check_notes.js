// node check_notes.js 0-b  → vérifie notes_0-b.json
const fs = require('fs'); const m = process.argv[2];
const IN = JSON.parse(fs.readFileSync(`in_${m}.json`, 'utf8'));
let N; try { N = JSON.parse(fs.readFileSync(`notes_${m}.json`, 'utf8')); } catch (e) { console.log('JSON INVALIDE ou absent : ' + e.message); process.exit(1); }
const HAN = /[一-鿿]/; const err = [];
for (const L of IN.lessons) {
  const list = N[L.id];
  if (!Array.isArray(list) || list.length !== L.phrases.length) { err.push(`${L.id} : ${list ? list.length : 0} notes au lieu de ${L.phrases.length}`); continue; }
  list.forEach((n, i) => {
    const at = `${L.id}#${i}`;
    if (Object.keys(n).some(k => !['lit', 'note', 'say'].includes(k))) err.push(`${at} champ inattendu`);
    if (typeof n.lit !== 'string' || n.lit.trim().length < 3) err.push(`${at} lit vide`);
    else { if (HAN.test(n.lit)) err.push(`${at} lit : pas de caractères chinois`); if (/[\[\]·]/.test(n.lit)) err.push(`${at} lit : pas de crochets ni de « · » (texte lu à voix haute)`); }
    if (typeof n.note !== 'string' || n.note.length < 40 || n.note.length > 260) err.push(`${at} note : 40 à 260 caractères (${(n.note || '').length})`);
    if (n.note && HAN.test(n.note)) err.push(`${at} note : pas de caractères chinois (pinyin entre « »)`);
    const qs = []; const re = /«\s*([^»]+?)\s*»/g; let x; while ((x = re.exec(n.note || ''))) qs.push(x[1]);
    if ((n.note || '').split('«').length !== (n.note || '').split('»').length) err.push(`${at} guillemets non équilibrés`);
    const say = n.say || {};
    for (const q of qs) if (!say[q]) err.push(`${at} « ${q} » cité sans entrée dans say (tout passage entre « » doit être du chinois en pinyin)`);
    for (const [k, v] of Object.entries(say)) { if (!qs.includes(k)) err.push(`${at} say « ${k} » absent de la note`); if (!/^[一-鿿，、？！。 ]+$/.test(v)) err.push(`${at} say « ${k} » → doit être en caractères chinois : ${v}`); }
  });
}
if (err.length) { console.log(err.length + ' ERREUR(S)\n' + err.slice(0, 50).join('\n')); process.exit(1); }
console.log(`OK ${m} : ${Object.values(N).flat().length} notes`);
