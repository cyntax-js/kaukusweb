import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Shield,
  FileText,
  DollarSign,
  Landmark,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const requirements = [
  {
    icon: Shield,
    title: "Issuing House License",
    description: "Valid issuing house license from SEC or equivalent regulatory authority for securities issuance.",
    required: true,
  },
  {
    icon: Landmark,
    title: "Investment Bank Registration",
    description: "Registered as an investment bank or financial advisory firm with underwriting capabilities.",
    required: true,
  },
  {
    icon: DollarSign,
    title: "Capital Requirements",
    description: "Minimum $5,000,000 operational capital for underwriting commitments.",
    required: true,
  },
  {
    icon: FileText,
    title: "Track Record",
    description: "Demonstrated experience in securities issuance, IPOs, or private placements.",
    required: true,
  },
];

const documents = [
  "Certificate of Incorporation",
  "Issuing House License (certified copy)",
  "Director/Owner ID documents",
  "Proof of Address (business)",
  "Audited Financial Statements (last 3 years)",
  "AML/KYC Policy Document",
  "Underwriting Policy",
  "Past Deal Documentation (redacted)",
];

export default function IssuingHouseRequirements() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-4/10 text-chart-4 text-sm font-medium mb-4">
            <Landmark className="w-4 h-4" />
            Issuing House Registration
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Requirements & Specifications
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Register your issuing house to access securities issuance, IPO management, and investor relations tools.
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-4 to-chart-4/70 flex items-center justify-center shrink-0">
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
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Documents Checklist */}
        <Card className="p-8 mb-12 opacity-0 animate-fade-in stagger-4">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-chart-4" />
            Required Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
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
                Issuing House registration requires enhanced verification and typically takes 5-7 business days.
                Our team may request additional documentation during the review process.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/issuing-house/application")}
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
