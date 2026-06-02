// scratch/test_tv_indicators.ts
async function test() {
  console.log("--- TESTING TRADINGVIEW INDICATORS ---");
  const tvUrl = "https://scanner.tradingview.com/cfd/scan";
  try {
    const tvResp = await fetch(tvUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        symbols: { tickers: ["FOREXCOM:XAUUSD"] },
        columns: [
          "close", "change", "high", "low",
          "RSI", "MACD.macd", "MACD.signal", "ATR",
          "EMA10", "SMA20", "EMA20", "EMA50", "EMA100", "EMA200",
          "ADX", "CCI20", "Stoch.K", "Stoch.D",
          "recommend.all", "recommend.MA", "recommend.Other"
        ]
      })
    });
    if (tvResp.ok) {
      const tvData = await tvResp.json();
      console.log("TradingView Indicators Response:", JSON.stringify(tvData, null, 2));
    } else {
      console.log("TradingView Failed:", tvResp.status, await tvResp.text());
    }
  } catch (e) {
    console.error("TV Error:", e);
  }
}
test();
