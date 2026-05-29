// scratch/test_api.ts
import apiRoutes from "file:///c:/Users/tri/Downloads/v6/backend/routes.ts";

console.log("🚀 Testing /api/signals/XAUUSD natively via Hono fetch...");
try {
  const apiReq = new Request("http://localhost:8000/signals/XAUUSD?tf=60");
  const resp = await apiRoutes.fetch(apiReq);
  
  console.log("Status:", resp.status);
  if (resp.ok) {
    const json = await resp.json();
    console.log("Success! Keys in response:", Object.keys(json));
    console.log("has marketOutlook:", !!json.marketOutlook);
    console.log("marketOutlook:", JSON.stringify(json.marketOutlook, null, 2));
  } else {
    console.log("Failed:", await resp.text());
  }
} catch (err: any) {
  console.error("Test Error:", err);
}
Deno.exit(0);
