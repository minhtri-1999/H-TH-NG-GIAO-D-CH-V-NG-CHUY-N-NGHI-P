import React, { useState, useEffect, useRef, useMemo } from "https://esm.sh/react@18.2.0";

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TradingSuggestion {
  position: "BUY" | "SELL" | "NEUTRAL";
  entry: number;
  takeProfit1: number;
  takeProfit2: number;
  stopLoss: number;
  riskReward: string;
  entryReason?: string;
  slReason?: string;
  tpReason?: string;
}

interface Signal {
  type: "BUY" | "SELL" | "NEUTRAL";
  strength: number;
  confidence: number;
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

interface SwingPoint {
  index: number;
  time: number;
  type: "HIGH" | "LOW";
  price: number;
  broken: boolean;
}

interface FVG {
  index: number;
  type: "BULLISH" | "BEARISH";
  top: number;
  bottom: number;
  mitigated: boolean;
}

interface OrderBlock {
  index: number;
  type: "BULLISH" | "BEARISH";
  open: number;
  close: number;
  high: number;
  low: number;
  mitigated: boolean;
}

interface StructureShift {
  type: "BOS" | "CHoCH";
  direction: "BULLISH" | "BEARISH";
  price: number;
  time: number;
  description: string;
}

interface LiquiditySweep {
  type: "BSL" | "SSL";
  price: number;
  time: number;
  description: string;
}

interface EmaTrend {
  alignment: "BULLISH" | "BEARISH" | "NEUTRAL";
  description: string;
  pullback: string;
  crossover: string;
}

interface PriceActionPattern {
  name: string;
  type: "BULLISH" | "BEARISH";
  description: string;
  time: number;
}

interface AdvancedAnalysis {
  swings: SwingPoint[];
  fvgs: FVG[];
  orderBlocks: OrderBlock[];
  structureShifts: StructureShift[];
  sweeps: LiquiditySweep[];
  emaTrend: EmaTrend;
  patterns: PriceActionPattern[];
}

interface GoldSignalResponse {
  symbol: string;
  timeframe: string;
  candleCount: number;
  lastPrice: number;
  priceChange: number;
  dayHigh: number;
  dayLow: number;
  signals: Signal;
  chart: {
    timestamp: number[];
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
  };
  tradingViewAnalysis?: {
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
  };
  advancedAnalysis?: AdvancedAnalysis;
  multiTimeframeSignals?: Record<string, string>;
  marketOutlook?: any;
}

interface OrderBookRow {
  price: number;
  size: number;
}

interface SimulatedTrade {
  id: string;
  time: string;
  type: "BUY" | "SELL";
  price: number;
  size: string;
}

function TradingViewWidget({ timeframe }: { timeframe: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    // Map timeframe state value to TradingView interval string
    let tvInterval = "60";
    if (timeframe === "1") tvInterval = "1";
    else if (timeframe === "5") tvInterval = "5";
    else if (timeframe === "15") tvInterval = "15";
    else if (timeframe === "60") tvInterval = "60";
    else if (timeframe === "1D") tvInterval = "D";
    else if (timeframe === "1W") tvInterval = "W";
    else if (timeframe === "1M") tvInterval = "M";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "FOREXCOM:XAUUSD",
      "interval": tvInterval,
      "timezone": "Asia/Ho_Chi_Minh",
      "theme": "dark",
      "style": "1",
      "locale": "vi",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": true,
      "hide_side_toolbar": false,
      "studies": [
        {
          "id": "MAExp@tv-basicstudies",
          "inputs": {
            "length": 50
          }
        },
        {
          "id": "MAExp@tv-basicstudies",
          "inputs": {
            "length": 200
          }
        }
      ],
      "support_host": "https://www.tradingview.com"
    });
    container.current.appendChild(script);
  }, [timeframe]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

