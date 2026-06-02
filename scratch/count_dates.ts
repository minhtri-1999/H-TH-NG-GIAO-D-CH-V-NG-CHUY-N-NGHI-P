import { getClosedTrades } from "../backend/db.ts";

const trades = await getClosedTrades();
console.log("Total closed trades in DB:", trades.length);

const datesCount: Record<string, number> = {};
for (const t of trades) {
  const dStr = new Date(t.closeTime).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" });
  datesCount[dStr] = (datesCount[dStr] || 0) + 1;
}

console.log("Trades count by date:", datesCount);
Deno.exit(0);
