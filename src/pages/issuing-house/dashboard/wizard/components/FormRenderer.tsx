import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Save, Cloud } from "lucide-react";
import { useWizard } from "../WizardContext";
import { Stepper } from "./Stepper";
import { FieldRenderer } from "./FieldRenderer";
import { ReviewStep } from "./ReviewStep";
import type { FieldSchema } from "../schema";

export function FormRenderer() {
  const {
    steps,
    currentStep,
    setCurrentStep,
    validateStep,
    saveDraft,
    savedDraft,
    formValues,
  } = useWizard();

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isReviewStep = currentStepData?.id === "review";
  const isPostApproval = currentStepData?.id === "postApproval";

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Submitting form:", formValues);
      // Move to post-approval step
      setCurrentStep(currentStep + 1);
    }
  };

  // De-duplicate fields by id (keep first matching based on visibility)
  const getVisibleFields = (fields: FieldSchema[]): FieldSchema[] => {
    const seen = new Set<string>();
    return fields.filter((field) => {
      // For fields with same id, only show the first one that matches visibility
      if (seen.has(field.id)) {
        return false;
      }
      seen.add(field.id);
      return true;
    });
  };

  if (!currentStepData) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-200px)]">
      {/* Left: Stepper */}
      <Stepper />

      {/* Center: Form Area */}
      <div className="flex-1 max-w-3xl">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                <CardDescription className="mt-1">
                  Step {currentStep + 1} of {steps.length}
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={saveDraft}
                className={cn(
                  "gap-2 transition-all",
                  savedDraft && "text-primary"
                )}
              >
                {savedDraft ? (
                  <>
                    <Cloud className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Draft
                  </>
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {isReviewStep ? (
              <ReviewStep />
            ) : (
              <div className="space-y-6">
                {getVisibleFields(currentStepData.fields).map((field) => (
                  <FieldRenderer key={`${currentStepData.id}-${field.id}`} field={field} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 mt-6 flex items-center justify-between rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4 shadow-lg">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            {isReviewStep ? (
              <Button
                type="button"
                onClick={handleSubmit}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Check className="h-4 w-4" />
                Submit for Review
              </Button>
            ) : isPostApproval ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(0)}
                className="gap-2"
              >
                Start New Offering
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isLastStep}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Right: Contextual Help (optional) */}
      <div className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-6 rounded-lg border bg-muted/20 p-4">
          <h4 className="font-medium text-sm mb-2">Need Help?</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Complete each section with accurate information. Required fields are marked with an asterisk (*).
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Current Step:</span> {currentStepData.title}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Fields:</span> {currentStepData.fields.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
