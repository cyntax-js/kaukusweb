import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { TrendingUp, Building2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuthStore();
  const { t } = useTranslation();

  const handleSelectRole = (role: "broker" | "dealer") => {
    setSelectedRole(role);
    navigate(
      role === "broker" ? "/broker/requirements" : "/dealer/application"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t("roleSelection.chooseYourPath")}</h1>
          <p className="text-muted-foreground">
            {t("roleSelection.selectParticipation")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="p-8 hover-lift cursor-pointer group"
            onClick={() => handleSelectRole("broker")}
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">{t("roleSelection.becomeBroker")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("roleSelection.brokerDescription")}
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>• {t("roleSelection.whiteLabelPlatforms")}</li>
              <li>• {t("roleSelection.customizableTemplates")}</li>
              <li>• {t("roleSelection.userFeeManagement")}</li>
            </ul>
            <Button className="w-full group-hover:shadow-glow">
              {t("common.selectBroker")} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          <Card
            className="p-8 hover-lift cursor-pointer group"
            onClick={() => alert("Dealer role coming soon!")}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">{t("roleSelection.becomeDealer")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("roleSelection.dealerDescription")}
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>• {t("roleSelection.directMarketAccess")}</li>
              <li>• {t("roleSelection.institutionalApi")}</li>
              <li>• {t("roleSelection.riskManagementTools")}</li>
            </ul>
            <Button variant="outline" className="w-full" disabled>
              {t("common.selectDealer")} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
