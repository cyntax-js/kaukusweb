import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrendingUp, Menu, X } from "lucide-react";
import { useState } from "react";

import Logo from "@/assets/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/individuals", label: "Individuals" },
  // { href: "/businesses", label: "Businesses" },
  // { href: "/institutions", label: "Institutions" },
  // { href: "/company", label: "Company" },
  // { href: "/developers", label: "Developers" },
];

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop nav*/}
      <nav className="hidden fixed top-6 left-0 right-0 z-50 xl:flex items-center justify-between border border-border/50 rounded-2xl max-w-7xl mx-auto px-4 py-3 glass shadow-[0px_1px_2px_0px_#0A0D120D]">
        <Link to="/">
          <img src={Logo} alt="" />
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
            <Button size="lg">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="xl:hidden fixed top-6 left-4 right-4 z-50 flex items-center justify-between border border-border/50 rounded-2xl px-4 py-3 glass shadow-[0px_1px_2px_0px_#0A0D120D]">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>

        <div
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className=""
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
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
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
              <Button size="sm" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
