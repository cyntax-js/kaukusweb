import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useBrokerStore } from "@/stores/brokerStore";
import { uploadToCDN } from "@/api/cdn";
import { regulatoryBodies, countries } from "@/mocks/data";
import {
  Building2,
  FileText,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

type Step = "company" | "regulatory" | "documents" | "review";

const steps: {
  id: Step;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "company", label: "Company Info", icon: Building2 },
  { id: "regulatory", label: "Regulatory", icon: FileText },
  { id: "documents", label: "Documents", icon: Upload },
  { id: "review", label: "Review", icon: CheckCircle2 },
];

const documentTypes = [
  { id: "incorporation", name: "Certificate of Incorporation", required: true },
  { id: "license", name: "Regulatory License", required: true },
  { id: "director_id", name: "Director/Owner ID", required: true },
  { id: "address_proof", name: "Proof of Address", required: true },
  { id: "bank_statement", name: "Bank Statements", required: true },
  { id: "aml_policy", name: "AML/KYC Policy", required: true },
  { id: "business_plan", name: "Business Plan", required: false },
];

export default function BrokerApplication() {
  const navigate = useNavigate();
  const {
    application,
    setApplicationField,
    submitApplication,
    isSubmitting,
    currentStep,
    setCurrentStep,
    resetApplication,
  } = useBrokerStore();

  const { getUser } = useAuthStore();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});

  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});

  const [isUploadingToCDN, setIsUploadingToCDN] = useState(false);

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === "company") {
      if (!application?.name?.trim())
        newErrors.companyName = "Company Name is required";
      if (!application?.registrationNumber?.trim())
        newErrors.registrationNumber = "Registration Number is required";
      if (!application?.country) newErrors.country = "Country is required";
      if (!application?.address) newErrors.address = "Address is required";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!application?.contactEmail?.trim()) {
        newErrors.contactEmail = "Email is required";
      } else if (!emailRegex.test(application.contactEmail)) {
        newErrors.contactEmail = "Invalid email address";
      }

      if (!application?.contactPhone?.trim())
        newErrors.contactPhone = "Phone number is required";
    }

    if (step === "regulatory") {
      if (!application?.regulatoryLicense)
        newErrors.regulatoryLicense = "Regulatory Body is required";
      if (!application?.licenseNumber?.trim())
        newErrors.licenseNumber = "License Number is required";
      if (!application?.capitalRequirement)
        newErrors.capitalRequirement = "Capital Requirement is required";
    }

    if (step === "documents") {
      documentTypes.forEach((doc) => {
        if (doc.required && !uploadedDocs[doc.id]) {
          isValid = false;
          newErrors[doc.id] = "Required";
        }
      });

      if (Object.keys(newErrors).length > 0) isValid = false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && isValid;
  };

  const handleFieldChange = (field: string, value: string) => {
    setApplicationField(field as keyof typeof application, value);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    // check validation before moving
    if (validateStep(currentStep)) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex].id);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
      setErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = async () => {
    if (!validateStep("review")) return;
    if (Object.keys(selectedFiles).length === 0) {
      toast.error("Please select at required documents");
      return;
    }

    setIsUploadingToCDN(true);

    try {
      const docUrls: Record<string, string> = {};
      const uploadPromises = Object.entries(selectedFiles).map(
        async ([docId, file]) => {
          const url = await uploadToCDN(file);
          docUrls[docId] = url;
        },
      );

      await Promise.all(uploadPromises);

      await submitApplication(docUrls);

      resetApplication();

      navigate("/broker/awaiting-approval");
    } catch (error) {
      console.error("Submission failed", error);
      toast.error(error.message);
    } finally {
      setIsUploadingToCDN(false);
    }
  };

  getUser();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header and Progress Steps  */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Broker Application
          </h1>
          <p className="text-muted-foreground">
            Complete all steps to submit your application
          </p>
        </div>

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
                  i <= currentStepIndex
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card className="p-8 animate-fade-in">
          {/* Company Info Step */}
          {currentStep === "company" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Company Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Basic details about your company
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="companyName"
                    className={errors.companyName ? "text-destructive" : ""}
                  >
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Trading Ltd"
                    value={application?.name || ""}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    className={
                      errors.companyName
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.companyName && (
                    <span className="text-xs text-destructive">
                      {errors.companyName}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="registrationNumber"
                    className={
                      errors.registrationNumber ? "text-destructive" : ""
                    }
                  >
                    Registration Number *
                  </Label>
                  <Input
                    id="registrationNumber"
                    placeholder="12345678"
                    value={application?.registrationNumber || ""}
                    onChange={(e) =>
                      handleFieldChange("registrationNumber", e.target.value)
                    }
                    className={
                      errors.registrationNumber
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.registrationNumber && (
                    <span className="text-xs text-destructive">
                      {errors.registrationNumber}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className={errors.country ? "text-destructive" : ""}
                  >
                    Country of Incorporation *
                  </Label>
                  <Select
                    value={application?.country || ""}
                    onValueChange={(value) =>
                      handleFieldChange("country", value)
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.country
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }
                    >
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
                  {errors.country && (
                    <span className="text-xs text-destructive">
                      {errors.country}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className={errors.address ? "text-destructive" : ""}
                  >
                    Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    value={application?.address || ""}
                    onChange={(e) =>
                      handleFieldChange("address", e.target.value)
                    }
                    className={
                      errors.address
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.address && (
                    <span className="text-xs text-destructive">
                      {errors.address}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={application?.website || ""}
                    onChange={(e) =>
                      setApplicationField("website", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contactEmail"
                    className={errors.contactEmail ? "text-destructive" : ""}
                  >
                    Contact Email *
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="contact@company.com"
                    value={application?.contactEmail || ""}
                    onChange={(e) =>
                      handleFieldChange("contactEmail", e.target.value)
                    }
                    className={
                      errors.contactEmail
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.contactEmail && (
                    <span className="text-xs text-destructive">
                      {errors.contactEmail}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contactPhone"
                    className={errors.contactPhone ? "text-destructive" : ""}
                  >
                    Contact Phone *
                  </Label>
                  <Input
                    id="contactPhone"
                    placeholder="+1 234 567 8900"
                    value={application?.contactPhone || ""}
                    onChange={(e) =>
                      handleFieldChange("contactPhone", e.target.value)
                    }
                    className={
                      errors.contactPhone
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.contactPhone && (
                    <span className="text-xs text-destructive">
                      {errors.contactPhone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Regulatory Step */}
          {currentStep === "regulatory" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Regulatory Information</h2>
                  <p className="text-sm text-muted-foreground">
                    License and compliance details
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="regulatoryLicense"
                    className={
                      errors.regulatoryLicense ? "text-destructive" : ""
                    }
                  >
                    Regulatory Body *
                  </Label>
                  <Select
                    value={application?.regulatoryLicense || ""}
                    onValueChange={(value) =>
                      handleFieldChange("regulatoryLicense", value)
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.regulatoryLicense
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }
                    >
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
                  {errors.regulatoryLicense && (
                    <span className="text-xs text-destructive">
                      {errors.regulatoryLicense}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="licenseNumber"
                    className={errors.licenseNumber ? "text-destructive" : ""}
                  >
                    License Number *
                  </Label>
                  <Input
                    id="licenseNumber"
                    placeholder="LIC-2024-12345"
                    value={application?.licenseNumber || ""}
                    onChange={(e) =>
                      handleFieldChange("licenseNumber", e.target.value)
                    }
                    className={
                      errors.licenseNumber
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.licenseNumber && (
                    <span className="text-xs text-destructive">
                      {errors.licenseNumber}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="capitalRequirement"
                    className={
                      errors.capitalRequirement ? "text-destructive" : ""
                    }
                  >
                    Operational Capital *
                  </Label>
                  <Select
                    value={application?.capitalRequirement || ""}
                    onValueChange={(value) =>
                      handleFieldChange("capitalRequirement", value)
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.capitalRequirement
                          ? "border-destructive focus:ring-destructive"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Select capital range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50000-100000">
                        ₦500,000 - ₦1,000,000
                      </SelectItem>
                      <SelectItem value="100000-500000">
                        ₦1,000,000 - ₦5,000,000
                      </SelectItem>
                      <SelectItem value="500000-1000000">
                        ₦5,000,000 - ₦10,000,000
                      </SelectItem>
                      <SelectItem value="10000000+">₦10,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.capitalRequirement && (
                    <span className="text-xs text-destructive">
                      {errors.capitalRequirement}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Step */}
          {currentStep === "documents" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Upload Documents</h2>
                  <p className="text-sm text-muted-foreground">
                    Upload required verification documents
                  </p>
                </div>
              </div>

              {/* Global document error message */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Please upload all required documents to continue.
                </div>
              )}

              <div className="space-y-4">
                {documentTypes.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                      uploadedDocs[doc.id]
                        ? "border-success bg-success/5"
                        : errors[doc.id]
                          ? "border-destructive bg-destructive/5"
                          : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {uploadedDocs[doc.id] ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : errors[doc.id] ? (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        ) : (
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <span
                            className={`font-medium ${errors[doc.id] ? "text-destructive" : ""}`}
                          >
                            {doc.name}
                          </span>
                          {doc.required && (
                            <span
                              className={`text-xs ml-2 ${errors[doc.id] ? "text-destructive font-bold" : "text-destructive"}`}
                            >
                              Required
                            </span>
                          )}
                          {uploadedDocs[doc.id] && (
                            <p className="text-xs text-muted-foreground">
                              {uploadedDocs[doc.id]}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <input
                          type="file"
                          id={`file-${doc.id}`}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Validate file size (10MB limit)
                              if (file.size > 10 * 1024 * 1024) {
                                alert("File size must be less than 10MB");
                                return;
                              }

                              // Validate file type
                              const allowedTypes = [
                                "application/pdf",
                                "image/jpeg",
                                "image/jpg",
                                "image/png",
                              ];
                              if (!allowedTypes.includes(file.type)) {
                                alert("Please upload a PDF, JPG, or PNG file");
                                return;
                              }

                              setUploadedDocs((prev) => ({
                                ...prev,
                                [doc.id]: file.name,
                              }));

                              setSelectedFiles((prev) => ({
                                ...prev,
                                [doc.id]: file,
                              }));

                              // Clear error for this doc if exists
                              if (errors[doc.id]) {
                                setErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors[doc.id];
                                  return newErrors;
                                });
                              }
                            }
                          }}
                        />
                        <Button
                          variant={
                            uploadedDocs[doc.id] ? "outline" : "secondary"
                          }
                          size="sm"
                          onClick={() =>
                            document.getElementById(`file-${doc.id}`)?.click()
                          }
                          type="button"
                        >
                          {uploadedDocs[doc.id] ? "Replace" : "Upload"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, JPG, PNG. Max file size: 10MB per
                document.
              </p>
            </div>
          )}

          {/* Review Step */}
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

              <div className="space-y-6">
                {/* Company Summary */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Company Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Company:</span>{" "}
                      {application?.name || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reg. No:</span>{" "}
                      {application?.registrationNumber || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Country:</span>{" "}
                      {application?.country || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      {application?.contactEmail || "-"}
                    </div>
                  </div>
                </div>

                {/* Regulatory Summary */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Regulatory Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Regulatory Body:
                      </span>{" "}
                      {application?.regulatoryLicense || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">License No:</span>{" "}
                      {application?.licenseNumber || "-"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capital:</span>{" "}
                      {application?.capitalRequirement || "-"}
                    </div>
                  </div>
                </div>

                {/* Documents Summary */}
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Uploaded Documents
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(uploadedDocs).length > 0 ? (
                      Object.keys(uploadedDocs).map((docId) => {
                        const doc = documentTypes.find((d) => d.id === docId);
                        return (
                          <span
                            key={docId}
                            className="text-xs bg-success/10 text-success px-2 py-1 rounded-full"
                          >
                            ✓ {doc?.name}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No documents uploaded
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <p className="text-sm">
                  By submitting this application, you confirm that all
                  information provided is accurate and that you have read and
                  agree to our Terms of Service and Privacy Policy.
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
