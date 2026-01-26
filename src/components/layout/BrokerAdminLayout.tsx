import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useBrokerDeploymentStore } from "@/stores/brokerDeploymentStore";
import { DashboardSwitcher } from "@/components/DashboardSwitcher";
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
  Users,
  Coins,
  Layers,
  BarChart3,
  Settings,
  TrendingUp,
  LogOut,
  Rocket,
  ExternalLink,
  Palette,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/broker/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/broker/dashboard/users", icon: Users },
  { title: "Fees", url: "/broker/dashboard/fees", icon: Coins },
  { title: "Services", url: "/broker/dashboard/services", icon: Layers },
  { title: "Analytics", url: "/broker/dashboard/analytics", icon: BarChart3 },
  { title: "Theme Gallery", url: "/broker/dashboard/themes", icon: Palette },
  { title: "Settings", url: "/broker/dashboard/settings", icon: Settings },
];

function BrokerSidebar() {
  const location = useLocation();
  const { isDeployed, config } = useBrokerDeploymentStore();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/broker/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-sidebar-foreground">ContiSX</span>
            <span className="text-xs block text-sidebar-foreground/60">
              Broker Admin
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
        {isDeployed && config.subdomain && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider px-3">
              Your Platform
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-3 py-2">
              <div className="p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-sidebar-foreground/60">
                    Live
                  </span>
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                </div>
                <a
                  href={`https://${config.subdomain}.ContiSX.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sidebar-primary hover:underline flex items-center gap-1"
                >
                  {config.subdomain}.ContiSX.com
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
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

export default function BrokerAdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <BrokerSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-chart-2" />
                <span className="text-sm font-medium">
                  Broker Administration
                </span>
              </div>
            </div>
            <DashboardSwitcher currentDashboard="broker" />
          </header>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
