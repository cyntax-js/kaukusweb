/**
 * App Routes Layout - Wrapper for trading/app pages (markets, portfolio, trading, settings)
 * Uses AppHeader with markets navigation
 */

import { Outlet } from 'react-router-dom';

export const AppRoutesLayout = () => {
  // Note: AppHeader is rendered inside individual pages (TradingPage, MarketsPage, etc.)
  // because each page may have different layout requirements
  return <Outlet />;
};
