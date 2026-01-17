import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, AlertTriangle, TrendingUp, TrendingDown, DollarSign, Activity, Target, BarChart3 } from "lucide-react";
import { riskMetrics, dealerInventory } from "@/mocks/rolesDashboardData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

export default function RiskManagement() {
  const utilizationColor = riskMetrics.utilizationPercent > 80 ? "text-destructive" :
    riskMetrics.utilizationPercent > 60 ? "text-chart-4" : "text-chart-2";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Risk Management</h1>
          <p className="text-muted-foreground">Monitor and manage trading risk exposure</p>
        </div>
        <Button variant="outline">
          <Shield className="w-4 h-4 mr-2" />
          Risk Settings
        </Button>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Capital Utilization</span>
              <Badge variant="outline" className={utilizationColor}>
                {riskMetrics.utilizationPercent}%
              </Badge>
            </div>
            <Progress value={riskMetrics.utilizationPercent} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(riskMetrics.currentExposure)}</span>
              <span>of {formatCurrency(riskMetrics.maxPositionSize)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${riskMetrics.dailyPnL >= 0 ? 'bg-chart-2/10' : 'bg-destructive/10'}`}>
              {riskMetrics.dailyPnL >= 0 ? <TrendingUp className="w-5 h-5 text-chart-2" /> : <TrendingDown className="w-5 h-5 text-destructive" />}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily P&L</p>
              <p className={`text-xl font-bold ${riskMetrics.dailyPnL >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                {riskMetrics.dailyPnL >= 0 ? '+' : ''}{formatCurrency(riskMetrics.dailyPnL)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <p className="text-xl font-bold text-destructive">{riskMetrics.maxDrawdown}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-chart-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
              <p className="text-xl font-bold">{riskMetrics.sharpeRatio}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* P&L Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-chart-2" />
              Daily P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${riskMetrics.dailyPnL >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
              {riskMetrics.dailyPnL >= 0 ? '+' : ''}{formatCurrency(riskMetrics.dailyPnL)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Today's realized + unrealized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-chart-1" />
              Weekly P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${riskMetrics.weeklyPnL >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
              {riskMetrics.weeklyPnL >= 0 ? '+' : ''}{formatCurrency(riskMetrics.weeklyPnL)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Last 7 days performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Monthly P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${riskMetrics.monthlyPnL >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
              {riskMetrics.monthlyPnL >= 0 ? '+' : ''}{formatCurrency(riskMetrics.monthlyPnL)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Month to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Position Risk */}
      <Card>
        <CardHeader>
          <CardTitle>Position Risk Analysis</CardTitle>
          <CardDescription>Risk metrics by position</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Position Size</TableHead>
                <TableHead className="text-right">Market Value</TableHead>
                <TableHead className="text-right">Unrealized P&L</TableHead>
                <TableHead className="text-right">% of Capital</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealerInventory.map((position) => {
                const marketValue = position.quantity * position.currentPrice;
                const capitalPercent = (marketValue / riskMetrics.maxPositionSize) * 100;
                const riskLevel = capitalPercent > 15 ? "high" : capitalPercent > 10 ? "medium" : "low";

                return (
                  <TableRow key={position.symbol}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {position.symbol.slice(0, 2)}
                        </div>
                        <span className="font-medium">{position.symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{position.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{formatCurrency(marketValue)}</TableCell>
                    <TableCell className={`text-right font-medium ${position.pnl >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                      {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                    </TableCell>
                    <TableCell className="text-right">{capitalPercent.toFixed(1)}%</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          riskLevel === "high" ? "text-destructive border-destructive" :
                            riskLevel === "medium" ? "text-chart-4 border-chart-4" :
                              "text-chart-2 border-chart-2"
                        }
                      >
                        {riskLevel === "high" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Limits</CardTitle>
          <CardDescription>Current limit utilization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Max Position Size</span>
              <span className={riskMetrics.utilizationPercent > 80 ? "text-destructive" : "text-muted-foreground"}>
                {riskMetrics.utilizationPercent}% used
              </span>
            </div>
            <Progress value={riskMetrics.utilizationPercent} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Loss Limit</span>
              <span className="text-muted-foreground">0% used</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Concentration Limit (per symbol)</span>
              <span className="text-chart-4">45% used</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
