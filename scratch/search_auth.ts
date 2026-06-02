const text = await Deno.readTextFile("backend/routes.ts");
const lines = text.split("\n");
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes("auth") || line.toLowerCase().includes("login") || line.toLowerCase().includes("register") || line.toLowerCase().includes("otp")) {
    console.log(`[routes.ts] Line ${idx + 1}: ${line.trim()}`);
  }
});
