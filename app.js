/* IGCSE plan app (shared by the Spanish and English shells). Data and texts come from data-<lang>.js as window.DATA. */
(function(){
const DATA=window.DATA,T=DATA.T,S=DATA.S,LANG=DATA.lang,BASE=DATA.base;
const ALL_SUBJ=['math','stats','bio','chem','phys','bus','eng','fr','spa'];
/* A student's own profile (set by the welcome screen). No profile = Carlota's original plan. */
const PKEY='igcse-profile-v1';
const PROF=(()=>{let v=null;try{v=window.IGVIEW?window.IGVIEW[PKEY]:JSON.parse(localStorage.getItem(PKEY)||'null')}catch(e){}
  return v&&/^\d{4}-\d\d-\d\d$/.test(v.start||'')&&/^\d{4}-\d\d-\d\d$/.test(v.exam||'')&&v.rule&&Array.isArray(v.subj)&&v.subj.some(k=>ALL_SUBJ.includes(k))?v:null})();
const ORDER=PROF?ALL_SUBJ.filter(k=>PROF.subj.includes(k)):ALL_SUBJ;
const COL=k=>`var(--c-${k})`;
const $=id=>document.getElementById(id);
const IC={
  math:'<path d="M3 12h3l3 8 6-16h6"/>',
  eng:'<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v14"/>',
  spa:'<path d="M20 4C11 5 6 10 4 20"/><path d="M20 4c0 6-4 10-11 11"/><path d="M9 15l-3-3"/>',
  bio:'<path d="M5 19C5 10 11 5 20 5c0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
  chem:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 14h9"/>',
  phys:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  stats:'<path d="M4 20V11M10 20V5M16 20v-8M21 20H3"/>',
  bus:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  fr:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  mix:'<path d="M20 11a8 8 0 1 0-2 6"/><path d="M20 5v6h-6"/>',
  hoy:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  calendario:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  reparto:'<path d="M12 3v9l7 4"/><circle cx="12" cy="12" r="9"/>',
  asignaturas:'<path d="M4 4h6v16H4zM10 4h4v16h-4zM15 5l4-1 3 15-4 1z"/>',
  metodo:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  recursos:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  ajustes:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'
};
const ic=k=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${IC[k]||IC.mix}</svg>`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ----- Dates ----- */
const {MES,MESL,DIA}=T;
const D=(y,m,d)=>new Date(Date.UTC(y,m,d));
const iso=d=>d.toISOString().slice(0,10);
const add=(d,n)=>{const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x};
const pd=k=>new Date(k+'T00:00:00Z');
const START=PROF?pd(PROF.start):D(2026,10,16),EXAM=PROF?pd(PROF.exam):D(2027,0,11),END=add(EXAM,-1);
let R1_END='2026-12-28',R2_END='2027-01-08';
const SPECIAL={'2026-12-24':2,'2026-12-25':0,'2026-12-31':2,'2027-01-01':0};
const fmt=d=>`${DIA[d.getUTCDay()]} ${d.getUTCDate()} ${MES[d.getUTCMonth()]}`;
function hoursFor(d){const k=iso(d);if(k in SPECIAL)return SPECIAL[k];if(k>='2026-12-22')return 4;const w=d.getUTCDay();return (w===0||w===6)?4:2}

/* ----- Schedule generator (deterministic) ----- */
function makeQueues(key){const q={},tot={},pass={};ORDER.forEach(k=>{q[k]=S[k][key].slice();tot[k]=q[k].length;pass[k]=.5/Math.max(tot[k],1)});return {q,tot,pass,key}}
const isPair=t=>/\(1\/2\)/.test(t);
const sid=(st,b)=>`${b}-${st.key}-${String(st.tot[b]-st.q[b].length).padStart(2,'0')}`;
function pick(st,used,room){let b=null;for(const k of ORDER){if(!st.q[k].length||used.has(k)||(room<2&&isPair(st.q[k][0][0])))continue;if(b===null||st.pass[k]<st.pass[b]-1e-9)b=k}
  if(b===null)for(const k of ORDER){if(st.q[k].length&&(b===null||st.pass[k]<st.pass[b]-1e-9))b=k}
  if(b===null)return null;st.pass[b]+=1/st.tot[b];const [t,dt]=st.q[b].shift();return {s:b,t,dt,id:sid(st,b)}}
const R1=makeQueues('r1'),R2=makeQueues('r2');
const FINAL=DATA.FINAL;Object.entries(FINAL).forEach(([k,a])=>a.forEach((s,i)=>s.id=`f-${k}-${i+1}`));
const days=[];let leftover=[];
/* Lays out a profile plan: which days are Round 1 / Round 2 / final sprint and how many sessions each day gets.
   Free hours are spread evenly; also used by the welcome screen to say whether everything fits. */
function layout(P,order){
  const st=pd(P.start),ex=pd(P.exam),all=[];
  for(let d=new Date(st);d<ex;d=add(d,1)){const k=iso(d);all.push({d:new Date(d),k,h:ruleHours(P.rule,k,d)})}
  const nF=all.length>=14?2:0,body=all.slice(0,all.length-nF);all.slice(all.length-nF).forEach(x=>{x.phase='f';x.u=0;x.n=0});
  const N1=order.reduce((a,k)=>a+((S[k]&&S[k].r1.length)||0),0),N2=order.reduce((a,k)=>a+((S[k]&&S[k].r2.length)||0),0);
  const fi=body.findIndex(x=>x.h>0);
  const base=i=>Math.max(0,body[i].h-(i===fi?1:0)),isRev=i=>body[i].d.getUTCDay()===0&&base(i)>0;
  let b=body.length-1;
  for(let it=0;it<3;it++){
    const cum=[];let c=0;body.forEach((x,i)=>{c+=base(i)-(isRev(i)?1:0);cum.push(c)});
    const after=i=>body.slice(i+1).reduce((a,x,j)=>a+base(i+1+j),0);
    const C=c+0;let best=-1;
    const total=i=>cum[i]+after(i);
    for(let i=0;i<body.length;i++){if(cum[i]>=N1&&after(i)>=N2){const t1=total(i)*N1/Math.max(1,N1+N2);if(best<0||Math.abs(cum[i]-t1)<Math.abs(cum[best]-total(best)*N1/Math.max(1,N1+N2)))best=i}}
    if(best<0){best=cum.findIndex(v=>v>=N1);if(best<0)best=body.length-1}
    if(best===b)break;b=best}
  body.forEach((x,i)=>{x.phase=i<=b?'r1':'r2';x.kick=i===fi;x.rev=x.phase==='r1'&&isRev(i);x.u=base(i)-(x.rev?1:0)});
  const spread=(list,N)=>{const Cp=list.reduce((a,x)=>a+x.u,0),r=Cp?Math.min(1,N/Cp):0;let cum=0,prev=0;list.forEach(x=>{cum+=x.u;const v=Math.round(cum*r);x.n=v-prev;prev=v});return Cp};
  const c1=spread(body.filter(x=>x.phase==='r1'),N1),c2=spread(body.filter(x=>x.phase==='r2'),N2);
  const s1=Math.max(0,N1-c1),s2=Math.max(0,N2-c2);
  return {days:all,N1,N2,c1,c2,need:N1+N2,hours:all.reduce((a,x)=>a+x.h,0),short:s1+Math.max(0,s2-Math.max(0,c1-N1)),r1short:s1,fits:s1+Math.max(0,s2-Math.max(0,c1-N1))===0}}
window.IGLayout=(P,order)=>layout(P,order.filter(k=>S[k]));
const FREE=()=>({s:'mix',t:T.freeT,dt:T.freeD});
if(PROF){
  const LY=layout(PROF,ORDER),fkeys=Object.keys(FINAL);let fi=0;
  const r1d=LY.days.filter(x=>x.phase==='r1'),r2d=LY.days.filter(x=>x.phase==='r2');
  if(r1d.length)R1_END=r1d[r1d.length-1].k;R2_END=r2d.length?r2d[r2d.length-1].k:R1_END;
  LY.days.forEach(x=>{const slots=[];
    if(x.phase==='f'){const src=(FINAL[fkeys[fi++]]||[]).filter(s=>ORDER.includes(s.s));slots.push(...src.slice(0,x.h))}
    else{const st=x.phase==='r1'?R1:R2,used=new Set();
      if(x.kick)slots.push({s:'mix',t:T.kickT,dt:T.kickD,kick:true,id:'kickoff'});
      for(let i=0;i<x.n;i++){const p=pick(st,used,x.n-i);if(!p)break;used.add(p.s);slots.push(p);
        if(isPair(p.t)&&st.q[p.s].length){const [t,dt]=st.q[p.s].shift();st.pass[p.s]+=1/st.tot[p.s];slots.push({s:p.s,t,dt,id:sid(st,p.s)});i++}}}
    const rev=x.rev?[{s:'mix',t:T.revT,dt:T.revD,id:'weekly-review'}]:[];
    while(slots.length+rev.length<x.h)slots.push(FREE());
    slots.push(...rev);
    days.push({d:x.d,k:x.k,h:x.h,phase:x.phase,slots})});
  /* Round 1 topics that did not fit stay visible as "not placed" (the dashboard counts them) */
  ORDER.forEach(k=>{while(R1.q[k].length){const [t,dt]=R1.q[k].shift();leftover.push({s:k,t,dt,id:sid(R1,k)})}});
}
else for(let d=new Date(START);d<=END;d=add(d,1)){
  const k=iso(d),h=hoursFor(d),phase=k<=R1_END?'r1':k<=R2_END?'r2':'f',slots=[];
  if(phase==='f'){slots.push(...FINAL[k].slice(0,h))}
  else{
    let n=h;const st=phase==='r1'?R1:R2,used=new Set(),tail=[];
    if(k==='2026-11-16'){slots.push({s:'mix',t:T.kickT,dt:T.kickD,kick:true,id:'kickoff'});n--}
    if(phase==='r1'&&d.getUTCDay()===0&&n>0){tail.push({s:'mix',t:T.revT,dt:T.revD,id:'weekly-review'});n--}
    for(let i=0;i<n;i++){const p=pick(st,used,n-i);if(!p){slots.push({s:'mix',t:T.freeT,dt:T.freeD});continue}used.add(p.s);slots.push(p);
      if(isPair(p.t)&&st.q[p.s].length){const [t,dt]=st.q[p.s].shift();st.pass[p.s]+=1/st.tot[p.s];slots.push({s:p.s,t,dt,id:sid(st,p.s)});i++}}
    slots.push(...tail);
  }
  days.push({d:new Date(d),k,h,phase,slots});
}
days.forEach(x=>x.slots.forEach(s=>{if(s.id==='weekly-review'){s.topics=days.filter(y=>y.d<=x.d&&y.d>add(x.d,-7)).flatMap(y=>y.slots.filter(z=>z.id&&/-r1-/.test(z.id)).map(z=>z.id)).join(',')}}));
/* A student's own dates and subjects replace Carlota's fixed texts */
if(PROF){const dm=k=>{const d=pd(k);return `${d.getUTCDate()} ${MES[d.getUTCMonth()]}`},ES=LANG==='es',n=ORDER.length,fs=add(pd(R2_END),1);
  const num=['','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'][n]||String(n),numE=['','one','two','three','four','five','six','seven','eight','nine'][n]||String(n);
  T.r1Sub=`${dm(iso(START))} → ${dm(R1_END)} · `;T.r2Sub=R2_END>R1_END?`${dm(iso(add(pd(R1_END),1)))} → ${dm(R2_END)}`:'';
  T.examL=`${dm(iso(EXAM))} · MOCKS`;T.examLegend=`${dm(iso(EXAM))}: mocks`;
  T.holidays=`${dm(PROF.rule.holFrom)} · ${ES?`vacaciones: ${PROF.rule.hol} h/día`:`holidays: ${PROF.rule.hol} h/day`}`;
  const st0=T.stats;T.stats=(t,d,r1,r2)=>{const a=st0(t,d,r1,r2);a[1][1]=ES?`del ${dm(iso(START))} al ${dm(iso(END))}`:`from ${dm(iso(START))} to ${dm(iso(END))}`;return a};
  T.routeAria=ES?`Fases: Ronda 1 hasta el ${dm(R1_END)}, Ronda 2 hasta el ${dm(R2_END)}, mocks el ${dm(iso(EXAM))}`:`Phases: Round 1 to ${dm(R1_END)}, Round 2 to ${dm(R2_END)}, mocks on ${dm(iso(EXAM))}`;
  if(T.views&&T.views.reparto){const v=T.views.reparto.slice();v[2]=v[2].replace(/^Con nueve asignaturas/,`Con ${num} asignatura${n===1?'':'s'}`).replace(/^With nine subjects/,`With ${numE} subject${n===1?'':'s'}`);T.views.reparto=v}
}
days.forEach(x=>{x.base=x.slots.length;x.slots.forEach((s,i)=>{s.uid=s.id==='weekly-review'?'weekly-review@'+x.k:(s.id||('x@'+x.k+'-'+i));s.orig=x.k;s.ph=x.phase})});
leftover.forEach(s=>{s.uid=s.id;s.orig=R1_END;s.ph='r1'});
/* ----- Custom study hours ("Regenerate plan") ----- */
const now=(()=>{let q=null;try{q=new URLSearchParams(location.search).get('today')}catch(e){}return q&&/^\d{4}-\d\d-\d\d$/.test(q)?new Date(q+'T12:00:00'):new Date()})();
const todayK=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const VIEW=window.IGVIEW||null;
const load=k=>{if(VIEW)return JSON.parse(JSON.stringify(VIEW[k]||{}));try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}};
const store=(k,v)=>{if(VIEW)return;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}if(window.IGSync)IGSync.push()};
const KEY='igcse-plan-v1',QKEY='igcse-quiz-v1',HKEY='igcse-hours-v1';
const done=load(KEY),quiz=load(QKEY),HS=load(HKEY);
const DEF_RULE=PROF?Object.assign({},PROF.rule):{wd:[2,2,2,2,2,4,4],hol:4,holFrom:'2026-12-22',holTo:'2027-01-10',xmasOff:true,half:true};
function ruleHours(r,k,d){if(r.xmasOff&&(k==='2026-12-25'||k==='2027-01-01'))return 0;
  const inHol=k>=r.holFrom&&k<=r.holTo;if(r.half&&inHol&&(k==='2026-12-24'||k==='2026-12-31'))return Math.ceil(r.hol/2);
  if(inHol)return r.hol;return r.wd[(d.getUTCDay()+6)%7]}
let overflow=leftover.slice();
function applyRule(r){
  const F=r.from;const past=days.filter(x=>x.k<F),fut=days.filter(x=>x.k>=F);if(!fut.length)return;
  const overdue=[];past.forEach(x=>{x.slots=x.slots.filter(s=>{if(done[s.uid]||!s.id)return true;overdue.push(s);return false});x.h=x.slots.length});
  const queue=[...overdue,...overflow,...fut.flatMap(x=>x.slots.filter(s=>s.id))];overflow=[];
  let qi=0;
  for(const x of fut){const cap=ruleHours(r,x.k,x.d);x.slots=[];let n=cap;
    while(n>0&&qi<queue.length){let s=queue[qi];
      if(isPair(s.t)&&n<2){let j=qi+1;while(j<queue.length&&(isPair(queue[j].t)||/\(2\/2\)/.test(queue[j].t)))j++;if(j<queue.length){x.slots.push(queue.splice(j,1)[0]);n--;continue}break}
      x.slots.push(s);qi++;n--;if(isPair(s.t)&&qi<queue.length){x.slots.push(queue[qi]);qi++;n--}}
    let f=0;while(n>0){x.slots.push({s:'mix',t:T.freeT,dt:T.freeD,uid:`x@${x.k}-${f++}`,orig:x.k,ph:x.phase});n--}
    x.base=cap;x.h=x.slots.length}
  overflow=queue.slice(qi);
}
(HS.rules||[]).forEach(applyRule);
const MOVES_KEY='igcse-moves-v1';let moves={};try{moves=VIEW?JSON.parse(JSON.stringify(VIEW[MOVES_KEY]||{})):(JSON.parse(localStorage.getItem(MOVES_KEY)||'{}')||{})}catch(e){moves={}}
(function(){const byK=Object.fromEntries(days.map(x=>[x.k,x]));const add2={};days.forEach(x=>{x.slots=x.slots.filter(s=>{const t=moves[s.uid];if(t&&t!==x.k&&byK[t]){s.moved=true;(add2[t]=add2[t]||[]).push(s);return false}return true})});days.forEach(x=>{if(add2[x.k]){let n=Math.max(0,x.slots.length+add2[x.k].length-x.base);x.slots=x.slots.filter(s=>{if(n>0&&!s.id&&!s.kick){n--;return false}return true}).concat(add2[x.k])}x.h=x.slots.length})})();
const TOTAL=days.reduce((a,x)=>a+x.h,0);
const slotDate={};days.forEach(x=>x.slots.forEach(s=>{if(s.id)slotDate[s.id]=slotDate[s.id]||x.k}));

/* ----- Today ----- */
const todayUTC=D(now.getFullYear(),now.getMonth(),now.getDate());
const left=Math.max(0,Math.round((EXAM-todayUTC)/864e5));
const save=()=>store(KEY,done);
const level=p=>p>=75?'g':p>=50?'a':'r';

/* ----- Shell: nav, router ----- */
const VIEWS=['hoy','calendario','reparto','asignaturas','metodo','recursos','ajustes'];
$('nav').innerHTML=VIEWS.map(v=>`<a href="#${v}" data-v="${v}">${ic(v)}<b>${T.nav[v]}</b><small>${T.navSub[v]}</small></a>`).join('');
$('cdNum').textContent=left;$('cdTxt').textContent=T.daysLeft;$('cdMini').textContent=`${left} ${T.daysLeft}`;
$('langLink').textContent=T.lang;$('langLink').href=T.langHref;
$('brandT').textContent=T.brand;$('brandS').textContent=PROF?`${load('igcse-hours-v1').name||PROF.name||''} · Mocks ${EXAM.getUTCDate()} ${MES[EXAM.getUTCMonth()]} ${EXAM.getUTCFullYear()}`:T.brandSub.replace(/^Carlota/,(load('igcse-hours-v1').name)||'Carlota');$('installHint').innerHTML=T.install;$('nav').setAttribute('aria-label',T.menu);
$('burger').innerHTML=ic('menu');$('burger').setAttribute('aria-label',T.menu);
const app=$('app');
function openMenu(o){app.classList.toggle('open',o);$('burger').setAttribute('aria-expanded',String(o))}
$('burger').addEventListener('click',()=>openMenu(!app.classList.contains('open')));
$('scrim').addEventListener('click',()=>openMenu(false));
let current=null;
function show(v,dayK){
  if(!VIEWS.includes(v))v='hoy';
  VIEWS.forEach(x=>{$('v-'+x).hidden=x!==v});
  if(v==='reparto'&&typeof renderReparto==='function'&&$('weekly'))renderReparto();
  document.querySelectorAll('#nav a').forEach(a=>a.setAttribute('aria-current',a.dataset.v===v?'page':'false'));
  $('viewTitle').textContent=v==='hoy'?T.brand:T.nav[v];document.title=`${T.nav[v]} · ${T.brand}`;
  openMenu(false);
  if(v!==current){if(current!==null)window.scrollTo(0,0);current=v}
  if(dayK)setTimeout(()=>go(dayK),60);
}
function route(){const h=(location.hash||'').slice(1);if(/^d-\d{4}-\d\d-\d\d$/.test(h))show('calendario',h.slice(2));else show(h||'hoy')}
window.addEventListener('hashchange',route);

/* ----- Slots ----- */
function sessionHref(s,x){return `${BASE}session.html?id=${s.id}&d=${x.k}&lang=${LANG}${s.topics?'&topics='+s.topics:''}`}
function slotHTML(x,s,i){const uid=s.uid,id='c-'+uid.replace(/[^a-zA-Z0-9-]/g,'_');const name=s.s==='mix'?(s.kick?T.kick:T.rev):S[s.s].es;
  const q=quiz[uid];const qb=q?` <span class="qb ${level(q.p)}">${q.p}%</span>`:'';
  const inner=`<span class="sn" style="color:${COL(s.s)}">${name} · 1 h${s.moved?' · ↻ '+T.moved:''}</span><span class="tp">${esc(s.t)}${s.id?' →':''}${qb}</span><span class="dt">${esc(s.dt)}</span>`;
  return `<li class="slot" data-s="${s.s}"><input type="checkbox" id="${id}" data-id="${uid}" aria-label="${esc(s.t)}" ${done[uid]?'checked':''}><span class="rail" style="background:${COL(s.s)}"></span>${s.id?`<a class="sl-body" href="${sessionHref(s,x)}">${inner}</a>`:`<div class="sl-body">${inner}</div>`}</li>`}
const PHN=p=>T.PH[p];const PHC={r1:'p-r1',r2:'p-r2',f:'p-f'};

/* ----- Today card (rendered inside the Today view by dashboard.js) ----- */
function renderToday(){
  const el=$('today');if(!el)return;
  let x=days.find(d=>d.k===todayK),label=T.todayLabel;
  if(!x){if(todayK<days[0].k){x=days[0];label=T.firstDay}else x=null}
  const list=x?(x.h?`<ul class="slots">${x.slots.map((s,i)=>slotHTML(x,s,i)).join('')}</ul>`:`<p class="rest-note">${T.todayOff}</p>`):`<p class="rest-note">${T.finished}</p>`;
  el.innerHTML=`<div class="when"><p class="eyebrow">${label}</p><b>${x?fmt(x.d):'Mocks'}</b><span class="num" style="color:var(--muted);font-size:.85rem">${x?x.h+' h · '+PHN(x.phase):''}</span></div><div style="min-width:0">${list}</div>`;
}

/* ----- Reparto view ----- */
const r1h=days.filter(x=>x.phase==='r1').reduce((a,x)=>a+x.h,0),r2h=days.filter(x=>x.phase!=='r1').reduce((a,x)=>a+x.h,0);
function renderReparto(){
  $('stats').innerHTML=T.stats(TOTAL,days.length,r1h,r2h).map(([b,s])=>`<div class="stat"><b class="num">${b}</b><span>${s}</span></div>`).join('');
  const W=1000,H=150,x0=20,x1=980,N=Math.round((EXAM-START)/864e5);const X=d=>x0+(x1-x0)*((d-START)/864e5)/N;
  const seg=(a,b,c,label,sub)=>`<rect x="${X(a)}" y="58" width="${X(b)-X(a)-3}" height="26" rx="6" style="fill:${c}"/><text x="${X(a)+8}" y="76" style="fill:var(--surface);font:700 13px var(--f-display)">${label}</text><text x="${X(a)}" y="104" style="fill:var(--muted);font:11px var(--f-mono)">${sub}</text>`;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T.routeAria}">`;
  for(let d=new Date(START);d<=EXAM;d=add(d,1)){if(d.getUTCDay()===1)s+=`<line x1="${X(d)}" x2="${X(d)}" y1="44" y2="52" style="stroke:var(--line)"/><text x="${X(d)}" y="38" text-anchor="middle" style="fill:var(--muted);font:10px var(--f-mono)">${d.getUTCDate()} ${MES[d.getUTCMonth()]}</text>`}
  const R2S=add(pd(R1_END),1),FS=add(pd(R2_END),1),HOL=pd(DEF_RULE.holFrom);
  s+=seg(START,R2S,'var(--accent)',T.r1Label,T.r1Sub+r1h+' h');
  if(R2S<FS)s+=seg(R2S,FS,'var(--warn)',T.r2Label,T.r2Sub);
  if(FS<EXAM)s+=`<rect x="${X(FS)}" y="58" width="${X(EXAM)-X(FS)-3}" height="26" rx="6" style="fill:var(--ok)"/><text x="${X(FS)}" y="120" style="fill:var(--muted);font:11px var(--f-mono)">${T.sprint}</text>`;
  if(HOL>START&&HOL<EXAM)s+=`<line x1="${X(HOL)}" x2="${X(HOL)}" y1="52" y2="132" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${X(HOL)-6}" y="140" text-anchor="end" style="fill:var(--ink);font:600 11px var(--f-mono)">${T.holidays}</text>`;
  const ex=X(EXAM);s+=`<circle cx="${ex-6}" cy="71" r="12" style="fill:var(--ink)"/><path d="M${ex-11} 71l4 4 7-8" style="fill:none;stroke:var(--bg);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"/><text x="${ex-6}" y="104" text-anchor="end" style="fill:var(--ink);font:700 12px var(--f-mono)">${T.examL}</text>`;
  if(todayUTC>=START&&todayUTC<=EXAM){const tx=X(todayUTC);s+=`<path d="M${tx} 56l-5-8h10z" style="fill:var(--ink)"/><text x="${tx+8}" y="18" style="fill:var(--ink);font:700 11px var(--f-mono)">${T.todayL}</text><line x1="${tx}" x2="${tx}" y1="22" y2="48" style="stroke:var(--ink)"/>`}
  $('route').innerHTML=s+'</svg>';
  {let m=$('routeM');if(!m){m=document.createElement('div');m.id='routeM';m.className='route-m';$('route').after(m)}
   const pct=Math.max(0,Math.min(100,100*((todayUTC-START)/864e5)/N));
   const row=(c,l,sub)=>`<li style="--c:${c}"><b>${l}</b><span>${sub}</span></li>`;
   m.innerHTML=`<div class="rm-bar"><i style="width:${pct}%"></i>${todayUTC>=START&&todayUTC<=EXAM?`<em style="left:${pct}%">${T.todayL}</em>`:''}</div><ol>`+
     row('var(--accent)',T.r1Label,T.r1Sub+r1h+' h')+row('var(--warn)',T.r2Label,T.r2Sub)+(FS<EXAM?row('var(--ok)',T.sprint.toUpperCase(),`${FS.getUTCDate()} – ${END.getUTCDate()} ${MES[END.getUTCMonth()]}`):'')+row('var(--ink)',T.examL,'')+`</ol><p class="note">${T.holidays}</p>`}
  // weekly
  {const weeks=[];const mon=d=>add(d,-((d.getUTCDay()+6)%7));
  days.forEach(x=>{const m=iso(mon(x.d));let w=weeks.find(w=>w.m===m);if(!w){w={m,d:mon(x.d),c:{}};weeks.push(w)}x.slots.forEach(s=>w.c[s.s]=(w.c[s.s]||0)+1)});
  const cw=($('weekly').clientWidth||560),W=Math.max(300,Math.min(560,cw)),H=cw<480?230:250,L=34,B=36,Tp=26,R=8,max=Math.max(28,Math.ceil(Math.max(...weeks.map(w=>Object.values(w.c).reduce((a,b)=>a+b,0)))/7)*7),bw=(W-L-R)/weeks.length;const Y=v=>H-B-(H-B-Tp)*v/max;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T.weeklyAria}">`;
  for(let v=0;v<=max;v+=7)s+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" style="stroke:var(--line)"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end">${v}h</text>`;
  weeks.forEach((w,i)=>{let acc=0;const x=L+i*bw+bw*.18,ww=bw*.64;
    [...ORDER,'mix'].forEach(k=>{const v=w.c[k]||0;if(!v)return;s+=`<rect x="${x}" y="${Y(acc+v)}" width="${ww}" height="${Y(acc)-Y(acc+v)-1}" style="fill:${COL(k)}"><title>${k==='mix'?T.review:S[k].es}: ${v} h</title></rect>`;acc+=v});
    s+=`<text x="${x+ww/2}" y="${Y(acc)-5}" text-anchor="middle" style="fill:var(--ink);font-weight:600">${acc}</text>${bw>=44||i%2===0?`<text x="${x+ww/2}" y="${H-B+16}" text-anchor="middle">${w.d.getUTCDate()} ${MES[w.d.getUTCMonth()]}</text>`:''}`});
  $('weekly').innerHTML=s+`<text x="${L}" y="${H-4}">${T.weekStart}</text></svg>`;}
  // by subject
  {const c={};ORDER.forEach(k=>c[k]={a:0,b:0});days.forEach(x=>x.slots.forEach(s=>{if(c[s.s])s.ph==='r1'?c[s.s].a++:c[s.s].b++}));
  const W=Math.max(320,Math.min(440,$('bysubj').clientWidth||440)),rowH=30,L=96,R=34,Tp=8,max=Math.ceil(Math.max(...ORDER.map(k=>c[k].a+c[k].b))/10)*10,H=Tp+ORDER.length*rowH+24;const X=v=>L+(W-L-R)*v/max;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T.subjAria}">`;
  for(let v=0;v<=max;v+=10)s+=`<line x1="${X(v)}" x2="${X(v)}" y1="${Tp}" y2="${H-22}" style="stroke:var(--line)"/><text x="${X(v)}" y="${H-6}" text-anchor="middle">${v}h</text>`;
  ORDER.forEach((k,i)=>{const y=Tp+i*rowH+5,{a,b}=c[k];
    s+=`<text x="${L-10}" y="${y+15}" text-anchor="end" style="fill:var(--ink);font:500 12px var(--f-body)">${S[k].es}</text><rect x="${X(0)}" y="${y}" width="${X(a)-X(0)}" height="18" rx="3" style="fill:${COL(k)}"><title>${T.r1}: ${a} h</title></rect><rect x="${X(a)+1}" y="${y}" width="${Math.max(0,X(a+b)-X(a)-1)}" height="18" rx="3" style="fill:${COL(k)};opacity:.4"><title>${T.r2s}: ${b} h</title></rect><text x="${X(a+b)+5}" y="${y+15}" style="fill:var(--ink);font-weight:600">${a+b}</text>`});
  $('bysubj').innerHTML=s+'</svg>';}
}

