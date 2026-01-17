import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMarketMakerStore } from "@/stores/marketMakerStore";
import {
  Clock,
  CheckCircle2,
  FileSearch,
  Shield,
  ArrowRight,
  Mail,
  BarChart3,
} from "lucide-react";

const reviewSteps = [
  { id: "received", label: "Application Received", icon: FileSearch },
  { id: "documents", label: "Document Verification", icon: Shield },
  { id: "technical", label: "Technical Assessment", icon: BarChart3 },
  { id: "approved", label: "Approved", icon: CheckCircle2 },
];

export default function MarketMakerAwaitingApproval() {
  const navigate = useNavigate();
  const { status, approvalProgress, application } = useMarketMakerStore();
  const [currentReviewStep, setCurrentReviewStep] = useState(0);

  useEffect(() => {
    if (approvalProgress < 25) setCurrentReviewStep(0);
    else if (approvalProgress < 50) setCurrentReviewStep(1);
    else if (approvalProgress < 75) setCurrentReviewStep(2);
    else setCurrentReviewStep(3);
  }, [approvalProgress]);

  const isApproved = status === "approved";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            {isApproved ? (
              <>
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Registration Approved!
                </h1>
                <p className="text-muted-foreground">
                  Congratulations! You are now a registered market maker.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-chart-5 to-chart-5/70 flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Application Submitted
                </h1>
                <p className="text-muted-foreground">
                  Your application is being reviewed. This typically takes 7-10 business days.
                </p>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Review Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(approvalProgress)}%
              </span>
            </div>
            <Progress value={approvalProgress} className="h-2" />
          </div>

          {/* Review Steps */}
          <div className="space-y-4 mb-8">
            {reviewSteps.map((step, i) => (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  i < currentReviewStep
                    ? "bg-success/10"
                    : i === currentReviewStep
                      ? "bg-chart-5/10 border border-chart-5/20"
                      : "bg-secondary/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i < currentReviewStep
                      ? "bg-success text-white"
                      : i === currentReviewStep
                        ? "bg-chart-5 text-white animate-pulse"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < currentReviewStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <span className={i <= currentReviewStep ? "font-medium" : "text-muted-foreground"}>
                    {step.label}
                  </span>
                  {i === currentReviewStep && !isApproved && (
                    <p className="text-xs text-muted-foreground">In progress...</p>
                  )}
                  {i < currentReviewStep && (
                    <p className="text-xs text-success">Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Application Details */}
          {application && Object.keys(application).length > 0 && (
            <div className="p-4 rounded-lg bg-secondary/50 mb-8">
              <h3 className="font-semibold mb-2">Application Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Firm:</span>{" "}
                  {application.firmName}
                </div>
                <div>
                  <span className="text-muted-foreground">Country:</span>{" "}
                  {application.country}
                </div>
              </div>
            </div>
          )}

          {/* Email Notification */}
          {!isApproved && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border mb-8">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                We'll send you an email notification once your application is approved.
              </p>
            </div>
          )}

          {/* CTA */}
          {isApproved ? (
            <Button
              className="w-full shadow-glow"
              size="lg"
              onClick={() => navigate("/market-maker/dashboard")}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="w-full" size="lg" onClick={() => navigate("/")}>
              Go to Home
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
