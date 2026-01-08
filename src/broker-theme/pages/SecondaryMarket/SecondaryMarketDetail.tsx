/**
 * SECONDARY MARKET DETAIL PAGE - Clean, minimalist trading interface
 */

import React, { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart3,
  Activity,
  Info,
  FileText,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

// Mock data
const mockMarketData = {
  id: "1",
  symbol: "DANGCEM-P",
  name: "Dangote Cement Pre-IPO",
  description: "Pre-IPO shares of Dangote Cement Plc, one of Africa's largest cement manufacturers. This offering provides early access to shares before the company's planned secondary market listing.",
  sector: "Industrial",
  currentPrice: 285.50,
  priceChange24h: 12.5,
  volume24h: 45600000,
  totalVolume: 892000000,
  impliedFDV: "₦4.2T",
  settleTime: "Mar 2025",
  high24h: 292.00,
  low24h: 278.30,
  openPrice: 280.00,
  status: "active" as const,
};

// Generate chart data
const generateChartData = (days: number) => {
  const data = [];
  let price = 250;
  for (let i = 0; i < days; i++) {
    price += (Math.random() - 0.45) * 10;
    data.push({
      date: `Day ${i + 1}`,
      price: Math.max(200, price),
      volume: Math.floor(Math.random() * 2000000) + 500000,
    });
  }
  return data;
};

// Order book data
const mockBuyOrders = [
  { id: "1", price: 284.50, amount: 5000, total: 1422500 },
  { id: "2", price: 284.00, amount: 12000, total: 3408000 },
  { id: "3", price: 283.50, amount: 8500, total: 2409750 },
  { id: "4", price: 283.00, amount: 15000, total: 4245000 },
  { id: "5", price: 282.50, amount: 20000, total: 5650000 },
];

const mockSellOrders = [
  { id: "6", price: 286.00, amount: 3500, total: 1001000 },
  { id: "7", price: 286.50, amount: 7000, total: 2005500 },
  { id: "8", price: 287.00, amount: 10000, total: 2870000 },
  { id: "9", price: 287.50, amount: 6000, total: 1725000 },
  { id: "10", price: 288.00, amount: 9000, total: 2592000 },
];

// Recent trades
const mockRecentTrades = [
  { id: "1", time: "14:32:15", side: "buy" as const, price: 285.50, amount: 500, total: 142750 },
  { id: "2", time: "14:31:42", side: "sell" as const, price: 285.30, amount: 1200, total: 342360 },
  { id: "3", time: "14:30:58", side: "buy" as const, price: 285.40, amount: 800, total: 228320 },
  { id: "4", time: "14:30:21", side: "buy" as const, price: 285.20, amount: 2500, total: 713000 },
  { id: "5", time: "14:29:45", side: "sell" as const, price: 285.00, amount: 1800, total: 513000 },
];

const SecondaryMarketDetail: React.FC = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M">("1W");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [orderPrice, setOrderPrice] = useState(mockMarketData.currentPrice.toString());
  const [orderAmount, setOrderAmount] = useState("");

  const routePrefix = location.pathname.includes("/preview/app") ? "/preview/app" : "/app";

  const chartData = useMemo(() => {
    const days = timeRange === "1D" ? 24 : timeRange === "1W" ? 7 : timeRange === "1M" ? 30 : 90;
    return generateChartData(days);
  }, [timeRange]);

  const orderTotal = useMemo(() => {
    const price = parseFloat(orderPrice) || 0;
    const amount = parseFloat(orderAmount) || 0;
    return price * amount;
  }, [orderPrice, orderAmount]);

  const maxBuyAmount = mockBuyOrders.reduce((sum, o) => sum + o.amount, 0);
  const maxSellAmount = mockSellOrders.reduce((sum, o) => sum + o.amount, 0);

  const handleBack = () => {
    navigate(`${routePrefix}/markets/secondary`);
  };

  return (
    <div className="flex-1 px-4 md:px-6 py-6">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {mockMarketData.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{mockMarketData.symbol}</h1>
                <Badge variant="default" className="capitalize">{mockMarketData.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{mockMarketData.name}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                ₦{mockMarketData.currentPrice.toLocaleString()}
              </div>
              <div className={cn(
                "flex items-center justify-end gap-1 text-sm",
                mockMarketData.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {mockMarketData.priceChange24h >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {mockMarketData.priceChange24h >= 0 ? "+" : ""}
                {mockMarketData.priceChange24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "24h Volume", value: `₦${(mockMarketData.volume24h / 1000000).toFixed(1)}M` },
            { label: "Total Volume", value: `₦${(mockMarketData.totalVolume / 1000000000).toFixed(2)}B` },
            { label: "24h High", value: `₦${mockMarketData.high24h.toLocaleString()}` },
            { label: "24h Low", value: `₦${mockMarketData.low24h.toLocaleString()}` },
            { label: "Implied FDV", value: mockMarketData.impliedFDV },
            { label: "Settlement", value: mockMarketData.settleTime },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart and Order Book */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Chart */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Price Chart</CardTitle>
                  <div className="flex gap-1">
                    {(["1D", "1W", "1M", "3M"] as const).map((range) => (
                      <Button
                        key={range}
                        variant={timeRange === range ? "default" : "ghost"}
                        size="sm"
                        className="h-7 px-3 text-xs"
                        onClick={() => setTimeRange(range)}
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        domain={['dataMin - 10', 'dataMax + 10']}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Volume Chart */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Volume Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="volumeGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`₦${(value / 1000000).toFixed(2)}M`, "Volume"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="hsl(var(--accent))"
                        strokeWidth={1.5}
                        fill="url(#volumeGradient2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Order Book and Recent Trades */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Book */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Order Book</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sell Orders (asks) */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground mb-2">Sell Orders</p>
                    {mockSellOrders.slice().reverse().map((order) => (
                      <div key={order.id} className="flex justify-between text-xs py-1 relative">
                        <div 
                          className="absolute left-0 top-0 bottom-0 bg-red-500/10" 
                          style={{ width: `${(order.amount / maxSellAmount) * 100}%` }}
                        />
                        <span className="text-red-500 relative z-10">₦{order.price.toFixed(2)}</span>
                        <span className="text-muted-foreground relative z-10">{order.amount.toLocaleString()}</span>
                        <span className="text-foreground relative z-10">₦{(order.total / 1000000).toFixed(2)}M</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Spread */}
                  <div className="text-center py-2 border-y border-border">
                    <span className="text-lg font-bold text-foreground">₦{mockMarketData.currentPrice.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground ml-2">Spread: 0.52%</span>
                  </div>
                  
                  {/* Buy Orders (bids) */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground mb-2">Buy Orders</p>
                    {mockBuyOrders.map((order) => (
                      <div key={order.id} className="flex justify-between text-xs py-1 relative">
                        <div 
                          className="absolute left-0 top-0 bottom-0 bg-green-500/10" 
                          style={{ width: `${(order.amount / maxBuyAmount) * 100}%` }}
                        />
                        <span className="text-green-500 relative z-10">₦{order.price.toFixed(2)}</span>
                        <span className="text-muted-foreground relative z-10">{order.amount.toLocaleString()}</span>
                        <span className="text-foreground relative z-10">₦{(order.total / 1000000).toFixed(2)}M</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Recent Trades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground pb-2 border-b border-border">
                      <span>Time</span>
                      <span>Price</span>
                      <span>Amount</span>
                    </div>
                    {mockRecentTrades.map((trade) => (
                      <div key={trade.id} className="flex justify-between text-xs py-2">
                        <span className="text-muted-foreground">{trade.time}</span>
                        <span className={trade.side === "buy" ? "text-green-500" : "text-red-500"}>
                          ₦{trade.price.toFixed(2)}
                        </span>
                        <span className="text-foreground">{trade.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trading Panel & Info */}
          <div className="space-y-6">
            {/* Trade Panel */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex gap-2">
                  <Button
                    variant={orderType === "buy" ? "default" : "outline"}
                    className={cn(
                      "flex-1",
                      orderType === "buy" && "bg-green-500 hover:bg-green-600"
                    )}
                    onClick={() => setOrderType("buy")}
                  >
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Buy
                  </Button>
                  <Button
                    variant={orderType === "sell" ? "default" : "outline"}
                    className={cn(
                      "flex-1",
                      orderType === "sell" && "bg-red-500 hover:bg-red-600"
                    )}
                    onClick={() => setOrderType("sell")}
                  >
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    Sell
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Price (NGN)</label>
                  <Input
                    type="number"
                    value={orderPrice}
                    onChange={(e) => setOrderPrice(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Amount</label>
                  <Input
                    type="number"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bg-background"
                  />
                </div>
                <div className="flex justify-between py-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-bold text-foreground">₦{orderTotal.toLocaleString()}</span>
                </div>
                <Button
                  className={cn(
                    "w-full",
                    orderType === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  )}
                >
                  {orderType === "buy" ? "Place Buy Order" : "Place Sell Order"}
                </Button>
              </CardContent>
            </Card>

            {/* Info Tabs */}
            <Card className="bg-card border-border">
              <Tabs defaultValue="about">
                <CardHeader className="pb-0">
                  <TabsList className="w-full bg-muted/50">
                    <TabsTrigger value="about" className="flex-1 text-xs">
                      <Info className="h-3 w-3 mr-1" />
                      About
                    </TabsTrigger>
                    <TabsTrigger value="details" className="flex-1 text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="risks" className="flex-1 text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Risks
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-4">
                  <TabsContent value="about" className="mt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {mockMarketData.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sector</span>
                        <span className="text-foreground">{mockMarketData.sector}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Settlement Date</span>
                        <span className="text-foreground">{mockMarketData.settleTime}</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="mt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Token Type</span>
                        <span className="text-foreground">Pre-IPO Shares</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Min Trade Size</span>
                        <span className="text-foreground">100 units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Trading Hours</span>
                        <span className="text-foreground">24/7</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Settlement</span>
                        <span className="text-foreground">T+0</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="risks" className="mt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                        Pre-IPO securities carry higher risk than listed stocks
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                        Liquidity may be limited until settlement
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                        IPO price may differ from pre-market price
                      </li>
                    </ul>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryMarketDetail;
