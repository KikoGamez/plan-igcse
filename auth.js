/* Accounts + progress sync (Supabase). Loaded before app.js.
   localStorage stays the working copy; the server keeps one JSON blob per user. */
(function(){
const CFG={url:'https://pijoiswrklwrkdzltnoy.supabase.co',key:'sb_publishable_ecb7RwDjk3OZKOUiTsE7dw_fhpnwxqd'};
const SITE='https://kikogamez.github.io/plan-igcse/';
const ADMIN='kiko.gamez@gmail.com';
const KEYS=['igcse-plan-v1','igcse-moves-v1','igcse-quiz-v1','igcse-hours-v1','igcse-cards-v1'];
const OWNER='igcse-owner',TS='igcse-sync-ts',DIRTY='igcse-dirty';
const ES=document.documentElement.lang==='es';
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
window.IGSync={push(){},ready:false};
if(!CFG.url||!CFG.key||!window.supabase)return;

const L=ES?{
  hi:'Entra en tu plan',sub:'Usa el usuario y la contraseña que te han enviado.',user:'Email',pass:'Contraseña',enter:'Entrar',wait:'Entrando…',
  bad:'Email o contraseña incorrectos.',net:'No hay conexión. Prueba otra vez.',lang:'English',
  acct:'Tu cuenta',as:n=>`Has entrado como <b>${n}</b>`,inv:'Crear usuario nuevo',adm:'Alumnas (administrador)',admS:'Avance de cada cuenta.',admNone:'Aún no hay nadie con avance guardado. Las cuentas aparecen aquí cuando entran por primera vez.',ses:(a,b)=>`${a} de ${b} sesiones`,open:'Ver detalle →',viewing:n=>`Viendo a <b>${n}</b>`,ro:'solo lectura',act:'su última actividad',chk:'comprobado',exit:'Salir',ago:s=>s<5?'ahora':`hace ${s} s`,last:'Última actividad',never:'sin actividad',quizN:n=>`${n} quizzes hechos`,pw:'Cambiar contraseña',out:'Cerrar sesión',
  invH:'Crear usuario nuevo',invS:'Se crea la cuenta y te damos el mensaje con su usuario y contraseña para mandárselo.',name:'Nombre',mail:'Su email',newpw:'Contraseña',
  create:'Crear cuenta',creating:'Creando…',cancel:'Cancelar',close:'Cerrar',exists:'Ese email ya tiene cuenta.',badmail:'Revisa el email.',err:'No se pudo crear la cuenta: ',
  readyH:n=>`Cuenta de ${n} creada ✅`,readyS:'Mándale este mensaje:',byMail:'📧 Enviar por email',byWa:'💬 Abrir WhatsApp',copy:'Copiar mensaje',copied:'¡Copiado!',
  msg:(n,e,p,me)=>`¡Hola ${n}! ${me} te ha creado una cuenta en el plan de estudio para los mocks IGCSE 📚\n\nEntra aquí: ${SITE}es/\nUsuario: ${e}\nContraseña: ${p}\n\nCada una ve solo su propio avance. Puedes cambiar la contraseña en Ajustes.`,
  subj:'Tu acceso al plan IGCSE',
  pwH:'Cambiar contraseña',pwS:'Mínimo 6 caracteres.',save:'Guardar',pwOk:'Contraseña cambiada ✅',pwShort:'Tiene que tener al menos 6 caracteres.',
  outQ:'¿Cerrar sesión en este dispositivo?',outS:'Tu avance está guardado en tu cuenta.',synced:'Avance guardado en tu cuenta',offline:'Sin conexión: se guardará al volver'
}:{
  hi:'Sign in to your plan',sub:'Use the username and password you were sent.',user:'Email',pass:'Password',enter:'Sign in',wait:'Signing in…',
  bad:'Wrong email or password.',net:'No connection. Try again.',lang:'Español',
  acct:'Your account',as:n=>`Signed in as <b>${n}</b>`,inv:'Create new user',adm:'Students (admin)',admS:'Progress of each account.',admNone:'Nobody has saved progress yet. Accounts show up here after their first sign-in.',ses:(a,b)=>`${a} of ${b} sessions`,open:'See details →',viewing:n=>`Viewing <b>${n}</b>`,ro:'read-only',act:'her last activity',chk:'checked',exit:'Exit',ago:s=>s<5?'just now':`${s} s ago`,last:'Last activity',never:'no activity',quizN:n=>`${n} quizzes done`,pw:'Change password',out:'Sign out',
  invH:'Create new user',invS:'This creates the account and gives you a message with the username and password to send.',name:'Name',mail:'Their email',newpw:'Password',
  create:'Create account',creating:'Creating…',cancel:'Cancel',close:'Close',exists:'That email already has an account.',badmail:'Check the email.',err:'Could not create the account: ',
  readyH:n=>`${n}'s account is ready ✅`,readyS:'Send this message:',byMail:'📧 Send by email',byWa:'💬 Open WhatsApp',copy:'Copy message',copied:'Copied!',
  msg:(n,e,p,me)=>`Hi ${n}! ${me} has created an account for you on the IGCSE mocks study plan 📚\n\nOpen: ${SITE}\nUsername: ${e}\nPassword: ${p}\n\nEach of you only sees your own progress. You can change the password in Settings.`,
  subj:'Your IGCSE plan login',
  pwH:'Change password',pwS:'At least 6 characters.',save:'Save',pwOk:'Password changed ✅',pwShort:'It needs at least 6 characters.',
  outQ:'Sign out on this device?',outS:'Your progress is saved in your account.',synced:'Progress saved to your account',offline:'Offline: it will save when you are back'
};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sb=supabase.createClient(CFG.url,CFG.key,{auth:{persistSession:true,autoRefreshToken:true}});
const ref=new URL(CFG.url).hostname.split('.')[0];
const hasTok=!!ls.get('sb-'+ref+'-auth-token');
if(!hasTok)document.documentElement.classList.add('locked');
const VKEY='igcse-view',VY='igcse-view-y';
let VIEW=null;try{VIEW=JSON.parse(sessionStorage.getItem(VKEY)||'null')}catch(e){}
if(VIEW&&hasTok){window.IGVIEW=VIEW.data||{};document.documentElement.classList.add('viewas');
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('input[type=checkbox][data-id],#dash button[data-a],#settings button,#account button');
    if(t){e.preventDefault();e.stopImmediatePropagation()}},true)}
