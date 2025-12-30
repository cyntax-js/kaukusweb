import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Overview = ({ market }: { market?: import('@/data/mockTradingData').Market }) => {
  return (
    <div className="w-full h-full bg-[hsl(var(--trading-bg))] border-r border-[hsl(var(--trading-border))] overflow-y-auto p-6">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
          {market?.baseAsset?.slice(0,2) ?? 'NA'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{market?.baseAsset ?? 'Unknown'} <span className="text-[hsl(var(--trading-text-secondary))] font-normal">{market?.symbol ?? ''}</span></h2>
          <div className="text-white text-sm">Price: {(market?.price ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} {market?.quoteAsset ?? 'NGN'}</div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-white text-sm leading-relaxed mb-2">
          Dangote Cement Plc is Nigeria's largest cement producer and one of Africa's leading cement manufacturers. The company operates integrated cement plants across Nigeria and other African countries, with a strong market position in the Nigerian Stock Exchange. Dangote Cement is a subsidiary of the Dangote Group and plays a crucial role in Nigeria's infrastructure development....
        </p>
        <button className="text-[hsl(var(--trading-text-secondary))] text-sm hover:text-white transition-colors">
          Show more ↓
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Learn more</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs bg-[hsl(var(--trading-panel))] border-[hsl(var(--trading-border))] text-white hover:bg-[hsl(var(--trading-hover))] transition-colors">
            Official website <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
          <Button variant="outline" className="text-xs bg-[hsl(var(--trading-panel))] border-[hsl(var(--trading-border))] text-white hover:bg-[hsl(var(--trading-hover))] transition-colors">
            GitHub <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
          <Button variant="outline" className="text-xs bg-[hsl(var(--trading-panel))] border-[hsl(var(--trading-border))] text-white hover:bg-[hsl(var(--trading-hover))] transition-colors">
            Block explorer <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">Heat index ranking</span>
          <span className="text-white underline">No. 1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">Market cap ranking</span>
          <span className="text-white underline">No. 1</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">Market cap</span>
          <span className="text-white">₦8,253,450,000,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">Outstanding shares</span>
          <span className="text-white">17,040,000,000 shares</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">Sector</span>
          <span className="text-white">Industrial Goods / Building Materials</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">52-week high</span>
          <span className="text-white">₦512.50 (15/08/2024)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">52-week low</span>
          <span className="text-white">₦385.00 (12/01/2024)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">IPO date</span>
          <span className="text-white">26/10/2010</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">Exchange</span>
          <span className="text-white">Nigerian Exchange (NGX)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">IPO price</span>
          <span className="text-white">₦115.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">P/E ratio</span>
          <span className="text-white">12.45</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">Dividend yield</span>
          <span className="text-white">3.8%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--trading-text-secondary))]">EPS (Earnings per share)</span>
          <span className="text-white">₦39.00</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-white font-semibold mb-3">Social media</h3>
        <button className="w-8 h-8 rounded-full bg-[hsl(var(--trading-panel))] border border-[hsl(var(--trading-border))] flex items-center justify-center text-white hover:bg-[hsl(var(--trading-hover))] transition-colors">
          𝕏
        </button>
      </div>
    </div>
  );
};

export default Overview;
