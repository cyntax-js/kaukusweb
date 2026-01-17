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
import { Checkbox } from "@/components/ui/checkbox";
import { useIssuingHouseStore } from "@/stores/issuingHouseStore";
import { countries } from "@/mocks/data";
import { Landmark, ArrowRight, Loader2, Shield, FileText } from "lucide-react";

const serviceOptions = [
  { id: "ipo", name: "IPO Management" },
  { id: "rights_issue", name: "Rights Issues" },
  { id: "private_placement", name: "Private Placements" },
  { id: "bond_issuance", name: "Bond Issuance" },
  { id: "advisory", name: "Financial Advisory" },
  { id: "underwriting", name: "Underwriting Services" },
];

export default function IssuingHouseApplication() {
  const navigate = useNavigate();
  const { application, setApplicationField, submitApplication, isSubmitting } =
    useIssuingHouseStore();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (serviceId: string) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter((s) => s !== serviceId)
      : [...selectedServices, serviceId];
    setSelectedServices(newServices);
    setApplicationField("servicesOffered", newServices);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitApplication();
    navigate("/issuing-house/awaiting-approval");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-4/10 text-chart-4 text-sm font-medium mb-4">
            <Landmark className="w-4 h-4" />
            Issuing House Registration
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Register Your Issuing House
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Access securities issuance tools and manage IPOs on the ContiSX marketplace.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company Info */}
          <Card className="p-8 mb-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-chart-4 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Company Information</h2>
                <p className="text-sm text-muted-foreground">
                  Details about your issuing house
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="e.g., ABC Capital Partners"
                  value={application?.companyName || ""}
                  onChange={(e) => setApplicationField("companyName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  placeholder="RC123456"
                  value={application?.registrationNumber || ""}
                  onChange={(e) => setApplicationField("registrationNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={application?.country || ""}
                  onValueChange={(value) => setApplicationField("country", value)}
                >
                  <SelectTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="contact@company.com"
                  value={application?.contactEmail || ""}
                  onChange={(e) => setApplicationField("contactEmail", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  placeholder="+234 800 000 0000"
                  value={application?.contactPhone || ""}
                  onChange={(e) => setApplicationField("contactPhone", e.target.value)}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Regulatory Info */}
          <Card className="p-8 mb-6 animate-fade-in stagger-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-chart-4 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Regulatory & Compliance</h2>
                <p className="text-sm text-muted-foreground">
                  License and regulatory information
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regulatoryBody">Primary Regulatory Body *</Label>
                <Input
                  id="regulatoryBody"
                  placeholder="e.g., SEC Nigeria"
                  value={application?.regulatoryBody || ""}
                  onChange={(e) => setApplicationField("regulatoryBody", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  placeholder="IH-2024-12345"
                  value={application?.licenseNumber || ""}
                  onChange={(e) => setApplicationField("licenseNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="yearsInOperation">Years in Operation *</Label>
                <Select
                  value={application?.yearsInOperation || ""}
                  onValueChange={(value) => setApplicationField("yearsInOperation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Services */}
          <Card className="p-8 mb-6 animate-fade-in stagger-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-chart-4 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Services Offered</h2>
                <p className="text-sm text-muted-foreground">
                  Select the services you provide
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {serviceOptions.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedServices.includes(service.id)
                      ? "border-chart-4 bg-chart-4/5"
                      : "border-border hover:border-chart-4/50"
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                    />
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Submit */}
          <div className="text-center">
            <Button type="submit" size="lg" disabled={isSubmitting} className="shadow-glow">
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
            <p className="text-sm text-muted-foreground mt-4">
              By submitting, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
