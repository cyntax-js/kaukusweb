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

const mockSecurities: Security[] = [
  {
    id: "dangote-bond-2025",
    name: "Dangote Cement Bond Series 5",
    symbol: "DANGCEMBD-S5",
    description: "7-Year Senior Unsecured Bond for cement production expansion across West Africa. Fixed coupon with quarterly payments.",
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
    sector: "Industrial"
  },
  {
    id: "mtn-pe-round-f",
    name: "MTN Nigeria PE Round F",
    symbol: "MTN-PE-F",
    description: "Growth equity round for 5G network infrastructure deployment and data center expansion in Lagos and Abuja.",
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
    sector: "Telecommunications"
  },
  {
    id: "zenith-cp-09",
    name: "Zenith Bank CP Series 9",
    symbol: "ZENITH-CP-09",
    description: "90-day commercial paper for working capital requirements. Discount rate with principal and interest at maturity.",
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
    sector: "Financial Services"
  },
  {
    id: "fgn-tb-364",
    name: "FGN Treasury Bills NTB 364D",
    symbol: "FGN-TB-364",
    description: "364-Day Federal Government of Nigeria Treasury Bills. Zero-coupon instrument backed by sovereign guarantee.",
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
    sector: "Government"
  },
  {
    id: "flutterwave-pe-d",
    name: "Flutterwave PE Round D",
    symbol: "FLW-PE-D",
    description: "Series D funding for Africa's leading payments technology company. Expansion into 8 new African markets.",
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
    sector: "Fintech"
  },
  {
    id: "access-bond-2025",
    name: "Access Holdings Tier 2 Capital",
    symbol: "ACCESSBD-T2",
    description: "10-Year subordinated unsecured notes for regulatory capital requirements. Fixed-to-floating rate structure.",
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
    sector: "Financial Services"
  },
  {
    id: "seplat-pe-growth",
    name: "Seplat Energy Growth Equity",
    symbol: "SEPLAT-GE",
    description: "Growth capital for gas processing infrastructure and renewable energy transition projects in the Niger Delta.",
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
    sector: "Oil & Gas"
  },
  {
    id: "bua-cement-bond",
    name: "BUA Cement 5-Year Bond",
    symbol: "BUACEMENT-25",
    description: "Senior secured bond for new cement plant construction in Adamawa State. First charge on plant assets.",
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
    sector: "Industrial"
  },
  {
    id: "paystack-pe-series-c",
    name: "Paystack Series C",
    symbol: "PYSTK-PE-C",
    description: "Expansion capital for pan-African merchant payments platform. Integration with 15+ African banking networks.",
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
    sector: "Fintech"
  },
  {
    id: "gtco-cp-12",
    name: "GTCO Commercial Paper Series 12",
    symbol: "GTCO-CP-12",
    description: "180-day commercial paper for trade finance portfolio. Discount instrument with strong credit metrics.",
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
    sector: "Financial Services"
  },
  {
    id: "interswitch-pe-e",
    name: "Interswitch Pre-IPO Round",
    symbol: "ISWITCH-PE",
    description: "Pre-IPO investment opportunity in Africa's largest integrated payments company. Targeting 2025 dual listing.",
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
    sector: "Fintech"
  },
  {
    id: "oando-bond-green",
    name: "Oando Green Bond 2025",
    symbol: "OANDO-GRN-25",
    description: "Nigeria's first oil & gas green bond for renewable energy and carbon offset projects. ESG-compliant instrument.",
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
    sector: "Oil & Gas"
  },
  // Additional markets for variety
  {
    id: "airtel-bond-2025",
    name: "Airtel Nigeria Bond Series 3",
    symbol: "AIRTEL-BD-3",
    description: "5-Year corporate bond for network modernization and 4G LTE expansion across Northern Nigeria.",
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
    sector: "Telecommunications"
  },
  {
    id: "geregu-power-pe",
    name: "Geregu Power Expansion Fund",
    symbol: "GEREGU-PE",
    description: "Equity raise for 750MW power plant upgrade and renewable energy integration projects.",
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
    sector: "Power & Utilities"
  },
  {
    id: "fbn-tier2-capital",
    name: "First Bank Tier 2 Capital Notes",
    symbol: "FBN-T2-25",
    description: "10-Year subordinated notes for Basel III capital adequacy requirements. Fixed rate with call option.",
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
    sector: "Financial Services"
  },
];

const filterOptions = ["all", "ongoing", "upcoming", "completed"] as const;
type FilterType = (typeof filterOptions)[number];

