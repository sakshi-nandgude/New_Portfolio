import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:16px}
body{
  font-family:'DM Sans',sans-serif;
  background:#f5f4ef;
  color:#1a1a1e;
  line-height:1.65;
  overflow-x:hidden;
}
::selection{background:#0c7a5e;color:#fff}

:root{
  --ink:#1a1a1e;
  --ink2:#2e2e34;
  --muted:#6b6b76;
  --line:#ddddd5;
  --bg:#f5f4ef;
  --bg2:#ffffff;
  --card:#fffffe;
  --teal:#0c7a5e;
  --teal2:#0fa37a;
  --teal-pale:#e5f5f0;
  --amber:#b85c00;
  --amber-pale:#fdf0e3;
  --navy:#1a2f5c;
  --navy-pale:#e8ecf5;
  --purple:#4433aa;
  --purple-pale:#eeeafa;
  --r:10px;
  --r2:18px;
  --shadow:0 2px 20px rgba(0,0,0,.07);
  --shadow2:0 8px 40px rgba(0,0,0,.12);
}

::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--teal);border-radius:3px}

nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(1.25rem,5vw,3.5rem);
  height:62px;
  background:rgba(245,244,239,.9);
  backdrop-filter:blur(14px);
  border-bottom:1px solid var(--line);
  transition:box-shadow .3s;
}
nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,.08)}
.nav-logo{
  font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;
  color:var(--ink);text-decoration:none;letter-spacing:-.03em;
}
.nav-logo em{color:var(--teal);font-style:normal}
.nav-links{display:flex;gap:1.8rem;list-style:none}
.nav-links a{
  font-size:.82rem;font-weight:500;color:var(--muted);
  text-decoration:none;letter-spacing:.01em;
  transition:color .2s;position:relative;
}
.nav-links a::after{
  content:'';position:absolute;bottom:-2px;left:0;right:0;
  height:1.5px;background:var(--teal);
  transform:scaleX(0);transform-origin:left;transition:transform .25s ease;
}
.nav-links a:hover{color:var(--ink)}
.nav-links a:hover::after{transform:scaleX(1)}
.nav-hire{
  font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  padding:.42rem 1rem;border-radius:100px;
  background:var(--ink);color:#fff;text-decoration:none;
  transition:background .2s,transform .15s;
}
.nav-hire:hover{background:var(--teal);transform:translateY(-1px)}
.burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
.burger span{width:21px;height:1.5px;background:var(--ink);border-radius:2px;transition:all .3s;display:block}
.burger.open span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}
.burger.open span:nth-child(2){opacity:0}
.burger.open span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
.mob-menu{
  display:none;position:fixed;inset:62px 0 0;z-index:199;
  background:var(--bg2);flex-direction:column;align-items:center;
  justify-content:center;gap:2.2rem;border-top:1px solid var(--line);
}
.mob-menu.open{display:flex}
.mob-menu a{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:700;color:var(--ink);text-decoration:none}
.mob-menu a:hover{color:var(--teal)}

section{padding:clamp(5rem,10vh,8rem) clamp(1.25rem,6vw,3.5rem)}
.section-inner{max-width:1080px;margin:0 auto}
.section-label{
  display:inline-flex;align-items:center;gap:.5rem;
  font-family:'DM Mono',monospace;font-size:.7rem;letter-spacing:.1em;
  color:var(--teal);text-transform:uppercase;
  margin-bottom:1rem;
}
.section-label::before{content:'';width:24px;height:1.5px;background:var(--teal)}
.section-title{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:clamp(2rem,4vw,3rem);line-height:1.1;
  letter-spacing:-.04em;color:var(--ink);
  margin-bottom:.4rem;
}
.section-sub{color:var(--muted);font-size:1rem;max-width:540px;margin-bottom:3rem}

.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
.reveal.visible{opacity:1;transform:none}

