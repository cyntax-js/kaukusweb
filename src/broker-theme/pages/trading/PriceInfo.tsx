import { cn } from "@/lib/utils";
import { Market } from "@/data/mockTradingData";

interface PriceInfoProps {
  market: Market | null;
}

const PriceInfo = ({ market }: PriceInfoProps) => {
  if (!market) return null;
  
  return (
    <div className="h-12 bg-card border-b border-border flex items-center px-4 py-8 gap-6">
      <div className="flex items-center gap-2">
        <span className="text-foreground font-medium flex items-center gap-2">
          {market.baseAsset}/{market.quoteAsset}
          {market.type === "derivative" && (
            <span className="bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">10x</span>
          )}
        </span>
      </div>
      <div className="flex items-center gap-6 text-xs">
        <div>
          <div className="text-base font-bold text-foreground">{market.price.toLocaleString()}</div>
          <div className={cn("text-sm font-medium", market.change24h > 0 ? "text-green-500" : "text-red-500")}>
            {market.change24h > 0 ? "+" : ""}{market.change24h.toFixed(2)}%
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">24h high</div>
          <div className="text-foreground">{market.high24h?.toFixed(2) ?? "—"}</div>
        </div>
        <div>
          <div className="text-muted-foreground">24h low</div>
          <div className="text-foreground">{market.low24h?.toFixed(2) ?? "—"}</div>
        </div>
        <div>
          <div className="text-muted-foreground">24h volume</div>
          <div className="text-foreground">{(market.volume24h / 1000000).toFixed(2)}M</div>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;