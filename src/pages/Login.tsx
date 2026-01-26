import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { platformApi, type KycType } from "@/api/platform";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const dashboardRoutes: Record<string, string> = {
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
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingKyc, setIsCheckingKyc] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.pleaseAllFields"));
      return;
    }

    try {
      const user = await login(email, password);

      if (user) {
        const brokerPlatforms = user.broker_platforms || [];

        // Case 1: User has broker platforms from login response
        if (brokerPlatforms.length > 0) {
          if (brokerPlatforms.length === 1) {
            // Single platform - navigate directly to that dashboard
            const platform = brokerPlatforms[0].platform;
            navigate(dashboardRoutes[platform] || "/broker/dashboard");
          } else {
            // Multiple platforms - go to dashboard selection
            navigate("/dashboard-selection-kyc");
          }
          return;
        }

        // Case 2: No broker platforms - check KYC status
        setIsCheckingKyc(true);
        try {
          const kycResponse = await platformApi.broker.getKycStatus();
          console.log(kycResponse, "kycResponse");

          if (kycResponse.data && kycResponse.data.length > 0) {
            // Check for any approved licenses
            const approvedItems = kycResponse.data.filter(
              (item) => item.kyc_status === "approved"
            );
            const pendingItems = kycResponse.data.filter(
              (item) => item.kyc_status === "pending"
            );

            if (approvedItems.length > 0) {
              // Has approved licenses
              const allApprovedTypes = approvedItems.flatMap(
                (item) => item.kyc_types || []
              );
              const uniqueTypes = [...new Set(allApprovedTypes)];

              if (uniqueTypes.length === 1) {
                // Single approved license
                navigate(dashboardRoutes[uniqueTypes[0]] || "/");
              } else if (uniqueTypes.length > 1) {
                // Multiple approved licenses
                navigate("/dashboard-selection-kyc");
              } else {
                navigate("/role-selection");
              }
            } else if (pendingItems.length > 0) {
              // All are pending - show awaiting approval
              navigate("/awaiting-approval");
            } else {
              // No approved or pending - go to role selection
              navigate("/role-selection");
            }
          } else {
            // No KYC data - go to role selection
            navigate("/role-selection");
          }
        } catch (error) {
          console.error("Error checking KYC status:", error);
          navigate("/role-selection");
        } finally {
          setIsCheckingKyc(false);
        }
      } else {
        setError(t("auth.invalidCredentials"));
      }
    } catch {
      setError(t("auth.invalidCredentials"));
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">{t("auth.welcomeBack")}</h1>
      <p className="text-muted-foreground mb-8">{t("auth.signInToAccount")}</p>

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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
              disabled={isLoading || isCheckingKyc}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isCheckingKyc}
        >
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
