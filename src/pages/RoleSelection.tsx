import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/authStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import type { KycType } from "@/api/platform";
import {
  TrendingUp,
  Building2,
  Landmark,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type RoleConfig = {
  id: KycType;
  icon: typeof TrendingUp;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  gradient: string;
  dashboardRoute: string;
};

const roles: RoleConfig[] = [
  {
    id: "broker",
    icon: TrendingUp,
    titleKey: "roleSelection.becomeBroker",
    descriptionKey: "roleSelection.brokerDescription",
    features: [
      "roleSelection.whiteLabelPlatforms",
      "roleSelection.customizableTemplates",
      "roleSelection.userFeeManagement",
    ],
    gradient: "from-primary to-primary/70",
    dashboardRoute: "/broker/dashboard",
  },
  {
    id: "dealer",
    icon: Building2,
    titleKey: "roleSelection.becomeDealer",
    descriptionKey: "roleSelection.dealerDescription",
    features: [
      "roleSelection.directMarketAccess",
      "roleSelection.institutionalApi",
      "roleSelection.riskManagementTools",
    ],
    gradient: "from-chart-2 to-chart-2/70",
    dashboardRoute: "/dealer/dashboard",
  },
  {
    id: "issuer",
    icon: Landmark,
    titleKey: "roleSelection.becomeIssuingHouse",
    descriptionKey: "roleSelection.issuingHouseDescription",
    features: [
      "roleSelection.ipoManagement",
      "roleSelection.securitiesIssuance",
      "roleSelection.investorRelations",
    ],
    gradient: "from-chart-4 to-chart-4/70",
    dashboardRoute: "/issuing-house/dashboard",
  },
  {
    id: "market_makers",
    icon: BarChart3,
    titleKey: "roleSelection.becomeMarketMaker",
    descriptionKey: "roleSelection.marketMakerDescription",
    features: [
      "roleSelection.liquidityProvision",
      "roleSelection.spreadManagement",
      "roleSelection.automatedQuoting",
    ],
    gradient: "from-chart-5 to-chart-5/70",
    dashboardRoute: "/market-maker/dashboard",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuthStore();
  const { setSelectedLicenses, resetOnboarding } = useOnboardingStore();
  const { t } = useTranslation();

  const [selectedRoles, setSelectedRoles] = useState<KycType[]>([]);

  const toggleRole = (roleId: KycType) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((r) => r !== roleId)
        : [...prev, roleId]
    );
  };

  const handleContinue = () => {
    if (selectedRoles.length === 0) return;

    // Reset any previous onboarding data
    resetOnboarding();

    // Set selected licenses in the onboarding store
    setSelectedLicenses(selectedRoles);

    // Set the first role as the selected role for navigation
    if (selectedRoles.includes("broker")) {
      setSelectedRole("broker");
    } else if (selectedRoles.includes("dealer")) {
      setSelectedRole("dealer");
    }

    // Navigate to the unified onboarding flow
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t("roleSelection.getStarted")}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("roleSelection.chooseYourPath")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select one or more license types you already have or want to apply
            for. You'll provide company information and KYC documents for each
            selected license.
          </p>
        </div>

        {/* License Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {roles.map((role, i) => {
            const isSelected = selectedRoles.includes(role.id);
            return (
              <Card
                key={role.id}
                className={`p-6 cursor-pointer group relative overflow-hidden transition-all opacity-0 animate-fade-in border-2 ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:border-muted"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => toggleRole(role.id)}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleRole(role.id)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                      role.gradient
                    } flex items-center justify-center shrink-0 transition-shadow ${
                      isSelected ? "shadow-glow" : ""
                    }`}
                  >
                    <role.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-2">
                      {t(role.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t(role.descriptionKey)}
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      {role.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {t(feature)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected Summary */}
        {selectedRoles.length > 0 && (
          <div className="bg-secondary/50 rounded-lg p-4 mb-8 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Selected Licenses:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRoles.map((roleId) => {
                    const role = roles.find((r) => r.id === roleId);
                    return (
                      <span
                        key={roleId}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                      >
                        {role
                          ? t(role.titleKey)
                              .replace("Become a ", "")
                              .replace("Become an ", "")
                          : roleId}
                      </span>
                    );
                  })}
                </div>
              </div>
              <Button onClick={handleContinue} className="shadow-glow">
                Continue to Application
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Submit button */}
        <div className="text-center">
          <Button
            size="lg"
            disabled={selectedRoles.length === 0}
            onClick={handleContinue}
            className="min-w-[200px]"
          >
            {selectedRoles.length === 0
              ? "Select at least one license"
              : `Apply for ${selectedRoles.length} License${
                  selectedRoles.length > 1 ? "s" : ""
                }`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Info Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>{t("roleSelection.notSure")}</p>
          <Button
            variant="link"
            className="text-primary"
            onClick={() => navigate("/services")}
          >
            {t("roleSelection.learnMoreAboutRoles")}
          </Button>
        </div>
      </div>
    </div>
  );
}
