// scratch/test_live_prices.ts
async function test() {
  console.log("--- TESTING TRADINGVIEW SCANNER ---");
  const tvUrl = "https://scanner.tradingview.com/cfd/scan";
  try {
    const tvResp = await fetch(tvUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        symbols: { tickers: ["FOREXCOM:XAUUSD", "OANDA:XAUUSD", "FX_IDC:XAUUSD"] },
        columns: ["close", "change", "high", "low"]
      })
    });
    if (tvResp.ok) {
      const tvData = await tvResp.json();
      console.log("TradingView Response:", JSON.stringify(tvData, null, 2));
    } else {
      console.log("TradingView Response Failed:", tvResp.status, await tvResp.text());
    }
  } catch (e) {
    console.error("TV Error:", e);
  }

  console.log("\n--- TESTING YAHOO FINANCE CHART ---");
  const yahooUrl = "https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1m&range=1d";
  try {
    const resp = await fetch(yahooUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      const meta = data.chart?.result?.[0]?.meta;
      console.log("Yahoo GC=F regularMarketPrice:", meta?.regularMarketPrice);
      console.log("Yahoo GC=F chartPreviousClose:", meta?.chartPreviousClose);
    } else {
      console.log("Yahoo GC=F Failed:", resp.status);
    }
  } catch (e) {
    console.error("Yahoo Error:", e);
  }
}

test();
