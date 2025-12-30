import { Link } from "react-router-dom";
import { TrendingUp, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/pricing", label: "Pricing" },
    { href: "#", label: "Features" },
    { href: "#", label: "API Documentation" },
    { href: "#", label: "Integrations" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Press" },
  ],
  Legal: [
    { href: "/legal", label: "Terms of Service" },
    { href: "/legal", label: "Privacy Policy" },
    { href: "/legal", label: "Compliance" },
    { href: "/legal", label: "Cookies" },
  ],
  Support: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Status" },
    { href: "#", label: "Security" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ContisX</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The enterprise-grade stock liquidity provider powering the next
              generation of brokers and dealers.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ContisX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">
              Regulated by SEC, FCA, ASIC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
