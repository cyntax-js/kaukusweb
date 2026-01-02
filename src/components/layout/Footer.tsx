import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

import XIcon from "@/assets/x-icon.png";
import LinkedinIcon from "@/assets/linkedin-icon.png";
import GithubIcon from "@/assets/github-icon.png";
import FacebookIcon from "@/assets/facebook-icon.png";
import Logo from "@/assets/logo-white.png";
import ISO from "@/assets/iso.png";
import AICPA from "@/assets/aicpa-soc.png";

const footerLinks = {
  "Trading Tools": [
    { href: "#", label: "Position Builder" },
    { href: "#", label: "Kaucus Metrics" },
    { href: "#", label: "Kaucus Tools" },
  ],
  "Dev Hub": [
    { href: "#", label: "API Documentation" },
    { href: "#", label: "Bug Bounty Program" },
  ],
  Learn: [
    { href: "#", label: "Articles" },
    { href: "#", label: "Options Course" },
    { href: "#", label: "Industry News" },
    { href: "#", label: "Market Research" },
    { href: "#", label: "Exchange Updates" },
  ],
  About: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Partners" },
    { href: "#", label: "Security" },
  ],
  Legal: [
    { href: "#", label: "Terms of Services" },
    { href: "#", label: "Privacy Notice" },
    { href: "#", label: "Risk Disclosure" },
    { href: "#", label: "Affiliate Program" },
    { href: "#", label: "Complaints Form" },
  ],
  Support: [
    { href: "#", label: "Support Center" },
    { href: "#", label: "Telegram Suport 24/7" },
  ],
};

const socialLinks = [
  { href: "#", icon: <img src={XIcon} alt="X" /> },
  { href: "#", icon: <img src={LinkedinIcon} alt="Linkedin" /> },
  { href: "#", icon: <img src={FacebookIcon} alt="Facebook" /> },
  { href: "#", icon: <img src={GithubIcon} alt="Github" /> },
];

export function Footer() {
  return (
    <footer className="bg-secondary-blue text-secondary-blue-foreground px-10">
      <div className="flex justify-between flex-col lg:flex-row gap-y-12 max-w-[93rem] mx-auto pt-16 pb-12">
        <div className="space-y-6 max-w-80">
          <img src={Logo} alt="" className="" />
          <p className="text-secondary-blue-foreground/60">
            Design amazing digital experiences that create more happy in the
            world.
          </p>
          <div className="flex gap-6">
            <img src={ISO} alt="" className="" />
            <img src={AICPA} alt="" className="" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-4 lg:gap-x-8 gap-y-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-secondary-blue-foreground/60 hover:text-secondary-blue-foreground transition-colors font-bold text-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row flex-wrap gap-y-6 justify-between max-w-7xl mx-auto py-12">
        <p className="text-secondary-blue-foreground/60">
          © 2025 Kaucus. All rights reserved.
        </p>
        <div className="flex gap-x-6">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.href} className="">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
