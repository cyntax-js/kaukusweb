/**
 * BROKER MARKETS PAGE - Syncs with header dropdown market type
 */

import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@/broker-theme/config";
import { AppHeader } from "@/broker-theme/components";
import { mockMarkets, type Market } from "@/data/mockTradingData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  Star,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Layers,
  Lock,
  Sparkles,
  Activity,
} from "lucide-react";
import PrivateMarket from "./PrivateMarket/PrivateMarket";
import PrivateMarketTrade from "./PrivateMarket/PrivateMarketTrade";

type MarketType = "stock" | "futures" | "options" | "private";

type FilterKey =
  | "all"
  | "top_gainers"
  | "top_losers"
  | "most_active"
  | "financial_services"
  | "consumer_goods"
  | "oil_gas"
  | "telecoms";

function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function fundamentalsFor(m: Market) {
  const h = hashCode(m.symbol);
  const marketCap = ((h % 900) + 120) * 1_000_000_000;
  const pe = (h % 55) + 5;
  const eps = ((h % 400) + 50) / 100;
  const epsGrowth = ((h % 220) - 40) / 1;
  const divYield = (h % 800) / 10 / 100;
  const relVolume = (h % 140) / 100 + 0.2;
  const analyst = h % 3 === 0 ? "Strong buy" : h % 3 === 1 ? "Buy" : "Neutral";
  return { marketCap, pe, eps, epsGrowth, divYield, relVolume, analyst };
}

const marketTypeLabels: Record<
  MarketType,
  { label: string; icon: React.ReactNode }
