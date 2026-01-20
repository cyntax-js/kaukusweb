/**
 * OTC DEX DETAIL PAGE - Light, minimalist trading interface
 * Matching Secondary Market design with price negotiation panel
 */

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Building2,
  Clock,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Info,
  Shield,
  Users,
  BarChart3,
  Loader2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/broker-theme/components";

// Types
interface NegotiationRound {
  id: string;
  party: 'user' | 'dealer';
  price: number;
  timestamp: Date;
  message?: string;
}

interface DealerOffer {
  id: string;
  dealerName: string;
  dealerCode: string;
  symbol: string;
  assetName: string;
  description: string;
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
  sector: string;
  dealerRating: number;
  totalTrades: number;
  responseTime: string;
}

// Generate chart data
const generateChartData = (days: number) => {
  const data = [];
  let price = 240;
  for (let i = 0; i < days; i++) {
    price += (Math.random() - 0.48) * 5;
    data.push({
      date: `${Math.floor(i / 7) + 1}/${(i % 7) + 1}`,
      price: Math.max(200, price),
      volume: Math.floor(Math.random() * 100000) + 10000,
    });
  }
  return data;
};

// Mock offer data
const mockOfferData: DealerOffer = {
  id: 'do1',
  dealerName: 'Continental Dealers Ltd',
  dealerCode: 'CONTDL',
  symbol: 'DANGCEM',
  assetName: 'Dangote Cement Plc',
  description: 'Premier Nigerian cement manufacturer with operations across Africa. Strong fundamentals and consistent dividend payouts make this an attractive investment for institutional investors.',
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
  sector: 'Industrial',
  dealerRating: 4.8,
  totalTrades: 1250,
  responseTime: '< 2 hours',
};

// Mock negotiation history
const mockNegotiationRounds: NegotiationRound[] = [];

// Mock recent OTC trades
const mockRecentTrades = [
  { id: '1', side: 'buy', price: 247.50, quantity: 75000, time: '2h ago' },
  { id: '2', side: 'sell', price: 248.00, quantity: 50000, time: '5h ago' },
  { id: '3', side: 'buy', price: 246.75, quantity: 100000, time: '8h ago' },
  { id: '4', side: 'sell', price: 249.00, quantity: 25000, time: '12h ago' },
  { id: '5', side: 'buy', price: 247.00, quantity: 80000, time: '1d ago' },
];

