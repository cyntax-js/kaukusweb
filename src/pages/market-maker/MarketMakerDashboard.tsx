import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMarketMakerStore } from "@/stores/marketMakerStore";
import {
  marketMakerDashboardStats,
  marketMakerPairs,
  riskMetrics,
} from "@/mocks/rolesDashboardData";
import {
  BarChart3,
  Activity,
  Coins,
  Zap,
  ArrowRight,
  TrendingUp,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Rocket,
  Settings,
} from "lucide-react";

const statCards = [
  {
    label: "Active Pairs",
    value: marketMakerDashboardStats.activePairs.toString(),
    icon: BarChart3,
    color: "text-chart-5",
    change: "+3",
    up: true,
  },
  {
    label: "Daily Volume",
    value: `₦${(marketMakerDashboardStats.dailyVolume / 1000000).toFixed(0)}M`,
    icon: Coins,
    color: "text-success",
    change: "+22%",
    up: true,
  },
  {
    label: "Avg Spread",
    value: `${marketMakerDashboardStats.avgSpread}%`,
    icon: Activity,
    color: "text-warning",
    change: "-0.02%",
    up: true,
  },
  {
    label: "Fill Rate",
    value: `${marketMakerDashboardStats.fillRate}%`,
    icon: Zap,
    color: "text-chart-2",
    change: "+0.3%",
    up: true,
  },
];

const quickStats = [
  {
    label: "Total Quotes",
    value: `${(marketMakerDashboardStats.totalQuotes / 1000000).toFixed(1)}M`,
  },
  {
    label: "P&L Today",
    value: `+₦${(marketMakerDashboardStats.pnlToday / 1000000).toFixed(1)}M`,
  },
  { label: "Utilization", value: `${riskMetrics.utilizationPercent}%` },
  { label: "Sharpe Ratio", value: riskMetrics.sharpeRatio.toFixed(1) },
];

export default function MarketMakerDashboard() {
  const navigate = useNavigate();
  const { status } = useMarketMakerStore();

  useEffect(() => {
    if (status === "pending") {
      navigate("/market-maker/awaiting-approval");
    }
  }, [status, navigate]);

  if (status === "pending") return null;

  const needsSetup = status !== "approved";

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      {needsSetup ? (
        <Card className="p-8 bg-gradient-to-r from-chart-5/20 to-chart-5/5 border-chart-5/30 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 bg-chart-5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-6 h-6 text-chart-5" />
                <span className="text-sm font-medium text-chart-5">
                  Getting Started
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to Your Market Maker Dashboard
              </h1>
              <p className="text-muted-foreground max-w-xl mb-6">
                You're approved! Configure your quoting engine and start
                providing liquidity.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/market-maker/dashboard/quoting")}
              >
                Configure Quoting Engine
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-48 rounded-2xl bg-chart-5/10 backdrop-blur flex items-center justify-center">
                <BarChart3 className="w-24 h-24 text-chart-5/40" />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Market Maker Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your liquidity provision
            </p>
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
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div
                className={`flex items-center text-xs font-medium ${
                  stat.up ? "text-success" : "text-destructive"
                }`}
              >
                {stat.up ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
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
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
            >
              <Zap className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
                <div className="font-semibold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Market Pairs */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-chart-5" />
              Active Market Pairs
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/market-maker/dashboard/pairs")}
            >
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b">
                  <th className="pb-3 font-medium">Symbol</th>
                  <th className="pb-3 font-medium">Bid</th>
                  <th className="pb-3 font-medium">Ask</th>
                  <th className="pb-3 font-medium">Spread</th>
                  <th className="pb-3 font-medium">Fill Rate</th>
                  <th className="pb-3 font-medium text-right">Volume 24h</th>
                </tr>
              </thead>
              <tbody>
                {marketMakerPairs.slice(0, 5).map((pair) => (
                  <tr key={pair.id} className="border-b border-border/50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pair.symbol}</span>
                        <Badge
                          variant={
                            pair.status === "active" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {pair.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 text-success">
                      ₦{pair.bidPrice.toFixed(2)}
                    </td>
                    <td className="py-3 text-destructive">
                      ₦{pair.askPrice.toFixed(2)}
                    </td>
                    <td className="py-3">{pair.spread.toFixed(2)}%</td>
                    <td className="py-3">{pair.fillRate.toFixed(1)}%</td>
                    <td className="py-3 text-right font-medium">
                      ₦{(pair.volume24h / 1000000).toFixed(0)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card
            className="p-6 hover-lift cursor-pointer"
            onClick={() => navigate("/market-maker/dashboard/quoting")}
          >
            <Zap className="w-8 h-8 text-chart-5 mb-4" />
            <h3 className="font-semibold mb-1">Quoting Engine</h3>
            <p className="text-sm text-muted-foreground">
              Configure automated quoting
            </p>
          </Card>
          <Card
            className="p-6 hover-lift cursor-pointer"
            onClick={() => navigate("/market-maker/dashboard/performance")}
          >
            <TrendingUp className="w-8 h-8 text-success mb-4" />
            <h3 className="font-semibold mb-1">Performance</h3>
            <p className="text-sm text-muted-foreground">
              View real-time metrics
            </p>
          </Card>
          <Card
            className="p-6 hover-lift cursor-pointer"
            onClick={() => navigate("/market-maker/dashboard/risk")}
          >
            <Shield className="w-8 h-8 text-warning mb-4" />
            <h3 className="font-semibold mb-1">Risk Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure risk parameters
            </p>
          </Card>
        </div>
      </div>

      {/* Risk Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-chart-5" />
            Risk Overview
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/market-maker/dashboard/risk")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Capital Utilization</span>
              <span className="font-medium">
                {riskMetrics.utilizationPercent}%
              </span>
            </div>
            <Progress value={riskMetrics.utilizationPercent} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">
              ₦{(riskMetrics.currentExposure / 1000000).toFixed(0)}M / ₦
              {(riskMetrics.maxPositionSize / 1000000).toFixed(0)}M
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30">
            <div className="text-xs text-muted-foreground">Daily P&L</div>
            <div className="text-xl font-bold text-success">
              +₦{(riskMetrics.dailyPnL / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30">
            <div className="text-xs text-muted-foreground">Monthly P&L</div>
            <div className="text-xl font-bold text-success">
              +₦{(riskMetrics.monthlyPnL / 1000000).toFixed(0)}M
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30">
            <div className="text-xs text-muted-foreground">Max Drawdown</div>
            <div className="text-xl font-bold text-destructive">
              {riskMetrics.maxDrawdown}%
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