> = {
  stock: { label: "Stock Markets", icon: <TrendingUp className="h-4 w-4" /> },
  futures: {
    label: "Futures / Derivatives",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  options: { label: "Options", icon: <Layers className="h-4 w-4" /> },
  private: { label: "Private Markets", icon: <Lock className="h-4 w-4" /> },
};

const MarketsPage = () => {
  const { config } = useTheme();
  const { marketType: marketTypeParam, marketId } = useParams<{ marketType?: string; marketId?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Trading/Markets pages use /preview/app or /app prefix
  const routePrefix = location.pathname.includes("/preview/app")
    ? "/preview/app"
    : "/app";

  // Check if we're viewing a specific private market
  const isPrivateMarketDetail = location.pathname.includes("/markets/private/") && marketId;

  // Determine active market type from URL param
  const [activeMarketType, setActiveMarketType] = useState<MarketType>(() => {
    if (marketTypeParam === "futures") return "futures";
    if (marketTypeParam === "options") return "options";
    if (marketTypeParam === "private") return "private";
    return "stock";
  });

  // Sync with URL changes
  useEffect(() => {
    if (marketTypeParam === "futures") setActiveMarketType("futures");
    else if (marketTypeParam === "options") setActiveMarketType("options");
    else if (marketTypeParam === "private") setActiveMarketType("private");
    else setActiveMarketType("stock");
  }, [marketTypeParam]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Available market types based on enabled services
  const availableTypes = useMemo(() => {
    const types: MarketType[] = [];
    if (config.services.includes("stock")) types.push("stock");
    if (config.services.includes("futures")) types.push("futures");
    if (config.services.includes("options")) types.push("options");
    if (config.services.includes("private_markets")) types.push("private");
    return types;
  }, [config.services]);

  // Filter markets based on active type
  const typeMarkets = useMemo(() => {
    return mockMarkets.filter((m) => {
      if (activeMarketType === "stock") {
        return (
          (m.type === "stock" ||
            m.type === "crypto" ||
            m.type === "etf" ||
            m.type === "agriculture") &&
          config.services.includes("stock")
        );
      }
      if (activeMarketType === "futures" || activeMarketType === "options") {
        return (
          m.type === "derivative" &&
          (config.services.includes("futures") ||
            config.services.includes("options"))
        );
      }
      if (activeMarketType === "private") {
        return (
          m.type === "private_market" &&
          config.services.includes("private_markets")
        );
      }
      return false;
    });
  }, [activeMarketType, config.services]);

  const searchedMarkets = useMemo(() => {
    if (!searchQuery) return typeMarkets;
    const q = searchQuery.toLowerCase();
    return typeMarkets.filter(
      (m) =>
        m.symbol.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.baseAsset.toLowerCase().includes(q)
    );
  }, [typeMarkets, searchQuery]);

  const filteredMarkets = useMemo(() => {
    const list = [...searchedMarkets];
    const bySector = (needle: string) =>
      list.filter((m) => (m.sector ?? "").toLowerCase().includes(needle));
    switch (activeFilter) {
      case "top_gainers":
        return list.sort((a, b) => b.change24h - a.change24h);
      case "top_losers":
        return list.sort((a, b) => a.change24h - b.change24h);
      case "most_active":
        return list.sort((a, b) => b.volume24h - a.volume24h);
      case "financial_services":
        return bySector("financial");
      case "consumer_goods":
        return bySector("consumer");
      case "oil_gas":
        return bySector("oil");
      case "telecoms":
        return bySector("tele");
      default:
        return list;
    }
  }, [searchedMarkets, activeFilter]);

  const hotAssets = useMemo(() => {
    return [...typeMarkets]
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, 3);
  }, [typeMarkets]);

  const newListings = useMemo(() => {
    return [...typeMarkets].slice(-3).reverse();
  }, [typeMarkets]);

  const stats = useMemo(() => {
    const totalVolume = filteredMarkets.reduce(
      (sum, m) => sum + m.volume24h,
      0
    );
    return { totalVolume };
  }, [filteredMarkets]);

  const handleMarketClick = (market: Market) => {
    const serviceType =
      market.type === "derivative"
        ? "futures"
        : market.type === "stock"
        ? "stock"
        : market.type;
    navigate(`${routePrefix}/trade/${serviceType}/${market.symbol}`);
  };

  const handleTypeChange = (type: MarketType) => {
    setActiveMarketType(type);
    navigate(`${routePrefix}/markets/${type}`);
  };

  if (config.services.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Trading Services Available
            </h2>
            <p className="text-muted-foreground">
              This broker hasn't enabled any trading services yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show private market detail page
  if (isPrivateMarketDetail) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader />
        <PrivateMarketTrade />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      {activeMarketType === "private" &&
      config.services.includes("private_markets") ? (
        <PrivateMarket />
      ) : (
        <main className="flex-1 px-6 py-6">
          <div className="mx-auto max-w-screen-2xl space-y-6">
            {/* Market Type Tabs */}
            <section className="flex items-center gap-2 border-b border-border pb-4">
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeMarketType === type
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {marketTypeLabels[type].icon}
                  {marketTypeLabels[type].label}
                </button>
              ))}
            </section>

            {/* Top overview cards */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Hot{" "}
                    {marketTypeLabels[activeMarketType].label}
                  </div>
                  <div className="space-y-3">
                    {hotAssets.length > 0 ? (
                      hotAssets.map((m) => (
                        <div
                          key={m.symbol}
                          className="flex items-center justify-between gap-3 cursor-pointer hover:bg-muted/50 rounded p-1 -m-1"
                          onClick={() => handleMarketClick(m)}
                        >
                          <div className="min-w-0">
                            <div className="text-sm text-foreground truncate">
                              {m.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-foreground">
                              {m.price.toFixed(2)}
                            </div>
                            <div
                              className={cn(
                                "text-xs",
                                m.change24h >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              )}
                            >
                              {m.change24h >= 0 ? "+" : ""}
                              {m.change24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No assets available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" /> New listings
                  </div>
                  <div className="space-y-3">
                    {newListings.length > 0 ? (
                      newListings.map((m) => (
                        <div
                          key={m.symbol}
                          className="flex items-center justify-between gap-3 cursor-pointer hover:bg-muted/50 rounded p-1 -m-1"
                          onClick={() => handleMarketClick(m)}
                        >
                          <div className="min-w-0">
                            <div className="text-sm text-foreground truncate">
                              {m.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-foreground">
                              {m.price.toFixed(2)}
                            </div>
                            <div
                              className={cn(
                                "text-xs",
                                m.change24h >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              )}
                            >
                              {m.change24h >= 0 ? "+" : ""}
                              {m.change24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No listings
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-sm font-semibold text-foreground mb-3">
                    Market Stats
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Total Volume
                      </div>
                      <div className="text-foreground font-semibold">
                        ₦{(stats.totalVolume / 1_000_000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Active Pairs
                      </div>
                      <div className="text-foreground font-semibold">
                        {typeMarkets.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-sm font-semibold text-foreground mb-3">
                    Market Type
                  </div>
                  <div className="flex items-center gap-2">
                    {marketTypeLabels[activeMarketType].icon}
                    <span className="text-foreground font-medium">
                      {marketTypeLabels[activeMarketType].label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {activeMarketType === "stock" &&
                      "Buy and sell assets at current market prices"}
                    {activeMarketType === "futures" &&
                      "Trade contracts with leverage"}
                    {activeMarketType === "options" &&
                      "Trade options contracts"}
                    {activeMarketType === "private" &&
                      "Exclusive private investments"}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Search */}
            <section>
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${marketTypeLabels[
                    activeMarketType
                  ].label.toLowerCase()}...`}
                  className="pl-10 h-10 bg-card border-border"
                />
              </div>
            </section>

            {/* Filters */}
            <section className="flex flex-wrap gap-2">
              {(
                [
                  ["all", "All"],
                  ["top_gainers", "Top Gainers"],
                  ["top_losers", "Top Losers"],
                  ["most_active", "Most Active"],
                  ["financial_services", "Financial Services"],
                  ["consumer_goods", "Consumer Goods"],
                  ["oil_gas", "Oil & Gas"],
                  ["telecoms", "Telecommunications"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={cn(
                    "rounded-md border border-border px-3 py-1 text-xs transition-colors",
                    activeFilter === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {label}
                </button>
              ))}
            </section>

            {/* Table */}
            <section>
              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="py-3 px-4 text-left w-10"></th>
                          <th className="py-3 px-4 text-left">Symbol</th>
                          <th className="py-3 px-4 text-right">Price</th>
                          <th className="py-3 px-4 text-right">Change %</th>
                          <th className="py-3 px-4 text-right hidden md:table-cell">
                            Volume
                          </th>
                          <th className="py-3 px-4 text-right hidden lg:table-cell">
                            Rel Volume
                          </th>
                          <th className="py-3 px-4 text-right hidden lg:table-cell">
                            Market cap
                          </th>
                          <th className="py-3 px-4 text-right hidden xl:table-cell">
                            P/E
                          </th>
                          <th className="py-3 px-4 text-right hidden lg:table-cell">
                            Sector
                          </th>
                          <th className="py-3 px-4 text-right hidden lg:table-cell">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMarkets.map((m) => {
                          const f = fundamentalsFor(m);
                          const up = m.change24h >= 0;
                          return (
                            <tr
                              key={m.symbol}
                              className="border-b border-border hover:bg-muted/40 transition-colors cursor-pointer"
                              onClick={() => handleMarketClick(m)}
                            >
                              <td className="py-3 px-4">
                                <Star
                                  className={cn(
                                    "h-4 w-4",
                                    m.isFavorite
                                      ? "fill-yellow-500 text-yellow-500"
                                      : "text-muted-foreground"
                                  )}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3 min-w-[180px]">
                                  <div
                                    className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground"
                                    style={{
                                      backgroundColor: m.color || undefined,
                                    }}
                                  >
                                    {m.baseAsset.slice(0, 2)}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-semibold text-foreground truncate">
                                      {m.baseAsset}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {m.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right text-foreground">
                                {m.quoteAsset === "USD" ? "$" : "₦"}
                                {m.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                              <td
                                className={cn(
                                  "py-3 px-4 text-right font-medium",
                                  up ? "text-green-500" : "text-red-500"
                                )}
                              >
                                <span className="inline-flex items-center justify-end gap-1">
                                  {up ? (
                                    <TrendingUp className="h-4 w-4" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4" />
                                  )}
                                  {up ? "+" : ""}
                                  {m.change24h.toFixed(2)}%
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right text-muted-foreground hidden md:table-cell">
                                ₦{(m.volume24h / 1_000_000).toFixed(2)}M
                              </td>
                              <td className="py-3 px-4 text-right text-muted-foreground hidden lg:table-cell">
                                {f.relVolume.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right text-muted-foreground hidden lg:table-cell">
                                ₦{(f.marketCap / 1_000_000_000).toFixed(0)}B
                              </td>
                              <td className="py-3 px-4 text-right text-muted-foreground hidden xl:table-cell">
                                {f.pe.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right text-muted-foreground hidden lg:table-cell">
                                {m.sector ?? "—"}
                              </td>
                              <td
                                className={cn(
                                  "py-3 px-4 text-right hidden lg:table-cell",
                                  f.analyst === "Neutral"
                                    ? "text-muted-foreground"
                                    : "text-green-500"
                                )}
                              >
                                {f.analyst}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {filteredMarkets.length === 0 && (
                      <div className="py-12 text-center text-muted-foreground">
                        <p>
                          No markets found for{" "}
                          {marketTypeLabels[activeMarketType].label}
                        </p>
                        <p className="text-sm mt-1">
                          Try adjusting your search or filters.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default MarketsPage;
