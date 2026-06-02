try {
  console.log("Triggering backtest reset on the running server...");
  const resp = await fetch("http://localhost:8000/api/backtest/reset", { method: "POST" });
  const json = await resp.json();
  if (json.trades) {
    console.log("Reset success! Total trades returned:", json.trades.length);
    
    // Group by timeframe and date
    const breakdown: Record<string, Record<string, number>> = {};
    for (const t of json.trades) {
      const dStr = new Date(t.closeTime).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" });
      if (!breakdown[t.timeframe]) breakdown[t.timeframe] = {};
      breakdown[t.timeframe][dStr] = (breakdown[t.timeframe][dStr] || 0) + 1;
    }
    
    console.log("Date and timeframe breakdown of all seeded trades:");
    console.log(JSON.stringify(breakdown, null, 2));
  } else {
    console.log("Failed to reset:", json);
  }
} catch (e) {
  console.error("Fetch Error:", e);
}
Deno.exit(0);
