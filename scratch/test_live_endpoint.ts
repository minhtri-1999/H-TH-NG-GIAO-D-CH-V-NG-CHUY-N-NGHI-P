// scratch/test_live_endpoint.ts
async function test() {
  console.log("--- TESTING DEV SERVER REALTIME PRICE ENDPOINT ---");
  const url = "http://localhost:8000/api/price/XAUUSD";
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      console.log("Server Price Endpoint Response:", JSON.stringify(data, null, 2));
    } else {
      console.log("Server Price Endpoint Failed:", resp.status, await resp.text());
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

test();
