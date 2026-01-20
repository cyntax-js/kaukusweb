/**
 * Unified Onboarding Page
 * 
 * Step 1: Company Information (shared across all licenses)
 * Step 2: KYC Documents per license type (license number, regulatory body, documents)
 * Step 3: Review and Submit
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { uploadToCDN } from "@/api/cdn";
import { regulatoryBodies, countries } from "@/mocks/data";
import type { KycType } from "@/api/platform";
import {
  Building2,
  FileText,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Loader2,
  AlertCircle,
  TrendingUp,
  Landmark,
  BarChart3,
} from "lucide-react";

type Step = "company" | "kyc" | "review";

const steps: {
  id: Step;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "company", label: "Company Info", icon: Building2 },
  { id: "kyc", label: "KYC Documents", icon: FileText },
  { id: "review", label: "Review & Submit", icon: CheckCircle2 },
];

const licenseLabels: Record<KycType, { label: string; icon: typeof TrendingUp }> = {
  broker: { label: "Broker", icon: TrendingUp },
  dealer: { label: "Dealer", icon: Building2 },
  issuer: { label: "Issuing House", icon: Landmark },
  market_makers: { label: "Market Maker", icon: BarChart3 },
};

const documentTypes = [
  { id: "Certificate of Incorporation", name: "Certificate of Incorporation", required: true },
  { id: "Regulatory License", name: "Regulatory License", required: true },
  { id: "Director/Owner ID", name: "Director/Owner ID", required: true },
  { id: "Proof of Address", name: "Proof of Address", required: true },
  { id: "Bank Statements", name: "Bank Statements", required: true },
  { id: "AML/KYC Policy", name: "AML/KYC Policy", required: true },
  { id: "Business Plan", name: "Business Plan", required: false },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const {
    selectedLicenses,
    companyInfo,
    kycData,
    currentStep,
    activeKycLicense,
    isSubmitting,
    setCompanyField,
    setKycData,
    setCurrentStep,
    setActiveKycLicense,
    submitCompanyInfo,
    submitAllKyc,
    resetOnboarding,
  } = useOnboardingStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<KycType, Record<string, File>>>({} as any);
  const [uploadedDocs, setUploadedDocs] = useState<Record<KycType, Record<string, string>>>({} as any);
  const [isUploadingToCDN, setIsUploadingToCDN] = useState(false);
  const [companySubmitted, setCompanySubmitted] = useState(false);

  // Redirect if no licenses selected
  useEffect(() => {
    if (selectedLicenses.length === 0) {
      navigate("/role-selection");
    }
  }, [selectedLicenses, navigate]);

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const validateCompanyStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!companyInfo?.name?.trim()) newErrors.name = "Company Name is required";
    if (!companyInfo?.registration_number?.trim()) newErrors.registration_number = "Registration Number is required";
    if (!companyInfo?.country) newErrors.country = "Country is required";
    if (!companyInfo?.address) newErrors.address = "Address is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!companyInfo?.contact_email?.trim()) {
      newErrors.contact_email = "Email is required";
    } else if (!emailRegex.test(companyInfo.contact_email)) {
      newErrors.contact_email = "Invalid email address";
    }

    if (!companyInfo?.contact_phone?.trim()) newErrors.contact_phone = "Phone number is required";
    if (!companyInfo?.operational_capital) newErrors.operational_capital = "Operational Capital is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateKycStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    for (const licenseType of selectedLicenses) {
      const licenseKyc = kycData[licenseType];
      const licenseUploads = uploadedDocs[licenseType] || {};

      if (!licenseKyc?.licenseId?.trim()) {
        newErrors[`${licenseType}_licenseId`] = "License ID is required";
        isValid = false;
      }
      if (!licenseKyc?.regulatoryBody) {
        newErrors[`${licenseType}_regulatoryBody`] = "Regulatory Body is required";
        isValid = false;
      }

      // Check required documents
      documentTypes.forEach((doc) => {
        if (doc.required && !licenseUploads[doc.id]) {
          newErrors[`${licenseType}_${doc.id}`] = "Required";
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCompanyFieldChange = (field: string, value: string) => {
    setCompanyField(field as keyof typeof companyInfo, value);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = async () => {
    if (currentStep === "company") {
      if (!validateCompanyStep()) return;
      
      try {
        await submitCompanyInfo();
        setCompanySubmitted(true);
        setCurrentStep("kyc");
        window.scrollTo(0, 0);
      } catch (error: any) {
        toast.error(error.message || "Failed to submit company info");
      }
    } else if (currentStep === "kyc") {
      if (!validateKycStep()) {
        toast.error("Please complete all required fields for each license type");
        return;
      }
      setCurrentStep("review");
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep === "kyc") {
      setCurrentStep("company");
    } else if (currentStep === "review") {
      setCurrentStep("kyc");
    }
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateKycStep()) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsUploadingToCDN(true);

    try {
      // Upload all files to CDN
      const docUrls: Record<KycType, Record<string, string>> = {} as any;

      for (const licenseType of selectedLicenses) {
        const licenseFiles = selectedFiles[licenseType] || {};
        docUrls[licenseType] = {};

        for (const [docId, file] of Object.entries(licenseFiles)) {
          const url = await uploadToCDN(file);
          docUrls[licenseType][docId] = url;
        }
      }

      await submitAllKyc(docUrls);
      
      toast.success("Application submitted successfully!");
      resetOnboarding();
      navigate("/awaiting-approval");
    } catch (error: any) {
      console.error("Submission failed", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsUploadingToCDN(false);
    }
  };

  const handleFileUpload = (licenseType: KycType, docId: string, file: File) => {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, JPG, or PNG file");
      return;
    }

    setUploadedDocs((prev) => ({
      ...prev,
      [licenseType]: {
        ...prev[licenseType],
        [docId]: file.name,
      },
    }));

    setSelectedFiles((prev) => ({
      ...prev,
      [licenseType]: {
        ...prev[licenseType],
        [docId]: file,
      },
    }));

    // Clear error for this doc if exists
    const errorKey = `${licenseType}_${docId}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  if (selectedLicenses.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            License Application
          </h1>
          <p className="text-muted-foreground">
            Complete the application for your selected licenses
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {selectedLicenses.map((license) => (
              <span
                key={license}
                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
              >
                {licenseLabels[license]?.label || license}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-10"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
          {steps.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  i <= currentStepIndex
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  i <= currentStepIndex ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card className="p-8 animate-fade-in">
          {/* Step 1: Company Info */}
          {currentStep === "company" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Company Information</h2>
                  <p className="text-sm text-muted-foreground">
                    This information will be used for all selected licenses
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                    Company Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Acme Trading Ltd"
                    value={companyInfo?.name || ""}
                    onChange={(e) => handleCompanyFieldChange("name", e.target.value)}
                    className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration_number" className={errors.registration_number ? "text-destructive" : ""}>
                    Registration Number *
                  </Label>
                  <Input
                    id="registration_number"
                    placeholder="12345678"
                    value={companyInfo?.registration_number || ""}
                    onChange={(e) => handleCompanyFieldChange("registration_number", e.target.value)}
                    className={errors.registration_number ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.registration_number && <span className="text-xs text-destructive">{errors.registration_number}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className={errors.country ? "text-destructive" : ""}>
                    Country of Incorporation *
                  </Label>
                  <Select
                    value={companyInfo?.country || ""}
                    onValueChange={(value) => handleCompanyFieldChange("country", value)}
                  >
                    <SelectTrigger className={errors.country ? "border-destructive focus:ring-destructive" : ""}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <span className="text-xs text-destructive">{errors.country}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className={errors.address ? "text-destructive" : ""}>
                    Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    value={companyInfo?.address || ""}
                    onChange={(e) => handleCompanyFieldChange("address", e.target.value)}
                    className={errors.address ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.address && <span className="text-xs text-destructive">{errors.address}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={companyInfo?.website || ""}
                    onChange={(e) => handleCompanyFieldChange("website", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email" className={errors.contact_email ? "text-destructive" : ""}>
                    Contact Email *
                  </Label>
                  <Input
                    id="contact_email"
                    type="email"
                    placeholder="contact@company.com"
                    value={companyInfo?.contact_email || ""}
                    onChange={(e) => handleCompanyFieldChange("contact_email", e.target.value)}
                    className={errors.contact_email ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.contact_email && <span className="text-xs text-destructive">{errors.contact_email}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_phone" className={errors.contact_phone ? "text-destructive" : ""}>
                    Contact Phone *
                  </Label>
                  <Input
                    id="contact_phone"
                    placeholder="+1 234 567 8900"
                    value={companyInfo?.contact_phone || ""}
                    onChange={(e) => handleCompanyFieldChange("contact_phone", e.target.value)}
                    className={errors.contact_phone ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.contact_phone && <span className="text-xs text-destructive">{errors.contact_phone}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operational_capital" className={errors.operational_capital ? "text-destructive" : ""}>
                    Operational Capital *
                  </Label>
                  <Select
                    value={companyInfo?.operational_capital || ""}
                    onValueChange={(value) => handleCompanyFieldChange("operational_capital", value)}
                  >
                    <SelectTrigger className={errors.operational_capital ? "border-destructive focus:ring-destructive" : ""}>
                      <SelectValue placeholder="Select capital range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500000-1000000">₦500,000 - ₦1,000,000</SelectItem>
                      <SelectItem value="1000000-5000000">₦1,000,000 - ₦5,000,000</SelectItem>
                      <SelectItem value="5000000-10000000">₦5,000,000 - ₦10,000,000</SelectItem>
                      <SelectItem value="10000000+">₦10,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.operational_capital && <span className="text-xs text-destructive">{errors.operational_capital}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: KYC Documents */}
          {currentStep === "kyc" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">KYC Documents</h2>
                  <p className="text-sm text-muted-foreground">
                    Upload documents for each license type
                  </p>
                </div>
              </div>

              <Tabs
                value={activeKycLicense || selectedLicenses[0]}
                onValueChange={(value) => setActiveKycLicense(value as KycType)}
              >
                <TabsList className="mb-6 flex-wrap h-auto gap-2">
                  {selectedLicenses.map((license) => {
                    const LicenseIcon = licenseLabels[license]?.icon || FileText;
                    const hasError = Object.keys(errors).some((key) => key.startsWith(`${license}_`));
                    const isComplete = kycData[license]?.licenseId && kycData[license]?.regulatoryBody && 
                      documentTypes.filter(d => d.required).every(d => uploadedDocs[license]?.[d.id]);
                    
                    return (
                      <TabsTrigger
                        key={license}
                        value={license}
                        className={`flex items-center gap-2 ${hasError ? "text-destructive" : ""}`}
                      >
                        <LicenseIcon className="w-4 h-4" />
                        {licenseLabels[license]?.label}
                        {isComplete && <CheckCircle2 className="w-4 h-4 text-success" />}
                        {hasError && <AlertCircle className="w-4 h-4 text-destructive" />}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {selectedLicenses.map((license) => (
                  <TabsContent key={license} value={license} className="space-y-6">
                    {/* License Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className={errors[`${license}_licenseId`] ? "text-destructive" : ""}>
                          License Number *
                        </Label>
                        <Input
                          placeholder="IC-2024-001234"
                          value={kycData[license]?.licenseId || ""}
                          onChange={(e) =>
                            setKycData(license, { licenseId: e.target.value })
                          }
                          className={errors[`${license}_licenseId`] ? "border-destructive" : ""}
                        />
                        {errors[`${license}_licenseId`] && (
                          <span className="text-xs text-destructive">{errors[`${license}_licenseId`]}</span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className={errors[`${license}_regulatoryBody`] ? "text-destructive" : ""}>
                          Regulatory Body *
                        </Label>
                        <Select
                          value={kycData[license]?.regulatoryBody || ""}
                          onValueChange={(value) =>
                            setKycData(license, { regulatoryBody: value })
                          }
                        >
                          <SelectTrigger className={errors[`${license}_regulatoryBody`] ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select regulatory body" />
                          </SelectTrigger>
                          <SelectContent>
                            {regulatoryBodies.map((body) => (
                              <SelectItem key={body} value={body}>
                                {body}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[`${license}_regulatoryBody`] && (
                          <span className="text-xs text-destructive">{errors[`${license}_regulatoryBody`]}</span>
                        )}
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Required Documents</h3>
                      {documentTypes.map((doc) => {
                        const errorKey = `${license}_${doc.id}`;
                        const isUploaded = uploadedDocs[license]?.[doc.id];
                        
                        return (
                          <div
                            key={doc.id}
                            className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                              isUploaded
                                ? "border-success bg-success/5"
                                : errors[errorKey]
                                  ? "border-destructive bg-destructive/5"
                                  : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {isUploaded ? (
                                  <CheckCircle2 className="w-5 h-5 text-success" />
                                ) : errors[errorKey] ? (
                                  <AlertCircle className="w-5 h-5 text-destructive" />
                                ) : (
                                  <FileText className="w-5 h-5 text-muted-foreground" />
                                )}
                                <div>
                                  <span className={`font-medium ${errors[errorKey] ? "text-destructive" : ""}`}>
                                    {doc.name}
                                  </span>
                                  {doc.required && (
                                    <span className={`text-xs ml-2 ${errors[errorKey] ? "text-destructive font-bold" : "text-destructive"}`}>
                                      Required
                                    </span>
                                  )}
                                  {isUploaded && (
                                    <p className="text-xs text-muted-foreground">
                                      {uploadedDocs[license][doc.id]}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <input
                                  type="file"
                                  id={`file-${license}-${doc.id}`}
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleFileUpload(license, doc.id, file);
                                    }
                                  }}
                                />
                                <Button
                                  variant={isUploaded ? "outline" : "secondary"}
                                  size="sm"
                                  onClick={() =>
                                    document.getElementById(`file-${license}-${doc.id}`)?.click()
                                  }
                                  type="button"
                                >
                                  {isUploaded ? "Replace" : "Upload"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, JPG, PNG. Max file size: 10MB per document.
                    </p>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === "review" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Review & Submit</h2>
                  <p className="text-sm text-muted-foreground">
                    Verify your information before submitting
                  </p>
                </div>
              </div>

              {/* Company Summary */}
              <div className="p-4 rounded-lg bg-secondary/50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Company Information
                </h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Company:</span> {companyInfo?.name || "-"}</div>
                  <div><span className="text-muted-foreground">Reg. No:</span> {companyInfo?.registration_number || "-"}</div>
                  <div><span className="text-muted-foreground">Country:</span> {companyInfo?.country || "-"}</div>
                  <div><span className="text-muted-foreground">Email:</span> {companyInfo?.contact_email || "-"}</div>
                  <div><span className="text-muted-foreground">Phone:</span> {companyInfo?.contact_phone || "-"}</div>
                  <div><span className="text-muted-foreground">Capital:</span> {companyInfo?.operational_capital || "-"}</div>
                </div>
              </div>

              {/* KYC Summary per license */}
              {selectedLicenses.map((license) => {
                const LicenseIcon = licenseLabels[license]?.icon || FileText;
                const licenseKyc = kycData[license];
                const licenseUploads = uploadedDocs[license] || {};

                return (
                  <div key={license} className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <LicenseIcon className="w-4 h-4" /> {licenseLabels[license]?.label} License
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm mb-3">
                      <div><span className="text-muted-foreground">License ID:</span> {licenseKyc?.licenseId || "-"}</div>
                      <div><span className="text-muted-foreground">Regulatory Body:</span> {licenseKyc?.regulatoryBody || "-"}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(licenseUploads).map((docId) => (
                        <span
                          key={docId}
                          className="text-xs bg-success/10 text-success px-2 py-1 rounded-full"
                        >
                          ✓ {docId}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

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
              disabled={currentStep === "company"}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            {currentStep === "review" ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || isUploadingToCDN}
                className="shadow-glow"
              >
                {isSubmitting || isUploadingToCDN ? (
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
              <Button onClick={handleNext} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
