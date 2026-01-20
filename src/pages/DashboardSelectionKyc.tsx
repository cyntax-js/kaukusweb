/**
 * Dashboard Selection Page for KYC-Approved Users
 * 
 * Shows approved licenses and allows selecting which dashboard to enter.
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { platformApi, type KycType } from "@/api/platform";
import {
  CheckCircle2,
  ArrowRight,
  LogOut,
  TrendingUp,
  Building2,
  Landmark,
  BarChart3,
  Loader2,
  RefreshCw,
} from "lucide-react";

const licenseConfig: Record<KycType, {
  icon: typeof TrendingUp;
  label: string;
  dashboardRoute: string;
  gradient: string;
  description: string;
}> = {
  broker: {
    icon: TrendingUp,
    label: "Broker",
    dashboardRoute: "/broker/dashboard",
    gradient: "from-primary to-primary/70",
    description: "Manage your white-label trading platform and users",
  },
  dealer: {
    icon: Building2,
    label: "Dealer",
    dashboardRoute: "/dealer/dashboard",
    gradient: "from-chart-2 to-chart-2/70",
    description: "Access OTC trading, inventory, and settlement tools",
  },
  issuer: {
    icon: Landmark,
    label: "Issuing House",
    dashboardRoute: "/issuing-house/dashboard",
    gradient: "from-chart-4 to-chart-4/70",
    description: "Manage offerings, subscriptions, and regulatory filings",
  },
  market_makers: {
    icon: BarChart3,
    label: "Market Maker",
    dashboardRoute: "/market-maker/dashboard",
    gradient: "from-chart-5 to-chart-5/70",
    description: "Control quoting engine, inventory, and market depth",
  },
};

export default function DashboardSelectionKyc() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  
  const [approvedLicenses, setApprovedLicenses] = useState<KycType[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await platformApi.broker.getKycStatus();
      
      if (response.data && response.data.length > 0) {
        const item = response.data[0];
        
        if (item.kyc_status === "approved" && item.kyc_types) {
          setApprovedLicenses(item.kyc_types);
          setCompanyName(item.company_name || "");
          
          // If only one license, redirect directly
          if (item.kyc_types.length === 1) {
            const license = item.kyc_types[0];
            navigate(licenseConfig[license]?.dashboardRoute || "/");
            return;
          }
        } else if (item.kyc_status === "pending") {
          navigate("/awaiting-approval");
          return;
        } else {
          navigate("/role-selection");
          return;
        }
      } else {
        navigate("/role-selection");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      navigate("/role-selection");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleSelectDashboard = (license: KycType) => {
    navigate(licenseConfig[license]?.dashboardRoute || "/");
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your dashboards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          
          {companyName && (
            <Badge variant="secondary" className="mb-4">
              {companyName}
            </Badge>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Select Your Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You have {approvedLicenses.length} approved licenses. Select which dashboard you want to access.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {approvedLicenses.map((license, i) => {
            const config = licenseConfig[license];
            if (!config) return null;
            const Icon = config.icon;

            return (
              <Card
                key={license}
                className="p-6 hover-lift cursor-pointer group relative overflow-hidden transition-all opacity-0 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => handleSelectDashboard(license)}
              >
                <Badge className="absolute top-4 right-4 bg-success/10 text-success border-success/20">
                  Approved
                </Badge>

                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold mb-2">{config.label} Dashboard</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {config.description}
                    </p>
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

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={checkStatus}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
