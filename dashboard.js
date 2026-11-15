/* Carlota's progress panel: progress by round, overdue sessions, reschedule, motivation and risk lights. */
(function(){
const P=window.PLAN;if(!P)return;
const ES=P.lang==='es';
const NAME=P.name||'Carlota';const REC=(window.DATA&&DATA.T.rec)||null;
const T=ES?{
  hello:`Hola, ${NAME}`,hi:`¡Hola, ${NAME}!`,daysTo:'días para los mocks',doneW:'completado',streak:n=>`${n} ${n===1?'día':'días'} de racha`,xp:'puntos',level:n=>`Nivel ${n}`,toNext:n=>`${n} pts para el siguiente nivel`,mission:'Misión de hoy',missionFirst:d=>`Tu primera misión · ${d}`,missionDone:'¡Misión cumplida! Hoy ya lo has hecho todo. 🎉',missionOff:'Hoy es día libre. Descansa y recarga pilas.',open:'Abrir',doneBtn:'Hecho',sessionsLeft:n=>`${n} ${n===1?'sesión':'sesiones'} · ${n} h`,
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
  prep:'Preparación según mini tests',prepNone:'Aún no hay mini tests: aparecen al marcar un tema como hecho.',weak:'Temas a reforzar',weakNone:'Ningún tema flojo por ahora.',avg:p=>`media ${p}%`,todayH:'Lo que tienes hoy',
  legend:'Semáforo general: verde si la carga pendiente cabe en el tiempo que queda; ámbar hasta un 10% por encima; rojo si se pasa más. Por asignatura: ámbar con 1–2 retrasadas o reagendadas; rojo con 3 o más, o con temario sin ver al empezar la Ronda 2.'
}:{
  hello:`Hi ${NAME}`,hi:`Hi ${NAME}!`,daysTo:'days to the mocks',doneW:'complete',streak:n=>`${n}-day streak`,xp:'points',level:n=>`Level ${n}`,toNext:n=>`${n} pts to the next level`,mission:'Today’s mission',missionFirst:d=>`Your first mission · ${d}`,missionDone:'Mission complete! You’ve done everything for today. 🎉',missionOff:'Day off today. Rest and recharge.',open:'Open',doneBtn:'Done',sessionsLeft:n=>`${n} session${n===1?'':'s'} · ${n} h`,
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
  prep:'Preparation from mini tests',prepNone:'No mini tests yet: they appear when you tick a topic as done.',weak:'Topics to reinforce',weakNone:'No weak topics so far.',avg:p=>`average ${p}%`,todayH:'Your sessions today',
  legend:'Overall light: green if the work left fits in the time left; amber up to 10% over; red beyond that. By subject: amber with 1–2 overdue or rescheduled; red with 3 or more, or topics not covered when Round 2 starts.'
};

const css=`
.dash{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,290px);gap:16px;align-items:start}
@media (max-width:1180px) and (min-width:1024px){.dash{grid-template-columns:minmax(0,1fr) minmax(0,250px)}}
@media (max-width:900px){.dash{grid-template-columns:minmax(0,1fr) minmax(0,240px);gap:12px}.dash .card{padding:14px}}
@media (max-width:700px){.dash{grid-template-columns:minmax(0,1fr)}}
.dash .today{border:none;padding:0;background:transparent;grid-template-columns:minmax(0,160px) minmax(0,1fr)}
@media (max-width:900px){.dash .today{grid-template-columns:minmax(0,1fr)}}
.dash aside.card{position:sticky;top:calc(var(--topbar-h) + 16px)}
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
const st=document.createElement('style');st.textContent=css+`
.dash .hero2{grid-column:1/-1;position:relative;overflow:hidden;border-radius:22px;padding:26px 28px;color:#fff;background:radial-gradient(120% 140% at 0% 0%,#24306B 0%,#151A31 55%);border:1px solid rgba(255,255,255,.08);display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;align-items:center;box-shadow:0 18px 40px rgba(21,26,49,.25)}
.dash .h-deco{position:absolute;right:-10px;bottom:-14px;display:flex;align-items:flex-end;gap:10px;opacity:.22;pointer-events:none}
.dash .h-deco i{width:30px;border-radius:8px 8px 0 0}
.dash .h-deco i:nth-child(1){height:70px;background:#2F5BE0}.dash .h-deco i:nth-child(2){height:120px;background:#3C8C2C}.dash .h-deco i:nth-child(3){height:95px;background:#8A4BD6}.dash .h-deco i:nth-child(4){height:150px;background:#C98200}.dash .h-deco i:nth-child(5){height:190px;background:#0E8585}.dash .h-deco i:nth-child(6){height:130px;background:#D0393E}
.dash .h-main{position:relative;display:flex;flex-direction:column;gap:6px;min-width:0}
.dash .h-brand{display:flex;align-items:center;gap:10px;font:600 .75rem var(--f-mono);letter-spacing:.08em;text-transform:uppercase;color:#AEB6E8}
.dash .h-brand img{width:40px;height:40px;border-radius:10px;box-shadow:0 0 0 1px rgba(255,255,255,.15)}
.dash .hero2 h1{font:800 clamp(2rem,5vw,3rem)/1.02 var(--f-display);margin:8px 0 2px;color:#fff;letter-spacing:-.02em}
.dash .h-m1{font:700 1.15rem/1.3 var(--f-display);margin:0;color:#fff;border-left:4px solid var(--st);padding-left:10px}
.dash .h-m2{margin:0;color:#C8CDEA;font-size:.95rem;padding-left:14px}
.dash .h-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.dash .h-chips>span{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:99px;padding:7px 12px;font:600 .88rem var(--f-body)}
.dash .lv{display:inline-block;width:60px;height:6px;border-radius:99px;background:rgba(255,255,255,.2);overflow:hidden}
.dash .lv i{display:block;height:100%;background:#F5A524}
.dash .h-rings{position:relative;display:flex;gap:16px}
.dash .ring{position:relative;width:132px;height:132px}
.dash .ring svg{width:100%;height:100%}
.dash .ring>div{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 18px}
.dash .ring b{font:800 2rem/1 var(--f-display);color:#fff}
.dash .ring span{font-size:.7rem;line-height:1.15;color:#C8CDEA;margin-top:3px}
.dash .m-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.dash .m-head h3{font:800 1.35rem var(--f-display);margin:0}
.dash .m-done{margin:0;padding:12px 14px;border-radius:12px;background:color-mix(in srgb,var(--ok) 15%,transparent);font-weight:600}
.dash .mcards{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,230px),1fr));gap:12px}
.dash .mc{position:relative;border-radius:16px;padding:14px 14px 12px;background:color-mix(in srgb,var(--c) 12%,var(--surface));border:1.5px solid color-mix(in srgb,var(--c) 45%,transparent);display:flex;flex-direction:column;gap:6px;min-width:0}
.dash .mc.is-done{opacity:.6}
.dash .mc.is-done .mc-title{text-decoration:line-through}
.dash .mc-top{display:flex;justify-content:space-between;align-items:center;gap:8px}
.dash .mc-sub{font:700 .72rem var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--c)}
.dash .mc-title{font:700 1.08rem/1.25 var(--f-display);color:var(--ink);text-decoration:none}
.dash .mc-dt{margin:0;font-size:.85rem;color:var(--muted);flex:1}
.dash .mc-act{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:4px}
.dash .mc-open{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:12px;background:var(--c);color:#fff;font:700 .9rem var(--f-body);text-decoration:none}
.dash .mc-done{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface);font:700 .9rem var(--f-body);cursor:pointer}
.dash .mc-done input{position:absolute;opacity:0;width:1px;height:1px}
.dash .mc.is-done .mc-done{background:var(--ok);border-color:var(--ok);color:#fff}
.dash .mc-done:focus-within{outline:2px solid var(--accent);outline-offset:2px}
@media (max-width:760px){.dash .hero2{grid-template-columns:minmax(0,1fr);padding:22px 18px}.dash .h-rings{justify-content:center}.dash .ring{width:118px;height:118px}}
`;document.head.appendChild(st);

const box=document.getElementById('dash');if(!box)return;
let ui={confirm:null};

function compute(){
  const K=P.todayK,days=P.days,first=days[0].k,last=days[days.length-1].k;
  const items=[];days.forEach(x=>x.slots.forEach((s,i)=>{if(s.id)items.push({s,x,i,k:x.k,done:!!P.done[s.uid]})}));
  const over=(P.overflow||[]).filter(s=>!P.done[s.uid]).length;
  const total=items.length+over,n=items.filter(t=>t.done).length;
  const ph={};['r1','r2','f'].forEach(p=>{const a=items.filter(t=>t.s.ph===p);ph[p]={t:a.length,d:a.filter(t=>t.done).length,e:a.filter(t=>t.k<K).length}});
  const overdue=items.filter(t=>t.k<K&&!t.done).sort((a,b)=>a.k<b.k?-1:a.k>b.k?1:a.i-b.i);
  const todayIt=items.filter(t=>t.k===K),todayLeft=todayIt.filter(t=>!t.done).length;
  const ahead=items.filter(t=>t.k>K&&t.done).length;
  const expectedAll=items.filter(t=>t.k<K).length;
  // risk: remaining work vs remaining planned time (from today)
  const capacity=days.filter(x=>x.k>=K).reduce((a,x)=>a+x.base,0);
  const remaining=total-n;
  // recommendation
  let rec=null;if(remaining>capacity&&K<=last){const def=remaining-capacity;const r=(P.HS&&P.HS.rules&&P.HS.rules.slice(-1)[0])||P.DEF_RULE;
    const Dleft=days.filter(x=>x.k>K&&x.base>0).length||1;const perWeek=Math.ceil(def/(Dleft/7));
    rec=perWeek<=7?{def,wd:perWeek}:{def,wd:0,perDay:Math.ceil(def/Dleft)}}
  const ratio=capacity>0?remaining/capacity:(remaining>0?9:0);
  let risk='g';
  if(K>=first){risk=ratio<=1.0001?'g':ratio<=1.1?'a':'r';if(capacity===0&&remaining>0)risk='r'}
  // per subject
  const r2Started=K>days.filter(x=>x.phase==='r1').slice(-1)[0].k;
  const subs=P.ORDER.map(k=>{const late=overdue.filter(t=>t.s.s===k).length;
    const r1left=items.filter(t=>t.s.s===k&&t.s.ph==='r1'&&!t.done).length;
    const resch=items.filter(t=>t.s.s===k&&t.s.moved&&!t.done&&t.k>=K).length;
    const qz=Object.entries(P.quiz||{}).filter(([id])=>id.startsWith(k+'-')).map(([,v])=>v.p);const avg=qz.length?Math.round(qz.reduce((a,b)=>a+b,0)/qz.length):null;
    let lv=late===0?(resch?'a':'g'):late<=2?'a':'r';if(avg!==null&&qz.length>=2){if(avg<35)lv='r';else if(avg<50&&lv==='g')lv='a'}if(r2Started&&r1left>0)lv='r';
    return {k,late,resch,lv,avg,gap:r2Started&&r1left>0}});
  let state='on';
  if(K<first)state='pre';else if(K>last)state='end';else if(overdue.length)state='behind';else if(ahead>0)state='ahead';
  const weak=Object.entries(P.quiz||{}).filter(([,v])=>v.p<60).sort((a,b)=>a[1].p-b[1].p).slice(0,6).map(([id,v])=>{const it=items.find(t=>t.s.id===id);return it?{id,p:v.p,it}:null}).filter(Boolean);
  const allQ=Object.values(P.quiz||{}).map(v=>v.p);const qAvg=allQ.length?Math.round(allQ.reduce((a,b)=>a+b,0)/allQ.length):null;
  let streak=0;{const todayDay=days.find(x=>x.k===K);const req=x=>x.slots.filter(s=>s.id);
    const past=days.filter(x=>x.k<K&&x.k>=first).reverse();
    if(todayDay&&req(todayDay).length&&req(todayDay).every(s=>P.done[s.uid]))streak++;
    for(const x of past){const r=req(x);if(!r.length)continue;if(r.every(s=>P.done[s.uid]))streak++;else break}}
  const xp=n*10+Math.round(Object.values(P.quiz||{}).reduce((a,v)=>a+v.p,0)/10);const lvl=Math.floor(xp/250)+1,lvlP=Math.round(100*(xp%250)/250);
  return {K,first,last,items,total,n,ph,overdue,todayLeft,ahead,expectedAll,capacity,remaining,ratio,risk,subs,state,weak,qAvg,rec,over,streak,xp,lvl,lvlP};
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
  const daysTotal=Math.round((new Date('2027-01-11')-new Date('2026-11-16'))/864e5);const left=Math.max(0,Math.round((new Date('2027-01-11')-new Date(c.K))/864e5));
  const pctAll=c.total?Math.round(100*c.n/c.total):0;
  const ring=(pct,col,big,small)=>{const r=42,C=2*Math.PI*r;return `<div class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${r}" style="fill:none;stroke:rgba(255,255,255,.14);stroke-width:10"/><circle cx="50" cy="50" r="${r}" style="fill:none;stroke:${col};stroke-width:10;stroke-linecap:round;stroke-dasharray:${C*Math.max(0,Math.min(100,pct))/100} ${C};transform:rotate(-90deg);transform-origin:50% 50%"/></svg><div><b class="num">${big}</b><span>${small}</span></div></div>`};
  const days=P.days;let mDay=days.find(x=>x.k===c.K),mLabel=T.mission;if(!mDay&&c.K<c.first){mDay=days[0];mLabel=T.missionFirst(P.fmt(mDay.d))}
  const mItems=mDay?mDay.slots.map((s,i)=>({s,i,x:mDay})):[];
  const mLeft=mItems.filter(t=>!P.done[t.s.uid]).length;
  const href=(s,x)=>`${P.base}session.html?id=${s.id}&d=${x.k}&lang=${P.lang}${s.topics?'&topics='+s.topics:''}`;
  const card=({s,x})=>{const dn=!!P.done[s.uid];const q=P.quiz&&P.quiz[s.uid];const nm=s.s==='mix'?(s.kick?(P.lang==='es'?'Arranque':'Kick-off'):(P.lang==='es'?'Repaso':'Review')):P.S[s.s].es;
    return `<li class="mc${dn?' is-done':''}" style="--c:${P.COL(s.s)}"><div class="mc-top"><span class="mc-sub">${nm} · 1 h</span>${q?`<span class="qb ${P.level(q.p)}">${q.p}%</span>`:''}</div>
      ${s.id?`<a class="mc-title" href="${href(s,x)}">${s.t}</a>`:`<span class="mc-title">${s.t}</span>`}<p class="mc-dt">${s.dt}</p>
      <div class="mc-act">${s.id?`<a class="mc-open" href="${href(s,x)}">${T.open} →</a>`:'<span></span>'}<label class="mc-done"><input type="checkbox" data-id="${s.uid}" aria-label="${T.doneBtn}: ${s.t}" ${dn?'checked':''}><span>${dn?'✓ ':''}${T.doneBtn}</span></label></div></li>`};
  const mission=mDay?(mDay.h?(mLeft===0&&mDay.k===c.K?`<p class="m-done">${T.missionDone}</p>`:'')+`<ul class="mcards">${mItems.map(card).join('')}</ul>`:`<p class="m-done">${T.missionOff}</p>`):`<p class="m-done">${T.end1}</p>`;
  box.innerHTML=`
  <header class="hero2" style="--st:${stColor}">
    <div class="h-deco" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="h-main">
      <div class="h-brand"><img src="${P.base}apple-touch-icon.png" alt=""><span>IGCSE · Mocks 11.01.27</span></div>
      <h1>${T.hi}</h1>
      <p class="h-m1">${m1}</p><p class="h-m2">${m2}</p>
      <div class="h-chips"><span>🔥 ${T.streak(c.streak)}</span><span>⭐ ${c.xp} ${T.xp}</span><span title="${T.toNext(250-(c.xp%250))}">🏅 ${T.level(c.lvl)}<i class="lv"><i style="width:${c.lvlP}%"></i></i></span></div>
    </div>
    <div class="h-rings">${ring(100*(daysTotal-left)/daysTotal,'#F5A524',left,T.daysTo)}${ring(pctAll,'#30A46C',pctAll+'%',T.doneW)}</div>
  </header>
  <div class="card">
    <div class="m-head"><h3>${mLabel}</h3>${mDay&&mDay.h?`<span class="note">${T.sessionsLeft(mDay.h)}</span>`:''}</div>
    ${mission}
    <div class="kpis">
      <div class="kpi ${c.overdue.length?'bad':''}"><b class="num">${c.overdue.length}</b><span>${T.kOver}</span></div>
      <div class="kpi"><b class="num">${c.todayLeft}</b><span>${T.kToday}</span></div>
      <div class="kpi ${c.ahead?'good':''}"><b class="num">${c.ahead}</b><span>${T.kAhead}</span></div>
    </div>
    <div class="prog">${bar(T.r1,c.ph.r1,true)}${bar(T.r2,c.ph.r2,true)}${bar(T.f,c.ph.f,false)}${bar(T.all,all,true)}</div>
    <div class="over"><h4>${T.overTitle}</h4>${c.overdue.length?`<ul class="slots">${ov}</ul>${c.overdue.length>10?`<p class="note">${T.more(c.overdue.length-10)}</p>`:''}`:`<p class="note">${T.overNone}</p>`}</div>
    ${actions}
    <div class="over"><h4>${T.weak}</h4>${c.weak.length?`<ul class="slots">${c.weak.map(w=>P.slotHTML(w.it.x,w.it.s,w.it.i)).join('')}</ul>`:`<p class="note">${c.qAvg===null?T.prepNone:T.weakNone}</p>`}</div>
  </div>
  <aside class="card" aria-label="${T.riskTitle}">
    <h4>${T.riskTitle}</h4>
    <div class="light"><div class="lamps" aria-hidden="true"><i class="r ${c.risk==='r'?'on':''}"></i><i class="a ${c.risk==='a'?'on':''}"></i><i class="g ${c.risk==='g'?'on':''}"></i></div>
      <div><b>${lvl[0]}</b><span>${lvl[1]}</span>${c.K>=c.first&&c.K<=c.last?`<span class="note" style="display:block;margin-top:6px">${T.load(Math.round(100*c.ratio))}</span>`:''}</div></div>
    ${c.qAvg!==null?`<p class="note">${T.prep}: <b>${c.qAvg}%</b></p>`:''}
    ${c.rec&&REC?`<div class="rec"><b>${REC.title}</b><span>${c.rec.wd?REC.short(c.rec.def,c.rec.wd):REC.short2(c.rec.def,c.rec.perDay)}</span>${c.over?`<span>${REC.over(c.over)}</span>`:''}<a href="#ajustes">${REC.btn} →</a></div>`:''}
    <h4>${T.subjTitle}</h4>
    <ul class="subs">${c.subs.map(s=>`<li><i class="dot ${s.lv}"></i><span>${P.S[s.k].es}</span><em>${s.gap?T.sGap:s.late?T.sLate(s.late):s.resch?T.sResch(s.resch):T.sOk}${s.avg!==null?' · '+s.avg+'%':''}</em></li>`).join('')}</ul>
    <p class="note">${T.legend}</p>
  </aside>`;
}
box.addEventListener('click',e=>{const b=e.target.closest('button[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='res'){ui.confirm='res';window.dashRefresh()}
  else if(a==='undo'){ui.confirm='undo';window.dashRefresh()}
  else if(a==='cancel'){ui.confirm=null;window.dashRefresh()}
  else if(a==='res-yes'){const c=compute();const pm=planMoves(c);if(pm)persist(Object.assign({},P.moves||{},pm.mv))}
  else if(a==='undo-yes'){persist({})}
});
window.dashRefresh=function(){render()};
window.dashRefresh();
})();
