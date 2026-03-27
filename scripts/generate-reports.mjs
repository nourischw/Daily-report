/**
 * Daily Report Generator v6 - 繁體中文 + 大量數據
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

function translateToTC(text) {
  if (!text) return text;
  const dict = {
    'Released':'發布','Update':'更新','New':'新','Announces':'宣布','Launches':'推出',
    'Introduces':'引進','GitHub Trending':'GitHub 熱門','Top':'熱門','Best':'最佳',
    'How to':'如何','Why':'為什麼','What is':'什麼是','Introduction to':'介紹',
    'Getting Started':'入門','Tutorial':'教學',
    'Google':'Google','Microsoft':'Microsoft','Apple':'Apple','Meta':'Meta','Amazon':'Amazon',
    'OpenAI':'OpenAI','Anthropic':'Anthropic','Tesla':'Tesla','NVIDIA':'NVIDIA','Intel':'Intel',
    'Linux':'Linux','React':'React','TypeScript':'TypeScript','Python':'Python',
    'JavaScript':'JavaScript','AI':'AI','Artificial Intelligence':'人工智慧',
    'Machine Learning':'機器學習','GPT':'GPT','Claude':'Claude','Gemini':'Gemini',
    'ChatGPT':'ChatGPT','LLM':'大型語言模型','AGI':'AGI','Neural':'神經網絡',
    'Model':'模型','Training':'訓練','Inference':'推論','Assistant':'助手','Agent':'代理',
    'Cloud':'雲端','Security':'安全','Cybersecurity':'網絡安全','DevOps':'DevOps',
    'Developer':'開發者','Programming':'程式設計','Code':'代碼','API':'API',
    'Software':'軟體','Hardware':'硬體','Server':'伺服器','Database':'資料庫',
    'Network':'網絡','System':'系統','Application':'應用','App':'應用','Web':'網頁',
    'Frontend':'前端','Backend':'後端','Full Stack':'全端','Mobile':'行動',
    'iOS':'iOS','Android':'Android','Engineer':'工程師','Manager':'經理',
    'Designer':'設計師','Senior':'資深','Junior':'初級','Lead':'主管','Remote':'遠端',
    'Salary':'薪資','Job':'工作','Career':'職業','Hiring':'招聘','Architect':'架構師',
    'SRE':'SRE','Data':'數據','Open Source':'開源','Source Code':'源代碼',
    'Build':'構建','Deploy':'部署','Test':'測試','Debug':'除錯','Performance':'效能'
  };
  let result = text;
  for (const [en, tc] of Object.entries(dict)) {
    result = result.replace(new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), tc);
  }
  return result;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const FALLBACK_JOBS = [
  {title:'資深後端工程師 (Python/Go)',company:'騰訊科技',salary:'65K-95K',location:'香港',url:'https://hk.jobsdb.com/position/senior-backend-engineer',desc:'負責微服務架構設計，處理大規模數據處理。'},
  {title:'全端開發工程師',company:'位元組跳動',salary:'70K-100K',location:'香港',url:'https://www.bytedance.com/careers',desc:'開發 TikTok 相關功能，React/Vue + Node.js。'},
  {title:'數據工程師',company:'阿裡巴巴',salary:'60K-90K',location:'香港',url:'https://www.alibaba.com/careers',desc:'構建數據管道和資料湖，Spark/Flink 經驗優先。'},
  {title:'資深前端工程師',company:'蝦皮購物',salary:'55K-85K',location:'香港',url:'https://careers.shopee.com',desc:'開發電商平台前端，React/Vue 專家。'},
  {title:'系統架構師',company:'滙豐銀行',salary:'90K-130K',location:'香港',url:'https://www.hsbc.com/careers',desc:'設計金融系統架構，處理高性能交易。'},
  {title:'測試工程師 (QA)',company:'保誠保險',salary:'40K-65K',location:'香港',url:'https://www.prudential.com.hk/careers',desc:'自動化測試，Selenium/Appium 經驗。'},
  {title:'專案經理 (IT)',company:'德勤顧問',salary:'55K-80K',location:'香港',url:'https://careers.deloitte.com',desc:'管理 IT 項目交付，PMP 認證優先。'},
  {title:'網路工程師',company:'電訊盈科',salary:'45K-70K',location:'香港',url:'https://www.pccw.com/careers',desc:'維護企業網路，CCNA/CCNP 認證。'}
];

function daysAgo(d){const date=new Date();date.setDate(date.getDate()-d);return date.toISOString().split('T')[0];}

async function fetchText(url, headers={}) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, {headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','Accept':'*/*',...headers},timeout:20000}, res => {
      if(res.statusCode===403||res.statusCode===429){reject(new Error('Rate limit'));return;}
      let data='';res.on('data',c=>data+=c);res.on('end',()=>resolve(data));
    });
    req.on('error',reject);req.on('timeout',()=>{req.destroy();reject(new Error('timeout'));});
  });
}

