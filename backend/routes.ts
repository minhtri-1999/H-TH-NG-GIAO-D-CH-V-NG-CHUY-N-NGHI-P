// backend/routes.ts
// Unified Hono routing layer with added high-security Authentication endpoints

import { Hono } from "npm:hono@4";
import { getCookie, setCookie, deleteCookie } from "npm:hono@4/cookie";
import { getGoldChartData, getGoldRealtimePrice } from "./api.ts";
import { analyzeSignals, type Candle, calcSMA, calcEMA, calcRSI, calcMACD, calcATR } from "./signals.ts";
import { analyzeAdvanced } from "./advanced_analysis.ts";
import { generateMarketOutlook } from "./market_outlook.ts";
import {
  getUserByEmail,
  createUser,
  verifyUser,
  setOTP,
  getOTP,
  deleteOTP,
  createSession,
  getSession,
  deleteSession,
  generateSalt,
  hashPassword,
} from "./db.ts";
import { generateOTP, sendEmailOTP } from "./email.ts";
import { backtestRouter } from "./backtest/engine.ts";

const api = new Hono();

interface SignalCacheEntry {
  signals: any;
  advancedAnalysis: any;
  multiTimeframeSignals: Record<string, string>;
  marketOutlook: any;
  expires: number;
}

const signalCache = new Map<string, SignalCacheEntry>();

function getIntervalInSeconds(tf: string): number {
  if (tf === "1" || tf === "M1") return 60;
  if (tf === "5" || tf === "M5") return 300;
  if (tf === "15" || tf === "M15") return 900;
  if (tf === "60" || tf === "H1") return 3600;
  if (tf === "1D" || tf === "D1") return 86400;
  if (tf === "1W" || tf === "W1") return 604800;
  if (tf === "1M" || tf === "MN1") return 2592000;
  return 86400;
}

// ==========================================
// 🔒 AUTHENTICATION ENDPOINTS
// ==========================================

// Register Account
api.post("/auth/register", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Vui lòng nhập đầy đủ Email và Mật khẩu" }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Định dạng Email không hợp lệ" }, 400);
    }

    if (password.length < 6) {
      return c.json({ error: "Mật khẩu phải dài ít nhất 6 ký tự" }, 400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser && existingUser.verified) {
      return c.json({ error: "Tài khoản email này đã được đăng ký và xác thực" }, 400);
    }

    // Hash Password
    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    // Save/Update User in Deno KV (unverified user)
    await createUser(email, passwordHash, salt);

    // Generate & Save OTP (expires in 5 minutes)
    const otp = generateOTP();
    await setOTP(email, otp, 300000);

    // Send Real Email OTP
    const emailResult = await sendEmailOTP(email, otp);
    if (!emailResult.success) {
      return c.json({ error: emailResult.error || "Không thể gửi email xác thực OTP. Vui lòng thử lại." }, 500);
    }

    return c.json({
      success: true,
      isSimulator: emailResult.isSimulator,
      otp: emailResult.isSimulator ? otp : undefined,
      message: emailResult.isSimulator
        ? "Máy chủ đang chạy ở chế độ SIMULATOR. Mã OTP được hiển thị trực tiếp để kiểm thử."
        : "Mã OTP xác thực đã được gửi tới Email của bạn. Mã có hiệu lực trong 5 phút."
    });
  } catch (err: any) {
    console.error("Register Error:", err);
    return c.json({ error: "Lỗi hệ thống khi đăng ký: " + err.message }, 500);
  }
});

// Verify OTP to Activate Account
api.post("/auth/verify-otp", async (c) => {
  try {
    const { email, otp } = await c.req.json();

    if (!email || !otp) {
      return c.json({ error: "Thiếu thông tin Email hoặc mã OTP" }, 400);
    }

    const otpRecord = await getOTP(email);
    if (!otpRecord) {
      return c.json({ error: "Không tìm thấy mã OTP nào cho email này hoặc OTP đã hết hạn" }, 400);
    }

    if (otpRecord.expiresAt < Date.now()) {
      await deleteOTP(email);
      return c.json({ error: "Mã OTP đã hết hạn. Vui lòng bấm gửi lại." }, 400);
    }

    if (otpRecord.otp !== otp.trim()) {
      return c.json({ error: "Mã OTP không chính xác. Vui lòng kiểm tra lại." }, 400);
    }

    // Activate User
    const verified = await verifyUser(email);
    if (!verified) {
      return c.json({ error: "Tài khoản không tồn tại" }, 400);
    }

    // Clean up used OTP
    await deleteOTP(email);

    return c.json({
      success: true,
      message: "Kích hoạt tài khoản thành công! Bây giờ bạn có thể đăng nhập."
    });
  } catch (err: any) {
    console.error("Verify OTP Error:", err);
    return c.json({ error: "Lỗi hệ thống khi xác thực OTP: " + err.message }, 500);
  }
});

