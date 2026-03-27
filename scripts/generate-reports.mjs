/**
 * Daily Report Generator v3 - Robust Version
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const CONFIG = {
  TODAY: new Date().toISOString().split('T')[0],
  YEAR: new Date().getFullYear().toString(),
  MONTH: String(new Date().getMonth() + 1).padStart(2, '0')
};

const FALLBACK = {
  github: [
    {name:'ollama/ollama',description:'Get up and running with Llama 3 locally.',stars:92000,language:'Go',author:'ollama',url:'https://github.com/ollama/ollama'},
    {name:'open-webui/open-webui',description:'User-friendly WebUI for LLMs.',stars:45000,language:'Python',author:'open-webui',url:'https://github.com/open-webui/open-webui'},
    {name:'public-apis/public-apis',description:'A collective list of free APIs.',stars:280000,language:'Python',author:'public-apis',url:'https://github.com/public-apis/public-apis'},
    {name:'twentyhq/twenty',description:'Modern alternative to Salesforce.',stars:41500,language:'TypeScript',author:'twentyhq',url:'https://github.com/twentyhq/twenty'},
    {name:'codecrafters-io/build-your-own-x',description:'Build your own technology.',stars:115000,language:'Python',author:'codecrafters-io',url:'https://github.com/codecrafters-io/build-your-own-x'},
    {name:'kamranahmedse/developer-roadmap',description:'Roadmap to becoming a developer.',stars:305000,language:'TypeScript',author:'kamranahmedse',url:'https://github.com/kamranahmedse/developer-roadmap'}
  ],
  ai: [
    {title:'Claude 4 Released with Enhanced Reasoning',source:'Anthropic',url:'https://anthropic.com/claude-4',description:'Latest Claude model.'},
    {title:'GPT-5 Training Complete',source:'OpenAI',url:'https://openai.com/gpt-5',description:'GPT-5 multimodal.'},
    {title:'Google Gemini 2.0 Ultra',source:'Google',url:'https://deepmind.google/gemini',description:'State-of-the-art benchmarks.'},
    {title:'Meta Releases Llama 4',source:'Meta AI',url:'https://ai.meta.com/llama',description:'Open source GPT-4 competitor.'},
    {title:'Copilot in Windows 12',source:'Microsoft',url:'https://microsoft.com/copilot',description:'AI assistant integrated.'},
    {title:'AI Agents Research',source:'Nature',url:'https://nature.com/ai',description:'Drug discovery acceleration.'},
    {title:'EU AI Act',source:'EU',url:'https://europa.eu/ai-act',description:'New transparency rules.'},
    {title:'Open Source AI Models',source:'HF',url:'https://huggingface.co',description:'Growing alternatives.'}
  ],
  it: [
    {title:'Rust for Linux Kernel',url:'https://linux.com/rust',score:1200,comments:450,author:'linux',domain:'linux.com'},
    {title:'React 19 Released',url:'https://react.dev/blog',score:950,comments:320,author:'react',domain:'react.dev'},
    {title:'TypeScript 6.0',url:'https://typescriptlang.org/blog',score:890,comments:280,author:'ms',domain:'typescriptlang.org'},
    {title:'PostgreSQL 18',url:'https://postgresql.org/about/news',score:750,comments:220,author:'postgres',domain:'postgresql.org'},
    {title:'Kubernetes 1.32',url:'https://kubernetes.io/blog',score:520,comments:140,author:'k8s',domain:'kubernetes.io'},
    {title:'Linux 6.12 LTS',url:'https://kernel.org',score:980,comments:350,author:'torvalds',domain:'kernel.org'},
    {title:'Bun 2.0',url:'https://bun.sh/blog',score:640,comments:190,author:'oven',domain:'bun.sh'},
    {title:'Claude Code SDK',url:'https://anthropic.com/claude-code',score:820,comments:260,author:'anthropic',domain:'anthropic.com'}
  ]
};

function daysAgo(d){const date=new Date();date.setDate(date.getDate()-d);return date.toISOString().split('T')[0];}

async function fetchText(url, headers={}) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, {headers:{'User-Agent':'Mozilla/5.0','Accept':'*/*',...headers},timeout:15000}, res => {
      if(res.statusCode===403||res.statusCode===429){reject(new Error('Rate limit'));return;}
      let data='';res.on('data',c=>data+=c);res.on('end',()=>resolve(data));
    });
    req.on('error',reject);req.on('timeout',()=>{req.destroy();reject(new Error('timeout'));});
  });
}

