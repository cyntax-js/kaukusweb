import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, AuthLayout, BrokerAdminLayout, DealerAdminLayout, IssuingHouseAdminLayout, MarketMakerAdminLayout } from "@/components/layout";
import { GuestRoute, ProtectedRoute } from "@/components/AuthWrappers";

// Broker Theme System
import { registerMockBrokers } from "@/broker-theme/config";
import { mockBrokerConfigs } from "@/broker-theme/mocks";
import { PreviewLayout, AppLayout, PublicLayout } from "@/broker-theme/layouts";
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

// Platform Pages
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTP from "./pages/OTP";
import RoleSelection from "./pages/RoleSelection";
import NotFound from "./pages/NotFound";

// Broker Onboarding & Dashboard
import { BrokerRequirements, BrokerApplication, AwaitingApproval } from "./pages/broker";
import {
  BrokerDashboard,
  BrokerUsers,
  BrokerFees,
  BrokerServices,
  BrokerAnalytics,
  BrokerSettings,
  BrokerDeployment,
  ThemeGallery,
} from "./pages/broker/dashboard";

// Dealer Pages
import { DealerRequirements, DealerApplication, DealerAwaitingApproval, DealerDashboard } from "./pages/dealer";

// Issuing House Pages
import { IssuingHouseRequirements, IssuingHouseApplication, IssuingHouseAwaitingApproval, IssuingHouseDashboard } from "./pages/issuing-house";

// Market Maker Pages
import { MarketMakerRequirements, MarketMakerApplication, MarketMakerAwaitingApproval, MarketMakerDashboard } from "./pages/market-maker";

// Register mock brokers for development
registerMockBrokers(mockBrokerConfigs);

const queryClient = new QueryClient();

// Shared broker app routes (markets, trading, portfolio, settings)
const BrokerAppRoutes = () => (
  <>
    <Route path="markets" element={<BrokerMarketsPage />} />
    <Route path="markets/:marketType" element={<BrokerMarketsPage />} />
    <Route path="markets/private/:marketId" element={<BrokerMarketsPage />} />
    <Route path="markets/secondary/:marketId" element={<BrokerMarketsPage />} />
    <Route path="trade/:serviceType/:pair" element={<BrokerTradingPage />} />
    <Route path="portfolio" element={<BrokerPortfolioPage />} />
    <Route path="settings" element={<BrokerSettingsPage />} />
  </>
);

// Shared broker public routes (landing, about, auth)
const BrokerPublicRoutes = () => (
  <Route element={<PublicLayout />}>
    <Route index element={<BrokerLandingPage />} />
    <Route path="about" element={<BrokerAboutPage />} />
    <Route path="legal" element={<BrokerLegalPage />} />
    <Route path="login" element={<BrokerLoginPage />} />
    <Route path="signup" element={<BrokerSignupPage />} />
  </Route>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Platform Public Pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/legal" element={<Legal />} />
          </Route>

          {/* Platform Auth */}
          <Route element={<GuestRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<OTP />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/role-selection" element={<RoleSelection />} />

            {/* Broker Onboarding */}
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
            <Route path="/dealer/requirements" element={<DealerRequirements />} />
            <Route path="/dealer/application" element={<DealerApplication />} />
            <Route path="/dealer/awaiting-approval" element={<DealerAwaitingApproval />} />
            <Route path="/dealer/dashboard" element={<DealerAdminLayout />}>
              <Route index element={<DealerDashboard />} />
            </Route>

            {/* Issuing House */}
            <Route path="/issuing-house/requirements" element={<IssuingHouseRequirements />} />
            <Route path="/issuing-house/application" element={<IssuingHouseApplication />} />
            <Route path="/issuing-house/awaiting-approval" element={<IssuingHouseAwaitingApproval />} />
            <Route path="/issuing-house/dashboard" element={<IssuingHouseAdminLayout />}>
              <Route index element={<IssuingHouseDashboard />} />
            </Route>

            {/* Market Maker */}
            <Route path="/market-maker/requirements" element={<MarketMakerRequirements />} />
            <Route path="/market-maker/application" element={<MarketMakerApplication />} />
            <Route path="/market-maker/awaiting-approval" element={<MarketMakerAwaitingApproval />} />
            <Route path="/market-maker/dashboard" element={<MarketMakerAdminLayout />}>
              <Route index element={<MarketMakerDashboard />} />
            </Route>

            {/* Broker Preview (deployment setup) */}
            <Route path="/preview" element={<PreviewLayout />}>
              {BrokerPublicRoutes()}
              <Route path="app">{BrokerAppRoutes()}</Route>
            </Route>

            {/* Deployed Broker Runtime */}
            <Route path="/app" element={<AppLayout />}>
              {BrokerPublicRoutes()}
              {BrokerAppRoutes()}
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
