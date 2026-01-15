import { useBrokerDeploymentStore } from "@/stores/brokerDeploymentStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DeployWelcome from "./steps/DeployWelcome";
import DeployServices from "./steps/DeployServices";
import DeployTheme from "./steps/DeployTheme";
import DeployLayout from "./steps/DeployLayout";
import DeployConfirmation from "./steps/DeployConfirmation";
import DeployPayment from "./steps/DeployPayment";
import DeployPreview from "./steps/DeployPreview";

const steps = [
  { id: "welcome", label: "Welcome", component: DeployWelcome },
  { id: "services", label: "Services", component: DeployServices },
  { id: "theme", label: "Theme", component: DeployTheme },
  { id: "layout", label: "Layout", component: DeployLayout },
  { id: "confirmation", label: "Confirm", component: DeployConfirmation },
  { id: "payment", label: "Payment", component: DeployPayment },
  { id: "preview", label: "Preview", component: DeployPreview },
];

export default function BrokerDeployment() {
  const { currentStep, nextStep, prevStep, totalCost, config } =
    useBrokerDeploymentStore();
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const StepComponent = steps[currentStepIndex]?.component || DeployWelcome;
  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  const canGoNext = () => {
    switch (currentStep) {
      case "welcome":
        return config.brokerName.length > 0;
      case "services":
        return config.services.length > 0;
      case "theme":
        return true;
      case "layout":
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {" "}
          <h1 className="text-2xl font-bold">Platform Setup</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`text-xs font-medium transition-colors ${i <= currentStepIndex ? "text-primary" : "text-muted-foreground"}`}
            >
              {step.label}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 animate-fade-in">
        <StepComponent />
      </div>
      {currentStep !== "preview" && currentStep !== "confirmation" && (
        <Card className="p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="text-center">
            {totalCost > 0 && (
              <div className="text-sm text-muted-foreground">
                Total:{" "}
                <span className="font-bold text-foreground">
                  ${totalCost.toLocaleString()}/mo
                </span>
              </div>
            )}
          </div>
          {currentStep !== "payment" && (
            <Button onClick={nextStep} disabled={!canGoNext()}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {currentStep === "payment" && <div />}
        </Card>
      )}
      {currentStep === "confirmation" && (
        <Card className="p-4 flex items-center justify-between">
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Layout
          </Button>
          <div />
        </Card>
      )}
    </div>
  );
}
