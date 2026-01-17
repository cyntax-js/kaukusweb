import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from "lucide-react";
import { dealerInventory } from "@/mocks/rolesDashboardData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(value);
};

export default function DealerInventory() {
  const totalValue = dealerInventory.reduce((sum, item) => sum + (item.quantity * item.currentPrice), 0);
  const totalPnL = dealerInventory.reduce((sum, item) => sum + item.pnl, 0);
  const avgPnLPercent = dealerInventory.reduce((sum, item) => sum + item.pnlPercent, 0) / dealerInventory.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your securities inventory</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Prices
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Positions</p>
                <p className="text-xl font-bold">{dealerInventory.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${totalPnL >= 0 ? 'bg-chart-2/10' : 'bg-destructive/10'}`}>
                {totalPnL >= 0 ? <TrendingUp className="w-5 h-5 text-chart-2" /> : <TrendingDown className="w-5 h-5 text-destructive" />}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unrealized P&L</p>
                <p className={`text-xl font-bold ${totalPnL >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                  {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${avgPnLPercent >= 0 ? 'bg-chart-2/10' : 'bg-destructive/10'}`}>
                {avgPnLPercent >= 0 ? <TrendingUp className="w-5 h-5 text-chart-2" /> : <TrendingDown className="w-5 h-5 text-destructive" />}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Return</p>
                <p className={`text-xl font-bold ${avgPnLPercent >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                  {avgPnLPercent >= 0 ? '+' : ''}{avgPnLPercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
          <CardDescription>Current inventory positions and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Avg Cost</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Market Value</TableHead>
                <TableHead className="text-right">P&L</TableHead>
                <TableHead className="text-right">Return %</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealerInventory.map((item) => {
                const marketValue = item.quantity * item.currentPrice;
                const maxPositionPercent = (marketValue / totalValue) * 100;
                
                return (
                  <TableRow key={item.symbol}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {item.symbol.slice(0, 2)}
                        </div>
                        <span className="font-medium">{item.symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.avgCost)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.currentPrice)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(marketValue)}</TableCell>
                    <TableCell className={`text-right font-medium ${item.pnl >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                      {item.pnl >= 0 ? '+' : ''}{formatCurrency(item.pnl)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className={item.pnlPercent >= 0 ? 'text-chart-2 border-chart-2' : 'text-destructive border-destructive'}>
                        {item.pnlPercent >= 0 ? '+' : ''}{item.pnlPercent.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={maxPositionPercent} className="w-16 h-2" />
                        {maxPositionPercent > 30 && (
                          <AlertTriangle className="w-4 h-4 text-chart-4" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
