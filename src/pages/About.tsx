import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  Shield,
  Globe,
  Award,
  ArrowRight,
  Fan,
  Feather,
  Dice5,
} from "lucide-react";

import HeroBg from "@/assets/about-background-pattern.png";
import BadgeGroup from "@/assets/badge-group.png";
import AvatarGroup from "@/assets/avatargroup.png";
import Abstract from "@/assets/abstract-i.png";

const team = [
  { name: "Sarah Chen", role: "CEO & Co-founder", image: "SC" },
  { name: "Michael Torres", role: "CTO & Co-founder", image: "MT" },
  { name: "Emily Watson", role: "Chief Risk Officer", image: "EW" },
  { name: "James Park", role: "Head of Product", image: "JP" },
];

const milestones = [
  {
    year: "2019",
    title: "Founded",
    description:
      "ContisX was founded with a vision to democratize trading infrastructure.",
  },
  {
    year: "2020",
    title: "First Broker",
    description: "Onboarded our first broker partner, proving the concept.",
  },
  {
    year: "2021",
    title: "Series A",
    description: "Raised $25M to expand globally and build BaaS platform.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to 50+ countries with regulatory approvals.",
  },
  {
    year: "2023",
    title: "1000 Brokers",
    description: "Reached milestone of 1000+ active broker partners.",
  },
  {
    year: "2024",
    title: "Series B",
    description: "Raised $100M to accelerate growth and innovation.",
  },
];

const BaaSInfo = [
  {
    icon: <Fan />,
    digits: "01_",
    header: "Market Infrastructure",
    paragraph: "Execution, pricing, liquidity, and settlement.",
  },
  {
    icon: <Feather />,
    digits: "02_",
    header: "White-Label Platform",
    paragraph:
      "Deploy branded trading interfaces without building from scratch.",
  },
  {
    icon: <Dice5 />,
    digits: "03_",
    header: "Compliance-First Operations",
    paragraph: "KYC/AML readiness, auditability, and reporting.",
  },
  {
    icon: <Dice5 />,
    digits: "04_",
    header: "Scalable Architecture",
    paragraph: "Add markets, regions, and products as you grow.",
  },
];

const BaaSService = [
  {
    icon: <Fan />,
    digits: "01_",
    header: "Market Infrastructure",
    paragraph: "Execution, pricing, liquidity, and settlement.",
  },
  {
    icon: <Feather />,
    digits: "02_",
    header: "White-Label Platform",
    paragraph:
      "Deploy branded trading interfaces without building from scratch.",
  },
  {
    icon: <Dice5 />,
    digits: "03_",
    header: "Compliance-First Operations",
    paragraph: "KYC/AML readiness, auditability, and reporting.",
  },
  {
    icon: <Dice5 />,
    digits: "04_",
    header: "Scalable Architecture",
    paragraph: "Add markets, regions, and products as you grow.",
  },
  {
    icon: <Dice5 />,
    digits: "05_",
    header: "Scalable Architecture",
    paragraph: "Add markets, regions, and products as you grow.",
  },
];

