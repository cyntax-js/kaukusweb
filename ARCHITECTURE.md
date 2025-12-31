# ContiSX Platform Architecture

## Overview

ContiSX is a **Shopify-like platform for stock brokers**. Brokers configure their trading platform through a dashboard, and the system generates a white-label trading platform based on their configuration.

## Project Structure

```
src/
├── api/                        # 🔌 PLATFORM API SERVICES
│   └── platform/               # ContiSX admin APIs
│       ├── auth.ts             # Broker/dealer login, signup
│       ├── broker.ts           # Broker applications, management
│       └── dealer.ts           # Dealer applications
│
├── broker-theme/               # 🎨 BROKER THEME SYSTEM (Self-contained)
│   ├── api/                    # Broker-specific APIs (for end users)
│   │   ├── markets.ts          # Market pairs, prices
│   │   ├── trading.ts          # Orders, positions
│   │   ├── portfolio.ts        # Holdings, transactions
│   │   └── user.ts             # End user auth
│   │
│   ├── config/                 # Theme engine
│   │   ├── types.ts            # BrokerConfig, BrokerTheme types
│   │   ├── defaults.ts         # Template presets
│   │   ├── engine.ts           # Theme store, loader, CSS application
│   │   └── provider.tsx        # React context provider
│   │
│   ├── layouts/                # Layout components
│   │   ├── AuthLayout.tsx      # Login/signup layouts
│   │   ├── DashboardLayout.tsx # Sidebar/topnav layouts
│   │   └── TradingLayout.tsx   # Simple/pro trading layouts
│   │
│   ├── mocks/                  # Mock broker data
│   │   └── brokers.ts          # Sample configurations
│   │
│   ├── pages/                  # Broker runtime pages
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── MarketsPage.tsx
│   │   ├── TradingPage.tsx
│   │   ├── PortfolioPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   └── README.md               # Detailed broker theme documentation
│
├── pages/                      # 📄 PLATFORM PAGES
│   ├── Landing.tsx             # ContiSX landing page
│   ├── Login.tsx               # ContiSX login
│   ├── Signup.tsx              # ContiSX signup
│   │
│   ├── broker/                 # Broker-related pages
│   │   ├── dashboard/          # Broker admin dashboard
│   │   │   ├── BrokerDashboard.tsx
│   │   │   ├── BrokerUsers.tsx
│   │   │   └── deploy/         # Deployment wizard
│   │   │
│   │   ├── BrokerApplication.tsx
│   │   └── BrokerRequirements.tsx
│   │
│   └── dealer/                 # Dealer application pages
│
├── stores/                     # 🗄️ ZUSTAND STORES
│   ├── authStore.ts            # Platform auth state
│   ├── brokerStore.ts          # Broker application state
│   └── brokerDeploymentStore.ts # Deployment wizard state
│
├── components/                 # 🧩 SHARED COMPONENTS
│   ├── ui/                     # Shadcn UI components
│   └── layout/                 # Platform layout components
│
└── mocks/                      # 🎭 PLATFORM MOCK DATA
    └── data.ts                 # Platform mock data
```

---

## Two Main Areas

### 1. Platform (ContiSX Admin)

- **Location**: `src/api/platform/`, `src/pages/`, `src/stores/`
- **Purpose**: Broker registration, dashboard, deployment wizard
- **APIs**: `@/api/platform`

### 2. Broker Themes (End User Trading)

- **Location**: `src/broker-theme/` (self-contained)
- **Purpose**: The white-label trading platform for end users
- **APIs**: `@/broker-theme/api`

---

## Key Concepts

### BrokerConfig (Single Source of Truth)

Every broker is defined by a `BrokerConfig` object:

```typescript
interface BrokerConfig {
  brokerId: string;
  brokerName: string;
  subdomain: string; // e.g., "fbs" → fbs.ContiSX.com

  services: BrokerService[]; // ['spot', 'futures', 'options', 'private_markets']

  template: BrokerTemplate; // 'classic' | 'modern' | 'professional' | etc.
  theme: BrokerTheme; // Colors, typography, layout variants

  pages: BrokerPages; // Which pages are enabled
  branding: { logoUrl?; faviconUrl? };

  status: "draft" | "active";
}
```

### Theme Engine

The theme engine loads and applies broker configuration:

```typescript
// In any broker page:
import { useTheme } from "@/broker-theme/config";

function MyPage() {
  const { config, isLoaded } = useTheme();

  // Render based on config
  return <h1>{config.brokerName}</h1>;
}
```

### Subdomain Routing

Brokers are identified by subdomain:

- `fbs.localhost:8080/preview` → loads FBS config
- `cryptomax.localhost:8080/preview` → loads CryptoMax config

---

## How To...

### Add a New Platform API

```typescript
// src/api/platform/broker.ts
export async function myNewEndpoint(data: MyData): Promise<Result> {
  return mockResponse(mockData, DELAYS.MEDIUM);
}
```

### Add a New Broker Theme API

```typescript
// src/broker-theme/api/trading.ts
export async function myNewEndpoint(data: MyData): Promise<Result> {
  return delay(200).then(() => mockData);
}
```

### Create a New Broker Theme

1. Add config to `src/broker-theme/mocks/brokers.ts`
2. Test at `http://mybroker.localhost:8080/preview`

See `src/broker-theme/README.md` for full details.

---

## URL Structure

### Platform (ContiSX Admin)

- `/` - Landing page
- `/login` - Platform login
- `/signup` - Platform signup
- `/broker/dashboard` - Broker admin dashboard
- `/broker/dashboard/deploy` - Deployment wizard

### Broker Themes (End Users)

- `/preview` - Broker landing page
- `/preview/login` - Broker login
- `/preview/signup` - Broker signup
- `/preview/markets` - Markets list
- `/preview/markets/:marketType` - Filtered markets
- `/preview/markets/:marketType/:pair` - Trading page
- `/preview/portfolio` - User portfolio
- `/preview/settings` - User settings

---

## Replacing Mocks with Real APIs

1. Find the API file in `src/api/platform/` or `src/broker-theme/api/`
2. Replace mock implementations with actual `fetch()` calls
3. Keep the same function signatures for compatibility

Example:

```typescript
// Before (mock)
export async function login(request: LoginRequest): Promise<AuthResponse> {
  return delay(500).then(() => ({ user, token }));
}

// After (real)
export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.json();
}
```