const ITEMS_PER_PAGE = 9;

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

  const routePrefix = location.pathname.includes("/preview/app")
    ? "/preview/app"
    : "/app";

  const ongoingSecurities = useMemo(() => mockSecurities.filter((i) => i.status === "ongoing"), []);
  const completedSecurities = useMemo(() => mockSecurities.filter((i) => i.status === "completed"), []);

  const totalRaised = useMemo(() => completedSecurities.reduce((sum, i) => sum + i.raised, 0), [completedSecurities]);
  const totalProjects = mockSecurities.length;
  const totalParticipants = mockSecurities.reduce((sum, i) => sum + (i.participants || 0), 0);
  const avgPerformance = useMemo(() => {
    const perfs = completedSecurities.map((i) => i.performance || 0).filter((r) => r > 0);
    return perfs.length ? (perfs.reduce((sum, r) => sum + r, 0) / perfs.length).toFixed(1) : "N/A";
  }, [completedSecurities]);

  const uniqueTypes = useMemo(() => Array.from(new Set(mockSecurities.map((i) => i.type))), []);

  const filteredSecurities = useMemo(() => {
    let list = [...mockSecurities];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((i) =>
        i.name.toLowerCase().includes(q) ||
        i.symbol.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q)
      );
    }
    if (activeFilter !== "all") list = list.filter((i) => i.status === activeFilter);
    if (selectedType !== "all") list = list.filter((i) => i.type === selectedType);
    return list.sort((a, b) => b.raised - a.raised);
  }, [searchQuery, activeFilter, selectedType]);

  const paginatedSecurities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSecurities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSecurities, currentPage]);

  const totalPages = Math.ceil(filteredSecurities.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (ongoingSecurities.length > 1) {
      const timer = setInterval(() => {
        setCarouselIndex((prev) => (prev === ongoingSecurities.slice(0, 5).length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [ongoingSecurities.length]);

  const handlePrev = () => setCarouselIndex((prev) => (prev === 0 ? ongoingSecurities.slice(0, 5).length - 1 : prev - 1));
  const handleNext = () => setCarouselIndex((prev) => (prev === ongoingSecurities.slice(0, 5).length - 1 ? 0 : prev + 1));

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
        <div className={cn("h-16 w-16 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-105 transition-transform", security.logoColor)}>
          {security.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{security.name}</h2>
              <p className="text-sm text-gray-500">{security.company} · {security.symbol}</p>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-0 font-medium">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{security.description}</p>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Yield</p>
              <p className="font-semibold text-emerald-600">{security.yield}%</p>
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
              <p className="font-semibold text-gray-900">{formatAmount(security.minInvestment || 0)}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{formatAmount(security.raised)} / {formatAmount(security.total)}</span>
            </div>
            <Progress value={(security.raised / security.total) * 100} className="h-2 bg-gray-100" />
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
  const SecurityCard = ({ security, isListView }: { security: Security; isListView: boolean }) => (
    <Card 
      className={cn(
        "group bg-white border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden cursor-pointer",
        isListView && "flex flex-row"
      )}
      onClick={() => handleCardClick(security.id)}
    >
      <CardContent className={cn("p-5", isListView && "flex items-center gap-4 flex-1")}>
        <div className={cn("flex items-start justify-between mb-4", isListView && "mb-0 gap-4")}>
          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform", security.logoColor)}>
            {security.name.slice(0, 2).toUpperCase()}
          </div>
          {!isListView && (
            <Badge
              variant={security.status === "ongoing" ? "default" : security.status === "upcoming" ? "secondary" : "outline"}
              className={cn(
                "text-xs font-medium",
                security.status === "ongoing" && "bg-emerald-50 text-emerald-700 border-0",
                security.status === "upcoming" && "bg-blue-50 text-blue-700 border-0",
                security.status === "completed" && "bg-gray-100 text-gray-600"
              )}
            >
              {security.status.charAt(0).toUpperCase() + security.status.slice(1)}
            </Badge>
          )}
        </div>

        <div className={cn("flex-1", isListView && "min-w-0")}>
          <h3 className="font-semibold text-gray-900 mb-1 truncate group-hover:text-emerald-600 transition-colors">{security.name}</h3>
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
                <span className="font-medium text-gray-600">{((security.raised / security.total) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(security.raised / security.total) * 100} className="h-1.5 bg-gray-100" />
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {security.timeInfo}
            </span>
            {security.performance && (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <TrendingUp className="h-3 w-3" />
                +{security.performance}%
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
              security.status === "ongoing" && "bg-emerald-50 text-emerald-700 border-0",
              security.status === "upcoming" && "bg-blue-50 text-blue-700 border-0",
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
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Private Market</h1>
          <p className="text-gray-500">Discover and invest in exclusive Nigerian private market opportunities</p>
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
                    style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
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
                            idx === carouselIndex ? "bg-gray-900 w-6" : "bg-gray-300 w-1.5"
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
                      {t.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-1 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-9 w-9 rounded-lg", viewMode === "grid" && "bg-gray-100")}
                  onClick={() => setViewMode("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-9 w-9 rounded-lg", viewMode === "list" && "bg-gray-100")}
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Securities Grid */}
            <div className={cn(
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            )}>
              {paginatedSecurities.map((security) => (
                <SecurityCard key={security.id} security={security} isListView={viewMode === "list"} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
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
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Stats Card */}
            <Card className="border-gray-100 rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">Market Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Raised</span>
                  <span className="font-semibold text-gray-900">{formatAmount(totalRaised)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Projects</span>
                  <span className="font-semibold text-gray-900">{totalProjects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Investors</span>
                  <span className="font-semibold text-gray-900">{totalParticipants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Avg. Return</span>
                  <span className="font-semibold text-emerald-600">+{avgPerformance}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Verified Badge */}
            <Card className="border-gray-100 rounded-xl bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="py-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">SEC Regulated</h4>
                    <p className="text-xs text-gray-500">All offerings verified</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Every private market offering is registered with the Securities and Exchange Commission Nigeria.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-100 rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start rounded-lg h-10">
                  <Wallet className="h-4 w-4 mr-2" />
                  Fund Account
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg h-10">
                  <Building2 className="h-4 w-4 mr-2" />
                  View Portfolio
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg h-10">
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Issuances
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PrivateMarket;
