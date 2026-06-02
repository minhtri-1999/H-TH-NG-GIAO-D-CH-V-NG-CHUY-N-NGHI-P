// scratch/test_tvc_gold.ts
async function test() {
  console.log("--- TESTING TVC:GOLD ---");
  const tvUrl = "https://scanner.tradingview.com/cfd/scan";
  try {
    const tvResp = await fetch(tvUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        symbols: { tickers: ["TVC:GOLD", "FOREXCOM:XAUUSD", "SAXO:XAUUSD", "OANDA:XAUUSD"] },
        columns: ["close", "change", "high", "low", "description"]
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
}

test();
