const start = performance.now();
try {
  const resp = await fetch("http://localhost:8000/api/backtest/history");
  const data = await resp.json();
  const end = performance.now();
  console.log(`\n✅ Fetch successful! Status: ${resp.status}`);
  console.log(`⏱️ Duration: ${(end - start).toFixed(2)} ms`);
  console.log(`📊 Number of trades returned: ${data.trades?.length}`);
  if (data.trades && data.trades.length > 0) {
    console.log(`📝 First trade details:`, JSON.stringify(data.trades[0], null, 2));
    console.log(`📝 Last trade details:`, JSON.stringify(data.trades[data.trades.length - 1], null, 2));
  } else {
    console.log(`⚠️ No trades returned!`, data);
  }
} catch (err: any) {
  console.error("❌ Fetch failed:", err.message);
}
