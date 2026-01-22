/**
 * SECONDARY MARKET DETAIL PAGE - Light, minimalist trading interface
 * Matching reference design with charts, order book, and trading panel
 * Fully functional with working simulations
 */

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useBrokerPaths } from "@/broker-theme/hooks/useBrokerPaths";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Filter,
  Settings,
  Check,
  X,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Types
interface OrderBookOrder {
  id: string;
  price: number;
  amount: number;
  collateral: number;
}

interface UserOrder {
  id: string;
  side: "buy" | "sell";
  price: number;
  amount: number;
  collateral: number;
  status: "open" | "filled" | "cancelled";
  createdAt: Date;
  filledAt?: Date;
}

interface Activity {
  id: string;
  time: string;
  orderType: string;
  side: "Buy" | "Sell";
  pair: string;
  price: number;
  amount: number;
  collateral: number;
}

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

// Generate random ID
const generateId = () => `ord_${Math.random().toString(36).substr(2, 9)}`;

const SecondaryMarketDetail: React.FC = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const navigate = useNavigate();
  const { appPrefix } = useBrokerPaths();
  
  const [timeRange, setTimeRange] = useState<"7d" | "1M" | "3M">("7d");
  const [activeTab, setActiveTab] = useState<"market" | "about" | "rules">("market");
  const [orderFilter, setOrderFilter] = useState<"regular" | "resell" | "all">("regular");
  const [myOrdersTab, setMyOrdersTab] = useState<"filled" | "open">("filled");
  
  // Trading state
  const [selectedOrder, setSelectedOrder] = useState<OrderBookOrder | null>(null);
  const [selectedSide, setSelectedSide] = useState<"buy" | "sell" | null>(null);
  const [tradeAmount, setTradeAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [createOrderSide, setCreateOrderSide] = useState<"buy" | "sell">("buy");
  const [createOrderPrice, setCreateOrderPrice] = useState<string>("");
  const [createOrderAmount, setCreateOrderAmount] = useState<string>("");
  
  // Order book state (mutable for simulation)
  const [buyOrders, setBuyOrders] = useState<OrderBookOrder[]>([
    { id: generateId(), price: 0.093, amount: 10000, collateral: 930 },
    { id: generateId(), price: 0.094, amount: 8000, collateral: 752 },
    { id: generateId(), price: 0.097, amount: 10000, collateral: 970 },
    { id: generateId(), price: 0.15, amount: 800, collateral: 120 },
    { id: generateId(), price: 0.25, amount: 200, collateral: 50 },
  ]);
  
  const [sellOrders, setSellOrders] = useState<OrderBookOrder[]>([
    { id: generateId(), price: 0.065, amount: 5000, collateral: 325 },
    { id: generateId(), price: 0.05, amount: 10000, collateral: 500 },
    { id: generateId(), price: 0.03, amount: 4000, collateral: 120 },
    { id: generateId(), price: 0.02, amount: 1000, collateral: 20 },
  ]);
  
  // User orders
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);
  
  // Activities (dynamic)
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", time: "1h ago", orderType: "Open", side: "Sell", pair: "DANGCEM/USDC", price: 0.093, amount: 10000, collateral: 930 },
    { id: "2", time: "9h ago", orderType: "Open", side: "Sell", pair: "DANGCEM/USDC", price: 0.094, amount: 8000, collateral: 752 },
    { id: "3", time: "9h ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.096, amount: 2000, collateral: 192 },
    { id: "4", time: "9h ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.089, amount: 5000, collateral: 445 },
    { id: "5", time: "9h ago", orderType: "Filled", side: "Buy", pair: "DANGCEM/USDC", price: 0.0889, amount: 790, collateral: 70.2 },
  ]);

  const chartData = useMemo(() => {
    const days = timeRange === "7d" ? 30 : timeRange === "1M" ? 60 : 90;
    return generateChartData(days);
  }, [timeRange]);

  const handleBack = () => {
    navigate(`${appPrefix}/markets/secondary`);
  };

  const maxBuyAmount = Math.max(...buyOrders.map(o => o.amount), 1);
  const maxSellAmount = Math.max(...sellOrders.map(o => o.amount), 1);

  // Select order from order book
  const handleSelectOrder = (order: OrderBookOrder, side: "buy" | "sell") => {
    setSelectedOrder(order);
    setSelectedSide(side);
    setTradeAmount(order.amount.toString());
    toast.info(`Selected ${side} order at $${order.price}`);
  };

  // Execute trade against selected order
  const handleExecuteTrade = async () => {
    if (!selectedOrder || !selectedSide || !tradeAmount) {
      toast.error("Please select an order and enter amount");
      return;
    }

    const amount = parseInt(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid amount");
      return;
    }

    if (amount > selectedOrder.amount) {
      toast.error("Amount exceeds available quantity");
      return;
    }

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update order book
    if (selectedSide === "buy") {
      setBuyOrders(prev => {
        const updated = prev.map(o => {
          if (o.id === selectedOrder.id) {
            const newAmount = o.amount - amount;
            return newAmount <= 0 ? null : { ...o, amount: newAmount, collateral: newAmount * o.price };
          }
          return o;
        }).filter(Boolean) as OrderBookOrder[];
        return updated;
      });
    } else {
      setSellOrders(prev => {
        const updated = prev.map(o => {
          if (o.id === selectedOrder.id) {
            const newAmount = o.amount - amount;
            return newAmount <= 0 ? null : { ...o, amount: newAmount, collateral: newAmount * o.price };
          }
          return o;
        }).filter(Boolean) as OrderBookOrder[];
        return updated;
      });
    }

    // Add to user orders (filled)
    const newUserOrder: UserOrder = {
      id: generateId(),
      side: selectedSide === "buy" ? "sell" : "buy", // User takes opposite side
      price: selectedOrder.price,
      amount: amount,
      collateral: amount * selectedOrder.price,
      status: "filled",
      createdAt: new Date(),
      filledAt: new Date(),
    };
    setUserOrders(prev => [newUserOrder, ...prev]);

    // Add to activities
    const newActivity: Activity = {
      id: generateId(),
      time: "Just now",
      orderType: "Filled",
      side: selectedSide === "buy" ? "Sell" : "Buy",
      pair: "DANGCEM/USDC",
      price: selectedOrder.price,
      amount: amount,
      collateral: amount * selectedOrder.price,
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]);

    setIsProcessing(false);
    setSelectedOrder(null);
    setSelectedSide(null);
    setTradeAmount("");

    toast.success(`Successfully ${selectedSide === "buy" ? "sold" : "bought"} ${amount.toLocaleString()} ${mockMarketData.symbol} at $${selectedOrder.price}`);
  };

  // Create new order
  const handleCreateOrder = async () => {
    const price = parseFloat(createOrderPrice);
    const amount = parseInt(createOrderAmount);

    if (isNaN(price) || price <= 0) {
      toast.error("Invalid price");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid amount");
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newOrder: OrderBookOrder = {
      id: generateId(),
      price,
      amount,
      collateral: price * amount,
    };

    if (createOrderSide === "buy") {
      setBuyOrders(prev => [...prev, newOrder].sort((a, b) => b.price - a.price));
    } else {
      setSellOrders(prev => [...prev, newOrder].sort((a, b) => a.price - b.price));
    }

    // Add to user orders (open)
    const newUserOrder: UserOrder = {
      id: newOrder.id,
      side: createOrderSide,
      price,
      amount,
      collateral: price * amount,
      status: "open",
      createdAt: new Date(),
    };
    setUserOrders(prev => [newUserOrder, ...prev]);

    // Add to activities
    const newActivity: Activity = {
      id: generateId(),
      time: "Just now",
      orderType: "Open",
      side: createOrderSide === "buy" ? "Buy" : "Sell",
      pair: "DANGCEM/USDC",
      price,
      amount,
      collateral: price * amount,
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]);

    setIsProcessing(false);
    setShowCreateOrderModal(false);
    setCreateOrderPrice("");
    setCreateOrderAmount("");

    toast.success(`${createOrderSide.charAt(0).toUpperCase() + createOrderSide.slice(1)} order created at $${price} for ${amount.toLocaleString()} ${mockMarketData.symbol}`);
  };

  // Cancel user order
  const handleCancelOrder = async (orderId: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const order = userOrders.find(o => o.id === orderId);
    if (order && order.status === "open") {
      // Remove from order book
      if (order.side === "buy") {
        setBuyOrders(prev => prev.filter(o => o.id !== orderId));
      } else {
        setSellOrders(prev => prev.filter(o => o.id !== orderId));
      }

      // Update user order status
      setUserOrders(prev => prev.map(o => 
        o.id === orderId ? { ...o, status: "cancelled" as const } : o
      ));

      toast.success("Order cancelled successfully");
    }

    setIsProcessing(false);
  };

  const filledOrders = userOrders.filter(o => o.status === "filled");
  const openOrders = userOrders.filter(o => o.status === "open");

  const tradeCollateral = selectedOrder && tradeAmount 
    ? (parseFloat(tradeAmount) * selectedOrder.price).toFixed(2) 
    : "-";

  return (
    <div className="flex-1 bg-gray-50/80">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={handleBack} className="hover:text-gray-700 transition-colors">Secondary Markets</button>
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
              "w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold transition-transform hover:scale-110",
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
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-full border-gray-300 hover:bg-gray-100 transition-colors"
              onClick={() => toast.info("Opening Polymarket...")}
            >
              <span>On 🔮 Polymarket</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-full border-gray-300 hover:bg-gray-100 transition-colors"
              onClick={() => setActiveTab("about")}
            >
              About {mockMarketData.symbol}
            </Button>
            <Button 
              size="sm" 
              className="rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors"
              onClick={() => setShowCreateOrderModal(true)}
            >
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

            {/* Tab Content */}
            {activeTab === "market" && (
              <>
                {/* Price Chart */}
                <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-3 text-xs rounded-full bg-gray-100 text-gray-900"
                        >
                          Price
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-3 text-xs rounded-full">
                          Prediction <Badge variant="secondary" className="ml-1 text-[10px] bg-pink-100 text-pink-600">NEW</Badge>
                        </Button>
                        <div className="flex items-center gap-1 ml-4 text-xs text-gray-500">
                          {(["7d", "1M", "3M"] as const).map((range) => (
                            <button 
                              key={range}
                              onClick={() => setTimeRange(range)}
                              className={cn(
                                "px-2 py-1 rounded transition-colors",
                                timeRange === range && "bg-gray-100 text-gray-900"
                              )}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date().toLocaleString()}
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
                        {(["regular", "resell", "all"] as const).map((filter) => (
                          <Button
                            key={filter}
                            variant={orderFilter === filter ? "default" : "ghost"}
                            size="sm"
                            className={cn(
                              "h-7 px-3 text-xs rounded-full transition-colors",
                              orderFilter === filter 
                                ? "bg-gray-900 text-white" 
                                : "text-gray-600 hover:bg-gray-100"
                            )}
                            onClick={() => setOrderFilter(filter)}
                          >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            {filter === "resell" && <span className="ml-1 text-[10px] text-gray-400">ℹ</span>}
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
                          {buyOrders.map((order) => (
                            <div 
                              key={order.id} 
                              className={cn(
                                "flex items-center justify-between text-sm py-1.5 relative cursor-pointer transition-all duration-150",
                                selectedOrder?.id === order.id && selectedSide === "buy" && "ring-2 ring-emerald-500 rounded"
                              )}
                              onClick={() => handleSelectOrder(order, "buy")}
                            >
                              <div 
                                className="absolute left-0 top-0 bottom-0 bg-emerald-50 rounded-sm transition-all" 
                                style={{ width: `${(order.amount / maxBuyAmount) * 30}%` }}
                              />
                              <span className="text-gray-700 relative z-10 w-16">{order.price}</span>
                              <span className="text-gray-600 relative z-10 w-16 text-right">{order.amount.toLocaleString()}</span>
                              <span className="text-gray-500 relative z-10 w-16 text-right flex items-center justify-end gap-1">
                                {order.collateral.toFixed(0)} <span className="text-emerald-500">●</span>
                              </span>
                              <Button 
                                size="sm" 
                                className="h-6 px-3 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded relative z-10 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectOrder(order, "buy");
                                }}
                              >
                                Buy
                              </Button>
                            </div>
                          ))}
                          {buyOrders.length === 0 && (
                            <p className="text-center text-sm text-gray-400 py-4">No buy orders</p>
                          )}
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
                          {sellOrders.map((order) => (
                            <div 
                              key={order.id} 
                              className={cn(
                                "flex items-center justify-between text-sm py-1.5 relative cursor-pointer transition-all duration-150",
                                selectedOrder?.id === order.id && selectedSide === "sell" && "ring-2 ring-red-500 rounded"
                              )}
                              onClick={() => handleSelectOrder(order, "sell")}
                            >
                              <div 
                                className="absolute left-0 top-0 bottom-0 bg-red-50 rounded-sm transition-all" 
                                style={{ width: `${(order.amount / maxSellAmount) * 30}%` }}
                              />
                              <span className="text-gray-700 relative z-10 w-16">{order.price}</span>
                              <span className="text-gray-600 relative z-10 w-16 text-right">{order.amount.toLocaleString()}</span>
                              <span className="text-gray-500 relative z-10 w-16 text-right flex items-center justify-end gap-1">
                                {order.collateral.toFixed(0)} <span className="text-red-500">●</span>
                              </span>
                              <Button 
                                size="sm" 
                                className="h-6 px-3 text-xs bg-red-500 hover:bg-red-600 text-white rounded relative z-10 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectOrder(order, "sell");
                                }}
                              >
                                Sell
                              </Button>
                            </div>
                          ))}
                          {sellOrders.length === 0 && (
                            <p className="text-center text-sm text-gray-400 py-4">No sell orders</p>
                          )}
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
                          {activities.map((activity) => (
                            <tr key={activity.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
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
                                  {activity.collateral.toFixed(1)}
                                  <span className={activity.side === "Buy" ? "text-emerald-500" : "text-red-500"}>●</span>
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
              </>
            )}

            {activeTab === "about" && (
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About {mockMarketData.name}</h2>
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>
                      {mockMarketData.name} ({mockMarketData.symbol}) is one of the largest cement producers in Africa 
                      and among the top 10 in the world. The company operates an integrated cement production line 
                      with operations in Nigeria and other African countries.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Market Cap</span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{mockMarketData.impliedFDV}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Sector</span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">Industrial</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Listed Exchange</span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">NGX</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Year Founded</span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">1981</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "rules" && (
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Trading Rules</h2>
                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="font-medium text-amber-800">⚠️ Important Notice</p>
                      <p className="text-amber-700 mt-1">All trades are settled T+2 (two business days after trade execution).</p>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                        <span>Minimum order size: 100 units</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                        <span>Maximum order size: 1,000,000 units per transaction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                        <span>Price tick size: $0.001</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                        <span>Collateral requirement: 100% of order value</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
                        <span>Orders can be cancelled before being matched</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-6">
            {/* Trade Panel */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Trade {mockMarketData.symbol}
                </CardTitle>
                <p className="text-xs text-gray-500">
                  Price - {selectedOrder ? `$${selectedOrder.price}` : "Select an order"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedOrder ? (
                  <>
                    <div className={cn(
                      "p-4 rounded-xl",
                      selectedSide === "buy" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"
                    )}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Selected Order</span>
                        <Badge className={selectedSide === "buy" ? "bg-emerald-500" : "bg-red-500"}>
                          {selectedSide === "buy" ? "Buy" : "Sell"} Order
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Price</span>
                          <span className="font-medium">${selectedOrder.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Available</span>
                          <span className="font-medium">{selectedOrder.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Amount</label>
                      <Input
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="bg-gray-50 border-gray-200"
                        max={selectedOrder.amount}
                      />
                      <div className="flex justify-between mt-1">
                        <button 
                          className="text-xs text-gray-500 hover:text-gray-700"
                          onClick={() => setTradeAmount(Math.floor(selectedOrder.amount * 0.25).toString())}
                        >
                          25%
                        </button>
                        <button 
                          className="text-xs text-gray-500 hover:text-gray-700"
                          onClick={() => setTradeAmount(Math.floor(selectedOrder.amount * 0.5).toString())}
                        >
                          50%
                        </button>
                        <button 
                          className="text-xs text-gray-500 hover:text-gray-700"
                          onClick={() => setTradeAmount(Math.floor(selectedOrder.amount * 0.75).toString())}
                        >
                          75%
                        </button>
                        <button 
                          className="text-xs text-gray-500 hover:text-gray-700"
                          onClick={() => setTradeAmount(selectedOrder.amount.toString())}
                        >
                          Max
                        </button>
                      </div>
                    </div>

                    <Button 
                      className={cn(
                        "w-full h-10 rounded-lg transition-colors",
                        selectedSide === "buy" 
                          ? "bg-emerald-500 hover:bg-emerald-600" 
                          : "bg-red-500 hover:bg-red-600",
                        "text-white"
                      )}
                      onClick={handleExecuteTrade}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        `${selectedSide === "buy" ? "Sell" : "Buy"} ${mockMarketData.symbol}`
                      )}
                    </Button>

                    <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price</span>
                        <span className="text-gray-900">${selectedOrder.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span className="text-gray-900">{tradeAmount || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total</span>
                        <span className="text-gray-900 font-medium">${tradeCollateral}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-xl">
                      <div className="w-20 h-20 mb-4 opacity-50">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-300">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                          <path d="M30 70 L50 30 L70 70" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 text-center">No order selected yet.</p>
                      <p className="text-xs text-gray-400 text-center">Pick one from the order book to start trading.</p>
                    </div>

                    <Button 
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg h-10 transition-colors"
                      onClick={() => setShowCreateOrderModal(true)}
                    >
                      Create Order
                    </Button>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price</span>
                        <span className="text-gray-400">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span className="text-gray-400">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total</span>
                        <span className="text-gray-400">-</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* My Orders */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <button 
                    className={cn(
                      "text-sm font-medium pb-2 -mb-2 transition-colors",
                      myOrdersTab === "filled" 
                        ? "text-gray-900 border-b-2 border-gray-900" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setMyOrdersTab("filled")}
                  >
                    My Filled Orders <Badge variant="secondary" className="ml-1 text-xs">{filledOrders.length}</Badge>
                  </button>
                  <button 
                    className={cn(
                      "text-sm font-medium pb-2 -mb-2 transition-colors",
                      myOrdersTab === "open" 
                        ? "text-gray-900 border-b-2 border-gray-900" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setMyOrdersTab("open")}
                  >
                    My Open Orders <Badge variant="secondary" className="ml-1 text-xs">{openOrders.length}</Badge>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {myOrdersTab === "filled" && (
                  filledOrders.length > 0 ? (
                    <div className="space-y-2">
                      {filledOrders.map(order => (
                        <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Badge className={order.side === "buy" ? "bg-emerald-500" : "bg-red-500"}>
                                {order.side}
                              </Badge>
                              <span className="text-sm font-medium">{order.amount.toLocaleString()}</span>
                            </div>
                            <span className="text-sm text-gray-600">${order.price}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Filled {order.filledAt?.toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-sm text-gray-500 text-center">No filled orders yet</p>
                    </div>
                  )
                )}
                {myOrdersTab === "open" && (
                  openOrders.length > 0 ? (
                    <div className="space-y-2">
                      {openOrders.map(order => (
                        <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Badge className={order.side === "buy" ? "bg-emerald-500" : "bg-red-500"}>
                                {order.side}
                              </Badge>
                              <span className="text-sm font-medium">{order.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">${order.price}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 hover:bg-red-100"
                                onClick={() => handleCancelOrder(order.id)}
                                disabled={isProcessing}
                              >
                                <X className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Created {order.createdAt.toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-sm text-gray-500 text-center">No open orders</p>
                    </div>
                  )
                )}
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
            <a href="#" className="hover:text-gray-700 transition-colors">Docs ↗</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Dune ↗</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Link3 ↗</a>
          </div>
        </div>
      </main>

      {/* Create Order Modal */}
      <Dialog open={showCreateOrderModal} onOpenChange={setShowCreateOrderModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>
              Place a new {createOrderSide} order for {mockMarketData.symbol}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Button
                variant={createOrderSide === "buy" ? "default" : "outline"}
                className={cn(
                  "flex-1 transition-colors",
                  createOrderSide === "buy" && "bg-emerald-500 hover:bg-emerald-600"
                )}
                onClick={() => setCreateOrderSide("buy")}
              >
                Buy
              </Button>
              <Button
                variant={createOrderSide === "sell" ? "default" : "outline"}
                className={cn(
                  "flex-1 transition-colors",
                  createOrderSide === "sell" && "bg-red-500 hover:bg-red-600"
                )}
                onClick={() => setCreateOrderSide("sell")}
              >
                Sell
              </Button>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Price ($)</label>
              <Input
                type="number"
                step="0.001"
                value={createOrderPrice}
                onChange={(e) => setCreateOrderPrice(e.target.value)}
                placeholder="0.000"
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Amount</label>
              <Input
                type="number"
                value={createOrderAmount}
                onChange={(e) => setCreateOrderAmount(e.target.value)}
                placeholder="0"
                className="bg-gray-50 border-gray-200"
              />
            </div>
            {createOrderPrice && createOrderAmount && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Collateral</span>
                  <span className="font-medium text-gray-900">
                    ${(parseFloat(createOrderPrice) * parseInt(createOrderAmount)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateOrderModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateOrder}
              disabled={isProcessing || !createOrderPrice || !createOrderAmount}
              className={cn(
                "transition-colors",
                createOrderSide === "buy" 
                  ? "bg-emerald-500 hover:bg-emerald-600" 
                  : "bg-red-500 hover:bg-red-600"
              )}
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecondaryMarketDetail;
