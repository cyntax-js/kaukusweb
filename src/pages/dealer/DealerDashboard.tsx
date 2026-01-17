import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, DollarSign, BarChart3, ArrowRight, FileText, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Trades", value: "2,450", icon: TrendingUp, change: "+18%" },
  { label: "Trading Volume", value: "₦1.2B", icon: DollarSign, change: "+12%" },
  { label: "Active Markets", value: "8", icon: BarChart3, change: "+2" },
  { label: "Connected Brokers", value: "45", icon: Users, change: "+5" },
];

export default function DealerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dealer Dashboard</h1>
          <p className="text-muted-foreground">Manage your trading operations</p>
        </div>
        <Badge className="bg-success/10 text-success">Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-chart-2" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-success mt-1">{stat.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 hover-lift cursor-pointer" onClick={() => {}}>
          <Building2 className="w-8 h-8 text-chart-2 mb-4" />
          <h3 className="font-semibold mb-1">Trading Operations</h3>
          <p className="text-sm text-muted-foreground">Manage your trading activities</p>
        </Card>
        <Card className="p-6 hover-lift cursor-pointer" onClick={() => {}}>
          <FileText className="w-8 h-8 text-chart-2 mb-4" />
          <h3 className="font-semibold mb-1">Reports</h3>
          <p className="text-sm text-muted-foreground">View trading reports and analytics</p>
        </Card>
        <Card className="p-6 hover-lift cursor-pointer" onClick={() => {}}>
          <BarChart3 className="w-8 h-8 text-chart-2 mb-4" />
          <h3 className="font-semibold mb-1">Market Data</h3>
          <p className="text-sm text-muted-foreground">Access real-time market data</p>
        </Card>
      </div>

      <Button variant="outline" onClick={() => navigate("/")}>
        Exit Dashboard
      </Button>
    </div>
  );
}
