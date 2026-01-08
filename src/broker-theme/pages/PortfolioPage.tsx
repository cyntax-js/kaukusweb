/**
 * PORTFOLIO PAGE - Clean, minimalist design with Smart Account switch
 */

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/broker-theme/config";
import { DashboardLayout } from "@/broker-theme/layouts";
import { DepositWithdrawModal } from "@/broker-theme/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Clock,
  DollarSign,
  Percent,
  Activity,
  Briefcase,
  Lock,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getSummary,
  type PortfolioSummary,
  type Holding,
} from "@/broker-theme/api/portfolio";
import { cn } from "@/lib/utils";

// Mock transactions
const mockTransactions = [
  { id: "t1", type: "buy", symbol: "DANGOTE", name: "Dangote Cement", amount: 500, price: 285.50, total: 142750, date: "2024-01-15", time: "14:32" },
  { id: "t2", type: "sell", symbol: "MTNN", name: "MTN Nigeria", amount: 1000, price: 195.20, total: 195200, date: "2024-01-14", time: "09:15" },
  { id: "t3", type: "buy", symbol: "ZENITH", name: "Zenith Bank", amount: 5000, price: 35.80, total: 179000, date: "2024-01-13", time: "16:45" },
  { id: "t4", type: "deposit", symbol: "NGN", name: "Nigerian Naira", amount: 500000, price: 1, total: 500000, date: "2024-01-12", time: "11:20" },
  { id: "t5", type: "buy", symbol: "GTCO", name: "GTBank Holdco", amount: 3000, price: 42.30, total: 126900, date: "2024-01-11", time: "10:05" },
];

// Mock private market holdings
const mockPrivateMarketHoldings = [
  { id: "pm1", asset: "DANGCEM-P", name: "Dangote Cement Pre-IPO", units: 2000, investedValue: 520000, currentValue: 571000, yield: 9.8, maturity: "Mar 2025", type: "Pre-IPO" },
  { id: "pm2", asset: "FGN-BOND-2028", name: "FGN Bond 2028", units: 100, investedValue: 1000000, currentValue: 1085000, yield: 14.2, maturity: "Dec 2028", type: "Bond" },
  { id: "pm3", asset: "ACCESS-R", name: "Access Holdings Rights", units: 10000, investedValue: 175000, currentValue: 185000, yield: 5.7, maturity: "Jan 2025", type: "Rights" },
  { id: "pm4", asset: "LAFARGE-CP", name: "Lafarge Africa Commercial Paper", units: 50, investedValue: 500000, currentValue: 535000, yield: 18.5, maturity: "Jun 2025", type: "Commercial Paper" },
  { id: "pm5", asset: "NTB-91D", name: "Nigerian Treasury Bill 91-Day", units: 200, investedValue: 196000, currentValue: 200000, yield: 8.2, maturity: "Apr 2025", type: "T-Bill" },
];

// Performance chart data
const generatePerformanceData = () => {
  const data = [];
  let value = 1000000;
  for (let i = 0; i < 30; i++) {
    value += (Math.random() - 0.4) * 50000;
    data.push({
      date: `Day ${i + 1}`,
      value: Math.max(800000, value),
    });
  }
  return data;
};

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#ef4444", "#8b5cf6"];

