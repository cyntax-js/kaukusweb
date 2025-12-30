/**
 * ============================================================
 * BROKER THEME - MARKETS API
 * ============================================================
 * 
 * API for fetching market data (pairs, prices, etc.)
 * Used by: MarketsPage, TradingPage, market tickers
 * 
 * To integrate real API:
 *   1. Pass broker subdomain for filtering
 *   2. Replace MOCK_PAIRS with real market feeds
 */

import { mockResponse, DELAYS } from './client';

// ============================================================
// TYPES
// ============================================================

export type MarketType = 'spot' | 'futures' | 'options' | 'private_markets';

export interface MarketPair {
  id: string;
  symbol: string;
  name: string;
  baseAsset: string;
  quoteAsset: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketType: MarketType;
  isFavorite?: boolean;
}

export interface MarketTypeInfo {
  label: string;
  description: string;
  urlSlug: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const MOCK_PAIRS: Record<MarketType, MarketPair[]> = {
  spot: [
    { id: 'btc-usdt-spot', symbol: 'BTC-USDT', name: 'Bitcoin', baseAsset: 'BTC', quoteAsset: 'USDT', price: 42583.20, change24h: 2.34, volume24h: '1.2B', marketType: 'spot' },
    { id: 'eth-usdt-spot', symbol: 'ETH-USDT', name: 'Ethereum', baseAsset: 'ETH', quoteAsset: 'USDT', price: 2284.50, change24h: 1.87, volume24h: '890M', marketType: 'spot' },
    { id: 'sol-usdt-spot', symbol: 'SOL-USDT', name: 'Solana', baseAsset: 'SOL', quoteAsset: 'USDT', price: 98.42, change24h: -0.52, volume24h: '456M', marketType: 'spot' },
    { id: 'bnb-usdt-spot', symbol: 'BNB-USDT', name: 'BNB', baseAsset: 'BNB', quoteAsset: 'USDT', price: 312.80, change24h: 1.23, volume24h: '320M', marketType: 'spot' },
    { id: 'xrp-usdt-spot', symbol: 'XRP-USDT', name: 'Ripple', baseAsset: 'XRP', quoteAsset: 'USDT', price: 0.62, change24h: -1.45, volume24h: '180M', marketType: 'spot' },
    { id: 'ada-usdt-spot', symbol: 'ADA-USDT', name: 'Cardano', baseAsset: 'ADA', quoteAsset: 'USDT', price: 0.58, change24h: 0.89, volume24h: '120M', marketType: 'spot' },
  ],
  futures: [
    { id: 'btc-usdt-perp', symbol: 'BTC-USDT', name: 'Bitcoin Perpetual', baseAsset: 'BTC', quoteAsset: 'USDT', price: 42590.00, change24h: 2.41, volume24h: '2.1B', marketType: 'futures' },
    { id: 'eth-usdt-perp', symbol: 'ETH-USDT', name: 'Ethereum Perpetual', baseAsset: 'ETH', quoteAsset: 'USDT', price: 2286.00, change24h: 1.92, volume24h: '1.4B', marketType: 'futures' },
    { id: 'sol-usdt-perp', symbol: 'SOL-USDT', name: 'Solana Perpetual', baseAsset: 'SOL', quoteAsset: 'USDT', price: 98.50, change24h: -0.48, volume24h: '680M', marketType: 'futures' },
    { id: 'bnb-usdt-perp', symbol: 'BNB-USDT', name: 'BNB Perpetual', baseAsset: 'BNB', quoteAsset: 'USDT', price: 313.20, change24h: 1.35, volume24h: '420M', marketType: 'futures' },
  ],
  options: [
    { id: 'btc-45k-call', symbol: 'BTC-45K-CALL', name: 'BTC Call $45,000', baseAsset: 'BTC', quoteAsset: 'USD', price: 1250.00, change24h: 5.23, volume24h: '45M', marketType: 'options' },
    { id: 'btc-40k-put', symbol: 'BTC-40K-PUT', name: 'BTC Put $40,000', baseAsset: 'BTC', quoteAsset: 'USD', price: 890.00, change24h: -2.15, volume24h: '32M', marketType: 'options' },
    { id: 'eth-2500-call', symbol: 'ETH-2500-CALL', name: 'ETH Call $2,500', baseAsset: 'ETH', quoteAsset: 'USD', price: 180.00, change24h: 4.12, volume24h: '28M', marketType: 'options' },
  ],
  private_markets: [
    { id: 'spx-fund', symbol: 'SPX-FUND', name: 'S&P 500 Private Equity Fund', baseAsset: 'SPX', quoteAsset: 'USD', price: 10000.00, change24h: 0.12, volume24h: '25M', marketType: 'private_markets' },
    { id: 'real-estate-i', symbol: 'RE-FUND-I', name: 'Real Estate Fund I', baseAsset: 'REFI', quoteAsset: 'USD', price: 5000.00, change24h: 0.08, volume24h: '15M', marketType: 'private_markets' },
    { id: 'venture-tech', symbol: 'VC-TECH', name: 'Venture Capital Tech Fund', baseAsset: 'VCTF', quoteAsset: 'USD', price: 25000.00, change24h: 0.45, volume24h: '8M', marketType: 'private_markets' },
  ],
};

export const MARKET_TYPE_INFO: Record<MarketType, MarketTypeInfo> = {
  spot: { label: 'Spot', description: 'Buy and sell at current market prices', urlSlug: 'spot' },
  futures: { label: 'Futures', description: 'Trade perpetual and dated futures contracts', urlSlug: 'futures' },
  options: { label: 'Options', description: 'Trade call and put options', urlSlug: 'options' },
  private_markets: { label: 'Private Markets', description: 'Access exclusive private investments', urlSlug: 'private-market' },
};

// ============================================================
// API FUNCTIONS
// ============================================================

/** Get all market pairs for a specific market type */
export async function getPairs(marketType: MarketType): Promise<MarketPair[]> {
  return mockResponse(MOCK_PAIRS[marketType] || [], DELAYS.SHORT);
}

/** Get a specific market pair */
export async function getPair(marketType: MarketType, symbol: string): Promise<MarketPair | null> {
  const pairs = MOCK_PAIRS[marketType] || [];
  const pair = pairs.find(p => p.symbol.toLowerCase() === symbol.toLowerCase());
  return mockResponse(pair || null, DELAYS.SHORT);
}

/** Get market type info */
export function getMarketTypeInfo(marketType: MarketType): MarketTypeInfo {
  return MARKET_TYPE_INFO[marketType];
}

/** Convert URL slug to market type */
export function urlToMarketType(urlSlug: string): MarketType | null {
  const mapping: Record<string, MarketType> = {
    'spot': 'spot',
    'futures': 'futures',
    'options': 'options',
    'private-market': 'private_markets',
  };
  return mapping[urlSlug.toLowerCase()] || null;
}

/** Convert market type to URL slug */
export function marketTypeToUrl(marketType: MarketType): string {
  return MARKET_TYPE_INFO[marketType].urlSlug;
}
