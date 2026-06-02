const text = await Deno.readTextFile("frontend/App.tsx");
const lines = text.split("\n");
lines.forEach((line, idx) => {
  if (idx >= 1450 && idx <= 1580) {
    console.log(`${idx + 1}: ${line}`);
  }
});
