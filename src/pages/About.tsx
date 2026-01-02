import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AbstractI from "@/assets/we-solve-abstract-i.png";
import AbstractII from "@/assets/we-solve-abstract-ii.png";
import AbstractIII from "@/assets/we-solve-abstract-iii.png";
import FanIconWhite from "@/assets/fan-white.svg";
import FeatherIconWhite from "@/assets/feather-white.svg";
import DotsSixIconWhite from "@/assets/dots-six-white.svg";
import DiceFiveIconWhite from "@/assets/dice-five-white.svg";
import VennWhite from "@/assets/venn-white.svg";
import OpenBoxWhite from "@/assets/openbox-white.svg";
import Tag1 from "@/assets/neutral-infrastructure-tag.png";
import Tag2 from "@/assets/compliance-first-design-tag.png";
import Tag3 from "@/assets/invisible-infrastructure-tag.png";
import CheckIcon from "@/assets/check-icon.png";
import NeutralInfrastructure from "@/assets/neutral-infrastructure.png";
import ComplianceFirstDesign from "@/assets/compliance-first-design.png";
import InvisibleInfrastructure from "@/assets/invisible-infrastructure.png";
import Line from "@/assets/line.png";
import Logo from "@/assets/logo.png";

const problemsWeSolve = [
  {
    smallText: "Performance",
    title: "Fragmentation",
    description:
      "Multiple disconnected systems, incompatible platforms, and no unified infrastructure for trading.",
    image: AbstractI,
    direction: "bottom",
  },
  {
    smallText: "Monitoring",
    title: "Compliance Burden",
    description:
      "Brokers spend resources on compliance instead of innovation. Regulatory requirements are complex and costly.",
    image: AbstractII,
    direction: "top",
  },
  {
    smallText: "System overview",
    title: "High Barriers",
    description:
      "Starting a brokerage requires massive capital investment and technical expertise. Market entry is difficult.",
    image: AbstractIII,
    direction: "bottom",
  },
];

const coreValues = [
  {
    icon: <img src={FanIconWhite} alt="Neutrality Icon" className="h-fit" />,
    title: "Neutrality",
    description:
      "We serve all market participants equally. No hidden advantages, no proprietary edge. Fair access for everyone.",
  },
  {
    icon: (
      <img src={FeatherIconWhite} alt="Reliability Icon" className="h-fit" />
    ),
    title: "Reliability",
    description:
      "Markets depend on us. We maintain 99.99% uptime, robust infrastructure, and instant settlement.",
  },
  {
    icon: (
      <img src={DotsSixIconWhite} alt="Transparency Icon" className="h-fit" />
    ),
    title: "Transparency",
    description:
      "All transactions, fees, and operations are transparent and auditable. No hidden costs or surprise changes.",
  },
  {
    icon: (
      <img src={DiceFiveIconWhite} alt="Innovation Icon" className="h-fit" />
    ),
    title: "Innovation",
    description:
      "We continuously improve infrastructure to support new asset classes, trading models, and market opportunities.",
  },
  {
    icon: <img src={VennWhite} alt="Compliance Icon" className="h-fit" />,
    title: "Compliance",
    description:
      "Regulatory requirements are not obstacles, they are features. We build compliance into everything.",
  },
  {
    icon: <img src={OpenBoxWhite} alt="Simplicity Icon" className="h-fit" />,
    title: "Simplicity",
    description:
      "Complex infrastructure should be invisible. Brokers deploy easily and focus on their business.",
  },
];

