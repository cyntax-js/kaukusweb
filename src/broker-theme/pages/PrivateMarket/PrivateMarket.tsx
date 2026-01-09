/**
 * PRIVATE MARKET PAGE - Modern minimalist design
 * Clean UI with subtle shadows, elegant cards, and smooth interactions
 */

import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  Search,
  Grid as GridIcon,
  List as ListIcon,
  ArrowUpRight,
  Filter,
  Building2,
  Percent,
  Calendar,
  BadgeCheck,
  Wallet,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DepositWithdrawModal } from "@/broker-theme/components";
import { cn } from "@/lib/utils";

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
  yield?: number;
  tenor?: string;
  minInvestment?: number;
  rating?: string;
  sector?: string;
}

// 50+ Nigerian Private Market Securities
const mockSecurities: Security[] = [
  // Bonds
  {
    id: "dangote-bond-2025",
    name: "Dangote Cement Bond Series 5",
    symbol: "DANGCEMBD-S5",
    description:
      "7-Year Senior Unsecured Bond for cement production expansion across West Africa. Fixed coupon with quarterly payments.",
    logoColor: "bg-emerald-500",
    type: "bond",
    company: "Dangote Cement Plc",
    underwriter: "Stanbic IBTC Capital",
    status: "ongoing",
    raised: 420_000_000_000,
    total: 600_000_000_000,
    participants: 5200,
    timeInfo: "3d 12h left",
    yield: 15.5,
    tenor: "7 Years",
    minInvestment: 5_000_000,
    rating: "AA+",
    sector: "Industrial",
  },
  {
    id: "access-bond-2025",
    name: "Access Holdings Tier 2 Capital",
    symbol: "ACCESSBD-T2",
    description:
      "10-Year subordinated unsecured notes for regulatory capital requirements. Fixed-to-floating rate structure.",
    logoColor: "bg-blue-600",
    type: "bond",
    company: "Access Holdings Plc",
    underwriter: "Access Bank Capital",
    status: "ongoing",
    raised: 185_000_000_000,
    total: 250_000_000_000,
    participants: 2800,
    timeInfo: "5d 6h left",
    yield: 16.8,
    tenor: "10 Years",
    minInvestment: 10_000_000,
    rating: "AA",
    sector: "Financial Services",
  },
  {
    id: "bua-cement-bond",
    name: "BUA Cement 5-Year Bond",
    symbol: "BUACEMENT-25",
    description:
      "Senior secured bond for new cement plant construction in Adamawa State. First charge on plant assets.",
    logoColor: "bg-cyan-500",
    type: "bond",
    company: "BUA Cement Plc",
    underwriter: "Vetiva Capital",
    status: "ongoing",
    raised: 145_000_000_000,
    total: 200_000_000_000,
    participants: 1950,
    timeInfo: "7d 3h left",
    yield: 14.5,
    tenor: "5 Years",
    minInvestment: 5_000_000,
    rating: "AA-",
    sector: "Industrial",
  },
  {
    id: "oando-bond-green",
    name: "Oando Green Bond 2025",
    symbol: "OANDO-GRN-25",
    description:
      "Nigeria's first oil & gas green bond for renewable energy and carbon offset projects. ESG-compliant instrument.",
    logoColor: "bg-lime-600",
    type: "bond",
    company: "Oando Plc",
    underwriter: "United Capital Plc",
    status: "upcoming",
    raised: 0,
    total: 150_000_000_000,
    participants: 0,
    timeInfo: "Starts in 21d",
    yield: 15.2,
    tenor: "7 Years",
    minInvestment: 10_000_000,
    rating: "A-",
    sector: "Oil & Gas",
  },
  {
    id: "airtel-bond-2025",
    name: "Airtel Nigeria Bond Series 3",
    symbol: "AIRTEL-BD-3",
    description:
      "5-Year corporate bond for network modernization and 4G LTE expansion across Northern Nigeria.",
    logoColor: "bg-rose-500",
    type: "bond",
    company: "Airtel Nigeria Limited",
    underwriter: "Renaissance Capital",
    status: "completed",
    raised: 200_000_000_000,
    total: 200_000_000_000,
    participants: 2100,
    timeInfo: "Ended",
    performance: 18,
    yield: 15.0,
    tenor: "5 Years",
    minInvestment: 5_000_000,
    rating: "AA",
    sector: "Telecommunications",
  },
  {
    id: "fbn-tier2-capital",
    name: "First Bank Tier 2 Capital Notes",
    symbol: "FBN-T2-25",
    description:
      "10-Year subordinated notes for Basel III capital adequacy requirements. Fixed rate with call option.",
    logoColor: "bg-slate-600",
    type: "bond",
    company: "FBN Holdings Plc",
    underwriter: "FBNQuest Merchant Bank",
    status: "ongoing",
    raised: 220_000_000_000,
    total: 300_000_000_000,
    participants: 3500,
    timeInfo: "4d 9h left",
    yield: 17.2,
    tenor: "10 Years",
    minInvestment: 10_000_000,
    rating: "AA-",
    sector: "Financial Services",
  },
  {
    id: "uba-green-bond",
    name: "UBA Green Climate Bond",
    symbol: "UBA-GRN-25",
    description:
      "Climate-focused bond for sustainable financing initiatives across Africa. IFC Green Bond certified.",
    logoColor: "bg-green-600",
    type: "bond",
    company: "United Bank for Africa",
    underwriter: "Standard Chartered",
    status: "ongoing",
    raised: 95_000_000_000,
    total: 150_000_000_000,
    participants: 1800,
    timeInfo: "12d left",
    yield: 14.8,
    tenor: "5 Years",
    minInvestment: 5_000_000,
    rating: "AA",
    sector: "Financial Services",
  },
  {
    id: "nestle-bond-2025",
    name: "Nestle Nigeria Corporate Bond",
    symbol: "NESTLE-BD-25",
    description:
      "7-Year investment grade bond for manufacturing capacity expansion in Agbara industrial zone.",
    logoColor: "bg-amber-600",
    type: "bond",
    company: "Nestle Nigeria Plc",
    underwriter: "Coronation Merchant Bank",
    status: "completed",
    raised: 80_000_000_000,
    total: 80_000_000_000,
    participants: 1200,
    timeInfo: "Ended",
    performance: 16,
    yield: 13.5,
    tenor: "7 Years",
    minInvestment: 5_000_000,
    rating: "AAA",
    sector: "Consumer Goods",
  },
  {
    id: "flour-mills-bond",
    name: "Flour Mills of Nigeria Bond",
    symbol: "FLOURMIL-BD",
    description:
      "5-Year bond for grain storage infrastructure and port facility upgrades in Apapa.",
    logoColor: "bg-orange-500",
    type: "bond",
    company: "Flour Mills of Nigeria",
    underwriter: "FCMB Capital",
    status: "upcoming",
    raised: 0,
    total: 100_000_000_000,
    participants: 0,
    timeInfo: "Starts in 14d",
    yield: 15.5,
    tenor: "5 Years",
    minInvestment: 5_000_000,
    rating: "A+",
    sector: "Consumer Goods",
  },
  {
    id: "gtco-tier2-bond",
    name: "GTCO Tier 2 Capital Bond",
    symbol: "GTCO-T2-BD",
    description:
      "10-Year subordinated debt for regulatory capital optimization and growth financing.",
    logoColor: "bg-pink-500",
    type: "bond",
    company: "Guaranty Trust Holding",
    underwriter: "GTI Securities",
    status: "ongoing",
    raised: 180_000_000_000,
    total: 250_000_000_000,
    participants: 2600,
    timeInfo: "8d left",
    yield: 16.5,
    tenor: "10 Years",
    minInvestment: 10_000_000,
    rating: "AA+",
    sector: "Financial Services",
  },

  // Private Equity
  {
    id: "mtn-pe-round-f",
    name: "MTN Nigeria PE Round F",
    symbol: "MTN-PE-F",
    description:
      "Growth equity round for 5G network infrastructure deployment and data center expansion in Lagos and Abuja.",
    logoColor: "bg-amber-500",
    type: "private_equity",
    company: "MTN Nigeria Communications Plc",
    underwriter: "FBNQuest Merchant Bank",
    status: "upcoming",
    raised: 0,
    total: 1_200_000_000_000,
    participants: 0,
    timeInfo: "Starts in 9d",
    yield: 28,
    tenor: "5 Years",
    minInvestment: 50_000_000,
    rating: "A",
    sector: "Telecommunications",
  },
  {
    id: "flutterwave-pe-d",
    name: "Flutterwave PE Round D",
    symbol: "FLW-PE-D",
    description:
      "Series D funding for Africa's leading payments technology company. Expansion into 8 new African markets.",
    logoColor: "bg-orange-500",
    type: "private_equity",
    company: "Flutterwave Inc",
    underwriter: "Aruwa Capital Management",
    status: "completed",
    raised: 280_000_000_000,
    total: 280_000_000_000,
    participants: 920,
    timeInfo: "Ended",
    performance: 34,
    yield: 45,
    tenor: "4 Years",
    minInvestment: 100_000_000,
    rating: "BB+",
    sector: "Fintech",
  },
  {
    id: "seplat-pe-growth",
    name: "Seplat Energy Growth Equity",
    symbol: "SEPLAT-GE",
    description:
      "Growth capital for gas processing infrastructure and renewable energy transition projects in the Niger Delta.",
    logoColor: "bg-purple-600",
    type: "private_equity",
    company: "Seplat Energy Plc",
    underwriter: "Coronation Merchant Bank",
    status: "upcoming",
    raised: 0,
    total: 450_000_000_000,
    participants: 0,
    timeInfo: "Starts in 14d",
    yield: 32,
    tenor: "6 Years",
    minInvestment: 75_000_000,
    rating: "A-",
    sector: "Oil & Gas",
  },
  {
    id: "paystack-pe-series-c",
    name: "Paystack Series C",
    symbol: "PYSTK-PE-C",
    description:
      "Expansion capital for pan-African merchant payments platform. Integration with 15+ African banking networks.",
    logoColor: "bg-indigo-500",
    type: "private_equity",
    company: "Paystack Payments Limited",
    underwriter: "FCMB Capital",
    status: "completed",
    raised: 180_000_000_000,
    total: 180_000_000_000,
    participants: 680,
    timeInfo: "Ended",
    performance: 42,
    yield: 55,
    tenor: "5 Years",
    minInvestment: 50_000_000,
    rating: "BB",
    sector: "Fintech",
  },
  {
    id: "interswitch-pe-e",
    name: "Interswitch Pre-IPO Round",
    symbol: "ISWITCH-PE",
    description:
      "Pre-IPO investment opportunity in Africa's largest integrated payments company. Targeting 2025 dual listing.",
    logoColor: "bg-teal-500",
    type: "private_equity",
    company: "Interswitch Limited",
    underwriter: "CardinalStone Partners",
    status: "ongoing",
    raised: 520_000_000_000,
    total: 750_000_000_000,
    participants: 1250,
    timeInfo: "10d 4h left",
    yield: 38,
    tenor: "3 Years",
    minInvestment: 100_000_000,
    rating: "A",
    sector: "Fintech",
  },
  {
    id: "geregu-power-pe",
    name: "Geregu Power Expansion Fund",
    symbol: "GEREGU-PE",
    description:
      "Equity raise for 750MW power plant upgrade and renewable energy integration projects.",
    logoColor: "bg-yellow-500",
    type: "private_equity",
    company: "Geregu Power Plc",
    underwriter: "Afrinvest Securities",
    status: "ongoing",
    raised: 95_000_000_000,
    total: 180_000_000_000,
    participants: 890,
    timeInfo: "8d 15h left",
    yield: 25,
    tenor: "7 Years",
    minInvestment: 25_000_000,
    rating: "BBB+",
    sector: "Power & Utilities",
  },
  {
    id: "kobo360-series-b",
    name: "Kobo360 Series B Extension",
    symbol: "KOBO-PE-B",
    description:
      "Growth capital for Africa's leading logistics platform connecting cargo owners with truck drivers.",
    logoColor: "bg-red-500",
    type: "private_equity",
    company: "Kobo360 Inc",
    underwriter: "Aruwa Capital",
    status: "ongoing",
    raised: 35_000_000_000,
    total: 60_000_000_000,
    participants: 420,
    timeInfo: "15d left",
    yield: 35,
    tenor: "4 Years",
    minInvestment: 25_000_000,
    rating: "B+",
    sector: "Logistics",
  },
  {
    id: "andela-pe-growth",
    name: "Andela Growth Equity Round",
    symbol: "ANDELA-GE",
    description:
      "Expansion funding for Africa's largest talent network connecting developers with global companies.",
    logoColor: "bg-emerald-600",
    type: "private_equity",
    company: "Andela Inc",
    underwriter: "Verod Capital",
    status: "completed",
    raised: 120_000_000_000,
    total: 120_000_000_000,
    participants: 380,
    timeInfo: "Ended",
    performance: 28,
    yield: 42,
    tenor: "5 Years",
    minInvestment: 50_000_000,
    rating: "BB",
    sector: "Technology",
  },
  {
    id: "opay-pe-series-c",
    name: "OPay Nigeria Series C",
    symbol: "OPAY-PE-C",
    description:
      "Super app expansion funding for payments, ride-hailing, and e-commerce services in Nigeria.",
    logoColor: "bg-lime-500",
    type: "private_equity",
    company: "OPay Digital Services",
    underwriter: "Coronation MB",
    status: "ongoing",
    raised: 280_000_000_000,
    total: 400_000_000_000,
    participants: 1100,
    timeInfo: "6d left",
    yield: 40,
    tenor: "4 Years",
    minInvestment: 75_000_000,
    rating: "BB+",
    sector: "Fintech",
  },
  {
    id: "piggyvest-pe-b",
    name: "PiggyVest Series B",
    symbol: "PIGGY-PE-B",
    description:
      "Growth capital for Nigeria's leading savings and investment platform with 4M+ users.",
    logoColor: "bg-blue-500",
    type: "private_equity",
    company: "PiggyTech Global",
    underwriter: "FCMB Capital",
    status: "completed",
    raised: 45_000_000_000,
    total: 45_000_000_000,
    participants: 560,
    timeInfo: "Ended",
    performance: 38,
    yield: 48,
    tenor: "4 Years",
    minInvestment: 20_000_000,
    rating: "BB",
    sector: "Fintech",
  },

  // Commercial Paper
  {
    id: "zenith-cp-09",
    name: "Zenith Bank CP Series 9",
    symbol: "ZENITH-CP-09",
    description:
      "90-day commercial paper for working capital requirements. Discount rate with principal and interest at maturity.",
    logoColor: "bg-red-500",
    type: "commercial_paper",
    company: "Zenith Bank Plc",
    underwriter: "Chapel Hill Denham",
    status: "completed",
    raised: 350_000_000_000,
    total: 350_000_000_000,
    participants: 3100,
    timeInfo: "Ended",
    performance: 16,
    yield: 14.2,
    tenor: "90 Days",
    minInvestment: 10_000_000,
    rating: "AAA",
    sector: "Financial Services",
  },
  {
    id: "gtco-cp-12",
    name: "GTCO Commercial Paper Series 12",
    symbol: "GTCO-CP-12",
    description:
      "180-day commercial paper for trade finance portfolio. Discount instrument with strong credit metrics.",
    logoColor: "bg-pink-500",
    type: "commercial_paper",
    company: "Guaranty Trust Holding Company",
    underwriter: "GTI Securities",
    status: "ongoing",
    raised: 280_000_000_000,
    total: 400_000_000_000,
    participants: 4200,
    timeInfo: "2d 18h left",
    yield: 13.8,
    tenor: "180 Days",
    minInvestment: 20_000_000,
    rating: "AAA",
    sector: "Financial Services",
  },
  {
    id: "access-cp-15",
    name: "Access Bank CP Series 15",
    symbol: "ACCESS-CP-15",
    description:
      "91-day commercial paper for short-term funding needs. Triple-A rated with competitive yields.",
    logoColor: "bg-blue-500",
    type: "commercial_paper",
    company: "Access Bank Plc",
    underwriter: "Access Bank Capital",
    status: "ongoing",
    raised: 180_000_000_000,
    total: 250_000_000_000,
    participants: 2400,
    timeInfo: "1d 8h left",
    yield: 14.5,
    tenor: "91 Days",
    minInvestment: 10_000_000,
    rating: "AAA",
    sector: "Financial Services",
  },
  {
    id: "uba-cp-22",
    name: "UBA Commercial Paper Series 22",
    symbol: "UBA-CP-22",
    description:
      "182-day commercial paper for working capital. Strong credit profile across African operations.",
    logoColor: "bg-green-500",
    type: "commercial_paper",
    company: "United Bank for Africa",
    underwriter: "UBA Capital",
    status: "upcoming",
    raised: 0,
    total: 200_000_000_000,
    participants: 0,
    timeInfo: "Starts in 5d",
    yield: 14.0,
    tenor: "182 Days",
    minInvestment: 10_000_000,
    rating: "AA+",
    sector: "Financial Services",
  },
  {
    id: "fidelity-cp-08",
    name: "Fidelity Bank CP Series 8",
    symbol: "FIDELITY-CP-08",
    description:
      "90-day commercial paper for trade finance and SME lending portfolio expansion.",
    logoColor: "bg-purple-500",
    type: "commercial_paper",
    company: "Fidelity Bank Plc",
    underwriter: "Fidelity Securities",
    status: "completed",
    raised: 120_000_000_000,
    total: 120_000_000_000,
    participants: 1800,
    timeInfo: "Ended",
    performance: 15,
    yield: 14.8,
    tenor: "90 Days",
    minInvestment: 5_000_000,
    rating: "AA",
    sector: "Financial Services",
  },
  {
    id: "sterling-cp-11",
    name: "Sterling Bank CP Series 11",
    symbol: "STERLING-CP-11",
    description:
      "91-day commercial paper supporting digital banking infrastructure investment.",
    logoColor: "bg-cyan-600",
    type: "commercial_paper",
    company: "Sterling Bank Plc",
    underwriter: "Sterling Capital",
    status: "ongoing",
    raised: 65_000_000_000,
    total: 100_000_000_000,
    participants: 920,
    timeInfo: "4d left",
    yield: 15.2,
    tenor: "91 Days",
    minInvestment: 5_000_000,
    rating: "A+",
    sector: "Financial Services",
  },
  {
    id: "fcmb-cp-14",
    name: "FCMB CP Series 14",
    symbol: "FCMB-CP-14",
    description:
      "180-day commercial paper for SME lending and trade finance portfolio.",
    logoColor: "bg-violet-500",
    type: "commercial_paper",
    company: "First City Monument Bank",
    underwriter: "FCMB Capital",
    status: "ongoing",
    raised: 55_000_000_000,
    total: 80_000_000_000,
    participants: 780,
    timeInfo: "6d left",
    yield: 15.0,
    tenor: "180 Days",
    minInvestment: 5_000_000,
    rating: "A+",
    sector: "Financial Services",
  },
  {
    id: "stanbic-cp-09",
    name: "Stanbic IBTC CP Series 9",
    symbol: "STANBIC-CP-09",
    description:
      "91-day commercial paper backed by Standard Bank Group guarantee.",
    logoColor: "bg-blue-700",
    type: "commercial_paper",
    company: "Stanbic IBTC Holdings",
    underwriter: "Stanbic IBTC Capital",
    status: "completed",
    raised: 150_000_000_000,
    total: 150_000_000_000,
    participants: 2200,
    timeInfo: "Ended",
    performance: 14,
    yield: 13.5,
    tenor: "91 Days",
    minInvestment: 10_000_000,
    rating: "AAA",
    sector: "Financial Services",
  },
  {
    id: "wema-cp-07",
    name: "Wema Bank CP Series 7",
    symbol: "WEMA-CP-07",
    description: "90-day commercial paper for ALAT digital banking expansion.",
    logoColor: "bg-fuchsia-500",
    type: "commercial_paper",
    company: "Wema Bank Plc",
    underwriter: "Meristem Securities",
    status: "upcoming",
    raised: 0,
    total: 50_000_000_000,
    participants: 0,
    timeInfo: "Starts in 7d",
    yield: 15.5,
    tenor: "90 Days",
    minInvestment: 5_000_000,
    rating: "A",
    sector: "Financial Services",
  },
  {
    id: "polaris-cp-06",
    name: "Polaris Bank CP Series 6",
    symbol: "POLARIS-CP-06",
    description:
      "182-day commercial paper for retail banking portfolio expansion.",
    logoColor: "bg-sky-500",
    type: "commercial_paper",
    company: "Polaris Bank Limited",
    underwriter: "Vetiva Capital",
    status: "ongoing",
    raised: 32_000_000_000,
    total: 50_000_000_000,
    participants: 480,
    timeInfo: "9d left",
    yield: 15.8,
    tenor: "182 Days",
    minInvestment: 5_000_000,
    rating: "A-",
    sector: "Financial Services",
  },

  // Treasury Bills
  {
    id: "fgn-tb-364",
    name: "FGN Treasury Bills NTB 364D",
    symbol: "FGN-TB-364",
    description:
      "364-Day Federal Government of Nigeria Treasury Bills. Zero-coupon instrument backed by sovereign guarantee.",
    logoColor: "bg-green-600",
    type: "treasury_bills",
    company: "Federal Government of Nigeria",
    underwriter: "Debt Management Office (DMO)",
    status: "ongoing",
    raised: 980_000_000_000,
    total: 1_500_000_000_000,
    participants: 14500,
    timeInfo: "1d 8h left",
    yield: 18.5,
    tenor: "364 Days",
    minInvestment: 100_000,
    rating: "B+",
    sector: "Government",
  },
  {
    id: "fgn-tb-182",
    name: "FGN Treasury Bills NTB 182D",
    symbol: "FGN-TB-182",
    description:
      "182-Day Treasury Bills with DMO guarantee. Ideal for medium-term portfolio allocation.",
    logoColor: "bg-green-500",
    type: "treasury_bills",
    company: "Federal Government of Nigeria",
    underwriter: "Debt Management Office (DMO)",
    status: "ongoing",
    raised: 750_000_000_000,
    total: 1_000_000_000_000,
    participants: 12000,
    timeInfo: "2d left",
    yield: 17.8,
    tenor: "182 Days",
    minInvestment: 100_000,
    rating: "B+",
    sector: "Government",
  },
  {
    id: "fgn-tb-91",
    name: "FGN Treasury Bills NTB 91D",
    symbol: "FGN-TB-91",
    description:
      "91-Day Treasury Bills offering short-term sovereign exposure with weekly auction.",
    logoColor: "bg-green-400",
    type: "treasury_bills",
    company: "Federal Government of Nigeria",
    underwriter: "Debt Management Office (DMO)",
    status: "upcoming",
    raised: 0,
    total: 500_000_000_000,
    participants: 0,
    timeInfo: "Starts in 3d",
    yield: 16.5,
    tenor: "91 Days",
    minInvestment: 100_000,
    rating: "B+",
    sector: "Government",
  },
  {
    id: "fgn-tb-364-mar",
    name: "FGN NTB March 2026 Series",
    symbol: "FGN-TB-MAR26",
    description:
      "364-Day Treasury Bills maturing March 2026. Secondary market trading available.",
    logoColor: "bg-emerald-500",
    type: "treasury_bills",
    company: "Federal Government of Nigeria",
    underwriter: "Debt Management Office (DMO)",
    status: "completed",
    raised: 1_200_000_000_000,
    total: 1_200_000_000_000,
    participants: 18000,
    timeInfo: "Ended",
    performance: 19,
    yield: 19.2,
    tenor: "364 Days",
    minInvestment: 100_000,
    rating: "B+",
    sector: "Government",
  },
  {
    id: "fgn-tb-182-apr",
    name: "FGN NTB April 2025 Series",
    symbol: "FGN-TB-APR25",
    description:
      "182-Day Treasury Bills with attractive yield spread over inflation.",
    logoColor: "bg-teal-500",
    type: "treasury_bills",
    company: "Federal Government of Nigeria",
    underwriter: "Debt Management Office (DMO)",
    status: "completed",
    raised: 800_000_000_000,
    total: 800_000_000_000,
    participants: 9500,
    timeInfo: "Ended",
    performance: 18,
    yield: 18.0,
    tenor: "182 Days",
    minInvestment: 100_000,
    rating: "B+",
    sector: "Government",
  },

  // More Private Equity
  {
    id: "moove-pe-b",
    name: "Moove Africa Series B",
    symbol: "MOOVE-PE-B",
    description:
      "Vehicle financing platform for ride-hailing drivers expanding across Africa.",
    logoColor: "bg-indigo-600",
    type: "private_equity",
    company: "Moove Africa",
    underwriter: "Verod Capital",
    status: "ongoing",
    raised: 85_000_000_000,
    total: 150_000_000_000,
    participants: 620,
    timeInfo: "18d left",
    yield: 35,
    tenor: "4 Years",
    minInvestment: 30_000_000,
    rating: "BB",
    sector: "Fintech",
  },
  {
    id: "teamapt-pe-c",
    name: "TeamApt Series C",
    symbol: "TEAMAPT-PE-C",
    description:
      "Agency banking and payment processing company powering Moniepoint.",
    logoColor: "bg-orange-600",
    type: "private_equity",
    company: "TeamApt Limited",
    underwriter: "Aruwa Capital",
    status: "completed",
    raised: 200_000_000_000,
    total: 200_000_000_000,
    participants: 480,
    timeInfo: "Ended",
    performance: 52,
    yield: 60,
    tenor: "4 Years",
    minInvestment: 75_000_000,
    rating: "BB+",
    sector: "Fintech",
  },
  {
    id: "kuda-pe-c",
    name: "Kuda Bank Series C",
    symbol: "KUDA-PE-C",
    description:
      "Digital-first neobank targeting Nigeria's unbanked population with 5M+ customers.",
    logoColor: "bg-purple-500",
    type: "private_equity",
    company: "Kuda Technologies",
    underwriter: "CardinalStone",
    status: "ongoing",
    raised: 120_000_000_000,
    total: 180_000_000_000,
    participants: 520,
    timeInfo: "11d left",
    yield: 45,
    tenor: "4 Years",
    minInvestment: 50_000_000,
    rating: "BB",
    sector: "Fintech",
  },
  {
    id: "carbon-pe-b",
    name: "Carbon Series B",
    symbol: "CARBON-PE-B",
    description:
      "Digital lending platform providing instant loans to Nigerian consumers.",
    logoColor: "bg-gray-700",
    type: "private_equity",
    company: "Carbon (OneFi)",
    underwriter: "FCMB Capital",
    status: "completed",
    raised: 60_000_000_000,
    total: 60_000_000_000,
    participants: 340,
    timeInfo: "Ended",
    performance: 38,
    yield: 50,
    tenor: "4 Years",
    minInvestment: 25_000_000,
    rating: "B+",
    sector: "Fintech",
  },
  {
    id: "cowrywise-pe-a",
    name: "Cowrywise Series A",
    symbol: "COWRY-PE-A",
    description:
      "Wealth management platform democratizing investment access in Nigeria.",
    logoColor: "bg-green-600",
    type: "private_equity",
    company: "Cowrywise Technologies",
    underwriter: "Ventures Platform",
    status: "completed",
    raised: 25_000_000_000,
    total: 25_000_000_000,
    participants: 280,
    timeInfo: "Ended",
    performance: 32,
    yield: 45,
    tenor: "5 Years",
    minInvestment: 15_000_000,
    rating: "B",
    sector: "Fintech",
  },
  {
    id: "bento-pe-seed",
    name: "Bento Africa Seed Extension",
    symbol: "BENTO-PE-S",
    description: "Payroll and HR management platform for African businesses.",
    logoColor: "bg-blue-400",
    type: "private_equity",
    company: "Bento Africa",
    underwriter: "Future Africa",
    status: "ongoing",
    raised: 8_000_000_000,
    total: 15_000_000_000,
    participants: 120,
    timeInfo: "25d left",
    yield: 40,
    tenor: "5 Years",
    minInvestment: 10_000_000,
    rating: "B",
    sector: "HR Tech",
  },
  {
    id: "brass-pe-a",
    name: "Brass Series A",
    symbol: "BRASS-PE-A",
    description:
      "Business banking platform serving SMEs with integrated financial tools.",
    logoColor: "bg-amber-700",
    type: "private_equity",
    company: "Brass Technologies",
    underwriter: "Ingressive Capital",
    status: "ongoing",
    raised: 12_000_000_000,
    total: 20_000_000_000,
    participants: 180,
    timeInfo: "20d left",
    yield: 38,
    tenor: "4 Years",
    minInvestment: 10_000_000,
    rating: "B",
    sector: "Fintech",
  },
  {
    id: "buycoins-pe-a",
    name: "Quidax Growth Round",
    symbol: "QUIDAX-PE-A",
    description: "Cryptocurrency exchange platform for African traders.",
    logoColor: "bg-cyan-600",
    type: "private_equity",
    company: "Quidax Technologies",
    underwriter: "Ventures Platform",
    status: "completed",
    raised: 18_000_000_000,
    total: 18_000_000_000,
    participants: 220,
    timeInfo: "Ended",
    performance: 65,
    yield: 80,
    tenor: "3 Years",
    minInvestment: 15_000_000,
    rating: "B",
    sector: "Crypto",
  },
  {
    id: "54gene-pe-b",
    name: "54gene Series B",
    symbol: "54GENE-PE-B",
    description:
      "African genomics research company building health data infrastructure.",
    logoColor: "bg-red-600",
    type: "private_equity",
    company: "54gene Inc",
    underwriter: "CardinalStone",
    status: "completed",
    raised: 75_000_000_000,
    total: 75_000_000_000,
    participants: 180,
    timeInfo: "Ended",
    performance: 25,
    yield: 35,
    tenor: "6 Years",
    minInvestment: 50_000_000,
    rating: "B+",
    sector: "HealthTech",
  },
  {
    id: "reliance-pe-growth",
    name: "Reliance HMO Series B",
    symbol: "RELIANCE-PE-B",
    description:
      "Health insurance technology company digitizing healthcare access.",
    logoColor: "bg-pink-600",
    type: "private_equity",
    company: "Reliance Health",
    underwriter: "Verod Capital",
    status: "ongoing",
    raised: 45_000_000_000,
    total: 75_000_000_000,
    participants: 280,
    timeInfo: "14d left",
    yield: 32,
    tenor: "5 Years",
    minInvestment: 25_000_000,
    rating: "BB",
    sector: "HealthTech",
  },

  // More Bonds
  {
    id: "transcorp-power-bond",
    name: "Transcorp Power Bond",
    symbol: "TRANSCORP-BD",
    description:
      "5-Year bond for power generation capacity expansion in Ughelli.",
    logoColor: "bg-yellow-600",
    type: "bond",
    company: "Transcorp Power",
    underwriter: "Stanbic IBTC",
    status: "ongoing",
    raised: 68_000_000_000,
    total: 100_000_000_000,
    participants: 980,
    timeInfo: "16d left",
    yield: 16.0,
    tenor: "5 Years",
    minInvestment: 5_000_000,
    rating: "A-",
    sector: "Power & Utilities",
  },
  {
    id: "lafarge-bond-2025",
    name: "Lafarge Africa Bond Series 2",
    symbol: "LAFARGE-BD-2",
    description:
      "7-Year bond for cement plant modernization and carbon reduction initiatives.",
    logoColor: "bg-blue-500",
    type: "bond",
    company: "Lafarge Africa Plc",
    underwriter: "Chapel Hill Denham",
    status: "upcoming",
    raised: 0,
    total: 150_000_000_000,
    participants: 0,
    timeInfo: "Starts in 18d",
    yield: 15.0,
    tenor: "7 Years",
    minInvestment: 5_000_000,
    rating: "AA-",
    sector: "Industrial",
  },
  {
    id: "julius-berger-bond",
    name: "Julius Berger Infrastructure Bond",
    symbol: "JB-INFRA-BD",
    description:
      "10-Year infrastructure bond for construction equipment and project financing.",
    logoColor: "bg-emerald-700",
    type: "bond",
    company: "Julius Berger Nigeria",
    underwriter: "United Capital",
    status: "ongoing",
    raised: 42_000_000_000,
    total: 80_000_000_000,
    participants: 620,
    timeInfo: "22d left",
    yield: 15.5,
    tenor: "10 Years",
    minInvestment: 10_000_000,
    rating: "A",
    sector: "Construction",
  },
  {
    id: "fidelity-tier2-bond",
    name: "Fidelity Bank Tier 2 Notes",
    symbol: "FIDELITY-T2",
    description:
      "10-Year subordinated notes for capital adequacy requirements.",
    logoColor: "bg-purple-600",
    type: "bond",
    company: "Fidelity Bank Plc",
    underwriter: "Fidelity Securities",
    status: "completed",
    raised: 80_000_000_000,
    total: 80_000_000_000,
    participants: 1200,
    timeInfo: "Ended",
    performance: 17,
    yield: 16.5,
    tenor: "10 Years",
    minInvestment: 10_000_000,
    rating: "AA-",
    sector: "Financial Services",
  },
  {
    id: "ecobank-bond-2025",
    name: "Ecobank Nigeria Senior Bond",
    symbol: "ECOBANK-BD-25",
    description:
      "5-Year senior unsecured bond for trade finance portfolio expansion.",
    logoColor: "bg-blue-600",
    type: "bond",
    company: "Ecobank Nigeria Plc",
    underwriter: "Coronation MB",
    status: "ongoing",
    raised: 55_000_000_000,
    total: 75_000_000_000,
    participants: 780,
    timeInfo: "13d left",
    yield: 15.8,
    tenor: "5 Years",
    minInvestment: 5_000_000,
    rating: "A+",
    sector: "Financial Services",
  },
];

