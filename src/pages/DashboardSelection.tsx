/**
 * Dashboard Selection Page
 * 
 * Shown when a user has multiple approved licenses.
 * Allows them to select which dashboard to operate from.
 */

import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLicenseStore, type LicenseType } from "@/stores/licenseStore";
import { 
  TrendingUp, 
  Building2, 
  Landmark, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Shield,
} from "lucide-react";

const dashboardConfig: Record<LicenseType, {
  icon: typeof TrendingUp;
  title: string;
  description: string;
  route: string;
  gradient: string;
}> = {
  broker: {
    icon: TrendingUp,
    title: "Broker Dashboard",
    description: "Manage your brokerage operations, users, and white-label platforms",
    route: "/broker/dashboard",
    gradient: "from-primary to-primary/70",
  },
  dealer: {
    icon: Building2,
    title: "Dealer Dashboard",
    description: "Trade securities, manage inventory, and monitor positions",
    route: "/dealer/dashboard",
    gradient: "from-chart-2 to-chart-2/70",
  },
  issuing_house: {
    icon: Landmark,
    title: "Issuing House Dashboard",
    description: "Manage public offerings, capital raising, and investor relations",
    route: "/issuing-house/dashboard",
    gradient: "from-chart-4 to-chart-4/70",
  },
  market_maker: {
    icon: BarChart3,
    title: "Market Maker Dashboard",
    description: "Provide liquidity, manage quotes, and track market depth",
    route: "/market-maker/dashboard",
    gradient: "from-chart-5 to-chart-5/70",
  },
};

export default function DashboardSelection() {
  const navigate = useNavigate();
  const { getApprovedLicenses, setActiveDashboard } = useLicenseStore();
  
  const approvedLicenses = getApprovedLicenses();

  const handleSelectDashboard = (type: LicenseType) => {
    setActiveDashboard(type);
    navigate(dashboardConfig[type].route);
  };

  // If only one license, redirect directly
  if (approvedLicenses.length === 1) {
    const license = approvedLicenses[0];
    handleSelectDashboard(license.type);
    return null;
  }

  // If no approved licenses, show message
  if (approvedLicenses.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Active Licenses</h1>
          <p className="text-muted-foreground mb-6">
            You don't have any approved licenses yet. Apply for a license to access dashboards.
          </p>
          <Button onClick={() => navigate("/role-selection")}>
            Apply for License
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Multiple Licenses Approved
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Select Operating Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You have multiple approved licenses. Choose which dashboard you want to operate from.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {approvedLicenses.map((license, i) => {
            const config = dashboardConfig[license.type];
            const Icon = config.icon;
            
            return (
              <Card
                key={license.type}
                className="p-6 hover-lift cursor-pointer group relative overflow-hidden transition-all opacity-0 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => handleSelectDashboard(license.type)}
              >
                <Badge className="absolute top-4 right-4 bg-success/10 text-success">
                  Approved
                </Badge>
                
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold mb-2">{config.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {config.description}
                    </p>
                    {license.approvedAt && (
                      <p className="text-xs text-muted-foreground mb-4">
                        Approved: {new Date(license.approvedAt).toLocaleDateString()}
                      </p>
                    )}
                    <Button className="w-full group-hover:shadow-glow">
                      Enter Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Apply for more */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Want to expand your operations?</p>
          <Button variant="link" className="text-primary" onClick={() => navigate("/role-selection")}>
            Apply for additional licenses
          </Button>
        </div>
      </div>
    </div>
  );
}
