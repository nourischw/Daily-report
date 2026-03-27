/**
 * IT Jobs Scraper for Hong Kong Market
 * Fetches IT jobs from various sources
 * 
 * Features:
 * - Filters jobs with salary >= 50K HKD
 * - Excludes: Cloud, Mobile Development, BI jobs
 * - Focuses on: Backend, DevOps, Security, AI/ML, Data Engineering
 */

const JOBSDBSG_API = 'https://www.jobdb.com';
const LINKEDIN_JOBS_URL = 'https://www.linkedin.com/jobs';

// Salary filter: >= 50K HKD
const SALARY_MIN = 50000;

// Excluded keywords (case-insensitive)
const EXCLUDED_KEYWORDS = [
  'cloud',
  'mobile',
  'android',
  'ios',
  'bi',
  'business intelligence',
  'power bi',
  'tableau',
  'sap',
  'salesforce',
  'crm'
];

// Preferred keywords (higher priority)
const PREFERRED_KEYWORDS = [
  'backend',
  'backend',
  'devops',
  'sre',
  'security',
  'cybersecurity',
  'ai',
  'ml',
  'machine learning',
  'data engineer',
  'database',
  'infrastructure',
  'linux',
  'aws',
  'azure',
  'gcp',
  'docker',
  'kubernetes',
  'python',
  'java',
  'golang',
  'rust',
  'network',
  'site reliability',
  'solution architect',
  'it manager',
  'it director',
  'cto',
  'ciso',
  'dpo',
  'data protection'
];

/**
 * Check if job matches preferred criteria
 */
function isPreferredJob(title, description = '') {
  const text = (title + ' ' + description).toLowerCase();
  
  // Check excluded keywords first
  for (const keyword of EXCLUDED_KEYWORDS) {
    if (text.includes(keyword)) {
      return { match: false, reason: `Excluded: ${keyword}` };
    }
  }
  
  // Check preferred keywords
  let matchCount = 0;
  for (const keyword of PREFERRED_KEYWORDS) {
    if (text.includes(keyword)) {
      matchCount++;
    }
  }
  
  if (matchCount >= 1) {
    return { match: true, score: matchCount };
  }
  
  return { match: false, reason: 'No preferred keywords found' };
}

/**
 * Parse salary string to number (HKD)
 */
function parseSalary(salaryStr) {
  if (!salaryStr) return 0;
  
  // Remove currency symbols and normalize
  let cleaned = salaryStr.replace(/[HK$¥,，]/g, '').trim();
  
  // Handle range (e.g., "50000-80000")
  if (cleaned.includes('-')) {
    const parts = cleaned.split('-');
    cleaned = parts[0]; // Use lower bound
  }
  
  // Handle "50K" format
  if (cleaned.toLowerCase().includes('k')) {
    cleaned = cleaned.toLowerCase().replace('k', '000');
  }
  
  // Extract numeric value
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Format job for report
 */
function formatJobReport(jobs) {
  if (!jobs || jobs.length === 0) {
    return `# IT 工作介紹報告

**日期：${new Date().toISOString().split('T')[0]}｜焦點市場：香港**

---

## 暫無符合條件的工作

暫時沒有找到符合以下條件的 IT 工作：
- 薪資：50K HKD 以上
- 排除：雲端、手機開發、BI 相關

請稍後再回來查看。

`;
  }
  
  let report = `# IT 工作介紹報告

**日期：${new Date().toISOString().split('T')[0]}｜焦點市場：香港**
**過濾條件：** 薪資 ≥ 50K HKD ｜ 排除：雲端/手機開發/BI

---

## 💼 香港 IT 就業市場 - 精選崗位

共找到 **${jobs.length}** 個符合條件的崗位

`;
  
  jobs.forEach((job, index) => {
    report += `### ${index + 1}. ${job.title}
- **公司：** ${job.company}
- **薪資：** ${job.salary}
- **地點：** ${job.location}
- **連結：** [查看詳情](${job.url})
${job.skills ? `- **技能：** ${job.skills}` : ''}

`;
  });
  
  report += `---

## 💡 求職建議

1. **LinkedIn 必須優化**：加上「AWS」「Azure」「AI」等關鍵字，每天刷新
2. **香港 IT 求職平台**：LinkedIn、JobsDB、IT Jobs Board、e-Stack
3. **薪資談判**：IT 中級 $35K-$60K、資深 $60K-$100K+

**數據來源：** LinkedIn Jobs、JobDB Hong Kong

`;
  
  return report;
}

/**
 * Main scraper function placeholder
 * Note: Actual scraping requires handling anti-bot measures
 */
async function main() {
  console.log('IT Jobs Scraper for Hong Kong Market');
  console.log('='.repeat(50));
  console.log('');
  console.log('⚠️  注意：');
  console.log('  LinkedIn 和 JobDB 有嚴格的防爬機制');
  console.log('  需要使用 Playwright/Selenium 等瀏覽器自動化工具');
  console.log('  或使用官方 API（如有）');
  console.log('');
  console.log('建議方案：');
  console.log('1. 使用 Puppeteer/Playwright 模擬瀏覽器');
  console.log('2. 設置登錄會話');
  console.log('3. 添加延遲和隨機 user-agent');
  console.log('4. 考慮使用 Proxy');
  console.log('');
  
  // Placeholder for jobs data
  const jobs = [];
  
  const report = formatJobReport(jobs);
  console.log(report);
}

main().catch(console.error);
