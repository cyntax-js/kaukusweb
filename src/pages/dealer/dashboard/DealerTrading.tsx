import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, ArrowUpDown, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { dealerRecentTrades, DealerTrade } from "@/mocks/rolesDashboardData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(value);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
};

export default function DealerTrading() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');

  const getStatusBadge = (status: DealerTrade['status']) => {
    switch (status) {
      case 'filled':
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30"><CheckCircle2 className="w-3 h-3 mr-1" />Filled</Badge>;
      case 'partial':
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30"><Clock className="w-3 h-3 mr-1" />Partial</Badge>;
      case 'pending':
        return <Badge className="bg-chart-5/20 text-chart-5 border-chart-5/30"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trading Operations</h1>
        <p className="text-muted-foreground">Execute trades and manage orders across markets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Entry Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>New Order</CardTitle>
            <CardDescription>Place a new trade order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={side === 'buy' ? 'default' : 'outline'}
                className={side === 'buy' ? 'flex-1 bg-chart-2 hover:bg-chart-2/90' : 'flex-1'}
                onClick={() => setSide('buy')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Buy
              </Button>
              <Button
                variant={side === 'sell' ? 'default' : 'outline'}
                className={side === 'sell' ? 'flex-1 bg-destructive hover:bg-destructive/90' : 'flex-1'}
                onClick={() => setSide('sell')}
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Sell
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Symbol</label>
              <Select defaultValue="DANGOTE">
                <SelectTrigger>
                  <SelectValue placeholder="Select symbol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DANGOTE">DANGOTE</SelectItem>
                  <SelectItem value="GTCO">GTCO</SelectItem>
                  <SelectItem value="MTN">MTN</SelectItem>
                  <SelectItem value="ZENITH">ZENITH</SelectItem>
                  <SelectItem value="UBA">UBA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'market' | 'limit')}>
                <TabsList className="w-full">
                  <TabsTrigger value="market" className="flex-1">Market</TabsTrigger>
                  <TabsTrigger value="limit" className="flex-1">Limit</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <Input type="number" placeholder="Enter quantity" defaultValue="1000" />
            </div>

            {orderType === 'limit' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Limit Price</label>
                <Input type="number" placeholder="Enter limit price" />
              </div>
            )}

            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Est. Total</span>
                <span className="font-medium">{formatCurrency(245500)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Commission</span>
                <span className="font-medium">{formatCurrency(1227.5)}</span>
              </div>
            </div>

            <Button className={`w-full ${side === 'buy' ? 'bg-chart-2 hover:bg-chart-2/90' : 'bg-destructive hover:bg-destructive/90'}`}>
              {side === 'buy' ? 'Buy' : 'Sell'} DANGOTE
            </Button>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Your latest executed trades</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dealerRecentTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="text-muted-foreground">{formatTime(trade.timestamp)}</TableCell>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={trade.side === 'buy' ? 'text-chart-2 border-chart-2' : 'text-destructive border-destructive'}>
                        {trade.side.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.quantity.toLocaleString()}</TableCell>
                    <TableCell>{formatCurrency(trade.price)}</TableCell>
                    <TableCell className="text-muted-foreground">{trade.broker}</TableCell>
                    <TableCell>{getStatusBadge(trade.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
