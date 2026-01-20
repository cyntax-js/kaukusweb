import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useBrokerStore } from "@/stores/brokerStore";
import {
  Clock,
  CheckCircle2,
  FileSearch,
  Shield,
  ArrowRight,
  Mail,
} from "lucide-react";

const reviewSteps = [
  { id: "received", label: "Application Received", icon: FileSearch },
  { id: "documents", label: "Document Verification", icon: Shield },
  { id: "compliance", label: "Compliance Check", icon: Shield },
  { id: "approval", label: "Approval", icon: CheckCircle2 },
];

export default function AwaitingApproval() {
  const navigate = useNavigate();
  const { status, application, checkApprovalStatus } = useBrokerStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    checkApprovalStatus();
  }, [checkApprovalStatus]);

  const handleLogout = () => {
    logout();
  };

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
                  Application Approved!
                </h1>
                <p className="text-muted-foreground">
                  Congratulations! Your broker application has been approved.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                  <Clock className="w-10 h-10 text-primary-foreground" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Application Submitted
                </h1>
                <p className="text-muted-foreground">
                  Your application is being reviewed. This typically takes 12-24
                  hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={checkApprovalStatus}
                >
                  Refresh Status
                </Button>
              </>
            )}
          </div>

          {/* Review Steps */}
          <div className="space-y-4 mb-8">
            {reviewSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all border ${
                  isApproved
                    ? "bg-success/10 border-success/20"
                    : "bg-primary/10 border-primary/20"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isApproved
                      ? "bg-success text-success-foreground"
                      : "gradient-primary text-primary-foreground"
                  }`}
                >
                  {isApproved ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <span
                    className={`font-medium ${
                      isApproved ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                  {!isApproved && (
                    <p className="text-xs text-muted-foreground">
                      In progress...
                    </p>
                  )}
                  {isApproved && (
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
                  <span className="text-muted-foreground">Company:</span>{" "}
                  {application.name}
                </div>
                <div>
                  <span className="text-muted-foreground">Country:</span>{" "}
                  {application.country}
                </div>
                <div>
                  <span className="text-muted-foreground">License:</span>{" "}
                  {application.licenseNumber}
                </div>
                <div>
                  <span className="text-muted-foreground">Submitted:</span>{" "}
                  {application.submittedAt
                    ? new Date(application.submittedAt).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            </div>
          )}

          {/* Email Notification */}
          {!isApproved && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-border mb-8">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                We'll send you an email notification once your application is
                approved.
              </p>
            </div>
          )}

          {/* CTA */}
          {isApproved ? (
            <Button
              className="w-full shadow-glow"
              size="lg"
              onClick={() => navigate("/broker/dashboard")}
            >
              Go to Broker Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="w-full shadow-glow"
              size="lg"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          )}

          {/* Logout Button */}
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Card>
      </div>
    </div>
  );
}