#hero{
  min-height:100vh;
  display:grid;place-items:center;
  padding:100px clamp(1.25rem,6vw,3.5rem) 60px;
  position:relative;overflow:hidden;
}
.hero-bg{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 70% 60% at 80% 20%, rgba(12,122,94,.07) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 10% 80%, rgba(26,47,92,.05) 0%, transparent 55%);
}
.hero-grid{
  display:grid;grid-template-columns:1fr auto;
  gap:3rem;align-items:center;
  max-width:1080px;width:100%;position:relative;z-index:1;
}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:.6rem;
  font-family:'DM Mono',monospace;font-size:.72rem;
  color:var(--teal);letter-spacing:.09em;
  background:var(--teal-pale);border:1px solid rgba(12,122,94,.18);
  padding:.28rem .75rem;border-radius:100px;
  margin-bottom:1.5rem;
}
.hero-dot{width:7px;height:7px;border-radius:50%;background:var(--teal);animation:pulse 2s infinite;display:inline-block}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.hero-name{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:clamp(2.8rem,6vw,4.8rem);line-height:1.0;
  letter-spacing:-.05em;color:var(--ink);
  margin-bottom:.6rem;
}
.hero-name span{color:var(--teal)}
.hero-role{
  font-size:clamp(1rem,2.2vw,1.2rem);font-weight:300;color:var(--muted);
  margin-bottom:1.6rem;line-height:1.6;max-width:520px;
}
.hero-role strong{color:var(--ink);font-weight:500}
.hero-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2.2rem}
.htag{
  font-size:.72rem;font-weight:500;letter-spacing:.02em;
  padding:.28rem .7rem;border-radius:100px;
  border:1px solid var(--line);background:var(--bg2);color:var(--ink2);
  transition:border-color .2s,background .2s;cursor:default;
}
.htag:hover{border-color:var(--teal);background:var(--teal-pale);color:var(--teal)}
.hero-btns{display:flex;gap:.9rem;flex-wrap:wrap}
.btn-p{
  font-size:.82rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
  padding:.65rem 1.6rem;border-radius:100px;
  background:var(--ink);color:#fff;text-decoration:none;
  transition:background .2s,transform .15s;border:none;cursor:pointer;display:inline-block;
}
.btn-p:hover{background:var(--teal);transform:translateY(-2px)}
.btn-o{
  font-size:.82rem;font-weight:600;letter-spacing:.02em;
  padding:.65rem 1.6rem;border-radius:100px;
  border:1.5px solid var(--line);background:transparent;color:var(--ink);
  text-decoration:none;transition:border-color .2s,background .2s,transform .15s;cursor:pointer;display:inline-block;
}
.btn-o:hover{border-color:var(--teal);background:var(--teal-pale);transform:translateY(-2px)}
.hero-avatar{
  width:clamp(160px,18vw,240px);height:clamp(160px,18vw,240px);
  border-radius:var(--r2);
  background:linear-gradient(135deg,#c8ede3,#a8d5c9);
  display:flex;align-items:center;justify-content:center;
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:clamp(2.5rem,5vw,4rem);color:var(--teal);
  border:3px solid rgba(12,122,94,.15);
  flex-shrink:0;box-shadow:var(--shadow2);position:relative;
}
.hero-avatar::after{
  content:'';position:absolute;inset:-8px;border-radius:22px;
  border:1px dashed rgba(12,122,94,.25);animation:spin 20s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}
.hero-stats{display:flex;gap:2rem;margin-top:2.5rem;flex-wrap:wrap}
.stat-num{font-family:'Syne',sans-serif;font-weight:800;font-size:1.8rem;color:var(--teal);line-height:1}
.stat-label{font-size:.72rem;color:var(--muted);letter-spacing:.02em}

#about{background:var(--bg2)}
.about-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:4rem;align-items:start}
.about-card{background:var(--bg);border-radius:var(--r2);padding:2rem;border:1px solid var(--line)}
.about-card h4{font-family:'Syne',sans-serif;font-size:.85rem;font-weight:700;margin-bottom:1rem;color:var(--muted);letter-spacing:.04em;text-transform:uppercase}
.info-row{display:flex;justify-content:space-between;padding:.55rem 0;border-bottom:1px solid var(--line);font-size:.84rem;gap:1rem}
.info-row:last-child{border-bottom:none}
.info-row span:first-child{color:var(--muted);flex-shrink:0}
.info-row span:last-child{font-weight:500;color:var(--ink);text-align:right}
.about-text p{font-size:.97rem;color:var(--ink2);margin-bottom:1.1rem;line-height:1.8}
.about-qualities{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:1.5rem}
.quality{
  display:flex;align-items:center;gap:.45rem;
  font-size:.78rem;font-weight:500;color:var(--ink2);
  background:var(--teal-pale);border:1px solid rgba(12,122,94,.12);
  padding:.38rem .7rem;border-radius:var(--r);
}
.quality::before{content:'✓';color:var(--teal);font-weight:700;font-size:.72rem}

#skills{background:var(--bg)}
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem}
.skill-card{
  background:var(--card);border:1px solid var(--line);
  border-radius:var(--r2);padding:1.5rem;
  transition:border-color .25s,box-shadow .25s,transform .25s;
}
.skill-card:hover{border-color:var(--teal);box-shadow:var(--shadow2);transform:translateY(-3px)}
.skill-icon{width:36px;height:36px;border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:1rem;margin-bottom:1rem}
.skill-card h3{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;color:var(--ink);margin-bottom:.7rem}
.pills{display:flex;flex-wrap:wrap;gap:.35rem}
.pill{font-size:.68rem;font-weight:500;padding:.2rem .55rem;border-radius:100px;background:var(--bg);border:1px solid var(--line);color:var(--ink2)}

#experience{background:var(--bg2)}
.exp-layout{display:grid;grid-template-columns:210px 1fr;gap:3rem}
.exp-tabs{display:flex;flex-direction:column;gap:.25rem}
.exp-tab{
  text-align:left;padding:.65rem 1rem;border-radius:var(--r);
  border:1px solid transparent;background:none;cursor:pointer;
  font-size:.84rem;font-weight:500;color:var(--muted);
  transition:all .2s;border-left:2px solid transparent;
}
.exp-tab:hover{color:var(--ink);background:var(--bg)}
.exp-tab.active{color:var(--teal);background:var(--teal-pale);border-left-color:var(--teal);border-color:rgba(12,122,94,.15)}
.exp-panel{display:none}
.exp-panel.active{display:block}
.exp-title{font-family:'Syne',sans-serif;font-weight:700;font-size:1.1rem;color:var(--ink);margin-bottom:.2rem}
.exp-company{font-size:.84rem;color:var(--teal);font-weight:500;margin-bottom:.2rem}
.exp-date{font-family:'DM Mono',monospace;font-size:.7rem;color:var(--muted);margin-bottom:1.2rem;letter-spacing:.03em}
.exp-buls{list-style:none;display:flex;flex-direction:column;gap:.6rem}
.exp-buls li{font-size:.88rem;color:var(--ink2);padding-left:1.1rem;position:relative;line-height:1.65}
.exp-buls li::before{content:'→';position:absolute;left:0;color:var(--teal);font-size:.72rem;top:.18rem}

