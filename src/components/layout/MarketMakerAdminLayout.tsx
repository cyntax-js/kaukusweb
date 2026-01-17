import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Activity,
  TrendingUp,
  Shield,
  BarChart3,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/market-maker/dashboard", icon: LayoutDashboard },
  { title: "Quoting Engine", url: "/market-maker/dashboard/quoting", icon: Zap },
  { title: "Market Pairs", url: "/market-maker/dashboard/pairs", icon: TrendingUp },
  { title: "Performance", url: "/market-maker/dashboard/performance", icon: Activity },
  { title: "Risk Management", url: "/market-maker/dashboard/risk", icon: Shield },
  { title: "Analytics", url: "/market-maker/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/market-maker/dashboard/settings", icon: Settings },
];

function MarketMakerSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/market-maker/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-chart-5 flex items-center justify-center shadow-glow">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-sidebar-foreground">ContiSX</span>
            <span className="text-xs block text-sidebar-foreground/60">
              Market Maker
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider px-3">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        location.pathname === item.url
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/70"
          asChild
        >
          <Link to="/">
            <LogOut className="w-4 h-4 mr-2" />
            Exit Admin
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function MarketMakerAdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MarketMakerSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4 bg-card">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-chart-5" />
              <span className="text-sm font-medium">Market Maker Administration</span>
            </div>
          </header>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
