/**
 * Dashboard Layout - Sidebar or top navigation based on config
 * Includes Markets dropdown and Portfolio
 * Removed: Trading (navigate via market click), Settings
 */

import { type ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/broker-theme/config';
import { useBrokerAuthStore } from '@/broker-theme/stores';
import { cn } from '@/lib/utils';
import { Wallet, Menu, X, BarChart3, LogOut, User, ChevronDown, TrendingUp, Layers, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { AppHeader } from '@/broker-theme/components';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { config } = useTheme();
  const { user, isAuthenticated, logout } = useBrokerAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const variant = config.theme.layout.dashboard;

  // Determine route prefix
  const routePrefix = location.pathname.startsWith('/app') ? '/app' : '/preview';

  // Build market options based on enabled services
  const marketOptions = [
    { id: 'spot', label: 'Spot Markets', icon: <TrendingUp className="h-4 w-4" />, enabled: config.services.includes('spot') },
    { id: 'futures', label: 'Futures', icon: <BarChart3 className="h-4 w-4" />, enabled: config.services.includes('futures') },
    { id: 'options', label: 'Options', icon: <Layers className="h-4 w-4" />, enabled: config.services.includes('options') },
  ].filter((opt) => opt.enabled);

  const hasPrivateMarkets = config.services.includes('private_markets');

  const isActive = (href: string) => location.pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate(routePrefix);
  };

  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : 'U';

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{userInitials}</AvatarFallback>
          </Avatar>
          {isAuthenticated && user && (
            <span className="hidden md:block text-sm font-medium">{user.firstName}</span>
          )}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover">
        {isAuthenticated && user && (
          <>
            <div className="px-2 py-2">
              <p className="text-sm font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={() => navigate(`${routePrefix}/portfolio`)} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          My Portfolio
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Markets Dropdown Component
  const MarketsDropdown = ({ isSidebar = false }: { isSidebar?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-2 transition-colors w-full',
            isSidebar ? 'px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted' : 'px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted',
            isActive(`${routePrefix}/markets`)
              ? isSidebar
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <BarChart3 className="h-5 w-5" />
          <span className="flex-1 text-left">Markets</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-popover">
        {marketOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => navigate(`${routePrefix}/markets/${option.id}`)}
            className="cursor-pointer"
          >
            {option.icon}
            <span className="ml-2">{option.label}</span>
          </DropdownMenuItem>
        ))}
        {hasPrivateMarkets && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`${routePrefix}/markets/private`)} className="cursor-pointer">
              <Lock className="h-4 w-4" />
              <span className="ml-2">Private Markets</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (variant === 'sidebar') {
    return (
      <div className="min-h-screen flex bg-background">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
              <Link to={routePrefix} className="text-lg font-bold text-foreground">
                {config.brokerName || 'Trading'}
              </Link>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <MarketsDropdown isSidebar />

              {config.pages.portfolio && (
                <Link
                  to={`${routePrefix}/portfolio`}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(`${routePrefix}/portfolio`)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Wallet className="h-5 w-5" />
                  Portfolio
                </Link>
              )}
            </nav>
            <div className="p-4 border-t border-border">
              <UserMenu />
            </div>
          </div>
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between gap-4 px-4 border-b border-border">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <span className="font-semibold lg:hidden">{config.brokerName || 'Trading'}</span>
            </div>
            <div className="hidden lg:block">
              <UserMenu />
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    );
  }

  // Top nav (deployed broker UI) uses the shared trading header
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 px-6 py-6">{children}</main>
    </div>
  );
};
