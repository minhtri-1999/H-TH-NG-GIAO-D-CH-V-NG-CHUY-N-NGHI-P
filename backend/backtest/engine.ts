import { Hono } from "npm:hono@4";
import { getGoldRealtimePrice, getGoldChartData, lastKnownGoldPrice } from "../api.ts";
import { type ClosedTrade, saveClosedTrade, getClosedTrades, clearClosedTrades } from "../db.ts";
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

  console.log("Loading trades from KV database...");

  let kvTrades: ClosedTrade[] = [];
  try {
    kvTrades = await getClosedTrades();
  } catch (err: any) {
    console.error("Failed to fetch closed trades from Deno KV:", err.message);
  }

  // If forced reset, or if KV database is empty, generate genuine backtest trades from real candle history
  if (force || kvTrades.length === 0) {
    console.log("Generating actual backtest trades from real historical candles...");
    try {
      await clearClosedTrades();
    } catch (_) {}

    const timeframes = ["1", "5", "15", "60", "1D"];
    const allGeneratedTrades: ClosedTrade[] = [];

    for (const tf of timeframes) {
      try {
        const chartRaw = await getGoldChartData(tf, true); // bypass cache boundaries
        const candles: Candle[] = chartRaw.timestamp.map((t, i) => ({
          time: t,
          open: chartRaw.open[i] ?? 0,
          high: chartRaw.high[i] ?? 0,
          low: chartRaw.low[i] ?? 0,
          close: chartRaw.close[i] ?? 0,
          volume: chartRaw.volume[i] ?? 0,
        })).filter(c => c.open > 0 && c.close > 0);

        const tfLabel = tf === "1" ? "M1" : tf === "5" ? "M5" : tf === "15" ? "M15" : tf === "60" ? "H1" : "D1";
        const tfTrades = backtestTimeframe(tfLabel, candles);
        
        // Save to Deno KV and collect
        for (const t of tfTrades) {
          await saveClosedTrade(t);
          allGeneratedTrades.push(t);
        }
      } catch (err: any) {
        console.error(`Failed to run backtest for timeframe ${tf}:`, err.message);
      }
    }

    kvTrades = allGeneratedTrades;
  }

  inMemoryTrades = kvTrades.sort((a, b) => b.closeTime - a.closeTime);
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

// POST /backtest/trade - Persist real-time frontend closed trade into database
backtestRouter.post("/backtest/trade", async (c) => {
  try {
    const trade = await c.req.json();
    if (!trade || !trade.id || !trade.timeframe) {
      return c.json({ error: "Dữ liệu vị thế chốt lời / cắt lỗ không hợp lệ" }, 400);
    }

    const formattedTrade: ClosedTrade = {
      id: trade.id,
      timeframe: trade.timeframe.toUpperCase(),
      position: trade.position,
      entry: Number(trade.entry),
      stopLoss: Number(trade.stopLoss),
      takeProfit1: Number(trade.takeProfit1),
      takeProfit2: Number(trade.takeProfit2),
      status: trade.status,
      openTime: typeof trade.openTime === "string" ? new Date(trade.openTime).getTime() : Number(trade.openTime),
      closeTime: typeof trade.closeTime === "string" ? new Date(trade.closeTime).getTime() : Number(trade.closeTime),
      pips: Number(trade.pips),
      profitUsd: Number(trade.profitUsd),
    };

    // Persist to Deno KV
    await saveClosedTrade(formattedTrade);

    // Merge directly into active inMemoryTrades cache to prevent latency issues
    inMemoryTrades = [formattedTrade, ...inMemoryTrades.filter(t => t.id !== formattedTrade.id)];

    return c.json({ success: true, message: "Đã lưu vị thế chốt lời / cắt lỗ thành công vào cơ sở dữ liệu!" });
  } catch (err: any) {
    return c.json({ error: "Lỗi hệ thống khi lưu lịch sử giao dịch: " + err.message }, 500);
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
