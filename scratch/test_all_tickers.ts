// scratch/test_all_tickers.ts
async function test() {
  console.log("--- TESTING TRADINGVIEW ALL GOLD TICKERS ---");
  const tvUrl = "https://scanner.tradingview.com/cfd/scan";
  const tickers = [
    "FOREXCOM:XAUUSD",
    "OANDA:XAUUSD",
    "SAXO:XAUUSD",
    "FX_IDC:XAUUSD",
    "FX:XAUUSD",
    "TVC:GOLD",
    "CAPITALCOM:GOLD",
    "EIGHTCAP:XAUUSD",
    "PEPPERSTONE:XAUUSD",
    "VANTAGE:XAUUSD",
    "ICMARKETS:XAUUSD",
    "XM:XAUUSD"
  ];
  try {
    const tvResp = await fetch(tvUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        symbols: { tickers },
        columns: ["close", "change", "high", "low", "description"]
      })
    });
    if (tvResp.ok) {
      const tvData = await tvResp.json();
      console.log("TradingView Response data:");
      for (const item of tvData.data) {
        console.log(`- ${item.s}: Price=${item.d[0]}, Change=${item.d[1].toFixed(3)}%, High=${item.d[2]}, Low=${item.d[3]}, Desc=${item.d[4]}`);
      }
    } else {
      console.log("TradingView Response Failed:", tvResp.status, await tvResp.text());
    }
  } catch (e) {
    console.error("TV Error:", e);
  }
}

test();