const tradingServices = [
  {
    image: Abstract,
    icon: <Fan />,
    header: "Spot Trading",
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
    image: Abstract,
    icon: <Fan />,
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
    image: Abstract,
    icon: <Fan />,
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
    image: Abstract,
    icon: <Fan />,
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

export default function About() {
  return (
    <div className="py-20">
      {/* Hero */}
      <section
        style={{ backgroundImage: `url('${HeroBg}')` }}
        className="container mx-auto lg:pt-24 px-4 mb-20"
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
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
            <Button variant="outline" className="px-5 py-4 h-fit">
              Apply as Dealer
            </Button>
            <Button variant="default" className="px-5 py-4 h-fit">
              Continue as Broker
            </Button>
          </div>
        </div>
      </section>

      {/* BaaS info */}
      <section className="bg-secondary py-20 mb-20">
        <div className="mx-auto mb-20 px-4 text-secondary-foreground max-w-7xl">
          <small className="uppercase text-secondary-foreground/60">
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

        <div className="flex flex-wrap gap-y-3 justify-between text-secondary-foreground max-w-7xl mx-auto">
          {BaaSInfo.map((item) => (
            <div className="flex flex-[0_0_33%] bg-secondary-foreground/5 last:flex-[0_0_100%] gap-4 border-[0.5px] border-solid border-secondary-border rounded-2xl px-7 pt-7 pb-14">
              {item.icon}
              <div className="">
                <small className="mb-2 text-secondary-foreground/60">
                  {item.digits}
                </small>
                <div className="flex flex-col">
                  <h4 className="font-medium text-lg">{item.header}</h4>
                  <p className="text-secondary-foreground/60">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 mb-20">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="text-secondary">
            <small className="uppercase opacity-30">Stay Updated</small>
            <h3 className="text-3xl font-bold my-3">
              Supported Trading Services
            </h3>
            <p className="max-w-xl opacity-60">
              Kaukus allows brokers to selectively enable trading services based
              on their business model, regulatory scope, and target market.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
            <Button variant="outline" className="px-5 py-4 h-fit">
              Apply as Dealer
            </Button>
            <Button variant="default" className="px-5 py-4 h-fit">
              Continue as Broker
            </Button>
          </div>
        </div>

        <div className="pt-20">
          {tradingServices.map((service) => (
            <div className="flex flex-wrap justify-between gap-y-9 mx-auto max-w-7xl">
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
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <h5 className="text-lg text-gray-700 font-semibold">
                    {service.listTwoHeader}
                  </h5>
                  <ul className="list-disc list-inside text-gray-500">
                    {service.listTwo.map((item, index) => (
                      <li key={index}>{item}</li>
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
      <section className="bg-secondary py-20 mb-20">
        <div className="mx-auto mb-20 px-4 text-secondary-foreground max-w-7xl">
          <small className="uppercase text-secondary-foreground/60">
            Stay Updated
          </small>
          <h3 className="text-3xl font-bold my-3">
            Services are fully configurable to your business model
          </h3>
          <p className="max-w-4xl">
            Broker-as-a-Service means Kaukus provides the core infrastructure
            required to operate a brokerage, while you control the brand, users,
            fees, and market offering.
          </p>
        </div>

        <div className="flex flex-wrap gap-y-3 justify-between text-secondary-foreground max-w-7xl mx-auto">
          {BaaSService.map((item) => (
            <div className="flex flex-[0_0_33%] bg-secondary-foreground/5 last:flex-[0_0_50%] [&:nth-child(4)]:flex-[0_0_49.5%] gap-4 border-[0.5px] border-solid border-secondary-border rounded-2xl px-7 pt-7 pb-14">
              {item.icon}
              <div className="">
                <small className="mb-2 text-secondary-foreground/60">
                  {item.digits}
                </small>
                <div className="flex flex-col">
                  <h4 className="font-medium text-lg">{item.header}</h4>
                  <p className="text-secondary-foreground/60">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="text-secondary">
            <h3 className="text-3xl font-bold my-3">Compliance & Governance</h3>
            <p className="max-w-xl opacity-60">
              Built with institutional requirements at its core
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" className="px-5 py-4 h-fit">
              Compliance Details
            </Button>
            <Button variant="default" className="px-5 py-4 h-fit">
              Terms & Privacy{" "}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap mt-20 max-w-7xl mx-auto">
          <div className="text-gray-900 bg-[#FAFAFA] p-8 flex flex-col gap-32 rounded-2xl w-80">
            <h3 className="text-4xl">KYC / AML Readiness</h3>
            <p className="text-gray-400">
              Full compliance with know-your-customer and anti-money laundering
              requirements
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <Card className="bg-[#1570EF] p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            We're always looking for talented individuals who share our passion
            for transforming financial infrastructure.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="#">
              View Careers <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
