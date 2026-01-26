/**
 * Dashboard Switcher Component
 *
 * Allows users with multiple approved licenses to switch between dashboards.
 * Uses broker_platforms from the auth store to determine available dashboards.
 */

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import {
  Building2,
  Landmark,
  BarChart3,
  ChevronDown,
  CheckCircle2,
  ArrowLeftRight,
  TrendingUp,
} from "lucide-react";

type PlatformType = "broker" | "dealer" | "issuer" | "market_makers";

const dashboardConfig: Record<
  PlatformType,
  {
    icon: typeof Building2;
    title: string;
    shortTitle: string;
    route: string;
    color: string;
  }
> = {
  broker: {
    icon: TrendingUp,
    title: "Broker Dashboard",
    shortTitle: "Broker",
    route: "/broker/dashboard",
    color: "text-primary",
  },
  dealer: {
    icon: Building2,
    title: "Dealer Dashboard",
    shortTitle: "Dealer",
    route: "/dealer/dashboard",
    color: "text-chart-2",
  },
  issuer: {
    icon: Landmark,
    title: "Issuing House Dashboard",
    shortTitle: "Issuing House",
    route: "/issuing-house/dashboard",
    color: "text-chart-4",
  },
  market_makers: {
    icon: BarChart3,
    title: "Market Maker Dashboard",
    shortTitle: "Market Maker",
    route: "/market-maker/dashboard",
    color: "text-chart-5",
  },
};

interface DashboardSwitcherProps {
  currentDashboard: PlatformType;
}

export function DashboardSwitcher({ currentDashboard }: DashboardSwitcherProps) {
  const navigate = useNavigate();
  const { getBrokerPlatforms } = useAuthStore();

  const brokerPlatforms = getBrokerPlatforms();

  // Only show switcher if user has multiple platforms
  if (!brokerPlatforms || brokerPlatforms.length <= 1) {
    return null;
  }

  const currentConfig = dashboardConfig[currentDashboard];

  const handleSwitch = (platform: PlatformType) => {
    navigate(dashboardConfig[platform].route);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-8">
          <ArrowLeftRight className="w-4 h-4" />
          <span className="hidden sm:inline">Switch Dashboard</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {brokerPlatforms.map((bp) => {
          const platform = bp.platform as PlatformType;
          const config = dashboardConfig[platform];
          if (!config) return null;

          const Icon = config.icon;
          const isCurrent = platform === currentDashboard;

          return (
            <DropdownMenuItem
              key={bp.id}
              onClick={() => !isCurrent && handleSwitch(platform)}
              className={`gap-3 cursor-pointer ${isCurrent ? "bg-accent" : ""}`}
            >
              <Icon className={`w-4 h-4 ${config.color}`} />
              <span className="flex-1">{config.shortTitle}</span>
              {isCurrent && <CheckCircle2 className="w-4 h-4 text-success" />}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate("/dashboard-selection-kyc")}
          className="gap-3 cursor-pointer text-muted-foreground"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>View All Dashboards</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
