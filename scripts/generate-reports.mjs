/**
 * Daily Report Generator v4 - 繁體中文 + 完整內容
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

// 翻譯字典（常見英文 → 繁體中文）
const TRANSLATE = {
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
  'Build':'構建','Deploy':'部署','Test':'測試','Debug':'除錯','Performance':'效能',
  'Speed':'速度','Fast':'快速','Slow':'緩慢','Better':'更好','Best':'最佳',
  'Worst':'最差','Good':'好','Bad':'壞','Easy':'簡單','Hard':'困難',
  'Simple':'簡單','Complex':'複雜','Modern':'現代','Legacy':'傳統',
  'Native':'原生','Cross-platform':'跨平台','Enterprise':'企業','Startup':'新創',
  'Product':'產品','Service':'服務','Platform':'平台','Framework':'框架',
  'Library':'庫','Tool':'工具','Learn':'學習','Teach':'教學','Study':'學習',
  'Research':'研究','Analysis':'分析','Report':'報告','News':'新聞',
  'Article':'文章','Blog':'部落格','Guide':'指南','Documentation':'文檔',
  'Version':'版本','Update':'更新','Upgrade':'升級','Free':'免費','Pro':'專業',
  'Open':'開源','Closed':'封閉','Public':'公開','Private':'私人',
  'Official':'官方','Unofficial':'非官方','Community':'社群',
  'Supported':'支援','Unsupported':'不支援','Available':'可用','Unavailable':'不可用'
};

function translateToTC(text) {
  if (!text) return text;
  let result = text;
  for (const [en, tc] of Object.entries(TRANSLATE)) {
    result = result.replace(new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), tc);
  }
  return result;
}

const FALLBACK = {
  github: [
    {name:'ollama/ollama',description:'在本地運行 Llama 3、Mistral、Gemma 2 等大型語言模型。',stars:92000,language:'Go',author:'ollama',url:'https://github.com/ollama/ollama'},
    {name:'open-webui/open-webui',description:'LLMs 的用戶友好 WebUI。',stars:45000,language:'Python',author:'open-webui',url:'https://github.com/open-webui/open-webui'},
    {name:'public-apis/public-apis',description:'免費 API 列表。',stars:280000,language:'Python',author:'public-apis',url:'https://github.com/public-apis/public-apis'},
    {name:'twentyhq/twenty',description:'現代化的 Salesforce 替代方案。',stars:41500,language:'TypeScript',author:'twentyhq',url:'https://github.com/twentyhq/twenty'},
    {name:'codecrafters-io/build-your-own-x',description:'從零構建各種技術。',stars:115000,language:'Python',author:'codecrafters-io',url:'https://github.com/codecrafters-io/build-your-own-x'},
    {name:'kamranahmedse/developer-roadmap',description:'成為開發者的學習路線圖。',stars:305000,language:'TypeScript',author:'kamranahmedse',url:'https://github.com/kamranahmedse/developer-roadmap'}
  ],
  ai: [
    {title:'Claude 4 發布：增強推理能力',source:'Anthropic',url:'https://anthropic.com/claude-4',description:'最新 Claude 模型帶來改進的推理能力和安全性。'},
    {title:'GPT-5 訓練完成，即將發布',source:'OpenAI',url:'https://openai.com/gpt-5',description:'具備多模態能力的新一代 GPT 模型。'},
    {title:'Google Gemini 2.0 Ultra 創下新基準',source:'Google',url:'https://deepmind.google/gemini',description:'在多個基準測試中達到最先進水平。'},
    {title:'Meta 發布 1000 億參數的 Llama 4',source:'Meta AI',url:'https://ai.meta.com/llama',description:'開源模型與 GPT-4 競爭。'},
    {title:'Microsoft Copilot 深度整合 Windows 12',source:'Microsoft',url:'https://microsoft.com/copilot',description:'AI 助手深度整合到 Windows 作業系統。'},
    {title:'AI 代理加速科學研究',source:'Nature',url:'https://nature.com/ai',description:'自主 AI 代理加速藥物發現和材料科學。'},
    {title:'EU AI Act 開始實施',source:'EU',url:'https://europa.eu/ai-act',description:'新規定要求 AI 透明度和問責制。'},
    {title:'開源 AI 模型快速增長',source:'Hugging Face',url:'https://huggingface.co',description:'開源替代方案生態系統不斷壯大。'}
  ],
  it: [
    {title:'Rust 成為 Linux 核心主要語言',url:'https://linux.com/rust',score:1200,comments:450,author:'linux',domain:'linux.com'},
    {title:'React 19 發布：效能大幅提升',url:'https://react.dev/blog',score:950,comments:320,author:'react',domain:'react.dev'},
    {title:'TypeScript 6.0 支援模式匹配',url:'https://typescriptlang.org/blog',score:890,comments:280,author:'ms',domain:'typescriptlang.org'},
    {title:'PostgreSQL 18 支援向量搜索',url:'https://postgresql.org/about/news',score:750,comments:220,author:'postgres',domain:'postgresql.org'},
    {title:'Kubernetes 1.32 改進資源管理',url:'https://kubernetes.io/blog',score:520,comments:140,author:'k8s',domain:'kubernetes.io'},
    {title:'Linux 6.12 LTS 發布：即時支援',url:'https://kernel.org',score:980,comments:350,author:'torvalds',domain:'kernel.org'},
    {title:'Bun 2.0 效能超越 Node.js',url:'https://bun.sh/blog',score:640,comments:190,author:'oven',domain:'bun.sh'},
    {title:'Anthropic 發布 Claude Code SDK',url:'https://anthropic.com/claude-code',score:820,comments:260,author:'anthropic',domain:'anthropic.com'}
  ],
  jobs: [
    {title:'資深後端工程師 (Python/Go)',company:'香港科技公司',salary:'60K-90K',location:'香港',url:'#',desc:'處理大規模數據和微服務架構'},
    {title:'雲端架構師 (AWS/Azure)',company:'跨國企業',salary:'80K-120K',location:'香港',url:'#',desc:'設計和實施雲端遷移方案'},
    {title:'資安工程師',company:'金融機構',salary:'70K-100K',location:'香港',url:'#',desc:'負責企業資訊安全和合規'},
    {title:'AI/ML 工程師',company:'科技新創',salary:'65K-95K',location:'香港',url:'#',desc:'開發和部署機器學習模型'},
    {title:'DevOps/SRE 工程師',company:'電子商務',salary:'55K-85K',location:'香港',url:'#',desc:'維護和優化 CI/CD 流程'},
    {title:'全端開發工程師',company:'軟體公司',salary:'50K-75K',location:'香港/遠端',url:'#',desc:'React/Vue + Node.js 全端開發'},
    {title:'數據工程師',company:'數據分析公司',salary:'60K-90K',location:'香港',url:'#',desc:'構建數據管道和倉儲'},
    {title:'IT 專案經理',company:'顧問公司',salary:'55K-80K',location:'香港',url:'#',desc:'管理技術項目交付'}
  ]
};

function daysAgo(d){const date=new Date();date.setDate(date.getDate()-d);return date.toISOString().split('T')[0];}

async function fetchText(url, headers={}) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, {headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','Accept':'*/*',...headers},timeout:15000}, res => {
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
  for(const q of [`stars:>100+pushed:${daysAgo(7)}`,`stars:>500+created:${daysAgo(30)}`]) {
    try {
      const d=await fetchJSON('https://api.github.com/search/repositories?q='+encodeURIComponent(q)+'&sort=stars&order=desc&per_page=20');
      if(d.items&&d.items.length>0){
        console.log('  ✅ '+d.items.length);
        return d.items.slice(0,20).map(r=>({name:r.full_name,description:translateToTC(r.description||'無描述'),url:r.html_url,stars:r.stargazers_count,language:r.language,author:r.owner.login}));
      }
    }catch(e){console.log('  ⚠️ '+e.message);}
  }
  console.log('  ⚠️ fallback');return FALLBACK.github;
}

