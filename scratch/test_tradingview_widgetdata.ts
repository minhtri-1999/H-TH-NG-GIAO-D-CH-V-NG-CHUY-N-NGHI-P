// scratch/test_tradingview_widgetdata.ts
async function test() {
  console.log("--- TESTING TRADINGVIEW WIDGETDATA API ---");
  const url = "https://widgetdata.tradingview.com/api/v1/symbols?symbol=FOREXCOM:XAUUSD";
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log("TradingView WidgetData SUCCESS:", JSON.stringify(data, null, 2));
    } else {
      console.log("TradingView WidgetData Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("TradingView WidgetData Error:", e.message);
  }
}

test();
