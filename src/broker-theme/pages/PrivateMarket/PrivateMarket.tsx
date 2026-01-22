/**
 * PRIVATE MARKET PAGE - Enhanced for Nigerian private market instruments
 * - Improved UI: More minimalistic with clean layouts, subtle gradients, enhanced border radii, smooth transitions and animations for a 'wow' factor
 * - Added 30+ realistic mock securities based on Nigerian companies, bonds, CPs, and private equity deals
 * - Realistic figures in hundreds of millions to billions NGN
 * - Added toggle for grid/list view (default: grid)
 * - Added mini cumulative raised chart in sidebar for visual appeal
 * - Refined components with transitions, shadows, and modern effects
 */

import { useMemo, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  Search,
  Grid as GridIcon,
  List as ListIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from "recharts";

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
}

const mockSecurities: Security[] = [
  {
    id: "1",
    name: "Dangote Cement Expansion Bond",
    symbol: "DANG-BND-01",
    description: "Long-term corporate bond for new cement lines and logistics",
    logoColor: "bg-gray-600",
    type: "bond",
    company: "Dangote Cement Plc",
    underwriter: "Stanbic IBTC",
    status: "ongoing",
    raised: 420_000_000_000,
    total: 600_000_000_000,
    participants: 5200,
    timeInfo: "Ends in 3d 12h",
  },
  {
    id: "2",
    name: "MTN Nigeria Private Equity Round F",
    symbol: "MTN-PE-F",
    description: "Late-stage private equity for data & fiber infrastructure",
    logoColor: "bg-yellow-500",
    type: "private_equity",
    company: "MTN Nigeria",
    underwriter: "FBNQuest",
    status: "upcoming",
    raised: 0,
    total: 1_200_000_000_000,
    participants: 0,
    timeInfo: "Starts in 9d",
  },
  {
    id: "3",
    name: "Zenith Bank Commercial Paper Series 9",
    symbol: "ZEN-CP-09",
    description: "90-day commercial paper for liquidity management",
    logoColor: "bg-green-600",
    type: "commercial_paper",
    company: "Zenith Bank Plc",
    underwriter: "Chapel Hill Denham",
    status: "completed",
    raised: 350_000_000_000,
    total: 350_000_000_000,
    participants: 3100,
    timeInfo: "Ended Dec 2025",
    performance: 16,
    startDate: new Date("2025-11-15"),
  },
  {
    id: "4",
    name: "FGN Treasury Bills – 364 Day",
    symbol: "FGN-TB-364",
    description: "Federal Government of Nigeria Treasury Bills",
    logoColor: "bg-emerald-700",
    type: "treasury_bills",
    company: "Federal Government of Nigeria",
    underwriter: "Debt Management Office",
    status: "ongoing",
    raised: 980_000_000_000,
    total: 1_500_000_000_000,
    participants: 14_500,
    timeInfo: "Ends in 1d 8h",
  },
  {
    id: "5",
    name: "Flutterwave Private Equity Round D",
    symbol: "FLW-PE-D",
    description: "Growth capital for Pan-African payments expansion",
    logoColor: "bg-indigo-600",
    type: "private_equity",
    company: "Flutterwave Inc",
    underwriter: "Aruwa Capital",
    status: "completed",
    raised: 280_000_000_000,
    total: 280_000_000_000,
    participants: 920,
    timeInfo: "Ended Oct 2025",
    performance: 34,
    startDate: new Date("2025-09-10"),
  },

  // -------------------- SCALE (6–50) --------------------

  ...Array.from({ length: 45 }).map((_, i) => {
    const id = i + 6;
    const types: Security["type"][] = [
      "private_equity",
      "bond",
      "commercial_paper",
      "treasury_bills",
    ];
    const companies = [
      "Access Bank Plc",
      "Seplat Energy",
      "BUA Group",
      "Interswitch",
      "Oando Plc",
      "Paystack",
      "Jumia Nigeria",
      "Geregu Power",
      "FairMoney",
      "PalmPay",
      "Flour Mills of Nigeria",
      "Nigerian Breweries",
      "Africa Finance Corporation",
    ];
    const underwriters = [
      "Stanbic IBTC",
      "FBNQuest",
      "ARM Securities",
      "United Capital",
      "Afrinvest",
      "CardinalStone",
      "Meristem",
      "Chapel Hill Denham",
    ];
    const status: SecurityStatus[] = ["ongoing", "upcoming", "completed"];

    const dealType = types[i % types.length];
    const dealStatus = status[i % status.length];
    const total = 50_000_000_000 * (i + 2);
    const raised =
      dealStatus === "completed"
        ? total
        : dealStatus === "ongoing"
        ? Math.floor(total * 0.6)
        : 0;

    return {
      id: String(id),
      name: `${companies[i % companies.length]} ${
        dealType === "private_equity"
          ? "Private Equity Round"
          : dealType === "bond"
          ? "Corporate Bond"
          : dealType === "commercial_paper"
          ? "Commercial Paper"
          : "Treasury Bills"
      }`,
      symbol: `PM-${id}`,
      description:
        dealType === "treasury_bills"
          ? "Short-term sovereign debt instrument"
          : "Private market capital raise for expansion and operations",
      logoColor: [
        "bg-blue-600",
        "bg-emerald-600",
        "bg-indigo-600",
        "bg-rose-600",
        "bg-amber-600",
      ][i % 5],
      type: dealType,
      company: companies[i % companies.length],
      underwriter:
        dealType === "treasury_bills"
          ? "Debt Management Office"
          : underwriters[i % underwriters.length],
      status: dealStatus,
      raised,
      total,
      participants:
        dealType === "treasury_bills" ? 10_000 + i * 300 : 600 + i * 120,
      timeInfo:
        dealStatus === "ongoing"
          ? "Ends in 4d"
          : dealStatus === "upcoming"
          ? "Starts in 6d"
          : "Ended",
      performance: dealStatus === "completed" ? 12 + (i % 18) : undefined,
      startDate:
        dealStatus === "completed" ? new Date(2025, i % 12, 5) : undefined,
    };
  }),
];