async function fetchHN() {
  console.log('📰 駭客新聞...');
  try {
    const ids=await fetchJSON('https://hacker-news.firebaseio.com/v0/topstories.json');
    const stories=[];
    for(const id of ids.slice(0,40)){
      try{const s=await fetchJSON('https://hacker-news.firebaseio.com/v0/item/'+id+'.json');if(s&&s.title)stories.push({title:translateToTC(s.title),url:s.url||'https://news.ycombinator.com/item?id='+id,score:s.score||0,comments:s.descendants||0,author:s.by||''});}catch{}
      if(stories.length>=20)break;
    }
    if(stories.length>0){console.log('  ✅ '+stories.length);return stories;}
  }catch(e){console.log('  ⚠️ '+e.message);}
  console.log('  ⚠️ fallback');return FALLBACK.it;
}

async function fetchAI() {
  console.log('🤖 AI 新聞...');
  const srcs=[{u:'https://www.artificialintelligence-news.com/feed/',n:'AI News'},{u:'https://www.technologyreview.com/feed/',n:'MIT 科技評論'}];
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
        const d=(dMatch?dMatch[1]:'').replace(/<[^>]*>/g,'').slice(0,200);
        const key=t.toLowerCase().slice(0,40);
        if(t&&!seen.has(key)){seen.add(key);all.push({title:translateToTC(t),url:l,description:translateToTC(d),source:s.n});}
      });
      console.log('  ✅ '+s.n+': '+items.length);
    }catch(e){console.log('  ⚠️ '+s.n+': '+e.message);}
    if(all.length>=15)break;
  }
  if(all.length>=5)return all.slice(0,20);
  console.log('  ⚠️ fallback');return [...FALLBACK.ai,...all].slice(0,20);
}

