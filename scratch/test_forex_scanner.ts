// scratch/test_forex_scanner.ts
async function test() {
  console.log("--- TESTING TRADINGVIEW FOREX SCANNER ---");
  const tvUrl = "https://scanner.tradingview.com/forex/scan";
  try {
    const tvResp = await fetch(tvUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        symbols: { tickers: ["FX:XAUUSD", "OANDA:XAUUSD", "SAXO:XAUUSD", "FOREXCOM:XAUUSD"] },
        columns: ["close", "change", "high", "low"]
      })
    });
    if (tvResp.ok) {
      const tvData = await tvResp.json();
      console.log("Forex Scanner Response:", JSON.stringify(tvData, null, 2));
    } else {
      console.log("Forex Scanner Response Failed:", tvResp.status, await tvResp.text());
    }
  } catch (e) {
    console.error("Forex Error:", e);
  }
}

test();
