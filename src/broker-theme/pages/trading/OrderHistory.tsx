import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, X } from 'lucide-react';

const OrderHistory = ({ userTrades, isDerivative }: { userTrades?: any[]; isDerivative?: boolean }) => {
  const [activeTab, setActiveTab] = useState("open");
  const [activeOrderType, setActiveOrderType] = useState("all");

  const tabs = isDerivative
    ? [
        { id: "open", label: "Open", count: 0 },
        { id: "closed", label: "Closed", count: 0 },
        { id: "cancelled", label: "Cancelled", count: 0 }
      ]
    : [{ id: "trade", label: "Trade history", count: 0 }];

  return (
    <div className="w-full h-full bg-card border-l border-border overflow-y-auto flex flex-col">
      <div className="border-b border-border">
        <div className="flex items-center gap-2 px-4 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "text-xs font-medium transition-colors px-3 py-1 rounded",
                activeTab === tab.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label} {tab.count !== undefined && `(${tab.count})`}
            </button>
          ))}
        </div>

        {isDerivative && (
          <div className="flex items-center gap-2 px-4 py-2 border-t border-border">
            {["all", "limit", "market", "conditional"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveOrderType(type)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-colors capitalize",
                  activeOrderType === type
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {type === "all" ? "All Orders" : type}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {userTrades && userTrades.length > 0 ? (
          <div>
            {isDerivative ? (
              <div className="text-xs">
                {userTrades.map((t, i) => (
                  <div key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "font-medium px-2 py-1 rounded text-xs",
                            t.type === "long" || t.type === "buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                          )}>
                            {(t.type || "").toUpperCase()}
                          </span>
                          <span className="text-foreground font-medium">{t.symbol}</span>
                          <span className="text-muted-foreground">x{t.leverage || 1}</span>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Entry Price</div>
                          <div className="text-foreground font-medium">{(t.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Amount</div>
                          <div className="text-foreground font-medium">{t.amount || 0} {t.symbol?.split('/')[0]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              userTrades.map((t, i) => (
                <div key={i} className="px-4 py-2 text-xs flex items-center justify-between border-b border-border hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="text-foreground font-medium">{t.symbol}</div>
                    <div className="text-muted-foreground">{t.time}</div>
                  </div>
                  <div className="text-right">
                    <div className={cn('font-medium', t.type === 'buy' ? 'text-green-500' : 'text-red-500')}>{t.type.toUpperCase()} {t.amount}</div>
                    <div className="text-muted-foreground">{(t.total).toLocaleString(undefined, { minimumFractionDigits:2 })} NGN</div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 min-h-[200px]">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="text-foreground text-lg mb-2">No records found</div>
              <div className="text-muted-foreground text-sm mb-4">
                {isDerivative ? "No open positions" : "Showing orders for the last 7 days"}
              </div>
            </div>
          </div>
        )}
      </div>

      {!isDerivative && (
        <div className="px-4 py-2 border-t border-border flex items-center gap-4">
          <select className="text-xs bg-muted text-foreground border border-border rounded px-3 py-1.5 focus:outline-none transition-colors">
            <option>All instruments</option>
          </select>
          <select className="text-xs bg-muted text-foreground border border-border rounded px-3 py-1.5 focus:outline-none transition-colors">
            <option>Time created</option>
          </select>
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            <input type="checkbox" className="w-3.5 h-3.5 cursor-pointer" />
            Current symbol
          </label>
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            <input type="checkbox" className="w-3.5 h-3.5 cursor-pointer" />
            Hide canceled
          </label>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