#projects{background:var(--bg)}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}
.proj-card{
  background:var(--card);border:1px solid var(--line);
  border-radius:var(--r2);padding:1.75rem;
  transition:border-color .25s,box-shadow .25s,transform .25s;
  display:flex;flex-direction:column;
}
.proj-card:hover{border-color:var(--teal);box-shadow:var(--shadow2);transform:translateY(-4px)}
.proj-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem}
.proj-icon{width:40px;height:40px;border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:1rem}
.proj-link-btn{
  font-size:.68rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;
  padding:.28rem .65rem;border-radius:100px;
  border:1px solid var(--line);color:var(--muted);text-decoration:none;
  transition:all .2s;
}
.proj-link-btn:hover{border-color:var(--teal);color:var(--teal);background:var(--teal-pale)}
.proj-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.97rem;color:var(--ink);margin-bottom:.25rem}
.proj-date{font-family:'DM Mono',monospace;font-size:.67rem;color:var(--muted);margin-bottom:.75rem}
.proj-desc{font-size:.84rem;color:var(--ink2);line-height:1.65;flex:1;margin-bottom:1rem}
.proj-stack{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:auto}
.stag{font-size:.65rem;font-weight:600;letter-spacing:.02em;padding:.17rem .5rem;border-radius:100px}

#education{background:var(--bg2)}
.edu-timeline{display:flex;flex-direction:column}
.edu-item{display:grid;grid-template-columns:150px 1fr;gap:2rem;padding:2rem 0;border-bottom:1px solid var(--line)}
.edu-item:last-child{border-bottom:none}
.edu-year{font-family:'DM Mono',monospace;font-size:.72rem;color:var(--muted);padding-top:.2rem;letter-spacing:.03em;line-height:1.6}
.edu-year small{display:block;font-size:.65rem;margin-top:.3rem;color:var(--teal)}
.edu-degree{font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;color:var(--ink);margin-bottom:.2rem}
.edu-inst{font-size:.84rem;color:var(--teal);font-weight:500;margin-bottom:.3rem}
.edu-grade{
  display:inline-flex;align-items:center;
  font-family:'DM Mono',monospace;font-size:.7rem;
  padding:.17rem .6rem;border-radius:100px;margin-bottom:.6rem;
}
.edu-toggle{font-size:.73rem;font-weight:600;color:var(--teal);background:none;border:none;cursor:pointer;padding:0;text-decoration:underline;text-underline-offset:2px;display:block;margin-top:.4rem}
.edu-mods{margin-top:.75rem;display:grid;grid-template-columns:1fr 1fr;gap:.25rem}
.edu-mod{font-size:.76rem;color:var(--ink2);padding:.18rem 0 .18rem .75rem;position:relative}
.edu-mod::before{content:'·';position:absolute;left:0;color:var(--teal)}

#certifications{background:var(--bg)}
.cert-groups{display:flex;flex-direction:column;gap:2.5rem}
.cert-group-title{
  font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;
  letter-spacing:.06em;text-transform:uppercase;color:var(--muted);
  margin-bottom:1rem;display:flex;align-items:center;gap:.6rem;
}
.cert-group-title::after{content:'';flex:1;height:1px;background:var(--line)}
.cert-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:.7rem}
.cert-card{
  background:var(--card);border:1px solid var(--line);
  border-radius:var(--r);padding:.9rem 1rem;
  display:flex;align-items:flex-start;gap:.7rem;
  transition:border-color .2s,box-shadow .2s;
}
.cert-card:hover{border-color:var(--teal);box-shadow:var(--shadow)}
.cert-badge{width:32px;height:32px;border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0}
.cert-name{font-size:.8rem;font-weight:600;color:var(--ink);line-height:1.35;margin-bottom:.18rem}
.cert-meta{font-size:.7rem;color:var(--muted)}
.cert-id{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted)}

#activities{background:var(--bg2)}
.act-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
.act-card{background:var(--bg);border:1px solid var(--line);border-radius:var(--r2);padding:1.5rem;transition:border-color .2s,transform .2s}
.act-card:hover{border-color:var(--teal);transform:translateY(-2px)}
.act-icon{font-size:1.5rem;margin-bottom:.7rem}
.act-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.92rem;color:var(--ink);margin-bottom:.18rem}
.act-org{font-size:.76rem;color:var(--teal);font-weight:500;margin-bottom:.6rem}
.act-buls{list-style:none;display:flex;flex-direction:column;gap:.38rem}
.act-buls li{font-size:.8rem;color:var(--ink2);padding-left:.9rem;position:relative;line-height:1.5}
.act-buls li::before{content:'·';position:absolute;left:0;color:var(--teal);font-weight:700}

