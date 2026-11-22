/* Welcome screen for a new student: name, mock date, subjects, study hours -> her own plan, from zero.
   Saves 'igcse-profile-v1' (read by app.js) and wipes any previous progress keys. Opened by auth.js. */
(function(){
const ES=document.documentElement.lang==='es';
const PKEY='igcse-profile-v1';
const HAVE=['math','stats','bio','chem','phys','bus','eng','fr','spa'];
/* Subjects with no content yet: choosing one asks the admin to add it */
const EXTRA=[['hist','Historia','History'],['geo','Geografía','Geography'],['econ','Economía','Economics'],['cs','Computer Science','Computer Science'],
  ['ict','TIC (ICT)','ICT'],['englit','Literatura inglesa','English Literature'],['ger','Alemán','German'],['ita','Italiano','Italian'],['chi','Chino mandarín','Mandarin Chinese'],
  ['fpm','Further Pure Mathematics','Further Pure Mathematics'],['hbio','Human Biology','Human Biology'],['sci','Ciencias (Double Award)','Science (Double Award)'],
  ['acc','Contabilidad (Accounting)','Accounting'],['rs','Religión (Religious Studies)','Religious Studies'],['art','Arte y diseño','Art and Design'],['music','Música','Music'],['pe','Educación física (PE)','Physical Education']];
const name=k=>{const e=EXTRA.find(x=>x[0]===k);if(e)return ES?e[1]:e[2];const s=window.DATA&&DATA.S[k];return s?(ES?s.es:s.en):k};
const L=ES?{
  hi:n=>`¡Hola${n?', '+n:''}! 👋`,intro:'Vamos a preparar <b>tu</b> plan de estudio para los mocks. Son 4 pasos y tardas un minuto. Empiezas desde cero: solo verás tu avance.',
  s1:'¿Cómo quieres que te llame la app?',s2:'¿Qué día empiezan tus mocks?',s2n:'Haremos el plan para llegar a esa fecha con todo repasado.',
  s3:'¿Qué asignaturas haces?',s3n:'Marca todas las que tienes en los mocks.',g1:'Con plan y ejercicios en la app',g2:'Aún sin contenido en la app',g2n:'Si marcas alguna, avisamos para prepararla. Mientras, tu plan incluye las demás.',
  other:'Tengo una asignatura que no está en la lista',otherPh:'¿Cuál? (por ejemplo: Latín)',
  s4:'¿Cuántas horas puedes estudiar?',wk:'Lunes a viernes',sat:'Sábado',sun:'Domingo',hol:'Vacaciones de Navidad',from:'Desde',to:'Hasta',holH:'Horas al día en vacaciones',xmas:'Libres el 25 de diciembre y el 1 de enero',h:'h/día',
  need:'Necesitas',have:'Tienes',fits:m=>`✓ Te da tiempo a todo${m>0?`, y te sobran ${m} h para repasar lo que más te cueste`:''}.`,
  lots:'Te sobra bastante tiempo: si quieres, baja algunas horas. Las horas libres se reparten como repaso.',short:n=>`Te faltan ${n} h para que te dé tiempo a todo.`,fix:'Elige una de estas soluciones:',
  sWd:(a,b)=>`Entre semana ${b} h en vez de ${a}`,sWe:(a,b)=>`Fines de semana ${b} h en vez de ${a}`,sHol:(a,b)=>`Vacaciones ${b} h al día en vez de ${a}`,plus:'y',
  none:'Ni subiendo bastante las horas cabe todo. Puedes quitar alguna asignatura o seguir así.',
  anyway2:'Seguir así: el repaso final será más corto',anyway1:n=>`Seguir así: ${n} temas no cabrán en el plan`,
  next:'Siguiente',back:'Atrás',make:'Crear mi plan',making:'Creando…',pickOne:'Marca al menos una asignatura con plan en la app.',badDate:'Elige una fecha dentro de al menos una semana.',
  redoQ:'¿Rehacer tu plan desde cero?',redoS:'Volverás a elegir fecha, asignaturas y horas. Se borra todo tu avance (sesiones, quizzes y flashcards).',redoY:'Sí, empezar de cero',cancel:'Cancelar',step:(a,b)=>`Paso ${a} de ${b}`
}:{
  hi:n=>`Hi${n?', '+n:''}! 👋`,intro:'Let’s set up <b>your</b> study plan for the mocks. 4 quick steps. You start from zero and only see your own progress.',
  s1:'What should the app call you?',s2:'When do your mocks start?',s2n:'The plan will get you there with everything revised.',
  s3:'Which subjects do you take?',s3n:'Tick every subject in your mocks.',g1:'With a plan and practice in the app',g2:'No content in the app yet',g2n:'If you tick one, we’ll be told to add it. Meanwhile your plan covers the rest.',
  other:'I have a subject that isn’t listed',otherPh:'Which one? (e.g. Latin)',
  s4:'How many hours can you study?',wk:'Monday to Friday',sat:'Saturday',sun:'Sunday',hol:'Christmas holidays',from:'From',to:'To',holH:'Hours a day in the holidays',xmas:'25 December and 1 January off',h:'h/day',
  need:'You need',have:'You have',fits:m=>`✓ You have time for everything${m>0?`, with ${m} h spare to revise what you find hardest`:''}.`,
  lots:'You have plenty of time: lower some hours if you like. Spare hours are spread out as review.',short:n=>`You are ${n} h short of fitting everything.`,fix:'Pick one of these fixes:',
  sWd:(a,b)=>`Weekdays ${b} h instead of ${a}`,sWe:(a,b)=>`Weekends ${b} h instead of ${a}`,sHol:(a,b)=>`Holidays ${b} h a day instead of ${a}`,plus:'and',
  none:'Even with a lot more hours it doesn’t all fit. You can drop a subject or carry on as it is.',
  anyway2:'Carry on: the final review will be shorter',anyway1:n=>`Carry on: ${n} topics won’t fit in the plan`,
  next:'Next',back:'Back',make:'Create my plan',making:'Creating…',pickOne:'Tick at least one subject that has a plan in the app.',badDate:'Pick a date at least a week away.',
  redoQ:'Redo your plan from scratch?',redoS:'You’ll choose the date, subjects and hours again. All your progress (sessions, quizzes and flashcards) is deleted.',redoY:'Yes, start over',cancel:'Cancel',step:(a,b)=>`Step ${a} of ${b}`
};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const todayK=(()=>{let q=null;try{q=new URLSearchParams(location.search).get('today')}catch(e){}if(q&&/^\d{4}-\d\d-\d\d$/.test(q))return q;const n=new Date();return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`})();
const addK=(k,n)=>{const d=new Date(k+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};

const CSS=`.ob{position:fixed;inset:0;z-index:200;background:var(--bg);overflow:auto;-webkit-overflow-scrolling:touch}
.ob-in{max-width:560px;margin:0 auto;padding:28px 16px 40px}
.ob h2{font:700 1.6rem/1.2 var(--f-display);margin:0 0 8px;color:var(--ink)}
.ob h3{font:700 1.15rem/1.3 var(--f-display);margin:0 0 4px;color:var(--ink)}
.ob p{color:var(--ink);margin:0 0 12px;line-height:1.45}.ob .n{color:var(--muted);font-size:.9rem}
.ob .stepn{font:600 .78rem var(--f-mono);color:var(--muted);letter-spacing:.04em;margin:18px 0 6px}
.ob .card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px;margin:10px 0}
.ob input[type=text],.ob input[type=date]{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink)}
.ob .grp{font:600 .8rem var(--f-body);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin:14px 0 6px}
.ob .subs{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ob .sub{display:flex;align-items:center;gap:8px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--bg);cursor:pointer;font-size:.92rem;color:var(--ink);min-width:0}
.ob .sub input{width:20px;height:20px;flex:none;accent-color:var(--accent)}.ob .sub span{min-width:0;overflow-wrap:anywhere}
.ob .sub:has(input:checked){border-color:var(--accent);background:var(--accent-soft)}
.ob .lnk{background:none;border:0;padding:8px 0;color:var(--accent);font:600 .95rem var(--f-body);cursor:pointer;text-align:left}
.ob .row{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--line)}.ob .row:last-child{border:0}
.ob .row>span{color:var(--ink);min-width:0}.ob .stp{display:flex;align-items:center;gap:8px;flex:none}
.ob .stp button{width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--ink);font-size:1.2rem;cursor:pointer}
.ob .stp b{min-width:48px;text-align:center;font:600 1rem var(--f-mono);color:var(--ink)}
.ob .two{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}.ob .two label{font-size:.85rem;color:var(--muted);min-width:0}.ob .two input{min-width:0;padding:10px 8px}
.ob .chk{display:flex;gap:8px;align-items:center;margin-top:8px;color:var(--ink);font-size:.92rem}
.ob .fit{border-radius:14px;padding:14px;margin:12px 0;border:1px solid var(--line)}.ob .fit.ok{background:color-mix(in srgb,var(--ok) 14%,var(--surface))}.ob .fit.bad{background:color-mix(in srgb,var(--warn) 16%,var(--surface))}
.ob .kv{display:flex;gap:18px;font:600 .95rem var(--f-mono);color:var(--ink);margin-bottom:6px}
.ob .sug{display:block;width:100%;text-align:left;margin:6px 0;padding:11px 12px;border-radius:10px;border:1px solid var(--accent);background:var(--surface);color:var(--ink);font:500 .93rem var(--f-body);cursor:pointer}
.ob .sug small{color:var(--muted)}.ob .sug.ghost{border-color:var(--line);color:var(--muted)}
.ob .nav{display:flex;gap:10px;margin-top:18px}.ob .nav button{flex:1;padding:14px;border-radius:12px;font:700 1rem var(--f-body);cursor:pointer;border:1px solid var(--line);background:var(--surface);color:var(--ink)}
.ob .nav .pri{background:var(--accent);border-color:var(--accent);color:#fff}.ob .nav .pri:disabled{opacity:.6}
.ob .err{color:#c0392b;font-size:.9rem;min-height:1.2em;margin:8px 0 0}
html.ob-open{overflow:hidden}`;

let st=null;
function open(opts){
  opts=opts||{};
  if(!document.getElementById('obCss')){const c=document.createElement('style');c.id='obCss';c.textContent=CSS;document.head.appendChild(c)}
  const old=(()=>{try{return JSON.parse(localStorage.getItem(PKEY)||'null')}catch(e){return null}})();
  const r0=old&&old.rule||{wd:[2,2,2,2,2,4,4],hol:4,holFrom:'2026-12-22',holTo:'2027-01-10',xmasOff:true,half:true};
  st={step:1,name:(old&&old.name)||opts.name||'',exam:(old&&old.exam)||'2027-01-11',subj:old?[...old.subj,...(old.req||[])]:[],other:(old&&old.other)||'',showOther:!!(old&&old.other),
    wdv:r0.wd[0],sat:r0.wd[5],sun:r0.wd[6],hol:r0.hol,holFrom:r0.holFrom,holTo:r0.holTo,xmasOff:r0.xmasOff!==false};
  const el=document.createElement('div');el.className='ob';el.id='ob';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
  document.body.appendChild(el);document.documentElement.classList.add('ob-open');
  el.addEventListener('click',onClick);el.addEventListener('input',onInput);el.addEventListener('change',onInput);
  render();
}
const rule=()=>({wd:[st.wdv,st.wdv,st.wdv,st.wdv,st.wdv,st.sat,st.sun],hol:st.hol,holFrom:st.holFrom,holTo:st.holTo,xmasOff:st.xmasOff,half:true});
const content=()=>st.subj.filter(k=>HAVE.includes(k));
const prof=r=>({start:todayK,exam:st.exam,rule:r||rule()});
function fit(r){return window.IGLayout?IGLayout(prof(r),content()):null}
function fixes(){
  const base=rule(),out=[];const lim={wd:6,we:8,hol:8};
  const mk=(dw,de,dh)=>{const r=JSON.parse(JSON.stringify(base));r.wd=r.wd.map((v,i)=>i<5?v+dw:v+de);r.hol+=dh;return r};
  const ok=r=>{const f=fit(r);return f&&f.fits};
  const one=(kind)=>{for(let k=1;k<=4;k++){const r=kind==='wd'?mk(k,0,0):kind==='we'?mk(0,k,0):mk(0,0,k);
    if((kind==='wd'&&st.wdv+k>lim.wd)||(kind==='we'&&Math.max(st.sat,st.sun)+k>lim.we)||(kind==='hol'&&st.hol+k>lim.hol))return null;if(ok(r))return {k,kind,r}}return null};
  ['wd','we','hol'].forEach(x=>{const f=one(x);if(f)out.push(f)});
  if(out.length<2){let best=null;
    for(let a=0;a<=3;a++)for(let b=0;b<=4;b++)for(let c=0;c<=4;c++){if(a+b+c===0||st.wdv+a>lim.wd||Math.max(st.sat,st.sun)+b>lim.we||st.hol+c>lim.hol)continue;
      const cost=a*5+b*2+c*3;if(best&&cost>=best.cost)continue;const r=mk(a,b,c);if(ok(r))best={cost,a,b,c,r}}
    if(best&&!out.some(o=>JSON.stringify(o.r)===JSON.stringify(best.r)))out.push({kind:'mix',a:best.a,b:best.b,c:best.c,r:best.r})}
  return out.slice(0,3);
}
const fixLabel=f=>{const we=(a,b)=>st.sat===st.sun?L.sWe(st.sat,st.sat+b):L.sWe(`${st.sat}/${st.sun}`,`${st.sat+b}/${st.sun+b}`);const parts=[];
  const a=f.kind==='wd'?f.k:f.a||0,b=f.kind==='we'?f.k:f.b||0,c=f.kind==='hol'?f.k:f.c||0;
  if(a)parts.push(L.sWd(st.wdv,st.wdv+a));if(b)parts.push(we(0,b));if(c)parts.push(L.sHol(st.hol,st.hol+c));
  const g=fit(f.r);return `${parts.join(` ${L.plus} `)}<br><small>${L.have} ${g.c1+g.c2} h · ${L.need} ${g.need} h</small>`};
let fixList=[];
function fitHTML(){
  const f=fit();if(!f)return '';
  if(f.fits)return `<div class="fit ok"><div class="kv"><span>${L.need} ${f.need} h</span><span>${L.have} ${f.c1+f.c2} h</span></div><p style="margin:0">${L.fits(f.c1+f.c2-f.need)}</p>${f.c1+f.c2-f.need>=Math.max(20,f.need*.4)?`<p class="n" style="margin:6px 0 0">${L.lots}</p>`:''}</div>`;
  fixList=fixes();
  return `<div class="fit bad"><div class="kv"><span>${L.need} ${f.need} h</span><span>${L.have} ${f.c1+f.c2} h</span></div><p>${L.short(f.short)}</p>
    ${fixList.length?`<p class="n" style="margin:0 0 4px">${L.fix}</p>${fixList.map((x,i)=>`<button type="button" class="sug" data-fix="${i}">${fixLabel(x)}</button>`).join('')}`:`<p class="n">${L.none}</p>`}
    <button type="button" class="sug ghost" data-a="make">${f.r1short?L.anyway1(f.r1short):L.anyway2}</button></div>`;
}
const stepper=(id,v,lbl,min,max)=>`<div class="row"><span>${lbl}</span><div class="stp"><button type="button" data-st="${id}" data-d="-1" aria-label="−" ${v<=min?'disabled':''}>−</button><b>${v} h</b><button type="button" data-st="${id}" data-d="1" aria-label="+" ${v>=max?'disabled':''}>+</button></div></div>`;
function render(keepScroll){
  const el=document.getElementById('ob');if(!el)return;const y=el.scrollTop;const N=4;let body='';
  if(st.step===1)body=`<h2>${L.hi(esc(st.name))}</h2><p>${L.intro}</p><p class="stepn">${L.step(1,N)}</p><div class="card"><h3>${L.s1}</h3><input type="text" id="obName" value="${esc(st.name)}" autocomplete="off" maxlength="40"></div>`;
  if(st.step===2)body=`<p class="stepn">${L.step(2,N)}</p><div class="card"><h3>${L.s2}</h3><p class="n">${L.s2n}</p><input type="date" id="obExam" value="${st.exam}" min="${addK(todayK,7)}" max="2028-12-31"></div>`;
  if(st.step===3){const box=(k,lbl)=>`<label class="sub"><input type="checkbox" data-sub="${k}" ${st.subj.includes(k)?'checked':''}><span>${esc(lbl)}</span></label>`;
    body=`<p class="stepn">${L.step(3,N)}</p><div class="card"><h3>${L.s3}</h3><p class="n">${L.s3n}</p>
    <div class="grp">${L.g1}</div><div class="subs">${HAVE.map(k=>box(k,name(k))).join('')}</div>
    <div class="grp">${L.g2}</div><p class="n">${L.g2n}</p><div class="subs">${EXTRA.map(([k])=>box(k,name(k))).join('')}</div>
    ${st.showOther?`<p style="margin:12px 0 4px">${L.other}</p><input type="text" id="obOther" value="${esc(st.other)}" placeholder="${L.otherPh}" maxlength="80">`:`<button type="button" class="lnk" data-a="other">+ ${L.other}</button>`}</div>`}
  if(st.step===4)body=`<p class="stepn">${L.step(4,N)}</p><div class="card"><h3>${L.s4}</h3>
    ${stepper('wdv',st.wdv,L.wk,0,6)}${stepper('sat',st.sat,L.sat,0,8)}${stepper('sun',st.sun,L.sun,0,8)}</div>
    <div class="card"><h3>${L.hol}</h3><div class="two"><label>${L.from}<input type="date" id="obHF" value="${st.holFrom}"></label><label>${L.to}<input type="date" id="obHT" value="${st.holTo}"></label></div>
    ${stepper('hol',st.hol,L.holH,0,8)}<label class="chk"><input type="checkbox" id="obX" ${st.xmasOff?'checked':''}> ${L.xmas}</label></div><div id="obFit">${fitHTML()}</div>`;
  const nav=`<p class="err" id="obErr" role="alert"></p><div class="nav">${st.step>1?`<button type="button" data-a="back">${L.back}</button>`:''}<button type="button" class="pri" data-a="${st.step<N?'next':'make'}">${st.step<N?L.next:L.make}</button></div>`;
  el.innerHTML=`<div class="ob-in">${body}${nav}</div>`;
  el.scrollTop=keepScroll?y:0;
}
function onInput(e){const t=e.target;
  if(t.id==='obName')st.name=t.value;else if(t.id==='obExam')st.exam=t.value;else if(t.id==='obOther')st.other=t.value;
  else if(t.dataset.sub){const k=t.dataset.sub;st.subj=st.subj.filter(x=>x!==k);if(t.checked)st.subj.push(k)}
  else if(t.id==='obHF'||t.id==='obHT'||t.id==='obX'){if(t.id==='obHF')st.holFrom=t.value;if(t.id==='obHT')st.holTo=t.value;if(t.id==='obX')st.xmasOff=t.checked;
    if(e.type==='change'){const f=document.getElementById('obFit');if(f)f.innerHTML=fitHTML()}}}
function err(m){const e=document.getElementById('obErr');if(e)e.textContent=m}
function onClick(e){const b=e.target.closest('button');if(!b)return;
  if(b.dataset.st){const id=b.dataset.st,max={wdv:6,sat:8,sun:8,hol:8}[id];st[id]=Math.max(0,Math.min(max,st[id]+(+b.dataset.d)));render(true);return}
  if(b.dataset.fix){const f=fixList[+b.dataset.fix];if(!f)return;st.wdv=f.r.wd[0];st.sat=f.r.wd[5];st.sun=f.r.wd[6];st.hol=f.r.hol;render(true);return}
  const a=b.dataset.a;
  if(a==='other'){st.showOther=true;render(true);setTimeout(()=>{const i=document.getElementById('obOther');if(i)i.focus()},30);return}
  if(a==='back'){st.step--;render();return}
  if(a==='next'){
    if(st.step===2&&(!/^\d{4}-\d\d-\d\d$/.test(st.exam)||st.exam<addK(todayK,7))){err(L.badDate);return}
    if(st.step===3&&!content().length){err(L.pickOne);return}
    st.step++;render();return}
  if(a==='make'){if(!content().length){st.step=3;render();return}finish(b)}
}
async function finish(b){
  b.disabled=true;b.textContent=L.making;
  const p={v:1,name:st.name.trim(),start:todayK,exam:st.exam,subj:content(),req:st.subj.filter(k=>!HAVE.includes(k)),other:st.other.trim(),rule:rule(),created:new Date().toISOString()};
  const set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
  set(PKEY,p);set('igcse-hours-v1',p.name?{name:p.name}:{});['igcse-plan-v1','igcse-moves-v1','igcse-quiz-v1','igcse-cards-v1'].forEach(k=>set(k,{}));
  try{if(window.IGSync&&IGSync.flush)await IGSync.flush();else if(window.IGSync)IGSync.push()}catch(e){}
  location.hash='hoy';location.reload();
}
function redo(){
  const m=document.createElement('div');m.className='acm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
  m.innerHTML=`<div class="acm-box"><b class="acm-t">${L.redoQ}</b><p>${L.redoS}</p><div class="acm-row"><button type="button" class="sec" data-x>${L.cancel}</button><button type="button" class="pri" data-y>${L.redoY}</button></div></div>`;
  document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target.closest('[data-x]')||e.target===m)m.remove();else if(e.target.closest('[data-y]')){m.remove();open()}});
}
window.IGOnboard={open,redo,name,EXTRA,HAVE};
})();
