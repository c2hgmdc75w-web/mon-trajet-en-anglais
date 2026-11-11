// Passages entre « » des points de grammaire : lesquels ressemblent à la langue apprise
// mais ne sont PAS confiés à la voix native (non_say), et lesquels ressemblent à du
// français mais SONT confiés à la voix native (say).
const D = require('./load.js')();
const tok = s => (s.toLowerCase().normalize('NFC').match(/[\p{L}\p{M}'’-]+/gu) || []).map(w => w.replace(/^['’-]+|['’-]+$/g, '')).filter(Boolean);
const FR = new Map();
const addFr = s => tok(s).forEach(w => { FR.set(w, (FR.get(w) || 0) + 1); w.split(/['’-]/).forEach(x => x && FR.set(x, (FR.get(x) || 0) + 1)); });
for (const lv of Object.values(D)) lv.forEach(l => l.modules.forEach(m => m.lessons.forEach(x => { x.phrases.forEach(p => addFr(p.fr)); if (x.tip) addFr((x.tip.title + ' ' + x.tip.body).replace(/«[^»]*»/g, ' ')); })));
const out = {};
for (const [c, levels] of Object.entries(D)) {
  const TG = new Set();
  levels.forEach(l => l.modules.forEach(m => m.lessons.forEach(x => x.phrases.forEach(p => tok(p.ro || p.tgt).forEach(w => { TG.add(w); w.split(/['’-]/).forEach(y => y && TG.add(y)); })))));
  const res = { cible_non_lue: [], francais_lu_natif: [], total_non_say: 0, total_say: 0 };
  levels.forEach((lv, a) => lv.modules.forEach((m, b) => m.lessons.forEach((l, li) => {
    if (!l.tip) return; const t = l.tip, id = `${a}-${b}-${li}`;
    const quotes = new Set(); const re = /«\s*([^»]+?)\s*»/g; let x;
    for (const s of [t.title, t.body]) while ((x = re.exec(s))) quotes.add(x[1]);
    const say = t.say || {};
    for (const q of quotes) {
      const ws = tok(q); if (!ws.length) continue;
      const fr = ws.filter(w => FR.has(w) || w.split(/['’-]/).every(y => FR.has(y))).length / ws.length;
      const tg = ws.filter(w => TG.has(w) || w.split(/['’-]/).every(y => TG.has(y))).length / ws.length;
      if (!say[q]) { res.total_non_say++; if (tg >= 0.6 && fr < 0.6 && q.replace(/[^\p{L}]/gu, '').length >= 3) res.cible_non_lue.push(`${id} « ${q} »`); }
      else { res.total_say++; if (fr >= 0.99 && tg < 0.5 && ws.length >= 2) res.francais_lu_natif.push(`${id} « ${q} » → ${say[q]}`); }
    }
  })));
  out[c] = res;
  console.log(`== ${c} : ${res.total_say} lus par la voix native, ${res.total_non_say} laissés à la voix française ; suspects : ${res.cible_non_lue.length} cible non lue, ${res.francais_lu_natif.length} français lu en natif`);
}
if (process.argv.includes('--json')) require('fs').writeFileSync('voices.json', JSON.stringify(out, null, 1));
