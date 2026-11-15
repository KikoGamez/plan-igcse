/* Carlota's progress panel: progress by round, overdue sessions, reschedule, motivation and risk lights. */
(function(){
const P=window.PLAN;if(!P)return;
const ES=P.lang==='es';
const NAME='Carlota';
const T=ES?{
  hello:`Hola, ${NAME}`,
  pre1:`Mañana empieza el plan, ${NAME}. ¡A por ello!`,preN:d=>`El plan empieza el ${d}.`,pre2:'Hoy no toca nada: deja preparado el material para mañana.',
  end1:'Plan terminado. ¡Mucha suerte en los mocks!',end2:'Ahora toca descansar y confiar en todo lo que has trabajado.',
  ahead1:`¡Vas por encima de tu plan, ${NAME}! Sigue así.`,ahead2:n=>`Has adelantado ${n} ${n===1?'sesión':'sesiones'} de los próximos días.`,
  on1:'Vas al día. ¡Bien hecho!',onDone:'Lo de hoy ya está completo.',onLeft:n=>`Hoy te ${n===1?'queda':'quedan'} ${n} ${n===1?'sesión':'sesiones'}.`,
  behind1:`Venga, ánimo, ${NAME}: hay que recuperar. No te puedes despistar.`,behind2:n=>`Tienes ${n} ${n===1?'sesión retrasada':'sesiones retrasadas'}.`,
  r1:'Ronda 1 · temario',r2:'Ronda 2 · past papers',f:'Sprint final',all:'Total',
  of:(a,b)=>`${a} de ${b}`,expected:p=>`Según el plan, a estas alturas: ${p}%`,
  kOver:'Retrasadas',kToday:'Pendientes hoy',kAhead:'Adelantadas',
  overTitle:'Sesiones retrasadas',overNone:'No tienes nada retrasado.',more:n=>`y ${n} más…`,
  ago:n=>n===1?'ayer':`hace ${n} días`,
  resBtn:'Reagendar retrasadas',
  resQ:(n,d,m)=>`Vas a mover ${n} ${n===1?'sesión retrasada':'sesiones retrasadas'} a los próximos ${d} días, con un máximo de ${m} extra al día. El plan cambiará.`,
  resSure:'¿Seguro que quieres reagendarlas?',resYes:'Sí, reagendar',resNo:'Cancelar',
  resNoRoom:'Ya no quedan días para reagendar antes del examen.',
  undoBtn:'Volver al plan original',undoQ:'Las sesiones reagendadas volverán a su fecha original (lo que ya has marcado se mantiene).',undoYes:'Sí, volver al original',undoSure:'¿Seguro que quieres deshacer el reagendado?',
  movedNote:n=>`${n} ${n===1?'sesión reagendada':'sesiones reagendadas'} en el plan.`,
  riskTitle:'Riesgo de cara al 11 de enero',
  riskG:'Bien encaminada',riskA:'Atención',riskR:'Riesgo alto',
  riskGd:'Con el ritmo actual llegas con todo el temario preparado.',
  riskAd:'Vas un poco justa: recupera lo retrasado esta semana.',
  riskRd:'Al ritmo actual no llegas a todo. Reagenda y añade tiempo extra.',
  load:p=>`Carga pendiente: ${p}% del tiempo que queda`,
  subjTitle:'Por asignatura',sOk:'Al día',sResch:n=>`${n} reagendada${n===1?'':'s'}`,moreLoad:'Con lo reagendado tienes más carga diaria: no te relajes.',sLate:n=>`${n} retrasada${n===1?'':'s'}`,sGap:'Temario sin terminar',
  legend:'Semáforo general: verde si la carga pendiente cabe en el tiempo que queda; ámbar hasta un 10% por encima; rojo si se pasa más. Por asignatura: ámbar con 1–2 retrasadas o reagendadas; rojo con 3 o más, o con temario sin ver al empezar la Ronda 2.'
}:{
  hello:`Hi ${NAME}`,
  pre1:`The plan starts tomorrow, ${NAME}. Let’s go!`,preN:d=>`The plan starts on ${d}.`,pre2:'Nothing to do today: get your materials ready for tomorrow.',
  end1:'Plan finished. Good luck in the mocks!',end2:'Time to rest and trust all the work you have done.',
  ahead1:`You’re ahead of your plan, ${NAME}! Keep it up.`,ahead2:n=>`You’ve done ${n} session${n===1?'':'s'} from the coming days.`,
  on1:'You’re on track. Well done!',onDone:'Today is complete.',onLeft:n=>`${n} session${n===1?'':'s'} left today.`,
  behind1:`Come on, ${NAME}: time to catch up. Don’t lose focus.`,behind2:n=>`You have ${n} overdue session${n===1?'':'s'}.`,
  r1:'Round 1 · syllabus',r2:'Round 2 · past papers',f:'Final sprint',all:'Total',
  of:(a,b)=>`${a} of ${b}`,expected:p=>`Where the plan expects you to be: ${p}%`,
  kOver:'Overdue',kToday:'Left today',kAhead:'Ahead',
  overTitle:'Overdue sessions',overNone:'Nothing overdue.',more:n=>`and ${n} more…`,
  ago:n=>n===1?'yesterday':`${n} days ago`,
  resBtn:'Reschedule overdue',
  resQ:(n,d,m)=>`This moves ${n} overdue session${n===1?'':'s'} into the next ${d} days, at most ${m} extra per day. The plan will change.`,
  resSure:'Are you sure you want to reschedule them?',resYes:'Yes, reschedule',resNo:'Cancel',
  resNoRoom:'There are no days left to reschedule into before the exam.',
  undoBtn:'Back to the original plan',undoQ:'Rescheduled sessions go back to their original dates (what you have ticked is kept).',undoYes:'Yes, restore the original',undoSure:'Are you sure you want to undo the rescheduling?',
  movedNote:n=>`${n} session${n===1?'':'s'} rescheduled in the plan.`,
  riskTitle:'Risk for 11 January',
  riskG:'On course',riskA:'Watch out',riskR:'High risk',
  riskGd:'At this pace you will have the whole syllabus ready.',
  riskAd:'It is getting tight: catch up on overdue sessions this week.',
  riskRd:'At this pace you will not cover everything. Reschedule and add extra time.',
  load:p=>`Workload left: ${p}% of the time left`,
  subjTitle:'By subject',sOk:'On track',sResch:n=>`${n} rescheduled`,moreLoad:'With the rescheduled sessions your daily load is higher: don’t relax.',sLate:n=>`${n} overdue`,sGap:'Syllabus not finished',
  legend:'Overall light: green if the work left fits in the time left; amber up to 10% over; red beyond that. By subject: amber with 1–2 overdue or rescheduled; red with 3 or more, or topics not covered when Round 2 starts.'
};

const css=`
.dash{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,290px);gap:16px;align-items:start}
@media (max-width:900px){.dash{grid-template-columns:minmax(0,1fr) minmax(0,240px);gap:12px}.dash .card{padding:14px}}
@media (max-width:700px){.dash{grid-template-columns:minmax(0,1fr)}}
.dash .card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:14px;min-width:0}
.dash .msg{border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:4px;border-left:5px solid var(--st)}
.dash .msg b{font-family:var(--f-display);font-size:1.25rem;line-height:1.2}
.dash .msg span{color:var(--muted);font-size:.9rem}
.dash .hello{font:600 .74rem var(--f-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.dash .kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.dash .kpi{border:1px solid var(--line);border-radius:10px;padding:10px 12px}
.dash .kpi b{display:block;font:700 1.6rem/1.1 var(--f-display)}
.dash .kpi span{font-size:.78rem;color:var(--muted)}
.dash .kpi.bad b{color:var(--c-spa)} .dash .kpi.good b{color:var(--ok)}
.dash .prog{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px}
@media (max-width:520px){.dash .prog{grid-template-columns:minmax(0,1fr)}.dash .kpis{grid-template-columns:repeat(3,minmax(0,1fr))}}
.dash .pg{display:flex;flex-direction:column;gap:5px}
.dash .pg-h{display:flex;justify-content:space-between;gap:8px;font-size:.85rem}
.dash .pg-h b{font-family:var(--f-display);font-size:1.1rem}
.dash .pbar{position:relative;height:10px;border-radius:99px;background:var(--grid);overflow:visible}
.dash .pbar i{display:block;height:100%;border-radius:99px;background:var(--ok)}
.dash .pbar em{position:absolute;top:-4px;bottom:-4px;width:2px;background:var(--ink);border-radius:1px}
.dash .pg small{font-size:.74rem;color:var(--muted)}
.dash h4{margin:0;font:700 1rem var(--f-display)}
.dash .over{display:flex;flex-direction:column;gap:6px}
.dash .over .ago{font:.72rem var(--f-mono);color:var(--c-spa)}
.dash .over ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.dash .actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.dash button.b{font:600 .85rem var(--f-body);padding:9px 14px;border-radius:8px;cursor:pointer;border:1px solid var(--ink);background:var(--ink);color:var(--bg)}
.dash button.b.ghost{background:transparent;color:var(--ink);border-color:var(--line)}
.dash button.b.warn{background:var(--c-spa);border-color:var(--c-spa);color:#fff}
.dash .confirm{border:2px solid var(--c-spa);border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:10px;font-size:.9rem}
.dash .note{font-size:.8rem;color:var(--muted)}
.dash .light{display:flex;gap:16px;align-items:center}
.dash .lamps{background:#1b1f33;border-radius:16px;padding:10px 9px;display:flex;flex-direction:column;gap:8px;flex:none}
.dash .lamps i{width:30px;height:30px;border-radius:50%;opacity:.22;display:block}
.dash .lamps i.on{opacity:1;box-shadow:0 0 14px currentColor}
.dash .lamps .r{background:#E5484D;color:#E5484D}.dash .lamps .a{background:#F5A524;color:#F5A524}.dash .lamps .g{background:#30A46C;color:#30A46C}
.dash .light b{font:700 1.15rem var(--f-display);display:block}
.dash .light span{font-size:.85rem;color:var(--muted)}
.dash .subs{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
.dash .subs li{display:grid;grid-template-columns:12px minmax(0,1fr) auto;gap:8px;align-items:center;font-size:.86rem}
.dash .dot{width:12px;height:12px;border-radius:50%}
.dash .dot.g{background:#30A46C}.dash .dot.a{background:#F5A524}.dash .dot.r{background:#E5484D}
.dash .subs em{font-style:normal;color:var(--muted);font-size:.78rem;text-align:right}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const box=document.getElementById('dash');if(!box)return;
let ui={confirm:null};

function compute(){
  const K=P.todayK,days=P.days,first=days[0].k,last=days[days.length-1].k;
  const items=[];days.forEach(x=>x.slots.forEach((s,i)=>items.push({s,x,i,k:x.k,done:!!P.done[s.uid]})));
  const total=items.length,n=items.filter(t=>t.done).length;
  const ph={};['r1','r2','f'].forEach(p=>{const a=items.filter(t=>t.s.ph===p);ph[p]={t:a.length,d:a.filter(t=>t.done).length,e:a.filter(t=>t.k<K).length}});
  const overdue=items.filter(t=>t.k<K&&!t.done).sort((a,b)=>a.k<b.k?-1:a.k>b.k?1:a.i-b.i);
  const todayIt=items.filter(t=>t.k===K),todayLeft=todayIt.filter(t=>!t.done).length;
  const ahead=items.filter(t=>t.k>K&&t.done).length;
  const expectedAll=items.filter(t=>t.k<K).length;
  // risk: remaining work vs remaining planned time (from today)
  const capacity=days.filter(x=>x.k>=K).reduce((a,x)=>a+x.base,0);
  const remaining=total-n;
  const ratio=capacity>0?remaining/capacity:(remaining>0?9:0);
  let risk='g';
  if(K>=first){risk=ratio<=1.0001?'g':ratio<=1.1?'a':'r';if(capacity===0&&remaining>0)risk='r'}
  // per subject
  const r2Started=K>days.filter(x=>x.phase==='r1').slice(-1)[0].k;
  const subs=P.ORDER.map(k=>{const late=overdue.filter(t=>t.s.s===k).length;
    const r1left=items.filter(t=>t.s.s===k&&t.s.ph==='r1'&&!t.done).length;
    const resch=items.filter(t=>t.s.s===k&&t.s.moved&&!t.done&&t.k>=K).length;
    let lv=late===0?(resch?'a':'g'):late<=2?'a':'r';if(r2Started&&r1left>0)lv='r';
    return {k,late,resch,lv,gap:r2Started&&r1left>0}});
  let state='on';
  if(K<first)state='pre';else if(K>last)state='end';else if(overdue.length)state='behind';else if(ahead>0)state='ahead';
  return {K,first,last,items,total,n,ph,overdue,todayLeft,ahead,expectedAll,capacity,remaining,ratio,risk,subs,state};
}

function planMoves(c){
  const K=c.K;let targets=P.days.filter(x=>x.k>K&&x.k<='2027-01-08'&&x.base>0);
  if(!targets.length)targets=P.days.filter(x=>x.k>=K&&x.base>0);
  if(!targets.length)return null;
  const load={};targets.forEach(x=>load[x.k]=0);const mv={};
  c.overdue.forEach(t=>{let best=targets[0];targets.forEach(x=>{if(load[x.k]<load[best.k])best=x});load[best.k]++;mv[t.s.uid]=best.k});
  return {mv,days:targets.length,max:Math.max(...Object.values(load))};
}

function persist(m){try{localStorage.setItem(P.MOVES_KEY,JSON.stringify(m))}catch(e){}location.reload()}

function bar(label,o,showExp){
  const p=o.t?Math.round(100*o.d/o.t):0,e=o.t?Math.round(100*o.e/o.t):0;
  return `<div class="pg"><div class="pg-h"><span>${label}</span><b class="num">${p}%</b></div>
  <div class="pbar" role="img" aria-label="${label}: ${p}%"><i style="width:${p}%"></i>${showExp&&e>0&&e<100?`<em style="left:calc(${e}% - 1px)" title="${T.expected(e)}"></em>`:''}</div>
  <small class="num">${T.of(o.d,o.t)}${showExp?' · '+T.expected(e):''}</small></div>`;
}

function render(){
  const c=compute();
  const stColor={ahead:'var(--ok)',on:'var(--accent)',behind:'var(--c-spa)',pre:'var(--accent)',end:'var(--ok)'}[c.state];
  let m1,m2;
  if(c.state==='pre'){const fd=P.days[0];const tomorrow=new Date(c.K+'T12:00:00');tomorrow.setDate(tomorrow.getDate()+1);
    const isTom=tomorrow.toISOString().slice(0,10)===fd.k;m1=isTom?T.pre1:T.preN(P.fmt(fd.d));m2=T.pre2}
  else if(c.state==='end'){m1=T.end1;m2=T.end2}
  else if(c.state==='ahead'){m1=T.ahead1;m2=T.ahead2(c.ahead)}
  else if(c.state==='behind'){m1=T.behind1;m2=T.behind2(c.overdue.length)}
  else {m1=T.on1;m2=(c.todayLeft?T.onLeft(c.todayLeft):T.onDone)+(c.ratio>1.0001?' '+T.moreLoad:'')}
  const all={t:c.total,d:c.n,e:c.expectedAll};
  const ov=c.overdue.slice(0,10).map(t=>{const days=Math.round((new Date(c.K)-new Date(t.k))/864e5);
    return P.slotHTML(t.x,t.s,t.i).replace(/(<\/a>|<\/div>)<\/li>$/,`<span class="ago">${P.fmt(t.x.d)} · ${T.ago(days)}</span>$1</li>`)}).join('');
  const movedCount=Object.keys(P.moves||{}).length;
  let actions='';
  if(ui.confirm==='res'){const pm=planMoves(c);
    actions=pm?`<div class="confirm" role="alertdialog"><span>${T.resQ(c.overdue.length,pm.days,pm.max)}</span><b>${T.resSure}</b><div class="actions"><button class="b warn" data-a="res-yes" type="button">${T.resYes}</button><button class="b ghost" data-a="cancel" type="button">${T.resNo}</button></div></div>`
      :`<p class="note">${T.resNoRoom}</p>`}
  else if(ui.confirm==='undo'){actions=`<div class="confirm" role="alertdialog"><span>${T.undoQ}</span><b>${T.undoSure}</b><div class="actions"><button class="b warn" data-a="undo-yes" type="button">${T.undoYes}</button><button class="b ghost" data-a="cancel" type="button">${T.resNo}</button></div></div>`}
  else {actions=`<div class="actions">${c.overdue.length?`<button class="b" data-a="res" type="button">${T.resBtn}</button>`:''}${movedCount?`<button class="b ghost" data-a="undo" type="button">${T.undoBtn}</button><span class="note">${T.movedNote(movedCount)}</span>`:''}</div>`}
  const lvl={g:[T.riskG,T.riskGd],a:[T.riskA,T.riskAd],r:[T.riskR,T.riskRd]}[c.risk];
  box.innerHTML=`
  <div class="card">
    <div class="msg" style="--st:${stColor};background:color-mix(in srgb, ${stColor} 9%, transparent)"><span class="hello">${T.hello}</span><b>${m1}</b><span>${m2}</span></div>
    <div class="kpis">
      <div class="kpi ${c.overdue.length?'bad':''}"><b class="num">${c.overdue.length}</b><span>${T.kOver}</span></div>
      <div class="kpi"><b class="num">${c.todayLeft}</b><span>${T.kToday}</span></div>
      <div class="kpi ${c.ahead?'good':''}"><b class="num">${c.ahead}</b><span>${T.kAhead}</span></div>
    </div>
    <div class="prog">${bar(T.r1,c.ph.r1,true)}${bar(T.r2,c.ph.r2,true)}${bar(T.f,c.ph.f,false)}${bar(T.all,all,true)}</div>
    <div class="over"><h4>${T.overTitle}</h4>${c.overdue.length?`<ul class="slots">${ov}</ul>${c.overdue.length>10?`<p class="note">${T.more(c.overdue.length-10)}</p>`:''}`:`<p class="note">${T.overNone}</p>`}</div>
    ${actions}
  </div>
  <aside class="card" aria-label="${T.riskTitle}">
    <h4>${T.riskTitle}</h4>
    <div class="light"><div class="lamps" aria-hidden="true"><i class="r ${c.risk==='r'?'on':''}"></i><i class="a ${c.risk==='a'?'on':''}"></i><i class="g ${c.risk==='g'?'on':''}"></i></div>
      <div><b>${lvl[0]}</b><span>${lvl[1]}</span>${c.K>=c.first&&c.K<=c.last?`<span class="note" style="display:block;margin-top:6px">${T.load(Math.round(100*c.ratio))}</span>`:''}</div></div>
    <h4>${T.subjTitle}</h4>
    <ul class="subs">${c.subs.map(s=>`<li><i class="dot ${s.lv}"></i><span>${P.S[s.k].es}</span><em>${s.gap?T.sGap:s.late?T.sLate(s.late):s.resch?T.sResch(s.resch):T.sOk}</em></li>`).join('')}</ul>
    <p class="note">${T.legend}</p>
  </aside>`;
}
box.addEventListener('click',e=>{const b=e.target.closest('button[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='res'){ui.confirm='res';render()}
  else if(a==='undo'){ui.confirm='undo';render()}
  else if(a==='cancel'){ui.confirm=null;render()}
  else if(a==='res-yes'){const c=compute();const pm=planMoves(c);if(pm)persist(Object.assign({},P.moves||{},pm.mv))}
  else if(a==='undo-yes'){persist({})}
});
window.dashRefresh=render;
render();
})();
