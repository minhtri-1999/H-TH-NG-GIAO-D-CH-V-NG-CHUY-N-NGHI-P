import { type Candle } from "./signals.ts";
import { type TradingViewRealtime } from "./api.ts";

export interface SwingPoint {
  index: number;
  time: number;
  type: "HIGH" | "LOW";
  price: number;
  broken: boolean;
}

export interface FVG {
  index: number;
  type: "BULLISH" | "BEARISH";
  top: number;
  bottom: number;
  mitigated: boolean;
}

export interface OrderBlock {
  index: number;
  type: "BULLISH" | "BEARISH";
  open: number;
  close: number;
  high: number;
  low: number;
  mitigated: boolean;
}

export interface StructureShift {
  type: "BOS" | "CHoCH";
  direction: "BULLISH" | "BEARISH";
  price: number;
  time: number;
  description: string;
}

export interface LiquiditySweep {
  type: "BSL" | "SSL";
  price: number;
  time: number;
  description: string;
}

export interface EmaTrend {
  alignment: "BULLISH" | "BEARISH" | "NEUTRAL";
  description: string;
  pullback: string;
  crossover: string;
}

export interface PriceActionPattern {
  name: string;
  type: "BULLISH" | "BEARISH";
  description: string;
  time: number;
}

export interface AdvancedAnalysis {
  swings: SwingPoint[];
  fvgs: FVG[];
  orderBlocks: OrderBlock[];
  structureShifts: StructureShift[];
  sweeps: LiquiditySweep[];
  emaTrend: EmaTrend;
  patterns: PriceActionPattern[];
}

