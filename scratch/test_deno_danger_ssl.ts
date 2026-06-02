// scratch/test_deno_danger_ssl.ts
async function test() {
  console.log("--- TESTING DENO DANGERALLOWINVALIDCERTS ---");
  try {
    // Create custom HTTP client that ignores SSL verification
    const client = Deno.createHttpClient({ dangerAllowInvalidCerts: true });
    const resp = await fetch("https://api.metals.live/v1/spot/gold", { client });
    if (resp.ok) {
      const data = await resp.json();
      console.log("SUCCESS WITH DANGER CERTS:", data);
    } else {
      console.log("Failed with status:", resp.status);
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

test();