const PortfolioPage = () => {
  const { config } = useTheme();
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M");
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [smartAccountEnabled, setSmartAccountEnabled] = useState(false);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await getSummary();
        setPortfolio(data);
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);

  const performanceData = useMemo(() => generatePerformanceData(), [timeRange]);

  const portfolioValue = portfolio?.totalValue ?? 2850000;
  const portfolioChange = portfolio?.totalPnl ?? 185000;
  const portfolioChangePercent = portfolio?.totalPnlPercent ?? 6.94;
  const holdings = portfolio?.holdings ?? [];

  // Calculate stats
  const cashHolding = holdings.find((h) => h.asset === "USDT" || h.asset === "USD" || h.asset === "NGN");
  const availableCash = cashHolding?.valueUsd ?? 450000;
  const invested = portfolioValue - availableCash;
  const openPositions = holdings.filter((h) => h.asset !== "USDT" && h.asset !== "USD" && h.asset !== "NGN").length;

  // Private market stats
  const privateMarketValue = mockPrivateMarketHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const privateMarketInvested = mockPrivateMarketHoldings.reduce((sum, h) => sum + h.investedValue, 0);
  const privateMarketPnl = privateMarketValue - privateMarketInvested;
  const avgYield = mockPrivateMarketHoldings.reduce((sum, h) => sum + h.yield, 0) / mockPrivateMarketHoldings.length;

  // Pie chart data
  const pieData = smartAccountEnabled
    ? mockPrivateMarketHoldings.map((h) => ({ name: h.asset, value: h.currentValue }))
    : holdings.map((h) => ({ name: h.asset, value: h.valueUsd }));

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Modals */}
        <DepositWithdrawModal open={depositModalOpen} onOpenChange={setDepositModalOpen} mode="deposit" />
        <DepositWithdrawModal open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen} mode="withdraw" availableBalance={availableCash} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
            <p className="text-muted-foreground">Track your investments and performance</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Smart Account Switch */}
            <div className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Smart Account</span>
              </div>
              <Switch
                checked={smartAccountEnabled}
                onCheckedChange={setSmartAccountEnabled}
              />
              {smartAccountEnabled && (
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setDepositModalOpen(true)}>
                <ArrowDownRight className="h-4 w-4 mr-1" />
                Deposit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setWithdrawModalOpen(true)}>
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        {/* Smart Account Banner */}
        {smartAccountEnabled && (
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Smart Account Active</p>
                    <p className="text-sm text-muted-foreground">Viewing private market yields, bonds, and alternative investments</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {avgYield.toFixed(1)}% Avg Yield
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {smartAccountEnabled ? "Private Market Value" : "Portfolio Value"}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ₦{(smartAccountEnabled ? privateMarketValue : portfolioValue).toLocaleString()}
              </p>
              <div className={cn(
                "flex items-center gap-1 mt-1",
                (smartAccountEnabled ? privateMarketPnl : portfolioChange) >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {(smartAccountEnabled ? privateMarketPnl : portfolioChange) >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-sm">
                  {(smartAccountEnabled ? privateMarketPnl : portfolioChange) >= 0 ? "+" : ""}
                  {smartAccountEnabled 
                    ? ((privateMarketPnl / privateMarketInvested) * 100).toFixed(2)
                    : portfolioChangePercent
                  }%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {smartAccountEnabled ? "Total Yield" : "Total P&L"}
                </span>
              </div>
              <p className={cn(
                "text-2xl font-bold",
                (smartAccountEnabled ? privateMarketPnl : portfolioChange) >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {(smartAccountEnabled ? privateMarketPnl : portfolioChange) >= 0 ? "+" : ""}
                ₦{Math.abs(smartAccountEnabled ? privateMarketPnl : portfolioChange).toLocaleString()}
              </p>
              <span className="text-sm text-muted-foreground">
                {smartAccountEnabled ? "Accrued interest" : "All time"}
              </span>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {smartAccountEnabled ? "Invested Capital" : "Available Cash"}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ₦{(smartAccountEnabled ? privateMarketInvested : availableCash).toLocaleString()}
              </p>
              <span className="text-sm text-muted-foreground">
                {smartAccountEnabled ? "Across instruments" : "Ready to invest"}
              </span>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {smartAccountEnabled ? "Active Positions" : "Open Positions"}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {smartAccountEnabled ? mockPrivateMarketHoldings.length : openPositions}
              </p>
              <span className="text-sm text-muted-foreground">
                ₦{(smartAccountEnabled ? privateMarketInvested : invested).toLocaleString()} invested
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Performance</CardTitle>
              <div className="flex gap-1">
                {(["1D", "1W", "1M", "3M", "1Y"] as const).map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "ghost"}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={["dataMin - 50000", "dataMax + 50000"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, "Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#performanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Holdings & Activity Tabs */}
        <Tabs defaultValue="holdings" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="holdings" className="gap-2">
              <PieChart className="h-4 w-4" />
              {smartAccountEnabled ? "Private Holdings" : "Holdings"}
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Clock className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="allocation" className="gap-2">
              <PieChart className="h-4 w-4" />
              Allocation
            </TabsTrigger>
          </TabsList>

          {/* Holdings Tab */}
          <TabsContent value="holdings">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Asset</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                          {smartAccountEnabled ? "Units" : "Balance"}
                        </th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Value</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                          {smartAccountEnabled ? "Yield" : "24h Change"}
                        </th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                          {smartAccountEnabled ? "Maturity" : "Allocation"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {smartAccountEnabled ? (
                        mockPrivateMarketHoldings.map((holding) => (
                          <tr key={holding.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Lock className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{holding.asset}</p>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs text-muted-foreground">{holding.name}</p>
                                    <Badge variant="outline" className="text-[10px] py-0">{holding.type}</Badge>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-right py-4 px-6 text-foreground font-mono">
                              {holding.units.toLocaleString()}
                            </td>
                            <td className="text-right py-4 px-6 font-medium text-foreground">
                              ₦{holding.currentValue.toLocaleString()}
                            </td>
                            <td className="text-right py-4 px-6">
                              <span className="font-medium text-green-500">
                                +{holding.yield.toFixed(2)}%
                              </span>
                            </td>
                            <td className="text-right py-4 px-6 text-muted-foreground">
                              {holding.maturity}
                            </td>
                          </tr>
                        ))
                      ) : (
                        (loading ? [] : holdings).map((holding: Holding) => (
                          <tr key={holding.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-primary">{holding.asset[0]}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{holding.asset}</p>
                                  <p className="text-xs text-muted-foreground">{holding.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-right py-4 px-6 text-foreground font-mono">
                              {holding.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                            </td>
                            <td className="text-right py-4 px-6 font-medium text-foreground">
                              ₦{holding.valueUsd.toLocaleString()}
                            </td>
                            <td className="text-right py-4 px-6">
                              <span className={cn(
                                "font-medium",
                                holding.change24h >= 0 ? "text-green-500" : "text-red-500"
                              )}>
                                {holding.change24h >= 0 ? "+" : ""}{holding.change24h.toFixed(2)}%
                              </span>
                            </td>
                            <td className="text-right py-4 px-6">
                              <div className="flex items-center justify-end gap-3">
                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${holding.allocation}%` }}
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground w-10 text-right">
                                  {holding.allocation.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Asset</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Price</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Total</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6">
                            <Badge variant={
                              tx.type === "buy" ? "default" :
                              tx.type === "sell" ? "destructive" :
                              tx.type === "deposit" ? "secondary" : "outline"
                            } className="capitalize">
                              {tx.type}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-foreground">{tx.symbol}</p>
                              <p className="text-xs text-muted-foreground">{tx.name}</p>
                            </div>
                          </td>
                          <td className="text-right py-4 px-6 font-mono text-foreground">
                            {tx.amount.toLocaleString()}
                          </td>
                          <td className="text-right py-4 px-6 text-muted-foreground">
                            ₦{tx.price.toLocaleString()}
                          </td>
                          <td className="text-right py-4 px-6 font-medium text-foreground">
                            ₦{tx.total.toLocaleString()}
                          </td>
                          <td className="text-right py-4 px-6 text-muted-foreground">
                            {tx.date} {tx.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Allocation Tab */}
          <TabsContent value="allocation">
            <Card className="bg-card border-border">
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`₦${value.toLocaleString()}`, "Value"]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-3">
                    {pieData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-foreground font-medium">{item.name}</span>
                        </div>
                        <span className="text-muted-foreground">₦{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;
