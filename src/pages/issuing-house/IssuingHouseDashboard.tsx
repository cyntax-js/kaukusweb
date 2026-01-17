import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Landmark, Users, DollarSign, FileText, TrendingUp, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Active Offerings", value: "3", icon: FileText, change: "+1" },
  { label: "Total Raised", value: "₦5.2B", icon: DollarSign, change: "+₦800M" },
  { label: "Investors", value: "1,240", icon: Users, change: "+180" },
  { label: "Pending IPOs", value: "2", icon: TrendingUp, change: "0" },
];

export default function IssuingHouseDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Issuing House Dashboard</h1>
          <p className="text-muted-foreground">Manage your securities issuance</p>
        </div>
        <Badge className="bg-success/10 text-success">Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-chart-4" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-success mt-1">{stat.change}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 hover-lift cursor-pointer">
          <Landmark className="w-8 h-8 text-chart-4 mb-4" />
          <h3 className="font-semibold mb-1">New Offering</h3>
          <p className="text-sm text-muted-foreground">Create a new securities offering</p>
        </Card>
        <Card className="p-6 hover-lift cursor-pointer">
          <Briefcase className="w-8 h-8 text-chart-4 mb-4" />
          <h3 className="font-semibold mb-1">Active Deals</h3>
          <p className="text-sm text-muted-foreground">Manage ongoing offerings</p>
        </Card>
        <Card className="p-6 hover-lift cursor-pointer">
          <Users className="w-8 h-8 text-chart-4 mb-4" />
          <h3 className="font-semibold mb-1">Investor Relations</h3>
          <p className="text-sm text-muted-foreground">Communicate with investors</p>
        </Card>
      </div>

      <Button variant="outline" onClick={() => navigate("/")}>Exit Dashboard</Button>
    </div>
  );
}
