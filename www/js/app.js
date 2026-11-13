/* ============================================================
   MON TRAJET : APPRENDRE LANGUES — logique app (toutes les langues)
   Flux 100% audio, "sans les mains ni les yeux" : chaque leçon se
   déroule automatiquement du début à la fin uniquement grâce à la
   voix. Une leçon est précompilée en une suite de "segments"
   (parole ou silence), ce qui permet d'avancer/reculer de 10s ou de
   se déplacer sur une barre de progression, tout en gardant le même
   ordre de test (mélangé) d'une navigation à l'autre dans la leçon.
   Pas de reconnaissance vocale : les temps de silence pour répéter
   sont chronométrés, l'app n'écoute jamais la voix de l'utilisateur.
   ============================================================ */

/* ---------- registre des langues ----------
   Chaque langue a son contenu dans data/<code>.js (chargé à la demande),
   sa voix iOS, son achat intégré et son « entitlement » RevenueCat.
   L'abonnement « Toutes les langues » débloque tout (entitlement
   all_languages). L'anglais garde son produit historique (version_complete /
   mon_trajet_pro) pour que les acheteurs existants restent débloqués. */
const LANGS = {
  de:   { name:'Allemand', inLang:'en allemand', learn:"l'allemand", flag:'🇩🇪', tts:'de-DE', cps:16,
          voice:{ exact:'de-de', prefix:'de', label:'Allemand', settings:'Allemand', sample:"Hallo! Ich bin es, die dir die Sätze auf Deutsch vorliest." },
          product:'mt_lang_de', entitlement:'lang_de' },
  en:   { name:'Anglais', inLang:'en anglais', learn:"l'anglais", flag:'🇬🇧', tts:'en-US', cps:16,
          voice:{ exact:'en-us', prefix:'en', label:'Anglais', settings:'Anglais, puis les voix « États-Unis »', sample:"Hello! I'll be the one reading the English sentences to you." },
          product:'version_complete', entitlement:'mon_trajet_pro' },
  ar:   { name:'Arabe', inLang:'en arabe', learn:"l'arabe littéraire", flag:'🌙', tts:'ar-SA', cps:11, rtl:true,
          voice:{ exact:'ar-sa', prefix:'ar', label:'Arabe', settings:'Arabe', sample:"مَرْحَبًا! أَنَا مَنْ سَيَقْرَأُ لَكَ الجُمَلَ بِالعَرَبِيَّةِ." },
          product:'mt_lang_ar', entitlement:'lang_ar' },
  es:   { name:'Espagnol', inLang:'en espagnol', learn:"l'espagnol", flag:'🇪🇸', tts:'es-ES', cps:16,
          voice:{ exact:'es-es', prefix:'es', label:'Espagnol', settings:'Espagnol, puis les voix « Espagne »', sample:"¡Hola! Soy yo quien te leerá las frases en español." },
          product:'mt_lang_es', entitlement:'lang_es' },
  it:   { name:'Italien', inLang:'en italien', learn:"l'italien", flag:'🇮🇹', tts:'it-IT', cps:16,
          voice:{ exact:'it-it', prefix:'it', label:'Italien', settings:'Italien', sample:"Ciao! Sono io che ti leggerò le frasi in italiano." },
          product:'mt_lang_it', entitlement:'lang_it' },
  ja:   { name:'Japonais', inLang:'en japonais', learn:'le japonais', flag:'🇯🇵', tts:'ja-JP', cps:7,
          voice:{ exact:'ja-jp', prefix:'ja', label:'Japonais', settings:'Japonais', sample:"こんにちは。日本語の文を読むのは私です。" },
          product:'mt_lang_ja', entitlement:'lang_ja' },
  ptbr: { name:'Portugais (Brésil)', inLang:'en portugais', learn:'le portugais du Brésil', flag:'🇧🇷', tts:'pt-BR', cps:16,
          voice:{ exact:'pt-br', prefix:'pt', label:'Portugais (Brésil)', settings:'Portugais, puis les voix « Brésil »', sample:"Olá! Sou eu que vou ler as frases em português para você." },
          product:'mt_lang_ptbr', entitlement:'lang_ptbr' },
  ptpt: { name:'Portugais (Portugal)', inLang:'en portugais', learn:'le portugais du Portugal', flag:'🇵🇹', tts:'pt-PT', cps:16,
          voice:{ exact:'pt-pt', prefix:'pt', label:'Portugais (Portugal)', settings:'Portugais, puis les voix « Portugal »', sample:"Olá! Sou eu que vou ler as frases em português para ti." },
          product:'mt_lang_ptpt', entitlement:'lang_ptpt' },
  zh:   { name:'Chinois', inLang:'en chinois', learn:'le chinois mandarin', flag:'🇨🇳', tts:'zh-CN', cps:6,
          voice:{ exact:'zh-cn', prefix:'zh-cn', label:'Chinois', settings:'Chinois, puis les voix « Chine continentale »', sample:"你好！我来给你读中文句子。" },
          product:'mt_lang_zh', entitlement:'lang_zh' },
  he:   { name:'Hébreu', inLang:'en hébreu', learn:"l'hébreu", flag:'🇮🇱', tts:'he-IL', cps:13, rtl:true,
          voice:{ exact:'he-il', prefix:'he', label:'Hébreu', settings:'Hébreu', sample:"שלום! אני אקרא לך את המשפטים בעברית." },
          product:'mt_lang_he', entitlement:'lang_he' },
  hi:   { name:'Hindi', inLang:'en hindi', learn:'le hindi', flag:'🇮🇳', tts:'hi-IN', cps:12,
          voice:{ exact:'hi-in', prefix:'hi', label:'Hindi', settings:'Hindi', sample:"नमस्ते! मैं आपको हिंदी के वाक्य पढ़कर सुनाऊँगी।" },
          product:'mt_lang_hi', entitlement:'lang_hi' },
  th:   { name:'Thaï', inLang:'en thaï', learn:'le thaï', flag:'🇹🇭', tts:'th-TH', cps:9,
          voice:{ exact:'th-th', prefix:'th', label:'Thaï', settings:'Thaï', sample:"สวัสดีค่ะ ฉันจะอ่านประโยคภาษาไทยให้คุณฟังค่ะ" },
          product:'mt_lang_th', entitlement:'lang_th' },
  bn:   { name:'Bengali', inLang:'en bengali', learn:'le bengali', flag:'🇧🇩', tts:'bn-IN', cps:12,
          voice:{ exact:'bn-in', prefix:'bn', label:'Bengali', settings:'Bengali', sample:"হ্যালো! আমি আপনাকে বাংলা বাক্যগুলো পড়ে শোনাব।" },
          product:'mt_lang_bn', entitlement:'lang_bn' },
  ru:   { name:'Russe', inLang:'en russe', learn:'le russe', flag:'🇷🇺', tts:'ru-RU', cps:14,
          voice:{ exact:'ru-ru', prefix:'ru', label:'Russe', settings:'Russe', sample:"Здравствуйте! Я буду читать вам фразы по-русски." },
          product:'mt_lang_ru', entitlement:'lang_ru' },
  id:   { name:'Indonésien', inLang:'en indonésien', learn:'l\'indonésien', flag:'🇮🇩', tts:'id-ID', cps:15,
          voice:{ exact:'id-id', prefix:'id', label:'Indonésien', settings:'Indonésien', sample:"Halo! Saya akan membacakan kalimat-kalimat dalam bahasa Indonesia untuk Anda." },
          product:'mt_lang_id', entitlement:'lang_id' },
  vi:   { name:'Vietnamien', inLang:'en vietnamien', learn:'le vietnamien', flag:'🇻🇳', tts:'vi-VN', cps:12,
          voice:{ exact:'vi-vn', prefix:'vi', label:'Vietnamien', settings:'Vietnamien', sample:"Xin chào! Tôi sẽ đọc cho bạn các câu tiếng Việt." },
          product:'mt_lang_vi', entitlement:'lang_vi' },
  tr:   { name:'Turc', inLang:'en turc', learn:'le turc', flag:'🇹🇷', tts:'tr-TR', cps:14,
          voice:{ exact:'tr-tr', prefix:'tr', label:'Turc', settings:'Turc', sample:"Merhaba! Size Türkçe cümleleri ben okuyacağım." },
          product:'mt_lang_tr', entitlement:'lang_tr' },
  yue:  { name:'Cantonais', inLang:'en cantonais', learn:'le cantonais', flag:'🇭🇰', tts:'zh-HK', cps:6,
          voice:{ exact:'zh-hk', prefix:'zh-hk', label:'Cantonais', settings:'Chinois, puis les voix « Hong Kong »', sample:"你好！我會讀廣東話句子俾你聽。" },
          product:'mt_lang_yue', entitlement:'lang_yue' },
  ta:   { name:'Tamoul', inLang:'en tamoul', learn:'le tamoul', flag:'🇮🇳', tts:'ta-IN', cps:12,
          voice:{ exact:'ta-in', prefix:'ta', label:'Tamoul', settings:'Tamoul', sample:"வணக்கம்! நான் உங்களுக்குத் தமிழ் வாக்கியங்களைப் படித்துக் காட்டுவேன்." },
          product:'mt_lang_ta', entitlement:'lang_ta' },
  ko:   { name:'Coréen', inLang:'en coréen', learn:'le coréen', flag:'🇰🇷', tts:'ko-KR', cps:8,
          voice:{ exact:'ko-kr', prefix:'ko', label:'Coréen', settings:'Coréen', sample:"안녕하세요! 제가 한국어 문장을 읽어 드릴게요." },
          product:'mt_lang_ko', entitlement:'lang_ko' },
  fa:   { name:'Persan', inLang:'en persan', learn:'le persan', flag:'🇮🇷', tts:'fa-IR', cps:12, rtl:true,
          voice:{ exact:'fa-ir', prefix:'fa', label:'Persan', settings:'Persan', sample:"سلام! من جمله‌های فارسی را برایتان می‌خوانم." },
          product:'mt_lang_fa', entitlement:'lang_fa' },
  pl:   { name:'Polonais', inLang:'en polonais', learn:'le polonais', flag:'🇵🇱', tts:'pl-PL', cps:14,
          voice:{ exact:'pl-pl', prefix:'pl', label:'Polonais', settings:'Polonais', sample:"Dzień dobry! Będę czytać ci zdania po polsku." },
          product:'mt_lang_pl', entitlement:'lang_pl' },
};
const LANG_ORDER = ['de','en','ar','bn','yue','zh','ko','es','he','hi','id','it','ja','fa','pl','ptbr','ptpt','ru','ta','th','tr','vi']; // ordre alphabétique (demande d'Alexis)
const ALL_LANGS_ENTITLEMENT = 'all_languages';
const SUB_MONTHLY_PRODUCT = 'mt_all_monthly';
const SUB_YEARLY_PRODUCT = 'mt_all_yearly';
const PRIVACY_URL = 'https://claude.ai/artifact/Y7XPRMMX7qtZrjaXowadyM';
const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

