import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { mockServices } from "@/mocks/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const brokerPlans = [
  {
    name: "Starter",
    price: 999,
    description: "Perfect for new brokers starting out",
    features: [
      "Stock trading only",
      "1 trading template",
      "Up to 1,000 users",
      "Basic analytics",
      "Email support",
    ],
    limitations: ["No futures/options", "Limited customization"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: 2999,
    description: "For growing brokers with advanced needs",
    features: [
      "Stock + Futures trading",
      "All 5 templates",
      "Up to 50,000 users",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: null,
    description: "For large-scale operations",
    features: [
      "All trading products",
      "Custom template development",
      "Unlimited users",
      "Real-time analytics",
      "Dedicated account manager",
      "White-label solution",
      "SLA guarantee",
      "On-premise option",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    q: "What is included in the monthly fee?",
    a: "The monthly fee includes access to our trading infrastructure, selected templates, user management tools, and support. Trading volume fees are separate.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can upgrade at any time. Your new features will be available immediately, and billing will be prorated.",
  },
  {
    q: "What trading products can my users access?",
    a: "Depending on your plan, users can access Stock trading, Futures & Derivatives, Options, and Private Markets.",
  },
  {
    q: "How long does setup take?",
    a: "Most brokers are live within 24-48 hours after approval. Our onboarding team will guide you through the process.",
  },
];

export default function Pricing() {
  return (
    <TooltipProvider>
      <div className="py-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground opacity-0 animate-fade-in stagger-1">
              Choose the plan that fits your needs. All plans include our core
              trading infrastructure and can be upgraded at any time.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {brokerPlans.map((plan, i) => (
              <Card
                key={i}
                className={`p-8 hover-lift relative ${
                  plan.popular ? "border-primary shadow-glow" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gradient-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price ? (
                      <>
                        <span className="text-4xl font-bold">
                          ${plan.price.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">Custom Pricing</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                  {plan.limitations.map((limitation, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-4 h-4 shrink-0" />
                      {limitation}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "shadow-glow" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/signup">{plan.cta}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Add-ons */}
        <section className="bg-secondary/30 py-20 mb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Trading Products
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Select the trading products you want to offer to your users. Each
              product is priced separately.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {mockServices.map((service) => (
                <Card key={service.id} className="p-6 hover-lift relative">
                  {service.isPopular && (
                    <span className="absolute top-3 right-3 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <h3 className="font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold">
                      ${service.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <Check className="w-3 h-3 text-success shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <Card className="gradient-primary p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Launch Your Broker?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Start your 14-day free trial today. No credit card required.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </section>
      </div>
    </TooltipProvider>
  );
}
