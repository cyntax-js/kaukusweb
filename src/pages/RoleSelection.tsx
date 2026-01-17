import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { TrendingUp, Building2, Landmark, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const roles = [
  {
    id: "broker" as const,
    icon: TrendingUp,
    titleKey: "roleSelection.becomeBroker",
    descriptionKey: "roleSelection.brokerDescription",
    features: [
      "roleSelection.whiteLabelPlatforms",
      "roleSelection.customizableTemplates",
      "roleSelection.userFeeManagement",
    ],
    route: "/broker/requirements",
    available: true,
    gradient: "from-primary to-primary/70",
    popular: true,
  },
  {
    id: "dealer" as const,
    icon: Building2,
    titleKey: "roleSelection.becomeDealer",
    descriptionKey: "roleSelection.dealerDescription",
    features: [
      "roleSelection.directMarketAccess",
      "roleSelection.institutionalApi",
      "roleSelection.riskManagementTools",
    ],
    route: "/dealer/requirements",
    available: true,
    gradient: "from-chart-2 to-chart-2/70",
  },
  {
    id: "issuing_house" as const,
    icon: Landmark,
    titleKey: "roleSelection.becomeIssuingHouse",
    descriptionKey: "roleSelection.issuingHouseDescription",
    features: [
      "roleSelection.ipoManagement",
      "roleSelection.securitiesIssuance",
      "roleSelection.investorRelations",
    ],
    route: "/issuing-house/requirements",
    available: true,
    gradient: "from-chart-4 to-chart-4/70",
  },
  {
    id: "market_maker" as const,
    icon: BarChart3,
    titleKey: "roleSelection.becomeMarketMaker",
    descriptionKey: "roleSelection.marketMakerDescription",
    features: [
      "roleSelection.liquidityProvision",
      "roleSelection.spreadManagement",
      "roleSelection.automatedQuoting",
    ],
    route: "/market-maker/requirements",
    available: true,
    gradient: "from-chart-5 to-chart-5/70",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuthStore();
  const { t } = useTranslation();

  const handleSelectRole = (role: typeof roles[number]) => {
    if (!role.available) {
      alert(`${t(role.titleKey)} coming soon!`);
      return;
    }
    setSelectedRole(role.id as "broker" | "dealer");
    navigate(role.route);
  };

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

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role, i) => (
            <Card
              key={role.id}
              className={`p-6 hover-lift cursor-pointer group relative overflow-hidden transition-all opacity-0 animate-fade-in ${
                !role.available ? "opacity-60" : ""
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => handleSelectRole(role)}
            >
              {role.popular && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow`}
                >
                  <role.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold mb-2">{t(role.titleKey)}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(role.descriptionKey)}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
                    {role.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t(feature)}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full group-hover:shadow-glow ${
                      !role.available ? "opacity-50" : ""
                    }`}
                    disabled={!role.available}
                  >
                    {role.available ? t("common.getStarted") : t("common.comingSoon")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
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
