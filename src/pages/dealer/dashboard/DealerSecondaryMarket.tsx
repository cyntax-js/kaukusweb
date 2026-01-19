/**
 * Secondary Market Trading Page - Dealer
 * Buy/sell orders, order history, and trade executions
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dealerRecentTrades } from "@/mocks/rolesDashboardData";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function DealerSecondaryMarket() {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [searchQuery, setSearchQuery] = useState("");

  // Mock order history
  const orderHistory = [
    { id: 'o1', symbol: 'DANGOTE', side: 'buy', quantity: 10000, price: 245.50, status: 'filled', createdAt: new Date() },
    { id: 'o2', symbol: 'GTCO', side: 'sell', quantity: 25000, price: 42.30, status: 'filled', createdAt: new Date(Date.now() - 3600000) },
    { id: 'o3', symbol: 'MTN', side: 'buy', quantity: 5000, price: 195.00, status: 'pending', createdAt: new Date(Date.now() - 7200000) },
    { id: 'o4', symbol: 'ZENITH', side: 'sell', quantity: 15000, price: 38.75, status: 'cancelled', createdAt: new Date(Date.now() - 86400000) },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'filled':
        return <Badge className="bg-success/10 text-success">Filled</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning">Pending</Badge>;
      case 'partial':
        return <Badge className="bg-chart-4/10 text-chart-4">Partial</Badge>;
      case 'cancelled':
        return <Badge className="bg-destructive/10 text-destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Secondary Market Trading</h1>
        <p className="text-muted-foreground">Execute trades and manage orders</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Panel */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">New Order</h3>
          
          <div className="flex gap-2 mb-4">
            <Button
              variant={orderType === 'buy' ? 'default' : 'outline'}
              className={`flex-1 ${orderType === 'buy' ? 'bg-success hover:bg-success/90' : ''}`}
              onClick={() => setOrderType('buy')}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Buy
            </Button>
            <Button
              variant={orderType === 'sell' ? 'default' : 'outline'}
              className={`flex-1 ${orderType === 'sell' ? 'bg-destructive hover:bg-destructive/90' : ''}`}
              onClick={() => setOrderType('sell')}
            >
              <ArrowDownRight className="w-4 h-4 mr-2" />
              Sell
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Symbol</label>
              <select className="w-full p-2 rounded-md border border-input bg-background">
                <option>DANGOTE</option>
                <option>GTCO</option>
                <option>MTN</option>
                <option>ZENITH</option>
                <option>UBA</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Order Type</label>
              <select className="w-full p-2 rounded-md border border-input bg-background">
                <option>Market</option>
                <option>Limit</option>
                <option>Stop Loss</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <Input type="number" placeholder="Enter quantity" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Price (₦)</label>
              <Input type="number" placeholder="Enter price" />
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Estimated Total</span>
                <span className="font-medium">₦0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Commission</span>
                <span className="font-medium">₦0.00</span>
              </div>
            </div>

            <Button 
              className={`w-full ${orderType === 'buy' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'}`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Place {orderType === 'buy' ? 'Buy' : 'Sell'} Order
            </Button>
          </div>
        </Card>

        {/* Orders and Trades */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="trades" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="trades">Recent Trades</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="pending">Pending Orders</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-48"
                  />
                </div>
              </div>
            </div>

            {/* Recent Trades Tab */}
            <TabsContent value="trades">
              <Card className="p-6">
                <div className="space-y-3">
                  {dealerRecentTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${trade.side === 'buy' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {trade.side === 'buy' ? (
                          <ArrowUpRight className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{trade.symbol}</span>
                          <Badge variant="outline" className="text-xs">{trade.side.toUpperCase()}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{trade.broker}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₦{(trade.price * trade.quantity).toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{trade.quantity.toLocaleString()} @ ₦{trade.price}</div>
                      </div>
                      {getStatusBadge(trade.status)}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Order History Tab */}
            <TabsContent value="orders">
              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground border-b">
                        <th className="pb-3 font-medium">Time</th>
                        <th className="pb-3 font-medium">Symbol</th>
                        <th className="pb-3 font-medium">Side</th>
                        <th className="pb-3 font-medium">Quantity</th>
                        <th className="pb-3 font-medium">Price</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderHistory.map(order => (
                        <tr key={order.id} className="border-b border-border/50">
                          <td className="py-3 text-sm text-muted-foreground">
                            {order.createdAt.toLocaleTimeString()}
                          </td>
                          <td className="py-3 font-medium">{order.symbol}</td>
                          <td className="py-3">
                            <Badge variant="outline" className={order.side === 'buy' ? 'text-success' : 'text-destructive'}>
                              {order.side.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3">{order.quantity.toLocaleString()}</td>
                          <td className="py-3">₦{order.price.toFixed(2)}</td>
                          <td className="py-3">{getStatusBadge(order.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Pending Orders Tab */}
            <TabsContent value="pending">
              <Card className="p-6">
                {orderHistory.filter(o => o.status === 'pending').length > 0 ? (
                  <div className="space-y-3">
                    {orderHistory.filter(o => o.status === 'pending').map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-warning/30 bg-warning/5">
                        <div className="flex items-center gap-4">
                          <Clock className="w-5 h-5 text-warning" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{order.symbol}</span>
                              <Badge variant="outline" className={order.side === 'buy' ? 'text-success' : 'text-destructive'}>
                                {order.side.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.quantity.toLocaleString()} @ ₦{order.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Pending Orders</h3>
                    <p className="text-sm text-muted-foreground">All orders have been executed</p>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
