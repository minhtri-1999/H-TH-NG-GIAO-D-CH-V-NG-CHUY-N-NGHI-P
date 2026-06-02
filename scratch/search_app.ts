const text = await Deno.readTextFile("frontend/App.tsx");
const lines = text.split("\n");
lines.forEach((line, idx) => {
  if (line.includes("otpBoxRefs")) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
