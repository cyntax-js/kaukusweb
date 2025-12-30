import React from 'react';
import { Market } from "@/data/mockTradingData";
import { cn } from "@/lib/utils";

export interface Trade {
  price: number;
  amount: number;
  time: string;
  type: 'buy' | 'sell';
}

function generateTrades(count: number = 30, basePrice: number = 100): Trade[] {
  const trades: Trade[] = [];
  for (let i = 0; i < count; i++) {
    trades.push({
      price: basePrice * (1 + (Math.random() - 0.5) * 0.02),
      amount: Math.random() * 10 + 0.1,
      time: new Date(Date.now() - i * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: Math.random() > 0.5 ? 'buy' : 'sell',
    });
  }
  return trades;
}

const LastTrades = ({ market }: { market?: Market | null }) => {
  const [trades, setTrades] = React.useState<Trade[]>(generateTrades(30, market?.price || 100));

  React.useEffect(() => {
    setTrades(generateTrades(30, market?.price || 100));
    const interval = setInterval(() => {
      setTrades((prev) => [generateTrades(1, market?.price || 100)[0], ...prev.slice(0, 29)]);
    }, 1000);
    return () => clearInterval(interval);
  }, [market?.price, market?.symbol]);

  return (
    <div className="h-full bg-card flex flex-col">
      <div className="px-3 py-2 text-xs font-medium text-foreground border-b border-border">
        Trades
      </div>
      <div className="flex px-3 py-2 text-xs text-muted-foreground border-b border-border">
        <div className="flex-1 text-left">Price ({market?.quoteAsset ?? 'NGN'})</div>
        <div className="flex-1 text-right">Amount</div>
        <div className="flex-1 text-right">Time</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {trades.map((trade, i) => (
          <div key={i} className="flex px-3 py-0.5 text-xs hover:bg-muted/50 transition-colors">
            <div className={cn("flex-1", trade.type === "buy" ? "text-green-500" : "text-red-500")}>
              {trade.price.toFixed(2)}
            </div>
            <div className="flex-1 text-right text-foreground">{trade.amount.toFixed(5)}</div>
            <div className="flex-1 text-right text-muted-foreground">{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastTrades;
