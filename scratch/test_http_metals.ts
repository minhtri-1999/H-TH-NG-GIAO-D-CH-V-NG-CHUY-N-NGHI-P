// scratch/test_http_metals.ts
async function test() {
  console.log("--- TESTING METALS.LIVE VIA HTTP & CURL ---");
  
  // Try HTTP
  try {
    const resp = await fetch("http://api.metals.live/v1/spot/gold");
    if (resp.ok) {
      console.log("HTTP Metals Live SUCCESS:", await resp.json());
    } else {
      console.log("HTTP Metals Live Failed:", resp.status);
    }
  } catch (e: any) {
    console.error("HTTP Metals Live Error:", e.message);
  }

  // Try curl
  try {
    const process = Deno.run({
      cmd: ["curl", "-s", "https://api.metals.live/v1/spot/gold"],
      stdout: "piped",
      stderr: "piped"
    });
    const { code } = await process.status();
    const rawOutput = await process.output();
    const errorString = new TextDecoder().decode(await process.stderrOutput());
    
    if (code === 0) {
      const outputString = new TextDecoder().decode(rawOutput);
      console.log("curl SUCCESS:", outputString);
    } else {
      console.log("curl FAILED:", errorString);
    }
  } catch (e: any) {
    console.error("curl Error:", e.message);
  }
}

test();