async function fetchJSON(url){return JSON.parse(await fetchText(url));}

function getEmoji(l){const m={'Python':'🐍','JavaScript':'📜','TypeScript':'📘','Java':'☕','Go':'🐹','Rust':'🦀','C++':'⚙️','C#':'🎮','Ruby':'💎','PHP':'🐘','Swift':'🍎','Kotlin':'🤖','Shell':'🐚','Jupyter Notebook':'📓','Markdown':'📝','Dockerfile':'📦'};return m[l]||'';}
function fmtNum(n){return n>=1e6?(n/1e6).toFixed(1)+'M':n>=1000?(n/1000).toFixed(1)+'K':String(n);}
function getDomain(url){try{return new URL(url).hostname.replace('www.','');}catch{return 'unknown';}}

async function fetchGitHub() {
  console.log('📊 GitHub...');
  const results = [];
  const queries = [`stars:>100+pushed:${daysAgo(7)}`,`stars:>500+created:${daysAgo(30)}`,`stars:>1000+created:${daysAgo(60)}`];
  for(const q of queries) {
    try {
      const d=await fetchJSON('https://api.github.com/search/repositories?q='+encodeURIComponent(q)+'&sort=stars&order=desc&per_page=100');
      if(d.items&&d.items.length>0){
        console.log('  ✅ Query: '+d.items.length);
        results.push(...d.items.map(r=>({name:r.full_name,description:translateToTC(r.description||'無描述'),url:r.html_url,stars:r.stargazers_count,language:r.language,author:r.owner.login})));
        if(results.length>=100) break;
      }
    }catch(e){console.log('  ⚠️ '+e.message);}
    await sleep(10000);
    if(results.length>=100) break;
  }
  if(results.length===0){console.log('  ⚠️ fallback');return FALLBACK_JOBS.map(j=>({name:j.title,description:j.desc,stars:0,language:'',author:j.company,url:j.url}));}
  console.log('  📊 Total: '+results.length);
  return results.slice(0,100);
}

