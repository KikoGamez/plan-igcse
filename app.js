/* IGCSE plan app (shared by the Spanish and English shells). Data and texts come from data-<lang>.js as window.DATA. */
(function(){
const DATA=window.DATA,T=DATA.T,S=DATA.S,LANG=DATA.lang,BASE=DATA.base;
const ORDER=['math','stats','bio','chem','phys','bus','eng','fr','spa'];
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
const START=D(2026,10,16),END=D(2027,0,10),EXAM=D(2027,0,11);
const R1_END='2026-12-28',R2_END='2027-01-08';
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
const days=[];
for(let d=new Date(START);d<=END;d=add(d,1)){
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
days.forEach(x=>{x.base=x.slots.length;x.slots.forEach((s,i)=>{s.uid=s.id==='weekly-review'?'weekly-review@'+x.k:(s.id||('x@'+x.k+'-'+i));s.orig=x.k;s.ph=x.phase})});
/* ----- Custom study hours ("Regenerate plan") ----- */
const now=(()=>{let q=null;try{q=new URLSearchParams(location.search).get('today')}catch(e){}return q&&/^\d{4}-\d\d-\d\d$/.test(q)?new Date(q+'T12:00:00'):new Date()})();
const todayK=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const load=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}};
const store=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const KEY='igcse-plan-v1',QKEY='igcse-quiz-v1',HKEY='igcse-hours-v1';
const done=load(KEY),quiz=load(QKEY),HS=load(HKEY);
const DEF_RULE={wd:[2,2,2,2,2,4,4],hol:4,holFrom:'2026-12-22',holTo:'2027-01-10',xmasOff:true,half:true};
function ruleHours(r,k,d){if(r.xmasOff&&(k==='2026-12-25'||k==='2027-01-01'))return 0;
  const inHol=k>=r.holFrom&&k<=r.holTo;if(r.half&&inHol&&(k==='2026-12-24'||k==='2026-12-31'))return Math.ceil(r.hol/2);
  if(inHol)return r.hol;return r.wd[(d.getUTCDay()+6)%7]}
let overflow=[];
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
const MOVES_KEY='igcse-moves-v1';let moves={};try{moves=JSON.parse(localStorage.getItem(MOVES_KEY)||'{}')||{}}catch(e){moves={}}
(function(){const byK=Object.fromEntries(days.map(x=>[x.k,x]));const add2={};days.forEach(x=>{x.slots=x.slots.filter(s=>{const t=moves[s.uid];if(t&&t!==x.k&&byK[t]){s.moved=true;(add2[t]=add2[t]||[]).push(s);return false}return true})});days.forEach(x=>{if(add2[x.k])x.slots=x.slots.concat(add2[x.k]);x.h=x.slots.length})})();
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
$('brandT').textContent=T.brand;$('brandS').textContent=T.brandSub;$('installHint').innerHTML=T.install;$('nav').setAttribute('aria-label',T.menu);
$('burger').innerHTML=ic('menu');$('burger').setAttribute('aria-label',T.menu);
const app=$('app');
function openMenu(o){app.classList.toggle('open',o);$('burger').setAttribute('aria-expanded',String(o))}
$('burger').addEventListener('click',()=>openMenu(!app.classList.contains('open')));
$('scrim').addEventListener('click',()=>openMenu(false));
let current=null;
function show(v,dayK){
  if(!VIEWS.includes(v))v='hoy';
  VIEWS.forEach(x=>{$('v-'+x).hidden=x!==v});
  document.querySelectorAll('#nav a').forEach(a=>a.setAttribute('aria-current',a.dataset.v===v?'page':'false'));
  $('viewTitle').textContent=T.nav[v];document.title=`${T.nav[v]} · ${T.brand}`;
  openMenu(false);
  if(v!==current){window.scrollTo(0,0);current=v}
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
  s+=seg(START,D(2026,11,29),'var(--accent)',T.r1Label,T.r1Sub+r1h+' h');
  s+=seg(D(2026,11,29),D(2027,0,9),'var(--warn)',T.r2Label,T.r2Sub);
  s+=`<rect x="${X(D(2027,0,9))}" y="58" width="${X(EXAM)-X(D(2027,0,9))-3}" height="26" rx="6" style="fill:var(--ok)"/><text x="${X(D(2027,0,9))}" y="120" style="fill:var(--muted);font:11px var(--f-mono)">${T.sprint}</text>`;
  s+=`<line x1="${X(D(2026,11,22))}" x2="${X(D(2026,11,22))}" y1="52" y2="132" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${X(D(2026,11,22))-6}" y="140" text-anchor="end" style="fill:var(--ink);font:600 11px var(--f-mono)">${T.holidays}</text>`;
  const ex=X(EXAM);s+=`<circle cx="${ex-6}" cy="71" r="12" style="fill:var(--ink)"/><path d="M${ex-11} 71l4 4 7-8" style="fill:none;stroke:var(--bg);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"/><text x="${ex-6}" y="104" text-anchor="end" style="fill:var(--ink);font:700 12px var(--f-mono)">${T.examL}</text>`;
  if(todayUTC>=START&&todayUTC<=EXAM){const tx=X(todayUTC);s+=`<path d="M${tx} 56l-5-8h10z" style="fill:var(--ink)"/><text x="${tx+8}" y="18" style="fill:var(--ink);font:700 11px var(--f-mono)">${T.todayL}</text><line x1="${tx}" x2="${tx}" y1="22" y2="48" style="stroke:var(--ink)"/>`}
  $('route').innerHTML=s+'</svg>';
  // weekly
  {const weeks=[];const mon=d=>add(d,-((d.getUTCDay()+6)%7));
  days.forEach(x=>{const m=iso(mon(x.d));let w=weeks.find(w=>w.m===m);if(!w){w={m,d:mon(x.d),c:{}};weeks.push(w)}x.slots.forEach(s=>w.c[s.s]=(w.c[s.s]||0)+1)});
  const W=560,H=250,L=34,B=36,Tp=12,R=8,max=Math.max(28,Math.ceil(Math.max(...weeks.map(w=>Object.values(w.c).reduce((a,b)=>a+b,0)))/7)*7),bw=(W-L-R)/weeks.length;const Y=v=>H-B-(H-B-Tp)*v/max;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T.weeklyAria}">`;
  for(let v=0;v<=max;v+=7)s+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" style="stroke:var(--line)"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end">${v}h</text>`;
  weeks.forEach((w,i)=>{let acc=0;const x=L+i*bw+bw*.18,ww=bw*.64;
    [...ORDER,'mix'].forEach(k=>{const v=w.c[k]||0;if(!v)return;s+=`<rect x="${x}" y="${Y(acc+v)}" width="${ww}" height="${Y(acc)-Y(acc+v)-1}" style="fill:${COL(k)}"><title>${k==='mix'?T.review:S[k].es}: ${v} h</title></rect>`;acc+=v});
    s+=`<text x="${x+ww/2}" y="${Y(acc)-5}" text-anchor="middle" style="fill:var(--ink);font-weight:600">${acc}</text><text x="${x+ww/2}" y="${H-B+16}" text-anchor="middle">${w.d.getUTCDate()} ${MES[w.d.getUTCMonth()]}</text>`});
  $('weekly').innerHTML=s+`<text x="${L}" y="${H-4}">${T.weekStart}</text></svg>`;}
  // by subject
  {const c={};ORDER.forEach(k=>c[k]={a:0,b:0});days.forEach(x=>x.slots.forEach(s=>{if(c[s.s])s.ph==='r1'?c[s.s].a++:c[s.s].b++}));
  const W=440,rowH=30,L=110,R=34,Tp=8,max=Math.ceil(Math.max(...ORDER.map(k=>c[k].a+c[k].b))/10)*10,H=Tp+ORDER.length*rowH+24;const X=v=>L+(W-L-R)*v/max;
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
  $('cal').innerHTML=[[2026,10],[2026,11],[2027,0]].map(([y,m])=>{
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
      const body=x.h?`<ul class="slots">${x.slots.map((s,i)=>slotHTML(x,s,i)).join('')}</ul>`:`<p class="rest-note">${T.dayOff} ${x.k==='2026-12-25'?T.xmas:T.ny}</p>`;
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
      return `<li class="${ok?'ok':''}"><a href="${BASE}session.html?id=${id}${d?'&d='+d:''}&lang=${LANG}"><span class="n">${ok?'✓':String(i+1).padStart(2,'0')}</span><span>${esc(t[0])}</span>${q?`<span class="qb ${level(q.p)}">${q.p}%</span>`:'<span></span>'}</a></li>`};
    const all=[...s.r1.map((t,i)=>`${k}-r1-${String(i+1).padStart(2,'0')}`),...s.r2.map((t,i)=>`${k}-r2-${String(i+1).padStart(2,'0')}`)];
    const nd=all.filter(id=>done[id]).length;
    return `<article class="subj" id="s-${k}"><div class="subj-h"><span class="badge" style="background:${COL(k)}">${ic(k)}</span><div><h3>${s.es}</h3><small>${s.en} · ${s.code}</small></div></div>
    <div class="papers">${s.papers.map(([a,b])=>`<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>
    <p class="tip">${s.tip}</p><small class="num" style="color:var(--muted)">${T.doneOf(nd,all.length)}</small>
    <h4>${T.r1Topics}</h4><ol class="subj-topics">${s.r1.map((t,i)=>row('r1',i,t)).join('')}</ol>
    <h4>${T.r2Topics}</h4><ol class="subj-topics">${s.r2.map((t,i)=>row('r2',i,t)).join('')}</ol></article>`}).join('');
}

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
  const val=!done[t.dataset.id];const li=t.closest('li');cfPending={id:t.dataset.id,val,title:li?(li.querySelector('.tp')||{}).textContent||'':''};
  $('cfmQ').textContent=val?T.CF.q1:T.CF.q0;$('cfmT').textContent=cfPending.title.replace(/\s*→.*$/,'');
  $('cfmYes').textContent=val?T.CF.y1:T.CF.y0;$('cfmNo').textContent=T.CF.n;cfm.hidden=false;$('cfmYes').focus()});
