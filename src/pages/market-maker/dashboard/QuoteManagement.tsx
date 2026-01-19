/**
 * Quote Management Page
 * 
 * Set bid/ask prices, quote volume, and auto-quoting rules.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";

// Mock data
const activeQuotes = [
  { symbol: "DANGCEM", bidPrice: 285.50, askPrice: 286.00, bidVol: 10000, askVol: 10000, spread: 0.18, status: "active" },
  { symbol: "GTCO", bidPrice: 28.40, askPrice: 28.55, bidVol: 50000, askVol: 50000, spread: 0.53, status: "active" },
  { symbol: "ZENITH", bidPrice: 32.15, askPrice: 32.30, bidVol: 25000, askVol: 25000, spread: 0.47, status: "active" },
  { symbol: "MTNN", bidPrice: 195.00, askPrice: 195.50, bidVol: 5000, askVol: 5000, spread: 0.26, status: "paused" },
  { symbol: "AIRTEL", bidPrice: 1520.00, askPrice: 1522.00, bidVol: 1000, askVol: 1000, spread: 0.13, status: "active" },
];

const autoQuotingRules = [
  { id: 1, name: "High Volume Sessions", trigger: "Volume > 1M", action: "Widen spread by 10%", enabled: true },
  { id: 2, name: "Low Volatility", trigger: "Volatility < 2%", action: "Tighten spread by 5%", enabled: true },
  { id: 3, name: "News Events", trigger: "News Alert", action: "Pause quoting for 5 min", enabled: false },
  { id: 4, name: "EOD Rebalance", trigger: "3:30 PM", action: "Reduce volume by 50%", enabled: true },
];

export default function QuoteManagement() {
  const [selectedSymbol, setSelectedSymbol] = useState("DANGCEM");

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
            Set bid/ask prices, manage volumes, and configure auto-quoting rules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh All
          </Button>
          <Button size="sm">
            <Play className="w-4 h-4 mr-2" />
            Start All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Quotes</p>
                <p className="text-2xl font-bold text-success">4</p>
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
                <p className="text-2xl font-bold text-warning">1</p>
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
                <p className="text-2xl font-bold">0.31%</p>
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
                <p className="text-2xl font-bold">91K</p>
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
          <TabsTrigger value="quotes">Active Quotes</TabsTrigger>
          <TabsTrigger value="set-price">Set Prices</TabsTrigger>
          <TabsTrigger value="auto-rules">Auto-Quoting Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="quotes">
          <Card>
            <CardHeader>
              <CardTitle>Active Quote Positions</CardTitle>
              <CardDescription>Manage your current bid/ask quotes across securities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Bid Price</TableHead>
                    <TableHead className="text-right">Bid Volume</TableHead>
                    <TableHead className="text-right">Ask Price</TableHead>
                    <TableHead className="text-right">Ask Volume</TableHead>
                    <TableHead className="text-right">Spread</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeQuotes.map((quote) => (
                    <TableRow key={quote.symbol}>
                      <TableCell className="font-medium">{quote.symbol}</TableCell>
                      <TableCell className="text-right text-success">₦{quote.bidPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{quote.bidVol.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-destructive">₦{quote.askPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{quote.askVol.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{quote.spread.toFixed(2)}%</TableCell>
                      <TableCell>
                        <Badge variant={quote.status === "active" ? "default" : "secondary"}>
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Settings2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            {quote.status === "active" ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
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
                <CardTitle>Set Quote Prices</CardTitle>
                <CardDescription>Manually set bid/ask prices for a security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Symbol</Label>
                  <Input 
                    value={selectedSymbol} 
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    placeholder="e.g., DANGCEM" 
                  />
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
                <CardTitle>Quick Volume Adjustment</CardTitle>
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