/* ----- Calendar view ----- */
const chip=(k,attrs='')=>`<button type="button" class="chip" data-k="${k}" ${attrs}><span class="badge" style="background:${COL(k)}">${ic(k)}</span>${k==='mix'?T.mixName:S[k].es}</button>`;
function renderCalendar(){
  $('legend').innerHTML=[...ORDER,'mix'].map(k=>chip(k,'tabindex="-1" style="cursor:default"')).join('')+`<span class="legend-phase" style="align-self:center"><span><i class="sw" style="background:var(--ink)"></i>${T.examLegend}</span><span><i class="sw" style="background:var(--grid);border:1px solid var(--line)"></i>${T.restLegend}</span></span>`;
  const byK=Object.fromEntries(days.map(x=>[x.k,x]));
  const MONTHS=[];for(let y=START.getUTCFullYear(),m=START.getUTCMonth();y*12+m<=EXAM.getUTCFullYear()*12+EXAM.getUTCMonth();m++){if(m>11){m=0;y++}MONTHS.push([y,m])}
  $('cal').innerHTML=MONTHS.map(([y,m])=>{
    const first=D(y,m,1),off=(first.getUTCDay()+6)%7,n=new Date(Date.UTC(y,m+1,0)).getUTCDate();
    let g=T.DOWS.map(x=>`<div class="dow">${x}</div>`).join('');
    for(let i=0;i<off;i++)g+='<div class="cell empty"></div>';
    for(let i=1;i<=n;i++){const d=D(y,m,i),k=iso(d),x=byK[k];
      if(k===iso(EXAM)){g+=`<div class="cell exam" title="Mocks"><span>${i}</span><span class="h">MOCK</span></div>`;continue}
      if(!x){g+=`<div class="cell off"><span>${i}</span></div>`;continue}
      const cls=['cell'];if(!x.h)cls.push('rest');if(k===todayK)cls.push('today-c');
      g+=`<button type="button" class="${cls.join(' ')}" data-go="${k}" aria-label="${fmt(d)}: ${x.h} ${T.hours}"><span>${i}</span><span><span class="h">${x.h?x.h+'h':T.off}</span><span class="strip">${x.slots.map(s=>`<i style="background:${COL(s.s)};opacity:${done[s.uid]?.35:1}"></i>`).join('')}</span></span></button>`}
    return `<div class="month"><h3>${MESL[m]} ${y}</h3><div class="mgrid">${g}</div></div>`}).join('');
  const weeks=[];const mon=d=>add(d,-((d.getUTCDay()+6)%7));
  days.forEach(x=>{const m=iso(mon(x.d));let w=weeks.find(w=>w.m===m);if(!w){w={m,list:[]};weeks.push(w)}w.list.push(x)});
  $('plan').innerHTML=weeks.map((w,i)=>{const a=w.list[0].d,b=w.list[w.list.length-1].d,h=w.list.reduce((s,x)=>s+x.h,0);
    const phases=[...new Set(w.list.map(x=>x.phase))].map(p=>`<span class="phase-pill ${PHC[p]}">${PHN(p)}</span>`).join('');
    return `<div class="week"><div class="week-h"><h3>${T.week} ${i+1}</h3><span class="meta num">${a.getUTCDate()} ${MES[a.getUTCMonth()]} – ${b.getUTCDate()} ${MES[b.getUTCMonth()]} · ${h} h</span>${phases}</div><div class="days">${w.list.map(x=>{
      const body=x.h?`<ul class="slots">${x.slots.map((s,i)=>slotHTML(x,s,i)).join('')}</ul>`:`<p class="rest-note">${T.dayOff}${x.k.endsWith('-12-25')?' '+T.xmas:x.k.endsWith('-01-01')?' '+T.ny:''}</p>`;
      return `<article class="day${x.k===todayK?' is-today':''}" id="d-${x.k}"><div class="day-h"><b>${fmt(x.d)}</b><span>${x.h} h</span></div>${body}</article>`}).join('')}</div></div>`}).join('');
  applyFilter();
}
let active=null;
$('filters').innerHTML=`<button type="button" class="chip" data-k="all" aria-pressed="true">${T.all}</button>`+ORDER.map(k=>chip(k,'aria-pressed="false"')).join('');
function applyFilter(){
  document.querySelectorAll('#plan .slot').forEach(li=>li.hidden=!!active&&li.dataset.s!==active);
  document.querySelectorAll('#plan .day').forEach(d=>d.hidden=!!active&&!d.querySelector('.slot:not([hidden])'));
  document.querySelectorAll('#plan .week').forEach(w=>w.hidden=!!active&&!w.querySelector('.day:not([hidden])'));
}
$('filters').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;active=b.dataset.k==='all'?null:b.dataset.k;
  $('filters').querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));applyFilter()});
