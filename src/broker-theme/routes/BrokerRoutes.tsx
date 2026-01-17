/**
 * Shared Broker Routes
 * Single source of truth for broker page routes
 * Used by both /preview and /app route trees
 */

import { Route } from 'react-router-dom';
import { PublicLayout } from '../layouts';
import {
  LandingPage,
  LoginPage,
  SignupPage,
  TradingPage,
  MarketsPage,
  PortfolioPage,
  SettingsPage,
  AboutPage,
  LegalPage,
} from '../pages';

/**
 * Public pages (landing, about, legal, auth)
 */
export const PublicRoutes = () => (
  <Route element={<PublicLayout />}>
    <Route index element={<LandingPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="legal" element={<LegalPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Route>
);

/**
 * App pages (markets, trading, portfolio, settings)
 */
export const AppRoutes = () => (
  <>
    <Route path="markets" element={<MarketsPage />} />
    <Route path="markets/:marketType" element={<MarketsPage />} />
    <Route path="markets/private/:marketId" element={<MarketsPage />} />
    <Route path="markets/secondary/:marketId" element={<MarketsPage />} />
    <Route path="trade/:serviceType/:pair" element={<TradingPage />} />
    <Route path="portfolio" element={<PortfolioPage />} />
    <Route path="settings" element={<SettingsPage />} />
  </>
);
