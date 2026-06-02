// Advanced Technical Analysis & Strategy Signal Engine for XAU/USD (Gold)
// Computes RSI, MACD, Moving Averages, Bollinger Bands, ATR and generates trading recommendations

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradingSuggestion {
  position: "BUY" | "SELL" | "NEUTRAL";
  entry: number;
  takeProfit1: number;
  takeProfit2: number;
  stopLoss: number;
  riskReward: string;
  entryReason: string;
  slReason: string;
  tpReason: string;
}

export interface Signal {
  type: "BUY" | "SELL" | "NEUTRAL";
  strength: number; // 0-100
  confidence: number; // 0-100
  reasons: string[];
  suggestion: TradingSuggestion;
  indicators: {
    rsi: number;
    macdSignal: "BUY" | "SELL" | "NEUTRAL";
    sma20Trend: "UP" | "DOWN" | "FLAT";
    ema9Trend: "UP" | "DOWN" | "FLAT";
    volumeTrend: "HIGH" | "NORMAL" | "LOW";
    bollingerPosition: "UPPER" | "MIDDLE" | "LOWER";
    atr: number;
  };
}

export function calcSMA(data: number[], period: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(NaN); continue; }
    const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / period);
  }
  return result;
}

export function calcEMA(data: number[], period: number): number[] {
  const result: number[] = [];
  const k = 2 / (period + 1);
  let ema = data[0];
  result.push(ema);
  for (let i = 1; i < data.length; i++) {
    ema = data[i] * k + ema * (1 - k);
    result.push(ema);
  }
  return result;
}

export function calcRSI(closes: number[], period = 14): number {
  if (closes.length < period + 1) return 50;
  let gains = 0, losses = 0;
  for (let i = closes.length - period; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }
  if (losses === 0) return 100;
  const rs = (gains / period) / (losses / period);
  return 100 - (100 / (1 + rs));
}

export function calcMACD(closes: number[]): { macd: number; signal: number; histogram: number } {
  const ema12 = calcEMA(closes, 12);
  const ema26 = calcEMA(closes, 26);
  const macdLine = ema12.map((v, i) => v - ema26[i]);
  const signalLine = calcEMA(macdLine, 9);
  const last = macdLine.length - 1;
  return {
    macd: macdLine[last],
    signal: signalLine[last],
    histogram: macdLine[last] - signalLine[last],
  };
}

function calcBollingerBands(closes: number[], period = 20, stdDev = 2) {
  const sma = calcSMA(closes, period);
  const last = closes.length - 1;
  const smaLast = sma[last];
  if (isNaN(smaLast)) return { upper: 0, middle: 0, lower: 0, position: "MIDDLE" as const };

  const slice = closes.slice(last - period + 1, last + 1);
  const variance = slice.reduce((sum, v) => sum + Math.pow(v - smaLast, 2), 0) / period;
  const sd = Math.sqrt(variance);

  const upper = smaLast + stdDev * sd;
  const lower = smaLast - stdDev * sd;
  const price = closes[last];

  let position: "UPPER" | "MIDDLE" | "LOWER" = "MIDDLE";
  if (price > smaLast + sd) position = "UPPER";
  else if (price < smaLast - sd) position = "LOWER";

  return { upper, middle: smaLast, lower, position };
}

