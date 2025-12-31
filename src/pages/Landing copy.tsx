import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { mockStats, mockMarkets } from "@/mocks/data";
import { useState, useEffect } from "react";

// Market Ticker Component
function MarketTicker() {
  const [markets, setMarkets] = useState(mockMarkets);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prev) =>
        prev.map((market) => ({
          ...market,
          price: market.price * (1 + (Math.random() - 0.5) * 0.002),
          change: market.change + (Math.random() - 0.5) * 0.1,
          changePercent: market.changePercent + (Math.random() - 0.5) * 0.05,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border-y border-border overflow-hidden">
      <div className="flex animate-ticker">
        {[...markets, ...markets].map((market, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-3 border-r border-border whitespace-nowrap"
          >
            <span className="font-semibold">{market.symbol}</span>
            <span className="font-mono">${market.price.toFixed(2)}</span>
            <span
              className={
                market.change >= 0 ? "text-success" : "text-destructive"
              }
            >
              {market.change >= 0 ? "+" : ""}
              {market.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Stats Component
function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        { label: "Total Volume", value: mockStats.totalVolume },
        { label: "Active Brokers", value: mockStats.activeBrokers },
        { label: "Active Dealers", value: mockStats.activeDealers },
        { label: "Markets", value: mockStats.marketsAvailable },
        { label: "Daily Transactions", value: mockStats.dailyTransactions },
        { label: "Countries", value: mockStats.countries },
      ].map((stat, i) => (
        <Card key={i} className="p-4 text-center hover-lift">
          <div className="text-2xl md:text-3xl font-bold gradient-text">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
}

// Features Grid
function FeaturesGrid() {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-grade security with multi-layer protection, SOC 2 compliance, and real-time threat monitoring.",
    },
    {
      icon: Zap,
      title: "Ultra-Low Latency",
      description:
        "Sub-millisecond order execution with co-located servers in major financial centers worldwide.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Access 12,500+ instruments across 180+ countries with 24/7 market connectivity.",
    },
    {
      icon: BarChart3,
      title: "Deep Liquidity",
      description:
        "Aggregated liquidity from top-tier banks and market makers ensuring tight spreads.",
    },
    {
      icon: Users,
      title: "Broker as a Service",
      description:
        "Launch your broker platform in days with our white-label solution and customizable templates.",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description:
        "Real-time dashboards, reporting tools, and insights to optimize your trading operations.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <Card
          key={i}
          className="p-6 hover-lift card-shine opacity-0 animate-fade-in"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground text-sm">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
}

// For Brokers/Dealers Section
function AudienceCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* For Brokers */}
      <Card className="p-8 hover-lift relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-bl-full" />
        <h3 className="text-2xl font-bold mb-4">For Brokers</h3>
        <p className="text-muted-foreground mb-6">
          Launch your broker platform with our comprehensive Broker-as-a-Service
          solution. Get everything from trading infrastructure to white-label UI
          templates.
        </p>
        <ul className="space-y-3 mb-6">
          {[
            "White-label trading platforms",
            "Customizable templates & themes",
            "User management tools",
            "Fee & commission settings",
            "Analytics dashboard",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success" />
              {item}
            </li>
          ))}
        </ul>
        <Button asChild className="shadow-glow">
          <Link to="/signup">
            Become a Broker <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </Card>

      {/* For Dealers */}
      <Card className="p-8 hover-lift relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-bl-full" />
        <h3 className="text-2xl font-bold mb-4">For Dealers</h3>
        <p className="text-muted-foreground mb-6">
          Provide liquidity to our global marketplace. Connect your institution
          and participate in market making across multiple asset classes.
        </p>
        <ul className="space-y-3 mb-6">
          {[
            "Direct market access",
            "Real-time order flow",
            "Risk management tools",
            "Institutional-grade API",
            "Dedicated support",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success" />
              {item}
            </li>
          ))}
        </ul>
        <Button variant="outline" asChild>
          <Link to="/signup">
            Become a Dealer <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Trusted by 1,200+ brokers worldwide
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight opacity-0 animate-fade-in stagger-1">
              The Infrastructure for{" "}
              <span className="gradient-text">Global Trading</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in stagger-2">
              Enterprise-grade stock liquidity provider powering brokers and
              dealers. Access deep liquidity, deploy your platform, and scale to
              millions of users.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in stagger-3">
              <Button
                size="lg"
                asChild
                className="shadow-glow hover:shadow-glow-lg transition-shadow"
              >
                <Link to="/signup">
                  Start Trading <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Ticker */}
      <MarketTicker />

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <StatsSection />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Scale
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to operate a world-class trading
              infrastructure
            </p>
          </div>
          <FeaturesGrid />
        </div>
      </section>

      {/* For Brokers/Dealers */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a broker serving retail traders or a dealer
              providing liquidity, ContiSX has the infrastructure you need.
            </p>
          </div>
          <AudienceCards />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="gradient-primary p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of brokers and dealers already using ContiSX to
                power their trading operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
