import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { mockMarkets } from "@/mocks/data";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
        }))
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
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className={`${cardBase} h-[800px] row-span-2 `}>
        <h3 className="text-2xl font-semibold mb-4 text-white mt-5">
          {t("landing.theEngine")}
        </h3>
        <p className="text-md text-white/80 max-w-md leading-relaxed">
          {t("landing.theEngineDescription")}
        </p>
        <img
          src={engineRing}
          alt=""
          className="absolute m-auto left-[0px] right-[0px] bottom-[10%] w-[400px] opacity-100 pointer-events-none"
        />
      </Card>

      <Card className={`${cardBase} h-full flex flex-col justify-end align-end`}>
        <h3 className="text-xl font-semibold mb-3 text-white">{t("landing.theMarket")}</h3>
        <p className="text-md text-white/80 max-w-sm">
          {t("landing.theMarketDescription")}
        </p>
        <img
          src={marketSpikes}
          alt=""
          className="absolute right-[0px] top-[0px] w-[200px] opacity-100 pointer-events-none"
        />
      </Card>

      <Card className={`${cardBase} h-full flex flex-col justify-end align-end`}>
        <h3 className="text-xl font-semibold mb-3 text-white">
          {t("landing.infrastructure")}
        </h3>
        <p className="text-md text-white/80 max-w-sm">
          {t("landing.infrastructureDescription")}
        </p>
        <img
          src={infraWire}
          alt=""
          className="absolute right-[0px] top-[0px] w-[220px] opacity-100 pointer-events-none"
        />
      </Card>
    </div>
  );
}

function AudienceCards() {
  const { t } = useTranslation();
  
  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <div className="relative bg-[#1B1F28] backdrop-blur-sm rounded-3xl p-12 overflow-hidden rounded-[15px] pt-[100px] pb-[100px]">
          <img src={bgLines} alt="" className="absolute right-[0px] left-[0px] top-[0px] w-[100%] opacity-100 pointer-events-none" />
          <div className="absolute bottom-[0px] bg-gradient-to-t from-[#1B1F28] via-[#1B1F28] to-[#1B1F28]/0 w-full h-[80%] left-0" />
          <img src={avatargroup2} alt="" className="w-[70%] justify-self-center mb-[50px]" />
          <div className="relative z-10">
            <p className="text-gray-500 text-lg mb-4">01 —</p>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("landing.brokersConnectDeploy")}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t("landing.brokersConnectDescription")}
            </p>
          </div>
        </div>

        <div className="relative bg-[#1B1F28] backdrop-blur-sm rounded-3xl p-12 overflow-hidden rounded-[15px] pt-[100px] pb-[100px]">
          <img src={bgLines} alt="" className="absolute right-[0px] left-[0px] top-[0px] w-[100%] opacity-100 pointer-events-none" />
          <div className="absolute bottom-[0px] bg-gradient-to-t from-[#1B1F28] via-[#1B1F28] to-[#1B1F28]/0 w-full h-[80%] left-0" />
          <img src={avatargroup2} alt="" className="w-[70%] justify-self-center mb-[50px]" />
          <div className="relative z-10">
            <p className="text-gray-500 text-lg mb-4">02 —</p>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("landing.dealersProvideLiquidity")}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t("landing.dealersProvideDescription")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-[#1B1F28] backdrop-blur-sm rounded-3xl p-12 overflow-hidden flex items-center justify-between pt-[100px] pb-[100px] rounded-[15px]">
        <img src={bgLines2} alt="" className="absolute right-[0px] left-[0px] top-[0px] w-[100%] opacity-100 pointer-events-none" />
        <div className="relative z-10 flex-1">
          <p className="text-gray-500 text-lg mb-4">03 —</p>
          <h3 className="text-2xl font-bold text-white mb-4">
            {t("landing.tradersTradeOnPlatforms")}
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-lg">
            {t("landing.tradersTradeDescription")}
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <img src={engineRing} alt="" className="absolute right-[-50px] top-[-70px] w-[50%] opacity-100 pointer-events-none" />
        </div>
        <div className="absolute top-[70px] bg-gradient-to-t from-[#1B1F28] via-[#1B1F28] to-[#1B1F28]/0 w-full h-full left-0" />
      </div>
    </div>
  );
}

