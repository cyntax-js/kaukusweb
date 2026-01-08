import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import XIcon from "@/assets/x-icon.png";
import LinkedinIcon from "@/assets/linkedin-icon.png";
import GithubIcon from "@/assets/github-icon.png";
import FacebookIcon from "@/assets/facebook-icon.png";
import Logo from "@/assets/logo-white.png";
import ISO from "@/assets/iso.png";
import AICPA from "@/assets/aicpa-soc.png";

const socialLinks = [
  { href: "#", icon: <img src={XIcon} alt="X" /> },
  { href: "#", icon: <img src={LinkedinIcon} alt="Linkedin" /> },
  { href: "#", icon: <img src={FacebookIcon} alt="Facebook" /> },
  { href: "#", icon: <img src={GithubIcon} alt="Github" /> },
];

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    [t("footer.tradingTools")]: [
      { href: "#", label: t("footer.positionBuilder") },
      { href: "#", label: t("footer.kaucusMetrics") },
      { href: "#", label: t("footer.kaucusTools") },
    ],
    [t("footer.devHub")]: [
      { href: "#", label: t("footer.apiDocumentation") },
      { href: "#", label: t("footer.bugBountyProgram") },
    ],
    [t("footer.learn")]: [
      { href: "#", label: t("footer.articles") },
      { href: "#", label: t("footer.optionsCourse") },
      { href: "#", label: t("footer.industryNews") },
      { href: "#", label: t("footer.marketResearch") },
      { href: "#", label: t("footer.exchangeUpdates") },
    ],
    [t("common.about")]: [
      { href: "#", label: t("footer.aboutUs") },
      { href: "#", label: t("footer.careers") },
      { href: "#", label: t("footer.partners") },
      { href: "#", label: t("footer.security") },
    ],
    [t("common.legal")]: [
      { href: "#", label: t("footer.termsOfServices") },
      { href: "#", label: t("footer.privacyNotice") },
      { href: "#", label: t("footer.riskDisclosure") },
      { href: "#", label: t("footer.affiliateProgram") },
      { href: "#", label: t("footer.complaintsForm") },
    ],
    [t("footer.support")]: [
      { href: "#", label: t("footer.supportCenter") },
      { href: "#", label: t("footer.telegramSupport") },
    ],
  };

  return (
    <footer className="bg-secondary-blue text-secondary-blue-foreground px-10">
      <div className="flex justify-between flex-col lg:flex-row gap-y-12 max-w-[93rem] mx-auto pt-16 pb-12">
        <div className="space-y-6 max-w-80">
          <img src={Logo} alt="" className="" />
          <p className="text-secondary-blue-foreground/60">
            {t("footer.tagline")}
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
          {t("footer.copyright")}
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
