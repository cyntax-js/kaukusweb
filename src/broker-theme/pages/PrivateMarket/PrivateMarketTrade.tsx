/**
 * PRIVATE MARKET DETAIL - Polkastarter-inspired light minimalist design
 * Clean, modern UI with subtle shadows and elegant typography
 */

import React, { useEffect, useMemo, useState } from "react";
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
  Wallet,
  Shield,
  TrendingUp,
  Calendar,
  Building2,
  BadgeCheck,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

/* -------------------------
    Mock market data & types
    ------------------------- */

type VestingSlice = {
  name: string;
  percent: number;
  unlockAtOffsetSec: number;
};

type SecurityStatus = "ongoing" | "upcoming" | "completed";

interface Security {
  id: string;
  name: string;
  symbol: string;
  description: string;
  logoUrl?: string;
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
  vesting: VestingSlice[];
  whitelistOnly: boolean;
}

const MOCK_SECURITY: Security = {
  id: "1",
  name: "Dangote Cement Bond",
  symbol: "DANGCEMBD",
  description:
    "Corporate bond for cement production expansion in Nigeria. This bond offers fixed returns with quarterly coupon payments backed by Africa's largest cement producer.",
  logoColor: "bg-emerald-500",
  type: "bond",
  company: "Dangote Cement Plc",
  underwriter: "Stanbic IBTC",
  status: "ongoing",
  raised: 150000000000,
  total: 200000000000,
  participants: 2500,
  timeInfo: "Ends in 2d 15h",
  unitSymbol: "BONDS",
  priceNgn: 1000,
  startAt: Date.now() - 1000 * 60 * 60 * 24,
  endAt: Date.now() + 1000 * 60 * 60 * 48,
  whitelistOnly: true,
  vesting: [
    { name: "Quarter 1 Coupon", percent: 25, unlockAtOffsetSec: 7776000 },
    { name: "Quarter 2 Coupon", percent: 25, unlockAtOffsetSec: 15552000 },
    { name: "Quarter 3 Coupon", percent: 25, unlockAtOffsetSec: 23328000 },
    { name: "Maturity", percent: 25, unlockAtOffsetSec: 31104000 },
  ],
};

/* -------------------------
    Helper utils
    ------------------------- */

const formatNgn = (v: number) =>
  v >= 1000000000
    ? `₦${(v / 1000000000).toFixed(1)}B`
    : v >= 1000000
    ? `₦${(v / 1000000).toFixed(1)}M`
    : `₦${v.toLocaleString()}`;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/* -------------------------
    Component
    ------------------------- */

