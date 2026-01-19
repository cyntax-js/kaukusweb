/**
 * Market Depth & Spread Page
 * 
 * Order book depth and bid-ask spread tracking.
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock order book data
const orderBookBids = [
  { price: 285.50, volume: 15000, total: 15000, percent: 100 },
  { price: 285.40, volume: 12000, total: 27000, percent: 80 },
  { price: 285.30, volume: 8000, total: 35000, percent: 53 },
  { price: 285.20, volume: 20000, total: 55000, percent: 100 },
  { price: 285.10, volume: 5000, total: 60000, percent: 33 },
];

const orderBookAsks = [
  { price: 286.00, volume: 10000, total: 10000, percent: 50 },
  { price: 286.10, volume: 18000, total: 28000, percent: 90 },
  { price: 286.20, volume: 7000, total: 35000, percent: 35 },
  { price: 286.30, volume: 20000, total: 55000, percent: 100 },
  { price: 286.40, volume: 12000, total: 67000, percent: 60 },
];

const spreadHistory = [
  { time: "09:00", spread: 0.18, avgSpread: 0.20 },
  { time: "10:00", spread: 0.22, avgSpread: 0.20 },
  { time: "11:00", spread: 0.15, avgSpread: 0.20 },
  { time: "12:00", spread: 0.20, avgSpread: 0.20 },
  { time: "13:00", spread: 0.25, avgSpread: 0.20 },
  { time: "14:00", spread: 0.17, avgSpread: 0.20 },
];

const depthAnalytics = [
  { symbol: "DANGCEM", bidDepth: 75000, askDepth: 82000, imbalance: -8.5, spread: 0.18 },
  { symbol: "GTCO", bidDepth: 150000, askDepth: 145000, imbalance: 3.3, spread: 0.53 },
  { symbol: "ZENITH", bidDepth: 95000, askDepth: 98000, imbalance: -3.1, spread: 0.47 },
  { symbol: "MTNN", bidDepth: 25000, askDepth: 30000, imbalance: -16.7, spread: 0.26 },
  { symbol: "AIRTEL", bidDepth: 8000, askDepth: 7500, imbalance: 6.3, spread: 0.13 },
];

export default function MarketDepth() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-chart-5" />
            Market Depth & Spread
          </h1>
          <p className="text-muted-foreground">
            Monitor order book depth and bid-ask spread dynamics
          </p>
        </div>
        <Select defaultValue="DANGCEM">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select symbol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DANGCEM">DANGCEM</SelectItem>
            <SelectItem value="GTCO">GTCO</SelectItem>
            <SelectItem value="ZENITH">ZENITH</SelectItem>
            <SelectItem value="MTNN">MTNN</SelectItem>
            <SelectItem value="AIRTEL">AIRTEL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Spread</p>
                <p className="text-2xl font-bold">0.18%</p>
              </div>
              <Badge className="bg-success/10 text-success">Within Target</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bid Depth</p>
                <p className="text-2xl font-bold text-success">₦17.1M</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ask Depth</p>
                <p className="text-2xl font-bold text-destructive">₦19.2M</p>
              </div>
              <ArrowDownRight className="w-5 h-5 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order Imbalance</p>
                <p className="text-2xl font-bold">-11%</p>
              </div>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orderbook" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="spread">Spread Analysis</TabsTrigger>
          <TabsTrigger value="depth">Depth Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bids */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Bids (Buy Orders)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex text-xs text-muted-foreground mb-3">
                    <span className="w-1/3">Price</span>
                    <span className="w-1/3 text-right">Volume</span>
                    <span className="w-1/3 text-right">Total</span>
                  </div>
                  {orderBookBids.map((level, i) => (
                    <div key={i} className="relative">
                      <div 
                        className="absolute inset-0 bg-success/10 rounded"
                        style={{ width: `${level.percent}%` }}
                      />
                      <div className="relative flex items-center py-2 px-2">
                        <span className="w-1/3 text-success font-medium">₦{level.price.toFixed(2)}</span>
                        <span className="w-1/3 text-right">{level.volume.toLocaleString()}</span>
                        <span className="w-1/3 text-right text-muted-foreground">{level.total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Asks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  Asks (Sell Orders)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex text-xs text-muted-foreground mb-3">
                    <span className="w-1/3">Price</span>
                    <span className="w-1/3 text-right">Volume</span>
                    <span className="w-1/3 text-right">Total</span>
                  </div>
                  {orderBookAsks.map((level, i) => (
                    <div key={i} className="relative">
                      <div 
                        className="absolute inset-0 bg-destructive/10 rounded right-0"
                        style={{ width: `${level.percent}%`, marginLeft: 'auto' }}
                      />
                      <div className="relative flex items-center py-2 px-2">
                        <span className="w-1/3 text-destructive font-medium">₦{level.price.toFixed(2)}</span>
                        <span className="w-1/3 text-right">{level.volume.toLocaleString()}</span>
                        <span className="w-1/3 text-right text-muted-foreground">{level.total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spread">
          <Card>
            <CardHeader>
              <CardTitle>Spread History</CardTitle>
              <CardDescription>Intraday bid-ask spread tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spreadHistory.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-16 text-sm text-muted-foreground">{item.time}</span>
                    <div className="flex-1">
                      <Progress 
                        value={(item.spread / 0.30) * 100} 
                        className="h-2"
                      />
                    </div>
                    <span className={`w-16 text-right font-medium ${
                      item.spread <= item.avgSpread ? "text-success" : "text-warning"
                    }`}>
                      {item.spread.toFixed(2)}%
                    </span>
                    <Badge variant={item.spread <= item.avgSpread ? "default" : "secondary"}>
                      {item.spread <= item.avgSpread ? "Good" : "Wide"}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between text-sm">
                <span className="text-muted-foreground">Target Spread: 0.20%</span>
                <span>Average Today: 0.195%</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depth">
          <Card>
            <CardHeader>
              <CardTitle>Depth Analytics by Security</CardTitle>
              <CardDescription>Compare order book depth across your assigned securities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {depthAnalytics.map((item) => (
                  <div key={item.symbol} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold">{item.symbol}</span>
                      <Badge variant={Math.abs(item.imbalance) < 5 ? "default" : "secondary"}>
                        Spread: {item.spread.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Bid Depth</p>
                        <p className="text-lg font-medium text-success">
                          ₦{(item.bidDepth / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ask Depth</p>
                        <p className="text-lg font-medium text-destructive">
                          ₦{(item.askDepth / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Imbalance</p>
                        <p className={`text-lg font-medium ${
                          item.imbalance > 0 ? "text-success" : "text-destructive"
                        }`}>
                          {item.imbalance > 0 ? "+" : ""}{item.imbalance.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
