import type {
  ContisXService,
  BrokerTemplate,
  ColorTheme,
  TradingLayout,
  MarketSymbol,
} from "@/types";

// ContisX Services (Shopify-like product catalog)
export const mockServices: ContisXService[] = [
  {
    id: "spot",
    name: "Spot Trading",
    description:
      "Enable spot trading for your users with real-time order matching and market data.",
    price: 999,
    features: [
      "Real-time order book",
      "Market & limit orders",
      "Trading pairs management",
      "User wallet integration",
      "Trade history & reports",
    ],
    icon: "TrendingUp",
    isPopular: true,
  },
  {
    id: "futures",
    name: "Futures & Derivatives",
    description:
      "Offer perpetual and dated futures contracts with leverage trading capabilities.",
    price: 2499,
    features: [
      "Perpetual contracts",
      "Dated futures",
      "Up to 100x leverage",
      "Funding rate mechanism",
      "Liquidation engine",
      "Risk management tools",
    ],
    icon: "LineChart",
  },
  {
    id: "options",
    name: "Options Trading",
    description:
      "Provide call and put options with various strike prices and expiry dates.",
    price: 1999,
    features: [
      "Call & put options",
      "European & American style",
      "Greeks calculator",
      "Options chain view",
      "Volatility charts",
    ],
    icon: "Layers",
  },
  {
    id: "private",
    name: "Private Market",
    description:
      "Access exclusive private market deals and pre-IPO opportunities for qualified investors.",
    price: 4999,
    features: [
      "Private placements",
      "Pre-IPO access",
      "Accredited investor verification",
      "Deal room functionality",
      "Document management",
      "Investor communications",
    ],
    icon: "Lock",
  },
];

// Broker Platform Templates
export const mockTemplates: BrokerTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description:
      "Traditional trading interface trusted by millions of traders worldwide.",
    previewImage: "/templates/classic.png",
    category: "classic",
    features: [
      "Clean layout",
      "Familiar UX",
      "Fast loading",
      "Mobile responsive",
    ],
  },
  {
    id: "pro",
    name: "Pro Trader",
    description:
      "Advanced charting and analysis tools for professional traders.",
    previewImage: "/templates/pro.png",
    category: "pro",
    features: [
      "Advanced charts",
      "Multiple timeframes",
      "Technical indicators",
      "Drawing tools",
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple interface perfect for beginners.",
    previewImage: "/templates/minimal.png",
    category: "minimal",
    features: [
      "Beginner friendly",
      "Simple navigation",
      "Guided trading",
      "Education focused",
    ],
  },
  {
    id: "institutional",
    name: "Institutional",
    description: "Data-dense multi-panel layout for institutional traders.",
    previewImage: "/templates/institutional.png",
    category: "institutional",
    features: ["Multi-monitor", "Data dense", "API access", "Bulk orders"],
  },
  {
    id: "social",
    name: "Social Trading",
    description: "Community-focused platform with copy trading features.",
    previewImage: "/templates/social.png",
    category: "social",
    features: [
      "Copy trading",
      "Leaderboards",
      "Social feed",
      "Trader profiles",
    ],
  },
];

// Color Themes
export const mockThemes: ColorTheme[] = [
  {
    id: "blue",
    name: "Blue Professional",
    primary: "217 91% 50%",
    secondary: "220 14% 96%",
    accent: "217 91% 60%",
    background: "210 20% 98%",
  },
  {
    id: "dark",
    name: "Dark Mode Elite",
    primary: "217 91% 60%",
    secondary: "217 32% 17%",
    accent: "262 83% 58%",
    background: "222 47% 6%",
  },
  {
    id: "green",
    name: "Green Growth",
    primary: "162 63% 41%",
    secondary: "160 30% 96%",
    accent: "162 63% 50%",
    background: "160 20% 98%",
  },
  {
    id: "gold",
    name: "Gold Premium",
    primary: "38 92% 50%",
    secondary: "40 30% 96%",
    accent: "38 92% 60%",
    background: "40 20% 98%",
  },
  {
    id: "light",
    name: "Light Modern",
    primary: "222 47% 11%",
    secondary: "220 14% 96%",
    accent: "217 91% 50%",
    background: "0 0% 100%",
  },
  {
    id: "neon",
    name: "Crypto Neon",
    primary: "280 100% 60%",
    secondary: "270 30% 15%",
    accent: "320 100% 60%",
    background: "270 50% 5%",
  },
];