// Login
api.post("/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Vui lòng cung cấp đầy đủ Email và Mật khẩu" }, 400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return c.json({ error: "Email hoặc mật khẩu không chính xác" }, 400);
    }

    if (!user.verified) {
      // If user is registered but never verified OTP, let's resend OTP automatically!
      const otp = generateOTP();
      await setOTP(email, otp, 300000);
      const emailResult = await sendEmailOTP(email, otp);
      if (!emailResult.success) {
        return c.json({ error: emailResult.error || "Không thể gửi email xác thực OTP. Vui lòng thử lại." }, 500);
      }
      return c.json({
        error: emailResult.isSimulator
          ? `Tài khoản chưa kích hoạt. [CHẾ ĐỘ THỬ NGHIỆM] Mã OTP của bạn là: ${otp}`
          : "Tài khoản chưa được kích hoạt. Một mã OTP mới đã được gửi về email của bạn.",
        needsVerification: true,
        isSimulator: emailResult.isSimulator,
        otp: emailResult.isSimulator ? otp : undefined
      }, 403);
    }

    // Validate Password
    const computedHash = await hashPassword(password, user.salt);
    if (computedHash !== user.passwordHash) {
      return c.json({ error: "Email hoặc mật khẩu không chính xác" }, 400);
    }

    // Create Session
    const sessionId = crypto.randomUUID();
    await createSession(sessionId, email);

    // Set secure cookie
    setCookie(c, "sessionId", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 7 * 24 * 3600, // 7 days
      path: "/"
    });

    return c.json({
      success: true,
      user: { email: user.email }
    });
  } catch (err: any) {
    console.error("Login Error:", err);
    return c.json({ error: "Lỗi hệ thống khi đăng nhập: " + err.message }, 500);
  }
});

// Logout
api.post("/auth/logout", async (c) => {
  const sessionId = getCookie(c, "sessionId");
  if (sessionId) {
    await deleteSession(sessionId);
  }
  deleteCookie(c, "sessionId", { path: "/" });
  return c.json({ success: true, message: "Đăng xuất thành công." });
});

// Check Session / Current User
api.get("/auth/me", async (c) => {
  const sessionId = getCookie(c, "sessionId");
  if (!sessionId) {
    return c.json({ authenticated: false, error: "Chưa đăng nhập" }, 401);
  }

  const session = await getSession(sessionId);
  if (!session) {
    deleteCookie(c, "sessionId", { path: "/" });
    return c.json({ authenticated: false, error: "Phiên làm việc hết hạn" }, 401);
  }

  return c.json({
    authenticated: true,
    email: session.email
  });
});

