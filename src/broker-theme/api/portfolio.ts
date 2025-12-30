/**
 * ============================================================
 * BROKER THEME - PORTFOLIO API
 * ============================================================
 * 
 * API for portfolio and holdings data
 * Used by: PortfolioPage, wallet displays
 * 
 * To integrate real API:
 *   1. Connect to user wallet service
 *   2. Add proper balance tracking
 */

import { mockResponse, DELAYS } from './client';

// ============================================================
// TYPES
// ============================================================

export interface Holding {
  id: string;
  asset: string;
  name: string;
  balance: number;
  valueUsd: number;
  change24h: number;
  allocation: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  holdings: Holding[];
}

// ============================================================
// API FUNCTIONS
// ============================================================

/** Get user's portfolio summary */
export async function getSummary(): Promise<PortfolioSummary> {
  return mockResponse({
    totalValue: 125420.50,
    totalPnl: 8520.30,
    totalPnlPercent: 7.29,
    holdings: [
      { id: 'h1', asset: 'BTC', name: 'Bitcoin', balance: 1.5, valueUsd: 63874.80, change24h: 2.34, allocation: 50.9 },
      { id: 'h2', asset: 'ETH', name: 'Ethereum', balance: 15.2, valueUsd: 34724.40, change24h: 1.87, allocation: 27.7 },
      { id: 'h3', asset: 'SOL', name: 'Solana', balance: 120, valueUsd: 11810.40, change24h: -0.52, allocation: 9.4 },
      { id: 'h4', asset: 'USDT', name: 'Tether', balance: 15010.90, valueUsd: 15010.90, change24h: 0, allocation: 12.0 },
    ],
  }, DELAYS.MEDIUM);
}

/** Get user's holdings */
export async function getHoldings(): Promise<Holding[]> {
  const summary = await getSummary();
  return summary.holdings;
}

/** Get specific asset balance */
export async function getAssetBalance(asset: string): Promise<{ balance: number; valueUsd: number }> {
  return mockResponse({ balance: 1.5, valueUsd: 63874.80 }, DELAYS.SHORT);
}
