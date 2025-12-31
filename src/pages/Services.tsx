import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Fan, Feather, Dice5 } from "lucide-react";

import HeroBg from "@/assets/about-background-pattern.png";
import BadgeGroup from "@/assets/badge-group.png";
import AvatarGroup from "@/assets/avatargroup.png";
import Abstract from "@/assets/abstract-i.png";
import AbstractII from "@/assets/abstract-ii.png";
import AbstractIII from "@/assets/abstract-iii.png";
import AbstractIV from "@/assets/abstract-iv.png";
import FanIcon from "@/assets/fan.svg";
import FanIconWhite from "@/assets/fan-white.svg";
import FeatherIconWhite from "@/assets/feather-white.svg";
import DotsSixIconWhite from "@/assets/dots-six-white.svg";
import DiceFiveIconWhite from "@/assets/dice-five-white.svg";

const BaaSInfo = [
  {
    icon: <img src={FanIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "01_",
    header: "Market Infrastructure",
    paragraph: "Execution, pricing, liquidity, and settlement.",
  },
  {
    icon: <img src={FeatherIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "02_",
    header: "White-Label Platform",
    paragraph:
      "Deploy branded trading interfaces without building from scratch.",
  },
  {
    icon: <img src={DotsSixIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "03_",
    header: "Compliance-First Operations",
    paragraph: "KYC/AML readiness, auditability, and reporting.",
  },
  {
    icon: <img src={DiceFiveIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "04_",
    header: "Scalable Architecture",
    paragraph: "Add markets, regions, and products as you grow.",
  },
];

const BaaSService = [
  {
    icon: <img src={FanIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "01_",
    header: "Apply and get approved as a broker",
    paragraph: "Submit your application and complete KYC requirements.",
  },
  {
    icon: <img src={FeatherIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "02_",
    header: "Select desired trading services",
    paragraph: "Choose from Stock, Futures, Options, or a combination.",
  },
  {
    icon: <img src={DotsSixIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "03_",
    header: "Choose platform template and branding",
    paragraph: "Customize the white-label interface with your brand.",
  },
  {
    icon: <img src={FeatherIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "04_",
    header: "Deploy platform",
    paragraph: "Launch your branded trading platform live.",
  },
  {
    icon: <img src={DotsSixIconWhite} alt="Fan Icon" className="h-fit" />,
    digits: "05_",
    header: "Manage users, fees, and analytics",
    paragraph: "Operate your platform with full control and visibility.",
  },
];

const tradingServices = [
  {
    image: Abstract,
    icon: <img src={FanIcon} alt="Fan Icon" />,
    header: "Stock Trading",
    itEnables:
      "Immediate buying and selling of assets at current market prices.",
    listOneHeader: "Broker value",
    listOne: [
      "Offer straightforward trading for entry-level and advanced users",
      "High liquidity through institutional dealers",
      "Simple fee structures",
    ],
    listTwoHeader: "Broker value",
    listTwo: [
      "Order execution engine",
      "Market pricing from dealers",
      "Trade settlement",
      "Broker-controlled fees",
    ],
    useCase:
      "Ideal for brokers targeting direct asset ownership and high-volume trading.",
  },
  {
    image: AbstractII,
    icon: <img src={FanIcon} alt="Fan Icon" />,
    header: "Derivatives Trading",
    itEnables:
      "Derivatives allow traders to gain exposure to asset price movements without owning the underlying asset.",
    listOneHeader: "Why this matters for brokers",
    listOne: [
      "Higher trading volumes",
      "Advanced trading strategies",
      "Increased fee opportunities",
    ],
    listTwoHeader: "Included derivative markets",
    listTwo: ["Futures", "Options", "Futures Options"],
    useCase: "Derivatives are a parent service category.",
  },
  {
    image: AbstractIII,
    icon: <img src={FanIcon} alt="Fan Icon" />,
    header: "Futures Trading",
    itEnables:
      "Contracts to buy or sell assets at a predetermined price on a future date.",
    listOneHeader: "Broker value",
    listOne: [
      "Leverage and hedging tools for advanced traders",
      "Higher engagement and volume",
      "Institutional liquidity participation",
    ],
    listTwoHeader: "Infrastructure provided",
    listTwo: [
      "Margin management",
      "Risk controls",
      "Contract lifecycle handling",
      "Dealer-backed pricing",
    ],
    useCase:
      "Suitable for brokers serving professional and high-frequency traders.",
  },
  {
    image: AbstractIV,
    icon: <img src={FanIcon} alt="Fan Icon" />,
    header: "Private Market",
    itEnables:
      "Immediate buying and selling of assets at current market prices.",
    listOneHeader: "Broker value",
    listOne: [
      "Offer straightforward trading for entry-level and advanced users",
      "High liquidity through institutional dealers",
      "Simple fee structures",
    ],
    listTwoHeader: "Infrastructure provided",
    listTwo: [
      "Order execution engine",
      "Market pricing from dealers",
      "Trade settlement",
      "Broker-controlled fees",
    ],
    useCase:
      "Ideal for brokers targeting direct asset ownership and high-volume trading.",
  },
];

const complianceDetails = [
  {
    heading: "KYC / AML Readiness",
    paragraph:
      "Full compliance with know-your-customer and anti-money laundering requirements",
  },
  {
    heading: "Audit-Friendly Reporting",
    paragraph: "Transparent, auditable transaction and settlement records",
  },
  {
    heading: "Transparent Settlement",
    paragraph: "Clear, real-time settlement visibility for all participants",
  },
  {
    heading: "Institutional Controls",
    paragraph:
      "Risk management and exposure controls for institutional participants",
  },
];

export default function Services() {
  return (
    <div className="xl:pt-20">
      {/* Hero */}
      <section
        style={{ backgroundImage: `url('${HeroBg}')` }}
        className="container mx-auto lg:pt-44 px-4 mb-20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <img src={BadgeGroup} alt="" className="mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Broker-as-a-Service <br />
            Infrastructure
          </h1>
          <p className="text-lg text-muted-foreground opacity-0 animate-fade-in stagger-1 leading-7 max-w-[36.6em] mx-auto">
            Kaukus enables brokers to deploy, operate, and scale trading
            platforms across multiple asset classes using a single, compliant
            market infrastructure.
          </p>
          <img
            src={AvatarGroup}
            alt="Avatar Group"
            className="h-10 mx-auto my-12 animate-fade-in"
          />
          <div className="flex-1 lg:flex-[0_0_auto] flex flex-col-reverse lg:flex-row flex-wrap justify-center gap-3 animate-fade-in">
            <Button
              variant="outline"
              className="px-5 py-4 h-fit w-full md:w-auto"
            >
              Apply as Dealer
            </Button>
            <Button
              variant="default"
              className="px-5 py-4 h-fit w-full md:w-auto"
            >
              Continue as Broker
            </Button>
          </div>
        </div>
      </section>

      {/* BaaS info */}
      <section className="bg-secondary-blue py-20 mb-20">
        <div className="mx-auto mb-20 px-4 text-secondary-blue-foreground max-w-7xl">
          <small className="uppercase text-secondary-blue-foreground/60">
            Stay Updated
          </small>
          <h3 className="text-3xl font-bold my-3">
            What is Broker-as-a-Service?
          </h3>
          <p className="max-w-4xl">
            Broker-as-a-Service means Kaukus provides the core infrastructure
            required to operate a brokerage, while you control the brand, users,
            fees, and market offering.
          </p>
        </div>

        <div className="flex flex-wrap gap-y-3 justify-between text-secondary-blue-foreground max-w-7xl mx-auto px-6">
          {BaaSInfo.map((item, index) => (
            <div
              key={index}
              className="flex flex-[0_0_100%] lg:flex-[0_0_33%] bg-secondary-blue-foreground/5 lg:last:flex-[0_0_100%] gap-4 border-[0.5px] border-solid border-secondary-blue-border rounded-2xl px-7 pt-7 pb-14"
            >
              {item.icon}
              <div className="">
                <p className="text-xs mb-2 text-secondary-blue-foreground/60">
                  {item.digits}
                </p>
                <div className="flex flex-col">
                  <h4 className="font-medium text-lg">{item.header}</h4>
                  <p className="text-secondary-blue-foreground/60">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 mb-20">
        <div className="flex flex-wrap gap-y-6 items-center justify-between mx-auto max-w-7xl">
          <div className="text-secondary-blue">
            <small className="uppercase opacity-30">Stay Updated</small>
            <h3 className="text-3xl font-bold my-3">
              Supported Trading Services
            </h3>
            <p className="max-w-xl opacity-60">
              Kaukus allows brokers to selectively enable trading services based
              on their business model, regulatory scope, and target market.
            </p>
          </div>
          <div className="flex-1 lg:flex-[0_0_auto] flex flex-col-reverse lg:flex-row flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              className="px-5 py-4 h-fit w-full md:w-auto"
            >
              Apply as Dealer
            </Button>
            <Button
              variant="default"
              className="px-5 py-4 h-fit w-full md:w-auto"
            >
              Continue as Broker
            </Button>
          </div>
        </div>

        <div className="pt-20">
          {tradingServices.map((service, index) => (
            <div
              key={index}
              className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-y-9 mx-auto max-w-7xl"
            >
              <img src={service.image} alt="abstract 3d model" />
              <div className="flex flex-col gap-5 max-w-xl">
                <div className="">
                  <span className="bg-gray-100 h-9 w-9 rounded-xl flex items-center justify-center mb-4">
                    {service.icon}
                  </span>
                  <h3 className="text-3xl font-semibold mb-2">
                    {service.header}
                  </h3>

                  <h5 className="text-lg text-gray-700 font-medium">
                    What it enables
                  </h5>
                  <p className="text-gray-500">{service.itEnables}</p>
                </div>
                <div className="">
                  <h5 className="text-lg text-gray-700 font-semibold">
                    {service.listOneHeader}
                  </h5>
                  <ul className="list-disc list-inside text-gray-500">
                    {service.listOne.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <h5 className="text-lg text-gray-700 font-semibold">
                    {service.listTwoHeader}
                  </h5>
                  <ul className="list-disc list-inside text-gray-500">
                    {service.listTwo.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-500">
                  <span className="text-[#175CD3] font-semibold">
                    Use Case:{" "}
                  </span>{" "}
                  {service.useCase}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BaaS Services */}
      <section className="bg-secondary-blue py-20">
        <div className="mx-auto mb-20 px-4 text-secondary-blue-foreground max-w-7xl">
          <small className="uppercase text-secondary-blue-foreground/60">
            Stay Updated
          </small>
          <h3 className="text-3xl font-bold my-3">
            How Brokers Enable Services on Kaukus
          </h3>
          <p className="max-w-4xl">
            Services are fully configurable to your business model
          </p>
        </div>

        <div className="flex flex-wrap gap-y-3 justify-between text-secondary-blue-foreground max-w-7xl mx-auto px-6">
          {BaaSService.map((item, index) => (
            <div
              key={index}
              className="flex items-start flex-[0_0_100%] lg:flex-[0_0_33%] bg-secondary-blue-foreground/5 lg:last:flex-[0_0_50%] lg:[&:nth-child(4)]:flex-[0_0_49.5%] gap-4 border-[0.5px] border-solid border-secondary-blue-border rounded-2xl px-7 pt-7 pb-14"
            >
              {item.icon}
              <div className="">
                <p className="text-xs mb-2 text-secondary-blue-foreground/60">
                  {item.digits}
                </p>
                <div className="flex flex-col">
                  <h4 className="font-medium text-lg">{item.header}</h4>
                  <p className="text-secondary-blue-foreground/60">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white pt-36 px-4 py-24 lg:px-8">
        <div className="flex flex-wrap gap-y-6 items-center justify-center lg:justify-between mx-auto max-w-7xl">
          <div className="text-secondary-blue">
            <h3 className="text-3xl font-bold my-3">Compliance & Governance</h3>
            <p className="max-w-xl opacity-60">
              Built with institutional requirements at its core
            </p>
          </div>
          <div className="flex-1 lg:flex-[0_0_auto] flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              className="px-5 py-4 h-fit w-full md:w-auto"
            >
              Compliance Details
            </Button>
            <Button
              variant="default"
              className="px-5 py-4 h-fit w-full md:w-auto"
            >
              Terms & Privacy{" "}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-3 justify-center lg:justify-start mt-20 max-w-7xl mx-auto px-4 lg:px-0">
          {complianceDetails.map((detail, index) => (
            <div
              key={index}
              className="text-gray-900 bg-[#FAFAFA] p-8 flex flex-col gap-32 rounded-2xl md:max-w-[19.375rem]"
            >
              <h3 className="text-4xl">{detail.heading}</h3>
              <p className="text-gray-400">{detail.paragraph}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pt-4 pb-20 bg-white">
        <Card className="bg-[#1570EF] p-8 lg:p-16 text-white flex flex-wrap md:gap-9 md:flex-nowrap gap-y-6 justify-between max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Start with the Role that Fits Your Institution
          </h2>
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <Button size="lg" className="bg-white text-black w-full md:w-auto">
              <Link to="#">Continue as Broker</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent w-full md:w-auto"
            >
              <Link to="#">Apply as Dealer</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