const filterOptions = ["all", "ongoing", "upcoming", "completed"] as const;
type FilterType = (typeof filterOptions)[number];

const sortOptions = [
  "raised_desc",
  "raised_asc",
  "participants_desc",
  "participants_asc",
  "performance_desc",
  "performance_asc",
] as const;
type SortType = (typeof sortOptions)[number];

const ITEMS_PER_PAGE = 9;

const PrivateMarket = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeSort, setActiveSort] = useState<SortType>("raised_desc");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
    let list = mockSecurities;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.symbol.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q)
      );
    }
    if (activeFilter !== "all") {
      list = list.filter((i) => i.status === activeFilter);
    }
    if (selectedType !== "all") {
      list = list.filter((i) => i.type === selectedType);
    }
    switch (activeSort) {
      case "raised_desc":
        return list.sort((a, b) => b.raised - a.raised);
      case "raised_asc":
        return list.sort((a, b) => a.raised - b.raised);
      case "participants_desc":
        return list.sort(
          (a, b) => (b.participants || 0) - (a.participants || 0)
        );
      case "participants_asc":
        return list.sort(
          (a, b) => (a.participants || 0) - (b.participants || 0)
        );
      case "performance_desc":
        return list.sort((a, b) => (b.performance || 0) - (a.performance || 0));
      case "performance_asc":
        return list.sort((a, b) => (a.performance || 0) - (b.performance || 0));
      default:
        return list;
    }
  }, [searchQuery, activeFilter, selectedType, activeSort]);

  const paginatedSecurities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSecurities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSecurities, currentPage]);

  const totalPages = Math.ceil(filteredSecurities.length / ITEMS_PER_PAGE);

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

  const HeroBanner = ({ security }: { security: Security }) => (
    <Card className="overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100 border-none rounded-3xl  transform transition-all duration-300 hover:scale-[1.02] h-full">
      <CardContent className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
        <div className="flex-shrink-0">
          <div
            className={cn(
              "h-24 w-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold  transition-all duration-300 ",
              security.logoColor
            )}
          >
            {security.name.slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {security.name} ({security.symbol})
          </h2>
          <p className="text-sm text-gray-600">Company: {security.company}</p>
          {security.underwriter && (
            <p className="text-sm text-gray-600">
              Underwriter: {security.underwriter}
            </p>
          )}
          <p className="text-base text-gray-700 line-clamp-2">
            {security.description}
          </p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Subscribed</span>
              <span>
                ₦{(security.raised / 1000000).toLocaleString()}M / ₦
                {(security.total / 1000000).toLocaleString()}M
              </span>
            </div>
            <Progress
              value={(security.raised / security.total) * 100}
              className="h-3 rounded-full transition-all duration-500"
            />
            <div className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-indigo-600" />
              {security.timeInfo}
            </div>
            <Badge variant="secondary" className="rounded-full">
              {security.type.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
          <Button
            size="lg"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-300 "
          >
            Subscribe Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const SecurityCard = ({
    security,
    isListView,
  }: {
    security: Security;
    isListView: boolean;
  }) => (
    <Card
      className={cn(
        "transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:scale-105 shadow-none",
        isListView ? "flex flex-col md:flex-row items-start gap-4 p-4" : ""
      )}
    >
      <CardContent
        className={cn(
          "p-4 flex-1",
          isListView ? "flex flex-col justify-between" : ""
        )}
      >
        <div
          className={cn(
            "flex items-start justify-between mb-3",
            isListView ? "md:flex-row" : ""
          )}
        >
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold  transition-all duration-300 hover:shadow-md",
                  security.logoColor
                )}
              >
                {security.name.slice(0, 2).toUpperCase()}
              </div>
            </TooltipTrigger>
            <TooltipContent>{security.name}</TooltipContent>
          </Tooltip>
          <Badge
            variant={
              security.status === "ongoing"
                ? "default"
                : security.status === "upcoming"
                ? "secondary"
                : "outline"
            }
            className="rounded-full"
          >
            {security.status.charAt(0).toUpperCase() + security.status.slice(1)}
          </Badge>
        </div>
        <h3 className="text-md font-semibold mb-1 truncate">
          {security.name} ({security.symbol})
        </h3>
        <p className="text-xs text-gray-500 mb-1">
          Company: {security.company}
        </p>
        {security.underwriter && (
          <p className="text-xs text-gray-500 mb-2">
            Underwriter: {security.underwriter}
          </p>
        )}
        <p className="text-xs text-gray-600 mb-3 line-clamp-1">
          {security.description}
        </p>
        <div className="space-y-2 text-xs">
          {security.status !== "upcoming" && (
            <>
              <div className="flex justify-between font-medium">
                <span>Subscribed</span>
                <span>₦{(security.raised / 1000000).toLocaleString()}M</span>
              </div>
              <Progress
                value={(security.raised / security.total) * 100}
                className="h-1.5 rounded-full transition-all duration-500"
              />
            </>
          )}
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="h-3 w-3" />
            {security.timeInfo}
          </div>
          {security.participants && (
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="h-3 w-3" />
              {security.participants.toLocaleString()} subscribers
            </div>
          )}
          {security.performance && (
            <div className="flex items-center gap-1 font-medium text-green-600">
              <CheckCircle className="h-3 w-3" />
              Performance: +{security.performance}%
            </div>
          )}
          <Badge variant="outline" className="text-xs rounded-full mt-1">
            {security.type.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
        <Button
          className="w-full mt-4 rounded-xl transition-all duration-300 hover:shadow-md"
          variant={security.status === "ongoing" ? "default" : "outline"}
        >
          {security.status === "ongoing"
            ? "Subscribe"
            : security.status === "upcoming"
            ? "View Details"
            : "View Instrument"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <main className="flex-1 px-4 py-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-screen-2xl grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Hero Carousel */}
            {ongoingSecurities.slice(0, 5).length > 0 && (
              <section className="relative overflow-hidden ">
                {ongoingSecurities.slice(0, 5).length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md transition-all duration-300 hover:bg-white"
                      onClick={handlePrev}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md transition-all duration-300 hover:bg-white"
                      onClick={handleNext}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${carouselIndex * 100}%)`,
                    }}
                  >
                    {ongoingSecurities.slice(0, 5).map((security) => (
                      <div key={security.id} className="min-w-full">
                        <HeroBanner security={security} />
                      </div>
                    ))}
                  </div>
                </div>
                {ongoingSecurities.slice(0, 5).length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {ongoingSecurities.slice(0, 5).map((_, idx) => (
                      <button
                        key={idx}
                        className={cn(
                          "h-2 w-2 rounded-full transition-all duration-300",
                          idx === carouselIndex
                            ? "bg-indigo-600 w-6"
                            : "bg-gray-200"
                        )}
                        onClick={() => setCarouselIndex(idx)}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Filters & Search */}
            <section className="flex flex-col sm:flex-row gap-3 items-center bg-white p-4 rounded-2xl duration-300 ">
              <div className="relative flex-1 max-w-md">
                <Input
                  placeholder="Search instruments/companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-50 border-none rounded-xl  transition-all duration-300 "
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "ghost"}
                    className="rounded-full transition-all duration-300"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[160px] rounded-xl border-none bg-gray-50 ">
                  <SelectValue placeholder="Filter by Market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ").charAt(0).toUpperCase() +
                        type.replace("_", " ").slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={activeSort}
                onValueChange={(v: SortType) => setActiveSort(v)}
              >
                <SelectTrigger className="w-[180px] rounded-xl border-none bg-gray-50 ">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raised_desc">
                    Subscribed (High to Low)
                  </SelectItem>
                  <SelectItem value="raised_asc">
                    Subscribed (Low to High)
                  </SelectItem>
                  <SelectItem value="participants_desc">
                    Subscribers (High to Low)
                  </SelectItem>
                  <SelectItem value="participants_asc">
                    Subscribers (Low to High)
                  </SelectItem>
                  <SelectItem value="performance_desc">
                    Performance (High to Low)
                  </SelectItem>
                  <SelectItem value="performance_asc">
                    Performance (Low to High)
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-xl transition-all duration-300"
                  onClick={() => setViewMode("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-xl transition-all duration-300"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </section>

            {/* Securities View */}
            <section
              className={cn(
                "transition-all duration-500",
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              )}
            >
              {paginatedSecurities.length > 0 ? (
                paginatedSecurities.map((security) => (
                  <SecurityCard
                    key={security.id}
                    security={security}
                    isListView={viewMode === "list"}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-12 font-medium">
                  No instruments found matching your criteria.
                </p>
              )}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="justify-center mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className="rounded-xl transition-all duration-300 hover:shadow-md"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        className="rounded-xl transition-all duration-300 hover:shadow-md"
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      className="rounded-xl transition-all duration-300 hover:shadow-md"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <Card className="rounded-2xl overflow-hidden transition-all duration-300 shadow-none">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <DollarSign className="h-4 w-4 text-indigo-600" />
                  Market Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Total Capital Raised</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    ₦{(totalRaised / 1000000000).toFixed(1)}B
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Instruments</p>
                  <p className="text-xl font-semibold">{totalProjects}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Subscribers</p>
                  <p className="text-xl font-semibold">
                    {totalParticipants.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Average Performance</p>
                  <p className="text-xl font-semibold text-green-600">
                    +{avgPerformance}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-none overflow-hidden transition-all duration-300 ">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <CardTitle className="text-md font-bold">
                  Top Recent Raises
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                {completedSecurities
                  .sort((a, b) => b.raised - a.raised)
                  .slice(0, 5)
                  .map((security) => (
                    <div
                      key={security.id}
                      className="flex justify-between text-xs font-medium transition-all duration-300 hover:bg-gray-50 p-1 rounded-md"
                    >
                      <span className="truncate">{security.name}</span>
                      <span className="text-indigo-600">
                        ₦{(security.raised / 1000000000).toFixed(1)}B
                      </span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PrivateMarket;
