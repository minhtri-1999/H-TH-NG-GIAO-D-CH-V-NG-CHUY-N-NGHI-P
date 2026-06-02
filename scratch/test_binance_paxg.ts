// scratch/test_binance_paxg.ts
async function test() {
  console.log("--- TESTING BINANCE PAXGUSDT ---");
  const url = "https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT";
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      console.log("Binance PAXGUSDT Price:", data.price);
    } else {
      console.log("Binance PAXGUSDT Failed:", resp.status, await resp.text());
    }
  } catch (e) {
    console.error("Binance Error:", e);
  }
}

test();