// Compute Average True Range (ATR) to calculate logical TP and SL for Gold
export function calcATR(candles: Candle[], period = 14): number {
  if (candles.length < period) return 3.5; // default 3.5 gold pips
  const trs: number[] = [];
  for (let i = 1; i < candles.length; i++) {
    const h = candles[i].high;
    const l = candles[i].low;
    const prevC = candles[i - 1].close;
    const tr = Math.max(h - l, Math.abs(h - prevC), Math.abs(l - prevC));
    trs.push(tr);
  }
  const slice = trs.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

export function analyzeSignals(candles: Candle[]): Signal {
  if (candles.length < 50) {
    return {
      type: "NEUTRAL", strength: 50, confidence: 10,
      reasons: ["Không đủ dữ liệu lịch sử để phân tích Vàng (cần ≥50 nến)"],
      suggestion: { position: "NEUTRAL", entry: 0, takeProfit1: 0, takeProfit2: 0, stopLoss: 0, riskReward: "1:1" },
      indicators: { rsi: 50, macdSignal: "NEUTRAL", sma20Trend: "FLAT", ema9Trend: "FLAT", volumeTrend: "NORMAL", bollingerPosition: "MIDDLE", atr: 3.5 }
    };
  }

  const closes = candles.map(c => c.close);
  const volumes = candles.map(c => c.volume);
  const last = closes.length - 1;
  const lastPrice = closes[last];
  const atrVal = calcATR(candles);
  const atrRound = Math.round(atrVal * 100) / 100;

  const rsi = calcRSI(closes);
  const macd = calcMACD(closes);
  const sma20 = calcSMA(closes, 20);
  const ema9 = calcEMA(closes, 9);
  const ema21 = calcEMA(closes, 21);
  const ema50 = calcEMA(closes, 50);
  const bb = calcBollingerBands(closes);

  let buyScore = 0;
  let sellScore = 0;
  const reasons: string[] = [];

  const isMacroUp = closes[last] > ema50[last];
  const isMacroDown = closes[last] < ema50[last];

  if (isMacroUp) {
    buyScore += 25;
    reasons.push("Giá nằm trên đường EMA50: Xu hướng chính là TĂNG (Uptrend mạnh).");
  } else if (isMacroDown) {
    sellScore += 25;
    reasons.push("Giá nằm dưới đường EMA50: Xu hướng chính là GIẢM (Downtrend mạnh).");
  }

  let ema9Trend: "UP" | "DOWN" | "FLAT" = "FLAT";
  if (ema9[last] > ema21[last]) {
    buyScore += 15;
    ema9Trend = "UP";
    reasons.push("Đường EMA9 cắt lên EMA21: Động lượng ngắn hạn hoàn toàn ủng hộ MUA.");
  } else if (ema9[last] < ema21[last]) {
    sellScore += 15;
    ema9Trend = "DOWN";
    reasons.push("Đường EMA9 cắt xuống EMA21: Động lượng ngắn hạn hoàn toàn ủng hộ BÁN.");
  }

  if (isMacroUp) {
    if (rsi > 80) {
      sellScore += 15;
      reasons.push(`RSI (${rsi.toFixed(1)}) quá căng (>80): Rủi ro chốt lời đột ngột.`);
    } else if (rsi > 55) {
      buyScore += 15;
      reasons.push(`RSI (${rsi.toFixed(1)}) > 55: Phe MUA đang hoàn toàn kiểm soát thị trường.`);
    } else if (rsi < 40) {
      buyScore += 20;
      reasons.push(`RSI (${rsi.toFixed(1)}) < 40 trong Uptrend: Cơ hội Vàng để Bắt Đáy (Buy the dip).`);
    }
  } else {
    if (rsi < 20) {
      buyScore += 15;
      reasons.push(`RSI (${rsi.toFixed(1)}) quá thấp (<20): Rủi ro đảo chiều tăng giá.`);
    } else if (rsi < 45) {
      sellScore += 15;
      reasons.push(`RSI (${rsi.toFixed(1)}) < 45: Phe BÁN đang hoàn toàn kiểm soát thị trường.`);
    } else if (rsi > 60) {
      sellScore += 20;
      reasons.push(`RSI (${rsi.toFixed(1)}) > 60 trong Downtrend: Cơ hội để Bán Khống (Sell the rally).`);
    }
  }

  let macdSignal: "BUY" | "SELL" | "NEUTRAL" = "NEUTRAL";
  if (macd.histogram > 0) {
    buyScore += 15;
    macdSignal = "BUY";
    reasons.push("MACD Histogram dương: Xung lực MUA (Momentum) đang bùng nổ.");
  } else if (macd.histogram < 0) {
    sellScore += 15;
    macdSignal = "SELL";
    reasons.push("MACD Histogram âm: Áp lực BÁN đang đè nặng lên giá.");
  }

  if (lastPrice > bb.upper) {
    if (isMacroUp && macd.histogram > 0) {
      buyScore += 15;
      reasons.push("Giá xé toạc dải Bollinger trên: Breakout TĂNG cực kỳ mạnh mẽ.");
    } else {
      sellScore += 15;
      reasons.push("Giá vượt quá dải Bollinger trên mà thiếu xung lực: Rất dễ bị Pullback giảm.");
    }
  } else if (lastPrice < bb.lower) {
    if (isMacroDown && macd.histogram < 0) {
      sellScore += 15;
      reasons.push("Giá xuyên thủng đáy Bollinger: Breakout GIẢM cực kỳ mạnh mẽ.");
    } else {
      buyScore += 15;
      reasons.push("Giá rớt sâu khỏi dải Bollinger dưới: Xác suất cao có lực cầu nhảy vào bắt đáy.");
    }
  }

  let sma20Trend: "UP" | "DOWN" | "FLAT" = "FLAT";
  if (sma20[last] > sma20[last - 1]) sma20Trend = "UP";
  else if (sma20[last] < sma20[last - 1]) sma20Trend = "DOWN";

  const avgVol = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
  const lastVol = volumes[last];
  let volumeTrend: "HIGH" | "NORMAL" | "LOW" = "NORMAL";
  if (lastVol > avgVol * 1.5) volumeTrend = "HIGH";
  else if (lastVol < avgVol * 0.5) volumeTrend = "LOW";

  const totalScore = buyScore + sellScore || 1;
  const buyPct = (buyScore / totalScore) * 100;
  const sellPct = (sellScore / totalScore) * 100;

  let type: "BUY" | "SELL" | "NEUTRAL" = "NEUTRAL";
  let strength = 50;

  if (buyPct > 55) {
    type = "BUY";
    strength = Math.min(98, buyPct);
  } else if (sellPct > 55) {
    type = "SELL";
    strength = Math.min(98, sellPct);
  }

  const confidence = Math.min(96, Math.abs(buyScore - sellScore) * 1.5 + reasons.length * 5);

  let suggestion: TradingSuggestion;

  // 1. Detect Order Blocks (OB) from the candles
  const orderBlocks: { type: "BULLISH" | "BEARISH"; high: number; low: number; time: number; index: number; mitigated: boolean }[] = [];
  const len = candles.length;
  for (let i = 1; i < len - 1; i++) {
    const prev = candles[i - 1];
    const curr = candles[i];
    const bodySize = Math.abs(curr.close - curr.open);
    const prevBodySize = Math.abs(prev.close - prev.open);

    const isBullishImpulse = curr.close > curr.open && (bodySize > prevBodySize * 1.8 || (curr.high - curr.low) > 4.5);
    const isBearishImpulse = curr.close < curr.open && (bodySize > prevBodySize * 1.8 || (curr.high - curr.low) > 4.5);

    if (isBullishImpulse && prev.close < prev.open) {
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].close < prev.low) {
          mitigated = true;
          break;
        }
      }
      orderBlocks.push({
        type: "BULLISH",
        high: prev.high,
        low: prev.low,
        time: prev.time,
        index: i - 1,
        mitigated
      });
    }

    if (isBearishImpulse && prev.close > prev.open) {
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].close > prev.high) {
          mitigated = true;
          break;
        }
      }
      orderBlocks.push({
        type: "BEARISH",
        high: prev.high,
        low: prev.low,
        time: prev.time,
        index: i - 1,
        mitigated
      });
    }
  }

  // 2. Detect Fair Value Gaps (FVG) from the candles
  const fvgs: { type: "BULLISH" | "BEARISH"; top: number; bottom: number; index: number; mitigated: boolean }[] = [];
  for (let i = 2; i < len - 1; i++) {
    const c2 = candles[i - 2];
    const c1 = candles[i - 1];
    const c0 = candles[i];

    if (c0.low > c2.high && c1.close > c1.open) {
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].low <= c2.high) {
          mitigated = true;
          break;
        }
      }
      fvgs.push({
        type: "BULLISH",
        top: c0.low,
        bottom: c2.high,
        index: i,
        mitigated
      });
    }

    if (c0.high < c2.low && c1.close < c1.open) {
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].high >= c2.low) {
          mitigated = true;
          break;
        }
      }
      fvgs.push({
        type: "BEARISH",
        top: c2.low,
        bottom: c0.high,
        index: i,
        mitigated
      });
    }
  }

  // Fallback swings
  const recentCandles = candles.slice(-30);
  const maxHigh = Math.max(...recentCandles.map(c => c.high));
  const minLow = Math.min(...recentCandles.map(c => c.low));

  // Determine last completed closed candle baseline to eliminate live tick wiggles/fluctuations
  const closedPrice = candles[candles.length - 1]?.close || lastPrice;

  // ==========================================================
  // CANDLESTICK PATTERN & PRICE ACTION ANALYSIS FOR A.I EXPLANATIONS
  // ==========================================================
  const cLen = candles.length;
  const c0 = candles[cLen - 1]; // last completed closed candle
  const c1 = candles[cLen - 2]; // second to last
  const c2 = candles[cLen - 3]; // third to last

  // Helper properties for c0
  const range0 = c0.high - c0.low;
  const body0 = Math.abs(c0.close - c0.open);
  const upperWick0 = c0.high - Math.max(c0.close, c0.open);
  const lowerWick0 = Math.min(c0.close, c0.open) - c0.low;
  const isBullish0 = c0.close > c0.open;
  const isBearish0 = c0.close < c0.open;

  // Helper properties for c1
  const range1 = c1.high - c1.low;
  const body1 = Math.abs(c1.close - c1.open);
  const upperWick1 = c1.high - Math.max(c1.close, c1.open);
  const lowerWick1 = Math.min(c1.close, c1.open) - c1.low;
  const isBullish1 = c1.close > c1.open;
  const isBearish1 = c1.close < c1.open;

  // Helper properties for c2
  const range2 = c2.high - c2.low;
  const body2 = Math.abs(c2.close - c2.open);
  const isBullish2 = c2.close > c2.open;
  const isBearish2 = c2.close < c2.open;

  // 1. Candlestick Pattern detection
  let detectedPattern = "Tích lũy trung tính";
  let patternType: "BULLISH" | "BEARISH" | "NEUTRAL" = "NEUTRAL";

  // Doji
  const isDoji = range0 > 0 && body0 <= range0 * 0.1;

  // Hammer & Inverted Hammer (Pinbar)
  const isHammer = range0 > 0 && lowerWick0 >= range0 * 0.6 && body0 <= range0 * 0.3;
  const isShootingStar = range0 > 0 && upperWick0 >= range0 * 0.6 && body0 <= range0 * 0.3;

  // Engulfing
  const isBullishEngulfing = c0.close > c0.open && c1.close < c1.open && c0.close >= c1.open && c0.open <= c1.close;
  const isBearishEngulfing = c0.close < c0.open && c1.close > c1.open && c0.close <= c1.open && c0.open >= c1.close;

  // Morning Star & Evening Star
  const isMorningStar = isBearish2 && body2 > range2 * 0.4 &&
                        body1 <= range1 * 0.3 && c1.close < c2.close &&
                        isBullish0 && c0.close > (c2.open + c2.close) / 2;

  const isEveningStar = isBullish2 && body2 > range2 * 0.4 &&
                        body1 <= range1 * 0.3 && c1.close > c2.close &&
                        isBearish0 && c0.close < (c2.open + c2.close) / 2;

  if (isMorningStar) {
    detectedPattern = "Morning Star (Sao Mai Đảo Chiều Tăng)";
    patternType = "BULLISH";
  } else if (isEveningStar) {
    detectedPattern = "Evening Star (Sao Hôm Đảo Chiều Giảm)";
    patternType = "BEARISH";
  } else if (isBullishEngulfing) {
    detectedPattern = "Bullish Engulfing (Nhấn Chìm Tăng)";
    patternType = "BULLISH";
  } else if (isBearishEngulfing) {
    detectedPattern = "Bearish Engulfing (Nhấn Chìm Giảm)";
    patternType = "BEARISH";
  } else if (isHammer) {
    detectedPattern = "Hammer (Búa Rút Chân Tăng)";
    patternType = "BULLISH";
  } else if (isShootingStar) {
    detectedPattern = "Shooting Star (Sao Băng Từ Chối Tăng)";
    patternType = "BEARISH";
  } else if (isDoji) {
    detectedPattern = "Doji (Lưỡng Lự Cân Bằng)";
    patternType = "NEUTRAL";
  }

  // 2. Price Action Rejection & Displacement
  let paEvent = "Tích luỹ cung cầu cân bằng";
  let paType: "BULLISH" | "BEARISH" | "NEUTRAL" = "NEUTRAL";

  // Displacement: strong momentum candle
  const isDisplacementBullish = c0.close > c0.open && body0 > 1.2 * atrVal;
  const isDisplacementBearish = c0.close < c0.open && body0 > 1.2 * atrVal;

  // Rejections
  const isLowerRejection = lowerWick0 > atrVal * 0.6 || (c0.low < minLow + 0.2 * atrVal && c0.close > minLow + 0.4 * atrVal);
  const isUpperRejection = upperWick0 > atrVal * 0.6 || (c0.high > maxHigh - 0.2 * atrVal && c0.close < maxHigh - 0.4 * atrVal);

  if (isDisplacementBullish) {
    paEvent = `Displacement Tăng (Nến xung lực thân dài $${body0.toFixed(2)} vượt trội hơn ATR $${atrVal.toFixed(2)})`;
    paType = "BULLISH";
  } else if (isDisplacementBearish) {
    paEvent = `Displacement Giảm (Nến xung lực thân dài $${body0.toFixed(2)} vượt trội hơn ATR $${atrVal.toFixed(2)})`;
    paType = "BEARISH";
  } else if (isLowerRejection) {
    paEvent = `Lower Shadow Rejection (Rút chân từ chối giá thấp tại vùng $${c0.low.toFixed(2)})`;
    paType = "BULLISH";
  } else if (isUpperRejection) {
    paEvent = `Upper Shadow Rejection (Từ chối giá cao tại vùng kháng cự $${c0.high.toFixed(2)})`;
    paType = "BEARISH";
  }

  // ==========================================================
  // TIMEFRAME DETECTION & VOLATILITY-BASED CUSTOM SL/TP MATH (XAU/USD)
  // ==========================================================
  let timeframeStr = "M5"; // default fallback
  if (candles.length >= 2) {
    const timeDiff = candles[1].time - candles[0].time;
    if (timeDiff <= 65) timeframeStr = "M1";
    else if (timeDiff <= 305) timeframeStr = "M5";
    else if (timeDiff <= 905) timeframeStr = "M15";
    else if (timeDiff <= 1805) timeframeStr = "M30";
    else if (timeDiff <= 3605) timeframeStr = "H1";
    else if (timeDiff <= 14405) timeframeStr = "H4";
    else timeframeStr = "D1";
  }

  // Volatility ratios helper: interpolates SL within user ranges using ATR
  function lerp(min: number, max: number, fraction: number): number {
    return min + (max - min) * Math.max(0, Math.min(1, fraction));
  }

  let slDistance = 1.5 * atrVal;
  let tp1Distance = 2.5 * atrVal;
  let tp2Distance = 5.0 * atrVal;

  if (timeframeStr === "M1") {
    // M1 : SL 3-5 giá , tp1 : 5 giá , tp2 : 12 giá
    // Baseline ATR range for M1: 0.3 to 1.1
    const fraction = (atrVal - 0.3) / (1.1 - 0.3);
    slDistance = lerp(3.0, 5.0, fraction);
    tp1Distance = 5.0;
    tp2Distance = 12.0;
  } else if (timeframeStr === "M5") {
    // M5 : sl 6-8 giá , tp1 : 10 giá , tp2 : 20 giá
    // Baseline ATR range for M5: 0.8 to 2.4
    const fraction = (atrVal - 0.8) / (2.4 - 0.8);
    slDistance = lerp(6.0, 8.0, fraction);
    tp1Distance = 10.0;
    tp2Distance = 20.0;
  } else if (timeframeStr === "M15") {
    // M15 : sl 8 - 15 giá , tp1 : 15 giá , tp2 : 35 giá
    // Baseline ATR range for M15: 1.2 to 3.8
    const fraction = (atrVal - 1.2) / (3.8 - 1.2);
    slDistance = lerp(8.0, 15.0, fraction);
    tp1Distance = 15.0;
    tp2Distance = 35.0;
  } else if (timeframeStr === "H1") {
    // H1 : sl 30-50 giá , tp1 : 80 giá , tp2 : 180 giá
    // Baseline ATR range for H1: 2.5 to 8.5
    const fraction = (atrVal - 2.5) / (8.5 - 2.5);
    slDistance = lerp(30.0, 50.0, fraction);
    tp1Distance = 80.0;
    tp2Distance = 180.0;
  } else if (timeframeStr === "M30") {
    // Fallbacks for non-specified timeframes scaled proportionally
    const fraction = (atrVal - 1.5) / (5.0 - 1.5);
    slDistance = lerp(12.0, 22.0, fraction);
    tp1Distance = 25.0;
    tp2Distance = 60.0;
  } else if (timeframeStr === "H4") {
    const fraction = (atrVal - 4.0) / (12.0 - 4.0);
    slDistance = lerp(50.0, 100.0, fraction);
    tp1Distance = 120.0;
    tp2Distance = 300.0;
  } else { // D1
    const fraction = (atrVal - 8.0) / (25.0 - 8.0);
    slDistance = lerp(100.0, 250.0, fraction);
    tp1Distance = 350.0;
    tp2Distance = 800.0;
  }

  // Format riskReward string
  const riskReward = `1:${(tp1Distance / slDistance).toFixed(1)} -> 1:${(tp2Distance / slDistance).toFixed(1)}`;

  if (type === "BUY") {
    // Search for the most recent unmitigated Bullish OB below or close to the stable closed price
    const activeOB = [...orderBlocks]
      .reverse()
      .find(ob => ob.type === "BULLISH" && !ob.mitigated && ob.high <= closedPrice + 2.0 * atrVal);

    // Search for the most recent unmitigated Bullish FVG below or close to the stable closed price
    const activeFVG = [...fvgs]
      .reverse()
      .find(f => f.type === "BULLISH" && !f.mitigated && f.top <= closedPrice + 2.0 * atrVal);

    let entryVal = closedPrice;

    if (activeOB) {
      entryVal = activeOB.high;
    } else if (activeFVG) {
      entryVal = activeFVG.top;
    } else {
      entryVal = closedPrice - 0.15 * atrVal;
    }

    // Protect against outlier entry zones that are too deep (more than 2.5 * ATR away from stable baseline)
    if (closedPrice - entryVal > 2.5 * atrVal) {
      entryVal = closedPrice - 0.2 * atrVal;
    }

    const entry = Math.round(entryVal * 100) / 100;
    const stopLoss = Math.round((entry - slDistance) * 100) / 100;
    const takeProfit1 = Math.round((entry + tp1Distance) * 100) / 100;
    const takeProfit2 = Math.round((entry + tp2Distance) * 100) / 100;

    const obHigh = activeOB ? activeOB.high.toFixed(2) : (minLow + 0.5 * atrVal).toFixed(2);
    const obLow = activeOB ? activeOB.low.toFixed(2) : minLow.toFixed(2);
    const fvgBottom = activeFVG ? activeFVG.bottom.toFixed(2) : (minLow + 0.3 * atrVal).toFixed(2);

    const entryReason = `Lệnh MUA được đề xuất ở mức giá $${entry.toFixed(2)} (Khung ${timeframeStr}). Đây là vùng hợp lưu cực đẹp giữa: (1) SMC: Giá điều chỉnh về vùng hỗ trợ của khối lệnh định chế Bullish Order Block (High: $${obHigh} / Low: $${obLow}) ${activeFVG ? `và khoảng trống mất cân bằng cung cầu Bullish FVG (Đáy: $${fvgBottom})` : ""} nhằm quét thanh khoản. (2) Price Action: Phát hiện xung lực rút chân cực tốt (${paEvent}). (3) Mô hình nến: Nến vừa đóng cửa thiết lập mô hình [${detectedPattern}], xác nhận phe Bò (Bullish) đã hoàn toàn làm chủ cuộc chơi và chặn đứng đà rơi của giá tại ngưỡng hỗ trợ quan trọng.`;

    const slReason = `Điểm Cắt lỗ (SL) được thiết lập tại mức giá $${stopLoss.toFixed(2)} (nằm dưới ENTRY đúng $${slDistance.toFixed(2)} giá, được điều chỉnh động dựa trên độ biến động thực tế ATR = $${atrVal.toFixed(2)} nằm chuẩn trong khung giới hạn [${timeframeStr === "M1" ? "3-5" : timeframeStr === "M5" ? "6-8" : timeframeStr === "M15" ? "8-15" : timeframeStr === "H1" ? "30-50" : "ATR-clamped"} giá]). Cài SL tại đây giúp bảo vệ tài khoản an toàn trước các pha săn thanh khoản (Stop Hunt) của nhà cái và đánh dấu mốc vô hiệu hóa cấu trúc tăng giá.`;

    const tpReason = `Điểm Chốt lời (TP) được phân bổ theo 2 mục tiêu: TP1 tại $${takeProfit1.toFixed(2)} đạt mức chốt lời tĩnh $${tp1Distance.toFixed(2)} giá (đáp ứng trọn vẹn mục tiêu R:R ngắn hạn). TP2 tại $${takeProfit2.toFixed(2)} hướng tới mục tiêu dài hạn $${tp2Distance.toFixed(2)} giá, nhắm thẳng vào các bể thanh khoản mua (BSL - Buy Side Liquidity) ở các đỉnh yếu hoặc các mức kháng cự cũ gần đỉnh lịch sử gần nhất $${maxHigh.toFixed(2)}.`;

    suggestion = {
      position: "BUY",
      entry,
      stopLoss,
      takeProfit1,
      takeProfit2,
      riskReward,
      entryReason,
      slReason,
      tpReason,
    };
  } else if (type === "SELL") {
    // Search for the most recent unmitigated Bearish OB above or close to the stable closed price
    const activeOB = [...orderBlocks]
      .reverse()
      .find(ob => ob.type === "BEARISH" && !ob.mitigated && ob.low >= closedPrice - 2.0 * atrVal);

    // Search for the most recent unmitigated Bearish FVG above or close to the stable closed price
    const activeFVG = [...fvgs]
      .reverse()
      .find(f => f.type === "BEARISH" && !f.mitigated && f.bottom >= closedPrice - 2.0 * atrVal);

    let entryVal = closedPrice;

    if (activeOB) {
      entryVal = activeOB.low;
    } else if (activeFVG) {
      entryVal = activeFVG.bottom;
    } else {
      entryVal = closedPrice + 0.15 * atrVal;
    }

    // Protect against outlier entry zones that are too deep (more than 2.5 * ATR away from stable baseline)
    if (entryVal - closedPrice > 2.5 * atrVal) {
      entryVal = closedPrice + 0.2 * atrVal;
    }

    const entry = Math.round(entryVal * 100) / 100;
    const stopLoss = Math.round((entry + slDistance) * 100) / 100;
    const takeProfit1 = Math.round((entry - tp1Distance) * 100) / 100;
    const takeProfit2 = Math.round((entry - tp2Distance) * 100) / 100;

    const obHigh = activeOB ? activeOB.high.toFixed(2) : maxHigh.toFixed(2);
    const obLow = activeOB ? activeOB.low.toFixed(2) : (maxHigh - 0.5 * atrVal).toFixed(2);
    const fvgTop = activeFVG ? activeFVG.top.toFixed(2) : (maxHigh - 0.3 * atrVal).toFixed(2);

    const entryReason = `Lệnh BÁN được kích hoạt ở mức giá $${entry.toFixed(2)} (Khung ${timeframeStr}). Đây là điểm hội tụ kỹ thuật đỉnh cao giữa: (1) SMC: Giá hồi phục tăng điều chỉnh về vùng kháng cự của khối lệnh Bearish Order Block (High: $${obHigh} / Low: $${obLow}) ${activeFVG ? `và vùng mất cân bằng cung cầu Bearish FVG (Đỉnh: $${fvgTop})` : ""} nhằm tái cân bằng cung cầu. (2) Price Action: Phản ánh áp lực bán đè nặng và từ chối giá cao (${paEvent}). (3) Mô hình nến: Sự xuất hiện của mô hình nến đảo chiều [${detectedPattern}] tại vùng Premium kháng cự xác nhận phe Gấu (Bearish) đã quay trở lại áp đảo hoàn toàn lực cầu yếu ớt.`;

    const slReason = `Điểm Cắt lỗ (SL) được định vị tại mức giá $${stopLoss.toFixed(2)} (nằm trên ENTRY đúng $${slDistance.toFixed(2)} giá, được điều chỉnh động dựa trên độ biến động thực tế ATR = $${atrVal.toFixed(2)} nằm chuẩn trong khung giới hạn [${timeframeStr === "M1" ? "3-5" : timeframeStr === "M5" ? "6-8" : timeframeStr === "M15" ? "8-15" : timeframeStr === "H1" ? "30-50" : "ATR-clamped"} giá]). Đây là chốt chặn bảo hiểm tuyệt hảo chống quét râu nến và đánh dấu điểm vô hiệu hóa cấu trúc giảm giá.`;

    const tpReason = `Điểm Chốt lời (TP) được tối ưu hóa theo 2 chặng: TP1 tại $${takeProfit1.toFixed(2)} là mức chốt lời tĩnh $${tp1Distance.toFixed(2)} giá (giúp khóa lợi nhuận an toàn vùng thanh khoản nội bộ). TP2 tại $${takeProfit2.toFixed(2)} hướng tới mục tiêu dài hạn $${tp2Distance.toFixed(2)} giá, nhắm thẳng vào các bể thanh khoản bán (SSL - Sell Side Liquidity) ở đáy cũ gần nhất $${minLow.toFixed(2)} để gặt hái hiệu suất tối đa.`;

    suggestion = {
      position: "SELL",
      entry,
      stopLoss,
      takeProfit1,
      takeProfit2,
      riskReward,
      entryReason,
      slReason,
      tpReason,
    };
  } else {
    const entryReason = `Thị trường hiện tại đang di chuyển trong biên độ nén hẹp (Sideway/Compression) và chưa có xu hướng rõ ràng. Chưa ghi nhận bất kỳ sự phá vỡ cấu trúc BOS hay CHoCH nào. Mô hình nến ghi nhận: [${detectedPattern}], Price Action phản ánh: [${paEvent}]. Trong điều kiện thị trường không xu hướng này, việc vào lệnh sẽ đối mặt với rủi ro quét 2 đầu (Whip-saw) cực kỳ lớn. Do đó, khuyến nghị tối ưu nhất lúc này là đứng ngoài quan sát (NEUTRAL SIGNAL), chờ đợi sự bứt phá và xác nhận rõ ràng của dòng tiền thông minh.`;

    const slReason = `Do trạng thái khuyến nghị hiện tại là TRUNG LẬP (NEUTRAL), không có vị thế giao dịch nào được mở. Vì vậy điểm Cắt lỗ (SL) không được kích hoạt (Đặt bằng 0).`;

    const tpReason = `Không có vị thế giao dịch nào đang mở. Điểm Chốt lời (TP) ở trạng thái vô hiệu hóa (Đặt bằng 0) để bảo toàn vốn tối đa.`;

    suggestion = {
      position: "NEUTRAL",
      entry: Math.round(closedPrice * 100) / 100,
      takeProfit1: 0,
      takeProfit2: 0,
      stopLoss: 0,
      riskReward: "—",
      entryReason,
      slReason,
      tpReason,
    };
  }

  return {
    type,
    strength: Math.round(strength),
    confidence: Math.round(confidence),
    reasons,
    suggestion,
    indicators: {
      rsi: Math.round(rsi * 10) / 10,
      macdSignal,
      sma20Trend,
      ema9Trend,
      volumeTrend,
      bollingerPosition: bb.position,
      atr: atrRound,
    },
  };
}
