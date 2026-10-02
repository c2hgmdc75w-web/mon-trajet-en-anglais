/* ============================================================
   MON TRAJET EN ANGLAIS — logique app
   Flux 100% audio, "sans les mains ni les yeux" : chaque leçon se
   déroule automatiquement du début à la fin uniquement grâce à la
   voix. Une leçon est précompilée en une suite de "segments"
   (parole ou silence), ce qui permet d'avancer/reculer de 10s ou de
   se déplacer sur une barre de progression, tout en gardant le même
   ordre de test (mélangé) d'une navigation à l'autre dans la leçon.
   Pas de reconnaissance vocale : les temps de silence pour répéter
   sont chronométrés, l'app n'écoute jamais la voix de l'utilisateur.
   ============================================================ */

let currentLevel = 0;
let currentModule = 0;
let currentLesson = 0;
let currentProgram = {type:'lesson', mi:0, li:0}; // ou {type:'intro'}
let segments = [];      // segments précompilés de la leçon en cours
let segIndex = 0;       // index du segment en cours de lecture
let elapsedBaseMs = 0;  // temps écoulé (estimé) au début du segment en cours
let playToken = 0;      // identifie un "run" audio ; incrémenté à chaque nouveau départ/saut
let isPaused = false;
let isScrubbing = false;
let voices = [];

const $ = id => document.getElementById(id);

/* ---------- stockage local (progression + achat) ---------- */
function loadState(){
  try{
    const raw = localStorage.getItem('enroute_state');
    return raw ? JSON.parse(raw) : {completed:[], premium:false};
  }catch(e){ return {completed:[], premium:false}; }
}
function saveState(s){ try{ localStorage.setItem('enroute_state', JSON.stringify(s)); }catch(e){} }
let state = loadState();

function showToast(msg){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._tm);
  showToast._tm = setTimeout(()=>t.classList.remove('show'), 1800);
}

function isLessonUnlocked(moduleId, lessonIndex){
  if(state.premium) return true;
  const freeCount = FREE_LESSONS_PER_MODULE[moduleId] || 0;
  return lessonIndex < freeCount;
}
function hasContent(moduleIdx, lessonIndex){
  const l = MODULES[moduleIdx].lessons[lessonIndex];
  return !!(l && l.phrases);
}

/* ---------- numérotation globale des points de grammaire (par niveau) ---------- */
function computeTipNumbers(modules){
  const map = {};
  let n = 0;
  modules.forEach((m, mi)=>{
    m.lessons.forEach((l, li)=>{
      if(l.tip){ n++; map[mi+'-'+li] = n; }
    });
  });
  return map;
}
let TIP_NUMBERS = computeTipNumbers(MODULES);

/* ---------- points de contrôle "Évaluation" : tous les 5 leçons,
   plus une évaluation finale (60 phrases) qui remplace celle de la
   leçon 20 pour éviter la redondance (par niveau) ---------- */
const EVAL_CHECKPOINT_INDICES = [4, 9, 14]; // après les leçons 5, 10, 15 (0-based)
function computeEvalNumbers(modules){
  const map = {};
  let n = 0;
  modules.forEach((m, mi)=>{
    EVAL_CHECKPOINT_INDICES.forEach(anchor=>{
      if(anchor < m.lessonsCount && m.lessons[anchor] && m.lessons[anchor].phrases){
        n++;
        map[mi+'-'+anchor] = {num: n, isFinal: false};
      }
    });
    const finalAnchor = m.lessonsCount - 1;
    if(m.lessons[finalAnchor] && m.lessons[finalAnchor].phrases){
      map[mi+'-'+finalAnchor] = {num: null, isFinal: true};
    }
  });
  return map;
}
let EVAL_NUMBERS = computeEvalNumbers(MODULES);

/* ---------- changement de niveau ---------- */
function switchLevel(idx){
  if(idx === currentLevel || !LEVELS[idx]) return;
  currentLevel = idx;
  MODULES = LEVELS[currentLevel].modules;
  FREE_LESSONS_PER_MODULE = LEVELS[currentLevel].freeLessonsPerModule;
  TIP_NUMBERS = computeTipNumbers(MODULES);
  EVAL_NUMBERS = computeEvalNumbers(MODULES);
  currentModule = 0;
  renderHome();
}

