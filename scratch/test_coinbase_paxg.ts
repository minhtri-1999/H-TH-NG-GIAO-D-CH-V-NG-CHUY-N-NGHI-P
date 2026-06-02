// scratch/test_coinbase_paxg.ts
async function test() {
  console.log("--- TESTING COINBASE PAXG-USD ---");
  const url = "https://api.exchange.coinbase.com/products/PAXG-USD/ticker";
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log("Coinbase PAXG-USD Price:", data.price);
    } else {
      console.log("Coinbase PAXG-USD Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Coinbase Error:", e.message);
  }
}

test();