// Trading Layouts
export const mockLayouts: TradingLayout[] = [
  {
    id: "orderbook-left",
    name: "Order Book Left",
    description:
      "Order book on the left, chart on the right with trade form below.",
    previewImage: "/layouts/orderbook-left.png",
  },
  {
    id: "orderbook-right",
    name: "Order Book Right",
    description:
      "Chart on the left, order book on the right with trade form below.",
    previewImage: "/layouts/orderbook-right.png",
  },
  {
    id: "orderbook-bottom",
    name: "Chart Focus",
    description: "Large chart at top, order book and trade form at the bottom.",
    previewImage: "/layouts/orderbook-bottom.png",
  },
];

// Mock Market Data
export const mockMarkets: MarketSymbol[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.52,
    change: 2.34,
    changePercent: 1.33,
    volume: 52340000,
    high24h: 180.12,
    low24h: 176.89,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 141.8,
    change: -0.92,
    changePercent: -0.64,
    volume: 21560000,
    high24h: 143.5,
    low24h: 140.2,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.91,
    change: 4.21,
    changePercent: 1.12,
    volume: 18920000,
    high24h: 380.45,
    low24h: 374.3,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.25,
    change: 1.87,
    changePercent: 1.06,
    volume: 34780000,
    high24h: 179.8,
    low24h: 175.9,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.5,
    change: -3.45,
    changePercent: -1.37,
    volume: 98450000,
    high24h: 253.2,
    low24h: 245.8,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 495.22,
    change: 12.34,
    changePercent: 2.56,
    volume: 42180000,
    high24h: 498.9,
    low24h: 480.15,
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 505.75,
    change: 8.92,
    changePercent: 1.8,
    volume: 15670000,
    high24h: 508.4,
    low24h: 495.3,
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    price: 195.4,
    change: 1.25,
    changePercent: 0.64,
    volume: 8920000,
    high24h: 196.8,
    low24h: 193.5,
  },
];

// Mock stats for landing page
export const mockStats = {
  totalVolume: "$2.4T",
  activeBrokers: "1,247",
  activeDealers: "89",
  marketsAvailable: "12,500+",
  dailyTransactions: "15M+",
  countries: "180+",
};

// Regulatory bodies for broker application
export const regulatoryBodies = [
  "SEC (U.S. Securities and Exchange Commission)",
  "FCA (UK Financial Conduct Authority)",
  "ASIC (Australian Securities & Investments Commission)",
  "CySEC (Cyprus Securities and Exchange Commission)",
  "BaFin (German Federal Financial Supervisory Authority)",
  "MAS (Monetary Authority of Singapore)",
  "FSA (Japan Financial Services Agency)",
  "FINMA (Swiss Financial Market Supervisory Authority)",
  "Other",
];

// Countries list
export const countries = [
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Canada",
  "Singapore",
  "Switzerland",
  "Hong Kong",
  "Netherlands",
  "Sweden",
  "Ireland",
  "Luxembourg",
  "Cyprus",
];

// Dealer types
export const dealerTypes = [
  { id: "bank", name: "Commercial Bank" },
  { id: "market_maker", name: "Market Maker" },
  { id: "hedge_fund", name: "Hedge Fund" },
  { id: "proprietary", name: "Proprietary Trading Firm" },
  { id: "other", name: "Other Financial Institution" },
];
