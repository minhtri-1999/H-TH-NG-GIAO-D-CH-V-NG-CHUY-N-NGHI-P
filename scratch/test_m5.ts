import { seedBacktestHistory } from "../backend/backtest/engine.ts";

console.log("Analyzing M5 trades...");
try {
  const trades = await seedBacktestHistory();
  const todayStr = new Date().toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" });
  
  const m5Today = trades.filter(t => {
    const tradeDateStr = new Date(t.closeTime).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" });
    return t.timeframe === "M5" && tradeDateStr === todayStr;
  });

  console.log("Total M5 trades today:", m5Today.length);
  console.log("Trades:");
  console.log(m5Today.map(t => ({
    id: t.id,
    position: t.position,
    entry: t.entry,
    stopLoss: t.stopLoss,
    takeProfit1: t.takeProfit1,
    status: t.status,
    pips: t.pips,
    profitUsd: t.profitUsd
  })));

  const sumPips = m5Today.reduce((sum, t) => sum + t.pips, 0);
  console.log("Sum of M5 pips today:", sumPips);
} catch (e) {
  console.error(e);
}
Deno.exit(0);