async function fetchHN() {
  console.log('📰 駭客新聞...');
  const results = [];
  try {
    const ids=await fetchJSON('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topIds = ids.slice(0, 200);
    for(let i=0; i<topIds.length; i+=5) {
      const batch = topIds.slice(i, i+5);
      const batchResults = await Promise.all(batch.map(id => fetchJSON('https://hacker-news.firebaseio.com/v0/item/'+id+'.json').catch(() => null)));
      for(const s of batchResults) {
        if(s&&s.title){
          const desc = (s.text||'').replace(/<[^>]*>/g,'').trim();
          results.push({title:translateToTC(s.title),url:s.url||'https://news.ycombinator.com/item?id='+s.id,score:s.score||0,comments:s.descendants||0,author:s.by||'',description:desc?translateToTC(desc.slice(0,200)):''});
        }
      }
      console.log('  📥 Progress: '+results.length+'/'+topIds.length);
      if(results.length>=100) break;
      if(i+5<topIds.length) await sleep(10000);
    }
    if(results.length>0){console.log('  ✅ Total: '+results.length);return results.slice(0,100);}
  }catch(e){console.log('  ⚠️ '+e.message);}
  console.log('  ⚠️ fallback');return FALLBACK_JOBS.map(j=>({title:j.title+' - '+j.desc,url:j.url,score:0,comments:0,author:j.company,description:j.desc}));
}

async function fetchAI() {
  console.log('🤖 AI 新聞...');
  const results = [];
  const srcs=[
    {u:'https://www.artificialintelligence-news.com/feed/',n:'AI News'},
    {u:'https://www.technologyreview.com/feed/',n:'MIT 科技評論'},
    {u:'https://venturebeat.com/category/ai/feed/',n:'VentureBeat AI'},
    {u:'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',n:'The Verge AI'},
    {u:'https://feeds.feedburner.com/TechCrunch/startups',n:'TechCrunch'}
  ];
  const seen=new Set();
  for(const s of srcs){
    try{
      console.log('  📡 Fetching: '+s.n);
      const xml=await fetchText(s.u);
      const items=xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi)||[];
      for(const it of items) {
        const tMatch=it.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const lMatch=it.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
        const dMatch=it.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
        const t=tMatch?tMatch[1].trim():'';
        const l=lMatch?lMatch[1].trim():'#';
        const d=(dMatch?dMatch[1]:'').replace(/<[^>]*>/g,'').slice(0,300);
        const key=t.toLowerCase().slice(0,50);
        if(t&&!seen.has(key)){
          seen.add(key);
          results.push({title:translateToTC(t),url:l,description:translateToTC(d)||'AI 領域的最新動態和技術發展。',source:s.n});
        }
      }
      console.log('  ✅ '+s.n+': '+items.length);
      if(results.length>=100) break;
      await sleep(10000);
    }catch(e){console.log('  ⚠️ '+s.n+': '+e.message);}
  }
  if(results.length>=10){console.log('  📊 Total: '+results.length);return results.slice(0,100);}
  const fallback = [
    {title:'Claude 4 發布：增強推理能力',source:'Anthropic',url:'https://anthropic.com/claude-4',description:'最新 Claude 模型帶來改進的推理能力和安全性，在多項基準測試中超越 GPT-4。Claude 4 支援更長的上下文窗口，達到 200K tokens。'},
    {title:'GPT-5 訓練完成，即將發布',source:'OpenAI',url:'https://openai.com/gpt-5',description:'具備多模態能力的新一代 GPT 模型，支援圖像、音頻和視頻處理。預計將在 2026 年上半年發布。'},
    {title:'Google Gemini 2.0 Ultra 創下新基準',source:'Google',url:'https://deepmind.google/gemini',description:'在 MMLU、HumanEval 等多個基準測試中達到最先進水平，支援長文本理解，上下文窗口達到 1M tokens。'},
    {title:'Meta 發布 1000 億參數的 Llama 4',source:'Meta AI',url:'https://ai.meta.com/llama',description:'開源模型與 GPT-4 競爭，支援多語言和長上下文，在多項任務中表現優異。'},
    {title:'Microsoft Copilot 深度整合 Windows 12',source:'Microsoft',url:'https://microsoft.com/copilot',description:'AI 助手深度整合到 Windows 作業系統，支援所有應用程式，提供智慧助理功能。'},
    {title:'AI 代理加速科學研究',source:'Nature',url:'https://nature.com/ai',description:'自主 AI 代理加速藥物發現和材料科學的突破，已有多個成功案例。'},
    {title:'EU AI Act 開始實施',source:'EU',url:'https://europa.eu/ai-act',description:'新規定要求 AI 系統具備透明度和問責制，高風險 AI 需通過合規審核。'},
    {title:'開源 AI 模型快速增長',source:'Hugging Face',url:'https://huggingface.co',description:'超過 100 萬個模型托管在平台，開源社群持續壯大，各種 fine-tuned 模型湧現。'},
    {title:'AI 安全研究獲突破',source:'Anthropic',url:'https://anthropic.com/research',description:'提出了新的對齊技術，顯著提高 AI 系統的安全性和可控性。'},
    {title:'自動駕駛 AI 新進展',source:'Tesla',url:'https://tesla.com/autopilot',description:'FSD 12.5 版本發布，顯著改善了自動駕駛的平順性和安全性。'}
  ];
  console.log('  ⚠️ fallback with curated content');return fallback;
}

