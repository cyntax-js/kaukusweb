// Auth & User Types
export type UserRole = "broker" | "dealer" | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Broker Types
export type BrokerStatus = "pending" | "approved" | "rejected" | "active";

export interface BrokerApplication {
  id: string;
  userId: string;
  companyName: string;
  registrationNumber: string;
  country: string;
  regulatoryLicense: string;
  licenseNumber: string;
  capitalRequirement: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  documents: BrokerDocument[];
  status: BrokerStatus;
  submittedAt: Date;
  approvedAt?: Date;
}

export interface BrokerDocument {
  id: string;
  name: string;
  type: "license" | "registration" | "kyc" | "financial" | "other";
  fileName: string;
  uploadedAt: Date;
}

export interface Broker {
  id: string;
  userId: string;
  application: BrokerApplication;
  subdomain: string;
  isDeployed: boolean;
  selectedServices: string[];
  selectedTemplate: string | null;
  selectedTheme: string | null;
  selectedLayout: string | null;
  createdAt: Date;
}

// Dealer Types
export type DealerStatus = "pending" | "approved" | "rejected" | "active";
export type DealerType =
  | "bank"
  | "market_maker"
  | "hedge_fund"
  | "proprietary"
  | "other";

export interface DealerApplication {
  id: string;
  userId: string;
  institutionName: string;
  institutionType: DealerType;
  registrationNumber: string;
  country: string;
  regulatoryBody: string;
  licenseNumber: string;
  capitalCommitment: string;
  marketsToServe: string[];
  contactEmail: string;
  contactPhone: string;
  status: DealerStatus;
  submittedAt: Date;
  approvedAt?: Date;
}

export interface Dealer {
  id: string;
  userId: string;
  application: DealerApplication;
  createdAt: Date;
}

// Service Types
export interface ContisXService {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon: string;
  isPopular?: boolean;
}

// Template Types
export interface BrokerTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  category: "classic" | "pro" | "minimal" | "institutional" | "social";
  features: string[];
}

// Theme Types
export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  primaryForeground?: string;
  secondary: string;
  accent: string;
  background: string;
  foreground?: string;
  muted?: string;
  mutedForeground?: string;
  border?: string;
  success?: string;
  destructive?: string;
}

// Layout Types
export interface TradingLayout {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

// Market Types
export interface MarketSymbol {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

export interface OrderBook {
  symbol: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}
