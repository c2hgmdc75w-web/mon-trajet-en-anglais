// Mots de la langue apprise (transcription) présents HORS guillemets dans les points de grammaire
// → lus par la voix française.
const D = require('./load.js')();
const tok = s => (s.toLowerCase().normalize('NFC').match(/[\p{L}\p{M}'’-]+/gu) || []).map(w => w.replace(/^['’-]+|['’-]+$/g, '')).filter(Boolean);
const FR = new Set();
for (const lv of Object.values(D)) lv.forEach(l => l.modules.forEach(m => m.lessons.forEach(x => x.phrases.forEach(p => tok(p.fr).forEach(w => { FR.add(w); w.split(/['’-]/).forEach(y => y && FR.add(y)); })))));
// vocabulaire français des explications elles-mêmes (mots fréquents hors guillemets dans TOUTES les langues)
const EXPL = new Map();
for (const lv of Object.values(D)) lv.forEach(l => l.modules.forEach(m => m.lessons.forEach(x => { if (x.tip) new Set(tok((x.tip.title + ' ' + x.tip.body).replace(/«[^»]*»/g, ' '))).forEach(w => EXPL.set(w, (EXPL.get(w) || 0) + 1)); })));
const res = {};
for (const [c, levels] of Object.entries(D)) {
  const TG = new Set();
  levels.forEach(l => l.modules.forEach(m => m.lessons.forEach(x => x.phrases.forEach(p => tok(p.ro || p.tgt).forEach(w => TG.add(w))))));
  // mots cités entre guillemets dans les tips de cette langue = aussi du vocabulaire cible
  levels.forEach(l => l.modules.forEach(m => m.lessons.forEach(x => { if (x.tip && x.tip.say) Object.keys(x.tip.say).forEach(k => tok(k).forEach(w => TG.add(w))); })));
  const hits = []; let tips = 0;
  levels.forEach((lv, a) => lv.modules.forEach((m, b) => m.lessons.forEach((l, li) => {
    if (!l.tip) return;
    const txt = (l.tip.title + ' . ' + l.tip.body).replace(/«[^»]*»/g, ' ');
    const found = [...new Set(tok(txt).filter(w => w.length >= 2 && TG.has(w) && !FR.has(w) && (EXPL.get(w) || 0) < 12 && !/^(a|à|de|la|le|les|un|une|et|ou|en|du|des)$/.test(w)))];
    if (found.length) { tips++; hits.push(`${a}-${b}-${li}: ${found.join(', ')}`); }
  })));
  res[c] = hits;
  console.log(`${c.padEnd(5)} ${String(tips).padStart(2)} points de grammaire avec des mots cibles hors guillemets | ${hits.slice(0, 500).join(' ; ').slice(0, 700)}`);
}
if (process.argv.includes('--json')) require('fs').writeFileSync('unquoted.json', JSON.stringify(res, null, 1));
