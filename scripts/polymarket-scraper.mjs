/**
 * Polymarket Scraper v2
 * Fetches trending prediction markets from Polymarket's public API
 * Optimized for more content (20-30 items)
 * 
 * API Docs: https://docs.polymarket.com/
 */

const POLYMARKET_API = 'https://clob.polymarket.com';
const POLYMARKET_PRICES_API = 'https://pricing-api.polymarket.com';
const POLYMARKET_MARKETS_API = 'https://gamma-api.polymarket.com';

// Number of items to fetch
const FETCH_LIMIT = 30;

/**
 * Fetch top markets from Polymarket Markets API
 */
async function fetchTopMarkets() {
  try {
    const response = await fetch(
      `${POLYMARKET_MARKETS_API}/markets?limit=${FETCH_LIMIT}&closed=false`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.slice(0, FETCH_LIMIT);
  } catch (error) {
    console.error('Error fetching from markets API:', error.message);
    return [];
  }
}

/**
 * Fetch trending markets with volume
 */
async function fetchTrendingMarkets() {
  try {
    const response = await fetch(
      `${POLYMARKET_PRICES_API}/prices?interval=24h`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.slice(0, FETCH_LIMIT);
  } catch (error) {
    console.error('Error fetching trending:', error.message);
    return [];
  }
}

/**
 * Format market data for report - Enhanced v2
 */
function formatMarketReport(markets) {
  if (!markets || markets.length === 0) {
    return '# Polymarket 熱門市場\n\n暫無數據\n';
  }
  
  // Sort by volume if available
  const sortedMarkets = [...markets].sort((a, b) => {
    const volA = a.volume24hr || a.volume || 0;
    const volB = b.volume24hr || b.volume || 0;
    return volB - volA;
  });
  
  let report = `# Polymarket 熱門市場

**日期：${new Date().toISOString().split('T')[0]}｜數據來源：Polymarket 即時熱門市場**
**顯示：** Top ${sortedMarkets.length} 熱門市場（按成交量排序）

---

## 🔥 當前最熱門市場

`;
  
  // Group markets by category
  const categories = {
    'crypto': [],
    'politics': [],
    'economics': [],
    'sports': [],
    'other': []
  };
  
  sortedMarkets.forEach((market, index) => {
    const question = market.question || 'Unknown';
    const outcome = market.outcome || 'N/A';
    const probability = market.probability ? (parseFloat(market.probability) * 100).toFixed(0) : 'N/A';
    const volume = market.volume24hr || market.volume || 0;
    const liquidity = market.liquidity || 0;
    const url = market.url || (market.slug ? `https://polymarket.com/market/${market.slug}` : '#');
    const category = market.category || 'other';
    const description = market.description || '';
    const endDate = market.endDate || null;
    
    // Format volume
    const formattedVolume = volume > 1000000 
      ? `$${(volume / 1000000).toFixed(2)}M` 
      : volume > 1000 
        ? `$${(volume / 1000).toFixed(1)}K` 
        : `$${volume.toFixed(0)}`;
    
    const formattedLiquidity = liquidity > 1000000 
      ? `$${(liquidity / 1000000).toFixed(2)}M` 
      : liquidity > 1000 
        ? `$${(liquidity / 1000).toFixed(1)}K` 
        : `$${liquidity.toFixed(0)}`;
    
    // Categorize
    const catLower = (category || '').toLowerCase();
    const itemData = { 
      index, 
      question, 
      outcome, 
      probability, 
      formattedVolume, 
      formattedLiquidity, 
      url, 
      description, 
      endDate 
    };
    
    if (catLower.includes('crypto') || catLower.includes('bitcoin') || catLower.includes('ethereum')) {
      categories.crypto.push(itemData);
    } else if (catLower.includes('polit') || catLower.includes('election') || catLower.includes('trump') || catLower.includes('biden')) {
      categories.politics.push(itemData);
    } else if (catLower.includes('econom') || catLower.includes('fed') || catLower.includes('rate') || catLower.includes('inflation')) {
      categories.economics.push(itemData);
    } else if (catLower.includes('sport') || catLower.includes('nba') || catLower.includes('football') || catLower.includes('soccer')) {
      categories.sports.push(itemData);
    } else {
      categories.other.push(itemData);
    }
  });
  
  // Format each category
  const formatCategory = (title, emoji, items) => {
    if (items.length === 0) return '';
    let section = `### ${emoji} ${title} (${items.length} 個市場)\n\n`;
    items.forEach(item => {
      section += `**${item.index + 1}. ${item.question}**\n`;
      section += `- 概率：${item.probability}% (${item.outcome})\n`;
      section += `- 24h 成交量：${item.formattedVolume}｜流動性：${item.formattedLiquidity}\n`;
      if (item.endDate) {
        const endDate = new Date(item.endDate).toLocaleDateString('zh-TW');
        section += `- 截止：${endDate}\n`;
      }
      section += `- 詳情：[查看市場](${item.url})\n\n`;
    });
    return section + '\n';
  };
  
  report += formatCategory('加密貨幣', '💰', categories.crypto);
  report += formatCategory('政治', '🏛️', categories.politics);
  report += formatCategory('宏觀經濟', '📊', categories.economics);
  report += formatCategory('體育', '⚽', categories.sports);
  report += formatCategory('其他', '📌', categories.other);
  
  report += `---\n\n**數據來源：** Polymarket API\n`;
  report += `**備註：** 市場按 24 小時成交量排序\n`;
  
  return report;
}

/**
 * Main scraper function
 */
async function main() {
  console.log('Fetching Polymarket data (v2 - enhanced)...');
  
  const [markets, trending] = await Promise.all([
    fetchTopMarkets(),
    fetchTrendingMarkets()
  ]);
  
  // Use markets if available, fallback to trending
  const data = markets.length > 0 ? markets : trending;
  
  if (data.length === 0) {
    console.log('No data fetched from API');
  } else {
    console.log(`Fetched ${data.length} markets`);
  }
  
  const report = formatMarketReport(data);
  
  // Output to stdout
  console.log(report);
  
  return report;
}

// Run if called directly
main().catch(console.error);
