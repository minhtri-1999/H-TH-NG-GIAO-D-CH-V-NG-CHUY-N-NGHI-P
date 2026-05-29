import { type Candle } from "./signals.ts";
import { type TradingViewRealtime } from "./api.ts";
import { analyzeAdvanced, type AdvancedAnalysis, type SwingPoint, type OrderBlock, type FVG } from "./advanced_analysis.ts";

export interface MarketOutlookLevel {
  type: string;
  price: number;
  description: string;
}

export interface MarketOutlook {
  date: string;
  timeframe: string;
  trendDow: {
    primary: "TĂNG" | "GIẢM" | "ĐI NGANG";
    secondary: "HỒI TĂNG" | "HỒI GIẢM" | "TÍCH LŨY" | "KHÔNG CÓ";
    rationale: string;
    keyLevels: MarketOutlookLevel[];
  };
  smcAnalysis: {
    bias: "BULLISH" | "BEARISH" | "NEUTRAL";
    keyOrderBlocks: { type: string; priceRange: string; status: string }[];
    fvgs: { type: string; gap: string; distance: string }[];
    marketStructure: string;
    liquidityZones: string[];
  };
  priceAction: {
    recentPatterns: string[];
    sentiment: "TÍCH CỰC" | "TIÊU CỰC" | "TRUNG LẬP";
    actionableAdvice: string;
  };
  synthesizedOutlook: {
    bias: "BUY" | "SELL" | "HOLD";
    score: number;
    targetPrice: string;
    stopLossPrice: string;
    summary: string;
  };
}