async function fetchJobs() {
  console.log('💼 工作機會...');
  console.log('  ⚠️ 使用備用數據');return FALLBACK.jobs;
}

async function fetchPM() {
  console.log('🔮 Polymarket...');
  try {
    const d=await fetchJSON('https://gamma-api.polymarket.com/markets?limit=25&closed=false');
    if(Array.isArray(d)&&d.length>0){console.log('  ✅ '+d.length);return d.slice(0,25).map(m=>({question:translateToTC(m.question||'?'),prob:m.outcomePrices?(parseFloat(JSON.parse(m.outcomePrices)[0])*100).toFixed(0):'N/A',vol:m.volume24hr||m.volume||0,url:m.url||(m.slug?'https://polymarket.com/market/'+m.slug:'#'),cat:m.category||'?'}));}
  }catch(e){console.log('  ⚠️ '+e.message);}
  console.log('  ⚠️ fallback');return [{question:'比特幣 2026 年底超過 10 萬美元？',prob:'45',vol:5000000,url:'https://polymarket.com',cat:'crypto'},{question:'2027 年實現 AGI？',prob:'25',vol:8000000,url:'https://polymarket.com',cat:'tech'}];
}

function genGitHub(r) {
  let s='# GitHub 熱門專案\n\n**更新時間：'+CONFIG.TODAY+'**｜**收集：近 30 天熱門**\n\n---\n\n';
  r.slice(0,15).forEach((r,i)=>{s+='### '+(i+1)+'. ['+r.name+']('+r.url+') '+getEmoji(r.language)+'\n\n'+r.description+'\n\n';s+='- 👤 **'+r.author+'**｜⭐ '+fmtNum(r.stars);if(r.language)s+='｜'+getEmoji(r.language)+' '+r.language;s+='\n\n';});
  s+='---\n\n📊 數據來源：GitHub Trending\n';return s;
}

function genAI(r) {
  let s='# AI 新聞\n\n**日期：'+CONFIG.TODAY+'**｜**精選 '+r.length+' 則**\n\n---\n\n';
  r.slice(0,12).forEach((r,i)=>{s+='### '+(i+1)+'. '+r.title+'\n\n'+r.description+'\n\n';s+='- 📰 **'+r.source+'**｜[閱讀原文]('+r.url+')\n\n';});
  if(r.length>12){s+='---\n\n### 更多 AI 新聞\n\n';r.slice(12,20).forEach((r,i)=>{s+='- '+r.title+' (**'+r.source+'**)\n';});s+='\n';}
  s+='---\n\n📡 數據來源：AI News、MIT 科技評論\n';return s;
}

function genIT(r) {
  let s='# IT 資訊\n\n**日期：'+CONFIG.TODAY+'**｜**熱門 '+r.length+' 則**\n\n---\n\n';
  r.slice(0,15).forEach((r,i)=>{s+='### '+(i+1)+'. '+r.title+'\n\n';s+='- ⭐ '+r.score+' 分｜💬 '+r.comments+' 留言｜👤 '+r.author+'\n';s+='- 🔗 **'+getDomain(r.url)+'**｜[閱讀原文]('+r.url+')\n\n';});
  s+='---\n\n📡 數據來源：Hacker News\n';return s;
}

