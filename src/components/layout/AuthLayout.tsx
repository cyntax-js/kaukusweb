import { Outlet, Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">ContiSX</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">
              Power Your Trading Infrastructure
            </h1>
            <p className="text-lg text-white/80">
              Join the leading stock liquidity provider. Access
              institutional-grade infrastructure, deploy your broker platform,
              and scale to millions.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-white/60">
            <span>SEC Regulated</span>
            <span>•</span>
            <span>FCA Authorized</span>
            <span>•</span>
            <span>ASIC Licensed</span>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ContiSX</span>
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
