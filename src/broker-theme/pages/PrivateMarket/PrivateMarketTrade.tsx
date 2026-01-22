/**
 * PRIVATE MARKET DETAIL - Polkastarter-inspired light minimalist design
 * Clean, modern UI with volume chart and detailed market information
 */

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBrokerPaths } from "@/broker-theme/hooks/useBrokerPaths";
import {
  Clock,
  Users,
  CheckCircle,
  ExternalLink,
  FileText,
  Globe,
  Twitter,
  Linkedin,
  ChevronRight,
  Shield,
  TrendingUp,
  Calendar,
  Building2,
  BadgeCheck,
  Percent,
  BarChart3,
  PieChart,
  ArrowUpRight,
  Download,
  Bell,
  Share2,
  Info,
  Target,
  Award,
  Briefcase,
  Coins,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* -------------------------
    Mock market data & types
    ------------------------- */

interface VolumePoint {
  date: string;
  volume: number;
  price: number;
}

type SecurityStatus = "ongoing" | "upcoming" | "completed";

interface Security {
  id: string;
  name: string;
  symbol: string;
  description: string;
  fullDescription: string;
  logoColor: string;
  type: "private_equity" | "bond" | "commercial_paper" | "treasury_bills";
  company: string;
  underwriter?: string;
  status: SecurityStatus;
  raised: number;
  total: number;
  participants?: number;
  timeInfo: string;
  unitSymbol: string;
  priceNgn: number;
  startAt: number;
  endAt: number;
  yield: number;
  tenor: string;
  minInvestment: number;
  rating: string;
  sector: string;
  couponFrequency?: string;
  maturityDate?: string;
  issueDate?: string;
  useOfProceeds?: string[];
  keyHighlights?: string[];
  risks?: string[];
  documents?: { name: string; url: string }[];
  volumeHistory: VolumePoint[];
}

const mockSecuritiesData: Record<string, Security> = {
  "dangote-bond-2025": {
    id: "dangote-bond-2025",
    name: "Dangote Cement Bond Series 5",
    symbol: "DANGCEMBD-S5",
    description:
      "7-Year Senior Unsecured Bond for cement production expansion across West Africa.",
    fullDescription: `Dangote Cement Plc, Africa's largest cement producer with operations in 10 African countries, is issuing its Series 5 Corporate Bond to fund strategic expansion initiatives. The proceeds will be used to expand production capacity at the Obajana plant in Kogi State and establish new grinding terminals in Ghana and Cameroon.

The company has a strong track record of debt servicing with no defaults in its 15+ year history of capital market activities. With a current production capacity of 51.6 million tonnes per annum (Mta), this expansion will add an additional 8Mta by 2027.

This bond is ideal for institutional investors seeking stable, inflation-beating returns backed by real assets and a blue-chip Nigerian corporate.`,
    logoColor: "bg-emerald-500",
    type: "bond",
    company: "Dangote Cement Plc",
    underwriter: "Stanbic IBTC Capital",
    status: "ongoing",
    raised: 420_000_000_000,
    total: 600_000_000_000,
    participants: 5200,
    timeInfo: "3d 12h left",
    unitSymbol: "BONDS",
    priceNgn: 1000,
    startAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    endAt: Date.now() + 1000 * 60 * 60 * 72,
    yield: 15.5,
    tenor: "7 Years",
    minInvestment: 5_000_000,
    rating: "AA+ (Agusto & Co.)",
    sector: "Industrial / Building Materials",
    couponFrequency: "Quarterly",
    maturityDate: "January 2032",
    issueDate: "January 2025",
    useOfProceeds: [
      "Obajana Plant Expansion - ₦350B",
      "New Grinding Terminal (Ghana) - ₦120B",
      "Working Capital - ₦80B",
      "Debt Refinancing - ₦50B",
    ],
    keyHighlights: [
      "Africa's largest cement producer with 51.6Mta capacity",
      "Listed on Nigerian Exchange (NGX) with ₦4.2T market cap",
      "15+ years of capital market activity with zero defaults",
      "Quarterly coupon payments with principal at maturity",
      "First charge on Obajana plant assets as security",
    ],
    risks: [
      "Commodity price fluctuations affecting input costs",
      "Currency devaluation impact on dollar-denominated costs",
      "Regulatory changes in target expansion markets",
      "Construction and project execution risks",
    ],
    documents: [
      { name: "Prospectus", url: "#" },
      { name: "Financial Statements 2024", url: "#" },
      { name: "Credit Rating Report", url: "#" },
      { name: "Trust Deed", url: "#" },
    ],
    volumeHistory: generateVolumeData(30, 420_000_000_000, 1000),
  },
  "mtn-pe-round-f": {
    id: "mtn-pe-round-f",
    name: "MTN Nigeria PE Round F",
    symbol: "MTN-PE-F",
    description:
      "Growth equity round for 5G network infrastructure deployment.",
    fullDescription: `MTN Nigeria Communications Plc, a subsidiary of MTN Group and Nigeria's largest telecommunications company with over 76 million subscribers, is raising growth capital through this Private Equity Round F to accelerate its 5G network rollout and expand data center infrastructure.

The funds will be used to deploy 5G coverage across Lagos, Abuja, Port Harcourt, and Kano by 2026, establish two Tier-4 data centers, and acquire additional spectrum licenses from the Nigerian Communications Commission (NCC).

This investment offers exposure to Nigeria's rapidly growing digital economy, with mobile data traffic expected to grow 8x by 2030.`,
    logoColor: "bg-amber-500",
    type: "private_equity",
    company: "MTN Nigeria Communications Plc",
    underwriter: "FBNQuest Merchant Bank",
    status: "upcoming",
    raised: 0,
    total: 1_200_000_000_000,
    participants: 0,
    timeInfo: "Starts in 9d",
    unitSymbol: "UNITS",
    priceNgn: 50000,
    startAt: Date.now() + 1000 * 60 * 60 * 24 * 9,
    endAt: Date.now() + 1000 * 60 * 60 * 24 * 39,
    yield: 28,
    tenor: "5 Years",
    minInvestment: 50_000_000,
    rating: "A (GCR Ratings)",
    sector: "Telecommunications",
    useOfProceeds: [
      "5G Network Deployment - ₦600B",
      "Data Center Infrastructure - ₦300B",
      "Spectrum Acquisition - ₦200B",
      "Technology Upgrades - ₦100B",
    ],
    keyHighlights: [
      "Nigeria's largest telco with 76M+ subscribers",
      "Market leader with 38% revenue market share",
      "Strong cash flow generation (₦1.8T revenue in 2024)",
      "Strategic partnership with MTN Group (83% ownership)",
    ],
    risks: [
      "Regulatory environment and policy changes",
      "Competition from new market entrants",
      "Technology obsolescence risks",
      "Foreign exchange volatility",
    ],
    documents: [
      { name: "Investment Memorandum", url: "#" },
      { name: "Financial Projections", url: "#" },
      { name: "Due Diligence Report", url: "#" },
    ],
    volumeHistory: generateVolumeData(30, 0, 50000),
  },
};

// Generate mock volume data
function generateVolumeData(
  days: number,
  currentRaised: number,
  basePrice: number,
): VolumePoint[] {
  const data: VolumePoint[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  let cumulativeVolume = 0;
  const dailyTarget = currentRaised / days;

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Simulate realistic volume patterns
    const dayVariation = 0.5 + Math.random();
    const weekendFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.3 : 1;
    const volume = dailyTarget * dayVariation * weekendFactor;
    cumulativeVolume += volume;

    // Price fluctuation
    const priceVariation = 1 + (Math.random() - 0.5) * 0.02;

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      volume: Math.round(volume),
      price: Math.round(basePrice * priceVariation),
    });
  }

  return data;
}

