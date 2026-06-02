// scratch/test_signals_endpoint.ts
async function test() {
  console.log("--- TESTING DEV SERVER SIGNALS ENDPOINT ---");
  const url = "http://localhost:8000/api/signals/XAUUSD?tf=15";
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      console.log("Signals Response metadata:");
      console.log("- lastPrice:", data.lastPrice);
      console.log("- priceChange:", data.priceChange);
      console.log("- dayHigh:", data.dayHigh);
      console.log("- dayLow:", data.dayLow);
      console.log("- chart close (last 3):", data.chart.close.slice(-3));
    } else {
      console.log("Signals Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

test();