else VIEW=null;
const ss={set:(k,v)=>{try{sessionStorage.setItem(k,v)}catch(e){}},del:k=>{try{sessionStorage.removeItem(k)}catch(e){}}};
async function openView(id){
  const {data:r,error}=await sb.from('progress').select('user_id,email,name,data,updated_at').eq('user_id',id).maybeSingle();
  if(error||!r)return;
  ss.set(VKEY,JSON.stringify({id:r.user_id,name:r.name||(r.data&&r.data['igcse-hours-v1']&&r.data['igcse-hours-v1'].name)||r.email,data:r.data||{},updated_at:r.updated_at}));
  ss.del(VY);location.hash='hoy';location.reload()}
function exitView(){ss.del(VKEY);ss.del(VY);location.hash='ajustes';location.reload()}
function viewBar(){
  const bar=document.createElement('div');bar.id='viewBar';
  const main=document.querySelector('.main');main.insertBefore(bar,main.querySelector('.views'));
  let checked=Date.now();
  const t=x=>new Date(x).toLocaleString(ES?'es-ES':'en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
  const paint=()=>{bar.innerHTML=`<span class="vb-eye">👁</span><div class="vb-txt"><span>${L.viewing(esc(VIEW.name))} · ${L.ro}</span><small>${L.act}: ${t(VIEW.updated_at)} · ${L.chk} ${L.ago(Math.round((Date.now()-checked)/1000))}</small></div><button type="button" id="vbX">${L.exit}</button>`;
    bar.querySelector('#vbX').onclick=exitView};
  paint();setInterval(paint,5000);
  let y=null;try{y=+sessionStorage.getItem(VY)}catch(e){}if(y)setTimeout(()=>scrollTo(0,y),50);ss.del(VY);
  const poll=async()=>{if(document.visibilityState!=='visible')return;
    const {data:r,error}=await sb.from('progress').select('data,updated_at').eq('user_id',VIEW.id).maybeSingle();
    if(error||!r)return;checked=Date.now();paint();
    if(r.updated_at!==VIEW.updated_at){VIEW.data=r.data||{};VIEW.updated_at=r.updated_at;ss.set(VKEY,JSON.stringify(VIEW));ss.set(VY,String(Math.round(scrollY)));location.reload()}};
  setInterval(poll,10000);document.addEventListener('visibilitychange',poll);
}

/* ---------- data blob ---------- */
const localBlob=()=>{const o={};KEYS.forEach(k=>{const v=ls.get(k);if(v)try{o[k]=JSON.parse(v)}catch(e){}});return o};
const hasLocal=()=>KEYS.some(k=>{const v=ls.get(k);return v&&v!=='{}'});
const writeLocal=d=>{KEYS.forEach(k=>{if(d&&d[k]!=null)ls.set(k,JSON.stringify(d[k]));else ls.del(k)})};
const same=(a,b)=>JSON.stringify(a||{})===JSON.stringify(b||{});
let user=null,timer=null,busy=false;
async function pushNow(){if(!user)return;clearTimeout(timer);busy=true;
  const now=new Date().toISOString();
  const d=localBlob(),nm=(d['igcse-hours-v1']&&d['igcse-hours-v1'].name)||(user.user_metadata&&user.user_metadata.name)||null;
  const {error}=await sb.from('progress').upsert({user_id:user.id,email:user.email,name:nm,data:d,updated_at:now});
  busy=false;if(!error){ls.set(TS,now);ls.del(DIRTY)}return !error}
window.IGSync={ready:true,push(){ls.set(DIRTY,'1');clearTimeout(timer);timer=setTimeout(pushNow,800)}};
addEventListener('pagehide',()=>{if(ls.get(DIRTY)&&user)pushNow()});

/* Called with a signed-in user. Returns true if the page must reload with new data. */
async function adopt(u){
  user=u;const owner=ls.get(OWNER);
  const {data:row,error}=await sb.from('progress').select('data,updated_at').eq('user_id',u.id).maybeSingle();
  if(error)return false;
  const name=(u.user_metadata&&u.user_metadata.name)||'';
  if(owner!==u.id){
    let d=row&&row.data&&Object.keys(row.data).length?row.data:null;
    if(!d&&!owner&&hasLocal()&&u.email!==ADMIN){ls.set(OWNER,u.id);await pushNow();return false}   // first sign-in on the original device: keep and upload
    d=d||{};if(name&&!(d['igcse-hours-v1']&&d['igcse-hours-v1'].name))d['igcse-hours-v1']=Object.assign({},d['igcse-hours-v1'],{name});
    writeLocal(d);ls.set(OWNER,u.id);ls.set(TS,row?row.updated_at:'');ls.del(DIRTY);
    if(!row)await pushNow();
    return true}
  if(ls.get(DIRTY)||!row){await pushNow();return false}
  if(new Date(row.updated_at)>new Date(ls.get(TS)||0)&&!same(row.data,localBlob())){writeLocal(row.data);ls.set(TS,row.updated_at);return true}
  return false}

/* ---------- small modal helper ---------- */
function modal(html){const m=document.createElement('div');m.className='acm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
  m.innerHTML=`<div class="acm-box">${html}</div>`;document.body.appendChild(m);
  m.addEventListener('click',e=>{if(e.target===m||e.target.closest('[data-x]'))m.remove()});return m}

/* ---------- login screen ---------- */
function showLogin(){
  const base=ES?'../':'';
  const el=document.createElement('div');el.id='login';
  el.innerHTML=`<form class="lg-box" method="post" action="#" autocomplete="on">
    <img src="${base}apple-touch-icon.png" alt="" class="lg-logo"><h1>${L.hi}</h1><p>${L.sub}</p>
    <label>${L.user}<input class="inp" type="email" name="username" id="lgU" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" inputmode="email" required></label>
    <label>${L.pass}<input class="inp" type="password" name="password" id="lgP" autocomplete="current-password" required></label>
    <p class="lg-err" id="lgE" role="alert"></p>
    <button class="lg-go" type="submit" id="lgB">${L.enter}</button>
    <a class="lg-lang" href="${ES?'../':'es/'}">${L.lang}</a></form>`;
  document.body.appendChild(el);
  const f=el.querySelector('form'),b=el.querySelector('#lgB'),E=el.querySelector('#lgE');
  f.addEventListener('submit',async e=>{e.preventDefault();E.textContent='';b.disabled=true;b.textContent=L.wait;
    const email=f.username.value.trim().toLowerCase(),password=f.password.value;
    let r;try{r=await sb.auth.signInWithPassword({email,password})}catch(x){r={error:{message:'net'}}}
    if(r.error){b.disabled=false;b.textContent=L.enter;E.textContent=/fetch|net/i.test(r.error.message)?L.net:L.bad;return}
    await adopt(r.data.user);location.reload()});
}

/* ---------- account panel (Settings) ---------- */
const genPw=()=>{const w=['Mango','Tigre','Lima','Coco','Kiwi','Panda','Cobra','Nube','Rayo','Fresa','Delta','Polar','Sol','Mar','Luna','Zorro'];
  const a=new Uint32Array(2);crypto.getRandomValues(a);return w[a[0]%w.length]+String(1000+a[1]%9000)};
function accountPanel(u){
  const box=document.getElementById('account');if(!box)return;
  const me=(u.user_metadata&&u.user_metadata.name)||(window.PLAN&&PLAN.name)||u.email;
  box.innerHTML=`<div class="panel acct"><h3>${L.acct}</h3><p>${L.as(esc(me))} · <span class="note">${esc(u.email)}</span></p>
    <p class="note" id="acSync"></p>
    <div class="actions">${u.email===ADMIN?`<button type="button" class="btn" data-ac="inv">${L.inv}</button>`:''}<button type="button" class="btn ghost" data-ac="pw">${L.pw}</button><button type="button" class="btn ghost" data-ac="out">${L.out}</button></div></div>`;
  const sync=()=>{const s=document.getElementById('acSync');if(s)s.textContent=ls.get(DIRTY)?L.offline:'✓ '+L.synced};sync();setInterval(sync,3000);
  box.onclick=e=>{const b=e.target.closest('[data-ac]');if(!b)return;const a=b.dataset.ac;
    if(a==='inv')invite(me);else if(a==='pw')changePw();else if(a==='out')signOut()};
  if(u.email===ADMIN)adminPanel(box);
}
async function adminPanel(box){
  const el=document.createElement('div');el.className='panel adm';el.innerHTML=`<h3>${L.adm}</h3><p class="note">${L.admS}</p><div class="adm-list">…</div>`;box.appendChild(el);
  const {data,error}=await sb.from('progress').select('user_id,email,name,data,updated_at').order('updated_at',{ascending:false});
  const list=el.querySelector('.adm-list');
  if(error){list.textContent=error.message;return}
  const rows=(data||[]).filter(r=>r.email!==ADMIN);
  if(!rows.length){list.innerHTML=`<p class="note">${L.admNone}</p>`;return}
  const tot=window.PLAN&&PLAN.mandatory?PLAN.mandatory().length:0;
  const when=t=>{if(!t)return L.never;const d=new Date(t);return d.toLocaleDateString(ES?'es-ES':'en-GB',{day:'numeric',month:'short'})+' · '+d.toLocaleTimeString(ES?'es-ES':'en-GB',{hour:'2-digit',minute:'2-digit'})};
  list.innerHTML=rows.map(r=>{const p=(r.data&&r.data['igcse-plan-v1'])||{};const n=Object.values(p).filter(Boolean).length;
    const q=Object.keys((r.data&&r.data['igcse-quiz-v1'])||{}).length;const pct=tot?Math.min(100,Math.round(100*n/tot)):0;
    const nm=r.name||(r.data&&r.data['igcse-hours-v1']&&r.data['igcse-hours-v1'].name)||r.email;
    return `<button type="button" class="adm-row" data-view="${esc(r.user_id)}"><div class="adm-top"><b>${esc(nm)}</b><span class="num">${pct}%</span></div>
      <div class="adm-bar"><i style="width:${pct}%"></i></div>
      <div class="adm-meta"><span>${L.ses(n,tot||'?')} · ${L.quizN(q)}</span><span>${L.last}: ${when(r.updated_at)}</span><span class="note">${esc(r.email||'')}</span></div><span class="adm-open">${L.open}</span></button>`}).join('');
  list.onclick=e=>{const b=e.target.closest('[data-view]');if(b){b.disabled=true;openView(b.dataset.view)}};
}
function invite(me){
  const m=modal(`<b class="acm-t">${L.invH}</b><p>${L.invS}</p>
    <form id="ivF"><label>${L.name}<input class="inp" name="n" required autocomplete="off"></label>
    <label>${L.mail}<input class="inp" name="e" type="email" required autocomplete="off" autocapitalize="none" inputmode="email"></label>
    <label>${L.newpw}<input class="inp" name="p" required minlength="6" autocomplete="off" value="${genPw()}"></label>
    <p class="lg-err" id="ivE" role="alert"></p>
    <div class="acm-row"><button type="button" class="sec" data-x>${L.cancel}</button><button type="submit" class="pri" id="ivB">${L.create}</button></div></form>`);
  const f=m.querySelector('form'),E=m.querySelector('#ivE'),B=m.querySelector('#ivB');
  f.addEventListener('submit',async e=>{e.preventDefault();E.textContent='';
    const n=f.n.value.trim(),em=f.e.value.trim().toLowerCase(),p=f.p.value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){E.textContent=L.badmail;return}
    if(p.length<6){E.textContent=L.pwShort;return}
    B.disabled=true;B.textContent=L.creating;
    const tmp=supabase.createClient(CFG.url,CFG.key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false,storageKey:'ig-invite'}});
    let r;try{r=await tmp.auth.signUp({email:em,password:p,options:{data:{name:n}}})}catch(x){r={error:{message:L.net}}}
    const dup=r.error?/registered|exists/i.test(r.error.message):(r.data&&r.data.user&&Array.isArray(r.data.user.identities)&&!r.data.user.identities.length);
    if(r.error||dup){B.disabled=false;B.textContent=L.create;E.textContent=dup?L.exists:L.err+r.error.message;return}
    if(r.data.session)await tmp.from('progress').upsert({user_id:r.data.user.id,email:em,name:n,data:{'igcse-hours-v1':{name:n}},updated_at:new Date().toISOString()});
    const txt=L.msg(n,em,p,me);
    m.querySelector('.acm-box').innerHTML=`<b class="acm-t">${L.readyH(esc(n))}</b><p>${L.readyS}</p><pre class="acm-msg">${esc(txt)}</pre>
      <div class="acm-col"><a class="pri" href="mailto:${encodeURIComponent(em)}?subject=${encodeURIComponent(L.subj)}&body=${encodeURIComponent(txt)}">${L.byMail}</a>
      <a class="wa" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">${L.byWa}</a>
      <button type="button" class="sec" id="ivC">${L.copy}</button><button type="button" class="sec" data-x>${L.close}</button></div>`;
    m.querySelector('#ivC').onclick=async ev=>{const t=ev.currentTarget;try{await navigator.clipboard.writeText(txt)}catch(x){const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}t.textContent=L.copied};
  });
  setTimeout(()=>f.n.focus(),50);
}
function changePw(){
  const m=modal(`<b class="acm-t">${L.pwH}</b><p>${L.pwS}</p><form><input type="email" name="username" autocomplete="username" value="${esc(user.email)}" hidden>
    <input class="inp" type="password" name="p" autocomplete="new-password" minlength="6" required><p class="lg-err" role="alert"></p>
    <div class="acm-row"><button type="button" class="sec" data-x>${L.cancel}</button><button type="submit" class="pri">${L.save}</button></div></form>`);
  const f=m.querySelector('form'),E=m.querySelector('.lg-err');
  f.addEventListener('submit',async e=>{e.preventDefault();const p=f.p.value;if(p.length<6){E.textContent=L.pwShort;return}
    const {error}=await sb.auth.updateUser({password:p});
    if(error){E.textContent=error.message;return}
    m.querySelector('.acm-box').innerHTML=`<b class="acm-t">${L.pwOk}</b><div class="acm-row"><button type="button" class="pri" data-x>${L.close}</button></div>`});
}
function signOut(){
  const m=modal(`<b class="acm-t">${L.outQ}</b><p>${L.outS}</p><div class="acm-row"><button type="button" class="sec" data-x>${L.cancel}</button><button type="button" class="pri" id="soY">${L.out}</button></div>`);
  m.querySelector('#soY').onclick=async()=>{if(ls.get(DIRTY))await pushNow();await sb.auth.signOut();KEYS.concat([OWNER,TS,DIRTY]).forEach(ls.del);location.reload()};
}

/* ---------- start ---------- */
async function start(){
  const {data}=await sb.auth.getSession();const u=data&&data.session&&data.session.user;
  if(!u){document.documentElement.classList.add('locked');showLogin();return}
  if(VIEW&&u.email!==ADMIN){exitView();return}
  if(await adopt(u)){location.reload();return}
  if(VIEW){user=u;viewBar();return}
  accountPanel(u);
  let last=Date.now();
  document.addEventListener('visibilitychange',async()=>{if(document.visibilityState!=='visible'||Date.now()-last<30000||busy)return;last=Date.now();if(await adopt(u))location.reload()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
