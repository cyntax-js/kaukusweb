/**
 * OTC DEX MARKET PAGE - Light, minimalist design matching Secondary Market
 * Clean table-based layout with stats cards, animated gauges
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
  ChevronUp,
  ChevronDown,
  Building2,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

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
  side: 'buy' | 'sell';
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
  status: 'live' | 'upcoming' | 'ended';
  sector: string;
}

const mockDealerOffers: DealerOffer[] = [
  { 
    id: 'do1', 
    dealerName: 'Continental Dealers Ltd', 
    dealerCode: 'CONTDL', 
    symbol: 'DANGCEM', 
    assetName: 'Dangote Cement Plc', 
    side: 'sell', 
    quantity: 500000, 
    availableQuantity: 350000, 
    pricePerUnit: 248.50, 
    minQuantity: 50000, 
    isBargainable: true, 
    expiresAt: new Date(Date.now() + 604800000),
    logoColor: 'bg-emerald-500',
    volume24h: 12450000,
    volumeChange: 45.2,
    totalVolume: 87320000,
    totalVolumeChange: 12.8,
    status: 'live',
    sector: 'Industrial'
  },
  { 
    id: 'do2', 
    dealerName: 'Prime Capital Markets', 
    dealerCode: 'PCM', 
    symbol: 'GTCO', 
    assetName: 'Guaranty Trust Holding Co', 
    side: 'sell', 
    quantity: 1000000, 
    availableQuantity: 1000000, 
    pricePerUnit: 42.30, 
    minQuantity: 100000, 
    isBargainable: false, 
    expiresAt: new Date(Date.now() + 432000000),
    logoColor: 'bg-pink-500',
    volume24h: 8230000,
    volumeChange: -12.5,
    totalVolume: 42300000,
    totalVolumeChange: 8.2,
    status: 'live',
    sector: 'Banking'
  },
  { 
    id: 'do3', 
    dealerName: 'Continental Dealers Ltd', 
    dealerCode: 'CONTDL', 
    symbol: 'MTNN', 
    assetName: 'MTN Nigeria Communications', 
    side: 'buy', 
    quantity: 200000, 
    availableQuantity: 120000, 
    pricePerUnit: 192.00, 
    minQuantity: 20000, 
    isBargainable: true, 
    expiresAt: new Date(Date.now() + 259200000),
    logoColor: 'bg-amber-500',
    volume24h: 23040000,
    volumeChange: 78.3,
    totalVolume: 115200000,
    totalVolumeChange: 23.1,
    status: 'live',
    sector: 'Telecoms'
  },
  { 
    id: 'do4', 
    dealerName: 'Heritage Securities', 
    dealerCode: 'HERISEC', 
    symbol: 'ZENITH', 
    assetName: 'Zenith Bank Plc', 
    side: 'sell', 
    quantity: 750000, 
    availableQuantity: 750000, 
    pricePerUnit: 39.00, 
    minQuantity: 75000, 
    isBargainable: true, 
    expiresAt: new Date(Date.now() + 518400000),
    logoColor: 'bg-purple-500',
    volume24h: 5850000,
    volumeChange: 15.8,
    totalVolume: 29250000,
    totalVolumeChange: 5.6,
    status: 'live',
    sector: 'Banking'
  },
  { 
    id: 'do5', 
    dealerName: 'Prime Capital Markets', 
    dealerCode: 'PCM', 
    symbol: 'UBA', 
    assetName: 'United Bank for Africa', 
    side: 'buy', 
    quantity: 2000000, 
    availableQuantity: 1500000, 
    pricePerUnit: 22.80, 
    minQuantity: 200000, 
    isBargainable: false, 
    expiresAt: new Date(Date.now() + 172800000),
    logoColor: 'bg-blue-500',
    volume24h: 4560000,
    volumeChange: -5.2,
    totalVolume: 34200000,
    totalVolumeChange: 2.1,
    status: 'live',
    sector: 'Banking'
  },
  { 
    id: 'do6', 
    dealerName: 'Heritage Securities', 
    dealerCode: 'HERISEC', 
    symbol: 'AIRTEL', 
    assetName: 'Airtel Africa Plc', 
    side: 'sell', 
    quantity: 100000, 
    availableQuantity: 100000, 
    pricePerUnit: 1875.00, 
    minQuantity: 10000, 
    isBargainable: true, 
    expiresAt: new Date(Date.now() + 691200000),
    logoColor: 'bg-red-500',
    volume24h: 18750000,
    volumeChange: 32.4,
    totalVolume: 187500000,
    totalVolumeChange: 18.9,
    status: 'live',
    sector: 'Telecoms'
  },
  { 
    id: 'do7', 
    dealerName: 'Vista Capital', 
    dealerCode: 'VCAP', 
    symbol: 'SEPLAT', 
    assetName: 'Seplat Energy Plc', 
    side: 'sell', 
    quantity: 80000, 
    availableQuantity: 80000, 
    pricePerUnit: 2450.00, 
    minQuantity: 5000, 
    isBargainable: true, 
    expiresAt: new Date(Date.now() + 864000000),
    logoColor: 'bg-teal-500',
    volume24h: 0,
    volumeChange: 0,
    totalVolume: 0,
    totalVolumeChange: 0,
    status: 'upcoming',
    sector: 'Oil & Gas'
  },
  { 
    id: 'do8', 
    dealerName: 'Heritage Securities', 
    dealerCode: 'HERISEC', 
    symbol: 'ACCESS', 
    assetName: 'Access Holdings Plc', 
    side: 'buy', 
    quantity: 500000, 
    availableQuantity: 0, 
    pricePerUnit: 18.50, 
    minQuantity: 50000, 
    isBargainable: false, 
    expiresAt: new Date(Date.now() - 86400000),
    logoColor: 'bg-blue-600',
    volume24h: 9250000,
    volumeChange: 88.2,
    totalVolume: 9250000,
    totalVolumeChange: 100,
    status: 'ended',
    sector: 'Banking'
  },
];

const volumeChartData = generateVolumeData();

// Calculate OTC Market Score (similar to Fear & Greed)
const calculateOTCScore = (offers: DealerOffer[]): number => {
  const avgVolumeChange = offers.reduce((sum, o) => sum + o.volumeChange, 0) / offers.length;
  const bargainableRatio = offers.filter(o => o.isBargainable).length / offers.length;
  const score = Math.min(100, Math.max(0, 50 + avgVolumeChange * 0.3 + bargainableRatio * 20));
  return Math.round(score);
};

// Get OTC Score label
const getOTCScoreLabel = (value: number): string => {
  if (value <= 20) return "Very Low Activity";
  if (value <= 40) return "Low Activity";
  if (value <= 60) return "Moderate";
  if (value <= 80) return "High Activity";
  return "Very High Activity";
};

// Calculate gauge needle position
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
  const [activeFilter, setActiveFilter] = useState<'live' | 'upcoming' | 'ended'>('live');
  const [sideFilter, setSideFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [otcScore, setOtcScore] = useState(0);
  const [animatedOtcScore, setAnimatedOtcScore] = useState(0);

  const routePrefix = location.pathname.includes("/preview/app") ? "/preview/app" : "/app";

  // Calculate dynamic values on mount
  useEffect(() => {
    const targetScore = calculateOTCScore(mockDealerOffers);
    setOtcScore(targetScore);
  }, []);

  // Animate gauge
  useEffect(() => {
    if (animatedOtcScore < otcScore) {
      const timer = setTimeout(() => {
        setAnimatedOtcScore(prev => Math.min(prev + 1, otcScore));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [animatedOtcScore, otcScore]);

  const filteredOffers = useMemo(() => {
    let offers = mockDealerOffers.filter(o => o.status === activeFilter);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      offers = offers.filter(o =>
        o.assetName.toLowerCase().includes(q) ||
        o.symbol.toLowerCase().includes(q) ||
        o.dealerName.toLowerCase().includes(q) ||
        o.sector.toLowerCase().includes(q)
      );
    }

    if (sideFilter !== 'all') {
      offers = offers.filter(o => o.side === sideFilter);
    }

    if (sortField) {
      offers.sort((a, b) => {
        let aVal: number, bVal: number;
        switch (sortField) {
          case 'price':
            aVal = a.pricePerUnit;
            bVal = b.pricePerUnit;
            break;
          case 'volume24h':
            aVal = a.volume24h;
            bVal = b.volume24h;
            break;
          case 'available':
            aVal = a.availableQuantity;
            bVal = b.availableQuantity;
            break;
          default:
            return 0;
        }
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return offers;
  }, [searchQuery, activeFilter, sideFilter, sortField, sortDirection]);

  const handleOfferClick = (offer: DealerOffer) => {
    navigate(`${routePrefix}/otc-dex/${offer.id}`);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const totalVolume = mockDealerOffers.reduce((sum, o) => sum + o.volume24h, 0);
  const liveCount = mockDealerOffers.filter(o => o.status === 'live').length;
  const upcomingCount = mockDealerOffers.filter(o => o.status === 'upcoming').length;
  const endedCount = mockDealerOffers.filter(o => o.status === 'ended').length;
  const bargainableCount = mockDealerOffers.filter(o => o.isBargainable).length;

  const formatVolume = (val: number) => {
    if (val >= 1000000) return `₦${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `₦${(val / 1000).toFixed(1)}K`;
    return `₦${val.toLocaleString()}`;
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(val);
  };

  const SortIcon = ({ field }: { field: string }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp
        className={cn(
          "h-3 w-3 -mb-1",
          sortField === field && sortDirection === 'asc' ? "text-foreground" : "text-muted-foreground/40"
        )}
      />
      <ChevronDown
        className={cn(
          "h-3 w-3",
          sortField === field && sortDirection === 'desc' ? "text-foreground" : "text-muted-foreground/40"
        )}
      />
    </span>
  );

  const needlePosition = calculateNeedlePosition(animatedOtcScore);

  return (
    <div className="flex-1 bg-gray-50/80">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-auto scroll-smooth md:grid md:grid-cols-2 xl:grid-cols-4 mb-8">
          {/* OTC Volume */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">OTC Volume (24h)</p>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeChartData}>
                    <defs>
                      <linearGradient id="colorOTC" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
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
                <span className="text-2xl font-bold text-gray-900">{formatVolume(totalVolume)}</span>
                <span className="text-xs text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +34.2%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* OTC Market Activity Gauge */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-gray-500 mb-1">OTC Market Activity</p>
              <svg viewBox="0 0 200 140" className="w-32 h-20">
                {/* Gauge arc background */}
                <path
                  d="M 20 130 A 90 90 0 0 1 180 130"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Gauge arc fill */}
                <path
                  d="M 20 130 A 90 90 0 0 1 180 130"
                  fill="none"
                  stroke="url(#otcGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedOtcScore / 100) * 283} 283`}
                />
                <defs>
                  <linearGradient id="otcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="25%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="75%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                {/* Needle */}
                <circle cx={needlePosition.cx} cy={needlePosition.cy} r="6" fill="#1f2937" />
                <line x1="100" y1="130" x2={needlePosition.cx} y2={needlePosition.cy} stroke="#1f2937" strokeWidth="2" />
                <circle cx="100" cy="130" r="4" fill="#1f2937" />
              </svg>
              <div className="text-center mt-1">
                <span className="text-2xl font-bold text-gray-900">{animatedOtcScore}</span>
                <p className="text-xs text-gray-500">{getOTCScoreLabel(animatedOtcScore)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Offers Summary */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">Active Offers</p>
              <div className="flex-1 flex flex-col justify-center space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{liveCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-sm text-gray-600">Upcoming</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{upcomingCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-sm text-gray-600">Ended</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{endedCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Negotiable Offers */}
          <Card className="h-40 min-w-[280px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-xl shadow-sm md:flex-shrink lg:min-w-[unset] hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 h-full flex flex-col">
              <p className="text-xs font-medium text-gray-500 mb-3">Negotiable Offers</p>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-amber-500" />
                    <span className="text-3xl font-bold text-gray-900">{bargainableCount}</span>
                  </div>
                  <p className="text-xs text-gray-500">of {mockDealerOffers.length} total offers</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-amber-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${(bargainableCount / mockDealerOffers.length) * 100}%` }}
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
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex bg-white rounded-full border border-gray-200 p-1">
              {(['live', 'upcoming', 'ended'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                    activeFilter === status
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <Badge variant="secondary" className={cn(
                    "ml-2 text-xs",
                    activeFilter === status ? "bg-white/20 text-white" : ""
                  )}>
                    {status === 'live' ? liveCount : status === 'upcoming' ? upcomingCount : endedCount}
                  </Badge>
                </button>
              ))}
            </div>

            {/* Side Filter */}
            <div className="flex bg-white rounded-full border border-gray-200 p-1">
              {(['all', 'buy', 'sell'] as const).map(side => (
                <button
                  key={side}
                  onClick={() => setSideFilter(side)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                    sideFilter === side
                      ? side === 'buy' ? "bg-emerald-500 text-white" : side === 'sell' ? "bg-red-500 text-white" : "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dealer</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th 
                    className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('price')}
                  >
                    <span className="inline-flex items-center">
                      Price <SortIcon field="price" />
                    </span>
                  </th>
                  <th 
                    className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('available')}
                  >
                    <span className="inline-flex items-center">
                      Available <SortIcon field="available" />
                    </span>
                  </th>
                  <th 
                    className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('volume24h')}
                  >
                    <span className="inline-flex items-center">
                      24h Vol. <SortIcon field="volume24h" />
                    </span>
                  </th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Negotiable</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Expires</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer, index) => (
                  <tr
                    key={offer.id}
                    onClick={() => handleOfferClick(offer)}
                    className={cn(
                      "border-b border-gray-50 cursor-pointer transition-all duration-200",
                      "hover:bg-gray-50/80 hover:shadow-sm",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    )}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold transition-transform hover:scale-110",
                          offer.logoColor
                        )}>
                          {offer.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{offer.symbol}</div>
                          <div className="text-xs text-gray-500">{offer.sector}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">{offer.dealerName}</div>
                          <div className="text-xs text-gray-500">{offer.dealerCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          offer.side === 'buy' 
                            ? "text-emerald-600 border-emerald-200 bg-emerald-50" 
                            : "text-red-600 border-red-200 bg-red-50"
                        )}
                      >
                        {offer.side === 'buy' ? (
                          <><ArrowUpRight className="h-3 w-3 mr-1" />Buying</>
                        ) : (
                          <><ArrowDownRight className="h-3 w-3 mr-1" />Selling</>
                        )}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="font-semibold text-gray-900">{formatPrice(offer.pricePerUnit)}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="text-sm text-gray-900">{offer.availableQuantity.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">of {offer.quantity.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="text-sm text-gray-900">{formatVolume(offer.volume24h)}</div>
                      <div className={cn(
                        "text-xs flex items-center justify-end",
                        offer.volumeChange >= 0 ? "text-emerald-600" : "text-red-500"
                      )}>
                        {offer.volumeChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {offer.volumeChange >= 0 ? "+" : ""}{offer.volumeChange.toFixed(1)}%
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {offer.isBargainable ? (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">Fixed</Badge>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="text-sm text-gray-600">
                        {offer.status === 'ended' ? (
                          <span className="text-gray-400">Ended</span>
                        ) : offer.status === 'upcoming' ? (
                          <span className="text-amber-600">Coming Soon</span>
                        ) : (
                          <span className="flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3" />
                            {Math.ceil((offer.expiresAt.getTime() - Date.now()) / 86400000)}d left
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default OTCDex;
