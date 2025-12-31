# Broker Platform Configuration

## Quick Start for Developers

### File Structure

```
src/broker-theme/
├── config/
│   ├── types.ts          # TypeScript types (BrokerConfig schema)
│   ├── themes.ts         # 🎨 PRE-BUILT THEMES (add new themes here!)
│   ├── engine.ts         # Theme engine (applies CSS, loads configs)
│   └── index.ts          # Public exports
└── mocks/
    └── brokers.ts        # 📝 SAMPLE BROKER CONFIGS (for testing)
```

---

## 🎨 How to Add a New Theme

Open `src/broker-theme/config/themes.ts` and add to the `THEME_PRESETS` array:

```typescript
{
  id: 'my-new-theme',
  name: 'My New Theme',
  description: 'A custom theme for crypto traders',
  preview: {
    colors: { primary: '142 71% 45%', accent: '48 96% 53%' },
    isDark: true,
  },
  theme: {
    colors: {
      primary: '142 71% 45%',      // HSL format: "hue saturation% lightness%"
      accent: '48 96% 53%',
      background: '222 47% 6%',
      foreground: '210 40% 98%',
    },
    typography: {
      fontFamily: 'JetBrains Mono', // See AVAILABLE_FONTS below
      scale: 'md',                  // 'sm' | 'md' | 'lg'
    },
    layout: {
      auth: 'split',               // 'centered' | 'split' | 'image-left'
      dashboard: 'sidebar',        // 'sidebar' | 'topnav'
      orderBookPosition: 'right',  // 'left' | 'right'
    },
    components: {
      buttonSize: 'md',            // 'sm' | 'md' | 'lg'
      borderRadius: 'md',          // 'none' | 'sm' | 'md' | 'lg' | 'full'
      cardStyle: 'elevated',       // 'flat' | 'bordered' | 'elevated'
    },
  },
}
```

---

## 🔧 How to Customize Theme Properties

All customizable properties are defined in `types.ts`:

### Colors (HSL format)

- `primary` - Main brand color (buttons, links)
- `accent` - Secondary color (highlights, success states)
- `background` - Page background
- `foreground` - Text color

### Typography

- `fontFamily` - Any font from `AVAILABLE_FONTS` in themes.ts
- `scale` - Base font size: `'sm'` (14px) | `'md'` (16px) | `'lg'` (18px)

### Layout

- `auth` - Login page layout: `'centered'` | `'split'` | `'image-left'`
- `dashboard` - Dashboard navigation: `'sidebar'` | `'topnav'`
- `orderBookPosition` - Trading page: `'left'` | `'right'`

### Components (NEW!)

- `buttonSize` - Button sizing: `'sm'` | `'md'` | `'lg'`
- `borderRadius` - Corner rounding: `'none'` | `'sm'` | `'md'` | `'lg'` | `'full'`
- `cardStyle` - Card appearance: `'flat'` | `'bordered'` | `'elevated'`

---

## 📝 How to Add a Sample Broker (for testing)

Open `src/broker-theme/mocks/brokers.ts` and add to the array:

```typescript
{
  brokerId: 'my-broker-001',
  brokerName: 'My Broker',
  subdomain: 'mybroker',           // Access via ?broker=mybroker
  services: ['stock', 'futures'],
  template: 'my-new-theme',        // Reference a theme from themes.ts
  theme: { /* override theme here if needed */ },
  pages: { landing: true, about: true, /* ... */ },
  branding: { logoUrl: '/logo.png', faviconUrl: '/favicon.ico' },
  status: 'active',
}
```

---

## 🚀 How the Engine Works

1. **On page load**: `initializeTheme()` detects subdomain (e.g., `?broker=fbs`)
2. **Config lookup**: Finds broker config from registry or API
3. **Apply theme**: Sets CSS variables for colors, loads fonts
4. **Apply branding**: Updates page title and favicon
5. **Store state**: Zustand store holds the active config

---

## Available Fonts

- Inter
- Plus Jakarta Sans
- JetBrains Mono
- Roboto
- Space Grotesk
- DM Sans
- Outfit
- Manrope
- Poppins
- Sora
