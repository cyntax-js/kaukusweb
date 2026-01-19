/**
 * Dealer OTC DEX - Over-the-Counter Decentralized Exchange
 * Create and manage buy/sell offers for large block trades
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Eye,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Filter,
} from "lucide-react";

interface OTCOffer {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  pricePerUnit: number;
  minQuantity: number;
  isBargainable: boolean;
  status: 'active' | 'partially_filled' | 'filled' | 'cancelled' | 'expired';
  filledQuantity: number;
  bargainCount: number;
  createdAt: Date;
  expiresAt: Date;
}

interface BargainRequest {
  id: string;
  offerId: string;
  symbol: string;
  originalPrice: number;
  proposedPrice: number;
  quantity: number;
  userId: string;
  userName: string;
  broker: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  createdAt: Date;
  counterPrice?: number;
}

interface BrokerVolume {
  id: string;
  brokerName: string;
  brokerCode: string;
  totalVolume: number;
  tradesCount: number;
  avgTradeSize: number;
  lastTrade: Date;
}

const mockOffers: OTCOffer[] = [
  { id: 'otc1', symbol: 'DANGOTE', side: 'sell', quantity: 500000, pricePerUnit: 248.50, minQuantity: 50000, isBargainable: true, status: 'active', filledQuantity: 150000, bargainCount: 3, createdAt: new Date(Date.now() - 86400000), expiresAt: new Date(Date.now() + 604800000) },
  { id: 'otc2', symbol: 'GTCO', side: 'buy', quantity: 1000000, pricePerUnit: 41.80, minQuantity: 100000, isBargainable: false, status: 'active', filledQuantity: 0, bargainCount: 0, createdAt: new Date(Date.now() - 172800000), expiresAt: new Date(Date.now() + 432000000) },
  { id: 'otc3', symbol: 'MTN', side: 'sell', quantity: 200000, pricePerUnit: 196.00, minQuantity: 20000, isBargainable: true, status: 'partially_filled', filledQuantity: 80000, bargainCount: 5, createdAt: new Date(Date.now() - 259200000), expiresAt: new Date(Date.now() + 259200000) },
  { id: 'otc4', symbol: 'ZENITH', side: 'buy', quantity: 750000, pricePerUnit: 38.50, minQuantity: 75000, isBargainable: true, status: 'filled', filledQuantity: 750000, bargainCount: 2, createdAt: new Date(Date.now() - 345600000), expiresAt: new Date(Date.now() - 86400000) },
  { id: 'otc5', symbol: 'UBA', side: 'sell', quantity: 2000000, pricePerUnit: 23.25, minQuantity: 200000, isBargainable: false, status: 'active', filledQuantity: 500000, bargainCount: 0, createdAt: new Date(Date.now() - 432000000), expiresAt: new Date(Date.now() + 172800000) },
];

const mockBargains: BargainRequest[] = [
  { id: 'b1', offerId: 'otc1', symbol: 'DANGOTE', originalPrice: 248.50, proposedPrice: 245.00, quantity: 100000, userId: 'u1', userName: 'Chief Adebayo', broker: 'Alpha Securities', status: 'pending', createdAt: new Date() },
  { id: 'b2', offerId: 'otc3', symbol: 'MTN', originalPrice: 196.00, proposedPrice: 192.50, quantity: 50000, userId: 'u2', userName: 'Investment Trust Beta', broker: 'Beta Investments', status: 'pending', createdAt: new Date(Date.now() - 3600000) },
  { id: 'b3', offerId: 'otc1', symbol: 'DANGOTE', originalPrice: 248.50, proposedPrice: 244.00, quantity: 75000, userId: 'u3', userName: 'Pension Fund Alpha', broker: 'Gamma Trading', status: 'countered', createdAt: new Date(Date.now() - 7200000), counterPrice: 246.50 },
  { id: 'b4', offerId: 'otc4', symbol: 'ZENITH', originalPrice: 38.50, proposedPrice: 37.80, quantity: 200000, userId: 'u4', userName: 'Delta Holdings', broker: 'Delta Markets', status: 'accepted', createdAt: new Date(Date.now() - 86400000) },
];

const mockBrokerVolumes: BrokerVolume[] = [
  { id: 'bv1', brokerName: 'Alpha Securities Ltd', brokerCode: 'ALPHA', totalVolume: 2500000000, tradesCount: 45, avgTradeSize: 55555555, lastTrade: new Date() },
  { id: 'bv2', brokerName: 'Beta Investments', brokerCode: 'BETA', totalVolume: 1800000000, tradesCount: 32, avgTradeSize: 56250000, lastTrade: new Date(Date.now() - 3600000) },
  { id: 'bv3', brokerName: 'Gamma Trading Co', brokerCode: 'GAMMA', totalVolume: 1200000000, tradesCount: 28, avgTradeSize: 42857142, lastTrade: new Date(Date.now() - 7200000) },
  { id: 'bv4', brokerName: 'Delta Markets', brokerCode: 'DELTA', totalVolume: 900000000, tradesCount: 18, avgTradeSize: 50000000, lastTrade: new Date(Date.now() - 14400000) },
  { id: 'bv5', brokerName: 'Epsilon Capital', brokerCode: 'EPSILON', totalVolume: 650000000, tradesCount: 12, avgTradeSize: 54166666, lastTrade: new Date(Date.now() - 86400000) },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'short', timeStyle: 'short' }).format(date);
};

export default function DealerOTCDex() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OTCOffer | null>(null);
  const [newOfferSide, setNewOfferSide] = useState<'buy' | 'sell'>('sell');
  const [isBargainable, setIsBargainable] = useState(true);

  const activeOffers = mockOffers.filter(o => o.status === 'active' || o.status === 'partially_filled');
  const pendingBargains = mockBargains.filter(b => b.status === 'pending');
  const totalVolume = mockBrokerVolumes.reduce((sum, b) => sum + b.totalVolume, 0);

  const getStatusBadge = (status: OTCOffer['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">Active</Badge>;
      case 'partially_filled':
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Partially Filled</Badge>;
      case 'filled':
        return <Badge className="bg-success/20 text-success border-success/30">Filled</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      case 'expired':
        return <Badge variant="outline">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBargainStatusBadge = (status: BargainRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3 mr-1" />Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'countered':
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30"><MessageSquare className="w-3 h-3 mr-1" />Countered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">OTC DEX</h1>
          <p className="text-muted-foreground">Create and manage over-the-counter offers for large block trades</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New OTC Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Side Selection */}
              <div className="flex gap-2">
                <Button
                  variant={newOfferSide === 'buy' ? 'default' : 'outline'}
                  className={`flex-1 ${newOfferSide === 'buy' ? 'bg-success hover:bg-success/90' : ''}`}
                  onClick={() => setNewOfferSide('buy')}
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Buy Offer
                </Button>
                <Button
                  variant={newOfferSide === 'sell' ? 'default' : 'outline'}
                  className={`flex-1 ${newOfferSide === 'sell' ? 'bg-destructive hover:bg-destructive/90' : ''}`}
                  onClick={() => setNewOfferSide('sell')}
                >
                  <ArrowDownRight className="w-4 h-4 mr-2" />
                  Sell Offer
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Symbol</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DANGOTE">DANGOTE</SelectItem>
                    <SelectItem value="GTCO">GTCO</SelectItem>
                    <SelectItem value="MTN">MTN</SelectItem>
                    <SelectItem value="ZENITH">ZENITH</SelectItem>
                    <SelectItem value="UBA">UBA</SelectItem>
                    <SelectItem value="AIRTEL">AIRTEL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Quantity</Label>
                  <Input type="number" placeholder="500,000" />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Quantity</Label>
                  <Input type="number" placeholder="50,000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Price per Unit (₦)</Label>
                <Input type="number" placeholder="245.50" />
              </div>

              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/20">
                <div>
                  <p className="font-medium">Allow Bargaining</p>
                  <p className="text-sm text-muted-foreground">Users can propose different prices</p>
                </div>
                <Switch checked={isBargainable} onCheckedChange={setIsBargainable} />
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea placeholder="Additional terms or conditions..." rows={2} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button className={newOfferSide === 'buy' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'}>
                Create {newOfferSide === 'buy' ? 'Buy' : 'Sell'} Offer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Offers</p>
                <p className="text-xl font-bold">{activeOffers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Bargains</p>
                <p className="text-xl font-bold">{pendingBargains.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-xl font-bold">{formatCurrency(totalVolume)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Brokers</p>
                <p className="text-xl font-bold">{mockBrokerVolumes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="offers" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="offers">My Offers</TabsTrigger>
            <TabsTrigger value="bargains">
              Bargain Requests
              {pendingBargains.length > 0 && (
                <Badge variant="secondary" className="ml-2">{pendingBargains.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="brokers">Broker Volume</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* My Offers Tab */}
        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <CardTitle>OTC Offers</CardTitle>
              <CardDescription>Manage your active and historical offers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Filled</TableHead>
                    <TableHead>Bargainable</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOffers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">{offer.symbol}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={offer.side === 'buy' ? 'text-success border-success/30' : 'text-destructive border-destructive/30'}>
                          {offer.side === 'buy' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                          {offer.side.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{offer.quantity.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{formatCurrency(offer.pricePerUnit)}</TableCell>
                      <TableCell className="text-right">
                        <span className={offer.filledQuantity > 0 ? 'text-chart-2' : 'text-muted-foreground'}>
                          {offer.filledQuantity.toLocaleString()} ({Math.round((offer.filledQuantity / offer.quantity) * 100)}%)
                        </span>
                      </TableCell>
                      <TableCell>
                        {offer.isBargainable ? (
                          <Badge variant="outline" className="text-chart-4">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Yes ({offer.bargainCount})
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">No</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(offer.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(offer.expiresAt)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedOffer(offer)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bargain Requests Tab */}
        <TabsContent value="bargains">
          <Card>
            <CardHeader>
              <CardTitle>Bargain Requests</CardTitle>
              <CardDescription>Review and respond to price negotiations from users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBargains.map((bargain) => (
                  <div key={bargain.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-chart-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{bargain.userName}</span>
                            <span className="text-muted-foreground text-sm">via {bargain.broker}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium">{bargain.symbol}</span>
                            <span className="text-muted-foreground">{bargain.quantity.toLocaleString()} units</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Your Price: </span>
                              <span className="font-medium">{formatCurrency(bargain.originalPrice)}</span>
                            </div>
                            <ArrowDownRight className="w-4 h-4 text-destructive" />
                            <div>
                              <span className="text-muted-foreground">Proposed: </span>
                              <span className="font-medium text-chart-4">{formatCurrency(bargain.proposedPrice)}</span>
                            </div>
                            <span className="text-destructive text-sm">
                              ({((1 - bargain.proposedPrice / bargain.originalPrice) * 100).toFixed(1)}% off)
                            </span>
                          </div>
                          {bargain.counterPrice && (
                            <div className="mt-2 p-2 rounded bg-chart-4/10 text-sm">
                              <span className="text-muted-foreground">Your counter: </span>
                              <span className="font-medium">{formatCurrency(bargain.counterPrice)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getBargainStatusBadge(bargain.status)}
                        <span className="text-xs text-muted-foreground">{formatDate(bargain.createdAt)}</span>
                        {bargain.status === 'pending' && (
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline" className="text-destructive border-destructive/30">
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button size="sm" variant="outline" className="text-chart-4 border-chart-4/30">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Counter
                            </Button>
                            <Button size="sm" className="bg-success hover:bg-success/90">
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Broker Volume Tab */}
        <TabsContent value="brokers">
          <Card>
            <CardHeader>
              <CardTitle>Broker Trading Volume</CardTitle>
              <CardDescription>Volume traded by brokers on your OTC offers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Broker</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-right">Total Volume</TableHead>
                    <TableHead className="text-right">Trades</TableHead>
                    <TableHead className="text-right">Avg Trade Size</TableHead>
                    <TableHead>Last Trade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBrokerVolumes.map((broker) => (
                    <TableRow key={broker.id}>
                      <TableCell className="font-medium">{broker.brokerName}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{broker.brokerCode}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(broker.totalVolume)}</TableCell>
                      <TableCell className="text-right">{broker.tradesCount}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{formatCurrency(broker.avgTradeSize)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(broker.lastTrade)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Offer Detail Dialog */}
      <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Offer Details</DialogTitle>
          </DialogHeader>
          {selectedOffer && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedOffer.side === 'buy' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                    {selectedOffer.side === 'buy' ? (
                      <ArrowUpRight className="w-6 h-6 text-success" />
                    ) : (
                      <ArrowDownRight className="w-6 h-6 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedOffer.symbol}</p>
                    <p className="text-muted-foreground">{selectedOffer.side.toUpperCase()} Offer</p>
                  </div>
                </div>
                {getStatusBadge(selectedOffer.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Total Quantity</p>
                  <p className="font-semibold">{selectedOffer.quantity.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Price per Unit</p>
                  <p className="font-semibold">{formatCurrency(selectedOffer.pricePerUnit)}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Minimum Quantity</p>
                  <p className="font-semibold">{selectedOffer.minQuantity.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Total Value</p>
                  <p className="font-semibold">{formatCurrency(selectedOffer.quantity * selectedOffer.pricePerUnit)}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Filled</span>
                  <span className="font-medium">{selectedOffer.filledQuantity.toLocaleString()} / {selectedOffer.quantity.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div 
                    className="h-full bg-chart-2 transition-all" 
                    style={{ width: `${(selectedOffer.filledQuantity / selectedOffer.quantity) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <p className="font-medium">Bargainable</p>
                  <p className="text-sm text-muted-foreground">{selectedOffer.bargainCount} negotiations</p>
                </div>
                <Badge variant={selectedOffer.isBargainable ? 'default' : 'secondary'}>
                  {selectedOffer.isBargainable ? 'Yes' : 'No'}
                </Badge>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedOffer(null)}>Close</Button>
                {selectedOffer.status === 'active' && (
                  <Button variant="destructive" className="flex-1">Cancel Offer</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
