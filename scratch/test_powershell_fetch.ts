// scratch/test_powershell_fetch.ts
async function test() {
  console.log("--- TESTING METALS.LIVE VIA POWERSHELL INVOKE-RESTMETHOD ---");
  try {
    const process = Deno.run({
      cmd: ["powershell", "-Command", "Invoke-RestMethod -Uri 'https://api.metals.live/v1/spot/gold' | ConvertTo-Json"],
      stdout: "piped",
      stderr: "piped"
    });
    const { code } = await process.status();
    const rawOutput = await process.output();
    const errorString = new TextDecoder().decode(await process.stderrOutput());
    
    if (code === 0) {
      const outputString = new TextDecoder().decode(rawOutput);
      console.log("PowerShell SUCCESS:", outputString);
    } else {
      console.log("PowerShell FAILED:", errorString);
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

test();