function BrokerDealers() {
  const { t } = useTranslation();
  
  const forBrokers = [
    { txt: t("landing.deployWhiteLabel") },
    { txt: t("landing.configureServices") },
    { txt: t("landing.accessLiquidity") },
    { txt: t("landing.operateCompliance") },
  ];

  const forDealers = [
    { txt: t("landing.manageBidsAsks") },
    { txt: t("landing.accessAggregatedDemand") },
    { txt: t("landing.transparentSettlement") },
    { txt: t("landing.institutionalControls") },
  ];

  return (
    <>
      <div className="relative bg-[#FAFAFA] rounded-3xl p-10 overflow-hidden flex items-center justify-between rounded-[20px]">
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl md:text-4xl font-medium text-black mb-8">
            {t("landing.forBrokers")}
          </h3>
          <div className="flex flex-col">
            {forBrokers.map((data, i) => (
              <div key={i} className="flex items-center mb-4">
                <img src={checkIcon} alt="" className="mr-3 w-5 h-5" />
                <p className="text-[#535862] text-md font-normal">{data.txt}</p>
              </div>
            ))}
          </div>
          <Button size="lg" asChild className="shadow-glow hover:shadow-glow-lg transition-shadow px-4 mt-10">
            <Link to="/services">
              {t("common.continueAsBroker")}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="flex-1 flex justify-end ml-5">
          <img src={spiralAbstract} alt="" className="w-[100%] pointer-events-none" />
        </div>
      </div>
      
      <div className="relative bg-[#FAFAFA] rounded-3xl p-10 overflow-hidden flex items-center justify-between rounded-[20px] mt-20">
        <div className="flex-1 flex justify-end mr-5">
          <img src={circularAbstract} alt="" className="w-[100%] pointer-events-none" />
        </div>
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl md:text-4xl font-medium text-black mb-8">
            {t("landing.forDealers")}
          </h3>
          <div className="flex flex-col">
            {forDealers.map((data, i) => (
              <div key={i} className="flex items-center mb-4">
                <img src={checkIcon} alt="" className="mr-3 w-5 h-5" />
                <p className="text-[#535862] text-md font-normal">{data.txt}</p>
              </div>
            ))}
          </div>
          <Button size="lg" variant="outline" asChild className="py-6 hover:bg-black bg-[#fff] mt-10">
            <Link to="/signup">{t("common.applyAsDealer")}</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function Compliance() {
  const { t } = useTranslation();
  
  const complianceCards = [
    { title: t("landing.kycAmlReadiness"), txt: t("landing.kycAmlDescription") },
    { title: t("landing.auditFriendlyReporting"), txt: t("landing.auditFriendlyDescription") },
    { title: t("landing.transparentSettlementTitle"), txt: t("landing.transparentSettlementDescription") },
    { title: t("landing.institutionalControlsTitle"), txt: t("landing.institutionalControlsDescription") },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {complianceCards.map((data, i) => (
        <Card key={i} className="flex flex-col p-6 h-[300px] justify-between rounded-[20px] border-none shadow-none bg-[#FAFAFA]">
          <h1 className="text-1xl md:text-2xl uppercase text-[#000]">{data.title}</h1>
          <p className="text-[#535862] text-sm font-normal">{data.txt}</p>
        </Card>
      ))}
    </div>
  );
}

export default function Landing() {
  const { t } = useTranslation();

  const faqItems = [
    { question: t("landing.faq1Question"), answer: t("landing.faq1Answer") },
    { question: t("landing.faq2Question"), answer: t("landing.faq2Answer") },
    { question: t("landing.faq3Question"), answer: t("landing.faq3Answer") },
    { question: t("landing.faq4Question"), answer: t("landing.faq4Answer") },
    { question: t("landing.faq5Question"), answer: t("landing.faq5Answer") },
  ];

  const majorIndices = [
    { name: "ContiSX ASI", ticker: "CSI", value: "76,500.00", change: "+1.25%" },
    { name: "ContiSX Banking", ticker: "CSB", value: "32,100.50", change: "-0.45%" },
    { name: "ContiSX Consumer Goods", ticker: "CSC", value: "45,300.75", change: "+0.85%" },
    { name: "ContiSX Industrial Goods", ticker: "CSI", value: "28,750.20", change: "+0.15%" },
    { name: "ContiSX Oil & Gas", ticker: "COSG", value: "15,600.10", change: "-0.30%" },
    { name: "ContiSX Insurance", ticker: "CSI", value: "12,450.60", change: "+0.95%" },
    { name: "ContiSX Pension", ticker: "CSP", value: "9,800.40", change: "+0.50%" },
  ];

  const mockStats = [
    { label: t("landing.brokersDeployed"), value: "50", symbol: "+" },
    { label: t("landing.dailyTradingVolume"), value: "₦2T", symbol: "+" },
    { label: t("landing.uptimeSLA"), value: "99.99", symbol: "%" },
    { label: t("landing.marketCoverage"), value: "24/7", symbol: "" },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#fff] md:pb-10">
        <img src={heroLines} alt="" className="absolute right-[0px] left-[0px] top-[0px] w-[65%] opacity-100 pointer-events-none m-auto" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight opacity-0 animate-fade-in stagger-1 mt-6">
              {t("landing.hero.title")}
              <span className="gradient-text"> {t("landing.hero.titleHighlight")}</span>
            </h1>

            <p className="text-lg md:text-xl text-[#535862] mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in stagger-2 mt-6 mb-[50px]">
              {t("landing.hero.description")}
            </p>
            <img src={avatarGroup} alt="avatarGroup" className="w-25 h-10 justify-self-center mx-auto mb-8 opacity-0 animate-fade-in stagger-3" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in stagger-3">
              <Button size="lg" asChild className="shadow-glow hover:shadow-glow-lg transition-shadow px-4 py-6">
                <Link to="/services">
                  {t("common.continueAsBroker")}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="py-6 hover:bg-black bg-[#fff]">
                <Link to="/signup">{t("common.applyAsDealer")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MarketTicker />

      {/* Market Indices */}
      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="text-start mb-6">
            <h2 className="text-xl md:text-3xl font-bold mb-4">{t("landing.marketIndices")}</h2>
          </div>

          <div className="flex justify-between">
            <div className="flex-1 flex flex-col border rounded-[15px]">
              <div className="flex items-center gap-3 p-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                  <span className="text-white font-semibold">C</span>
                </div>
                <div className="flex flex-col">
                  <h3>{t("landing.allShareIndex")}</h3>
                  <h1 className="flex items-center gap-1 text-2xl font-semibold">
                    ₦765,000.00 <p className="text-green-500 text-base">+10.05%</p>
                  </h1>
                </div>
              </div>
              <div className="mt-5 h-[300px] pb-2 pr-2">
                <MarketSummaryChart />
              </div>
              <p className="p-4 text-xs text-black/50 text-center">
                {t("landing.allShareDescription")}
              </p>
            </div>
            <div className="w-1/3 flex flex-col pl-5">
              <h1 className="text-xl">{t("landing.majorIndices")}</h1>
              <div className="mt-5 flex flex-col gap-2">
                {majorIndices.map((data, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn("w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white")}
                        style={{
                          backgroundColor: (() => {
                            const words = data.name.split(" ").filter(Boolean);
                            const initials = words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
                            const hash = Array.from(initials).reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0);
                            const hue = Math.abs(hash) % 360;
                            return `hsl(${hue} 65% 50%)`;
                          })(),
                        }}
                      >
                        {(() => {
                          const words = data.name.split(" ").filter(Boolean);
                          return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
                        })()}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold">{data.name}</p>
                        <span className="text-[12px] bg-gray-100 rounded-md px-2 py-1 w-fit">{data.ticker}</span>
                      </div>
                    </div>
                    <span className="flex items-end gap-1 flex-col font-semibold">
                      ₦{data.value} <p className="text-green-500">{data.change}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("landing.whatIsContiSX")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("landing.whatIsDescription")}</p>
          </div>
          <FeaturesGrid />
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative bg-white overflow-hidden">
        <img src={bottomshape} alt="" className="absolute bottom-0 left-0 w-full" />
        <div className="relative z-10 container mx-auto px-8 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gray-500 text-lg mb-14">{t("landing.ourPartners")}</p>
            <div className="flex items-center justify-center gap-10 flex-wrap opacity-80">
              <div className="flex items-center gap-2">
                <img src={afriexmbank} alt="afriexmbank logo" className="h-10" />
                <p className="font-bold text-xl text-[#000]">Afriexmbank</p>
              </div>
              <img src={tekedia} alt="tekedia logo" className="h-10" />
              <div className="flex items-center gap-2">
                <img src={sec} alt="sec logo" className="h-10" />
                <p className="font-bold text-xl text-[#000]">SEC</p>
              </div>
              <img src={zenith} alt="zenith logo" className="h-12" />
              <img src={ubabank} alt="ubabank logo" className="h-12" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[25px] bg-[#14181F]" />
      </section>

      {/* How ContiSX Works */}
      <section className="py-20 bg-[#14181F] pt-40">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">{t("landing.howContiSXWorks")}</h2>
            <p className="text-white/70 max-w-2xl mb-4">{t("landing.howContiSXDescription")}</p>
            <Button size="lg" asChild className="shadow-glow hover:shadow-glow-lg transition-shadow px-4">
              <Link to="/services">
                {t("common.continueAsBroker")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <AudienceCards />
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="text-left mb-[200px]">
            <h2 className="text-2xl md:text-4xl font-semibold mb-4">{t("landing.metrics")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {mockStats.map((stat) => (
              <div key={stat.label} className="text-left flex flex-col gap-[150px] border-l md:border-l border-gray-200 px-4 py-0">
                <p className="text-gray-500 text-sm font-bold">{stat.label}</p>
                <h3 className="text-4xl md:text-6xl font-bold text-[#1570EF] m=t-2 flex items-end">
                  {stat.value} <p className="text-4xl">{stat.symbol}</p>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Brokers */}
      <section className="py-20 bg-[#fff]">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <div className="flex items-end gap-3 mb-4 w-full justify-end">
              <div className="w-5 h-5 rounded-full bg-[#17B26A]"></div>
              <p className="text-3xl text-right">{t("landing.levelUp")}</p>
            </div>
            <h2 className="text-3xl md:text-7xl font-semibold mb-2 text-black uppercase mt-8" style={{ lineHeight: "1.2" }}>
              {t("landing.builtForBrokers")}
            </h2>
          </div>
          <BrokerDealers />
        </div>
      </section>

      {/* Compliance & Governance */}
      <section className="py-20 bg-[#fff]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-left mb-12 flex items-center justify-between mb-[60px]">
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#000]">{t("landing.complianceAndGovernance")}</h2>
              <p className="text-[#000]/50 max-w-2xl mb-4">{t("landing.complianceDescription")}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="lg" variant="outline" asChild className="py-6 hover:bg-black bg-[#fff] px-5">
                <Link to="/pricing">{t("common.complianceDetails")}</Link>
              </Button>
              <Button size="lg" asChild className="shadow-glow hover:shadow-glow-lg transition-shadow py-6">
                <Link to="/signup">{t("common.termsAndPrivacy")}</Link>
              </Button>
            </div>
          </div>
          <Compliance />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#14181F] text-white pt-40">
        <div className="container mx-auto flex gap-12">
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl/[50px] font-bold">
              {t("landing.faqTitle").split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}
            </h1>
            <p className="mt-6 text-white/70">{t("landing.faqDescription")}</p>
          </div>

          <div className="flex-[2]">
            <div className="space-y-0">
              {faqItems.map((question, index) => (
                <div key={index}>
                  <details className="group py-8">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <span className="text-md font-medium pr-8">{question.question}</span>
                      <span className="text-2xl text-white/50 group-open:hidden">+</span>
                      <span className="text-2xl text-white/50 hidden group-open:inline">-</span>
                    </summary>
                    <hr className="border-white/10 mt-6 mb-8" />
                    <p className="text-white/70 leading-relaxed max-w-3xl">{question.answer}</p>
                  </details>
                  <hr className="border-white/30" />
                </div>
              ))}
            </div>

            <div className="mt-16 border-[0.5px] border-white rounded-[15px] p-5 flex items-center justify-between">
              <div>
                <p className="text-md font-medium">{t("landing.stillHaveQuestion")}</p>
                <p className="mt-2 text-white/70 text-sm">{t("landing.contactIfQuestions")}</p>
              </div>
              <Button size="lg" asChild className="bg-[#3b8aff] hover:bg-[#4D9CFF] text-white font-medium px-8 py-4">
                <Link to="#">
                  {t("common.contactUs")}
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
              <h2 className="text-xl md:text-2xl font-semibold mr-4">{t("landing.ctaTitle")}</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="hover:bg-black hover:text-white bg-white px-6 py-4 text-[#000]">
                  <Link to="/services">{t("common.continueAsBroker")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-[#fff] bg-white/0 hover:bg-black hover:text-white" asChild>
                  <Link to="/signup">{t("common.applyAsDealer")}</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
