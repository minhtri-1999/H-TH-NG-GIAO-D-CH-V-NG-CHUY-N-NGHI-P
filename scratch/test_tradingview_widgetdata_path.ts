// scratch/test_tradingview_widgetdata_path.ts
async function test() {
  console.log("--- TESTING TRADINGVIEW WIDGETDATA PATH ENDPOINT ---");
  const url = "https://widgetdata.tradingview.com/api/v1/symbols/FOREXCOM:XAUUSD";
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://www.tradingview.com/"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log("TradingView WidgetData Path SUCCESS:", JSON.stringify(data, null, 2));
    } else {
      console.log("TradingView WidgetData Path Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("TradingView WidgetData Path Error:", e.message);
  }
}

test();
