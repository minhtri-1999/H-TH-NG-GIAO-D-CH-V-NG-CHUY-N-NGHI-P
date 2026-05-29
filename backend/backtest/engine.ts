import { Hono } from "npm:hono@4";
import { getGoldChartData, getGoldRealtimePrice } from "../api.ts";
import { analyzeSignals, type Candle } from "../signals.ts";
import {
  saveClosedTrade,
  getClosedTrades,
  clearClosedTrades,
  type ClosedTrade,
} from "../db.ts";

export const backtestRouter = new Hono();

export async function seedBacktestHistory(): Promise<ClosedTrade[]> {
  console.log("Starting premium chronological backtest simulation run...");
  await clearClosedTrades();

  const timeframes = ["1", "5", "15", "60", "1D"];
  const list: ClosedTrade[] = [];

  let rt: any;
  try {
    rt = await getGoldRealtimePrice();
  } catch (_) {
    rt = { price: 2350.00 };
  }

  for (const tf of timeframes) {
    try {
      const chartRaw = await getGoldChartData(tf);
      const lastChartClose = chartRaw.close.length > 0 ? chartRaw.close[chartRaw.close.length - 1] : 0;
      const offset = lastChartClose > 0 ? rt.price - lastChartClose : 0;

      const candles: Candle[] = chartRaw.timestamp.map((t: number, idx: number) => ({
        time: t,
        open: (chartRaw.open[idx] ?? 0) + offset,
        high: (chartRaw.high[idx] ?? 0) + offset,
        low: (chartRaw.low[idx] ?? 0) + offset,
        close: (chartRaw.close[idx] ?? 0) + offset,
        volume: chartRaw.volume[idx] ?? 0,
      })).filter((c: Candle) => c.open > 0 && c.close > 0);

      if (candles.length < 50) {
        console.warn(`Timeframe ${tf} has too few candles (${candles.length}/50) for backtesting.`);
        continue;
      }

      let i = 50;
      while (i < candles.length - 2) {
        const slice = candles.slice(0, i + 1);
        const sig = analyzeSignals(slice);

        if (sig.type === "BUY" || sig.type === "SELL") {
          const position = sig.type;
          const entry = sig.suggestion.entry;
          const stopLoss = sig.suggestion.stopLoss;
          const takeProfit1 = sig.suggestion.takeProfit1;
          const takeProfit2 = sig.suggestion.takeProfit2;
          const openTime = candles[i].time * 1000;

          // Guard against invalid ranges
          if (stopLoss <= 0 || takeProfit1 <= 0) {
            i++;
            continue;
          }

          let closed = false;
          let closeTime = 0;
          let closePrice = 0;
          let status: "TP1" | "TP2" | "SL" = "SL";

          let hitTP1 = false;
          let tp1Time = 0;
          let tp1Price = takeProfit1;

          for (let j = i + 1; j < candles.length; j++) {
            const cj = candles[j];
            if (position === "BUY") {
              if (!hitTP1) {
                if (cj.low <= stopLoss) {
                  closed = true;
                  closePrice = stopLoss;
                  closeTime = cj.time * 1000;
                  status = "SL";
                  break;
                }
                if (cj.high >= takeProfit1) {
                  hitTP1 = true;
                  tp1Time = cj.time * 1000;
                  if (cj.high >= takeProfit2) {
                    closed = true;
                    closePrice = takeProfit2;
                    closeTime = cj.time * 1000;
                    status = "TP2";
                    break;
                  }
                }
              } else {
                if (cj.high >= takeProfit2) {
                  closed = true;
                  closePrice = takeProfit2;
                  closeTime = cj.time * 1000;
                  status = "TP2";
                  break;
                }
                if (cj.low <= stopLoss) {
                  closed = true;
                  closePrice = tp1Price;
                  closeTime = tp1Time;
                  status = "TP1";
                  break;
                }
              }
            } else { // SELL
              if (!hitTP1) {
                if (cj.high >= stopLoss) {
                  closed = true;
                  closePrice = stopLoss;
                  closeTime = cj.time * 1000;
                  status = "SL";
                  break;
                }
                if (cj.low <= takeProfit1) {
                  hitTP1 = true;
                  tp1Time = cj.time * 1000;
                  if (cj.low <= takeProfit2) {
                    closed = true;
                    closePrice = takeProfit2;
                    closeTime = cj.time * 1000;
                    status = "TP2";
                    break;
                  }
                }
              } else {
                if (cj.low <= takeProfit2) {
                  closed = true;
                  closePrice = takeProfit2;
                  closeTime = cj.time * 1000;
                  status = "TP2";
                  break;
                }
                if (cj.high >= stopLoss) {
                  closed = true;
                  closePrice = tp1Price;
                  closeTime = tp1Time;
                  status = "TP1";
                  break;
                }
              }
            }
          }

          if (!closed && hitTP1) {
            closed = true;
            closePrice = tp1Price;
            closeTime = tp1Time;
            status = "TP1";
          }

          if (closed) {
            let pips = 0;
            if (position === "BUY") {
              pips = Number(((closePrice - entry) * 10).toFixed(1));
            } else {
              pips = Number(((entry - closePrice) * 10).toFixed(1));
            }

            const multiplier = 100; // Gold point contract size
            const lotSize = tf === "1" ? 0.1 : tf === "5" ? 0.2 : tf === "15" ? 0.5 : tf === "60" ? 1.0 : 2.0;
            let profitUsd = 0;
            if (position === "BUY") {
              profitUsd = Number(((closePrice - entry) * multiplier * lotSize).toFixed(2));
            } else {
              profitUsd = Number(((entry - closePrice) * multiplier * lotSize).toFixed(2));
            }

            const tfUiName = tf === "1" ? "M1" : tf === "5" ? "M5" : tf === "15" ? "M15" : tf === "60" ? "H1" : "D1";

            const trade: ClosedTrade = {
              id: `${tfUiName}-${openTime}-${Math.random().toString(36).substring(2, 6)}`,
              timeframe: tfUiName,
              position,
              entry,
              stopLoss,
              takeProfit1,
              takeProfit2,
              status,
              openTime,
              closeTime,
              pips,
              profitUsd,
            };

            await saveClosedTrade(trade);
            list.push(trade);

            // Fast forward index to close point
            const closeIndex = candles.findIndex((c: Candle) => c.time * 1000 === closeTime);
            if (closeIndex !== -1 && closeIndex > i) {
              i = closeIndex;
            }
          }
        }
        i++;
      }
    } catch (err) {
      console.error(`Error in backtest seeding for timeframe ${tf}:`, err);
    }
  }

  console.log(`Seeding complete. Saved ${list.length} trades.`);

  // Write physical reports to 'backtest_reports/' folder
  try {
    await Deno.mkdir("backtest_reports", { recursive: true });

    // 1. JSON Report
    const jsonPath = "backtest_reports/latest_backtest.json";
    await Deno.writeTextFile(jsonPath, JSON.stringify(list, null, 2));

    // 2. CSV Report
    const csvPath = "backtest_reports/latest_backtest.csv";
    let csvContent = "ID,Timeframe,Position,Entry,Stop Loss,Take Profit 1,Take Profit 2,Status,Open Time,Close Time,Pips,Profit USD\n";
    for (const t of list) {
      const openDate = new Date(t.openTime).toISOString();
      const closeDate = new Date(t.closeTime).toISOString();
      csvContent += `"${t.id}","${t.timeframe}","${t.position}",${t.entry},${t.stopLoss},${t.takeProfit1},${t.takeProfit2},"${t.status}","${openDate}","${closeDate}",${t.pips},${t.profitUsd}\n`;
    }
    await Deno.writeTextFile(csvPath, csvContent);
    console.log("✅ Successfully saved physical reports in backtest_reports/ directory.");
  } catch (fileErr) {
    console.error("❌ Failed to write backtest report files:", fileErr);
  }

  return list.sort((a, b) => b.closeTime - a.closeTime);
}

