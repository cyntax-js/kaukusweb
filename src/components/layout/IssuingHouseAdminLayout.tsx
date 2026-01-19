import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
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
  Briefcase,
  BarChart3,
  Settings,
  LogOut,
  Landmark,
  PlusCircle,
} from "lucide-react";

const sidebarItems = [
  { title: "Overview", url: "/issuing-house/dashboard", icon: LayoutDashboard, end: true },
  { title: "Offer Management", url: "/issuing-house/dashboard/offers", icon: Briefcase },
  { title: "Subscriptions", url: "/issuing-house/dashboard/subscriptions", icon: Users },
  { title: "Allocation", url: "/issuing-house/dashboard/allocation", icon: PlusCircle },
  { title: "Regulatory Filings", url: "/issuing-house/dashboard/filings", icon: BarChart3 },
  { title: "Post-Listing", url: "/issuing-house/dashboard/post-listing", icon: Landmark },
  { title: "Reports", url: "/issuing-house/dashboard/reports", icon: BarChart3 },
  { title: "Settings", url: "/issuing-house/dashboard/settings", icon: Settings },
];

function IssuingHouseSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <NavLink to="/issuing-house/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-chart-4 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-sidebar-foreground">ContiSX</span>
            <span className="text-xs block text-sidebar-foreground/60">
              Issuing House
            </span>
          </div>
        </NavLink>
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
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
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
          <NavLink to="/">
            <LogOut className="w-4 h-4 mr-2" />
            Exit Admin
          </NavLink>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function IssuingHouseAdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <IssuingHouseSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-chart-4" />
                <span className="text-sm font-medium">Issuing House Administration</span>
              </div>
            </div>
            <DashboardSwitcher currentDashboard="issuing_house" />
          </header>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
