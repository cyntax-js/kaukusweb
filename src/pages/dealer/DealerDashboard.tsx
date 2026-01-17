import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDealerStore } from "@/stores/dealerStore";
import {
  dealerDashboardStats,
  dealerRecentTrades,
  dealerInventory,
} from "@/mocks/rolesDashboardData";
import {
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  ArrowRight,
  Package,
  Activity,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Rocket,
} from "lucide-react";

const statCards = [
  {
    label: "Total Trades",
    value: dealerDashboardStats.totalTrades.toLocaleString(),
    icon: TrendingUp,
    color: "text-chart-2",
    change: "+18%",
    up: true,
  },
  {
    label: "Trading Volume",
    value: `₦${(dealerDashboardStats.tradingVolume / 1000000000).toFixed(1)}B`,
    icon: DollarSign,
    color: "text-success",
    change: "+12%",
    up: true,
  },
  {
    label: "Active Markets",
    value: dealerDashboardStats.activeMarkets.toString(),
    icon: BarChart3,
    color: "text-warning",
    change: "+2",
    up: true,
  },
  {
    label: "Connected Brokers",
    value: dealerDashboardStats.connectedBrokers.toString(),
    icon: Users,
    color: "text-chart-4",
    change: "+5",
    up: true,
  },
];

const quickStats = [
  { label: "Avg. Spread", value: `${dealerDashboardStats.avgSpread}%` },
  { label: "Daily Transactions", value: dealerDashboardStats.dailyTransactions.toString() },
  { label: "Inventory Value", value: "₦2.4B" },
  { label: "P&L Today", value: "+₦15.2M" },
];

export default function DealerDashboard() {
  const navigate = useNavigate();
  const { status } = useDealerStore();

  useEffect(() => {
    if (status === "pending") {
      navigate("/dealer/awaiting-approval");
    }
  }, [status, navigate]);

  if (status === "pending") return null;

  const needsSetup = status !== "approved";

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      {needsSetup ? (
        <Card className="p-8 bg-gradient-to-r from-chart-2/20 to-chart-2/5 border-chart-2/30 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 bg-chart-2 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-6 h-6 text-chart-2" />
                <span className="text-sm font-medium text-chart-2">Getting Started</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to Your Dealer Dashboard
              </h1>
              <p className="text-muted-foreground max-w-xl mb-6">
                You're approved! Start trading and providing liquidity to the marketplace.
              </p>
              <Button size="lg" onClick={() => navigate("/dealer/dashboard/trading")}>
                Start Trading
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-48 rounded-2xl bg-chart-2/10 backdrop-blur flex items-center justify-center">
                <Building2 className="w-24 h-24 text-chart-2/40" />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dealer Dashboard</h1>
            <p className="text-muted-foreground">Manage your trading operations</p>
          </div>
          <Badge className="bg-success/10 text-success">Active</Badge>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Card
            key={i}
            className="p-6 hover-lift opacity-0 animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Stats Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div className="font-semibold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Trades */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-chart-2" />
              Recent Trades
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dealer/dashboard/trading")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {dealerRecentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${trade.side === 'buy' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                  {trade.side === 'buy' ? (
                    <ArrowUpRight className={`w-4 h-4 text-success`} />
                  ) : (
                    <ArrowDownRight className={`w-4 h-4 text-destructive`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{trade.symbol}</span>
                    <Badge variant="outline" className="text-xs">{trade.side.toUpperCase()}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{trade.broker}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₦{(trade.price * trade.quantity).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{trade.quantity.toLocaleString()} @ ₦{trade.price}</div>
                </div>
                <Badge variant={trade.status === 'filled' ? 'default' : trade.status === 'partial' ? 'secondary' : 'outline'} className="text-xs">
                  {trade.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/dealer/dashboard/trading")}>
            <TrendingUp className="w-8 h-8 text-chart-2 mb-4" />
            <h3 className="font-semibold mb-1">Trading Operations</h3>
            <p className="text-sm text-muted-foreground">Execute and manage trades</p>
          </Card>
          <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/dealer/dashboard/inventory")}>
            <Package className="w-8 h-8 text-warning mb-4" />
            <h3 className="font-semibold mb-1">Inventory</h3>
            <p className="text-sm text-muted-foreground">View positions and holdings</p>
          </Card>
          <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/dealer/dashboard/brokers")}>
            <Users className="w-8 h-8 text-success mb-4" />
            <h3 className="font-semibold mb-1">Broker Network</h3>
            <p className="text-sm text-muted-foreground">Manage broker connections</p>
          </Card>
        </div>
      </div>

      {/* Inventory Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Package className="w-4 h-4 text-chart-2" />
            Inventory Overview
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dealer/dashboard/inventory")}>
            View Full Inventory
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b">
                <th className="pb-3 font-medium">Symbol</th>
                <th className="pb-3 font-medium">Quantity</th>
                <th className="pb-3 font-medium">Avg Cost</th>
                <th className="pb-3 font-medium">Current Price</th>
                <th className="pb-3 font-medium text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              {dealerInventory.slice(0, 5).map((item) => (
                <tr key={item.symbol} className="border-b border-border/50">
                  <td className="py-3 font-medium">{item.symbol}</td>
                  <td className="py-3">{item.quantity.toLocaleString()}</td>
                  <td className="py-3">₦{item.avgCost.toFixed(2)}</td>
                  <td className="py-3">₦{item.currentPrice.toFixed(2)}</td>
                  <td className={`py-3 text-right font-medium ${item.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {item.pnl >= 0 ? '+' : ''}₦{item.pnl.toLocaleString()} ({item.pnlPercent.toFixed(2)}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
