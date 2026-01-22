/**
 * ============================================================
 * BROKER ABOUT PAGE - Premium Stock Broker Aesthetic
 * ============================================================
 */

import { Link } from "react-router-dom";
import { useTheme } from "@/broker-theme/config";
import { useBrokerPaths } from "@/broker-theme/hooks/useBrokerPaths";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe,
  Clock,
  Target,
  Zap,
  BarChart3,
} from "lucide-react";

const AboutPage = () => {
  const { config } = useTheme();
  const { publicPrefix, appPrefix } = useBrokerPaths();
  const { brokerName } = config;

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "Enterprise-grade security with cold storage and insurance protection for all assets.",
    },
    {
      icon: Users,
      title: "Client Focused",
      description:
        "Every feature built based on what professional traders actually need.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "Cutting-edge technology pushing the boundaries of trading infrastructure.",
    },
    {
      icon: Award,
      title: "Transparency",
      description: "Clear pricing, real-time data, and no hidden fees ever.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      event: "Founded with a vision to democratize institutional trading",
    },
    { year: "2021", event: "Launched stock trading with 100+ global assets" },
    { year: "2022", event: "Expanded to futures, options, and derivatives" },
    { year: "2023", event: "Surpassed 250,000 active traders globally" },
    {
      year: "2024",
      event: "Launched private markets and alternative investments",
    },
  ];

  const stats = [
    { label: "Active Traders", value: "250K+", icon: Users },
    { label: "Daily Volume", value: "₦5B+", icon: BarChart3 },
    { label: "Global Markets", value: "10K+", icon: Globe },
    { label: "Platform Uptime", value: "99.99%", icon: Zap },
  ];

  const leadership = [
    {
      name: "Executive Team",
      count: "12",
      focus:
        "Former executives from Goldman Sachs, Morgan Stanley, and Bloomberg",
    },
    {
      name: "Engineering",
      count: "150+",
      focus: "World-class engineers from FAANG and top fintech companies",
    },
    {
      name: "Compliance",
      count: "25+",
      focus: "Regulatory experts ensuring global compliance",
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Building2 className="h-4 w-4" />
              <span>About {brokerName}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in stagger-1">
              Building the Future of{" "}
              <span className="gradient-text">Capital Markets</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in stagger-2">
              We're on a mission to give everyone access to institutional-grade
              trading infrastructure. No compromises on speed, security, or
              sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At {brokerName}, we believe that sophisticated trading tools
                shouldn't be reserved for Wall Street. We're building technology
                that empowers individual investors with the same capabilities
                used by the world's largest institutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every millisecond matters. Every security measure counts. Every
                feature is designed with one goal: helping you trade with
                confidence.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-xl" />
              <div className="relative bg-card rounded-2xl border border-border p-8 space-y-5">
                {[
                  { icon: Target, text: "Institutional-grade execution speed" },
                  { icon: Shield, text: "₦100M+ insurance protection" },
                  { icon: Clock, text: "24/7 global market access" },
                  { icon: Zap, text: "Real-time streaming data" },
                  { icon: Globe, text: "Regulated in 15+ jurisdictions" },
                ].map((item, index) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              World-Class Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built by experts from the world's leading financial institutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map((team, index) => (
              <div
                key={team.name}
                className="bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {team.count}
                </div>
                <div className="text-lg font-semibold text-foreground mb-3">
                  {team.name}
                </div>
                <p className="text-muted-foreground text-sm">{team.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From startup to industry leader in record time
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className="relative flex gap-6 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative z-10 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 ring-4 ring-background">
                      {milestone.year}
                    </div>
                    <div className="bg-card rounded-xl border border-border p-5 flex-1 hover:border-primary/50 transition-colors">
                      <p className="text-foreground">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Trade with {brokerName}?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg">
            Join 250,000+ traders who trust us for their investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`${publicPrefix}/signup`}>
              <Button size="lg" variant="secondary" className="gap-2">
                Create Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={`${appPrefix}/markets`}>
              <Button
                size="lg"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 gap-2"
              >
                Explore Markets
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-semibold text-foreground">{brokerName}</span>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to={`${publicPrefix}/about`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to={`${publicPrefix}/legal`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Legal
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {brokerName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
