import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useWizard } from "../WizardContext";

export function Stepper() {
  const { steps, currentStep, setCurrentStep, validateStep } = useWizard();

  const handleStepClick = (index: number) => {
    // Only allow going back or to completed steps
    if (index < currentStep) {
      setCurrentStep(index);
    } else if (index === currentStep + 1) {
      if (validateStep(currentStep)) {
        setCurrentStep(index);
      }
    }
  };

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="sticky top-6">
        <nav className="space-y-1" aria-label="Progress">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index <= currentStep + 1;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all",
                  isActive && "bg-primary/10 text-primary",
                  isCompleted && "text-muted-foreground hover:bg-muted/50",
                  !isActive && !isCompleted && "text-muted-foreground/50",
                  isClickable && !isActive && "hover:bg-muted/30 cursor-pointer",
                  !isClickable && "cursor-not-allowed"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all",
                    isActive && "border-primary bg-primary text-primary-foreground",
                    isCompleted && "border-primary/50 bg-primary/10 text-primary",
                    !isActive && !isCompleted && "border-muted-foreground/30"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>
                <span className="truncate">{step.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Progress indicator */}
        <div className="mt-6 px-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
