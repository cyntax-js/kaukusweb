/**
 * OTC DESK MARKET PAGE - Grid layout matching Secondary Market
 * P2P style high-volume trading with watchlist feature
 */

import React, { useState, useMemo, useEffect } from "react";
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
  Building2,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Star,
  Bell,
  Heart,
  Filter,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/broker-theme/components";
import { toast } from "sonner";

// Mock volume chart data
const generateVolumeData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      day: i + 1,
      volume: Math.floor(Math.random() * 50000000) + 10000000,
    });
  }
  return data;
};

interface DealerOffer {
  id: string;
  dealerName: string;
  dealerCode: string;
  symbol: string;
  assetName: string;
  side: "buy" | "sell";
  quantity: number;
  availableQuantity: number;
  pricePerUnit: number;
  minQuantity: number;
  isBargainable: boolean;
  expiresAt: Date;
  logoColor: string;
  volume24h: number;
  volumeChange: number;
  totalVolume: number;
  totalVolumeChange: number;
  sector: string;
  dealerRating: number;
  completedTrades: number;
}

// Extended mock data with more offers
const mockDealerOffers: DealerOffer[] = [
  {
    id: "do1",
    dealerName: "Continental Dealers Ltd",
    dealerCode: "CONTDL",
    symbol: "DANGCEM",
    assetName: "Dangote Cement Plc",
    side: "sell",
    quantity: 500000,
    availableQuantity: 350000,
    pricePerUnit: 248.5,
    minQuantity: 50000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 604800000),
    logoColor: "bg-emerald-500",
    volume24h: 12450000,
    volumeChange: 45.2,
    totalVolume: 87320000,
    totalVolumeChange: 12.8,
    sector: "Industrial",
    dealerRating: 4.9,
    completedTrades: 1250,
  },
  {
    id: "do2",
    dealerName: "Prime Capital Markets",
    dealerCode: "PCM",
    symbol: "GTCO",
    assetName: "Guaranty Trust Holding Co",
    side: "sell",
    quantity: 1000000,
    availableQuantity: 1000000,
    pricePerUnit: 42.3,
    minQuantity: 100000,
    isBargainable: false,
    expiresAt: new Date(Date.now() + 432000000),
    logoColor: "bg-pink-500",
    volume24h: 8230000,
    volumeChange: -12.5,
    totalVolume: 42300000,
    totalVolumeChange: 8.2,
    sector: "Banking",
    dealerRating: 4.7,
    completedTrades: 890,
  },
  {
    id: "do3",
    dealerName: "Continental Dealers Ltd",
    dealerCode: "CONTDL",
    symbol: "MTNN",
    assetName: "MTN Nigeria Communications",
    side: "buy",
    quantity: 200000,
    availableQuantity: 120000,
    pricePerUnit: 192.0,
    minQuantity: 20000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 259200000),
    logoColor: "bg-amber-500",
    volume24h: 23040000,
    volumeChange: 78.3,
    totalVolume: 115200000,
    totalVolumeChange: 23.1,
    sector: "Telecoms",
    dealerRating: 4.9,
    completedTrades: 1250,
  },
  {
    id: "do4",
    dealerName: "Heritage Securities",
    dealerCode: "HERISEC",
    symbol: "ZENITH",
    assetName: "Zenith Bank Plc",
    side: "sell",
    quantity: 750000,
    availableQuantity: 750000,
    pricePerUnit: 39.0,
    minQuantity: 75000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 518400000),
    logoColor: "bg-purple-500",
    volume24h: 5850000,
    volumeChange: 15.8,
    totalVolume: 29250000,
    totalVolumeChange: 5.6,
    sector: "Banking",
    dealerRating: 4.6,
    completedTrades: 720,
  },
  {
    id: "do5",
    dealerName: "Prime Capital Markets",
    dealerCode: "PCM",
    symbol: "UBA",
    assetName: "United Bank for Africa",
    side: "buy",
    quantity: 2000000,
    availableQuantity: 1500000,
    pricePerUnit: 22.8,
    minQuantity: 200000,
    isBargainable: false,
    expiresAt: new Date(Date.now() + 172800000),
    logoColor: "bg-blue-500",
    volume24h: 4560000,
    volumeChange: -5.2,
    totalVolume: 34200000,
    totalVolumeChange: 2.1,
    sector: "Banking",
    dealerRating: 4.7,
    completedTrades: 890,
  },
  {
    id: "do6",
    dealerName: "Heritage Securities",
    dealerCode: "HERISEC",
    symbol: "AIRTEL",
    assetName: "Airtel Africa Plc",
    side: "sell",
    quantity: 100000,
    availableQuantity: 100000,
    pricePerUnit: 1875.0,
    minQuantity: 10000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 691200000),
    logoColor: "bg-red-500",
    volume24h: 18750000,
    volumeChange: 32.4,
    totalVolume: 187500000,
    totalVolumeChange: 18.9,
    sector: "Telecoms",
    dealerRating: 4.6,
    completedTrades: 720,
  },
  {
    id: "do7",
    dealerName: "Vista Capital",
    dealerCode: "VCAP",
    symbol: "SEPLAT",
    assetName: "Seplat Energy Plc",
    side: "sell",
    quantity: 80000,
    availableQuantity: 80000,
    pricePerUnit: 2450.0,
    minQuantity: 5000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 864000000),
    logoColor: "bg-teal-500",
    volume24h: 19600000,
    volumeChange: 28.1,
    totalVolume: 196000000,
    totalVolumeChange: 15.2,
    sector: "Oil & Gas",
    dealerRating: 4.8,
    completedTrades: 560,
  },
  {
    id: "do8",
    dealerName: "Heritage Securities",
    dealerCode: "HERISEC",
    symbol: "ACCESS",
    assetName: "Access Holdings Plc",
    side: "buy",
    quantity: 500000,
    availableQuantity: 500000,
    pricePerUnit: 18.5,
    minQuantity: 50000,
    isBargainable: false,
    expiresAt: new Date(Date.now() + 345600000),
    logoColor: "bg-blue-600",
    volume24h: 9250000,
    volumeChange: 88.2,
    totalVolume: 9250000,
    totalVolumeChange: 100,
    sector: "Banking",
    dealerRating: 4.6,
    completedTrades: 720,
  },
  {
    id: "do9",
    dealerName: "Apex Securities",
    dealerCode: "APEX",
    symbol: "NESTLE",
    assetName: "Nestle Nigeria Plc",
    side: "sell",
    quantity: 50000,
    availableQuantity: 50000,
    pricePerUnit: 1285.0,
    minQuantity: 5000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 518400000),
    logoColor: "bg-indigo-500",
    volume24h: 6425000,
    volumeChange: 12.3,
    totalVolume: 64250000,
    totalVolumeChange: 8.7,
    sector: "Consumer Goods",
    dealerRating: 4.5,
    completedTrades: 430,
  },
  {
    id: "do10",
    dealerName: "Vista Capital",
    dealerCode: "VCAP",
    symbol: "BUAFOODS",
    assetName: "BUA Foods Plc",
    side: "buy",
    quantity: 300000,
    availableQuantity: 300000,
    pricePerUnit: 142.8,
    minQuantity: 30000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 604800000),
    logoColor: "bg-orange-500",
    volume24h: 4284000,
    volumeChange: 5.6,
    totalVolume: 42840000,
    totalVolumeChange: 3.2,
    sector: "Consumer Goods",
    dealerRating: 4.8,
    completedTrades: 560,
  },
  {
    id: "do11",
    dealerName: "Continental Dealers Ltd",
    dealerCode: "CONTDL",
    symbol: "FBNH",
    assetName: "First Bank Holdings",
    side: "sell",
    quantity: 800000,
    availableQuantity: 800000,
    pricePerUnit: 22.4,
    minQuantity: 80000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 432000000),
    logoColor: "bg-slate-600",
    volume24h: 17920000,
    volumeChange: 42.1,
    totalVolume: 179200000,
    totalVolumeChange: 21.5,
    sector: "Banking",
    dealerRating: 4.9,
    completedTrades: 1250,
  },
  {
    id: "do12",
    dealerName: "Apex Securities",
    dealerCode: "APEX",
    symbol: "OANDO",
    assetName: "Oando Plc",
    side: "buy",
    quantity: 1500000,
    availableQuantity: 1500000,
    pricePerUnit: 8.9,
    minQuantity: 150000,
    isBargainable: false,
    expiresAt: new Date(Date.now() + 259200000),
    logoColor: "bg-lime-600",
    volume24h: 13350000,
    volumeChange: -8.4,
    totalVolume: 133500000,
    totalVolumeChange: 6.1,
    sector: "Oil & Gas",
    dealerRating: 4.5,
    completedTrades: 430,
  },
];

