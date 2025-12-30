/**
 * ============================================================
 * BROKER PORTFOLIO PAGE
 * ============================================================
 * 
 * Shows user portfolio holdings, P&L tracking, and activity.
 * Uses mock data - replace with broker API calls.
 * 
 * Route: /preview/portfolio
 */

import { useState, useEffect } from 'react';
import { useTheme } from '@/broker-theme/config';
import { DashboardLayout } from '@/broker-theme/layouts';
import { DepositWithdrawModal } from '@/broker-theme/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight,
  PieChart, BarChart3, Clock, DollarSign, Percent, Activity
} from 'lucide-react';
import { getSummary, type PortfolioSummary, type Holding } from '@/broker-theme/api/portfolio';

// ============================================================
// MOCK DATA - Replace with API calls
// ============================================================

const mockTransactions = [
  { id: 't1', type: 'buy', symbol: 'BTC', name: 'Bitcoin', amount: 0.25, price: 42583.20, total: 10645.80, date: '2024-01-15', time: '14:32' },
  { id: 't2', type: 'sell', symbol: 'ETH', name: 'Ethereum', amount: 2.0, price: 2284.50, total: 4569.00, date: '2024-01-14', time: '09:15' },
  { id: 't3', type: 'buy', symbol: 'SOL', name: 'Solana', amount: 50, price: 98.42, total: 4921.00, date: '2024-01-13', time: '16:45' },
  { id: 't4', type: 'deposit', symbol: 'USD', name: 'US Dollar', amount: 5000, price: 1, total: 5000.00, date: '2024-01-12', time: '11:20' },
  { id: 't5', type: 'buy', symbol: 'AAPL', name: 'Apple Inc.', amount: 25, price: 182.63, total: 4565.75, date: '2024-01-11', time: '10:05' },
  { id: 't6', type: 'withdraw', symbol: 'USD', name: 'US Dollar', amount: 2000, price: 1, total: 2000.00, date: '2024-01-10', time: '15:30' },
  { id: 't7', type: 'sell', symbol: 'NVDA', name: 'NVIDIA', amount: 10, price: 485.20, total: 4852.00, date: '2024-01-09', time: '13:22' },
];

const mockPerformanceData = [
  { date: 'Jan 1', value: 100000 },
  { date: 'Jan 5', value: 102500 },
  { date: 'Jan 10', value: 98700 },
  { date: 'Jan 15', value: 105200 },
  { date: 'Jan 20', value: 112000 },
  { date: 'Jan 25', value: 118500 },
  { date: 'Jan 30', value: 125430 },
];

// ============================================================
// COMPONENT
// ============================================================