function go(k){const el=$('d-'+k);if(!el)return;el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash')}
$('cal').addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(b.dataset.go)});
$('goToday').textContent=T.goToday;
$('goToday').addEventListener('click',()=>go(days.some(d=>d.k===todayK)?todayK:days[0].k));

/* ----- Subjects view ----- */
function renderSubjects(){
  $('subjects').innerHTML=ORDER.map(k=>{const s=S[k];
    const row=(key,i,t)=>{const id=`${k}-${key}-${String(i+1).padStart(2,'0')}`;const ok=!!done[id];const q=quiz[id];const d=slotDate[id];
      return `<li class="${ok?'ok':''}"><a href="${BASE}session.html?id=${id}${d?'&d='+d:''}&lang=${LANG}"><span class="n">${ok?'✓':String(i+1).padStart(2,'0')}</span><span>${esc(t[0])}</span>${q?`<span class="qb ${level(q.p)}">${q.p}%</span>`:'<span></span>'}</a>${key==='r1'?`<button type="button" class="prc" data-practice="${id}" data-title="${esc(t[0])}" aria-label="${LANG==='es'?'Practicar':'Practice'}: ${esc(t[0])}">🃏</button>`:''}</li>`};
    const all=[...s.r1.map((t,i)=>`${k}-r1-${String(i+1).padStart(2,'0')}`),...s.r2.map((t,i)=>`${k}-r2-${String(i+1).padStart(2,'0')}`)];
    const nd=all.filter(id=>done[id]).length;
    return `<article class="subj" id="s-${k}"><div class="subj-h"><span class="badge" style="background:${COL(k)}">${ic(k)}</span><div><h3>${s.es}</h3><small>${s.en} · ${s.code}</small></div></div>
    <div class="papers">${s.papers.map(([a,b])=>`<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>
    <p class="tip">${s.tip}</p><small class="num" style="color:var(--muted)">${T.doneOf(nd,all.length)}</small>
    <details class="subj-more" data-k="${k}" ${subjOpen(k)?'open':''}><summary>${LANG==='es'?`Ver temas y sesiones (${all.length})`:`See topics and sessions (${all.length})`}</summary>
    <h4>${T.r1Topics}</h4><ol class="subj-topics">${s.r1.map((t,i)=>row('r1',i,t)).join('')}</ol>
    <h4>${T.r2Topics}</h4><ol class="subj-topics">${s.r2.map((t,i)=>row('r2',i,t)).join('')}</ol></details></article>`}).join('');
}
const SO='igcse-subj-open';
function subjOpen(k){let o=null;try{o=JSON.parse(sessionStorage.getItem(SO)||'null')}catch(e){}return o?o.includes(k):innerWidth>=900}
document.addEventListener('toggle',e=>{const d=e.target;if(!d.classList||!d.classList.contains('subj-more'))return;
  const o=[...document.querySelectorAll('details.subj-more[open]')].map(x=>x.dataset.k);try{sessionStorage.setItem(SO,JSON.stringify(o))}catch(err){}},true);

/* ----- Method and resources ----- */
function sessBar(parts){const W=440,H=78;let x=0,s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T.sessAria}">`;
  parts.forEach(([m,l,c])=>{const w=W*m/60;s+=`<rect x="${x}" y="6" width="${w-3}" height="30" rx="5" style="fill:${c}"/><text x="${x+6}" y="26" style="fill:var(--surface);font:700 12px var(--f-mono)">${m}′</text><text x="${x}" y="54" style="fill:var(--ink);font:500 11px var(--f-body)">${l[0]}</text><text x="${x}" y="69">${l[1]||''}</text>`;x+=w});
  return s+'</svg>'}
$('method').innerHTML=DATA.METHOD;
$('sess1').innerHTML=sessBar(T.sess1.map(([a,b],i)=>[a,b,['var(--c-mix)','var(--accent)','var(--ok)','var(--warn)'][i]]));
$('sess2').innerHTML=sessBar(T.sess2.map(([a,b],i)=>[a,b,['var(--warn)','var(--ok)'][i]]));
$('res').innerHTML=DATA.RES.map(([n,u,f,d,m])=>`<a href="${u}" target="_blank" rel="noopener"><b>${n}${m?`<span class="must">${T.essential}</span>`:''}</b><span class="for">${f}</span><p>${d}</p></a>`).join('');
$('assume').innerHTML=T.assume;
document.querySelectorAll('[data-vh]').forEach(el=>{const [eb,h,l]=T.views[el.dataset.vh];el.innerHTML=`<p class="eyebrow">${eb}</p><h2>${h}</h2><p class="lead">${l}</p>`});
$('weeklyTitle').textContent=T.weeklyTitle;$('weeklyNote').textContent=T.weeklyNote;$('subjTitle').textContent=T.subjTitle;$('legR1').textContent=T.legR1;$('legR2').textContent=T.legR2;$('phasesTitle').textContent=T.phasesTitle;

/* ----- Ticking a session: confirm, then mini test ----- */
const cfm=$('cfm');let cfPending=null;
function refreshAll(){if(window.dashRefresh)window.dashRefresh();else renderToday();renderCalendar();renderSubjects()}
function setDone(id,val){if(val)done[id]=true;else delete done[id];save();refreshAll()}
function cfClose(){cfm.hidden=true;cfPending=null}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('input[type=checkbox][data-id]');if(!t)return;e.preventDefault();
  const val=!done[t.dataset.id];const li=t.closest('li');cfPending={id:t.dataset.id,val,title:li?(li.querySelector('.tp,.mc-title')||{}).textContent||'':''};
  $('cfmQ').textContent=val?T.CF.q1:T.CF.q0;$('cfmT').textContent=cfPending.title.replace(/\s*→.*$/,'');
  $('cfmYes').textContent=val?T.CF.y1:T.CF.y0;$('cfmNo').textContent=T.CF.n;cfm.hidden=false;$('cfmYes').focus()});