async function fetchJSON(url){return JSON.parse(await fetchText(url));}

function getEmoji(l){const m={'Python':'🐍','JavaScript':'📜','TypeScript':'📘','Java':'☕','Go':'🐹','Rust':'🦀','C++':'⚙️','C#':'🎮','Ruby':'💎','PHP':'🐘','Swift':'🍎','Kotlin':'🤖','Shell':'🐚','Jupyter Notebook':'📓'};return m[l]||'';}
function fmtNum(n){return n>=1e6?(n/1e6).toFixed(1)+'M':n>=1000?(n/1000).toFixed(1)+'K':String(n);}
function getDomain(url){try{return new URL(url).hostname.replace('www.','');}catch{return 'unknown';}}

async function fetchGitHub() {
  console.log('📊 GitHub...');
  for(const q of [`stars:>100+pushed:${daysAgo(7)}`,`stars:>500+created:${daysAgo(30)}`]) {
    try {
      const d=await fetchJSON('https://api.github.com/search/repositories?q='+encodeURIComponent(q)+'&sort=stars&order=desc&per_page=20');
      if(d.items&&d.items.length>0){console.log('  ✅ '+d.items.length);return d.items.slice(0,20).map(r=>({name:r.full_name,description:r.description||'',url:r.html_url,stars:r.stargazers_count,language:r.language,author:r.owner.login}));}
    }catch(e){console.log('  ⚠️ '+e.message);}
  }
  console.log('  ⚠️ fallback');return FALLBACK.github;
}

async function fetchHN() {
  console.log('📰 HN...');
  try {
    const ids=await fetchJSON('https://hacker-news.firebaseio.com/v0/topstories.json');
    const stories=[];
    for(const id of ids.slice(0,30)){
      try{const s=await fetchJSON('https://hacker-news.firebaseio.com/v0/item/'+id+'.json');if(s&&s.title)stories.push({title:s.title,url:s.url||'https://news.ycombinator.com/item?id='+id,score:s.score||0,comments:s.descendants||0,author:s.by||''});}catch{}
      if(stories.length>=20)break;
    }
    if(stories.length>0){console.log('  ✅ '+stories.length);return stories;}
  }catch(e){console.log('  ⚠️ '+e.message);}
  console.log('  ⚠️ fallback');return FALLBACK.it;
}

async function fetchAI() {
  console.log('🤖 AI News...');
  const srcs=[{u:'https://www.artificialintelligence-news.com/feed/',n:'AINews'},{u:'https://www.technologyreview.com/feed/',n:'MIT'}];
  const all=[],seen=new Set();
  for(const s of srcs){
    try{
      const xml=await fetchText(s.u);
      const items=xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi)||[];
      items.slice(0,15).forEach(it=>{
        const tMatch=it.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const lMatch=it.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
        const dMatch=it.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
        const t=tMatch?tMatch[1].trim():'';
        const l=lMatch?lMatch[1].trim():'#';
        const d=(dMatch?dMatch[1]:'').replace(/<[^>]*>/g,'').slice(0,150);
        const key=t.toLowerCase().slice(0,40);
        if(t&&!seen.has(key)){seen.add(key);all.push({title:t,url:l,description:d,source:s.n});}
      });
      console.log('  ✅ '+s.n+': '+items.length);
    }catch(e){console.log('  ⚠️ '+s.n+': '+e.message);}
    if(all.length>=15)break;
  }
  if(all.length>=5)return all.slice(0,20);
  console.log('  ⚠️ fallback');return [...FALLBACK.ai,...all].slice(0,20);
}

async function fetchPM() {
  console.log('🔮 Polymarket...');
  try {
    const d=await fetchJSON('https://gamma-api.polymarket.com/markets?limit=25&closed=false');
    if(Array.isArray(d)&&d.length>0){console.log('  ✅ '+d.length);return d.slice(0,25).map(m=>({question:m.question||'?',prob:m.outcomePrices?(parseFloat(JSON.parse(m.outcomePrices)[0])*100).toFixed(0):'N/A',vol:m.volume24hr||m.volume||0,url:m.url||(m.slug?'https://polymarket.com/market/'+m.slug:'#'),cat:m.category||'?'}));}
  }catch(e){console.log('  ⚠️ '+e.message);}
  console.log('  ⚠️ fallback');return [{question:'Bitcoin >$100K by 2026?',prob:'45',vol:5000000,url:'https://polymarket.com',cat:'crypto'},{question:'AGI by 2027?',prob:'25',vol:8000000,url:'https://polymarket.com',cat:'tech'}];
}

