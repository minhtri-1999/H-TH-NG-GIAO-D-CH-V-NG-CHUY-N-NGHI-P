const text = await Deno.readTextFile("frontend/styles.ts");
const lines = text.split("\n");
lines.forEach((line, idx) => {
  if (line.includes("g-title") || line.includes("gold-profile-card") || line.includes("sb-header") || line.includes("hide-on-mobile")) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
