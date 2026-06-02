// scratch/test_yahoo_xau_dash.ts
async function test() {
  console.log("--- TESTING YAHOO FINANCE CHART XAU-USD ---");
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/XAU-USD?interval=1m&range=1d";
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log("Yahoo XAU-USD Chart SUCCESS:", data.chart?.result?.[0]?.meta?.regularMarketPrice);
    } else {
      console.log("Yahoo XAU-USD Chart Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

test();
