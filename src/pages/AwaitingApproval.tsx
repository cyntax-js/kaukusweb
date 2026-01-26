/**
 * Awaiting Approval Page
 *
 * Redesigned page showing KYC submission status.
 * Displays both pending and approved licenses with visual differentiation.
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { platformApi, type KycType, type KycStatusItem } from "@/api/platform";
import {
  Clock,
  CheckCircle2,
  FileSearch,
  Shield,
  ArrowRight,
  RefreshCw,
  LogOut,
  TrendingUp,
  Building2,
  Landmark,
  BarChart3,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const licenseConfig: Record<
  KycType,
  {
    icon: typeof TrendingUp;
    label: string;
    dashboardRoute: string;
    gradient: string;
  }
> = {
  broker: {
    icon: TrendingUp,
    label: "Broker",
    dashboardRoute: "/broker/dashboard",
    gradient: "from-primary to-primary/70",
  },
  dealer: {
    icon: Building2,
    label: "Dealer",
    dashboardRoute: "/dealer/dashboard",
    gradient: "from-chart-2 to-chart-2/70",
  },
  issuer: {
    icon: Landmark,
    label: "Issuing House",
    dashboardRoute: "/issuing-house/dashboard",
    gradient: "from-chart-4 to-chart-4/70",
  },
  market_makers: {
    icon: BarChart3,
    label: "Market Maker",
    dashboardRoute: "/market-maker/dashboard",
    gradient: "from-chart-5 to-chart-5/70",
  },
};

interface LicenseStatus {
  type: KycType;
  status: "pending" | "approved" | "rejected";
  companyName?: string;
}

export default function AwaitingApproval() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const [licenses, setLicenses] = useState<LicenseStatus[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const checkStatus = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await platformApi.broker.getKycStatus();

      if (response.data && response.data.length > 0) {
        const allLicenses: LicenseStatus[] = [];

        response.data.forEach((item: KycStatusItem) => {
          if (item.kyc_types) {
            // Handle case where kyc_types is a single string
            const types = Array.isArray(item.kyc_types)
              ? item.kyc_types
              : [item.kyc_types];
            types.forEach((type) => {
              allLicenses.push({
                type: type as KycType,
                status: item.kyc_status,
                companyName: item.company_name,
              });
            });
          }
        });

        setLicenses(allLicenses);

        // Check if all are approved
        const approvedLicenses = allLicenses.filter(
          (l) => l.status === "approved"
        );
        if (approvedLicenses.length === allLicenses.length && allLicenses.length > 0) {
          // All approved - navigate to dashboard selection if multiple, else direct
          if (approvedLicenses.length === 1) {
            navigate(licenseConfig[approvedLicenses[0].type]?.dashboardRoute || "/");
          } else {
            navigate("/dashboard-selection-kyc");
          }
        }
      }

      setLastRefreshed(new Date());
    } catch (error) {
      console.error("Error checking status:", error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleLogout = () => {
    logout();
  };

  const handleGoToDashboard = (license: LicenseStatus) => {
    navigate(licenseConfig[license.type]?.dashboardRoute || "/");
  };

  const pendingLicenses = licenses.filter((l) => l.status === "pending");
  const approvedLicenses = licenses.filter((l) => l.status === "approved");
  const hasApproved = approvedLicenses.length > 0;
  const hasPending = pendingLicenses.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Checking your application status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in ${
              hasApproved && !hasPending
                ? "bg-success/10"
                : hasPending
                ? "gradient-primary"
                : "bg-muted"
            }`}
          >
            {hasApproved && !hasPending ? (
              <CheckCircle2 className="w-10 h-10 text-success" />
            ) : (
              <Clock className="w-10 h-10 text-primary-foreground animate-pulse" />
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {hasApproved && !hasPending
              ? "All Applications Approved!"
              : hasPending && hasApproved
              ? "Some Applications Under Review"
              : "Application Under Review"}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {hasPending
              ? "Your compliance team is reviewing your applications. This typically takes 12-24 hours."
              : "All your license applications have been approved. You can now access your dashboards."}
          </p>
        </div>

        {/* Approved Licenses Section */}
        {approvedLicenses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <h2 className="font-semibold text-lg">Approved Licenses</h2>
              <Badge className="bg-success/10 text-success border-success/20 ml-2">
                {approvedLicenses.length}
              </Badge>
            </div>
            <div className="grid gap-4">
              {approvedLicenses.map((license, i) => {
                const config = licenseConfig[license.type];
                if (!config) return null;
                const Icon = config.icon;

                return (
                  <Card
                    key={`${license.type}-${i}`}
                    className="p-5 hover-lift cursor-pointer group transition-all border-success/20 bg-success/5"
                    onClick={() => handleGoToDashboard(license)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{config.label} License</h3>
                          <Badge className="bg-success/10 text-success border-0">
                            Approved
                          </Badge>
                        </div>
                        {license.companyName && (
                          <p className="text-sm text-muted-foreground">
                            {license.companyName}
                          </p>
                        )}
                      </div>
                      <Button size="sm" className="group-hover:shadow-glow">
                        Enter Dashboard
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Pending Licenses Section */}
        {pendingLicenses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-warning" />
              <h2 className="font-semibold text-lg">Pending Review</h2>
              <Badge variant="outline" className="border-warning/30 text-warning ml-2">
                {pendingLicenses.length}
              </Badge>
            </div>
            <div className="grid gap-4">
              {pendingLicenses.map((license, i) => {
                const config = licenseConfig[license.type];
                if (!config) return null;
                const Icon = config.icon;

                return (
                  <Card
                    key={`${license.type}-${i}`}
                    className="p-5 border-warning/20 bg-warning/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{config.label} License</h3>
                          <Badge variant="outline" className="border-warning/30 text-warning">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Pending
                          </Badge>
                        </div>
                        {license.companyName && (
                          <p className="text-sm text-muted-foreground">
                            {license.companyName}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Review Progress */}
        {hasPending && (
          <Card className="p-6 mb-8 bg-secondary/30">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileSearch className="w-5 h-5" />
              Review Process
            </h3>
            <div className="space-y-3">
              {[
                { label: "Application Received", done: true },
                { label: "Document Verification", done: true },
                { label: "Compliance Check", active: true },
                { label: "Final Approval", done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      step.done
                        ? "bg-success text-success-foreground"
                        : step.active
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : step.active ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="text-xs font-medium">{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={
                      step.done || step.active
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {step.label}
                  </span>
                  {step.done && (
                    <span className="text-xs text-success ml-auto">Complete</span>
                  )}
                  {step.active && (
                    <span className="text-xs text-primary ml-auto">In Progress</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Refresh Status */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-border mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm">
                We'll notify you via email once your application is approved.
              </p>
              {lastRefreshed && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last checked: {lastRefreshed.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={checkStatus} disabled={isRefreshing}>
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          {approvedLicenses.length > 1 && (
            <Button onClick={() => navigate("/dashboard-selection-kyc")}>
              <Sparkles className="w-4 h-4 mr-2" />
              View All Dashboards
            </Button>
          )}
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
