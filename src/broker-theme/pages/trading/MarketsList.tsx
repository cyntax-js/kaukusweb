import React, { useEffect, useState } from "react";
import { Search, Star } from "lucide-react";
import { mockMarkets, Market } from "@/data/mockTradingData";
import { cn } from "@/lib/utils";
import StockLogo from "./StockLogo";

interface MarketsListProps {
  onSelectMarket: (market: Market) => void;
  selectedMarket: Market | null;
  markets?: Market[];
  enabledServices?: string[];
}

const MarketsList = ({
  onSelectMarket,
  selectedMarket,
  markets,
  enabledServices,
}: MarketsListProps) => {
  const [activeTab, setActiveTab] = useState("Stocks");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter markets by enabled services
  let sourceMarkets = markets ?? mockMarkets;
  
  if (enabledServices && enabledServices.length > 0) {
    sourceMarkets = sourceMarkets.filter(m => {
      if (m.type === 'stock' && enabledServices.includes('spot')) return true;
      if (m.type === 'derivative' && (enabledServices.includes('futures') || enabledServices.includes('options'))) return true;
      if (m.type === 'crypto' && enabledServices.includes('spot')) return true;
      return false;
    });
  }

  // Auto-select tab based on selected market type
  useEffect(() => {
    if (selectedMarket?.type === "derivative") {
      setActiveTab("Derivatives");
    } else {
      setActiveTab("Stocks");
    }
  }, [selectedMarket]);

  // Determine available tabs based on filtered markets
  const hasStocks = sourceMarkets.some(m => m.type === 'stock' || m.type === 'crypto');
  const hasDerivatives = sourceMarkets.some(m => m.type === 'derivative');
  const hasFavorites = sourceMarkets.some(m => m.isFavorite);

  // Filter markets based on active tab
  let tabFilteredMarkets = sourceMarkets;
  if (activeTab === "Stocks") {
    tabFilteredMarkets = sourceMarkets.filter(
      (m) => !m.type || m.type === "stock" || m.type === "crypto"
    );
  } else if (activeTab === "Derivatives") {
    tabFilteredMarkets = sourceMarkets.filter((m) => m.type === "derivative");
  } else if (activeTab === "Favorites") {
    tabFilteredMarkets = sourceMarkets.filter((m) => m.isFavorite);
  }

  const filteredMarkets = tabFilteredMarkets.filter((m) =>
    m.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-card border-r border-border flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex gap-2 mb-3">
          <button className="text-xs text-foreground font-medium px-3 py-1">
            Markets
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search markets"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-muted text-xs text-foreground pl-7 pr-2 py-1.5 rounded border border-border focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex gap-2 px-3 py-2 border-b border-border text-xs">
        {hasFavorites && (
          <button
            onClick={() => setActiveTab("Favorites")}
            className={cn(
              "px-2 py-0.5 rounded font-medium transition-colors",
              activeTab === "Favorites"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Favorites
          </button>
        )}
        {hasStocks && (
          <button
            onClick={() => setActiveTab("Stocks")}
            className={cn(
              "px-2 py-0.5 rounded font-medium transition-colors",
              activeTab === "Stocks"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Spot
          </button>
        )}
        {hasDerivatives && (
          <button
            onClick={() => setActiveTab("Derivatives")}
            className={cn(
              "px-2 py-0.5 rounded font-medium transition-colors",
              activeTab === "Derivatives"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Derivatives
          </button>
        )}
      </div>

      <div className="flex px-3 py-2 text-xs text-muted-foreground border-b border-border">
        <div className="w-1/2">Name / 24h turnover</div>
        <div className="w-1/4 text-right">Last price</div>
        <div className="w-1/4 text-right">Change</div>
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
      <div className="flex-1 hide-scrollbar">
        {filteredMarkets.map((market) => (
          <div
            key={market.symbol}
            onClick={() => onSelectMarket(market)}
            className={cn(
              "flex items-center px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors",
              selectedMarket?.symbol === market.symbol && "bg-muted/50"
            )}
          >
            <div className="w-1/2 flex items-center gap-2">
              <Star
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  market.isFavorite
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground"
                )}
              />
              <StockLogo
                symbol={market.symbol}
                baseAsset={market.baseAsset}
                image={market.image}
                logoUrl={market.logoUrl}
                color={market.color}
                className="w-6 h-6"
              />
              <div>
                <div className="text-xs text-foreground font-medium flex items-center gap-1.5">
                  <span>
                    {market.baseAsset}/{market.quoteAsset}
                  </span>
                  {market.type === "derivative" && (
                    <span className="bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                      10x
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  ₦{(market.volume24h / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
            <div className="w-1/4 text-right text-xs text-foreground">
              {market.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: market.price < 1 ? 6 : 2,
              })}
            </div>
            <div
              className={cn(
                "w-1/4 text-right text-xs font-medium",
                market.change24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              )}
            >
              {market.change24h > 0 ? "+" : ""}
              {market.change24h.toFixed(2)}%
            </div>
          </div>
        ))}
        {filteredMarkets.length === 0 && (
          <div className="p-4 text-center text-muted-foreground text-xs">
            No markets found
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketsList;