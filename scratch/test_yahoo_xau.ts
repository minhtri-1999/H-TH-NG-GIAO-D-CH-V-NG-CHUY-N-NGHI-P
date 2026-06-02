// scratch/test_yahoo_xau.ts
async function test() {
  console.log("--- TESTING YAHOO FINANCE SPOT GOLD (XAU=X) ---");
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/XAU=X?interval=1m&range=1d";
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      const meta = data.chart?.result?.[0]?.meta;
      console.log("Yahoo XAU=X regularMarketPrice:", meta?.regularMarketPrice);
      console.log("Yahoo XAU=X chartPreviousClose:", meta?.chartPreviousClose);
      console.log("Yahoo XAU=X Day High:", meta?.regularMarketDayHigh);
      console.log("Yahoo XAU=X Day Low:", meta?.regularMarketDayLow);
    } else {
      console.log("Yahoo XAU=X Failed:", resp.status, await resp.text());
    }
  } catch (e) {
    console.error("Yahoo Spot Error:", e);
  }
}

test();