const PortfolioPage = () => {
  const { config } = useTheme();
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await getSummary();
        setPortfolio(data);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);

  const portfolioValue = portfolio?.totalValue ?? 125430.50;
  const portfolioChange = portfolio?.totalPnl ?? 8520.30;
  const portfolioChangePercent = portfolio?.totalPnlPercent ?? 7.29;
  const holdings = portfolio?.holdings ?? [];

  // Calculate stats
  const cashHolding = holdings.find(h => h.asset === 'USDT' || h.asset === 'USD');
  const availableCash = cashHolding?.valueUsd ?? 15010.90;
  const invested = portfolioValue - availableCash;
  const openPositions = holdings.filter(h => h.asset !== 'USDT' && h.asset !== 'USD').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Deposit/Withdraw Modals */}
        <DepositWithdrawModal 
          open={depositModalOpen} 
          onOpenChange={setDepositModalOpen} 
          mode="deposit" 
        />
        <DepositWithdrawModal 
          open={withdrawModalOpen} 
          onOpenChange={setWithdrawModalOpen} 
          mode="withdraw"
          availableBalance={availableCash}
        />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
            <p className="text-muted-foreground">Track your investments and performance</p>
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

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Portfolio Value</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div className={`flex items-center gap-1 mt-1 ${portfolioChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {portfolioChangePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="text-sm">
                  {portfolioChangePercent >= 0 ? '+' : ''}{portfolioChangePercent}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total P&L</span>
              </div>
              <p className={`text-2xl font-bold ${portfolioChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {portfolioChange >= 0 ? '+' : ''}${Math.abs(portfolioChange).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <span className="text-sm text-muted-foreground">All time</span>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Available Cash</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${availableCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <span className="text-sm text-muted-foreground">Ready to invest</span>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Open Positions</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{openPositions}</p>
              <span className="text-sm text-muted-foreground">${invested.toLocaleString(undefined, { minimumFractionDigits: 2 })} invested</span>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Performance</CardTitle>
              <div className="flex gap-1">
                {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map(range => (
                  <Button
                    key={range}
                    variant={timeRange === range ? 'default' : 'ghost'}
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
            <div className="h-48 flex items-end gap-1">
              {mockPerformanceData.map((d, i) => {
                const maxVal = Math.max(...mockPerformanceData.map(p => p.value));
                const minVal = Math.min(...mockPerformanceData.map(p => p.value));
                const range = maxVal - minVal || 1;
                const height = ((d.value - minVal) / range) * 100;
                const isPositive = i === 0 || d.value >= mockPerformanceData[i - 1].value;
                
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className={`w-full rounded-t transition-all ${isPositive ? 'bg-green-500/80' : 'bg-red-500/80'}`}
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{d.date.split(' ')[1]}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Holdings & Activity Tabs */}
        <Tabs defaultValue="holdings" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="holdings" className="gap-2">
              <PieChart className="h-4 w-4" />
              Holdings
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Clock className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="pnl" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              P&L Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="holdings">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Asset</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Balance</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Value</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">24h Change</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(loading ? [] : holdings).map((holding: Holding) => (
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
                            ${holding.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="text-right py-4 px-6">
                            <span className={`font-medium ${holding.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {holding.change24h >= 0 ? '+' : ''}{holding.change24h.toFixed(2)}%
                            </span>
                          </td>
                          <td className="text-right py-4 px-6">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${holding.allocation}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right font-mono">
                                {holding.allocation.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map(tx => (
                        <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                              tx.type === 'buy' ? 'bg-green-500/10 text-green-500' :
                              tx.type === 'sell' ? 'bg-red-500/10 text-red-500' :
                              tx.type === 'deposit' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-orange-500/10 text-orange-500'
                            }`}>
                              {tx.type === 'buy' && <ArrowDownRight className="h-3 w-3" />}
                              {tx.type === 'sell' && <ArrowUpRight className="h-3 w-3" />}
                              {tx.type === 'deposit' && <Wallet className="h-3 w-3" />}
                              {tx.type === 'withdraw' && <Wallet className="h-3 w-3" />}
                              {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-foreground">{tx.symbol}</p>
                              <p className="text-xs text-muted-foreground">{tx.name}</p>
                            </div>
                          </td>
                          <td className="text-right py-4 px-6 text-foreground font-mono">
                            {tx.amount.toLocaleString()}
                          </td>
                          <td className="text-right py-4 px-6 text-muted-foreground font-mono">
                            ${tx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="text-right py-4 px-6 font-medium text-foreground font-mono">
                            ${tx.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="text-right py-4 px-6">
                            <div>
                              <p className="text-foreground">{tx.date}</p>
                              <p className="text-xs text-muted-foreground">{tx.time}</p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pnl">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* P&L by Asset */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">P&L by Asset</h3>
                    <div className="space-y-3">
                      {holdings.filter(h => h.asset !== 'USDT').map(holding => {
                        const pnl = holding.valueUsd * (holding.change24h / 100);
                        return (
                          <div key={holding.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-xs font-bold text-primary">{holding.asset[0]}</span>
                              </div>
                              <span className="font-medium text-foreground">{holding.asset}</span>
                            </div>
                            <div className="text-right">
                              <p className={`font-medium ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                              </p>
                              <p className={`text-xs ${holding.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {holding.change24h >= 0 ? '+' : ''}{holding.change24h.toFixed(2)}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* P&L Summary */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Summary</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-sm text-green-500">Realized P&L</p>
                        <p className="text-2xl font-bold text-green-500">+$3,247.80</p>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-sm text-blue-500">Unrealized P&L</p>
                        <p className="text-2xl font-bold text-blue-500">+$5,272.50</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground">Total P&L</p>
                        <p className="text-2xl font-bold text-foreground">+$8,520.30</p>
                      </div>
                    </div>
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
