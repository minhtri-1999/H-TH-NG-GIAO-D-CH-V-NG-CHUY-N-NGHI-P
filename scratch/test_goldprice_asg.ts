// scratch/test_goldprice_asg.ts
async function test() {
  console.log("--- TESTING GOLDPRICE.ORG INTERNAL API ---");
  const url = "https://data-asg.goldprice.org/dbXRates/USD";
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log("GoldPrice.org SUCCESS:", JSON.stringify(data, null, 2));
    } else {
      console.log("GoldPrice.org Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("GoldPrice.org Error:", e.message);
  }
}

test();