let currentLang = null;      // code de la langue apprise (clé de LANGS)
let L = null;                // raccourci : LANGS[currentLang]
let LEVELS = [];
let MODULES = [];
let FREE_LESSONS_PER_MODULE = {};
let TGT_INDEX = new Map();   // phrase cible -> {ro, lit} (japonais, arabe)

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
function stateKey(code){ return 'montrajet_state_' + code; }
function loadState(code){
  try{
    let raw = localStorage.getItem(stateKey(code));
    // Migration des anciens utilisateurs de « Apprendre Anglais : Mon Trajet ».
    if(!raw && code === 'en'){
      const old = localStorage.getItem('enroute_state');
      if(old){
        raw = old;
        try{ const o = JSON.parse(old); if(o && o.premium){ const a = loadAccess(); a.en = true; saveAccess(a); } }catch(e){}
        try{ const vp = JSON.parse(localStorage.getItem('montrajet_voices')||'{}'); if(vp.tgt && !vp.tgt_en){ vp.tgt_en = vp.tgt; delete vp.tgt; localStorage.setItem('montrajet_voices', JSON.stringify(vp)); } }catch(e){}
      }
    }
    const st = raw ? JSON.parse(raw) : {completed:[]};
    if(!Array.isArray(st.completed)) st.completed = [];
    return st;
  }catch(e){ return {completed:[]}; }
}
function saveState(s){ try{ if(currentLang) localStorage.setItem(stateKey(currentLang), JSON.stringify(s)); }catch(e){} }
let state = {completed:[]};

/* ---------- accès (achats) ----------
   access[code] = true si la langue est débloquée ; access.all = true si
   l'abonnement « Toutes les langues » est actif. Mis à jour par RevenueCat
   à chaque lancement / achat / restauration, et gardé en cache local pour
   fonctionner hors connexion. */
function loadAccess(){ try{ return JSON.parse(localStorage.getItem('montrajet_access')||'{}'); }catch(e){ return {}; } }
function saveAccess(a){ try{ localStorage.setItem('montrajet_access', JSON.stringify(a)); }catch(e){} }
let access = loadAccess();
function hasAccess(code){ return !!(access.all || access[code || currentLang]); }


function showToast(msg, duration){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._tm);
  showToast._tm = setTimeout(()=>t.classList.remove('show'), duration || 1800);
}

