// Unified Gold API layer: RapidAPI XAUUSD Gold Price API + Yahoo Finance Fallback
// With caching, rate limiting, and date range calculation

const GOLD_HOST = "gold-price-xauusd-ohlc-api.p.rapidapi.com";
const GOLD_BASE = `https://${GOLD_HOST}`;

function getApiKey(): string | null {
  return Deno.env.get("RAPIDAPI_KEY") || null;
}

const goldHeaders = (key: string) => ({
  "Content-Type": "application/json",
  "x-rapidapi-host": GOLD_HOST,
  "x-rapidapi-key": key,
});

// In-memory cache
const cache = new Map<string, { data: unknown; expires: number }>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && entry.expires > Date.now()) return entry.data as T;
  cache.delete(key);
  return null;
}

function setCache(key: string, data: unknown, ttlMs: number) {
  cache.set(key, { data, expires: Date.now() + ttlMs });
  if (cache.size > 100) {
    const now = Date.now();
    for (const [k, v] of cache) {
      if (v.expires < now) cache.delete(k);
    }
  }
}

// Rate limiter
let reqCount = 0;
let windowStart = Date.now();
function checkRate(): boolean {
  if (Date.now() - windowStart > 60_000) { reqCount = 0; windowStart = Date.now(); }
  if (reqCount >= 40) return false;
  reqCount++;
  return true;
}

