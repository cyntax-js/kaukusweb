/**
 * Quote Management Page
 * 
 * View and manage orders/quotes - create, cancel, and monitor
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Settings2, 
  Play, 
  Pause,
  RefreshCw,
  AlertCircle,
  Plus,
  XCircle,
  Edit,
  CheckCircle2,
} from "lucide-react";

interface Quote {
  id: string;
  symbol: string;
  bidPrice: number;
  askPrice: number;
  bidVol: number;
  askVol: number;
  spread: number;
  status: 'active' | 'paused' | 'pending' | 'cancelled';
  filledBid: number;
  filledAsk: number;
  createdAt: Date;
}

const mockQuotes: Quote[] = [
  { id: 'q1', symbol: "DANGCEM", bidPrice: 285.50, askPrice: 286.00, bidVol: 10000, askVol: 10000, spread: 0.18, status: "active", filledBid: 2500, filledAsk: 3200, createdAt: new Date(Date.now() - 3600000) },
  { id: 'q2', symbol: "GTCO", bidPrice: 28.40, askPrice: 28.55, bidVol: 50000, askVol: 50000, spread: 0.53, status: "active", filledBid: 12000, filledAsk: 8500, createdAt: new Date(Date.now() - 7200000) },
  { id: 'q3', symbol: "ZENITH", bidPrice: 32.15, askPrice: 32.30, bidVol: 25000, askVol: 25000, spread: 0.47, status: "active", filledBid: 5000, filledAsk: 7200, createdAt: new Date(Date.now() - 10800000) },
  { id: 'q4', symbol: "MTNN", bidPrice: 195.00, askPrice: 195.50, bidVol: 5000, askVol: 5000, spread: 0.26, status: "paused", filledBid: 1000, filledAsk: 800, createdAt: new Date(Date.now() - 14400000) },
  { id: 'q5', symbol: "AIRTEL", bidPrice: 1520.00, askPrice: 1522.00, bidVol: 1000, askVol: 1000, spread: 0.13, status: "active", filledBid: 250, filledAsk: 300, createdAt: new Date(Date.now() - 18000000) },
  { id: 'q6', symbol: "UBA", bidPrice: 22.50, askPrice: 22.65, bidVol: 30000, askVol: 30000, spread: 0.67, status: "pending", filledBid: 0, filledAsk: 0, createdAt: new Date() },
];

const autoQuotingRules = [
  { id: 1, name: "High Volume Sessions", trigger: "Volume > 1M", action: "Widen spread by 10%", enabled: true },
  { id: 2, name: "Low Volatility", trigger: "Volatility < 2%", action: "Tighten spread by 5%", enabled: true },
  { id: 3, name: "News Events", trigger: "News Alert", action: "Pause quoting for 5 min", enabled: false },
  { id: 4, name: "EOD Rebalance", trigger: "3:30 PM", action: "Reduce volume by 50%", enabled: true },
];

export default function QuoteManagement() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [selectedSymbol, setSelectedSymbol] = useState("DANGCEM");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    symbol: '',
    bidPrice: '',
    askPrice: '',
    bidVol: '',
    askVol: '',
  });

  const activeQuotes = quotes.filter(q => q.status === 'active');
  const pausedQuotes = quotes.filter(q => q.status === 'paused');
  const pendingQuotes = quotes.filter(q => q.status === 'pending');

  const toggleQuoteStatus = (quoteId: string) => {
    setQuotes(prev => prev.map(q => {
      if (q.id === quoteId) {
        const newStatus = q.status === 'active' ? 'paused' : 'active';
        toast.success(`Quote ${newStatus === 'active' ? 'resumed' : 'paused'}`, {
          description: `${q.symbol} quote is now ${newStatus}`
        });
        return { ...q, status: newStatus as Quote['status'] };
      }
      return q;
    }));
  };

  const cancelQuote = (quoteId: string) => {
    setQuotes(prev => prev.map(q => {
      if (q.id === quoteId) {
        toast.info("Quote cancelled", { description: `${q.symbol} quote has been cancelled` });
        return { ...q, status: 'cancelled' as Quote['status'] };
      }
      return q;
    }));
  };

  const handleCreateQuote = () => {
    if (!newQuote.symbol || !newQuote.bidPrice || !newQuote.askPrice) {
      toast.error("Please fill all required fields");
      return;
    }

    const spread = ((parseFloat(newQuote.askPrice) - parseFloat(newQuote.bidPrice)) / parseFloat(newQuote.bidPrice)) * 100;
    
    const quote: Quote = {
      id: `q${Date.now()}`,
      symbol: newQuote.symbol,
      bidPrice: parseFloat(newQuote.bidPrice),
      askPrice: parseFloat(newQuote.askPrice),
      bidVol: parseInt(newQuote.bidVol) || 1000,
      askVol: parseInt(newQuote.askVol) || 1000,
      spread: spread,
      status: 'pending',
      filledBid: 0,
      filledAsk: 0,
      createdAt: new Date(),
    };

    setQuotes(prev => [quote, ...prev]);
    setIsCreateDialogOpen(false);
    setNewQuote({ symbol: '', bidPrice: '', askPrice: '', bidVol: '', askVol: '' });
    toast.success("Quote created", { description: `New quote for ${quote.symbol} is pending activation` });
  };

  const startAllQuotes = () => {
    setQuotes(prev => prev.map(q => ({ ...q, status: 'active' as Quote['status'] })));
    toast.success("All quotes activated");
  };

  const pauseAllQuotes = () => {
    setQuotes(prev => prev.map(q => ({ ...q, status: 'paused' as Quote['status'] })));
    toast.info("All quotes paused");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-chart-5" />
            Quote Management
          </h1>
          <p className="text-muted-foreground">
            Create, manage, and monitor your market making quotes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={pauseAllQuotes}>
            <Pause className="w-4 h-4 mr-2" />
            Pause All
          </Button>
          <Button variant="outline" size="sm" onClick={startAllQuotes}>
            <Play className="w-4 h-4 mr-2" />
            Start All
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Quote
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Quote</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Symbol</Label>
                  <Select value={newQuote.symbol} onValueChange={(v) => setNewQuote(prev => ({ ...prev, symbol: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select symbol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DANGCEM">DANGCEM</SelectItem>
                      <SelectItem value="GTCO">GTCO</SelectItem>
                      <SelectItem value="ZENITH">ZENITH</SelectItem>
                      <SelectItem value="MTNN">MTNN</SelectItem>
                      <SelectItem value="UBA">UBA</SelectItem>
                      <SelectItem value="ACCESS">ACCESS</SelectItem>
                      <SelectItem value="FBNH">FBNH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bid Price (₦)</Label>
                    <Input 
                      type="number" 
                      placeholder="285.50" 
                      value={newQuote.bidPrice}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, bidPrice: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ask Price (₦)</Label>
                    <Input 
                      type="number" 
                      placeholder="286.00" 
                      value={newQuote.askPrice}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, askPrice: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bid Volume</Label>
                    <Input 
                      type="number" 
                      placeholder="10000" 
                      value={newQuote.bidVol}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, bidVol: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ask Volume</Label>
                    <Input 
                      type="number" 
                      placeholder="10000" 
                      value={newQuote.askVol}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, askVol: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateQuote}>Create Quote</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Quotes</p>
                <p className="text-2xl font-bold text-success">{activeQuotes.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paused Quotes</p>
                <p className="text-2xl font-bold text-warning">{pausedQuotes.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Pause className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Spread</p>
                <p className="text-2xl font-bold">
                  {(quotes.filter(q => q.status === 'active').reduce((sum, q) => sum + q.spread, 0) / (activeQuotes.length || 1)).toFixed(2)}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">{quotes.reduce((sum, q) => sum + q.bidVol + q.askVol, 0).toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="quotes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quotes">My Quotes</TabsTrigger>
          <TabsTrigger value="set-price">Quick Update</TabsTrigger>
          <TabsTrigger value="auto-rules">Auto-Quoting Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="quotes">
          <Card>
            <CardHeader>
              <CardTitle>Quote Positions</CardTitle>
              <CardDescription>Manage your current bid/ask quotes across securities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Bid Price</TableHead>
                    <TableHead className="text-right">Bid Vol (Filled)</TableHead>
                    <TableHead className="text-right">Ask Price</TableHead>
                    <TableHead className="text-right">Ask Vol (Filled)</TableHead>
                    <TableHead className="text-right">Spread</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.filter(q => q.status !== 'cancelled').map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.symbol}</TableCell>
                      <TableCell className="text-right text-success">{formatCurrency(quote.bidPrice)}</TableCell>
                      <TableCell className="text-right">
                        {quote.bidVol.toLocaleString()}
                        <span className="text-xs text-muted-foreground ml-1">({quote.filledBid.toLocaleString()})</span>
                      </TableCell>
                      <TableCell className="text-right text-destructive">{formatCurrency(quote.askPrice)}</TableCell>
                      <TableCell className="text-right">
                        {quote.askVol.toLocaleString()}
                        <span className="text-xs text-muted-foreground ml-1">({quote.filledAsk.toLocaleString()})</span>
                      </TableCell>
                      <TableCell className="text-right">{quote.spread.toFixed(2)}%</TableCell>
                      <TableCell>
                        <Badge variant={
                          quote.status === "active" ? "default" : 
                          quote.status === "pending" ? "outline" : "secondary"
                        }>
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleQuoteStatus(quote.id)}
                            title={quote.status === "active" ? "Pause" : "Resume"}
                          >
                            {quote.status === "active" ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => cancelQuote(quote.id)}
                            title="Cancel"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="set-price">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Update Quote Prices</CardTitle>
                <CardDescription>Manually adjust bid/ask prices for a security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Symbol</Label>
                  <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {quotes.map(q => (
                        <SelectItem key={q.id} value={q.symbol}>{q.symbol}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bid Price (₦)</Label>
                    <Input type="number" placeholder="285.50" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bid Volume</Label>
                    <Input type="number" placeholder="10000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ask Price (₦)</Label>
                    <Input type="number" placeholder="286.00" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ask Volume</Label>
                    <Input type="number" placeholder="10000" />
                  </div>
                </div>
                <Button className="w-full">Update Quote</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Volume Adjustment</CardTitle>
                <CardDescription>Adjust volumes across all quotes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="text-sm">Double All Volumes</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="text-sm">Halve All Volumes</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="text-sm">Set Minimum Volumes</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                  <span className="text-sm text-destructive">Withdraw All Quotes</span>
                  <Button variant="destructive" size="sm">Withdraw</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="auto-rules">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Auto-Quoting Rules</CardTitle>
                <CardDescription>Configure automated quote adjustments based on market conditions</CardDescription>
              </div>
              <Button size="sm">Add Rule</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autoQuotingRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        rule.enabled ? "bg-success/10" : "bg-muted"
                      }`}>
                        <AlertCircle className={`w-5 h-5 ${
                          rule.enabled ? "text-success" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{rule.name}</p>
                        <p className="text-sm text-muted-foreground">
                          When: {rule.trigger} → {rule.action}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch checked={rule.enabled} />
                      <Button variant="ghost" size="sm">
                        <Settings2 className="w-4 h-4" />
                      </Button>
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