// Default market for unknown IDs
const defaultMarket: Security = {
  id: "default",
  name: "Nigerian Investment Opportunity",
  symbol: "NGN-INV",
  description: "Premium investment opportunity in the Nigerian market.",
  fullDescription:
    "This is a premium investment opportunity offering competitive returns.",
  logoColor: "bg-gray-500",
  type: "bond",
  company: "Nigerian Enterprise",
  underwriter: "Capital Markets Ltd",
  status: "ongoing",
  raised: 100_000_000_000,
  total: 200_000_000_000,
  participants: 1000,
  timeInfo: "5d left",
  unitSymbol: "UNITS",
  priceNgn: 1000,
  startAt: Date.now() - 1000 * 60 * 60 * 24,
  endAt: Date.now() + 1000 * 60 * 60 * 120,
  yield: 14,
  tenor: "5 Years",
  minInvestment: 1_000_000,
  rating: "A",
  sector: "Financial Services",
  volumeHistory: generateVolumeData(30, 100_000_000_000, 1000),
};

/* -------------------------
    Helper utils
    ------------------------- */

const formatNgn = (v: number) =>
  v >= 1_000_000_000
    ? `₦${(v / 1_000_000_000).toFixed(1)}B`
    : v >= 1_000_000
      ? `₦${(v / 1_000_000).toFixed(1)}M`
      : `₦${v.toLocaleString()}`;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/* -------------------------
    Component
    ------------------------- */