cfm.addEventListener('click',e=>{if(e.target.id==='cfmYes'&&cfPending){const p=cfPending;cfClose();if(p.val&&/-r1-\d\d$/.test(p.id))startQuiz(p.id,p.title);else if(p.val)finishTask(p.id);else setDone(p.id,false)}else if(e.target.id==='cfmNo'||e.target===cfm)cfClose()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!cfm.hidden)cfClose();if(!$('quiz').hidden)closeQuiz()}});


/* ----- Well done! → next task (shown after every completed session) ----- */
const CL=LANG==='es'?{
  w:['¡Bien hecho!','¡Genial!','¡Una menos!','¡Así se hace!','¡Crack!'],
  left:n=>n===1?'Solo te queda 1 por hoy. ¡A por ella!':`Te quedan ${n} por hoy. Vamos con la siguiente:`,quizS:p=>`Mini test: ${p}%`,
  dayT:'¡Día completado!',dayS:'Enhorabuena: hoy has cumplido el plan entero. Así es como llegas preparada al 11 de enero.',
  extraQ:'¿Te quedan 30 minutos y energía?',extraS:'Adelanta la siguiente sesión: cada una que haces antes es un colchón para los días complicados y te pone por encima del plan.',
  extraTag:d=>`De ${d}`,go:'Empezar ahora →',goX:'Adelantar esta →',later:'En un rato',enough:'Por hoy suficiente 😌',
  endT:'¡Plan completado entero!',endS:'Has hecho todas las sesiones. Repasa tus temas flojos y descansa antes de los mocks.',ok:'Cerrar',pts:'+10 puntos'
}:{
  w:['Well done!','Great job!','One down!','Nailed it!','Awesome!'],
  left:n=>n===1?'Just 1 left for today. Go for it!':`${n} left for today. On to the next one:`,quizS:p=>`Mini test: ${p}%`,
  dayT:'Day complete!',dayS:'Congratulations: you did the whole plan for today. This is exactly how you walk into 11 January ready.',
  extraQ:'Got 30 more minutes and some energy?',extraS:'Get ahead with the next session: every one you do early is a cushion for busy days and puts you ahead of the plan.',
  extraTag:d=>`From ${d}`,go:'Start now →',goX:'Get ahead →',later:'In a bit',enough:'Enough for today 😌',
  endT:'Whole plan complete!',endS:'You’ve done every session. Review your weak topics and rest before the mocks.',ok:'Close',pts:'+10 points'
};
const celEl=document.createElement('div');celEl.id='cel';celEl.hidden=true;celEl.setAttribute('role','dialog');celEl.setAttribute('aria-modal','true');document.body.appendChild(celEl);
function celClose(){celEl.hidden=true;celEl.innerHTML=''}
celEl.addEventListener('click',e=>{if(e.target===celEl||e.target.closest('[data-cel=close]'))celClose()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!celEl.hidden)celClose()});
function nextTasks(){
  const first=days[0].k,K=todayK<first?first:todayK;
  const pend=[];days.forEach(x=>x.slots.forEach((s,i)=>{if(s.id&&!done[s.uid])pend.push({s,x,i})}));
  const tDay=days.find(x=>x.k===K);const tReq=tDay?tDay.slots.filter(s=>s.id):[];
  return {K,today:pend.filter(t=>t.x.k<=K),ahead:pend.filter(t=>t.x.k>K),tTot:tReq.length,tDone:tReq.filter(s=>done[s.uid]).length}
}
function taskCard(t,tag){const s=t.s,nm=s.s==='mix'?(s.kick?T.kick:T.rev):S[s.s].es;
  return `<a class="cel-card" href="${sessionHref(s,t.x)}" style="--c:${COL(s.s)}"><span class="cel-ic">${ic(s.s)}</span><span class="cel-tx"><span class="cel-sub">${esc(nm)} · 1 h${tag?' · '+esc(tag):''}</span><b>${esc(s.t)}</b><span class="cel-dt">${esc(s.dt)}</span></span></a>`}