function isLessonUnlocked(moduleId, lessonIndex){
  if(hasAccess()) return true;
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
let TIP_NUMBERS = {};

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
let EVAL_NUMBERS = {};

/* ---------- chargement / changement de langue ---------- */
function loadLangData(code){
  return new Promise((resolve, reject)=>{
    if(window.MT_DATA && window.MT_DATA[code]){ resolve(); return; }
    const sc = document.createElement('script');
    sc.src = 'data/' + code + '.js';
    sc.onload = ()=>{ (window.MT_DATA && window.MT_DATA[code]) ? resolve() : reject(new Error('données absentes')); };
    sc.onerror = ()=>reject(new Error('chargement impossible'));
    document.head.appendChild(sc);
  });
}
async function setLanguage(code){
  if(!LANGS[code]) return false;
  try{ await loadLangData(code); }catch(e){ showToast("Impossible de charger cette langue. Réessaie."); return false; }
  closeSessionSilent();
  currentLang = code; L = LANGS[code];
  try{ localStorage.setItem('montrajet_lang', code); }catch(e){}
  LEVELS = window.MT_DATA[code];
  currentLevel = 0; currentModule = 0;
  MODULES = LEVELS[0].modules;
  FREE_LESSONS_PER_MODULE = LEVELS[0].freeLessonsPerModule;
  TIP_NUMBERS = computeTipNumbers(MODULES);
  EVAL_NUMBERS = computeEvalNumbers(MODULES);
  TGT_INDEX = new Map();
  LEVELS.forEach(lv=>lv.modules.forEach(m=>m.lessons.forEach(l=>{
    (l && l.phrases ? l.phrases : []).forEach(p=>{ if(p.ro || p.lit) TGT_INDEX.set(p.tgt, p); });
    // mots de vocabulaire et séries fermées (nouvelle méthode) : transcription affichée sous le mot
    const words = (l && l.vocab ? l.vocab : []).concat(l && l.series ? l.series.chunks.flat() : []);
    words.forEach(w=>{ if(w.ro && !TGT_INDEX.has(w.tgt)) TGT_INDEX.set(w.tgt, { ro: w.ro }); });
  })));
  state = loadState(code);
  VOICE_LANGS.tgt = L.voice;
  nativeVoicesLoaded = false;
  document.body.classList.toggle('rtl-target', !!L.rtl);
  $('wordmarkLang').textContent = L.name;
  $('tagline').textContent = `Apprends ${L.learn} en conduisant, en courant, en marchant.`;
  $('langBtn').textContent = `${L.flag} ${L.name} · changer`;
  renderHome();
  refreshVoiceWarning(true);
  return true;
}
/* ---------- langue sans voix installée sur le téléphone ----------
   Certaines langues (persan, tamoul, bengali…) n'ont AUCUNE voix installée
   d'office sur l'iPhone : la phrase serait alors lue en silence. On le
   détecte, on affiche un bandeau sur l'accueil et on explique où télécharger
   la voix (Réglages > Accessibilité > Contenu énoncé > Voix). */
let tgtVoiceMissing = false;
async function refreshVoiceWarning(popup){
  if(!isNativeApp() || !L) { tgtVoiceMissing = false; renderVoiceWarning(); return; }
  nativeVoicesLoaded = false;
  try{ await loadNativeVoices(); }catch(e){}
  tgtVoiceMissing = !voicesFor('tgt').length;
  renderVoiceWarning();
  if(tgtVoiceMissing && popup) openNoVoiceHelp();
}
function renderVoiceWarning(){
  const el = $('noVoiceBanner'); if(!el) return;
  if(!tgtVoiceMissing){ el.style.display = 'none'; return; }
  el.innerHTML = `⚠️ Aucune voix ${L.inLang} n'est installée sur ton iPhone : les phrases ${L.inLang} resteraient muettes. <b>Touche ici pour l'installer (gratuit, 1 minute).</b>`;
  el.style.display = 'block';
}
async function openNoVoiceHelp(){
  await openVoicePicker();
  const h = $('voiceHelp-tgt'); if(h) h.classList.add('show');
  const box = $('voiceLists');
  if(box && tgtVoiceMissing){
    box.insertAdjacentHTML('afterbegin', `<div class="voice-alert">Ton iPhone n'a encore <b>aucune voix ${L.inLang}</b>. Sans elle, les phrases ${L.inLang} ne seront pas lues. Suis le chemin ci-dessous pour en télécharger une (c'est gratuit), puis reviens dans l'app : elle sera choisie automatiquement.</div>`);
  }
}
// Ferme l'écran de session sans re-rendre l'accueil (utilisé pendant un changement de langue).
function closeSessionSilent(){
  try{ playToken++; cancelSpeech(); isPaused = false; $('session').style.display = 'none'; $('home').style.display = 'block'; hideTipCard(); }catch(e){}
}

/* ---------- écran « Quelle langue veux-tu apprendre ? » ---------- */
function openLangPicker(){
  const el = $('langList');
  el.innerHTML = LANG_ORDER.map(code=>{
    const lg = LANGS[code];
    const unlocked = hasAccess(code);
    return `<div class="lang-item${code===currentLang?' selected':''}" data-code="${code}">
      <div class="lang-flag">${lg.flag}</div>
      <div><div class="lang-name">${lg.name}</div><div class="lang-meta">${unlocked ? 'Version complète' : 'Premières leçons gratuites'}</div></div>
      <div class="voice-check">${code===currentLang?'✓':''}</div></div>`;
  }).join('');
  el.querySelectorAll('.lang-item').forEach(it=>{
    it.onclick = async ()=>{ const ok = await setLanguage(it.dataset.code); if(ok){ closeLangPicker(); } };
  });
  $('closeLangBtn').style.display = currentLang ? '' : 'none';
  $('langPicker').classList.add('show');
}
function closeLangPicker(){ $('langPicker').classList.remove('show'); }

/* ---------- changement de niveau ---------- */
function switchLevel(idx){
  if(idx === currentLevel || !LEVELS[idx]) return;
  setLevelQuiet(idx);
  currentModule = 0;
  renderHome();
}
// Change de niveau sans toucher à l'écran (utilisé pendant l'enchaînement automatique).
function setLevelQuiet(idx){
  if(!LEVELS[idx]) return;
  currentLevel = idx;
  MODULES = LEVELS[currentLevel].modules;
  FREE_LESSONS_PER_MODULE = LEVELS[currentLevel].freeLessonsPerModule;
  TIP_NUMBERS = computeTipNumbers(MODULES);
  EVAL_NUMBERS = computeEvalNumbers(MODULES);
}
// Exécute fn dans le contexte d'un autre niveau, puis revient au niveau courant.
function withLevel(lv, fn){
  if(lv === undefined || lv === currentLevel) return fn();
  const save = currentLevel;
  setLevelQuiet(lv);
  try{ return fn(); } finally { setLevelQuiet(save); }
}
/* ---------- ENCHAÎNEMENT AUTOMATIQUE (toutes les langues) ----------
   Exigence d'Alexis : si on lance la leçon 1 et qu'on ne touche plus au
   téléphone, TOUT s'enchaîne : leçon (avec son point de grammaire), puis
   évaluation quand il y en a une, puis série fermée (nouvelle méthode),
   leçon suivante, module suivant, niveau suivant… jusqu'à la toute fin si
   la langue est débloquée, sinon jusqu'à la dernière leçon gratuite. */
function nextPos(lv, mi, li){
  let l = li + 1, m = mi, v = lv;
  while(v < LEVELS.length){
    const mods = LEVELS[v].modules;
    while(m < mods.length){
      const mod = mods[m];
      if(l < mod.lessonsCount && mod.lessons[l] && mod.lessons[l].phrases) return {lv:v, mi:m, li:l};
      m++; l = 0;
    }
    v++; m = 0; l = 0;
  }
  return null;
}
function unlockedAt(p){
  if(!p) return false;
  if(hasAccess()) return true;
  const lvl = LEVELS[p.lv], mod = lvl.modules[p.mi];
  return p.li < ((lvl.freeLessonsPerModule || {})[mod.id] || 0);
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
        <div class="lesson-title">Bien commencer ensemble ${hasAccess() ? '' : '<span class="free-tag">GRATUIT</span>'}</div>
        <div class="lesson-sub">Un mot avant de démarrer — à propos de ma voix</div>
      </div>
    </div>`;
  }

  // Badge "GRATUIT" : seulement tant que la version complète n'est pas débloquée.
  const freeTag = hasAccess() ? '' : '<span class="free-tag">GRATUIT</span>';

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
        <div class="lesson-title">Leçon ${i+1}${lesson.title? ' · '+lesson.title:''} ${unlocked && content ? freeTag : ''}</div>
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
          <div class="lesson-title">Point grammaire ${tipNum} ${unlocked ? freeTag : ''}</div>
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
          <div class="lesson-title">${evalLabel} ${unlocked ? freeTag : ''}</div>
          <div class="lesson-sub">${evalSub}</div>
        </div>
      </div>`;
    }

    // Série fermée (nouvelle méthode) : affichée juste après sa leçon.
    if(content && lesson.series){
      const serKey = 'lv'+levelId+'-series-'+currentModule+'-'+i;
      const serDone = state.completed.includes(serKey);
      const nItems = lesson.series.chunks.reduce((n,c)=>n+c.length, 0);
      rows += `<div class="lesson-row eval-row ${unlocked?'':'locked'}" data-ser-mi="${currentModule}" data-ser-li="${i}">
        <div class="lesson-icon ${serDone?'done':''}">${
          serDone ? ICONS.check.replace('stroke-width="2"','stroke="#0B2116" stroke-width="2.5"')
          : (!unlocked ? ICONS.lock
            : ICONS.headphones.replace('stroke-width="2"','stroke="var(--target)" stroke-width="2"'))
        }</div>
        <div class="lesson-text">
          <div class="lesson-title">Série · ${lesson.series.title} ${unlocked ? freeTag : ''}</div>
          <div class="lesson-sub">${nItems} mots, par petits groupes</div>
        </div>
      </div>`;
    }
  }
  listEl.innerHTML = rows;
  listEl.querySelectorAll('.lesson-row').forEach(el=>{
    el.onclick = ()=>{
      if(el.dataset.intro === '1'){ startIntro(); return; }
      if(tgtVoiceMissing){ openNoVoiceHelp(); return; }
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
      if(el.dataset.serMi !== undefined){
        const mi = parseInt(el.dataset.serMi);
        const li = parseInt(el.dataset.serLi);
        if(!isLessonUnlocked(MODULES[mi].id, li)){ openPaywall(); return; }
        startSeries(mi, li);
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
  const want = lang === 'fr' ? 'fr' : (L ? L.voice.prefix : 'en');
  const candidates = voices.filter(v=>v.lang && v.lang.toLowerCase().startsWith(want));
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
  const baseCharsPerSec = lang === 'fr' ? 14 : (L ? L.cps : 16);
  const cps = baseCharsPerSec * (rate || 1);
  return Math.round(Math.max(500, (text.length / cps) * 1000) + 250);
}
function S(text, lang, rate, label, ringColor, ringIcon, pulse, frDisplay, enDisplay, extra){
  // La voix française de l'iPhone ne fait pas la liaison : on écrit « mo ta mo » pour l'oreille.
  if(lang === 'fr') text = text.replace(/mots? à mots?/gi, 'mo ta mo');
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

  segs.push(S(`Si tu trouves ma voix trop robotique, tu peux en changer à tout moment. Sur l'écran d'accueil, appuie sur le bouton Choisir les voix, juste sous le titre. Tu y verras toutes les voix installées sur ton téléphone, en français et ${L.inLang}. Appuie sur une voix pour l'écouter : elle sera choisie automatiquement pour les leçons. Attention, cette liste ne montre que les voix déjà téléchargées sur ton téléphone. Pour certaines langues, comme le persan, le tamoul ou le bengali, l'iPhone n'installe aucune voix d'office : si la phrase étrangère reste muette, c'est qu'il faut d'abord télécharger une voix. D'autres voix, d'homme ou de femme, sont disponibles gratuitement dans les Réglages : il faut d'abord les télécharger. Le bouton Plus de voix, sous chaque langue, t'explique exactement où les trouver.`, 'fr', 1, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));
  segs.push(W(500, 'Bien commencer ensemble', CTX, 'headphones', false, '', ''));

  let pathText;
  if(platform === 'ios'){
    pathText = `Pour avoir des voix plus naturelles, tu peux en télécharger de nouvelles sur ton iPhone. Voici le chemin : ouvre l'application Réglages. Va dans Accessibilité. Puis Lire et énoncer, ou Contenu énoncé selon ta version. Puis Voix. Puis Français. Et télécharge une voix marquée Premium, ou Améliorée. Fais la même chose dans ${L.voice.settings.split(',')[0]}. Ensuite, reviens dans l'application et choisis la nouvelle voix avec le bouton Choisir les voix. Attention, les voix Siri ne sont pas disponibles pour les applications.`;
  } else if(platform === 'android'){
    pathText = "Tu es sur Android. Voici le chemin, qui peut varier légèrement selon la marque de ton téléphone : ouvre les Paramètres. Va dans Système, ou Paramètres généraux. Puis Langues et saisie. Puis Synthèse vocale, ou Text-to-speech. Choisis le moteur Google. Installe les données vocales en français. Et choisis, si elle est proposée, une voix Réseau plutôt qu'une voix Compacte, pour un rendu plus naturel. Ensuite, reviens dans l'application et choisis la nouvelle voix avec le bouton Choisir les voix.";
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
// Découpe un texte de point de grammaire : le français est lu par la voix
// française, les mots cités « … » en langue apprise (tip.say) par la voix native.
function tipSpeech(text, tip, lab, tx){
  const map = tip.say || {}, CTX = 'var(--context)', out = [];
  const re = /«\s*([^»]+?)\s*»/g; let last = 0, m, buf = '';
  const flush = ()=>{ const t = buf.replace(/\s+/g,' ').trim(); if(/[A-Za-zÀ-ÿ0-9]/.test(t)) out.push(S(t, 'fr', 1, lab, CTX, 'headphones', false, tip.title, '', tx)); buf = ''; };
  while((m = re.exec(text))){
    const nat = map[m[1]];
    if(!nat) continue;
    buf += text.slice(last, m.index); flush();
    out.push(S(nat, 'tgt', 0.85, lab, 'var(--target)', 'speaker', false, tip.title, '', tx));
    last = re.lastIndex;
  }
  buf += text.slice(last); flush();
  return out;
}
function buildTipSegments(tip, tipNum){
  const CTX = 'var(--context)';
  const tx = {phase:'tip', tipData: tip, tipNum};
  const lab = `Point grammaire ${tipNum}`;
  const out = [
    S(`Point grammaire ${tipNum}.`, 'fr', 1, lab, CTX, 'headphones', false, tip.title, '', tx),
    W(400, lab, CTX, 'headphones', false, tip.title, '', tx)
  ];
  // L'exemple « FR — cible » est lu en deux temps : la partie française par la
  // voix française, la partie cible par la voix de la langue apprise.
  const parts = stripHtml(tip.example || '').split(' — ');
  if(parts.length === 2){
    out.push(...tipSpeech(`${tip.title}.`, tip, lab, tx));
    out.push(S(`Par exemple : ${parts[0]}`, 'fr', 1, lab, CTX, 'headphones', false, tip.title, '', tx));
    out.push(W(300, lab, CTX, 'headphones', false, tip.title, '', tx));
    out.push(S(parts[1], 'tgt', 0.85, lab, 'var(--target)', 'speaker', false, tip.title, '', tx));
    out.push(W(400, lab, CTX, 'headphones', false, tip.title, '', tx));
    if(tip.lit) out.push(S(`Mot à mot : ${tip.lit}.`, 'fr', 1, lab, CTX, 'headphones', false, tip.title, '', tx));
    out.push(...tipSpeech(tip.body, tip, lab, tx));
  } else {
    out.push(...tipSpeech(spokenTipText(tip), tip, lab, tx));
  }
  out.push(W(1500, lab, CTX, 'headphones', false, tip.title, '', tx));
  return out;
}


// Segments d'une "Évaluation" : révision aléatoire des phrases des 5
// dernières leçons (ou de tout le module pour l'évaluation finale),
// dans le même format que le Test 2 (mêmes temps de réponse et de
// répétition).
/* ---------- nouvelle méthode (pour l'instant : chinois) ----------
   Activée automatiquement quand les données de la langue contiennent des mots
   de vocabulaire (lesson.vocab) et des séries fermées (lesson.series) :
   - les évaluations alternent 2 phrases et 5 mots (temps de réponse plus court
     pour les mots), pour la même durée qu'avant ;
   - une « série » (nombres, jours…) est apprise par petits groupes après les
     leçons 6, 11 et 16, puis interrogée dans le désordre ;
   - évaluations et séries s'enchaînent automatiquement après leur leçon. */
function hasNewMethod(){ return MODULES.some(m=>m.lessons.some(l=>l && ((l.vocab && l.vocab.length) || l.series))); }
function listSep(){ return ['zh','ja','yue'].includes(currentLang) ? '、' : ', '; }
function frList(words){ const f = words.map(w=>w.fr); return f.length > 1 ? f.slice(0,-1).join(', ') + ' et ' + f[f.length-1] : (f[0] || ''); }
function tgtList(words){
  const t = words.map(w=>w.tgt).join(listSep());
  const ro = words.map(w=>w.ro || '').join(', ');
  if(words.every(w=>w.ro) && !TGT_INDEX.has(t)) TGT_INDEX.set(t, { ro });
  return t;
}
function wordsForRange(m, from, to){
  const seen = new Set(), out = [];
  for(let i=from;i<=to;i++){
    const l = m.lessons[i]; if(!l) continue;
    (l.vocab || []).concat(l.series ? l.series.chunks.flat() : []).forEach(w=>{ if(!seen.has(w.tgt)){ seen.add(w.tgt); out.push(w); } });
  }
  return out;
}
function evalPhraseSegs(p, i, total, evalLabel){
  const CTX = 'var(--context)', TGT = 'var(--target)', SPK = 'var(--speak)';
  const repeatMs = Math.max(2200, (p.ro||p.tgt).length*80) + 3000; // même formule que le Test 2
  const ex = {idx:i, total};
  return [
    S(p.fr, 'fr', 1, `${evalLabel} — traduis ${L.inLang}`, CTX, 'headphones', false, p.fr, '···', ex),
    W(repeatMs, `${evalLabel} — à toi de répondre`, SPK, 'repeat', true, p.fr, '···', ex),
    S(p.tgt, 'tgt', 0.85, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex),
    W(400 + 2000, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex),
    S(p.tgt, 'tgt', 0.85, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex),
    W(400 + 2000, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex)
  ];
}
function evalWordSegs(w, i, total, evalLabel){
  const CTX = 'var(--context)', TGT = 'var(--target)', SPK = 'var(--speak)';
  const ex = {idx:i, total};
  return [
    S(w.fr, 'fr', 1, `${evalLabel} — vocabulaire`, CTX, 'headphones', false, w.fr, '···', ex),
    W(2500, `${evalLabel} — vite, le mot !`, SPK, 'repeat', true, w.fr, '···', ex),
    S(w.tgt, 'tgt', 0.8, `${evalLabel} — réponse`, TGT, 'speaker', false, w.fr, w.tgt, ex),
    W(1200, `${evalLabel} — réponse`, TGT, 'speaker', false, w.fr, w.tgt, ex),
    S(w.tgt, 'tgt', 0.8, `${evalLabel} — réponse`, TGT, 'speaker', false, w.fr, w.tgt, ex),
    W(1200, `${evalLabel} — réponse`, TGT, 'speaker', false, w.fr, w.tgt, ex)
  ];
}
const segsMs = segs => segs.reduce((n,s)=>n + (s.type==='speak' ? s.estMs : s.ms), 0);

function buildMixedEvalSegments(mi, anchor, isFinal, evalLabel, chosen){
  const m = MODULES[mi];
  const CTX = 'var(--context)', SPK = 'var(--speak)';
  // Durée visée = celle de l'évaluation classique (mêmes phrases).
  const target = chosen.reduce((n,p,i)=>n + segsMs(evalPhraseSegs(p, i, chosen.length, evalLabel)), 0);
  const words = shuffleArray(wordsForRange(m, isFinal ? 0 : Math.max(0, anchor - 4), anchor));
  const phrases = chosen.slice();
  const segs = [];
  segs.push(S(isFinal
    ? "Évaluation finale : on révise tout le module, avec des phrases et des mots de vocabulaire. Pour les mots, réponds vite, sans réfléchir trop longtemps."
    : "Évaluation : on révise les 5 dernières leçons, avec des phrases et des mots de vocabulaire. Pour les mots, réponds vite, sans réfléchir trop longtemps.",
    'fr', 1, evalLabel, SPK, 'repeat', false, '', ''));
  segs.push(W(800, evalLabel, SPK, 'repeat', false, '', ''));
  // Plan : 2 phrases, puis 5 mots, et ainsi de suite jusqu'à la durée visée.
  const plan = []; let used = 0, pi = 0, wi = 0;
  while(used < target && (pi < phrases.length || wi < words.length)){
    for(let k=0;k<2 && pi<phrases.length && used<target;k++){ const p = phrases[pi++]; plan.push({kind:'p', it:p}); used += segsMs(evalPhraseSegs(p, 0, 1, evalLabel)); }
    for(let k=0;k<5 && wi<words.length && used<target;k++){ const w = words[wi++]; plan.push({kind:'w', it:w}); used += segsMs(evalWordSegs(w, 0, 1, evalLabel)); }
  }
  let prev = null;
  plan.forEach((x,i)=>{
    if(x.kind !== prev){
      segs.push(S(x.kind === 'w' ? 'Des mots.' : 'Des phrases.', 'fr', 1, evalLabel, CTX, 'headphones', false, '', ''));
      segs.push(W(400, evalLabel, CTX, 'headphones', false, '', ''));
      prev = x.kind;
    }
    segs.push(...(x.kind === 'p' ? evalPhraseSegs(x.it, i, plan.length, evalLabel) : evalWordSegs(x.it, i, plan.length, evalLabel)));
  });
  return segs;
}

function buildSeriesSegments(mi, li){
  const ser = MODULES[mi].lessons[li].series;
  const CTX = 'var(--context)', TGT = 'var(--target)', SPK = 'var(--speak)';
  const lab = `Série · ${ser.title}`;
  const rep = t => Math.round(estimateSpeechMs(t, 'tgt', 0.8) * 1.2) + 1500; // temps pour répéter un groupe
  const segs = [];
  segs.push(S(`Série : ${ser.title}.`, 'fr', 1, lab, CTX, 'headphones', false, ser.title, ''));
  segs.push(W(400, lab, CTX, 'headphones', false, ser.title, ''));
  if(ser.intro){ segs.push(S(ser.intro, 'fr', 1, lab, CTX, 'headphones', false, ser.title, '')); segs.push(W(600, lab, CTX, 'headphones', false, ser.title, '')); }
  // Progression demandée par Alexis (ex. 0 à 10) : on apprend par groupes (0-3, 4-7, 8-10),
  // puis on regroupe AUTREMENT deux fois (0-4, 5-8, 9-10, puis 0-5, 6-10) pour que
  // les frontières bougent et que tout se soude, puis en grands blocs (0-5, 6-10), et enfin toute la série d'un bloc.
  const all = ser.chunks.flat();
  const sizes0 = ser.chunks.map(c=>c.length);
  const maxC = Math.max(...sizes0);
  const cut = sizes => { const out = []; let i = 0; for(const n of sizes){ if(i >= all.length) break; out.push(all.slice(i, i+n)); i += n; } if(i < all.length) out.push(all.slice(i)); if(out.length > 1 && out[out.length-1].length === 1){ const l = out.pop(); out[out.length-1] = out[out.length-1].concat(l); } return out; };
  const passes = [
    { groups: ser.chunks, twice: true,  intro: '' },
    { groups: cut([sizes0[0] + 1, ...sizes0.slice(1)]), twice: false, intro: 'On regroupe autrement.' },
    // 3e passage : deux grands blocs (ex. 0 à 5, puis 6 à 10) ; trois si la série est longue
    { groups: cut((()=>{ const g = Math.ceil(all.length / 6), base = Math.floor(all.length / g); return Array.from({length:g}, (_,k)=> base + (k < all.length % g ? 1 : 0)); })()), twice: false, intro: 'Maintenant, en grands blocs.' }
  ];
  passes.forEach((pass, pi)=>{
    if(pass.intro){
      segs.push(S(pass.intro, 'fr', 1, `${lab} — regroupe`, CTX, 'headphones', false, '', ''));
      segs.push(W(400, `${lab} — regroupe`, CTX, 'headphones', false, '', ''));
    }
    pass.groups.forEach((c, ci)=>{
      const ex = {idx:ci, total:pass.groups.length};
      const f = frList(c), t = tgtList(c);
      const step = pi === 0 ? 'écoute' : 'regroupe';
      segs.push(S(f, 'fr', 1, `${lab} — ${step}`, CTX, 'headphones', false, f, '', ex));
      segs.push(W(300, `${lab} — ${step}`, CTX, 'headphones', false, f, '', ex));
      segs.push(S(t, 'tgt', 0.8, `${lab} — ${step}`, TGT, 'speaker', false, f, t, ex));
      segs.push(W(rep(t), 'À toi de répéter', SPK, 'repeat', true, f, t, ex));
      if(pass.twice){
        segs.push(S(t, 'tgt', 0.8, 'Encore une fois', TGT, 'speaker', false, f, t, ex));
        segs.push(W(rep(t), 'À toi de répéter', SPK, 'repeat', true, f, t, ex));
      }
    });
  });
  // 2. Toute la série d'un bloc, deux fois.
  {
    const t = tgtList(all), f = frList(all);
    segs.push(S('Toute la série, maintenant.', 'fr', 1, `${lab} — toute la série`, CTX, 'headphones', false, '', ''));
    segs.push(W(300, `${lab} — toute la série`, CTX, 'headphones', false, '', ''));
    for(let k=0;k<2;k++){
      segs.push(S(t, 'tgt', 0.85, `${lab} — toute la série`, TGT, 'speaker', false, f, t));
      segs.push(W(rep(t), 'À toi de répéter', SPK, 'repeat', true, f, t));
    }
  }
  // 3. Dans le désordre : sans ça, on doit tout réciter depuis le début pour retrouver un mot.
  segs.push(S("Dans le désordre, maintenant : je te dis le mot en français, tu le dis vite.", 'fr', 1, `${lab} — dans le désordre`, SPK, 'repeat', false, '', ''));
  segs.push(W(600, `${lab} — dans le désordre`, SPK, 'repeat', false, '', ''));
  const items = shuffleArray(ser.chunks.flat());
  items.forEach((w, i)=>{
    const ex = {idx:i, total:items.length};
    segs.push(S(w.fr, 'fr', 1, `${lab} — dans le désordre`, CTX, 'headphones', false, w.fr, '···', ex));
    segs.push(W(3800, 'Vite, le mot !', SPK, 'repeat', true, w.fr, '···', ex));
    segs.push(S(w.tgt, 'tgt', 0.8, `${lab} — réponse`, TGT, 'speaker', false, w.fr, w.tgt, ex));
    segs.push(W(1500, `${lab} — réponse`, TGT, 'speaker', false, w.fr, w.tgt, ex));
  });
  segs.push(S('Bravo, série terminée.', 'fr', 1, 'Série terminée', SPK, 'check', false, '', ''));
  segs.push(W(1200, 'Série terminée', SPK, 'check', false, '', ''));
  return segs;
}

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
  if(hasNewMethod()){
    const segs = buildMixedEvalSegments(mi, anchor, isFinal, evalLabel, chosen);
    segs.push(S(isFinal ? "Bravo, tu as terminé l'évaluation finale de ce module." : "Bravo, tu as terminé cette évaluation.", 'fr', 1, 'Évaluation terminée', 'var(--speak)', 'check', false, '', ''));
    segs.push(W(1500, 'Évaluation terminée', 'var(--speak)', 'check', false, '', ''));
    return segs;
  }

  const segs = [];
  const introText = isFinal
    ? "Évaluation finale : il est temps de réviser tout le module."
    : "Évaluation : il est temps de réviser nos 5 dernières leçons.";
  segs.push(S(introText, 'fr', 1, evalLabel, SPK, 'repeat', false, '', ''));
  segs.push(W(1000, evalLabel, SPK, 'repeat', false, '', ''));
  segs.push(S("Essaie de traduire les phrases suivantes.", 'fr', 1, evalLabel, SPK, 'repeat', false, '', ''));
  segs.push(W(700, evalLabel, SPK, 'repeat', false, '', ''));

  chosen.forEach((p,i)=>{
    const repeatMs = Math.max(2200, (p.ro||p.tgt).length*80) + 3000; // même formule que le Test 2
    const ex = {idx:i, total: chosen.length};
    segs.push(S(p.fr, 'fr', 1, `${evalLabel} — traduis ${L.inLang}`, CTX, 'headphones', false, p.fr, '···', ex));
    segs.push(W(repeatMs, `${evalLabel} — à toi de répondre`, SPK, 'repeat', true, p.fr, '···', ex));
    segs.push(S(p.tgt, 'tgt', 0.85, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(400 + 2000, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex)); // même écart que le Test 2 (+2s)
    segs.push(S(p.tgt, 'tgt', 0.85, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(400 + 2000, `${evalLabel} — réponse`, TGT, 'speaker', false, p.fr, p.tgt, ex)); // même durée que l'écart entre les 2 répétitions
  });

  const closingText = isFinal
    ? "Bravo, tu as terminé l'évaluation finale de ce module."
    : "Bravo, tu as terminé cette évaluation.";
  segs.push(S(closingText, 'fr', 1, 'Évaluation terminée', SPK, 'check', false, '', ''));
  segs.push(W(1500, 'Évaluation terminée', SPK, 'check', false, '', ''));

  return segs;
}

// Explication d'une phrase : français par la voix française, mots cités « … » par la voix native.
function noteSpeech(p, ex){
  const map = p.note.say || {}, CTX = 'var(--context)', out = [];
  const text = p.note.text;
  const re = /«\s*([^»]+?)\s*»/g; let last = 0, m, buf = '';
  const flush = ()=>{ const t = buf.replace(/\s+/g,' ').trim(); if(/[A-Za-zÀ-ÿ0-9]/.test(t)) out.push(S(t,'fr',1,'Explication',CTX,'headphones',false,p.fr,p.tgt,ex)); buf=''; };
  while((m = re.exec(text))){
    const nat = map[m[1]]; if(!nat) continue;
    buf += text.slice(last, m.index); flush();
    out.push(S(nat,'tgt',0.85,'Explication','var(--target)','speaker',false,p.fr,p.tgt,ex));
    last = re.lastIndex;
  }
  buf += text.slice(last); flush();
  return out;
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
  const withNotes = lesson.phrases.some(p=>p.note); // leçon « expliquée » (essai : chinois, niveau 1)
  lesson.phrases.forEach((p,i)=>{
    const ex = {idx:i, total: lesson.phrases.length};
    segs.push(S(p.fr, 'fr', 1, 'Aperçu des phrases', CTX, 'headphones', false, p.fr, '', ex));
    segs.push(W(withNotes ? 200 : 350, 'Aperçu des phrases', CTX, 'headphones', false, p.fr, '', ex));
  });
  segs.push(W(1800, 'Aperçu des phrases', CTX, 'headphones', false, '', ''));
  segs.push(S("C'est parti.", 'fr', 1, 'On y va', TGT, 'speaker', false, '', ''));
  segs.push(W(500, 'On y va', TGT, 'speaker', false, '', ''));

  // 3. Apprentissage : FR une fois, EN deux fois avec temps de répétition (+3s)
  lesson.phrases.forEach((p,i)=>{
    const repeatMs = Math.max(2200, (p.ro||p.tgt).length*80) + 3000;
    const ex = {idx:i, total: lesson.phrases.length};
    segs.push(S(p.fr, 'fr', 1, 'Écoute en français', CTX, 'headphones', false, p.fr, '', ex));
    segs.push(W(300, 'Écoute en français', CTX, 'headphones', false, p.fr, '', ex));
    segs.push(S(p.tgt, 'tgt', 0.85, `Écoute ${L.inLang}`, TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(repeatMs, 'À toi de répéter', SPK, 'repeat', true, p.fr, p.tgt, ex));
    segs.push(S(p.tgt, 'tgt', 0.85, 'Encore une fois', TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(repeatMs, 'À toi de répéter', SPK, 'repeat', true, p.fr, p.tgt, ex));
    if(p.note){
      // Leçon expliquée (essai : chinois, niveau 1) : après la phrase dite deux fois,
      // traduction mot à mot (chaque mot français, un petit temps entre chacun), puis les
      // mêmes mots dans la langue apprise au même rythme, puis la règle en une ou deux phrases.
      const GAP = 350, words = p.note.words || [];
      segs.push(S('Traduction mot à mot.', 'fr', 1, 'Mot à mot', CTX, 'headphones', false, p.fr, p.tgt, ex));
      segs.push(W(350, 'Mot à mot', CTX, 'headphones', false, p.fr, p.tgt, ex));
      words.forEach(w=>{
        segs.push(S(w[0].replace(/\s*\(=[^)]*\)/g, ''), 'fr', 1, 'Mot à mot', CTX, 'headphones', false, p.fr, p.tgt, ex));
        segs.push(W(GAP, 'Mot à mot', CTX, 'headphones', false, p.fr, p.tgt, ex));
      });
      segs.push(W(350, 'Mot à mot', CTX, 'headphones', false, p.fr, p.tgt, ex));
      words.forEach(w=>{
        segs.push(S(w[1], 'tgt', 0.85, `Mot à mot ${L.inLang}`, TGT, 'speaker', false, p.fr, p.tgt, ex));
        segs.push(W(GAP, `Mot à mot ${L.inLang}`, TGT, 'speaker', false, p.fr, p.tgt, ex));
      });
      segs.push(W(350, 'Explication', CTX, 'headphones', false, p.fr, p.tgt, ex));
      segs.push(...noteSpeech(p, ex));
      segs.push(W(900, 'Explication', CTX, 'headphones', false, p.fr, p.tgt, ex));
    }
  });

  // 3 bis. Leçon expliquée : on reprend toutes les phrases (FR une fois, cible deux fois),
  //         sans mot à mot ni règle, avant de passer aux phrases dans le désordre.
  if(withNotes){
    segs.push(S("On reprend toutes les phrases.", 'fr', 1, 'Répétition', TGT, 'speaker', false, '', ''));
    segs.push(W(500, 'Répétition', TGT, 'speaker', false, '', ''));
    lesson.phrases.forEach((p,i)=>{
      const repeatMs = Math.max(2200, (p.ro||p.tgt).length*80) + 3000;
      const ex = {idx:i, total: lesson.phrases.length};
      segs.push(S(p.fr, 'fr', 1, 'Écoute en français', CTX, 'headphones', false, p.fr, '', ex));
      segs.push(W(300, 'Écoute en français', CTX, 'headphones', false, p.fr, '', ex));
      segs.push(S(p.tgt, 'tgt', 0.85, `Écoute ${L.inLang}`, TGT, 'speaker', false, p.fr, p.tgt, ex));
      segs.push(W(repeatMs, 'À toi de répéter', SPK, 'repeat', true, p.fr, p.tgt, ex));
      segs.push(S(p.tgt, 'tgt', 0.85, 'Encore une fois', TGT, 'speaker', false, p.fr, p.tgt, ex));
      segs.push(W(repeatMs, 'À toi de répéter', SPK, 'repeat', true, p.fr, p.tgt, ex));
    });
  }

  // 4. Test 1 : ordre mélangé — pause de réflexion, puis réponse x2
  //    (+3s entre les deux répétitions de la réponse, comme demandé)
  segs.push(S("Tu vas tenter de répéter les phrases. Je te les donne dans un ordre différent.", 'fr', 1, 'Phase de test 1', SPK, 'repeat', false, '', ''));
  segs.push(W(700, 'Phase de test 1', SPK, 'repeat', false, '', ''));
  const shuffled = shuffleArray(lesson.phrases);
  shuffled.forEach((p,i)=>{
    const repeatMs = Math.max(2200, (p.ro||p.tgt).length*80) + 3000;
    const ex = {idx:i, total: shuffled.length};
    segs.push(S(p.fr, 'fr', 1, `Test 1 — traduis ${L.inLang}`, CTX, 'headphones', false, p.fr, '···', ex));
    segs.push(W(repeatMs, 'Test 1 — à toi de répondre', SPK, 'repeat', true, p.fr, '···', ex));
    segs.push(S(p.tgt, 'tgt', 0.85, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(400 + 3000, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(S(p.tgt, 'tgt', 0.85, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(400 + 3000, 'Test 1 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex)); // même durée que l'écart entre les 2 répétitions
  });

  // 5. Test 2 : ordre d'origine — même principe (+2s entre les deux répétitions)
  segs.push(S(`Maintenant, la phase de test. Essaie de traduire chaque phrase ${L.inLang}.`, 'fr', 1, 'Phase de test 2', SPK, 'repeat', false, '', ''));
  segs.push(W(700, 'Phase de test 2', SPK, 'repeat', false, '', ''));
  lesson.phrases.forEach((p,i)=>{
    const repeatMs = Math.max(2200, (p.ro||p.tgt).length*80) + 3000;
    const ex = {idx:i, total: lesson.phrases.length};
    segs.push(S(p.fr, 'fr', 1, `Test 2 — traduis ${L.inLang}`, CTX, 'headphones', false, p.fr, '···', ex));
    segs.push(W(repeatMs, 'Test 2 — à toi de répondre', SPK, 'repeat', true, p.fr, '···', ex));
    segs.push(S(p.tgt, 'tgt', 0.85, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(400 + 2000, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(S(p.tgt, 'tgt', 0.85, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex));
    segs.push(W(400 + 2000, 'Test 2 — réponse', TGT, 'speaker', false, p.fr, p.tgt, ex)); // même durée que l'écart entre les 2 répétitions
  });

  // 6. Clôture
  // La phrase de fin dit ce qui se passe VRAIMENT ensuite : leçon suivante, fin
  // du module, ou fin des leçons gratuites (l'auditeur ne voit pas l'écran).
  const next = nextPos(currentLevel, mi, li);
  const nextUnlocked = unlockedAt(next);
  const extrasFollow = lessonExtras(mi, li).length > 0;
  const sameModuleNext = nextUnlocked && next.lv === currentLevel && next.mi === mi;
  const closingText = (li === 0 && mi === 0 && currentLevel === 0)
    ? "Bravo, tu as fini la première leçon. Ce n'est jamais facile de commencer une nouvelle langue, mais tu verras, au fil des leçons, ça va être de plus en plus facile. Il suffit de pratiquer régulièrement."
    : (sameModuleNext && !extrasFollow ? "Ça y est, tu as fini la leçon. On va passer à la leçon suivante." : "Ça y est, tu as fini la leçon.");
  segs.push(S(closingText, 'fr', 1, 'Leçon terminée', SPK, 'check', false, '', ''));
  segs.push(W(3000, 'Leçon terminée', SPK, 'check', false, '', ''));

  // 7. Le point de grammaire n'est PAS collé ici : c'est un élément distinct, joué
  //    juste après la leçon dans l'enchaînement (voir lessonExtras).

  // 8. Mot de la fin quand rien ne s'enchaîne après cette leçon
  //    (s'il y a une évaluation ou une série après, il est dit à la fin de celle-ci).
  if(!nextUnlocked && !extrasFollow) segs.push(...byeSegments(mi, li));
  return segs;
}
// Mot de la fin quand l'enchaînement s'arrête après cette leçon (niveau courant) :
// fin des leçons gratuites, ou fin de tout le parcours.
function byeSegments(mi, li){
  const segs = [], SPK = 'var(--speak)';
  const next = nextPos(currentLevel, mi, li);
  if(unlockedAt(next)) return segs; // ça continue : pas de mot de la fin
  const bye = next
    ? "Bravo, tu as terminé les leçons gratuites ! Pour continuer, débloque la suite dans l'application, quand tu seras à l'arrêt."
    : "Bravo, tu es arrivé au bout de toutes les leçons ! Félicitations pour tout ce chemin parcouru.";
  segs.push(S(bye, 'fr', 1, 'Leçon terminée', SPK, 'check', false, '', ''));
  segs.push(W(1000, 'Leçon terminée', SPK, 'check', false, '', ''));
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
  const extra = enText && TGT_INDEX.get(enText);
  $('phraseRo').textContent = extra ? (extra.ro || '') : '';
  $('phraseLit').textContent = extra && extra.lit && currentLevel === 0 ? 'mot à mot : ' + extra.lit : '';
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
  const pr = (tip.example || '').split(' — ');
  $('tipExample').innerHTML = (L && L.rtl && pr.length === 2
      ? `<div>${pr[0]}</div><div class="tip-tgt-rtl" dir="rtl">${pr[1]}</div>`
      : tip.example)
    + (tip.exampleRo ? `<div class="tip-ro">${tip.exampleRo}</div>` : '')
    + (tip.lit ? `<div class="tip-lit">mot à mot : ${tip.lit}</div>` : '');
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
/* ---------- choix explicite de la meilleure voix iOS/Android ----------
   Quand on ne passe que la langue au plugin, iOS utilise la voix par défaut
   de base (compacte, robotique) et IGNORE la voix téléchargée dans Réglages >
   Accessibilité > Contenu énoncé. On liste donc les voix installées et on
   désigne nous-mêmes la meilleure : Premium > Améliorée > standard (jamais
   les voix "fantaisie"). Liste relue au retour au premier plan, pour qu'une
   voix téléchargée entre-temps soit prise en compte sans relancer l'app. */
const VOICE_LANGS = {
  fr:  { exact:'fr-fr', prefix:'fr', label:'Français', settings:'Français, puis les voix « France »', sample:"Bonjour, c'est moi qui te lirai les phrases en français." },
  tgt: null // rempli par setLanguage() avec LANGS[code].voice
};
// Clé de préférence de voix : « fr » pour le français, « tgt_<code> » pour la langue apprise.
function voicePrefKey(key){ return key === 'fr' ? 'fr' : 'tgt_' + currentLang; }
let nativeVoiceIdx = {};
let nativeVoiceList = [];
let nativeVoicesLoaded = false;
function voiceQuality(v){
  const id = ((v.voiceURI||'') + ' ' + (v.name||'')).toLowerCase();
  if(id.includes('eloquence') || id.includes('speech.synthesis.voice') || id.includes('novelty')) return -100;
  if(id.includes('premium')) return 30;
  if(id.includes('enhanced') || id.includes('amélior') || id.includes('network') || id.includes('réseau')) return 20;
  if(id.includes('compact')) return -5;
  return 0;
}
function voiceQualityLabel(v){
  const q = voiceQuality(v);
  return q >= 30 ? 'Premium' : q >= 20 ? 'Améliorée' : 'Standard';
}
const normLang = v=>(v.lang||'').toLowerCase().replace('_','-');
function voicesFor(key){
  const L = VOICE_LANGS[key];
  const all = nativeVoiceList.map((v,i)=>({v,i})).filter(o=>voiceQuality(o.v) > -50);
  let c = all.filter(o=>normLang(o.v) === L.exact);
  const others = all.filter(o=>normLang(o.v) !== L.exact && normLang(o.v).startsWith(L.prefix));
  c = c.sort((a,b)=>voiceQuality(b.v)-voiceQuality(a.v) || (a.v.name||'').localeCompare(b.v.name||''));
  return c.concat(others.sort((a,b)=>voiceQuality(b.v)-voiceQuality(a.v)));
}
function loadVoicePrefs(){ try{ return JSON.parse(localStorage.getItem('montrajet_voices')||'{}'); }catch(e){ return {}; } }
function saveVoicePrefs(p){ try{ localStorage.setItem('montrajet_voices', JSON.stringify(p)); }catch(e){} }
function resolveVoiceIdx(){
  const prefs = loadVoicePrefs();
  nativeVoiceIdx = {};
  for(const key of Object.keys(VOICE_LANGS)){
    const cands = voicesFor(key);
    const pk = voicePrefKey(key);
    const chosen = prefs[pk] && cands.find(o=>o.v.voiceURI === prefs[pk]);
    nativeVoiceIdx[key] = chosen ? chosen.i : (cands.length ? cands[0].i : -1);
  }
}
async function loadNativeVoices(){
  if(nativeVoicesLoaded) return;
  nativeVoicesLoaded = true;
  const tts = getTTSPlugin();
  if(!tts || !tts.getSupportedVoices) return;
  try{
    const r = await tts.getSupportedVoices();
    nativeVoiceList = (r && r.voices) || [];
  }catch(e){ nativeVoiceList = []; }
  resolveVoiceIdx();
}
document.addEventListener('visibilitychange', async ()=>{
  if(document.hidden) return;
  syncNativeSequence();
  nativeVoicesLoaded = false;
  // Retour des Réglages avec l'écran des voix ouvert : on relit la liste tout de suite.
  if($('voicePicker') && $('voicePicker').classList.contains('show') && isNativeApp()){ await loadNativeVoices(); renderVoicePicker(); }
  if(L && isNativeApp()) refreshVoiceWarning(false);
});

/* ---------- écran "Choisir les voix" ----------
   Liste les voix réellement installées sur le téléphone pour le français et
   la langue apprise, avec leur qualité. Un appui choisit la voix (mémorisée)
   et la fait entendre. Par défaut, la meilleure voix est choisie. */
async function openVoicePicker(){
  $('voicePicker').classList.add('show');
  $('voiceLists').innerHTML = '<div class="voice-empty">Chargement des voix…</div>';
  if(!isNativeApp()){
    $('voiceLists').innerHTML = '<div class="voice-empty">Le choix des voix est disponible dans l\'app sur iPhone.</div>';
    return;
  }
  nativeVoicesLoaded = false;
  await loadNativeVoices();
  renderVoicePicker();
}
function closeVoicePicker(){ $('voicePicker').classList.remove('show'); cancelSpeech(); }
function renderVoicePicker(){
  let html = '';
  for(const key of Object.keys(VOICE_LANGS)){
    const L = VOICE_LANGS[key];
    const cands = voicesFor(key);
    html += `<div class="voice-section"><div class="voice-section-title">${L.label}</div>`;
    if(!cands.length) html += '<div class="voice-empty">Aucune voix installée pour cette langue.</div>';
    for(const o of cands){
      const sel = nativeVoiceIdx[key] === o.i;
      html += `<div class="voice-item${sel?' selected':''}" data-key="${key}" data-i="${o.i}">
        <div><div class="voice-name">${o.v.name || 'Voix'}</div><div class="voice-meta">${voiceQualityLabel(o.v)} · ${o.v.lang||''}</div></div>
        <div class="voice-check">${sel?'✓':''}</div></div>`;
    }
    html += `<button class="voice-more" data-help="${key}">＋ Plus de voix ${key === 'fr' ? 'en français' : LANGS[currentLang].inLang}</button>
      <div class="voice-help" id="voiceHelp-${key}">Ton iPhone n'affiche ici que les voix <b>déjà téléchargées</b>. D'autres voix, d'homme ou de femme, sont disponibles gratuitement :<ol>
        <li>Ouvre l'app <b>Réglages</b> de l'iPhone</li><li><b>Accessibilité</b></li><li><b>Contenu énoncé</b> (ou <b>Lire et énoncer</b>)</li><li><b>Voix</b></li><li><b>${L.settings}</b></li>
        <li>Touche une voix (de préférence <b>Premium</b> ou <b>Améliorée</b>) et télécharge-la</li></ol>Reviens ensuite dans l'app : la nouvelle voix apparaîtra ici automatiquement. Les voix Siri ne sont pas disponibles pour les applications.</div>`;
    html += '</div>';
  }
  $('voiceLists').innerHTML = html;
  document.querySelectorAll('.voice-more').forEach(b=>{
    b.onclick = ()=>{ const h = $('voiceHelp-' + b.dataset.help); h.classList.toggle('show'); };
  });
  document.querySelectorAll('.voice-item').forEach(el=>{
    el.onclick = async ()=>{
      const key = el.dataset.key, i = parseInt(el.dataset.i, 10);
      const v = nativeVoiceList[i];
      const prefs = loadVoicePrefs(); prefs[voicePrefKey(key)] = v.voiceURI; saveVoicePrefs(prefs);
      nativeVoiceIdx[key] = i;
      renderVoicePicker();
      const tts = getTTSPlugin();
      if(tts){ try{ await tts.stop(); await tts.speak({ text: VOICE_LANGS[key].sample, lang: v.lang, voice: i, rate: 1, category: 'ambient' }); }catch(e){} }
    };
  });
}
async function cancelSpeech(){
  nativeSeq = null; stopNativeTicker();
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
    const lang = seg.lang === 'fr' ? 'fr-FR' : L.tts;

    if(isNativeApp()){
      const tts = getTTSPlugin();
      if(!tts){ resolve(); return; }
      await loadNativeVoices();
      const opts = { text: seg.text, lang, rate: seg.rate || 1, category: 'ambient' };
      const vi = nativeVoiceIdx[seg.lang === 'fr' ? 'fr' : 'tgt'];
      if(typeof vi === 'number' && vi >= 0) opts.voice = vi;
      try{
        await tts.speak(opts);
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

/* ---------- lecture native en séquence (écran éteint / verrouillé) ----------
   iOS gèle la page web (donc le JavaScript et ses minuteries) quand l'écran
   s'éteint : l'ancienne boucle phrase → silence → phrase s'arrêtait alors.
   Dans l'app, on confie donc au code natif TOUTE la leçon d'un bloc
   (phrases + silences de répétition), ainsi que les leçons suivantes
   débloquées du module, enchaînées comme le ferait goToNextLessonOrStop().
   Le natif joue tout seul, écran noir ou verrouillé ; il envoie des
   événements (seqProgress / seqEnd) que la page traite quand elle est
   active, pour l'affichage et la progression. */
var nativeSeq = null;      // { id, token, programs:[{prog, segs}], map:[{p,s}], curP }
var nativeSeqCounter = 0;
var nativeListenersOn = false;
var nativeTicker = null, nativeSegStartedAt = 0, nativePausedAt = 0;
var segStartedAt = 0;      // moment où le segment en cours a démarré (pour « −10 s »)

function canUseNativeSequence(){
  const tts = isNativeApp() && getTTSPlugin();
  return !!(tts && typeof tts.playSequence === 'function');
}
function ensureNativeListeners(){
  if(nativeListenersOn) return;
  const tts = getTTSPlugin();
  if(!tts || typeof tts.addListener !== 'function') return;
  nativeListenersOn = true;
  try{ tts.addListener('seqProgress', ev=>onNativeSeqProgress(ev)); }catch(e){}
  try{ tts.addListener('seqEnd', ev=>onNativeSeqEnd(ev)); }catch(e){}
  // Appel téléphonique, Siri, alarme… : iOS coupe le son ; le natif met la leçon
  // en pause et la reprend tout seul à la fin de l'interruption.
  try{ tts.addListener('seqPaused', ev=>applyNativePause(ev, true)); }catch(e){}
  try{ tts.addListener('seqResumed', ev=>applyNativePause(ev, false)); }catch(e){}
}
function applyNativePause(ev, paused){
  const sq = nativeSeq;
  if(!sq || !ev || ev.seq !== sq.id || isPaused === paused) return;
  isPaused = paused;
  setPlayIcon(paused);
  if(paused){ nativePausedAt = Date.now(); }
  else if(nativePausedAt){ nativeSegStartedAt += Date.now() - nativePausedAt; nativePausedAt = 0; }
}
// Ce qui suit une leçon dans l'enchaînement automatique (nouvelle méthode) :
// son évaluation puis sa série fermée, s'il y en a.
function lessonExtras(mi, li){
  const out = [];
  const m = MODULES[mi];
  if(!m || !m.lessons[li]) return out;
  if(m.lessons[li].tip) out.push({type:'tip', lv:currentLevel, mi, li, chained:true});
  const info = EVAL_NUMBERS[mi+'-'+li];
  if(info) out.push({type:'eval', lv:currentLevel, mi, anchor:li, li, chained:true});
  if(m.lessons[li].series) out.push({type:'series', lv:currentLevel, mi, li, chained:true});
  return out;
}
function programSegments(prog){
  return withLevel(prog.lv, ()=>{
    if(prog.type === 'lesson') return buildLessonSegments(prog.mi, prog.li);
    if(prog.type === 'series') return buildSeriesSegments(prog.mi, prog.li);
    if(prog.type === 'tip') return buildTipSegments(MODULES[prog.mi].lessons[prog.li].tip, TIP_NUMBERS[prog.mi+'-'+prog.li] || '');
    if(prog.type === 'eval'){ const info = EVAL_NUMBERS[prog.mi+'-'+prog.anchor]; return buildEvalSegments(prog.mi, prog.anchor, info.isFinal, info.isFinal ? 'Évaluation finale' : `Évaluation ${info.num}`); }
    return [];
  });
}
const CHAIN_MAX = 40; // ≈ 6 à 8 heures d'écoute sans toucher au téléphone
function lessonChainAfter(prog){
  // Tout ce qui suit automatiquement : évaluations, séries, leçons, modules, niveaux.
  const out = [];
  if(tgtVoiceMissing) return out; // langue sans voix : on n'enchaîne pas sur des leçons muettes
  const lv0 = prog.lv !== undefined ? prog.lv : currentLevel;
  let pos, extrasLeft = [];
  if(prog.type === 'intro'){ pos = {lv:0, mi:0, li:-1}; }
  else if(prog.type === 'lesson'){ pos = {lv:lv0, mi:prog.mi, li:prog.li}; extrasLeft = withLevel(lv0, ()=>lessonExtras(prog.mi, prog.li)); }
  else if(prog.type === 'tip' || prog.type === 'eval' || prog.type === 'series'){
    // reprise (±10 s…) au milieu d'une évaluation ou d'une série enchaînée
    const li = prog.type === 'eval' ? prog.anchor : prog.li;
    pos = {lv:lv0, mi:prog.mi, li};
    const all = withLevel(lv0, ()=>lessonExtras(prog.mi, li));
    extrasLeft = all.slice(all.findIndex(x=>x.type === prog.type) + 1);
  }
  else return out;
  const push = p => out.push({ prog:p, segs: programSegments(p) });
  extrasLeft.forEach(push);
  let p = nextPos(pos.lv, pos.mi, pos.li);
  while(p && unlockedAt(p) && out.length < CHAIN_MAX){
    const lessonProg = {type:'lesson', lv:p.lv, mi:p.mi, li:p.li, chained:true};
    const segs = programSegments(lessonProg);
    // Changement de module ou de niveau : on l'annonce (l'auditeur ne voit pas l'écran).
    if(pos.li >= 0 && (p.mi !== pos.mi || p.lv !== pos.lv)){
      const SPK = 'var(--speak)', name = LEVELS[p.lv].modules[p.mi].name;
      const txt = p.lv !== pos.lv
        ? `Bravo, tu as terminé le niveau ${pos.lv + 1} ! On passe au niveau ${p.lv + 1}, module : ${name}.`
        : `Bravo, module terminé ! On passe au module suivant : ${name}.`;
      segs.unshift(S(txt, 'fr', 1, 'Module suivant', SPK, 'check', false, '', ''), W(1200, 'Module suivant', SPK, 'check', false, '', ''));
    }
    out.push({ prog:lessonProg, segs });
    withLevel(p.lv, ()=>lessonExtras(p.mi, p.li)).forEach(push);
    pos = p;
    p = nextPos(p.lv, p.mi, p.li);
  }
  // Le mot de la fin (fin des leçons gratuites / du parcours) est dit après la dernière évaluation ou série.
  const last = out.length ? out[out.length-1] : null;
  if(last && last.prog.type !== 'lesson' && (!p || !unlockedAt(p))) last.segs = last.segs.concat(withLevel(pos.lv, ()=>byeSegments(pos.mi, pos.li)));
  return out;
}
function nativeItemFor(seg){
  if(seg.type !== 'speak') return { k:'w', ms: seg.ms };
  const it = { k:'s', text: seg.text, lang: seg.lang === 'fr' ? 'fr-FR' : L.tts, rate: seg.rate || 1 };
  const vi = nativeVoiceIdx[seg.lang === 'fr' ? 'fr' : 'tgt'];
  it.voice = (typeof vi === 'number' && vi >= 0) ? vi : -1;
  return it;
}
async function playFromNative(startIndex, token){
  await loadNativeVoices();
  if(token !== playToken) return true;
  const programs = [{ prog: currentProgram, segs: segments }, ...lessonChainAfter(currentProgram)];
  const items = [], map = [];
  programs.forEach((pg, p)=>{
    for(let s = (p === 0 ? startIndex : 0); s < pg.segs.length; s++){
      items.push(nativeItemFor(pg.segs[s])); map.push({p, s});
    }
  });
  const id = ++nativeSeqCounter;
  ensureNativeListeners();
  nativeSeq = { id, token, programs, map, curP: 0 };
  try{
    await getTTSPlugin().playSequence({ items, start: 0, seq: id });
  }catch(e){
    nativeSeq = null;
    return false; // ancienne app native sans séquence : on retombe sur la boucle JS
  }
  startNativeTicker();
  return true;
}
function completeKey(prog){
  const lv = 'lv'+LEVELS[currentLevel].id;
  if(prog.type === 'tip') return lv+'-tip-'+prog.mi+'-'+prog.li;
  if(prog.type === 'eval') return lv+'-eval-'+prog.mi+'-'+prog.anchor;
  if(prog.type === 'series') return lv+'-series-'+prog.mi+'-'+prog.li;
  return null;
}
function markDone(prog){ const k = completeKey(prog); if(k && !state.completed.includes(k)){ state.completed.push(k); saveState(state); } }
function finishProgramQuietly(prog){
  if(prog.type === 'intro'){ state.introDone = true; saveState(state); }
  else if(prog.type === 'lesson'){ markLessonComplete(prog.mi, prog.li); }
  else markDone(prog);
}
function programTitle(prog){
  const m = MODULES[prog.mi];
  if(prog.type === 'lesson'){ const lesson = m.lessons[prog.li]; return `${m.name} · Leçon ${prog.li+1}${lesson.title? ' · '+lesson.title:''}`; }
  if(prog.type === 'eval'){ const info = EVAL_NUMBERS[prog.mi+'-'+prog.anchor]; return `${m.name} · ${info.isFinal ? 'Évaluation finale' : 'Évaluation '+info.num}`; }
  if(prog.type === 'series') return `${m.name} · Série · ${m.lessons[prog.li].series.title}`;
  if(prog.type === 'tip') return `Point grammaire ${TIP_NUMBERS[prog.mi+'-'+prog.li] || ''}`;
  return '';
}
function switchToChainedProgram(pg){
  currentProgram = pg.prog;
  segments = pg.segs;
  if(pg.prog.lv !== undefined && pg.prog.lv !== currentLevel) setLevelQuiet(pg.prog.lv);
  currentModule = pg.prog.mi !== undefined ? pg.prog.mi : currentModule;
  if(pg.prog.type === 'lesson') currentLesson = pg.prog.li;
  const t = programTitle(pg.prog); if(t) $('sessName').textContent = t;
}
function onNativeSeqProgress(ev){
  const sq = nativeSeq;
  if(!sq || !ev || ev.seq !== sq.id || sq.token !== playToken) return;
  const pos = sq.map[ev.index];
  if(!pos) return;
  while(sq.curP < pos.p){
    finishProgramQuietly(sq.programs[sq.curP].prog);
    sq.curP++;
    switchToChainedProgram(sq.programs[sq.curP]);
  }
  segIndex = pos.s;
  const seg = segments[segIndex];
  if(seg) updateUIForSegment(seg);
  elapsedBaseMs = computeSegmentStarts()[segIndex] || 0;
  nativeSegStartedAt = Date.now(); nativePausedAt = isPaused ? Date.now() : 0;
  segStartedAt = Date.now();
  updateScrubberLive(elapsedBaseMs);
}
function onNativeSeqEnd(ev){
  const sq = nativeSeq;
  if(!sq || !ev || ev.seq !== sq.id || sq.token !== playToken) return;
  while(sq.curP < sq.programs.length - 1){
    finishProgramQuietly(sq.programs[sq.curP].prog);
    sq.curP++;
    switchToChainedProgram(sq.programs[sq.curP]);
  }
  nativeSeq = null; stopNativeTicker();
  onProgramFinished(playToken);
}
function startNativeTicker(){
  stopNativeTicker();
  nativeSegStartedAt = Date.now(); nativePausedAt = 0;
  nativeTicker = setInterval(()=>{
    if(!nativeSeq || isPaused) return;
    const seg = segments[segIndex];
    if(!seg) return;
    const dur = seg.type === 'speak' ? seg.estMs : seg.ms;
    updateScrubberLive(elapsedBaseMs + Math.min(Date.now() - nativeSegStartedAt, dur));
  }, 250);
}
function stopNativeTicker(){ if(nativeTicker){ clearInterval(nativeTicker); nativeTicker = null; } }
async function syncNativeSequence(){
  if(!nativeSeq) return;
  const tts = getTTSPlugin();
  if(!tts || typeof tts.getSequenceState !== 'function') return;
  try{
    const st = await tts.getSequenceState();
    if(!st || !nativeSeq || st.seq !== nativeSeq.id) return;
    if(st.active){
      if(st.index !== undefined && nativeSeq.map[st.index] && (nativeSeq.map[st.index].p !== nativeSeq.curP || nativeSeq.map[st.index].s !== segIndex)) onNativeSeqProgress({ seq: st.seq, index: st.index });
      applyNativePause({ seq: st.seq }, !!st.paused);
    } else if(st.ended){
      onNativeSeqEnd({ seq: st.seq }); // la fin est arrivée pendant que la page dormait
    }
  }catch(e){}
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

  segStartedAt = Date.now();
  if(canUseNativeSequence()){
    const seg0 = segments[startIndex];
    if(seg0) updateUIForSegment(seg0);
    if(await playFromNative(startIndex, token)) return;
    if(token !== playToken) return;
  }

  while(segIndex < segments.length){
    if(token !== playToken) return;
    await waitWhilePaused(token);
    if(token !== playToken) return;
    const seg = segments[segIndex];
    updateUIForSegment(seg);
    segStartedAt = Date.now();

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
    startLesson(0, 0); // enchaîne directement sur la toute première leçon, gratuite (sauf langue sans voix : voir voiceGuard)
  } else if(currentProgram.type === 'tip' || currentProgram.type === 'eval' || currentProgram.type === 'series'){
    markDone(currentProgram);
    // élément suivant de la même leçon (évaluation, série), sinon leçon suivante / écran d'achat / fin
    const li0 = currentProgram.type === 'eval' ? currentProgram.anchor : currentProgram.li;
    const rest = lessonExtras(currentProgram.mi, li0); const k = rest.findIndex(x=>x.type === currentProgram.type);
    if(k >= 0 && rest[k+1]){ startExtra(rest[k+1]); return; }
    goToNextLessonOrStop(currentProgram.mi, li0, token);
  } else {
    markLessonComplete(currentProgram.mi, currentProgram.li);
    // évaluation / série de cette leçon d'abord (mode navigateur ; en natif elles sont déjà dans la séquence)
    const ex = lessonExtras(currentProgram.mi, currentProgram.li);
    if(ex.length){ startExtra(ex[0]); return; }
    goToNextLessonOrStop(currentProgram.mi, currentProgram.li, token);
  }
}

// Langue sans voix installée : on ne lance jamais une leçon qui resterait muette ;
// on ferme la séance en cours et on montre comment installer la voix.
function voiceGuard(){
  if(!tgtVoiceMissing) return false;
  if($('session').style.display === 'flex') closeSession();
  openNoVoiceHelp();
  return true;
}

function startExtra(x){
  if(x.type === 'tip') startTip(x.mi, x.li);
  else if(x.type === 'eval') startEval(x.mi, x.anchor);
  else startSeries(x.mi, x.li);
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
  if(voiceGuard()) return;
  const lesson = MODULES[mi].lessons[li];
  if(!lesson || !lesson.tip) return;
  const tipNum = TIP_NUMBERS[mi+'-'+li] || '';

  currentProgram = {type:'tip', lv:currentLevel, mi, li, chained:true};
  segments = buildTipSegments(lesson.tip, tipNum);

  $('home').style.display = 'none';
  $('session').style.display = 'flex';
  hideTipCard();
  setPlayIcon(false);
  $('sessName').textContent = `Point grammaire ${tipNum}`;

  playFrom(0);
}

// Lecture d'une "Évaluation" : révision aléatoire des leçons précédentes.
function startEval(mi, anchor, chained){
  if(voiceGuard()) return;
  const info = EVAL_NUMBERS[mi+'-'+anchor];
  if(!info) return;
  const evalLabel = info.isFinal ? 'Évaluation finale' : `Évaluation ${info.num}`;

  currentProgram = {type:'eval', lv:currentLevel, mi, anchor, li:anchor, chained:true};
  segments = buildEvalSegments(mi, anchor, info.isFinal, evalLabel);

  $('home').style.display = 'none';
  $('session').style.display = 'flex';
  hideTipCard();
  setPlayIcon(false);
  $('sessName').textContent = `${MODULES[mi].name} · ${evalLabel}`;

  playFrom(0);
}

// Lecture d'une série fermée (nouvelle méthode).
function startSeries(mi, li, chained){
  if(voiceGuard()) return;
  const lesson = MODULES[mi].lessons[li];
  if(!lesson || !lesson.series) return;
  currentProgram = {type:'series', lv:currentLevel, mi, li, chained:true};
  segments = buildSeriesSegments(mi, li);
  $('home').style.display = 'none';
  $('session').style.display = 'flex';
  hideTipCard();
  setPlayIcon(false);
  $('sessName').textContent = programTitle(currentProgram);
  playFrom(0);
}

function startLesson(mi, li){
  if(voiceGuard()) return;
  currentModule = mi; currentLesson = li;
  currentProgram = {type:'lesson', lv:currentLevel, mi, li};
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
  const p = nextPos(currentLevel, mi, li);
  if(p && unlockedAt(p)){
    if(p.lv !== currentLevel) setLevelQuiet(p.lv);
    startLesson(p.mi, p.li);
  } else if(p){
    closeSession();
    openPaywall();
  } else {
    closeSession();
    showToast('Bravo, tu as terminé toutes les leçons ! 🎉', 4000);
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
// On reprend toujours sur une phrase parlée : atterrir au début d'un long
// silence (« à toi de répéter ») donnerait l'impression que rien ne se passe.
function snapToSpeech(idx, forward){
  const last = segments.length - 1;
  idx = Math.max(0, Math.min(idx, last));
  if(forward){ while(idx < last && segments[idx].type === 'wait') idx++; }
  else { while(idx > 0 && segments[idx].type === 'wait') idx--; }
  return idx;
}
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
  playFrom(snapToSpeech(idx, false));
}
function skipBy(deltaMs){
  if(!segments.length) return;
  const starts = computeSegmentStarts();
  const base = starts[segIndex] !== undefined ? starts[segIndex] : elapsedBaseMs;
  if(deltaMs > 0){
    // +10 s : on avance TOUJOURS d'au moins un passage (avant, pendant un long
    // texte, « +10 » relançait ce même texte depuis son début).
    if(segIndex >= segments.length - 1) return;
    let idx = segIndex + 1;
    while(idx < segments.length - 1 && starts[idx + 1] <= base + deltaMs) idx++;
    cancelSpeech();
    playFrom(snapToSpeech(idx, true));
    return;
  }
  // −10 s : si la phrase en cours est entamée depuis plus de 4 s, on la réécoute ;
  // sinon on remonte de 10 s avant son début.
  const cur = segments[segIndex];
  if(cur && cur.type === 'speak' && Date.now() - segStartedAt > 4000){ cancelSpeech(); playFrom(segIndex); return; }
  seekToMs(base + deltaMs);
}

/* ---------- PAYWALL / ACHAT INTÉGRÉ (RevenueCat) ----------
   RevenueCat gère StoreKit (iOS) et Play Billing (Android) derrière une
   seule API, via le plugin Capacitor "@revenuecat/purchases-capacitor".
   Tant que l'app tourne dans un navigateur normal (comme pendant tes
   tests avec npx serve), window.Capacitor n'existe pas : on retombe
   alors automatiquement sur le stub, pour continuer à pouvoir tester
   sans payer. Le vrai flux ne s'active QUE dans l'app compilée. */

// Clés publiques RevenueCat (App Store). Les produits et entitlements
// par langue sont dans LANGS (en haut du fichier) ; l'abonnement « Toutes les
// langues » dans SUB_MONTHLY_PRODUCT / SUB_YEARLY_PRODUCT / ALL_LANGS_ENTITLEMENT.
const REVENUECAT_API_KEY_IOS = 'appl_qNDcGongiAZkuJLEfSPhEjMlQDq';
const REVENUECAT_API_KEY_ANDROID = 'TODO_REVENUECAT_ANDROID_KEY';

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
  const active = (customerInfo && customerInfo.entitlements && customerInfo.entitlements.active) || {};
  const a = {};
  if(active[ALL_LANGS_ENTITLEMENT]) a.all = true;
  for(const code of Object.keys(LANGS)){ if(active[LANGS[code].entitlement]) a[code] = true; }
  access = a; saveAccess(a);
  if(currentLang) renderHome();
}

// Prix affichés sur le paywall : lus dans RevenueCat (donc dans l'App Store,
// dans la devise du client) ; valeurs par défaut en attendant.
let storePackages = null; // { [productId]: package }
async function loadStorePackages(){
  if(storePackages) return storePackages;
  const Purchases = getPurchasesPlugin();
  if(!isNativeApp() || !Purchases) return null;
  try{
    const offerings = await Purchases.getOfferings();
    const map = {};
    const all = offerings && offerings.all ? Object.values(offerings.all) : [];
    if(offerings && offerings.current) all.unshift(offerings.current);
    all.forEach(o=>((o && o.availablePackages) || []).forEach(p=>{ if(p.product && p.product.identifier && !map[p.product.identifier]) map[p.product.identifier] = p; }));
    storePackages = map;
  }catch(e){ storePackages = null; }
  return storePackages;
}
function priceOf(productId, fallback){
  const p = storePackages && storePackages[productId];
  return p && p.product && p.product.priceString ? p.product.priceString : fallback;
}

async function openPaywall(){
  $('paywallTitle').textContent = `Débloque les 1800 phrases ${L.inLang}`;
  $('buyBtn').textContent = `Débloquer ${L.name} — 9,99 €`;
  $('subMonthlyBtn').textContent = `Toutes les langues — 8,99 € / mois`;
  $('subYearlyBtn').textContent = `Toutes les langues — 59,99 € / an`;
  $('paywall').classList.add('show');
  await loadStorePackages();
  $('buyBtn').textContent = `Débloquer ${L.name} — ${priceOf(L.product, '9,99 €')}`;
  $('subMonthlyBtn').textContent = `Toutes les langues — ${priceOf(SUB_MONTHLY_PRODUCT, '8,99 €')} / mois`;
  $('subYearlyBtn').textContent = `Toutes les langues — ${priceOf(SUB_YEARLY_PRODUCT, '59,99 €')} / an`;
}
function closePaywall(){ $('paywall').classList.remove('show'); }

// Déverrouillage LOCAL uniquement (mode test navigateur : aucun vrai paiement).
function unlockLocal(all){
  if(all) access.all = true; else access[currentLang] = true;
  saveAccess(access);
  closePaywall();
  renderHome();
  showToast(all ? 'Toutes les langues débloquées 🎉' : `${L.name} débloqué 🎉`);
}

async function purchaseProduct(productId, all){
  if(!isNativeApp()){ unlockLocal(all); return; }
  const Purchases = getPurchasesPlugin();
  if(!Purchases){ showToast("Le module d'achat n'est pas disponible."); return; }
  try{
    await loadStorePackages();
    const pkg = storePackages && storePackages[productId];
    if(!pkg){ showToast("Produit indisponible pour le moment. Réessaie plus tard."); return; }
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
    applyCustomerInfo(customerInfo);
    if(hasAccess()){ closePaywall(); showToast(all ? 'Toutes les langues débloquées 🎉' : `${L.name} débloqué 🎉`); }
  }catch(e){
    if(e && e.userCancelled) return;
    showToast("L'achat n'a pas pu aboutir. Réessaie plus tard.");
  }
}
function buyPremium(){ return purchaseProduct(L.product, false); }
function buySubMonthly(){ return purchaseProduct(SUB_MONTHLY_PRODUCT, true); }
function buySubYearly(){ return purchaseProduct(SUB_YEARLY_PRODUCT, true); }

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
    showToast(hasAccess() ? 'Achat restauré ✓' : 'Aucun achat trouvé pour cette langue.');
    if(hasAccess()) closePaywall();
  }catch(e){
    showToast("La restauration n'a pas pu aboutir. Réessaie dans un instant.");
  }
}
function openExternal(url){
  try{
    const B = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser;
    if(B && B.open){ B.open({ url }); return; }
  }catch(e){}
  window.open(url, '_blank');
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
  if(nativeSeq){
    const tts = getTTSPlugin();
    if(isPaused){ nativePausedAt = Date.now(); try{ tts.pauseSequence(); }catch(e){} }
    else { if(nativePausedAt){ nativeSegStartedAt += Date.now() - nativePausedAt; nativePausedAt = 0; } try{ tts.resumeSequence(); }catch(e){} }
    return;
  }
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
    if(lesson.series) seq.push({type:'series', li});
  }
  return seq;
}
function currentSeqIndex(seq){
  if(currentProgram.type === 'lesson') return seq.findIndex(it=>it.type==='lesson' && it.li===currentProgram.li);
  if(currentProgram.type === 'tip') return seq.findIndex(it=>it.type==='tip' && it.li===currentProgram.li);
  if(currentProgram.type === 'eval') return seq.findIndex(it=>it.type==='eval' && it.li===currentProgram.anchor);
  if(currentProgram.type === 'series') return seq.findIndex(it=>it.type==='series' && it.li===currentProgram.li);
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
  if(item.type === 'series'){
    if(!isLessonUnlocked(MODULES[mi].id, item.li)){ openPaywall(); return true; }
    startSeries(mi, item.li); return true;
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
$('subMonthlyBtn').onclick = buySubMonthly;
$('subYearlyBtn').onclick = buySubYearly;
$('restoreBtn').onclick = restorePremium;
$('closePaywallBtn').onclick = closePaywall;
$('termsLink').onclick = (e)=>{ e.preventDefault(); openExternal(TERMS_URL); };
$('privacyLink').onclick = (e)=>{ e.preventDefault(); openExternal(PRIVACY_URL); };
$('voiceBtn').onclick = openVoicePicker;
$('closeVoiceBtn').onclick = closeVoicePicker;
$('langBtn').onclick = openLangPicker;
$('noVoiceBanner').onclick = openNoVoiceHelp;
$('closeLangBtn').onclick = closeLangPicker;

if('speechSynthesis' in window){
  speechSynthesis.onvoiceschanged = ()=>{ voices = speechSynthesis.getVoices(); };
}

/* ---------- démarrage ----------
   Langue mémorisée -> accueil directement ; sinon écran de choix de la langue. */
(async function init(){
  initPurchases();
  let saved = null;
  try{ saved = localStorage.getItem('montrajet_lang'); }catch(e){}
  if(saved && LANGS[saved] && await setLanguage(saved)) return;
  openLangPicker();
})();
