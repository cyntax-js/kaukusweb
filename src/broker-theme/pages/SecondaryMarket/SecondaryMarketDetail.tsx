/**
 * SECONDARY MARKET DETAIL PAGE - Light, minimalist trading interface
 * Matching reference design with charts, order book, and trading panel
 */

import React, { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Filter,
  Settings,
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

// Mock data
const mockMarketData = {
  id: "1",
  symbol: "DANGCEM",
  name: "Dangote Cement",
  logoColor: "bg-emerald-500",
  currentPrice: 0.096,
  priceChange: 7.32,
  volume24h: 3833.5,
  totalVolume: 21444,
  impliedFDV: "₦960M",
  settleTime: "TBA",
  status: "live" as const,
};

// Generate chart data
const generateChartData = (days: number) => {
  const data = [];
  let price = 0.08;
  for (let i = 0; i < days; i++) {
    price += (Math.random() - 0.48) * 0.01;
    data.push({
      date: `${Math.floor(i / 7) + 1}/${(i % 7) + 1}`,
      price: Math.max(0.01, price),
      volume: Math.floor(Math.random() * 1000) + 100,
    });
  }
  return data;
};

// Order book data (buy orders)
const mockBuyOrders = [
  { price: 0.093, amount: 10000, collateral: 930 },
  { price: 0.094, amount: 8000, collateral: 752 },
  { price: 0.097, amount: 10000, collateral: 970 },
  { price: 0.15, amount: 800, collateral: 120 },
  { price: 0.25, amount: 200, collateral: 50 },
];

// Order book data (sell orders)
const mockSellOrders = [
  { price: 0.065, amount: 5000, collateral: 325 },
  { price: 0.05, amount: 10000, collateral: 500 },
  { price: 0.03, amount: 4000, collateral: 120 },
  { price: 0.02, amount: 1000, collateral: 20 },
];

// Recent activities
const mockActivities = [
  { id: "1", time: "1h ago", orderType: "Open", side: "Sell", pair: "DANGCEM/USDC", price: 0.093, amount: 10000, collateral: 930 },
  { id: "2", time: "9h ago", orderType: "Open", side: "Sell", pair: "DANGCEM/USDC", price: 0.094, amount: 8000, collateral: 752 },
  { id: "3", time: "9h ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.096, amount: 2000, collateral: 192 },
  { id: "4", time: "9h ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.089, amount: 5000, collateral: 445 },
  { id: "5", time: "9h ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.0889, amount: 790, collateral: 70.2 },
  { id: "6", time: "10h ago", orderType: "Open", side: "Buy", pair: "DANGCEM/USDC", price: 0.03, amount: 4000, collateral: 120 },
  { id: "7", time: "10h ago", orderType: "Open", side: "Sell", pair: "DANGCEM/USDC", price: 0.15, amount: 800, collateral: 120 },
  { id: "8", time: "21h ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.0894, amount: 1700, collateral: 152.1 },
  { id: "9", time: "1d ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.0799, amount: 1251, collateral: 100 },
  { id: "10", time: "1d ago", orderType: "Filled", side: "Sell", pair: "DANGCEM/USDC", price: 0.7, amount: 1000, collateral: 700 },
];

const SecondaryMarketDetail: React.FC = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [timeRange, setTimeRange] = useState<"7d" | "1M" | "3M">("7d");
  const [activeTab, setActiveTab] = useState<"market" | "about" | "rules">("market");
  const [orderFilter, setOrderFilter] = useState<"regular" | "resell" | "all">("regular");

  const routePrefix = location.pathname.includes("/preview/app") ? "/preview/app" : "/app";

  const chartData = useMemo(() => {
    const days = timeRange === "7d" ? 30 : timeRange === "1M" ? 60 : 90;
    return generateChartData(days);
  }, [timeRange]);

  const handleBack = () => {
    navigate(`${routePrefix}/markets/secondary`);
  };

  const maxBuyAmount = Math.max(...mockBuyOrders.map(o => o.amount));
  const maxSellAmount = Math.max(...mockSellOrders.map(o => o.amount));

  return (
    <div className="flex-1 bg-gray-50/80">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={handleBack} className="hover:text-gray-700">Secondary Markets</button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{mockMarketData.symbol}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold",
              mockMarketData.logoColor
            )}>
              {mockMarketData.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900">{mockMarketData.symbol}</h1>
                <span className="text-xl font-bold text-gray-900">${mockMarketData.currentPrice}</span>
                <span className={cn(
                  "text-sm font-medium",
                  mockMarketData.priceChange >= 0 ? "text-emerald-600" : "text-red-500"
                )}>
                  {mockMarketData.priceChange >= 0 ? "+" : ""}{mockMarketData.priceChange}%
                </span>
              </div>
              <p className="text-sm text-gray-500">{mockMarketData.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div>
              <span className="text-gray-500">24h Vol.</span>
              <span className="ml-2 font-medium">${mockMarketData.volume24h.toLocaleString()}</span>
              <span className="text-emerald-600 ml-1">202.8%</span>
            </div>
            <div className="border-l border-gray-300 pl-3">
              <span className="text-gray-500">Total Vol.</span>
              <span className="ml-2 font-medium">${mockMarketData.totalVolume.toLocaleString()}</span>
            </div>
            <div className="border-l border-gray-300 pl-3">
              <span className="text-gray-500">Implied FDV</span>
              <span className="ml-2 font-medium">{mockMarketData.impliedFDV}</span>
            </div>
            <div className="border-l border-gray-300 pl-3">
              <span className="text-gray-500">Settle Time</span>
              <Badge variant="secondary" className="ml-2 text-xs">{mockMarketData.settleTime}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-full border-gray-300">
              <span>On 🔮 Polymarket</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-full border-gray-300">
              About {mockMarketData.symbol}
            </Button>
            <Button size="sm" className="rounded-full bg-gray-900 hover:bg-gray-800 text-white">
              Create Order
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Order Book */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-gray-200">
              {["Market", "About", "Rules"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as any)}
                  className={cn(
                    "pb-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                    activeTab === tab.toLowerCase()
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Price Chart */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant={timeRange === "7d" ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "h-7 px-3 text-xs rounded-full",
                        timeRange === "7d" ? "bg-gray-100 text-gray-900" : ""
                      )}
                      onClick={() => setTimeRange("7d")}
                    >
                      Price
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-3 text-xs rounded-full">
                      Prediction <Badge variant="secondary" className="ml-1 text-[10px] bg-pink-100 text-pink-600">NEW</Badge>
                    </Button>
                    <div className="flex items-center gap-1 ml-4 text-xs text-gray-500">
                      <button 
                        onClick={() => setTimeRange("7d")}
                        className={cn("px-2 py-1 rounded", timeRange === "7d" && "bg-gray-100")}
                      >7d</button>
                      <button 
                        onClick={() => setTimeRange("1M")}
                        className={cn("px-2 py-1 rounded", timeRange === "1M" && "bg-gray-100")}
                      >1M</button>
                      <button 
                        onClick={() => setTimeRange("3M")}
                        className={cn("px-2 py-1 rounded", timeRange === "3M" && "bg-gray-100")}
                      >3M</button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Time 09/01/2026 11:09:48
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Last Price:</span>
                  <span className="ml-2 font-medium text-gray-900">${mockMarketData.currentPrice}</span>
                  <span className="ml-2 text-emerald-600">+{mockMarketData.priceChange}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: "#9ca3af", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: "#9ca3af", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        domain={['dataMin - 0.02', 'dataMax + 0.02']}
                        orientation="right"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Volume Chart */}
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">
                    Total Vol. ${mockMarketData.totalVolume.toLocaleString()}
                  </div>
                  <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <Bar dataKey="volume" fill="#a855f7" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Book */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {["Regular", "Resell", "All"].map((filter) => (
                      <Button
                        key={filter}
                        variant={orderFilter === filter.toLowerCase() ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-7 px-3 text-xs rounded-full",
                          orderFilter === filter.toLowerCase() 
                            ? "bg-gray-900 text-white" 
                            : "text-gray-600"
                        )}
                        onClick={() => setOrderFilter(filter.toLowerCase() as any)}
                      >
                        {filter}
                        {filter === "Resell" && <span className="ml-1 text-[10px] text-gray-400">ℹ</span>}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-7 px-3 text-xs rounded-full border-gray-300">
                      Collateral
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-3 text-xs rounded-full border-gray-300">
                      Fill Type
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Settings className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-8">
                  {/* Buy Orders */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                      <span>Price ($) ↓</span>
                      <span>Amount ↕</span>
                      <span>Collateral ↕</span>
                      <span></span>
                    </div>
                    <div className="space-y-1 mt-2">
                      {mockBuyOrders.map((order, i) => (
                        <div key={i} className="flex items-center justify-between text-sm py-1.5 relative">
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-emerald-50 rounded-sm" 
                            style={{ width: `${(order.amount / maxBuyAmount) * 30}%` }}
                          />
                          <span className="text-gray-700 relative z-10 w-16">{order.price}</span>
                          <span className="text-gray-600 relative z-10 w-16 text-right">{order.amount.toLocaleString()}</span>
                          <span className="text-gray-500 relative z-10 w-16 text-right flex items-center justify-end gap-1">
                            {order.collateral} <span className="text-emerald-500">●</span>
                          </span>
                          <Button size="sm" className="h-6 px-3 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded relative z-10">
                            Buy
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sell Orders */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                      <span>Price ($) ↑</span>
                      <span>Amount ↕</span>
                      <span>Collateral ↕</span>
                      <span></span>
                    </div>
                    <div className="space-y-1 mt-2">
                      {mockSellOrders.map((order, i) => (
                        <div key={i} className="flex items-center justify-between text-sm py-1.5 relative">
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-red-50 rounded-sm" 
                            style={{ width: `${(order.amount / maxSellAmount) * 30}%` }}
                          />
                          <span className="text-gray-700 relative z-10 w-16">{order.price}</span>
                          <span className="text-gray-600 relative z-10 w-16 text-right">{order.amount.toLocaleString()}</span>
                          <span className="text-gray-500 relative z-10 w-16 text-right flex items-center justify-end gap-1">
                            {order.collateral} <span className="text-red-500">●</span>
                          </span>
                          <Button size="sm" className="h-6 px-3 text-xs bg-red-500 hover:bg-red-600 text-white rounded relative z-10">
                            Sell
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-gray-900">Recent Activities</CardTitle>
                  <Button variant="outline" size="sm" className="h-7 px-3 text-xs rounded-full border-gray-300 gap-2">
                    <Filter className="h-3 w-3" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 text-xs font-medium text-gray-500">Time</th>
                        <th className="text-left py-2 text-xs font-medium text-gray-500">Order Type</th>
                        <th className="text-left py-2 text-xs font-medium text-gray-500">Side</th>
                        <th className="text-left py-2 text-xs font-medium text-gray-500">Pair</th>
                        <th className="text-right py-2 text-xs font-medium text-gray-500">Price ($)</th>
                        <th className="text-right py-2 text-xs font-medium text-gray-500">Amount</th>
                        <th className="text-right py-2 text-xs font-medium text-gray-500">Collateral</th>
                        <th className="text-right py-2 text-xs font-medium text-gray-500">Tx.ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockActivities.map((activity) => (
                        <tr key={activity.id} className="border-b border-gray-50">
                          <td className="py-3 text-sm text-gray-500">{activity.time}</td>
                          <td className="py-3 text-sm text-gray-700">{activity.orderType}</td>
                          <td className="py-3">
                            <span className={cn(
                              "text-sm font-medium",
                              activity.side === "Buy" ? "text-emerald-600" : "text-red-500"
                            )}>
                              {activity.side}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-700">{activity.pair}</td>
                          <td className="py-3 text-sm text-gray-700 text-right">${activity.price}</td>
                          <td className="py-3 text-sm text-gray-700 text-right">{activity.amount.toLocaleString()}</td>
                          <td className="py-3 text-sm text-right">
                            <span className="inline-flex items-center gap-1">
                              {activity.collateral}
                              <span className={activity.side === "Buy" ? "text-emerald-500" : "text-red-500"}>●</span>
                              <span className="text-pink-500">◆</span>
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-6">
            {/* Trade Panel */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Trade {mockMarketData.symbol}
                </CardTitle>
                <p className="text-xs text-gray-500">Price -</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Placeholder Illustration */}
                <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-xl">
                  <div className="w-20 h-20 mb-4 opacity-50">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gray-300">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M30 70 L50 30 L70 70" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 text-center">No order selected yet.</p>
                  <p className="text-xs text-gray-400 text-center">Pick one from the list to start trading.</p>
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg h-10">
                  Trade {mockMarketData.symbol}
                </Button>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price</span>
                    <span className="text-gray-400">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount Deliver</span>
                    <span className="text-gray-400">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">To be Received</span>
                    <span className="text-gray-400">-</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Orders */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-2 -mb-2">
                    My Filled Orders <Badge variant="secondary" className="ml-1 text-xs">0</Badge>
                  </button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2 -mb-2">
                    My Open Orders <Badge variant="secondary" className="ml-1 text-xs">0</Badge>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 mb-4 opacity-30">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
                      <rect x="20" y="30" width="60" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="50" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 text-center">Please connect your wallet to view orders</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              LIVE DATA
            </span>
            <span>Total Vol <strong className="text-gray-700">$338,658,865</strong></span>
            <span>Vol 24h: <strong className="text-gray-700">$160,204</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-700">Docs ↗</a>
            <a href="#" className="hover:text-gray-700">Dune ↗</a>
            <a href="#" className="hover:text-gray-700">Link3 ↗</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecondaryMarketDetail;
