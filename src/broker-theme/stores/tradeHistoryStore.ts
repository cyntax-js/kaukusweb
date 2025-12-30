import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Trade {
  id: string;
  type: "buy" | "sell" | "long" | "short";
  symbol: string;
  amount: number;
  price: number;
  total: number;
  leverage?: number;
  timestamp: number;
  status: "filled" | "pending" | "cancelled";
}

interface TradeHistoryState {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  clearHistory: () => void;
  getTradesBySymbol: (symbol: string) => Trade[];
}

export const useTradeHistoryStore = create<TradeHistoryState>()(
  persist(
    (set, get) => ({
      trades: [],
      
      addTrade: (trade) => {
        const newTrade: Trade = {
          ...trade,
          id: `trade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        };
        set((state) => ({
          trades: [newTrade, ...state.trades].slice(0, 100), // Keep last 100 trades
        }));
        return newTrade;
      },
      
      clearHistory: () => set({ trades: [] }),
      
      getTradesBySymbol: (symbol: string) => {
        return get().trades.filter((t) => t.symbol === symbol);
      },
    }),
    {
      name: "broker-trade-history",
    }
  )
);
