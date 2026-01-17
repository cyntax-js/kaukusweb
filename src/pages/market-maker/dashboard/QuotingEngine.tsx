import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Zap, Play, Pause, Settings2, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { marketMakerPairs, MarketPair } from "@/mocks/rolesDashboardData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(value);
};

const formatVolume = (value: number) => {
  if (value >= 1000000000) return `₦${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(1)}M`;
  return formatCurrency(value);
};

export default function QuotingEngine() {
  const [isEngineRunning, setIsEngineRunning] = useState(true);
  const [selectedPairs, setSelectedPairs] = useState<string[]>(marketMakerPairs.map((p) => p.id));

  const togglePair = (pairId: string) => {
    setSelectedPairs((prev) =>
      prev.includes(pairId) ? prev.filter((id) => id !== pairId) : [...prev, pairId]
    );
  };

  const getStatusBadge = (status: MarketPair['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30"><Activity className="w-3 h-3 mr-1" />Active</Badge>;
      case 'paused':
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30"><Pause className="w-3 h-3 mr-1" />Paused</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quoting Engine</h1>
          <p className="text-muted-foreground">Manage automated market making quotes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Engine Status:</span>
            <Badge className={isEngineRunning ? "bg-chart-2/20 text-chart-2" : "bg-muted text-muted-foreground"}>
              {isEngineRunning ? "Running" : "Stopped"}
            </Badge>
          </div>
          <Button
            variant={isEngineRunning ? "destructive" : "default"}
            onClick={() => setIsEngineRunning(!isEngineRunning)}
          >
            {isEngineRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isEngineRunning ? "Stop Engine" : "Start Engine"}
          </Button>
        </div>
      </div>

      {/* Engine Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quotes/sec</p>
              <p className="text-xl font-bold">{isEngineRunning ? "1,250" : "0"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Pairs</p>
              <p className="text-xl font-bold">{selectedPairs.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fill Rate</p>
              <p className="text-xl font-bold">98.7%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Spread</p>
              <p className="text-xl font-bold">0.12%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pairs Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Market Pairs</CardTitle>
              <CardDescription>Configure quoting parameters for each pair</CardDescription>
            </div>
            <Button variant="outline">
              <Settings2 className="w-4 h-4 mr-2" />
              Global Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Active</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Bid</TableHead>
                <TableHead className="text-right">Ask</TableHead>
                <TableHead className="text-right">Spread</TableHead>
                <TableHead className="text-right">24h Volume</TableHead>
                <TableHead className="text-right">Quotes</TableHead>
                <TableHead className="text-right">Fill Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketMakerPairs.map((pair) => (
                <TableRow key={pair.id} className={!selectedPairs.includes(pair.id) ? "opacity-50" : ""}>
                  <TableCell>
                    <Switch
                      checked={selectedPairs.includes(pair.id)}
                      onCheckedChange={() => togglePair(pair.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {pair.symbol.slice(0, 2)}
                      </div>
                      <span className="font-medium">{pair.symbol}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-chart-2">{formatCurrency(pair.bidPrice)}</TableCell>
                  <TableCell className="text-right text-destructive">{formatCurrency(pair.askPrice)}</TableCell>
                  <TableCell className="text-right">{pair.spread.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">{formatVolume(pair.volume24h)}</TableCell>
                  <TableCell className="text-right">{pair.quoteCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="text-chart-2 border-chart-2">
                      {pair.fillRate.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(pair.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Spread Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Spread (%)</label>
              <Input type="number" defaultValue="0.05" step="0.01" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Spread (%)</label>
              <Input type="number" defaultValue="0.50" step="0.01" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quote Size</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Quote Size</label>
              <Input type="number" defaultValue="1000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Quote Size</label>
              <Input type="number" defaultValue="100000" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Refresh Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quote Interval (ms)</label>
              <Input type="number" defaultValue="100" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Update (ms)</label>
              <Input type="number" defaultValue="500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
