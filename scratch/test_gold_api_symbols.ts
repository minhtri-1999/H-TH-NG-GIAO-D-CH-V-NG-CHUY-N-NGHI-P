// scratch/test_gold_api_symbols.ts
async function test() {
  console.log("--- TESTING GOLD-API ---");
  try {
    const resp = await fetch("https://api.gold-api.com/symbols");
    if (resp.ok) {
      const data = await resp.json();
      console.log("Symbols list:", data);
    } else {
      console.log("Symbols Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Symbols Error:", e.message);
  }

  try {
    // Try to get price of Gold (symbol could be XAU or gold or something else)
    const resp = await fetch("https://api.gold-api.com/price/XAU");
    if (resp.ok) {
      const data = await resp.json();
      console.log("XAU price data:", JSON.stringify(data, null, 2));
    } else {
      console.log("XAU Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("XAU Error:", e.message);
  }
}

test();