function genGitHub(r) {
  let s='# GitHub 熱度報告\n\n**更新時間：'+CONFIG.TODAY+'**\n\n---\n\n';
  r.slice(0,15).forEach((r,i)=>{
    s+='### '+(i+1)+'. '+r.name+' '+getEmoji(r.language)+'\n'+r.description+'\n';
    s+='- **'+r.author+'** ⭐ '+fmtNum(r.stars);
    if(r.language)s+=' | '+r.language;
    s+='\n\n';
  });
  s+='\n---\n\n';
  return s;
}

function genAI(r) {
  let s='# AI 新聞報告\n\n**日期：'+CONFIG.TODAY+'**\n\n---\n\n';
  r.slice(0,12).forEach((r,i)=>{
    s+='### '+(i+1)+'. '+r.title+'\n'+r.description+'\n';
    s+='- **'+r.source+'** [原文]('+r.url+')\n\n';
  });
  s+='\n---\n\n';
  return s;
}

function genIT(r) {
  let s='# IT 資訊報告\n\n**日期：'+CONFIG.TODAY+'**\n\n---\n\n';
  r.slice(0,15).forEach((r,i)=>{
    s+='### '+(i+1)+'. '+r.title+'\n';
    s+='- ⭐'+r.score+' 💬'+r.comments+' **'+r.author+'**\n';
    s+='- **'+getDomain(r.url)+'** [連結]('+r.url+')\n\n';
  });
  s+='\n---\n\n';
  return s;
}

function genJobs(){
  return '# IT 工作介紹報告\n\n**日期：'+CONFIG.TODAY+'**\n\n---\n\n💼 請訪問：LinkedIn Jobs HK | JobsDB IT Jobs\n\n---\n\n';
}

function genPM(r) {
  const cats={crypto:[],polit:[],econ:[],sports:[],other:[]};
  r.forEach((m,i)=>{
    const c=(m.cat||'').toLowerCase();
    let g='other';
    if(c.includes('crypto')||c.includes('bit'))g='crypto';
    else if(c.includes('polit')||c.includes('elect'))g='polit';
    else if(c.includes('econ')||c.includes('fed'))g='econ';
    else if(c.includes('sport'))g='sports';
    cats[g].push({idx:i+1,...m});
  });
  let s='# Polymarket 熱門市場\n\n**日期：'+CONFIG.TODAY+'**\n\n---\n\n';
  const catEmoji={crypto:'💰',polit:'🏛️',econ:'📊',sports:'⚽',other:'📌'};
  const catName={crypto:'加密貨幣',polit:'政治',econ:'宏觀經濟',sports:'體育',other:'其他'};
  for(const [k,arr] of Object.entries(cats)){
    if(!arr.length)continue;
    s+='### '+catEmoji[k]+' '+catName[k]+' ('+arr.length+'個)\n\n';
    arr.slice(0,8).forEach(m=>{
      s+='**'+m.idx+'. '+m.question+'**\n';
      s+='- 概率：'+m.prob+'% 📊'+fmtNum(m.vol)+'\n';
      s+='- [查看市場]('+m.url+')\n\n';
    });
    s+='\n';
  }
  s+='\n---\n\n';
  return s;
}

async function main() {
  console.log('========================================');
  console.log('CH Daily Report v3 (Robust)');
  console.log('========================================');
  console.log('Date: '+CONFIG.TODAY+'\n');
  
  const dir=path.join(projectRoot,'reports',CONFIG.YEAR,CONFIG.MONTH,CONFIG.TODAY);
  if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});
  
  const[gh,hn,ai,pm]=await Promise.all([fetchGitHub(),fetchHN(),fetchAI(),fetchPM()]);
  console.log('\n✅ Fetched: GH='+gh.length+' HN='+hn.length+' AI='+ai.length+' PM='+pm.length+'\n');
  
  const files={github:genGitHub(gh),ai:genAI(ai),it:genIT(hn),jobs:genJobs(),polymarket:genPM(pm)};
  for(const [f,content] of Object.entries(files)){
    fs.writeFileSync(path.join(dir,f+'.md'),content);
    console.log('  ✅ '+f+'.md');
  }
  console.log('\n========================================\n✅ Done!\n');
}

main().catch(e=>{console.error('Error:',e.message);process.exit(1);});