// Resend OTP manually
api.post("/auth/resend-otp", async (c) => {
  try {
    const { email } = await c.req.json();
    if (!email) {
      return c.json({ error: "Thiếu thông tin Email" }, 400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return c.json({ error: "Tài khoản không tồn tại" }, 400);
    }

    if (user.verified) {
      return c.json({ error: "Tài khoản này đã được xác thực trước đó" }, 400);
    }

    const otp = generateOTP();
    await setOTP(email, otp, 300000);
    const emailResult = await sendEmailOTP(email, otp);

    if (!emailResult.success) {
      return c.json({ error: emailResult.error || "Không thể gửi email OTP. Vui lòng thử lại sau." }, 500);
    }

    return c.json({
      success: true,
      isSimulator: emailResult.isSimulator,
      otp: emailResult.isSimulator ? otp : undefined,
      message: emailResult.isSimulator
        ? "Mã OTP mới (chế độ SIMULATOR) được hiển thị trực tiếp để kiểm thử."
        : "Mã OTP mới đã được gửi thành công!"
    });
  } catch (err: any) {
    return c.json({ error: "Lỗi khi gửi lại OTP: " + err.message }, 500);
  }
});

api.get("/test-coinbase", async (c) => {
  try {
    const rt = await getGoldRealtimePrice();
    return c.json({
      success: true,
      realtimePrice: rt
    });
  } catch (e: any) {
    return c.json({ error: e.message, stack: e.stack });
  }
});

// Search symbols - returns XAU/USD exclusively
api.get("/search", (c) => {
  return c.json({
    quotes: [
      {
        symbol: "XAUUSD",
        shortname: "XAU/USD (Gold)",
        longname: "Vàng / Đô la Mỹ",
        exchDisp: "FOREXCOM",
        typeDisp: "commodity cfd",
        quoteType: "COMMODITY"
      }
    ]
  });
});

// Chart data (OHLCV) - returns Gold OHLC
api.get("/chart/:symbol{.+}", async (c) => {
  const timeframe = c.req.query("tf") || "1D";
  try {
    const data = await getGoldChartData(timeframe);
    return c.json(data);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// Quote (realtime gold price info)
api.get("/quote/:symbol{.+}", async (c) => {
  try {
    const data = await getGoldRealtimePrice();
    // Map to regular quote fields expected by frontend
    return c.json({
      symbol: "XAUUSD",
      regularMarketPrice: data.price,
      regularMarketChangePercent: data.change,
      regularMarketDayHigh: data.high,
      regularMarketDayLow: data.low,
      regularMarketTime: data.time,
      displayName: "Gold Spot / USD"
    });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// Trading signals with advanced XAUUSD gold analysis
api.get("/signals/:symbol{.+}", async (c) => {
  const timeframe = c.req.query("tf") || "1D";
  const livePriceParam = c.req.query("livePrice");
  const clientLivePrice = livePriceParam ? parseFloat(livePriceParam) : 0;

  try {
    const chartRaw = await getGoldChartData(timeframe);
    const rt = await getGoldRealtimePrice();
    const currentSpotPrice = clientLivePrice > 0 ? clientLivePrice : rt.price;

    const lastChartClose = chartRaw.close.length > 0 ? chartRaw.close[chartRaw.close.length - 1] : 0;
    const offset = lastChartClose > 0 ? currentSpotPrice - lastChartClose : 0;

    const chart = {
      timestamp: chartRaw.timestamp,
      open: chartRaw.open.map(v => v + offset),
      high: chartRaw.high.map(v => v + offset),
      low: chartRaw.low.map(v => v + offset),
      close: chartRaw.close.map(v => v + offset),
      volume: chartRaw.volume,
    };

    const candles: Candle[] = chart.timestamp.map((t, i) => ({
      time: t,
      open: chart.open[i] ?? 0,
      high: chart.high[i] ?? 0,
      low: chart.low[i] ?? 0,
      close: chart.close[i] ?? 0,
      volume: chart.volume[i] ?? 0,
    })).filter(c => c.open > 0 && c.close > 0);

    const closes = candles.map(cand => cand.close);
    const lastIdx = closes.length - 1;

    // Tính toán trực tiếp chỉ báo kỹ thuật thời gian thực từ nến đã hiệu chuẩn
    const computedRsi = lastIdx >= 0 ? calcRSI(closes) : rt.rsi;
    const computedMacd = lastIdx >= 0 ? calcMACD(closes) : { macd: rt.macd, signal: rt.macdSignal, histogram: 0 };
    const computedAtr = lastIdx >= 0 ? calcATR(candles) : rt.atr;

    const computedEma10 = lastIdx >= 0 ? calcEMA(closes, 10).pop() ?? currentSpotPrice : currentSpotPrice;
    const computedSma20 = lastIdx >= 0 ? calcSMA(closes, 20).pop() ?? currentSpotPrice : currentSpotPrice;
    const computedEma20 = lastIdx >= 0 ? calcEMA(closes, 20).pop() ?? currentSpotPrice : currentSpotPrice;
    const computedEma50 = lastIdx >= 0 ? calcEMA(closes, 50).pop() ?? currentSpotPrice : currentSpotPrice;
    const computedEma100 = lastIdx >= 0 ? calcEMA(closes, 100).pop() ?? currentSpotPrice : currentSpotPrice;
    const computedEma200 = lastIdx >= 0 ? calcEMA(closes, 200).pop() ?? currentSpotPrice : currentSpotPrice;

    // Tạo đối tượng rt được hiệu chuẩn (calibratedRt) để đưa vào các phân tích nâng cao
    const calibratedRt = {
      ...rt,
      price: currentSpotPrice,
      rsi: Math.round(computedRsi * 10) / 10,
      macd: Math.round(computedMacd.macd * 100) / 100,
      macdSignal: Math.round(computedMacd.signal * 100) / 100,
      atr: Math.round(computedAtr * 100) / 100,
      ema10: Math.round(computedEma10 * 100) / 100,
      sma20: Math.round(computedSma20 * 100) / 100,
      ema20: Math.round(computedEma20 * 100) / 100,
      ema50: Math.round(computedEma50 * 100) / 100,
      ema100: Math.round(computedEma100 * 100) / 100,
      ema200: Math.round(computedEma200 * 100) / 100,
    };

    const nowSec = Math.floor(Date.now() / 1000);
    const intervalSec = getIntervalInSeconds(timeframe);
    const currentCandleOpen = Math.floor(nowSec / intervalSec) * intervalSec;
    const nextCandleOpen = currentCandleOpen + intervalSec;

    // Check if we have a valid cached signal for this timeframe
    const cached = signalCache.get(timeframe);
    if (cached && cached.expires > Date.now()) {
      return c.json({
        symbol: "XAUUSD",
        timeframe,
        candleCount: candles.length,
        lastPrice: currentSpotPrice,
        priceChange: rt.change,
        dayHigh: rt.high,
        dayLow: rt.low,
        signals: cached.signals,
        multiTimeframeSignals: cached.multiTimeframeSignals,
        chart, // dynamic raw OHLCV for smooth charts
        tradingViewAnalysis: {
          rsi: calibratedRt.rsi,
          macd: calibratedRt.macd,
          macdSignal: calibratedRt.macdSignal,
          ema10: calibratedRt.ema10,
          sma20: calibratedRt.sma20,
          recommendAll: rt.recommendAll,
          recommendMA: rt.recommendMA,
          recommendOther: rt.recommendOther,
          ema20: calibratedRt.ema20,
          ema50: calibratedRt.ema50,
          ema100: calibratedRt.ema100,
          ema200: calibratedRt.ema200,
          adx: rt.adx,
          cci20: rt.cci20,
          stochK: rt.stochK,
          stochD: rt.stochD,
          atr: calibratedRt.atr,
        },
        advancedAnalysis: cached.advancedAnalysis,
        marketOutlook: cached.marketOutlook,
      });
    }

    // Filter out the active unclosed candle to stabilize analysis
    const closedCandles = candles.filter(c => c.time + intervalSec <= nowSec);
    const finalCandles = closedCandles.length >= 50 ? closedCandles : candles;

    const signals = analyzeSignals(finalCandles);
    const advancedAnalysis = analyzeAdvanced(finalCandles, calibratedRt);

    // Calculate H1 Market Outlook dynamically
    let h1Candles = finalCandles;
    if (timeframe !== "60") {
      try {
        const h1ChartRaw = await getGoldChartData("60");
        const h1LastChartClose = h1ChartRaw.close.length > 0 ? h1ChartRaw.close[h1ChartRaw.close.length - 1] : 0;
        const h1Offset = h1LastChartClose > 0 ? currentSpotPrice - h1LastChartClose : 0;
        
        h1Candles = h1ChartRaw.timestamp.map((t, idx) => ({
          time: t,
          open: (h1ChartRaw.open[idx] ?? 0) + h1Offset,
          high: (h1ChartRaw.high[idx] ?? 0) + h1Offset,
          low: (h1ChartRaw.low[idx] ?? 0) + h1Offset,
          close: (h1ChartRaw.close[idx] ?? 0) + h1Offset,
          volume: h1ChartRaw.volume[idx] ?? 0,
        })).filter(c => c.open > 0 && c.close > 0);
      } catch (_) {
        h1Candles = candles;
      }
    }
    const marketOutlook = generateMarketOutlook(h1Candles, calibratedRt);

    // Calculate Multi-Timeframe Signals for M1, M5, M15, 1H, 1D
    const timeframes = ["1", "5", "15", "60", "1D"];
    const multiTimeframeSignals: Record<string, string> = {};
    for (const tf of timeframes) {
      if (tf === timeframe) {
        multiTimeframeSignals[tf] = signals.type;
      } else {
        try {
          const tfChartRaw = await getGoldChartData(tf);
          const tfLastChartClose = tfChartRaw.close.length > 0 ? tfChartRaw.close[tfChartRaw.close.length - 1] : 0;
          const tfOffset = tfLastChartClose > 0 ? currentSpotPrice - tfLastChartClose : 0;

          const tfCandles: Candle[] = tfChartRaw.timestamp.map((t, idx) => ({
            time: t,
            open: (tfChartRaw.open[idx] ?? 0) + tfOffset,
            high: (tfChartRaw.high[idx] ?? 0) + tfOffset,
            low: (tfChartRaw.low[idx] ?? 0) + tfOffset,
            close: (tfChartRaw.close[idx] ?? 0) + tfOffset,
            volume: tfChartRaw.volume[idx] ?? 0,
          })).filter(c => c.open > 0 && c.close > 0);

          const tfInterval = getIntervalInSeconds(tf);
          const tfClosedCandles = tfCandles.filter(c => c.time + tfInterval <= nowSec);
          const tfFinalCandles = tfClosedCandles.length >= 50 ? tfClosedCandles : tfCandles;

          const tfSignals = analyzeSignals(tfFinalCandles);
          multiTimeframeSignals[tf] = tfSignals.type;
        } catch (_) {
          multiTimeframeSignals[tf] = "NEUTRAL";
        }
      }
    }

    // Determine cache TTL matching the candle close exactly
    const lastCandleTime = candles.length > 0 ? candles[candles.length - 1].time : 0;
    let expires = Date.now() + 1500; // Fast retry if third-party hasn't registered the new closed candle yet
    if (lastCandleTime && lastCandleTime >= currentCandleOpen) {
      expires = nextCandleOpen * 1000;
    }

    signalCache.set(timeframe, {
      signals,
      advancedAnalysis,
      multiTimeframeSignals,
      marketOutlook,
      expires,
    });

    return c.json({
      symbol: "XAUUSD",
      timeframe,
      candleCount: candles.length,
      lastPrice: currentSpotPrice,
      priceChange: rt.change,
      dayHigh: rt.high,
      dayLow: rt.low,
      signals,
      multiTimeframeSignals,
      chart,
      tradingViewAnalysis: {
        rsi: calibratedRt.rsi,
        macd: calibratedRt.macd,
        macdSignal: calibratedRt.macdSignal,
        ema10: calibratedRt.ema10,
        sma20: calibratedRt.sma20,
        recommendAll: rt.recommendAll,
        recommendMA: rt.recommendMA,
        recommendOther: rt.recommendOther,
        ema20: calibratedRt.ema20,
        ema50: calibratedRt.ema50,
        ema100: calibratedRt.ema100,
        ema200: calibratedRt.ema200,
        adx: rt.adx,
        cci20: rt.cci20,
        stochK: rt.stochK,
        stochD: rt.stochD,
        atr: calibratedRt.atr,
      },
      advancedAnalysis,
      marketOutlook,
    });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// ⚡ ULTRA-FAST lightweight price-only endpoint (no chart/signal computation)
// Returns only price data - suitable for calling every 500ms from frontend
api.get("/price/:symbol{.+}", async (c) => {
  try {
    const rt = await getGoldRealtimePrice();
    return c.json({
      price: rt.price,
      change: rt.change,
      high: rt.high,
      low: rt.low,
      time: rt.time,
    }, 200, {
      "Cache-Control": "no-store",
      "X-Price-Source": "FOREXCOM:XAUUSD",
    });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

// ==========================================
// 📊 BACKTEST HISTORY SIMULATOR ROUTER MOUNT
// ==========================================
api.route("/", backtestRouter);

// Profile - static profile for gold spot
api.get("/profile/:symbol{.+}", (c) => {
  return c.json({
    description: "Gold (XAU) vs US Dollar (USD) CFD price provided by FOREXCOM. Gold is the world's oldest and most trusted safe-haven asset.",
    exchange: "FOREXCOM",
    sector: "Financial / Commodities",
    industry: "Precious Metals",
    website: "https://www.forexcom.com"
  });
});

export default api;
