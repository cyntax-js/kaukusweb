import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/authStore";
import { useLicenseStore, type LicenseType } from "@/stores/licenseStore";
import { 
  TrendingUp, 
  Building2, 
  Landmark, 
  BarChart3, 
  ArrowRight, 
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type RoleConfig = {
  id: LicenseType;
  icon: typeof TrendingUp;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  route: string;
  gradient: string;
  popular?: boolean;
  isBroker?: boolean;
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
    route: "/broker/requirements",
    gradient: "from-primary to-primary/70",
    popular: true,
    isBroker: true,
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
    route: "/dealer/dashboard",
    gradient: "from-chart-2 to-chart-2/70",
  },
  {
    id: "issuing_house",
    icon: Landmark,
    titleKey: "roleSelection.becomeIssuingHouse",
    descriptionKey: "roleSelection.issuingHouseDescription",
    features: [
      "roleSelection.ipoManagement",
      "roleSelection.securitiesIssuance",
      "roleSelection.investorRelations",
    ],
    route: "/issuing-house/dashboard",
    gradient: "from-chart-4 to-chart-4/70",
  },
  {
    id: "market_maker",
    icon: BarChart3,
    titleKey: "roleSelection.becomeMarketMaker",
    descriptionKey: "roleSelection.marketMakerDescription",
    features: [
      "roleSelection.liquidityProvision",
      "roleSelection.spreadManagement",
      "roleSelection.automatedQuoting",
    ],
    route: "/market-maker/dashboard",
    gradient: "from-chart-5 to-chart-5/70",
  },
];

type FlowStep = "selection" | "approving" | "approved";

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuthStore();
  const { applyForLicense, approveLicense, getApprovedLicenses } = useLicenseStore();
  const { t } = useTranslation();

  const [selectedRoles, setSelectedRoles] = useState<LicenseType[]>([]);
  const [flowStep, setFlowStep] = useState<FlowStep>("selection");
  const [approvalProgress, setApprovalProgress] = useState(0);

  const nonBrokerRoles = roles.filter((r) => !r.isBroker);
  const brokerRole = roles.find((r) => r.isBroker)!;

  const handleSelectBroker = () => {
    setSelectedRole("broker");
    navigate(brokerRole.route);
  };

  const toggleRole = (roleId: LicenseType) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId) ? prev.filter((r) => r !== roleId) : [...prev, roleId]
    );
  };

  const handleSubmitApplication = async () => {
    if (selectedRoles.length === 0) return;

    // Apply for all selected licenses
    selectedRoles.forEach((roleId) => {
      applyForLicense(roleId);
    });

    setFlowStep("approving");
    setApprovalProgress(0);

    // Simulate 10 second approval process
    const duration = 10000;
    const interval = 100;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setApprovalProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        // Approve all selected licenses
        selectedRoles.forEach((roleId) => {
          approveLicense(roleId);
        });
        setFlowStep("approved");
      }
    }, interval);
  };

  const handleGoToDashboard = () => {
    const approvedLicenses = getApprovedLicenses();
    if (approvedLicenses.length === 1) {
      const license = approvedLicenses[0];
      const role = roles.find((r) => r.id === license.type);
      if (role) {
        navigate(role.route);
      }
    } else {
      navigate("/dashboard-selection");
    }
  };

  // Step 2: Approval in progress
  if (flowStep === "approving") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Processing Your Application</h1>
          <p className="text-muted-foreground mb-6">
            Your license applications are being reviewed. This typically takes a few moments.
          </p>
          
          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${approvalProgress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round(approvalProgress)}% complete
          </p>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Applying for: {selectedRoles.map((r) => {
                const role = roles.find((x) => x.id === r);
                return role ? t(role.titleKey).replace("Become a ", "").replace("Become an ", "") : r;
              }).join(", ")}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Step 3: Approval success
  if (flowStep === "approved") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Application Approved!</h1>
          <p className="text-muted-foreground mb-6">
            Congratulations! Your license applications have been approved. You can now access your dashboards.
          </p>
          
          <div className="space-y-3 mb-6">
            {selectedRoles.map((roleId) => {
              const role = roles.find((r) => r.id === roleId);
              if (!role) return null;
              return (
                <div
                  key={roleId}
                  className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
                >
                  <role.icon className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">
                    {t(role.titleKey).replace("Become a ", "").replace("Become an ", "")} License
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-success ml-auto" />
                </div>
              );
            })}
          </div>

          <Button className="w-full" onClick={handleGoToDashboard}>
            {selectedRoles.length > 1 ? "Select Dashboard" : "Go to Dashboard"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>
    );
  }

  // Step 1: Selection
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto animate-fade-in">
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
            {t("roleSelection.selectParticipation")}
          </p>
        </div>

        {/* Broker Card - Exclusive Path */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
            Broker Path
            <span className="text-xs text-muted-foreground font-normal">(Exclusive - deploy white-label trading platforms)</span>
          </h2>
          <Card
            className="p-6 hover-lift cursor-pointer group relative overflow-hidden transition-all"
            onClick={handleSelectBroker}
          >
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Most Popular
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${brokerRole.gradient} flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow`}
              >
                <brokerRole.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-2">{t(brokerRole.titleKey)}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(brokerRole.descriptionKey)}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
                  {brokerRole.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {t(feature)}
                    </li>
                  ))}
                </ul>
                <Button className="group-hover:shadow-glow">
                  {t("common.getStarted")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Other Roles - Multi-select */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-chart-2 text-primary-foreground flex items-center justify-center text-sm">2</span>
            Institutional Path
            <span className="text-xs text-muted-foreground font-normal">(Select one or more)</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {nonBrokerRoles.map((role, i) => {
              const isSelected = selectedRoles.includes(role.id);
              return (
                <Card
                  key={role.id}
                  className={`p-6 cursor-pointer group relative overflow-hidden transition-all opacity-0 animate-fade-in border-2 ${
                    isSelected ? "border-primary bg-primary/5" : "border-transparent hover:border-muted"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => toggleRole(role.id)}
                >
                  <div className="absolute top-4 right-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRole(role.id)}
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shrink-0 mb-4 transition-shadow ${
                        isSelected ? "shadow-glow" : ""
                      }`}
                    >
                      <role.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{t(role.titleKey)}</h3>
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
                </Card>
              );
            })}
          </div>

          {/* Submit button for institutional path */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              disabled={selectedRoles.length === 0}
              onClick={handleSubmitApplication}
              className="min-w-[200px]"
            >
              {selectedRoles.length === 0
                ? "Select at least one role"
                : `Apply for ${selectedRoles.length} License${selectedRoles.length > 1 ? "s" : ""}`}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Info Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>{t("roleSelection.notSure")}</p>
          <Button variant="link" className="text-primary" onClick={() => navigate("/services")}>
            {t("roleSelection.learnMoreAboutRoles")}
          </Button>
        </div>
      </div>
    </div>
  );
}
