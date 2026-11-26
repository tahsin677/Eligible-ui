/* Sidebar open / close.
   Wide screens: the collapse button shrinks the menu to an icon rail and back (remembered).
   Narrow screens: the menu is a drawer; the same button, the backdrop, a link click or Escape close it. */
(function(){
  const app=document.querySelector(".app"),side=document.getElementById("side");
  if(!app||!side)return;
  const btn=side.querySelector(".ib[aria-label*='sidebar']");
  const mq=window.matchMedia("(max-width:900px)");
  const KEY="eligible.sidebar";

  const back=document.createElement("div");back.className="sbackdrop";document.body.appendChild(back);

  function label(){
    if(!btn)return;
    const collapsed=app.classList.contains("collapsed");
    btn.setAttribute("aria-label",mq.matches?"Close menu":(collapsed?"Expand sidebar":"Collapse sidebar"));
    btn.setAttribute("aria-expanded",mq.matches?side.classList.contains("open"):!collapsed);
    btn.title=btn.getAttribute("aria-label");
  }
  function setCollapsed(v){app.classList.toggle("collapsed",v);try{localStorage.setItem(KEY,v?"1":"0")}catch(e){}label()}
  function closeDrawer(){side.classList.remove("open");back.classList.remove("on");label()}
  function openDrawer(){side.classList.add("open");back.classList.add("on");label()}

  try{if(localStorage.getItem(KEY)==="1"&&!mq.matches)app.classList.add("collapsed")}catch(e){}
  label();

  btn&&btn.addEventListener("click",()=>{mq.matches?closeDrawer():setCollapsed(!app.classList.contains("collapsed"))});
  back.addEventListener("click",closeDrawer);
  side.addEventListener("click",e=>{if(mq.matches&&e.target.closest("nav a"))closeDrawer()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&side.classList.contains("open"))closeDrawer()});

  /* the page's own menu button (shown on narrow screens) opens the drawer */
  const menu=document.getElementById("menu");
  if(menu){menu.onclick=()=>{side.classList.contains("open")?closeDrawer():openDrawer()}}

  mq.addEventListener("change",()=>{side.classList.remove("open");back.classList.remove("on");if(mq.matches)app.classList.remove("collapsed");label()});
  /* keep the backdrop in sync if something else toggles the drawer */
  new MutationObserver(()=>back.classList.toggle("on",side.classList.contains("open")&&mq.matches)).observe(side,{attributes:true,attributeFilter:["class"]});
})();


