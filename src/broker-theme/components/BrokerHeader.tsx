/**
 * Trading-style broker header (used in /app runtime and broker preview dashboards)
 * - Dynamic logo/name (from BrokerConfig)
 * - Markets hover dropdown (Stock/Futures/Options/Private Markets)
 * - Search + Deposit + Assets menu + Profile
 */

import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/broker-theme/config";
import { useBrokerAuthStore } from "@/broker-theme/stores";
import { useBrokerPaths } from "@/broker-theme/hooks/useBrokerPaths";
import BrokerLogo from "./BrokerLogo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronDown, Search, User, Wallet, LogOut } from "lucide-react";
import { toast } from "sonner";

interface BrokerHeaderProps {
  className?: string;
  variant?: "transparent" | "solid";
}

const BrokerHeader = ({ className, variant = "solid" }: BrokerHeaderProps) => {
  const { config } = useTheme();
  const { user, isAuthenticated, logout } = useBrokerAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Use centralized path hook instead of inline detection
  const { publicPrefix, appPrefix } = useBrokerPaths();

  const [marketsOpen, setMarketsOpen] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(false);

  const marketOptions = useMemo(
    () =>
      [
        {
          id: "stock",
          label: "Stock",
          href: `${appPrefix}/markets/stock`,
          enabled: config.services.includes("stock"),
        },
        {
          id: "futures",
          label: "Futures",
          href: `${appPrefix}/markets/futures`,
          enabled: config.services.includes("futures"),
        },
        {
          id: "options",
          label: "Options",
          href: `${appPrefix}/markets/options`,
          enabled: config.services.includes("options"),
        },
        {
          id: "private",
          label: "Private Markets",
          href: `${appPrefix}/markets/private`,
          enabled: config.services.includes("private_markets"),
        },
      ].filter((o) => o.enabled),
    [config.services, appPrefix]
  );

  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "U";

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      navigate(`${publicPrefix}/login`);
      return;
    }
    action();
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate(publicPrefix || '/');
  };

  // Home link - use publicPrefix or "/" if empty
  const homeLink = publicPrefix || '/';

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8 min-w-0">
          <Link to={homeLink} className="shrink-0">
            <BrokerLogo size="md" showName />
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {/* Markets dropdown */}
            <DropdownMenu open={marketsOpen} onOpenChange={setMarketsOpen}>
              <div
                onMouseEnter={() => setMarketsOpen(true)}
                onMouseLeave={() => setMarketsOpen(false)}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname.includes("/markets")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Markets
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="z-50 w-44 bg-popover border border-border shadow-md"
                >
                  {marketOptions.map((o) => (
                    <DropdownMenuItem
                      key={o.id}
                      onClick={() => navigate(o.href)}
                      className="cursor-pointer"
                    >
                      {o.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => toast.message("Institutional page coming soon")}
            >
              Institutional <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => toast.message("Learn page coming soon")}
            >
              Learn
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stocks"
              className="h-9 w-56 rounded-md border border-border bg-muted/40 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Assets */}
          <DropdownMenu open={assetsOpen} onOpenChange={setAssetsOpen}>
            <div
              onMouseEnter={() => setAssetsOpen(true)}
              onMouseLeave={() => setAssetsOpen(false)}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 text-sm">
                  Assets <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="z-50 w-44 bg-popover border border-border shadow-md"
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    requireAuth(() => navigate(`${appPrefix}/portfolio`))
                  }
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Portfolio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                {isAuthenticated && user ? (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-50 w-56 bg-popover border border-border shadow-md"
            >
              {isAuthenticated && user ? (
                <>
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate(`${appPrefix}/portfolio`)}
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Portfolio
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate(`${publicPrefix}/login`)}
                  >
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate(`${publicPrefix}/signup`)}
                  >
                    Create account
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default BrokerHeader;
