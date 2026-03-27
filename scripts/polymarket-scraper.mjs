/**
 * Polymarket Scraper
 * Fetches trending prediction markets from Polymarket's public API
 * 
 * API Docs: https://docs.polymarket.com/
 */

const POLYMARKET_API = 'https://clob.polymarket.com';
const POLYMARKET_PRICES_API = 'https://pricing-api.polymarket.com';

// Top markets to track
const TRACKED_CATEGORIES = [
  'politics',
  'crypto',
  'economics',
  'sports',
  'entertainment'
];

/**
 * Fetch top markets from Polymarket
 */
async function fetchTopMarkets(limit = 15) {
  try {
    const response = await fetch(
      `${POLYMARKET_PRICES_API}/prices?interval=24h&marketType=fixed_taker_fee`,
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
    return data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching Polymarket data:', error.message);
    return [];
  }
}

/**
 * Format market data for report
 */
function formatMarketReport(markets) {
  if (!markets || markets.length === 0) {
    return '# Polymarket 熱門市場\n\n暫無數據\n';
  }
  
  let report = `# Polymarket 熱門市場

**日期：${new Date().toISOString().split('T')[0]}｜數據來源：Polymarket 即時熱門市場**

---

`;
  
  markets.forEach((market, index) => {
    const question = market.question || 'Unknown';
    const outcome = market.outcome || 'N/A';
    const probability = market.probability ? (parseFloat(market.probability) * 100).toFixed(0) : 'N/A';
    const volume = market.volume || market.volume24hr || 0;
    const url = market.url || `https://polymarket.com/market/${market.slug || ''}`;
    
    // Format volume
    const formattedVolume = volume > 1000000 
      ? `$${(volume / 1000000).toFixed(1)}M` 
      : volume > 1000 
        ? `$${(volume / 1000).toFixed(0)}K` 
        : `$${volume}`;
    
    report += `## ${index + 1}. ${question}\n`;
    report += `- **當前概率：** ${probability}% (${outcome})\n`;
    report += `- **24h 成交量：** ${formattedVolume}\n`;
    report += `- **詳情：** [查看市場](${url})\n\n`;
  });
  
  report += `---\n\n**數據來源：** Polymarket API\n`;
  
  return report;
}

/**
 * Main scraper function
 */
async function main() {
  console.log('Fetching Polymarket data...');
  const markets = await fetchTopMarkets();
  
  if (markets.length === 0) {
    console.log('No data fetched, using fallback');
  } else {
    console.log(`Fetched ${markets.length} markets`);
  }
  
  const report = formatMarketReport(markets);
  
  // Output to stdout (can be redirected to file)
  console.log(report);
}

main().catch(console.error);
