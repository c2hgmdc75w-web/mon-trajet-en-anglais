// Audit des points de grammaire
const D = require('./load.js')();
const NONLATIN = { ar:/[؀-ۿ]/, fa:/[؀-ۿ]/, he:/[֐-׿]/, hi:/[ऀ-ॿ]/, bn:/[ঀ-৿]/, ta:/[஀-௿]/, th:/[฀-๿]/, ja:/[぀-ヿ一-鿿]/, zh:/[一-鿿]/, yue:/[一-鿿]/, ko:/[가-힯ᄀ-ᇿ]/, ru:/[Ѐ-ӿ]/ };
const ANY_NONLATIN = /[Ѐ-ӿ֐-ۿऀ-෿฀-๿぀-ヿ一-鿿가-힯]/;
const strip = s => (s || '').replace(/<[^>]+>/g, '');
const norm = s => strip(s).replace(/[\s  ]+/g, ' ').trim();
const issues = {}; const add = (c, k, m) => { ((issues[c] = issues[c] || {})[k] = issues[c][k] || []).push(m); };
const pos = {};
for (const [c, levels] of Object.entries(D)) {
  pos[c] = [];
  levels.forEach((lv, a) => lv.modules.forEach((m, b) => {
    const where = [];
    m.lessons.forEach((l, li) => {
      if (!l.tip) return; where.push(li);
      const t = l.tip, id = `${a}-${b}-${li}`;
      for (const k of Object.keys(t)) if (!['title', 'example', 'body', 'exampleRo', 'lit', 'say'].includes(k)) add(c, 'champ', `${id} ${k}`);
      for (const k of ['title', 'example', 'body']) if (!t[k] || !String(t[k]).trim()) add(c, 'vide', `${id} ${k}`);
      if (!t.title || !t.body || !t.example) return;
      if (t.body.length < 180) add(c, 'court', `${id} body ${t.body.length} car. : ${t.body}`);
      if (t.body.length > 1400) add(c, 'long', `${id} body ${t.body.length} car.`);
      // exemple
      const tags = (t.example.match(/<[^>]+>/g) || []);
      if (tags.some(x => !/^<\/?b>$/.test(x))) add(c, 'html', `${id} ${t.example}`);
      if ((t.example.match(/<b>/g) || []).length !== (t.example.match(/<\/b>/g) || []).length) add(c, 'html', `${id} <b> non fermé : ${t.example}`);
      if (/<[^>]*>/.test(t.title + t.body)) add(c, 'html', `${id} balise dans titre/texte`);
      const parts = strip(t.example).split(' — ');
      if (parts.length !== 2) { add(c, 'exemple_format', `${id} ${t.example}`); }
      else {
        const [fr, tg] = parts.map(norm);
        const hit = l.phrases.find(p => norm(p.tgt) === tg);
        if (!hit) add(c, 'exemple_hors_leçon', `${id} « ${tg} » n'est pas une phrase de la leçon`);
        else {
          if (norm(hit.fr) !== fr) add(c, 'exemple_fr_diff', `${id} tip: « ${fr} » / leçon: « ${hit.fr} »`);
          if (hit.ro && t.exampleRo && norm(hit.ro) !== norm(t.exampleRo)) add(c, 'exampleRo_diff', `${id} tip: ${t.exampleRo} / leçon: ${hit.ro}`);
          if (hit.ro && !t.exampleRo) add(c, 'exampleRo_manquant', `${id}`);
          if (hit.lit && !t.lit) add(c, 'lit_manquant', `${id}`);
          if (hit.lit && t.lit && norm(hit.lit) !== norm(t.lit)) add(c, 'lit_diff', `${id} tip: ${t.lit} / leçon: ${hit.lit}`);
        }
        if (ANY_NONLATIN.test(fr)) add(c, 'exemple_fr_script', `${id} ${fr}`);
        if (NONLATIN[c] && !NONLATIN[c].test(tg)) add(c, 'exemple_tgt_script', `${id} ${tg}`);
      }
      // titre / texte : écriture native interdite hors « », guillemets équilibrés
      for (const k of ['title', 'body']) {
        const s = t[k];
        const o = (s.match(/«/g) || []).length, f = (s.match(/»/g) || []).length;
        if (o !== f) add(c, 'guillemets', `${id} ${k} «${o} »${f} : ${s.slice(0, 160)}`);
        if (/«[^»]*«/.test(s)) add(c, 'guillemets', `${id} ${k} imbriqués : ${s.slice(0, 160)}`);
        if (ANY_NONLATIN.test(s)) add(c, 'script_dans_texte', `${id} ${k} : ${(s.match(new RegExp(ANY_NONLATIN.source + '+', 'g')) || []).join(' ')}`);
        if (/ {2,}|\n|\t/.test(s)) add(c, 'espaces', `${id} ${k}`);
        if (/\p{Extended_Pictographic}/u.test(s)) add(c, 'emoji', `${id} ${k}`);
        if (/[*_#`]|\d\.\s|^- /m.test(s) && /\*|_|#|`/.test(s)) add(c, 'markdown', `${id} ${k} : ${s.slice(0, 120)}`);
      }
      // say
      const quotes = new Set(); const re = /«\s*([^»]+?)\s*»/g; let x;
      for (const s of [t.title, t.body]) while ((x = re.exec(s))) quotes.add(x[1]);
      const say = t.say || {};
      for (const [k, v] of Object.entries(say)) {
        if (!quotes.has(k)) add(c, 'say_orphelin', `${id} « ${k} » absent du texte`);
        if (!v || !String(v).trim()) add(c, 'say_vide', `${id} ${k}`);
        if (NONLATIN[c]) {
          if (!NONLATIN[c].test(v)) add(c, 'say_script', `${id} « ${k} » → ${v}`);
          if (/[A-Za-zÀ-ÿĀ-ž]/.test(v)) add(c, 'say_latin', `${id} « ${k} » → ${v}`);
        }
      }
      for (const q of quotes) if (!say[q]) ((issues[c] = issues[c] || {}).non_say = issues[c].non_say || []).push(`${id}\t${q}`);
    });
    pos[c].push(where.join(','));
  }));
}
const kinds = new Set(); Object.values(issues).forEach(o => Object.keys(o).forEach(k => kinds.add(k)));
for (const c of Object.keys(D)) console.log(c.padEnd(5), [...kinds].map(k => `${k}:${(issues[c] && issues[c][k] || []).length}`).filter(s => !s.endsWith(':0')).join('  ') || 'RAS');
console.log('\nPositions des points de grammaire (index de leçon, par module) :');
const groups = {}; for (const c of Object.keys(pos)) { const key = pos[c].join(' | '); (groups[key] = groups[key] || []).push(c); }
for (const [k, v] of Object.entries(groups)) console.log(v.join(','), '→', k);
if (process.argv.includes('--json')) require('fs').writeFileSync('tips.json', JSON.stringify(issues, null, 1));
