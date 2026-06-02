const text = await Deno.readTextFile("scratch/git_diff_utf8.txt");
const lines = text.split("\n");
lines.forEach((line, idx) => {
  if (line.includes("frontend/App.tsx")) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
