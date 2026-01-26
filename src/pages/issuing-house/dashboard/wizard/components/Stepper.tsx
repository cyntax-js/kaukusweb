import { cn } from "@/lib/utils";
import { Check, Circle, CircleDot } from "lucide-react";
import { useWizard } from "../WizardContext";
import { useMemo } from "react";

export function Stepper() {
  const { steps, currentStep, setCurrentStep, validateStep, formValues, isFieldVisible } = useWizard();

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

  // Calculate completion status for each step
  const stepCompleteness = useMemo(() => {
    return steps.map((step) => {
      if (step.id === "review" || step.id === "postApproval") {
        return { complete: 0, total: 0, percentage: 0 };
      }

      let complete = 0;
      let total = 0;
      const seenIds = new Set<string>();

      step.fields.forEach((field) => {
        if (seenIds.has(field.id)) return;
        
        // Check visibility
        if (!isFieldVisible(field)) return;
        
        seenIds.add(field.id);
        total++;

        const value = formValues[field.id];
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          complete++;
        }
      });

      return {
        complete,
        total,
        percentage: total > 0 ? Math.round((complete / total) * 100) : 0,
      };
    });
  }, [steps, formValues, isFieldVisible]);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const reviewableSteps = stepCompleteness.filter((s) => s.total > 0);
    if (reviewableSteps.length === 0) return 0;
    
    const totalComplete = reviewableSteps.reduce((sum, s) => sum + s.complete, 0);
    const totalFields = reviewableSteps.reduce((sum, s) => sum + s.total, 0);
    
    return totalFields > 0 ? Math.round((totalComplete / totalFields) * 100) : 0;
  }, [stepCompleteness]);

  return (
    <div className="w-full lg:w-72 shrink-0">
      <div className="sticky top-6">
        <nav className="space-y-1" aria-label="Progress">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index <= currentStep + 1;
            const completeness = stepCompleteness[index];
            const isStepComplete = completeness.total > 0 && completeness.complete === completeness.total;

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
                    isCompleted && isStepComplete && "border-success bg-success text-success-foreground",
                    isCompleted && !isStepComplete && "border-primary/50 bg-primary/10 text-primary",
                    !isActive && !isCompleted && "border-muted-foreground/30"
                  )}
                >
                  {isCompleted && isStepComplete ? (
                    <Check className="h-4 w-4" />
                  ) : isCompleted ? (
                    <CircleDot className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="truncate block">{step.title}</span>
                  {completeness.total > 0 && !isCompleted && (
                    <span className="text-xs text-muted-foreground">
                      {completeness.complete}/{completeness.total} fields
                    </span>
                  )}
                  {isCompleted && completeness.total > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-300",
                            isStepComplete ? "bg-success" : "bg-primary/60"
                          )}
                          style={{ width: `${completeness.percentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-8">
                        {completeness.percentage}%
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Overall Progress indicator */}
        <div className="mt-6 px-3 p-3 rounded-lg bg-muted/30 border">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span className="font-medium">Overall Completion</span>
            <span className="font-semibold text-foreground">{overallProgress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full transition-all duration-500 ease-out",
                overallProgress === 100 ? "bg-success" : "bg-primary"
              )}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
}