const filterOptions = ["all", "ongoing", "upcoming", "completed"] as const;
type FilterType = (typeof filterOptions)[number];

const ITEMS_PER_PAGE = 12;

const formatAmount = (v: number) =>
  v >= 1_000_000_000
    ? `₦${(v / 1_000_000_000).toFixed(1)}B`
    : `₦${(v / 1_000_000).toFixed(0)}M`;

const PrivateMarket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [depositModalOpen, setDepositModalOpen] = useState(false);

  const routePrefix = location.pathname.includes("/preview/app")
    ? "/preview/app"
    : "/app";

  const ongoingSecurities = useMemo(
    () => mockSecurities.filter((i) => i.status === "ongoing"),
    []
  );
  const completedSecurities = useMemo(
    () => mockSecurities.filter((i) => i.status === "completed"),
    []
  );

  const totalRaised = useMemo(
    () => completedSecurities.reduce((sum, i) => sum + i.raised, 0),
    [completedSecurities]
  );
  const totalProjects = mockSecurities.length;
  const totalParticipants = mockSecurities.reduce(
    (sum, i) => sum + (i.participants || 0),
    0
  );
  const avgPerformance = useMemo(() => {
    const perfs = completedSecurities
      .map((i) => i.performance || 0)
      .filter((r) => r > 0);
    return perfs.length
      ? (perfs.reduce((sum, r) => sum + r, 0) / perfs.length).toFixed(1)
      : "N/A";
  }, [completedSecurities]);

  const uniqueTypes = useMemo(
    () => Array.from(new Set(mockSecurities.map((i) => i.type))),
    []
  );

  const filteredSecurities = useMemo(() => {
    let list = [...mockSecurities];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.symbol.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q)
      );
    }
    if (activeFilter !== "all")
      list = list.filter((i) => i.status === activeFilter);
    if (selectedType !== "all")
      list = list.filter((i) => i.type === selectedType);
    return list.sort((a, b) => b.raised - a.raised);
  }, [searchQuery, activeFilter, selectedType]);

  const paginatedSecurities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSecurities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSecurities, currentPage]);

  const totalPages = Math.ceil(filteredSecurities.length / ITEMS_PER_PAGE);

  const upcomingSecurities = useMemo(
    () => mockSecurities.filter((i) => i.status === "upcoming").slice(0, 5),
    []
  );

  useEffect(() => {
    if (ongoingSecurities.length > 1) {
      const timer = setInterval(() => {
        setCarouselIndex((prev) =>
          prev === ongoingSecurities.slice(0, 5).length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [ongoingSecurities.length]);

  const handlePrev = () =>
    setCarouselIndex((prev) =>
      prev === 0 ? ongoingSecurities.slice(0, 5).length - 1 : prev - 1
    );
  const handleNext = () =>
    setCarouselIndex((prev) =>
      prev === ongoingSecurities.slice(0, 5).length - 1 ? 0 : prev + 1
    );

  const handleCardClick = (securityId: string) => {
    navigate(`${routePrefix}/markets/private/${securityId}`);
  };

  // Featured Card Component
  const FeaturedCard = ({ security }: { security: Security }) => (
    <div
      className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => handleCardClick(security.id)}
    >
      <div className="flex items-start gap-6">
        <div
          className={cn(
            "h-16 w-16 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-105 transition-transform",
            security.logoColor
          )}
        >
          {security.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                {security.name}
              </h2>
              <p className="text-sm text-gray-500">
                {security.company} · {security.symbol}
              </p>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-0 font-medium">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {security.description}
          </p>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Yield</p>
              <p className="font-semibold text-emerald-600">
                {security.yield}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Tenor</p>
              <p className="font-semibold text-gray-900">{security.tenor}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Rating</p>
              <p className="font-semibold text-gray-900">{security.rating}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Min. Investment</p>
              <p className="font-semibold text-gray-900">
                {formatAmount(security.minInvestment || 0)}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">
                {formatAmount(security.raised)} / {formatAmount(security.total)}
              </span>
            </div>
            <Progress
              value={(security.raised / security.total) * 100}
              className="h-2 bg-gray-100"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {security.timeInfo}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {security.participants?.toLocaleString()} investors
              </span>
            </div>
            <Button className="rounded-xl bg-gray-900 hover:bg-gray-800 group-hover:bg-emerald-600 transition-colors">
              Subscribe
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Security Card Component
  const SecurityCard = ({
    security,
    isListView,
  }: {
    security: Security;
    isListView: boolean;
  }) => (
    <Card
      className={cn(
        "group bg-white border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden cursor-pointer",
        isListView && "flex flex-row"
      )}
      onClick={() => handleCardClick(security.id)}
    >
      <CardContent
        className={cn("p-5", isListView && "flex items-center gap-4 flex-1")}
      >
        <div
          className={cn(
            "flex items-start justify-between mb-4",
            isListView && "mb-0 gap-4"
          )}
        >
          <div
            className={cn(
              "h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform",
              security.logoColor
            )}
          >
            {security.name.slice(0, 2).toUpperCase()}
          </div>
          {!isListView && (
            <Badge
              variant={
                security.status === "ongoing"
                  ? "default"
                  : security.status === "upcoming"
                  ? "secondary"
                  : "outline"
              }
              className={cn(
                "text-xs font-medium",
                security.status === "ongoing" &&
                  "bg-emerald-50 text-emerald-700 border-0",
                security.status === "upcoming" &&
                  "bg-blue-50 text-blue-700 border-0",
                security.status === "completed" && "bg-gray-100 text-gray-600"
              )}
            >
              {security.status.charAt(0).toUpperCase() +
                security.status.slice(1)}
            </Badge>
          )}
        </div>

        <div className={cn("flex-1", isListView && "min-w-0")}>
          <h3 className="font-semibold text-gray-900 mb-1 truncate group-hover:text-emerald-600 transition-colors">
            {security.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{security.company}</p>

          {/* Key Metrics */}
          <div className="flex items-center gap-3 mb-3 text-xs">
            {security.yield && (
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                <Percent className="h-3 w-3" />
                {security.yield}% yield
              </span>
            )}
            {security.rating && (
              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                <BadgeCheck className="h-3 w-3" />
                {security.rating}
              </span>
            )}
          </div>

          {security.status !== "upcoming" && (
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-400">Subscribed</span>
                <span className="font-medium text-gray-600">
                  {((security.raised / security.total) * 100).toFixed(0)}%
                </span>
              </div>
              <Progress
                value={(security.raised / security.total) * 100}
                className="h-1.5 bg-gray-100"
              />
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {security.timeInfo}
            </span>
            {security.performance && (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <TrendingUp className="h-3 w-3" />+{security.performance}%
              </span>
            )}
          </div>

          {/* Additional info row */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
            <span>{security.sector}</span>
            <span>•</span>
            <span>{security.tenor}</span>
            <span>•</span>
            <span>Min. {formatAmount(security.minInvestment || 0)}</span>
          </div>
        </div>

        {isListView && (
          <Badge
            className={cn(
              "ml-auto",
              security.status === "ongoing" &&
                "bg-emerald-50 text-emerald-700 border-0",
              security.status === "upcoming" &&
                "bg-blue-50 text-blue-700 border-0",
              security.status === "completed" && "bg-gray-100 text-gray-600"
            )}
          >
            {security.status.charAt(0).toUpperCase() + security.status.slice(1)}
          </Badge>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      {/* Deposit Modal */}
      <DepositWithdrawModal
        open={depositModalOpen}
        onOpenChange={setDepositModalOpen}
        mode="deposit"
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Private Market
          </h1>
          <p className="text-gray-500">
            Discover and invest in exclusive Nigerian private market
            opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Carousel */}
            {ongoingSecurities.length > 0 && (
              <section className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(-${carouselIndex * 100}%)`,
                    }}
                  >
                    {ongoingSecurities.slice(0, 5).map((security) => (
                      <div key={security.id} className="min-w-full">
                        <FeaturedCard security={security} />
                      </div>
                    ))}
                  </div>
                </div>

                {ongoingSecurities.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur border-gray-200 shadow-sm hover:bg-white"
                      onClick={handlePrev}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur border-gray-200 shadow-sm hover:bg-white"
                      onClick={handleNext}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <div className="flex justify-center gap-1.5 mt-4">
                      {ongoingSecurities.slice(0, 5).map((_, idx) => (
                        <button
                          key={idx}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            idx === carouselIndex
                              ? "bg-gray-900 w-6"
                              : "bg-gray-300 w-1.5"
                          )}
                          onClick={() => setCarouselIndex(idx)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </section>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white rounded-xl p-4 border border-gray-100">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-0 rounded-lg h-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "rounded-lg h-9",
                      activeFilter === filter && "bg-gray-900 text-white"
                    )}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40 h-9 bg-gray-50 border-0 rounded-lg">
                  <Filter className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t
                        .replace("_", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-1 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-lg",
                    viewMode === "grid" && "bg-gray-100"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-lg",
                    viewMode === "list" && "bg-gray-100"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-500">
              Showing {paginatedSecurities.length} of{" "}
              {filteredSecurities.length} securities
            </div>

            {/* Securities Grid */}
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              )}
            >
              {paginatedSecurities.map((security) => (
                <SecurityCard
                  key={security.id}
                  security={security}
                  isListView={viewMode === "list"}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={cn(
                        currentPage === 1 && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(7, totalPages) }).map(
                    (_, i) => {
                      const page = i + 1;
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="rounded-lg"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={cn(
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* Sidebar */}
          <aside
            className="space-y-6 "
            style={{ position: "sticky", top: "10px" }}
          >
            {/* Stats Card */}
            <Card className="border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Raised</span>
                  <span className="font-semibold text-gray-900">
                    {formatAmount(totalRaised)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Projects</span>
                  <span className="font-semibold text-gray-900">
                    {totalProjects}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Investors</span>
                  <span className="font-semibold text-gray-900">
                    {totalParticipants.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Avg. Return</span>
                  <span className="font-semibold text-emerald-600">
                    +{avgPerformance}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Verified Badge */}
            <Card className="border-gray-100 rounded-xl shadow-sm bg-gradient-to-br from-emerald-50 to-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="py-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      SEC Regulated
                    </h4>
                    <p className="text-xs text-gray-500">
                      All offerings verified
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Every private market offering is registered with the
                  Securities and Exchange Commission Nigeria.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-100 rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-lg h-10"
                  onClick={() => setDepositModalOpen(true)}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Fund Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-lg h-10"
                  onClick={() => navigate(`${routePrefix}/portfolio`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Portfolio
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-lg h-10"
                  onClick={() => setActiveFilter("upcoming")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Issuances ({upcomingSecurities.length})
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming */}
            {upcomingSecurities.length > 0 && (
              <Card className="border-gray-100 rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    Coming Soon
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingSecurities.slice(0, 3).map((sec) => (
                    <div
                      key={sec.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleCardClick(sec.id)}
                    >
                      <div
                        className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold",
                          sec.logoColor
                        )}
                      >
                        {sec.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {sec.name}
                        </p>
                        <p className="text-xs text-gray-500">{sec.timeInfo}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-600 border-0 text-xs"
                      >
                        {sec.yield}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PrivateMarket;
