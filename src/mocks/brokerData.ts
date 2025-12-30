import { useState, useEffect } from 'react';
import type { MarketSymbol } from '@/types';
import { mockMarkets } from '@/mocks/data';

// Mock broker users
export interface BrokerUser {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'blocked' | 'restricted';
  balance: number;
  tradingVolume: number;
  joinedAt: Date;
  lastActive: Date;
  avatar?: string;
  country?: string;
  tier?: 'standard' | 'silver' | 'gold' | 'platinum';
  trades?: number;
  verified?: boolean;
}

export const mockBrokerUsers: BrokerUser[] = [
  { id: 'u1', email: 'john.trader@email.com', name: 'John Trader', status: 'active', balance: 15420.50, tradingVolume: 125000, joinedAt: new Date('2024-01-15'), lastActive: new Date(), country: 'USA', tier: 'gold', trades: 342, verified: true },
  { id: 'u2', email: 'sarah.invest@email.com', name: 'Sarah Investor', status: 'active', balance: 52300.00, tradingVolume: 890000, joinedAt: new Date('2024-02-20'), lastActive: new Date(), country: 'UK', tier: 'platinum', trades: 1205, verified: true },
  { id: 'u3', email: 'mike.day@email.com', name: 'Mike Daytrader', status: 'restricted', balance: 8750.25, tradingVolume: 2450000, joinedAt: new Date('2024-03-10'), lastActive: new Date('2024-12-15'), country: 'Canada', tier: 'gold', trades: 4521, verified: true },
  { id: 'u4', email: 'emma.long@email.com', name: 'Emma Longterm', status: 'active', balance: 125000.00, tradingVolume: 450000, joinedAt: new Date('2024-01-05'), lastActive: new Date(), country: 'Germany', tier: 'platinum', trades: 89, verified: true },
  { id: 'u5', email: 'alex.newbie@email.com', name: 'Alex Newbie', status: 'active', balance: 1250.00, tradingVolume: 5000, joinedAt: new Date('2024-12-01'), lastActive: new Date(), country: 'France', tier: 'standard', trades: 12, verified: false },
  { id: 'u6', email: 'blocked.user@email.com', name: 'Blocked User', status: 'blocked', balance: 0, tradingVolume: 0, joinedAt: new Date('2024-06-15'), lastActive: new Date('2024-10-01'), country: 'Spain', tier: 'standard', trades: 0, verified: false },
  { id: 'u7', email: 'lisa.chen@email.com', name: 'Lisa Chen', status: 'active', balance: 78500.00, tradingVolume: 1250000, joinedAt: new Date('2024-04-12'), lastActive: new Date(), country: 'Singapore', tier: 'platinum', trades: 2156, verified: true },
  { id: 'u8', email: 'marcus.wolf@email.com', name: 'Marcus Wolf', status: 'active', balance: 34200.75, tradingVolume: 567000, joinedAt: new Date('2024-05-22'), lastActive: new Date(), country: 'Switzerland', tier: 'gold', trades: 678, verified: true },
  { id: 'u9', email: 'ana.rodriguez@email.com', name: 'Ana Rodriguez', status: 'active', balance: 9870.00, tradingVolume: 89000, joinedAt: new Date('2024-07-08'), lastActive: new Date(), country: 'Mexico', tier: 'silver', trades: 156, verified: true },
  { id: 'u10', email: 'david.kim@email.com', name: 'David Kim', status: 'restricted', balance: 2340.50, tradingVolume: 45000, joinedAt: new Date('2024-08-14'), lastActive: new Date('2024-12-20'), country: 'South Korea', tier: 'silver', trades: 89, verified: true },
  { id: 'u11', email: 'olivia.brown@email.com', name: 'Olivia Brown', status: 'active', balance: 67890.00, tradingVolume: 920000, joinedAt: new Date('2024-02-28'), lastActive: new Date(), country: 'Australia', tier: 'gold', trades: 1023, verified: true },
  { id: 'u12', email: 'james.wilson@email.com', name: 'James Wilson', status: 'active', balance: 156000.00, tradingVolume: 3200000, joinedAt: new Date('2023-11-10'), lastActive: new Date(), country: 'USA', tier: 'platinum', trades: 5678, verified: true },
  { id: 'u13', email: 'sophia.martinez@email.com', name: 'Sophia Martinez', status: 'active', balance: 4560.25, tradingVolume: 23000, joinedAt: new Date('2024-10-05'), lastActive: new Date(), country: 'Brazil', tier: 'standard', trades: 45, verified: false },
  { id: 'u14', email: 'william.taylor@email.com', name: 'William Taylor', status: 'active', balance: 89200.00, tradingVolume: 780000, joinedAt: new Date('2024-03-18'), lastActive: new Date(), country: 'UK', tier: 'gold', trades: 892, verified: true },
  { id: 'u15', email: 'isabella.garcia@email.com', name: 'Isabella Garcia', status: 'active', balance: 12340.00, tradingVolume: 145000, joinedAt: new Date('2024-06-22'), lastActive: new Date(), country: 'Argentina', tier: 'silver', trades: 234, verified: true },
];

// Mock analytics data
export interface AnalyticsData {
  date: string;
  users: number;
  volume: number;
  revenue: number;
  trades: number;
}

export const mockAnalytics: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    users: Math.floor(50 + Math.random() * 150),
    volume: Math.floor(100000 + Math.random() * 500000),
    revenue: Math.floor(1000 + Math.random() * 5000),
    trades: Math.floor(500 + Math.random() * 2000),
  };
});

// Dashboard stats
export const mockDashboardStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalVolume: 15420000,
  monthlyRevenue: 45200,
  totalTrades: 125400,
  avgOrderSize: 2450,
};

// Fee configuration
export interface FeeConfig {
  spotMakerFee: number;
  spotTakerFee: number;
  futuresMakerFee: number;
  futuresTakerFee: number;
  withdrawalFee: number;
  depositFee: number;
}

export const defaultFees: FeeConfig = {
  spotMakerFee: 0.1,
  spotTakerFee: 0.15,
  futuresMakerFee: 0.02,
  futuresTakerFee: 0.04,
  withdrawalFee: 0.5,
  depositFee: 0,
};

// Hook for simulated real-time market data
export function useRealtimeMarkets() {
  const [markets, setMarkets] = useState<MarketSymbol[]>(mockMarkets);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev =>
        prev.map(market => ({
          ...market,
          price: market.price * (1 + (Math.random() - 0.5) * 0.002),
          change: market.change + (Math.random() - 0.5) * 0.1,
          changePercent: market.changePercent + (Math.random() - 0.5) * 0.05,
          volume: market.volume + Math.floor(Math.random() * 10000),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return markets;
}