export function analyzeAdvanced(candles: Candle[], rt: TradingViewRealtime): AdvancedAnalysis {
  const swings: SwingPoint[] = [];
  const fvgs: FVG[] = [];
  const orderBlocks: OrderBlock[] = [];
  const structureShifts: StructureShift[] = [];
  const sweeps: LiquiditySweep[] = [];
  const patterns: PriceActionPattern[] = [];

  const len = candles.length;
  if (len < 10) {
    return {
      swings: [],
      fvgs: [],
      orderBlocks: [],
      structureShifts: [],
      sweeps: [],
      emaTrend: { alignment: "NEUTRAL", description: "Không đủ dữ liệu nến", pullback: "NONE", crossover: "NONE" },
      patterns: [],
    };
  }

  // 1. SWING POINTS DETECTION (Swing High / Swing Low - 5 candle window)
  for (let i = 2; i < len - 2; i++) {
    const prev2 = candles[i - 2];
    const prev1 = candles[i - 1];
    const curr = candles[i];
    const next1 = candles[i + 1];
    const next2 = candles[i + 2];

    const isSwingHigh =
      curr.high > prev2.high &&
      curr.high > prev1.high &&
      curr.high > next1.high &&
      curr.high > next2.high;

    const isSwingLow =
      curr.low < prev2.low &&
      curr.low < prev1.low &&
      curr.low < next1.low &&
      curr.low < next2.low;

    if (isSwingHigh) {
      swings.push({ index: i, time: curr.time, type: "HIGH", price: curr.high, broken: false });
    } else if (isSwingLow) {
      swings.push({ index: i, time: curr.time, type: "LOW", price: curr.low, broken: false });
    }
  }

  // 2. BOS / CHOCH DETECTION (Market Structure Shifts)
  let lastShiftDirection: "BULLISH" | "BEARISH" | null = null;
  let activeSwingHigh: SwingPoint | null = null;
  let activeSwingLow: SwingPoint | null = null;

  for (let i = 0; i < len - 1; i++) {
    const c = candles[i];

    // Update active swings as we walk chronologically
    const swingAtIdx = swings.find((s) => s.index === i);
    if (swingAtIdx) {
      if (swingAtIdx.type === "HIGH") activeSwingHigh = swingAtIdx;
      else activeSwingLow = swingAtIdx;
    }

    // Check for break of active swing high (Bullish break)
    if (activeSwingHigh && c.close > activeSwingHigh.price && !activeSwingHigh.broken) {
      activeSwingHigh.broken = true;
      const type = lastShiftDirection === "BEARISH" ? "CHoCH" : "BOS";
      structureShifts.push({
        type,
        direction: "BULLISH",
        price: activeSwingHigh.price,
        time: c.time,
        description: type === "CHoCH"
          ? `Thay đổi tính chất xu hướng (CHoCH) TĂNG tại $${activeSwingHigh.price.toFixed(2)}`
          : `Phá vỡ cấu trúc tiếp diễn (BOS) TĂNG tại $${activeSwingHigh.price.toFixed(2)}`,
      });
      lastShiftDirection = "BULLISH";
      activeSwingHigh = null; // consumed
    }

    // Check for break of active swing low (Bearish break)
    if (activeSwingLow && c.close < activeSwingLow.price && !activeSwingLow.broken) {
      activeSwingLow.broken = true;
      const type = lastShiftDirection === "BULLISH" ? "CHoCH" : "BOS";
      structureShifts.push({
        type,
        direction: "BEARISH",
        price: activeSwingLow.price,
        time: c.time,
        description: type === "CHoCH"
          ? `Thay đổi tính chất xu hướng (CHoCH) GIẢM tại $${activeSwingLow.price.toFixed(2)}`
          : `Phá vỡ cấu trúc tiếp diễn (BOS) GIẢM tại $${activeSwingLow.price.toFixed(2)}`,
      });
      lastShiftDirection = "BEARISH";
      activeSwingLow = null; // consumed
    }
  }

  // 3. FAIR VALUE GAPS (FVG)
  for (let i = 2; i < len - 1; i++) {
    const c2 = candles[i - 2];
    const c1 = candles[i - 1];
    const c0 = candles[i];

    // Bullish FVG (Imbalance gap between candle i-2 High and candle i Low)
    if (c0.low > c2.high && c1.close > c1.open) {
      // Check if mitigated subsequently
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].low <= c2.high) {
          mitigated = true;
          break;
        }
      }
      fvgs.push({
        index: i,
        type: "BULLISH",
        top: c0.low,
        bottom: c2.high,
        mitigated,
      });
    }

    // Bearish FVG (Imbalance gap between candle i-2 Low and candle i High)
    if (c0.high < c2.low && c1.close < c1.open) {
      // Check if mitigated subsequently
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].high >= c2.low) {
          mitigated = true;
          break;
        }
      }
      fvgs.push({
        index: i,
        type: "BEARISH",
        top: c2.low,
        bottom: c0.high,
        mitigated,
      });
    }
  }

  // 4. ORDER BLOCKS (OB)
  for (let i = 1; i < len - 1; i++) {
    const prev = candles[i - 1];
    const curr = candles[i];

    const bodySize = Math.abs(curr.close - curr.open);
    const prevBodySize = Math.abs(prev.close - prev.open);

    // Dynamic impulse detection: current candle is highly explosive (at least 1.8x previous or > $4.50 range)
    const isBullishImpulse = curr.close > curr.open && (bodySize > prevBodySize * 1.8 || (curr.high - curr.low) > 4.5);
    const isBearishImpulse = curr.close < curr.open && (bodySize > prevBodySize * 1.8 || (curr.high - curr.low) > 4.5);

    if (isBullishImpulse && prev.close < prev.open) {
      // Preceding bearish candle is a Bullish Order Block
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].close < prev.low) {
          mitigated = true;
          break;
        }
      }
      orderBlocks.push({
        index: i - 1,
        type: "BULLISH",
        open: prev.open,
        close: prev.close,
        high: prev.high,
        low: prev.low,
        mitigated,
      });
    }

    if (isBearishImpulse && prev.close > prev.open) {
      // Preceding bullish candle is a Bearish Order Block
      let mitigated = false;
      for (let j = i + 1; j < len; j++) {
        if (candles[j].close > prev.high) {
          mitigated = true;
          break;
        }
      }
      orderBlocks.push({
        index: i - 1,
        type: "BEARISH",
        open: prev.open,
        close: prev.close,
        high: prev.high,
        low: prev.low,
        mitigated,
      });
    }
  }

  // 5. LIQUIDITY SWEEPS (Stop hunts)
  for (let i = 2; i < len - 1; i++) {
    const c = candles[i];
    // Find preceding swing high/low in the last 20 candles
    const recentSwings = swings.filter((s) => s.index < i && s.index >= i - 20);
    const recentHighs = recentSwings.filter((s) => s.type === "HIGH");
    const recentLows = recentSwings.filter((s) => s.type === "LOW");

    // Bearish Sweep (Buy-Side Liquidity BSL swept)
    if (recentHighs.length > 0) {
      const highestSwing = Math.max(...recentHighs.map((s) => s.price));
      if (c.high > highestSwing && c.close < highestSwing) {
        sweeps.push({
          type: "BSL",
          price: highestSwing,
          time: c.time,
          description: `Quét thanh khoản phe MUA (BSL) tại $${highestSwing.toFixed(2)}: Bẫy tăng giá từ chối râu nến.`,
        });
      }
    }

    // Bullish Sweep (Sell-Side Liquidity SSL swept)
    if (recentLows.length > 0) {
      const lowestSwing = Math.min(...recentLows.map((s) => s.price));
      if (c.low < lowestSwing && c.close > lowestSwing) {
        sweeps.push({
          type: "SSL",
          price: lowestSwing,
          time: c.time,
          description: `Quét thanh khoản phe BÁN (SSL) tại $${lowestSwing.toFixed(2)}: Bắt đáy quét lệnh dừng lỗ phe mua.`,
        });
      }
    }
  }

  // 6. EMA TREND FOLLOWING ENGINE (Real metrics from TV Scanner)
  let alignment: "BULLISH" | "BEARISH" | "NEUTRAL" = "NEUTRAL";
  let description = "Cấu trúc EMA đang tích lũy, các đường quấn vào nhau.";
  
  if (rt.ema10 > rt.ema20 && rt.ema20 > rt.ema50 && rt.ema50 > rt.ema100 && rt.ema100 > rt.ema200) {
    alignment = "BULLISH";
    description = "Sắp xếp xu hướng TĂNG hoàn hảo: EMA10 > EMA20 > EMA50 > EMA100 > EMA200.";
  } else if (rt.ema10 < rt.ema20 && rt.ema20 < rt.ema50 && rt.ema50 < rt.ema100 && rt.ema100 < rt.ema200) {
    alignment = "BEARISH";
    description = "Sắp xếp xu hướng GIẢM hoàn hảo: EMA10 < EMA20 < EMA50 < EMA100 < EMA200.";
  } else if (rt.ema10 > rt.ema50 && rt.ema50 > rt.ema200) {
    alignment = "BULLISH";
    description = "Xu hướng chính TĂNG TRƯỞNG: Các EMA ngắn hạn và trung hạn nằm trên EMA200.";
  } else if (rt.ema10 < rt.ema50 && rt.ema50 < rt.ema200) {
    alignment = "BEARISH";
    description = "Xu hướng chính SUY THOÁI: Các EMA ngắn hạn và trung hạn nằm dưới EMA200.";
  }

  // Pullback detection
  let pullback = "NONE";
  const currentPrice = rt.price;
  if (alignment === "BULLISH") {
    if (Math.abs(currentPrice - rt.ema20) / rt.ema20 <= 0.001) {
      pullback = "PULLBACK_EMA20_BUY";
    } else if (Math.abs(currentPrice - rt.ema50) / rt.ema50 <= 0.0015) {
      pullback = "PULLBACK_EMA50_BUY";
    }
  } else if (alignment === "BEARISH") {
    if (Math.abs(currentPrice - rt.ema20) / rt.ema20 <= 0.001) {
      pullback = "PULLBACK_EMA20_SELL";
    } else if (Math.abs(currentPrice - rt.ema50) / rt.ema50 <= 0.0015) {
      pullback = "PULLBACK_EMA50_SELL";
    }
  }

  // Crossovers
  let crossover = "NONE";
  if (rt.ema50 > rt.ema200 && rt.ema10 > rt.ema50) {
    crossover = "GOLDEN_CROSS";
  } else if (rt.ema50 < rt.ema200 && rt.ema10 < rt.ema50) {
    crossover = "DEATH_CROSS";
  }

  const emaTrend: EmaTrend = {
    alignment,
    description,
    pullback,
    crossover,
  };

  // 7. PRICE ACTION PATTERNS
  for (let i = 1; i < len; i++) {
    const prev = candles[i - 1];
    const curr = candles[i];

    const range = curr.high - curr.low;
    if (range <= 0) continue;

    const bodySize = Math.abs(curr.close - curr.open);
    const upperWick = curr.high - Math.max(curr.close, curr.open);
    const lowerWick = Math.min(curr.close, curr.open) - curr.low;

    // Pin Bar detection (Shadow is at least 65% of the total range)
    const isHammer = lowerWick >= range * 0.60 && bodySize <= range * 0.30;
    const isShootingStar = upperWick >= range * 0.60 && bodySize <= range * 0.30;

    let patternTime = curr.time;
    let descPrefix = "";
    if (i === len - 1) {
      patternTime = Date.now() / 1000;
      descPrefix = "[LIVE - ĐANG CHẠY] ";
    }

    if (isHammer) {
      patterns.push({
        name: "Hammer (Pin Bar Tăng)",
        type: "BULLISH",
        description: descPrefix + `Nến rút chân Hammer xuất hiện tại hỗ trợ $${curr.low.toFixed(2)} phản đối lực bán mạnh.`,
        time: patternTime,
      });
    } else if (isShootingStar) {
      patterns.push({
        name: "Shooting Star (Pin Bar Giảm)",
        type: "BEARISH",
        description: descPrefix + `Nến bắn sao Shooting Star tại kháng cự $${curr.high.toFixed(2)} cho thấy phe bán áp đảo.`,
        time: patternTime,
      });
    }

    // Engulfing patterns
    const isBullishEngulfing =
      curr.close > curr.open &&
      prev.close < prev.open &&
      curr.close >= prev.open &&
      curr.open <= prev.close;

    const isBearishEngulfing =
      curr.close < curr.open &&
      prev.close > prev.open &&
      curr.close <= prev.open &&
      curr.open >= prev.close;

    if (isBullishEngulfing) {
      patterns.push({
        name: "Bullish Engulfing (Nhấn Chìm Tăng)",
        type: "BULLISH",
        description: descPrefix + `Mô hình nhấn chìm tăng: Nến xanh bao trùm hoàn toàn thân nến đỏ trước đó.`,
        time: patternTime,
      });
    } else if (isBearishEngulfing) {
      patterns.push({
        name: "Bearish Engulfing (Nhấn Chìm Giảm)",
        type: "BEARISH",
        description: descPrefix + `Mô hình nhấn chìm giảm: Nến đỏ bao trùm toàn bộ thân nến xanh trước đó.`,
        time: patternTime,
      });
    }

    // Inside Bar
    const isInsideBar = curr.high < prev.high && curr.low > prev.low;
    if (isInsideBar) {
      patterns.push({
        name: "Inside Bar (Nến Nằm Trong)",
        type: curr.close > curr.open ? "BULLISH" : "BEARISH",
        description: descPrefix + `Inside Bar xuất hiện cho thấy sự nén giá, báo hiệu sắp có biến động Breakout mạnh.`,
        time: patternTime,
      });
    }
  }

  return {
    swings: swings.slice(-15),
    fvgs: fvgs.slice(-25),
    orderBlocks: orderBlocks.slice(-15),
    structureShifts: structureShifts.slice(-10),
    sweeps: sweeps.slice(-10),
    emaTrend,
    patterns: patterns.slice(-15),
  };
}
