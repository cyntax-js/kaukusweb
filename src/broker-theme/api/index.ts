/**
 * ============================================================
 * BROKER THEME - API EXPORTS
 * ============================================================
 * 
 * Central export for all broker theme APIs.
 * 
 * Usage:
 *   import { marketsApi, tradingApi, portfolioApi, userApi } from '@/broker-theme/api';
 *   
 *   const pairs = await marketsApi.getPairs('spot');
 *   const order = await tradingApi.placeOrder({ ... });
 */

import * as markets from './markets';
import * as trading from './trading';
import * as portfolio from './portfolio';
import * as user from './user';

// Individual API exports
export { markets as marketsApi, trading as tradingApi, portfolio as portfolioApi, user as userApi };

// Unified broker API object
export const brokerApi = {
  markets,
  trading,
  portfolio,
  user,
};

// Re-export types for convenience
export type { MarketPair, MarketType, MarketTypeInfo } from './markets';
export type { Order, Position, OrderRequest, OrderSide, OrderType, OrderStatus } from './trading';
export type { Holding, PortfolioSummary } from './portfolio';
export type { BrokerEndUser, LoginRequest, SignupRequest } from './user';