const volumeChartData = generateVolumeData();

// Calculate OTC Market Score
const calculateOTCScore = (offers: DealerOffer[]): number => {
  const avgVolumeChange =
    offers.reduce((sum, o) => sum + o.volumeChange, 0) / offers.length;
  const bargainableRatio =
    offers.filter((o) => o.isBargainable).length / offers.length;
  const score = Math.min(
    100,
    Math.max(0, 50 + avgVolumeChange * 0.3 + bargainableRatio * 20)
  );
  return Math.round(score);
};

const getOTCScoreLabel = (value: number): string => {
  if (value <= 20) return "Very Low Activity";
  if (value <= 40) return "Low Activity";
  if (value <= 60) return "Moderate";
  if (value <= 80) return "High Activity";
  return "Very High Activity";
};

const calculateNeedlePosition = (value: number): { cx: number; cy: number } => {
  const angle = Math.PI - (value / 100) * Math.PI;
  const radius = 90;
  const centerX = 100;
  const centerY = 130;
  return {
    cx: centerX + radius * Math.cos(angle),
    cy: centerY - radius * Math.sin(angle),
  };
};

const OTCDex: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sideFilter, setSideFilter] = useState<"all" | "buy" | "sell">("all");
  const [otcScore, setOtcScore] = useState(0);
  const [animatedOtcScore, setAnimatedOtcScore] = useState(0);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  const routePrefix = location.pathname.includes("/preview/app")
    ? "/preview/app"
    : "/app";

  useEffect(() => {
    const targetScore = calculateOTCScore(mockDealerOffers);
    setOtcScore(targetScore);
    // Load watchlist from localStorage
    const saved = localStorage.getItem("otc-watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (animatedOtcScore < otcScore) {
      const timer = setTimeout(() => {
        setAnimatedOtcScore((prev) => Math.min(prev + 1, otcScore));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [animatedOtcScore, otcScore]);

  const toggleWatchlist = (offerId: string) => {
    setWatchlist((prev) => {
      const newWatchlist = prev.includes(offerId)
        ? prev.filter((id) => id !== offerId)
        : [...prev, offerId];
      localStorage.setItem("otc-watchlist", JSON.stringify(newWatchlist));

      if (newWatchlist.includes(offerId)) {
        toast.success("Added to watchlist", {
          description: "You'll receive alerts for price changes",
        });
      } else {
        toast.info("Removed from watchlist");
      }

      return newWatchlist;
    });
  };

  const filteredOffers = useMemo(() => {
    let offers = [...mockDealerOffers];

    if (showWatchlistOnly) {
      offers = offers.filter((o) => watchlist.includes(o.id));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      offers = offers.filter(
        (o) =>
          o.assetName.toLowerCase().includes(q) ||
          o.symbol.toLowerCase().includes(q) ||
          o.dealerName.toLowerCase().includes(q) ||
          o.sector.toLowerCase().includes(q)
      );
    }

    if (sideFilter !== "all") {
      offers = offers.filter((o) => o.side === sideFilter);
    }

    return offers;
  }, [searchQuery, sideFilter, showWatchlistOnly, watchlist]);

  const handleOfferClick = (offer: DealerOffer) => {
    navigate(`${routePrefix}/otc-desk/${offer.id}`);
  };

  const totalVolume = mockDealerOffers.reduce((sum, o) => sum + o.volume24h, 0);
  const totalOffers = mockDealerOffers.length;
  const bargainableCount = mockDealerOffers.filter(
    (o) => o.isBargainable
  ).length;
  const activeDealers = new Set(mockDealerOffers.map((o) => o.dealerCode)).size;

  const formatVolume = (val: number) => {
    if (val >= 1000000) return `₦${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `₦${(val / 1000).toFixed(1)}K`;
    return `₦${val.toLocaleString()}`;
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(val);
  };

  const needlePosition = calculateNeedlePosition(animatedOtcScore);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/80">
      <AppHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">OTC DESK</h1>
          <p className="text-gray-500 mt-1">
            High-volume P2P trading with institutional dealers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {/* OTC Volume */}
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-40 flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">
                OTC Volume (24h)
              </p>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeChartData}>
                    <defs>
                      <linearGradient id="colorOTC" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#colorOTC)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatVolume(totalVolume)}
                </span>
                <span className="text-xs text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +34.2%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* OTC Market Activity Gauge */}
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-40 flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Market Activity
              </p>
              <svg viewBox="0 0 200 140" className="w-32 h-20">
                <path
                  d="M 20 130 A 90 90 0 0 1 180 130"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 130 A 90 90 0 0 1 180 130"
                  fill="none"
                  stroke="url(#otcGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedOtcScore / 100) * 283} 283`}
                />
                <defs>
                  <linearGradient
                    id="otcGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="25%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="75%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <circle
                  cx={needlePosition.cx}
                  cy={needlePosition.cy}
                  r="6"
                  fill="#1f2937"
                />
                <line
                  x1="100"
                  y1="130"
                  x2={needlePosition.cx}
                  y2={needlePosition.cy}
                  stroke="#1f2937"
                  strokeWidth="2"
                />
                <circle cx="100" cy="130" r="4" fill="#1f2937" />
              </svg>
              <div className="text-center mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  {animatedOtcScore}
                </span>
                <p className="text-xs text-gray-500">
                  {getOTCScoreLabel(animatedOtcScore)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Offers & Dealers */}
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-40 flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">
                Market Stats
              </p>
              <div className="flex-1 flex flex-col justify-center space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-gray-600">Active Offers</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {totalOffers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      Active Dealers
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {activeDealers}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Negotiable Offers */}
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-40 flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">
                Negotiable Offers
              </p>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-amber-500" />
                    <span className="text-3xl font-bold text-gray-900">
                      {bargainableCount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    of {totalOffers} total offers
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${(bargainableCount / totalOffers) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search offers, dealers, securities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Watchlist Toggle */}
            <Button
              variant={showWatchlistOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
              className="rounded-full"
            >
              <Star
                className={cn(
                  "h-4 w-4 mr-2",
                  showWatchlistOnly && "fill-current"
                )}
              />
              Watchlist ({watchlist.length})
            </Button>

            {/* Side Filter */}
            <div className="flex bg-white rounded-full border border-gray-200 p-1">
              {(["all", "buy", "sell"] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setSideFilter(side)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                    sideFilter === side
                      ? side === "buy"
                        ? "bg-emerald-500 text-white"
                        : side === "sell"
                        ? "bg-red-500 text-white"
                        : "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredOffers.map((offer) => (
            <Card
              key={offer.id}
              onClick={() => handleOfferClick(offer)}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold transition-transform group-hover:scale-110",
                        offer.logoColor
                      )}
                    >
                      {offer.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {offer.symbol}
                      </div>
                      <div className="text-xs text-gray-500">
                        {offer.sector}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(offer.id);
                    }}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Star
                      className={cn(
                        "h-5 w-5 transition-colors",
                        watchlist.includes(offer.id)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 hover:text-amber-400"
                      )}
                    />
                  </button>
                </div>

                {/* Asset Name */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                  {offer.assetName}
                </p>

                {/* Price and Side */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xl font-bold text-gray-900">
                    {formatPrice(offer.pricePerUnit)}
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium",
                      offer.side === "buy"
                        ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                        : "text-red-600 border-red-200 bg-red-50"
                    )}
                  >
                    {offer.side === "buy" ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        Buying
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        Selling
                      </>
                    )}
                  </Badge>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-500">Available</div>
                    <div className="font-semibold text-gray-900">
                      {offer.availableQuantity.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-500">Min Order</div>
                    <div className="font-semibold text-gray-900">
                      {offer.minQuantity.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Volume */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-500">24h Volume</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-900">
                      {formatVolume(offer.volume24h)}
                    </span>
                    <span
                      className={cn(
                        "flex items-center",
                        offer.volumeChange >= 0
                          ? "text-emerald-600"
                          : "text-red-500"
                      )}
                    >
                      {offer.volumeChange >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {offer.volumeChange >= 0 ? "+" : ""}
                      {offer.volumeChange.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs">
                    <Building2 className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{offer.dealerCode}</span>
                    <span className="text-amber-500">
                      ★ {offer.dealerRating}
                    </span>
                  </div>
                  {offer.isBargainable ? (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Negotiable
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 text-xs">
                      Fixed Price
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No offers found
            </h3>
            <p className="text-gray-500">
              {showWatchlistOnly
                ? "Add offers to your watchlist to see them here"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default OTCDex;
