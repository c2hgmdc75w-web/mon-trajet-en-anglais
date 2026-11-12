// Audit structurel et de forme des phrases
const D = require('./load.js')();
const NONLATIN = { ar:/[؀-ۿ]/, fa:/[؀-ۿ]/, he:/[֐-׿]/, hi:/[ऀ-ॿ]/, bn:/[ঀ-৿]/, ta:/[஀-௿]/, th:/[฀-๿]/, ja:/[぀-ヿ一-鿿]/, zh:/[一-鿿]/, yue:/[一-鿿]/, ko:/[가-힯ᄀ-ᇿ]/, ru:/[Ѐ-ӿ]/ };
const LIT_LANGS = new Set(['ar','bn','fa','he','hi','ja','ko','ru','ta','th','yue','zh','id','pl','tr','vi']);
const issues = {};
const add = (c, kind, msg) => { ((issues[c] = issues[c] || {})[kind] = issues[c][kind] || []).push(msg); };
for (const [c, levels] of Object.entries(D)) {
  const frSeen = new Map(), tgtSeen = new Map();
  if (levels.length !== 3) add(c, 'struct', 'niveaux=' + levels.length);
  levels.forEach((lv, a) => {
    if (!lv.name) add(c, 'struct', `niveau ${a} sans nom`);
    lv.modules.forEach((m, b) => {
      const at = `${a}-${b}`;
      if (!m.name || !m.desc) add(c, 'struct', `${at} module sans nom/desc`);
      if (m.lessons.length !== 20 || m.lessonsCount !== 20) add(c, 'struct', `${at} leçons=${m.lessons.length}/${m.lessonsCount}`);
      let tot = 0;
      m.lessons.forEach((l, li) => {
        const id = `${a}-${b}-${li}`;
        if (!l || !l.phrases) { add(c, 'struct', `${id} leçon vide`); return; }
        if (!l.title || !l.title.trim()) add(c, 'struct', `${id} sans titre`);
        if (l.phrases.length !== 10) add(c, 'struct', `${id} phrases=${l.phrases.length}`);
        tot += l.phrases.length;
        l.phrases.forEach((p, pi) => {
          const pid = `${id}#${pi}`;
          for (const k of ['fr', 'tgt']) {
            const v = p[k];
            if (typeof v !== 'string' || !v.trim()) { add(c, 'vide', `${pid} ${k} vide`); continue; }
            if (v !== v.trim()) add(c, 'espaces', `${pid} ${k} espace début/fin: ${JSON.stringify(v)}`);
            if (/ {2,}|[\t\n\r]/.test(v)) add(c, 'espaces', `${pid} ${k} double espace/retour: ${JSON.stringify(v)}`);
            if (/<[^>]+>/.test(v)) add(c, 'html', `${pid} ${k}: ${v}`);
            if (/\bundefined\b|\bnull\b|\bNaN\b|\[object/.test(v)) add(c, 'undefined', `${pid} ${k}: ${v}`);
          }
          for (const k of Object.keys(p)) if (!['fr', 'tgt', 'ro', 'lit', 'note'].includes(k)) add(c, 'struct', `${pid} champ inattendu ${k}`);
          if (p.fr === p.tgt) add(c, 'identique', `${pid} fr==tgt: ${p.fr}`);
          const nl = NONLATIN[c];
          if (nl) {
            if (!p.ro || !p.ro.trim()) add(c, 'ro', `${pid} ro manquant: ${p.tgt}`);
            else {
              if (nl.test(p.ro)) add(c, 'ro', `${pid} ro contient l'écriture native: ${p.ro}`);
              if (p.ro !== p.ro.trim() || / {2,}/.test(p.ro)) add(c, 'espaces', `${pid} ro espaces: ${JSON.stringify(p.ro)}`);
            }
            if (!nl.test(p.tgt)) add(c, 'script', `${pid} tgt sans écriture native: ${p.tgt}`);
            const lat = p.tgt.match(/[A-Za-zÀ-ÿ]+/g);
            if (lat) add(c, 'latin_dans_tgt', `${pid} ${lat.join(' ')} | ${p.tgt}`);
          } else {
            if (p.ro) add(c, 'ro', `${pid} ro inattendu`);
            if (/[Ѐ-ӿ֐-ۿऀ-෿฀-๿぀-ヿ一-鿿가-힯]/.test(p.tgt)) add(c, 'script', `${pid} tgt écriture inattendue: ${p.tgt}`);
          }
          if (/[Ѐ-ӿ֐-ۿऀ-෿฀-๿぀-ヿ一-鿿가-힯]/.test(p.fr)) add(c, 'script', `${pid} fr écriture non latine: ${p.fr}`);
          if (LIT_LANGS.has(c)) {
            if (a === 0 && !(p.lit && p.lit.trim())) add(c, 'lit', `${pid} lit manquant (niveau 1)`);
            if (a > 0 && p.lit) add(c, 'lit', `${pid} lit inattendu (niveau ${a + 1})`);
          } else if (p.lit) add(c, 'lit', `${pid} lit inattendu`);
          const f = p.fr.toLowerCase().replace(/[\s  ]+/g, ' ').trim();
          if (frSeen.has(f)) add(c, 'doublon_fr', `${pid} = ${frSeen.get(f)} : ${p.fr}`); else frSeen.set(f, pid);
          const t = p.tgt.trim();
          if (tgtSeen.has(t) && tgtSeen.get(t).fr !== p.fr) add(c, 'doublon_tgt', `${pid} = ${tgtSeen.get(t).pid} : ${p.tgt} | « ${p.fr} » vs « ${tgtSeen.get(t).fr} »`); else if (!tgtSeen.has(t)) tgtSeen.set(t, { pid, fr: p.fr });
        });
      });
      if (m.totalPhrases !== tot) add(c, 'struct', `${at} totalPhrases=${m.totalPhrases} réel=${tot}`);
    });
  });
}
const kinds = new Set(); Object.values(issues).forEach(o => Object.keys(o).forEach(k => kinds.add(k)));
console.log('RÉSUMÉ (nombre par langue et par type ; doublon_tgt / doublon_fr = simple information : même phrase dans deux leçons)');
for (const c of Object.keys(D)) console.log(c.padEnd(5), [...kinds].map(k => `${k}:${(issues[c] && issues[c][k] || []).length}`).filter(s => !s.endsWith(':0')).join('  ') || 'RAS');
if (process.argv.includes('--json')) require('fs').writeFileSync('structure.json', JSON.stringify(issues, null, 1));
