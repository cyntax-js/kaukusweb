/**
 * App header for logged-in broker platform experience
 * Shows: Logo, Markets dropdown (click to open), Portfolio, Private Market
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
import {
  ChevronDown,
  Search,
  User,
  Wallet,
  LogOut,
  Repeat,
} from "lucide-react";
import { toast } from "sonner";
import BrokerLanguageSwitcher from "./BrokerLanguageSwitcher";

interface AppHeaderProps {
  className?: string;
}

const AppHeader = ({ className }: AppHeaderProps) => {
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
          label: "Futures / Derivatives",
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
          label: "Private Market",
          href: `${appPrefix}/markets/private`,
          enabled: config.services.includes("private_markets"),
        },
        {
          id: "secondary",
          label: "Secondary Market",
          href: `${appPrefix}/markets/secondary`,
          enabled: null,
        },
      ].filter((o) => o.enabled),
    [config.services, appPrefix]
  );

  const hasPrivateMarkets = config.services.includes("private_markets");
  const onlyPrivateMarket =
    Array.isArray(config.services) &&
    new Set(config.services).size === 1 &&
    config.services.includes("private_markets");

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
            {/* Markets dropdown - onClick */}
            {!onlyPrivateMarket && (
              <DropdownMenu open={marketsOpen} onOpenChange={setMarketsOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={() => setMarketsOpen(!marketsOpen)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname.includes("/markets")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Markets
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        marketsOpen && "rotate-180"
                      )}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="z-50 w-48 bg-popover border border-border shadow-md"
                >
                  {marketOptions.map((o) => (
                    <DropdownMenuItem
                      key={o.id}
                      onClick={() => {
                        navigate(o.href);
                        setMarketsOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {o.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Private Market link */}
            {hasPrivateMarkets && (
              <Link
                to={`${appPrefix}/markets/private`}
                className={cn(
                  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname.includes("/markets/private")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Private Market
              </Link>
            )}
            {hasPrivateMarkets && (
              <Link
                to={`${appPrefix}/markets/secondary`}
                className={cn(
                  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname.includes("/markets/secondary")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Secondary Market
              </Link>
            )}

            {/* OTC DESK link */}
            <Link
              to={`${appPrefix}/otc-desk`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname.includes("/otc-desk")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Repeat className="h-4 w-4" />
              OTC DESK
            </Link>

            {/* Portfolio link */}
            <Link
              to={`${appPrefix}/portfolio`}
              className={cn(
                "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname.includes("/portfolio")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Portfolio
            </Link>
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

          {/* Language Switcher */}
          <BrokerLanguageSwitcher />

          {/* Assets */}
          <DropdownMenu open={assetsOpen} onOpenChange={setAssetsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 text-sm"
                onClick={() => setAssetsOpen(!assetsOpen)}
              >
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

export default AppHeader;
