import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBrokerDeploymentStore } from "@/stores/brokerDeploymentStore";
import { mockDashboardStats } from "@/mocks/brokerData";
import {
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  ArrowRight,
  Rocket,
  CheckCircle2,
  Layers,
  ExternalLink,
  Activity,
  Clock,
  Zap,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const statCards = [
  {
    label: "Total Users",
    value: mockDashboardStats.totalUsers.toLocaleString(),
    icon: Users,
    color: "text-primary",
    change: "+12%",
    up: true,
  },
  {
    label: "Active Users",
    value: mockDashboardStats.activeUsers.toLocaleString(),
    icon: TrendingUp,
    color: "text-success",
    change: "+8%",
    up: true,
  },
  {
    label: "Monthly Revenue",
    value: `₦${mockDashboardStats.monthlyRevenue.toLocaleString()}`,
    icon: DollarSign,
    color: "text-warning",
    change: "+23%",
    up: true,
  },
  {
    label: "Total Trades",
    value: mockDashboardStats.totalTrades.toLocaleString(),
    icon: BarChart3,
    color: "text-chart-4",
    change: "-3%",
    up: false,
  },
];

const recentActivity = [
  {
    type: "user",
    message: "New user registration: Sarah Mitchell",
    time: "2 min ago",
    icon: Users,
  },
  {
    type: "trade",
    message: "Large trade executed: ₦45,000 AAPL",
    time: "5 min ago",
    icon: Activity,
  },
  {
    type: "deposit",
    message: "Deposit received: ₦10,000 from John Trader",
    time: "12 min ago",
    icon: DollarSign,
  },
  {
    type: "alert",
    message: "High volume alert: Trading spike detected",
    time: "28 min ago",
    icon: AlertCircle,
  },
  {
    type: "user",
    message: "User verification completed: Mike Johnson",
    time: "1 hour ago",
    icon: CheckCircle2,
  },
];

const quickStats = [
  {
    label: "Avg. Order Size",
    value: `₦${mockDashboardStats.avgOrderSize.toLocaleString()}`,
  },
  {
    label: "Total Volume",
    value: `₦${(mockDashboardStats.totalVolume / 1000000).toFixed(1)}M`,
  },
  { label: "Active Sessions", value: "234" },
  { label: "Pending Withdrawals", value: "12" },
];

export default function BrokerDashboard() {
  const navigate = useNavigate();
  const { isDeployed, config, currentStep, getPreviewUrl } =
    useBrokerDeploymentStore();
  const needsSetup = !isDeployed && currentStep === "welcome";
  const previewUrl = getPreviewUrl();

  const previewLabel = (() => {
    try {
      const u = new URL(previewUrl);
      return `${u.host}${u.pathname}${u.search}`;
    } catch {
      return previewUrl;
    }
  })();

  return (
    <div className="p-6 space-y-6">
      {/* Live Status Indicator */}
      {isDeployed && config.subdomain && (
        <Card className="p-4 border-success/40 bg-gradient-to-r from-success/10 to-success/5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-success animate-ping" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-success/20 text-success border-success/40 font-semibold"
                  >
                    LIVE
                  </Badge>
                  <span className="font-semibold">Your platform is live</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Available at{" "}
                  <a
                    href={previewUrl}
                    className="text-primary hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {previewLabel}
                  </a>
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Platform
              </a>
            </Button>
          </div>
        </Card>
      )}

      {needsSetup ? (
        <Card className="p-8 gradient-primary text-white relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-5 left-20 w-60 h-60 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-6 h-6" />
                <span className="text-sm font-medium text-white/80">
                  Getting Started
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to Your Broker Dashboard
              </h1>
              <p className="text-white/80 max-w-xl mb-6">
                You're approved! Now it's time to set up your broker platform.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/broker/dashboard/deploy")}
                className="shadow-lg"
              >
                Start Platform Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-48 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Layers className="w-24 h-24 text-white/40" />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        !isDeployed && (
          <Card className="p-6 border-warning/30 bg-warning/5 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-warning" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">Setup In Progress</h2>
                <p className="text-sm text-muted-foreground">
                  Continue setting up your broker platform to go live.
                </p>
              </div>
              <Button onClick={() => navigate("/broker/dashboard/deploy")}>
                Continue Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )
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
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent Activity
            </h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{item.message}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card
            className="p-6 hover-lift cursor-pointer"
            onClick={() => navigate("/broker/dashboard/users")}
          >
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold mb-1">Manage Users</h3>
            <p className="text-sm text-muted-foreground">
              View and manage your registered users
            </p>
          </Card>
          <Card
            className="p-6 hover-lift cursor-pointer"
            onClick={() => navigate("/broker/dashboard/fees")}
          >
            <DollarSign className="w-8 h-8 text-warning mb-4" />
            <h3 className="font-semibold mb-1">Configure Fees</h3>
            <p className="text-sm text-muted-foreground">
              Set trading fees and commissions
            </p>
          </Card>
          <Card
            className="p-6 hover-lift cursor-pointer"
            onClick={() => navigate("/broker/dashboard/analytics")}
          >
            <BarChart3 className="w-8 h-8 text-success mb-4" />
            <h3 className="font-semibold mb-1">View Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Track performance and metrics
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
