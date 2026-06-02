// scratch/test_uphold.ts
async function test() {
  console.log("--- TESTING UPHOLD REALTIME SPOT GOLD (XAU-USD) ---");
  const url = "https://api.uphold.com/v0/ticker/XAU-USD";
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      console.log("Uphold XAU-USD:", JSON.stringify(data, null, 2));
    } else {
      console.log("Uphold Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Uphold Error:", e.message);
  }
}

test();