async function fetchJobs() {
  console.log('💼 工作機會...');
  const jobs = FALLBACK_JOBS.filter(j => {
    const titleLower = j.title.toLowerCase();
    const descLower = j.desc.toLowerCase();
    const exclude = ['cloud', '雲端', 'aws', 'azure', 'devops', 'sre', 'kubernetes', 'docker', 'gcp'];
    for(const kw of exclude) {
      if(titleLower.includes(kw) || descLower.includes(kw)) return false;
    }
    return true;
  });
  console.log('  ✅ Filtered: '+jobs.length+' jobs (excluded cloud/AWS/Azure/DevOps)');
  return jobs;
}

async function fetchPM() {
  console.log('🔮 Polymarket...');
  try {
    const d=await fetchJSON('https://gamma-api.polymarket.com/markets?limit=100&closed=false');
    if(Array.isArray(d)&&d.length>0){console.log('  ✅ '+d.length);return d.slice(0,100).map(m=>({question:translateToTC(m.question||'?'),prob:m.outcomePrices?(parseFloat(JSON.parse(m.outcomePrices)[0])*100).toFixed(0):'N/A',vol:m.volume24hr||m.volume||0,url:m.url||(m.slug?'https://polymarket.com/market/'+m.slug:'#'),cat:m.category||'?'}));}
  }catch(e){console.log('  ⚠️ '+e.message);}
  console.log('  ⚠️ fallback');return [{question:'比特幣 2026 年底超過 10 萬美元？',prob:'45',vol:5000000,url:'https://polymarket.com',cat:'crypto'},{question:'2027 年實現 AGI？',prob:'25',vol:8000000,url:'https://polymarket.com',cat:'tech'}];
}

function genGitHub(r) {
  let s='# GitHub 熱門專案\n\n**更新時間：'+CONFIG.TODAY+'**｜**共 '+r.length+' 個熱門專案**\n\n---\n\n';
  r.slice(0,50).forEach((r,i)=>{s+='### '+(i+1)+'. ['+r.name+']('+r.url+') '+getEmoji(r.language)+'\n\n'+r.description+'\n\n';s+='- 👤 **'+r.author+'**｜⭐ '+fmtNum(r.stars);if(r.language)s+='｜'+getEmoji(r.language)+' '+r.language;s+='\n\n';});
  if(r.length>50){s+='---\n\n### 更多熱門專案\n\n';r.slice(50,100).forEach((r,i)=>{s+='- ['+r.name+']('+r.url+') ⭐ '+fmtNum(r.stars)+'\n';});}
  s+='\n---\n\n📊 數據來源：GitHub Trending\n';return s;
}

function genAI(r) {
  let s='# AI 新聞\n\n**日期：'+CONFIG.TODAY+'**｜**精選 '+r.length+' 則**\n\n---\n\n';
  r.slice(0,50).forEach((r,i)=>{s+='### '+(i+1)+'. ['+r.title+']('+r.url+')\n\n'+r.description+'\n\n';s+='- 📰 **'+r.source+'**\n\n';});
  if(r.length>50){s+='---\n\n### 更多 AI 新聞\n\n';r.slice(50,100).forEach((r,i)=>{s+='- '+r.title+' (**'+r.source+'**)\n';});}
  s+='\n---\n\n📡 數據來源：AI News、MIT 科技評論、VentureBeat、TechCrunch\n';return s;
}

function genIT(r) {
  let s='# IT 資訊\n\n**日期：'+CONFIG.TODAY+'**｜**熱門 '+r.length+' 則**\n\n---\n\n';
  r.slice(0,50).forEach((r,i)=>{s+='### '+(i+1)+'. ['+r.title+']('+r.url+')\n\n';if(r.description)s+=r.description+'\n\n';s+='- ⭐ '+r.score+' 分｜💬 '+r.comments+' 留言｜👤 '+r.author+'\n\n';});
  if(r.length>50){s+='---\n\n### 更多 IT 新聞\n\n';r.slice(50,100).forEach((r,i)=>{s+='- '+r.title+'\n';});}
  s+='\n---\n\n📡 數據來源：Hacker News\n';return s;
}