/* ---- Search pages: command palette in the middle of the screen ---- */
(function(){
  const btn=document.getElementById("cmdk");
  if(!btn)return;
  const I=(n,s)=>`<i class="hgi hgi-stroke hgi-${n} ico"${s?` style="font-size:${s}px"`:""}></i>`;
  const ITEMS=[
   {g:"Pages",t:"Overview",i:"home-01",h:"overview.html",k:"home dashboard"},
   {g:"Pages",t:"AI assistant",i:"sparkles",h:"assistant.html",k:"chat ask ai"},
   {g:"Pages",t:"Jobs",i:"briefcase-01",h:"jobs.html",k:"roles openings"},
   {g:"Pages",t:"Applications",i:"user-multiple",h:"applications.html",k:"candidates applicants"},
   {g:"Pages",t:"Interviews",i:"video-01",h:"interviews.html",k:"recordings"},
   {g:"Pages",t:"Billing",i:"credit-card",h:"#",k:"plan invoices payment"},
   {g:"Pages",t:"Settings",i:"setting-07",h:"settings.html",k:"preferences account"},
   {g:"Pages",t:"Audit logs",i:"audit-01",h:"#",k:"history activity"},
   {g:"This interview",t:"Shakeel · Interview recording",i:"video-01",h:"index.html",k:"watch video candidate sales executive"},
   {g:"This interview",t:"Full details",i:"file-01",h:"details.html",k:"score answers speech behaviour flags session"},
   {g:"This interview",t:"Why this score",i:"information-circle",h:"details.html",k:"points deductions breakdown"},
   {g:"This interview",t:"Integrity flags",i:"flag-01",h:"details.html",k:"cheating another person camera voices"}
  ];
  const pal=document.createElement("div");
  pal.className="cmd";pal.hidden=true;
  pal.innerHTML=`<div class="cmd-bg"></div>
   <div class="cmd-box" role="dialog" aria-label="Search pages" aria-modal="true">
    <label class="cmd-in">${I("search-01",22)}<span class="sr">Search pages</span><input type="text" id="cmdIn" placeholder="Search pages and this interview" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="cmdList"><kbd>Esc</kbd></label>
    <div class="cmd-list" id="cmdList" role="listbox"></div>
    <div class="cmd-foot"><span><kbd>↑</kbd><kbd>↓</kbd> to move</span><span><kbd>Enter</kbd> to open</span><span><kbd>Esc</kbd> to close</span></div>
   </div>`;
  document.body.appendChild(pal);
  const inp=pal.querySelector("#cmdIn"),list=pal.querySelector("#cmdList");
  let shown=[],sel=0;

  function render(){
    const q=inp.value.trim().toLowerCase();
    shown=ITEMS.filter(x=>!q||(x.t+" "+x.k+" "+x.g).toLowerCase().includes(q));
    sel=Math.min(sel,Math.max(shown.length-1,0));
    if(!shown.length){list.innerHTML=`<div class="cmd-empty">No results for “${q.replace(/[<&]/g,"")}”</div>`;return}
    let h="",last="";
    shown.forEach((x,n)=>{
      if(x.g!==last){last=x.g;h+=`<div class="cmd-g">${x.g}</div>`}
      h+=`<a class="cmd-i${n===sel?" on":""}" role="option" aria-selected="${n===sel}" data-n="${n}" href="${x.h}">${I(x.i,20)}<span>${x.t}</span>${I("arrow-right-02",16)}</a>`;
    });
    list.innerHTML=h;
    const on=list.querySelector(".on");on&&on.scrollIntoView({block:"nearest"});
  }
  function toast(m){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t)}t.textContent=m;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),2200)}
  function go(n){
    const x=shown[n];if(!x)return;close();
    if(x.h==="#"){toast(x.t+" isn't built yet");return}
    location.href=x.h;
  }
  function open(){pal.hidden=false;inp.value="";sel=0;render();btn.setAttribute("aria-expanded","true");setTimeout(()=>inp.focus(),0)}
  function close(){pal.hidden=true;btn.setAttribute("aria-expanded","false");btn.focus&&btn.focus()}

  btn.setAttribute("aria-haspopup","dialog");btn.setAttribute("aria-expanded","false");
  btn.addEventListener("click",e=>{e.stopPropagation();open()});
  pal.querySelector(".cmd-bg").addEventListener("click",close);
  inp.addEventListener("input",()=>{sel=0;render()});
  inp.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"){e.preventDefault();sel=Math.min(sel+1,shown.length-1);render()}
    else if(e.key==="ArrowUp"){e.preventDefault();sel=Math.max(sel-1,0);render()}
    else if(e.key==="Enter"){e.preventDefault();go(sel)}
    else if(e.key==="Escape"){e.preventDefault();close()}
  });
  list.addEventListener("click",e=>{const a=e.target.closest(".cmd-i");if(a){e.preventDefault();go(+a.dataset.n)}});
  list.addEventListener("mousemove",e=>{const a=e.target.closest(".cmd-i");if(a&&+a.dataset.n!==sel){sel=+a.dataset.n;list.querySelectorAll(".cmd-i").forEach((el,n)=>{el.classList.toggle("on",n===sel);el.setAttribute("aria-selected",n===sel)})}});
  document.addEventListener("keydown",e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();pal.hidden?open():close()}
    else if(e.key==="Escape"&&!pal.hidden)close();
  });
})();