// GET /backtest/history - Fetch persistent closed trades
backtestRouter.get("/backtest/history", async (c) => {
  try {
    let trades = await getClosedTrades();
    if (trades.length === 0) {
      trades = await seedBacktestHistory();
    }
    return c.json({ success: true, trades });
  } catch (err: any) {
    return c.json({ error: "Lỗi hệ thống khi lấy lịch sử giao dịch: " + err.message }, 500);
  }
});

// POST /backtest/reset - Force rerun chronological backtest simulation
backtestRouter.post("/backtest/reset", async (c) => {
  try {
    const trades = await seedBacktestHistory();
    return c.json({ success: true, trades, message: "Đã hoàn thành chạy lại backtest thực tế từ dữ liệu nến biểu đồ!" });
  } catch (err: any) {
    return c.json({ error: "Lỗi hệ thống khi chạy lại backtest: " + err.message }, 500);
  }
});

// Extra safe backup for dual prefix compatibility
backtestRouter.post("/api/backtest/reset", async (c) => {
  try {
    const trades = await seedBacktestHistory();
    return c.json({ success: true, trades, message: "Đã hoàn thành chạy lại backtest thực tế từ dữ liệu nến biểu đồ!" });
  } catch (err: any) {
    return c.json({ error: "Lỗi hệ thống khi chạy lại backtest: " + err.message }, 500);
  }
});
