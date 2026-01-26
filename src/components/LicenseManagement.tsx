/**
 * License Management Component
 *
 * Displays user's licenses and allows adding more.
 * Used in settings pages across all dashboards.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import {
  TrendingUp,
  Building2,
  Landmark,
  BarChart3,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
} from "lucide-react";

const licenseConfig: Record<
  string,
  {
    icon: typeof TrendingUp;
    label: string;
    description: string;
    gradient: string;
    dashboardRoute: string;
  }
> = {
  broker: {
    icon: TrendingUp,
    label: "Broker",
    description: "White-label trading platforms",
    gradient: "from-primary to-primary/70",
    dashboardRoute: "/broker/dashboard",
  },
  dealer: {
    icon: Building2,
    label: "Dealer",
    description: "OTC trading & settlement",
    gradient: "from-chart-2 to-chart-2/70",
    dashboardRoute: "/dealer/dashboard",
  },
  issuer: {
    icon: Landmark,
    label: "Issuing House",
    description: "Securities issuance",
    gradient: "from-chart-4 to-chart-4/70",
    dashboardRoute: "/issuing-house/dashboard",
  },
  market_makers: {
    icon: BarChart3,
    label: "Market Maker",
    description: "Liquidity provision",
    gradient: "from-chart-5 to-chart-5/70",
    dashboardRoute: "/market-maker/dashboard",
  },
};

export function LicenseManagement() {
  const navigate = useNavigate();
  const { getBrokerPlatforms, user } = useAuthStore();
  const brokerPlatforms = getBrokerPlatforms();

  // Get all license types the user already has
  const existingLicenses = brokerPlatforms.map((bp) => bp.platform);

  const handleAddMoreLicenses = () => {
    // Navigate to role selection - the page will handle disabling existing licenses
    navigate("/role-selection", {
      state: { existingLicenses },
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold">Your Licenses</h2>
          <p className="text-sm text-muted-foreground">
            Manage your platform licenses
          </p>
        </div>
      </div>

      {/* License List */}
      <div className="space-y-3 mb-6">
        {brokerPlatforms.length > 0 ? (
          brokerPlatforms.map((bp) => {
            const config = licenseConfig[bp.platform];
            if (!config) return null;
            const Icon = config.icon;

            return (
              <div
                key={bp.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{config.label} License</span>
                    <Badge className="bg-success/10 text-success border-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    License: {bp.broker_num}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(config.dashboardRoute)}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No active licenses</p>
          </div>
        )}
      </div>

      {/* Add More Licenses */}
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={handleAddMoreLicenses}
      >
        <Plus className="w-4 h-4" />
        Add More Licenses
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Apply for additional licenses to expand your operations
      </p>
    </Card>
  );
}
