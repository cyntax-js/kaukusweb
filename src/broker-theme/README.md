# Broker Theme System

Everything related to **broker-themed trading platforms** lives in this folder.  
New developers can find all broker theme code here without searching across the codebase.

## Folder Structure

```
broker-theme/
├── api/              # API services for broker themes (markets, trading, portfolio, user)
├── components/       # Reusable UI components (header, footer, buttons, etc.)
├── config/           # Theme engine, types, defaults, presets
├── mocks/            # Mock broker configurations for development
├── pages/            # Broker runtime pages (landing, login, trading, etc.)
└── index.ts          # Main export file
```

## Quick Start

### 1. Understanding the System

Each broker gets a unique subdomain (e.g., `fbs.ContiSX.com`). When a user visits:

1. The theme engine detects the subdomain
2. Loads the broker's configuration
3. Applies their colors, fonts, and layout
4. Shows only the services they've enabled

### 2. Creating a New Broker Theme

Add a new entry to `mocks/brokers.ts`:

```typescript
{
  brokerId: 'mybroke-001',
  brokerName: 'My Broker',
  subdomain: 'mybroker',          // Access via mybroker.localhost:8080
  services: ['stock', 'futures'],  // What trading services are enabled
  template: 'modern',             // Base template
  theme: {
    colors: {
      primary: '217 91% 50%',     // HSL format
      accent: '162 63% 45%',
      background: '0 0% 100%',
      foreground: '222 47% 11%',
    },
    typography: {
      fontFamily: 'Inter',
      scale: 'md',
    },
    layout: {
      auth: 'centered',           // 'centered' | 'split' | 'image-left'
      dashboard: 'sidebar',       // 'sidebar' | 'topnav'
      trading: 'simple',          // 'simple' | 'pro'
    },
  },
  // ... rest of config
}
```

### 3. Testing Your Theme

Open in browser:

- `http://mybroker.localhost:8080/preview` - Landing page
- `http://mybroker.localhost:8080/preview/login` - Login page
- `http://mybroker.localhost:8080/preview/markets` - Markets page

Or use query param:

- `http://localhost:8080/preview?broker=mybroker`

### 4. Calling APIs in Theme Pages

All API calls go through `broker-theme/api/`:

```typescript
import { marketsApi } from "@/broker-theme/api";

// Fetch available markets
const markets = await marketsApi.getMarkets("stock");

// Get market details
const details = await marketsApi.getMarketDetails("BTC-USDT");
```

### 5. Using Theme Components

```typescript
import { ThemeHeader, ThemeFooter } from "@/broker-theme/components";
import { useBrokerConfig } from "@/broker-theme/config";

function MyPage() {
  const config = useBrokerConfig();

  return (
    <div>
      <ThemeHeader config={config} />
      {/* Your content */}
      <ThemeFooter config={config} />
    </div>
  );
}
```

## API Reference

### Theme Configuration Hooks

| Hook                         | Returns           | Description                            |
| ---------------------------- | ----------------- | -------------------------------------- |
| `useBrokerConfig()`          | `BrokerConfig`    | Full broker configuration              |
| `useBrokerTheme()`           | `BrokerTheme`     | Just the theme (colors, fonts, layout) |
| `useBrokerServices()`        | `BrokerService[]` | Enabled services array                 |
| `useServiceEnabled('stock')` | `boolean`         | Check if a service is enabled          |
| `usePageEnabled('markets')`  | `boolean`         | Check if a page is enabled             |

### API Services

| Service        | Description                      |
| -------------- | -------------------------------- |
| `marketsApi`   | Fetch markets, pairs, price data |
| `tradingApi`   | Place orders, manage positions   |
| `portfolioApi` | Holdings, transactions, P&L      |
| `userApi`      | Profile, preferences, KYC        |

## File Reference

| File                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `config/types.ts`    | TypeScript types for broker config       |
| `config/defaults.ts` | Default values and template presets      |
| `config/engine.ts`   | Theme store, loader, and CSS application |
| `api/*.ts`           | API service files (one per domain)       |
| `pages/*.tsx`        | Broker page components                   |
| `components/*.tsx`   | Shared UI components                     |
| `mocks/brokers.ts`   | Mock broker data for development         |
