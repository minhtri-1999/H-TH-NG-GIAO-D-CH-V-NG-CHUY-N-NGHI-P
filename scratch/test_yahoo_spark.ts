// scratch/test_yahoo_spark.ts
async function test() {
  console.log("--- TESTING YAHOO FINANCE SPARK/QUOTE API ---");
  const symbols = ["GC=F", "GLD", "^XAU", "XAUUSD=X", "XAUUSD", "XAU=X", "XAUUSD=F"];
  for (const sym of symbols) {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${sym}`;
    try {
      const resp = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (resp.ok) {
        const data = await resp.json();
        const quote = data.quoteResponse?.result?.[0];
        if (quote) {
          console.log(`- Symbol ${sym} found! Price: ${quote.regularMarketPrice}, PrevClose: ${quote.regularMarketPreviousClose}`);
        } else {
          console.log(`- Symbol ${sym} NOT found in result`);
        }
      } else {
        console.log(`- Symbol ${sym} Failed:`, resp.status);
      }
    } catch (e: any) {
      console.error(`- Symbol ${sym} Error:`, e.message);
    }
  }
}

test();
