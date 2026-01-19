/**
 * OTC DEX Page - Broker Platform
 * Users can buy/sell from dealer offers with bargaining support
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  DollarSign,
  Package,
  Building2,
  Info,
  Send,
} from "lucide-react";

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
}

interface MyBargain {
  id: string;
  offerId: string;
  symbol: string;
  dealerName: string;
  originalPrice: number;
  myProposedPrice: number;
  quantity: number;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  counterPrice?: number;
  createdAt: Date;
}

interface MyOTCTrade {
  id: string;
  symbol: string;
  dealerName: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  totalValue: number;
  wasBargained: boolean;
  originalPrice?: number;
  executedAt: Date;
}

const mockDealerOffers: DealerOffer[] = [
  { id: 'do1', dealerName: 'Continental Dealers Ltd', dealerCode: 'CONTDL', symbol: 'DANGOTE', assetName: 'Dangote Cement Plc', side: 'sell', quantity: 500000, availableQuantity: 350000, pricePerUnit: 248.50, minQuantity: 50000, isBargainable: true, expiresAt: new Date(Date.now() + 604800000) },
  { id: 'do2', dealerName: 'Prime Capital Markets', dealerCode: 'PCM', symbol: 'GTCO', assetName: 'Guaranty Trust Holding Co', side: 'sell', quantity: 1000000, availableQuantity: 1000000, pricePerUnit: 42.30, minQuantity: 100000, isBargainable: false, expiresAt: new Date(Date.now() + 432000000) },
  { id: 'do3', dealerName: 'Continental Dealers Ltd', dealerCode: 'CONTDL', symbol: 'MTN', assetName: 'MTN Nigeria Communications', side: 'buy', quantity: 200000, availableQuantity: 120000, pricePerUnit: 192.00, minQuantity: 20000, isBargainable: true, expiresAt: new Date(Date.now() + 259200000) },
  { id: 'do4', dealerName: 'Heritage Securities', dealerCode: 'HERISEC', symbol: 'ZENITH', assetName: 'Zenith Bank Plc', side: 'sell', quantity: 750000, availableQuantity: 750000, pricePerUnit: 39.00, minQuantity: 75000, isBargainable: true, expiresAt: new Date(Date.now() + 518400000) },
  { id: 'do5', dealerName: 'Prime Capital Markets', dealerCode: 'PCM', symbol: 'UBA', assetName: 'United Bank for Africa', side: 'buy', quantity: 2000000, availableQuantity: 1500000, pricePerUnit: 22.80, minQuantity: 200000, isBargainable: false, expiresAt: new Date(Date.now() + 172800000) },
  { id: 'do6', dealerName: 'Heritage Securities', dealerCode: 'HERISEC', symbol: 'AIRTEL', assetName: 'Airtel Africa Plc', side: 'sell', quantity: 100000, availableQuantity: 100000, pricePerUnit: 1875.00, minQuantity: 10000, isBargainable: true, expiresAt: new Date(Date.now() + 691200000) },
];

const mockMyBargains: MyBargain[] = [
  { id: 'mb1', offerId: 'do1', symbol: 'DANGOTE', dealerName: 'Continental Dealers Ltd', originalPrice: 248.50, myProposedPrice: 245.00, quantity: 100000, status: 'pending', createdAt: new Date(Date.now() - 3600000) },
  { id: 'mb2', offerId: 'do4', symbol: 'ZENITH', dealerName: 'Heritage Securities', originalPrice: 39.00, myProposedPrice: 37.50, quantity: 150000, status: 'countered', counterPrice: 38.25, createdAt: new Date(Date.now() - 86400000) },
  { id: 'mb3', offerId: 'do6', symbol: 'AIRTEL', dealerName: 'Heritage Securities', originalPrice: 1875.00, myProposedPrice: 1820.00, quantity: 25000, status: 'rejected', createdAt: new Date(Date.now() - 172800000) },
];

const mockMyTrades: MyOTCTrade[] = [
  { id: 'mt1', symbol: 'DANGOTE', dealerName: 'Continental Dealers Ltd', side: 'buy', quantity: 75000, price: 246.00, totalValue: 18450000, wasBargained: true, originalPrice: 248.50, executedAt: new Date(Date.now() - 259200000) },
  { id: 'mt2', symbol: 'GTCO', dealerName: 'Prime Capital Markets', side: 'buy', quantity: 200000, price: 42.30, totalValue: 8460000, wasBargained: false, executedAt: new Date(Date.now() - 432000000) },
  { id: 'mt3', symbol: 'MTN', dealerName: 'Continental Dealers Ltd', side: 'sell', quantity: 50000, price: 193.50, totalValue: 9675000, wasBargained: true, originalPrice: 192.00, executedAt: new Date(Date.now() - 604800000) },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'short', timeStyle: 'short' }).format(date);
};

export default function OTCDexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<DealerOffer | null>(null);
  const [bargainPrice, setBargainPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<string>("");
  const [bargainMessage, setBargainMessage] = useState("");
  const [filterSide, setFilterSide] = useState<'all' | 'buy' | 'sell'>('all');

  const filteredOffers = mockDealerOffers.filter((offer) => {
    const matchesSearch = offer.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          offer.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          offer.dealerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSide = filterSide === 'all' || offer.side === filterSide;
    return matchesSearch && matchesSide;
  });

  const pendingBargains = mockMyBargains.filter(b => b.status === 'pending' || b.status === 'countered');

  const handleOpenOffer = (offer: DealerOffer) => {
    setSelectedOffer(offer);
    setBargainPrice(offer.pricePerUnit);
    setQuantity(offer.minQuantity.toString());
  };

  const getBargainStatusBadge = (status: MyBargain['status']) => {
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
      <div>
        <h1 className="text-2xl font-bold">OTC DEX</h1>
        <p className="text-muted-foreground">Buy or sell large quantities directly from dealers with negotiable prices</p>
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
                <p className="text-sm text-muted-foreground">Available Offers</p>
                <p className="text-xl font-bold">{mockDealerOffers.length}</p>
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
                <p className="text-sm text-muted-foreground">My Bargains</p>
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
                <p className="text-sm text-muted-foreground">Total Traded</p>
                <p className="text-xl font-bold">{formatCurrency(mockMyTrades.reduce((sum, t) => sum + t.totalValue, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Trades</p>
                <p className="text-xl font-bold">{mockMyTrades.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="offers" className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <TabsList>
            <TabsTrigger value="offers">Dealer Offers</TabsTrigger>
            <TabsTrigger value="bargains">
              My Bargains
              {pendingBargains.length > 0 && (
                <Badge variant="secondary" className="ml-2">{pendingBargains.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="trades">Trade History</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search offers..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex border rounded-md">
              <Button 
                variant={filterSide === 'all' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilterSide('all')}
              >
                All
              </Button>
              <Button 
                variant={filterSide === 'buy' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilterSide('buy')}
                className="text-success"
              >
                Buy
              </Button>
              <Button 
                variant={filterSide === 'sell' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setFilterSide('sell')}
                className="text-destructive"
              >
                Sell
              </Button>
            </div>
          </div>
        </div>

        {/* Dealer Offers Tab */}
        <TabsContent value="offers">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOffers.map((offer) => (
              <Card 
                key={offer.id} 
                className="hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => handleOpenOffer(offer)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{offer.symbol}</span>
                        <Badge 
                          variant="outline" 
                          className={offer.side === 'buy' ? 'text-success border-success/30' : 'text-destructive border-destructive/30'}
                        >
                          {offer.side === 'buy' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                          {offer.side === 'buy' ? 'Dealer Buying' : 'Dealer Selling'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{offer.assetName}</p>
                    </div>
                    {offer.isBargainable && (
                      <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Bargainable
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price per Unit</span>
                      <span className="font-semibold">{formatCurrency(offer.pricePerUnit)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available</span>
                      <span>{offer.availableQuantity.toLocaleString()} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Min. Order</span>
                      <span>{offer.minQuantity.toLocaleString()} units</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Building2 className="w-3 h-3" />
                    <span>{offer.dealerName}</span>
                  </div>

                  <Button 
                    className={`w-full ${offer.side === 'sell' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'}`}
                  >
                    {offer.side === 'sell' ? 'Buy from Dealer' : 'Sell to Dealer'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Bargains Tab */}
        <TabsContent value="bargains">
          <Card>
            <CardHeader>
              <CardTitle>My Bargain Requests</CardTitle>
              <CardDescription>Track your price negotiations with dealers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMyBargains.map((bargain) => (
                  <div key={bargain.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-chart-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{bargain.symbol}</span>
                            <span className="text-muted-foreground text-sm">{bargain.dealerName}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {bargain.quantity.toLocaleString()} units
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Dealer Price: </span>
                              <span className="font-medium">{formatCurrency(bargain.originalPrice)}</span>
                            </div>
                            <ArrowDownRight className="w-4 h-4 text-chart-4" />
                            <div>
                              <span className="text-muted-foreground">Your Offer: </span>
                              <span className="font-medium text-chart-4">{formatCurrency(bargain.myProposedPrice)}</span>
                            </div>
                          </div>
                          {bargain.counterPrice && (
                            <div className="mt-2 p-2 rounded bg-chart-4/10 text-sm">
                              <span className="text-muted-foreground">Dealer counter: </span>
                              <span className="font-medium">{formatCurrency(bargain.counterPrice)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getBargainStatusBadge(bargain.status)}
                        <span className="text-xs text-muted-foreground">{formatDate(bargain.createdAt)}</span>
                        {bargain.status === 'countered' && (
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">Decline</Button>
                            <Button size="sm" className="bg-success hover:bg-success/90">Accept Counter</Button>
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

        {/* Trade History Tab */}
        <TabsContent value="trades">
          <Card>
            <CardHeader>
              <CardTitle>OTC Trade History</CardTitle>
              <CardDescription>Your completed OTC transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMyTrades.map((trade) => (
                  <div key={trade.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${trade.side === 'buy' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                          {trade.side === 'buy' ? (
                            <ArrowUpRight className="w-5 h-5 text-success" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{trade.symbol}</span>
                            <Badge variant="outline" className={trade.side === 'buy' ? 'text-success' : 'text-destructive'}>
                              {trade.side.toUpperCase()}
                            </Badge>
                            {trade.wasBargained && (
                              <Badge variant="secondary" className="text-chart-4">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Bargained
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.dealerName} • {formatDate(trade.executedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(trade.totalValue)}</p>
                        <p className="text-sm text-muted-foreground">
                          {trade.quantity.toLocaleString()} @ {formatCurrency(trade.price)}
                          {trade.wasBargained && trade.originalPrice && (
                            <span className="ml-2 text-chart-2">
                              (saved {((1 - trade.price / trade.originalPrice) * 100).toFixed(1)}%)
                            </span>
                          )}
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

      {/* Offer Detail / Trade Dialog */}
      <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedOffer?.side === 'sell' ? 'Buy from Dealer' : 'Sell to Dealer'}
            </DialogTitle>
          </DialogHeader>
          {selectedOffer && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-semibold text-lg">{selectedOffer.symbol}</p>
                  <p className="text-sm text-muted-foreground">{selectedOffer.assetName}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={selectedOffer.side === 'buy' ? 'text-success border-success/30' : 'text-destructive border-destructive/30'}
                >
                  {selectedOffer.side === 'buy' ? 'Dealer Buying' : 'Dealer Selling'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Dealer Price</p>
                  <p className="font-semibold">{formatCurrency(selectedOffer.pricePerUnit)}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Available</p>
                  <p className="font-semibold">{selectedOffer.availableQuantity.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quantity (Min: {selectedOffer.minQuantity.toLocaleString()})</Label>
                <Input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedOffer.minQuantity}
                  max={selectedOffer.availableQuantity}
                />
              </div>

              {selectedOffer.isBargainable && (
                <>
                  <div className="p-4 rounded-lg border border-chart-4/30 bg-chart-4/5">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-chart-4" />
                      <span className="font-medium">Propose Your Price</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Your proposed price:</span>
                        <span className="font-semibold text-chart-4">{formatCurrency(bargainPrice)}</span>
                      </div>
                      <Slider
                        value={[bargainPrice]}
                        onValueChange={(value) => setBargainPrice(value[0])}
                        min={selectedOffer.pricePerUnit * 0.9}
                        max={selectedOffer.pricePerUnit * 1.1}
                        step={0.1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>-10%</span>
                        <span>Dealer Price</span>
                        <span>+10%</span>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Message (Optional)</Label>
                        <Textarea 
                          placeholder="Add a note to your offer..."
                          value={bargainMessage}
                          onChange={(e) => setBargainMessage(e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="p-4 rounded-lg bg-secondary/30">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Quantity</span>
                  <span>{Number(quantity).toLocaleString()} units</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Price per unit</span>
                  <span>{formatCurrency(selectedOffer.isBargainable ? bargainPrice : selectedOffer.pricePerUnit)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
                  <span>Total</span>
                  <span>{formatCurrency((selectedOffer.isBargainable ? bargainPrice : selectedOffer.pricePerUnit) * Number(quantity))}</span>
                </div>
              </div>

              {selectedOffer.isBargainable && bargainPrice !== selectedOffer.pricePerUnit && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-chart-4/10 text-sm">
                  <Info className="w-4 h-4 text-chart-4 mt-0.5" />
                  <div>
                    <p className="font-medium text-chart-4">You're proposing a different price</p>
                    <p className="text-muted-foreground">
                      This will be sent as a bargain request. The dealer can accept, reject, or counter your offer.
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedOffer(null)}>Cancel</Button>
                {selectedOffer.isBargainable && bargainPrice !== selectedOffer.pricePerUnit ? (
                  <Button className="bg-chart-4 hover:bg-chart-4/90">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Bargain
                  </Button>
                ) : (
                  <Button className={selectedOffer.side === 'sell' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'}>
                    {selectedOffer.side === 'sell' ? 'Confirm Purchase' : 'Confirm Sale'}
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
