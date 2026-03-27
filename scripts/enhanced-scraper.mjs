/**
 * CH Daily Report Enhanced Scraper v2
 * Uses multiple public APIs and RSS feeds to fetch data
 * No browser automation needed - uses direct HTTP requests
 * 
 * Data Sources:
 * - GitHub Trending API
 * - Hacker News API
 * - RSS Feeds for news
 * - Public APIs
 */

import https from 'https';
import http from 'http';

// ==================== GITHUB TRENDING ====================

async function fetchGitHubTrending(language = '', limit = 30) {
  console.log('📊 Fetching GitHub Trending...');
  
  try {
    // Use GitHub's search API for recently updated repos
    const query = language ? `language:${language}+created:>${getDateDaysAgo(30)}` : `created:>${getDateDaysAgo(30)}`;
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
      todayStars: repo.stargazers_count, // GitHub API doesn't provide daily stars in search
      author: repo.owner.login
    }));
  } catch (error) {
    console.error('  Error fetching GitHub:', error.message);
    return [];
  }
}

async function fetchGitHubTrendingPage(limit = 30) {
  console.log('📊 Fetching GitHub Trending (page method)...');
  
  try {
    // Try the trending page API
    const url = `https://api.github.com/search/repositories?q=stars:>100+pushed:>${getDateDaysAgo(7)}&sort=updated&order=desc&per_page=${limit}`;
    
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
      todayStars: Math.floor(repo.stargazers_count / 30), // Estimate
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
    // Get top stories
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
            author: story.by || 'unknown',
            date: story.time ? new Date(story.time * 1000).toISOString() : ''
          };
        } catch {
          return null;
        }
      })
    );
    
    return stories.filter(s => s !== null);
  } catch (error) {
    console.error('  Error fetching HN:', error.message);
    return [];
  }
}

// ==================== RSS FEEDS ====================

async function fetchRSS(url, limit = 20) {
  console.log(`📡 Fetching RSS: ${url}...`);
  
  try {
    const xml = await fetchText(url);
    const items = parseRSS(xml, limit);
    return items;
  } catch (error) {
    console.error(`  Error fetching RSS ${url}:`, error.message);
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
  return str.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
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
  
  // Sort by date (newest first) and deduplicate by title
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

// ==================== REPORT GENERATORS ====================

function generateGitHubReport(repos) {
  if (!repos || repos.length === 0) {
    return '# GitHub 熱度報告\n\n暫無數據\n';
  }
  
  // Sort by stars
  const sorted = [...repos].sort((a, b) => b.stars - a.stars).slice(0, 30);
  
  let report = `# GitHub 熱度報告

**更新時間：${new Date().toISOString().split('T')[0]}｜收集時段：最近 30 天**

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
  
  // Add language stats
  const langStats = {};
  sorted.forEach(r => {
    if (r.language) {
      langStats[r.language] = (langStats[r.language] || 0) + 1;
    }
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

**日期：${new Date().toISOString().split('T')[0]}｜去重覆、跨平台收集**
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
    news.slice(15).forEach((item, i) => {
      report += `### ${i + 16}. ${item.title}
- **來源：** ${item.source}｜[連結](${item.url})

`;
    });
  }
  
  report += `---\n\n**數據來源：** The Verge AI、TechCrunch、AI News\n`;
  
  return report;
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

// ==================== MAIN ====================

async function main() {
  console.log('='.repeat(50));
  console.log('CH Daily Report Enhanced Scraper v2');
  console.log('='.repeat(50));
  console.log('');
  
  const today = new Date().toISOString().split('T')[0];
  
  console.log(`📅 Date: ${today}`);
  console.log('');
  
  // Fetch data from multiple sources
  const [githubRepos, hnStories, aiNews] = await Promise.all([
    fetchGitHubTrendingPage(30),
    fetchHackerNews(30),
    fetchAINews(30)
  ]);
  
  console.log('');
  console.log('✅ Data fetched successfully!');
  console.log(`   - GitHub repos: ${githubRepos.length}`);
  console.log(`   - Hacker News: ${hnStories.length}`);
  console.log(`   - AI News: ${aiNews.length}`);
  console.log('');
  
  // Generate reports
  const githubReport = generateGitHubReport(githubRepos);
  const ainReport = generateAINewsReport(aiNews);
  
  // Output reports
  console.log('='.repeat(50));
  console.log('GITHUB REPORT');
  console.log('='.repeat(50));
  console.log(githubReport);
  
  console.log('='.repeat(50));
  console.log('AI NEWS REPORT');
  console.log('='.repeat(50));
  console.log(ainReport);
  
  return {
    github: githubReport,
    ai: ainReport
  };
}

main().catch(console.error);