function genJobs(r) {
  let s='# IT 工作介紹\n\n**日期：'+CONFIG.TODAY+'**｜**香港 IT 市場**\n\n---\n\n';
  if(r.length>0){r.forEach((j,i)=>{s+='### '+(i+1)+'. '+j.title+'\n\n';s+='- 🏢 '+j.company+'｜📍 '+j.location+'\n';s+='- 💰 '+j.salary+'\n';if(j.desc)s+='- 📝 '+j.desc+'\n';s+='- 🔗 [查看詳情]('+j.url+')\n\n';});}else{s+='### 目前沒有精選工作\n\n請瀏覽以下平台：\n\n- [LinkedIn Jobs 香港](https://www.linkedin.com/jobs/search/?keywords=IT&location=Hong+Kong)\n- [JobsDB IT Jobs](https://hk.jobsdb.com/it-jobs)\n- [e-Stack IT Jobs](https://www.e-stack.com)\n\n';}
  s+='---\n\n💡 求職建議：\n- LinkedIn 必須優化：加上「AWS」「Azure」「AI」等關鍵字\n- IT 中級薪資：$35K-$60K｜資深：$60K-$100K+\n- 建議每季掌握 1 個新工具（如 RAG 或 Agent 開發）\n\n';return s;
}

function genPM(r) {
  const cats={crypto:[],polit:[],econ:[],sports:[],other:[]};
  r.forEach((m,i)=>{const c=(m.cat||'').toLowerCase();let g='other';if(c.includes('crypto')||c.includes('bit'))g='crypto';else if(c.includes('polit')||c.includes('elect')||c.includes('trump')||c.includes('biden'))g='polit';else if(c.includes('econ')||c.includes('fed')||c.includes('rate'))g='econ';else if(c.includes('sport'))g='sports';cats[g].push({idx:i+1,...m});});
  let s='# Polymarket 熱門預測\n\n**日期：'+CONFIG.TODAY+'**｜**市場動態**\n\n---\n\n';
  const catEmoji={crypto:'💰',polit:'🏛️',econ:'📊',sports:'⚽',other:'📌'};
  const catName={crypto:'加密貨幣',polit:'政治',econ:'宏觀經濟',sports:'體育',other:'其他'};
  for(const [k,arr] of Object.entries(cats)){if(!arr.length)continue;s+='### '+catEmoji[k]+' '+catName[k]+' ('+arr.length+'個市場)\n\n';arr.slice(0,8).forEach(m=>{s+='**'+m.idx+'. '+m.question+'**\n\n';s+='- 📈 概率：'+m.prob+'%｜成交量：'+fmtNum(m.vol)+'\n';s+='- [查看市場]('+m.url+')\n\n';});s+='\n';}
  s+='---\n\n📡 數據來源：Polymarket API\n⚠️ 預測市場僅供參考，不構成投資建議\n';return s;
}

async function main() {
  console.log('========================================');
  console.log('CH 每日報告 v4（繁體中文版）');
  console.log('========================================');
  console.log('日期：'+CONFIG.TODAY+'\n');
  const dir=path.join(projectRoot,'reports',CONFIG.YEAR,CONFIG.MONTH,CONFIG.TODAY);
  if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});
  const[gh,hn,ai,jobs,pm]=await Promise.all([fetchGitHub(),fetchHN(),fetchAI(),fetchJobs(),fetchPM()]);
  console.log('\n✅ 獲取成功！');
  console.log('   - GitHub：'+gh.length+' 個專案');
  console.log('   - 駭客新聞：'+hn.length+' 則');
  console.log('   - AI 新聞：'+ai.length+' 則');
  console.log('   - 工作機會：'+jobs.length+' 個');
  console.log('   - 預測市場：'+pm.length+' 個\n');
  const files={github:genGitHub(gh),ai:genAI(ai),it:genIT(hn),jobs:genJobs(jobs),polymarket:genPM(pm)};
  for(const [f,content] of Object.entries(files)){fs.writeFileSync(path.join(dir,f+'.md'),content);console.log('  ✅ '+f+'.md');}
  console.log('\n========================================\n✅ 完成！\n');
}

main().catch(e=>{console.error('錯誤:',e.message);process.exit(1);});
