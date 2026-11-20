/* Practice per topic: flashcards, fill-in-the-gap and short answers. Progress lives in localStorage 'igcse-cards-v1' and syncs with the account. */
(function(){
const KEY='igcse-cards-v1';
const ES=/\/es\//.test(location.pathname)||new URLSearchParams(location.search).get('lang')==='es';
const BASE=/\/es\//.test(location.pathname)?'../':'';
const L=ES?{
  title:'Practicar',close:'Cerrar',back:'← Practicar',cards:'Flashcards',gaps:'Rellenar huecos',short:'Respuesta corta',
  cardsD:(k,n)=>`${k} de ${n} dominadas`,gapsD:(b,n)=>b==null?`${n} frases`:`Mejor: ${b} de ${n}`,shortD:(b,n)=>b==null?`${n} preguntas`:`Mejor: ${b}%`,
  tap:'Toca la tarjeta para darle la vuelta',again:'Otra vez',know:'Lo sé',left:n=>`${n} por repasar`,
  cardsEnd:'¡Mazo completado!',cardsEndD:(k,n)=>`Dominas ${k} de ${n} tarjetas. Las que fallaste saldrán primero la próxima vez.`,
  restart:'Repetir',reset:'Empezar de cero',menu:'Volver al menú',
  type:'Escribe la palabra que falta',check:'Comprobar',ok:'¡Correcto!',bad:'No exactamente. Respuesta:',next:'Siguiente →',
  gapsEnd:(s,n)=>`${s} de ${n} correctas`,
  write:'Piensa (o escribe) tu respuesta y luego mira la respuesta modelo.',notes:'Tu respuesta (opcional)',show:'Ver respuesta',model:'Respuesta modelo',marks:'Puntos que dan nota',
  self:'¿Cómo te ha salido?',good:'Bien',half:'A medias',badS:'Mal',shortEnd:p=>`Resultado: ${p}%`,
  none:'Este tema todavía no tiene práctica.',load:'Cargando…'
}:{
  title:'Practice',close:'Close',back:'← Practice',cards:'Flashcards',gaps:'Fill the gap',short:'Short answer',
  cardsD:(k,n)=>`${k} of ${n} mastered`,gapsD:(b,n)=>b==null?`${n} sentences`:`Best: ${b} of ${n}`,shortD:(b,n)=>b==null?`${n} questions`:`Best: ${b}%`,
  tap:'Tap the card to flip it',again:'Again',know:'I know it',left:n=>`${n} to review`,
  cardsEnd:'Deck complete!',cardsEndD:(k,n)=>`You know ${k} of ${n} cards. The ones you missed come first next time.`,
  restart:'Again',reset:'Start from zero',menu:'Back to menu',
  type:'Type the missing word',check:'Check',ok:'Correct!',bad:'Not quite. Answer:',next:'Next →',
  gapsEnd:(s,n)=>`${s} of ${n} correct`,
  write:'Think of (or type) your answer, then look at the model answer.',notes:'Your answer (optional)',show:'Show answer',model:'Model answer',marks:'Mark points',
  self:'How did it go?',good:'Got it',half:'Partly',badS:'Missed it',shortEnd:p=>`Score: ${p}%`,
  none:'This topic has no practice yet.',load:'Loading…'};

const css=`
.pr-ov{position:fixed;inset:0;z-index:80;background:rgba(10,13,28,.55);display:flex;align-items:flex-end;justify-content:center}
@media (min-width:700px){.pr-ov{align-items:center}}
.pr-box{background:var(--surface,#fff);color:var(--ink,#151A31);width:min(100%,560px);max-height:92vh;max-height:92dvh;overflow:auto;border-radius:20px 20px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:14px;box-shadow:0 -10px 40px rgba(0,0,0,.25)}
@media (min-width:700px){.pr-box{border-radius:20px}}
.pr-top{display:flex;justify-content:space-between;align-items:center;gap:10px;font:600 .8rem var(--f-mono,monospace);color:var(--muted,#5A6180);text-transform:uppercase;letter-spacing:.05em}
.pr-top button{all:unset;cursor:pointer;font:600 .9rem var(--f-body,system-ui);color:var(--accent,#2A47C9);padding:6px 4px;text-transform:none;letter-spacing:0}
.pr-h{font:800 1.3rem/1.2 var(--f-display,system-ui);margin:0}
.pr-modes{display:flex;flex-direction:column;gap:10px}
.pr-mode{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px;border:1px solid var(--line,#DCE0EC);border-radius:14px;background:var(--bg,#F5F6FA)}
.pr-mode:hover{border-color:var(--accent,#2A47C9)}
.pr-mode .ic{font-size:1.6rem;text-align:center}.pr-mode b{display:block;font:700 1rem var(--f-body,system-ui)}.pr-mode small{color:var(--muted,#5A6180);font-size:.82rem}
.pr-bar{height:6px;border-radius:9px;background:var(--line,#DCE0EC);overflow:hidden}.pr-bar i{display:block;height:100%;background:var(--ok,#1F8A4C);border-radius:9px}
.pr-card{perspective:1200px;min-height:230px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.pr-in{position:relative;width:100%;min-height:230px;transition:transform .45s;transform-style:preserve-3d}
.pr-card.flip .pr-in{transform:rotateY(180deg)}
.pr-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:16px;padding:22px;display:flex;align-items:center;justify-content:center;text-align:center;font:600 1.15rem/1.4 var(--f-body,system-ui);border:2px solid var(--line,#DCE0EC);background:var(--bg,#F5F6FA);overflow:auto}
.pr-face.b{transform:rotateY(180deg);background:var(--accent-soft,#E7EBFC);border-color:var(--accent,#2A47C9);font-weight:500}
@media (prefers-reduced-motion:reduce){.pr-in{transition:none}}
.pr-hint{text-align:center;color:var(--muted,#5A6180);font-size:.82rem;margin:0}
.pr-row{display:flex;gap:10px;flex-wrap:wrap}.pr-box .pr-row>*{flex:1 1 0;min-width:0}
.pr-b{all:unset;box-sizing:border-box;cursor:pointer;text-align:center;padding:13px 14px;border-radius:12px;font:700 .95rem var(--f-body,system-ui);background:var(--ink,#151A31);color:var(--surface,#fff);min-height:48px}
.pr-b.g{background:transparent;color:var(--ink,#151A31);border:1px solid var(--line,#DCE0EC)}
.pr-b.ok{background:#1F8A4C;color:#fff}.pr-b.no{background:#D0393E;color:#fff}.pr-b.mid{background:#C98200;color:#fff}
.pr-b:disabled{opacity:.45;cursor:default}
.pr-q{font:600 1.08rem/1.5 var(--f-body,system-ui);margin:0}
.pr-q u{text-decoration:none;display:inline-block;min-width:70px;border-bottom:2px solid var(--accent,#2A47C9);color:var(--accent,#2A47C9)}
.pr-inp{font:inherit;font-size:16px;padding:12px 14px;border-radius:12px;border:2px solid var(--line,#DCE0EC);background:var(--bg,#F5F6FA);color:var(--ink,#151A31);width:100%;box-sizing:border-box}
.pr-inp:focus{outline:none;border-color:var(--accent,#2A47C9)}
textarea.pr-inp{min-height:84px;resize:vertical}
.pr-fb{padding:12px 14px;border-radius:12px;font-size:.95rem}.pr-fb.ok{background:rgba(31,138,76,.12);color:#1F8A4C}.pr-fb.no{background:rgba(208,57,62,.12);color:#D0393E}
.pr-fb b{color:var(--ink,#151A31)}
.pr-model{background:var(--accent-soft,#E7EBFC);border-radius:12px;padding:12px 14px;font-size:.95rem}.pr-model ul{margin:6px 0 0;padding-left:1.2em}
.pr-end{text-align:center;display:flex;flex-direction:column;gap:6px;padding:10px 0}.pr-end .big{font:800 2.6rem var(--f-display,system-ui)}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’'`]/g,"'").replace(/[.,;:!?¡¿"]+$/,'').replace(/\s+/g,' ').trim();
const ro=()=>!!window.IGVIEW;
function all(){if(window.IGVIEW)return window.IGVIEW[KEY]||{};try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
function save(id,rec){if(ro())return;const a=all();a[id]=rec;try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}
  if(window.IGSync)IGSync.push();else try{localStorage.setItem('igcse-dirty','1')}catch(e){}}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

let ov=null,box=null,S=null;
function shell(){if(ov)return;ov=document.createElement('div');ov.className='pr-ov';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');
  ov.innerHTML='<div class="pr-box"></div>';document.body.appendChild(ov);box=ov.firstChild;
  ov.addEventListener('click',e=>{if(e.target===ov)close()});
  document.addEventListener('keydown',e=>{if(ov.hidden)return;if(e.key==='Escape')close();
    if(S&&S.mode==='cards'&&!e.target.closest('input,textarea')){if(e.key===' '){e.preventDefault();flip()}}});
  box.addEventListener('click',onClick);
  box.addEventListener('submit',e=>{e.preventDefault();if(S&&S.mode==='gaps')checkGap()});
}
function close(){if(!ov)return;ov.hidden=true;box.innerHTML='';S=null;document.documentElement.style.overflow='';if(window.IGPracticeClosed)window.IGPracticeClosed()}
function top(label,backTo){return `<div class="pr-top"><span>${backTo?`<button type="button" data-p="menu">${L.back}</button>`:'🃏 '+L.title}</span><span>${esc(label||'')}</span><button type="button" data-p="close" aria-label="${L.close}">✕</button></div>`}

function open(id,title){shell();if(!title){const h=document.querySelector('article h1');title=h?h.textContent:''}S={id,title:(title||'').replace(/\s*→.*$/,''),mode:'menu',data:null};ov.hidden=false;document.documentElement.style.overflow='hidden';
  box.innerHTML=top()+`<p>${L.load}</p>`;
  fetch(`${BASE}content/practice/${id}.json`).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>{if(!S||S.id!==id)return;S.data=d;menu()})
    .catch(()=>{if(S&&S.id===id)box.innerHTML=top()+`<p>${L.none}</p>`});
}
function rec(){const r=all()[S.id]||{};r.c=r.c||{};return r}
function menu(){S.mode='menu';const d=S.data,r=rec();const nC=d.cards.length,k=d.cards.filter((c,i)=>(r.c[i]||0)>=1).length;
  box.innerHTML=top()+`<h2 class="pr-h">${esc(S.title)}</h2><div class="pr-modes">
   <button type="button" class="pr-mode" data-p="cards"><span class="ic">🃏</span><span><b>${L.cards}</b><small>${L.cardsD(k,nC)}</small><div class="pr-bar"><i style="width:${100*k/nC}%"></i></div></span><span>›</span></button>
   <button type="button" class="pr-mode" data-p="gaps"><span class="ic">✍️</span><span><b>${L.gaps}</b><small>${L.gapsD(r.g,d.gaps.length)}</small></span><span>›</span></button>
   <button type="button" class="pr-mode" data-p="short"><span class="ic">💬</span><span><b>${L.short}</b><small>${L.shortD(r.s,d.short.length)}</small></span><span>›</span></button></div>`;
  const b=box.querySelector('.pr-mode');if(b)b.focus();
}
/* --- Flashcards: unknown cards first; 'Again' puts the card back a few places later --- */
function startCards(){const r=rec();const idx=S.data.cards.map((c,i)=>i);
  const unk=shuffle(idx.filter(i=>!(r.c[i]>=1))),kn=shuffle(idx.filter(i=>r.c[i]>=1));
  S.mode='cards';S.q=unk.concat(kn);S.flipped=false;S.n=S.q.length;renderCard()}
function renderCard(){if(!S.q.length)return cardsEnd();const i=S.q[0],c=S.data.cards[i];
  box.innerHTML=top(L.left(S.q.length),true)+`<div class="pr-card${S.flipped?' flip':''}" data-p="flip" role="button" tabindex="0" aria-label="${L.tap}"><div class="pr-in"><div class="pr-face f">${esc(c.f)}</div><div class="pr-face b">${esc(c.b)}</div></div></div>
  <p class="pr-hint">${L.tap}</p><div class="pr-row"><button type="button" class="pr-b no" data-p="again" ${S.flipped?'':'disabled'}>${L.again}</button><button type="button" class="pr-b ok" data-p="know" ${S.flipped?'':'disabled'}>${L.know}</button></div>`;
  fitCard()}
function fitCard(){const c=box.querySelector('.pr-card');if(!c)return;const h=Math.max(...[...c.querySelectorAll('.pr-face')].map(f=>f.scrollHeight),230);c.querySelector('.pr-in').style.minHeight=h+'px';c.style.minHeight=h+'px'}
function flip(){if(S.mode!=='cards')return;S.flipped=!S.flipped;const c=box.querySelector('.pr-card');c.classList.toggle('flip',S.flipped);box.querySelectorAll('[data-p=again],[data-p=know]').forEach(b=>b.disabled=!S.flipped)}
function grade(known){const i=S.q.shift(),r=rec();
  if(known){r.c[i]=Math.min(3,(r.c[i]||0)+1)}else{r.c[i]=0;S.q.splice(Math.min(3,S.q.length),0,i)}
  save(S.id,r);S.flipped=false;renderCard()}
function cardsEnd(){const r=rec(),n=S.data.cards.length,k=S.data.cards.filter((c,i)=>(r.c[i]||0)>=1).length;
  box.innerHTML=top('',true)+`<div class="pr-end"><span class="big">🎉</span><b>${L.cardsEnd}</b><span>${L.cardsEndD(k,n)}</span></div><div class="pr-row"><button type="button" class="pr-b" data-p="cards">${L.restart}</button><button type="button" class="pr-b g" data-p="menu">${L.menu}</button></div><div class="pr-row"><button type="button" class="pr-b g" data-p="reset">${L.reset}</button></div>`}
/* --- Fill the gap --- */
function startGaps(){S.mode='gaps';S.q=shuffle(S.data.gaps);S.i=0;S.score=0;S.done=false;renderGap()}
function renderGap(){if(S.i>=S.q.length)return gapsEnd();const g=S.q[S.i];const parts=esc(g.s).split('___');
  box.innerHTML=top(`${S.i+1} / ${S.q.length}`,true)+`<p class="pr-q">${parts[0]}<u>&nbsp;?&nbsp;</u>${parts[1]||''}</p>
  <form><input class="pr-inp" id="prIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${L.type}" aria-label="${L.type}"></form><div id="prFb"></div>
  <div class="pr-row"><button type="button" class="pr-b" data-p="check" id="prGo">${L.check}</button></div>`;
  setTimeout(()=>{const i=document.getElementById('prIn');if(i)i.focus()},50)}
function checkGap(){if(S.done){S.i++;S.done=false;return renderGap()}
  const inp=document.getElementById('prIn'),v=norm(inp.value);if(!v)return;const g=S.q[S.i];const ok=g.a.some(a=>norm(a)===v);
  if(ok)S.score++;S.done=true;inp.readOnly=true;inp.style.borderColor=ok?'#1F8A4C':'#D0393E';
  document.getElementById('prFb').innerHTML=ok?`<div class="pr-fb ok">✓ ${L.ok}</div>`:`<div class="pr-fb no">✗ ${L.bad} <b>${esc(g.a[0])}</b></div>`;
  const b=document.getElementById('prGo');b.textContent=L.next;b.focus()}
function gapsEnd(){const r=rec(),n=S.q.length;r.g=Math.max(r.g||0,S.score);save(S.id,r);
  box.innerHTML=top('',true)+`<div class="pr-end"><span class="big num">${S.score}/${n}</span><b>${L.gapsEnd(S.score,n)}</b></div><div class="pr-row"><button type="button" class="pr-b" data-p="gaps">${L.restart}</button><button type="button" class="pr-b g" data-p="menu">${L.menu}</button></div>`}
/* --- Short answer (self-marked) --- */
function startShort(){S.mode='short';S.q=S.data.short.slice();S.i=0;S.score=0;renderShort()}
function renderShort(){if(S.i>=S.q.length)return shortEnd();const q=S.q[S.i];
  box.innerHTML=top(`${S.i+1} / ${S.q.length}`,true)+`<p class="pr-q">${esc(q.q)}</p><p class="pr-hint" style="text-align:left">${L.write}</p>
  <textarea class="pr-inp" aria-label="${L.notes}" placeholder="${L.notes}"></textarea>
  <div id="prM" hidden><div class="pr-model"><b>${L.model}:</b> ${esc(q.model)}<ul>${q.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div><p class="pr-hint" style="margin:12px 0 8px">${L.self}</p>
  <div class="pr-row"><button type="button" class="pr-b no" data-p="s0">${L.badS}</button><button type="button" class="pr-b mid" data-p="s1">${L.half}</button><button type="button" class="pr-b ok" data-p="s2">${L.good}</button></div></div>
  <div class="pr-row" id="prShow"><button type="button" class="pr-b" data-p="show">${L.show}</button></div>`}
function shortEnd(){const r=rec(),n=S.q.length,p=Math.round(100*S.score/(2*n));r.s=Math.max(r.s||0,p);save(S.id,r);
  box.innerHTML=top('',true)+`<div class="pr-end"><span class="big num">${p}%</span><b>${L.shortEnd(p)}</b></div><div class="pr-row"><button type="button" class="pr-b" data-p="short">${L.restart}</button><button type="button" class="pr-b g" data-p="menu">${L.menu}</button></div>`}

function onClick(e){const b=e.target.closest('[data-p]');if(!b||!S)return;const a=b.dataset.p;
  if(a==='close')return close();if(a==='menu')return menu();
  if(a==='cards')return startCards();if(a==='gaps')return startGaps();if(a==='short')return startShort();
  if(a==='flip')return flip();if(a==='again'||a==='know')return grade(a==='know');
  if(a==='reset'){const r=rec();r.c={};save(S.id,r);return startCards()}
  if(a==='check')return checkGap();
  if(a==='show'){document.getElementById('prM').hidden=false;document.getElementById('prShow').hidden=true;return}
  if(/^s[012]$/.test(a)){S.score+=+a[1];S.i++;return renderShort()}
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&S&&S.mode==='cards'&&e.target.classList&&e.target.classList.contains('pr-card'))flip()});
/* Any element with data-practice="<topic id>" opens the practice for that topic. */
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-practice]');if(!t)return;e.preventDefault();e.stopPropagation();open(t.dataset.practice,t.dataset.title||'')},true);
window.IGPractice={open,label:L.title};
})();
