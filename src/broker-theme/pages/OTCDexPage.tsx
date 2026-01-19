/**
 * OTC DEX Page - Broker Platform
 * Users can buy/sell from dealer offers with price negotiation support
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Building2,
  Info,
  Send,
  ArrowRight,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Package,
} from "lucide-react";
import { toast } from "sonner";

interface DealerOffer {
  id: string;
  dealerName: string;
  dealerCode: string;
  symbol: string;
  assetName: string;
  side: "buy" | "sell";
  quantity: number;
  availableQuantity: number;
  pricePerUnit: number;
  minQuantity: number;
  isBargainable: boolean;
  expiresAt: Date;
}

interface NegotiationRound {
  id: string;
  party: "user" | "dealer";
  price: number;
  timestamp: Date;
  message?: string;
}

interface MyNegotiation {
  id: string;
  offerId: string;
  symbol: string;
  assetName: string;
  dealerName: string;
  side: "buy" | "sell";
  originalPrice: number;
  quantity: number;
  status: "negotiating" | "accepted" | "rejected" | "expired";
  rounds: NegotiationRound[];
  createdAt: Date;
  currentDealerPrice?: number;
}

interface MyOTCTrade {
  id: string;
  symbol: string;
  dealerName: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  totalValue: number;
  wasNegotiated: boolean;
  originalPrice?: number;
  executedAt: Date;
}

const mockDealerOffers: DealerOffer[] = [
  {
    id: "do1",
    dealerName: "Continental Dealers Ltd",
    dealerCode: "CONTDL",
    symbol: "DANGOTE",
    assetName: "Dangote Cement Plc",
    side: "sell",
    quantity: 500000,
    availableQuantity: 350000,
    pricePerUnit: 248.5,
    minQuantity: 50000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 604800000),
  },
  {
    id: "do2",
    dealerName: "Prime Capital Markets",
    dealerCode: "PCM",
    symbol: "GTCO",
    assetName: "Guaranty Trust Holding Co",
    side: "sell",
    quantity: 1000000,
    availableQuantity: 1000000,
    pricePerUnit: 42.3,
    minQuantity: 100000,
    isBargainable: false,
    expiresAt: new Date(Date.now() + 432000000),
  },
  {
    id: "do3",
    dealerName: "Continental Dealers Ltd",
    dealerCode: "CONTDL",
    symbol: "MTN",
    assetName: "MTN Nigeria Communications",
    side: "buy",
    quantity: 200000,
    availableQuantity: 120000,
    pricePerUnit: 192.0,
    minQuantity: 20000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 259200000),
  },
  {
    id: "do4",
    dealerName: "Heritage Securities",
    dealerCode: "HERISEC",
    symbol: "ZENITH",
    assetName: "Zenith Bank Plc",
    side: "sell",
    quantity: 750000,
    availableQuantity: 750000,
    pricePerUnit: 39.0,
    minQuantity: 75000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 518400000),
  },
  {
    id: "do5",
    dealerName: "Prime Capital Markets",
    dealerCode: "PCM",
    symbol: "UBA",
    assetName: "United Bank for Africa",
    side: "buy",
    quantity: 2000000,
    availableQuantity: 1500000,
    pricePerUnit: 22.8,
    minQuantity: 200000,
    isBargainable: false,
    expiresAt: new Date(Date.now() + 172800000),
  },
  {
    id: "do6",
    dealerName: "Heritage Securities",
    dealerCode: "HERISEC",
    symbol: "AIRTEL",
    assetName: "Airtel Africa Plc",
    side: "sell",
    quantity: 100000,
    availableQuantity: 100000,
    pricePerUnit: 1875.0,
    minQuantity: 10000,
    isBargainable: true,
    expiresAt: new Date(Date.now() + 691200000),
  },
];

const mockMyNegotiations: MyNegotiation[] = [
  {
    id: "mn1",
    offerId: "do1",
    symbol: "DANGOTE",
    assetName: "Dangote Cement Plc",
    dealerName: "Continental Dealers Ltd",
    side: "sell",
    originalPrice: 248.5,
    quantity: 100000,
    status: "negotiating",
    currentDealerPrice: 246.0,
    createdAt: new Date(Date.now() - 3600000),
    rounds: [
      {
        id: "r1",
        party: "user",
        price: 242.0,
        timestamp: new Date(Date.now() - 3600000),
        message: "Looking to acquire a large position",
      },
      {
        id: "r2",
        party: "dealer",
        price: 247.0,
        timestamp: new Date(Date.now() - 3000000),
        message: "Best we can do at this volume",
      },
      {
        id: "r3",
        party: "user",
        price: 244.5,
        timestamp: new Date(Date.now() - 2400000),
        message: "Can we meet in the middle?",
      },
      {
        id: "r4",
        party: "dealer",
        price: 246.0,
        timestamp: new Date(Date.now() - 1800000),
        message: "Final offer - 246 is our best price",
      },
    ],
  },
  {
    id: "mn2",
    offerId: "do4",
    symbol: "ZENITH",
    assetName: "Zenith Bank Plc",
    dealerName: "Heritage Securities",
    side: "sell",
    originalPrice: 39.0,
    quantity: 150000,
    status: "negotiating",
    currentDealerPrice: 38.25,
    createdAt: new Date(Date.now() - 86400000),
    rounds: [
      {
        id: "r1",
        party: "user",
        price: 37.0,
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "r2",
        party: "dealer",
        price: 38.5,
        timestamp: new Date(Date.now() - 82800000),
      },
      {
        id: "r3",
        party: "user",
        price: 37.75,
        timestamp: new Date(Date.now() - 79200000),
      },
      {
        id: "r4",
        party: "dealer",
        price: 38.25,
        timestamp: new Date(Date.now() - 75600000),
        message: "This is a good price for this volume",
      },
    ],
  },
  {
    id: "mn3",
    offerId: "do6",
    symbol: "AIRTEL",
    assetName: "Airtel Africa Plc",
    dealerName: "Heritage Securities",
    side: "sell",
    originalPrice: 1875.0,
    quantity: 25000,
    status: "rejected",
    createdAt: new Date(Date.now() - 172800000),
    rounds: [
      {
        id: "r1",
        party: "user",
        price: 1750.0,
        timestamp: new Date(Date.now() - 172800000),
        message: "Interested in 25k units",
      },
      {
        id: "r2",
        party: "dealer",
        price: 1875.0,
        timestamp: new Date(Date.now() - 169200000),
        message: "Price is firm at this level",
      },
    ],
  },
];

const mockMyTrades: MyOTCTrade[] = [
  {
    id: "mt1",
    symbol: "DANGOTE",
    dealerName: "Continental Dealers Ltd",
    side: "buy",
    quantity: 75000,
    price: 246.0,
    totalValue: 18450000,
    wasNegotiated: true,
    originalPrice: 248.5,
    executedAt: new Date(Date.now() - 259200000),
  },
  {
    id: "mt2",
    symbol: "GTCO",
    dealerName: "Prime Capital Markets",
    side: "buy",
    quantity: 200000,
    price: 42.3,
    totalValue: 8460000,
    wasNegotiated: false,
    executedAt: new Date(Date.now() - 432000000),
  },
  {
    id: "mt3",
    symbol: "MTN",
    dealerName: "Continental Dealers Ltd",
    side: "sell",
    quantity: 50000,
    price: 193.5,
    totalValue: 9675000,
    wasNegotiated: true,
    originalPrice: 192.0,
    executedAt: new Date(Date.now() - 604800000),
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-NG", { timeStyle: "short" }).format(date);
};

export default function OTCDexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<DealerOffer | null>(null);
  const [selectedNegotiation, setSelectedNegotiation] =
    useState<MyNegotiation | null>(null);
  const [proposedPrice, setProposedPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<string>("");
  const [counterPrice, setCounterPrice] = useState<number>(0);
  const [filterSide, setFilterSide] = useState<"all" | "buy" | "sell">("all");

  const filteredOffers = mockDealerOffers.filter((offer) => {
    const matchesSearch =
      offer.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.dealerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSide = filterSide === "all" || offer.side === filterSide;
    return matchesSearch && matchesSide;
  });

  const activeNegotiations = mockMyNegotiations.filter(
    (n) => n.status === "negotiating",
  );

  const handleOpenOffer = (offer: DealerOffer) => {
    setSelectedOffer(offer);
    setProposedPrice(offer.pricePerUnit);
    setQuantity(offer.minQuantity.toString());
  };

  const handleOpenNegotiation = (negotiation: MyNegotiation) => {
    setSelectedNegotiation(negotiation);
    const lastDealerRound = [...negotiation.rounds]
      .reverse()
      .find((r) => r.party === "dealer");
    setCounterPrice(lastDealerRound?.price || negotiation.originalPrice);
  };

  const handleSubmitInitialOffer = () => {
    toast.success("Price proposal sent to dealer", {
      description: `Proposed ${formatCurrency(proposedPrice)} for ${Number(quantity).toLocaleString()} units of ${selectedOffer?.symbol}`,
    });
    setSelectedOffer(null);
  };

  const handleAcceptDealerPrice = () => {
    toast.success("Trade executed!", {
      description: `Bought ${selectedNegotiation?.quantity.toLocaleString()} ${selectedNegotiation?.symbol} at ${formatCurrency(selectedNegotiation?.currentDealerPrice || 0)}`,
    });
    setSelectedNegotiation(null);
  };

  const handleCounterOffer = () => {
    toast.success("Counter offer sent", {
      description: `Proposed ${formatCurrency(counterPrice)} per unit`,
    });
  };

  const handleRejectNegotiation = () => {
    toast.info("Negotiation cancelled");
    setSelectedNegotiation(null);
  };

  const getStatusBadge = (status: MyNegotiation["status"]) => {
    switch (status) {
      case "negotiating":
        return (
          <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">
            <RefreshCw className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-success/20 text-success border-success/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/20 text-destructive border-destructive/30">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriceChangePercent = (original: number, current: number) => {
    const change = ((current - original) / original) * 100;
    return change.toFixed(2);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">OTC DEX</h1>
        <p className="text-muted-foreground">
          Buy or sell large quantities directly from dealers with price
          negotiation
        </p>
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
                <p className="text-sm text-muted-foreground">
                  Available Offers
                </p>
                <p className="text-xl font-bold">{mockDealerOffers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Negotiations
                </p>
                <p className="text-xl font-bold">{activeNegotiations.length}</p>
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
                <p className="text-xl font-bold">
                  {formatCurrency(
                    mockMyTrades.reduce((sum, t) => sum + t.totalValue, 0),
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Completed Trades
                </p>
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
            <TabsTrigger value="negotiations">
              Negotiations
              {activeNegotiations.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeNegotiations.length}
                </Badge>
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
                variant={filterSide === "all" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterSide("all")}
              >
                All
              </Button>
              <Button
                variant={filterSide === "buy" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterSide("buy")}
                className="text-success"
              >
                Buy
              </Button>
              <Button
                variant={filterSide === "sell" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterSide("sell")}
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
                        <span className="font-bold text-lg">
                          {offer.symbol}
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            offer.side === "buy"
                              ? "text-success border-success/30"
                              : "text-destructive border-destructive/30"
                          }
                        >
                          {offer.side === "buy" ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          )}
                          {offer.side === "buy"
                            ? "Dealer Buying"
                            : "Dealer Selling"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {offer.assetName}
                      </p>
                    </div>
                    {offer.isBargainable && (
                      <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Negotiable
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Price per Unit
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(offer.pricePerUnit)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available</span>
                      <span>
                        {offer.availableQuantity.toLocaleString()} units
                      </span>
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
                    className={`w-full ${
                      offer.side === "sell"
                        ? "bg-success hover:bg-success/90"
                        : "bg-destructive hover:bg-destructive/90"
                    }`}
                  >
                    {offer.side === "sell"
                      ? "Buy from Dealer"
                      : "Sell to Dealer"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Negotiations Tab */}
        <TabsContent value="negotiations">
          <div className="space-y-4">
            {mockMyNegotiations.map((negotiation) => (
              <Card
                key={negotiation.id}
                className={`hover:border-primary/30 transition-colors ${negotiation.status === "negotiating" ? "cursor-pointer" : ""}`}
                onClick={() =>
                  negotiation.status === "negotiating" &&
                  handleOpenNegotiation(negotiation)
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 text-chart-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            {negotiation.symbol}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground text-sm">
                            {negotiation.dealerName}
                          </span>
                          {getStatusBadge(negotiation.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {negotiation.assetName}
                        </p>

                        {/* Negotiation Progress */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                Original:
                              </span>
                              <span className="font-medium">
                                {formatCurrency(negotiation.originalPrice)}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            {negotiation.currentDealerPrice && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">
                                  Current:
                                </span>
                                <span className="font-medium text-chart-4">
                                  {formatCurrency(
                                    negotiation.currentDealerPrice,
                                  )}
                                </span>
                                <span
                                  className={`text-xs ${negotiation.side === "sell" && negotiation.currentDealerPrice < negotiation.originalPrice ? "text-success" : negotiation.side === "buy" && negotiation.currentDealerPrice > negotiation.originalPrice ? "text-success" : "text-destructive"}`}
                                >
                                  (
                                  {getPriceChangePercent(
                                    negotiation.originalPrice,
                                    negotiation.currentDealerPrice,
                                  )}
                                  %)
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Mini timeline of rounds */}
                          <div className="flex items-center gap-1">
                            {negotiation.rounds.map((round, idx) => (
                              <div key={round.id} className="flex items-center">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                    round.party === "user"
                                      ? "bg-primary/20 text-primary"
                                      : "bg-chart-4/20 text-chart-4"
                                  }`}
                                  title={`${round.party === "user" ? "You" : "Dealer"}: ${formatCurrency(round.price)}`}
                                >
                                  {idx + 1}
                                </div>
                                {idx < negotiation.rounds.length - 1 && (
                                  <div className="w-4 h-0.5 bg-border" />
                                )}
                              </div>
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">
                              {negotiation.rounds.length} rounds
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {negotiation.quantity.toLocaleString()} units
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(negotiation.createdAt)}
                      </p>
                      {negotiation.status === "negotiating" && (
                        <Button
                          size="sm"
                          className="mt-2 bg-chart-4 hover:bg-chart-4/90"
                        >
                          Continue
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                  <div
                    key={trade.id}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            trade.side === "buy"
                              ? "bg-success/10"
                              : "bg-destructive/10"
                          }`}
                        >
                          {trade.side === "buy" ? (
                            <ArrowUpRight className="w-5 h-5 text-success" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {trade.symbol}
                            </span>
                            <Badge
                              variant="outline"
                              className={
                                trade.side === "buy"
                                  ? "text-success"
                                  : "text-destructive"
                              }
                            >
                              {trade.side.toUpperCase()}
                            </Badge>
                            {trade.wasNegotiated && (
                              <Badge
                                variant="secondary"
                                className="text-chart-4"
                              >
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Negotiated
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.dealerName} • {formatDate(trade.executedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(trade.totalValue)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {trade.quantity.toLocaleString()} @{" "}
                          {formatCurrency(trade.price)}
                          {trade.wasNegotiated && trade.originalPrice && (
                            <span className="ml-2 text-chart-2">
                              (saved{" "}
                              {(
                                (1 - trade.price / trade.originalPrice) *
                                100
                              ).toFixed(1)}
                              %)
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

      {/* New Offer Dialog - Initial Price Proposal */}
      <Dialog
        open={!!selectedOffer}
        onOpenChange={() => setSelectedOffer(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedOffer?.side === "sell"
                ? "Buy from Dealer"
                : "Sell to Dealer"}
            </DialogTitle>
          </DialogHeader>
          {selectedOffer && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-semibold text-lg">
                    {selectedOffer.symbol}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedOffer.assetName}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedOffer.side === "buy"
                      ? "text-success border-success/30"
                      : "text-destructive border-destructive/30"
                  }
                >
                  {selectedOffer.side === "buy"
                    ? "Dealer Buying"
                    : "Dealer Selling"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">
                    Dealer's Ask Price
                  </p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(selectedOffer.pricePerUnit)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Available</p>
                  <p className="font-semibold">
                    {selectedOffer.availableQuantity.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Quantity (Min: {selectedOffer.minQuantity.toLocaleString()})
                </Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedOffer.minQuantity}
                  max={selectedOffer.availableQuantity}
                />
              </div>

              {selectedOffer.isBargainable ? (
                <div className="p-4 rounded-lg border border-chart-4/30 bg-chart-4/5">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-4 h-4 text-chart-4" />
                    <span className="font-medium">Propose Your Price</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Your proposal:
                      </span>
                      <span className="font-bold text-xl text-chart-4">
                        {formatCurrency(proposedPrice)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Slider
                        value={[proposedPrice]}
                        onValueChange={(value) => setProposedPrice(value[0])}
                        min={selectedOffer.pricePerUnit * 0.85}
                        max={selectedOffer.pricePerUnit * 1.05}
                        step={0.5}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>-15%</span>
                        <span className="text-chart-4">Dealer Price</span>
                        <span>+5%</span>
                      </div>
                    </div>

                    {proposedPrice !== selectedOffer.pricePerUnit && (
                      <div className="p-3 rounded-lg bg-background border border-border">
                        <div className="flex items-center justify-between text-sm">
                          <span>Difference from dealer price:</span>
                          <span
                            className={
                              proposedPrice < selectedOffer.pricePerUnit
                                ? "text-success font-medium"
                                : "text-destructive font-medium"
                            }
                          >
                            {proposedPrice < selectedOffer.pricePerUnit
                              ? "-"
                              : "+"}
                            {formatCurrency(
                              Math.abs(
                                proposedPrice - selectedOffer.pricePerUnit,
                              ),
                            )}
                            (
                            {getPriceChangePercent(
                              selectedOffer.pricePerUnit,
                              proposedPrice,
                            )}
                            %)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  This offer is fixed price - no negotiation available
                </div>
              )}

              <div className="p-4 rounded-lg bg-secondary/30">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Quantity</span>
                  <span>{Number(quantity).toLocaleString()} units</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Price per unit</span>
                  <span>
                    {formatCurrency(
                      selectedOffer.isBargainable
                        ? proposedPrice
                        : selectedOffer.pricePerUnit,
                    )}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      (selectedOffer.isBargainable
                        ? proposedPrice
                        : selectedOffer.pricePerUnit) * Number(quantity),
                    )}
                  </span>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOffer(null)}
                >
                  Cancel
                </Button>
                {selectedOffer.isBargainable &&
                proposedPrice !== selectedOffer.pricePerUnit ? (
                  <Button
                    onClick={handleSubmitInitialOffer}
                    className="bg-chart-4 hover:bg-chart-4/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Start Negotiation
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      toast.success("Trade executed!");
                      setSelectedOffer(null);
                    }}
                    className={
                      selectedOffer.side === "sell"
                        ? "bg-success hover:bg-success/90"
                        : "bg-destructive hover:bg-destructive/90"
                    }
                  >
                    {selectedOffer.side === "sell"
                      ? "Confirm Purchase"
                      : "Confirm Sale"}
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Negotiation Dialog - Price Back-and-Forth */}
      <Dialog
        open={!!selectedNegotiation}
        onOpenChange={() => setSelectedNegotiation(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-chart-4" />
              Price Negotiation - {selectedNegotiation?.symbol}
            </DialogTitle>
          </DialogHeader>
          {selectedNegotiation && (
            <div className="space-y-4">
              {/* Summary Header */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg border border-border bg-secondary/20">
                <div>
                  <p className="text-sm text-muted-foreground">Asset</p>
                  <p className="font-semibold">{selectedNegotiation.symbol}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedNegotiation.assetName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold">
                    {selectedNegotiation.quantity.toLocaleString()} units
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dealer</p>
                  <p className="font-semibold">
                    {selectedNegotiation.dealerName}
                  </p>
                </div>
              </div>

              {/* Price Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Original Price
                  </p>
                  <p className="font-bold text-xl">
                    {formatCurrency(selectedNegotiation.originalPrice)}
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-chart-4/30 bg-chart-4/5">
                  <p className="text-sm text-muted-foreground mb-1">
                    Current Dealer Offer
                  </p>
                  <p className="font-bold text-xl text-chart-4">
                    {formatCurrency(
                      selectedNegotiation.currentDealerPrice ||
                        selectedNegotiation.originalPrice,
                    )}
                  </p>
                  {selectedNegotiation.currentDealerPrice && (
                    <p className="text-xs text-success">
                      {getPriceChangePercent(
                        selectedNegotiation.originalPrice,
                        selectedNegotiation.currentDealerPrice,
                      )}
                      % from original
                    </p>
                  )}
                </div>
              </div>

              {/* Negotiation Timeline */}
              <div className="border border-border rounded-lg">
                <div className="p-3 border-b border-border bg-muted/30">
                  <h4 className="font-medium text-sm">Negotiation History</h4>
                </div>
                <ScrollArea className="h-48 p-4">
                  <div className="space-y-4">
                    {selectedNegotiation.rounds.map((round, idx) => (
                      <div
                        key={round.id}
                        className={`flex ${round.party === "user" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            round.party === "user"
                              ? "bg-primary/10 border border-primary/20"
                              : "bg-chart-4/10 border border-chart-4/20"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {round.party === "user" ? "You" : "Dealer"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(round.timestamp)}
                            </span>
                          </div>
                          <p className="font-bold text-lg">
                            {formatCurrency(round.price)}
                          </p>
                          {round.message && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {round.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Counter Offer Section */}
              <div className="p-4 rounded-lg border border-border bg-secondary/20">
                <h4 className="font-medium mb-3">Your Response</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Counter offer price:</span>
                    <span className="font-bold text-xl">
                      {formatCurrency(counterPrice)}
                    </span>
                  </div>
                  <Slider
                    value={[counterPrice]}
                    onValueChange={(value) => setCounterPrice(value[0])}
                    min={selectedNegotiation.originalPrice * 0.85}
                    max={
                      selectedNegotiation.currentDealerPrice ||
                      selectedNegotiation.originalPrice
                    }
                    step={0.5}
                    className="py-2"
                  />

                  {/* Potential Savings */}
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-center justify-between text-sm">
                      <span>If accepted, your total cost:</span>
                      <span className="font-semibold">
                        {formatCurrency(
                          counterPrice * selectedNegotiation.quantity,
                        )}
                      </span>
                    </div>
                    {counterPrice < selectedNegotiation.originalPrice && (
                      <div className="flex items-center justify-between text-sm text-success mt-1">
                        <span>Savings from original:</span>
                        <span className="font-semibold">
                          {formatCurrency(
                            (selectedNegotiation.originalPrice - counterPrice) *
                              selectedNegotiation.quantity,
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={handleRejectNegotiation}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Walk Away
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCounterOffer}
                  disabled={
                    counterPrice ===
                    (selectedNegotiation.currentDealerPrice ||
                      selectedNegotiation.originalPrice)
                  }
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Counter Offer
                </Button>
                <Button
                  onClick={handleAcceptDealerPrice}
                  className="bg-success hover:bg-success/90"
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Accept{" "}
                  {formatCurrency(
                    selectedNegotiation.currentDealerPrice ||
                      selectedNegotiation.originalPrice,
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
