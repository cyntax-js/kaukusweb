/**
 * SECONDARY MARKET PAGE - Light, minimalist design matching reference
 * Clean table-based layout with stats cards
 */

import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  AreaChart,
  Area,
  ResponsiveContainer,
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
  volumeChange: number;
  totalVolume: number;
  totalVolumeChange: number;
  impliedFDV: string;
  settleTime: string;
  status: "live" | "upcoming" | "ended";
  logoColor: string;
}

const mockTokenData: TokenData[] = [
  { id: "1", name: "Dangote Cement", symbol: "DANGCEM", sector: "Industrial", lastPrice: 285.50, priceChange: 7.32, volume24h: 3833500, volumeChange: 202.8, totalVolume: 21444000, totalVolumeChange: 21.8, impliedFDV: "₦960B", settleTime: "TBA", status: "live", logoColor: "bg-emerald-500" },
  { id: "2", name: "MTN Nigeria", symbol: "MTNN", sector: "Telecoms", lastPrice: 195.20, priceChange: 0, volume24h: 3612900, volumeChange: 471.2, totalVolume: 1251047000, totalVolumeChange: 0.29, impliedFDV: "₦3B", settleTime: "TBA", status: "live", logoColor: "bg-amber-500" },
  { id: "3", name: "Access Holdings", symbol: "ACCESS", sector: "Banking", lastPrice: 18.50, priceChange: 0, volume24h: 210000, volumeChange: 0, totalVolume: 10458000, totalVolumeChange: 2.05, impliedFDV: "N/A", settleTime: "TBA", status: "live", logoColor: "bg-blue-500" },
  { id: "4", name: "Airtel Africa", symbol: "AIRTEL", sector: "Telecoms", lastPrice: 1850.00, priceChange: 0, volume24h: 57600, volumeChange: 64.6, totalVolume: 748600, totalVolumeChange: 8.34, impliedFDV: "₦100M", settleTime: "TBA", status: "live", logoColor: "bg-red-500" },
  { id: "5", name: "Zenith Bank", symbol: "ZENITH", sector: "Banking", lastPrice: 35.80, priceChange: 0, volume24h: 14000, volumeChange: -98.149, totalVolume: 46515000, totalVolumeChange: 0.03, impliedFDV: "N/A", settleTime: "TBA", status: "live", logoColor: "bg-purple-500" },
  { id: "6", name: "Seplat Energy", symbol: "SEPLAT", sector: "Oil & Gas", lastPrice: 2450.00, priceChange: -1.8, volume24h: 26000, volumeChange: 0, totalVolume: 23497000, totalVolumeChange: 0.00011, impliedFDV: "₦130M", settleTime: "TBA", status: "live", logoColor: "bg-teal-500" },
  { id: "7", name: "BUA Foods", symbol: "BUAFOODS", sector: "Consumer Goods", lastPrice: 142.80, priceChange: 0, volume24h: 0, volumeChange: 0, totalVolume: 30000, totalVolumeChange: 0, impliedFDV: "N/A", settleTime: "TBA", status: "live", logoColor: "bg-orange-500" },
  { id: "8", name: "GTBank Holdco", symbol: "GTCO", sector: "Banking", lastPrice: 42.30, priceChange: 0, volume24h: 0, volumeChange: 0, totalVolume: 174720, totalVolumeChange: 0, impliedFDV: "₦69M", settleTime: "TBA", status: "live", logoColor: "bg-pink-500" },
  { id: "9", name: "First Bank Holdings", symbol: "FBNH", sector: "Banking", lastPrice: 22.40, priceChange: 3.5, volume24h: 112000, volumeChange: 15.2, totalVolume: 198000, totalVolumeChange: 4.1, impliedFDV: "₦680B", settleTime: "Q2 2025", status: "upcoming", logoColor: "bg-slate-600" },
  { id: "10", name: "Nestle Nigeria", symbol: "NESTLE", sector: "Consumer Goods", lastPrice: 1285.00, priceChange: 6.8, volume24h: 345000, volumeChange: 28.5, totalVolume: 678000, totalVolumeChange: 12.3, impliedFDV: "₦1.5T", settleTime: "TBA", status: "upcoming", logoColor: "bg-indigo-500" },
  { id: "11", name: "Nigerian Breweries", symbol: "NB", sector: "Consumer Goods", lastPrice: 45.20, priceChange: 1.2, volume24h: 89000, volumeChange: 5.8, totalVolume: 156000, totalVolumeChange: 2.4, impliedFDV: "₦420B", settleTime: "Ended", status: "ended", logoColor: "bg-cyan-500" },
  { id: "12", name: "Oando Plc", symbol: "OANDO", sector: "Oil & Gas", lastPrice: 8.90, priceChange: -2.3, volume24h: 56000, volumeChange: -12.4, totalVolume: 89000, totalVolumeChange: -5.2, impliedFDV: "₦320B", settleTime: "Ended", status: "ended", logoColor: "bg-lime-600" },
];

