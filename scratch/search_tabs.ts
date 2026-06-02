const text = await Deno.readTextFile("frontend/App.tsx");
const lines = text.split("\n");
lines.forEach((line, idx) => {
  if (line.includes("dashTab === \"ai\"") || line.includes("dashTab === 'ai'")) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
