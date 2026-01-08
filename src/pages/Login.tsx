import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
<<<<<<< HEAD
import { useBrokerStore } from "@/stores/brokerStore";
import { Loader2, Eye, EyeOff } from "lucide-react";
=======
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
>>>>>>> 8d450c0 (Changes)

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
=======
  const { t } = useTranslation();
>>>>>>> 8d450c0 (Changes)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.pleaseAllFields"));
      return;
    }

<<<<<<< HEAD
    await login(email, password);
=======
    const success = await login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError(t("auth.invalidCredentials"));
    }
>>>>>>> 8d450c0 (Changes)
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">{t("auth.welcomeBack")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("auth.signInToAccount")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
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
<<<<<<< HEAD
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
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
=======
          <Label htmlFor="password">{t("auth.password")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("auth.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
>>>>>>> 8d450c0 (Changes)
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("auth.signingIn")}
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
