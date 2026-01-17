/**
 * Trading Grid Component
 * Handles the layout swap between orderbook left/right positions
 */

import { ReactNode } from 'react';

interface TradingGridProps {
  orderBookPosition: 'left' | 'right';
  marketsPanel: ReactNode;
  chartPanel: ReactNode;
  orderbookPanel: ReactNode;
}

export const TradingGrid = ({
  orderBookPosition,
  marketsPanel,
  chartPanel,
  orderbookPanel,
}: TradingGridProps) => {
  const panels = orderBookPosition === 'left'
    ? [orderbookPanel, chartPanel, marketsPanel]
    : [marketsPanel, chartPanel, orderbookPanel];

  return (
    <div className="grid grid-cols-12 gap-px bg-border scrollbar-hide">
      <div className="col-span-2 bg-card flex flex-col scrollbar-hide h-[calc(100vh-200px)]">
        {panels[0]}
      </div>
      <div className="col-span-8 bg-card flex flex-col scrollbar-hide h-[calc(100vh-200px)] overflow-y-auto">
        {panels[1]}
      </div>
      <div className="col-span-2 bg-card flex flex-col scrollbar-hide h-[calc(100vh-200px)]">
        {panels[2]}
      </div>
    </div>
  );
};
