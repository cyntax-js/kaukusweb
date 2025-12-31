import type {
  ContiSXService,
  BrokerTemplate,
  ColorTheme,
  TradingLayout,
  MarketSymbol,
} from "@/types";

// ContiSX Services (Shopify-like product catalog)
export const mockServices: ContiSXService[] = [
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
    symbol: "BUAFOODS",
    name: "BUA Foods Plc",
    price: 178.52,
    change: 2.34,
    changePercent: 1.33,
    volume: 52340000,
    high24h: 180.12,
    low24h: 176.89,
  },
  {
    symbol: "DANGCEM",
    name: "Dangote Cement Plc",
    price: 141.8,
    change: -0.92,
    changePercent: -0.64,
    volume: 21560000,
    high24h: 143.5,
    low24h: 140.2,
  },
  {
    symbol: "AIRTELAFRI",
    name: "Airtel Africa Plc",
    price: 1820,
    change: 35,
    changePercent: 1.96,
    volume: 8400000,
    high24h: 1835,
    low24h: 1780,
  },
  {
    symbol: "MTNN",
    name: "MTN Nigeria",
    price: 195.4,
    change: -3.1,
    changePercent: -1.56,
    volume: 32700000,
    high24h: 199.5,
    low24h: 193.2,
  },
  {
    symbol: "ZENITHBANK",
    name: "Zenith Bank Plc",
    price: 42.85,
    change: 0.75,
    changePercent: 1.78,
    volume: 90450000,
    high24h: 43.2,
    low24h: 41.9,
  },
  {
    symbol: "GTCO",
    name: "GTCO Plc",
    price: 48.6,
    change: 1.2,
    changePercent: 2.53,
    volume: 61200000,
    high24h: 49.1,
    low24h: 47.3,
  },
  {
    symbol: "ACCESSCORP",
    name: "Access Holdings Plc",
    price: 21.35,
    change: -0.4,
    changePercent: -1.84,
    volume: 128300000,
    high24h: 21.9,
    low24h: 20.8,
  },
  {
    symbol: "UBA",
    name: "United Bank for Africa",
    price: 23.7,
    change: 0.95,
    changePercent: 4.18,
    volume: 114800000,
    high24h: 24.1,
    low24h: 22.6,
  },
  {
    symbol: "FBNH",
    name: "FBN Holdings Plc",
    price: 19.4,
    change: -0.6,
    changePercent: -3.0,
    volume: 140200000,
    high24h: 20.1,
    low24h: 18.9,
  },
  {
    symbol: "STANBIC",
    name: "Stanbic IBTC Holdings",
    price: 63.2,
    change: 1.8,
    changePercent: 2.93,
    volume: 8400000,
    high24h: 64.1,
    low24h: 61.5,
  },

  // CONSUMER GOODS
  {
    symbol: "NESTLE",
    name: "Nestlé Nigeria Plc",
    price: 1125,
    change: 15,
    changePercent: 1.35,
    volume: 820000,
    high24h: 1138,
    low24h: 1110,
  },
  {
    symbol: "NB",
    name: "Nigerian Breweries Plc",
    price: 49.8,
    change: -0.9,
    changePercent: -1.77,
    volume: 21300000,
    high24h: 50.9,
    low24h: 48.7,
  },
  {
    symbol: "INTBREW",
    name: "International Breweries",
    price: 6.45,
    change: 0.25,
    changePercent: 4.03,
    volume: 38400000,
    high24h: 6.6,
    low24h: 6.1,
  },
  {
    symbol: "UNILEVER",
    name: "Unilever Nigeria Plc",
    price: 38.4,
    change: 0.6,
    changePercent: 1.59,
    volume: 12500000,
    high24h: 38.9,
    low24h: 37.5,
  },
  {
    symbol: "PZ",
    name: "PZ Cussons Nigeria",
    price: 23.9,
    change: 0.8,
    changePercent: 3.46,
    volume: 7400000,
    high24h: 24.2,
    low24h: 22.8,
  },

  // INDUSTRIAL / ENERGY
  {
    symbol: "SEPLAT",
    name: "Seplat Energy Plc",
    price: 2780,
    change: 45,
    changePercent: 1.64,
    volume: 1950000,
    high24h: 2810,
    low24h: 2720,
  },
  {
    symbol: "TOTAL",
    name: "TotalEnergies Nigeria",
    price: 410,
    change: -6,
    changePercent: -1.44,
    volume: 4300000,
    high24h: 418,
    low24h: 402,
  },
  {
    symbol: "OANDO",
    name: "Oando Plc",
    price: 58.2,
    change: 2.4,
    changePercent: 4.3,
    volume: 67200000,
    high24h: 59.8,
    low24h: 55.6,
  },

  // INSURANCE / OTHERS
  {
    symbol: "AIICO",
    name: "AIICO Insurance Plc",
    price: 1.58,
    change: 0.06,
    changePercent: 3.95,
    volume: 98000000,
    high24h: 1.62,
    low24h: 1.5,
  },
  {
    symbol: "CORNERSTONE",
    name: "Cornerstone Insurance",
    price: 2.05,
    change: -0.05,
    changePercent: -2.38,
    volume: 24500000,
    high24h: 2.12,
    low24h: 1.98,
  },
  {
    symbol: "FIDELITYBK",
    name: "Fidelity Bank Plc",
    price: 13.6,
    change: 0.55,
    changePercent: 4.21,
    volume: 76500000,
    high24h: 13.9,
    low24h: 12.8,
  },
];

// Mock stats for landing page
export const mockStats = {
  totalVolume: "₦2.4T",
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
