/**
 * SECONDARY MARKET PAGE - Clean, minimalist design
 * Nigerian Pre-market and OTC Securities Trading
 */

import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Filter,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

// Mock volume chart data
const generateVolumeData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      day: i + 1,
      volume: Math.floor(Math.random() * 500000) + 100000,
    });
  }
  return data;
};

// Mock token data with Nigerian securities
interface TokenData {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  lastPrice: number;
  priceChange: number;
  volume24h: number;
  totalVolume: number;
  impliedFDV: string;
  settleTime: string;
  status: "active" | "upcoming" | "settled";
}

const mockTokenData: TokenData[] = [
  { id: "1", name: "Dangote Cement Pre-IPO", symbol: "DANGCEM-P", sector: "Industrial", lastPrice: 285.50, priceChange: 12.5, volume24h: 45600000, totalVolume: 892000000, impliedFDV: "₦4.2T", settleTime: "Mar 2025", status: "active" },
  { id: "2", name: "MTN Nigeria Rights", symbol: "MTNN-R", sector: "Telecoms", lastPrice: 195.20, priceChange: -3.2, volume24h: 32100000, totalVolume: 567000000, impliedFDV: "₦3.8T", settleTime: "Feb 2025", status: "active" },
  { id: "3", name: "BUA Foods Private Placement", symbol: "BUAFOODS-PP", sector: "Consumer Goods", lastPrice: 142.80, priceChange: 8.7, volume24h: 28900000, totalVolume: 445000000, impliedFDV: "₦2.1T", settleTime: "Apr 2025", status: "active" },
  { id: "4", name: "Airtel Africa Pre-IPO", symbol: "AIRTEL-P", sector: "Telecoms", lastPrice: 1850.00, priceChange: 5.2, volume24h: 67800000, totalVolume: 1230000000, impliedFDV: "₦6.5T", settleTime: "TBA", status: "upcoming" },
  { id: "5", name: "Seplat Energy Convertible", symbol: "SEPLAT-CV", sector: "Oil & Gas", lastPrice: 2450.00, priceChange: -1.8, volume24h: 89200000, totalVolume: 1560000000, impliedFDV: "₦1.8T", settleTime: "Q1 2025", status: "active" },
  { id: "6", name: "Access Holdings Rights", symbol: "ACCESS-R", sector: "Banking", lastPrice: 18.50, priceChange: 4.3, volume24h: 12300000, totalVolume: 234000000, impliedFDV: "₦850B", settleTime: "Jan 2025", status: "active" },
  { id: "7", name: "Zenith Bank Private Placement", symbol: "ZENITH-PP", sector: "Banking", lastPrice: 35.80, priceChange: 2.1, volume24h: 19800000, totalVolume: 389000000, impliedFDV: "₦1.2T", settleTime: "Mar 2025", status: "active" },
  { id: "8", name: "GTBank Holdco Convertible", symbol: "GTCO-CV", sector: "Banking", lastPrice: 42.30, priceChange: -0.5, volume24h: 15600000, totalVolume: 298000000, impliedFDV: "₦980B", settleTime: "Feb 2025", status: "active" },
  { id: "9", name: "Nestle Nigeria Pre-IPO", symbol: "NESTLE-P", sector: "Consumer Goods", lastPrice: 1285.00, priceChange: 6.8, volume24h: 34500000, totalVolume: 678000000, impliedFDV: "₦1.5T", settleTime: "TBA", status: "upcoming" },
  { id: "10", name: "Nigerian Breweries Rights", symbol: "NB-R", sector: "Consumer Goods", lastPrice: 45.20, priceChange: 1.2, volume24h: 8900000, totalVolume: 156000000, impliedFDV: "₦420B", settleTime: "Q2 2025", status: "active" },
  { id: "11", name: "First Bank Holdings PP", symbol: "FBNH-PP", sector: "Banking", lastPrice: 22.40, priceChange: 3.5, volume24h: 11200000, totalVolume: 198000000, impliedFDV: "₦680B", settleTime: "Apr 2025", status: "active" },
  { id: "12", name: "Oando Energy Pre-IPO", symbol: "OANDO-P", sector: "Oil & Gas", lastPrice: 8.90, priceChange: -2.3, volume24h: 5600000, totalVolume: 89000000, impliedFDV: "₦320B", settleTime: "TBA", status: "upcoming" },
];

// Recent activity data
interface ActivityData {
  id: string;
  time: string;
  orderType: "Open" | "Filled";
  side: "Buy" | "Sell";
  symbol: string;
  pair: string;
  price: number;
  amount: number;
  collateral: number;
}

const mockActivityData: ActivityData[] = [
  { id: "1", time: "2m ago", orderType: "Filled", side: "Buy", symbol: "DANGCEM-P", pair: "DANGCEM-P/NGN", price: 285.50, amount: 5000, collateral: 1427500 },
  { id: "2", time: "5m ago", orderType: "Open", side: "Sell", symbol: "MTNN-R", pair: "MTNN-R/NGN", price: 198.00, amount: 10000, collateral: 1980000 },
  { id: "3", time: "12m ago", orderType: "Filled", side: "Buy", symbol: "SEPLAT-CV", pair: "SEPLAT-CV/NGN", price: 2445.00, amount: 200, collateral: 489000 },
  { id: "4", time: "18m ago", orderType: "Open", side: "Buy", symbol: "ACCESS-R", pair: "ACCESS-R/NGN", price: 18.20, amount: 50000, collateral: 910000 },
  { id: "5", time: "25m ago", orderType: "Filled", side: "Sell", symbol: "BUAFOODS-PP", pair: "BUAFOODS-PP/NGN", price: 143.50, amount: 3000, collateral: 430500 },
];

