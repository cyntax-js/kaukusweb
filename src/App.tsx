import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  MainLayout,
  AuthLayout,
  BrokerAdminLayout,
  DealerAdminLayout,
  IssuingHouseAdminLayout,
  MarketMakerAdminLayout,
} from "@/components/layout";
import { GuestRoute, ProtectedRoute } from "@/components/AuthWrappers";

// Bootstrap system for tenant detection
import { getBrokerBasePath, isInBrokerMode } from "@/bootstrap";

// Broker Theme System
import { registerMockBrokers } from "@/broker-theme/config";
import { mockBrokerConfigs } from "@/broker-theme/mocks";
import { PreviewLayout, AppLayout, PublicLayout } from "@/broker-theme/layouts";
import { BrokerAppLayout } from "@/broker-theme/layouts/BrokerAppLayout";
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
  OTCDexPage as BrokerOTCDexPage,
  OTCDexDetailPage as BrokerOTCDexDetailPage,
  BrokerNotFound,
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
import OnboardingPage from "./pages/OnboardingPage";
import AwaitingApprovalPage from "./pages/AwaitingApproval";
import DashboardSelectionKyc from "./pages/DashboardSelectionKyc";

// Broker Onboarding & Dashboard
import {
  BrokerRequirements,
  BrokerApplication,
  AwaitingApproval,
} from "./pages/broker";
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

// Dashboard Selection
import DashboardSelection from "./pages/DashboardSelection";

// Dealer Pages
import {
  DealerRequirements,
  DealerApplication,
  DealerAwaitingApproval,
  DealerDashboard,
} from "./pages/dealer";
import {
  DealerTrading,
  DealerInventory,
  DealerBrokers,
  DealerPrimaryMarket,
  DealerOTCDex,
  DealerRiskCompliance,
  DealerSettlement,
  DealerReports,
  DealerSettings,
} from "./pages/dealer/dashboard";

// Issuing House Pages
import {
  IssuingHouseRequirements,
  IssuingHouseApplication,
  IssuingHouseAwaitingApproval,
  IssuingHouseDashboard,
} from "./pages/issuing-house";
import {
  NewOffering,
  ActiveDeals,
  Investors,
  Underwriters,
  OfferManagement,
  SubscriptionMonitoring,
  AllocationAllotment,
  RegulatoryFilings,
  PostListing,
  IssuingHouseReports,
  IssuingHouseSettings,
} from "./pages/issuing-house/dashboard";

// Market Maker Pages
import {
  MarketMakerRequirements,
  MarketMakerApplication,
  MarketMakerAwaitingApproval,
  MarketMakerDashboard,
} from "./pages/market-maker";
import {
  QuotingEngine,
  RiskManagement,
  QuoteManagement,
  MarketDepth,
  InventoryControl,
  PerformanceMetrics,
  CompliancePenalties,
  MarketMakerReports,
  MarketMakerSettings,
} from "./pages/market-maker/dashboard";

// Register mock brokers for development
registerMockBrokers(mockBrokerConfigs);

const queryClient = new QueryClient();

