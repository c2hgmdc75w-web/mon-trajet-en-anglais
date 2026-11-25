// node tools/extra/gen/script_to_json.js <code> <leçon> <fichier.md>
// Convertit un script de leçon écrit à la main (format du « script de la leçon ») en étapes
// enregistrées dans tools/extra/<code>.json → scripts["<leçon>"].
//   ## Titre de partie — durée      → ["sec", "Titre de partie"]
//   - **FR** — phrase.              → ["f", "phrase."]      phrase dite par la voix française
//   - **FR** — mot                  → ["fw", "mot"]         mot dit seul (sans ponctuation finale)
//   - **中文** — 汉字  *(pinyin)*    → ["z", "汉字", "pinyin"]
//   - *(silence 2,5 s)*             → ["w", 2500]
// Une partie dont le titre commence par « Test » est jouée dans le désordre (groupes FR / silence / réponse).
// Le français est enregistré en orthographe normale : les graphies « pour l'oreille » du script
// (jeu, elleu, mo ta mo, tu va…) sont refaites automatiquement par les règles de la voix française.
const fs = require('fs'), path = require('path');
const [code, id, file] = process.argv.slice(2);
const NORMAL = [[/\bmo ta mo\b/g, 'mot à mot'], [/\btu va\b/g, 'tu vas'], [/\btu pourra\b/g, 'tu pourras'], [/\btu entend\b/g, 'tu entends'],
  [/\bTu remarque\b/g, 'Tu remarques'], [/\btu la di\b/g, 'tu la dis'], [/\bTu a\b/g, 'Tu as'], [/\bjeu\b/g, 'je'], [/\belleu\b/g, 'elle']];
const norm = t => NORMAL.reduce((s, [re, r]) => s.replace(re, r), t);
const steps = [];
for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
  let m;
  if ((m = line.match(/^##\s+(?:\d+\.\s*)?(.+?)\s+—\s+≈?.*$/))) steps.push(['sec', m[1].replace(/\s*\(dans l'appli.*?\)/, '').trim()]);
  else if ((m = line.match(/^- \*\*FR\*\* — (.+)$/))) { const t = norm(m[1].trim()); steps.push([(/[.!?:…,]/.test(t) || t.split(/\s+/).length > 6) ? 'f' : 'fw', t]); }
  else if ((m = line.match(/^- \*\*中文\*\* — (.+?)\s+\*\((.+)\)\*\s*$/))) steps.push(['z', m[1].trim(), m[2].trim()]);
  else if ((m = line.match(/^- \*\(silence ([\d,\.]+) s\)\*/))) steps.push(['w', Math.round(parseFloat(m[1].replace(',', '.')) * 1000)]);
  else if (/^- /.test(line)) throw new Error('ligne non comprise : ' + line);
}
const f = path.join(__dirname, '..', code + '.json'); const e = JSON.parse(fs.readFileSync(f, 'utf8'));
(e.scripts = e.scripts || {})[id] = steps;
fs.writeFileSync(f, JSON.stringify(e, null, 1) + '\n');
const n = k => steps.filter(s => s[0] === k).length;
console.log(`${id} : ${steps.length} étapes (${n('sec')} parties, ${n('f')} phrases FR, ${n('fw')} mots FR, ${n('z')} chinois, ${n('w')} silences)`);
console.log(steps.filter(s => s[0] === 'fw').map(s => s[1]).join(' | '));
