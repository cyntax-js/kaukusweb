import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Shield, Globe, Award, ArrowRight } from "lucide-react";

const team = [
  { name: "Sarah Chen", role: "CEO & Co-founder", image: "SC" },
  { name: "Michael Torres", role: "CTO & Co-founder", image: "MT" },
  { name: "Emily Watson", role: "Chief Risk Officer", image: "EW" },
  { name: "James Park", role: "Head of Product", image: "JP" },
];

const milestones = [
  {
    year: "2019",
    title: "Founded",
    description:
      "ContisX was founded with a vision to democratize trading infrastructure.",
  },
  {
    year: "2020",
    title: "First Broker",
    description: "Onboarded our first broker partner, proving the concept.",
  },
  {
    year: "2021",
    title: "Series A",
    description: "Raised $25M to expand globally and build BaaS platform.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to 50+ countries with regulatory approvals.",
  },
  {
    year: "2023",
    title: "1000 Brokers",
    description: "Reached milestone of 1000+ active broker partners.",
  },
  {
    year: "2024",
    title: "Series B",
    description: "Raised $100M to accelerate growth and innovation.",
  },
];

export default function About() {
  return (
    <div className="py-20">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Building the Future of{" "}
            <span className="gradient-text">Trading Infrastructure</span>
          </h1>
          <p className="text-lg text-muted-foreground opacity-0 animate-fade-in stagger-1">
            ContisX is on a mission to democratize access to institutional-grade
            trading infrastructure, empowering brokers and dealers worldwide to
            compete at the highest level.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary/30 py-20 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover-lift">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide every broker and dealer, regardless of size, with
                access to world-class trading infrastructure. We believe in
                leveling the playing field and enabling innovation in financial
                services.
              </p>
            </Card>
            <Card className="p-8 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                A world where launching a compliant, feature-rich trading
                platform takes days, not years. Where deep liquidity and
                sophisticated tools are accessible to all market participants.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Trust",
              desc: "Security and reliability are non-negotiable.",
            },
            {
              icon: Users,
              title: "Partnership",
              desc: "We succeed when our partners succeed.",
            },
            {
              icon: Globe,
              title: "Accessibility",
              desc: "World-class tools for everyone.",
            },
            {
              icon: Award,
              title: "Excellence",
              desc: "Relentless pursuit of quality.",
            },
          ].map((value, i) => (
            <Card key={i} className="p-6 text-center hover-lift">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/30 py-20 mb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`relative flex gap-8 mb-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-2" />
                  <Card className="flex-1 p-6 ml-10 md:ml-0 hover-lift">
                    <div className="text-sm font-semibold text-primary mb-1">
                      {milestone.year}
                    </div>
                    <h3 className="font-bold mb-2">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Leadership Team
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <Card key={i} className="p-6 text-center hover-lift">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                {member.image}
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <Card className="gradient-primary p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            We're always looking for talented individuals who share our passion
            for transforming financial infrastructure.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="#">
              View Careers <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