const OTCDexDetail: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [timeRange, setTimeRange] = useState<'7d' | '1M' | '3M'>('7d');
  const [activeTab, setActiveTab] = useState<'trade' | 'about' | 'dealer'>('trade');
  const [quantity, setQuantity] = useState<string>(mockOfferData.minQuantity.toString());
  const [proposedPrice, setProposedPrice] = useState<number>(mockOfferData.pricePerUnit);
  const [negotiationRounds, setNegotiationRounds] = useState<NegotiationRound[]>(mockNegotiationRounds);
  const [negotiationStatus, setNegotiationStatus] = useState<'idle' | 'negotiating' | 'accepted' | 'rejected'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [dealerCounterPrice, setDealerCounterPrice] = useState<number | null>(null);

  const routePrefix = location.pathname.includes("/preview/app") ? "/preview/app" : "/app";

  const chartData = useMemo(() => {
    const days = timeRange === '7d' ? 30 : timeRange === '1M' ? 60 : 90;
    return generateChartData(days);
  }, [timeRange]);

  const handleBack = () => {
    navigate(`${routePrefix}/otc-dex`);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(val);
  };

  const formatVolume = (val: number) => {
    if (val >= 1000000) return `₦${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `₦${(val / 1000).toFixed(1)}K`;
    return `₦${val.toLocaleString()}`;
  };

  const totalValue = useMemo(() => {
    const qty = parseInt(quantity) || 0;
    const price = dealerCounterPrice || proposedPrice;
    return qty * price;
  }, [quantity, proposedPrice, dealerCounterPrice]);

  const priceDiscount = useMemo(() => {
    const diff = ((mockOfferData.pricePerUnit - proposedPrice) / mockOfferData.pricePerUnit) * 100;
    return diff;
  }, [proposedPrice]);

  // Start negotiation
  const handleStartNegotiation = async () => {
    if (parseInt(quantity) < mockOfferData.minQuantity) {
      toast.error(`Minimum quantity is ${mockOfferData.minQuantity.toLocaleString()} units`);
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRound: NegotiationRound = {
      id: `r${Date.now()}`,
      party: 'user',
      price: proposedPrice,
      timestamp: new Date(),
      message: negotiationMessage || undefined,
    };

    setNegotiationRounds([newRound]);
    setNegotiationStatus('negotiating');
    setNegotiationMessage('');
    setIsProcessing(false);

    toast.success("Negotiation started!", {
      description: `Your offer of ${formatPrice(proposedPrice)} has been sent to the dealer`
    });

    // Simulate dealer response after delay
    setTimeout(() => {
      const dealerPrice = proposedPrice + (mockOfferData.pricePerUnit - proposedPrice) * 0.6;
      setDealerCounterPrice(Math.round(dealerPrice * 100) / 100);
      
      const dealerRound: NegotiationRound = {
        id: `r${Date.now()}`,
        party: 'dealer',
        price: dealerPrice,
        timestamp: new Date(),
        message: 'This is our best price for this volume. We can offer slightly better terms for larger orders.',
      };
      
      setNegotiationRounds(prev => [...prev, dealerRound]);
    }, 3000);
  };

  // Send counter offer
  const handleCounterOffer = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newRound: NegotiationRound = {
      id: `r${Date.now()}`,
      party: 'user',
      price: proposedPrice,
      timestamp: new Date(),
      message: negotiationMessage || undefined,
    };

    setNegotiationRounds(prev => [...prev, newRound]);
    setNegotiationMessage('');
    setIsProcessing(false);

    toast.success("Counter offer sent!");

    // Simulate dealer response
    setTimeout(() => {
      const diff = dealerCounterPrice! - proposedPrice;
      const newDealerPrice = proposedPrice + diff * 0.5;
      
      if (Math.abs(newDealerPrice - proposedPrice) < 1) {
        // Dealer accepts
        setDealerCounterPrice(proposedPrice);
        setNegotiationStatus('accepted');
        
        const acceptRound: NegotiationRound = {
          id: `r${Date.now()}`,
          party: 'dealer',
          price: proposedPrice,
          timestamp: new Date(),
          message: 'Accepted. Please proceed to confirm your order.',
        };
        setNegotiationRounds(prev => [...prev, acceptRound]);
        
        toast.success("Price accepted by dealer!", {
          description: `Final price: ${formatPrice(proposedPrice)} per unit`
        });
      } else {
        setDealerCounterPrice(Math.round(newDealerPrice * 100) / 100);
        
        const dealerRound: NegotiationRound = {
          id: `r${Date.now()}`,
          party: 'dealer',
          price: newDealerPrice,
          timestamp: new Date(),
          message: 'We can meet you halfway. This is a competitive price for this asset.',
        };
        setNegotiationRounds(prev => [...prev, dealerRound]);
      }
    }, 2500);
  };

  // Accept dealer price
  const handleAcceptPrice = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setNegotiationStatus('accepted');
    setIsProcessing(false);

    toast.success("Trade executed!", {
      description: `Bought ${parseInt(quantity).toLocaleString()} ${mockOfferData.symbol} at ${formatPrice(dealerCounterPrice || proposedPrice)}`
    });
  };

  // Reject and exit
  const handleReject = () => {
    setNegotiationStatus('rejected');
    toast.info("Negotiation cancelled");
  };

  // Direct buy (for non-bargainable)
  const handleDirectBuy = async () => {
    if (parseInt(quantity) < mockOfferData.minQuantity) {
      toast.error(`Minimum quantity is ${mockOfferData.minQuantity.toLocaleString()} units`);
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);

    toast.success("Order placed!", {
      description: `Bought ${parseInt(quantity).toLocaleString()} ${mockOfferData.symbol} at ${formatPrice(mockOfferData.pricePerUnit)}`
    });
  };

  const availabilityPercent = (mockOfferData.availableQuantity / mockOfferData.quantity) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/80">
      <AppHeader />
      
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={handleBack} className="hover:text-gray-700 transition-colors">OTC DEX</button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{mockOfferData.symbol}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold transition-transform hover:scale-110",
              mockOfferData.logoColor
            )}>
              {mockOfferData.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{mockOfferData.symbol}</h1>
                <span className="text-2xl font-bold text-gray-900">{formatPrice(mockOfferData.pricePerUnit)}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-medium",
                    mockOfferData.side === 'buy'
                      ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                      : "text-red-600 border-red-200 bg-red-50"
                  )}
                >
                  {mockOfferData.side === 'buy' ? (
                    <><ArrowUpRight className="h-3 w-3 mr-1" />Dealer Buying</>
                  ) : (
                    <><ArrowDownRight className="h-3 w-3 mr-1" />Dealer Selling</>
                  )}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{mockOfferData.assetName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div>
              <span className="text-gray-500">24h Vol.</span>
              <span className="ml-2 font-medium">{formatVolume(mockOfferData.volume24h)}</span>
              <span className="text-emerald-600 ml-1">+{mockOfferData.volumeChange}%</span>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <span className="text-gray-500">Total Vol.</span>
              <span className="ml-2 font-medium">{formatVolume(mockOfferData.totalVolume)}</span>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <span className="text-gray-500">Available</span>
              <span className="ml-2 font-medium">{mockOfferData.availableQuantity.toLocaleString()}</span>
            </div>
            <div className="border-l border-gray-300 pl-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{Math.ceil((mockOfferData.expiresAt.getTime() - Date.now()) / 86400000)}d left</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-gray-200">
              {["Trade", "About", "Dealer"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as any)}
                  className={cn(
                    "pb-3 text-sm font-medium border-b-2 -mb-px transition-all duration-200",
                    activeTab === tab.toLowerCase()
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Trade Tab */}
            {activeTab === 'trade' && (
              <>
                {/* Price Chart */}
                <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Price History</CardTitle>
                      <div className="flex items-center gap-1 text-xs">
                        {(['7d', '1M', '3M'] as const).map((range) => (
                          <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={cn(
                              "px-3 py-1.5 rounded-full transition-colors",
                              timeRange === range ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                            )}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorOTCPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={['auto', 'auto']} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#10B981"
                            strokeWidth={2}
                            fill="url(#colorOTCPrice)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent OTC Trades */}
                <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent OTC Trades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockRecentTrades.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                trade.side === 'buy' ? "text-emerald-600 border-emerald-200" : "text-red-600 border-red-200"
                              )}
                            >
                              {trade.side.toUpperCase()}
                            </Badge>
                            <span className="text-sm font-medium">{formatPrice(trade.price)}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{trade.quantity.toLocaleString()} units</span>
                            <span>{trade.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">About {mockOfferData.symbol}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">{mockOfferData.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-500">Sector</span>
                      <p className="font-semibold text-gray-900">{mockOfferData.sector}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-500">Total Quantity</span>
                      <p className="font-semibold text-gray-900">{mockOfferData.quantity.toLocaleString()} units</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-500">Minimum Order</span>
                      <p className="font-semibold text-gray-900">{mockOfferData.minQuantity.toLocaleString()} units</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-500">Negotiable</span>
                      <p className="font-semibold text-gray-900">{mockOfferData.isBargainable ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dealer Tab */}
            {activeTab === 'dealer' && (
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {mockOfferData.dealerName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 mb-1">
                        <span>{mockOfferData.dealerRating}</span>
                        <span className="text-amber-500">★</span>
                      </div>
                      <span className="text-sm text-gray-500">Rating</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{mockOfferData.totalTrades.toLocaleString()}</div>
                      <span className="text-sm text-gray-500">Total Trades</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{mockOfferData.responseTime}</div>
                      <span className="text-sm text-gray-500">Response Time</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-lg">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm text-emerald-700">Verified dealer with SEC Nigeria license</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-4">
            {/* Availability Card */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Availability</span>
                  <span className="text-sm font-medium">{availabilityPercent.toFixed(0)}%</span>
                </div>
                <Progress value={availabilityPercent} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{mockOfferData.availableQuantity.toLocaleString()} available</span>
                  <span>of {mockOfferData.quantity.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trading Panel */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {mockOfferData.side === 'sell' ? 'Buy' : 'Sell'} {mockOfferData.symbol}
                  {mockOfferData.isBargainable && (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Negotiable
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quantity Input */}
                <div>
                  <Label className="text-sm text-gray-600">Quantity</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={mockOfferData.minQuantity}
                    max={mockOfferData.availableQuantity}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Min: {mockOfferData.minQuantity.toLocaleString()} units</p>
                </div>

                {/* Price Section - Different for bargainable vs fixed */}
                {mockOfferData.isBargainable && negotiationStatus !== 'accepted' ? (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm text-gray-600">Your Price Offer</Label>
                        {priceDiscount > 0 && (
                          <span className="text-xs text-emerald-600">-{priceDiscount.toFixed(1)}% discount</span>
                        )}
                      </div>
                      <Input
                        type="number"
                        value={proposedPrice}
                        onChange={(e) => setProposedPrice(parseFloat(e.target.value) || 0)}
                        step="0.50"
                        className="mt-1"
                      />
                      <Slider
                        value={[proposedPrice]}
                        min={mockOfferData.pricePerUnit * 0.9}
                        max={mockOfferData.pricePerUnit * 1.05}
                        step={0.50}
                        onValueChange={([val]) => setProposedPrice(val)}
                        className="mt-3"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatPrice(mockOfferData.pricePerUnit * 0.9)}</span>
                        <span className="text-gray-900 font-medium">List: {formatPrice(mockOfferData.pricePerUnit)}</span>
                        <span>{formatPrice(mockOfferData.pricePerUnit * 1.05)}</span>
                      </div>
                    </div>

                    {/* Negotiation Rounds */}
                    {negotiationRounds.length > 0 && (
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center gap-2 mb-3">
                          <RefreshCw className="h-4 w-4 text-amber-600" />
                          <span className="text-sm font-medium">Negotiation in Progress</span>
                        </div>
                        <ScrollArea className="h-40">
                          <div className="space-y-3">
                            {negotiationRounds.map((round) => (
                              <div
                                key={round.id}
                                className={cn(
                                  "p-3 rounded-lg text-sm",
                                  round.party === 'user' ? "bg-blue-50 ml-4" : "bg-white mr-4 border"
                                )}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">
                                    {round.party === 'user' ? 'You' : mockOfferData.dealerName}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {round.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                                <div className="font-semibold text-gray-900">{formatPrice(round.price)}</div>
                                {round.message && (
                                  <p className="text-xs text-gray-600 mt-1">{round.message}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>

                        {dealerCounterPrice && negotiationStatus === 'negotiating' && (
                          <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                            <p className="text-sm text-amber-700 mb-2">
                              Dealer counter-offer: <strong>{formatPrice(dealerCounterPrice)}</strong>
                            </p>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                onClick={handleAcceptPrice}
                                disabled={isProcessing}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={handleCounterOffer}
                                disabled={isProcessing}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Counter
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600"
                                onClick={handleReject}
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message Input */}
                    {(negotiationStatus === 'idle' || negotiationStatus === 'negotiating') && (
                      <div>
                        <Label className="text-sm text-gray-600">Message (optional)</Label>
                        <Input
                          value={negotiationMessage}
                          onChange={(e) => setNegotiationMessage(e.target.value)}
                          placeholder="Add a note for the dealer..."
                          className="mt-1"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <Label className="text-sm text-gray-600">Price per Unit</Label>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                      {formatPrice(negotiationStatus === 'accepted' ? (dealerCounterPrice || proposedPrice) : mockOfferData.pricePerUnit)}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Value</span>
                  <span className="text-xl font-bold text-gray-900">{formatPrice(totalValue)}</span>
                </div>

                {/* Action Button */}
                {negotiationStatus === 'accepted' ? (
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Confirm Order
                  </Button>
                ) : mockOfferData.isBargainable && negotiationStatus === 'idle' ? (
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    size="lg"
                    onClick={handleStartNegotiation}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <MessageSquare className="h-5 w-5 mr-2" />
                    )}
                    Start Negotiation
                  </Button>
                ) : !mockOfferData.isBargainable ? (
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    onClick={handleDirectBuy}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 mr-2" />
                    )}
                    {mockOfferData.side === 'sell' ? 'Buy Now' : 'Sell Now'}
                  </Button>
                ) : null}

                {negotiationStatus === 'rejected' && (
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-red-700">Negotiation cancelled</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setNegotiationStatus('idle');
                        setNegotiationRounds([]);
                        setDealerCounterPrice(null);
                      }}
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">OTC Trading</p>
                    <p>Large block trades executed directly with dealers. Settlement typically occurs within T+2 business days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OTCDexDetail;
