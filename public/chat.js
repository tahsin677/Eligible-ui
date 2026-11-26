/* Ask Eligible: floating chat with suggested questions.
   Demo only: answers are written from this page's interview data, not from a live AI. */
(function(){
  const fab=document.getElementById("fab");
  if(!fab)return;
  const interviewPage=/(index|details)\.html$/.test(location.pathname)||location.pathname.endsWith("/");
  const onDetails=/details\.html/.test(location.pathname);
  const NUM=onDetails?{comm:"5.7",ded:"−47"}:{comm:"4.4",ded:"−40"};

  const KB=[
   {id:"score",re:/(why|how).*(score|0|zero|low)|score|points/i,q:"Why did Shakeel score 0?",
    a:()=>`Shakeel earned some points, but the integrity deductions wipe them out.\n\n• **Answers:** 8.8 / 55\n• **Delivery:** 18 / 20\n• **Communication:** ${NUM.comm} / 25\n• **Integrity deductions:** ${NUM.ded}\n\nA score can't go below 0, so the total is **0 / 100**. The AI suggests **not advancing**, and your team makes the final call.`},
   {id:"must",re:/must.?have|required|missed/i,q:"Which must-haves were missed?",
    a:()=>`Both must-haves were only **partly correct**, so **0 of 2** are met.\n\n• **Q1 · Upwork bidding judgement** (1/5): named portfolio fit as a filter but gave no repeatable criteria, such as budget or client history.\n• **Q3 · Fiverr account management** (1/5): described some buyer replies, but said they don't manage the account day to day.`},
   {id:"flags",re:/integrity|flag|cheat|another person|voice|camera|phone/i,q:"What are the integrity flags?",
    a:()=>`There are **7 integrity flags**, mostly **"Another person in view"**.\n\nOn the Full details page you can also see other voices on the candidate's microphone, speech while their lips were still, and a short phone sighting. They are signals to review, not verdicts, and each one has a Watch button that opens the moment in the recording.`},
   {id:"summary",re:/summar|overview|tl;?dr|recap/i,q:"Summarise this interview",
    a:()=>`Shakeel named portfolio fit as the way he picks Upwork jobs and reported winning an ecommerce project, but showed no repeatable bidding process and no tailored proposal. Fiverr account management wasn't established. The evidence doesn't support advancing for a role that needs immediate ownership of both channels, and written English remains unassessed.`},
   {id:"follow",re:/follow.?up|next question|ask (him|them|next)|what should i ask/i,q:"Suggest follow-up questions",
    a:()=>`If you want to talk to Shakeel again, these would settle the open points:\n\n1. "Walk me through the last Upwork job you skipped, and what made you skip it."\n2. "Paste or describe the first two lines of a proposal that won work."\n3. "Who manages the Fiverr account today, and what is your part in it?"\n4. "Was anyone else with you during the interview?"`},
   {id:"strengths",re:/strength|good|positive|concern|weak/i,q:"What were his strengths and concerns?",
    a:()=>`**Strengths**\n• Recognises portfolio alignment as a reason to pick an Upwork job.\n• Reported an ecommerce proposal that led to a won project.\n\n**Concerns**\n• Missed both must-haves.\n• Selection criteria stayed thin despite repeated prompts.\n• No concrete proposal wording or client-specific reasoning.`},
   {id:"delivery",re:/deliver|speech|pace|filler|communicat/i,q:"How was his delivery?",
    a:()=>`Delivery was the strong part: **18 / 20**. He started answering about 0.8 s after each question, used few filler words (2.8 per 100 words) and had no long pauses. Pace was about 96 words per minute. Communication was weaker (**${NUM.comm} / 25**): answers rarely grew into full explanations or examples.`},
   {id:"advance",re:/advance|hire|reject|recommend|decision|should (i|we)/i,q:"Should we advance him?",
    a:()=>`The AI suggests **not advancing**: both must-haves were missed, the answers were thin, and there are integrity flags to review. It's a suggestion, so you may want to watch the flagged moments before deciding.`}
  ];
  KB.push(
   {id:"attention",re:/attention|review|waiting|todo|to do/i,q:"What needs my attention?",a:()=>`**1 application** is waiting for your review: Shakeel, for Sales Executive. His AI interview is finished (score 0 / 100, the AI suggests not advancing). Open **Applications** to read the CV and answers.`},
   {id:"applicants",re:/applicant|pipeline|how many|candidates/i,q:"How many applicants do I have?",a:()=>`You have **1 open role** (Sales Executive) with **1 applicant**, Shakeel. He finished the AI interview on 26 Nov.`},
   {id:"jobs",re:/job|role|opening/i,q:"Which roles are open?",a:()=>`**Sales Executive**, Sales · Gulshan Badda Ink Road. It's open, with 1 applicant.`},
   {id:"team",re:/team|invite|colleague|member/i,q:"Who is on my team?",a:()=>`Just you so far, **Tahsin (owner)**.`}
  );
  const START=interviewPage?["score","must","flags","summary","follow"]:["attention","applicants","jobs","team","summary"];

  /* ---- build UI ---- */
  const wrap=document.createElement("section");
  wrap.className="chat";wrap.id="chat";wrap.setAttribute("role","dialog");wrap.setAttribute("aria-label","Ask Eligible");wrap.hidden=true;
  wrap.innerHTML=`
   <header class="ch-head">
    <span class="ch-ico"><img src="eligible-icon.png" alt=""></span>
    <div><b>Ask Eligible</b></div>
    <button class="ch-x" aria-label="Close chat"><i class="hgi hgi-stroke hgi-cancel-01 ico" style="font-size:20px"></i></button>
   </header>
   <div class="ch-body" id="chBody" aria-live="polite"></div>
   <form class="ch-form" id="chForm" autocomplete="off">
    <input id="chIn" type="text" placeholder="Ask anything about this interview" aria-label="Your question">
    <button type="submit" aria-label="Send"><i class="hgi hgi-stroke hgi-arrow-up-02 ico" style="font-size:20px"></i></button>
   </form>
   <p class="ch-note">Demo answers based on this page's interview data.</p>`;
  document.body.appendChild(wrap);
  const body=wrap.querySelector("#chBody"),input=wrap.querySelector("#chIn");
  const asked=new Set();

  const md=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\n/g,"<br>");
  function scroll(){body.scrollTo({top:body.scrollHeight,behavior:"smooth"})}
  function bot(html){const d=document.createElement("div");d.className="cm bot";d.innerHTML=`<span class="cav"><img src="eligible-icon.png" alt=""></span><div class="cb">${html}</div>`;body.appendChild(d);scroll();return d}
  function me(text){const d=document.createElement("div");d.className="cm me";d.innerHTML=`<div class="cb">${md(text)}</div>`;body.appendChild(d);scroll()}
  function chips(ids){
    body.querySelectorAll(".csug").forEach(n=>n.remove());
    const list=ids.filter(i=>!asked.has(i)).slice(0,3);
    if(!list.length)return;
    const d=document.createElement("div");d.className="csug";
    d.innerHTML=`<small>Suggested</small>`+list.map(i=>`<button type="button" data-id="${i}">${KB.find(k=>k.id===i).q}</button>`).join("");
    body.appendChild(d);scroll();
  }
  function reply(item){
    const t=document.createElement("div");t.className="cm bot";t.innerHTML=`<span class="cav"><img src="eligible-icon.png" alt=""></span><div class="cb typing"><i></i><i></i><i></i></div>`;
    body.appendChild(t);scroll();
    setTimeout(()=>{t.remove();bot(md(item.a()));asked.add(item.id);chips(KB.map(k=>k.id).filter(i=>i!==item.id))},650);
  }
  function ask(text){
    body.querySelectorAll(".csug").forEach(n=>n.remove());
    me(text);
    const item=KB.find(k=>k.re.test(text));
    if(item){reply(item);return}
    const t=document.createElement("div");t.className="cm bot";t.innerHTML=`<span class="cav"><img src="eligible-icon.png" alt=""></span><div class="cb typing"><i></i><i></i><i></i></div>`;
    body.appendChild(t);scroll();
    setTimeout(()=>{t.remove();bot(md("I can help with Shakeel's **score**, **must-haves**, **integrity flags**, **delivery**, a **summary**, or **follow-up questions**. Try one of the suggestions below."));chips(START)},650);
  }
  function greet(){
    bot(interviewPage?`Hi Tahsin, I'm Eligible. I've read Shakeel's interview for <b>Sales Executive</b>. What would you like to know?`:`Hi Tahsin, I'm Eligible. Ask me about your roles, applicants and interviews.`);
    chips(START);
  }

  /* ---- open / close ---- */
  let started=false;
  function open(v){
    wrap.hidden=!v;fab.setAttribute("aria-expanded",v);fab.classList.toggle("on",v);
    if(v){if(!started){started=true;greet()}setTimeout(()=>input.focus(),50)}
  }
  fab.setAttribute("aria-haspopup","dialog");fab.setAttribute("aria-expanded","false");
  fab.addEventListener("click",e=>{e.stopPropagation();open(wrap.hidden)});
  wrap.querySelector(".ch-x").addEventListener("click",()=>open(false));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!wrap.hidden)open(false)});
  wrap.addEventListener("click",e=>{
    const b=e.target.closest(".csug button");if(b){ask(KB.find(k=>k.id===b.dataset.id).q)}
  });
  wrap.querySelector("#chForm").addEventListener("submit",e=>{e.preventDefault();const v=input.value.trim();if(!v)return;input.value="";ask(v)});
})();
