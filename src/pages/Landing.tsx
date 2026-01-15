import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { mockStats, mockMarkets } from "@/mocks/data";
import { useState, useEffect } from "react";
import avatarGroup from "@/assets/avatargroup.png";
import avatargroup2 from "@/assets/avatargroup2.png";
import engineRing from "@/assets/cardImg1.png";
import marketSpikes from "@/assets/cardImg2.png";
import infraWire from "@/assets/cardImg3.png";
import bgLines from "@/assets/bgLines.png";
import bgLines2 from "@/assets/bgLines2.png";
import heroLines from "@/assets/heroLines.svg";
import checkIcon from "@/assets/checkIcon.png";
import spiralAbstract from "@/assets/spiralAbstract.png";
import circularAbstract from "@/assets/circularAbstract.png";
import bottomshape from "@/assets/bottomshape.svg";
import afriexmbank from "@/assets/afriexmbank.png";
import tekedia from "@/assets/tekedia.png";
import sec from "@/assets/sec.svg";
import zenith from "@/assets/zenith.png";
import ubabank from "@/assets/ubabank.png";
import MarketSummaryChart from "@/components/layout/MarketSummaryChart";
import { cn } from "@/lib";
import { useAuthStore, UserRole } from "@/stores/authStore";

// Market Ticker Component
function MarketTicker() {
  const [markets, setMarkets] = useState(mockMarkets);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prev) =>
        prev.map((market) => ({
          ...market,
          price: market.price * (1 + (Math.random() - 0.5) * 0.002),
          change: market.change + (Math.random() - 0.5) * 0.1,
          changePercent: market.changePercent + (Math.random() - 0.5) * 0.05,
        })),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border-y border-border overflow-hidden">
      <div className="flex animate-ticker">
        {[...markets, ...markets].map((market, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-3 border-r border-border whitespace-nowrap"
          >
            <span className="font-semibold">{market.symbol}</span>
            <span className="font-mono">₦{market.price.toFixed(2)}</span>
            <span
              className={
                market.change >= 0 ? "text-success" : "text-destructive"
              }
            >
              {market.change >= 0 ? "+" : ""}
              {market.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardBase =
  "relative overflow-hidden rounded-[20px] p-10 " +
  "bg-[radial-gradient(120%_120%_at_10%_10%,#141a22_0%,#070a0f_60%)] " +
  "border border-white/5";

function FeaturesGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* LEFT – Tall Card */}
      <Card className={`${cardBase} h-[800px] row-span-2 `}>
        <h3 className="text-2xl font-semibold mb-4 text-white mt-5">
          The Engine
        </h3>
        <p className="text-md text-white/80 max-w-md leading-relaxed">
          Powers order execution, pricing, and settlement with
          institutional-grade precision and reliability.
        </p>

        {/* Decorative object */}
        <img
          src={engineRing}
          alt=""
          className="
            absolute
            m-auto
            left-[0px]
            right-[0px]
            bottom-[10%]
            w-[400px]
            opacity-100
            pointer-events-none
          "
        />
      </Card>

      {/* TOP RIGHT */}
      <Card
        className={`${cardBase} h-full flex flex-col justify-end align-end`}
      >
        <h3 className="text-xl font-semibold mb-3 text-white">The Market</h3>
        <p className="text-md text-white/80 max-w-sm">
          Connects brokers with dealers and institutions providing liquidity
          across multiple asset classes.
        </p>

        <img
          src={marketSpikes}
          alt=""
          className="
            absolute
            right-[0px]
            top-[0px]
            w-[200px]
            opacity-100
            pointer-events-none
          "
        />
      </Card>

      {/* BOTTOM RIGHT */}
      <Card
        className={`${cardBase} h-full flex flex-col justify-end align-end`}
      >
        <h3 className="text-xl font-semibold mb-3 text-white">
          Infrastructure
        </h3>
        <p className="text-md text-white/80 max-w-sm">
          Enables brokers to deploy branded trading platforms without building
          from scratch.
        </p>

        <img
          src={infraWire}
          alt=""
          className="
            absolute
            right-[0px]
            top-[0px]
            w-[220px]
            opacity-100
            pointer-events-none
          "
        />
      </Card>
    </div>
  );
}

// For Brokers/Dealers Section
function AudienceCards() {
  return (
    <div className="">
      {" "}
      {/* Dark overall background */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {/* 01 - Brokers Card */}
        <div className="relative bg-[#1B1F28] backdrop-blur-sm rounded-3xl p-12 overflow-hidden rounded-[15px] pt-[100px] pb-[100px]">
          <img
            src={bgLines}
            alt=""
            className="
           absolute
            right-[0px]
            left-[0px]
            top-[0px]
            w-[100%]
            opacity-100
            pointer-events-none"
          />
          <div className="absolute bottom-[0px] bg-gradient-to-t from-[#1B1F28] via-[#1B1F28] to-[#1B1F28]/0 w-full h-[80%] left-0" />
          <img
            src={avatargroup2}
            alt=""
            className="w-[70%] justify-self-center mb-[50px]"
          />
          <div className="relative z-10">
            <p className="text-gray-500 text-lg mb-4">01 —</p>
            <h3 className="text-2xl font-bold text-white mb-4">
              Brokers connect and deploy platforms
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Brokers integrate with ContiSX infrastructure and launch their
              branded trading platforms.
            </p>
          </div>
        </div>

        {/* 02 - Dealers Card */}
        <div className="relative bg-[#1B1F28] backdrop-blur-sm rounded-3xl p-12 overflow-hidden rounded-[15px] pt-[100px] pb-[100px]">
          <img
            src={bgLines}
            alt=""
            className="
           absolute
            right-[0px]
            left-[0px]
            top-[0px]
            w-[100%]
            opacity-100
            pointer-events-none"
          />
          <div className="absolute bottom-[0px] bg-gradient-to-t from-[#1B1F28] via-[#1B1F28] to-[#1B1F28]/0 w-full h-[80%] left-0" />
          <img
            src={avatargroup2}
            alt=""
            className="w-[70%] justify-self-center mb-[50px]"
          />
          <div className="relative z-10">
            <p className="text-gray-500 text-lg mb-4">02 —</p>
            <h3 className="text-2xl font-bold text-white mb-4">
              Dealers provide institutional liquidity
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Dealers provide bids, asks, and market participation across broker
              platforms.
            </p>
          </div>
        </div>
      </div>
      {/* Optional: 03 - Traders Card (full-width to match the bottom span in the image) */}
      <div className="relative bg-[#1B1F28] backdrop-blur-sm rounded-3xl p-12 overflow-hidden flex items-center justify-between pt-[100px] pb-[100px] rounded-[15px]">
        <img
          src={bgLines2}
          alt=""
          className="
           absolute
            right-[0px]
            left-[0px]
            top-[0px]
            w-[100%]
            opacity-100
            pointer-events-none
            "
        />
        <div className="relative z-10 flex-1">
          <p className="text-gray-500 text-lg mb-4">03 —</p>
          <h3 className="text-2xl font-bold text-white mb-4">
            Traders trade on broker platforms
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-lg">
            End users trade on broker platforms. ContiSX remains invisible,
            powering everything behind the scenes.
          </p>
        </div>
        {/* Placeholder for abstract 3D graphic - replace with your asset */}
        <div className="flex-1 flex justify-end">
          <img
            src={engineRing}
            alt=""
            className="
            absolute
            right-[-50px]
            top-[-70px]
            w-[50%]
            opacity-100
            pointer-events-none"
          />
        </div>
        <div className="absolute top-[70px] bg-gradient-to-t from-[#1B1F28] via-[#1B1F28] to-[#1B1F28]/0 w-full h-full left-0" />
      </div>
    </div>
  );
}

const forBrokers = [
  {
    txt: "Deploy white-label trading platforms",
  },
  {
    txt: "Configure services, fees, and users",
  },
  {
    txt: "Access institutional liquidity",
  },
  {
    txt: "Operate with compliance-first foundation",
  },
];

const forDealers = [
  {
    txt: "Manage bids, asks, and exposure",
  },
  {
    txt: "Access aggregated broker demand",
  },
  {
    txt: "Transparent settlement and reporting",
  },
  {
    txt: "Institutional-grade controls",
  },
];

// For Brokers/Dealers Section2
function BrokerDealers() {
  const { getSelectedRole } = useAuthStore();
  const selectedRole: UserRole = getSelectedRole();
  return (
    <>
      <div className="relative bg-[#FAFAFA] rounded-3xl p-10 overflow-hidden flex items-center justify-between  rounded-[20px]">
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl md:text-4xl font-medium text-black mb-8">
            For Brokers
          </h3>
          <div className="flex flex-col">
            {forBrokers.map((data) => (
              <div className="flex items-center mb-4">
                <img src={checkIcon} alt="" className="mr-3 w-5 h-5" />
                <p className="text-[#535862] text-md font-normal">{data.txt}</p>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            asChild
            className="shadow-glow hover:shadow-glow-lg transition-shadow px-4 mt-10"
          >
            <Link to="/broker/dashboard">
              {selectedRole === "broker"
                ? "Continue as Broker"
                : "Apply as Broker"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="flex-1 flex justify-end ml-5">
          <img
            src={spiralAbstract}
            alt=""
            className="
            w-[100%]
            pointer-events-none"
          />
        </div>
      </div>
      <div className="relative bg-[#FAFAFA] rounded-3xl p-10 overflow-hidden flex items-center justify-between  rounded-[20px] mt-20">
        <div className="flex-1 flex justify-end mr-5">
          <img
            src={circularAbstract}
            alt=""
            className="
            w-[100%]
            pointer-events-none"
          />
        </div>
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl md:text-4xl font-medium text-black mb-8">
            For Dealers & Institutions
          </h3>
          <div className="flex flex-col">
            {forDealers.map((data) => (
              <div className="flex items-center mb-4">
                <img src={checkIcon} alt="" className="mr-3 w-5 h-5" />
                <p className="text-[#535862] text-md font-normal">{data.txt}</p>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="py-6 hover:bg-black bg-[#fff] mt-10"
          >
            <Link to="/signup">
              {selectedRole === "dealer"
                ? "Continue as Dealer"
                : "Apply as Dealer"}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

const complianceCards = [
  {
    title: "KYC / AML Readiness",
    txt: "Full compliance with know-your-customer and anti-money laundering requirements.",
  },
  {
    title: "Audit-Friendly Reporting",
    txt: "Transparent, auditable transaction and settlement records.",
  },
  {
    title: "Transparent Settlement",
    txt: "Clear, real-time settlement visibility for all participants.",
  },
  {
    title: "Institutional Controls",
    txt: "Risk management and exposure controls for institutional participants.",
  },
];
// For Brokers/Dealers Section2
function Compliance() {
  return (
    <div className=" grid grid-cols-4 gap-3">
      {complianceCards.map((data) => (
        <Card className="flex flex-col p-6 h-[300px] justify-between rounded-[20px] border-none shadow-none bg-[#FAFAFA]">
          <h1 className="text-1xl md:text-2xl uppercase text-[#000]">
            {data.title}
          </h1>
          <p className="text-[#535862] text-sm font-normal">{data.txt}</p>
        </Card>
      ))}
    </div>
  );
}

export default function Landing() {
  const faqItems = [
    {
      question: "What is ContiSX and what does it provide?",
      answer:
        "ContiSX is a market infrastructure platform that enables brokers to deploy and operate trading platforms while connecting to institutional liquidity providers. It provides the underlying execution, liquidity, and operational foundation, while brokers retain full control over their brand, users, and business model.",
    },
    {
      question: "Who can use ContiSX?",
      answer:
        "Brokers, dealers, and institutions can use ContiSX to power their trading platforms and access aggregated liquidity.",
    },
    {
      question: "What trading services can brokers offer on ContiSX?",
      answer:
        "Brokers can offer a range of trading services across multiple asset classes backed by ContiSX execution and settlement infrastructure.",
    },
    {
      question: "Does ContiSX handle compliance and regulation?",
      answer:
        "ContiSX provides compliance-friendly tools and reporting to support KYC/AML and audit requirements, while brokers remain responsible for regulatory obligations in their jurisdictions.",
    },
    {
      question: "Is ContiSX visible to end users?",
      answer:
        "No — ContiSX operates invisibly behind broker-branded platforms, providing the backend execution and liquidity.",
    },
  ];

  const majorIndices = [
    {
      name: "ContiSX ASI",
      ticker: "CSI",
      value: "76,500.00",
      change: "+1.25%",
    },
    {
      name: "ContiSX Banking",
      ticker: "CSB",
      value: "32,100.50",
      change: "-0.45%",
    },
    {
      name: "ContiSX Consumer Goods",
      ticker: "CSC",
      value: "45,300.75",
      change: "+0.85%",
    },
    {
      name: "ContiSX Industrial Goods",
      ticker: "CSI",
      value: "28,750.20",
      change: "+0.15%",
    },
    {
      name: "ContiSX Oil & Gas",
      ticker: "COSG",
      value: "15,600.10",
      change: "-0.30%",
    },
    {
      name: "ContiSX Insurance",
      ticker: "CSI",
      value: "12,450.60",
      change: "+0.95%",
    },
    {
      name: "ContiSX Pension",
      ticker: "CSP",
      value: "9,800.40",
      change: "+0.50%",
    },
  ];

  const mockStats = [
    { label: "Brokers Deployed", value: "50", symbol: "+" },
    { label: "Daily Trading Volume", value: "₦2T", symbol: "+" },
    { label: "Uptime SLA", value: "99.99", symbol: "%" },
    { label: "Market Coverage", value: "24/7", symbol: "" },
  ];

  const { getSelectedRole } = useAuthStore();
  const selectedRole: UserRole = getSelectedRole();

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#fff] md:pb-10">
        <img
          src={heroLines}
          alt=""
          className="
           absolute
            right-[0px]
            left-[0px]
            top-[0px]
            w-[65%]
            opacity-100
            pointer-events-none
            m-auto
            "
        />
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight opacity-0 animate-fade-in stagger-1 mt-6">
              Market Infrastructure for Brokers &
              <span className="gradient-text"> Institutions.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#535862] mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in stagger-2 mt-6 mb-[50px]">
              ContiSX provides the liquidity, execution, and platform
              infrastructure that powers broker trading platforms, without being
              visible to end users.
            </p>
            <img
              src={avatarGroup}
              alt="avatarGroup"
              className="w-25 h-10 justify-self-center mx-auto mb-8 opacity-0 animate-fade-in stagger-3"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in stagger-3">
              <Button
                size="lg"
                asChild
                className="shadow-glow hover:shadow-glow-lg transition-shadow px-4 py-6"
              >
                {selectedRole === "broker" ? (
                  <Link to="/broker/dashboard">
                    Continue as Broker
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                ) : (
                  <Link to="/dealer/dashboard">
                    Continue as Dealer
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="py-6 hover:bg-black bg-[#fff]"
              >
                {selectedRole === "broker" ? (
                  <Link to="/signup">Apply as Dealer</Link>
                ) : (
                  <Link to="/broker/requirements">Apply as Broker</Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Market Ticker */}
      <MarketTicker />

      {/* ==== demo stocks  */}
      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="text-start mb-6">
            <h2 className="text-xl md:text-3xl font-bold mb-4">
              Market Indices
            </h2>
          </div>

          <div className="flex  justify-between">
            <div className="flex-1 flex flex-col border rounded-[15px] ">
              <div className="flex items-center gap-3 p-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                  <span className="text-white font-semibold">C</span>
                </div>
                <div className="flex flex-col">
                  <h3>ContiSX All Share Index</h3>
                  <h1 className="flex items-center gap-1 text-2xl font-semibold">
                    ₦765,000.00{" "}
                    <p className="text-green-500 text-base">+10.05%</p>
                  </h1>
                </div>
              </div>
              <div className="mt-5 h-[300px] pb-2 pr-2">
                <MarketSummaryChart />
              </div>
              <p className="p-4 text-xs text-black/50 text-center">
                The All-Share Index tracks the general market movement of all
                listed equities on Nigerian Exchange, including those listed on
                the Growth Board, regardless of capitalization.
              </p>
            </div>
            <div className="w-1/3 flex flex-col pl-5">
              <h1 className="text-xl">Major Indices</h1>
              <div className="mt-5 flex flex-col gap-2">
                {majorIndices.map((data) => (
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white",
                        )}
                        style={{
                          backgroundColor: (() => {
                            const words = data.name.split(" ").filter(Boolean);
                            const initials = words
                              .slice(0, 2)
                              .map((w) => w[0])
                              .join("")
                              .toUpperCase();
                            const hash = Array.from(initials).reduce(
                              (acc, c) => acc * 31 + c.charCodeAt(0),
                              0,
                            );
                            const hue = Math.abs(hash) % 360;
                            return `hsl(${hue} 65% 50%)`;
                          })(),
                        }}
                      >
                        {(() => {
                          const words = data.name.split(" ").filter(Boolean);
                          return words
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")
                            .toUpperCase();
                        })()}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold">{data.name}</p>
                        <span className="text-[12px] bg-gray-100 rounded-md px-2 py-1 w-fit">
                          {data.ticker}
                        </span>
                      </div>
                    </div>
                    <span className="flex items-end gap-1 flex-col font-semibold">
                      ₦{data.value}{" "}
                      <p className="text-green-500">{data.change}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#fff] pt-0">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What is ContiSX?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to operate a world-class trading
              infrastructure
            </p>
          </div>
          <FeaturesGrid />
        </div>
      </section>
      {/* Backed By / Partners Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Curved dark background */}
        <img
          src={bottomshape}
          alt=""
          className="absolute bottom-0 left-0 w-full"
        />
        {/* Content */}
        <div className="relative z-10 container mx-auto px-8 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gray-500 text-lg mb-14">Our Partners....</p>

            <div className="flex items-center justify-center gap-10 flex-wrap opacity-80">
              <div className="flex items-center gap-2">
                <img
                  src={afriexmbank}
                  alt="afriexmbank logo"
                  className="h-10"
                />
                <p className="font-bold text-xl text-[#000]">Afriexmbank</p>
              </div>

              <img src={tekedia} alt="tekedia logo" className="h-10" />

              <div className="flex items-center gap-2">
                <img src={sec} alt={"sec logo"} className="h-10" />
                <p className="font-bold text-xl text-[#000]">SEC</p>
              </div>

              <img src={zenith} alt="zenith logo" className="h-12" />
              <img src={ubabank} alt="ubabank logo" className="h-12" />
            </div>
          </div>
        </div>

        {/* Bottom thin bar */}
        <div className="absolute bottom-0 left-0 w-full h-[25px] bg-[#14181F]" />
      </section>

      {/* how ContiSX works*/}
      <section className="py-20 bg-[#14181F] pt-40">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">
              How ContiSX Works
            </h2>
            <p className="text-white/70 max-w-2xl mb-4">
              A simple, transparent flow connecting market participants
            </p>
            <Button
              size="lg"
              asChild
              className="shadow-glow hover:shadow-glow-lg transition-shadow px-4"
            >
              {selectedRole === "broker" ? (
                <Link to="/broker/dashboard">
                  Continue as Broker
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              ) : (
                <Link to="/dealer/dashboard">
                  Continue as Dealer
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              )}
            </Button>
          </div>
          <AudienceCards />
        </div>
      </section>

      {/* ContiSX Metrics */}

      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="text-left mb-[200px]">
            <h2 className="text-2xl md:text-4xl font-semibold mb-4">Metrics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {mockStats.map((stat) => (
              <div
                key={stat.label}
                className="text-left flex flex-col gap-[150px] border-l  md:border-l border-gray-200 px-4 py-0"
              >
                <p className="text-gray-500 text-sm font-bold">{stat.label}</p>
                <h3 className="text-4xl md:text-6xl font-bold text-[#1570EF] m=t-2 flex items-end">
                  {stat.value} <p className="text-4xl">{stat.symbol}</p>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* what ContiSX is built for  */}
      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <div className="flex items-end gap-3 mb-4 w-full justify-end">
              <div className="w-5 h-5 rounded-full bg-[#17B26A]"></div>
              <p className="text-3xl text-right">Level up</p>
            </div>

            <h2
              className="text-3xl md:text-7xl font-semibold mb-2 text-black uppercase mt-8"
              style={{ lineHeight: "1.2" }}
            >
              Built for Brokers, Dealers, and Markets
            </h2>
          </div>

          <BrokerDealers />
        </div>
      </section>
      {/* compliance & governance*/}
      <section className="py-20 bg-[#fff]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-left mb-12 flex items-center justify-between mb-[60px]">
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#000]">
                Compliance & Governance
              </h2>
              <p className="text-[#000]/50 max-w-2xl mb-4">
                Built with institutional requirements at its core
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="py-6 hover:bg-black bg-[#fff] px-5"
              >
                <Link to="/pricing">Compliance Details</Link>
              </Button>

              <Button
                size="lg"
                asChild
                className="shadow-glow hover:shadow-glow-lg transition-shadow py-6 "
              >
                <Link to="/signup">Terms & Privacy</Link>
              </Button>
            </div>
          </div>

          <Compliance />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#14181F] text-white pt-40">
        <div className="container mx-auto flex gap-12">
          {/* Left Column */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl/[50px] font-bold">
              Do You Have Any
              <br />
              Questions?
            </h1>
            <p className="mt-6 text-white/70">
              Contact us if you have any other questions.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex-[2]">
            <div className="space-y-0">
              {faqItems.map((question, index) => (
                <div key={index}>
                  <details className="group py-8">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <span className="text-md font-medium pr-8">
                        {question.question}
                      </span>
                      <span className="text-2xl text-white/50 group-open:hidden">
                        +
                      </span>
                      <span className="text-2xl text-white/50 hidden group-open:inline">
                        -
                      </span>
                    </summary>
                    <hr className="border-white/10 mt-6 mb-8" />
                    <p className="text-white/70 leading-relaxed max-w-3xl">
                      {question.answer}
                    </p>
                  </details>
                  <hr className="border-white/30" />
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-16 border-[0.5px] border-white rounded-[15px] p-5 flex items-center justify-between">
              <div>
                <p className="text-md font-medium">
                  Still have a question in mind?
                </p>
                <p className="mt-2 text-white/70 text-sm">
                  Contact us if you have any other questions.
                </p>
              </div>
              <Button
                size="lg"
                asChild
                className="bg-[#3b8aff] hover:bg-[#4D9CFF] text-white font-medium px-8 py-4 "
              >
                <Link to="#">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <Card className="gradient-primary p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold mr-4">
                Start with the Role that Fits Your Institution
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="hover:bg-black hover:text-white bg-white px-6 py-4 text-[#000]"
                >
                  {selectedRole === "broker" ? (
                    <Link to="/broker/dashboard">Continue as Broker</Link>
                  ) : (
                    <Link to="/dealer/dashboard">Continue as Dealer</Link>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-[#fff] bg-white/0 hover:bg-black hover:text-white"
                  asChild
                >
                  {selectedRole === "broker" ? (
                    <Link to="/dealer/requirements">Apply as Dealer</Link>
                  ) : (
                    <Link to="/broker/requirements">Apply as Broker</Link>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