#contact{background:var(--ink);color:#fff}
#contact .section-label{color:var(--teal2)}
#contact .section-label::before{background:var(--teal2)}
#contact .section-title{color:#fff}
#contact .section-sub{color:rgba(255,255,255,.5)}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.contact-links{display:flex;flex-direction:column;gap:.85rem}
.clink{
  display:flex;align-items:center;gap:.9rem;
  padding:.9rem 1.1rem;border-radius:var(--r2);
  border:1px solid rgba(255,255,255,.1);
  text-decoration:none;color:#fff;
  transition:background .2s,border-color .2s,transform .15s;
}
.clink:hover{background:rgba(12,122,94,.2);border-color:var(--teal2);transform:translateX(4px)}
.clink-icon{width:38px;height:38px;border-radius:var(--r);background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.clink-label{font-size:.68rem;color:rgba(255,255,255,.4);margin-bottom:.08rem;letter-spacing:.03em}
.clink-val{font-size:.87rem;font-weight:500}
.cform{display:flex;flex-direction:column;gap:.9rem}
.cform input,.cform textarea{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  border-radius:var(--r);padding:.75rem 1rem;
  color:#fff;font-family:'DM Sans',sans-serif;font-size:.88rem;
  outline:none;transition:border-color .2s;resize:none;
}
.cform input::placeholder,.cform textarea::placeholder{color:rgba(255,255,255,.28)}
.cform input:focus,.cform textarea:focus{border-color:var(--teal2)}
.cform textarea{height:125px}
.csend{
  font-size:.8rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
  padding:.68rem 1.4rem;border-radius:100px;width:fit-content;
  background:var(--teal2);color:#fff;border:none;cursor:pointer;
  transition:background .2s,transform .15s;
}
.csend:hover{background:#0c7a5e;transform:translateY(-2px)}
.csent{color:var(--teal2);font-size:.84rem;margin-top:.4rem;font-weight:500}

footer{
  background:var(--ink);border-top:1px solid rgba(255,255,255,.06);
  padding:1.4rem clamp(1.25rem,6vw,3.5rem);
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
}
footer p,footer a{font-size:.76rem;color:rgba(255,255,255,.32);text-decoration:none}
footer a{transition:color .2s}
footer a:hover{color:var(--teal2)}
.footer-links{display:flex;gap:1.5rem}

@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr}
  .hero-avatar{display:none}
  .about-grid{grid-template-columns:1fr}
  .exp-layout{grid-template-columns:1fr}
  .exp-tabs{flex-direction:row;overflow-x:auto;padding-bottom:.5rem;gap:.25rem}
  .exp-tab{white-space:nowrap;border-left:none;border-bottom:2px solid transparent;border-radius:var(--r) var(--r) 0 0}
  .exp-tab.active{border-left-color:transparent;border-bottom-color:var(--teal)}
  .contact-grid{grid-template-columns:1fr}
  .edu-item{grid-template-columns:1fr}
  .edu-year{padding-top:0}
  .edu-mods{grid-template-columns:1fr}
  .nav-links,.nav-hire{display:none}
  .burger{display:flex}
}
@media(max-width:500px){
  .hero-stats{gap:1.2rem}
  .about-qualities{grid-template-columns:1fr}
}
`;

const NAV = ["About","Skills","Experience","Projects","Education","Certifications","Activities","Contact"];

const SKILLS = [
  {icon:"☕",bg:"#fff3e0",label:"Languages",pills:["Java","JavaScript","TypeScript","Python","SQL"]},
  {icon:"⚙️",bg:"#e8f5e9",label:"Backend Engineering",pills:["Spring Boot","Node.js","Express.js","FastAPI","RESTful APIs","JWT","RBAC","Middleware"]},
  {icon:"🖥️",bg:"#e3f2fd",label:"Frontend Development",pills:["React.js","Angular","HTML5","CSS3","Responsive Design","CORS"]},
  {icon:"🗄️",bg:"#fce4ec",label:"Databases",pills:["PostgreSQL","MySQL","MongoDB","Schema Design","Query Optimisation"]},
  {icon:"☁️",bg:"#e8eaf6",label:"Cloud & DevOps",pills:["AWS EC2","AWS S3","AWS RDS","AWS Lambda","Docker","GitHub Actions","CI/CD","Vercel"]},
  {icon:"🧪",bg:"#f3e5f5",label:"Testing",pills:["Jest","Supertest","JUnit","Mockito","Postman","API Testing"]},
  {icon:"🧠",bg:"#e0f7fa",label:"AI & Big Data",pills:["LangChain","LangGraph","PySpark","Spark MLlib","Apache Spark","LLM Integration"]},
  {icon:"📐",bg:"#fff8e1",label:"CS & System Design",pills:["DSA","OOP","System Design","REST Architecture","UML","Database Design"]},
];

const EXPS = [
  {tab:"AFL Analyst",title:"AFL Analyst",company:"Statsperform · Limerick, Ireland",date:"March 2026 – Present",bullets:["Perform live and post-game statistical analysis of AFL matches using Statsperform data capture tools.","Validate and quality-check real-time sports data feeds ensuring accuracy of player tracking metrics and game statistics.","Deliver clean structured data outputs consumed by downstream sports intelligence and analytics products.","Apply strong quantitative reasoning and attention to data quality in a deadline-driven live environment."]},
  {tab:"Agentic AI Intern",title:"Agentic AI Intern",company:"Innomatics Research Labs · Remote",date:"February 2026 – April 2026",bullets:["Designed and implemented backend APIs integrating LLM-based reasoning (LangChain, LangGraph) with structured relational databases.","Built Python/FastAPI backend services powering multi-step agentic AI workflows with structured JSON data models.","Debugged and tested backend API integrations with AWS cloud services; collaborated cross-functionally on technical specifications.","Contributed to backend architecture discussions and feature planning within an agile development environment."]},
  {tab:"Backend Engineering",title:"Backend Engineering & System Design",company:"Personal / Academic Projects",date:"2025 – Present",bullets:["Designed secure RESTful services using Java and Spring Boot following layered architecture (Controller–Service–Repository).","Implemented JWT-based authentication and role-based access control (RBAC) for protected routes and secure API access.","Architected PostgreSQL schemas supporting user workflows and transaction-style operations.","Deployed production-ready services on AWS EC2 with RDS integration."]},
  {tab:"Citi Simulation",title:"Citi ICG Technology – Software Development Simulation",company:"Forage · February 2026",date:"Credential ID: cWmfysfnQoCJnLJPF",bullets:["Modelled loan lifecycle workflows using UML state diagrams to represent system behaviour and transition states.","Produced technical documentation and API usage examples to simulate backend service design within financial systems."]},
  {tab:"Head Placement",title:"Head Placement Coordinator",company:"Indira University · Pune, India",date:"June 2024 – August 2025",bullets:["Managed structured placement data for 500+ students, coordinating with 50+ HR professionals across organisations.","Worked under university leadership to bring companies for campus recruitment, improving placement outcomes by 13%.","Planned and executed campus drives, handled event logistics, and generated structured reports."]},
];

const PROJECTS = [
  {icon:"📊",ibg:"#e8f5e9",title:"Loan Default Prediction",date:"Mar 2026 – Present",desc:"Big data group project processing large-scale financial datasets using PySpark. Training and comparing Logistic Regression, Random Forest, and Gradient Boosting classifiers via Spark MLlib, evaluated with AUC-ROC and F1-score metrics.",stack:["Python","PySpark","Spark MLlib","Apache Spark"],sbg:["#e8f5e9","#e8f5e9","#e8eaf6","#e8eaf6"],link:"https://github.com/sakshinandgude6-web"},
  {icon:"🛒",ibg:"#fff3e0",title:"E-Commerce Backend System",date:"Feb – Mar 2026",desc:"Production-grade RESTful backend in Java and Spring Boot with layered architecture. JWT authentication, RBAC, normalised PostgreSQL schema covering users, orders, and transactions. Deployed on AWS EC2 with RDS integration.",stack:["Java","Spring Boot","PostgreSQL","JWT","AWS EC2"],sbg:["#fff3e0","#fff3e0","#e3f2fd","#e8f5e9","#e8eaf6"],link:"https://github.com/sakshinandgude6-web"},
  {icon:"🔗",ibg:"#e3f2fd",title:"URL Shortener Web App",date:"Dec 2025 – Jan 2026",desc:"Full-stack application with React frontend, Node.js/Express backend, and MongoDB. Secure JWT auth, middleware route protection, end-to-end automated testing, and CI/CD deployment to Render and Vercel.",stack:["React","Node.js","Express","MongoDB","CI/CD"],sbg:["#e3f2fd","#e8f5e9","#e8f5e9","#fce4ec","#e8eaf6"],link:"https://github.com/sakshinandgude6-web"},
  {icon:"🖼️",ibg:"#f3e5f5",title:"Image Processing Application",date:"Feb 2026",desc:"Full-stack image pipeline — React frontend, Node.js/Express backend, AWS S3 storage. Hash-based caching with Node.js crypto, Multer/Sharp image transformations, and comprehensive Jest/Supertest test suite.",stack:["React","Node.js","AWS S3","Sharp","Jest"],sbg:["#e3f2fd","#e8f5e9","#e8eaf6","#f3e5f5","#e8f5e9"],link:"https://github.com/sakshinandgude6-web"},
  {icon:"🏨",ibg:"#fff8e1",title:"Hotel Booking Analysis",date:"MSc Project – 2025",desc:"End-to-end EDA on real-world hotel booking dataset. Cleaned and analysed booking patterns, cancellation rates, and seasonal revenue trends using Python and Pandas with structured business insight reporting.",stack:["Python","Pandas","Matplotlib","Business Analytics"],sbg:["#fff3e0","#e8f5e9","#e3f2fd","#fce4ec"],link:"https://github.com/sakshinandgude6-web"},
  {icon:"👤",ibg:"#e8eaf6",title:"Personal Portfolio Website",date:"Sep 2025",desc:"Responsive developer portfolio in React with modular component architecture, smooth scrolling navigation, performance-optimised asset loading, and mobile-first responsive layout.",stack:["React","HTML5","CSS3","Vercel"],sbg:["#e3f2fd","#fff3e0","#fce4ec","#e8eaf6"],link:"https://my-portfolio-ohs7.onrender.com"},
];

const EDUCATION = [
  {year:"2025 – 2026",sub:"Expected Sep 2026",degree:"MSc Business Analytics",inst:"University of Limerick, Ireland",grade:"In Progress",gbg:"var(--navy-pale)",gc:"var(--navy)",mods:["Data & Analytical Decision Making","Statistics for Data Analytics","Database Systems (Relational & NoSQL)","Machine Learning & Applications","Project Management in Practice","Applied Big Data & Visualisation","Data Governance & Ethics","Applied Econometrics for Business","Digital Organisations & Markets","Leadership, Influence & Change"]},
  {year:"2022 – 2025",sub:"",degree:"Bachelor of Computer Applications (Honours)",inst:"Savitribai Phule Pune University, India",grade:"CGPA: 9.32 / 10",gbg:"var(--teal-pale)",gc:"var(--teal)",mods:["Data Structures & Algorithms","Software Engineering","Java & Advanced Java","Machine Learning","Python & Advanced Python","Object-Oriented Software Engineering","Database Management Systems","Big Data & Cloud Computing","Software Testing","Operating Systems"]},
  {year:"2020 – 2022",sub:"",degree:"Higher Secondary Certificate — Science",inst:"Jahind Junior College, Pimpri, Pune",grade:"73.17%",gbg:"var(--amber-pale)",gc:"var(--amber)",mods:[]},
  {year:"2019 – 2020",sub:"",degree:"Secondary School Certificate (SSC)",inst:"Sindhu Vidya Bhavan, Aundh, Pune",grade:"92.20%",gbg:"var(--purple-pale)",gc:"var(--purple)",mods:[]},
];

const CERTS = [
  {group:"Business Analytics & Business Analysis",icon:"📊",ibg:"#e8eaf6",items:[{n:"Microsoft Business Analyst Professional Certificate",m:"Microsoft · Oct 2025",id:"2FSEGQY3FHY7"},{n:"Power Platform in Business Analysis",m:"Microsoft · Sep 2025",id:"MHWCTO6YWZFY"},{n:"Requirements Gathering in Business Analysis",m:"Microsoft · Sep 2025",id:"ZE2T7XUIHIRP"},{n:"Data & Business Process Modelling with Microsoft Visio",m:"Microsoft · Jul 2025",id:"1W1RBI65DR7F"},{n:"Business Analysis Fundamentals",m:"Microsoft · Jul 2025",id:"NIIEO55P4FRW"},{n:"Data for Business Analysts Using Microsoft Excel",m:"Microsoft · Jul 2025",id:"8DUH25PJER5W"}]},
  {group:"Cloud & DevOps",icon:"☁️",ibg:"#e8eaf6",items:[{n:"AWS Cloud Practitioner Essentials",m:"Amazon Web Services · Feb 2026",id:"1AXAQR9GA0CY"},{n:"Introduction to Cloud Computing",m:"IBM · Nov 2025",id:"DIRPHWI0Q9QO"}]},
  {group:"Full-Stack Development",icon:"🖥️",ibg:"#e3f2fd",items:[{n:"Developing Back-End Apps with Node.js & Express",m:"IBM · Jan 2026",id:"UNJ2NWCQVCSG"},{n:"Developing Front-End Apps with React",m:"IBM · Jan 2026",id:"JQFBGO4MZ4D1"},{n:"Getting Started with Git and GitHub",m:"IBM · Dec 2025",id:"TCM6NKRI5IBR"},{n:"Introduction to HTML, CSS & JavaScript",m:"IBM · Nov 2025",id:"ZQRE46B8FIUE"}]},
  {group:"Software Engineering & AI",icon:"🤖",ibg:"#e8f5e9",items:[{n:"Python for Data Science, AI & Development",m:"IBM · Jan 2026",id:"VOUN368RLDTO"},{n:"Introduction to Software Engineering",m:"IBM · Nov 2025",id:"08LPUVXAH2RI"},{n:"Citi ICG Technology – Software Development Simulation",m:"Forage · Feb 2026",id:"cWmfysfnQoCJnLJPF"}]},
];

const ACTIVITIES = [
  {icon:"🎓",title:"Head Placement Coordinator",org:"Indira University · Jun 2024 – Aug 2025",bullets:["Managed placement data for 500+ students, coordinating with 50+ HR professionals across organisations.","Improved placement outcomes by 13% through structured recruitment drives and company partnerships.","Planned and executed campus drives, handled logistics, and generated structured reports."]},
  {icon:"🧑‍💼",title:"Class Representative",org:"BCA 2nd & 3rd Year · Indira University",bullets:["Communication bridge between faculty and 60+ students ensuring academic clarity and coordination.","Addressed academic concerns and represented student interests professionally in committee meetings.","Strengthened leadership, accountability, and decision-making skills."]},
  {icon:"🎤",title:"Event Anchor & Coordinator",org:"Indira University · 2022 – 2025",bullets:["Anchored and coordinated 8–10 academic and cultural events, managing stage flow and live transitions.","Developed strong public speaking, confidence, and real-time adaptability skills.","Contributed to event planning, scheduling, and smooth execution of university-level programmes."]},
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

function Nav({ open, setOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <a className="nav-logo" href="#hero">SN<em>.</em></a>
        <ul className="nav-links">
          {NAV.map(n => <li key={n}><a href={`#${n.toLowerCase()}`}>{n}</a></li>)}
        </ul>
        <a className="nav-hire" href="#contact">Hire Me</a>
        <button className={`burger${open?" open":""}`} onClick={() => setOpen(o=>!o)} aria-label="menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mob-menu${open?" open":""}`}>
        {NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>)}
        <a className="btn-p" href="#contact" onClick={() => setOpen(false)}>Hire Me</a>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg"/>
      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-dot"/>
            Available for Sept 2026 roles · Limerick, Ireland
          </div>
          <h1 className="hero-name">Sakshi<br/><span>Nandgude</span></h1>
          <p className="hero-role">
            <strong>Software Engineer</strong> focused on scalable systems, RESTful APIs &amp; modern full-stack development.<br/>
            MSc Business Analytics · BCA 9.32 CGPA · AWS Certified · LangChain · PySpark
          </p>
          <div className="hero-tags">
            {["Java","Spring Boot","Node.js","React","PostgreSQL","AWS","LangChain","PySpark","Python","Docker"].map(t => (
              <span className="htag" key={t}>{t}</span>
            ))}
          </div>
          <div className="hero-btns">
            <a className="btn-p" href="#projects">View Projects</a>
            <a className="btn-o" href="#contact">Get In Touch</a>
            <a className="btn-o" href="https://github.com/sakshinandgude6-web" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <div className="hero-stats">
            {[["9.32","CGPA / 10"],["6+","Projects Built"],["15+","Certifications"],["500+","Students Placed"]].map(([n,l]) => (
              <div key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-avatar">SN</div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="section-label">About Me</div>
        <h2 className="section-title">Who I Am</h2>
        <div className="about-grid reveal">
          <div>
            <div className="about-card">
              <h4>Quick Info</h4>
              {[["Location","Limerick, Ireland"],["MSc","Business Analytics, UL 2026"],["Undergrad CGPA","9.32 / 10 (BCA)"],["Current Role","AFL Analyst · Statsperform"],["Email","sakshinandgude6@gmail.com"],["Status","Open to Sept 2026 roles"]].map(([k,v])=>(
                <div className="info-row" key={k}><span>{k}</span><span>{v}</span></div>
              ))}
            </div>
            <div className="about-qualities">
              {["System Design","Clean Architecture","Security-First","Cloud Deployment","Agile Mindset","Quick Learner"].map(q=>(
                <div className="quality" key={q}>{q}</div>
              ))}
            </div>
          </div>
          <div className="about-text">
            <p>I'm a Computer Science graduate and software engineer focused on building <strong>scalable, secure, and production-ready systems</strong>. I enjoy designing clean architectures, developing RESTful APIs, and implementing authentication and authorisation flows that are reliable and maintainable.</p>
            <p>My experience spans <strong>Java, Spring Boot, Node.js, React</strong>, and cloud deployment on AWS. I've built and deployed backend services with layered architecture, PostgreSQL schema design, JWT-based security, and performance-focused optimisations such as caching and structured data modelling.</p>
            <p>I'm currently working as an <strong>AFL Analyst at Statsperform</strong> and completing my <strong>MSc in Business Analytics at the University of Limerick</strong>, where my big data project uses Apache Spark and PySpark for loan default prediction at scale.</p>
            <p>Beyond writing code, I value clarity in technical decisions, clean separation of concerns, and thoughtful problem-solving — building systems that are <strong>maintainable, secure, and aligned with real-world requirements</strong>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="section-inner">
        <div className="section-label">Technical Skills</div>
        <h2 className="section-title">What I Work With</h2>
        <p className="section-sub">Technologies and tools I use to build production-grade systems.</p>
        <div className="skills-grid">
          {SKILLS.map((s,i) => (
            <div className="skill-card reveal" key={s.label} style={{transitionDelay:`${i*55}ms`}}>
              <div className="skill-icon" style={{background:s.bg}}>{s.icon}</div>
              <h3>{s.label}</h3>
              <div className="pills">{s.pills.map(p=><span className="pill" key={p}>{p}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [active, setActive] = useState(0);
  return (
    <section id="experience">
      <div className="section-inner">
        <div className="section-label">Experience</div>
        <h2 className="section-title">Where I've Worked</h2>
        <p className="section-sub">Professional roles, internships, and technical experience.</p>
        <div className="exp-layout reveal">
          <div className="exp-tabs">
            {EXPS.map((e,i) => (
              <button key={e.tab} className={`exp-tab${active===i?" active":""}`} onClick={()=>setActive(i)}>{e.tab}</button>
            ))}
          </div>
          <div>
            {EXPS.map((e,i) => (
              <div key={e.tab} className={`exp-panel${active===i?" active":""}`}>
                <div className="exp-title">{e.title}</div>
                <div className="exp-company">{e.company}</div>
                <div className="exp-date">{e.date}</div>
                <ul className="exp-buls">{e.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <div className="section-inner">
        <div className="section-label">Projects</div>
        <h2 className="section-title">Things I've Built</h2>
        <p className="section-sub">Production-deployed systems and analytical projects — all with real code.</p>
        <div className="proj-grid">
          {PROJECTS.map((p,i) => (
            <div className="proj-card reveal" key={p.title} style={{transitionDelay:`${i*65}ms`}}>
              <div className="proj-header">
                <div className="proj-icon" style={{background:p.ibg}}>{p.icon}</div>
                <a className="proj-link-btn" href={p.link} target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
              <div className="proj-title">{p.title}</div>
              <div className="proj-date">{p.date}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map((t,j)=><span className="stag" key={t} style={{background:p.sbg[j]||"#f1f1f1",color:"#333"}}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EduItem({item}) {
  const [open,setOpen] = useState(false);
  return (
    <div className="edu-item reveal">
      <div className="edu-year">{item.year}{item.sub&&<small>{item.sub}</small>}</div>
      <div>
        <div className="edu-degree">{item.degree}</div>
        <div className="edu-inst">{item.inst}</div>
        <span className="edu-grade" style={{background:item.gbg,color:item.gc,border:`1px solid ${item.gc}33`}}>{item.grade}</span>
        {item.mods.length>0&&(
          <>
            <button className="edu-toggle" onClick={()=>setOpen(o=>!o)}>{open?"Hide modules ▲":"Show modules ▼"}</button>
            {open&&<div className="edu-mods">{item.mods.map(m=><div className="edu-mod" key={m}>{m}</div>)}</div>}
          </>
        )}
      </div>
    </div>
  );
}

function Education() {
  return (
    <section id="education">
      <div className="section-inner">
        <div className="section-label">Education</div>
        <h2 className="section-title">Academic Background</h2>
        <p className="section-sub">From school distinction to a postgraduate degree in Ireland.</p>
        <div className="edu-timeline">{EDUCATION.map(e=><EduItem key={e.degree} item={e}/>)}</div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications">
      <div className="section-inner">
        <div className="section-label">Certifications</div>
        <h2 className="section-title">Credentials</h2>
        <p className="section-sub">15+ verified certifications across cloud, development, and business analytics.</p>
        <div className="cert-groups">
          {CERTS.map(g=>(
            <div className="reveal" key={g.group}>
              <div className="cert-group-title">{g.group}</div>
              <div className="cert-list">
                {g.items.map(c=>(
                  <div className="cert-card" key={c.id}>
                    <div className="cert-badge" style={{background:g.ibg}}>{g.icon}</div>
                    <div>
                      <div className="cert-name">{c.n}</div>
                      <div className="cert-meta">{c.m}</div>
                      <div className="cert-id">ID: {c.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Activities() {
  return (
    <section id="activities">
      <div className="section-inner">
        <div className="section-label">Leadership & Activities</div>
        <h2 className="section-title">Beyond The Code</h2>
        <p className="section-sub">Leadership, coordination, and public-facing roles.</p>
        <div className="act-grid">
          {ACTIVITIES.map((a,i)=>(
            <div className="act-card reveal" key={a.title} style={{transitionDelay:`${i*80}ms`}}>
              <div className="act-icon">{a.icon}</div>
              <div className="act-title">{a.title}</div>
              <div className="act-org">{a.org}</div>
              <ul className="act-buls">{a.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form,setForm] = useState({name:"",email:"",message:""});
  const [sent,setSent] = useState(false);
  const submit = e => {
    e.preventDefault();
    const s = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const b = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:sakshinandgude6@gmail.com?subject=${s}&body=${b}`;
    setSent(true); setTimeout(()=>setSent(false),5000);
  };
  const links = [
    {icon:"✉️",label:"Email",val:"sakshinandgude6@gmail.com",href:"mailto:sakshinandgude6@gmail.com"},
    {icon:"📞",label:"Phone",val:"+353 858 083 112",href:"tel:+353858083112"},
    {icon:"💼",label:"LinkedIn",val:"linkedin.com/in/sakshi-nandgude-2457a4302",href:"https://www.linkedin.com/in/sakshi-nandgude-2457a4302/"},
    {icon:"💻",label:"GitHub",val:"github.com/sakshinandgude6-web",href:"https://github.com/sakshinandgude6-web"},
    {icon:"📍",label:"Location",val:"Limerick, Ireland",href:"#"},
  ];
  return (
    <section id="contact">
      <div className="section-inner">
        <div className="section-label">Contact</div>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-sub">Open to graduate roles starting September 2026. Let's connect.</p>
        <div className="contact-grid reveal">
          <div className="contact-links">
            {links.map(l=>(
              <a className="clink" key={l.label} href={l.href} target={l.href.startsWith("http")?"_blank":"_self"} rel="noreferrer">
                <div className="clink-icon">{l.icon}</div>
                <div><div className="clink-label">{l.label}</div><div className="clink-val">{l.val}</div></div>
              </a>
            ))}
          </div>
          <form className="cform" onSubmit={submit}>
            <input type="text" placeholder="Your name" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
            <input type="email" placeholder="Your email" required value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
            <textarea placeholder="Your message…" required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/>
            <button className="csend" type="submit">Send Message →</button>
            {sent&&<p className="csent">✓ Opening your mail client…</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen,setMenuOpen] = useState(false);
  useReveal();

  useEffect(()=>{
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return ()=>document.head.removeChild(el);
  },[]);

  useEffect(()=>{
    const fn = ()=>{ if(window.innerWidth>900) setMenuOpen(false); };
    window.addEventListener("resize",fn);
    return ()=>window.removeEventListener("resize",fn);
  },[]);

  return (
    <>
      <Nav open={menuOpen} setOpen={setMenuOpen}/>
      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Experience/>
        <Projects/>
        <Education/>
        <Certifications/>
        <Activities/>
        <Contact/>
      </main>
      <footer>
        <p>© 2026 Sakshi Vijay Nandgude · Built with React</p>
        <div className="footer-links">
          <a href="https://github.com/sakshinandgude6-web" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/sakshi-nandgude-2457a4302/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:sakshinandgude6@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}
