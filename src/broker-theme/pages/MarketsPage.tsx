/**
 * BROKER MARKETS PAGE - Syncs with header dropdown market type
 */

import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@/broker-theme/config";
import { useBrokerPaths } from "@/broker-theme/hooks/useBrokerPaths";
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
import SecondaryMarket from "./SecondaryMarket/SecondaryMarket";
import SecondaryMarketDetail from "./SecondaryMarket/SecondaryMarketDetail";

type MarketType = "stock" | "futures" | "options" | "private" | "secondary";
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
  return {
    marketCap: ((h % 900) + 120) * 1_000_000_000,
    pe: (h % 55) + 5,
    eps: ((h % 400) + 50) / 100,
    epsGrowth: ((h % 220) - 40) / 1,
    divYield: (h % 800) / 10 / 100,
    relVolume: (h % 140) / 100 + 0.2,
    analyst: h % 3 === 0 ? "Strong buy" : h % 3 === 1 ? "Buy" : "Neutral",
  };
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
  secondary: {
    label: "Secondary Markets",
    icon: <Sparkles className="h-4 w-4" />,
  },
};

const MarketsPage = () => {
  const { config } = useTheme();
  const { marketType: marketTypeParam, marketId } = useParams<{
    marketType?: string;
    marketId?: string;
  }>();
  const navigate = useNavigate();
  const { appPrefix } = useBrokerPaths();

  // Check route types
  const isPrivateMarketDetail =
    location.pathname.includes("/markets/private/") && marketId;
  const isSecondaryMarketDetail =
    location.pathname.includes("/markets/secondary/") && marketId;

  // Determine active market type from URL param
  const [activeMarketType, setActiveMarketType] = useState<MarketType>(() => {
    if (marketTypeParam === "futures") return "futures";
    if (marketTypeParam === "options") return "options";
    if (marketTypeParam === "private") return "private";
    if (marketTypeParam === "secondary") return "secondary";
    return "stock";
  });

  // Sync with URL changes
  useEffect(() => {
    if (marketTypeParam === "futures") setActiveMarketType("futures");
    else if (marketTypeParam === "options") setActiveMarketType("options");
    else if (marketTypeParam === "private") setActiveMarketType("private");
    else if (marketTypeParam === "secondary") setActiveMarketType("secondary");
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
        m.baseAsset.toLowerCase().includes(q),
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

  const hotAssets = useMemo(
    () =>
      [...typeMarkets].sort((a, b) => b.volume24h - a.volume24h).slice(0, 3),
    [typeMarkets],
  );
  const newListings = useMemo(
    () => [...typeMarkets].slice(-3).reverse(),
    [typeMarkets],
  );
  const stats = useMemo(
    () => ({
      totalVolume: filteredMarkets.reduce((sum, m) => sum + m.volume24h, 0),
    }),
    [filteredMarkets],
  );

  const handleMarketClick = (market: Market) => {
    const serviceType =
      market.type === "derivative"
        ? "futures"
        : market.type === "stock"
          ? "stock"
          : market.type;
    navigate(`${appPrefix}/trade/${serviceType}/${market.symbol}`);
  };

  const handleTypeChange = (type: MarketType) => {
    setActiveMarketType(type);
    navigate(`${appPrefix}/markets/${type}`);
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

  if (isSecondaryMarketDetail) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader />
        <SecondaryMarketDetail />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/80">
      <AppHeader />

      {activeMarketType === "private" &&
      config.services.includes("private_markets") ? (
        <PrivateMarket />
      ) : activeMarketType === "secondary" ? (
        <SecondaryMarket />
      ) : (
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Markets</h1>
                <p className="text-gray-500 text-sm">
                  Trade stocks, futures, and derivatives
                </p>
              </div>
            </div>

            {/* Market Type Tabs */}
            <section className="flex items-center gap-2 border-b border-gray-200 pb-4 overflow-x-auto">
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    activeMarketType === type
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  {marketTypeLabels[type].icon}
                  {marketTypeLabels[type].label}
                </button>
              ))}
            </section>

            {/* Top overview cards */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" /> Hot{" "}
                    {marketTypeLabels[activeMarketType].label}
                  </div>
                  <div className="space-y-3">
                    {hotAssets.length > 0 ? (
                      hotAssets.map((m) => (
                        <div
                          key={m.symbol}
                          className="flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-150"
                          onClick={() => handleMarketClick(m)}
                        >
                          <div className="min-w-0">
                            <div className="text-sm text-gray-900 truncate font-medium">
                              {m.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-900 font-medium">
                              ₦{m.price.toFixed(2)}
                            </div>
                            <div
                              className={cn(
                                "text-xs font-medium",
                                m.change24h >= 0
                                  ? "text-emerald-600"
                                  : "text-red-500",
                              )}
                            >
                              {m.change24h >= 0 ? "+" : ""}
                              {m.change24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">
                        No assets available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" /> New listings
                  </div>
                  <div className="space-y-3">
                    {newListings.length > 0 ? (
                      newListings.map((m) => (
                        <div
                          key={m.symbol}
                          className="flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-150"
                          onClick={() => handleMarketClick(m)}
                        >
                          <div className="min-w-0">
                            <div className="text-sm text-gray-900 truncate font-medium">
                              {m.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-900 font-medium">
                              ₦{m.price.toFixed(2)}
                            </div>
                            <div
                              className={cn(
                                "text-xs font-medium",
                                m.change24h >= 0
                                  ? "text-emerald-600"
                                  : "text-red-500",
                              )}
                            >
                              {m.change24h >= 0 ? "+" : ""}
                              {m.change24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No listings</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-3">
                    Market Stats
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Total Volume</div>
                      <div className="text-gray-900 font-semibold text-lg">
                        ₦{(stats.totalVolume / 1_000_000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Active Pairs</div>
                      <div className="text-gray-900 font-semibold text-lg">
                        {typeMarkets.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className="text-sm font-semibold text-gray-900 mb-3">
                    Market Type
                  </div>
                  <div className="flex items-center gap-2">
                    {marketTypeLabels[activeMarketType].icon}
                    <span className="text-gray-900 font-medium">
                      {marketTypeLabels[activeMarketType].label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
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
            <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {(
                  [
                    "all",
                    "top_gainers",
                    "top_losers",
                    "most_active",
                  ] as FilterKey[]
                ).map((filter) => (
                  <Badge
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer whitespace-nowrap transition-colors duration-150",
                      activeFilter === filter
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100",
                    )}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter === "all" && "All"}
                    {filter === "top_gainers" && (
                      <>
                        <TrendingUp className="h-3 w-3 mr-1" /> Gainers
                      </>
                    )}
                    {filter === "top_losers" && (
                      <>
                        <TrendingDown className="h-3 w-3 mr-1" /> Losers
                      </>
                    )}
                    {filter === "most_active" && (
                      <>
                        <Activity className="h-3 w-3 mr-1" /> Active
                      </>
                    )}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Market Table */}
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">
                        Symbol
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">
                        Price
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">
                        24h Change
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">
                        Volume
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">
                        Market Cap
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-600">
                        P/E
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-600">
                        Analyst
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMarkets.map((m) => {
                      const fund = fundamentalsFor(m);
                      return (
                        <tr
                          key={m.symbol}
                          className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors duration-150"
                          onClick={() => handleMarketClick(m)}
                        >
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {m.symbol}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{m.name}</td>
                          <td className="py-3 px-4 text-right font-medium text-gray-900">
                            ₦{m.price.toFixed(2)}
                          </td>
                          <td
                            className={cn(
                              "py-3 px-4 text-right font-medium",
                              m.change24h >= 0
                                ? "text-emerald-600"
                                : "text-red-500",
                            )}
                          >
                            {m.change24h >= 0 ? "+" : ""}
                            {m.change24h.toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ₦{(m.volume24h / 1_000_000).toFixed(1)}M
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ₦{(fund.marketCap / 1_000_000_000).toFixed(1)}B
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {fund.pe.toFixed(1)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                fund.analyst === "Strong buy" &&
                                  "border-emerald-200 text-emerald-700 bg-emerald-50",
                                fund.analyst === "Buy" &&
                                  "border-blue-200 text-blue-700 bg-blue-50",
                                fund.analyst === "Neutral" &&
                                  "border-gray-200 text-gray-600",
                              )}
                            >
                              {fund.analyst}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default MarketsPage;
