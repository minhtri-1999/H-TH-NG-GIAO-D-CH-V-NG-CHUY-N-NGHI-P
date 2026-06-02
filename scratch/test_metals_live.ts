// scratch/test_metals_live.ts
async function test() {
  console.log("--- TESTING METALS LIVE ---");
  try {
    const resp = await fetch("https://api.metals.live/v1/spot/gold");
    if (resp.ok) {
      const data = await resp.json();
      console.log("Metals Live gold price:", JSON.stringify(data, null, 2));
    } else {
      console.log("Metals Live Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Metals Live Error:", e.message);
  }

  console.log("\n--- TESTING GOLD-API ---");
  try {
    const resp = await fetch("https://api.gold-api.com/v1/gold");
    if (resp.ok) {
      const data = await resp.json();
      console.log("Gold-API gold price:", JSON.stringify(data, null, 2));
    } else {
      console.log("Gold-API Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Gold-API Error:", e.message);
  }
}

test();
