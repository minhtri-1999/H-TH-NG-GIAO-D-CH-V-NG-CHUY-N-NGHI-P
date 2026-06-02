try {
  const resp = await fetch("http://localhost:8000/api/backtest/history");
  const json = await resp.json();
  if (json.trades) {
    console.log("Analyzing timeframe breakdown for yesterday (28/05/2026)...");
    const yesterdayTrades = json.trades.filter((t: any) => {
      const dStr = new Date(t.closeTime).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" });
      return dStr === "28/05/2026";
    });
    
    console.log("Total trades from yesterday:", yesterdayTrades.length);
    const tfCount: Record<string, number> = {};
    for (const t of yesterdayTrades) {
      tfCount[t.timeframe] = (tfCount[t.timeframe] || 0) + 1;
    }
    console.log("Timeframes found for yesterday's trades:", tfCount);
  } else {
    console.log("No trades property", json);
  }
} catch (e) {
  console.error("Fetch Error:", e);
}
Deno.exit(0);
