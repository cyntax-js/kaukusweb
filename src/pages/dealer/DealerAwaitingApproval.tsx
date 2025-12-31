import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDealerStore } from "@/stores/dealerStore";
import {
  Clock,
  CheckCircle2,
  FileSearch,
  Shield,
  ArrowRight,
  Mail,
  Building2,
} from "lucide-react";

const reviewSteps = [
  { id: "received", label: "Application Received", icon: FileSearch },
  { id: "verification", label: "Institution Verification", icon: Building2 },
  { id: "compliance", label: "Regulatory Check", icon: Shield },
  { id: "approved", label: "Approved", icon: CheckCircle2 },
];

export default function DealerAwaitingApproval() {
  const navigate = useNavigate();
  const { status, approvalProgress, checkApprovalStatus, application } =
    useDealerStore();
  const [currentReviewStep, setCurrentReviewStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      checkApprovalStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, [checkApprovalStatus]);

  useEffect(() => {
    if (approvalProgress < 25) {
      setCurrentReviewStep(0);
    } else if (approvalProgress < 50) {
      setCurrentReviewStep(1);
    } else if (approvalProgress < 75) {
      setCurrentReviewStep(2);
    } else {
      setCurrentReviewStep(3);
    }
  }, [approvalProgress]);

  const isApproved = status === "approved";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card className="p-8 md:p-12">
          <div className="text-center mb-8">
            {isApproved ? (
              <>
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Application Approved!
                </h1>
                <p className="text-muted-foreground">
                  Welcome to ContiSX! Your dealer application has been approved.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                  <Clock className="w-10 h-10 text-accent" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Application Under Review
                </h1>
                <p className="text-muted-foreground">
                  Your dealer application is being reviewed by our compliance
                  team.
                </p>
              </>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Review Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(approvalProgress)}%
              </span>
            </div>
            <Progress value={approvalProgress} className="h-2" />
          </div>

          <div className="space-y-4 mb-8">
            {reviewSteps.map((step, i) => (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  i < currentReviewStep
                    ? "bg-success/10"
                    : i === currentReviewStep
                    ? "bg-accent/10 border border-accent/20"
                    : "bg-secondary/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i < currentReviewStep
                      ? "bg-success text-success-foreground"
                      : i === currentReviewStep
                      ? "bg-accent text-accent-foreground animate-pulse"
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
                  <span
                    className={`font-medium ${
                      i <= currentReviewStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                  {i === currentReviewStep && !isApproved && (
                    <p className="text-xs text-muted-foreground">
                      In progress...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {application && (
            <div className="p-4 rounded-lg bg-secondary/50 mb-8">
              <h3 className="font-semibold mb-2">Application Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Institution:</span>{" "}
                  {application.institutionName}
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>{" "}
                  {application.institutionType}
                </div>
                <div>
                  <span className="text-muted-foreground">Country:</span>{" "}
                  {application.country}
                </div>
                <div>
                  <span className="text-muted-foreground">Capital:</span>{" "}
                  {application.capitalCommitment}
                </div>
              </div>
            </div>
          )}

          {!isApproved && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border mb-8">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                We'll notify you via email once your application is approved.
              </p>
            </div>
          )}

          {isApproved && (
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate("/dealer/dashboard")}
            >
              Go to Dealer Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
