/**
 * Dashboard Selection Page for KYC-Approved Users
 *
 * Shows approved licenses from broker_platforms in auth store,
 * plus fetches from KYC API to get the latest status.
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { platformApi, type KycType, type KycStatusItem } from "@/api/platform";
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
  Clock,
  Plus,
} from "lucide-react";

const licenseConfig: Record<
  string,
  {
    icon: typeof TrendingUp;
    label: string;
    dashboardRoute: string;
    gradient: string;
    description: string;
  }
> = {
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

interface DashboardLicense {
  type: string;
  status: "approved" | "pending";
  companyName?: string;
}

export default function DashboardSelectionKyc() {
  const navigate = useNavigate();
  const { logout, user, getBrokerPlatforms } = useAuthStore();

  const [licenses, setLicenses] = useState<DashboardLicense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLicenses = useCallback(async () => {
    setIsLoading(true);

    // Start with broker_platforms from user object
    const brokerPlatforms = getBrokerPlatforms();
    const platformLicenses: DashboardLicense[] = brokerPlatforms.map((bp) => ({
      type: bp.platform,
      status: "approved" as const,
    }));

    // Also fetch from KYC API to get pending ones
    try {
      const response = await platformApi.broker.getKycStatus();

      if (response.data && response.data.length > 0) {
        response.data.forEach((item: KycStatusItem) => {
          if (item.kyc_types) {
            const types = Array.isArray(item.kyc_types)
              ? item.kyc_types
              : [item.kyc_types];
            types.forEach((type) => {
              // Check if this type already exists from broker_platforms
              const existingIndex = platformLicenses.findIndex(
                (l) => l.type === type
              );
              if (existingIndex === -1) {
                // Add if not exists
                platformLicenses.push({
                  type: type as string,
                  status: item.kyc_status === "approved" ? "approved" : "pending",
                  companyName: item.company_name,
                });
              } else if (item.kyc_status === "pending") {
                // Update status if pending (pending takes precedence for display)
                platformLicenses[existingIndex].status = "pending";
                platformLicenses[existingIndex].companyName = item.company_name;
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching KYC status:", error);
    }

    setLicenses(platformLicenses);
    setIsLoading(false);

    // If only one approved license and no pending, redirect directly
    const approvedOnly = platformLicenses.filter((l) => l.status === "approved");
    const hasPending = platformLicenses.some((l) => l.status === "pending");
    if (approvedOnly.length === 1 && !hasPending) {
      const config = licenseConfig[approvedOnly[0].type];
      if (config) {
        navigate(config.dashboardRoute);
      }
    }
  }, [getBrokerPlatforms, navigate]);

  useEffect(() => {
    loadLicenses();
  }, [loadLicenses]);

  const handleSelectDashboard = (license: DashboardLicense) => {
    if (license.status !== "approved") return;
    const config = licenseConfig[license.type];
    if (config) {
      navigate(config.dashboardRoute);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const approvedLicenses = licenses.filter((l) => l.status === "approved");
  const pendingLicenses = licenses.filter((l) => l.status === "pending");

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

          {user?.name && (
            <p className="text-muted-foreground mb-2">Welcome back, {user.name}</p>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Select Your Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You have {approvedLicenses.length} approved license
            {approvedLicenses.length !== 1 ? "s" : ""}
            {pendingLicenses.length > 0 &&
              ` and ${pendingLicenses.length} pending`}
            . Select which dashboard you want to access.
          </p>
        </div>

        {/* Pending Licenses Banner */}
        {pendingLicenses.length > 0 && (
          <Card className="p-4 mb-6 border-warning/30 bg-warning/5">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-warning" />
              <div className="flex-1">
                <p className="font-medium">
                  {pendingLicenses.length} License
                  {pendingLicenses.length !== 1 ? "s" : ""} Pending Review
                </p>
                <p className="text-sm text-muted-foreground">
                  {pendingLicenses.map((l) => licenseConfig[l.type]?.label || l.type).join(", ")}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/awaiting-approval")}>
                View Status
              </Button>
            </div>
          </Card>
        )}

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {approvedLicenses.map((license, i) => {
            const config = licenseConfig[license.type];
            if (!config) return null;
            const Icon = config.icon;

            return (
              <Card
                key={license.type}
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
                    <h2 className="text-xl font-bold mb-2">
                      {config.label} Dashboard
                    </h2>
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

        {/* Add More Licenses */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/role-selection")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Apply for More Licenses
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={loadLicenses}>
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
