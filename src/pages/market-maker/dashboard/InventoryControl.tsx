/**
 * Inventory Control Page
 * 
 * Manage inventory limits and long/short exposure.
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Settings2,
  RefreshCw,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const inventoryPositions = [
  { 
    symbol: "DANGCEM", 
    quantity: 25000, 
    avgCost: 280.50, 
    marketPrice: 285.75, 
    pnl: 131250, 
    pnlPercent: 1.87,
    exposure: 7143750,
    limit: 10000000,
    utilization: 71.4,
    direction: "long"
  },
  { 
    symbol: "GTCO", 
    quantity: -15000, 
    avgCost: 28.80, 
    marketPrice: 28.50, 
    pnl: 4500, 
    pnlPercent: 1.04,
    exposure: 427500,
    limit: 1000000,
    utilization: 42.8,
    direction: "short"
  },
  { 
    symbol: "ZENITH", 
    quantity: 30000, 
    avgCost: 31.90, 
    marketPrice: 32.20, 
    pnl: 9000, 
    pnlPercent: 0.94,
    exposure: 966000,
    limit: 1500000,
    utilization: 64.4,
    direction: "long"
  },
  { 
    symbol: "MTNN", 
    quantity: 2000, 
    avgCost: 192.00, 
    marketPrice: 195.25, 
    pnl: 6500, 
    pnlPercent: 1.69,
    exposure: 390500,
    limit: 500000,
    utilization: 78.1,
    direction: "long"
  },
  { 
    symbol: "AIRTEL", 
    quantity: -500, 
    avgCost: 1525.00, 
    marketPrice: 1521.00, 
    pnl: 2000, 
    pnlPercent: 0.26,
    exposure: 760500,
    limit: 1000000,
    utilization: 76.1,
    direction: "short"
  },
];

const exposureLimits = [
  { category: "Total Long Exposure", current: 8500250, limit: 15000000, percent: 56.7 },
  { category: "Total Short Exposure", current: 1188000, limit: 5000000, percent: 23.8 },
  { category: "Single Security Max", current: 7143750, limit: 10000000, percent: 71.4 },
  { category: "Sector Concentration", current: 65, limit: 100, percent: 65 },
];

export default function InventoryControl() {
  const totalPnL = inventoryPositions.reduce((acc, p) => acc + p.pnl, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-chart-5" />
            Inventory Control
          </h1>
          <p className="text-muted-foreground">
            Monitor inventory limits and manage long/short exposure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rebalance
          </Button>
          <Button variant="outline" size="sm">
            <Settings2 className="w-4 h-4 mr-2" />
            Limits
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className="text-2xl font-bold text-success">
                  ₦{totalPnL.toLocaleString()}
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Long Positions</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Short Positions</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <TrendingDown className="w-5 h-5 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Limit Warnings</p>
                <p className="text-2xl font-bold text-warning">2</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exposure Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Exposure Limits</CardTitle>
          <CardDescription>Monitor utilization against regulatory and internal limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {exposureLimits.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span className={`font-medium ${
                    item.percent > 75 ? "text-warning" : item.percent > 90 ? "text-destructive" : ""
                  }`}>
                    {item.percent.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={item.percent} 
                  className={`h-2 ${
                    item.percent > 75 ? "[&>div]:bg-warning" : item.percent > 90 ? "[&>div]:bg-destructive" : ""
                  }`}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₦{item.current.toLocaleString()}</span>
                  <span>Limit: ₦{item.limit.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Positions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Position Details</CardTitle>
          <CardDescription>Current inventory positions and P&L</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Avg Cost</TableHead>
                <TableHead className="text-right">Market Price</TableHead>
                <TableHead className="text-right">P&L</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryPositions.map((position) => (
                <TableRow key={position.symbol}>
                  <TableCell className="font-medium">{position.symbol}</TableCell>
                  <TableCell>
                    <Badge variant={position.direction === "long" ? "default" : "secondary"}>
                      {position.direction === "long" ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {position.direction}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.abs(position.quantity).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">₦{position.avgCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₦{position.marketPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={position.pnl >= 0 ? "text-success" : "text-destructive"}>
                      {position.pnl >= 0 ? "+" : ""}₦{position.pnl.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({position.pnlPercent.toFixed(2)}%)
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={position.utilization} className="w-20 h-2" />
                      <span className={`text-xs ${
                        position.utilization > 75 ? "text-warning" : ""
                      }`}>
                        {position.utilization.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Settings2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
