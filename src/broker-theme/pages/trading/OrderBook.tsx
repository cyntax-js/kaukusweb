import React, { useEffect, useState } from "react";
import { generateOrderBook, Market } from "@/data/mockTradingData";
import { cn } from "@/lib/utils";
import BuySellPressure from "./BuySellPressure";

interface OrderBookProps {
  market?: Market | null;
  isDerivative?: boolean;
}

const OrderBook = ({ market, isDerivative }: OrderBookProps) => {
  const [orderBook, setOrderBook] = useState(
    generateOrderBook(market?.price || 100)
  );
  const [depth, setDepth] = useState("0.1");
  const [viewMode, setViewMode] = useState<"all" | "bids" | "asks">("all");
  const [activeTab, setActiveTab] = useState<"book" | "trades">("book");

  useEffect(() => {
    setOrderBook(generateOrderBook(market?.price || 100));

    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(market?.price || 100));
    }, 2000);

    return () => clearInterval(interval);
  }, [market?.price, market?.symbol]);

  const maxTotal = Math.max(
    ...orderBook.bids.map((b) => b.total),
    ...orderBook.asks.map((a) => a.total)
  );

  return (
    <div className="w-full bg-card border-r border-border flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab("book")}
            className={cn(
              "text-xs font-medium transition-colors",
              activeTab === "book"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isDerivative ? "Order book" : "Trades"}
          </button>
          <button
            onClick={() => setActiveTab("trades")}
            className={cn(
              "text-xs font-medium transition-colors",
              activeTab === "trades"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isDerivative ? "Trades" : "Activities"}
          </button>
        </div>

        {activeTab === "book" && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-muted rounded p-1">
              <button
                onClick={() => setViewMode("all")}
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded transition-colors",
                  viewMode === "all"
                    ? "bg-background"
                    : "hover:bg-background/50"
                )}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="4" height="4" fill="#ef5350" />
                  <rect
                    x="7"
                    y="2"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="5"
                    width="7"
                    height="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect x="2" y="8" width="4" height="4" fill="#26a69a" />
                  <rect
                    x="7"
                    y="8"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="11"
                    width="7"
                    height="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("bids")}
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded transition-colors",
                  viewMode === "bids"
                    ? "bg-background"
                    : "hover:bg-background/50"
                )}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="4" height="10" fill="#26a69a" />
                  <rect
                    x="7"
                    y="2"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="5"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="8"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="11"
                    width="7"
                    height="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("asks")}
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded transition-colors",
                  viewMode === "asks"
                    ? "bg-background"
                    : "hover:bg-background/50"
                )}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="4" height="10" fill="#ef5350" />
                  <rect
                    x="7"
                    y="2"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="5"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="8"
                    width="7"
                    height="2"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <rect
                    x="7"
                    y="11"
                    width="7"
                    height="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {activeTab === "book" && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const depths = ["0.01", "0.1", "1", "10", "100"];
                const currentIndex = depths.indexOf(depth);
                if (currentIndex > 0) setDepth(depths[currentIndex - 1]);
              }}
              className="text-xs bg-muted text-foreground px-2 py-1 rounded hover:bg-muted/80 transition-colors"
            >
              −
            </button>
            <select
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="text-xs bg-transparent text-foreground border-none focus:outline-none cursor-pointer"
            >
              <option value="0.01">0.01</option>
              <option value="0.1">0.1</option>
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="100">100</option>
            </select>
            <button
              onClick={() => {
                const depths = ["0.01", "0.1", "1", "10", "100"];
                const currentIndex = depths.indexOf(depth);
                if (currentIndex < depths.length - 1)
                  setDepth(depths[currentIndex + 1]);
              }}
              className="text-xs bg-muted text-foreground px-2 py-1 rounded hover:bg-muted/80 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      )}

      {activeTab === "book" && (
        <div className="flex px-3 py-2 text-xs text-muted-foreground">
          <div className="flex-1 text-left">
            Price ({market?.quoteAsset ?? "NGN"})
          </div>
          <div className="flex-1 text-right">
            Amount ({market?.baseAsset ?? "ASSET"})
          </div>
          <div className="flex-1 text-right">
            Total ({market?.baseAsset ?? "ASSET"})
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "book" ? (
          <>
            {(viewMode === "all" || viewMode === "asks") && (
              <div className="flex-1 flex flex-col-reverse overflow-auto hide-scrollbar">
                {orderBook.asks
                  .slice(0, viewMode === "all" ? 150 : 150)
                  .reverse()
                  .map((ask, i) => (
                    <div
                      key={`ask-${i}`}
                      className="relative px-3 py-0.5 text-xs hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div
                        className="absolute right-0 top-0 h-full bg-red-500/10 transition-all duration-300"
                        style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                      />
                      <div className="relative flex">
                        <div className="flex-1 text-red-500">
                          {ask.price.toFixed(2)}
                        </div>
                        <div className="flex-1 text-right text-foreground">
                          {ask.amount.toFixed(5)}
                        </div>
                        <div className="flex-1 text-right text-muted-foreground">
                          {ask.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {viewMode === "all" && (
              <div className="px-3 py-3 border-y border-border">
                <div
                  className="text-lg font-bold"
                  style={{
                    color:
                      (market?.change24h ?? 0) < 0
                        ? "hsl(var(--destructive))"
                        : "hsl(var(--success))",
                  }}
                >
                  {market?.price?.toFixed(2) ?? "0.00"}
                  {(market?.change24h ?? 0) < 0 ? "↓" : "↑"}
                </div>
                <div className="text-xs text-muted-foreground">
                  ₦{market?.price ?? "—"}
                </div>
              </div>
            )}

            {(viewMode === "all" || viewMode === "bids") && (
              <div className="flex-1 overflow-auto hide-scrollbar">
                {orderBook.bids
                  .slice(0, viewMode === "all" ? 150 : 150)
                  .map((bid, i) => (
                    <div
                      key={`bid-${i}`}
                      className="relative px-3 py-0.5 text-xs hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div
                        className="absolute right-0 top-0 h-full bg-green-500/10 transition-all duration-300"
                        style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                      />
                      <div className="relative flex">
                        <div className="flex-1 text-green-500">
                          {bid.price.toFixed(2)}
                        </div>
                        <div className="flex-1 text-right text-foreground">
                          {bid.amount.toFixed(5)}
                        </div>
                        <div className="flex-1 text-right text-muted-foreground">
                          {bid.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="flex px-3 py-2 text-xs text-muted-foreground border-b border-border">
              <div className="flex-1 text-left">Price (NGN)</div>
              <div className="flex-1 text-right">Amount</div>
              <div className="flex-1 text-right">Time</div>
            </div>
            {orderBook.bids.slice(0, 150).map((trade, i) => (
              <div
                key={`trade-${i}`}
                className="px-3 py-1 text-xs hover:bg-muted/50 transition-colors cursor-pointer flex"
              >
                <div
                  className={cn(
                    "flex-1",
                    i % 2 === 0 ? "text-green-500" : "text-red-500"
                  )}
                >
                  {trade.price.toFixed(2)}
                </div>
                <div className="flex-1 text-right text-foreground">
                  {trade.amount.toFixed(5)}
                </div>
                <div className="flex-1 text-right text-muted-foreground">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        <BuySellPressure />
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none; 
          overflow-y: auto;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display:none
        }
      `}</style>
    </div>
  );
};

export default OrderBook;
