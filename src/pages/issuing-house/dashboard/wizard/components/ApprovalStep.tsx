/**
 * Approval Step - Shows pending approval UI and simulates approval after 10 seconds
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle2, 
  FileSearch, 
  Shield, 
  Building2,
  ArrowRight,
  Loader2,
  Sparkles,
  FileCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOfferStore } from "@/stores/offerStore";

interface ApprovalStepProps {
  offerId: string;
}

const approvalStages = [
  { id: "submission", label: "Submission Received", icon: FileCheck, delay: 0 },
  { id: "compliance", label: "Compliance Review", icon: Shield, delay: 2000 },
  { id: "regulatory", label: "Regulatory Assessment", icon: Building2, delay: 5000 },
  { id: "final", label: "Final Approval", icon: CheckCircle2, delay: 8000 },
];

export function ApprovalStep({ offerId }: ApprovalStepProps) {
  const navigate = useNavigate();
  const { getOfferById, approveOffer } = useOfferStore();
  const [currentStage, setCurrentStage] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const offer = getOfferById(offerId);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 100);

    // Stage progression
    approvalStages.forEach((stage, index) => {
      if (index > 0) {
        setTimeout(() => {
          setCurrentStage(index);
        }, stage.delay);
      }
    });

    // Final approval at 10 seconds
    const approvalTimeout = setTimeout(() => {
      setIsApproved(true);
      if (offerId) {
        approveOffer(offerId);
      }
    }, 10000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(approvalTimeout);
    };
  }, [offerId, approveOffer]);

  const handleViewOffer = () => {
    navigate("/issuing-house/dashboard/offers");
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        {isApproved ? (
          <>
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-success mb-2">Offer Approved!</h2>
            <p className="text-muted-foreground">
              Your security offering has been approved and is ready for listing.
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Reviewing Your Submission</h2>
            <p className="text-muted-foreground">
              Please wait while we process your security offering application.
            </p>
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Approval Progress</span>
          <span className="font-medium">{Math.min(progress, 100)}%</span>
        </div>
        <Progress 
          value={isApproved ? 100 : progress} 
          className={cn(
            "h-3 transition-all duration-300",
            isApproved && "[&>div]:bg-success"
          )}
        />
      </div>

      {/* Approval Stages */}
      <Card className="p-6">
        <div className="space-y-4">
          {approvalStages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isComplete = index < currentStage || isApproved;
            const isActive = index === currentStage && !isApproved;
            
            return (
              <div 
                key={stage.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg transition-all duration-300",
                  isComplete && "bg-success/10",
                  isActive && "bg-primary/10 animate-pulse"
                )}
              >
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    isComplete && "bg-success text-success-foreground",
                    isActive && "bg-primary text-primary-foreground",
                    !isComplete && !isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <StageIcon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={cn(
                    "font-medium",
                    isComplete && "text-success",
                    isActive && "text-primary"
                  )}>
                    {stage.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isComplete ? "Completed" : isActive ? "In progress..." : "Pending"}
                  </p>
                </div>
                {isComplete && (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    Done
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Offer Summary */}
      {offer && (
        <Card className="p-6 bg-muted/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileSearch className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{offer.name || "New Security Offering"}</h3>
              <p className="text-sm text-muted-foreground">
                {offer.securityType} • {offer.instrumentType || offer.equityType || "N/A"}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-muted-foreground">
                  Target: <span className="font-medium text-foreground">
                    ₦{(offer.targetAmount / 1000000000).toFixed(2)}B
                  </span>
                </span>
                {isApproved && offer.listingReference && (
                  <span className="text-muted-foreground">
                    Ref: <span className="font-medium text-foreground">{offer.listingReference}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Approved Actions */}
      {isApproved && (
        <div className="flex flex-col items-center gap-4 animate-in fade-in-0 slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-success">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Your offer is now live!</span>
          </div>
          <Button onClick={handleViewOffer} size="lg" className="gap-2">
            View in Offer Management
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Pending Info */}
      {!isApproved && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Clock className="w-4 h-4" />
          <span>Estimated time remaining: {Math.max(0, 10 - Math.floor(progress / 10))} seconds</span>
        </div>
      )}
    </div>
  );
}
