/**
 * Mock data for Dealer, Issuing House, and Market Maker dashboards
 */

// ============================================================
// DEALER MOCK DATA
// ============================================================

export const dealerDashboardStats = {
  totalTrades: 2450,
  tradingVolume: 1200000000, // ₦1.2B
  activeMarkets: 8,
  connectedBrokers: 45,
  avgSpread: 0.15,
  dailyTransactions: 342,
};

export interface DealerTrade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  broker: string;
  timestamp: Date;
  status: 'filled' | 'partial' | 'pending';
}

export const dealerRecentTrades: DealerTrade[] = [
  { id: 'dt1', symbol: 'DANGOTE', side: 'buy', quantity: 10000, price: 245.50, broker: 'Alpha Securities', timestamp: new Date(), status: 'filled' },
  { id: 'dt2', symbol: 'GTCO', side: 'sell', quantity: 25000, price: 42.30, broker: 'Beta Investments', timestamp: new Date(Date.now() - 300000), status: 'filled' },
  { id: 'dt3', symbol: 'ZENITH', side: 'buy', quantity: 15000, price: 38.75, broker: 'Gamma Trading', timestamp: new Date(Date.now() - 600000), status: 'partial' },
  { id: 'dt4', symbol: 'MTN', side: 'sell', quantity: 50000, price: 195.00, broker: 'Delta Markets', timestamp: new Date(Date.now() - 900000), status: 'filled' },
  { id: 'dt5', symbol: 'AIRTEL', side: 'buy', quantity: 8000, price: 1850.25, broker: 'Epsilon Capital', timestamp: new Date(Date.now() - 1200000), status: 'pending' },
];