// Shared broker app routes (markets, trading, portfolio, settings, OTC DESK)
const BrokerAppRoutes = () => (
  <>
    <Route path="markets" element={<BrokerMarketsPage />} />
    <Route path="markets/:marketType" element={<BrokerMarketsPage />} />
    <Route path="markets/private/:marketId" element={<BrokerMarketsPage />} />
    <Route path="markets/secondary/:marketId" element={<BrokerMarketsPage />} />
    <Route path="trade/:serviceType/:pair" element={<BrokerTradingPage />} />
    <Route path="otc-desk" element={<BrokerOTCDexPage />} />
    <Route path="otc-desk/:offerId" element={<BrokerOTCDexDetailPage />} />
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

// Broker mode app - renders when subdomain is detected
const BrokerModeApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBrokerBasePath()}>
        <Routes>
          {/* Broker routes - config already loaded by bootstrap */}
          <Route element={<BrokerAppLayout />}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<BrokerLandingPage />} />
              <Route path="/about" element={<BrokerAboutPage />} />
              <Route path="/legal" element={<BrokerLegalPage />} />
              <Route path="/login" element={<BrokerLoginPage />} />
              <Route path="/signup" element={<BrokerSignupPage />} />
            </Route>
            <Route path="/markets" element={<BrokerMarketsPage />} />
            <Route path="/markets/:marketType" element={<BrokerMarketsPage />} />
            <Route path="/markets/private/:marketId" element={<BrokerMarketsPage />} />
            <Route path="/markets/secondary/:marketId" element={<BrokerMarketsPage />} />
            <Route path="/trade/:serviceType/:pair" element={<BrokerTradingPage />} />
            <Route path="/otc-desk" element={<BrokerOTCDexPage />} />
            <Route path="/otc-desk/:offerId" element={<BrokerOTCDexDetailPage />} />
            <Route path="/portfolio" element={<BrokerPortfolioPage />} />
            <Route path="/settings" element={<BrokerSettingsPage />} />
          </Route>
          <Route path="*" element={<BrokerNotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Platform mode app - renders when no subdomain
const PlatformModeApp = () => (
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
            <Route
              path="/dashboard-selection"
              element={<DashboardSelection />}
            />

            {/* Unified Onboarding Flow */}
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route
              path="/awaiting-approval"
              element={<AwaitingApprovalPage />}
            />
            <Route
              path="/dashboard-selection-kyc"
              element={<DashboardSelectionKyc />}
            />

            {/* Broker Onboarding (legacy) */}
            <Route
              path="/broker/requirements"
              element={<BrokerRequirements />}
            />
            <Route path="/broker/application" element={<BrokerApplication />} />
            <Route
              path="/broker/awaiting-approval"
              element={<AwaitingApproval />}
            />

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
            <Route
              path="/dealer/requirements"
              element={<DealerRequirements />}
            />
            <Route path="/dealer/application" element={<DealerApplication />} />
            <Route
              path="/dealer/awaiting-approval"
              element={<DealerAwaitingApproval />}
            />
            <Route path="/dealer/dashboard" element={<DealerAdminLayout />}>
              <Route index element={<DealerDashboard />} />
              <Route path="primary-market" element={<DealerPrimaryMarket />} />
              <Route path="otc-desk" element={<DealerOTCDex />} />
              <Route path="trading" element={<DealerTrading />} />
              <Route path="inventory" element={<DealerInventory />} />
              <Route path="risk" element={<DealerRiskCompliance />} />
              <Route path="settlement" element={<DealerSettlement />} />
              <Route path="reports" element={<DealerReports />} />
              <Route path="settings" element={<DealerSettings />} />
              <Route path="brokers" element={<DealerBrokers />} />
            </Route>

            {/* Issuing House */}
            <Route
              path="/issuing-house/requirements"
              element={<IssuingHouseRequirements />}
            />
            <Route
              path="/issuing-house/application"
              element={<IssuingHouseApplication />}
            />
            <Route
              path="/issuing-house/awaiting-approval"
              element={<IssuingHouseAwaitingApproval />}
            />
            <Route
              path="/issuing-house/dashboard"
              element={<IssuingHouseAdminLayout />}
            >
              <Route index element={<IssuingHouseDashboard />} />
              <Route path="offers" element={<OfferManagement />} />
              <Route path="new-offering" element={<NewOffering />} />
              <Route path="active-deals" element={<ActiveDeals />} />
              <Route
                path="subscriptions"
                element={<SubscriptionMonitoring />}
              />
              <Route path="allocation" element={<AllocationAllotment />} />
              <Route path="filings" element={<RegulatoryFilings />} />
              <Route path="post-listing" element={<PostListing />} />
              <Route path="reports" element={<IssuingHouseReports />} />
              <Route path="settings" element={<IssuingHouseSettings />} />
              <Route path="investors" element={<Investors />} />
              <Route path="underwriters" element={<Underwriters />} />
            </Route>

            {/* Market Maker */}
            <Route
              path="/market-maker/requirements"
              element={<MarketMakerRequirements />}
            />
            <Route
              path="/market-maker/application"
              element={<MarketMakerApplication />}
            />
            <Route
              path="/market-maker/awaiting-approval"
              element={<MarketMakerAwaitingApproval />}
            />
            <Route
              path="/market-maker/dashboard"
              element={<MarketMakerAdminLayout />}
            >
              <Route index element={<MarketMakerDashboard />} />
              <Route path="quoting-engine" element={<QuoteManagement />} />
              <Route path="quoting-engine-config" element={<QuotingEngine />} />
              <Route path="market-depth" element={<MarketDepth />} />
              <Route path="inventory" element={<InventoryControl />} />
              <Route path="performance" element={<PerformanceMetrics />} />
              <Route path="compliance" element={<CompliancePenalties />} />
              <Route path="reports" element={<MarketMakerReports />} />
              <Route path="settings" element={<MarketMakerSettings />} />
              <Route path="risk-management" element={<RiskManagement />} />
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

// Main App component - chooses between broker and platform mode
const App = () => {
  // Check if we're in broker mode (subdomain detected during bootstrap)
  if (isInBrokerMode()) {
    return <BrokerModeApp />;
  }
  
  return <PlatformModeApp />;
};

export default App;
