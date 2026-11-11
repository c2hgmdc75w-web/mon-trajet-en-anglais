// Petite bibliothèque pour écrire des corrections dans les surcouches du dépôt.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const D = require('./load.js')();
const cache = {};
const file = (dir, c) => path.join(ROOT, dir, c + '.json');
const get = (dir, c) => cache[dir + c] || (cache[dir + c] = fs.existsSync(file(dir, c)) ? JSON.parse(fs.readFileSync(file(dir, c), 'utf8')) : {});
const tipOf = (c, id) => { const [a, b, li] = id.split('-').map(Number); const l = D[c][a].modules[b].lessons[li]; if (!l || !l.tip) throw new Error(`${c} ${id} : pas de point de grammaire`); return l.tip; };
module.exports = {
  D, tipOf,
  // remplace une sous-chaîne dans le titre ou le texte actuel du point de grammaire
  tipReplace(c, id, field, from, to) {
    const fx = get('tips_fix', c); const cur = (fx[id] && fx[id][field]) || tipOf(c, id)[field];
    if (cur.split(from).length !== 2) throw new Error(`${c} ${id} ${field} : « ${from} » trouvé ${cur.split(from).length - 1} fois`);
    (fx[id] = fx[id] || {})[field] = cur.replace(from, to);
  },
  tipSet(c, id, fields) { tipOf(c, id); const fx = get('tips_fix', c); Object.assign(fx[id] = fx[id] || {}, fields); },
  say(c, id, add, remove) {
    tipOf(c, id); const sy = get('tips_say', c); const o = sy[id] = sy[id] || {};
    for (const k of remove || []) { if (!(k in o)) throw new Error(`${c} ${id} say : « ${k} » absent`); delete o[k]; }
    Object.assign(o, add || {});
  },
  phrase(c, key, fields) {
    const [id, pi] = key.split('#'); const [a, b, li] = id.split('-').map(Number);
    if (!D[c][a].modules[b].lessons[li].phrases[Number(pi)]) throw new Error(`${c} ${key} : phrase introuvable`);
    Object.assign(get('phrase_fix', c)[key] = get('phrase_fix', c)[key] || {}, fields);
  },
  save() { for (const k of Object.keys(cache)) { const dir = ['tips_fix', 'tips_say', 'phrase_fix'].find(d => k.startsWith(d)); const c = k.slice(dir.length); fs.mkdirSync(path.join(ROOT, dir), { recursive: true }); fs.writeFileSync(file(dir, c), JSON.stringify(cache[k], null, 1) + '\n'); console.log('écrit', dir + '/' + c + '.json'); } }
};