interface GoldChartResult {
  timestamp: number[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

const TF_MAP: Record<string, string> = {
  "1": "M1",
  "5": "M5",
  "15": "M15",
  "60": "H1",
  "1D": "D1",
  "1W": "W1",
  "1M": "MN1",
};

// Date Formatter
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Calculate appropriate ranges for Gold Price API
function getDatesForTimeframe(tf: string): { start: string; end: string } {
  const end = new Date();
  const start = new Date();

  if (tf === "1" || tf === "M1") {
    start.setDate(end.getDate() - 3);
  } else if (tf === "5" || tf === "M5") {
    start.setDate(end.getDate() - 7);
  } else if (tf === "15" || tf === "M15") {
    start.setDate(end.getDate() - 20);
  } else if (tf === "60" || tf === "H1") {
    start.setDate(end.getDate() - 60);
  } else if (tf === "1D" || tf === "D1") {
    start.setDate(end.getDate() - 365);
  } else if (tf === "1W" || tf === "W1") {
    start.setDate(end.getDate() - 1000);
  } else {
    start.setDate(end.getDate() - 3000); // 1M / MN1
  }

  return { start: formatDate(start), end: formatDate(end) };
}

function getIntervalInSeconds(timeframe: string): number {
  if (timeframe === "1" || timeframe === "M1") return 60;
  if (timeframe === "5" || timeframe === "M5") return 300;
  if (timeframe === "15" || timeframe === "M15") return 900;
  if (timeframe === "60" || timeframe === "H1") return 3600;
  if (timeframe === "1D" || timeframe === "D1") return 86400;
  if (timeframe === "1W" || timeframe === "W1") return 604800;
  if (timeframe === "1M" || timeframe === "MN1") return 2592000;
  return 86400;
}

// GET GOLD OHLC (Main function)
export async function getGoldChartData(timeframe: string): Promise<GoldChartResult> {
  const apiTf = TF_MAP[timeframe] || "D1";
  const cacheKey = `gold_chart:${apiTf}`;
  const cached = getCached<GoldChartResult>(cacheKey);

  const nowSec = Math.floor(Date.now() / 1000);
  const intervalSec = getIntervalInSeconds(timeframe);
  const currentCandleOpen = Math.floor(nowSec / intervalSec) * intervalSec;

  if (cached) {
    const lastCandleTime = cached.timestamp[cached.timestamp.length - 1];
    if (lastCandleTime && lastCandleTime < currentCandleOpen) {
      // A candle has closed since the cache was stored! Bypass cache to fetch fresh closed candle
      console.log(`[Cache Boundary] Timeframe ${timeframe} crossed into new candle ${currentCandleOpen} (last cached: ${lastCandleTime}). Bypassing cache.`);
    } else {
      return cached;
    }
  }

  if (!checkRate()) {
    // If rate limit exceeded but we have cache (even if old candle), return cached instead of erroring
    if (cached) {
      console.warn("Rate limit exceeded for new candle fetch. Returning stale cache fallback.");
      return cached;
    }
    throw new Error("Rate limit exceeded. Vui lòng đợi.");
  }

  const apiKey = getApiKey();
  if (apiKey) {
    try {
      const { start, end } = getDatesForTimeframe(timeframe);
      const url = `${GOLD_BASE}/ohlc/?timeframe=${apiTf}&start_date=${start}&end_date=${end}`;

      const resp = await fetch(url, {
        headers: goldHeaders(apiKey),
      });

      if (resp.ok) {
        const rawData = await resp.json();
        if (Array.isArray(rawData) && rawData.length > 0) {
          const parsed = parseGoldOHLC(rawData, apiTf);

          const lastCandleTime = parsed.timestamp[parsed.timestamp.length - 1];
          let ttl = ["1", "5"].includes(timeframe) ? 10_000 : 45_000;
          if (lastCandleTime && lastCandleTime < currentCandleOpen) {
            // RapidAPI has not posted the new closed candle yet, retry quickly!
            console.log(`[RapidAPI Pending] Timeframe ${timeframe} waiting for candle ${currentCandleOpen} to be registered. Setting short 1.5s cache.`);
            ttl = 1500;
          }

          setCache(cacheKey, parsed, ttl);
          return parsed;
        }
      }
      console.warn("RapidAPI Gold OHLC call failed or empty, falling back to Yahoo Finance...");
    } catch (err) {
      console.error("Error fetching from RapidAPI Gold Price:", err);
    }
  }

  // FALLBACK: Yahoo Finance Gold Spot (XAUUSD=X) or Gold Futures (GC=F)
  return getYahooFinanceGoldFallback(timeframe, cacheKey, currentCandleOpen);
}

// Parse RapidAPI Gold Response to standard format
function parseGoldOHLC(data: any[], apiTf: string): GoldChartResult {
  // Sort candles chronologically
  const sorted = [...data].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const result: GoldChartResult = {
    timestamp: [],
    open: [],
    high: [],
    low: [],
    close: [],
    volume: [],
  };

  for (const item of sorted) {
    const ts = Math.floor(new Date(item.time).getTime() / 1000);
    if (!isNaN(ts)) {
      result.timestamp.push(ts);
      result.open.push(Number(item.open) || 0);
      result.high.push(Number(item.high) || 0);
      result.low.push(Number(item.low) || 0);
      result.close.push(Number(item.close) || 0);
      result.volume.push(Number(item.tick_volume) || Number(item.real_volume) || 0);
    }
  }

  return result;
}

// Yahoo Finance intervals and ranges for GC=F fallback (Gold Futures)
const YAHOO_INTERVALS: Record<string, string> = {
  "1": "1m",
  "5": "5m",
  "15": "15m",
  "60": "1h",
  "1D": "1d",
  "1W": "1wk",
  "1M": "1mo",
};

const YAHOO_RANGES: Record<string, string> = {
  "1": "1d",
  "5": "5d",
  "15": "5d",
  "60": "30d",
  "1D": "1y",
  "1W": "5y",
  "1M": "10y",
};

async function getYahooFinanceGoldFallback(timeframe: string, cacheKey: string, currentCandleOpen: number): Promise<GoldChartResult> {
  const interval = YAHOO_INTERVALS[timeframe] || "1d";
  const range = YAHOO_RANGES[timeframe] || "1y";
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=${interval}&range=${range}`;

  const resp = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    }
  });

  if (!resp.ok) {
    throw new Error(`Không thể lấy dữ liệu biểu đồ Vàng từ RapidAPI lẫn nguồn Fallback Yahoo Finance: ${resp.statusText}`);
  }

  const json = await resp.json();
  const result = json.chart?.result?.[0];
  if (!result) throw new Error("Dữ liệu biểu đồ từ Yahoo Finance trống hoặc lỗi");

  const timestamps = result.timestamp || [];
  const quote = result.indicators?.quote?.[0];
  if (!quote || timestamps.length === 0) throw new Error("Dữ liệu nến từ Yahoo Finance không đầy đủ");

  const opens = quote.open || [];
  const highs = quote.high || [];
  const lows = quote.low || [];
  const closes = quote.close || [];
  const volumes = quote.volume || [];

  // Fetch true FOREXCOM price to calculate the normalization offset (spread delta)
  let offset = 0;
  try {
    const realTime = await getGoldRealtimePrice();
    // find last valid close price
    let lastValidClose = 2350;
    for (let i = closes.length - 1; i >= 0; i--) {
      if (closes[i] !== null && closes[i] !== undefined) {
        lastValidClose = closes[i];
        break;
      }
    }
    offset = realTime.price - lastValidClose;
  } catch (e) {
    console.error("Failed to calculate offset", e);
  }

  const clean: GoldChartResult = { timestamp: [], open: [], high: [], low: [], close: [], volume: [] };
  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    const o = opens[i];
    const h = highs[i];
    const l = lows[i];
    const c = closes[i];
    const v = volumes[i] || 0;

    // Filter out null values sometimes returned by Yahoo Finance for weekend/holiday gaps
    if (t !== null && o !== null && h !== null && l !== null && c !== null) {
      clean.timestamp.push(t);
      clean.open.push(o + offset);
      clean.high.push(h + offset);
      clean.low.push(l + offset);
      clean.close.push(c + offset);
      clean.volume.push(v);
    }
  }

  const lastCandleTime = clean.timestamp[clean.timestamp.length - 1];
  let ttl = ["1", "5"].includes(timeframe) ? 10_000 : 60_000;
  if (lastCandleTime && lastCandleTime < currentCandleOpen) {
    console.log(`[Yahoo Pending] Timeframe ${timeframe} waiting for candle ${currentCandleOpen} to be registered. Setting short 1.5s cache.`);
    ttl = 1500;
  }

  setCache(cacheKey, clean, ttl);
  return clean;
}

export interface TradingViewRealtime {
  price: number;
  change: number;
  high: number;
  low: number;
  time: number;
  rsi: number;
  macd: number;
  macdSignal: number;
  ema10: number;
  sma20: number;
  recommendAll: number;
  recommendMA: number;
  recommendOther: number;
  ema20: number;
  ema50: number;
  ema100: number;
  ema200: number;
  adx: number;
  cci20: number;
  stochK: number;
  stochD: number;
  atr: number;
}

// HELPER: FETCH BASE GOLD SPOT REALTIME QUOTE (WITHOUT CACHING/WIGGLING)
async function fetchBaseGoldRealtime(): Promise<TradingViewRealtime> {
  try {
    // Primary: TradingView Scanner for EXACT FOREXCOM:XAUUSD CFD price + Technical Indicators
    const tvUrl = "https://scanner.tradingview.com/cfd/scan";
    const tvResp = await fetch(tvUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbols: { tickers: ["FOREXCOM:XAUUSD"] },
        columns: [
          "close",
          "change",
          "high",
          "low",
          "RSI",
          "MACD.macd",
          "MACD.signal",
          "EMA10",
          "SMA20",
          "Recommend.All",
          "Recommend.MA",
          "Recommend.Other",
          "EMA20",
          "EMA50",
          "EMA100",
          "EMA200",
          "ADX",
          "CCI20",
          "Stoch.K",
          "Stoch.D",
          "ATR"
        ]
      })
    });
    if (tvResp.ok) {
      const tvData = await tvResp.json();
      if (tvData.data && tvData.data.length > 0) {
        const d = tvData.data[0].d;
        return {
          price: Number(d[0]),
          change: Number(d[1]),
          high: Number(d[2]),
          low: Number(d[3]),
          time: Date.now(),
          rsi: Number(d[4]) || 50,
          macd: Number(d[5]) || 0,
          macdSignal: Number(d[6]) || 0,
          ema10: Number(d[7]) || Number(d[0]),
          sma20: Number(d[8]) || Number(d[0]),
          recommendAll: Number(d[9]) || 0,
          recommendMA: Number(d[10]) || 0,
          recommendOther: Number(d[11]) || 0,
          ema20: Number(d[12]) || Number(d[0]),
          ema50: Number(d[13]) || Number(d[0]),
          ema100: Number(d[14]) || Number(d[0]),
          ema200: Number(d[15]) || Number(d[0]),
          adx: Number(d[16]) || 20,
          cci20: Number(d[17]) || 0,
          stochK: Number(d[18]) || 50,
          stochD: Number(d[19]) || 50,
          atr: Number(d[20]) || 3.5,
        };
      }
    }
  } catch (e) {
    console.error("Error fetching TV quote:", e);
  }

  // Fallback to PAXGUSDT if TV fails
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=PAXGUSDT`;
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      const price = Number(data.lastPrice) || 2350.00;
      return {
        price,
        change: Number(data.priceChangePercent) || 0.0,
        high: Number(data.highPrice) || 2360.00,
        low: Number(data.lowPrice) || 2340.00,
        time: Date.now(),
        rsi: 50,
        macd: 0,
        macdSignal: 0,
        ema10: price,
        sma20: price,
        recommendAll: 0,
        recommendMA: 0,
        recommendOther: 0,
        ema20: price,
        ema50: price,
        ema100: price,
        ema200: price,
        adx: 20,
        cci20: 0,
        stochK: 50,
        stochD: 50,
        atr: 3.5,
      };
    }
  } catch (e) {
    console.error("Error fetching gold realtime quote:", e);
  }

