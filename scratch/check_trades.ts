const text = await Deno.readTextFile("backtest_reports/latest_backtest.json");
const json = JSON.parse(text);
console.log("Sample of 3 latest trades:");
console.log(json.slice(0, 3));
