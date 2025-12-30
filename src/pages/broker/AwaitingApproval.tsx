import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBrokerStore } from '@/stores/brokerStore';
import { 
  Clock, 
  CheckCircle2, 
  FileSearch,
  Shield,
  ArrowRight,
  Mail
} from 'lucide-react';

const reviewSteps = [
  { id: 'received', label: 'Application Received', icon: FileSearch },
  { id: 'documents', label: 'Document Verification', icon: Shield },
  { id: 'compliance', label: 'Compliance Check', icon: Shield },
  { id: 'approved', label: 'Approved', icon: CheckCircle2 },
];

export default function AwaitingApproval() {
  const navigate = useNavigate();
  const { status, approvalProgress, checkApprovalStatus, application } = useBrokerStore();
  const [currentReviewStep, setCurrentReviewStep] = useState(0);

  useEffect(() => {
    // Simulate approval progress with setInterval
    const interval = setInterval(() => {
      checkApprovalStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, [checkApprovalStatus]);

  useEffect(() => {
    // Update review step based on progress
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

  const isApproved = status === 'approved';

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
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Application Approved!</h1>
                <p className="text-muted-foreground">
                  Congratulations! Your broker application has been approved.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                  <Clock className="w-10 h-10 text-primary-foreground" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Application Submitted</h1>
                <p className="text-muted-foreground">
                  Your application is being reviewed. This typically takes 12-24 hours.
                </p>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Review Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(approvalProgress)}%</span>
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
                    ? 'bg-success/10' 
                    : i === currentReviewStep 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-secondary/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i < currentReviewStep 
                    ? 'bg-success text-success-foreground' 
                    : i === currentReviewStep 
                      ? 'gradient-primary text-primary-foreground animate-pulse' 
                      : 'bg-secondary text-muted-foreground'
                }`}>
                  {i < currentReviewStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <span className={`font-medium ${
                    i <= currentReviewStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
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
          {application && (
            <div className="p-4 rounded-lg bg-secondary/50 mb-8">
              <h3 className="font-semibold mb-2">Application Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Company:</span> {application.companyName}</div>
                <div><span className="text-muted-foreground">Country:</span> {application.country}</div>
                <div><span className="text-muted-foreground">License:</span> {application.licenseNumber}</div>
                <div><span className="text-muted-foreground">Submitted:</span> {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : '-'}</div>
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
          {isApproved && (
            <Button 
              className="w-full shadow-glow"
              size="lg"
              onClick={() => navigate('/broker/dashboard')}
            >
              Go to Broker Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