const volumeChartData = generateVolumeData();

const SecondaryMarket: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"live" | "upcoming" | "ended">("live");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const routePrefix = location.pathname.includes("/preview/app") ? "/preview/app" : "/app";

  const filteredTokens = useMemo(() => {
    let tokens = mockTokenData.filter(t => t.status === activeFilter);
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tokens = tokens.filter(
        t => t.name.toLowerCase().includes(q) || 
             t.symbol.toLowerCase().includes(q) ||
             t.sector.toLowerCase().includes(q)
      );
    }

    if (sortField) {
      tokens.sort((a, b) => {
        let aVal: number, bVal: number;
        switch (sortField) {
          case "price": aVal = a.lastPrice; bVal = b.lastPrice; break;
          case "volume24h": aVal = a.volume24h; bVal = b.volume24h; break;
          case "totalVolume": aVal = a.totalVolume; bVal = b.totalVolume; break;
          default: return 0;
        }
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      });
    }
    
    return tokens;
  }, [searchQuery, activeFilter, sortField, sortDirection]);

  const handleTokenClick = (token: TokenData) => {
    navigate(`${routePrefix}/markets/secondary/${token.id}`);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const totalVolume = mockTokenData.reduce((sum, t) => sum + t.volume24h, 0);
  const liveCount = mockTokenData.filter(t => t.status === "live").length;
  const upcomingCount = mockTokenData.filter(t => t.status === "upcoming").length;
  const endedCount = mockTokenData.filter(t => t.status === "ended").length;

  const formatVolume = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  const SortIcon = ({ field }: { field: string }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp className={cn("h-3 w-3 -mb-1", sortField === field && sortDirection === "asc" ? "text-foreground" : "text-muted-foreground/40")} />
      <ChevronDown className={cn("h-3 w-3", sortField === field && sortDirection === "desc" ? "text-foreground" : "text-muted-foreground/40")} />
    </span>
  );

  return (
    <div className="flex-1 bg-gray-50/80">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards - Matching reference design */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-auto scroll-smooth md:grid md:grid-cols-2 xl:grid-cols-4 mb-8">
          {/* Pre-market Volume */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">Pre-market Vol</p>
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
                      <linearGradient id="volumeGradientSM" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
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

          {/* Fear & Greed - Exact SVG from reference */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full">
              <p className="text-xs font-medium text-gray-500 mb-3">Fear & Greed</p>
              <div className="relative flex items-center justify-center" style={{ marginBottom: '-1rem' }}>
                <svg width="160" height="100" viewBox="0 0 200 140">
                  <defs>
                    <linearGradient id="gaugeGradientRef" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="2.5%" stopColor="#16C284" />
                      <stop offset="50%" stopColor="#FDBA74" />
                      <stop offset="97.5%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 130 A 90 90 0 0 1 190 130"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 130 A 90 90 0 0 1 190 130"
                    fill="none"
                    stroke="url(#gaugeGradientRef)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="282.7"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="74.89"
                    cy="43.57"
                    r="8"
                    strokeWidth="3"
                    stroke="white"
                    fill="white"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                  />
                </svg>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <p className="text-[28px] font-medium leading-9 text-gray-900">41</p>
                  <p className="text-xs text-gray-500">Neutral</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Season - Slider style from reference */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">Market Season</p>
              <div className="flex flex-col gap-3 flex-1">
                <div>
                  <span className="text-[28px] font-medium text-gray-900">36</span>
                  <span className="text-[28px] font-medium text-gray-400">/100</span>
                </div>
                <div className="flex flex-col mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">Bear</span>
                    <span className="text-xs font-medium text-gray-700">Bull</span>
                  </div>
                  <div className="relative flex h-5 w-full items-center">
                    <span 
                      className="relative h-2 flex-grow rounded-full"
                      style={{ background: 'linear-gradient(90deg, #e5e7eb 1.44%, #16C284 100%)' }}
                    />
                    <span 
                      className="absolute block h-6 w-6 rounded-full border-4 border-white bg-white shadow-md"
                      style={{ 
                        left: 'calc(36% - 12px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Settlement */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">Next Settlement</p>
              <div className="flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-gray-50/80 text-sm text-gray-500">
                <p className="font-medium text-sm max-w-[180px] text-center text-gray-700">
                  No markets in upcoming settlements
                </p>
              </div>
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
                "rounded-full px-4 gap-2",
                activeFilter === "live" 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              )}
            >
              <span>Live</span>
              <Badge variant="secondary" className="bg-white/20 text-current text-xs px-1.5">
                {liveCount}
              </Badge>
            </Button>
            <Button
              variant={activeFilter === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("upcoming")}
              className={cn(
                "rounded-full px-4 gap-2",
                activeFilter === "upcoming" 
                  ? "bg-gray-800 hover:bg-gray-900 text-white" 
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              )}
            >
              <span>Upcoming</span>
              <Badge variant="secondary" className="bg-white/20 text-current text-xs px-1.5">
                {upcomingCount}
              </Badge>
            </Button>
            <Button
              variant={activeFilter === "ended" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("ended")}
              className={cn(
                "rounded-full px-4 gap-2",
                activeFilter === "ended" 
                  ? "bg-gray-800 hover:bg-gray-900 text-white" 
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              )}
            >
              <span>Ended</span>
              <Badge variant="secondary" className="bg-white/20 text-current text-xs px-1.5">
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
                  <th className="text-left py-4 px-5 text-xs font-medium text-gray-500">Token</th>
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
                  <th className="text-right py-4 px-5 text-xs font-medium text-gray-500 hidden lg:table-cell">Implied FDV ($)</th>
                  <th className="text-right py-4 px-5 text-xs font-medium text-gray-500 hidden md:table-cell">Settle Time (UTC)</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token, index) => (
                  <tr
                    key={token.id}
                    onClick={() => handleTokenClick(token)}
                    className="border-b border-gray-50 hover:bg-gray-50/80 cursor-pointer transition-all duration-150 group"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold transition-transform duration-150 group-hover:scale-105",
                          token.logoColor
                        )}>
                          {token.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{token.symbol}</p>
                          <p className="text-xs text-gray-500">{token.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-5">
                      <div>
                        <span className="font-medium text-gray-900 text-sm">
                          ₦{token.lastPrice.toLocaleString()}
                        </span>
                        <div className={cn(
                          "text-xs font-medium",
                          token.priceChange >= 0 ? "text-emerald-600" : "text-red-500"
                        )}>
                          {token.priceChange >= 0 ? "+" : ""}{token.priceChange.toFixed(2)}%
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-5 hidden md:table-cell">
                      <div>
                        <span className="text-gray-700 text-sm">{formatVolume(token.volume24h)}</span>
                        <div className={cn(
                          "text-xs font-medium",
                          token.volumeChange >= 0 ? "text-emerald-600" : "text-red-500"
                        )}>
                          {token.volumeChange >= 0 ? "+" : ""}{token.volumeChange.toFixed(1)}%
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-5 hidden lg:table-cell">
                      <div>
                        <span className="text-gray-700 text-sm">{formatVolume(token.totalVolume)}</span>
                        <div className={cn(
                          "text-xs font-medium",
                          token.totalVolumeChange >= 0 ? "text-emerald-600" : "text-red-500"
                        )}>
                          {token.totalVolumeChange >= 0 ? "+" : ""}{token.totalVolumeChange.toFixed(2)}%
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-5 text-gray-600 text-sm hidden lg:table-cell">
                      {token.impliedFDV}
                    </td>
                    <td className="text-right py-4 px-5 text-gray-600 text-sm hidden md:table-cell">
                      {token.settleTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default SecondaryMarket;