export default function PrivateMarketDetail(): JSX.Element {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalanceNgn, setWalletBalanceNgn] = useState<number>(10000000000);
  const [market] = useState<Security>(() => ({ ...MOCK_SECURITY }));
  const [totalRaisedNgn, setTotalRaisedNgn] = useState<number>(market.raised);
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState<boolean>(false);
  const [purchaseAmountNgn, setPurchaseAmountNgn] = useState<number>(1000000);
  const [purchasedNgn, setPurchasedNgn] = useState<number>(() =>
    Number(localStorage.getItem("pm_purchasedNgn") || "0")
  );
  const [claimedNgn, setClaimedNgn] = useState<number>(() =>
    Number(localStorage.getItem("pm_claimedNgn") || "0")
  );
  const [txLogs, setTxLogs] = useState<string[]>(() => {
    const saved = localStorage.getItem("pm_txLogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [nowMs, setNowMs] = useState<number>(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const saleOpen = nowMs >= market.startAt && nowMs < market.endAt;
  const saleEnded = nowMs >= market.endAt;
  const raisedFraction = clamp(totalRaisedNgn / market.total, 0, 1);
  const remainingCapNgn = Math.max(0, market.total - totalRaisedNgn);
  const userPurchasedUnits = purchasedNgn / market.priceNgn;
  const userClaimedUnits = claimedNgn / market.priceNgn;

  const vestingState = useMemo(() => {
    if (!saleEnded) return { unlockedPercent: 0, slicesUnlocked: 0 };
    const secondsSinceEnd = Math.max(0, Math.floor((nowMs - market.endAt) / 1000));
    let unlocked = 0;
    let unlockedSlices = 0;
    for (const s of market.vesting) {
      if (secondsSinceEnd >= s.unlockAtOffsetSec) {
        unlocked += s.percent;
        unlockedSlices++;
      }
    }
    return { unlockedPercent: clamp(unlocked, 0, 100), slicesUnlocked: unlockedSlices };
  }, [nowMs, market, saleEnded]);

  useEffect(() => {
    localStorage.setItem("pm_purchasedNgn", String(purchasedNgn));
    localStorage.setItem("pm_claimedNgn", String(claimedNgn));
    localStorage.setItem("pm_txLogs", JSON.stringify(txLogs.slice(-200)));
  }, [purchasedNgn, claimedNgn, txLogs]);

  function connectMockWallet() {
    const addr = `0xMOCK${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    setWalletAddress(addr);
    setWalletBalanceNgn(10000000000);
    setTxLogs((l) => [`Connected wallet ${addr}`, ...l]);
    if (addr.endsWith("A") || addr.endsWith("B")) {
      setIsWhitelisted(true);
      setTxLogs((l) => [`Wallet auto-whitelisted`, ...l]);
    }
  }

  function disconnect() {
    setTxLogs((l) => [`Disconnected wallet`, ...l]);
    setWalletAddress(null);
    setIsWhitelisted(false);
  }

  function requestWhitelist() {
    setTxLogs((l) => [`Requested whitelist...`, ...l]);
    setTimeout(() => {
      setIsWhitelisted(true);
      setTxLogs((l) => [`Whitelist approved (mock)`, ...l]);
    }, 1200);
  }

  function openPurchase(amountNgn?: number) {
    setPurchaseAmountNgn(amountNgn ?? 1000000);
    setPurchaseModalOpen(true);
  }

  function confirmPurchase() {
    if (!walletAddress) {
      setTxLogs((l) => [`Subscription failed: wallet not connected`, ...l]);
      return;
    }
    if (market.whitelistOnly && !isWhitelisted) {
      setTxLogs((l) => [`Subscription failed: not whitelisted`, ...l]);
      return;
    }
    if (!saleOpen) {
      setTxLogs((l) => [`Subscription failed: issuance not open`, ...l]);
      return;
    }
    const amount = clamp(purchaseAmountNgn, 100000, walletBalanceNgn);
    const spend = Math.min(amount, remainingCapNgn);
    if (spend <= 0) {
      setTxLogs((l) => [`Subscription failed: no remaining cap`, ...l]);
      return;
    }
    setTxLogs((l) => [`Initiating subscription ₦${spend.toLocaleString()}...`, ...l]);
    setPurchaseModalOpen(false);
    setTimeout(() => {
      setWalletBalanceNgn((b) => b - spend);
      setPurchasedNgn((p) => p + spend);
      setTotalRaisedNgn((s) => s + spend);
      setTxLogs((l) => [
        `Subscription confirmed: spent ₦${spend.toLocaleString()} => ${(spend / market.priceNgn).toLocaleString()} ${market.unitSymbol}`,
        ...l,
      ]);
    }, 1500);
  }

  function claimAvailable() {
    if (!walletAddress) {
      setTxLogs((l) => [`Claim failed: wallet not connected`, ...l]);
      return;
    }
    if (!saleEnded) {
      setTxLogs((l) => [`Claim failed: issuance not ended`, ...l]);
      return;
    }
    const unlockedPercent = vestingState.unlockedPercent;
    const totalUnits = purchasedNgn / market.priceNgn;
    const unlockedUnits = (totalUnits * unlockedPercent) / 100;
    const claimableUnits = Math.max(0, unlockedUnits - userClaimedUnits);
    if (claimableUnits <= 0) {
      setTxLogs((l) => [`No payouts available to claim yet`, ...l]);
      return;
    }
    const claimNgn = claimableUnits * market.priceNgn;
    setTxLogs((l) => [`Claiming ${claimableUnits.toLocaleString()} ${market.unitSymbol}...`, ...l]);
    setTimeout(() => {
      setClaimedNgn((c) => c + claimNgn);
      setTxLogs((l) => [
        `Claim successful: received ${claimableUnits.toLocaleString()} ${market.unitSymbol}`,
        ...l,
      ]);
    }, 1200);
  }

  /* -------------------------
      Render UI
      ------------------------- */

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 -ml-2 gap-1">
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Projects
          </Button>
        </div>

        {/* Header Section - Polkastarter Style */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Left: Project Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-5 mb-6">
              <div className={cn(
                "h-20 w-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg",
                market.logoColor
              )}>
                {market.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{market.name}</h1>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-0">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm mb-3">{market.symbol} · {market.type.replace("_", " ").toUpperCase()}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
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
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 mb-6">
              {[Globe, Twitter, Linkedin, FileText].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200 hover:bg-gray-100">
                  <Icon className="h-4 w-4 text-gray-500" />
                </Button>
              ))}
            </div>
          </div>

          {/* Right: Funding Card */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Total Raise</p>
                <p className="text-3xl font-bold text-gray-900">{formatNgn(market.total)}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subscribed</span>
                  <span className="font-semibold">{formatNgn(totalRaisedNgn)}</span>
                </div>
                <Progress value={raisedFraction * 100} className="h-2 bg-gray-100" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{(raisedFraction * 100).toFixed(1)}%</span>
                  <span>{market.participants?.toLocaleString()} subscribers</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Price</p>
                  <p className="font-semibold text-gray-900">{formatNgn(market.priceNgn)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="font-semibold text-emerald-600">Live</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
                <Clock className="h-4 w-4" />
                <span>{market.timeInfo}</span>
              </div>

              {!walletAddress ? (
                <Button onClick={connectMockWallet} className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : !isWhitelisted && market.whitelistOnly ? (
                <Button onClick={requestWhitelist} className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium">
                  Request Whitelist
                </Button>
              ) : (
                <Button onClick={() => openPurchase()} disabled={!saleOpen} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                  Subscribe Now
                </Button>
              )}

              {walletAddress && (
                <p className="text-xs text-center text-gray-400 mt-3">
                  Connected: {walletAddress.slice(0, 8)}...{walletAddress.slice(-4)}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto gap-8">
            {["About", "Token Details", "Vesting", "Your Position"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(" ", "-")}
                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent rounded-none px-0 pb-3 text-gray-500 data-[state=active]:text-gray-900 font-medium"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="about" className="space-y-12 mt-8">
            {/* About Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                What is <span className="text-emerald-600">{market.name}?</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {market.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Dangote Cement Bond is a corporate debt instrument issued by Dangote Cement Plc, 
                Africa's largest cement producer. This bond offering provides investors with an opportunity 
                to participate in the company's expansion plans while receiving fixed quarterly coupon payments 
                and principal repayment at maturity.
              </p>
            </section>

            <Separator className="bg-gray-100" />

            {/* Why Invest Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Why Investors Want {market.symbol}?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: TrendingUp, title: "Strong Returns", desc: "Competitive fixed yields in growing African economy" },
                  { icon: Shield, title: "AA+ Credit Rating", desc: "Backed by Africa's leading cement producer" },
                  { icon: Building2, title: "Market Leader", desc: "48.6Mta capacity across 10 African countries" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                      <item.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-gray-100" />

            {/* Team Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Meet the Board</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Aliko Dangote", role: "Chairman", initials: "AD" },
                  { name: "Arvind Pathak", role: "CEO", initials: "AP" },
                  { name: "Olakunle Alake", role: "Group MD", initials: "OA" },
                  { name: "Cherie Blair", role: "Director", initials: "CB" },
                ].map((member, i) => (
                  <div key={i} className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-gray-100">
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-lg font-medium">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-gray-100" />

            {/* About Company */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {market.company}</h2>
              <p className="text-gray-600 leading-relaxed">
                Dangote Cement Plc is Sub-Saharan Africa's largest cement producer with an installed 
                capacity of 48.6Mta across 10 African countries. Founded in 1981 and headquartered in 
                Lagos, Nigeria, the company is a subsidiary of Dangote Industries Limited and is listed 
                on the Nigerian Stock Exchange.
              </p>
            </section>
          </TabsContent>

          <TabsContent value="token-details" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Bond Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Unit Symbol", value: market.unitSymbol },
                    { label: "Price per Unit", value: formatNgn(market.priceNgn) },
                    { label: "Total Issuance", value: formatNgn(market.total) },
                    { label: "Minimum Investment", value: "₦100,000" },
                    { label: "Maturity", value: "12 months" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Important Dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Sale Start", value: new Date(market.startAt).toLocaleDateString() },
                    { label: "Sale End", value: new Date(market.endAt).toLocaleDateString() },
                    { label: "First Coupon", value: "Q2 2026" },
                    { label: "Maturity Date", value: "Q1 2027" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vesting" className="mt-8">
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Vesting Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {market.vesting.map((slice, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{slice.name}</p>
                        <p className="text-sm text-gray-500">{Math.round(slice.unlockAtOffsetSec / 86400 / 30)} months after sale ends</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{slice.percent}%</p>
                        <p className="text-xs text-gray-400">of allocation</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="your-position" className="mt-8">
            {purchasedNgn > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Holdings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Invested Amount</span>
                      <span className="font-bold text-gray-900">{formatNgn(purchasedNgn)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Units Purchased</span>
                      <span className="font-medium">{userPurchasedUnits.toLocaleString()} {market.unitSymbol}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Units Claimed</span>
                      <span className="font-medium">{userClaimedUnits.toLocaleString()} {market.unitSymbol}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Unlocked</span>
                      <span className="font-medium text-emerald-600">{vestingState.unlockedPercent}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Claim Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 text-sm mb-4">
                      Claim your vested tokens as they become available according to the vesting schedule.
                    </p>
                    <Button onClick={claimAvailable} className="w-full rounded-xl" disabled={!saleEnded || vestingState.unlockedPercent === 0}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Claim Available
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">No Position Yet</h3>
                <p className="text-gray-500 text-sm mb-6">Subscribe to this offering to start building your position.</p>
                <Button onClick={() => openPurchase()} disabled={!saleOpen} className="rounded-xl">
                  Subscribe Now
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Footer Links */}
        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap gap-6 justify-center">
            {["Website", "Whitepaper", "Documentation", "Terms"].map((link) => (
              <a key={link} href="#" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                {link}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </footer>
      </main>

      {/* Purchase Dialog */}
      <Dialog open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Subscribe to {market.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Price per Unit</p>
                <p className="font-semibold">{formatNgn(market.priceNgn)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Remaining</p>
                <p className="font-semibold">{formatNgn(remainingCapNgn)}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Subscribe (NGN)
              </label>
              <Input
                type="number"
                value={purchaseAmountNgn}
                min={100000}
                max={walletBalanceNgn}
                onChange={(e) => setPurchaseAmountNgn(Number(e.target.value))}
                className="h-12 rounded-xl"
              />
              <p className="mt-2 text-sm text-gray-500">
                You will receive: <span className="font-medium text-gray-900">{(purchaseAmountNgn / market.priceNgn).toLocaleString()} {market.unitSymbol}</span>
              </p>
            </div>

            <Button onClick={confirmPurchase} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700">
              Confirm Subscription
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
