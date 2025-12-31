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
import { useDealerStore } from "@/stores/dealerStore";
import { dealerTypes, countries } from "@/mocks/data";
import {
  Building2,
  ArrowRight,
  Loader2,
  Shield,
  TrendingUp,
} from "lucide-react";

const marketsOptions = [
  { id: "equities", name: "Equities" },
  { id: "forex", name: "Forex" },
  { id: "commodities", name: "Commodities" },
  { id: "fixed_income", name: "Fixed Income" },
  { id: "derivatives", name: "Derivatives" },
  { id: "crypto", name: "Crypto Assets" },
];

export default function DealerApplication() {
  const navigate = useNavigate();
  const { application, setApplicationField, submitApplication, isSubmitting } =
    useDealerStore();
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  const handleMarketToggle = (marketId: string) => {
    const newMarkets = selectedMarkets.includes(marketId)
      ? selectedMarkets.filter((m) => m !== marketId)
      : [...selectedMarkets, marketId];
    setSelectedMarkets(newMarkets);
    setApplicationField("marketsToServe", newMarkets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitApplication();
    navigate("/dealer/awaiting-approval");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Dealer Application
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Apply as a Dealer
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Provide liquidity to the ContiSX marketplace. Complete the form
            below to apply.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Institution Info */}
          <Card className="p-8 mb-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Institution Information</h2>
                <p className="text-sm text-muted-foreground">
                  Details about your financial institution
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="institutionName">Institution Name *</Label>
                <Input
                  id="institutionName"
                  placeholder="e.g., JPMorgan Chase & Co."
                  value={application?.institutionName || ""}
                  onChange={(e) =>
                    setApplicationField("institutionName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institutionType">Institution Type *</Label>
                <Select
                  value={application?.institutionType || ""}
                  onValueChange={(value) =>
                    setApplicationField("institutionType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealerTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">
                  Registration Number *
                </Label>
                <Input
                  id="registrationNumber"
                  placeholder="12345678"
                  value={application?.registrationNumber || ""}
                  onChange={(e) =>
                    setApplicationField("registrationNumber", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={application?.country || ""}
                  onValueChange={(value) =>
                    setApplicationField("country", value)
                  }
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
                  placeholder="trading@institution.com"
                  value={application?.contactEmail || ""}
                  onChange={(e) =>
                    setApplicationField("contactEmail", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  placeholder="+1 234 567 8900"
                  value={application?.contactPhone || ""}
                  onChange={(e) =>
                    setApplicationField("contactPhone", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </Card>

          {/* Regulatory Info */}
          <Card className="p-8 mb-6 animate-fade-in stagger-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-foreground" />
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
                <Label htmlFor="regulatoryBody">
                  Primary Regulatory Body *
                </Label>
                <Input
                  id="regulatoryBody"
                  placeholder="e.g., SEC, FCA, FINRA"
                  value={application?.regulatoryBody || ""}
                  onChange={(e) =>
                    setApplicationField("regulatoryBody", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">
                  License/Registration Number *
                </Label>
                <Input
                  id="licenseNumber"
                  placeholder="LIC-2024-12345"
                  value={application?.licenseNumber || ""}
                  onChange={(e) =>
                    setApplicationField("licenseNumber", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="capitalCommitment">
                  Capital Commitment (USD) *
                </Label>
                <Select
                  value={application?.capitalCommitment || ""}
                  onValueChange={(value) =>
                    setApplicationField("capitalCommitment", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select capital commitment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1M-10M">$1M - $10M</SelectItem>
                    <SelectItem value="10M-50M">$10M - $50M</SelectItem>
                    <SelectItem value="50M-100M">$50M - $100M</SelectItem>
                    <SelectItem value="100M-500M">$100M - $500M</SelectItem>
                    <SelectItem value="500M+">$500M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Markets */}
          <Card className="p-8 mb-6 animate-fade-in stagger-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Markets to Serve</h2>
                <p className="text-sm text-muted-foreground">
                  Select the markets you will provide liquidity for
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {marketsOptions.map((market) => (
                <div
                  key={market.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMarkets.includes(market.id)
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => handleMarketToggle(market.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedMarkets.includes(market.id)}
                      onCheckedChange={() => handleMarketToggle(market.id)}
                    />
                    <span className="font-medium">{market.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
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
            <p className="text-sm text-muted-foreground mt-4">
              By submitting, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
