type TradePoint = {
  time: string;
  price: number;
};

export function generateSP500TradeData(
  points = 500,
  startPrice = 4800
): TradePoint[] {
  const data: TradePoint[] = [];
  let price = startPrice;

  // Start of the year: January 1, 2025
  const startTime = new Date("2025-01-01T00:00:00");

  // Market behavior
  let trend = -2; // 1 = up, -1 = down
  let trendStrength = 8; // Daily drift in points (adjusted for yearly scale)
  let volatility = 1000; // Larger swings

  // Phase changes every ~30-80 points (roughly 1-3 months)
  let nextPhaseChange = Math.floor(Math.random() * 10 + 100);

  for (let i = 0; i < points; i++) {
    // Phase change (trend reversal, correction, or acceleration)
    if (i === nextPhaseChange) {
      nextPhaseChange += Math.floor(Math.random() * 100 + 10); // 30-80 points apart

      const phaseType = Math.random();

      if (phaseType < 0.25) {
        // Trend reversal (bear/bull market shift)
        trend *= -1;
        trendStrength = randomRange(1, 20);
        volatility = randomRange(10, 100);
      } else if (phaseType < 0.75) {
        // Correction / consolidation (choppy sideways)
        trendStrength = randomRange(2, 6);
        volatility = randomRange(10, 200);
      } else {
        // Strong momentum continuation
        trendStrength = randomRange(18, 30);
        volatility = randomRange(50, 80);
      }
    }

    // Random daily noise
    const noise = (Math.random() - 0.5) * volatility;

    // Gentle long-term upward bias (markets tend to rise over time)
    const longTermBias = 0.08; // Very small daily upward drift

    // Light mean reversion to prevent extreme drift
    const meanReversion = (startPrice * 0.2 - price) * 0.0000008;

    // Update price
    price += trend * trendStrength + noise + longTermBias + meanReversion;

    // Prevent crash below reasonable level
    price = Math.max(price, startPrice * 0.3);

    // Time progression: ~1.5 days per point (500 points ≈ 1 year)
    const currentTime = new Date(
      startTime.getTime() + i * 1.5 * 24 * 60 * 60 * 1000
    );

    // Format time as "Jan 01", "Feb 15", etc.
    const timeLabel = currentTime.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

    data.push({
      time: timeLabel,
      price: Math.round(price * 100) / 100,
    });
  }

  return data;
}

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
