// Construit www/data/<code>.js à partir des data.js des dépôts d'origine et des dossiers <code>_content.
// Usage : node tools/build_data.js
// Format commun d'une phrase : { fr, tgt, ro?, lit? } ; un module garde ses
// champs id/name/desc/totalPhrases/lessonsCount/lessons ; une leçon : title,
// phrases, tip? { title, example, exampleRo?, lit?, body }.
const fs = require('fs'), vm = require('vm'), path = require('path');
const SRC = {
  de:   ['/home/claude/mon-trajet-en-allemand/www/js/data.js', 'de'],
  en:   [require('path').join(__dirname, 'legacy', 'en_data.js'),  'en'],
  ar:   ['/home/claude/mon-trajet-en-arabe/www/js/data.js',    'ar'],
  es:   ['/home/claude/mon-trajet-en-espagnol/www/js/data.js', 'es'],
  it:   ['/home/claude/mon-trajet-en-italien/www/js/data.js',  'it'],
  ja:   ['/home/claude/mon-trajet-en-japonais/www/js/data.js', 'ja'],
  ptbr: ['/home/claude/mon-trajet-portb/www/js/data.js',       'pt'],
  ptpt: ['/home/claude/mon-trajet-portp/www/js/data.js',       'pt'],
  zh:   ['/home/claude/zh_content/data.js', 'zh'],
  he:   ['/home/claude/he_content/data.js', 'he'],
  hi:   ['/home/claude/hi_content/data.js', 'hi'],
  th:   ['/home/claude/th_content/data.js', 'th'],
  id:   ['/home/claude/id_content/data.js', 'id'],
  vi:   ['/home/claude/vi_content/data.js', 'vi'],
  bn:   ['/home/claude/bn_content/data.js', 'bn'],
};
const out = path.join(__dirname, '..', 'www', 'data');
fs.mkdirSync(out, { recursive: true });
let icons = null;
const ONLY = process.argv.slice(2); // ex. node tools/build_data.js zh he → ne reconstruit que ces langues
for (const [code, [file, key]] of Object.entries(SRC)) {
  if (ONLY.length && !ONLY.includes(code) && icons) continue;
  const src = fs.readFileSync(file, 'utf8');
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(src + ';globalThis.__L = LEVELS; globalThis.__I = ICONS;', ctx);
  if (!icons) icons = ctx.__I;
  let phrases = 0, tips = 0;
  const levels = ctx.__L.map(lv => ({
    id: lv.id, name: lv.name, freeLessonsPerModule: lv.freeLessonsPerModule,
    modules: lv.modules.map(m => ({
      id: m.id, name: m.name, desc: m.desc, totalPhrases: m.totalPhrases, lessonsCount: m.lessonsCount,
      lessons: m.lessons.map(l => {
        if (!l || !l.phrases) return l;
        const lesson = { title: l.title, phrases: l.phrases.map(p => {
          const q = { fr: p.fr, tgt: p[key] };
          if (!q.tgt) throw new Error(code + ': phrase sans cible : ' + p.fr);
          if (p.ro) q.ro = p.ro; if (p.lit) q.lit = p.lit; phrases++; return q;
        }) };
        if (l.tip) { lesson.tip = { title: l.tip.title, example: l.tip.example, body: l.tip.body };
          if (l.tip.exampleRo) lesson.tip.exampleRo = l.tip.exampleRo; if (l.tip.lit) lesson.tip.lit = l.tip.lit; tips++; }
        return lesson;
      })
    }))
  }));
  const js = `/* Mon Trajet — contenu « ${code} » (${phrases} phrases, ${tips} points de grammaire). Fichier généré par tools/build_data.js, ne pas éditer à la main. */\nwindow.MT_DATA = window.MT_DATA || {};\nwindow.MT_DATA['${code}'] = ${JSON.stringify(levels)};\n`;
  fs.writeFileSync(path.join(out, code + '.js'), js);
  console.log(code, phrases, 'phrases', tips, 'tips', Math.round(js.length / 1024) + ' Ko');
}
fs.writeFileSync(path.join(__dirname, '..', 'www', 'js', 'icons.js'), '/* Icônes SVG partagées (extraites de l\'ancien data.js). */\nconst ICONS = ' + JSON.stringify(icons, null, 1) + ';\n');
