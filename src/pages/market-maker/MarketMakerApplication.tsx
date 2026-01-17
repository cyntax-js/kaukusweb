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
import { useMarketMakerStore } from "@/stores/marketMakerStore";
import { countries } from "@/mocks/data";
import { BarChart3, ArrowRight, Loader2, Shield, Zap } from "lucide-react";

const marketOptions = [
  { id: "equities", name: "Equities" },
  { id: "fixed_income", name: "Fixed Income" },
  { id: "derivatives", name: "Derivatives" },
  { id: "forex", name: "Foreign Exchange" },
  { id: "commodities", name: "Commodities" },
  { id: "etfs", name: "ETFs" },
];

export default function MarketMakerApplication() {
  const navigate = useNavigate();
  const { application, setApplicationField, submitApplication, isSubmitting } =
    useMarketMakerStore();
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
    navigate("/market-maker/awaiting-approval");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-5/10 text-chart-5 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            Market Maker Registration
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Become a Market Maker
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Provide liquidity to the ContiSX marketplace and earn from market making activities.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company Info */}
          <Card className="p-8 mb-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-chart-5 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Firm Information</h2>
                <p className="text-sm text-muted-foreground">
                  Details about your trading firm
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="firmName">Firm Name *</Label>
                <Input
                  id="firmName"
                  placeholder="e.g., Apex Trading LLC"
                  value={application?.firmName || ""}
                  onChange={(e) => setApplicationField("firmName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  placeholder="MM123456"
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
                  placeholder="trading@firm.com"
                  value={application?.contactEmail || ""}
                  onChange={(e) => setApplicationField("contactEmail", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  placeholder="+1 234 567 8900"
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
              <div className="w-10 h-10 rounded-xl bg-chart-5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Regulatory & Capital</h2>
                <p className="text-sm text-muted-foreground">
                  License and capital commitment details
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regulatoryBody">Primary Regulatory Body *</Label>
                <Input
                  id="regulatoryBody"
                  placeholder="e.g., SEC, FINRA"
                  value={application?.regulatoryBody || ""}
                  onChange={(e) => setApplicationField("regulatoryBody", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  placeholder="MM-2024-12345"
                  value={application?.licenseNumber || ""}
                  onChange={(e) => setApplicationField("licenseNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="capitalCommitment">Capital Commitment (USD) *</Label>
                <Select
                  value={application?.capitalCommitment || ""}
                  onValueChange={(value) => setApplicationField("capitalCommitment", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select capital commitment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10M-25M">$10M - $25M</SelectItem>
                    <SelectItem value="25M-50M">$25M - $50M</SelectItem>
                    <SelectItem value="50M-100M">$50M - $100M</SelectItem>
                    <SelectItem value="100M+">$100M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Markets */}
          <Card className="p-8 mb-6 animate-fade-in stagger-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-chart-5 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Markets to Serve</h2>
                <p className="text-sm text-muted-foreground">
                  Select the markets you will provide liquidity for
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {marketOptions.map((market) => (
                <div
                  key={market.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMarkets.includes(market.id)
                      ? "border-chart-5 bg-chart-5/5"
                      : "border-border hover:border-chart-5/50"
                  }`}
                  onClick={() => handleMarketToggle(market.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedMarkets.includes(market.id)}
                      onCheckedChange={() => handleMarketToggle(market.id)}
                    />
                    <span className="font-medium text-sm">{market.name}</span>
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