const ourSolution = [
  {
    tagImg: <img src={Tag1} alt="" />,
    title: "Neutral Infrastructure",
    description:
      "We are not a broker. We are the infrastructure. Kaukus remains neutral, serving all market participants equally.",
    listItems: [
      "No proprietary advantage",
      "Fair market access",
      "Transparent pricing",
    ],
    image: NeutralInfrastructure,
    direction: "ltr",
  },
  {
    tagImg: <img src={Tag2} alt="" />,
    title: "Compliance-First Design",
    description:
      "Compliance is built into the foundation, not bolted on. Brokers deploy with confidence in regulated markets.",
    listItems: ["KYC/AML ready", "Audit-friendly", "Regulatory aligned"],
    image: ComplianceFirstDesign,
    direction: "rtl",
  },
  {
    tagImg: <img src={Tag3} alt="" />,
    title: "Invisible Infrastructure",
    description:
      "Our infrastructure works seamlessly behind the scenes. Brokers focus on their business, not technology.",
    listItems: ["Fully managed", "Scalable", "Reliable"],
    image: InvisibleInfrastructure,
    direction: "ltr",
  },
];

const About = () => {
  return (
    <div className="xl:pt-20">
      {/* Hero */}
      <section className="container mx-auto lg:pt-[40px] px-4 mb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Building the invisible backbone of markets
          </h1>
          <p className="text-lg text-muted-foreground opacity-0 animate-fade-in stagger-1 leading-7 max-w-[36.6em] mx-auto">
            Kaukus exists because the financial markets deserve infrastructure
            that works seamlessly behind the scenes—neutral, reliable, and built
            for everyone.
          </p>
          <div className="my-12 flex-1 lg:flex-[0_0_auto] flex flex-col-reverse lg:flex-row flex-wrap justify-center gap-3 animate-fade-in">
            <Link to="/signup">
              {" "}
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent w-full md:w-auto"
              >
                Our Mission
              </Button>
            </Link>

            <Link to="/services">
              <Button
                variant="default"
                className="px-3 py-3 h-fit w-full md:w-auto"
              >
                Our Values
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary-blue py-20 mb-20">
        <div className="mx-auto mb-20 px-4 text-secondary-blue-foreground max-w-7xl">
          <small className="uppercase text-secondary-blue-foreground/60">
            Stay Updated
          </small>
          <h3 className="text-3xl font-bold my-3">The Problem We Solve</h3>
          <p className="max-w-4xl">
            The financial markets are fragmented. Brokers face barriers to
            entry, compliance is a burden, and infrastructure is siloed.
          </p>
        </div>

        <div className="flex flex-wrap gap-y-3 justify-between max-w-7xl mx-auto px-6">
          {problemsWeSolve.map((problem, index) => (
            <div
              key={index}
              className={`max-w-96 bg-secondary-blue-foreground/5 text-secondary-blue-foreground flex rounded-3xl overflow-hidden ${problem.direction === "bottom" ? "flex-col" : "flex-col-reverse"}`}
            >
              <div className="p-8 space-y-2">
                <small className="text-secondary-blue-foreground/60 uppercase tracking-wider">
                  {problem.smallText}
                </small>
                <h4 className="text-xl font-bold">{problem.title}</h4>
                <p className="text-secondary-blue-foreground/60">
                  {problem.description}
                </p>
              </div>
              <div className="bg-white flex-1 flex items-center justify-center">
                <img src={problem.image} alt="" className="" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto">
        <div className="mx-auto mb-20 px-4 text-black max-w-7xl">
          <small className="uppercase text-black/60">Stay Updated</small>
          <h3 className="text-3xl font-bold my-3">Our Solution</h3>
          <p className="max-w-4xl text-black/60">
            Kaukus provides the complete infrastructure layer that brokers need
            to compete and thrive.
          </p>
        </div>

        <div className="px-4">
          {ourSolution.map((solution) => (
            <div
              className={`flex flex-wrap items-center justify-between ${solution.direction == "ltr" ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className="max-w-md">
                {solution.tagImg}
                <h4 className="text-3xl mt-6 mb-4 font-semibold">
                  {solution.title}
                </h4>
                <p className="mb-8 opacity-75">{solution.description}</p>
                <ul className="space-y-5">
                  {solution.listItems.map((item) => (
                    <li className="flex items-center gap-3">
                      <img src={CheckIcon} alt="" className="" />{" "}
                      <span className="opacity-75">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white h-96 lg:h-[504px] flex items-center justify-center">
                <img src={solution.image} alt="" className="" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary-blue py-20 mb-20">
        <div className="mx-auto mb-20 px-4 text-secondary-blue-foreground max-w-7xl">
          <small className="uppercase text-secondary-blue-foreground/60">
            Stay Updated
          </small>
          <h3 className="text-3xl font-bold my-3">Our Core Values</h3>
          <p className="max-w-4xl text-secondary-blue-foreground/60">
            Everything we build is guided by these principles.
          </p>
        </div>

        <div className="flex flex-wrap gap-y-3 justify-between text-secondary-blue-foreground max-w-7xl mx-auto px-6">
          {coreValues.map((item, index) => (
            <div
              key={index}
              className="flex flex-[0_0_100%] lg:flex-[0_0_33%] bg-secondary-blue-foreground/5 gap-4 border-[0.5px] border-solid border-secondary-blue-border rounded-2xl px-7 pt-7 pb-14"
            >
              {item.icon}
              <div className="">
                <div className="flex flex-col">
                  <h4 className="font-medium text-lg">{item.title}</h4>
                  <p className="text-secondary-blue-foreground/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mx-auto mb-20 px-4 text-black max-w-7xl">
          <h3 className="text-3xl font-bold my-3">Metrics</h3>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-20">
          <div className="flex gap-5">
            <img src={Line} alt="" />
            <div className="flex flex-col justify-between">
              <p className="opacity-60 font-semibold">Brokers Deployed</p>
              <h2 className="text-[5rem] text-[#1570EF] leading-none">50+</h2>
            </div>
          </div>
          <div className="flex gap-5">
            <img src={Line} alt="" />
            <div className="flex flex-col justify-between">
              <p className="opacity-60 font-semibold">Daily Trading Volume</p>
              <h2 className="text-[5rem] text-[#1570EF] leading-none">$2B+</h2>
            </div>
          </div>
          <div className="flex gap-5">
            <img src={Line} alt="" />
            <div className="flex flex-col justify-between">
              <p className="opacity-60 font-semibold">Uptime SLA</p>
              <h2 className="text-[5rem] text-[#1570EF] leading-none">
                99.99%
              </h2>
            </div>
          </div>
          <div className="flex gap-5">
            <img src={Line} alt="" />
            <div className="flex flex-col justify-between">
              <p className="opacity-60 font-semibold">Market Coverage</p>
              <h2 className="text-[5rem] text-[#1570EF] leading-none">24/7</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] py-24">
        <div className="max-w-7xl mx-auto text-center px-4">
          <div className="flex justify-center">
            <img src={Logo} alt="" className="" />
          </div>
          <p className="mb-8 py-4 font-semibold text-lg">Our Mission</p>
          <p className="font-medium text-3xl lg:text-5xl my-8 leading-9 lg:leading-[4rem]">
            We envision a future where market infrastructure is accessible,
            fair, and invisible. Where brokers compete on service and
            innovation, not on technology. Where compliance is seamless. Where
            anyone with a great business idea can launch a trading platform.
          </p>
          <p className="text-[#1570EF] text-2xl py-8">
            Kaukus is building that future, one broker at a time.....
          </p>
        </div>
      </section>

      <section className="pt-24 pb-20 bg-white">
        <Card className="bg-[#1570EF] p-8 lg:p-16 text-white flex flex-wrap md:gap-9 md:flex-nowrap gap-y-6 justify-between max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Start with the Role that Fits Your Institution
          </h2>
          <div className="flex-1 lg:flex-[0_0_auto] flex flex-wrap justify-center gap-3">
            <Link to="/services" className="block w-full md:w-auto">
              <Button
                variant="default"
                className="px-3 py-3 h-fit w-full md:w-auto bg-white text-black"
              >
                Continue as Broker
              </Button>
            </Link>
            <Link to="/signup" className="block w-full md:w-auto">
              {" "}
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent w-full md:w-auto"
              >
                Apply as Dealer
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default About;
