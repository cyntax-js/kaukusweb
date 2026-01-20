import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { platformApi, type KycType } from "@/api/platform";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const dashboardRoutes: Record<KycType, string> = {
  broker: "/broker/dashboard",
  dealer: "/dealer/dashboard",
  issuer: "/issuing-house/dashboard",
  market_makers: "/market-maker/dashboard",
};

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCheckingKyc, setIsCheckingKyc] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.pleaseAllFields"));
      return;
    }

    const success = await login(email, password);

    if (success) {
      // Check KYC status before navigating
      setIsCheckingKyc(true);
      try {
        const kycResponse = await platformApi.broker.getKycStatus();
        
        if (kycResponse.data && kycResponse.data.length > 0) {
          const item = kycResponse.data[0];
          
          if (item.kyc_status === "pending") {
            // KYC still pending - go to awaiting approval
            navigate("/awaiting-approval");
          } else if (item.kyc_status === "approved" && item.kyc_types) {
            if (item.kyc_types.length === 1) {
              // Single approved license - go directly to that dashboard
              const license = item.kyc_types[0];
              navigate(dashboardRoutes[license] || "/");
            } else if (item.kyc_types.length > 1) {
              // Multiple approved licenses - go to dashboard selection
              navigate("/dashboard-selection-kyc");
            } else {
              // No licenses - go to role selection
              navigate("/role-selection");
            }
          } else if (item.kyc_status === "rejected") {
            // Rejected - show error or go to role selection
            navigate("/role-selection");
          } else {
            // No KYC data - go to role selection for new application
            navigate("/role-selection");
          }
        } else {
          // No KYC data - go to role selection for new application
          navigate("/role-selection");
        }
      } catch (error) {
        // Error checking KYC - default to role selection
        console.error("Error checking KYC status:", error);
        navigate("/role-selection");
      } finally {
        setIsCheckingKyc(false);
      }
    } else {
      setError(t("auth.invalidCredentials"));
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">{t("auth.welcomeBack")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("auth.signInToAccount")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/20">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("auth.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading || isCheckingKyc}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("auth.password")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("auth.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading || isCheckingKyc}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading || isCheckingKyc}>
          {isLoading || isCheckingKyc ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> 
              {isCheckingKyc ? "Checking status..." : t("auth.signingIn")}
            </>
          ) : (
            t("common.signIn")
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        {t("auth.dontHaveAccount")}{" "}
        <Link to="/signup" className="text-primary hover:underline">
          {t("common.signup")}
        </Link>
      </p>
    </div>
  );
}