cfm.addEventListener('click',e=>{if(e.target.id==='cfmYes'&&cfPending){const p=cfPending;cfClose();if(p.val&&/-r1-\d\d$/.test(p.id))startQuiz(p.id,p.title);else setDone(p.id,p.val)}else if(e.target.id==='cfmNo'||e.target===cfm)cfClose()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!cfm.hidden)cfClose();if(!$('quiz').hidden)closeQuiz()}});

const QZ=$('quiz');let qs=null;
function closeQuiz(){QZ.hidden=true;qs=null}
function startQuiz(id,title){
  fetch(`${BASE}content/quiz/${id}.json`,{cache:'no-cache'}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(data=>{
    qs={id,title:title.replace(/\s*→.*$/,''),qq:data.questions||[],i:0,score:0,max:(data.questions||[]).length,answered:false};
    if(!qs.max){setDone(id,true);return}
    QZ.hidden=false;renderQ()}).catch(()=>setDone(id,true));
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
  if(b.dataset.q==='skip'){const id=qs.id;closeQuiz();setDone(id,true);return}
  if(b.dataset.q==='finish'){const id=qs.id,p=Math.round(100*qs.score/qs.max);quiz[id]={p,d:todayK,n:(quiz[id]?quiz[id].n:0)+1};store(QKEY,quiz);closeQuiz();setDone(id,true);return}
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
  <div class="panel"><h3>${st.holH}</h3><div class="row2"><label>${st.from}<input id="holFrom" class="inp" type="date" value="${r.holFrom}" min="2026-11-16" max="2027-01-10"></label><label>${st.to}<input id="holTo" class="inp" type="date" value="${r.holTo}" min="2026-11-16" max="2027-01-10"></label></div>
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
window.PLAN={overflow,name:HS.name||'Carlota',ruleHours,DEF_RULE,HS,days,S,ORDER,COL,fmt,todayK,done,save,PH:Object.fromEntries(Object.entries(T.PH).map(([k,v])=>[k,[v,PHC[k]]])),moves,MOVES_KEY,slotHTML,renderToday,quiz,level,lang:LANG,base:BASE};
renderReparto();renderCalendar();renderSubjects();renderSettings();
window.addEventListener('DOMContentLoaded',()=>{});
route();
})();
