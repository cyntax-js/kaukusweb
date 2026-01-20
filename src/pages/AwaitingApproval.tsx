/**
 * Awaiting Approval Page
 * 
 * Shows KYC submission status with refresh functionality.
 * Handles navigation to appropriate dashboard(s) when approved.
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { platformApi, type KycType } from "@/api/platform";
import {
  Clock,
  CheckCircle2,
  FileSearch,
  Shield,
  ArrowRight,
  Mail,
  RefreshCw,
  LogOut,
  TrendingUp,
  Building2,
  Landmark,
  BarChart3,
  Loader2,
} from "lucide-react";

const reviewSteps = [
  { id: "received", label: "Application Received", icon: FileSearch },
  { id: "documents", label: "Document Verification", icon: Shield },
  { id: "compliance", label: "Compliance Check", icon: Shield },
  { id: "approval", label: "Approval", icon: CheckCircle2 },
];

const licenseConfig: Record<KycType, {
  icon: typeof TrendingUp;
  label: string;
  dashboardRoute: string;
  gradient: string;
}> = {
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

interface KycStatusData {
  status: "pending" | "approved" | "rejected";
  approvedKycTypes?: KycType[];
  companyName?: string;
}

export default function AwaitingApproval() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const [statusData, setStatusData] = useState<KycStatusData>({ status: "pending" });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const checkStatus = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await platformApi.broker.getKycStatus();
      
      if (response.data && response.data.length > 0) {
        const item = response.data[0];
        const status = item.kyc_status;
        
        setStatusData({
          status,
          approvedKycTypes: item.kyc_types,
          companyName: item.company_name,
        });

        // If approved, handle navigation
        if (status === "approved" && item.kyc_types && item.kyc_types.length > 0) {
          if (item.kyc_types.length === 1) {
            // Single license - go directly to dashboard
            const license = item.kyc_types[0];
            navigate(licenseConfig[license]?.dashboardRoute || "/");
          }
          // Multiple licenses - show selection (handled in render)
        }
      }
      
      setLastRefreshed(new Date());
    } catch (error) {
      console.error("Error checking status:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleLogout = () => {
    logout();
  };

  const handleSelectDashboard = (license: KycType) => {
    navigate(licenseConfig[license]?.dashboardRoute || "/");
  };

  const isApproved = statusData.status === "approved";
  const hasMultipleLicenses = isApproved && statusData.approvedKycTypes && statusData.approvedKycTypes.length > 1;

  // Show dashboard selection for multiple approved licenses
  if (hasMultipleLicenses && statusData.approvedKycTypes) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Multiple Licenses Approved
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Congratulations!
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your applications have been approved. Select which dashboard you want to access.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {statusData.approvedKycTypes.map((license, i) => {
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
                      <h2 className="text-xl font-bold mb-2">{config.label} Dashboard</h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        Access your {config.label.toLowerCase()} operations and management tools
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

          {/* Logout */}
          <div className="text-center">
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            {isApproved ? (
              <>
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Application Approved!
                </h1>
                <p className="text-muted-foreground">
                  Congratulations! Your license application has been approved.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-primary-foreground animate-pulse" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Application Under Review
                </h1>
                <p className="text-muted-foreground">
                  Your application is being reviewed by our compliance team. This typically takes 12-24 hours.
                </p>
              </>
            )}
          </div>

          {/* Company Info */}
          {statusData.companyName && (
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-sm">
                {statusData.companyName}
              </Badge>
            </div>
          )}

          {/* Review Steps */}
          <div className="space-y-4 mb-8">
            {reviewSteps.map((step, index) => {
              const isCompleted = isApproved || index < 2; // Show first 2 as complete when pending
              const isActive = !isApproved && index === 2;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all border ${
                    isCompleted
                      ? "bg-success/10 border-success/20"
                      : isActive
                        ? "bg-primary/10 border-primary/20"
                        : "bg-secondary/50 border-border"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-success text-success-foreground"
                        : isActive
                          ? "gradient-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isActive ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`font-medium ${isCompleted || isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                    {isCompleted && (
                      <p className="text-xs text-success">Completed</p>
                    )}
                    {isActive && (
                      <p className="text-xs text-primary">In progress...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Refresh Status */}
          {!isApproved && (
            <div className="flex items-center justify-between p-4 rounded-lg border border-border mb-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    We'll notify you once your application is approved.
                  </p>
                  {lastRefreshed && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Last checked: {lastRefreshed.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={checkStatus}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span className="ml-2">Refresh</span>
              </Button>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3">
            {isApproved && statusData.approvedKycTypes && statusData.approvedKycTypes.length === 1 ? (
              <Button
                className="w-full shadow-glow"
                size="lg"
                onClick={() => handleSelectDashboard(statusData.approvedKycTypes![0])}
              >
                Go to {licenseConfig[statusData.approvedKycTypes[0]]?.label} Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : !isApproved ? (
              <Button
                className="w-full"
                size="lg"
                variant="secondary"
                onClick={() => navigate("/")}
              >
                Go to Home
              </Button>
            ) : null}

            <Button
              variant="ghost"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