export function generateMarketOutlook(candles: Candle[], rt: TradingViewRealtime): MarketOutlook {
  const adv: AdvancedAnalysis = analyzeAdvanced(candles, rt);
  const currentPrice = rt.price;
  const today = new Date().toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  // ==========================================
  // 1. DOW THEORY ANALYSIS
  // ==========================================
  // We sort swings chronologically
  const sortedSwings = [...adv.swings].sort((a, b) => a.index - b.index);
  const highs = sortedSwings.filter(s => s.type === "HIGH");
  const lows = sortedSwings.filter(s => s.type === "LOW");

  let primary: "TĂNG" | "GIẢM" | "ĐI NGANG" = "ĐI NGANG";
  let secondary: "HỒI TĂNG" | "HỒI GIẢM" | "TÍCH LŨY" | "KHÔNG CÓ" = "KHÔNG CÓ";
  let rationale = "Chưa đủ dữ liệu sóng đỉnh/đáy để xác định xu hướng theo lý thuyết Dow.";
  const keyLevels: MarketOutlookLevel[] = [];

  if (highs.length >= 2 && lows.length >= 2) {
    const lastH = highs[highs.length - 1];
    const prevH = highs[highs.length - 2];
    const lastL = lows[lows.length - 1];
    const prevL = lows[lows.length - 2];

    const isHH = lastH.price > prevH.price;
    const isLH = lastH.price < prevH.price;
    const isHL = lastL.price > prevL.price;
    const isLL = lastL.price < prevL.price;

    if (isHH && isHL) {
      primary = "TĂNG";
      rationale = `Cấu trúc thị trường tăng vững chắc theo lý thuyết Dow với Đỉnh sau cao hơn Đỉnh trước ($${lastH.price.toFixed(2)} > $${prevH.price.toFixed(2)}) và Đáy sau cao hơn Đáy trước ($${lastL.price.toFixed(2)} > $${prevL.price.toFixed(2)}).`;
      
      if (currentPrice < lastH.price) {
        secondary = "HỒI GIẢM";
        rationale += ` Hiện tại giá đang điều chỉnh giảm nhẹ (sóng cấp 2 hồi giảm) dưới đỉnh cũ $${lastH.price.toFixed(2)}.`;
      } else {
        secondary = "KHÔNG CÓ";
        rationale += ` Giá tiếp tục bứt phá mở rộng sóng cấp 1 tăng trưởng.`;
      }
    } else if (isLH && isLL) {
      primary = "GIẢM";
      rationale = `Cấu trúc giảm giá chiếm ưu thế hoàn toàn theo lý thuyết Dow với Đỉnh sau thấp hơn Đỉnh trước ($${lastH.price.toFixed(2)} < $${prevH.price.toFixed(2)}) và Đáy sau thấp hơn Đáy trước ($${lastL.price.toFixed(2)} < $${prevL.price.toFixed(2)}).`;
      
      if (currentPrice > lastL.price) {
        secondary = "HỒI TĂNG";
        rationale += ` Hiện tại giá đang điều chỉnh hồi tăng nhẹ (sóng cấp 2 hồi phục) trên mức đáy gần nhất $${lastL.price.toFixed(2)}.`;
      } else {
        secondary = "KHÔNG CÓ";
        rationale += ` Lực bán mạnh tiếp tục đẩy giá phá đáy đi xuống sóng cấp 1 giảm.`;
      }
    } else {
      primary = "ĐI NGANG";
      secondary = "TÍCH LŨY";
      rationale = `Thị trường đang trong giai đoạn tích lũy/đi ngang không xu hướng rõ ràng. Đỉnh đáy đan xen phức tạp (Đỉnh: $${lastH.price.toFixed(2)} vs $${prevH.price.toFixed(2)}, Đáy: $${lastL.price.toFixed(2)} vs $${prevL.price.toFixed(2)}).`;
    }

    // Set Key Support/Resistance Levels
    keyLevels.push({
      type: "Kháng cự chính (Dow High)",
      price: lastH.price,
      description: "Đỉnh Swing High gần nhất theo Lý thuyết Dow. Vượt qua mức này sẽ xác nhận xu hướng tăng."
    });
    keyLevels.push({
      type: "Hỗ trợ chính (Dow Low)",
      price: lastL.price,
      description: "Đáy Swing Low gần nhất theo Lý thuyết Dow. Thủng mức này sẽ kích hoạt đà giảm mạnh."
    });

    if (prevH) {
      keyLevels.push({
        type: "Kháng cự thứ cấp",
        price: prevH.price,
        description: "Đỉnh Swing High trước đó, đóng vai trò là vùng cung quan trọng."
      });
    }
    if (prevL) {
      keyLevels.push({
        type: "Hỗ trợ thứ cấp",
        price: prevL.price,
        description: "Đáy Swing Low trước đó, đóng vai trò là vùng cầu mạnh tích lũy."
      });
    }
  } else {
    // Fallback if swings are sparse
    keyLevels.push({ type: "Kháng cự tâm lý", price: Math.round(currentPrice + 15), description: "Vùng kháng cự tâm lý số tròn." });
    keyLevels.push({ type: "Hỗ trợ tâm lý", price: Math.round(currentPrice - 15), description: "Vùng hỗ trợ tâm lý số tròn." });
  }

  // ==========================================
  // 2. SMART MONEY CONCEPTS (SMC) ANALYSIS
  // ==========================================
  // Find key unmitigated Order Blocks
  const unmitigatedOBs = adv.orderBlocks.filter(ob => !ob.mitigated);
  const bullOB = unmitigatedOBs.filter(ob => ob.type === "BULLISH").pop();
  const bearOB = unmitigatedOBs.filter(ob => ob.type === "BEARISH").pop();
  
  const keyOrderBlocks: { type: string; priceRange: string; status: string }[] = [];
  if (bullOB) {
    keyOrderBlocks.push({
      type: "🟢 BULLISH OB (Cầu)",
      priceRange: `$${bullOB.low.toFixed(2)} - $${bullOB.high.toFixed(2)}`,
      status: "Chưa chạm (Unmitigated) - Vùng canh Mua mạnh"
    });
  }
  if (bearOB) {
    keyOrderBlocks.push({
      type: "🔴 BEARISH OB (Cung)",
      priceRange: `$${bearOB.low.toFixed(2)} - $${bearOB.high.toFixed(2)}`,
      status: "Chưa chạm (Unmitigated) - Vùng canh Bán mạnh"
    });
  }

  // Find key unmitigated FVGs
  const activeFVGs = adv.fvgs.filter(f => !f.mitigated);
  const bullFVG = activeFVGs.filter(f => f.type === "BULLISH").pop();
  const bearFVG = activeFVGs.filter(f => f.type === "BEARISH").pop();

  const keyFVGs: { type: string; gap: string; distance: string }[] = [];
  if (bullFVG) {
    const dist = Math.abs(currentPrice - (bullFVG.top + bullFVG.bottom) / 2);
    keyFVGs.push({
      type: "🔵 FVG TĂNG",
      gap: `$${bullFVG.bottom.toFixed(2)} - $${bullFVG.top.toFixed(2)}`,
      distance: `Cách khoảng $${dist.toFixed(2)}`
    });
  }
  if (bearFVG) {
    const dist = Math.abs(currentPrice - (bearFVG.top + bearFVG.bottom) / 2);
    keyFVGs.push({
      type: "🟣 FVG GIẢM",
      gap: `$${bearFVG.bottom.toFixed(2)} - $${bearFVG.top.toFixed(2)}`,
      distance: `Cách khoảng $${dist.toFixed(2)}`
    });
  }

  // Market structure shift status
  let marketStructure = "TÍCH LŨY KHÔNG CƠ CẤU";
  if (adv.structureShifts.length > 0) {
    const latestShift = adv.structureShifts[adv.structureShifts.length - 1];
    marketStructure = `${latestShift.type} ${latestShift.direction === "BULLISH" ? "TĂNG" : "GIẢM"}`;
  }

  // Liquidity zones
  const liquidityZones: string[] = [];
  if (adv.sweeps.length > 0) {
    adv.sweeps.slice(-2).forEach(sw => {
      liquidityZones.push(sw.description);
    });
  } else {
    liquidityZones.push("Chưa phát hiện vùng quét thanh khoản đáng kể. Giá đang di chuyển trong biên độ hẹp.");
  }

  // Determine SMC Bias
  let smcBias: "BULLISH" | "BEARISH" | "NEUTRAL" = "NEUTRAL";
  if (marketStructure.includes("TĂNG") && adv.emaTrend.alignment === "BULLISH") {
    smcBias = "BULLISH";
  } else if (marketStructure.includes("GIẢM") && adv.emaTrend.alignment === "BEARISH") {
    smcBias = "BEARISH";
  } else if (marketStructure.includes("TĂNG") || adv.emaTrend.alignment === "BULLISH") {
    smcBias = "BULLISH";
  } else if (marketStructure.includes("GIẢM") || adv.emaTrend.alignment === "BEARISH") {
    smcBias = "BEARISH";
  }

  // ==========================================
  // 3. PRICE ACTION ANALYSIS
  // ==========================================
  const recentPatterns: string[] = [];
  let actionSentiment: "TÍCH CỰC" | "TIÊU CỰC" | "TRUNG LẬP" = "TRUNG LẬP";
  let bullishPatternCount = 0;
  let bearishPatternCount = 0;

  if (adv.patterns.length > 0) {
    // Get last 4 patterns
    adv.patterns.slice(-4).forEach(p => {
      recentPatterns.push(`${p.name}: ${p.description}`);
      if (p.type === "BULLISH") bullishPatternCount++;
      else bearishPatternCount++;
    });
  } else {
    recentPatterns.push("Không phát hiện mô hình nến đảo chiều đặc biệt trong 10 nến H1 gần nhất.");
  }

  if (bullishPatternCount > bearishPatternCount) {
    actionSentiment = "TÍCH CỰC";
  } else if (bearishPatternCount > bullishPatternCount) {
    actionSentiment = "TIÊU CỰC";
  }

  // Actions / Recommendations
  let actionableAdvice = "Chờ đợi tín hiệu rõ nét tại các vùng cung/cầu H1 chính thức.";
  if (primary === "TĂNG" && smcBias === "BULLISH") {
    const obPrice = bullOB ? `khối Bullish OB quanh $${bullOB.high.toFixed(2)}` : "đáy sóng cấp 2";
    actionableAdvice = `Ưu tiên lệnh CANH MUA (BUY LIMIT). Điểm entry tối ưu là khi giá hồi quy (pullback) về lấp FVG tăng hoặc kiểm định lại ${obPrice}. Cắt lỗ (SL) đặt bắt buộc dưới đáy Dow Theory.`;
  } else if (primary === "GIẢM" && smcBias === "BEARISH") {
    const obPrice = bearOB ? `khối Bearish OB quanh $${bearOB.low.toFixed(2)}` : "đỉnh sóng cấp 2";
    actionableAdvice = `Ưu tiên lệnh CANH BÁN (SELL LIMIT). Điểm entry tối ưu là khi giá hồi quy kiểm định vùng ${obPrice} hoặc lấp khoảng trống FVG giảm bên trên. Cắt lỗ (SL) đặt trên đỉnh Dow Theory gần nhất.`;
  } else if (primary === "TĂNG" && smcBias === "BEARISH") {
    actionableAdvice = `Xu hướng Dow và cấu trúc SMC đang đối nghịch nhau (Hồi quy phức tạp). Khuyến nghị đứng ngoài quan sát (HOLD) hoặc giao dịch lướt sóng cực ngắn (Scalping) với volume nhỏ khi giá phản ứng tại các mốc kháng cự/hỗ trợ chính.`;
  } else if (primary === "GIẢM" && smcBias === "BULLISH") {
    actionableAdvice = `Cấu trúc Dow là Giảm nhưng SMC đã xuất hiện CHoCH tăng hoặc Golden Cross. Đây có thể là tín hiệu tạo đáy đảo chiều. Nên đứng ngoài quan sát thêm nến xác nhận hoặc canh mua rải vốn cực nhỏ dưới đáy cũ.`;
  }

  // ==========================================
  // 4. SYNTHESIZED OUTLOOK & TARGET COMPUTATION
  // ==========================================
  let overallBias: "BUY" | "SELL" | "HOLD" = "HOLD";
  let score = 50; // Neutral baseline

  // Calculate score dynamically based on technical inputs
  if (primary === "TĂNG") score += 15;
  if (primary === "GIẢM") score -= 15;

  if (smcBias === "BULLISH") score += 15;
  if (smcBias === "BEARISH") score -= 15;

  if (actionSentiment === "TÍCH CỰC") score += 10;
  if (actionSentiment === "TIÊU CỰC") score -= 10;

  if (adv.emaTrend.alignment === "BULLISH") score += 10;
  if (adv.emaTrend.alignment === "BEARISH") score -= 10;

  // Clamp score
  score = Math.max(5, Math.min(95, score));

  if (score >= 65) {
    overallBias = "BUY";
  } else if (score <= 35) {
    overallBias = "SELL";
  } else {
    overallBias = "HOLD";
  }

  // Dynamically calculate Target (TP) and Stop Loss (SL)
  const atr = rt.atr > 0 ? rt.atr : 3.5;
  let targetPrice = "—";
  let stopLossPrice = "—";

  if (overallBias === "BUY") {
    const sl = currentPrice - 2.0 * atr;
    const tp = currentPrice + 3.0 * atr;
    stopLossPrice = `$${sl.toFixed(2)}`;
    targetPrice = `$${tp.toFixed(2)}`;
  } else if (overallBias === "SELL") {
    const sl = currentPrice + 2.0 * atr;
    const tp = currentPrice - 3.0 * atr;
    stopLossPrice = `$${sl.toFixed(2)}`;
    targetPrice = `$${tp.toFixed(2)}`;
  }

  // Build the synthesized technical outlook report paragraph
  let summary = "";
  if (overallBias === "BUY") {
    summary = `Thị trường Vàng (XAU/USD) trên khung thời gian H1 đang duy trì xung lực TĂNG mạnh mẽ và đồng thuận. Lý thuyết Dow xác nhận cấu trúc tăng bền vững với các đỉnh đáy cao dần. Đồng thời, cấu trúc SMC hiển thị dòng tiền thông minh hỗ trợ các vùng cầu (Bullish Order Block) hoạt động tích cực. Price Action đang có các mô hình nến ủng hộ đà tăng trưởng. Điểm mua tốt nhất là canh các nhịp điều chỉnh lấp khoảng trống FVG tăng hoặc hồi về đường EMA Cloud để tối ưu hóa tỷ lệ R:R.`;
  } else if (overallBias === "SELL") {
    summary = `Thị trường Vàng (XAU/USD) trên khung thời gian H1 đang nằm dưới quyền kiểm soát hoàn toàn của phe gấu (Phe Bán). Lý thuyết Dow chỉ ra xu hướng giảm giá cấp 1 tiếp diễn mạnh, liên tiếp phá vỡ các vùng đáy hỗ trợ cũ. Các khối kháng cự Bearish Order Block liên tục được thiết lập vững chắc ngăn cản mọi nỗ lực phục hồi giá. Price Action đang thể hiện áp lực bán áp đảo râu nến trên. Canh bán Limit tại các vùng FVG giảm hoặc kháng cự SMC là chiến lược tối ưu nhất thời điểm này.`;
  } else {
    summary = `Thị trường Vàng (XAU/USD) trên khung thời gian H1 đang chuyển sang trạng thái tích lũy, đi ngang không rõ xu hướng (Sideways). Lý thuyết Dow ghi nhận đỉnh đáy đan xen phức tạp và các đường EMA ngắn hạn đang quấn vào nhau thể hiện sự lưỡng lự của các dòng tiền lớn trước thềm tin tức quan trọng. Cấu trúc SMC chưa hình thành phá vỡ cấu trúc (BOS) rõ nét. Khuyến nghị đứng ngoài quan sát (HOLD), kiên nhẫn đợi giá thoát khỏi biên độ tích lũy hoặc quét thanh khoản biên trên/biên dưới để có kế hoạch giao dịch an toàn.`;
  }

  return {
    date: today,
    timeframe: "Khung H1 (1 Giờ)",
    trendDow: {
      primary,
      secondary,
      rationale,
      keyLevels
    },
    smcAnalysis: {
      bias: smcBias,
      keyOrderBlocks,
      fvgs: keyFVGs,
      marketStructure,
      liquidityZones
    },
    priceAction: {
      recentPatterns,
      sentiment: actionSentiment,
      actionableAdvice
    },
    synthesizedOutlook: {
      bias: overallBias,
      score,
      targetPrice,
      stopLossPrice,
      summary
    }
  };
}