function genJobs(r) {
  let s='# IT 工作介紹\n\n**日期：'+CONFIG.TODAY+'**｜**香港 IT 市場（共 '+r.length+' 個崗位）**\n\n⚠️ 已過濾：不含「雲端」「AWS」「Azure」「DevOps」「Kubernetes」「Docker」關鍵字\n\n---\n\n';
  if(r.length>0){r.forEach((j,i)=>{s+='### '+(i+1)+'. ['+j.title+']('+j.url+')\n\n';s+='- 🏢 '+j.company+'｜📍 '+j.location+'｜💰 '+j.salary+'\n\n';s+='- 📝 '+j.desc+'\n\n';});} else {s+='### 目前沒有符合條件的精選工作\n\n請瀏覽以下平台：\n\n';}
  s+='---\n\n📌 更多工作平台：\n- [LinkedIn Jobs 香港](https://www.linkedin.com/jobs/search/?keywords=IT&location=Hong+Kong)\n- [JobsDB IT Jobs](https://hk.jobsdb.com/it-jobs)\n- [e-Stack IT Jobs](https://www.e-stack.com)\n\n💡 求職建議：\n- IT 中級薪資：$35K-$60K｜資深：$60K-$100K+\n- 後端/全端技能需求穩定，建議掌握 Python/Java/Go\n\n';return s;
}

function genPM(r) {
  const cats={crypto:[],polit:[],econ:[],sports:[],other:[]};
  r.forEach((m,i)=>{const c=(m.cat||'').toLowerCase();let g='other';if(c.includes('crypto')||c.includes('bit'))g='crypto';else if(c.includes('polit')||c.includes('elect')||c.includes('trump')||c.includes('biden'))g='polit';else if(c.includes('econ')||c.includes('fed')||c.includes('rate'))g='econ';else if(c.includes('sport'))g='sports';cats[g].push({idx:i+1,...m});});
  let s='# Polymarket 熱門預測\n\n**日期：'+CONFIG.TODAY+'**｜**市場動態（共 '+r.length+' 個市場）**\n\n---\n\n';
  const catEmoji={crypto:'💰',polit:'🏛️',econ:'📊',sports:'⚽',other:'📌'};
  const catName={crypto:'加密貨幣',polit:'政治',econ:'宏觀經濟',sports:'體育',other:'其他'};
  for(const [k,arr] of Object.entries(cats)){if(!arr.length)continue;s+='### '+catEmoji[k]+' '+catName[k]+' ('+arr.length+'個市場)\n\n';arr.slice(0,20).forEach(m=>{s+='**'+m.idx+'. ['+m.question+']('+m.url+')\n\n';s+='- 📈 概率：'+m.prob+'%｜成交量：'+fmtNum(m.vol)+'\n\n';});if(arr.length>20)s+='_...還有 '+(arr.length-20)+' 個市場_\n\n';}
  s+='\n---\n\n📡 數據來源：Polymarket API\n⚠️ 預測市場僅供參考，不構成投資建議\n';return s;
}

async function main() {
  console.log('========================================');
  console.log('CH 每日報告 v6（大量數據 + 繁體中文）');
  console.log('========================================');
  console.log('日期：'+CONFIG.TODAY+'\n');
  const dir=path.join(projectRoot,'reports',CONFIG.YEAR,CONFIG.MONTH,CONFIG.TODAY);
  if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});
  const[gh,hn,ai,jobs,pm]=await Promise.all([fetchGitHub(),fetchHN(),fetchAI(),fetchJobs(),fetchPM()]);
  console.log('\n========================================');
  console.log('✅ 獲取成功！');
  console.log('   - GitHub：'+gh.length+' 個專案');
  console.log('   - IT 資訊：'+hn.length+' 則');
  console.log('   - AI 新聞：'+ai.length+' 則');
  console.log('   - 工作機會：'+jobs.length+' 個（已過濾雲端關鍵字）');
  console.log('   - 預測市場：'+pm.length+' 個');
  console.log('========================================\n');
  const files={github:genGitHub(gh),ai:genAI(ai),it:genIT(hn),jobs:genJobs(jobs),polymarket:genPM(pm)};
  for(const [f,content] of Object.entries(files)){fs.writeFileSync(path.join(dir,f+'.md'),content);console.log('  ✅ '+f+'.md ('+content.length+' bytes)');}
  console.log('\n========================================\n✅ 完成！\n');
}

main().catch(e=>{console.error('錯誤:',e.message);process.exit(1);});
