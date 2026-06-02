const url = "https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=5d";
try {
  const resp = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  });
  const data = await resp.json();
  const result = data.chart?.result?.[0];
  const quote = result?.indicators?.quote?.[0];
  console.log("Yahoo Finance GC=F prices:", quote.close.slice(-5));
} catch (e) {
  console.error(e);
}
