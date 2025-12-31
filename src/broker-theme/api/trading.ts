/**
 * ============================================================
 * BROKER THEME - TRADING API
 * ============================================================
 *
 * API for trading operations (orders, positions)
 * Used by: TradingPage, order forms
 *
 * To integrate real API:
 *   1. Connect to order matching engine
 *   2. Add real-time position updates via WebSocket
 */

import { mockResponse, generateId, DELAYS } from "./client";
import type { MarketType } from "./markets";

// ============================================================
// TYPES
// ============================================================

export type OrderSide = "buy" | "sell";
export type OrderType = "market" | "limit" | "stop" | "stop_limit";
export type OrderStatus = "open" | "filled" | "partially_filled" | "cancelled";

export interface Order {
  id: string;
  symbol: string;
  marketType: MarketType;
  side: OrderSide;
  type: OrderType;
  price?: number;
  quantity: number;
  filledQuantity: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Position {
  id: string;
  symbol: string;
  marketType: MarketType;
  side: OrderSide;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  createdAt: Date;
}

export interface OrderRequest {
  symbol: string;
  marketType: MarketType;
  side: OrderSide;
  type: OrderType;
  price?: number;
  quantity: number;
}

// ============================================================
// API FUNCTIONS
// ============================================================

/** Place a new order */
export async function placeOrder(request: OrderRequest): Promise<Order> {
  const order: Order = {
    id: generateId("order"),
    symbol: request.symbol,
    marketType: request.marketType,
    side: request.side,
    type: request.type,
    price: request.price,
    quantity: request.quantity,
    filledQuantity: request.type === "market" ? request.quantity : 0,
    status: request.type === "market" ? "filled" : "open",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return mockResponse(order, DELAYS.MEDIUM);
}

/** Cancel an open order */
export async function cancelOrder(orderId: string): Promise<void> {
  return mockResponse(undefined, DELAYS.SHORT);
}

/** Get open orders */
export async function getOpenOrders(): Promise<Order[]> {
  return mockResponse([], DELAYS.MEDIUM);
}

/** Get order history */
export async function getOrderHistory(): Promise<Order[]> {
  return mockResponse(
    [
      {
        id: "order_1",
        symbol: "BTC-USDT",
        marketType: "stock" as MarketType,
        side: "buy" as OrderSide,
        type: "market" as OrderType,
        quantity: 0.5,
        filledQuantity: 0.5,
        status: "filled" as OrderStatus,
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 3600000),
      },
    ],
    DELAYS.MEDIUM
  );
}

/** Get current positions */
export async function getPositions(): Promise<Position[]> {
  return mockResponse(
    [
      {
        id: "pos_1",
        symbol: "BTC-USDT",
        marketType: "futures" as MarketType,
        side: "buy" as OrderSide,
        entryPrice: 41500.0,
        currentPrice: 42583.2,
        quantity: 0.5,
        pnl: 541.6,
        pnlPercent: 2.61,
        createdAt: new Date(Date.now() - 86400000),
      },
    ],
    DELAYS.MEDIUM
  );
}
