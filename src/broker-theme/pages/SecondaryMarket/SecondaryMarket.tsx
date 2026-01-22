/**
 * SECONDARY MARKET PAGE - Light, minimalist design matching reference
 * Clean table-based layout with stats cards
 * Dynamic Fear & Greed with animated gauge, countdown timers
 */

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useBrokerPaths } from "@/broker-theme/hooks/useBrokerPaths";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  BarChart3,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
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
  volumeChange: number;
  totalVolume: number;
  totalVolumeChange: number;
  impliedFDV: string;
  settleTime: string;
  status: "live" | "upcoming" | "ended";
  logoColor: string;
}

const mockTokenData: TokenData[] = [
  {
    id: "1",
    name: "Dangote Cement",
    symbol: "DANGCEM",
    sector: "Industrial",
    lastPrice: 285.5,
    priceChange: 7.32,
    volume24h: 3833500,
    volumeChange: 202.8,
    totalVolume: 21444000,
    totalVolumeChange: 21.8,
    impliedFDV: "₦960B",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-emerald-500",
  },
  {
    id: "2",
    name: "MTN Nigeria",
    symbol: "MTNN",
    sector: "Telecoms",
    lastPrice: 195.2,
    priceChange: 0,
    volume24h: 3612900,
    volumeChange: 471.2,
    totalVolume: 1251047000,
    totalVolumeChange: 0.29,
    impliedFDV: "₦3B",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-amber-500",
  },
  {
    id: "3",
    name: "Access Holdings",
    symbol: "ACCESS",
    sector: "Banking",
    lastPrice: 18.5,
    priceChange: 0,
    volume24h: 210000,
    volumeChange: 0,
    totalVolume: 10458000,
    totalVolumeChange: 2.05,
    impliedFDV: "N/A",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-blue-500",
  },
  {
    id: "4",
    name: "Airtel Africa",
    symbol: "AIRTEL",
    sector: "Telecoms",
    lastPrice: 1850.0,
    priceChange: 0,
    volume24h: 57600,
    volumeChange: 64.6,
    totalVolume: 748600,
    totalVolumeChange: 8.34,
    impliedFDV: "₦100M",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-red-500",
  },
  {
    id: "5",
    name: "Zenith Bank",
    symbol: "ZENITH",
    sector: "Banking",
    lastPrice: 35.8,
    priceChange: 0,
    volume24h: 14000,
    volumeChange: -98.149,
    totalVolume: 46515000,
    totalVolumeChange: 0.03,
    impliedFDV: "N/A",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-purple-500",
  },
  {
    id: "6",
    name: "Seplat Energy",
    symbol: "SEPLAT",
    sector: "Oil & Gas",
    lastPrice: 2450.0,
    priceChange: -1.8,
    volume24h: 26000,
    volumeChange: 0,
    totalVolume: 23497000,
    totalVolumeChange: 0.00011,
    impliedFDV: "₦130M",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-teal-500",
  },
  {
    id: "7",
    name: "BUA Foods",
    symbol: "BUAFOODS",
    sector: "Consumer Goods",
    lastPrice: 142.8,
    priceChange: 0,
    volume24h: 0,
    volumeChange: 0,
    totalVolume: 30000,
    totalVolumeChange: 0,
    impliedFDV: "N/A",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-orange-500",
  },
  {
    id: "8",
    name: "GTBank Holdco",
    symbol: "GTCO",
    sector: "Banking",
    lastPrice: 42.3,
    priceChange: 0,
    volume24h: 0,
    volumeChange: 0,
    totalVolume: 174720,
    totalVolumeChange: 0,
    impliedFDV: "₦69M",
    settleTime: "TBA",
    status: "live",
    logoColor: "bg-pink-500",
  },
  {
    id: "9",
    name: "First Bank Holdings",
    symbol: "FBNH",
    sector: "Banking",
    lastPrice: 22.4,
    priceChange: 3.5,
    volume24h: 112000,
    volumeChange: 15.2,
    totalVolume: 198000,
    totalVolumeChange: 4.1,
    impliedFDV: "₦680B",
    settleTime: "Q2 2025",
    status: "upcoming",
    logoColor: "bg-slate-600",
  },
  {
    id: "10",
    name: "Nestle Nigeria",
    symbol: "NESTLE",
    sector: "Consumer Goods",
    lastPrice: 1285.0,
    priceChange: 6.8,
    volume24h: 345000,
    volumeChange: 28.5,
    totalVolume: 678000,
    totalVolumeChange: 12.3,
    impliedFDV: "₦1.5T",
    settleTime: "TBA",
    status: "upcoming",
    logoColor: "bg-indigo-500",
  },
  {
    id: "11",
    name: "Nigerian Breweries",
    symbol: "NB",
    sector: "Consumer Goods",
    lastPrice: 45.2,
    priceChange: 1.2,
    volume24h: 89000,
    volumeChange: 5.8,
    totalVolume: 156000,
    totalVolumeChange: 2.4,
    impliedFDV: "₦420B",
    settleTime: "Ended",
    status: "ended",
    logoColor: "bg-cyan-500",
  },
  {
    id: "12",
    name: "Oando Plc",
    symbol: "OANDO",
    sector: "Oil & Gas",
    lastPrice: 8.9,
    priceChange: -2.3,
    volume24h: 56000,
    volumeChange: -12.4,
    totalVolume: 89000,
    totalVolumeChange: -5.2,
    impliedFDV: "₦320B",
    settleTime: "Ended",
    status: "ended",
    logoColor: "bg-lime-600",
  },
];

