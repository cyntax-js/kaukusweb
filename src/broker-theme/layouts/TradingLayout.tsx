/**
 * Trading Layout - Pro layout with configurable orderBookPosition: 'left' | 'right'
 */

import { type ReactNode } from 'react';
import { useTheme } from '@/broker-theme/config';

interface TradingLayoutProps {
  children?: ReactNode;
  renderChart?: () => ReactNode;
  renderOrderBook?: () => ReactNode;
  renderTradeForm?: () => ReactNode;
  renderPositions?: () => ReactNode;
  renderWatchlist?: () => ReactNode;
}

export const TradingLayout = ({ 
  renderChart, 
  renderOrderBook, 
  renderTradeForm, 
  renderPositions, 
  renderWatchlist 
}: TradingLayoutProps) => {
  const { config } = useTheme();
  const orderBookPosition = config.theme.layout.orderBookPosition || 'right';

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-12 gap-px bg-border overflow-hidden">
        {orderBookPosition === 'left' ? (
          <>
            <div className="col-span-2 bg-card flex flex-col overflow-hidden">
              {renderOrderBook?.()}
            </div>
            <div className="col-span-6 bg-card overflow-hidden">
              {renderChart?.()}
            </div>
            <div className="col-span-2 bg-card flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">{renderWatchlist?.()}</div>
              <div className="flex-1 overflow-hidden border-t border-border">{renderTradeForm?.()}</div>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-2 bg-card overflow-hidden">
              {renderWatchlist?.()}
            </div>
            <div className="col-span-6 bg-card overflow-hidden">
              {renderChart?.()}
            </div>
            <div className="col-span-2 bg-card flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">{renderOrderBook?.()}</div>
              <div className="flex-1 overflow-hidden border-t border-border">{renderTradeForm?.()}</div>
            </div>
          </>
        )}
      </div>
      <div className="h-48 bg-card border-t border-border overflow-auto">
        {renderPositions?.()}
      </div>
    </div>
  );
};
