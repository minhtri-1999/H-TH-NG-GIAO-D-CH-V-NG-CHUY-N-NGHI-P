import { Hono } from "npm:hono@4";
import { getGoldRealtimePrice, getGoldChartData } from "../api.ts";
import { type ClosedTrade } from "../db.ts";
import { analyzeSignals, type Candle } from "../signals.ts";

export const backtestRouter = new Hono();

// Thread-safe in-memory database to store real historical closed trades
let inMemoryTrades: ClosedTrade[] = [];
let lastSeedTime = 0;

// Deterministic Backtest Engine: Runs strategy on actual historical candles
export function backtestTimeframe(timeframe: string, candles: Candle[]): ClosedTrade[] {
  const closedTrades: ClosedTrade[] = [];
  const multiplier = 100; // Gold point contract size ($100 per pip per lot)

  let lotSize = 0.1;
  if (timeframe === "M5") lotSize = 0.2;
  else if (timeframe === "M15") lotSize = 0.5;
  else if (timeframe === "H1") lotSize = 1.0;
  else if (timeframe === "D1") lotSize = 2.0;

  let openTrade: {
    position: "BUY" | "SELL";
    entry: number;
    stopLoss: number;
    takeProfit1: number;
    takeProfit2: number;
    openTime: number;
  } | null = null;

  // We need at least 50 candles for complete indicators (like EMA50)
  for (let i = 49; i < candles.length; i++) {
    const currentCandle = candles[i];

    if (openTrade) {
      // Check if the current candle closes the open trade
      let closed = false;
      let status: "TP1" | "TP2" | "SL" = "SL";

      if (openTrade.position === "BUY") {
        if (currentCandle.low <= openTrade.stopLoss) {
          closed = true;
          status = "SL";
        } else if (currentCandle.high >= openTrade.takeProfit2) {
          closed = true;
          status = "TP2";
        } else if (currentCandle.high >= openTrade.takeProfit1) {
          closed = true;
          status = "TP1";
        }
      } else { // SELL
        if (currentCandle.high >= openTrade.stopLoss) {
          closed = true;
          status = "SL";
        } else if (currentCandle.low <= openTrade.takeProfit2) {
          closed = true;
          status = "TP2";
        } else if (currentCandle.low <= openTrade.takeProfit1) {
          closed = true;
          status = "TP1";
        }
      }

      if (closed) {
        let pips = 0;
        if (openTrade.position === "BUY") {
          if (status === "TP2") pips = Number(((openTrade.takeProfit2 - openTrade.entry) * 10).toFixed(1));
          else if (status === "TP1") pips = Number(((openTrade.takeProfit1 - openTrade.entry) * 10).toFixed(1));
          else pips = Number(((openTrade.stopLoss - openTrade.entry) * 10).toFixed(1));
        } else { // SELL
          if (status === "TP2") pips = Number(((openTrade.entry - openTrade.takeProfit2) * 10).toFixed(1));
          else if (status === "TP1") pips = Number(((openTrade.entry - openTrade.takeProfit1) * 10).toFixed(1));
          else pips = Number(((openTrade.entry - openTrade.stopLoss) * 10).toFixed(1));
        }

        const profitUsd = Number((pips * multiplier * lotSize / 10).toFixed(2));
        const closeTime = currentCandle.time * 1000;

        closedTrades.push({
          id: `${timeframe}-${openTrade.openTime}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
          timeframe,
          position: openTrade.position,
          entry: openTrade.entry,
          stopLoss: openTrade.stopLoss,
          takeProfit1: openTrade.takeProfit1,
          takeProfit2: openTrade.takeProfit2,
          status,
          openTime: openTrade.openTime,
          closeTime,
          pips,
          profitUsd,
        });

        openTrade = null;
      }
    } else {
      // Evaluate signals at the close of candle i
      const subCandles = candles.slice(0, i + 1);
      const signal = analyzeSignals(subCandles);

      if (signal.type === "BUY" || signal.type === "SELL") {
        const sug = signal.suggestion;
        if (sug.entry > 0 && sug.stopLoss > 0 && sug.takeProfit1 > 0) {
          openTrade = {
            position: signal.type,
            entry: sug.entry,
            stopLoss: sug.stopLoss,
            takeProfit1: sug.takeProfit1,
            takeProfit2: sug.takeProfit2,
            openTime: currentCandle.time * 1000,
          };
        }
      }
    }
  }

  return closedTrades;
}

// Seed chronological backtest simulation runs over actual chart candle history
export async function seedBacktestHistory(force = false): Promise<ClosedTrade[]> {
  const now = Date.now();
  // Cache the generated closed trades for 15 seconds to optimize performance
  if (!force && inMemoryTrades.length > 0 && (now - lastSeedTime) < 15_000) {
    return inMemoryTrades;
  }

  console.log("Running real historical gold backtest simulation across all timeframes...");
  
  const tfParams = [
    { param: "1", name: "M1" },
    { param: "5", name: "M5" },
    { param: "15", name: "M15" },
    { param: "60", name: "H1" },
    { param: "1D", name: "D1" }
  ];

  const allTrades: ClosedTrade[] = [];

  for (const tf of tfParams) {
    try {
      const chartRaw = await getGoldChartData(tf.param);
      if (chartRaw && chartRaw.close && chartRaw.close.length >= 50) {
        const candles: Candle[] = chartRaw.timestamp.map((t, idx) => ({
          time: t,
          open: chartRaw.open[idx] ?? 0,
          high: chartRaw.high[idx] ?? 0,
          low: chartRaw.low[idx] ?? 0,
          close: chartRaw.close[idx] ?? 0,
          volume: chartRaw.volume[idx] ?? 0,
        })).filter(c => c.open > 0 && c.close > 0);

        const tfTrades = backtestTimeframe(tf.name, candles);
        allTrades.push(...tfTrades);
        console.log(`[Backtest] Successfully ran ${tf.name} backtest, generated ${tfTrades.length} trades.`);
      }
    } catch (e: any) {
      console.error(`Failed to backtest timeframe ${tf.name}:`, e.message);
    }
  }

  // Sort trades chronologically (newest closed trades first)
  inMemoryTrades = allTrades.sort((a, b) => b.closeTime - a.closeTime);
  lastSeedTime = Date.now();

  // Save backtest reports physically in workspace for export/download support
  try {
    await Deno.mkdir("backtest_reports", { recursive: true });
    await Deno.writeTextFile("backtest_reports/latest_backtest.json", JSON.stringify(inMemoryTrades, null, 2));

    let csvContent = "ID,Timeframe,Position,Entry,Stop Loss,Take Profit 1,Take Profit 2,Status,Open Time,Close Time,Pips,Profit USD\n";
    for (const t of inMemoryTrades) {
      const openDate = new Date(t.openTime).toISOString();
      const closeDate = new Date(t.closeTime).toISOString();
      csvContent += `"${t.id}","${t.timeframe}","${t.position}",${t.entry},${t.stopLoss},${t.takeProfit1},${t.takeProfit2},"${t.status}","${openDate}","${closeDate}",${t.pips},${t.profitUsd}\n`;
    }
    await Deno.writeTextFile("backtest_reports/latest_backtest.csv", csvContent);
  } catch (err: any) {
    console.warn("Could not save physical backtest reports files:", err.message);
  }

  return inMemoryTrades;
}

// GET /backtest/history - Fetch persistent closed trades with real-time historical updates
backtestRouter.get("/backtest/history", async (c) => {
  try {
    const trades = await seedBacktestHistory();
    return c.json({ success: true, trades });
  } catch (err: any) {
    return c.json({ error: "Lỗi hệ thống khi lấy lịch sử giao dịch: " + err.message }, 500);
  }
});

// POST /backtest/reset - Force refresh backtest by clearing cache
backtestRouter.post("/backtest/reset", async (c) => {
  try {
    const trades = await seedBacktestHistory(true);
    return c.json({ success: true, trades, message: "Đã hoàn thành chạy lại backtest thực tế từ dữ liệu nến biểu đồ!" });
  } catch (err: any) {
    return c.json({ error: "Lỗi hệ thống khi chạy lại backtest: " + err.message }, 500);
  }
});

// Backup safe route for double-prefix compatibility
backtestRouter.post("/api/backtest/reset", async (c) => {
  try {
    const trades = await seedBacktestHistory(true);
    return c.json({ success: true, trades, message: "Đã hoàn thành chạy lại backtest thực tế từ dữ liệu nến biểu đồ!" });
  } catch (err: any) {
    return c.json({ error: "Lỗi hệ thống khi chạy lại backtest: " + err.message }, 500);
  }
});
