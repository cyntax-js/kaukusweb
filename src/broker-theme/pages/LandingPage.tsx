/**
 * ============================================================
 * BROKER LANDING PAGE - Premium Stock Broker Aesthetic
 * ============================================================
 */

import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/broker-theme/config';

import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Layers, 
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  LineChart,
  PieChart,
  Wallet
} from 'lucide-react';
import { useEffect, useState } from 'react';

const serviceInfo = {
  spot: { title: 'Spot Trading', description: 'Buy and sell assets at current market prices with instant settlement', icon: <TrendingUp className="h-6 w-6" /> },
  futures: { title: 'Futures Trading', description: 'Trade contracts for future delivery with up to 100x leverage', icon: <BarChart3 className="h-6 w-6" /> },
  options: { title: 'Options Trading', description: 'Advanced derivatives strategies for sophisticated traders', icon: <Layers className="h-6 w-6" /> },
  private_markets: { title: 'Private Markets', description: 'Exclusive access to pre-IPO and private equity investments', icon: <Lock className="h-6 w-6" /> },
};

// Simulated live ticker data
const generateTickerData = () => [
  { symbol: 'AAPL', price: 189.45 + Math.random() * 2, change: 1.24 + Math.random() * 0.5 },
  { symbol: 'GOOGL', price: 141.32 + Math.random() * 2, change: -0.87 + Math.random() * 0.3 },
  { symbol: 'MSFT', price: 378.91 + Math.random() * 3, change: 2.15 + Math.random() * 0.4 },
  { symbol: 'AMZN', price: 178.25 + Math.random() * 2, change: 0.95 + Math.random() * 0.3 },
  { symbol: 'NVDA', price: 495.22 + Math.random() * 5, change: 3.45 + Math.random() * 0.5 },
  { symbol: 'TSLA', price: 248.50 + Math.random() * 3, change: -1.32 + Math.random() * 0.4 },
  { symbol: 'META', price: 505.75 + Math.random() * 4, change: 1.89 + Math.random() * 0.3 },
  { symbol: 'BRK.B', price: 363.20 + Math.random() * 2, change: 0.45 + Math.random() * 0.2 },
];

