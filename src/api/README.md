# API Layer

This folder contains all API services for the application. APIs are separated into two categories:

## Structure

```
api/
├── platform/        # ContiSX platform APIs (used by main platform)
│   ├── auth.ts      # Authentication (login, signup, logout)
│   ├── broker.ts    # Broker management (applications, dashboard)
│   └── dealer.ts    # Dealer management (applications)
│
├── broker/          # Broker runtime APIs (used by broker themes)
│   ├── markets.ts   # Market data and pairs
│   ├── trading.ts   # Trading operations (orders, positions)
│   ├── portfolio.ts # User portfolio data
│   └── user.ts      # User account management
│
└── client.ts        # Base API client utilities
```

## Usage

### Platform APIs (for ContiSX admin/dashboard)

```typescript
import { platformApi } from "@/api/platform";

// Authentication
await platformApi.auth.login(email, password);
await platformApi.auth.signup(email, password, name);

// Broker management
await platformApi.broker.submitApplication(data);
await platformApi.broker.getDashboardStats();
```

### Broker APIs (for broker themes)

```typescript
import { brokerApi } from "@/api/broker";

// Markets
const pairs = await brokerApi.markets.getPairs("stock");
const pair = await brokerApi.markets.getPair("stock", "BTC-USDT");

// Trading
await brokerApi.trading.placeOrder(orderData);
const positions = await brokerApi.trading.getPositions();

// Portfolio
const holdings = await brokerApi.portfolio.getHoldings();
```

## Adding New APIs

1. Create a new file in the appropriate folder (platform/ or broker/)
2. Export functions that return Promises
3. Use the mock utilities from `client.ts` for simulated responses
4. Add to the barrel export in the folder's index.ts

## Replacing Mocks with Real APIs

When ready to integrate real APIs:

1. Update the API functions to call your actual endpoints
2. Remove the `simulateDelay()` calls
3. Add proper error handling and response parsing
4. The rest of the codebase should work unchanged