export interface DealerInventory {
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export const dealerInventory: DealerInventory[] = [
  { symbol: 'DANGOTE', quantity: 150000, avgCost: 240.00, currentPrice: 245.50, pnl: 825000, pnlPercent: 2.29 },
  { symbol: 'GTCO', quantity: 500000, avgCost: 40.50, currentPrice: 42.30, pnl: 900000, pnlPercent: 4.44 },
  { symbol: 'ZENITH', quantity: 300000, avgCost: 39.00, currentPrice: 38.75, pnl: -75000, pnlPercent: -0.64 },
  { symbol: 'MTN', quantity: 75000, avgCost: 190.00, currentPrice: 195.00, pnl: 375000, pnlPercent: 2.63 },
  { symbol: 'UBA', quantity: 800000, avgCost: 22.50, currentPrice: 23.10, pnl: 480000, pnlPercent: 2.67 },
];

// ============================================================
// ISSUING HOUSE MOCK DATA
// ============================================================

export const issuingHouseDashboardStats = {
  activeOfferings: 3,
  totalRaised: 5200000000, // ₦5.2B
  totalInvestors: 1240,
  pendingIPOs: 2,
  avgSubscriptionRate: 145,
  completedDeals: 12,
};

export interface SecurityOffering {
  id: string;
  name: string;
  type: 'IPO' | 'Rights Issue' | 'Private Placement' | 'Bond';
  targetAmount: number;
  raisedAmount: number;
  investors: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  subscriptionRate: number;
}

export const activeOfferings: SecurityOffering[] = [
  { id: 'off1', name: 'TechCorp Nigeria IPO', type: 'IPO', targetAmount: 2000000000, raisedAmount: 1850000000, investors: 456, startDate: new Date('2025-01-01'), endDate: new Date('2025-02-15'), status: 'active', subscriptionRate: 92.5 },
  { id: 'off2', name: 'FirstBank Rights Issue', type: 'Rights Issue', targetAmount: 1500000000, raisedAmount: 1500000000, investors: 320, startDate: new Date('2024-12-01'), endDate: new Date('2025-01-15'), status: 'completed', subscriptionRate: 100 },
  { id: 'off3', name: 'Energy Corp Bond', type: 'Bond', targetAmount: 3000000000, raisedAmount: 2100000000, investors: 125, startDate: new Date('2025-01-10'), endDate: new Date('2025-03-10'), status: 'active', subscriptionRate: 70 },
  { id: 'off4', name: 'FinTech Startup Private Placement', type: 'Private Placement', targetAmount: 500000000, raisedAmount: 0, investors: 0, startDate: new Date('2025-02-01'), endDate: new Date('2025-03-01'), status: 'upcoming', subscriptionRate: 0 },
];

export interface IssuingHouseInvestor {
  id: string;
  name: string;
  email: string;
  type: 'institutional' | 'retail' | 'hnwi';
  totalInvested: number;
  offerings: number;
  lastActivity: Date;
}

export const issuingHouseInvestors: IssuingHouseInvestor[] = [
  { id: 'inv1', name: 'Pension Fund Alpha', email: 'invest@pfa.com', type: 'institutional', totalInvested: 500000000, offerings: 4, lastActivity: new Date() },
  { id: 'inv2', name: 'Chief Adebayo Holdings', email: 'chief@adebayo.com', type: 'hnwi', totalInvested: 150000000, offerings: 3, lastActivity: new Date(Date.now() - 86400000) },
  { id: 'inv3', name: 'Mrs. Sarah Johnson', email: 'sarah@email.com', type: 'retail', totalInvested: 2500000, offerings: 2, lastActivity: new Date(Date.now() - 172800000) },
  { id: 'inv4', name: 'Investment Trust Beta', email: 'trust@itb.com', type: 'institutional', totalInvested: 750000000, offerings: 6, lastActivity: new Date() },
  { id: 'inv5', name: 'Dr. Emeka Okafor', email: 'emeka@doctor.com', type: 'hnwi', totalInvested: 85000000, offerings: 2, lastActivity: new Date(Date.now() - 259200000) },
];

// ============================================================
// MARKET MAKER MOCK DATA
// ============================================================

export const marketMakerDashboardStats = {
  activePairs: 24,
  dailyVolume: 890000000, // ₦890M
  avgSpread: 0.12,
  fillRate: 98.7,
  totalQuotes: 1250000,
  pnlToday: 12500000,
};

export interface MarketPair {
  id: string;
  symbol: string;
  bidPrice: number;
  askPrice: number;
  spread: number;
  volume24h: number;
  quoteCount: number;
  fillRate: number;
  status: 'active' | 'paused' | 'error';
}

export const marketMakerPairs: MarketPair[] = [
  { id: 'mp1', symbol: 'DANGOTE', bidPrice: 245.40, askPrice: 245.60, spread: 0.08, volume24h: 125000000, quoteCount: 45000, fillRate: 99.2, status: 'active' },
  { id: 'mp2', symbol: 'GTCO', bidPrice: 42.25, askPrice: 42.35, spread: 0.24, volume24h: 89000000, quoteCount: 38000, fillRate: 98.5, status: 'active' },
  { id: 'mp3', symbol: 'MTN', bidPrice: 194.90, askPrice: 195.10, spread: 0.10, volume24h: 156000000, quoteCount: 52000, fillRate: 99.0, status: 'active' },
  { id: 'mp4', symbol: 'ZENITH', bidPrice: 38.70, askPrice: 38.80, spread: 0.26, volume24h: 67000000, quoteCount: 29000, fillRate: 97.8, status: 'active' },
  { id: 'mp5', symbol: 'UBA', bidPrice: 23.05, askPrice: 23.15, spread: 0.43, volume24h: 45000000, quoteCount: 21000, fillRate: 98.1, status: 'active' },
  { id: 'mp6', symbol: 'AIRTEL', bidPrice: 1849.00, askPrice: 1851.00, spread: 0.11, volume24h: 78000000, quoteCount: 18000, fillRate: 99.5, status: 'active' },
];

export interface QuoteHistory {
  id: string;
  symbol: string;
  side: 'bid' | 'ask';
  price: number;
  size: number;
  timestamp: Date;
  filled: boolean;
}

export const recentQuotes: QuoteHistory[] = [
  { id: 'q1', symbol: 'DANGOTE', side: 'bid', price: 245.40, size: 5000, timestamp: new Date(), filled: true },
  { id: 'q2', symbol: 'DANGOTE', side: 'ask', price: 245.60, size: 5000, timestamp: new Date(), filled: true },
  { id: 'q3', symbol: 'GTCO', side: 'bid', price: 42.25, size: 10000, timestamp: new Date(Date.now() - 60000), filled: true },
  { id: 'q4', symbol: 'MTN', side: 'ask', price: 195.10, size: 2000, timestamp: new Date(Date.now() - 120000), filled: false },
  { id: 'q5', symbol: 'ZENITH', side: 'bid', price: 38.70, size: 15000, timestamp: new Date(Date.now() - 180000), filled: true },
];

export interface RiskMetrics {
  maxPositionSize: number;
  currentExposure: number;
  utilizationPercent: number;
  dailyPnL: number;
  weeklyPnL: number;
  monthlyPnL: number;
  maxDrawdown: number;
  sharpeRatio: number;
}

export const riskMetrics: RiskMetrics = {
  maxPositionSize: 500000000,
  currentExposure: 325000000,
  utilizationPercent: 65,
  dailyPnL: 12500000,
  weeklyPnL: 45000000,
  monthlyPnL: 180000000,
  maxDrawdown: -8.5,
  sharpeRatio: 2.4,
};
