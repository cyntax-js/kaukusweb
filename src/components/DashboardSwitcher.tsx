/**
 * Dashboard Switcher Component
 * 
 * Allows users with multiple approved licenses to switch between dashboards.
 * Shown in all admin layout headers (except broker).
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
import { useLicenseStore, type LicenseType } from "@/stores/licenseStore";
import { 
  Building2, 
  Landmark, 
  BarChart3, 
  ChevronDown,
  CheckCircle2,
  ArrowLeftRight,
} from "lucide-react";

const dashboardConfig: Record<Exclude<LicenseType, 'broker'>, {
  icon: typeof Building2;
  title: string;
  shortTitle: string;
  route: string;
  color: string;
}> = {
  dealer: {
    icon: Building2,
    title: "Dealer Dashboard",
    shortTitle: "Dealer",
    route: "/dealer/dashboard",
    color: "text-chart-2",
  },
  issuing_house: {
    icon: Landmark,
    title: "Issuing House Dashboard",
    shortTitle: "Issuing House",
    route: "/issuing-house/dashboard",
    color: "text-chart-4",
  },
  market_maker: {
    icon: BarChart3,
    title: "Market Maker Dashboard",
    shortTitle: "Market Maker",
    route: "/market-maker/dashboard",
    color: "text-chart-5",
  },
};

interface DashboardSwitcherProps {
  currentDashboard: Exclude<LicenseType, 'broker'>;
}

export function DashboardSwitcher({ currentDashboard }: DashboardSwitcherProps) {
  const navigate = useNavigate();
  const { getApprovedLicenses, setActiveDashboard } = useLicenseStore();

  const approvedLicenses = getApprovedLicenses().filter(
    (l) => l.type !== 'broker'
  );

  // Only show switcher if user has multiple approved non-broker licenses
  if (approvedLicenses.length <= 1) {
    return null;
  }

  const currentConfig = dashboardConfig[currentDashboard];
  const CurrentIcon = currentConfig.icon;

  const handleSwitch = (type: Exclude<LicenseType, 'broker'>) => {
    setActiveDashboard(type);
    navigate(dashboardConfig[type].route);
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
        {approvedLicenses.map((license) => {
          if (license.type === 'broker') return null;
          const config = dashboardConfig[license.type as Exclude<LicenseType, 'broker'>];
          const Icon = config.icon;
          const isCurrent = license.type === currentDashboard;

          return (
            <DropdownMenuItem
              key={license.type}
              onClick={() => !isCurrent && handleSwitch(license.type as Exclude<LicenseType, 'broker'>)}
              className={`gap-3 cursor-pointer ${isCurrent ? 'bg-accent' : ''}`}
            >
              <Icon className={`w-4 h-4 ${config.color}`} />
              <span className="flex-1">{config.shortTitle}</span>
              {isCurrent && <CheckCircle2 className="w-4 h-4 text-success" />}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate("/dashboard-selection")}
          className="gap-3 cursor-pointer text-muted-foreground"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>View All Dashboards</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
