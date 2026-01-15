import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrendingUp, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore, UserRole } from "@/stores/authStore";

import Logo from "@/assets/logo.png";

type NavLink = { href: string; label: string };

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

function LanguageSwitcher() {
  // minimal placeholder for the language switcher used in the navbar
  return (
    <button aria-label="Change language" className="text-sm px-2 py-1">
      EN
    </button>
  );
}

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, getSelectedRole, logout, _hasHydrated } =
    useAuthStore();

  const selectedRole: UserRole = getSelectedRole();

  const handleLogout = () => {
    logout();
  };

  if (!_hasHydrated) {
    return null;
  }

  return (
    <>
      {/* Desktop nav*/}
      <nav className="hidden fixed top-6 left-0 right-0 z-50 xl:flex items-center justify-between border border-border/50 rounded-2xl max-w-7xl mx-auto px-4 py-3 glass shadow-[0px_1px_2px_0px_#0A0D120D]">
        <Link to="/" className="flex items-center gap-2 ">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">ContiSX</span>
        </Link>

        <div className="py-2 flex gap-x-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "rounded-lg font-semibold transition-colors",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          {isAuthenticated ? (
            <div className="flex gap-3">
              {selectedRole === "broker" && (
                <Link
                  to="/broker/dashboard"
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  <Button size="lg">Broker Dashboard</Button>
                </Link>
              )}
              {selectedRole === "dealer" && (
                <Link
                  to="/dealer/dashboard"
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  <Button size="lg">Dealer Dashboard</Button>
                </Link>
              )}

              <Button variant="outline" size="lg" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>
              <Link
                to="/signup"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                <Button size="lg">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="xl:hidden fixed top-6 left-4 right-4 z-50 flex items-center justify-between border border-border/50 rounded-2xl px-4 py-3 glass shadow-[0px_1px_2px_0px_#0A0D120D]">
        <Link to="/">
          <img src={Logo} alt="ContiSX logo" />
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 border border-border/50 rounded-2xl bg-white shadow-[0px_1px_2px_0px_#0A0D120D] transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen
              ? "opacity-100 max-h-[35rem] translate-y-0"
              : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"
          )}
        >
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-lg font-semibold transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="pt-4 space-y-2">
                <Link to="/dashboard">
                  <Button size="sm" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-4 space-y-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