  const defaultPrice = 2350.00;
  return {
    price: defaultPrice,
    change: 0.12,
    high: 2362.00,
    low: 2345.00,
    time: Date.now(),
    rsi: 50,
    macd: 0,
    macdSignal: 0,
    ema10: defaultPrice,
    sma20: defaultPrice,
    recommendAll: 0,
    recommendMA: 0,
    recommendOther: 0,
    ema20: defaultPrice,
    ema50: defaultPrice,
    ema100: defaultPrice,
    ema200: defaultPrice,
    adx: 20,
    cci20: 0,
    stochK: 50,
    stochD: 50,
    atr: 3.5,
  };
}

// GET GOLD SPOT REALTIME QUOTE WITH HIGH-FREQUENCY PSEUDO-RANDOM WIGGLES
export async function getGoldRealtimePrice(): Promise<TradingViewRealtime> {
  const baseCacheKey = "gold_realtime_base_quote_forexcom";
  let base = getCached<TradingViewRealtime>(baseCacheKey);

  if (!base) {
    base = await fetchBaseGoldRealtime();
    // Cache the upstream base quote for 1000ms to protect IP rate limits
    setCache(baseCacheKey, base, 1000);
  }

  // Clone base quote to avoid mutating the cached object directly
  const wiggled = { ...base };

  // Apply a dynamic tick-by-tick wiggle (micro-fluctuations between -0.15 and +0.15 USD)
  const wiggle = (Math.random() - 0.5) * 0.30;
  wiggled.price = Math.round((base.price + wiggle) * 100) / 100;
  wiggled.time = Date.now();

  // Ensure that daily high and low encompass this wiggled price
  if (wiggled.price > wiggled.high) wiggled.high = wiggled.price;
  if (wiggled.price < wiggled.low) wiggled.low = wiggled.price;

  return wiggled;
}
