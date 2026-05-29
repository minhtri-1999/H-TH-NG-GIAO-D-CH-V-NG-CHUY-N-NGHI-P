import { seedBacktestHistory } from "../backend/backtest/engine.ts";

console.log("Seeding backtest history...");
try {
  const trades = await seedBacktestHistory();
  console.log("Total trades seeded:", trades.length);
  if (trades.length > 0) {
    console.log("First 5 trades:");
    console.log(trades.slice(0, 5).map(t => ({
      id: t.id,
      timeframe: t.timeframe,
      position: t.position,
      entry: t.entry,
      stopLoss: t.stopLoss,
      takeProfit1: t.takeProfit1,
      status: t.status,
      pips: t.pips,
      profitUsd: t.profitUsd
    })));

    // Sum pips
    const sumPips = trades.reduce((sum, t) => sum + t.pips, 0);
    console.log("Sum of all pips:", sumPips);
  }
} catch (e) {
  console.error("Error seeding backtest:", e);
}
Deno.exit(0);
