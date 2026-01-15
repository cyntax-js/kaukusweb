import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.pleaseAllFields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("auth.invalidEmail"));
      return;
    }

    if (password.length < 8) {
      setError(t("auth.passwordMinLength"));
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError(t("auth.passwordUppercase"));
      return;
    }

    if (!/\d/.test(password)) {
      setError(t("auth.passwordNumbers"));
      return;
    }

    try {
      await signup(email, password);
      navigate("/verify-email");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">{t("auth.createAccount")}</h1>
      <p className="text-muted-foreground mb-8">{t("auth.startJourney")}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200 whitespace-pre-line">
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
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
              {t("auth.creatingAccount")}
            </>
          ) : (
            t("auth.createAccount")
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        {t("auth.alreadyHaveAccount")}{" "}
        <Link to="/login" className="text-primary hover:underline">
          {t("common.signIn")}
        </Link>
      </p>
    </div>
  );
}
