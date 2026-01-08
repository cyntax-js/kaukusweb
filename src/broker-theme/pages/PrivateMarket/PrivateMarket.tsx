/**
 * PRIVATE MARKET PAGE - Modern minimalist design
 * Clean UI with subtle shadows, elegant cards, and smooth interactions
 */

import { useMemo, useState, useEffect } from "react";
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
}

const mockSecurities: Security[] = [
  {
    id: "1",
    name: "Dangote Cement Bond",
    symbol: "DANG-BND",
    description: "Corporate bond for cement expansion",
    logoColor: "bg-emerald-500",
    type: "bond",
    company: "Dangote Cement Plc",
    underwriter: "Stanbic IBTC",
    status: "ongoing",
    raised: 420_000_000_000,
    total: 600_000_000_000,
    participants: 5200,
    timeInfo: "3d 12h left",
  },
  {
    id: "2",
    name: "MTN Nigeria PE Round F",
    symbol: "MTN-PE-F",
    description: "Private equity for data infrastructure",
    logoColor: "bg-amber-500",
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
    name: "Zenith Bank CP Series 9",
    symbol: "ZEN-CP-09",
    description: "90-day commercial paper",
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
  },
  {
    id: "4",
    name: "FGN Treasury Bills",
    symbol: "FGN-TB-364",
    description: "Federal Government Treasury Bills",
    logoColor: "bg-green-600",
    type: "treasury_bills",
    company: "Federal Government",
    underwriter: "DMO",
    status: "ongoing",
    raised: 980_000_000_000,
    total: 1_500_000_000_000,
    participants: 14500,
    timeInfo: "1d 8h left",
  },
  {
    id: "5",
    name: "Flutterwave PE Round D",
    symbol: "FLW-PE-D",
    description: "Growth capital for payments expansion",
    logoColor: "bg-orange-500",
    type: "private_equity",
    company: "Flutterwave Inc",
    underwriter: "Aruwa Capital",
    status: "completed",
    raised: 280_000_000_000,
    total: 280_000_000_000,
    participants: 920,
    timeInfo: "Ended",
    performance: 34,
  },
  // Generate more securities
  ...Array.from({ length: 25 }).map((_, i) => {
    const id = i + 6;
    const types: Security["type"][] = ["private_equity", "bond", "commercial_paper", "treasury_bills"];
    const companies = ["Access Bank", "Seplat Energy", "BUA Group", "Interswitch", "Oando Plc", "Paystack", "Jumia", "Geregu Power"];
    const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-cyan-500"];
    const status: SecurityStatus[] = ["ongoing", "upcoming", "completed"];
    const dealType = types[i % types.length];
    const dealStatus = status[i % status.length];
    const total = 50_000_000_000 * (i + 2);
    const raised = dealStatus === "completed" ? total : dealStatus === "ongoing" ? Math.floor(total * 0.6) : 0;

    return {
      id: String(id),
      name: `${companies[i % companies.length]} ${dealType === "bond" ? "Bond" : dealType === "private_equity" ? "PE" : "CP"}`,
      symbol: `PM-${id}`,
      description: "Private market capital raise",
      logoColor: colors[i % colors.length],
      type: dealType,
      company: companies[i % companies.length],
      status: dealStatus,
      raised,
      total,
      participants: 600 + i * 120,
      timeInfo: dealStatus === "ongoing" ? "4d left" : dealStatus === "upcoming" ? "Starts in 6d" : "Ended",
      performance: dealStatus === "completed" ? 12 + (i % 18) : undefined,
    };
  }),
];

const filterOptions = ["all", "ongoing", "upcoming", "completed"] as const;
type FilterType = (typeof filterOptions)[number];

const ITEMS_PER_PAGE = 9;

const formatAmount = (v: number) =>
  v >= 1_000_000_000
    ? `₦${(v / 1_000_000_000).toFixed(1)}B`
    : `₦${(v / 1_000_000).toFixed(0)}M`;

const PrivateMarket = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  // Featured Card Component
  const FeaturedCard = ({ security }: { security: Security }) => (
    <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-6">
        <div className={cn("h-16 w-16 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg", security.logoColor)}>
          {security.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{security.name}</h2>
              <p className="text-sm text-gray-500">{security.company} · {security.symbol}</p>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-0 font-medium">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4">{security.description}</p>
          
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
                {security.participants?.toLocaleString()}
              </span>
            </div>
            <Button className="rounded-xl bg-gray-900 hover:bg-gray-800">
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
    <Card className={cn(
      "group bg-white border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden",
      isListView && "flex flex-row"
    )}>
      <CardContent className={cn("p-5", isListView && "flex items-center gap-4 flex-1")}>
        <div className={cn("flex items-start justify-between mb-4", isListView && "mb-0 gap-4")}>
          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-sm", security.logoColor)}>
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
          <h3 className="font-semibold text-gray-900 mb-1 truncate">{security.name}</h3>
          <p className="text-xs text-gray-500 mb-3">{security.company}</p>

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
          <p className="text-gray-500">Discover and invest in exclusive private market opportunities</p>
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
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ").charAt(0).toUpperCase() + type.replace("_", " ").slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-1 ml-auto">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => setViewMode("grid")}
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Securities Grid */}
            <section className={cn(
              "transition-all duration-300",
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            )}>
              {paginatedSecurities.length > 0 ? (
                paginatedSecurities.map((security) => (
                  <SecurityCard key={security.id} security={security} isListView={viewMode === "list"} />
                ))
              ) : (
                <div className="col-span-full text-center py-16 bg-white rounded-xl border border-gray-100">
                  <p className="text-gray-500">No projects found matching your criteria.</p>
                </div>
              )}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="justify-center">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      className="rounded-lg h-9"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          className="rounded-lg h-9 w-9"
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      className="rounded-lg h-9"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <Card className="bg-white border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="pb-3 border-b border-gray-50">
                <CardTitle className="text-sm font-semibold text-gray-600">Market Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Total Raised</p>
                  <p className="text-2xl font-bold text-gray-900">{formatAmount(totalRaised)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Projects</p>
                    <p className="text-lg font-semibold text-gray-900">{totalProjects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Subscribers</p>
                    <p className="text-lg font-semibold text-gray-900">{(totalParticipants / 1000).toFixed(0)}K</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Avg. Performance</p>
                  <p className="text-lg font-semibold text-emerald-600">+{avgPerformance}%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-100 rounded-xl overflow-hidden">
              <CardHeader className="pb-3 border-b border-gray-50">
                <CardTitle className="text-sm font-semibold text-gray-600">Top Performers</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {completedSecurities
                  .filter((s) => s.performance)
                  .sort((a, b) => (b.performance || 0) - (a.performance || 0))
                  .slice(0, 5)
                  .map((security) => (
                    <div key={security.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={cn("h-6 w-6 rounded-md flex items-center justify-center text-white text-xs font-bold", security.logoColor)}>
                          {security.name.slice(0, 1)}
                        </div>
                        <span className="truncate text-gray-700">{security.name}</span>
                      </div>
                      <span className="text-emerald-600 font-medium whitespace-nowrap">+{security.performance}%</span>
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
