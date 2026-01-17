import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIssuingHouseStore } from "@/stores/issuingHouseStore";
import {
  issuingHouseDashboardStats,
  activeOfferings,
  issuingHouseInvestors,
} from "@/mocks/rolesDashboardData";
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  ArrowRight,
  Briefcase,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  Rocket,
  PlusCircle,
} from "lucide-react";

const statCards = [
  {
    label: "Active Offerings",
    value: issuingHouseDashboardStats.activeOfferings.toString(),
    icon: FileText,
    color: "text-chart-4",
    change: "+1",
    up: true,
  },
  {
    label: "Total Raised",
    value: `₦${(issuingHouseDashboardStats.totalRaised / 1000000000).toFixed(1)}B`,
    icon: DollarSign,
    color: "text-success",
    change: "+₦800M",
    up: true,
  },
  {
    label: "Total Investors",
    value: issuingHouseDashboardStats.totalInvestors.toLocaleString(),
    icon: Users,
    color: "text-warning",
    change: "+180",
    up: true,
  },
  {
    label: "Pending IPOs",
    value: issuingHouseDashboardStats.pendingIPOs.toString(),
    icon: TrendingUp,
    color: "text-chart-2",
    change: "0",
    up: true,
  },
];

const quickStats = [
  { label: "Avg. Subscription", value: `${issuingHouseDashboardStats.avgSubscriptionRate}%` },
  { label: "Completed Deals", value: issuingHouseDashboardStats.completedDeals.toString() },
  { label: "This Month", value: "₦1.2B" },
  { label: "Success Rate", value: "94%" },
];

export default function IssuingHouseDashboard() {
  const navigate = useNavigate();
  const { status } = useIssuingHouseStore();

  useEffect(() => {
    if (status === "pending") {
      navigate("/issuing-house/awaiting-approval");
    }
  }, [status, navigate]);

  if (status === "pending") return null;

  const needsSetup = status !== "approved";

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      {needsSetup ? (
        <Card className="p-8 bg-gradient-to-r from-chart-4/20 to-chart-4/5 border-chart-4/30 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 bg-chart-4 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-6 h-6 text-chart-4" />
                <span className="text-sm font-medium text-chart-4">Getting Started</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to Your Issuing House Dashboard
              </h1>
              <p className="text-muted-foreground max-w-xl mb-6">
                You're approved! Start creating offerings and managing securities issuance.
              </p>
              <Button size="lg" onClick={() => navigate("/issuing-house/dashboard/new-offering")}>
                Create New Offering
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-48 rounded-2xl bg-chart-4/10 backdrop-blur flex items-center justify-center">
                <Landmark className="w-24 h-24 text-chart-4/40" />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Issuing House Dashboard</h1>
            <p className="text-muted-foreground">Manage your securities issuance</p>
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
        {/* Active Offerings */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-chart-4" />
              Active Offerings
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/issuing-house/dashboard/deals")}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {activeOfferings.filter(o => o.status === 'active' || o.status === 'upcoming').map((offering) => (
              <div key={offering.id} className="p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{offering.name}</span>
                      <Badge variant={offering.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {offering.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{offering.type} • {offering.investors} investors</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₦{(offering.raisedAmount / 1000000000).toFixed(2)}B</div>
                    <div className="text-xs text-muted-foreground">of ₦{(offering.targetAmount / 1000000000).toFixed(1)}B</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subscription Progress</span>
                    <span className="font-medium">{offering.subscriptionRate}%</span>
                  </div>
                  <Progress value={offering.subscriptionRate} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/issuing-house/dashboard/new-offering")}>
            <PlusCircle className="w-8 h-8 text-chart-4 mb-4" />
            <h3 className="font-semibold mb-1">New Offering</h3>
            <p className="text-sm text-muted-foreground">Create a new securities offering</p>
          </Card>
          <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/issuing-house/dashboard/deals")}>
            <Briefcase className="w-8 h-8 text-warning mb-4" />
            <h3 className="font-semibold mb-1">Active Deals</h3>
            <p className="text-sm text-muted-foreground">Manage ongoing offerings</p>
          </Card>
          <Card className="p-6 hover-lift cursor-pointer" onClick={() => navigate("/issuing-house/dashboard/investors")}>
            <Users className="w-8 h-8 text-success mb-4" />
            <h3 className="font-semibold mb-1">Investor Relations</h3>
            <p className="text-sm text-muted-foreground">Communicate with investors</p>
          </Card>
        </div>
      </div>

      {/* Top Investors */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-chart-4" />
            Top Investors
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/issuing-house/dashboard/investors")}>
            View All Investors
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b">
                <th className="pb-3 font-medium">Investor</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Total Invested</th>
                <th className="pb-3 font-medium">Offerings</th>
                <th className="pb-3 font-medium text-right">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {issuingHouseInvestors.slice(0, 5).map((investor) => (
                <tr key={investor.id} className="border-b border-border/50">
                  <td className="py-3">
                    <div className="font-medium">{investor.name}</div>
                    <div className="text-xs text-muted-foreground">{investor.email}</div>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className="text-xs capitalize">{investor.type}</Badge>
                  </td>
                  <td className="py-3 font-medium">₦{(investor.totalInvested / 1000000).toFixed(0)}M</td>
                  <td className="py-3">{investor.offerings}</td>
                  <td className="py-3 text-right text-sm text-muted-foreground">
                    {investor.lastActivity.toLocaleDateString()}
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
