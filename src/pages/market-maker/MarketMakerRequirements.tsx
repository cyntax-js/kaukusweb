import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Shield,
  FileText,
  Coins,
  BarChart3,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const requirements = [
  {
    icon: Shield,
    title: "Market Maker License",
    description:
      "Valid market maker or liquidity provider license from a recognized exchange or regulatory body.",
    required: true,
  },
  {
    icon: BarChart3,
    title: "Trading Infrastructure",
    description:
      "Proven algorithmic trading capabilities with low-latency execution systems.",
    required: true,
  },
  {
    icon: Coins,
    title: "Capital Requirements",
    description:
      "Minimum $10,000,000 committed capital for market making activities.",
    required: true,
  },
  {
    icon: FileText,
    title: "Risk Management",
    description:
      "Comprehensive risk management framework with real-time monitoring capabilities.",
    required: true,
  },
];

const documents = [
  "Certificate of Incorporation",
  "Market Maker License (certified copy)",
  "Director/Owner ID documents",
  "Proof of Address (business)",
  "Audited Financial Statements (last 2 years)",
  "Trading System Documentation",
  "Risk Management Framework",
  "Market Making Agreement Template",
];

export default function MarketMakerRequirements() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-5/10 text-chart-5 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            Market Maker Registration
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Requirements & Specifications
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Become a market maker to provide liquidity, manage spreads, and earn
            from automated quoting.
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {requirements.map((req, i) => (
            <Card
              key={i}
              className="p-6 hover-lift opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-5 to-chart-5/70 flex items-center justify-center shrink-0">
                  <req.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{req.title}</h3>
                    {req.required && (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {req.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Documents Checklist */}
        <Card className="p-8 mb-12 opacity-0 animate-fade-in stagger-4">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-chart-5" />
            Required Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
              >
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <span className="text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 mb-12 border-warning/50 bg-warning/5 opacity-0 animate-fade-in stagger-5">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-warning shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                Market Maker registration includes technical assessment and
                typically takes 7-10 business days. You may be required to
                demonstrate your trading infrastructure during review.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/market-maker/application")}
            className="shadow-glow hover:shadow-glow-lg transition-shadow"
          >
            I Meet the Requirements - Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            By continuing, you confirm that you meet the above requirements
          </p>
        </div>
      </div>
    </div>
  );
}