// Mock settlements with countdown
interface Settlement {
  id: string;
  symbol: string;
  name: string;
  settlementDate: Date;
}

const mockSettlements: Settlement[] = [
  {
    id: "s1",
    symbol: "DANGCEM",
    name: "Dangote Cement",
    settlementDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  }, // 2 days
  {
    id: "s2",
    symbol: "MTNN",
    name: "MTN Nigeria",
    settlementDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  }, // 5 days
];

const volumeChartData = generateVolumeData();

// Calculate Fear & Greed based on market data
const calculateFearGreed = (tokens: TokenData[]): number => {
  const avgPriceChange =
    tokens.reduce((sum, t) => sum + t.priceChange, 0) / tokens.length;
  const avgVolumeChange =
    tokens.reduce((sum, t) => sum + t.volumeChange, 0) / tokens.length;

  // Normalize to 0-100 scale
  const priceScore = Math.min(100, Math.max(0, 50 + avgPriceChange * 5));
  const volumeScore = Math.min(100, Math.max(0, 50 + avgVolumeChange * 0.1));

  return Math.round((priceScore + volumeScore) / 2);
};

// Calculate market season score
const calculateMarketSeason = (tokens: TokenData[]): number => {
  const bullishTokens = tokens.filter((t) => t.priceChange > 0).length;
  const score = (bullishTokens / tokens.length) * 100;
  return Math.round(score);
};

// Get Fear & Greed label
const getFearGreedLabel = (value: number): string => {
  if (value <= 20) return "Extreme Fear";
  if (value <= 40) return "Fear";
  if (value <= 60) return "Neutral";
  if (value <= 80) return "Greed";
  return "Extreme Greed";
};

// Calculate gauge needle position (SVG coordinates)
const calculateNeedlePosition = (value: number): { cx: number; cy: number } => {
  // Map 0-100 to angle (180 to 0 degrees, for arc from left to right)
  const angle = Math.PI - (value / 100) * Math.PI;
  const radius = 90;
  const centerX = 100;
  const centerY = 130;

  return {
    cx: centerX + radius * Math.cos(angle),
    cy: centerY - radius * Math.sin(angle),
  };
};

// Format countdown time
const formatCountdown = (ms: number): string => {
  if (ms <= 0) return "Settling now";

  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
};