// Hàm tiện ích chuyển đổi timestamp sang DD/MM/YYYY chuẩn múi giờ Asia/Ho_Chi_Minh
export const getLocalDateString = (timestamp: number): string => {
  const tzOffset = 7 * 60 * 60 * 1000; // +7 giờ Việt Nam
  const localDate = new Date(timestamp + tzOffset);
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(localDate.getUTCDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

export default function App() {
  const [timeframe, setTimeframe] = useState<string>("5");
  const [chartType, setChartType] = useState<"deno" | "tradingview">("tradingview");
  const [fullChart, setFullChart] = useState<boolean>(false);
  const [data, setData] = useState<GoldSignalResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashTab, _setDashTab] = useState<"ai" | "backtest" | "outlook">(() => {
    const saved = localStorage.getItem("active_dash_tab");
    if (saved === "ai" || saved === "backtest" || saved === "outlook") {
      return saved as any;
    }
    return "ai";
  });
  const setDashTab = (tab: "ai" | "backtest" | "outlook") => {
    _setDashTab(tab);
    localStorage.setItem("active_dash_tab", tab);
  };

  const [closedTrades, setClosedTrades] = useState<any[]>([]);
  const [backtestLoading, setBacktestLoading] = useState<boolean>(false);

  const [backtestFilter, _setBacktestFilter] = useState<string>(() => localStorage.getItem("backtest_timeframe_filter") || "ALL");
  const setBacktestFilter = (tf: string) => {
    _setBacktestFilter(tf);
    localStorage.setItem("backtest_timeframe_filter", tf);
  };

  const [selectedDay, _setSelectedDay] = useState<string>(() => localStorage.getItem("backtest_selected_day") || "ALL");
  const setSelectedDay = (day: string) => {
    _setSelectedDay(day);
    localStorage.setItem("backtest_selected_day", day);
  };

  const filteredClosedTrades = useMemo(() => {
    let trades = [...closedTrades].sort((a, b) => b.closeTime - a.closeTime);

    const todayStr = getLocalDateString(Date.now());
    const yesterdayStr = getLocalDateString(Date.now() - 86400000);

    if (selectedDay === "TODAY") {
      trades = trades.filter(t => getLocalDateString(t.closeTime) === todayStr);
    } else if (selectedDay === "YESTERDAY") {
      trades = trades.filter(t => getLocalDateString(t.closeTime) === yesterdayStr);
    }

    if (backtestFilter === "ALL") return trades;
    return trades.filter(t => t.timeframe.toUpperCase() === backtestFilter.toUpperCase());
  }, [closedTrades, backtestFilter, selectedDay]);

  const backtestStats = useMemo(() => {
    if (filteredClosedTrades.length === 0) return { winRate: 0, netPips: 0, totalProfit: 0, total: 0 };
    const total = filteredClosedTrades.length;
    const wins = filteredClosedTrades.filter(t => t.status === "TP1" || t.status === "TP2").length;
    const winRate = Math.round((wins / total) * 100);
    const netPips = Number(filteredClosedTrades.reduce((sum, t) => sum + (Number(t.pips) || 0), 0).toFixed(1));
    const totalProfit = Number(filteredClosedTrades.reduce((sum, t) => sum + (Number(t.profitUsd) || 0), 0).toFixed(2));
    return { winRate, netPips, totalProfit, total };
  }, [filteredClosedTrades]);

  const fetchBacktestHistory = async (showLoading = false) => {
    try {
      const resp = await fetch("/api/backtest/history");
      if (resp.ok) {
        const d = await resp.json();
        if (d.success && d.trades) {
          setClosedTrades(d.trades);
        }
      }
    } catch (err) {
      console.error("Error fetching backtest history:", err);
    }
  };

  const handleResetBacktest = async () => {
    try {
      const resp = await fetch("/api/backtest/reset", { method: "POST" });
      if (resp.ok) {
        const d = await resp.json();
        if (d.success && d.trades) {
          setClosedTrades(d.trades);
        }
      } else {
        alert("Lỗi khi đồng bộ lại dữ liệu nến.");
      }
    } catch (err: any) {
      alert("Lỗi hệ thống: " + err.message);
    }
  };

  // Authentication States
  const [user, setUser] = useState<{ email: string } | null>({ email: "guest@goldterminal.pro" });
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "otp">("login");
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authOtp, setAuthOtp] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [simulatedOtp, setSimulatedOtp] = useState<string>("");

  // Open-Source EMA States (TradingView Style)
  const [showEma50, setShowEma50] = useState<boolean>(true);
  const [showEma200, setShowEma200] = useState<boolean>(true);
  const [ema50Length, setEma50Length] = useState<number>(50);
  const [ema200Length, setEma200Length] = useState<number>(200);
  const [ema50Source, setEma50Source] = useState<"close" | "open" | "high" | "low">("close");
  const [ema200Source, setEma200Source] = useState<"close" | "open" | "high" | "low">("close");
  const [ema50Color, setEma50Color] = useState<string>("#FFD700"); // gold
  const [ema200Color, setEma200Color] = useState<string>("#FF1744"); // red

  // Collapsible Sections States (All default to false to stay clean & uncluttered)
  const [showEmaCloudDetails, setShowEmaCloudDetails] = useState<boolean>(false);
  const [showFvgDetails, setShowFvgDetails] = useState<boolean>(false);
  const [showObDetails, setShowObDetails] = useState<boolean>(false);
  const [showPaDetails, setShowPaDetails] = useState<boolean>(false);
  const [showIndicatorsDetails, setShowIndicatorsDetails] = useState<boolean>(false);

  // Customizer Modals & Tab State
  const [emaSettingsModal, setEmaSettingsModal] = useState<"ema50" | "ema200" | null>(null);
  const [emaSourceModal, setEmaSourceModal] = useState<"ema50" | "ema200" | null>(null);
  const [codeTab, setCodeTab] = useState<"pine" | "js">("pine");

  // Temporary Edit Form States
  const [tempLength, setTempLength] = useState<number>(50);
  const [tempSource, setTempSource] = useState<"close" | "open" | "high" | "low">("close");
  const [tempColor, setTempColor] = useState<string>("#FFD700");

  useEffect(() => {
    if (emaSettingsModal === "ema50") {
      setTempLength(ema50Length);
      setTempSource(ema50Source);
      setTempColor(ema50Color);
    } else if (emaSettingsModal === "ema200") {
      setTempLength(ema200Length);
      setTempSource(ema200Source);
      setTempColor(ema200Color);
    }
  }, [emaSettingsModal]);

  const handleApplySettings = () => {
    if (emaSettingsModal === "ema50") {
      setEma50Length(tempLength);
      setEma50Source(tempSource);
      setEma50Color(tempColor);
    } else if (emaSettingsModal === "ema200") {
      setEma200Length(tempLength);
      setEma200Source(tempSource);
      setEma200Color(tempColor);
    }
    setEmaSettingsModal(null);
  };

  const checkSession = async () => {
    setUser({ email: "guest@goldterminal.pro" });
    setAuthLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (user) {
      // Pre-fetch closed trades immediately as soon as user is authenticated
      fetchBacktestHistory(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && (dashTab === "ai" || dashTab === "backtest")) {
      fetchBacktestHistory(true);
      const interval = setInterval(() => {
        fetchBacktestHistory(false);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dashTab, user]);

  useEffect(() => {
    if (otpCountdown <= 0) return;
    const interval = setInterval(() => {
      setOtpCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpCountdown]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }
    setSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const d = await resp.json();
      if (!resp.ok) {
        if (resp.status === 403 && d.needsVerification) {
          setAuthMode("otp");
          setOtpCountdown(300);
          if (d.isSimulator && d.otp) {
            setSimulatedOtp(d.otp);
            setAuthSuccess(`⚠️ [CHẾ ĐỘ THỬ NGHIỆM]: Chưa cấu hình Email API. Mã OTP của bạn là: ${d.otp}`);
          } else {
            setSimulatedOtp("");
            setAuthSuccess(d.error || "Tài khoản chưa kích hoạt. Một mã OTP mới đã được gửi về email.");
          }
        } else {
          setAuthError(d.error || "Đăng nhập thất bại.");
        }
        return;
      }
      if (d.success) {
        setUser({ email: d.user.email });
        setAuthSuccess("Đăng nhập thành công!");
      }
    } catch (err: any) {
      setAuthError("Lỗi kết nối máy chủ: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }
    if (authPassword.length < 6) {
      setAuthError("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }
    setSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const d = await resp.json();
      if (!resp.ok) {
        setAuthError(d.error || "Đăng ký thất bại.");
        return;
      }
      if (d.success) {
        setAuthMode("otp");
        setOtpCountdown(300);
        if (d.isSimulator && d.otp) {
          setSimulatedOtp(d.otp);
          setAuthSuccess(`⚠️ [CHẾ ĐỘ THỬ NGHIỆM]: Chưa cấu hình Email API. Mã OTP của bạn là: ${d.otp}`);
        } else {
          setSimulatedOtp("");
          setAuthSuccess(d.message || "Đăng ký thành công! Vui lòng nhập mã OTP gửi tới email.");
        }
      }
    } catch (err: any) {
      setAuthError("Lỗi kết nối máy chủ: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    if (!authOtp) {
      setAuthError("Vui lòng nhập mã OTP.");
      return;
    }
    setSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const resp = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, otp: authOtp })
      });
      const d = await resp.json();
      if (!resp.ok) {
        setAuthError(d.error || "Xác thực OTP thất bại.");
        return;
      }
      if (d.success) {
        setAuthMode("login");
        setAuthOtp("");
        setSimulatedOtp("");
        setAuthSuccess("Kích hoạt tài khoản thành công! Bây giờ bạn có thể đăng nhập.");
      }
    } catch (err: any) {
      setAuthError("Lỗi kết nối máy chủ: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpCountdown > 0) return;
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const resp = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail })
      });
      const d = await resp.json();
      if (!resp.ok) {
        setAuthError(d.error || "Gửi lại OTP thất bại.");
        return;
      }
      if (d.success) {
        setOtpCountdown(300);
        if (d.isSimulator && d.otp) {
          setSimulatedOtp(d.otp);
          setAuthSuccess(`⚠️ [CHẾ ĐỘ THỬ NGHIỆM]: Mã OTP của bạn là: ${d.otp}`);
        } else {
          setSimulatedOtp("");
          setAuthSuccess(d.message || "Mã OTP mới đã được gửi về email của bạn.");
        }
      }
    } catch (err: any) {
      setAuthError("Lỗi kết nối máy chủ: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setData(null);
      setLivePrice(4500.00);
      setLiveChange(0);
      setAuthMode("login");
      setAuthEmail("");
      setAuthPassword("");
      setAuthOtp("");
      setAuthError(null);
      setAuthSuccess(null);
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // Millisecond ticker state
  const [livePrice, setLivePrice] = useState<number>(4500.00);
  const [liveChange, setLiveChange] = useState<number>(0.0);
  const [tickerActive, setTickerActive] = useState<boolean>(true);
  const [simulatedTrades, setSimulatedTrades] = useState<SimulatedTrade[]>([]);
  const [orderBook, setOrderBook] = useState<{ bids: OrderBookRow[]; asks: OrderBookRow[] }>({ bids: [], asks: [] });
  const [activeTab, setActiveTab] = useState<"book" | "history" | "signals">("book");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [lastUpdatedPA, setLastUpdatedPA] = useState<string>("");

  // Premium Features: Sound Alerts, Position Calculator, Signal Log
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [calcBalance, setCalcBalance] = useState<number>(100);
  const [calcRisk, setCalcRisk] = useState<number>(5.0);
  const [accountType, setAccountType] = useState<"standard" | "mini" | "micro">("micro");
  const [riskInputMode, setRiskInputMode] = useState<"percent" | "usd">("percent");
  const [calcRiskUsd, setCalcRiskUsd] = useState<number>(5.0); // Khởi tạo $5 USD như trong hình
  const [customSlDistance, setCustomSlDistance] = useState<number>(0);
  const [signalLogs, setSignalLogs] = useState<any[]>([
    { id: "h1", time: "05:40:12", type: "SELL", entry: 4512.40, stopLoss: 4516.80, tp1: 4504.00, status: "HIT TP1 🟢 (+84 pips)" },
    { id: "h2", time: "03:15:45", type: "BUY", entry: 4495.20, stopLoss: 4489.50, tp1: 4503.50, status: "HIT TP1 🟢 (+83 pips)" },
    { id: "h3", time: "01:04:10", type: "SELL", entry: 4520.10, stopLoss: 4525.00, tp1: 4511.00, status: "HIT SL 🔴 (-49 pips)" },
    { id: "h4", time: "23:12:05", type: "BUY", entry: 4488.50, stopLoss: 4482.00, tp1: 4498.00, status: "HIT TP1 🟢 (+95 pips)" },
  ]);
  const lastAlertTime = useRef<Record<string, number>>({});
  const [candleCountdown, setCandleCountdown] = useState<string>("");
  const [showTvGuide, setShowTvGuide] = useState<boolean>(true);

  // Chart interaction state (zoom + pan like TradingView)
  const [zoomLevel, setZoomLevel] = useState<number>(80);  // number of candles visible
  const [panOffset, setPanOffset] = useState<number>(0);    // candles shifted from the right
  const isLive = panOffset === 0;                            // true = viewing latest candle
  const [yScaleMultiplier, setYScaleMultiplier] = useState<number>(1.0); // vertical scale multiplier (Y-axis zoom)

  // Full candle list (all historical data, live price injected into last)
  const allCandles = useMemo(() => {
    if (!data?.chart?.timestamp) return [];
    const count = data.chart.timestamp.length;
    const list: Candle[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        time: data.chart.timestamp[i],
        open: data.chart.open[i] ?? 0,
        high: data.chart.high[i] ?? 0,
        low: data.chart.low[i] ?? 0,
        close: data.chart.close[i] ?? 0,
        volume: data.chart.volume[i] ?? 0,
      });
    }
    // Inject live price into last candle
    if (list.length > 0) {
      const last = list[list.length - 1];
      last.close = livePrice;
      if (livePrice > last.high) last.high = livePrice;
      if (livePrice < last.low) last.low = livePrice;
    }
    return list;
  }, [data, livePrice]);

  // Visible window of candles based on zoom + pan
  const activeCandles = useMemo(() => {
    if (allCandles.length === 0) return [];
    const total = allCandles.length;
    const clampedZoom = Math.max(10, Math.min(zoomLevel, total));
    const clampedPan = Math.max(0, Math.min(panOffset, total - clampedZoom));
    const end = total - clampedPan;
    const start = Math.max(0, end - clampedZoom);
    return allCandles.slice(start, end);
  }, [allCandles, zoomLevel, panOffset]);

  // Visible window start index in allCandles
  const activeStartIdx = useMemo(() => {
    if (allCandles.length === 0) return 0;
    const total = allCandles.length;
    const clampedZoom = Math.max(10, Math.min(zoomLevel, total));
    const clampedPan = Math.max(0, Math.min(panOffset, total - clampedZoom));
    const end = total - clampedPan;
    return Math.max(0, end - clampedZoom);
  }, [allCandles, zoomLevel, panOffset]);

  // Calculate EMA 50 for allCandles
  const ema50Values = useMemo(() => {
    if (allCandles.length === 0) return [];
    const values: number[] = [];
    const len = Number(ema50Length) || 50;
    const k = 2 / (len + 1);
    const src = ema50Source || "close";
    let ema = allCandles[0][src] || allCandles[0].close;
    values.push(ema);
    for (let i = 1; i < allCandles.length; i++) {
      const price = allCandles[i][src] || allCandles[i].close;
      ema = price * k + ema * (1 - k);
      values.push(ema);
    }
    return values;
  }, [allCandles, ema50Length, ema50Source]);

  // Calculate EMA 200 for allCandles
  const ema200Values = useMemo(() => {
    if (allCandles.length === 0) return [];
    const values: number[] = [];
    const len = Number(ema200Length) || 200;
    const k = 2 / (len + 1);
    const src = ema200Source || "close";
    let ema = allCandles[0][src] || allCandles[0].close;
    values.push(ema);
    for (let i = 1; i < allCandles.length; i++) {
      const price = allCandles[i][src] || allCandles[i].close;
      ema = price * k + ema * (1 - k);
      values.push(ema);
    }
    return values;
  }, [allCandles, ema200Length, ema200Source]);

  // Determine M15 Bearish Trendline Points
  const trendlinePoints = useMemo(() => {
    if (allCandles.length < 10) return null;

    // Try to use swings from advancedAnalysis first
    const swings = data?.advancedAnalysis?.swings || [];
    const swingHighs = swings.filter(s => s.type === "HIGH").sort((a, b) => a.index - b.index);

    if (swingHighs.length >= 2) {
      let p1 = swingHighs[0];
      for (const sh of swingHighs) {
        if (sh.price > p1.price) {
          p1 = sh;
        }
      }
      let p2 = swingHighs.find(sh => sh.index > p1.index && sh.price < p1.price);
      if (!p2) {
        p2 = swingHighs[swingHighs.length - 1];
      }

      if (p1 && p2 && p1.index !== p2.index) {
        return {
          i1: p1.index,
          price1: p1.price,
          i2: p2.index,
          price2: p2.price,
          source: "SMC Swings"
        };
      }
    }

    // Fallback: Scan active window or recent history for swing highs
    let maxIdx = 0;
    let maxPrice = allCandles[0].high;
    for (let i = 1; i < Math.floor(allCandles.length * 0.7); i++) {
      if (allCandles[i].high > maxPrice) {
        maxPrice = allCandles[i].high;
        maxIdx = i;
      }
    }

    let nextIdx = maxIdx + 5;
    let nextPrice = 0;
    if (nextIdx < allCandles.length) {
      nextPrice = allCandles[nextIdx].high;
      for (let i = nextIdx; i < allCandles.length; i++) {
        if (allCandles[i].high > nextPrice && allCandles[i].high < maxPrice) {
          nextPrice = allCandles[i].high;
          nextIdx = i;
        }
      }
    }

    if (maxIdx !== nextIdx && nextIdx < allCandles.length) {
      return {
        i1: maxIdx,
        price1: maxPrice,
        i2: nextIdx,
        price2: nextPrice,
        source: "PA Scan"
      };
    }

    // Static Fallback levels
    return {
      i1: Math.max(0, allCandles.length - 80),
      price1: 4568.00,
      i2: Math.max(0, allCandles.length - 20),
      price2: 4516.00,
      source: "SMC Profile"
    };
  }, [allCandles, data]);

  // SVG Chart rendering computations
  const chartSpecs = useMemo(() => {
    if (activeCandles.length < 5) return null;

    const width = 1400;
    const height = 520;
    const paddingLeft = 4;
    const paddingRight = 68;
    const paddingTop = 12;
    const paddingBottom = 34;

    const usableWidth = width - paddingLeft - paddingRight;
    const usableHeight = height - paddingTop - paddingBottom;

    const highs = activeCandles.map(c => c.high);
    const lows = activeCandles.map(c => c.low);

    let maxPrice = Math.max(...highs);
    let minPrice = Math.min(...lows);
    const priceRange = maxPrice - minPrice || 1;

    const midPrice = (maxPrice + minPrice) / 2;
    const scaledRange = (priceRange * 1.1 * yScaleMultiplier) || 1;
    maxPrice = midPrice + scaledRange / 2;
    minPrice = midPrice - scaledRange / 2;
    const paddedRange = maxPrice - minPrice;

    const candleCount = activeCandles.length;
    const candleSlotW = usableWidth / candleCount;
    // 75% of slot, min 1px (doji), no artificial upper cap
    const bodyWidth = Math.max(1, candleSlotW * 0.75);

    const getX = (index: number) => paddingLeft + (index + 0.5) * candleSlotW;
    const getY = (price: number) => paddingTop + (1 - (price - minPrice) / paddedRange) * usableHeight;

    // Time labels: pick ~8 evenly spaced candles
    const labelStep = Math.max(1, Math.floor(candleCount / 8));
    const timeLabels: { x: number; label: string }[] = [];
    for (let i = 0; i < candleCount; i += labelStep) {
      const ts = activeCandles[i].time * 1000;
      const d = new Date(ts);
      let label: string;
      if (["1D", "1W", "1M"].includes(timeframe)) {
        label = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
      } else {
        label = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      }
      timeLabels.push({ x: getX(i), label });
    }

    // Price labels on Y axis — 8 labels
    const yLabelCount = 8;
    const priceLabels: { y: number; price: number }[] = [];
    for (let i = 0; i <= yLabelCount; i++) {
      const price = minPrice + (paddedRange * i) / yLabelCount;
      priceLabels.push({ y: getY(price), price });
    }

    return {
      width, height,
      paddingLeft, paddingRight, paddingBottom,
      usableWidth, usableHeight,
      maxPrice, minPrice, paddedRange,
      candleSlotW, bodyWidth,
      getX, getY,
      timeLabels, priceLabels
    };
  }, [activeCandles, timeframe, yScaleMultiplier]);

  // Refs for tracking values inside ticker loop
  const priceRef = useRef<number>(4500.00);
  const dataRef = useRef<GoldSignalResponse | null>(null);
  const tickCounter = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartPan = useRef<number>(0);
  const chartSvgRef = useRef<SVGSVGElement>(null);

  // Y-axis scaling refs
  const isYScaling = useRef<boolean>(false);
  const dragStartY = useRef<number>(0);
  const dragStartScale = useRef<number>(1.0);

  // Candle period durations in seconds per timeframe
  const CANDLE_PERIODS: Record<string, number> = {
    "1": 60, "5": 300, "15": 900, "60": 3600,
    "1D": 86400, "1W": 604800, "1M": 2592000
  };

  // Update server data ref
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Audio chime player using Web Audio API (lightweight, native, robust)
  const playSound = (type = "info") => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "buy") {
        // High-pitched harmonic chimes for Buy alerts
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        osc.start();

        osc.frequency.setValueAtTime(698.46, audioCtx.currentTime + 0.12); // F5
        gain.gain.setValueAtTime(0.10, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.stop(audioCtx.currentTime + 0.4);
      } else if (type === "sell") {
        // Deeper warning double-tone for Sell alerts
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        osc.start();

        osc.frequency.setValueAtTime(392.00, audioCtx.currentTime + 0.12); // G4
        gain.gain.setValueAtTime(0.10, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.stop(audioCtx.currentTime + 0.4);
      } else {
        // Simple info ping
        osc.frequency.setValueAtTime(440.00, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.20);
      }
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };



  // Audio Alert Touch Detection Loop
  useEffect(() => {
    if (!soundEnabled || !data?.advancedAnalysis) return;

    const analysis = data.advancedAnalysis;
    const now = Date.now();

    // 1. Detect unmitigated BULLISH FVG touches (Support)
    const bullishFvg = analysis.fvgs.find(f => !f.mitigated && f.type === "BULLISH");
    if (bullishFvg) {
      if (livePrice <= bullishFvg.top && livePrice >= bullishFvg.bottom) {
        const cooldownKey = `fvg_bullish_${bullishFvg.index}`;
        if (!lastAlertTime.current[cooldownKey] || now - lastAlertTime.current[cooldownKey] > 30000) {
          lastAlertTime.current[cooldownKey] = now;
          playSound("buy");
        }
      }
    }

    // 2. Detect unmitigated BEARISH FVG touches (Resistance)
    const bearishFvg = analysis.fvgs.find(f => !f.mitigated && f.type === "BEARISH");
    if (bearishFvg) {
      if (livePrice >= bearishFvg.bottom && livePrice <= bearishFvg.top) {
        const cooldownKey = `fvg_bearish_${bearishFvg.index}`;
        if (!lastAlertTime.current[cooldownKey] || now - lastAlertTime.current[cooldownKey] > 30000) {
          lastAlertTime.current[cooldownKey] = now;
          playSound("sell");
        }
      }
    }

    // 3. Detect unmitigated Bullish Order Block touches
    const bullishOb = analysis.orderBlocks.find(o => !o.mitigated && o.type === "BULLISH");
    if (bullishOb) {
      if (livePrice >= bullishOb.low && livePrice <= bullishOb.high) {
        const cooldownKey = `ob_bullish_${bullishOb.index}`;
        if (!lastAlertTime.current[cooldownKey] || now - lastAlertTime.current[cooldownKey] > 30000) {
          lastAlertTime.current[cooldownKey] = now;
          playSound("buy");
        }
      }
    }

    // 4. Detect unmitigated Bearish Order Block touches
    const bearishOb = analysis.orderBlocks.find(o => !o.mitigated && o.type === "BEARISH");
    if (bearishOb) {
      if (livePrice >= bearishOb.low && livePrice <= bearishOb.high) {
        const cooldownKey = `ob_bearish_${bearishOb.index}`;
        if (!lastAlertTime.current[cooldownKey] || now - lastAlertTime.current[cooldownKey] > 30000) {
          lastAlertTime.current[cooldownKey] = now;
          playSound("sell");
        }
      }
    }

  }, [livePrice, soundEnabled, data]);

  // Keep a ticking clock + candle countdown timer (like TradingView)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-GB") + " UTC");

      // Candle countdown: seconds remaining until next candle close
      const periodSec = CANDLE_PERIODS[timeframe] || 86400;
      const nowSec = Math.floor(now.getTime() / 1000);
      const remaining = periodSec - (nowSec % periodSec);

      if (remaining >= 3600) {
        const h = Math.floor(remaining / 3600);
        const m = Math.floor((remaining % 3600) / 60);
        const s = remaining % 60;
        setCandleCountdown(`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
      } else {
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        setCandleCountdown(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeframe]);

  // Keyboard navigation shortcuts (like TradingView)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        zoomOut();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPanOffset(prev => Math.min(allCandles.length - zoomLevel, prev + 5));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPanOffset(prev => Math.max(0, prev - 5));
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setZoomLevel(80);
        setPanOffset(0);
        setYScaleMultiplier(1.0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allCandles.length, zoomLevel]);

  // Fetch full Gold Signals + Chart (runs every 500ms for ultra-realtime price behavior)
  const fetchGoldData = async (isPolling = false) => {
    if (!user) return; // Guard for unauthenticated user
    if (!isPolling) setLoading(true);
    if (!isPolling) setError(null);
    try {
      const resp = await fetch(`/api/signals/XAUUSD?tf=${timeframe}`);
      if (!resp.ok) throw new Error("Không thể kết nối đến server API Gold");
      const resData: GoldSignalResponse = await resp.json();
      setError(null); // Clear connection error upon success
      setData(resData);
      setLastUpdatedPA(new Date().toLocaleTimeString("vi-VN"));

      // Smoothly guide the simulated price toward the real price from the API (even when polling)
      if (resData.lastPrice > 0) {
        if (!dataRef.current || Math.abs(priceRef.current - resData.lastPrice) > 100) {
          priceRef.current = resData.lastPrice;
        } else {
          priceRef.current = priceRef.current * 0.7 + resData.lastPrice * 0.3;
        }
        setLivePrice(Math.round(priceRef.current * 100) / 100);
      }

      // Check if we need to log a new signal
      if (resData.signals && resData.signals.type !== "NEUTRAL") {
        setSignalLogs(prev => {
          const lastLog = prev[0];
          // Check if this signal type or entry is different to prevent duplicate listings
          if (!lastLog || lastLog.type !== resData.signals.type || Math.abs(lastLog.entry - resData.signals.suggestion.entry) > 0.5) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString("vi-VN");
            const newLog = {
              id: Math.random().toString(),
              time: timeStr,
              type: resData.signals.type,
              entry: resData.signals.suggestion.entry,
              stopLoss: resData.signals.suggestion.stopLoss,
              tp1: resData.signals.suggestion.takeProfit1,
              status: "Active 🟡"
            };
            return [newLog, ...prev.slice(0, 14)];
          }
          return prev;
        });
      }

      if (!isPolling) {
        generateOrderBook(resData.lastPrice);
        generateInitialTrades(resData.lastPrice);
      }
      setLiveChange(resData.priceChange);
    } catch (e: any) {
      if (!isPolling) setError(e.message);
    } finally {
      if (!isPolling) setLoading(false);
    }
  };

  // ⚡ Ultra-fast PRICE-ONLY fetch (kept as fallback/direct endpoint reference)
  const fetchLivePrice = async () => {
    try {
      const resp = await fetch("/api/price/XAUUSD");
      if (!resp.ok) return;
      const d = await resp.json();
      if (d.price && d.price > 0) {
        priceRef.current = priceRef.current * 0.7 + d.price * 0.3;
        setLivePrice(Math.round(priceRef.current * 100) / 100);
        setLiveChange(d.change);
      }
    } catch (_) {
      // Silent fail
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchGoldData(false);

    // 1. Fast price polling every 1500ms to keep livePrice highly synchronized with the real market
    const priceInterval = setInterval(() => {
      if (tickerActive && user) {
        fetchLivePrice();
      }
    }, 1500);

    // 2. Slow full signal & chart polling every 30000ms (30 seconds) to protect server from overload
    const signalInterval = setInterval(() => {
      if (tickerActive && user) {
        fetchGoldData(true);
      }
    }, 30000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(signalInterval);
    };
  }, [timeframe, tickerActive, user]);

  // Seed simulated order book around base price
  const generateOrderBook = (base: number) => {
    const spread = 0.35 + Math.random() * 0.15; // spread in gold dollar (35 - 50 pips)
    const bids: OrderBookRow[] = [];
    const asks: OrderBookRow[] = [];
    for (let i = 1; i <= 10; i++) {
      asks.push({
        price: base + spread / 2 + (i - 1) * 0.15,
        size: Math.round((Math.random() * 80 + 5) * 10) / 10,
      });
      bids.push({
        price: base - spread / 2 - (i - 1) * 0.15,
        size: Math.round((Math.random() * 80 + 5) * 10) / 10,
      });
    }
    setOrderBook({ bids, asks: asks.reverse() });
  };

  // Seed initial high frequency trades
  const generateInitialTrades = (base: number) => {
    const list: SimulatedTrade[] = [];
    const now = new Date();
    for (let i = 0; i < 20; i++) {
      const subMs = i * 280;
      const tDate = new Date(now.getTime() - subMs);
      const isBuy = Math.random() > 0.48;
      list.push({
        id: `init-${i}`,
        time: tDate.toLocaleTimeString() + "." + String(tDate.getMilliseconds()).padStart(3, "0"),
        type: isBuy ? "BUY" : "SELL",
        price: base + (Math.random() - 0.5) * 0.4,
        size: (Math.random() * 4.5 + 0.1).toFixed(1) + " Lot",
      });
    }
    setSimulatedTrades(list);
  };

  // High Frequency Millisecond Tick Loop
  useEffect(() => {
    if (!tickerActive || !data || !user) return;

    const tickInterval = setInterval(() => {
      // 1. Random Walk price simulation around real market price (+/- 0.05 to 0.15 Gold USD)
      const current = priceRef.current;
      const realBase = data.lastPrice;

      // Calculate delta, leaning back toward real price if we wander too far
      const drift = (realBase - current) * 0.05; // smoother drift
      const noise = (Math.random() - 0.5) * 0.25; // larger noise for more active wiggles
      const nextPrice = Math.round((current + drift + noise) * 100) / 100;

      priceRef.current = nextPrice;
      setLivePrice(nextPrice);

      // Recalculate percent change dynamically
      const initialDayOpen = realBase / (1 + data.priceChange / 100);
      const nextChange = ((nextPrice - initialDayOpen) / initialDayOpen) * 100;
      setLiveChange(nextChange);

      // 2. Simulating millisecond level order book updates
      tickCounter.current++;
      if (tickCounter.current % 3 === 0) {
        // Shift order book following livePrice wiggles
        const spread = 0.35 + Math.random() * 0.10;
        setOrderBook(prev => {
          const asks = prev.asks.map((a, idx) => {
            const level = 10 - idx;
            return {
              price: Math.round((nextPrice + spread / 2 + (level - 1) * 0.15) * 100) / 100,
              size: Math.max(1, Math.round((a.size + (Math.random() - 0.5) * 5) * 10) / 10),
            };
          });
          const bids = prev.bids.map((b, idx) => {
            return {
              price: Math.round((nextPrice - spread / 2 - idx * 0.15) * 100) / 100,
              size: Math.max(1, Math.round((b.size + (Math.random() - 0.5) * 5) * 10) / 10),
            };
          });
          return { bids, asks };
        });
      }

      // 3. Simulating high-frequency trade matchings (35% probability per tick)
      if (Math.random() < 0.35) {
        const isBuy = Math.random() > 0.47;
        const now = new Date();
        const tradePrice = isBuy
          ? nextPrice + (Math.random() * 0.05)
          : nextPrice - (Math.random() * 0.05);

        const newTrade: SimulatedTrade = {
          id: Math.random().toString(),
          time: now.toLocaleTimeString() + "." + String(now.getMilliseconds()).padStart(3, "0"),
          type: isBuy ? "BUY" : "SELL",
          price: Math.round(tradePrice * 100) / 100,
          size: (Math.random() * 5.0 + 0.1).toFixed(1) + " Lot",
        };

        setSimulatedTrades(prev => [newTrade, ...prev.slice(0, 24)]);
      }

    }, 85); // Tick every 85ms for super fast "nến nhảy"

    return () => clearInterval(tickInterval);
  }, [tickerActive, data]);

  // ---- Chart interaction handlers ----
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chartSvgRef.current || !chartSpecs) return;
    const rect = chartSvgRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * chartSpecs.width;

    // Check if clicked in price axis (right padding zone)
    if (clickX > chartSpecs.width - chartSpecs.paddingRight) {
      isYScaling.current = true;
      dragStartY.current = e.clientY;
      dragStartScale.current = yScaleMultiplier;
    } else {
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartPan.current = panOffset;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isYScaling.current) {
      const dy = e.clientY - dragStartY.current;
      // Dragging down scales up (compresses price range), dragging up scales down (expands price range)
      const scaleFactor = 1 + dy * 0.005;
      setYScaleMultiplier(Math.max(0.05, Math.min(10.0, dragStartScale.current * scaleFactor)));
    } else if (isDragging.current && chartSvgRef.current && chartSpecs) {
      const dx = e.clientX - dragStartX.current;
      const svgWidth = chartSvgRef.current.clientWidth || 860;
      const pixelsPerCandle = svgWidth / Math.max(zoomLevel, 1);
      const candleDelta = Math.round(-dx / pixelsPerCandle);
      const newPan = Math.max(0, Math.min(allCandles.length - zoomLevel, dragStartPan.current + candleDelta));
      setPanOffset(newPan);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isYScaling.current = false;
  };

  const handleDoubleClick = () => {
    setZoomLevel(80);
    setPanOffset(0);
    setYScaleMultiplier(1.0);
  };

  // Passive-free native wheel event listener to prevent browser scroll & warning
  useEffect(() => {
    const svg = chartSvgRef.current;
    if (!svg) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1 : -1;
      setZoomLevel(prev => Math.max(10, Math.min(500, prev + delta * Math.ceil(prev * 0.08))));
    };

    svg.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      svg.removeEventListener("wheel", handleNativeWheel);
    };
  }, [chartSpecs]);

  // Snap back to live (right edge)
  const snapToLive = () => setPanOffset(0);

  // Zoom buttons
  const zoomIn = () => setZoomLevel(prev => Math.max(10, Math.round(prev * 0.7)));
  const zoomOut = () => setZoomLevel(prev => Math.min(500, Math.round(prev * 1.4)));

  // Real-time Unified Confluence Indicator Math
  const unifiedSignal = useMemo(() => {
    if (!data) return null;

    const signals = data.signals;
    const tv = data.tradingViewAnalysis;

    // 1. Calculate Confluence Score (-100 to +100)
    const customScore = signals.type === "BUY" ? signals.strength : (signals.type === "SELL" ? -signals.strength : 0);
    const tvScore = tv ? tv.recommendAll * 100 : 0;
    const confluenceScore = Math.round((customScore + tvScore) / 2);

    // Determine Direction
    let type: "BUY" | "SELL" | "NEUTRAL" | "STRONG_BUY" | "STRONG_SELL" = "NEUTRAL";
    if (confluenceScore >= 40) type = "STRONG_BUY";
    else if (confluenceScore >= 15) type = "BUY";
    else if (confluenceScore <= -40) type = "STRONG_SELL";
    else if (confluenceScore <= -15) type = "SELL";

    // 2. Win Probability calculation
    let baseProb = 50;
    let trendBonus = 0;
    let momentumBonus = 0;
    let adxBonus = 0;
    let divergenceBonus = 0;

    const atr = signals.indicators.atr || tv?.atr || 3.2;
    const rsi = signals.indicators.rsi || tv?.rsi || 50;
    const macdHist = tv ? (tv.macd - tv.macdSignal) : 0;

    // Trend matching
    if (tv) {
      const isMacroUp = livePrice > tv.ema50;
      const isShortUp = tv.ema10 > tv.sma20;

      if (type.includes("BUY")) {
        if (isMacroUp) trendBonus += 6;
        if (isShortUp) trendBonus += 6;
      } else if (type.includes("SELL")) {
        if (!isMacroUp) trendBonus += 6;
        if (!isShortUp) trendBonus += 6;
      }
    }

    // Momentum
    if (type.includes("BUY")) {
      if (rsi >= 50 && rsi <= 65) momentumBonus += 6;
      if (macdHist > 0) momentumBonus += 6;
    } else if (type.includes("SELL")) {
      if (rsi >= 35 && rsi <= 50) momentumBonus += 6;
      if (macdHist < 0) momentumBonus += 6;
    }

    // ADX trend strength
    if (tv && tv.adx > 25) {
      adxBonus += 6;
    }

    // Reversal / Divergence oversold/overbought support
    if (type.includes("BUY") && rsi < 30) divergenceBonus += 8;
    if (type.includes("SELL") && rsi > 70) divergenceBonus += 8;

    let winProbability = Math.min(94, Math.max(35, Math.round(baseProb + Math.abs(confluenceScore) * 0.3 + trendBonus + momentumBonus + adxBonus + divergenceBonus)));

    // 3. Entry, SL, TP suggestions based on real ATR & stable closed price
    let optimalEntryMin = 0;
    let optimalEntryMax = 0;
    let entryText = "";
    let sl = 0;
    let tp1 = 0;
    let tp2 = 0;
    let entryMid = 0;

    // Use latest closed candle price as stable baseline
    const stablePrice = data.chart?.close && data.chart.close.length > 0
      ? data.chart.close[data.chart.close.length - 1]
      : livePrice;

    // Dynamic suggestions computed from real market structure and ATR on Deno engine
    if (signals && signals.suggestion && signals.suggestion.position !== "NEUTRAL") {
      const sug = signals.suggestion;
      sl = sug.stopLoss;
      tp1 = sug.takeProfit1;
      tp2 = sug.takeProfit2;
      entryMid = sug.entry;
      optimalEntryMin = Math.round((entryMid - 0.15 * atr) * 100) / 100;
      optimalEntryMax = Math.round((entryMid + 0.15 * atr) * 100) / 100;
      entryText = `$${entryMid.toFixed(2)}`;
      if (signals.strength > 0) {
        winProbability = Math.min(94, Math.max(78, 80 + Math.round(signals.strength * 0.15)));
      }
    } else {
      optimalEntryMin = Math.round((type.includes("BUY") ? (stablePrice - 0.25 * atr) : stablePrice) * 100) / 100;
      optimalEntryMax = Math.round((type.includes("BUY") ? stablePrice : (stablePrice + 0.25 * atr)) * 100) / 100;
      entryText = `$${optimalEntryMin.toFixed(2)} - $${optimalEntryMax.toFixed(2)}`;
      entryMid = (optimalEntryMin + optimalEntryMax) / 2;

      if (type.includes("BUY")) {
        sl = Math.round((entryMid - 1.5 * atr) * 100) / 100;
        tp1 = Math.round((entryMid + 1.5 * atr) * 100) / 100;
        tp2 = Math.round((entryMid + 3.0 * atr) * 100) / 100;
      } else if (type.includes("SELL")) {
        sl = Math.round((entryMid + 1.5 * atr) * 100) / 100;
        tp1 = Math.round((entryMid - 1.5 * atr) * 100) / 100;
        tp2 = Math.round((entryMid - 3.0 * atr) * 100) / 100;
      }
    }

    return {
      type,
      confluenceScore,
      winProbability,
      entryText,
      entryMid,
      sl,
      tp1,
      tp2,
      atr,
      rsi,
      adx: tv?.adx || 20,
      ema10: tv?.ema10 || livePrice,
      sma20: tv?.sma20 || livePrice,
    };
  }, [data]);

  // SL distance and lot size computations
  const calculatedSlDistance = useMemo(() => {
    if (customSlDistance > 0) return customSlDistance;
    if (!unifiedSignal || !unifiedSignal.sl) return 0;
    return Math.abs(unifiedSignal.entryMid - unifiedSignal.sl);
  }, [customSlDistance, unifiedSignal]);

  // Dynamic risk amount in USD based on input mode (percent or absolute USD)
  const riskAmount = useMemo(() => {
    if (riskInputMode === "percent") {
      return (calcBalance * calcRisk) / 100;
    } else {
      return calcRiskUsd;
    }
  }, [calcBalance, calcRisk, calcRiskUsd, riskInputMode]);

  // Dynamic risk percentage for display
  const calculatedRiskPercent = useMemo(() => {
    if (calcBalance <= 0) return 0;
    if (riskInputMode === "usd") {
      return (calcRiskUsd / calcBalance) * 100;
    } else {
      return calcRisk;
    }
  }, [calcBalance, calcRisk, calcRiskUsd, riskInputMode]);

  const calculatedLotSize = useMemo(() => {
    if (calculatedSlDistance <= 0) return 0;
    const contractSize = accountType === "standard" ? 100 : accountType === "mini" ? 10 : 1;
    return riskAmount / (calculatedSlDistance * contractSize);
  }, [riskAmount, calculatedSlDistance, accountType]);

  // Conic gradient background for circular technical gauge
  const probMeterStyle = useMemo(() => {
    if (!unifiedSignal) return {};
    const type = unifiedSignal.type;
    const str = unifiedSignal.winProbability;

    let fill = "var(--yellow)";
    if (type.includes("BUY")) fill = "var(--green)";
    else if (type.includes("SELL")) fill = "var(--red)";

    return {
      background: `conic-gradient(${fill} 0% ${str}%, var(--bg3) ${str}% 100%)`
    };
  }, [unifiedSignal]);

  if (authLoading) {
    return (
      <div className="auth-container">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <img src="/frontend/logo.png" alt="XAU Logo" style={{ width: "120px", height: "120px", borderRadius: "16px", animation: "pulse 2s infinite ease-in-out", filter: "drop-shadow(0 0 24px rgba(255, 171, 0, 0.6))", marginBottom: "8px" }} />
          <div style={{ color: "var(--gold)", fontWeight: "bold", fontSize: "16px", letterSpacing: "1px" }}>ĐANG KHỞI ĐỘNG XAU/USD GOLD TERMINAL...</div>
          <div className="load-bar" style={{ width: "200px" }}><div className="load-fill"></div></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="/frontend/logo.png" alt="XAU Logo" style={{ width: "110px", height: "110px", borderRadius: "14px", marginBottom: "16px", filter: "drop-shadow(0 0 20px rgba(255, 171, 0, 0.5))" }} />
            <h1 className="auth-title">XAU/USD GOLD PRO</h1>
            <p className="auth-subtitle">Hệ thống Tín hiệu & Đồ thị thông minh</p>
          </div>

          {authError && (
            <div className="auth-alert error">
              <span>⚠️</span>
              <div>{authError}</div>
            </div>
          )}

          {authSuccess && (
            <div className="auth-alert success">
              <span>✅</span>
              <div>{authSuccess}</div>
            </div>
          )}

          {authMode === "login" && (
            <>
              <div className="auth-tabs">
                <button className="auth-tab-btn active">ĐĂNG NHẬP</button>
                <button className="auth-tab-btn" onClick={() => { setAuthMode("register"); setAuthError(null); setAuthSuccess(null); }}>ĐĂNG KÝ</button>
              </div>

              <form className="auth-form" onSubmit={handleLogin}>
                <div className="auth-field">
                  <label className="auth-label">Địa chỉ Email</label>
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="name@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="auth-field">
                  <label className="auth-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-submit-btn" disabled={submitting}>
                  {submitting ? "Đang xác thực..." : "MỞ KHÓA TERMINAL 🔓"}
                </button>
              </form>
            </>
          )}

          {authMode === "register" && (
            <>
              <div className="auth-tabs">
                <button className="auth-tab-btn" onClick={() => { setAuthMode("login"); setAuthError(null); setAuthSuccess(null); }}>ĐĂNG NHẬP</button>
                <button className="auth-tab-btn active">ĐĂNG KÝ</button>
              </div>

              <form className="auth-form" onSubmit={handleRegister}>
                <div className="auth-field">
                  <label className="auth-label">Địa chỉ Email thực tế</label>
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="name@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="auth-field">
                  <label className="auth-label">Mật khẩu (từ 6 ký tự)</label>
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-submit-btn" disabled={submitting}>
                  {submitting ? "Đang đăng ký & gửi OTP..." : "ĐĂNG KÝ & GỬI OTP ✉️"}
                </button>
              </form>
            </>
          )}

          {authMode === "otp" && (
            <div className="auth-otp-wrap">
              <div style={{ textAlign: "center", color: "var(--text2)", fontSize: "13.5px" }}>
                Vui lòng nhập mã OTP 6 số đã được gửi tới hòm thư:<br />
                <strong style={{ color: "var(--gold)" }}>{authEmail}</strong>
              </div>

              <form className="auth-form" style={{ width: "100%" }} onSubmit={handleVerifyOtp}>
                <div className="auth-field">
                  <label className="auth-label" style={{ textAlign: "center" }}>MÃ XÁC THỰC OTP</label>
                  <input
                    type="text"
                    maxLength={6}
                    className="auth-otp-input"
                    placeholder="••••••"
                    value={authOtp}
                    onChange={(e) => setAuthOtp(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
                <button type="submit" className="auth-submit-btn" disabled={submitting || authOtp.length !== 6}>
                  {submitting ? "Đang kiểm tra..." : "KÍCH HOẠT TÀI KHOẢN 🚀"}
                </button>
              </form>

              {simulatedOtp && (
                <div style={{
                  background: "rgba(255, 171, 0, 0.08)",
                  border: "1px dashed var(--gold)",
                  borderRadius: "8px",
                  padding: "12px",
                  marginTop: "12px",
                  fontSize: "12.5px",
                  color: "var(--text)",
                  textAlign: "center",
                  lineHeight: "1.5"
                }}>
                  <div style={{ fontWeight: "bold", color: "var(--gold)", marginBottom: "4px" }}>
                    🤖 PHÁT HIỆN CHẾ ĐỘ THỬ NGHIỆM
                  </div>
                  Máy chủ chưa cấu hình Email API trong tệp <code style={{ color: "var(--yellow)", fontFamily: "monospace" }}>.env</code>.
                  <div style={{ margin: "8px 0" }}>
                    Mã OTP của bạn là: <strong style={{ color: "var(--green)", fontSize: "16px", fontFamily: "monospace", letterSpacing: "1px" }}>{simulatedOtp}</strong>
                  </div>
                  <span
                    onClick={() => setAuthOtp(simulatedOtp)}
                    style={{
                      background: "rgba(0, 230, 118, 0.15)",
                      color: "var(--green)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      display: "inline-block",
                      border: "1px solid rgba(0, 230, 118, 0.3)"
                    }}
                  >
                    ⚡ TỰ ĐỘNG ĐIỀN MÃ OTP
                  </span>
                  <div style={{ fontSize: "10.5px", color: "var(--text3)", marginTop: "8px" }}>
                    Để gửi email thật về hòm thư, vui lòng cấu hình SMTP hoặc Resend API trong tệp <strong style={{ color: "#fff" }}>.env</strong> ở thư mục dự án và khởi động lại server.
                  </div>
                </div>
              )}

              <div className="auth-resend">
                {otpCountdown > 0 ? (
                  <span>Gửi lại mã sau {Math.floor(otpCountdown / 60)}:{(otpCountdown % 60).toString().padStart(2, "0")}</span>
                ) : (
                  <span>
                    Không nhận được email? <span onClick={handleResendOtp}>Bấm gửi lại OTP</span>
                  </span>
                )}
              </div>

              <div className="auth-link" onClick={() => { setAuthMode("login"); setAuthError(null); setAuthSuccess(null); setSimulatedOtp(""); }}>
                ← Quay lại trang Đăng nhập
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="root">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand" style={{ display: "flex", alignItems: "center" }}>
            <img src="/frontend/logo.png" alt="XAU Logo" style={{ width: "45px", height: "45px", borderRadius: "8px", marginRight: "8px", filter: "drop-shadow(0 0 8px rgba(255, 171, 0, 0.4))" }} />
            <span className="brand-name">HỆ THỐNG GIAO DỊCH VÀNG CHUYÊN NGHIỆP XAU/USD</span>
            <span className="brand-badge">DỮ LIỆU THỜI GIAN THỰC MILLISECOND</span>
          </div>
        </div>
        <div className="topbar-right">
          <span className="clock">{currentTime || "00:00:00 UTC"}</span>
          <button
            className={`tf-btn ${soundEnabled ? "active" : ""}`}
            style={{
              borderColor: soundEnabled ? "var(--green)" : "rgba(255,255,255,0.05)",
              background: soundEnabled ? "rgba(0, 230, 118, 0.12)" : "var(--bg3)",
              color: soundEnabled ? "var(--green)" : "var(--text)",
              marginRight: "10px",
              fontWeight: soundEnabled ? "600" : "normal",
              cursor: "pointer"
            }}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? "🔔 Báo Âm: BẬT" : "🔕 Báo Âm: TẮT"}
          </button>
          <button
            className="tf-btn"
            style={{ borderColor: "rgba(255,255,255,0.05)", background: "var(--bg3)", color: "var(--text)" }}
            onClick={fetchGoldData}
          >
            🔄 Tải Lại
          </button>
        </div>
      </header>

      <div className="layout">
        {/* SIDEBAR */}
        {!fullChart && (
        <aside className="sidebar">
          <header className="sb-header hide-on-mobile">
            <div className="gold-profile-card">
              <div className="g-title">🟡 VÀNG SPOT (XAU/USD)</div>
            </div>
          </header>

          <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto" }}>
            {data && (
              /* Premium Golden Logo replacing the removed Position Size Calculator */
              <div className="sug-card hide-on-mobile" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "16px", background: "rgba(20, 24, 33, 0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 215, 0, 0.08)", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)" }}>
                <img
                  src="/frontend/logo.png"
                  alt="Xtreme Algo Union Logo"
                  style={{
                    width: "100%",
                    maxWidth: "220px",
                    height: "auto",
                    borderRadius: "12px",
                    filter: "drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = "drop-shadow(0 0 24px rgba(255, 171, 0, 0.5))";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = "drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            )}
            {unifiedSignal && (
              <div className="sug-card" style={{ borderTop: "3px solid var(--gold)", background: "rgba(20, 24, 33, 0.65)", backdropFilter: "blur(12px)" }}>
                <div className="sug-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>✨ CHỈ BÁO HỢP LƯU KỸ THUẬT</span>
                  <span style={{ fontSize: "9px", background: "rgba(255, 171, 0, 0.15)", color: "var(--gold)", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>PRO FEED</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "14px 0", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  {/* Rating description */}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "10px", color: "var(--text2)", textTransform: "uppercase", display: "block" }}>Khuyến nghị hợp lưu</span>
                    <span className={`sug-val ${unifiedSignal.type.includes("BUY") ? "buy" : unifiedSignal.type.includes("SELL") ? "sell" : ""
                      }`} style={{ fontSize: "15px", fontWeight: "800", marginTop: "2px", display: "block" }}>
                      {unifiedSignal.type === "STRONG_BUY" ? "🟢 MUA MẠNH (STRONG BUY)" :
                        unifiedSignal.type === "BUY" ? "🟢 MUA VÀO (BUY)" :
                          unifiedSignal.type === "STRONG_SELL" ? "🔴 BÁN MẠNH (STRONG SELL)" :
                            unifiedSignal.type === "SELL" ? "🔴 BÁN RA (SELL)" :
                              "🟡 TRUNG LẬP (NEUTRAL)"}
                    </span>
                  </div>
                </div>

                <div className="sug-grid" style={{ gap: "8px" }}>
                  <div className="sug-item">
                    <span className="sug-label">ENTRY</span>
                    <span className="sug-val entry" style={{ fontSize: "11.5px", letterSpacing: "-0.2px" }}>{unifiedSignal.entryText}</span>
                  </div>
                  <div className="sug-item">
                    <span className="sug-label">Điểm Cắt lỗ (SL)</span>
                    <span className="sug-val sl" style={{ fontSize: "11.5px" }}>{unifiedSignal.sl > 0 ? `$${unifiedSignal.sl.toFixed(2)}` : "—"}</span>
                  </div>
                  <div className="sug-item">
                    <span className="sug-label">Chốt lời 1 (TP1)</span>
                    <span className="sug-val tp" style={{ fontSize: "11.5px" }}>{unifiedSignal.tp1 > 0 ? `$${unifiedSignal.tp1.toFixed(2)}` : "—"}</span>
                  </div>
                  <div className="sug-item">
                    <span className="sug-label">Chốt lời 2 (TP2)</span>
                    <span className="sug-val tp" style={{ fontSize: "11.5px" }}>{unifiedSignal.tp2 > 0 ? `$${unifiedSignal.tp2.toFixed(2)}` : "—"}</span>
                  </div>

                  <div className="sug-item" style={{ gridColumn: "span 2" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8px", marginTop: "4px" }}>
                      <div>
                        <span className="sug-label" style={{ fontSize: "9px" }}>Tỷ lệ rủi ro/lợi nhuận:</span>
                        <strong style={{ color: "#fff", display: "block", fontSize: "11px", marginTop: "2px", fontFamily: "monospace" }}>1:1.5 ➔ 1:3.0</strong>
                      </div>
                      <div>
                        <span className="sug-label" style={{ fontSize: "9px" }}>Hệ số biến động (ATR):</span>
                        <strong style={{ color: "var(--gold)", display: "block", fontSize: "11px", marginTop: "2px", fontFamily: "monospace" }}>${unifiedSignal.atr.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Timeframe Confluence Panel */}
                  <div className="sug-item" style={{
                    gridColumn: "span 2",
                    background: "rgba(255, 255, 255, 0.01)",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.03)",
                    marginTop: "4px"
                  }}>
                    <span className="sug-label" style={{ fontSize: "9.5px", marginBottom: "6px", display: "block" }}>
                      Hợp lưu đa khung thời gian:
                    </span>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px", textAlign: "center" }}>
                      {[
                        { id: "1", label: "M1" },
                        { id: "5", label: "M5" },
                        { id: "15", label: "M15" },
                        { id: "60", label: "H1" },
                        { id: "1D", label: "D1" }
                      ].map((tf) => {
                        const tfSignal = data?.multiTimeframeSignals?.[tf.id] || "NEUTRAL";
                        let badgeColor = "var(--text3)";
                        let bg = "rgba(255, 255, 255, 0.03)";
                        let label = "TRUNG LẬP";

                        if (tfSignal.includes("BUY")) {
                          badgeColor = "var(--green)";
                          bg = "rgba(0, 230, 118, 0.08)";
                          label = tfSignal === "STRONG_BUY" ? "MUA MẠNH" : "MUA";
                        } else if (tfSignal.includes("SELL")) {
                          badgeColor = "var(--red)";
                          bg = "rgba(255, 23, 68, 0.08)";
                          label = tfSignal === "STRONG_SELL" ? "BÁN MẠNH" : "BÁN";
                        } else {
                          badgeColor = "var(--yellow)";
                          bg = "rgba(255, 171, 0, 0.08)";
                          label = "TRUNG LẬP";
                        }

                        const isActive = timeframe === tf.id;

                        return (
                          <div
                            key={tf.id}
                            onClick={() => {
                              playSound();
                              setTimeframe(tf.id);
                            }}
                            style={{
                              background: bg,
                              border: isActive ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.04)",
                              borderRadius: "4px",
                              padding: "4px 1px",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                              boxShadow: isActive ? "0 0 6px rgba(255, 171, 0, 0.12)" : "none"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.03)";
                              e.currentTarget.style.borderColor = "var(--gold)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.borderColor = isActive ? "var(--gold)" : "rgba(255,255,255,0.04)";
                            }}
                          >
                            <span style={{ fontSize: "9px", fontWeight: "800", color: isActive ? "var(--gold)" : "#fff", display: "block" }}>{tf.label}</span>
                            <span style={{ fontSize: "6.5px", color: badgeColor, display: "block", marginTop: "2px", fontWeight: "bold", whiteSpace: "nowrap" }}>{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
        </aside>
        )}

        {/* MAIN TERMINAL PANEL */}
        <main className="main">
          {/* SYMBOL INFO HEADER */}
          <div className="sym-header">
            <div className="sym-info">
              <div className="sym-title-wrap">
                <span className="sym-title">GOLD (XAU/USD)</span>
                <span className="sym-subtitle">Vàng giao ngay / Đô la Mỹ</span>
              </div>
              <div className="price-info">
                <span className="price-current">${livePrice.toFixed(2)}</span>
                <span className={`price-change ${liveChange >= 0 ? "up" : "down"}`}>
                  {liveChange >= 0 ? "+" : ""}{liveChange.toFixed(3)}%
                </span>
              </div>
            </div>

            {/* Timeframe Selector Button Group */}
            <div className="hide-on-mobile" style={{ display: "flex", gap: "4px", background: "var(--bg3)", padding: "3px", borderRadius: "6px", border: "1px solid var(--border)", marginLeft: "auto", marginRight: "6px" }}>
              {[
                { id: "1", name: "M1" },
                { id: "5", name: "M5" },
                { id: "15", name: "M15" },
                { id: "60", name: "1H" },
                { id: "1D", name: "1D" }
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => {
                    playSound();
                    setTimeframe(tf.id);
                  }}
                  style={{
                    background: timeframe === tf.id ? "var(--yellow)" : "transparent",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: timeframe === tf.id ? "#000" : "var(--text2)",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  {tf.name}
                </button>
              ))}
            </div>

            {/* Chart Toggle Buttons with gold glassmorphism active styling */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center", marginLeft: "6px" }}>
              <button
                onClick={() => { playSound(); setChartType("tradingview"); }}
                className={`tf-btn ${chartType === "tradingview" ? "active" : ""}`}
                style={{
                  background: chartType === "tradingview" ? "var(--yellow)" : "var(--bg3)",
                  borderColor: chartType === "tradingview" ? "var(--yellow)" : "rgba(255,255,255,0.05)",
                  color: chartType === "tradingview" ? "#000" : "var(--text2)",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "11px",
                  padding: "5px 12px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease"
                }}
              >
                📊 BIỂU ĐỒ TRADINGVIEW
              </button>
            </div>
          </div>

          {/* LOADING & ERRORS BAR */}
          {loading && (
            <div className="load-bar">
              <div className="load-fill"></div>
            </div>
          )}
          {error && <div className="err-msg">⚠️ Lỗi: {error}</div>}

          {/* CHART & HIGH FREQUENCY WORKSPACE */}
          <div className="main-workspace">
            <div className={`chart-column ${fullChart ? "full-chart-active" : ""}`}>
              <div className="chart-wrap" style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", position: "relative" }}>

                {chartType === "tradingview" ? (
                  <>
                    <TradingViewWidget timeframe={timeframe} />

                    {showTvGuide && (
                      <div className="tv-guide-overlay">
                        <div className="tv-guide-header">
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span className="tv-guide-icon">💡</span>
                            <span className="tv-guide-title">Mẹo: Bật Đếm Ngược Đóng Nến Trên Chart</span>
                          </div>
                          <button className="tv-guide-close" onClick={() => setShowTvGuide(false)}>×</button>
                        </div>
                        <div className="tv-guide-body">
                          Để chạy đếm ngược nến thời gian thực ở dưới tỷ giá <strong style={{ color: "var(--green)" }}>${livePrice.toFixed(2)}</strong>:
                          <ol className="tv-guide-steps">
                            <li><strong>Click chuột phải</strong> vào vùng cột tỷ giá bên phải biểu đồ.</li>
                            <li>Chọn dòng <strong style={{ color: "var(--gold)" }}>"Đếm ngược tới khi đóng nến" (Countdown to bar close)</strong>.</li>
                          </ol>
                          <div className="tv-guide-footer">✓ Tự động lưu và hoạt động vĩnh viễn trên trình duyệt của bạn!</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ position: "relative", width: "100%", height: "100%", flex: 1, display: "flex", flexDirection: "column", background: "#131722", overflow: "hidden" }}>
                    {chartSpecs ? (
                      <svg
                        className="chart-svg"
                        ref={chartSvgRef}
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${chartSpecs.width} ${chartSpecs.height}`}
                        preserveAspectRatio="none"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onDoubleClick={handleDoubleClick}
                        style={{ cursor: isDragging.current ? "grabbing" : "crosshair", userSelect: "none" }}
                      >
                        {/* Filters and Gradients */}
                        <defs>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Horizontal Gridlines */}
                        {chartSpecs.priceLabels.map((p, idx) => (
                          <g key={`grid-y-${idx}`}>
                            <line
                              x1={chartSpecs.paddingLeft}
                              y1={p.y}
                              x2={chartSpecs.width - chartSpecs.paddingRight}
                              y2={p.y}
                              stroke="rgba(255, 255, 255, 0.03)"
                              strokeWidth="1"
                            />
                            <text
                              x={chartSpecs.width - chartSpecs.paddingRight + 8}
                              y={p.y + 4}
                              fill="var(--text3)"
                              fontSize="10px"
                              fontFamily="monospace"
                            >
                              ${p.price.toFixed(2)}
                            </text>
                          </g>
                        ))}

                        {/* Vertical Gridlines */}
                        {chartSpecs.timeLabels.map((t, idx) => (
                          <g key={`grid-x-${idx}`}>
                            <line
                              x1={t.x}
                              y1={0}
                              x2={t.x}
                              y2={chartSpecs.height - chartSpecs.paddingBottom}
                              stroke="rgba(255, 255, 255, 0.02)"
                              strokeWidth="1"
                            />
                            <text
                              x={t.x - 18}
                              y={chartSpecs.height - 12}
                              fill="var(--text3)"
                              fontSize="9.5px"
                              fontFamily="monospace"
                            >
                              {t.label}
                            </text>
                          </g>
                        ))}

                        {/* Shaded Risk/Reward Rectangles */}
                        {unifiedSignal && (() => {
                          const yEntry = chartSpecs.getY(unifiedSignal.entryMid);
                          const ySL = chartSpecs.getY(unifiedSignal.sl);
                          const yTP2 = chartSpecs.getY(unifiedSignal.tp2);
                          const xStart = chartSpecs.paddingLeft;
                          const xEnd = chartSpecs.width - chartSpecs.paddingRight;

                          return (
                            <>
                              {/* Risk (Red Box) */}
                              <rect
                                x={xStart}
                                y={Math.min(yEntry, ySL)}
                                width={xEnd - xStart}
                                height={Math.abs(yEntry - ySL)}
                                fill="rgba(255, 23, 68, 0.06)"
                                stroke="rgba(255, 23, 68, 0.15)"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                              />
                              {/* Reward (Green Box) */}
                              <rect
                                x={xStart}
                                y={Math.min(yEntry, yTP2)}
                                width={xEnd - xStart}
                                height={Math.abs(yEntry - yTP2)}
                                fill="rgba(0, 230, 118, 0.06)"
                                stroke="rgba(0, 230, 118, 0.15)"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                              />
                            </>
                          );
                        })()}

                        {/* Dynamic SMC Market Structures (Order Blocks, FVGs, BOS, CHoCH, Sweeps) */}
                        {data?.advancedAnalysis && (() => {
                          const adv = data.advancedAnalysis;
                          const chartLeft = chartSpecs.paddingLeft;
                          const chartRight = chartSpecs.width - chartSpecs.paddingRight;

                          return (
                            <g id="smc-dynamic-structures">
                              {/* 1. Order Blocks (OB) */}
                              {adv.orderBlocks?.map((ob, idx) => {
                                const startGlobalIdx = ob.index;
                                const endGlobalIdx = ob.mitigated
                                  ? Math.min(allCandles.length - 1, ob.index + 10)
                                  : allCandles.length - 1;

                                const rawXStart = chartSpecs.getX(startGlobalIdx - activeStartIdx);
                                const rawXEnd = chartSpecs.getX(endGlobalIdx - activeStartIdx);

                                const x1 = Math.max(chartLeft, rawXStart);
                                const x2 = Math.min(chartRight, rawXEnd);

                                if (x1 >= x2) return null;

                                const yHigh = chartSpecs.getY(ob.high);
                                const yLow = chartSpecs.getY(ob.low);
                                const y = Math.min(yHigh, yLow);
                                const h = Math.abs(yHigh - yLow);

                                const isBullish = ob.type === "BULLISH";
                                const fillColor = isBullish ? "rgba(0, 230, 118, 0.06)" : "rgba(255, 23, 68, 0.06)";
                                const strokeColor = isBullish ? "rgba(0, 230, 118, 0.22)" : "rgba(255, 23, 68, 0.22)";
                                const labelText = isBullish ? "+OB BULLISH" : "-OB BEARISH";
                                const labelColor = isBullish ? "rgba(0, 230, 118, 0.8)" : "rgba(255, 23, 68, 0.8)";

                                return (
                                  <g key={`ob-${idx}`}>
                                    <rect
                                      x={x1}
                                      y={y}
                                      width={x2 - x1}
                                      height={h}
                                      fill={fillColor}
                                      stroke={strokeColor}
                                      strokeWidth="1"
                                    />
                                    {x2 - x1 > 50 && (
                                      <text
                                        x={x1 + 6}
                                        y={y + 11}
                                        fill={labelColor}
                                        fontSize="8px"
                                        fontWeight="bold"
                                        fontFamily="monospace"
                                        pointerEvents="none"
                                      >
                                        {labelText}
                                      </text>
                                    )}
                                  </g>
                                );
                              })}

                              {/* 2. Fair Value Gaps (FVG) */}
                              {adv.fvgs?.map((fvg, idx) => {
                                const startGlobalIdx = Math.max(0, fvg.index - 2);
                                const endGlobalIdx = fvg.mitigated
                                  ? Math.min(allCandles.length - 1, fvg.index + 6)
                                  : allCandles.length - 1;

                                const rawXStart = chartSpecs.getX(startGlobalIdx - activeStartIdx);
                                const rawXEnd = chartSpecs.getX(endGlobalIdx - activeStartIdx);

                                const x1 = Math.max(chartLeft, rawXStart);
                                const x2 = Math.min(chartRight, rawXEnd);

                                if (x1 >= x2) return null;

                                const yTop = chartSpecs.getY(fvg.top);
                                const yBottom = chartSpecs.getY(fvg.bottom);
                                const y = Math.min(yTop, yBottom);
                                const h = Math.abs(yTop - yBottom);

                                const isBullish = fvg.type === "BULLISH";
                                const fillColor = isBullish ? "rgba(0, 188, 212, 0.04)" : "rgba(233, 30, 99, 0.04)";
                                const strokeColor = isBullish ? "rgba(0, 188, 212, 0.16)" : "rgba(233, 30, 99, 0.16)";
                                const labelText = isBullish ? "FVG BULLISH" : "FVG BEARISH";
                                const labelColor = isBullish ? "rgba(0, 188, 212, 0.65)" : "rgba(233, 30, 99, 0.65)";

                                return (
                                  <g key={`fvg-${idx}`}>
                                    <rect
                                      x={x1}
                                      y={y}
                                      width={x2 - x1}
                                      height={h}
                                      fill={fillColor}
                                      stroke={strokeColor}
                                      strokeWidth="0.8"
                                      strokeDasharray="2,2"
                                    />
                                    {x2 - x1 > 50 && h > 6 && (
                                      <text
                                        x={x1 + 6}
                                        y={y + 9}
                                        fill={labelColor}
                                        fontSize="7.5px"
                                        fontWeight="bold"
                                        fontFamily="monospace"
                                        pointerEvents="none"
                                      >
                                        {labelText}
                                      </text>
                                    )}
                                  </g>
                                );
                              })}

                              {/* 3. Break of Structure (BOS) / Change of Character (CHoCH) */}
                              {adv.structureShifts?.map((shift, idx) => {
                                const idxGlobal = allCandles.findIndex(c => c.time === shift.time);
                                if (idxGlobal === -1) return null;

                                const endGlobalIdx = Math.min(allCandles.length - 1, idxGlobal + 20);

                                const rawXStart = chartSpecs.getX(idxGlobal - activeStartIdx);
                                const rawXEnd = chartSpecs.getX(endGlobalIdx - activeStartIdx);

                                const x1 = Math.max(chartLeft, rawXStart);
                                const x2 = Math.min(chartRight, rawXEnd);

                                if (x1 >= x2) return null;

                                const y = chartSpecs.getY(shift.price);
                                const isBullish = shift.direction === "BULLISH";
                                const color = isBullish ? "var(--green)" : "var(--red)";

                                return (
                                  <g key={`shift-${idx}`}>
                                    <line
                                      x1={x1}
                                      y1={y}
                                      x2={x2}
                                      y2={y}
                                      stroke={color}
                                      strokeWidth="1.2"
                                      strokeDasharray="3,3"
                                      opacity="0.85"
                                    />
                                    <g transform={`translate(${x1 + 6}, ${y - 6})`}>
                                      <rect
                                        x="-3"
                                        y="-2"
                                        width="48"
                                        height="12"
                                        rx="3"
                                        fill="rgba(19, 23, 34, 0.95)"
                                        stroke={color}
                                        strokeWidth="0.8"
                                      />
                                      <text
                                        x="21"
                                        y="7"
                                        textAnchor="middle"
                                        fill={color}
                                        fontSize="7.5px"
                                        fontWeight="bold"
                                        fontFamily="monospace"
                                      >
                                        {shift.type} {isBullish ? "↗" : "↘"}
                                      </text>
                                    </g>
                                  </g>
                                );
                              })}

                              {/* 4. Liquidity Sweeps */}
                              {adv.sweeps?.map((sweep, idx) => {
                                const idxGlobal = allCandles.findIndex(c => c.time === sweep.time);
                                if (idxGlobal === -1) return null;

                                const x = chartSpecs.getX(idxGlobal - activeStartIdx);
                                if (x < chartLeft || x > chartRight) return null;

                                const y = chartSpecs.getY(sweep.price);
                                const isSsl = sweep.type === "SSL";

                                return (
                                  <g key={`sweep-${idx}`}>
                                    <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} stroke="var(--yellow)" strokeWidth="1.5" />
                                    <line x1={x + 4} y1={y - 4} x2={x - 4} y2={y + 4} stroke="var(--yellow)" strokeWidth="1.5" />
                                    <text
                                      x={x}
                                      y={isSsl ? y + 14 : y - 10}
                                      textAnchor="middle"
                                      fill="var(--yellow)"
                                      fontSize="7.5px"
                                      fontWeight="bold"
                                      fontFamily="monospace"
                                      pointerEvents="none"
                                    >
                                      {isSsl ? "SSL SWEEP" : "BSL SWEEP"}
                                    </text>
                                  </g>
                                );
                              })}
                            </g>
                          );
                        })()}

                        {/* Candlesticks */}
                        {activeCandles.map((c, idx) => {
                          const x = chartSpecs.getX(idx);
                          const yHigh = chartSpecs.getY(c.high);
                          const yLow = chartSpecs.getY(c.low);
                          const yOpen = chartSpecs.getY(c.open);
                          const yClose = chartSpecs.getY(c.close);
                          const isBullish = c.close >= c.open;
                          const color = isBullish ? "var(--green)" : "var(--red)";

                          return (
                            <g key={`candle-${idx}`}>
                              {/* Wick */}
                              <line
                                x1={x}
                                y1={yHigh}
                                x2={x}
                                y2={yLow}
                                stroke={color}
                                strokeWidth="1.5"
                              />
                              {/* Body */}
                              <rect
                                x={x - chartSpecs.bodyWidth / 2}
                                y={Math.min(yOpen, yClose)}
                                width={chartSpecs.bodyWidth}
                                height={Math.max(1.5, Math.abs(yOpen - yClose))}
                                fill={color}
                                stroke={color}
                                strokeWidth="0.5"
                              />
                            </g>
                          );
                        })}

                        {/* EMA 50 line */}
                        {showEma50 && (() => {
                          let path = "";
                          for (let i = 0; i < activeCandles.length; i++) {
                            const globalIdx = activeStartIdx + i;
                            const val = ema50Values[globalIdx];
                            if (val) {
                              const x = chartSpecs.getX(i);
                              const y = chartSpecs.getY(val);
                              if (path === "") path += `M ${x} ${y}`;
                              else path += ` L ${x} ${y}`;
                            }
                          }
                          return path ? (
                            <path
                              d={path}
                              fill="none"
                              stroke={ema50Color}
                              strokeWidth="2"
                              opacity="0.85"
                            />
                          ) : null;
                        })()}

                        {/* EMA 200 line */}
                        {showEma200 && (() => {
                          let path = "";
                          for (let i = 0; i < activeCandles.length; i++) {
                            const globalIdx = activeStartIdx + i;
                            const val = ema200Values[globalIdx];
                            if (val) {
                              const x = chartSpecs.getX(i);
                              const y = chartSpecs.getY(val);
                              if (path === "") path += `M ${x} ${y}`;
                              else path += ` L ${x} ${y}`;
                            }
                          }
                          return path ? (
                            <path
                              d={path}
                              fill="none"
                              stroke={ema200Color}
                              strokeWidth="2.2"
                              opacity="0.85"
                            />
                          ) : null;
                        })()}

                        {/* M15 Bearish Trendline */}
                        {trendlinePoints && (() => {
                          const { i1, price1, i2, price2 } = trendlinePoints;

                          // Calculate slope and project
                          const m = (price2 - price1) / (i2 - i1);

                          // Start point on screen
                          const x1 = chartSpecs.getX(i1 - activeStartIdx);
                          const y1 = chartSpecs.getY(price1);

                          // End point on screen (extend 10 slots to the right into the future margin)
                          const extendSlots = 10;
                          const endIdxGlobal = allCandles.length - 1 + extendSlots;
                          const x2 = chartSpecs.getX(endIdxGlobal - activeStartIdx);
                          const y2 = chartSpecs.getY(price1 + m * (endIdxGlobal - i1));

                          return (
                            <g>
                              {/* Trendline */}
                              <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="var(--gold)"
                                strokeWidth="2.5"
                                strokeDasharray="6,4"
                                filter="url(#glow)"
                              />

                              {/* Highlight dots at swing points */}
                              <circle cx={x1} cy={y1} r="4" fill="var(--gold)" stroke="#000" strokeWidth="1" />
                              <circle cx={chartSpecs.getX(i2 - activeStartIdx)} cy={chartSpecs.getY(price2)} r="4" fill="var(--gold)" stroke="#000" strokeWidth="1" />

                              {/* Label text */}
                              <text
                                x={Math.max(x1 + 10, chartSpecs.width - chartSpecs.paddingRight - 180)}
                                y={y2 - 10}
                                fill="var(--gold)"
                                fontSize="10px"
                                fontWeight="bold"
                                fontFamily="monospace"
                                opacity="0.9"
                              >
                                ↘ ĐƯỜNG XU HƯỚNG GIẢM {timeframe === "1D" ? "D1" : timeframe === "1W" ? "W1" : timeframe === "1M" ? "MN" : `M${timeframe}`} (SMC)
                              </text>
                            </g>
                          );
                        })()}

                        {/* SMC Horizontal Lines & Price Tags */}
                        {unifiedSignal && (() => {
                          const yEntry = chartSpecs.getY(unifiedSignal.entryMid);
                          const ySL = chartSpecs.getY(unifiedSignal.sl);
                          const yTP1 = chartSpecs.getY(unifiedSignal.tp1);
                          const yTP2 = chartSpecs.getY(unifiedSignal.tp2);
                          const xStart = chartSpecs.paddingLeft;
                          const xEnd = chartSpecs.width - chartSpecs.paddingRight;

                          return (
                            <g>
                              {/* SL Line */}
                              <line x1={xStart} y1={ySL} x2={xEnd} y2={ySL} stroke="var(--red)" strokeWidth="1.2" strokeDasharray="4,4" />
                              <rect x={xEnd + 4} y={ySL - 8} width="60" height="16" rx="3" fill="rgba(255, 23, 68, 0.2)" stroke="var(--red)" strokeWidth="1" />
                              <text x={xEnd + 8} y={ySL + 4} fill="var(--red)" fontSize="9px" fontWeight="bold" fontFamily="monospace">
                                SL:${unifiedSignal.sl.toFixed(1)}
                              </text>

                              {/* Entry Line */}
                              <line x1={xStart} y1={yEntry} x2={xEnd} y2={yEntry} stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4,4" />
                              <rect x={xEnd + 4} y={yEntry - 8} width="60" height="16" rx="3" fill="rgba(255, 171, 0, 0.2)" stroke="var(--gold)" strokeWidth="1" />
                              <text x={xEnd + 8} y={yEntry + 4} fill="var(--gold)" fontSize="9px" fontWeight="bold" fontFamily="monospace">
                                ENT:${unifiedSignal.entryMid.toFixed(1)}
                              </text>

                              {/* TP1 Line */}
                              <line x1={xStart} y1={yTP1} x2={xEnd} y2={yTP1} stroke="var(--green)" strokeWidth="1.2" strokeDasharray="4,4" />
                              <rect x={xEnd + 4} y={yTP1 - 8} width="60" height="16" rx="3" fill="rgba(0, 230, 118, 0.15)" stroke="var(--green)" strokeWidth="1" />
                              <text x={xEnd + 8} y={yTP1 + 4} fill="var(--green)" fontSize="9px" fontWeight="bold" fontFamily="monospace">
                                TP1:${unifiedSignal.tp1.toFixed(1)}
                              </text>

                              {/* TP2 Line */}
                              <line x1={xStart} y1={yTP2} x2={xEnd} y2={yTP2} stroke="var(--green)" strokeWidth="1.2" strokeDasharray="4,4" />
                              <rect x={xEnd + 4} y={yTP2 - 8} width="60" height="16" rx="3" fill="rgba(0, 230, 118, 0.15)" stroke="var(--green)" strokeWidth="1" />
                              <text x={xEnd + 8} y={yTP2 + 4} fill="var(--green)" fontSize="9px" fontWeight="bold" fontFamily="monospace">
                                TP2:${unifiedSignal.tp2.toFixed(1)}
                              </text>
                            </g>
                          );
                        })()}
                      </svg>) : (
                      <div className="chart-empty" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "var(--text3)" }}>
                        Đang dựng biểu đồ kỹ thuật...
                      </div>
                    )}

                    {/* Floating EMA Legend Panel (TradingView style) */}
                    <div
                      className="chart-ema-legend"
                      onMouseDown={(e) => e.stopPropagation()}
                      onMouseMove={(e) => e.stopPropagation()}
                    >
                      <div className="ema-legend-row">
                        <span className="ema-legend-dot" style={{ backgroundColor: ema50Color, color: ema50Color }}></span>
                        <span className="ema-legend-name" style={{ color: showEma50 ? "#fff" : "var(--text3)" }}>
                          EMA {ema50Length} <span style={{ opacity: 0.6, fontSize: "9.5px" }}>{ema50Source}</span>
                        </span>
                        <div className="ema-legend-actions">
                          <button
                            className={`ema-action-btn ${showEma50 ? "active" : ""}`}
                            onClick={() => setShowEma50(!showEma50)}
                            title={showEma50 ? "Ẩn đường EMA" : "Hiện đường EMA"}
                          >
                            {showEma50 ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                            )}
                          </button>
                          <button
                            className="ema-action-btn"
                            onClick={() => setEmaSettingsModal("ema50")}
                            title="Cài đặt thông số (Length, Source, Color)"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                          </button>
                          <button
                            className="ema-action-btn open-source-btn"
                            onClick={() => { setEmaSourceModal("ema50"); setCodeTab("pine"); }}
                            title="Xem mã nguồn mở chỉ báo"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                          </button>
                        </div>
                      </div>

                      <div className="ema-legend-row">
                        <span className="ema-legend-dot" style={{ backgroundColor: ema200Color, color: ema200Color }}></span>
                        <span className="ema-legend-name" style={{ color: showEma200 ? "#fff" : "var(--text3)" }}>
                          EMA {ema200Length} <span style={{ opacity: 0.6, fontSize: "9.5px" }}>{ema200Source}</span>
                        </span>
                        <div className="ema-legend-actions">
                          <button
                            className={`ema-action-btn ${showEma200 ? "active" : ""}`}
                            onClick={() => setShowEma200(!showEma200)}
                            title={showEma200 ? "Ẩn đường EMA" : "Hiện đường EMA"}
                          >
                            {showEma200 ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                            )}
                          </button>
                          <button
                            className="ema-action-btn"
                            onClick={() => setEmaSettingsModal("ema200")}
                            title="Cài đặt thông số (Length, Source, Color)"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                          </button>
                          <button
                            className="ema-action-btn open-source-btn"
                            onClick={() => { setEmaSourceModal("ema200"); setCodeTab("pine"); }}
                            title="Xem mã nguồn mở chỉ báo"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* EMA Dynamic Settings Glassmorphic Modal */}
                    {emaSettingsModal && (
                      <div
                        className="chart-overlay-modal"
                        style={{ pointerEvents: "auto" }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseMove={(e) => e.stopPropagation()}
                      >
                        <div className="chart-modal-card">
                          <div className="chart-modal-header">
                            <span className="chart-modal-title">⚙️ Cài Đặt Chỉ Báo: EMA {emaSettingsModal === "ema50" ? "50" : "200"}</span>
                            <button className="chart-modal-close" onClick={() => setEmaSettingsModal(null)}>×</button>
                          </div>
                          <div className="chart-modal-body">
                            <div className="settings-group">
                              <label className="settings-label">Chu kỳ (Length)</label>
                              <div className="settings-input-row">
                                <input
                                  type="number"
                                  min="2"
                                  max="500"
                                  className="settings-number-input"
                                  value={tempLength}
                                  onChange={(e) => setTempLength(Math.max(2, parseInt(e.target.value) || 2))}
                                />
                                <span style={{ fontSize: "11px", color: "var(--text3)" }}>(2 - 500 nến)</span>
                              </div>
                            </div>

                            <div className="settings-group" style={{ marginTop: "12px" }}>
                              <label className="settings-label">Nguồn giá trị (Source)</label>
                              <div className="settings-input-row">
                                <select
                                  className="settings-select"
                                  value={tempSource}
                                  onChange={(e) => setTempSource(e.target.value as any)}
                                >
                                  <option value="close">Đóng cửa (Close)</option>
                                  <option value="open">Mở cửa (Open)</option>
                                  <option value="high">Cao nhất (High)</option>
                                  <option value="low">Thấp nhất (Low)</option>
                                </select>
                              </div>
                            </div>

                            <div className="settings-group" style={{ marginTop: "12px" }}>
                              <label className="settings-label">Màu đường chỉ báo (Color)</label>
                              <div className="settings-colors-grid">
                                {[
                                  "#FFD700", // Vàng (Gold)
                                  "#00e5ff", // Xanh dương sáng (Cyan)
                                  "#FF1744", // Đỏ (Red)
                                  "#d500f9", // Tím (Purple)
                                  "#00e676", // Xanh lá (Green)
                                  "#ff9100", // Cam (Orange)
                                  "#ffffff", // Trắng (White)
                                  "#787b86"  // Xám (Gray)
                                ].map((color) => (
                                  <div
                                    key={color}
                                    className={`settings-color-dot ${tempColor === color ? "active" : ""}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setTempColor(color)}
                                  />
                                ))}
                              </div>
                              <div style={{ marginTop: "10px", width: "100%" }}>
                                <span style={{ fontSize: "11px", color: "var(--text3)", display: "block", marginBottom: "4px" }}>Mã màu HEX tùy chỉnh:</span>
                                <input
                                  type="text"
                                  className="settings-number-input"
                                  style={{ width: "120px" }}
                                  value={tempColor}
                                  onChange={(e) => setTempColor(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="chart-modal-footer">
                            <button className="modal-btn cancel" onClick={() => setEmaSettingsModal(null)}>Hủy bỏ</button>
                            <button className="modal-btn apply" onClick={handleApplySettings}>Áp dụng</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* EMA Open Source Code Premium Glassmorphic Modal */}
                    {emaSourceModal && (() => {
                      const len = emaSourceModal === "ema50" ? ema50Length : ema200Length;
                      const src = emaSourceModal === "ema50" ? ema50Source : ema200Source;
                      const col = emaSourceModal === "ema50" ? ema50Color : ema200Color;

                      const pineCode = `//@version=5
// © TradingView Pine Script v5
// Chỉ báo Exponential Moving Average (EMA) - Bản Mã Nguồn Mở
indicator("Exponential Moving Average", shorttitle="EMA ${len}", overlay=true)

// Cấu hình các tham số đầu vào của chỉ báo
lengthInput = input.int(${len}, minval=1, title="Length")
sourceInput = input.source(${src}, title="Source")

// Hàm tính toán EMA tích lũy động
emaValue = ta.ema(sourceInput, lengthInput)

// Vẽ đường EMA lên biểu đồ kỹ thuật với màu sắc lựa chọn
plot(emaValue, title="EMA Line", color=color.from_hex("${col}"), linewidth=2)`;

                      const jsCode = `/**
 * CÔNG THỨC TOÁN HỌC & LẬP TRÌNH TÍNH EMA (EXPONENTIAL MOVING AVERAGE)
 * Phiên bản mã nguồn mở viết bằng JavaScript/TypeScript cho XAU/USD Gold Terminal.
 * 
 * Hệ số mượt (Smoothing Multiplier) k = 2 / (Length + 1)
 * Công thức tính nến thứ i: 
 *   EMA(i) = Giá(i) * k + EMA(i-1) * (1 - k)
 */
function calculateEMA(candles, length = ${len}, source = "${src}") {
  if (!candles || candles.length === 0) return [];
  
  const values = [];
  const k = 2 / (length + 1);
  
  // Khởi tạo giá trị EMA đầu tiên bằng giá trị nến đầu tiên
  let ema = candles[0][source] || candles[0].close;
  values.push(ema);
  
  // Áp dụng công thức tích lũy nhân tố cho toàn bộ các nến tiếp theo
  for (let i = 1; i < candles.length; i++) {
    const currentPrice = candles[i][source] || candles[i].close;
    ema = currentPrice * k + ema * (1 - k);
    values.push(ema);
  }
  
  return values;
}`;

                      return (
                        <div
                          className="chart-overlay-modal"
                          style={{ pointerEvents: "auto" }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onMouseMove={(e) => e.stopPropagation()}
                        >
                          <div className="chart-modal-card wide">
                            <div className="chart-modal-header">
                              <span className="chart-modal-title">📖 Mã Nguồn Mở Chỉ Báo: EMA {len} ({src})</span>
                              <button className="chart-modal-close" onClick={() => setEmaSourceModal(null)}>×</button>
                            </div>
                            <div className="chart-modal-body">
                              <div className="chart-modal-tabs">
                                <button
                                  className={`chart-modal-tab-btn ${codeTab === "pine" ? "active" : ""}`}
                                  onClick={() => setCodeTab("pine")}
                                >
                                  Pine Script v5 (TradingView)
                                </button>
                                <button
                                  className={`chart-modal-tab-btn ${codeTab === "js" ? "active" : ""}`}
                                  onClick={() => setCodeTab("js")}
                                >
                                  JavaScript / TypeScript
                                </button>
                              </div>

                              <div className="code-container">
                                <pre style={{ margin: 0 }}>
                                  <code>{codeTab === "pine" ? pineCode : jsCode}</code>
                                </pre>
                              </div>

                              <div style={{ marginTop: "12px", fontSize: "11.5px", color: "var(--text3)", display: "flex", gap: "6px", alignItems: "flex-start", lineHeight: "1.4" }}>
                                <span>💡</span>
                                <span>
                                  {codeTab === "pine" ?
                                    "Mã nguồn Pine Script có thể copy và dán trực tiếp vào mục Pine Editor trên trang TradingView của bạn để vẽ đường EMA đồng bộ 100%." :
                                    "Hệ số mượt (smoothing multiplier) của chu kỳ " + len + " là k = 2 / (" + len + " + 1) ≈ " + (2 / (len + 1)).toFixed(4) + ". Đây là thuật toán tiêu chuẩn ngành được tối ưu hóa chạy trực tiếp trên Deno Sandbox."
                                  }
                                </span>
                              </div>
                            </div>
                            <div className="chart-modal-footer">
                              <button
                                className="modal-btn apply"
                                onClick={() => {
                                  navigator.clipboard.writeText(codeTab === "pine" ? pineCode : jsCode);
                                  alert("Đã sao chép mã nguồn chỉ báo vào Clipboard!");
                                }}
                              >
                                📋 Sao chép mã nguồn
                              </button>
                              <button className="modal-btn cancel" onClick={() => setEmaSourceModal(null)}>Đóng</button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="chart-badge" style={{ display: "flex", alignItems: "center", gap: "10px", pointerEvents: "auto" }}>
                      <span>📈 CẤU TRÚC VÀNG {timeframe === "1D" ? "D1" : timeframe === "1W" ? "W1" : timeframe === "1M" ? "MN" : `M${timeframe}`} (SMC)</span>
                      <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
                      <button onClick={zoomIn} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>➕ Phóng to</button>
                      <button onClick={zoomOut} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>➖ Thu nhỏ</button>
                      <button onClick={snapToLive} style={{ background: "none", border: "none", color: isLive ? "var(--green)" : "var(--yellow)", cursor: "pointer", fontWeight: "bold" }}>
                        {isLive ? "● TRỰC TIẾP" : "⏮ XEM GIÁ TRỰC TIẾP"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* REAL-TIME ECONOMIC CALENDAR WIDGET */}
            {!fullChart && (
            <div className="realtime-panel" style={{ height: "100%" }}>
              <div className="panel-tab" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", background: "var(--bg3)", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: "11.5px", fontWeight: "700", color: "var(--gold)", letterSpacing: "0.5px" }}>
                  📅 LỊCH KINH TẾ (INVESTING)
                </span>
              </div>
              <div style={{ flex: 1, width: "100%", height: "calc(100% - 37px)", overflow: "hidden" }}>
                <iframe
                  src="https://sslecal2.investing.com/?ecoTimezone=28&ecoLanguage=52&lang=52&columns=time,currency,importance,event,actual,forecast,previous&features=datepicker,timezone&countryIds=5,72,17,25,32,6,37,43,22,39,35,42,4,36,110,26,12,11,10,38,14&calType=week&timeFrame=today"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowTransparency="true"
                  marginWidth={0}
                  marginHeight={0}
                  style={{
                    border: "none",
                    filter: "invert(0.92) hue-rotate(180deg) contrast(1.1) brightness(0.95)",
                    background: "transparent"
                  }}
                ></iframe>
              </div>
            </div>
            )}

          </div>

          {/* TECHNICAL DOCK & DETAILED PROBABILITY */}
          {data && !fullChart && (
            <div className="signal-dash">
              {/* Premium Workspace Tab Menu */}
              <div className="dash-tabs">

                <button
                  className={`dash-tab-btn ${dashTab === "ai" ? "active" : ""}`}
                  onClick={() => setDashTab("ai")}
                >
                  🤖 PHÂN TÍCH A.I
                </button>
                <button
                  className={`dash-tab-btn ${dashTab === "backtest" ? "active" : ""}`}
                  onClick={() => setDashTab("backtest")}
                >
                  📊 LỊCH SỬ CHỐT LỜI / CẮT LỖ
                </button>
                <button
                  className={`dash-tab-btn ${dashTab === "outlook" ? "active" : ""}`}
                  onClick={() => setDashTab("outlook")}
                >
                  📋 NHẬN ĐỊNH THỊ TRƯỜNG
                </button>
              </div>



              {/* Tab 2: 🤖 PHÂN TÍCH A.I */}
              {dashTab === "ai" && data && data.advancedAnalysis && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Premium Trading Plan & Rationale Card */}
                  {data?.signals?.suggestion && (
                    <div className="sug-card" style={{
                      margin: 0,
                      padding: "24px",
                      background: "linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderTop: `4px solid ${
                        data.signals.suggestion.position === "BUY"
                          ? "var(--green)"
                          : data.signals.suggestion.position === "SELL"
                          ? "var(--red)"
                          : "var(--yellow)"
                      }`,
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "20px" }}>🎯</span>
                          <div>
                            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#fff", margin: 0, letterSpacing: "0.5px" }}>
                              KẾ HOẠCH GIAO DỊCH & BIỆN GIẢI CHUYÊN SÂU A.I
                            </h2>
                            <p style={{ fontSize: "11px", color: "var(--text3)", margin: "2px 0 0 0" }}>
                              Hợp lưu 3 phương pháp tiêu chuẩn: SMC + Price Action + Mô hình nến đảo chiều
                            </p>
                          </div>
                        </div>
                        <span style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          background:
                            data.signals.suggestion.position === "BUY"
                              ? "rgba(0, 230, 118, 0.12)"
                              : data.signals.suggestion.position === "SELL"
                              ? "rgba(255, 23, 68, 0.12)"
                              : "rgba(255, 171, 0, 0.12)",
                          color:
                            data.signals.suggestion.position === "BUY"
                              ? "var(--green)"
                              : data.signals.suggestion.position === "SELL"
                              ? "var(--red)"
                              : "var(--yellow)",
                          border: `1px solid ${
                            data.signals.suggestion.position === "BUY"
                              ? "rgba(0, 230, 118, 0.25)"
                              : data.signals.suggestion.position === "SELL"
                              ? "rgba(255, 23, 68, 0.25)"
                              : "rgba(255, 171, 0, 0.25)"
                          }`
                        }}>
                          {data.signals.suggestion.position === "BUY" ? "🐂 KHUYẾN NGHỊ MUA (BUY)" :
                           data.signals.suggestion.position === "SELL" ? "🐻 KHUYẾN NGHỊ BÁN (SELL)" :
                           "🟡 CHỜ ĐỢI (NEUTRAL)"}
                        </span>
                      </div>

                      {/* Signal values quick grid */}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "12px",
                        background: "rgba(255, 255, 255, 0.02)",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.04)"
                      }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "9.5px", color: "var(--text3)" }}>ĐIỂM VÀO (ENTRY)</span>
                          <strong style={{ fontSize: "14px", color: "var(--gold)", fontFamily: "monospace" }}>
                            ${data.signals.suggestion.entry.toFixed(2)}
                          </strong>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "9.5px", color: "var(--text3)" }}>CẮT LỖ (SL)</span>
                          <strong style={{ fontSize: "14px", color: "var(--red)", fontFamily: "monospace" }}>
                            {data.signals.suggestion.stopLoss > 0 ? `$${data.signals.suggestion.stopLoss.toFixed(2)}` : "VÔ HIỆU HÓA"}
                          </strong>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "9.5px", color: "var(--text3)" }}>CHỐT LỜI 1 (TP1)</span>
                          <strong style={{ fontSize: "14px", color: "var(--green)", fontFamily: "monospace" }}>
                            {data.signals.suggestion.takeProfit1 > 0 ? `$${data.signals.suggestion.takeProfit1.toFixed(2)}` : "VÔ HIỆU HÓA"}
                          </strong>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "9.5px", color: "var(--text3)" }}>CHỐT LỜI 2 (TP2)</span>
                          <strong style={{ fontSize: "14px", color: "var(--green)", fontFamily: "monospace" }}>
                            {data.signals.suggestion.takeProfit2 > 0 ? `$${data.signals.suggestion.takeProfit2.toFixed(2)}` : "VÔ HIỆU HÓA"}
                          </strong>
                        </div>
                      </div>

                      {/* Rationale sections */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        {/* Entry Rationale */}
                        <div style={{
                          padding: "14px",
                          borderRadius: "8px",
                          background: "rgba(255, 171, 0, 0.02)",
                          borderLeft: "4px solid var(--gold)",
                          border: "1px solid rgba(255, 171, 0, 0.05)",
                          borderLeftWidth: "4px"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                            <span style={{ color: "var(--gold)", fontWeight: "bold", fontSize: "12.5px" }}>📥 BIỆN GIẢI ĐIỂM VÀO LỆNH (ENTRY RATIONALE)</span>
                          </div>
                          <p style={{ fontSize: "12px", color: "var(--text)", lineHeight: "1.6", margin: 0 }}>
                            {data.signals.suggestion.entryReason || "Đang phân tích dữ liệu thị trường..."}
                          </p>
                        </div>

                        {/* SL Rationale */}
                        <div style={{
                          padding: "14px",
                          borderRadius: "8px",
                          background: "rgba(255, 23, 68, 0.02)",
                          borderLeft: "4px solid var(--red)",
                          border: "1px solid rgba(255, 23, 68, 0.05)",
                          borderLeftWidth: "4px"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                            <span style={{ color: "var(--red)", fontWeight: "bold", fontSize: "12.5px" }}>🛡️ BIỆN GIẢI PHÒNG VỆ CẮT LỖ (SL RATIONALE)</span>
                          </div>
                          <p style={{ fontSize: "12px", color: "var(--text)", lineHeight: "1.6", margin: 0 }}>
                            {data.signals.suggestion.slReason || "Đang phân tích dữ liệu bảo vệ vị thế..."}
                          </p>
                        </div>

                        {/* TP Rationale */}
                        <div style={{
                          padding: "14px",
                          borderRadius: "8px",
                          background: "rgba(0, 230, 118, 0.02)",
                          borderLeft: "4px solid var(--green)",
                          border: "1px solid rgba(0, 230, 118, 0.05)",
                          borderLeftWidth: "4px"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                            <span style={{ color: "var(--green)", fontWeight: "bold", fontSize: "12.5px" }}>🎯 BIỆN GIẢI CHỐT LỜI MỤC TIÊU (TP RATIONALE)</span>
                          </div>
                          <p style={{ fontSize: "12px", color: "var(--text)", lineHeight: "1.6", margin: 0 }}>
                            {data.signals.suggestion.tpReason || "Đang phân tích mục tiêu thanh khoản..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Disclaimer Box */}
                  <div className="reasons" style={{ background: "rgba(255, 171, 0, 0.02)", borderColor: "rgba(255, 171, 0, 0.1)", margin: 0 }}>
                    <h3>⚠️ Tuyên bố miễn trừ trách nhiệm</h3>
                    <div style={{ fontSize: "12px", color: "var(--text2)", lineHeight: "1.6" }}>
                      Vàng (Gold spot) là một trong những tài sản tài chính có độ biến động và đòn bẩy lớn nhất thế giới. Các phân tích kỹ thuật, xác xuất và gợi ý vào lệnh hiển thị trên hệ thống chỉ mang tính chất tham khảo dựa trên thuật toán tích lũy. Không cấu thành lời khuyên đầu tư tài chính chính thức. Vui lòng tự quản trị vốn nghiêm ngặt!
                    </div>
                  </div>



                </div>
              )}

              {/* Tab 3: 📊 LỊCH SỬ BACKTEST */}
              {dashTab === "backtest" && data && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Financial Metrics Cards & Controls */}
                  <div className="sug-card" style={{
                    margin: 0,
                    padding: "24px",
                    background: "linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                  }}>
                    {/* Header with Title and Reset Action Button */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "12px", flexWrap: "wrap", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "20px" }}>📊</span>
                        <div>
                          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--gold)", margin: 0, letterSpacing: "0.5px" }}>
                            NHẬT KÝ & LỊCH SỬ GIAO DỊCH A.I BACKTEST
                          </h2>
                          <p style={{ fontSize: "11px", color: "var(--text3)", margin: "2px 0 0 0" }}>
                            Hiệu suất kiểm thử chiến lược trên dữ liệu nến biểu đồ thời gian thực
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Filter Panel (Timeframe & Day Filter Sub-tabs) */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Timeframe Selector */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text2)", minWidth: "120px" }}>Khung thời gian:</span>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {["ALL", "M1", "M5", "M15", "H1", "D1"].map(tf => (
                            <button
                              key={tf}
                              onClick={() => setBacktestFilter(tf)}
                              style={{
                                background: backtestFilter === tf ? "rgba(255, 215, 0, 0.12)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${backtestFilter === tf ? "var(--gold)" : "var(--border)"}`,
                                color: backtestFilter === tf ? "var(--gold)" : "var(--text2)",
                                padding: "4px 10px",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.2s"
                              }}
                            >
                              {tf === "ALL" ? "🌍 TẤT CẢ" : `⚡ ${tf}`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Day Selector */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text2)", minWidth: "120px" }}>Lọc ngày giao dịch:</span>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {[
                            { value: "TODAY", label: "📅 Hôm nay" },
                            { value: "YESTERDAY", label: "📅 Hôm qua" },
                            { value: "ALL", label: "🌐 Tất cả các ngày" }
                          ].map(dOpt => (
                            <button
                              key={dOpt.value}
                              onClick={() => setSelectedDay(dOpt.value)}
                              style={{
                                background: selectedDay === dOpt.value ? "rgba(255, 215, 0, 0.12)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${selectedDay === dOpt.value ? "var(--gold)" : "var(--border)"}`,
                                color: selectedDay === dOpt.value ? "var(--gold)" : "var(--text2)",
                                padding: "4px 12px",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.2s"
                              }}
                            >
                              {dOpt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Financial Stats Grid (4 Cards) */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                      marginTop: "4px"
                    }}>
                       <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "10px", color: "var(--text3)", fontWeight: "bold", textTransform: "uppercase" }}>Tổng lệnh chốt</span>
                        <strong style={{ fontSize: "20px", color: "#fff", fontFamily: "monospace" }}>
                          {backtestStats.total}
                        </strong>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "10px", color: "var(--text3)", fontWeight: "bold", textTransform: "uppercase" }}>Tỷ Lệ Thắng (Win Rate)</span>
                        <strong style={{ fontSize: "20px", color: backtestStats.winRate >= 50 ? "var(--green)" : "var(--yellow)", fontFamily: "monospace" }}>
                          {`${backtestStats.winRate}%`}
                        </strong>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "10px", color: "var(--text3)", fontWeight: "bold", textTransform: "uppercase" }}>Pips Ròng tích lũy</span>
                        <strong style={{ fontSize: "20px", color: backtestStats.netPips >= 0 ? "var(--green)" : "var(--red)", fontFamily: "monospace" }}>
                          {`${backtestStats.netPips >= 0 ? "+" : ""}${backtestStats.netPips} pips`}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Backtest Table Card */}
                  <div className="smc-card" style={{ margin: 0 }}>
                    <h3 className="smc-card-title">📋 Nhật Ký Giao Dịch Chốt Lời / Cắt Lỗ Chi Tiết</h3>
                    <div className="smc-table-wrap">
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "12px" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text2)", background: "rgba(255,255,255,0.01)" }}>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Mã lệnh (ID)</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Khung giờ</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Loại lệnh</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Giá khớp (Entry)</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Cắt Lỗ (SL)</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Chốt Lời 1 (TP1)</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Chốt Lời 2 (TP2)</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Giá đóng</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Kết quả</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Pips ròng</th>
                            <th style={{ padding: "12px", fontWeight: "bold" }}>Giờ đóng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredClosedTrades.length > 0 ? (
                            (() => {
                              let currentDayStr = "";
                              return filteredClosedTrades.map((t, idx) => {
                                const tradeDayStr = getLocalDateString(t.closeTime);
                                const showDayHeader = currentDayStr !== tradeDayStr;
                                if (showDayHeader) {
                                  currentDayStr = tradeDayStr;
                                }
                                return (
                                  <React.Fragment key={`trade-row-${t.id}-${idx}`}>
                                    {showDayHeader && (
                                      <tr style={{ background: "rgba(255, 215, 0, 0.04)" }}>
                                        <td colSpan={11} style={{ padding: "8px 12px", color: "var(--gold)", fontWeight: "bold", letterSpacing: "0.5px" }}>
                                          📅 LỆNH ĐÃ ĐÓNG NGÀY: {tradeDayStr}
                                        </td>
                                      </tr>
                                    )}
                                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", background: idx % 2 === 0 ? "rgba(255,255,255,0.005)" : "transparent" }}>
                                      <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "var(--text2)" }}>{t.id}</td>
                                      <td style={{ padding: "10px 12px" }}>
                                        <span className="smc-badge active" style={{ fontSize: "10.5px" }}>{t.timeframe}</span>
                                      </td>
                                      <td style={{ padding: "10px 12px" }}>
                                        <span className={`smc-badge ${t.position === "BUY" ? "bullish" : "bearish"}`} style={{ fontSize: "10.5px" }}>{t.position}</span>
                                      </td>
                                      <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>${t.entry.toFixed(2)}</td>
                                      <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "var(--red)" }}>${t.stopLoss.toFixed(2)}</td>
                                      <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "var(--green)" }}>${t.takeProfit1.toFixed(2)}</td>
                                      <td style={{ padding: "10px 12px", fontFamily: "monospace", color: "var(--green)", opacity: 0.9 }}>${t.takeProfit2.toFixed(2)}</td>
                                      <td style={{ padding: "10px 12px", fontFamily: "monospace", fontWeight: "bold", color: t.status === "SL" ? "var(--red)" : "var(--green)" }}>
                                        ${(t.status === "SL" ? t.stopLoss : t.status === "TP1" ? t.takeProfit1 : t.takeProfit2).toFixed(2)}
                                      </td>
                                      <td style={{ padding: "10px 12px" }}>
                                        <span className={`smc-badge ${t.status === "SL" ? "bearish" : "bullish"}`} style={{
                                          fontSize: "10.5px",
                                          background: t.status === "SL" ? "rgba(255, 23, 68, 0.15)" : "rgba(0, 230, 118, 0.15)",
                                          color: t.status === "SL" ? "var(--red)" : "var(--green)",
                                          border: `1.5px solid ${t.status === "SL" ? "var(--red)" : "var(--green)"}`
                                        }}>
                                          {t.status === "SL" ? "STOP LOSS" : t.status === "TP1" ? "TAKE PROFIT 1" : "TAKE PROFIT 2"}
                                        </span>
                                      </td>
                                      <td style={{ padding: "10px 12px", fontFamily: "monospace", fontWeight: "bold", color: t.pips >= 0 ? "var(--green)" : "var(--red)" }}>
                                        {t.pips >= 0 ? "+" : ""}{t.pips} pips
                                      </td>
                                      <td style={{ padding: "10px 12px", color: "var(--text3)" }}>
                                        {new Date(t.closeTime).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit" })}
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                );
                              });
                            })()
                          ) : (
                            <tr>
                              <td colSpan={11} style={{ padding: "20px", textAlign: "center", color: "var(--text3)" }}>
                                Không có lịch sử giao dịch nào được ghi nhận cho khung thời gian {backtestFilter}!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            )}

              {/* Tab 4: 📋 NHẬN ĐỊNH H1 */}
              {dashTab === "outlook" && data?.marketOutlook && (() => {
                const outlook = data.marketOutlook;
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {/* Unified Premium Outlook Banner */}
                    <div className="outlook-banner" style={{ borderTop: "4px solid var(--gold)" }}>
                      <div>
                        <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text3)", letterSpacing: "1.5px", fontWeight: "bold" }}>
                          HỆ THỐNG PHÂN TÍCH HỢP LƯU KỸ THUẬT HÀNG NGÀY
                        </span>
                        <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#fff", margin: "6px 0", letterSpacing: "0.5px" }}>
                          XAU/USD GOLD SPOT
                        </h2>
                        <span style={{ fontSize: "12px", color: "var(--text2)" }}>
                          Thời gian cập nhật: <strong style={{ color: "var(--gold)" }}>{outlook.date}</strong> | Khung đồ thị: <strong>{outlook.timeframe}</strong>
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "10px", color: "var(--text3)", display: "block", textTransform: "uppercase", fontWeight: "bold", marginBottom: "2px" }}>Xu hướng chủ đạo</span>
                          <span className={outlook.synthesizedOutlook.bias === "BUY" ? "outlook-badge-buy" : outlook.synthesizedOutlook.bias === "SELL" ? "outlook-badge-sell" : "outlook-badge-hold"} style={{ display: "inline-block" }}>
                            {outlook.synthesizedOutlook.bias === "BUY" ? "🟢 MUA CHỦ ĐẠO (BUY)" : outlook.synthesizedOutlook.bias === "SELL" ? "🔴 BÁN CHỦ ĐẠO (SELL)" : "🟡 ĐỨNG NGOÀI (HOLD)"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Master Unified Outlook Bulletin Card */}
                    <div className="outlook-summary-box" style={{ margin: 0, padding: "30px", borderLeft: "5px solid var(--gold)" }}>
                      <h3 style={{ fontSize: "16px", color: "var(--gold)", margin: "0 0 16px 0", borderBottom: "1.5px solid var(--border)", paddingBottom: "12px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "800", letterSpacing: "0.5px" }}>
                        📝 NHẬN ĐỊNH TỔNG QUAN TRONG NGÀY (DOW + SMC + PRICE ACTION)
                      </h3>
                      
                      {/* Synthesized Master Paragraph */}
                      <p style={{ fontSize: "14.5px", color: "#fff", lineHeight: "1.85", margin: "0 0 26px 0", textAlign: "justify", fontWeight: "400", opacity: "0.95" }}>
                        {outlook.synthesizedOutlook.summary}
                      </p>

                      {/* Sleek Confluence Parameter Summary Matrix */}
                      <h4 style={{ fontSize: "11px", color: "var(--text3)", margin: "0 0 12px 0", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>
                        📊 HỆ THỐNG CHỈ BÁO HỢP LƯU KỸ THUẬT:
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "26px" }} className="outlook-grid">
                        
                        {/* Dow Theory parameters highlights */}
                        <div style={{ background: "rgba(20, 24, 33, 0.4)", border: "1px solid rgba(255, 215, 0, 0.1)", borderRadius: "10px", padding: "14px", backdropFilter: "blur(6px)" }}>
                          <span style={{ fontSize: "9px", color: "var(--gold)", fontWeight: "bold", textTransform: "uppercase", display: "block", letterSpacing: "0.5px" }}>📈 LÝ THUYẾT DOW (H1)</span>
                          <strong style={{ display: "block", fontSize: "14px", color: outlook.trendDow.primary === "TĂNG" ? "var(--green)" : outlook.trendDow.primary === "GIẢM" ? "var(--red)" : "var(--yellow)", marginTop: "6px" }}>
                            Xu hướng: {outlook.trendDow.primary}
                          </strong>
                          <span style={{ display: "block", fontSize: "11.5px", color: "var(--text2)", marginTop: "4px" }}>
                            Sóng cấp 2: {outlook.trendDow.secondary}
                          </span>
                          <div style={{ display: "flex", flexDirection: "column", gap: "3px", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "10px", paddingTop: "8px", fontSize: "11px", color: "var(--text2)" }}>
                            <div>Kháng cự chính: <strong style={{ color: "#fff", fontFamily: "monospace" }}>${outlook.trendDow.keyLevels[0]?.price ? outlook.trendDow.keyLevels[0].price.toFixed(1) : "—"}</strong></div>
                            <div>Hỗ trợ chính: <strong style={{ color: "#fff", fontFamily: "monospace" }}>${outlook.trendDow.keyLevels[1]?.price ? outlook.trendDow.keyLevels[1].price.toFixed(1) : "—"}</strong></div>
                          </div>
                        </div>

                        {/* SMC parameters highlights */}
                        <div style={{ background: "rgba(20, 24, 33, 0.4)", border: "1px solid rgba(255, 215, 0, 0.1)", borderRadius: "10px", padding: "14px", backdropFilter: "blur(6px)" }}>
                          <span style={{ fontSize: "9px", color: "var(--gold)", fontWeight: "bold", textTransform: "uppercase", display: "block", letterSpacing: "0.5px" }}>🏛️ SMART MONEY CONCEPTS</span>
                          <strong style={{ display: "block", fontSize: "14px", color: "#fff", marginTop: "6px" }}>
                            Cấu trúc: {outlook.smcAnalysis.marketStructure}
                          </strong>
                          <span style={{ display: "block", fontSize: "11.5px", color: "var(--text2)", marginTop: "4px" }}>
                            Khối Cầu/Cung: {outlook.smcAnalysis.keyOrderBlocks.length} OB hoạt động
                          </span>
                          <div style={{ display: "flex", flexDirection: "column", gap: "3px", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "10px", paddingTop: "8px", fontSize: "11px", color: "var(--text2)" }}>
                            <div>Khoảng FVG H1: <strong style={{ color: "#80deea", fontFamily: "monospace" }}>{outlook.smcAnalysis.fvgs[0]?.gap || "Đã lấp hết"}</strong></div>
                            <div>Cản OB Cung: <strong style={{ color: "var(--red)", fontFamily: "monospace" }}>{outlook.smcAnalysis.keyOrderBlocks.find(ob => ob.type.includes("BEARISH"))?.priceRange || "Không có"}</strong></div>
                          </div>
                        </div>

                        {/* Price Action parameters highlights */}
                        <div style={{ background: "rgba(20, 24, 33, 0.4)", border: "1px solid rgba(255, 215, 0, 0.1)", borderRadius: "10px", padding: "14px", backdropFilter: "blur(6px)" }}>
                          <span style={{ fontSize: "9px", color: "var(--gold)", fontWeight: "bold", textTransform: "uppercase", display: "block", letterSpacing: "0.5px" }}>🕯️ PRICE ACTION & TÂM LÝ</span>
                          <strong style={{ display: "block", fontSize: "14px", color: outlook.priceAction.sentiment === "TÍCH CỰC" ? "var(--green)" : outlook.priceAction.sentiment === "TIÊU CỰC" ? "var(--red)" : "var(--yellow)", marginTop: "6px" }}>
                            Tâm lý nến: {outlook.priceAction.sentiment}
                          </strong>
                          <span style={{ display: "block", fontSize: "11.5px", color: "var(--text2)", marginTop: "4px" }}>
                            Nến đặc trưng: {outlook.priceAction.recentPatterns[0]?.split(":")[0] || "Không có"}
                          </span>
                          <div style={{ display: "flex", flexDirection: "column", gap: "3px", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "10px", paddingTop: "8px", fontSize: "11px", color: "var(--text2)" }}>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Nến gần nhất: <strong>{outlook.priceAction.recentPatterns[0]?.split(":")[0] || "Trung lập"}</strong></div>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Nến liền kề: <strong>{outlook.priceAction.recentPatterns[1]?.split(":")[0] || "Trung lập"}</strong></div>
                          </div>
                        </div>

                      </div>

                      {/* Day trading execution action plan */}
                      <div style={{ background: "linear-gradient(135deg, rgba(255, 171, 0, 0.05) 0%, rgba(7, 9, 14, 0.6) 100%)", border: "1.5px dashed var(--gold)", borderRadius: "14px", padding: "22px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}>
                        <h4 style={{ fontSize: "12px", color: "var(--gold)", margin: "0 0 10px 0", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
                          ⚡ KẾ HOẠCH GIAO DỊCH HỢP LƯU CHI TIẾT TRONG NGÀY
                        </h4>
                        <p style={{ fontSize: "14px", color: "#fff", fontWeight: "700", lineHeight: "1.6", margin: "0" }}>
                          👉 {outlook.priceAction.actionableAdvice}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
