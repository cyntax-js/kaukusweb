import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, AuthLayout, BrokerAdminLayout } from "@/components/layout";

// Broker Theme System - All broker theming lives in broker-theme/
import { registerMockBrokers } from "@/broker-theme/config";
import { mockBrokerConfigs } from "@/broker-theme/mocks";

// Platform Pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import NotFound from "./pages/NotFound";

// Broker Onboarding
import { BrokerRequirements, BrokerApplication, AwaitingApproval } from "./pages/broker";

// Broker Dashboard
import { 
  BrokerDashboard, 
  BrokerUsers, 
  BrokerFees, 
  BrokerServices,
  BrokerAnalytics, 
  BrokerSettings,
  BrokerDeployment,
  ThemeGallery
} from "./pages/broker/dashboard";

// Dealer Pages
import { DealerApplication, DealerAwaitingApproval } from "./pages/dealer";

// Broker Theme Pages (runtime pages for deployed broker themes)
import {
  LandingPage as BrokerLandingPage,
  LoginPage as BrokerLoginPage,
  SignupPage as BrokerSignupPage,
  TradingPage as BrokerTradingPage,
  MarketsPage as BrokerMarketsPage,
  PortfolioPage as BrokerPortfolioPage,
  SettingsPage as BrokerSettingsPage,
  AboutPage as BrokerAboutPage,
  LegalPage as BrokerLegalPage,
} from "@/broker-theme/pages";
import { PreviewLayout, AppLayout, PublicLayout, AppRoutesLayout } from "@/broker-theme/layouts";

// Register mock brokers for development
registerMockBrokers(mockBrokerConfigs);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/legal" element={<Legal />} />
          </Route>

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Role selection */}
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* Broker onboarding */}
          <Route path="/broker/requirements" element={<BrokerRequirements />} />
          <Route path="/broker/application" element={<BrokerApplication />} />
          <Route path="/broker/awaiting-approval" element={<AwaitingApproval />} />

          {/* Broker Dashboard */}
          <Route path="/broker/dashboard" element={<BrokerAdminLayout />}>
            <Route index element={<BrokerDashboard />} />
            <Route path="users" element={<BrokerUsers />} />
            <Route path="fees" element={<BrokerFees />} />
            <Route path="services" element={<BrokerServices />} />
            <Route path="analytics" element={<BrokerAnalytics />} />
            <Route path="settings" element={<BrokerSettings />} />
            <Route path="deploy" element={<BrokerDeployment />} />
            <Route path="themes" element={<ThemeGallery />} />
          </Route>

          {/* Dealer */}
          <Route path="/dealer/application" element={<DealerApplication />} />
          <Route path="/dealer/awaiting-approval" element={<DealerAwaitingApproval />} />

          {/* Config-driven Broker Preview (during deployment setup) */}
          <Route path="/preview" element={<PreviewLayout />}>
            {/* Public pages - use LandingHeader */}
            <Route element={<PublicLayout />}>
              <Route index element={<BrokerLandingPage />} />
              <Route path="about" element={<BrokerAboutPage />} />
              <Route path="legal" element={<BrokerLegalPage />} />
              <Route path="login" element={<BrokerLoginPage />} />
              <Route path="signup" element={<BrokerSignupPage />} />
            </Route>
            
            {/* App pages - use AppHeader (trading, markets, portfolio) */}
            <Route path="app" element={<AppRoutesLayout />}>
              <Route path="markets" element={<BrokerMarketsPage />} />
              <Route path="markets/:marketType" element={<BrokerMarketsPage />} />
              <Route path=":serviceType/trade/:marketType/:pair" element={<BrokerTradingPage />} />
              <Route path="portfolio" element={<BrokerPortfolioPage />} />
              <Route path="settings" element={<BrokerSettingsPage />} />
            </Route>
          </Route>

          {/* Deployed Broker Runtime (production) */}
          <Route path="/app" element={<AppLayout />}>
            {/* Public pages - use LandingHeader */}
            <Route element={<PublicLayout />}>
              <Route index element={<BrokerLandingPage />} />
              <Route path="about" element={<BrokerAboutPage />} />
              <Route path="legal" element={<BrokerLegalPage />} />
              <Route path="login" element={<BrokerLoginPage />} />
              <Route path="signup" element={<BrokerSignupPage />} />
            </Route>
            
            {/* Trading pages - use AppHeader */}
            <Route element={<AppRoutesLayout />}>
              <Route path="markets" element={<BrokerMarketsPage />} />
              <Route path="markets/:marketType" element={<BrokerMarketsPage />} />
              <Route path=":serviceType/trade/:marketType/:pair" element={<BrokerTradingPage />} />
              <Route path="portfolio" element={<BrokerPortfolioPage />} />
              <Route path="settings" element={<BrokerSettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;