export default function PrivateMarketDetail(): JSX.Element {
  const { marketId } = useParams<{ marketId: string }>();
  const navigate = useNavigate();
  const { appPrefix } = useBrokerPaths();

  const [purchaseModalOpen, setPurchaseModalOpen] = useState<boolean>(false);
  const [purchaseAmountNgn, setPurchaseAmountNgn] = useState<number>(5_000_000);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Get market data or use default
  const market = useMemo(() => {
    if (marketId && mockSecuritiesData[marketId]) {
      return mockSecuritiesData[marketId];
    }
    return defaultMarket;
  }, [marketId]);

  const [totalRaisedNgn, setTotalRaisedNgn] = useState<number>(market.raised);

  const [nowMs, setNowMs] = useState<number>(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const saleOpen = nowMs >= market.startAt && nowMs < market.endAt;
  const saleEnded = nowMs >= market.endAt;
  const raisedFraction = clamp(totalRaisedNgn / market.total, 0, 1);
  const remainingCapNgn = Math.max(0, market.total - totalRaisedNgn);

  const handleSubscribe = () => {
    setIsSubscribing(true);
    setTimeout(() => {
      const amount = clamp(
        purchaseAmountNgn,
        market.minInvestment,
        remainingCapNgn,
      );
      setTotalRaisedNgn((s) => s + amount);
      setIsSubscribing(false);
      setPurchaseModalOpen(false);
    }, 1500);
  };

  const formatVolume = (value: number) => {
    if (value >= 1_000_000_000)
      return `₦${(value / 1_000_000_000).toFixed(0)}B`;
    if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(0)}M`;
    return `₦${value.toLocaleString()}`;
  };

  /* -------------------------
      Render UI
      ------------------------- */

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 -ml-2 gap-1"
            onClick={() => navigate(`${appPrefix}/markets/private`)}
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Projects
          </Button>
        </div>

        {/* Header Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Left: Project Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-5 mb-6">
              <div
                className={cn(
                  "h-20 w-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg",
                  market.logoColor,
                )}
              >
                {market.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {market.name}
                  </h1>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 border-0"
                  >
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    SEC Registered
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm mb-3">
                  {market.symbol} ·{" "}
                  {market.type.replace("_", " ").toUpperCase()}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {market.company}
                  </span>
                  {market.underwriter && (
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-4 w-4" />
                      {market.underwriter}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    {market.sector}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <Percent className="h-3 w-3" /> Expected Yield
                </p>
                <p className="text-xl font-bold text-emerald-600">
                  {market.yield}%
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Tenor
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {market.tenor}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <Award className="h-3 w-3" /> Rating
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {market.rating.split(" ")[0]}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <Coins className="h-3 w-3" /> Min. Investment
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {formatNgn(market.minInvestment)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-6">
              {[Globe, Twitter, Linkedin, FileText].map((Icon, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-gray-200 hover:bg-gray-100"
                >
                  <Icon className="h-4 w-4 text-gray-500" />
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="ml-auto rounded-full border-gray-200"
              >
                <Bell className="h-4 w-4 mr-2" />
                Set Alert
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-200"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Right: Funding Card */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Total Raise</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNgn(market.total)}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subscribed</span>
                  <span className="font-semibold">
                    {formatNgn(totalRaisedNgn)}
                  </span>
                </div>
                <Progress
                  value={raisedFraction * 100}
                  className="h-2 bg-gray-100"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{(raisedFraction * 100).toFixed(1)}%</span>
                  <span>{market.participants?.toLocaleString()} investors</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                  <p className="font-semibold text-gray-900">
                    {formatNgn(market.priceNgn)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <div className="flex items-center justify-center gap-1">
                    {market.status === "ongoing" && (
                      <>
                        <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="font-semibold text-emerald-600">Live</p>
                      </>
                    )}
                    {market.status === "upcoming" && (
                      <p className="font-semibold text-blue-600">Upcoming</p>
                    )}
                    {market.status === "completed" && (
                      <p className="font-semibold text-gray-600">Closed</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
                <Clock className="h-4 w-4" />
                <span>{market.timeInfo}</span>
              </div>

              <Button
                onClick={() => setPurchaseModalOpen(true)}
                disabled={!saleOpen}
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
              >
                Subscribe Now
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>

              <p className="text-xs text-center text-gray-400 mt-3">
                Regulated by Securities and Exchange Commission Nigeria
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Volume Chart */}
        <Card className="mb-8 border-0 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              Subscription Volume (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={market.volumeHistory}>
                  <defs>
                    <linearGradient
                      id="volumeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickFormatter={formatVolume}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value: number) => [
                      formatVolume(value),
                      "Volume",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#volumeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto gap-8 flex-wrap">
            {["About", "Details", "Use of Proceeds", "Documents", "Risks"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(/ /g, "-")}
                  className="bg-transparent border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent rounded-none px-0 pb-3 text-gray-500 data-[state=active]:text-gray-900 font-medium"
                >
                  {tab}
                </TabsTrigger>
              ),
            )}
          </TabsList>

          <TabsContent value="about" className="space-y-8 mt-8">
            {/* About Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                About <span className="text-emerald-600">{market.name}</span>
              </h2>
              <div className="prose prose-gray max-w-none">
                {market.fullDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <Separator className="bg-gray-100" />

            {/* Key Highlights */}
            {market.keyHighlights && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-600" />
                  Key Highlights
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {market.keyHighlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-600">{highlight}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <Separator className="bg-gray-100" />

            {/* Leadership Team */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Leadership Team
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Aliko Dangote", role: "Chairman", initials: "AD" },
                  { name: "Arvind Pathak", role: "Group CEO", initials: "AP" },
                  { name: "Olakunle Alake", role: "Group MD", initials: "OA" },
                  { name: "Brian Egan", role: "CFO", initials: "BE" },
                ].map((person) => (
                  <div key={person.name} className="text-center group">
                    <Avatar className="h-16 w-16 mx-auto mb-3 ring-2 ring-gray-100 group-hover:ring-emerald-200 transition-all">
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {person.name}
                    </h4>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="details" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-gray-100 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-base">
                    Instrument Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      label: "Instrument Type",
                      value: market.type.replace("_", " ").toUpperCase(),
                    },
                    { label: "Issue Size", value: formatNgn(market.total) },
                    { label: "Unit Price", value: formatNgn(market.priceNgn) },
                    { label: "Coupon Rate", value: `${market.yield}% p.a.` },
                    { label: "Tenor", value: market.tenor },
                    {
                      label: "Coupon Frequency",
                      value: market.couponFrequency || "N/A",
                    },
                    {
                      label: "Maturity Date",
                      value: market.maturityDate || "N/A",
                    },
                    { label: "Issue Date", value: market.issueDate || "N/A" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-gray-100 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-base">
                    Issuer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Issuer", value: market.company },
                    {
                      label: "Underwriter",
                      value: market.underwriter || "N/A",
                    },
                    { label: "Credit Rating", value: market.rating },
                    { label: "Sector", value: market.sector },
                    {
                      label: "Min. Investment",
                      value: formatNgn(market.minInvestment),
                    },
                    {
                      label: "Investors",
                      value: market.participants?.toLocaleString() || "0",
                    },
                    { label: "Regulation", value: "SEC Nigeria" },
                    { label: "Listing", value: "FMDQ / NGX" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="use-of-proceeds" className="mt-8">
            {market.useOfProceeds && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Allocation of Proceeds
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {market.useOfProceeds.map((item, i) => {
                    const [purpose, amount] = item.split(" - ");
                    return (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-5 border border-gray-100"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <PieChart className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {purpose}
                            </p>
                            {amount && (
                              <p className="text-sm text-emerald-600 font-semibold">
                                {amount}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="mt-8">
            <div className="grid md:grid-cols-2 gap-4">
              {market.documents?.map((doc, i) => (
                <Card
                  key={i}
                  className="border-gray-100 rounded-xl hover:border-emerald-200 transition-colors cursor-pointer group"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                        <FileText className="h-6 w-6 text-gray-500 group-hover:text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-gray-400">PDF Document</p>
                      </div>
                      <Download className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risks" className="mt-8">
            {market.risks && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 mb-6 p-4 bg-amber-50 rounded-xl">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Investing in private market securities involves risks.
                    Please carefully review the risk factors below before making
                    an investment decision.
                  </p>
                </div>
                <div className="space-y-3">
                  {market.risks.map((risk, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100"
                    >
                      <div className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-red-600">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Purchase Modal */}
        <Dialog open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen}>
          <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Subscribe to {market.symbol}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Unit Price</span>
                  <span className="font-medium">
                    {formatNgn(market.priceNgn)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Min. Investment</span>
                  <span className="font-medium">
                    {formatNgn(market.minInvestment)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Expected Yield</span>
                  <span className="font-medium text-emerald-600">
                    {market.yield}% p.a.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (₦)
                </label>
                <Input
                  type="number"
                  value={purchaseAmountNgn}
                  onChange={(e) => setPurchaseAmountNgn(Number(e.target.value))}
                  min={market.minInvestment}
                  step={100000}
                  className="h-12 text-lg rounded-xl"
                />
                <div className="flex gap-2 mt-2">
                  {[5_000_000, 10_000_000, 25_000_000, 50_000_000].map(
                    (amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-lg text-xs"
                        onClick={() => setPurchaseAmountNgn(amount)}
                      >
                        {formatNgn(amount)}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">Units to receive</span>
                  <span className="font-bold text-emerald-700">
                    {(purchaseAmountNgn / market.priceNgn).toLocaleString()}{" "}
                    {market.unitSymbol}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleSubscribe}
                disabled={
                  purchaseAmountNgn < market.minInvestment || isSubscribing
                }
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubscribing ? "Processing..." : "Confirm Subscription"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
