// node check_notes_all.js <code>  → vérifie notes_<code>_0.json, notes_<code>_1.json, notes_<code>_2.json
// (un fichier par module du niveau 1 : leçons 0-0-*, 0-1-*, 0-2-*) contre in_all_<code>.json
const fs = require('fs'), path = require('path');
const code = process.argv[2]; const dir = __dirname;
const IN = JSON.parse(fs.readFileSync(path.join(dir, `in_all_${code}.json`), 'utf8'));
const SCRIPT = { ar: /\p{Script=Arabic}/u, fa: /\p{Script=Arabic}/u, he: /\p{Script=Hebrew}/u, hi: /\p{Script=Devanagari}/u, bn: /\p{Script=Bengali}/u,
  ta: /\p{Script=Tamil}/u, th: /\p{Script=Thai}/u, ru: /\p{Script=Cyrillic}/u, ko: /\p{Script=Hangul}/u, ja: /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u, yue: /\p{Script=Han}/u }[code];
const squash = t => t.normalize('NFC').replace(/[\s\p{P}\p{S}]/gu, '');
const N = {}; const err = [];
for (const part of [0, 1, 2]) {
  const f = path.join(dir, `notes_${code}_${part}.json`);
  if (!fs.existsSync(f)) { err.push(`fichier absent : notes_${code}_${part}.json`); continue; }
  try { Object.assign(N, JSON.parse(fs.readFileSync(f, 'utf8'))); } catch (e) { err.push(`notes_${code}_${part}.json : JSON invalide : ${e.message}`); }
}
for (const [id, L] of Object.entries(IN)) {
  const list = N[id];
  if (!Array.isArray(list) || list.length !== L.phrases.length) { err.push(`${id} : ${list ? list.length : 0} entrées au lieu de ${L.phrases.length}`); continue; }
  list.forEach((n, i) => {
    const at = `${id}#${i}`, p = L.phrases[i];
    if (!n || typeof n !== 'object') { err.push(`${at} entrée invalide`); return; }
    if (Object.keys(n).some(k => !['words', 'note', 'say'].includes(k))) err.push(`${at} champ inattendu (seulement words, note, say)`);
    const w = n.words;
    if (!Array.isArray(w) || !w.length || w.some(x => !Array.isArray(x) || x.length !== 2 || typeof x[0] !== 'string' || typeof x[1] !== 'string' || !x[0].trim() || !x[1].trim())) err.push(`${at} words : liste de paires ["français", "mot cible"]`);
    else {
      if (squash(w.map(x => x[1]).join('')) !== squash(p.tgt)) err.push(`${at} words : les mots cibles bout à bout ne redonnent pas la phrase « ${p.tgt} » (obtenu : ${w.map(x => x[1]).join(' | ')})`);
      for (const [f] of w) {
        if (SCRIPT.test(f)) err.push(`${at} words : « ${f} » le côté français ne doit contenir que du français`);
        if (/[\[\]()·=\/_*]/.test(f)) err.push(`${at} words : « ${f} » pas de crochets, parenthèses ou symboles (lu à voix haute)`);
        if (f.length > 40) err.push(`${at} words : « ${f} » trop long`);
      }
    }
    const t = n.note;
    if (typeof t !== 'string' || t.length < 30 || t.length > 260) { err.push(`${at} note : 30 à 260 caractères`); return; }
    if (SCRIPT.test(t)) err.push(`${at} note : pas d'écriture ${code} dans la note (le mot cité est en transcription latine entre « »)`);
    if (/[\[\]()·=\/_*]/.test(t)) err.push(`${at} note : pas de crochets, parenthèses ou symboles`);
    const qs = [...t.matchAll(/«\s*([^»]+?)\s*»/g)].map(x => x[1]);
    if (qs.length !== 1) err.push(`${at} note : exactement UN passage entre « » (trouvé ${qs.length})`);
    if (t.split('«').length !== t.split('»').length) err.push(`${at} note : guillemets non équilibrés`);
    if (!/»[.?](\s|$)/.test(t)) err.push(`${at} note : le mot entre « » doit terminer sa phrase (« … ». puis rien ou une nouvelle phrase)`);
    if (!/[.?!]$/.test(t)) err.push(`${at} note : doit finir par un point`);
    const sents = t.replace(/\s+:\s+/g, '. ').split(/(?<=[.!?»])\s+(?=[A-ZÀ-Ý«])/);
    if (sents.length < 2 || sents.length > 3) err.push(`${at} note : 2 ou 3 phrases (trouvé ${sents.length})`);
    if (sents.some(s => s.length > 130)) err.push(`${at} note : une phrase dépasse 130 caractères`);
    const say = n.say || {};
    if (Object.keys(say).length !== 1) err.push(`${at} say : exactement une entrée`);
    for (const [k, v] of Object.entries(say)) {
      if (!qs.includes(k)) err.push(`${at} say : la clé « ${k} » doit être exactement le texte entre « » de la note`);
      if (SCRIPT.test(k)) err.push(`${at} say : la clé doit être en transcription latine`);
      if (typeof v !== 'string' || !SCRIPT.test(v) || /[A-Za-z]/.test(v)) err.push(`${at} say : la valeur doit être en écriture ${code}, sans lettres latines`);
    }
  });
}
const extra = Object.keys(N).filter(k => !IN[k]); if (extra.length) err.push('clés inconnues : ' + extra.join(', '));
if (err.length) { console.log(err.length + ' ERREUR(S)\n' + err.slice(0, 60).join('\n')); process.exit(1); }
console.log(`OK ${code} : ${Object.values(N).flat().length} entrées`);