function confetti(){const cols=['#FFB020','#2F5BE0','#30A46C','#E5484D','#8A4BD6','#0A94C2'];let h='<div class="cel-conf" aria-hidden="true">';
  for(let i=0;i<28;i++)h+=`<i style="left:${Math.random()*100}%;background:${cols[i%cols.length]};animation-delay:${(Math.random()*.4).toFixed(2)}s;--r:${Math.round(Math.random()*720-360)}deg;--x:${Math.round(Math.random()*120-60)}px"></i>`;
  return h+'</div>'}
function celebrate(uid,qp){
  const n=nextTasks();const qs2=qp!=null?`<span class="cel-chip">${CL.quizS(qp)}</span>`:'';const pts=`<span class="cel-chip">⭐ ${CL.pts}</span>`;
  let h;
  if(n.today.length){const t=n.today[0];
    const w=CL.w[Math.floor(Math.random()*CL.w.length)];
    const dots=`<div class="cel-dots">${'<i class="on"></i>'.repeat(Math.min(n.tDone,8))}${'<i></i>'.repeat(Math.min(n.today.length,8))}</div>`;
    h=`<div class="cel-box"><div class="cel-em">💪</div><h3>${w}</h3><div class="cel-chips">${pts}${qs2}</div>${dots}<p>${CL.left(n.today.length)}</p>
      ${taskCard(t)}<div class="cel-row"><button type="button" class="cel-sec" data-cel="close">${CL.later}</button><a class="cel-pri" href="${sessionHref(t.s,t.x)}">${CL.go}</a></div></div>`;
  }else if(n.ahead.length){const t=n.ahead[0];
    h=`${confetti()}<div class="cel-box"><div class="cel-em">🎉</div><h3>${CL.dayT}</h3><div class="cel-chips">${pts}${qs2}</div><p>${CL.dayS}</p>
      <div class="cel-extra"><b>${CL.extraQ}</b><p>${CL.extraS}</p>${taskCard(t,CL.extraTag(fmt(t.x.d)))}</div>
      <div class="cel-row"><button type="button" class="cel-sec" data-cel="close">${CL.enough}</button><a class="cel-pri" href="${sessionHref(t.s,t.x)}">${CL.goX}</a></div></div>`;
  }else{
    h=`${confetti()}<div class="cel-box"><div class="cel-em">🏆</div><h3>${CL.endT}</h3><div class="cel-chips">${pts}${qs2}</div><p>${CL.endS}</p><div class="cel-row"><button type="button" class="cel-pri" data-cel="close">${CL.ok}</button></div></div>`;
  }
  celEl.innerHTML=h;celEl.hidden=false;const f=celEl.querySelector('.cel-pri');if(f)f.focus({preventScroll:true});
}
function finishTask(uid,qp){setDone(uid,true);celebrate(uid,qp)}
const QZ=$('quiz');let qs=null;
function closeQuiz(){QZ.hidden=true;qs=null}
function startQuiz(id,title){
  fetch(`${BASE}content/quiz/${id}.json`,{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(data=>{
    qs={id,title:title.replace(/\s*→.*$/,''),qq:data.questions||[],i:0,score:0,max:(data.questions||[]).length,answered:false};
    if(!qs.max){finishTask(id);return}
    QZ.hidden=false;renderQ()}).catch(()=>finishTask(id));
}
function qHead(){return `<div class="qhead"><span>${T.quiz.title}</span><span>${T.quiz.of(Math.min(qs.i+1,qs.max),qs.max)}</span></div><div class="qbar"><i style="width:${100*qs.i/qs.max}%"></i></div><div class="why">${esc(qs.title)}</div>`}
function renderQ(){
  const box=QZ.querySelector('.qbox');
  if(qs.i>=qs.max){const p=Math.round(100*qs.score/qs.max);const lv=level(p);
    box.innerHTML=`${qHead()}<div style="text-align:center;display:flex;flex-direction:column;gap:6px"><span class="big" style="color:${lv==='g'?'#30A46C':lv==='a'?'#D48A00':'#E5484D'}">${p}%</span><span class="num">${T.quiz.score(+qs.score.toFixed(1),qs.max)}</span><b>${lv==='g'?T.quiz.good:lv==='a'?T.quiz.mid:T.quiz.low}</b></div><div class="qrow"><button type="button" class="ok" data-q="finish">${T.quiz.finish}</button></div>`;
    return}
  const q=qs.qq[qs.i];qs.answered=false;
  if(q.type==='mcq'){
    box.innerHTML=`${qHead()}<div class="qq">${esc(q.q)}</div><div class="opts">${q.options.map((o,j)=>`<button type="button" class="opt" data-o="${j}">${esc(o)}</button>`).join('')}</div><div class="why" id="qwhy"></div><div class="qrow" id="qnext" hidden><button type="button" class="pri" data-q="next">${T.quiz.next}</button></div><button type="button" class="skip" data-q="skip">${T.quiz.skip}</button>`;
  }else{
    box.innerHTML=`${qHead()}<div class="qq">${esc(q.q)}</div><p class="why">${T.quiz.shortHint}</p><div class="qrow" id="qshow"><button type="button" class="pri" data-q="show">${T.quiz.show}</button></div><div id="qmodel" hidden><div class="model"><b>${esc(q.model)}</b>${q.points&&q.points.length?`<ul>${q.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`:''}</div><p class="why" style="margin-top:10px">${T.quiz.self}</p><div class="qrow"><button type="button" data-self="0">${T.quiz.no}</button><button type="button" data-self=".5">${T.quiz.partly}</button><button type="button" class="ok" data-self="1">${T.quiz.yes}</button></div></div><button type="button" class="skip" data-q="skip">${T.quiz.skip}</button>`;
  }
}
QZ.addEventListener('click',e=>{if(!qs)return;const b=e.target.closest('button');if(!b)return;
  if(b.dataset.o!==undefined&&!qs.answered){const q=qs.qq[qs.i],j=+b.dataset.o;qs.answered=true;if(j===q.answer)qs.score++;
    QZ.querySelectorAll('.opt').forEach((o,k)=>{if(k===q.answer)o.classList.add('right');else if(k===j)o.classList.add('bad');o.disabled=true});
    $('qwhy').textContent=(j===q.answer?T.quiz.correct:T.quiz.wrong)+(q.why?' · '+q.why:'');$('qnext').hidden=false;$('qnext').querySelector('button').focus();return}
  if(b.dataset.q==='next'){qs.i++;renderQ();return}
  if(b.dataset.q==='show'){$('qmodel').hidden=false;$('qshow').hidden=true;return}
  if(b.dataset.self!==undefined){qs.score+=+b.dataset.self;qs.i++;renderQ();return}
  if(b.dataset.q==='skip'){const id=qs.id;closeQuiz();finishTask(id);return}
  if(b.dataset.q==='finish'){const id=qs.id,p=Math.round(100*qs.score/qs.max);quiz[id]={p,d:todayK,n:(quiz[id]?quiz[id].n:0)+1};store(QKEY,quiz);closeQuiz();finishTask(id,p);return}
});


/* ----- Settings: study hours and regenerate ----- */
const mandatory=()=>days.flatMap(x=>x.slots).filter(s=>s.id).concat(overflow);
function renderSettings(){
  const r=Object.assign({},DEF_RULE,(HS.rules||[]).slice(-1)[0]||{});const st=T.set;
  const F=todayK>days[0].k?todayK:days[0].k;
  const step=(id,v,lbl)=>`<div class="stp"><span>${lbl}</span><div><button type="button" data-st="${id}" data-d="-1" aria-label="−">−</button><b id="${id}">${v}</b><button type="button" data-st="${id}" data-d="1" aria-label="+">+</button></div></div>`;
  $('settings').innerHTML=`
  <div class="panel"><h3>${st.nameH}</h3><input id="setName" class="inp" type="text" value="${esc(HS.name||'Carlota')}" autocomplete="off"><p class="note">${st.nameNote}</p></div>
  <div class="panel"><h3>${st.weekH}</h3><p class="note">${st.weekNote}</p><div class="stps">${st.days.map((d,i)=>step('wd'+i,r.wd[i],d)).join('')}</div></div>
  <div class="panel"><h3>${st.holH}</h3><div class="row2"><label>${st.from}<input id="holFrom" class="inp" type="date" value="${r.holFrom}" min="${iso(START)}" max="${iso(END)}"></label><label>${st.to}<input id="holTo" class="inp" type="date" value="${r.holTo}" min="${iso(START)}" max="${iso(END)}"></label></div>
    <div class="stps">${step('hol',r.hol,st.holHours)}</div>
    <label class="chk"><input id="xmasOff" type="checkbox" ${r.xmasOff?'checked':''}> ${st.xmas}</label><label class="chk"><input id="half" type="checkbox" ${r.half?'checked':''}> ${st.half}</label></div>
  <div class="panel" id="setPrev"></div>
  <div class="actions" id="setAct"></div>`;
  const read=()=>({wd:[0,1,2,3,4,5,6].map(i=>+$('wd'+i).textContent),hol:+$('hol').textContent,holFrom:$('holFrom').value||r.holFrom,holTo:$('holTo').value||r.holTo,xmasOff:$('xmasOff').checked,half:$('half').checked});
  function preview(){const nr=read();let cap=0;days.filter(x=>x.k>=F).forEach(x=>cap+=ruleHours(nr,x.k,x.d));
    const need=mandatory().filter(s=>!done[s.uid]).length;const diff=cap-need;
    $('setPrev').innerHTML=`<h3>${st.prevH}</h3><div class="kv"><span>${st.cap}</span><b class="num">${cap} h</b><span>${st.need}</span><b class="num">${need} h</b></div><p class="fit ${diff>=0?'ok':'bad'}">${diff>=0?st.fits(diff):st.short(-diff)}</p><p class="note">${st.applies(fmt(new Date(F+'T00:00:00Z')))}</p>`}
  function actions(mode){const a=$('setAct');
    if(mode==='confirm')a.innerHTML=`<div class="confirm-box"><b>${st.sure}</b><span>${st.sureNote}</span><div class="actions"><button type="button" class="btn warn" data-a="yes">${st.yes}</button><button type="button" class="btn ghost" data-a="no">${st.no}</button></div></div>`;
    else if(mode==='reset')a.innerHTML=`<div class="confirm-box"><b>${st.resetSure}</b><div class="actions"><button type="button" class="btn warn" data-a="reset-yes">${st.resetYes}</button><button type="button" class="btn ghost" data-a="no">${st.no}</button></div></div>`;
    else a.innerHTML=`<button type="button" class="btn" data-a="regen">${st.regen}</button>${(HS.rules||[]).length?`<button type="button" class="btn ghost" data-a="reset">${st.reset}</button>`:''}<button type="button" class="btn ghost" data-a="saveName">${st.saveName}</button>`}
  preview();actions();
  $('settings').oninput=preview;
  $('settings').onclick=e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.st){const el=$(b.dataset.st);const max=b.dataset.st==='hol'?8:6;el.textContent=Math.max(0,Math.min(max,+el.textContent+ +b.dataset.d));preview();return}
    const a=b.dataset.a;
    if(a==='regen')actions('confirm');else if(a==='reset')actions('reset');else if(a==='no')actions();
    else if(a==='saveName'){HS.name=$('setName').value.trim()||'Carlota';store(HKEY,HS);location.reload()}
    else if(a==='yes'){HS.name=$('setName').value.trim()||'Carlota';HS.rules=(HS.rules||[]).filter(x=>x.from<F).concat([Object.assign(read(),{from:F})]);store(HKEY,HS);store(MOVES_KEY,{});location.hash='hoy';location.reload()}
    else if(a==='reset-yes'){delete HS.rules;store(HKEY,HS);store(MOVES_KEY,{});location.hash='hoy';location.reload()}};
}
/* ----- Expose for the dashboard ----- */
window.PLAN={START:iso(START),EXAM:iso(EXAM),R1_END,R2_END,PROF,overflow,mandatory,name:HS.name||'Carlota',ruleHours,DEF_RULE,HS,days,S,ORDER,COL,fmt,todayK,done,save,PH:Object.fromEntries(Object.entries(T.PH).map(([k,v])=>[k,[v,PHC[k]]])),moves,MOVES_KEY,slotHTML,renderToday,quiz,level,lang:LANG,base:BASE};
renderReparto();renderCalendar();renderSubjects();renderSettings();
if(PROF&&!VIEW&&PROF.tot!==mandatory().length){PROF.tot=mandatory().length;store(PKEY,PROF)}
{let rw=innerWidth,rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(Math.abs(innerWidth-rw)>40){rw=innerWidth;renderReparto()}},250)})}

