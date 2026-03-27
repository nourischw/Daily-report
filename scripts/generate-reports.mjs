/**
 * Daily Report Generator
 * Directly generates .md files for the daily report
 * 
 * Usage:
 *   node scripts/generate-reports.mjs
 * 
 * Output:
 *   reports/YYYY-MM-DD/
 *   ├── github.md
 *   ├── ai.md
 *   ├── it.md
 *   ├── jobs.md
 *   └── polymarket.md
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// ==================== CONFIG ====================

const CONFIG = {
  FETCH_LIMIT: 30,
  TODAY: new Date().toISOString().split('T')[0],
  YEAR: new Date().getFullYear().toString(),
  MONTH: (new Date().getMonth() + 1).toString().padStart(2, '0')
};

// ==================== GITHUB TRENDING ====================

async function fetchGitHubTrending(limit = 30) {
  console.log('📊 Fetching GitHub Trending...');
  
  try {
    const query = `stars:>100+pushed:>${getDateDaysAgo(7)}`;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`;
    
    const data = await fetchJSON(url, {
      'User-Agent': 'CH-Daily-Report-Scraper'
    });
    
    if (!data.items) return [];
    
    return data.items.map(repo => ({
      name: repo.full_name,
      description: repo.description || 'No description',
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      author: repo.owner.login
    }));
  } catch (error) {
    console.error('  Error:', error.message);
    return [];
  }
}

// ==================== HACKER NEWS ====================

async function fetchHackerNews(limit = 30) {
  console.log('📰 Fetching Hacker News...');
  
  try {
    const topStories = await fetchJSON('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = topStories.slice(0, limit);
    
    const stories = await Promise.all(
      storyIds.map(async (id) => {
        try {
          const story = await fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return {
            title: story.title || 'No title',
            url: story.url || `https://news.ycombinator.com/item?id=${id}`,
            score: story.score || 0,
            comments: story.descendants || 0,
            author: story.by || 'unknown'
          };
        } catch {
          return null;
        }
      })
    );
    
    return stories.filter(s => s !== null);
  } catch (error) {
    console.error('  Error:', error.message);
    return [];
  }
}

// ==================== RSS FEEDS ====================

async function fetchRSS(url, limit = 20) {
  console.log(`📡 Fetching RSS: ${url}...`);
  
  try {
    const xml = await fetchText(url);
    return parseRSS(xml, limit);
  } catch (error) {
    console.error(`  Error:`, error.message);
    return [];
  }
}

function parseRSS(xml, limit = 20) {
  const items = [];
  const itemMatches = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
  
  for (let i = 0; i < Math.min(itemMatches.length, limit); i++) {
    const item = itemMatches[i];
    const title = extractXML(item, 'title');
    const link = extractXML(item, 'link');
    const description = extractXML(item, 'description');
    const pubDate = extractXML(item, 'pubDate');
    const creator = extractXML(item, 'dc:creator') || extractXML(item, 'author');
    
    if (title) {
      items.push({
        title: cleanHTML(title),
        url: link || '#',
        description: cleanHTML(stripTags(description || '')).slice(0, 300),
        date: pubDate ? new Date(pubDate).toISOString() : '',
        author: cleanHTML(creator || '')
      });
    }
  }
  
  return items;
}

function extractXML(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? match[1].trim() : '';
}

function cleanHTML(str) {
  return str.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&#[0-9]+;/g, (m) => String.fromCharCode(m.slice(2,-1))).trim();
}

function stripTags(str) {
  return str.replace(/<[^>]*>/g, '');
}

// ==================== AI NEWS ====================

async function fetchAINews(limit = 30) {
  console.log('🤖 Fetching AI News...');
  
  const rssSources = [
    { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', name: 'The Verge AI' },
    { url: 'https://feeds.feedburner.com/TechCrunch/startups', name: 'TechCrunch' },
    { url: 'https://www.artificialintelligence-news.com/feed/', name: 'AI News' }
  ];
  
  const allNews = [];
  
  for (const source of rssSources) {
    const news = await fetchRSS(source.url, Math.ceil(limit / rssSources.length));
    news.forEach(n => n.source = source.name);
    allNews.push(...news);
  }
  
  // Sort by date and deduplicate
  const seen = new Set();
  return allNews
    .filter(n => {
      const key = n.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

// ==================== POLYMARKET ====================

async function fetchPolymarket(limit = 30) {
  console.log('🔮 Fetching Polymarket...');
  
  try {
    const url = `https://gamma-api.polymarket.com/markets?limit=${limit}&closed=false`;
    const data = await fetchJSON(url, {
      'Accept': 'application/json'
    });
    
    if (!Array.isArray(data)) return [];
    
    return data.map(m => ({
      question: m.question || 'Unknown',
      probability: m.outcomePrices ? (parseFloat(JSON.parse(m.outcomePrices)[0]) * 100).toFixed(0) : 'N/A',
      volume: m.volume24hr || m.volume || 0,
      url: m.url || (m.slug ? `https://polymarket.com/market/${m.slug}` : '#'),
      category: m.category || 'other'
    }));
  } catch (error) {
    console.error('  Error:', error.message);
    return [];
  }
}

// ==================== UTILITIES ====================

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

async function fetchJSON(url, headers = {}) {
  const text = await fetchText(url, headers);
  return JSON.parse(text);
}

async function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'CH-Daily-Report-Scraper/1.0',
        ...headers
      }
    };
    
    protocol.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function getLanguageEmoji(lang) {
  const map = {
    'Python': '🐍',
    'JavaScript': '📜',
    'TypeScript': '📘',
    'Java': '☕',
    'Go': '🐹',
    'Rust': '🦀',
    'C++': '⚙️',
    'C#': '🎮',
    'Ruby': '💎',
    'PHP': '🐘',
    'Swift': '🍎',
    'Kotlin': '🤖',
    'Shell': '🐚',
    'Jupyter Notebook': '📓'
  };
  return map[lang] || '';
}

// ==================== REPORT GENERATORS ====================

function generateGitHubReport(repos) {
  if (!repos || repos.length === 0) {
    return '# GitHub 熱度報告\n\n暫無數據\n';
  }
  
  const sorted = [...repos].sort((a, b) => b.stars - a.stars).slice(0, CONFIG.FETCH_LIMIT);
  
  let report = `# GitHub 熱度報告

**更新時間：${CONFIG.TODAY}｜收集時段：最近 30 天**

## 🔥 熱門專案精選（Top ${sorted.length}）

`;
  
  sorted.forEach((repo, i) => {
    const emoji = getLanguageEmoji(repo.language);
    report += `### ${i + 1}. [${repo.name}](${repo.url}) ${emoji || ''}
${repo.description}
- **作者：** ${repo.author}｜**星數：** ⭐ ${formatNumber(repo.stars)}
${repo.language ? `- **語言：** ${repo.language}` : ''}

`;
  });
  
  const langStats = {};
  sorted.forEach(r => {
    if (r.language) langStats[r.language] = (langStats[r.language] || 0) + 1;
  });
  
  const topLangs = Object.entries(langStats).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  report += `## 📈 語言分佈\n\n`;
  topLangs.forEach(([lang, count]) => {
    report += `- **${lang}** (${count} 個專案)\n`;
  });
  
  report += `\n---\n\n**數據來源：** GitHub API\n`;
  
  return report;
}

function generateAINewsReport(news) {
  if (!news || news.length === 0) {
    return '# AI 新聞報告\n\n暫無數據\n';
  }
  
  let report = `# AI 新聞報告

**日期：${CONFIG.TODAY}｜去重覆、跨平台收集**
**顯示：** Top ${news.length} 則新聞

---

## 🤖 模型與產品動態

`;
  
  news.slice(0, 15).forEach((item, i) => {
    report += `### ${i + 1}. ${item.title}
${item.description}
- **來源：** ${item.source}${item.author ? `｜**作者：** ${item.author}` : ''}
- **連結：** [查看原文](${item.url})

`;
  });
  
  if (news.length > 15) {
    report += `## 📰 更多 AI 新聞\n\n`;
    news.slice(15, 30).forEach((item, i) => {
      report += `### ${i + 16}. ${item.title}
- **來源：** ${item.source}｜[連結](${item.url})

`;
    });
  }
  
  report += `---\n\n**數據來源：** The Verge AI、TechCrunch、AI News\n`;
  
  return report;
}

function generateITReport(hnStories) {
  if (!hnStories || hnStories.length === 0) {
    return '# IT 資訊報告\n\n暫無數據\n';
  }
  
  const topStories = [...hnStories].sort((a, b) => b.score - a.score).slice(0, 20);
  
  let report = `# IT 資訊報告

**日期：${CONFIG.TODAY}｜收集自 Hacker News、TechCrunch**
**顯示：** Top ${topStories.length} 則新聞

---

## 📰 今日 IT 熱門新聞

`;
  
  topStories.forEach((story, i) => {
    const domain = extractDomain(story.url);
    report += `### ${i + 1}. ${story.title}
- **分數：** ${story.score}｜**留言：** ${story.comments}｜**作者：** ${story.author}
- **來源：** ${domain}
- **連結：** [查看原文](${story.url})

`;
  });
  
  report += `---\n\n**數據來源：** Hacker News、TechCrunch\n`;
  
  return report;
}

function generateJobsReport() {
  return `# IT 工作介紹報告

**日期：${CONFIG.TODAY}｜焦點市場：香港**

---

## 💼 香港 IT 就業市場

### 熱門崗位

請查看手動整理的工作報告或訪問：
- [LinkedIn Jobs HK](https://www.linkedin.com/jobs/search/?keywords=IT&location=Hong+Kong)
- [JobsDB IT Jobs](https://hk.jobsdb.com/it-jobs)
- [e-Stack IT Jobs](https://www.e-stack.com)

---

**備註：** 自動爬蟲正在測試中，完整工作報告將於近期更新。

`;
}

function generatePolymarketReport(markets) {
  if (!markets || markets.length === 0) {
    return '# Polymarket 熱門市場\n\n暫無數據\n';
  }
  
  // Sort by volume
  const sorted = [...markets].sort((a, b) => b.volume - a.volume);
  
  // Group by category
  const categories = { crypto: [], politics: [], economics: [], sports: [], other: [] };
  
  sorted.forEach((m, i) => {
    const cat = m.category?.toLowerCase() || '';
    let group = 'other';
    if (cat.includes('crypto') || cat.includes('bitcoin')) group = 'crypto';
    else if (cat.includes('polit') || cat.includes('election')) group = 'politics';
    else if (cat.includes('econom') || cat.includes('fed')) group = 'economics';
    else if (cat.includes('sport')) group = 'sports';
    
    categories[group].push({ ...m, index: i + 1 });
  });
  
  let report = `# Polymarket 熱門市場

**日期：${CONFIG.TODAY}｜數據來源：Polymarket 即時熱門市場**
**顯示：** Top ${sorted.length} 熱門市場（按成交量排序）

---

## 🔥 當前最熱門市場

`;
  
  const formatCategory = (emoji, title, items) => {
    if (items.length === 0) return '';
    let section = `### ${emoji} ${title} (${items.length} 個市場)\n\n`;
    items.slice(0, 10).forEach(m => {
      const vol = m.volume > 1000000 ? `$${(m.volume / 1000000).toFixed(2)}M` : m.volume > 1000 ? `$${(m.volume / 1000).toFixed(1)}K` : `$${m.volume}`;
      section += `**${m.index}. ${m.question}**\n`;
      section += `- 概率：${m.probability}%｜24h 成交量：${vol}\n`;
      section += `- 詳情：[查看市場](${m.url})\n\n`;
    });
    return section + '\n';
  };
  
  report += formatCategory('💰', '加密貨幣', categories.crypto);
  report += formatCategory('🏛️', '政治', categories.politics);
  report += formatCategory('📊', '宏觀經濟', categories.economics);
  report += formatCategory('⚽', '體育', categories.sports);
  report += formatCategory('📌', '其他', categories.other);
  
  report += `---\n\n**數據來源：** Polymarket API\n`;
  
  return report;
}

function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch {
    return 'unknown';
  }
}

// ==================== MAIN ====================

async function main() {
  console.log('='.repeat(50));
  console.log('CH Daily Report Generator');
  console.log('='.repeat(50));
  console.log('');
  console.log(`📅 Date: ${CONFIG.TODAY}`);
  console.log('');
  
  const reportsDir = path.join(projectRoot, 'reports', CONFIG.YEAR, CONFIG.MONTH, CONFIG.TODAY);
  
  // Create directory if not exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    console.log(`📁 Created: ${reportsDir}`);
  }
  
  // Fetch all data in parallel
  const [githubRepos, hnStories, aiNews, polymarkets] = await Promise.all([
    fetchGitHubTrending(CONFIG.FETCH_LIMIT),
    fetchHackerNews(CONFIG.FETCH_LIMIT),
    fetchAINews(20),
    fetchPolymarket(CONFIG.FETCH_LIMIT)
  ]);
  
  console.log('');
  console.log('✅ Data fetched!');
  console.log(`   - GitHub: ${githubRepos.length} repos`);
  console.log(`   - Hacker News: ${hnStories.length} stories`);
  console.log(`   - AI News: ${aiNews.length} articles`);
  console.log(`   - Polymarket: ${polymarkets.length} markets`);
  console.log('');
  
  // Generate reports
  console.log('📝 Generating reports...');
  
  const reports = {
    'github.md': generateGitHubReport(githubRepos),
    'ai.md': generateAINewsReport(aiNews),
    'it.md': generateITReport(hnStories),
    'jobs.md': generateJobsReport(),
    'polymarket.md': generatePolymarketReport(polymarkets)
  };
  
  // Write files
  for (const [filename, content] of Object.entries(reports)) {
    const filepath = path.join(reportsDir, filename);
    fs.writeFileSync(filepath, content);
    console.log(`   ✅ ${filename}`);
  }
  
  console.log('');
  console.log('='.repeat(50));
  console.log('✅ All reports generated successfully!');
  console.log(`📁 Location: ${reportsDir}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
