import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBrokerStore } from '@/stores/brokerStore';
import { regulatoryBodies, countries } from '@/mocks/data';
import { 
  Building2, 
  FileText, 
  User, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  CheckCircle2,
  Loader2
} from 'lucide-react';

type Step = 'company' | 'regulatory' | 'documents' | 'review';

const steps: { id: Step; label: string; icon: any }[] = [
  { id: 'company', label: 'Company Info', icon: Building2 },
  { id: 'regulatory', label: 'Regulatory', icon: FileText },
  { id: 'documents', label: 'Documents', icon: Upload },
  { id: 'review', label: 'Review', icon: CheckCircle2 },
];

const documentTypes = [
  { id: 'incorporation', name: 'Certificate of Incorporation', required: true },
  { id: 'license', name: 'Regulatory License', required: true },
  { id: 'director_id', name: 'Director/Owner ID', required: true },
  { id: 'address_proof', name: 'Proof of Address', required: true },
  { id: 'bank_statement', name: 'Bank Statements', required: true },
  { id: 'aml_policy', name: 'AML/KYC Policy', required: true },
  { id: 'business_plan', name: 'Business Plan', required: false },
];

export default function BrokerApplication() {
  const navigate = useNavigate();
  const { application, setApplicationField, submitApplication, isSubmitting } = useBrokerStore();
  const [currentStep, setCurrentStep] = useState<Step>('company');
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const handleSubmit = async () => {
    await submitApplication();
    navigate('/broker/awaiting-approval');
  };

  const simulateUpload = (docId: string) => {
    // Simulate file upload
    setUploadedDocs(prev => ({
      ...prev,
      [docId]: `document_${docId}_${Date.now()}.pdf`
    }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Broker Application</h1>
          <p className="text-muted-foreground">Complete all steps to submit your application</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  i <= currentStepIndex 
                    ? 'gradient-primary text-primary-foreground shadow-glow' 
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs mt-2 font-medium ${
                i <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card className="p-8 animate-fade-in">
          {/* Company Info Step */}
          {currentStep === 'company' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Company Information</h2>
                  <p className="text-sm text-muted-foreground">Basic details about your company</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input 
                    id="companyName" 
                    placeholder="Acme Trading Ltd"
                    value={application?.companyName || ''}
                    onChange={(e) => setApplicationField('companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input 
                    id="registrationNumber" 
                    placeholder="12345678"
                    value={application?.registrationNumber || ''}
                    onChange={(e) => setApplicationField('registrationNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country of Incorporation *</Label>
                  <Select 
                    value={application?.country || ''} 
                    onValueChange={(value) => setApplicationField('country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website" 
                    placeholder="https://example.com"
                    value={application?.website || ''}
                    onChange={(e) => setApplicationField('website', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    placeholder="contact@company.com"
                    value={application?.contactEmail || ''}
                    onChange={(e) => setApplicationField('contactEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input 
                    id="contactPhone" 
                    placeholder="+1 234 567 8900"
                    value={application?.contactPhone || ''}
                    onChange={(e) => setApplicationField('contactPhone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Regulatory Step */}
          {currentStep === 'regulatory' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Regulatory Information</h2>
                  <p className="text-sm text-muted-foreground">License and compliance details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="regulatoryLicense">Regulatory Body *</Label>
                  <Select 
                    value={application?.regulatoryLicense || ''} 
                    onValueChange={(value) => setApplicationField('regulatoryLicense', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select regulatory body" />
                    </SelectTrigger>
                    <SelectContent>
                      {regulatoryBodies.map(body => (
                        <SelectItem key={body} value={body}>{body}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input 
                    id="licenseNumber" 
                    placeholder="LIC-2024-12345"
                    value={application?.licenseNumber || ''}
                    onChange={(e) => setApplicationField('licenseNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capitalRequirement">Operational Capital (USD) *</Label>
                  <Select 
                    value={application?.capitalRequirement || ''} 
                    onValueChange={(value) => setApplicationField('capitalRequirement', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select capital range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100000-500000">$100,000 - $500,000</SelectItem>
                      <SelectItem value="500000-1000000">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="1000000+">$1,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Documents Step */}
          {currentStep === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Upload Documents</h2>
                  <p className="text-sm text-muted-foreground">Upload required verification documents</p>
                </div>
              </div>

              <div className="space-y-4">
                {documentTypes.map((doc) => (
                  <div 
                    key={doc.id} 
                    className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                      uploadedDocs[doc.id] 
                        ? 'border-success bg-success/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {uploadedDocs[doc.id] ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          {doc.required && (
                            <span className="text-xs text-destructive ml-2">Required</span>
                          )}
                          {uploadedDocs[doc.id] && (
                            <p className="text-xs text-muted-foreground">{uploadedDocs[doc.id]}</p>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant={uploadedDocs[doc.id] ? "outline" : "secondary"} 
                        size="sm"
                        onClick={() => simulateUpload(doc.id)}
                      >
                        {uploadedDocs[doc.id] ? 'Replace' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, JPG, PNG. Max file size: 10MB per document.
              </p>
            </div>
          )}

          {/* Review Step */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Review & Submit</h2>
                  <p className="text-sm text-muted-foreground">Verify your information before submitting</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Company Summary */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Company Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Company:</span> {application?.companyName || '-'}</div>
                    <div><span className="text-muted-foreground">Reg. No:</span> {application?.registrationNumber || '-'}</div>
                    <div><span className="text-muted-foreground">Country:</span> {application?.country || '-'}</div>
                    <div><span className="text-muted-foreground">Email:</span> {application?.contactEmail || '-'}</div>
                  </div>
                </div>

                {/* Regulatory Summary */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Regulatory Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Regulatory Body:</span> {application?.regulatoryLicense || '-'}</div>
                    <div><span className="text-muted-foreground">License No:</span> {application?.licenseNumber || '-'}</div>
                    <div><span className="text-muted-foreground">Capital:</span> {application?.capitalRequirement || '-'}</div>
                  </div>
                </div>

                {/* Documents Summary */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Uploaded Documents
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(uploadedDocs).length > 0 ? (
                      Object.keys(uploadedDocs).map(docId => {
                        const doc = documentTypes.find(d => d.id === docId);
                        return (
                          <span key={docId} className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                            ✓ {doc?.name}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-sm text-muted-foreground">No documents uploaded</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <p className="text-sm">
                  By submitting this application, you confirm that all information provided is accurate 
                  and that you have read and agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            {currentStep === 'review' ? (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="shadow-glow"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
