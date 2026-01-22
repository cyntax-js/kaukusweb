import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Wallet,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/* -------------------------
    Mock market data & types
    ------------------------- */

type VestingSlice = {
  name: string;
  percent: number; // percent of purchased allocation
  unlockAtOffsetSec: number; // seconds after sale end when this slice unlocks
};

type SecurityStatus = "ongoing" | "upcoming" | "completed";

interface Security {
  id: string;
  name: string;
  symbol: string;
  description: string;
  logoColor: string;
  type: "private_equity" | "bond" | "commercial_paper" | "treasury_bills";
  company: string;
  underwriter?: string;
  status: SecurityStatus;
  raised: number;
  total: number;
  participants?: number;
  timeInfo: string;
  performance?: number;
  startDate?: Date;
  unitSymbol: string;
  priceNgn: number;
  startAt: number; // unix timestamp ms
  endAt: number; // unix timestamp ms
  vesting: VestingSlice[];
  whitelistOnly: boolean;
}

// Example adapted mock for detail page - using first from previous mocks, added fields
const MOCK_SECURITY: Security = {
  id: "1",
  name: "Dangote Cement Bond",
  symbol: "DANGCEMBD",
  description:
    "Corporate bond for cement production expansion in Nigeria. This bond offers fixed returns with quarterly coupon payments.",
  logoColor: "bg-gray-500",
  type: "bond",
  company: "Dangote Cement Plc",
  underwriter: "Stanbic IBTC",
  status: "ongoing",
  raised: 150000000000,
  total: 200000000000,
  participants: 2500,
  timeInfo: "Ends in 2d 15h",
  unitSymbol: "BONDS",
  priceNgn: 1000, // ₦1000 per bond unit
  startAt: Date.now() - 1000 * 60 * 60 * 24, // started 1 day ago
  endAt: Date.now() + 1000 * 60 * 60 * 48, // ends in 2 days
  whitelistOnly: true,
  vesting: [
    { name: "Quarter 1 Coupon", percent: 25, unlockAtOffsetSec: 7776000 }, // 3 months
    { name: "Quarter 2 Coupon", percent: 25, unlockAtOffsetSec: 15552000 },
    { name: "Quarter 3 Coupon", percent: 25, unlockAtOffsetSec: 23328000 },
    { name: "Maturity", percent: 25, unlockAtOffsetSec: 31104000 }, // 1 year
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

const formatDateTime = (ms: number) =>
  new Date(ms).toLocaleString(undefined, { hour12: false });

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/* -------------------------
    Component
    ------------------------- */

export default function PrivateMarketDetail(): JSX.Element {
  // Simulated wallet (mock)
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalanceNgn, setWalletBalanceNgn] = useState<number>(10000000000); // user has ₦10M

  // Market live state
  const [market, setMarket] = useState<Security>(() => ({
    ...MOCK_SECURITY,
  }));

  // Dynamic state
  const [totalRaisedNgn, setTotalRaisedNgn] = useState<number>(market.raised);

  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState<boolean>(false);
  const [purchaseAmountNgn, setPurchaseAmountNgn] = useState<number>(1000000); // amount in NGN to spend
  const [purchasedNgn, setPurchasedNgn] = useState<number>(() =>
    Number(localStorage.getItem("pm_purchasedNgn") || "0")
  );
  const [claimedNgn, setClaimedNgn] = useState<number>(() =>
    Number(localStorage.getItem("pm_claimedNgn") || "0")
  );

  const [txLogs, setTxLogs] = useState<string[]>(() => {
    const saved = localStorage.getItem("pm_txLogs");
    return saved ? JSON.parse(saved) : ["Market loaded."];
  });

  const [nowMs, setNowMs] = useState<number>(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // Derived
  const saleOpen = nowMs >= market.startAt && nowMs < market.endAt;
  const saleEnded = nowMs >= market.endAt;
  const raisedFraction = clamp(totalRaisedNgn / market.total, 0, 1);
  const remainingCapNgn = Math.max(0, market.total - totalRaisedNgn);

  const userPurchasedUnits = purchasedNgn / market.priceNgn;
  const userClaimedUnits = claimedNgn / market.priceNgn;
  const userUnclaimedUnits = Math.max(0, userPurchasedUnits - userClaimedUnits);

  const vestingState = useMemo(() => {
    if (!saleEnded) return { unlockedPercent: 0, slicesUnlocked: 0 };
    const secondsSinceEnd = Math.max(
      0,
      Math.floor((nowMs - market.endAt) / 1000)
    );
    let unlocked = 0;
    let unlockedSlices = 0;
    for (const s of market.vesting) {
      if (secondsSinceEnd >= s.unlockAtOffsetSec) {
        unlocked += s.percent;
        unlockedSlices++;
      }
    }
    return {
      unlockedPercent: clamp(unlocked, 0, 100),
      slicesUnlocked: unlockedSlices,
    };
  }, [nowMs, market, saleEnded]);

  // Persist purchases and logs
  useEffect(() => {
    localStorage.setItem("pm_purchasedNgn", String(purchasedNgn));
    localStorage.setItem("pm_claimedNgn", String(claimedNgn));
    localStorage.setItem("pm_txLogs", JSON.stringify(txLogs.slice(-200)));
  }, [purchasedNgn, claimedNgn, txLogs]);

  /* -------------------------
      Simulated interactions
      ------------------------- */

  function connectMockWallet() {
    const addr = `0xMOCK${Math.random()
      .toString(36)
      .slice(2, 9)
      .toUpperCase()}`;
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

    setTxLogs((l) => [
      `Initiating subscription ₦${spend.toLocaleString()}...`,
      ...l,
    ]);
    setPurchaseModalOpen(false);
    setTimeout(() => {
      setWalletBalanceNgn((b) => b - spend);
      setPurchasedNgn((p) => p + spend);
      setTotalRaisedNgn((s) => s + spend);
      setTxLogs((l) => [
        `Subscription confirmed: spent ₦${spend.toLocaleString()} => ${(
          spend / market.priceNgn
        ).toLocaleString()} ${market.unitSymbol}`,
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
    setTxLogs((l) => [
      `Claiming ${claimableUnits.toLocaleString()} ${market.unitSymbol}...`,
      ...l,
    ]);
    setTimeout(() => {
      setClaimedNgn((c) => c + claimNgn);
      setTxLogs((l) => [
        `Claim successful: received ${claimableUnits.toLocaleString()} ${
          market.unitSymbol
        }`,
        ...l,
      ]);
    }, 1200);
  }

  function addTestLog(message: string) {
    setTxLogs((l) => [message, ...l].slice(0, 200));
  }

  /* -------------------------
      Render UI
      ------------------------- */

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl space-y-12">
          {/* Hero Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    "h-32 w-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg",
                    market.logoColor
                  )}
                >
                  {market.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
                  {market.name}
                </h1>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl line-clamp-3">
                  {market.description}
                </p>
                <div className="flex items-center justify-between text-sm font-medium mb-4">
                  <span>Subscribed</span>
                  <span>
                    {formatNgn(totalRaisedNgn)} / {formatNgn(market.total)}
                  </span>
                </div>
                <Progress
                  value={raisedFraction * 100}
                  className="h-4 rounded-full mb-4"
                />
                <div className="flex items-center gap-2 text-lg font-medium mb-6">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  {market.timeInfo}
                </div>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 shadow-md"
                    onClick={() => openPurchase()}
                    disabled={!saleOpen}
                  >
                    Apply Now
                  </Button>
                  <Button variant="outline" className="shadow-md">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <Tabs defaultValue="highlights" className="space-y-8">
            <TabsList className="justify-start bg-transparent border-b">
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="token">Token</TabsTrigger>
            </TabsList>
            <TabsContent value="highlights">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Raised</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {formatNgn(totalRaisedNgn)}
                    </p>
                    <p className="text-sm text-gray-600">
                      of {formatNgn(market.total)} goal
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {market.participants?.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Price per Unit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {formatNgn(market.priceNgn)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="token">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Bond Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Unit Symbol</span>
                    <span>{market.unitSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per Unit</span>
                    <span>{formatNgn(market.priceNgn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Issuance</span>
                    <span>{formatNgn(market.total)}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Content Sections */}
          <section className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                What is Dangote Cement Bond?
              </h2>
              <p className="text-gray-700">
                The Dangote Cement Bond is a corporate debt instrument issued by
                Dangote Cement Plc to finance its cement production expansion.
                It provides investors with fixed income returns through regular
                coupon payments and principal repayment at maturity.
              </p>
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Bond Illustration"
                className="mt-4 rounded-lg shadow-md"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">
                Why Investors Want Dangote Cement Bond?
              </h2>
              <p className="text-gray-700">
                Investors are attracted to Dangote Cement Bond due to the
                company's strong market position as Africa's leading cement
                producer, stable credit ratings (AA+), and attractive yields in
                a growing African economy.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Product</h2>
              <p className="text-gray-700">
                Dangote Cement produces high-quality cement products for
                construction, infrastructure, and housing sectors across
                Sub-Saharan Africa.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Solution</h2>
              <p className="text-gray-700">
                The bond issuance provides Dangote Cement with capital for
                expansion while offering investors a secure fixed-income
                investment backed by the company's robust financials.
              </p>
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Solution Illustration"
                className="mt-4 rounded-lg shadow-md"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Merchants Network</h2>
              <p className="text-gray-700">
                Dangote Cement has an extensive distribution network across 10
                African countries, serving thousands of merchants and
                distributors.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Business Model</h2>
              <p className="text-gray-700">
                Integrated quarry-to-customer model with focus on cost
                efficiency, volume growth, and pan-African expansion.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Bond Utility</h2>
              <p className="text-gray-700">
                Provides stable income through coupon payments, capital
                preservation, and potential for capital appreciation in
                secondary market.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Team</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="w-20 h-20 mx-auto mb-2">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">Aliko Dangote</h3>
                    <p className="text-sm text-gray-600">Chairman</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="w-20 h-20 mx-auto mb-2">
                      <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">Arvind Pathak</h3>
                    <p className="text-sm text-gray-600">CEO</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="w-20 h-20 mx-auto mb-2">
                      <AvatarFallback>OA</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">Olakunle Alake</h3>
                    <p className="text-sm text-gray-600">
                      Group Managing Director
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="w-20 h-20 mx-auto mb-2">
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">Cherie Blair</h3>
                    <p className="text-sm text-gray-600">
                      Independent Director
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">
                About Dangote Cement Plc
              </h2>
              <p className="text-gray-700">
                Dangote Cement Plc is Sub-Saharan Africa’s largest cement
                producer with an installed capacity of 48.6Mta across 10 African
                countries. Founded in 1981, it is headquartered in Lagos,
                Nigeria, and is a subsidiary of Dangote Industries Limited.
              </p>
            </div>
          </section>

          {/* Footer Links */}
          <footer className="pt-12 border-t">
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="text-indigo-600 hover:underline">
                Website
              </a>
              <a href="#" className="text-indigo-600 hover:underline">
                Whitepaper
              </a>
              <a href="#" className="text-indigo-600 hover:underline">
                Documentation
              </a>
            </div>
          </footer>
        </div>
      </main>

      {/* Purchase Dialog */}
      <Dialog open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe to {market.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Price: {formatNgn(market.priceNgn)} · Remaining cap:{" "}
              {formatNgn(remainingCapNgn)}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount to subscribe (NGN)
              </label>
              <Input
                type="number"
                value={purchaseAmountNgn}
                min={100000}
                max={walletBalanceNgn}
                onChange={(e) => setPurchaseAmountNgn(Number(e.target.value))}
              />
              <p className="mt-1 text-sm">
                You will receive:{" "}
                {(purchaseAmountNgn / market.priceNgn).toLocaleString()}{" "}
                {market.unitSymbol}
              </p>
            </div>
            <Button onClick={confirmPurchase} className="w-full">
              Confirm Subscription
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