const volumeChartData = generateVolumeData();

const SecondaryMarket: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "upcoming">("all");
  const [activeTab, setActiveTab] = useState<"markets" | "activity">("markets");

  const routePrefix = location.pathname.includes("/preview/app") ? "/preview/app" : "/app";

  const filteredTokens = useMemo(() => {
    let tokens = mockTokenData;
    
    if (activeFilter !== "all") {
      tokens = tokens.filter(t => t.status === activeFilter);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tokens = tokens.filter(
        t => t.name.toLowerCase().includes(q) || 
             t.symbol.toLowerCase().includes(q) ||
             t.sector.toLowerCase().includes(q)
      );
    }
    
    return tokens;
  }, [searchQuery, activeFilter]);

  const handleTokenClick = (token: TokenData) => {
    navigate(`${routePrefix}/markets/secondary/${token.id}`);
  };

  const totalVolume = mockTokenData.reduce((sum, t) => sum + t.volume24h, 0);
  const activeMarkets = mockTokenData.filter(t => t.status === "active").length;

  return (
    <div className="flex-1 px-4 md:px-6 py-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pre-market Volume */}
        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Pre-market Volume</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                ₦{(totalVolume / 1000000).toFixed(1)}M
              </span>
              <span className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                12.5%
              </span>
            </div>
            <div className="h-12 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeChartData.slice(-14)}>
                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="hsl(var(--primary))"
                    strokeWidth={1.5}
                    fill="url(#volumeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Sentiment */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Market Sentiment</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">67</span>
              <span className="text-sm text-green-500">Bullish</span>
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">Fear</span>
              <span className="text-[10px] text-muted-foreground">Greed</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Markets */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Active Markets</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{activeMarkets}</span>
              <span className="text-xs text-muted-foreground">of {mockTokenData.length}</span>
            </div>
            <div className="mt-3 flex gap-1">
              {mockTokenData.slice(0, 8).map((t, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-6 rounded text-[9px] flex items-center justify-center font-medium",
                    t.priceChange >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}
                >
                  {t.priceChange >= 0 ? "+" : ""}{t.priceChange.toFixed(0)}%
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Settlement */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Next Settlement</span>
            </div>
            <div className="text-lg font-bold text-foreground">Jan 2025</div>
            <p className="text-xs text-muted-foreground mt-1">ACCESS-R Rights Issue</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-primary">
              <span>View calendar</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="markets" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Markets
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="h-4 w-4" />
                Activity
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search markets..."
                className="pl-10 w-64 h-9 bg-card border-border"
              />
            </div>
            <div className="flex gap-1">
              {(["all", "active", "upcoming"] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="capitalize text-xs"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Markets Tab Content */}
        {activeTab === "markets" && (
          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground">Token</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground">Last Price</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">24h Change</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">24h Volume</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground hidden lg:table-cell">Implied FDV</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">Settlement</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTokens.map((token) => (
                    <tr
                      key={token.id}
                      onClick={() => handleTokenClick(token)}
                      className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {token.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{token.symbol}</p>
                            <p className="text-xs text-muted-foreground">{token.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4">
                        <span className="font-medium text-foreground">
                          ₦{token.lastPrice.toLocaleString()}
                        </span>
                      </td>
                      <td className="text-right py-4 px-4 hidden md:table-cell">
                        <span className={cn(
                          "flex items-center justify-end gap-1 font-medium",
                          token.priceChange >= 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {token.priceChange >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {token.priceChange >= 0 ? "+" : ""}{token.priceChange.toFixed(2)}%
                        </span>
                      </td>
                      <td className="text-right py-4 px-4 hidden lg:table-cell">
                        <span className="text-muted-foreground">
                          ₦{(token.volume24h / 1000000).toFixed(1)}M
                        </span>
                      </td>
                      <td className="text-right py-4 px-4 hidden lg:table-cell">
                        <span className="text-muted-foreground">{token.impliedFDV}</span>
                      </td>
                      <td className="text-right py-4 px-4 hidden md:table-cell">
                        <span className="text-muted-foreground text-sm">{token.settleTime}</span>
                      </td>
                      <td className="text-right py-4 px-4">
                        <Badge variant={token.status === "active" ? "default" : "secondary"} className="capitalize">
                          {token.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Activity Tab Content */}
        {activeTab === "activity" && (
          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground">Time</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground">Side</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground">Pair</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground">Price</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {mockActivityData.map((activity) => (
                    <tr key={activity.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 text-sm text-muted-foreground">{activity.time}</td>
                      <td className="py-4 px-4">
                        <Badge variant={activity.orderType === "Filled" ? "default" : "outline"}>
                          {activity.orderType}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className={cn(
                          "flex items-center gap-1 font-medium text-sm",
                          activity.side === "Buy" ? "text-green-500" : "text-red-500"
                        )}>
                          {activity.side === "Buy" ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {activity.side}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-foreground text-sm">{activity.pair}</span>
                      </td>
                      <td className="text-right py-4 px-4 font-mono text-sm text-foreground">
                        ₦{activity.price.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-4 text-sm text-muted-foreground">
                        {activity.amount.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-4 font-medium text-foreground text-sm">
                        ₦{activity.collateral.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SecondaryMarket;
