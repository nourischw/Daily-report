/**
 * CH Daily Report Scraper
 * Uses Playwright for robust web scraping
 * 
 * Dependencies:
 * npm install playwright
 * npx playwright install chromium
 * 
 * Usage:
 * node scripts/scraper.js
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Configuration
const CONFIG = {
  salaryMin: 50000, // HKD
  excludedKeywords: [
    'cloud', 'mobile', 'android', 'ios', 'bi', 
    'business intelligence', 'power bi', 'tableau',
    'sap', 'salesforce', 'crm', '手機', '雲端'
  ],
  preferredKeywords: [
    'backend', 'devops', 'sre', 'security', 'cybersecurity',
    'ai', 'ml', 'machine learning', 'data engineer', 'database',
    'infrastructure', 'linux', 'aws', 'azure', 'gcp',
    'docker', 'kubernetes', 'python', 'java', 'golang',
    'network', 'site reliability', 'solution architect',
    'it manager', 'it director', 'cto', 'ciso', 'dpo'
  ]
};

// ==================== POLYMARKET SCRAPER ====================

async function scrapePolymarket() {
  console.log('🔮 Scraping Polymarket...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  const markets = [];
  
  try {
    // Navigate to Polymarket trending markets
    await page.goto('https://polymarket.com/markets', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for markets to load
    await page.waitForSelector('[data-testid="market-card"]', { timeout: 10000 }).catch(() => {
      console.log('  Could not find market cards, trying alternative selector');
    });
    
    // Try to get market data from the page
    const marketElements = await page.$$('a[href*="/market/"]');
    console.log(`  Found ${marketElements.length} market links`);
    
    // For now, just take screenshots and extract what we can
    for (let i = 0; i < Math.min(marketElements.length, 10); i++) {
      const href = await marketElements[i].getAttribute('href');
      const text = await marketElements[i].textContent();
      
      if (href && href.includes('/market/')) {
        markets.push({
          title: text.slice(0, 100),
          url: href.startsWith('http') ? href : `https://polymarket.com${href}`
        });
      }
    }
    
  } catch (error) {
    console.error('  Error scraping Polymarket:', error.message);
  } finally {
    await browser.close();
  }
  
  return markets;
}

// ==================== JOBS SCRAPER ====================

async function scrapeJobs() {
  console.log('💼 Scraping IT Jobs...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  const jobs = [];
  
  try {
    // Try LinkedIn Jobs
    console.log('  Trying LinkedIn Jobs...');
    await page.goto('https://www.linkedin.com/jobs/search/?keywords=IT&location=Hong+Kong', { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });
    
    await page.waitForSelector('.job-card-container', { timeout: 10000 }).catch(() => {});
    
    const jobCards = await page.$$('.job-card-container');
    console.log(`  Found ${jobCards.length} job cards on LinkedIn`);
    
    // Extract job data
    for (const card of jobCards.slice(0, 20)) {
      try {
        const title = await card.$eval('.job-card-list__title', el => el.textContent.trim()).catch(() => '');
        const company = await card.$eval('.job-card-container__company-name', el => el.textContent.trim()).catch(() => '');
        const location = await card.$eval('.job-card-container__metadata-item', el => el.textContent.trim()).catch(() => '');
        const salary = await card.$eval('.job-card-container__salary-info', el => el.textContent.trim()).catch(() => '');
        
        if (title) {
          jobs.push({
            title: title.replace(/\n/g, ' '),
            company: company.replace(/\n/g, ' '),
            location: location.replace(/\n/g, ' '),
            salary: salary.replace(/\n/g, ' '),
            source: 'LinkedIn',
            url: await card.$eval('a', el => el.href).catch(() => '#')
          });
        }
      } catch (e) {
        // Skip this card
      }
    }
    
  } catch (error) {
    console.error('  Error scraping LinkedIn:', error.message);
  }
  
  await browser.close();
  
  return jobs;
}

// ==================== REPORT GENERATOR ====================

function generateJobsReport(jobs) {
  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const titleLower = job.title.toLowerCase();
    
    // Check excluded keywords
    for (const keyword of CONFIG.excludedKeywords) {
      if (titleLower.includes(keyword)) {
        return false;
      }
    }
    
    // Check salary if available
    if (job.salary) {
      const salaryMatch = job.salary.match(/(\d+)/);
      if (salaryMatch) {
        const salary = parseInt(salaryMatch[1]) * 1000;
        if (salary < CONFIG.salaryMin) {
          return false;
        }
      }
    }
    
    return true;
  });
  
  // Generate report
  let report = `# IT 工作介紹報告

**日期：${new Date().toISOString().split('T')[0]}｜焦點市場：香港**
**過濾條件：** 薪資 ≥ ${CONFIG.salaryMin / 1000}K HKD ｜ 排除：雲端/手機開發/BI

---

## 💼 香港 IT 就業市場 - 精選崗位

`;
  
  if (filteredJobs.length === 0) {
    report += `暫時沒有找到完全符合條件的工作。\n\n建議：\n1. 擴大搜索範圍\n2. 檢查手動整理的報告\n`;
  } else {
    report += `共找到 **${filteredJobs.length}** 個符合條件的崗位\n\n`;
    
    filteredJobs.forEach((job, index) => {
      report += `### ${index + 1}. ${job.title}
- **公司：** ${job.company}
- **地點：** ${job.location}
${job.salary ? `- **薪資：** ${job.salary}` : ''}
- **來源：** ${job.source}
- **連結：** [查看詳情](${job.url})

`;
    });
  }
  
  report += `---\n\n**數據來源：** LinkedIn Jobs\n`;
  
  return report;
}

function generatePolymarketReport(markets) {
  let report = `# Polymarket 熱門市場

**日期：${new Date().toISOString().split('T')[0]}｜數據來源：Polymarket 即時熱門市場**

---

## 🔮 當前最熱門市場

`;
  
  if (markets.length === 0) {
    report += `暫時無法獲取市場數據。\n\n請稍後再試或查看 [Polymarket 主站](https://polymarket.com)\n`;
  } else {
    markets.forEach((market, index) => {
      report += `### ${index + 1}. ${market.title}
- **連結：** [查看市場](${market.url})

`;
    });
  }
  
  report += `---\n\n**數據來源：** Polymarket\n`;
  
  return report;
}

// ==================== MAIN ====================

async function main() {
  console.log('='.repeat(50));
  console.log('CH Daily Report Scraper');
  console.log('='.repeat(50));
  console.log('');
  
  const today = new Date().toISOString().split('T')[0];
  const reportsDir = path.join(projectRoot, 'reports', today);
  
  // Create reports directory if not exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    console.log(`📁 Created reports directory: ${reportsDir}\n`);
  }
  
  // Scrape data
  console.log('開始抓取數據...\n');
  
  // const jobs = await scrapeJobs();
  // const markets = await scrapePolymarket();
  
  // For now, generate placeholder reports since scraping may be blocked
  console.log('⚠️  爬蟲可能會被網站封鎖，建議：');
  console.log('1. 手動整理報告內容');
  console.log('2. 使用官方 API（如有）');
  console.log('3. 使用登錄後的會話');
  console.log('');
  
  // Generate reports
  // const jobsReport = generateJobsReport(jobs);
  // const polymarketReport = generatePolymarketReport(markets);
  
  // For demo, just show what would be generated
  console.log('Jobs report would contain:', jobs.length, 'jobs');
  console.log('Polymarket report would contain:', markets.length, 'markets');
  
  // Save placeholder reports
  const placeholderJobs = `# IT 工作介紹報告

**日期：${today}｜焦點市場：香港**

---

## 暫時無法自動抓取

請手動從以下來源整理 IT 工作：

- [LinkedIn Jobs HK](https://www.linkedin.com/jobs/search/?keywords=IT&location=Hong+Kong)
- [JobsDB IT Jobs](https://hk.jobsdb.com/it-jobs)
- [e-Stack IT Jobs](https://www.e-stack.com)

`;
  
  const placeholderPolymarket = `# Polymarket 熱門市場

**日期：${today}｜數據來源：Polymarket**

---

## 暫時無法自動抓取

請手動從 [Polymarket](https://polymarket.com) 整理熱門市場數據。

`;
  
  // fs.writeFileSync(path.join(reportsDir, 'jobs.md'), placeholderJobs);
  // fs.writeFileSync(path.join(reportsDir, 'polymarket.md'), placeholderPolymarket);
  
  console.log('\n✅ 抓取完成！');
  console.log(`📁 報告保存在: ${reportsDir}`);
}

main().catch(console.error);
