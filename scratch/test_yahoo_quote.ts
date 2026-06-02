// scratch/test_yahoo_quote.ts
try {
  const url = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=GC=F";
  const resp = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  
  if (resp.ok) {
    const data = await resp.json();
    const result = data.quoteResponse.result[0];
    console.log("SUCCESS!");
    console.log("Symbol:", result.symbol);
    console.log("Price:", result.regularMarketPrice);
    console.log("Change Percent:", result.regularMarketChangePercent);
    console.log("Day High:", result.regularMarketDayHigh);
    console.log("Day Low:", result.regularMarketDayLow);
    console.log("Time:", result.regularMarketTime);
  } else {
    console.error("FAIL:", resp.status, await resp.text());
  }
} catch (e: any) {
  console.error("ERROR:", e.message);
}
