// scratch/test_gold_api_speed.ts
async function test() {
  console.log("--- TESTING GOLD-API REALTIME FREQUENCY ---");
  for (let i = 0; i < 5; i++) {
    try {
      const resp = await fetch("https://api.gold-api.com/price/XAU");
      if (resp.ok) {
        const data = await resp.json();
        console.log(`Fetch ${i + 1}: Price=${data.price}, Time=${data.updatedAt}, Readable=${data.updatedAtReadable}`);
      } else {
        console.log(`Fetch ${i + 1} Failed:`, resp.status);
      }
    } catch (e: any) {
      console.error(`Fetch ${i + 1} Error:`, e.message);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
}

test();