const SecondaryMarket: React.FC = () => {
  const navigate = useNavigate();
  const { appPrefix } = useBrokerPaths();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "live" | "upcoming" | "ended"
  >("live");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Dynamic values
  const [fearGreedValue, setFearGreedValue] = useState(0);
  const [marketSeasonValue, setMarketSeasonValue] = useState(0);
  const [countdowns, setCountdowns] = useState<Record<string, number>>({});
  const [animatedFearGreed, setAnimatedFearGreed] = useState(0);
  const [animatedMarketSeason, setAnimatedMarketSeason] = useState(0);

  // Calculate dynamic values on mount
  useEffect(() => {
    const targetFearGreed = calculateFearGreed(mockTokenData);
    const targetMarketSeason = calculateMarketSeason(mockTokenData);

    setFearGreedValue(targetFearGreed);
    setMarketSeasonValue(targetMarketSeason);
  }, []);

  // Animate Fear & Greed gauge
  useEffect(() => {
    if (animatedFearGreed < fearGreedValue) {
      const timer = setTimeout(() => {
        setAnimatedFearGreed((prev) => Math.min(prev + 1, fearGreedValue));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [animatedFearGreed, fearGreedValue]);

  // Animate Market Season slider
  useEffect(() => {
    if (animatedMarketSeason < marketSeasonValue) {
      const timer = setTimeout(() => {
        setAnimatedMarketSeason((prev) =>
          Math.min(prev + 1, marketSeasonValue)
        );
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [animatedMarketSeason, marketSeasonValue]);

  // Update countdowns every second
  useEffect(() => {
    const updateCountdowns = () => {
      const now = Date.now();
      const newCountdowns: Record<string, number> = {};
      mockSettlements.forEach((s) => {
        newCountdowns[s.id] = s.settlementDate.getTime() - now;
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredTokens = useMemo(() => {
    let tokens = mockTokenData.filter((t) => t.status === activeFilter);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tokens = tokens.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.symbol.toLowerCase().includes(q) ||
          t.sector.toLowerCase().includes(q)
      );
    }

    if (sortField) {
      tokens.sort((a, b) => {
        let aVal: number, bVal: number;
        switch (sortField) {
          case "price":
            aVal = a.lastPrice;
            bVal = b.lastPrice;
            break;
          case "volume24h":
            aVal = a.volume24h;
            bVal = b.volume24h;
            break;
          case "totalVolume":
            aVal = a.totalVolume;
            bVal = b.totalVolume;
            break;
          default:
            return 0;
        }
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return tokens;
  }, [searchQuery, activeFilter, sortField, sortDirection]);

  const handleTokenClick = (token: TokenData) => {
    navigate(`${appPrefix}/markets/secondary/${token.id}`);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const totalVolume = mockTokenData.reduce((sum, t) => sum + t.volume24h, 0);
  const liveCount = mockTokenData.filter((t) => t.status === "live").length;
  const upcomingCount = mockTokenData.filter(
    (t) => t.status === "upcoming"
  ).length;
  const endedCount = mockTokenData.filter((t) => t.status === "ended").length;

  const formatVolume = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  const SortIcon = ({ field }: { field: string }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp
        className={cn(
          "h-3 w-3 -mb-1",
          sortField === field && sortDirection === "asc"
            ? "text-foreground"
            : "text-muted-foreground/40"
        )}
      />
      <ChevronDown
        className={cn(
          "h-3 w-3",
          sortField === field && sortDirection === "desc"
            ? "text-foreground"
            : "text-muted-foreground/40"
        )}
      />
    </span>
  );

  const needlePosition = calculateNeedlePosition(animatedFearGreed);
  const upcomingSettlement = mockSettlements[0];

  return (
    <div className="flex-1 bg-gray-50/80">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards - Matching reference design */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-auto scroll-smooth md:grid md:grid-cols-2 xl:grid-cols-4 mb-8">
          {/* Pre-market Volume */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">
                Pre-market Vol
              </p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-[28px] font-medium leading-9 text-gray-900">
                  ₦{(totalVolume / 1000000).toFixed(1)}M
                </span>
                <span className="text-xs font-medium text-emerald-600 mb-1">
                  + ₦160.2K
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <ResponsiveContainer width="100%" height={68}>
                  <AreaChart data={volumeChartData.slice(-14)}>
                    <defs>
                      <linearGradient
                        id="volumeGradientSM"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#10b981"
                      strokeWidth={1.5}
                      fill="url(#volumeGradientSM)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Fear & Greed - Animated SVG gauge */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full">
              <p className="text-xs font-medium text-gray-500 mb-3">
                Fear & Greed
              </p>
              <div
                className="relative flex items-center justify-center"
                style={{ marginBottom: "-1rem", marginTop: "-40px" }}
              >
                <svg width="200" height="150" viewBox="0 0 200 140">
                  <defs>
                    <linearGradient
                      id="gaugeGradientRef"
                      x1="100%"
                      y1="0%"
                      x2="0%"
                      y2="0%"
                    >
                      <stop offset="2.5%" stopColor="#16C284" />
                      <stop offset="50%" stopColor="#FDBA74" />
                      <stop offset="97.5%" stopColor="#EC4899" />
                    </linearGradient>
                    <filter
                      id="needleShadow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="3"
                        floodOpacity="0.3"
                      />
                    </filter>
                  </defs>
                  {/* Background arc */}
                  <path
                    d="M 10 130 A 90 90 0 0 1 190 130"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Gradient arc */}
                  <path
                    d="M 10 130 A 90 90 0 0 1 190 130"
                    fill="none"
                    stroke="url(#gaugeGradientRef)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="282.7"
                    strokeDashoffset="0"
                  />
                  {/* Animated needle indicator */}
                  <circle
                    cx={needlePosition.cx}
                    cy={needlePosition.cy}
                    r="8"
                    strokeWidth="3"
                    stroke="white"
                    fill="white"
                    filter="url(#needleShadow)"
                    style={{
                      transition: "cx 0.5s ease-out, cy 0.5s ease-out",
                    }}
                  />
                </svg>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <p className="text-[28px] font-medium leading-9 text-gray-900 transition-all duration-300">
                    {animatedFearGreed}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getFearGreedLabel(animatedFearGreed)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Season - Animated slider */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">
                Market Season
              </p>
              <div className="flex flex-col gap-3 flex-1">
                <div>
                  <span className="text-[28px] font-medium text-gray-900 transition-all duration-300">
                    {animatedMarketSeason}
                  </span>
                  <span className="text-[28px] font-medium text-gray-400">
                    /100
                  </span>
                </div>
                <div className="flex flex-col mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">
                      Bear
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      Bull
                    </span>
                  </div>
                  <div className="relative flex h-5 w-full items-center">
                    <span
                      className="relative h-2 flex-grow rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #e5e7eb 1.44%, #16C284 100%)",
                      }}
                    />
                    <span
                      className="absolute block h-6 w-6 rounded-full border-4 border-white bg-white shadow-md"
                      style={{
                        left: `calc(${animatedMarketSeason}% - 12px)`,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        transition: "left 0.5s ease-out",
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Settlement - With countdown */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">
                Next Settlement
              </p>
              {upcomingSettlement && countdowns[upcomingSettlement.id] ? (
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {upcomingSettlement.symbol}
                      </p>
                      <p className="text-xs text-gray-500">
                        {upcomingSettlement.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[24px] font-bold text-gray-900 tabular-nums">
                        {formatCountdown(countdowns[upcomingSettlement.id])}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        until settlement
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-gray-50/80 text-sm text-gray-500">
                  <p className="font-medium text-sm max-w-[180px] text-center text-gray-700">
                    No markets in upcoming settlements
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={activeFilter === "live" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("live")}
              className={cn(
                "rounded-full px-4 gap-2 transition-colors",
                activeFilter === "live"
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              )}
            >
              <span>Live</span>
              <Badge
                variant="secondary"
                className="bg-white/20 text-current text-xs px-1.5"
              >
                {liveCount}
              </Badge>
            </Button>
            <Button
              variant={activeFilter === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("upcoming")}
              className={cn(
                "rounded-full px-4 gap-2 transition-colors",
                activeFilter === "upcoming"
                  ? "bg-gray-800 hover:bg-gray-900 text-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              )}
            >
              <span>Upcoming</span>
              <Badge
                variant="secondary"
                className="bg-white/20 text-current text-xs px-1.5"
              >
                {upcomingCount}
              </Badge>
            </Button>
            <Button
              variant={activeFilter === "ended" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("ended")}
              className={cn(
                "rounded-full px-4 gap-2 transition-colors",
                activeFilter === "ended"
                  ? "bg-gray-800 hover:bg-gray-900 text-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              )}
            >
              <span>Ended</span>
              <Badge
                variant="secondary"
                className="bg-white/20 text-current text-xs px-1.5"
              >
                {endedCount}
              </Badge>
            </Button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="pl-10 h-9 bg-white border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Markets Table */}
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500">
                    Token
                  </th>
                  <th
                    className="text-right py-4 px-5 text-xs font-medium text-gray-500 cursor-pointer select-none hover:text-gray-700"
                    onClick={() => handleSort("price")}
                  >
                    <span className="inline-flex items-center">
                      Last Price ($) <SortIcon field="price" />
                    </span>
                  </th>
                  <th
                    className="text-right py-4 px-5 text-xs font-medium text-gray-500 cursor-pointer select-none hover:text-gray-700 hidden md:table-cell"
                    onClick={() => handleSort("volume24h")}
                  >
                    <span className="inline-flex items-center">
                      24h Vol. ($) <SortIcon field="volume24h" />
                    </span>
                  </th>
                  <th
                    className="text-right py-4 px-5 text-xs font-medium text-gray-500 cursor-pointer select-none hover:text-gray-700 hidden lg:table-cell"
                    onClick={() => handleSort("totalVolume")}
                  >
                    <span className="inline-flex items-center">
                      Total Vol. ($) <SortIcon field="totalVolume" />
                    </span>
                  </th>
                  <th className="text-right py-4 px-5 text-xs font-medium text-gray-500 hidden xl:table-cell">
                    Implied FDV
                  </th>
                  <th className="text-right py-4 px-5 text-xs font-medium text-gray-500 hidden xl:table-cell">
                    Settle Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token) => (
                  <tr
                    key={token.id}
                    onClick={() => handleTokenClick(token)}
                    className="border-b border-gray-50 hover:bg-gray-50/80 cursor-pointer transition-all duration-150 group"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:scale-110",
                            token.logoColor
                          )}
                        >
                          {token.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900">
                            {token.symbol}
                          </p>
                          <p className="text-xs text-gray-500">{token.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-sm text-gray-900">
                          {token.lastPrice.toLocaleString()}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            token.priceChange > 0
                              ? "text-emerald-600"
                              : token.priceChange < 0
                              ? "text-red-500"
                              : "text-gray-400"
                          )}
                        >
                          {token.priceChange > 0 ? "+" : ""}
                          {token.priceChange}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right hidden md:table-cell">
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-700">
                          {formatVolume(token.volume24h)}
                        </span>
                        <span
                          className={cn(
                            "text-xs",
                            token.volumeChange > 0
                              ? "text-emerald-600"
                              : token.volumeChange < 0
                              ? "text-red-500"
                              : "text-gray-400"
                          )}
                        >
                          {token.volumeChange > 0 ? "+" : ""}
                          {token.volumeChange.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right hidden lg:table-cell">
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-700">
                          {formatVolume(token.totalVolume)}
                        </span>
                        <span
                          className={cn(
                            "text-xs",
                            token.totalVolumeChange > 0
                              ? "text-emerald-600"
                              : token.totalVolumeChange < 0
                              ? "text-red-500"
                              : "text-gray-400"
                          )}
                        >
                          {token.totalVolumeChange > 0 ? "+" : ""}
                          {token.totalVolumeChange.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right hidden xl:table-cell">
                      <span className="text-sm text-gray-700">
                        {token.impliedFDV}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right hidden xl:table-cell">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          token.status === "live" &&
                            "bg-emerald-100 text-emerald-700",
                          token.status === "upcoming" &&
                            "bg-amber-100 text-amber-700",
                          token.status === "ended" &&
                            "bg-gray-100 text-gray-600"
                        )}
                      >
                        {token.settleTime}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTokens.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <p className="text-sm">No markets found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default SecondaryMarket;