function stripHtml(html){
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
function spokenTipText(tip){
  return `${tip.title}. Par exemple : ${stripHtml(tip.example)}. ${tip.body}`;
}
function shuffleArray(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

/* ---------- HOME ---------- */
function renderLevelTabs(){
  const el = $('levelTabs');
  if(!el) return;
  el.innerHTML = LEVELS.map((lv,i)=>
    `<div class="module-tab level-tab ${i===currentLevel?'active':''}" data-i="${i}">${lv.name}</div>`
  ).join('');
  el.querySelectorAll('.level-tab').forEach(el2=>{
    el2.onclick = ()=>{ switchLevel(parseInt(el2.dataset.i)); };
  });
}

function renderHome(){
  renderLevelTabs();
  const tabsEl = $('moduleTabs');
  tabsEl.innerHTML = MODULES.map((m,i)=>
    `<div class="module-tab ${i===currentModule?'active':''}" data-i="${i}">Module ${i+1} · ${m.name}</div>`
  ).join('');
  tabsEl.querySelectorAll('.module-tab').forEach(el=>{
    el.onclick = ()=>{ currentModule = parseInt(el.dataset.i); renderHome(); };
  });

  const m = MODULES[currentModule];
  const levelId = LEVELS[currentLevel].id;
  const doneCount = state.completed.filter(k=>k.startsWith('lv'+levelId+'-m'+m.id+'-')).length;
  const pct = Math.round((doneCount / m.lessonsCount) * 100);
  $('moduleSummary').innerHTML = `
    <h2>${m.name}</h2>
    <p>${m.desc}</p>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="progress-label">${doneCount}/${m.lessonsCount} leçons · ${m.totalPhrases} phrases au total</div>
  `;

  const listEl = $('lessonList');
  let rows = '';

  // Chapitre d'orientation, avant la toute première leçon du niveau 1 / module 1 uniquement.
  if(currentLevel === 0 && currentModule === 0){
    const introDone = !!state.introDone;
    rows += `<div class="lesson-row intro-row" data-intro="1">
      <div class="lesson-icon ${introDone?'done':''}">${
        introDone ? ICONS.check.replace('stroke-width="2"','stroke="#0B2116" stroke-width="2.5"')
        : ICONS.headphones.replace('stroke-width="2"','stroke="var(--target)" stroke-width="2"')
      }</div>
      <div class="lesson-text">
        <div class="lesson-title">Bien commencer ensemble <span class="free-tag">GRATUIT</span></div>
        <div class="lesson-sub">Un mot avant de démarrer — à propos de ma voix</div>
      </div>
    </div>`;
  }

  for(let i=0;i<m.lessonsCount;i++){
    const lesson = m.lessons[i];
    const content = hasContent(currentModule, i);
    const unlocked = isLessonUnlocked(m.id, i);
    const key = 'lv'+levelId+'-m'+m.id+'-l'+i;
    const done = state.completed.includes(key);
    const start = i*10+1, end = i*10+10;
    const playable = content && unlocked;
    rows += `<div class="lesson-row ${playable?'':'locked'}" data-i="${i}">
      <div class="lesson-icon ${done?'done':''}">${
        done ? ICONS.check.replace('stroke-width="2"','stroke="#0B2116" stroke-width="2.5"')
        : (!content ? ICONS.lock
          : (!unlocked ? ICONS.lock
            : ICONS.headphones.replace('stroke-width="2"','stroke="var(--text-muted)" stroke-width="2"')))
      }</div>
      <div class="lesson-text">
        <div class="lesson-title">Leçon ${i+1}${lesson.title? ' · '+lesson.title:''} ${unlocked && content ? '<span class="free-tag">GRATUIT</span>':''}</div>
        <div class="lesson-sub">Phrases ${start}–${end}${content? (unlocked? '' : ' · version complète'):' · bientôt disponible'}</div>
      </div>
    </div>`;

    // Point de grammaire : affiché juste après la leçon qui le déclenche.
    if(content && lesson.tip){
      const tipNum = TIP_NUMBERS[currentModule+'-'+i] || '';
      const tipKey = 'lv'+levelId+'-tip-'+currentModule+'-'+i;
      const tipDone = state.completed.includes(tipKey);
      rows += `<div class="lesson-row tip-row ${unlocked?'':'locked'}" data-tip-mi="${currentModule}" data-tip-li="${i}">
        <div class="lesson-icon ${tipDone?'done':''}">${
          tipDone ? ICONS.check.replace('stroke-width="2"','stroke="#0B2116" stroke-width="2.5"')
          : (!unlocked ? ICONS.lock
            : ICONS.headphones.replace('stroke-width="2"','stroke="var(--context)" stroke-width="2"'))
        }</div>
        <div class="lesson-text">
          <div class="lesson-title">Point grammaire ${tipNum} ${unlocked ? '<span class="free-tag">GRATUIT</span>':''}</div>
          <div class="lesson-sub">${lesson.tip.title}</div>
        </div>
      </div>`;
    }

    // Évaluation : révision périodique, affichée juste après la leçon qui
    // la déclenche (et après son éventuel point de grammaire). Le contrôle
    // de fin de module 20 est fusionné avec l'évaluation finale.
    const evalInfo = content ? EVAL_NUMBERS[currentModule+'-'+i] : null;
    if(evalInfo){
      const evalKey = 'lv'+levelId+'-eval-'+currentModule+'-'+i;
      const evalDone = state.completed.includes(evalKey);
      const evalLabel = evalInfo.isFinal ? 'Évaluation finale' : `Évaluation ${evalInfo.num}`;
      const evalSub = evalInfo.isFinal
        ? '60 phrases choisies parmi tout le module'
        : '20 phrases choisies parmi les 5 dernières leçons';
      rows += `<div class="lesson-row eval-row ${unlocked?'':'locked'}" data-eval-mi="${currentModule}" data-eval-anchor="${i}">
        <div class="lesson-icon ${evalDone?'done':''}">${
          evalDone ? ICONS.check.replace('stroke-width="2"','stroke="#0B2116" stroke-width="2.5"')
          : (!unlocked ? ICONS.lock
            : ICONS.repeat.replace('stroke-width="2"','stroke="var(--speak)" stroke-width="2"'))
        }</div>
        <div class="lesson-text">
          <div class="lesson-title">${evalLabel} ${unlocked ? '<span class="free-tag">GRATUIT</span>':''}</div>
          <div class="lesson-sub">${evalSub}</div>
        </div>
      </div>`;
    }
  }
  listEl.innerHTML = rows;
  listEl.querySelectorAll('.lesson-row').forEach(el=>{
    el.onclick = ()=>{
      if(el.dataset.intro === '1'){ startIntro(); return; }
      if(el.dataset.tipMi !== undefined){
        const mi = parseInt(el.dataset.tipMi);
        const li = parseInt(el.dataset.tipLi);
        if(!isLessonUnlocked(MODULES[mi].id, li)){ openPaywall(); return; }
        startTip(mi, li);
        return;
      }
      if(el.dataset.evalMi !== undefined){
        const mi = parseInt(el.dataset.evalMi);
        const anchor = parseInt(el.dataset.evalAnchor);
        if(!isLessonUnlocked(MODULES[mi].id, anchor)){ openPaywall(); return; }
        startEval(mi, anchor);
        return;
      }
      const i = parseInt(el.dataset.i);
      if(!hasContent(currentModule, i)){ showToast('Cette leçon arrive bientôt ✨'); return; }
      if(!isLessonUnlocked(MODULES[currentModule].id, i)){ openPaywall(); return; }
      startLesson(currentModule, i);
    };
  });
}

/* ---------- voix ---------- */
function pickVoice(lang){
  if(!voices.length) voices = speechSynthesis.getVoices();
  const candidates = voices.filter(v=>v.lang && v.lang.toLowerCase().startsWith(lang));
  if(!candidates.length) return null;
  // Préfère une voix "Enhanced/Premium/Neural" si le système en propose une
  // (sur iPhone : Réglages > Accessibilité > Contenu énoncé > Voix > Français
  // > télécharger une voix "Améliorée" pour un rendu beaucoup moins robotique).
  const score = v=>{
    const n = (v.name||'').toLowerCase();
    let s = 0;
    if(n.includes('enhanced') || n.includes('premium') || n.includes('neural') || n.includes('amélior')) s += 10;
    if(n.includes('siri')) s += 6;
    if(v.localService) s += 2;
    return s;
  };
  return candidates.slice().sort((a,b)=>score(b)-score(a))[0];
}

/* ---------- construction d'une leçon en segments (parole / silence) ---------- */
function estimateSpeechMs(text, lang, rate){
  const baseCharsPerSec = lang === 'fr' ? 14 : 16;
  const cps = baseCharsPerSec * (rate || 1);
  return Math.round(Math.max(500, (text.length / cps) * 1000) + 250);
}
function S(text, lang, rate, label, ringColor, ringIcon, pulse, frDisplay, enDisplay, extra){
  return Object.assign({
    type:'speak', text, lang, rate: rate||1, label,
    ringColor, ringIcon, pulse: !!pulse,
    frDisplay: frDisplay||'', enDisplay: enDisplay||'',
    estMs: estimateSpeechMs(text, lang, rate||1)
  }, extra||{});
}
function W(ms, label, ringColor, ringIcon, pulse, frDisplay, enDisplay, extra){
  return Object.assign({
    type:'wait', ms, label,
    ringColor, ringIcon, pulse: !!pulse,
    frDisplay: frDisplay||'', enDisplay: enDisplay||''
  }, extra||{});
}

/* ---------- détection de plateforme (iOS / Android / autre) ---------- */
function detectPlatform(){
  const ua = navigator.userAgent || navigator.vendor || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad récent qui s'annonce comme un Mac
  if(isIOS) return 'ios';
  if(/Android/.test(ua)) return 'android';
  return 'other';
}

/* ---------- chapitre "Bien commencer ensemble" ---------- */
function buildIntroSegments(){
  const platform = detectPlatform();
  const CTX = 'var(--context)', TGT = 'var(--target)';
  const segs = [];

  segs.push(S("Bien commencer ensemble.", 'fr', 1, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));
  segs.push(W(500, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));

  segs.push(S("Nous allons commencer à travailler ensemble. Mais ma voix dépend de toi.", 'fr', 1, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));
  segs.push(W(400, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));

  segs.push(S("Si tu trouves ma voix trop robotique, sache que tu peux l'améliorer directement dans les réglages de ton téléphone.", 'fr', 1, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));
  segs.push(W(500, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));

  let pathText;
  if(platform === 'ios'){
    pathText = "Tu es sur iPhone. Voici le chemin : ouvre l'application Réglages. Va dans Accessibilité. Puis Contenu énoncé. Puis Voix. Puis Français. Et télécharge une voix marquée Améliorée, ou Premium, si elle est proposée. Une fois téléchargée, elle sera automatiquement utilisée ici, sans rien à faire de plus.";
  } else if(platform === 'android'){
    pathText = "Tu es sur Android. Voici le chemin, qui peut varier légèrement selon la marque de ton téléphone : ouvre les Paramètres. Va dans Système, ou Paramètres généraux. Puis Langues et saisie. Puis Synthèse vocale, ou Text-to-speech. Choisis le moteur Google. Installe les données vocales en français. Et choisis, si elle est proposée, une voix Réseau plutôt qu'une voix Compacte, pour un rendu plus naturel.";
  } else {
    pathText = "La qualité de la voix dépend des voix installées sur ton appareil ou ton navigateur. Regarde du côté des réglages d'accessibilité ou de synthèse vocale pour en installer une meilleure, si une est disponible.";
  }
  segs.push(S(pathText, 'fr', 1, 'Comment améliorer ma voix', CTX, 'headphones', false, '', ''));
  segs.push(W(800, 'Comment améliorer ma voix', CTX, 'headphones', false, '', ''));

  segs.push(S("Cette étape est totalement facultative, tu peux commencer tout de suite si tu préfères. On y va !", 'fr', 1, 'On y va', TGT, 'speaker', false, '', ''));
  segs.push(W(500, 'On y va', TGT, 'speaker', false, '', ''));

  return segs;
}

// Segments d'un point de grammaire seul (réutilisés à la fois en fin de
// leçon automatiquement, et pour une lecture autonome depuis la liste).
function buildTipSegments(tip, tipNum){
  const CTX = 'var(--context)';
  const tx = {phase:'tip', tipData: tip, tipNum};
  return [
    S(`Point grammaire ${tipNum}.`, 'fr', 1, `Point grammaire ${tipNum}`, CTX, 'headphones', false, tip.title, '', tx),
    W(400, `Point grammaire ${tipNum}`, CTX, 'headphones', false, tip.title, '', tx),
    S(spokenTipText(tip), 'fr', 1, `Point grammaire ${tipNum}`, CTX, 'headphones', false, tip.title, '', tx),
    W(1500, `Point grammaire ${tipNum}`, CTX, 'headphones', false, tip.title, '', tx)
  ];
}

// Segments d'une "Évaluation" : révision aléatoire des phrases des 5
// dernières leçons (ou de tout le module pour l'évaluation finale),
// dans le même format que le Test 2 (mêmes temps de réponse et de
// répétition).
function buildEvalSegments(mi, anchor, isFinal, evalLabel){
  const m = MODULES[mi];
  const CTX = 'var(--context)', TGT = 'var(--target)', SPK = 'var(--speak)';
  let pool = [];
  if(isFinal){
    m.lessons.forEach(l=>{ if(l && l.phrases) pool = pool.concat(l.phrases); });
  } else {
    const startIdx = Math.max(0, anchor - 4);
    for(let i=startIdx;i<=anchor;i++){
      const l = m.lessons[i];
      if(l && l.phrases) pool = pool.concat(l.phrases);
    }
  }
  const sampleSize = isFinal ? 60 : 20;
  const chosen = shuffleArray(pool).slice(0, Math.min(sampleSize, pool.length));

  const segs = [];
  const introText = isFinal
    ? "Évaluation finale : il est temps de réviser tout le module."
    : "Évaluation : il est temps de réviser nos 5 dernières leçons.";
  segs.push(S(introText, 'fr', 1, evalLabel, SPK, 'repeat', false, '', ''));
  segs.push(W(1000, evalLabel, SPK, 'repeat', false, '', ''));
  segs.push(S("Essaie de traduire les phrases suivantes.", 'fr', 1, evalLabel, SPK, 'repeat', false, '', ''));
  segs.push(W(700, evalLabel, SPK, 'repeat', false, '', ''));

  chosen.forEach((p,i)=>{
    const repeatMs = Math.max(2200, p.en.length*80) + 3000; // même formule que le Test 2
    const ex = {idx:i, total: chosen.length};
    segs.push(S(p.fr, 'fr', 1, `${evalLabel} — traduis en anglais`, CTX, 'headphones', false, p.fr, '···', ex));
    segs.push(W(repeatMs, `${evalLabel} — à toi de répondre`, SPK, 'repeat', true, p.fr, '···', ex));
    segs.push(S(p.en, 'en', 0.85, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(400 + 2000, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.en, ex)); // même écart que le Test 2 (+2s)
    segs.push(S(p.en, 'en', 0.85, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(400 + 2000, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.en, ex)); // même durée que l'écart entre les 2 répétitions
  });

  const closingText = isFinal
    ? "Bravo, tu as terminé l'évaluation finale de ce module."
    : "Bravo, tu as terminé cette évaluation.";
  segs.push(S(closingText, 'fr', 1, 'Évaluation terminée', SPK, 'check', false, '', ''));
  segs.push(W(1500, 'Évaluation terminée', SPK, 'check', false, '', ''));

  return segs;
}

function buildLessonSegments(mi, li){
  const m = MODULES[mi];
  const lesson = m.lessons[li];
  const CTX = 'var(--context)', TGT = 'var(--target)', SPK = 'var(--speak)';
  const segs = [];

  // 1. Intro
  segs.push(S(`Leçon ${li+1}. ${lesson.title}.`, 'fr', 1, 'Introduction', CTX, 'headphones', false, lesson.title, ''));
  segs.push(W(400, 'Introduction', CTX, 'headphones', false, lesson.title, ''));

  // 2. Aperçu de toutes les phrases françaises
  segs.push(S("Voici les phrases que l'on va apprendre.", 'fr', 1, 'Aperçu des phrases', CTX, 'headphones', false, '', ''));
  segs.push(W(500, 'Aperçu des phrases', CTX, 'headphones', false, '', ''));
  lesson.phrases.forEach((p,i)=>{
    const ex = {idx:i, total: lesson.phrases.length};
    segs.push(S(p.fr, 'fr', 1, 'Aperçu des phrases', CTX, 'headphones', false, p.fr, '', ex));
    segs.push(W(350, 'Aperçu des phrases', CTX, 'headphones', false, p.fr, '', ex));
  });
  segs.push(W(1800, 'Aperçu des phrases', CTX, 'headphones', false, '', ''));
  segs.push(S("C'est parti.", 'fr', 1, 'On y va', TGT, 'speaker', false, '', ''));
  segs.push(W(500, 'On y va', TGT, 'speaker', false, '', ''));

  // 3. Apprentissage : FR une fois, EN deux fois avec temps de répétition (+3s)
  lesson.phrases.forEach((p,i)=>{
    const repeatMs = Math.max(2200, p.en.length*80) + 3000;
    const ex = {idx:i, total: lesson.phrases.length};
    segs.push(S(p.fr, 'fr', 1, 'Écoute en français', CTX, 'headphones', false, p.fr, '', ex));
    segs.push(W(300, 'Écoute en français', CTX, 'headphones', false, p.fr, '', ex));
    segs.push(S(p.en, 'en', 0.85, 'Écoute en anglais', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(repeatMs, 'À toi de répéter', SPK, 'repeat', true, p.fr, p.en, ex));
    segs.push(S(p.en, 'en', 0.85, 'Encore une fois', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(repeatMs, 'À toi de répéter', SPK, 'repeat', true, p.fr, p.en, ex));
  });

  // 4. Test 1 : ordre mélangé — pause de réflexion, puis réponse x2
  //    (+3s entre les deux répétitions de la réponse, comme demandé)
  segs.push(S("Tu vas tenter de répéter les phrases. Je te les donne dans un ordre différent.", 'fr', 1, 'Phase de test 1', SPK, 'repeat', false, '', ''));
  segs.push(W(700, 'Phase de test 1', SPK, 'repeat', false, '', ''));
  const shuffled = shuffleArray(lesson.phrases);
  shuffled.forEach((p,i)=>{
    const repeatMs = Math.max(2200, p.en.length*80) + 3000;
    const ex = {idx:i, total: shuffled.length};
    segs.push(S(p.fr, 'fr', 1, 'Test 1 — traduis en anglais', CTX, 'headphones', false, p.fr, '···', ex));
    segs.push(W(repeatMs, 'Test 1 — à toi de répondre', SPK, 'repeat', true, p.fr, '···', ex));
    segs.push(S(p.en, 'en', 0.85, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(400 + 3000, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(S(p.en, 'en', 0.85, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(400 + 3000, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.en, ex)); // même durée que l'écart entre les 2 répétitions
  });

  // 5. Test 2 : ordre d'origine — même principe (+2s entre les deux répétitions)
  segs.push(S("Maintenant, la phase de test. Essaie de traduire chaque phrase en anglais.", 'fr', 1, 'Phase de test 2', SPK, 'repeat', false, '', ''));
  segs.push(W(700, 'Phase de test 2', SPK, 'repeat', false, '', ''));
  lesson.phrases.forEach((p,i)=>{
    const repeatMs = Math.max(2200, p.en.length*80) + 3000;
    const ex = {idx:i, total: lesson.phrases.length};
    segs.push(S(p.fr, 'fr', 1, 'Test 2 — traduis en anglais', CTX, 'headphones', false, p.fr, '···', ex));
    segs.push(W(repeatMs, 'Test 2 — à toi de répondre', SPK, 'repeat', true, p.fr, '···', ex));
    segs.push(S(p.en, 'en', 0.85, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(400 + 2000, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(S(p.en, 'en', 0.85, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.en, ex));
    segs.push(W(400 + 2000, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.en, ex)); // même durée que l'écart entre les 2 répétitions
  });

  // 6. Clôture
  const closingText = li === 0
    ? "Bravo, tu as fini la première leçon. Ce n'est jamais facile de commencer une nouvelle langue, mais tu verras, au fil des leçons, ça va être de plus en plus facile. Il suffit de pratiquer régulièrement."
    : "Ça y est, tu as fini la leçon. On va passer à la leçon suivante.";
  segs.push(S(closingText, 'fr', 1, 'Leçon terminée', SPK, 'check', false, '', ''));
  segs.push(W(3000, 'Leçon terminée', SPK, 'check', false, '', ''));

  // 7. Point de grammaire, présenté et lu comme une mini-leçon audio
  if(lesson.tip){
    const tipNum = TIP_NUMBERS[mi+'-'+li] || '';
    segs.push(...buildTipSegments(lesson.tip, tipNum));
  }

  return segs;
}

function computeSegmentStarts(){
  let t = 0;
  return segments.map(s=>{ const start=t; t += (s.type==='speak'? s.estMs : s.ms); return start; });
}
function totalDurationMs(){
  return segments.reduce((sum,s)=> sum + (s.type==='speak'? s.estMs : s.ms), 0);
}

/* ---------- affichage de la scène (glanceable, mais jamais requis) ---------- */
function setStage(phaseText, idxInPhase, totalInPhase, frText, enText, ringColor, ringIcon, pulse){
  if(typeof idxInPhase === 'number' && typeof totalInPhase === 'number'){
    $('sessCount').textContent = `${phaseText} · ${idxInPhase+1}/${totalInPhase}`;
    $('dots').innerHTML = Array.from({length: totalInPhase}).map((_,i)=>
      `<div class="dot ${i<idxInPhase?'past':(i===idxInPhase?'active':'')}"></div>`
    ).join('');
  } else {
    $('sessCount').textContent = phaseText;
    $('dots').innerHTML = '';
  }
  $('phraseFr').textContent = frText || '';
  $('phraseEn').textContent = enText || '';
  setRing(ringColor, ringIcon, phaseText, pulse);
}
function setRing(color, iconKey, label, pulse){
  const ring = $('ring');
  ring.style.setProperty('--ring-color', color);
  ring.classList.toggle('pulse', !!pulse);
  $('ringIcon').innerHTML = ICONS[iconKey].replace('stroke-width="2"', `stroke="${color}" stroke-width="2"`);
  $('phaseLabel').textContent = label;
  $('phaseLabel').style.setProperty('--ring-color', color);
}
function setPlayIcon(paused){
  $('playIcon').innerHTML = paused
    ? '<path d="M8 5v14l11-7z"/>'
    : '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>';
}
function showTipCard(tip, tipNum){
  $('tipTitle').textContent = `Point grammaire ${tipNum} — ${tip.title}`;
  $('tipExample').innerHTML = tip.example;
  $('tipBody').textContent = tip.body;
  $('tipOverlay').classList.add('show');
}
function hideTipCard(){
  $('tipOverlay').classList.remove('show');
}
function updateUIForSegment(seg){
  if(seg.phase === 'tip' && seg.tipData){
    showTipCard(seg.tipData, seg.tipNum);
  } else {
    hideTipCard();
  }
  setStage(seg.label, seg.idx, seg.total, seg.frDisplay, seg.enDisplay, seg.ringColor, seg.ringIcon, seg.pulse);
}

function formatTime(ms){
  const s = Math.max(0, Math.round(ms/1000));
  const m = Math.floor(s/60);
  const sec = s % 60;
  return `${m}:${sec<10?'0':''}${sec}`;
}
function updateScrubberLive(ms){
  if(isScrubbing) return;
  const total = Math.max(1, totalDurationMs());
  const scrubber = $('scrubber');
  scrubber.max = String(Math.round(total));
  scrubber.value = String(Math.round(Math.min(ms, total)));
  $('timeElapsed').textContent = formatTime(ms);
  $('timeTotal').textContent = formatTime(total);
}

function markLessonComplete(mi, li){
  const m = MODULES[mi];
  const key = 'lv'+LEVELS[currentLevel].id+'-m'+m.id+'-l'+li;
  if(!state.completed.includes(key)){ state.completed.push(key); saveState(state); }
}

/* ---------- synthèse vocale : navigateur (Web Speech API) vs app native ----------
   La WebView Android/iOS de Capacitor n'implémente PAS l'API navigateur
   `speechSynthesis` (elle n'existe même pas comme identifiant global, d'où
   un ReferenceError si on l'appelle directement). En app native, on passe
   donc par un vrai plugin Capacitor de synthèse vocale
   (@capacitor-community/text-to-speech), qui utilise le moteur TTS natif
   d'Android/iOS. En navigateur (tests via npx serve), on garde
   speechSynthesis comme avant. */
function hasWebSpeech(){
  return typeof window !== 'undefined' && ('speechSynthesis' in window);
}
function getTTSPlugin(){
  return (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) || null;
}
async function cancelSpeech(){
  if(isNativeApp()){
    const tts = getTTSPlugin();
    if(tts){ try{ await tts.stop(); }catch(e){} }
  } else if(hasWebSpeech()){
    try{ speechSynthesis.cancel(); }catch(e){}
  }
}
// Attend tant que la lecture est en pause, avant de démarrer un nouveau
// segment. Sur navigateur, speechSynthesis.pause()/resume() gèle déjà
// l'utterance en cours ; cette attente couvre surtout le cas natif, où le
// plugin TTS n'a pas de vraie pause (la phrase en cours va jusqu'à son
// terme, puis on attend ici avant d'enchaîner sur le segment suivant).
function waitWhilePaused(token){
  return new Promise(resolve=>{
    const tick = ()=>{
      if(token !== playToken || !isPaused){ resolve(); return; }
      setTimeout(tick, 150);
    };
    tick();
  });
}

/* ---------- primitives audio interruptibles ---------- */
function speakSeg(seg, token){
  return new Promise(async resolve=>{
    if(token !== playToken){ resolve(); return; }
    const lang = seg.lang === 'fr' ? 'fr-FR' : 'en-US';

    if(isNativeApp()){
      const tts = getTTSPlugin();
      if(!tts){ resolve(); return; }
      try{
        await tts.speak({ text: seg.text, lang, rate: seg.rate || 1, category: 'ambient' });
      }catch(e){ /* on continue malgré une éventuelle erreur du plugin */ }
      resolve();
      return;
    }

    if(!hasWebSpeech()){ resolve(); return; }
    try{
      const u = new SpeechSynthesisUtterance(seg.text);
      u.lang = lang;
      const v = pickVoice(seg.lang);
      if(v) u.voice = v;
      u.rate = seg.rate || 1;
      u.onend = ()=>resolve();
      u.onerror = ()=>resolve();
      speechSynthesis.speak(u);
    }catch(e){ resolve(); }
  });
}
// wait "pausable" : le compte à rebours est simplement suspendu si isPaused,
// et met à jour la barre de progression en temps réel pendant les silences.
function waitSeg(seg, token){
  return new Promise(resolve=>{
    let remaining = seg.ms;
    const stepMs = 150;
    const tick = ()=>{
      if(token !== playToken){ resolve(); return; }
      if(isPaused){ setTimeout(tick, stepMs); return; }
      remaining -= stepMs;
      const elapsedInSeg = seg.ms - Math.max(remaining, 0);
      updateScrubberLive(elapsedBaseMs + elapsedInSeg);
      if(remaining <= 0){ resolve(); return; }
      setTimeout(tick, stepMs);
    };
    setTimeout(tick, stepMs);
  });
}

/* ---------- lecture d'une leçon, depuis un segment donné ---------- */
async function playFrom(startIndex){
  playToken++;
  const token = playToken;
  cancelSpeech(); // coupe immédiatement toute phrase en cours (leçon/point/évaluation précédent)
  isPaused = false;
  setPlayIcon(false);
  segIndex = startIndex;

  const starts = computeSegmentStarts();
  elapsedBaseMs = starts[startIndex] || 0;
  updateScrubberLive(elapsedBaseMs);

  while(segIndex < segments.length){
    if(token !== playToken) return;
    await waitWhilePaused(token);
    if(token !== playToken) return;
    const seg = segments[segIndex];
    updateUIForSegment(seg);

    if(seg.type === 'speak'){
      await speakSeg(seg, token);
      if(token !== playToken) return;
      elapsedBaseMs += seg.estMs;
    } else {
      await waitSeg(seg, token);
      if(token !== playToken) return;
      elapsedBaseMs += seg.ms;
    }
    updateScrubberLive(elapsedBaseMs);
    segIndex++;
  }

  if(token !== playToken) return;
  onProgramFinished(token);
}

function onProgramFinished(token){
  if(token !== playToken) return;
  if(currentProgram.type === 'intro'){
    state.introDone = true;
    saveState(state);
    startLesson(0, 0); // enchaîne directement sur la toute première leçon, gratuite
  } else if(currentProgram.type === 'tip'){
    const key = 'lv'+LEVELS[currentLevel].id+'-tip-'+currentProgram.mi+'-'+currentProgram.li;
    if(!state.completed.includes(key)){ state.completed.push(key); saveState(state); }
    closeSession();
    showToast('Point de grammaire terminé ✓');
  } else if(currentProgram.type === 'eval'){
    const key = 'lv'+LEVELS[currentLevel].id+'-eval-'+currentProgram.mi+'-'+currentProgram.anchor;
    if(!state.completed.includes(key)){ state.completed.push(key); saveState(state); }
    closeSession();
    showToast('Évaluation terminée ✓');
  } else {
    markLessonComplete(currentProgram.mi, currentProgram.li);
    goToNextLessonOrStop(currentProgram.mi, currentProgram.li, token);
  }
}

function startIntro(){
  currentProgram = {type:'intro'};
  segments = buildIntroSegments();

  $('home').style.display = 'none';
  $('session').style.display = 'flex';
  hideTipCard();
  setPlayIcon(false);
  $('sessName').textContent = 'Bien commencer ensemble';

  playFrom(0);
}

// Lecture autonome d'un point de grammaire depuis la liste (indépendamment
// du déroulé automatique qui le joue aussi à la fin de sa leçon associée).
function startTip(mi, li){
  const lesson = MODULES[mi].lessons[li];
  if(!lesson || !lesson.tip) return;
  const tipNum = TIP_NUMBERS[mi+'-'+li] || '';

  currentProgram = {type:'tip', mi, li};
  segments = buildTipSegments(lesson.tip, tipNum);

  $('home').style.display = 'none';
  $('session').style.display = 'flex';
  hideTipCard();
  setPlayIcon(false);
  $('sessName').textContent = `Point grammaire ${tipNum}`;

  playFrom(0);
}

// Lecture d'une "Évaluation" : révision aléatoire des leçons précédentes.
function startEval(mi, anchor){
  const info = EVAL_NUMBERS[mi+'-'+anchor];
  if(!info) return;
  const evalLabel = info.isFinal ? 'Évaluation finale' : `Évaluation ${info.num}`;

  currentProgram = {type:'eval', mi, anchor};
  segments = buildEvalSegments(mi, anchor, info.isFinal, evalLabel);

  $('home').style.display = 'none';
  $('session').style.display = 'flex';
  hideTipCard();
  setPlayIcon(false);
  $('sessName').textContent = `${MODULES[mi].name} · ${evalLabel}`;

  playFrom(0);
}

function startLesson(mi, li){
  currentModule = mi; currentLesson = li;
  currentProgram = {type:'lesson', mi, li};
  segments = buildLessonSegments(mi, li);

  $('home').style.display = 'none';
  $('session').style.display = 'flex';
  hideTipCard();
  setPlayIcon(false);
  const m = MODULES[mi];
  const lesson = m.lessons[li];
  $('sessName').textContent = `${m.name} · Leçon ${li+1}${lesson.title? ' · '+lesson.title:''}`;

  playFrom(0);
}

function goToNextLessonOrStop(mi, li, token){
  if(token !== playToken) return;
  const m = MODULES[mi];
  const nextLi = li + 1;
  if(nextLi < m.lessonsCount && hasContent(mi, nextLi)){
    if(isLessonUnlocked(m.id, nextLi)){
      startLesson(mi, nextLi);
    } else {
      closeSession();
      openPaywall();
    }
  } else {
    closeSession();
    showToast(nextLi >= m.lessonsCount ? 'Bravo, tu as terminé ce module ! 🎉' : 'La suite arrive bientôt ✨');
  }
}

function closeSession(){
  try{
    playToken++; // invalide tout enchaînement speak()/wait() en cours
    cancelSpeech();
    isPaused = false;
    $('session').style.display = 'none';
    $('home').style.display = 'block';
    renderHome();
  }catch(e){
    // Filet de sécurité : si quelque chose casse ici, on le voit au lieu
    // d'avoir un écran figé sans aucune explication.
    try{ showToast('Erreur retour : ' + (e && e.message ? e.message : e)); }catch(e2){}
    try{ $('session').style.display = 'none'; $('home').style.display = 'block'; }catch(e3){}
  }
}

/* ---------- navigation ±10s / barre de défilement ---------- */
function seekToMs(targetMs){
  if(!segments.length) return;
  const starts = computeSegmentStarts();
  const total = totalDurationMs();
  targetMs = Math.max(0, Math.min(targetMs, total));
  let idx = 0;
  for(let i=0;i<starts.length;i++){
    if(starts[i] <= targetMs) idx = i; else break;
  }
  cancelSpeech();
  playFrom(idx);
}
function skipBy(deltaMs){
  if(!segments.length) return;
  const starts = computeSegmentStarts();
  const current = starts[segIndex] !== undefined ? starts[segIndex] : elapsedBaseMs;
  seekToMs(current + deltaMs);
}

/* ---------- PAYWALL / ACHAT INTÉGRÉ (RevenueCat) ----------
   RevenueCat gère StoreKit (iOS) et Play Billing (Android) derrière une
   seule API, via le plugin Capacitor "@revenuecat/purchases-capacitor".
   Tant que l'app tourne dans un navigateur normal (comme pendant tes
   tests avec npx serve), window.Capacitor n'existe pas : on retombe
   alors automatiquement sur le stub, pour continuer à pouvoir tester
   sans payer. Le vrai flux ne s'active QUE dans l'app compilée. */

// TODO (à remplir une fois les comptes créés) :
// - REVENUECAT_API_KEY_IOS / ANDROID : clés publiques "App-specific"
//   données par RevenueCat (Project settings > API keys), une par store.
// - ENTITLEMENT_ID : l'identifiant d'"entitlement" créé dans RevenueCat
//   (ex. "premium"), qui doit être rattaché au produit des deux stores.
// - PRODUCT_ID : l'identifiant du produit "version complète" créé à
//   l'IDENTIQUE dans App Store Connect ET Google Play Console.
const REVENUECAT_API_KEY_IOS = 'appl_qNDcGongiAZkuJLEfSPhEjMlQDg';
const REVENUECAT_API_KEY_ANDROID = 'TODO_REVENUECAT_ANDROID_KEY';
const ENTITLEMENT_ID = 'mon_trajet_pro';
const PRODUCT_ID = 'version_complete';

function isNativeApp(){
  return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
}
function getPurchasesPlugin(){
  return (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Purchases) || null;
}

// À appeler une fois au démarrage de l'app (voir tout en bas du fichier).
// Configure RevenueCat puis vérifie si l'utilisateur a déjà un achat actif
// (réinstallation, nouvel appareil...), sans jamais rien débloquer sans
// confirmation réelle du store.
async function initPurchases(){
  if(!isNativeApp()) return; // navigateur = mode test, on garde le stub
  const Purchases = getPurchasesPlugin();
  if(!Purchases) return;
  try{
    const platform = window.Capacitor.getPlatform(); // 'ios' | 'android'
    const apiKey = platform === 'ios' ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;
    await Purchases.configure({ apiKey });
    const { customerInfo } = await Purchases.getCustomerInfo();
    applyCustomerInfo(customerInfo);
  }catch(e){ /* pas de connexion, ou clé pas encore configurée : on reste sur l'état local existant */ }
}
function applyCustomerInfo(customerInfo){
  const active = !!(customerInfo && customerInfo.entitlements && customerInfo.entitlements.active && customerInfo.entitlements.active[ENTITLEMENT_ID]);
  if(active !== state.premium){
    state.premium = active;
    saveState(state);
    renderHome();
  }
}

function openPaywall(){ $('paywall').classList.add('show'); }
function closePaywall(){ $('paywall').classList.remove('show'); }

// Déverrouillage LOCAL uniquement — n'est appelé qu'après confirmation
// réelle du store (achat ou restauration) en app native, ou directement
// en mode test navigateur (aucun vrai paiement n'existe dans ce cas).
function unlockPremium(){
  state.premium = true;
  saveState(state);
  closePaywall();
  renderHome();
  showToast('Version complète débloquée 🎉');
}

async function buyPremium(){
  if(!isNativeApp()){
    // Mode test navigateur : pas de vrai paiement possible ici.
    unlockPremium();
    return;
  }
  const Purchases = getPurchasesPlugin();
  if(!Purchases){ showToast("Le module d'achat n'est pas disponible."); return; }
  try{
    const offerings = await Purchases.getOfferings();
    const pkg = offerings && offerings.current && offerings.current.availablePackages
      ? offerings.current.availablePackages.find(p => p.product && p.product.identifier === PRODUCT_ID) || offerings.current.availablePackages[0]
      : null;
    if(!pkg){ showToast("Produit indisponible pour le moment."); return; }
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
    applyCustomerInfo(customerInfo);
    if(state.premium){ closePaywall(); showToast('Version complète débloquée 🎉'); }
  }catch(e){
    if(e && e.userCancelled) return; // l'utilisateur a annulé, rien à dire
    showToast("L'achat n'a pas pu aboutir. Réessaie dans un instant.");
  }
}
async function restorePremium(){
  if(!isNativeApp()){
    showToast('Aucun achat à restaurer (mode test navigateur).');
    return;
  }
  const Purchases = getPurchasesPlugin();
  if(!Purchases){ showToast("Le module d'achat n'est pas disponible."); return; }
  try{
    const { customerInfo } = await Purchases.restorePurchases();
    applyCustomerInfo(customerInfo);
    showToast(state.premium ? 'Achat restauré ✓' : 'Aucun achat trouvé pour ce compte.');
    if(state.premium) closePaywall();
  }catch(e){
    showToast("La restauration n'a pas pu aboutir. Réessaie dans un instant.");
  }
}

/* ---------- CONTRÔLES ---------- */
// Bouton retour : bindé en dur en plus du .onclick habituel, avec un
// verrou anti-double-déclenchement, au cas où le WebView Android émette
// à la fois un événement touch et un événement click pour le même tap.
(function bindBackBtn(){
  const btn = $('backBtn');
  if(!btn) return;
  let lastFire = 0;
  const fire = (ev)=>{
    const now = Date.now();
    if(now - lastFire < 400) return; // anti-doublon
    lastFire = now;
    if(ev && ev.preventDefault) ev.preventDefault();
    closeSession();
  };
  btn.onclick = fire;
  btn.addEventListener('touchend', fire, {passive:false});
})();

$('playPauseBtn').onclick = ()=>{
  isPaused = !isPaused;
  setPlayIcon(isPaused);
  // Sur navigateur, on peut vraiment geler/reprendre l'utterance en cours.
  // Sur app native, le plugin TTS n'a pas de pause : la phrase en cours va
  // jusqu'à son terme, puis waitWhilePaused() bloque avant le segment
  // suivant (voir plus haut).
  if(!isNativeApp() && hasWebSpeech()){
    try{
      if(isPaused){ speechSynthesis.pause(); } else { speechSynthesis.resume(); }
    }catch(e){}
  }
};

// Précédent / Suivant = "un arrêt à chaque élément" : dans un module, la
// séquence est leçon → (point de grammaire si la leçon en a un) → (évaluation
// si une évaluation est rattachée à cette leçon) → leçon suivante, etc.
// Les boutons -10/+10 restent pour naviguer DANS l'élément en cours.
function buildProgramSequence(mi){
  const m = MODULES[mi];
  const seq = [];
  for(let li=0; li<m.lessonsCount; li++){
    if(!hasContent(mi, li)) break;
    seq.push({type:'lesson', li});
    const lesson = m.lessons[li];
    if(lesson.tip) seq.push({type:'tip', li});
    if(EVAL_NUMBERS[mi+'-'+li]) seq.push({type:'eval', li, anchor: li});
  }
  return seq;
}
function currentSeqIndex(seq){
  if(currentProgram.type === 'lesson') return seq.findIndex(it=>it.type==='lesson' && it.li===currentProgram.li);
  if(currentProgram.type === 'tip') return seq.findIndex(it=>it.type==='tip' && it.li===currentProgram.li);
  if(currentProgram.type === 'eval') return seq.findIndex(it=>it.type==='eval' && it.li===currentProgram.anchor);
  return -1;
}
function goToSeqItem(mi, item){
  if(!item) return false;
  if(item.type === 'lesson'){
    if(!isLessonUnlocked(MODULES[mi].id, item.li)){ openPaywall(); return true; }
    startLesson(mi, item.li); return true;
  }
  if(item.type === 'tip'){
    if(!isLessonUnlocked(MODULES[mi].id, item.li)){ openPaywall(); return true; }
    startTip(mi, item.li); return true;
  }
  if(item.type === 'eval'){
    if(!isLessonUnlocked(MODULES[mi].id, item.anchor)){ openPaywall(); return true; }
    startEval(mi, item.anchor); return true;
  }
  return false;
}
$('nextBtn').onclick = ()=>{
  if(currentProgram.type === 'intro'){ startLesson(0, 0); return; }
  const mi = currentProgram.mi !== undefined ? currentProgram.mi : currentModule;
  const seq = buildProgramSequence(mi);
  const idx = currentSeqIndex(seq);
  if(idx === -1 || idx + 1 >= seq.length){ showToast('Pas de leçon suivante pour le moment.'); return; }
  goToSeqItem(mi, seq[idx + 1]);
};
$('prevBtn').onclick = ()=>{
  if(currentProgram.type === 'intro'){ showToast("C'est le tout début, il n'y a rien avant."); return; }
  const mi = currentProgram.mi !== undefined ? currentProgram.mi : currentModule;
  const seq = buildProgramSequence(mi);
  const idx = currentSeqIndex(seq);
  if(idx <= 0){ showToast("C'est déjà la première leçon du module."); return; }
  goToSeqItem(mi, seq[idx - 1]);
};
$('skipBackBtn').onclick = ()=>{ skipBy(-10000); };
$('skipFwdBtn').onclick = ()=>{ skipBy(10000); };

$('scrubber').addEventListener('input', ()=>{
  isScrubbing = true;
  $('timeElapsed').textContent = formatTime(parseInt($('scrubber').value, 10));
});
$('scrubber').addEventListener('change', ()=>{
  const target = parseInt($('scrubber').value, 10);
  isScrubbing = false;
  seekToMs(target);
});

$('buyBtn').onclick = buyPremium;
$('restoreBtn').onclick = restorePremium;
$('closePaywallBtn').onclick = closePaywall;

if('speechSynthesis' in window){
  speechSynthesis.onvoiceschanged = ()=>{ voices = speechSynthesis.getVoices(); };
}

renderHome();
initPurchases();
