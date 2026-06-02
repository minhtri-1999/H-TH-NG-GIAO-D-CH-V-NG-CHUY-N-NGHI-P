import { getGoldChartData, getGoldRealtimePrice } from "../backend/api.ts";
import { analyzeSignals, type Candle } from "../backend/signals.ts";

console.log("Analyzing M1 signals...");
const chartRaw = await getGoldChartData("1");
const rt = await getGoldRealtimePrice();
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

console.log("Total candles:", candles.length);
if (candles.length > 0) {
  const firstCandle = new Date(candles[0].time * 1000).toISOString();
  const lastCandle = new Date(candles[candles.length - 1].time * 1000).toISOString();
  console.log("First candle:", firstCandle);
  console.log("Last candle:", lastCandle);
}

let signalsCount = 0;
let buyCount = 0;
let sellCount = 0;

for (let i = 50; i < candles.length - 2; i++) {
  const slice = candles.slice(0, i + 1);
  const sig = analyzeSignals(slice);
  if (sig.type === "BUY" || sig.type === "SELL") {
    signalsCount++;
    if (sig.type === "BUY") buyCount++;
    else sellCount++;
  }
}

console.log("Signals found in backtest loop:", signalsCount, "(BUY:", buyCount, ", SELL:", sellCount, ")");
Deno.exit(0);