const LandingPage = () => {
  const { config } = useTheme();
  const location = useLocation();
  const { brokerName, services } = config;
  const [tickerData, setTickerData] = useState(generateTickerData());

  // Animate ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(generateTickerData());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const publicPrefix = location.pathname.startsWith('/app') ? '/app' : '/preview';
  const appPrefix = location.pathname.startsWith('/app') ? '/app' : '/preview/app';

  const defaultMarketPath = services.includes('spot') 
    ? `${appPrefix}/markets/spot` 
    : `${appPrefix}/markets`;

  return (
    <div className="min-h-screen bg-background">

      {/* Live Ticker Bar */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="flex animate-[slide-left_30s_linear_infinite]">
          <div className="flex shrink-0 gap-8 py-2 px-4">
            {[...tickerData, ...tickerData].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
                <span className="font-semibold text-foreground">{item.symbol}</span>
                <span className="text-muted-foreground">${item.price.toFixed(2)}</span>
                <span className={`flex items-center gap-0.5 ${item.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {item.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ 
            backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                <Activity className="h-4 w-4" />
                <span>Live Trading Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in stagger-1">
                Invest in the future with{' '}
                <span className="gradient-text">{brokerName || 'Your Platform'}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in stagger-2">
                Access institutional-grade trading infrastructure. Real-time data, advanced charting, and lightning-fast execution for serious investors.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in stagger-3">
                <Link to={defaultMarketPath}>
                  <Button size="lg" className="gap-2 gradient-primary hover:opacity-90 transition-opacity text-primary-foreground">
                    Start Trading <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`${publicPrefix}/signup`}>
                  <Button size="lg" variant="outline" className="gap-2">
                    Open Account <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border animate-fade-in stagger-4">
                <div>
                  <div className="text-2xl font-bold text-foreground">$50B+</div>
                  <div className="text-sm text-muted-foreground">Trading Volume</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">250K+</div>
                  <div className="text-sm text-muted-foreground">Active Traders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right - Trading Dashboard Preview */}
            <div className="relative animate-fade-in stagger-3">
              <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden hover-lift">
                {/* Mock Chart Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">AAPL</div>
                      <div className="text-sm text-muted-foreground">Apple Inc.</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">$189.45</div>
                    <div className="text-sm text-success flex items-center justify-end gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +2.34%
                    </div>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="p-4 h-48 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,100 Q50,80 100,90 T200,70 T300,50 T400,30 L400,150 L0,150 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M0,100 Q50,80 100,90 T200,70 T300,50 T400,30"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Mock Order Book Preview */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground mb-2">BIDS</div>
                    {[188.50, 188.45, 188.40].map((price, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-success">{price.toFixed(2)}</span>
                        <span className="text-muted-foreground">{(1000 + i * 500).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground mb-2">ASKS</div>
                    {[189.50, 189.55, 189.60].map((price, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-destructive">{price.toFixed(2)}</span>
                        <span className="text-muted-foreground">{(800 + i * 400).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl border border-border p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Portfolio</div>
                    <div className="text-sm font-semibold text-success">+12.5%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl border border-border p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Balance</div>
                    <div className="text-sm font-semibold text-foreground">$24,500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ 
            backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trade Every Market
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive trading solutions for every investment strategy
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const info = serviceInfo[service];
                return (
                  <div 
                    key={service} 
                    className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{info.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{info.description}</p>
                    <ArrowRight className="h-5 w-5 text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Serious Traders
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools and infrastructure trusted by institutions worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="h-6 w-6" />, 
                title: 'Sub-Millisecond Execution', 
                desc: 'Direct market access with industry-leading order execution speeds',
                metric: '<1ms'
              },
              { 
                icon: <Shield className="h-6 w-6" />, 
                title: 'Bank-Grade Security', 
                desc: 'Multi-layer protection with cold storage and insurance coverage',
                metric: '$100M+'
              },
              { 
                icon: <Globe className="h-6 w-6" />, 
                title: 'Global Markets', 
                desc: 'Access 10,000+ instruments across major global exchanges',
                metric: '10K+'
              },
              { 
                icon: <LineChart className="h-6 w-6" />, 
                title: 'Advanced Charting', 
                desc: 'Professional TradingView charts with 100+ technical indicators',
                metric: '100+'
              },
              { 
                icon: <PieChart className="h-6 w-6" />, 
                title: 'Portfolio Analytics', 
                desc: 'Real-time P&L tracking, risk metrics, and performance insights',
                metric: 'Real-time'
              },
              { 
                icon: <Activity className="h-6 w-6" />, 
                title: '24/7 Trading', 
                desc: 'Trade around the clock with always-on market access',
                metric: '24/7'
              },
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className="group p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-2xl font-bold text-primary">{feature.metric}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Start Your Trading Journey Today
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg">
            Join over 250,000 traders who trust {brokerName || 'us'} for their investments. Open your free account in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={`${publicPrefix}/signup`}>
              <Button size="lg" variant="secondary" className="gap-2 text-base">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={`${appPrefix}/markets`}>
              <Button size="lg" variant="ghost" className="gap-2 text-primary-foreground hover:bg-primary-foreground/10">
                Explore Markets <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-card/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <span className="text-xl font-bold text-foreground">{brokerName || 'Broker'}</span>
              <p className="text-sm text-muted-foreground mt-3">
                Professional trading platform for modern investors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link to={`${appPrefix}/markets`} className="block text-muted-foreground hover:text-primary transition-colors">Markets</Link>
                <Link to={`${appPrefix}/portfolio`} className="block text-muted-foreground hover:text-primary transition-colors">Portfolio</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <Link to={`${publicPrefix}/about`} className="block text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link to={`${publicPrefix}/legal`} className="block text-muted-foreground hover:text-primary transition-colors">Legal</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <span className="block text-muted-foreground">help@{brokerName?.toLowerCase().replace(/\s/g, '') || 'broker'}.com</span>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {brokerName || 'Broker'}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to={`${publicPrefix}/legal`} className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to={`${publicPrefix}/legal`} className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
