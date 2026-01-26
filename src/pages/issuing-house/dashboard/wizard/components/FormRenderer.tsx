import { useRef, useCallback, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Save, Cloud, AlertCircle } from "lucide-react";
import { useWizard } from "../WizardContext";
import { Stepper } from "./Stepper";
import { FieldRenderer } from "./FieldRenderer";
import { ReviewStep } from "./ReviewStep";
import { ApprovalStep } from "./ApprovalStep";
import type { FieldSchema } from "../schema";
import { useToast } from "@/hooks/use-toast";
import { useOfferStore, type CreatedOffer } from "@/stores/offerStore";
import { v4 as uuidv4 } from "uuid";

// Helper to determine offer type from form values
function getOfferType(formValues: Record<string, unknown>): string {
  const securityType = formValues.securityType as string;
  const marketType = formValues.marketType as string;
  const instrumentType = formValues.instrumentType as string;
  
  if (securityType === "EQUITY") {
    if (marketType === "PUBLIC") return "Initial Public Offering";
    if (marketType === "PRIVATE") return "Private Placement";
    return "Rights Issue";
  }
  
  if (securityType === "DEBT") {
    if (instrumentType === "BOND") return "Corporate Bond";
    if (instrumentType === "COMMERCIAL_PAPER") return "Commercial Paper";
    if (instrumentType === "TREASURY_BILL") return "Treasury Bill";
    return "Debt Instrument";
  }
  
  return "Securities Offering";
}

export function FormRenderer() {
  const {
    steps,
    currentStep,
    setCurrentStep,
    validateStep,
    saveDraft,
    savedDraft,
    formValues,
    errors,
    isFieldVisible,
    clearDraft,
  } = useWizard();
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { addOffer } = useOfferStore();
  const [submittedOfferId, setSubmittedOfferId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isReviewStep = currentStepData?.id === "review";
  const isPostApproval = currentStepData?.id === "postApproval";

  const scrollToFirstError = useCallback(() => {
    // Wait for DOM update after validation
    setTimeout(() => {
      const firstError = formRef.current?.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        // Add shake animation
        firstError.classList.add("animate-shake");
        setTimeout(() => firstError.classList.remove("animate-shake"), 500);
      }
    }, 100);
  }, []);

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToFirstError();
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields before continuing.",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      setIsSubmitting(true);
      
      // Create the offer from form values
      const offerId = uuidv4();
      const securityType = formValues.securityType as "DEBT" | "EQUITY";
      
      // Calculate target amount based on security type
      let targetAmount = 0;
      if (securityType === "DEBT") {
        targetAmount = (formValues.amountToRaise as number) || 0;
      } else {
        targetAmount = (formValues.targetRaiseAmount as number) || 0;
      }
      
      const newOffer: CreatedOffer = {
        id: offerId,
        name: `${formValues.issuerType || "New"} ${securityType} Offering`,
        type: getOfferType(formValues),
        securityType,
        issuerType: formValues.issuerType as string,
        marketType: formValues.marketType as string,
        instrumentType: formValues.instrumentType as string,
        couponType: formValues.couponType as string,
        equityType: formValues.equityType as string,
        targetAmount,
        raisedAmount: 0,
        subscriptionRate: 0,
        status: "pending_approval",
        createdAt: new Date(),
        investors: 0,
        minInvestment: formValues.minInvestment as number,
        maxInvestment: formValues.maxInvestment as number,
        pricePerUnit: securityType === "DEBT" 
          ? (formValues.parValue as number) || 1000 
          : (formValues.pricePerShare as number),
        totalUnits: securityType === "DEBT" 
          ? (formValues.totalUnits as number) 
          : (formValues.sharesToList as number),
        soldUnits: 0,
        issuer: `${formValues.issuerType} Entity`,
        sector: "Financial Services",
        description: formValues.useOfProceeds as string || "New securities offering for capital raising.",
        hasSecondaryTrading: formValues.secondaryMarket as boolean || false,
        regulatoryApproval: "Pending",
        votingRights: formValues.votingRights as boolean,
        dividendRights: formValues.dividendRights as boolean,
        transferRestriction: formValues.transferRestriction as boolean,
        discountRate: formValues.discountRate as number,
        couponRate: formValues.couponRate as number,
        couponFrequency: formValues.couponFrequency as string,
        spread: formValues.spread as number,
        maturityDate: formValues.maturityDate as Date,
        callable: formValues.callable as boolean,
        convertible: formValues.convertible as boolean,
        creditRating: formValues.creditRating as string,
        preMoneyValuation: formValues.preMoneyValuation as number,
        postMoneyValuation: formValues.postMoneyValuation as number,
        valuationMethod: formValues.valuationMethod as string,
        eligibleInvestors: formValues.eligibleInvestors as string[],
        useOfProceeds: formValues.useOfProceeds as string,
        formValues: { ...formValues },
      };
      
      // Add offer to store
      addOffer(newOffer);
      setSubmittedOfferId(offerId);
      
      // Clear draft
      clearDraft();
      
      toast({
        title: "Submission Successful",
        description: "Your security offering has been submitted for regulatory review.",
      });
      
      // Move to post-approval step
      setCurrentStep(currentStep + 1);
      setIsSubmitting(false);
    } else {
      scrollToFirstError();
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please complete the declaration before submitting.",
      });
    }
  };

  // De-duplicate fields by id - for fields with same id, show only the one that's visible
  const getVisibleFields = useCallback((fields: FieldSchema[]): FieldSchema[] => {
    const seen = new Set<string>();
    
    return fields.filter((field) => {
      // Skip if we've already seen this field id AND added it
      if (seen.has(field.id)) {
        return false;
      }
      
      // Check if this field is visible based on visibleWhen condition
      const visible = isFieldVisible(field);
      
      // Only mark as seen and include if visible
      if (visible) {
        seen.add(field.id);
        return true;
      }
      
      return false;
    });
  }, [isFieldVisible]);

  const errorCount = Object.keys(errors).length;

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
              <div className="flex items-center gap-3">
                {errorCount > 0 && (
                  <div className="flex items-center gap-1.5 text-destructive text-sm animate-in fade-in-0 slide-in-from-right-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errorCount} {errorCount === 1 ? 'error' : 'errors'}</span>
                  </div>
                )}
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
            </div>
          </CardHeader>

          <CardContent className="p-6" ref={formRef}>
            {isPostApproval && submittedOfferId ? (
              <ApprovalStep offerId={submittedOfferId} />
            ) : isReviewStep ? (
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
                disabled={isSubmitting}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Check className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            ) : isPostApproval ? (
              null // Hide navigation during approval process
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
