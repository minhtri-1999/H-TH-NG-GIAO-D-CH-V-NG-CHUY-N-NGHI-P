// scratch/test_yahoo_v8_symbols.ts
async function test() {
  console.log("--- TESTING YAHOO FINANCE V8 CHART API ---");
  const symbols = ["GC=F", "GLD", "XAUUSD=X", "XAU=X", "GOLD", "XAUUSD"];
  for (const sym of symbols) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1m&range=1d`;
    try {
      const resp = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (resp.ok) {
        const data = await resp.json();
        const meta = data.chart?.result?.[0]?.meta;
        if (meta) {
          console.log(`- Symbol ${sym} SUCCESS! Price: ${meta.regularMarketPrice}, PrevClose: ${meta.chartPreviousClose}`);
        } else {
          console.log(`- Symbol ${sym} empty result`);
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
