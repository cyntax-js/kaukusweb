import { useMemo } from 'react';
import type { BrokerTheme } from '@/broker-theme/config/types';
import { Button } from '@/components/ui/button';
import { TrendingUp, Menu, User, Search, Star, BarChart3 } from 'lucide-react';

interface ThemePreviewCardProps {
  theme: BrokerTheme;
  brokerName: string;
}

/**
 * Live theme preview component that renders a mini broker site preview
 * Shows header, content, and trading elements with the selected theme
 */
export const ThemePreviewCard = ({ theme, brokerName }: ThemePreviewCardProps) => {
  const styles = useMemo(() => ({
    primary: `hsl(${theme.colors.primary})`,
    accent: `hsl(${theme.colors.accent})`,
    background: `hsl(${theme.colors.background})`,
    foreground: `hsl(${theme.colors.foreground})`,
  }), [theme.colors]);

  const isDark = useMemo(() => {
    const parts = theme.colors.background.split(' ').map(p => parseFloat(p));
    return parts.length >= 3 && parts[2] < 50;
  }, [theme.colors.background]);

  const mutedForeground = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)';

  return (
    <div 
      className="rounded-lg border overflow-hidden shadow-lg"
      style={{ 
        backgroundColor: styles.background, 
        borderColor: border,
        fontFamily: theme.typography.fontFamily 
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: border }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ backgroundColor: styles.primary }}
          >
            <TrendingUp className="w-3 h-3" style={{ color: isDark ? '#000' : '#fff' }} />
          </div>
          <span 
            className="font-semibold text-sm"
            style={{ color: styles.foreground }}
          >
            {brokerName || 'Your Broker'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: mutedForeground }}>Markets</span>
          <span className="text-xs" style={{ color: mutedForeground }}>Trade</span>
          <div 
            className="px-2 py-1 rounded text-xs"
            style={{ backgroundColor: styles.primary, color: isDark ? '#000' : '#fff' }}
          >
            Login
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-6 text-center">
        <h3 
          className="text-lg font-bold mb-2"
          style={{ color: styles.foreground }}
        >
          Trade with <span style={{ color: styles.primary }}>{brokerName || 'Confidence'}</span>
        </h3>
        <p className="text-xs mb-4" style={{ color: mutedForeground }}>
          Access global markets with institutional-grade infrastructure
        </p>
        <div className="flex justify-center gap-2">
          <div 
            className="px-3 py-1.5 rounded text-xs font-medium"
            style={{ backgroundColor: styles.primary, color: isDark ? '#000' : '#fff' }}
          >
            Start Trading
          </div>
          <div 
            className="px-3 py-1.5 rounded text-xs font-medium border"
            style={{ borderColor: border, color: styles.foreground }}
          >
            View Markets
          </div>
        </div>
      </div>

      {/* Market Preview */}
      <div className="px-4 pb-4">
        <div 
          className="rounded-lg p-3"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Search className="w-3 h-3" style={{ color: mutedForeground }} />
              <span className="text-xs" style={{ color: mutedForeground }}>Search markets...</span>
            </div>
            <div className="flex gap-1">
              <span 
                className="px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: styles.primary, color: isDark ? '#000' : '#fff' }}
              >
                Spot
              </span>
              <span 
                className="px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: cardBg, color: mutedForeground }}
              >
                Futures
              </span>
            </div>
          </div>

          {/* Market rows */}
          {[
            { symbol: 'BTC/USD', price: '42,583.20', change: '+2.34%', up: true },
            { symbol: 'ETH/USD', price: '2,284.50', change: '+1.87%', up: true },
            { symbol: 'SOL/USD', price: '98.42', change: '-0.52%', up: false },
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center justify-between py-2 border-b last:border-0"
              style={{ borderColor: border }}
            >
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3" style={{ color: mutedForeground }} />
                <div>
                  <div className="text-xs font-medium" style={{ color: styles.foreground }}>
                    {item.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium" style={{ color: styles.foreground }}>
                  ${item.price}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: item.up ? styles.accent : '#ef4444' }}
                >
                  {item.change}
                </div>
              </div>
              <div 
                className="px-2 py-1 rounded text-xs"
                style={{ backgroundColor: styles.primary, color: isDark ? '#000' : '#fff' }}
              >
                Trade
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout indicator */}
      <div 
        className="px-4 py-2 border-t text-center"
        style={{ borderColor: border }}
      >
        <span className="text-xs" style={{ color: mutedForeground }}>
          Layout: {theme.layout.auth} auth • {theme.layout.dashboard} nav • {theme.layout.orderBookPosition} orderbook
        </span>
      </div>
    </div>
  );
};

export default ThemePreviewCard;
