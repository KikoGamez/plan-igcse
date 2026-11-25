/* Exam practice and level tracking.
   - Exam questions per topic (content/exam/<topic>.json), self-marked against the mark scheme.
   - Strengths & weaknesses per topic, from quizzes, practice and exam questions.
   - Timed mocks and 20-minute target tests on the weakest topics.
   Results live in localStorage 'igcse-exam-v1' (per topic) and 'igcse-mock-v1' (mock history) and sync with the account. */
(function(){
const EK='igcse-exam-v1',MK='igcse-mock-v1',QK='igcse-quiz-v1',CK='igcse-cards-v1',PK='igcse-plan-v1',PROFK='igcse-profile-v1';
const qs=new URLSearchParams(location.search);
const ES=/\/es\//.test(location.pathname)||qs.get('lang')==='es';
const BASE=/\/es\//.test(location.pathname)?'../':'';
const NOBANK=['art'];
const BASE9=['math','stats','bio','chem','phys','bus','eng','fr','spa'];
const L=ES?{
  nav:'Mi nivel',navSub:'Temas fuertes y flojos',eyebrow:'Mi nivel',h:'Temas fuertes y flojos',
  lead:'Se calcula con todo lo que haces: mini tests, práctica y preguntas de examen. Empieza por lo rojo.',
  strong:'Fuerte',mid:'A repasar',weak:'Flojo',none:'Sin datos',
  prio:'Prioridad ahora',prioS:'Tus temas más flojos de todas las asignaturas.',prioNone:'Todavía no hay datos suficientes. Haz los mini tests de cada sesión y las preguntas de examen de cada tema, y aquí verás qué repasar primero.',
  exam:'Preguntas de examen',examBtn:'📝 Preguntas de examen',practice:'Practicar',
  target:'🎯 Test de temas flojos · 20 min',mock:'⏱ Simulacro',mins:m=>`${m} min`,
  targetNone:'Aún no hay temas flojos con datos en esta asignatura.',
  history:'Últimos simulacros',noBank:'Esta asignatura no tiene examen escrito, así que no hay preguntas de examen ni simulacros.',
  topics:'Temas',score:'Nivel',of:(a,b)=>`${a} de ${b} temas con datos`,
  q:n=>`Pregunta ${n}`,marks:m=>m===1?'[1 punto]':`[${m} puntos]`,answer:'Tu respuesta',answerPh:'Escribe tu respuesta como en el examen…',
  showMs:'Ver mark scheme',ms:'Mark scheme',msHint:m=>`Marca los puntos que tiene tu respuesta (máximo ${m}).`,lvHint:'Elige la nota según los niveles.',adj:'Tu nota en esta pregunta (ajústala si un punto vale 2):',
  model:'Respuesta modelo',tip:'Consejo',levels:'Niveles',next:'Siguiente →',got:(a,b)=>`${a}/${b}`,
  end:'Resultado',again:'Repetir',close:'Cerrar',load:'Cargando…',missing:'Este tema todavía no tiene preguntas de examen.',
  start:'Empezar',paperH:(s,m)=>`Simulacro de ${s} · ${m} min`,targetH:s=>`Test de temas flojos · ${s}`,
  paperIntro:(n,m,t)=>`${n} preguntas · ${m} puntos · ${t} minutos. Contesta en el cuaderno o aquí. Cuando acabes o se acabe el tiempo, te corriges tú con el mark scheme.`,
  submit:'Entregar y corregir',timeUp:'⏰ ¡Tiempo! Ahora corrígete con el mark scheme.',markH:'Corrección',markIntro:'Para cada pregunta, marca los puntos del mark scheme que tiene tu respuesta. Sé exigente: el examinador lo será.',
  save:'Guardar resultado',byTopic:'Por tema',noAns:'(sin respuesta)',leave:'¿Salir del simulacro? Se perderán tus respuestas.',
  r2H:s=>`Antes de empezar: tus temas más flojos de ${s}`,r2S:'Cuando corrijas el past paper, repasa primero estos temas. Al final, haz sus preguntas de examen.',
  fH:'Antes de empezar: tus temas más flojos',fS:'Dedica parte de hoy a estos temas.',
  r2None:'Aún no hay datos para saber tus temas flojos. Haz los mini tests y las preguntas de examen de la ronda 1.',
  seeAll:'Ver mi nivel completo →',open:'Abrir tema',lvl:['','Fácil','Media','Difícil'],ro:'Solo lectura: no se guarda.'
}:{
  nav:'My level',navSub:'Strong and weak topics',eyebrow:'My level',h:'Strong and weak topics',
  lead:'Worked out from everything you do: mini tests, practice and exam questions. Start with the red ones.',
  strong:'Strong',mid:'To review',weak:'Weak',none:'No data',
  prio:'Priority now',prioS:'Your weakest topics across all subjects.',prioNone:'Not enough data yet. Do the mini test of each session and the exam questions of each topic, and this will show what to revise first.',
  exam:'Exam questions',examBtn:'📝 Exam questions',practice:'Practise',
  target:'🎯 Weak-topic test · 20 min',mock:'⏱ Mock',mins:m=>`${m} min`,
  targetNone:'No weak topics with data in this subject yet.',
  history:'Recent mocks',noBank:'This subject has no written exam, so there are no exam questions or mocks.',
  topics:'Topics',score:'Level',of:(a,b)=>`${a} of ${b} topics with data`,
  q:n=>`Question ${n}`,marks:m=>m===1?'[1 mark]':`[${m} marks]`,answer:'Your answer',answerPh:'Write your answer as you would in the exam…',
  showMs:'Show mark scheme',ms:'Mark scheme',msHint:m=>`Tick the points your answer has (maximum ${m}).`,lvHint:'Pick the mark using the levels.',adj:'Your mark for this question (adjust it if a point is worth 2):',
  model:'Model answer',tip:'Tip',levels:'Levels',next:'Next →',got:(a,b)=>`${a}/${b}`,
  end:'Result',again:'Again',close:'Close',load:'Loading…',missing:'This topic has no exam questions yet.',
  start:'Start',paperH:(s,m)=>`${s} mock · ${m} min`,targetH:s=>`Weak-topic test · ${s}`,
  paperIntro:(n,m,t)=>`${n} questions · ${m} marks · ${t} minutes. Answer in your notebook or here. When you finish or time runs out, mark it yourself with the mark scheme.`,
  submit:'Hand in and mark',timeUp:'⏰ Time! Now mark it with the mark scheme.',markH:'Marking',markIntro:'For each question, tick the mark-scheme points your answer has. Be strict: the examiner will be.',
  save:'Save result',byTopic:'By topic',noAns:'(no answer)',leave:'Leave the mock? Your answers will be lost.',
  r2H:s=>`Before you start: your weakest ${s} topics`,r2S:'When you mark the past paper, revise these topics first. At the end, do their exam questions.',
  fH:'Before you start: your weakest topics',fS:'Spend part of today on these topics.',
  r2None:'No data yet to find your weak topics. Do the mini tests and exam questions in Round 1.',
  seeAll:'See my full level →',open:'Open topic',lvl:['','Easy','Medium','Hard'],ro:'Read-only: nothing is saved.'};

/* ---------- data ---------- */
const VIEW=()=>window.IGVIEW||null;
const ro=()=>!!window.IGVIEW;
function get(k){const v=VIEW();if(v)return v[k]||(k===MK?[]:{});try{return JSON.parse(localStorage.getItem(k)||(k===MK?'[]':'{}'))||(k===MK?[]:{})}catch(e){return k===MK?[]:{}}}
function put(k,v){if(ro())return;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}
  if(window.IGSync)IGSync.push();else try{localStorage.setItem('igcse-dirty','1')}catch(e){}}
const today=()=>{const t=qs.get('today');if(/^\d{4}-\d\d-\d\d$/.test(t||''))return t;const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const S=()=>(window.DATA&&window.DATA.S)||{};
function subjects(){const s=S();let p=null;try{p=VIEW()?VIEW()[PROFK]:JSON.parse(localStorage.getItem(PROFK)||'null')}catch(e){}
  if(window.PLAN&&window.PLAN.ORDER)return window.PLAN.ORDER.filter(k=>s[k]);
  const all=Object.keys(s);return (p&&Array.isArray(p.subj)?all.filter(k=>p.subj.includes(k)):BASE9).filter(k=>s[k])}
const tid=(k,i)=>`${k}-r1-${String(i+1).padStart(2,'0')}`;
const title=id=>{const m=id.match(/^([a-z]+)-r1-(\d\d)$/);const s=m&&S()[m[1]];if(s&&s.r1[+m[2]-1])return s.r1[+m[2]-1][0];const h=document.querySelector('article h1');return h&&qs.get('id')===id?h.textContent:id};
const sname=k=>(S()[k]||{}).es||k;

/* Topic score 0–100 from every signal we have (null = no data). */
function topicScore(id,Q,C,E){Q=Q||get(QK);C=C||get(CK);E=E||get(EK);const sig=[];
  if(Q[id]&&typeof Q[id].p==='number')sig.push([Q[id].p,1]);
  const c=C[id];if(c){if(typeof c.s==='number')sig.push([c.s,1]);if(typeof c.g==='number')sig.push([Math.min(100,100*c.g/8),.5])}
  const e=E[id];if(e&&e.r){const v=Object.values(e.r).filter(x=>typeof x==='number');if(v.length)sig.push([100*v.reduce((a,b)=>a+b,0)/v.length,1+Math.min(2,v.length/3)])}
  if(!sig.length)return null;const w=sig.reduce((a,x)=>a+x[1],0);return Math.round(sig.reduce((a,x)=>a+x[0]*x[1],0)/w)}
const lv=p=>p==null?'n':p>=75?'g':p>=50?'a':'r';
const lvName=p=>({g:L.strong,a:L.mid,r:L.weak,n:L.none})[lv(p)];
function subjTopics(k){const s=S()[k];if(!s)return [];const Q=get(QK),C=get(CK),E=get(EK);
  return s.r1.map((t,i)=>{const id=tid(k,i);return {id,k,t:t[0],p:topicScore(id,Q,C,E)}})}
function weakest(k,n){return subjTopics(k).filter(x=>x.p!=null&&x.p<75).sort((a,b)=>a.p-b.p).slice(0,n)}
function weakestAll(n){return subjects().flatMap(k=>subjTopics(k)).filter(x=>x.p!=null&&x.p<75).sort((a,b)=>a.p-b.p).slice(0,n)}

/* ---------- css ---------- */
const css=`
.lv-sum{display:flex;flex-wrap:wrap;gap:10px;margin:4px 0 18px}
.lv-sum span{display:flex;align-items:center;gap:6px;font:600 .85rem var(--f-body,system-ui);padding:6px 12px;border-radius:99px;background:var(--surface,#fff);border:1px solid var(--line,#DCE0EC)}
.lv-dot{width:10px;height:10px;border-radius:3px;display:inline-block;flex:none}
.lv-g{background:#1F8A4C}.lv-a{background:#D48A00}.lv-r{background:#D0393E}.lv-n{background:var(--line,#DCE0EC)}
.lv-panel{background:var(--surface,#fff);border:1px solid var(--line,#DCE0EC);border-radius:16px;padding:16px;margin-bottom:16px}
.lv-panel h3{margin:0 0 4px;font:700 1.1rem var(--f-display,system-ui)}
.lv-panel>p{margin:0 0 12px;color:var(--muted,#5A6180);font-size:.9rem}
.lv-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.lv-list li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 12px;align-items:center;padding:10px 12px;border-radius:12px;background:var(--bg,#F5F6FA)}
.lv-list li a{color:inherit;text-decoration:none;min-width:0}
.lv-list li a b{display:block;font-size:.95rem;overflow-wrap:anywhere}
.lv-list li a small{color:var(--muted,#5A6180);font-size:.78rem}
.lv-acts{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.lv-btn{all:unset;box-sizing:border-box;cursor:pointer;font:600 .82rem var(--f-body,system-ui);padding:8px 12px;border-radius:10px;border:1px solid var(--line,#DCE0EC);background:var(--surface,#fff);color:var(--ink,#151A31);text-align:center}
.lv-btn:hover{border-color:var(--accent,#2A47C9)}
.lv-btn.pri{background:var(--ink,#151A31);color:var(--surface,#fff);border-color:transparent}
.lv-btn:disabled{opacity:.45;cursor:default}
.lv-pill{font:700 .78rem var(--f-mono,monospace);padding:3px 8px;border-radius:99px;color:#fff;white-space:nowrap}
.lv-pill.n{color:var(--muted,#5A6180);background:var(--line,#DCE0EC)}
.lv-subjs{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.lv-sh{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.lv-sh i{width:12px;height:36px;border-radius:4px;flex:none}
.lv-sh b{font:700 1.05rem var(--f-display,system-ui);display:block}
.lv-sh small{color:var(--muted,#5A6180);font-size:.8rem}
.lv-grid{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px}
.lv-grid a{width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;font:600 .68rem var(--f-mono,monospace);color:#fff;text-decoration:none}
.lv-grid a.lv-n{color:var(--muted,#5A6180)}
.lv-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.lv-row select{font:inherit;font-size:.85rem;padding:7px 8px;border-radius:10px;border:1px solid var(--line,#DCE0EC);background:var(--surface,#fff);color:var(--ink,#151A31)}
.lv-det{margin-top:10px}.lv-det summary{cursor:pointer;font-size:.85rem;color:var(--accent,#2A47C9);font-weight:600}
.lv-det .lv-list{margin-top:8px}
.lv-hist{font-size:.82rem;color:var(--muted,#5A6180);margin:10px 0 0;padding:0;list-style:none}
.lv-note{font-size:.85rem;color:var(--muted,#5A6180);margin:0}
.ex-box{width:min(100%,760px)!important}
.ex-q{white-space:normal;font:500 1rem/1.55 var(--f-body,system-ui);margin:0}
.ex-meta{display:flex;justify-content:space-between;gap:8px;font:600 .78rem var(--f-mono,monospace);color:var(--muted,#5A6180);text-transform:uppercase;letter-spacing:.04em}
.ex-ms{display:flex;flex-direction:column;gap:6px;margin:0;padding:0;list-style:none}
.ex-ms label{display:grid;grid-template-columns:22px minmax(0,1fr);gap:8px;align-items:start;padding:8px 10px;border-radius:10px;background:var(--bg,#F5F6FA);cursor:pointer;font-size:.92rem}
.ex-ms input{width:18px;height:18px;margin:2px 0 0}
.ex-lv{display:flex;flex-wrap:wrap;gap:6px}.ex-lv button{all:unset;cursor:pointer;min-width:38px;text-align:center;padding:8px 10px;border-radius:10px;border:1px solid var(--line,#DCE0EC);font:700 .9rem var(--f-mono,monospace)}
.ex-lv button[aria-pressed=true]{background:var(--ink,#151A31);color:var(--surface,#fff)}
.ex-levels{font-size:.88rem;margin:0;padding-left:1.1em}
.ex-sec[hidden],.ex-box .pr-row[hidden]{display:none}
.ex-sec{display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--line,#DCE0EC);padding-top:12px}
.ex-sec h4{margin:0;font:700 .95rem var(--f-body,system-ui)}
.ex-paper{display:flex;flex-direction:column;gap:22px}
.ex-item{display:flex;flex-direction:column;gap:10px}
.ex-timer{position:sticky;top:-18px;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:10px;background:var(--surface,#fff);padding:10px 0;border-bottom:1px solid var(--line,#DCE0EC)}
.ex-timer b{font:800 1.5rem var(--f-mono,monospace)}.ex-timer b.low{color:#D0393E}
.ex-alert{padding:12px 14px;border-radius:12px;background:rgba(208,57,62,.12);color:#D0393E;font-weight:600}
.ex-tbl{width:100%;border-collapse:collapse;font-size:.9rem}.ex-tbl td{padding:6px 4px;border-bottom:1px solid var(--line,#DCE0EC)}.ex-tbl td:last-child{text-align:right;white-space:nowrap}
.ex-mine{background:var(--bg,#F5F6FA);border-radius:10px;padding:10px 12px;font-size:.92rem;white-space:pre-wrap;overflow-wrap:anywhere}
.lv-r2{background:var(--surface,#fff);border:2px solid #D48A00;border-radius:14px;padding:14px 16px;margin:0 0 22px}
.lv-r2 h2{all:unset;display:block;font:700 1.05rem var(--f-display,system-ui);margin-bottom:4px}
.lv-r2 p{margin:0 0 10px;color:var(--muted,#5A6180);font-size:.9rem}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const txt=s=>esc(s).replace(/\n/g,'<br>');
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const cache={};
const fetchBank=id=>cache[id]||(cache[id]=fetch(`${BASE}content/exam/${id}.json`).then(r=>{if(!r.ok)throw 0;return r.json()}).catch(()=>{delete cache[id];return null}));
const pill=p=>`<span class="lv-pill ${lv(p)==='n'?'n':'lv-'+lv(p)}">${p==null?'—':p+'%'}</span>`;
const sessHref=id=>`${BASE}session.html?id=${id}&lang=${ES?'es':'en'}`;

/* ---------- overlay ---------- */
let ov=null,box=null,X=null,timer=null;
function shell(){if(ov)return;ov=document.createElement('div');ov.className='pr-ov';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');
  ov.innerHTML='<div class="pr-box ex-box"></div>';document.body.appendChild(ov);box=ov.firstChild;
  ov.addEventListener('click',e=>{if(e.target===ov&&!(X&&X.mode==='paper'))close()});
  document.addEventListener('keydown',e=>{if(!ov.hidden&&e.key==='Escape')tryClose()});
  box.addEventListener('click',onClick);box.addEventListener('change',onChange);
  box.addEventListener('input',e=>{const t=e.target;if(X&&t.dataset.ans!=null)X.ans[+t.dataset.ans]=t.value});
}
function openOv(){shell();ov.hidden=false;document.documentElement.style.overflow='hidden'}
function close(){if(!ov)return;clearInterval(timer);timer=null;ov.hidden=true;box.innerHTML='';X=null;document.documentElement.style.overflow='';removeEventListener('beforeunload',guard);if(window.IGLevel)IGLevel.refresh()}
function tryClose(){if(X&&X.mode==='paper'&&!confirm(L.leave))return;close()}
function guard(e){e.preventDefault();e.returnValue=''}
const top=(a,b)=>`<div class="pr-top"><span>${a||''}</span><span>${b||''}</span><button type="button" data-x="close" aria-label="${L.close}">✕</button></div>`;

/* Mark-scheme block for one question; i = index in X.items */
function msBlock(q,i,open){const m=q.marks;const sc=X.sc[i];
  const lvls=q.levels&&q.levels.length?`<h4>${L.levels}</h4><ul class="ex-levels">${q.levels.map(l=>`<li><b>${esc(l.m)}</b> · ${esc(l.d)}</li>`).join('')}</ul>`:'';
  const btns=`<div class="ex-lv" role="group" aria-label="${L.ms}">${Array.from({length:m+1},(_,v)=>`<button type="button" data-lvq="${i}" data-v="${v}" aria-pressed="${sc!=null&&sc===v}">${v}</button>`).join('')}</div>`;
  const pick=q.levels&&q.levels.length?`<p class="lv-note">${L.lvHint}</p>${btns}`:`<p class="lv-note">${L.msHint(m)}</p>`;
  const list=`<ul class="ex-ms">${q.ms.map((p,j)=>`<li><label>${q.levels&&q.levels.length?'<span>•</span>':`<input type="checkbox" data-msq="${i}" data-j="${j}" ${X.tick[i]&&X.tick[i][j]?'checked':''}>`}<span>${esc(p)}</span></label></li>`).join('')}</ul>${q.levels&&q.levels.length?'':`<p class="lv-note">${L.adj}</p>${btns}`}`;
  return `<div class="ex-sec"${open?'':' hidden'} data-ms="${i}"><h4>${L.ms} <span class="num" data-gotq="${i}">${sc==null?'':L.got(sc,m)}</span></h4>${pick}${list}${lvls}
    <details><summary>${L.model}</summary><div class="pr-model">${txt(q.model)}</div></details>${q.tip?`<p class="lv-note">💡 <b>${L.tip}:</b> ${esc(q.tip)}</p>`:''}</div>`}
function onChange(e){const t=e.target;if(!X||t.dataset.msq==null)return;const i=+t.dataset.msq,q=X.items[i].q;X.tick[i]=X.tick[i]||{};X.tick[i][+t.dataset.j]=t.checked;
  X.sc[i]=Math.min(q.marks,Object.values(X.tick[i]).filter(Boolean).length);const g=box.querySelector(`[data-gotq="${i}"]`);if(g)g.textContent=L.got(X.sc[i],q.marks);
  box.querySelectorAll(`[data-lvq="${i}"]`).forEach(x=>x.setAttribute('aria-pressed',String(+x.dataset.v===X.sc[i])));upd()}
function upd(){const n=box.querySelector('[data-x=next]');if(n&&X.mode==='topic')n.disabled=false;const tot=box.querySelector('#exTot');if(tot){const g=X.items.reduce((a,it,i)=>a+(X.sc[i]||0),0);tot.textContent=L.got(g,X.max)}}

/* ---------- topic exam questions (untimed, one at a time) ---------- */
function openTopic(id){openOv();X={mode:'topic',id,items:[],i:0,sc:{},tick:{},ans:{}};box.innerHTML=top('📝 '+L.exam,esc(title(id)))+`<p>${L.load}</p>`;
  fetchBank(id).then(d=>{if(!X||X.id!==id)return;if(!d||!d.questions||!d.questions.length){box.innerHTML=top('📝 '+L.exam)+`<p>${L.missing}</p>`;return}
    X.items=d.questions.map((q,n)=>({q,n,t:id}));X.max=X.items.reduce((a,it)=>a+it.q.marks,0);renderTopicQ()})}
function renderTopicQ(){const i=X.i,it=X.items[i];if(!it)return topicEnd();const q=it.q;
  box.innerHTML=top('📝 '+esc(title(X.id)),`${i+1} / ${X.items.length}`)+`<div class="ex-meta"><span>${L.q(i+1)} · ${L.lvl[q.lvl]||''}</span><span>${L.marks(q.marks)}</span></div>
  <p class="ex-q">${txt(q.q)}</p><textarea class="pr-inp" data-ans="${i}" placeholder="${L.answerPh}" aria-label="${L.answer}">${esc(X.ans[i]||'')}</textarea>
  <div class="pr-row" id="exShow"><button type="button" class="pr-b" data-x="show">${L.showMs}</button></div>${msBlock(q,i,false)}
  <div class="pr-row" id="exNext" hidden><button type="button" class="pr-b" data-x="next">${L.next}</button></div>${ro()?`<p class="lv-note">${L.ro}</p>`:''}`;
  box.scrollTop=0}
function topicEnd(){const E=get(EK),id=X.id;const r=(E[id]&&E[id].r)||{};X.items.forEach((it,i)=>{if(X.sc[i]!=null)r[it.n]=+(X.sc[i]/it.q.marks).toFixed(3)});
  E[id]={r,d:today(),n:((E[id]&&E[id].n)||0)+1};put(EK,E);
  const g=X.items.reduce((a,it,i)=>a+(X.sc[i]||0),0),p=Math.round(100*g/X.max);
  box.innerHTML=top('📝 '+esc(title(id)))+`<div class="pr-end"><span class="big num">${p}%</span><b>${L.got(g,X.max)}</b><span>${L.end}: ${lvName(topicScore(id))}</span></div>
  <div class="pr-row"><button type="button" class="pr-b" data-x="again">${L.again}</button><button type="button" class="pr-b g" data-x="close">${L.close}</button></div>`}

/* ---------- mocks and target tests (timed paper) ---------- */
async function openPaper(k,minutes,ids,isTarget){openOv();X={mode:'load'};box.innerHTML=top(isTarget?L.targetH(esc(sname(k))):L.paperH(esc(sname(k)),minutes))+`<p>${L.load}</p>`;
  const banks=(await Promise.all(ids.map(fetchBank))).map((d,j)=>d&&d.questions?d.questions.map((q,n)=>({q,n,t:ids[j]})):[]).filter(a=>a.length);
  if(!banks.length){box.innerHTML=top()+`<p>${L.missing}</p>`;return}
  // Round-robin over topics so the paper covers as many as possible, ~1 mark per minute.
  const pools=shuffle(banks.map(b=>shuffle(b)));const items=[];let m=0,guard2=0;
  while(m<minutes&&pools.some(p=>p.length)&&guard2++<500){for(const p of pools){if(!p.length||m>=minutes)continue;const it=p.shift();if(m+it.q.marks>minutes+4&&items.length)continue;items.push(it);m+=it.q.marks}}
  items.sort((a,b)=>a.q.lvl-b.q.lvl);
  X={mode:'intro',k,minutes,isTarget,items,max:m,sc:{},tick:{},ans:{}};
  box.innerHTML=top(isTarget?L.targetH(esc(sname(k))):L.paperH(esc(sname(k)),minutes))+`<p>${L.paperIntro(items.length,m,minutes)}</p>${ro()?`<p class="lv-note">${L.ro}</p>`:''}
    <div class="pr-row"><button type="button" class="pr-b" data-x="go">${L.start}</button></div>`}
function startPaper(){X.mode='paper';X.end=Date.now()+X.minutes*60000;addEventListener('beforeunload',guard);
  box.innerHTML=`<div class="ex-timer"><b id="exClock" class="num"></b><button type="button" class="pr-b" data-x="submit" style="flex:0 0 auto">${L.submit}</button><button type="button" data-x="close" class="lv-btn" aria-label="${L.close}">✕</button></div>
  <div class="ex-paper">${X.items.map((it,i)=>`<div class="ex-item"><div class="ex-meta"><span>${L.q(i+1)} · ${esc(title(it.t))}</span><span>${L.marks(it.q.marks)}</span></div><p class="ex-q">${txt(it.q.q)}</p>
    <textarea class="pr-inp" data-ans="${i}" placeholder="${L.answerPh}" aria-label="${L.answer} ${i+1}"></textarea></div>`).join('')}</div>
  <div class="pr-row"><button type="button" class="pr-b" data-x="submit">${L.submit}</button></div>`;
  box.scrollTop=0;tick();timer=setInterval(tick,1000)}
function tick(){const c=document.getElementById('exClock');if(!c||!X)return;const s=Math.max(0,Math.round((X.end-Date.now())/1000));
  c.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;c.classList.toggle('low',s<=300);if(s<=0){clearInterval(timer);timer=null;markPaper(true)}}
function markPaper(timeUp){clearInterval(timer);timer=null;removeEventListener('beforeunload',guard);X.mode='mark';
  box.innerHTML=top('✍️ '+L.markH,`<span id="exTot" class="num">${L.got(0,X.max)}</span>`)+(timeUp?`<div class="ex-alert">${L.timeUp}</div>`:'')+`<p class="lv-note">${L.markIntro}</p>
  <div class="ex-paper">${X.items.map((it,i)=>`<div class="ex-item"><div class="ex-meta"><span>${L.q(i+1)} · ${esc(title(it.t))}</span><span>${L.marks(it.q.marks)}</span></div><p class="ex-q">${txt(it.q.q)}</p>
    <div class="ex-mine">${X.ans[i]?esc(X.ans[i]):`<i>${L.noAns}</i>`}</div>${msBlock(it.q,i,true)}</div>`).join('')}</div>
  <div class="pr-row"><button type="button" class="pr-b" data-x="save">${L.save}</button></div>`;box.scrollTop=0;upd()}
function savePaper(){const E=get(EK),bt={};X.items.forEach((it,i)=>{const s=X.sc[i]||0;bt[it.t]=bt[it.t]||[0,0];bt[it.t][0]+=s;bt[it.t][1]+=it.q.marks;
    const e=E[it.t]||{r:{},n:0};e.r=e.r||{};e.r[it.n]=+(s/it.q.marks).toFixed(3);e.d=today();E[it.t]=e});
  put(EK,E);const g=X.items.reduce((a,it,i)=>a+(X.sc[i]||0),0),p=Math.round(100*g/X.max);
  const M=get(MK);M.push({s:X.k,d:today(),min:X.minutes,g,m:X.max,tg:X.isTarget?1:0,t:bt});put(MK,M.slice(-60));
  box.innerHTML=top(X.isTarget?L.targetH(esc(sname(X.k))):L.paperH(esc(sname(X.k)),X.minutes))+`<div class="pr-end"><span class="big num">${p}%</span><b>${L.got(g,X.max)}</b></div>
  <h4 style="margin:0">${L.byTopic}</h4><table class="ex-tbl">${Object.entries(bt).map(([t,[a,b]])=>`<tr><td>${esc(title(t))}</td><td>${pill(Math.round(100*a/b))} ${a}/${b}</td></tr>`).join('')}</table>
  <div class="pr-row"><button type="button" class="pr-b g" data-x="close">${L.close}</button></div>`}

function onClick(e){const b=e.target.closest('[data-x],[data-lvq]');if(!b||!X)return;
  if(b.dataset.lvq!=null){const i=+b.dataset.lvq;X.sc[i]=+b.dataset.v;box.querySelectorAll(`[data-lvq="${i}"]`).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    const g=box.querySelector(`[data-gotq="${i}"]`);if(g)g.textContent=L.got(X.sc[i],X.items[i].q.marks);upd();return}
  const a=b.dataset.x;
  if(a==='close')return tryClose();
  if(a==='show'){box.querySelector('[data-ms]').hidden=false;document.getElementById('exShow').hidden=true;document.getElementById('exNext').hidden=false;
    if(X.sc[X.i]==null){X.sc[X.i]=0;const g=box.querySelector(`[data-gotq="${X.i}"]`);if(g)g.textContent=L.got(0,X.items[X.i].q.marks);box.querySelectorAll(`[data-lvq="${X.i}"][data-v="0"]`).forEach(x=>x.setAttribute('aria-pressed','true'))}return}
  if(a==='next'){X.i++;return renderTopicQ()}
  if(a==='again')return openTopic(X.id);
  if(a==='go')return startPaper();
  if(a==='submit')return markPaper(false);
  if(a==='save')return savePaper();
}

/* ---------- "My level" view ---------- */
function renderView(){const root=document.getElementById('v-nivel');if(!root||root.hidden)return;
  const ks=subjects();const all=ks.flatMap(k=>subjTopics(k));const cnt={g:0,a:0,r:0,n:0};all.forEach(x=>cnt[lv(x.p)]++);
  const pr=weakestAll(6);const M=get(MK);
  const row=x=>`<li><a href="${sessHref(x.id)}"><b>${esc(x.t)}</b><small style="color:var(--c-${x.k})">${esc(sname(x.k))}</small></a><div class="lv-acts">${pill(x.p)}
    ${NOBANK.includes(x.k)?'':`<button type="button" class="lv-btn" data-exam="${x.id}">📝</button>`}<button type="button" class="lv-btn" data-practice="${x.id}" data-title="${esc(x.t)}">🃏</button></div></li>`;
  root.innerHTML=`<div class="view-head"><p class="eyebrow">${L.eyebrow}</p><h2>${L.h}</h2><p class="lead">${L.lead}</p></div>
  <div class="lv-sum">${['r','a','g','n'].map(c=>`<span><i class="lv-dot lv-${c}"></i>${({g:L.strong,a:L.mid,r:L.weak,n:L.none})[c]} · <b class="num">${cnt[c]}</b></span>`).join('')}</div>
  <section class="lv-panel"><h3>${L.prio}</h3><p>${L.prioS}</p>${pr.length?`<ul class="lv-list">${pr.map(row).join('')}</ul>`:`<p class="lv-note">${L.prioNone}</p>`}</section>
  <div class="lv-subjs">${ks.map(k=>{const tp=subjTopics(k);const wd=tp.filter(x=>x.p!=null);const avg=wd.length?Math.round(wd.reduce((a,x)=>a+x.p,0)/wd.length):null;
    const w=weakest(k,3);const hist=M.filter(m=>m.s===k).slice(-3).reverse();const nb=NOBANK.includes(k);
    return `<section class="lv-panel"><div class="lv-sh"><i style="background:var(--c-${k})"></i><div><b>${esc(sname(k))}</b><small>${L.of(wd.length,tp.length)} · ${L.score} ${avg==null?'—':avg+'%'}</small></div></div>
    <div class="lv-grid">${tp.map((x,i)=>`<a class="lv-${lv(x.p)}" href="${sessHref(x.id)}" title="${esc(x.t)} · ${x.p==null?L.none:x.p+'%'}">${i+1}</a>`).join('')}</div>
    ${nb?`<p class="lv-note">${L.noBank}</p>`:`<div class="lv-row"><button type="button" class="lv-btn pri" data-target="${k}" ${w.length?'':'disabled'} title="${w.length?'':esc(L.targetNone)}">${L.target}</button>
      <select aria-label="${L.mock}" data-mins="${k}">${[30,45,60,90].map(m=>`<option value="${m}"${m===45?' selected':''}>${L.mins(m)}</option>`).join('')}</select><button type="button" class="lv-btn" data-mock="${k}">${L.mock}</button></div>`}
    ${hist.length?`<ul class="lv-hist">${hist.map(h=>`<li>${h.tg?'🎯':'⏱'} ${h.d.slice(8)}/${h.d.slice(5,7)} · ${h.min} min · <b>${Math.round(100*h.g/h.m)}%</b> (${h.g}/${h.m})</li>`).join('')}</ul>`:''}
    <details class="lv-det"><summary>${L.topics}</summary><ul class="lv-list">${tp.map(row).join('')}</ul></details></section>`}).join('')}</div>`}
function studied(k){const D=get(PK),E=get(EK),Q=get(QK);return subjTopics(k).filter(x=>D[x.id]||x.p!=null||E[x.id]||Q[x.id]).map(x=>x.id)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-exam],[data-target],[data-mock]');if(!t)return;e.preventDefault();
  if(t.dataset.exam)return openTopic(t.dataset.exam);
  if(t.dataset.target){const k=t.dataset.target;const w=weakest(k,3).map(x=>x.id);if(w.length)openPaper(k,20,w,true);return}
  if(t.dataset.mock){const k=t.dataset.mock;const sel=document.querySelector(`[data-mins="${k}"]`);const m=sel?+sel.value:45;let ids=studied(k);
    if(ids.length<2)ids=subjTopics(k).map(x=>x.id);openPaper(k,m,ids,false)}},true);

/* ---------- Session page: exam button on R1, weak-topic box on R2 and final sprint ---------- */
function sessionPage(){const id=(qs.get('id')||'').replace(/[^a-z0-9-]/gi,'');const doc=document.getElementById('doc');if(!doc)return;
  const m=id.match(/^([a-z]+)-(r1|r2)-(\d\d)$/);
  if(m&&m[2]==='r1'&&!NOBANK.includes(m[1])){const pb=document.getElementById('prBtn');const b=document.createElement('button');b.type='button';b.className='prbtn';b.dataset.exam=id;b.textContent=L.examBtn;b.style.background='var(--ink)';b.style.color='var(--bg)';
    if(pb&&pb.parentNode)pb.parentNode.insertBefore(b,pb.nextSibling);else doc.parentNode.insertBefore(b,doc)}
  const isR2=m&&m[2]==='r2',isF=/^f-/.test(id);if(!isR2&&!isF){if(!(window.DATA&&window.DATA.S)){const s=document.createElement('script');s.src=`data-${ES?'es':'en'}.js`;document.head.appendChild(s)}return}
  const go=()=>{const list=isR2?weakest(m[1],3):weakestAll(5);const bx=document.createElement('section');bx.className='lv-r2';
    bx.innerHTML=`<h2>${isR2?L.r2H(esc(sname(m[1]))):L.fH}</h2><p>${isF?L.fS:L.r2S}</p>${list.length?`<ul class="lv-list">${list.map(x=>`<li><a href="${sessHref(x.id)}"><b>${esc(x.t)}</b>${isF?`<small style="color:var(--c-${x.k})">${esc(sname(x.k))}</small>`:''}</a><div class="lv-acts">${pill(x.p)}${NOBANK.includes(x.k)?'':`<button type="button" class="lv-btn" data-exam="${x.id}">📝</button>`}<button type="button" class="lv-btn" data-practice="${x.id}" data-title="${esc(x.t)}">🃏</button></div></li>`).join('')}</ul>`:`<p class="lv-note">${L.r2None}</p>`}
      <p class="lv-note" style="margin-top:10px"><a href="${ES?'es/':'./'}#nivel">${L.seeAll}</a></p>`;
    doc.parentNode.insertBefore(bx,doc)};
  if(window.DATA&&window.DATA.S)go();else{const s=document.createElement('script');s.src=`data-${ES?'es':'en'}.js`;s.onload=go;document.head.appendChild(s)}}

window.IGLevel={nav:L.nav,navSub:L.navSub,render:renderView,refresh(){renderView()},topicScore,weakest,openTopic,openPaper};
if(document.getElementById('v-nivel'))renderView();
if(/session\.html/.test(location.pathname))sessionPage();
})();