window.addEventListener('DOMContentLoaded',()=>{});
/* ----- Return to the exact place after visiting a session page ----- */
const RET='igcse-return';
try{history.scrollRestoration='manual'}catch(e){}
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href*="session.html"]');if(!a)return;
  try{sessionStorage.setItem(RET,JSON.stringify({url:location.href,y:Math.round(window.scrollY)}))}catch(err){}},true);
let userMoved=false;['wheel','touchstart','keydown'].forEach(ev=>addEventListener(ev,()=>{userMoved=true},{passive:true,once:true}));
function restoreScroll(){let r=null;try{r=JSON.parse(sessionStorage.getItem(RET)||'null')}catch(e){}
  if(!(r&&r.url===location.href))return;const go=()=>{if(!userMoved&&Math.abs(window.scrollY-r.y)>40)window.scrollTo(0,r.y)};
  requestAnimationFrame(go);addEventListener('load',go,{once:true});[150,400,800,1500].forEach(t=>setTimeout(go,t))}
window.addEventListener('pageshow',e=>{if(e.persisted)restoreScroll()});
route();
restoreScroll();
/* ----- New day or back to the app: reload so 'today' is never stale ----- */
if(!/[?&]today=/.test(location.search)){
  const curK=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  const check=()=>{if(curK()!==todayK){try{sessionStorage.setItem(RET,JSON.stringify({url:location.href,y:0}))}catch(e){}location.reload()}};
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check()});
  addEventListener('focus',check);addEventListener('pageshow',check);setInterval(check,60000);
}
})();
