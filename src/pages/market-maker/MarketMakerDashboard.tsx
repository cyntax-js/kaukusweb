import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Activity, DollarSign, Zap, TrendingUp, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Active Pairs", value: "24", icon: BarChart3, change: "+3" },
  { label: "Daily Volume", value: "₦890M", icon: DollarSign, change: "+22%" },
  { label: "Avg Spread", value: "0.12%", icon: Activity, change: "-0.02%" },
  { label: "Fill Rate", value: "98.7%", icon: Zap, change: "+0.3%" },
];

export default function MarketMakerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Market Maker Dashboard</h1>
          <p className="text-muted-foreground">Manage your liquidity provision</p>
        </div>
        <Badge className="bg-success/10 text-success">Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-chart-5" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-success mt-1">{stat.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 hover-lift cursor-pointer">
          <TrendingUp className="w-8 h-8 text-chart-5 mb-4" />
          <h3 className="font-semibold mb-1">Quoting Engine</h3>
          <p className="text-sm text-muted-foreground">Configure automated quoting</p>
        </Card>
        <Card className="p-6 hover-lift cursor-pointer">
          <Activity className="w-8 h-8 text-chart-5 mb-4" />
          <h3 className="font-semibold mb-1">Performance</h3>
          <p className="text-sm text-muted-foreground">View real-time metrics</p>
        </Card>
        <Card className="p-6 hover-lift cursor-pointer">
          <Settings className="w-8 h-8 text-chart-5 mb-4" />
          <h3 className="font-semibold mb-1">Risk Settings</h3>
          <p className="text-sm text-muted-foreground">Configure risk parameters</p>
        </Card>
      </div>

      <Button variant="outline" onClick={() => navigate("/")}>Exit Dashboard</Button>
    </div>
  );
}
