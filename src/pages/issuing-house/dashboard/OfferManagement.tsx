/**
 * Offer Management Page - Issuing House
 * Create, manage, and track securities offerings
 * Click on an offer to see full details
 */

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  Search,
  Filter,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Calendar,
  Coins,
  Users,
  TrendingUp,
  Building2,
  Download,
  Eye,
  BarChart3,
  Globe,
  Shield,
  Vote,
  DollarSign,
  Lock,
  Percent,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOfferStore, type CreatedOffer } from "@/stores/offerStore";
import { format } from "date-fns";

// Mock data for existing offers (will be merged with store offers)
const mockOfferings: CreatedOffer[] = [
  {
    id: "mock-1",
    name: "TechCorp Nigeria IPO",
    type: "Initial Public Offering",
    securityType: "EQUITY",
    issuerType: "CORPORATE",
    marketType: "PUBLIC",
    equityType: "ORDINARY",
    targetAmount: 50000000000,
    raisedAmount: 32500000000,
    subscriptionRate: 65,
    status: "active",
    createdAt: new Date("2024-12-15"),
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-15"),
    investors: 1250,
    minInvestment: 5000000,
    maxInvestment: 500000000,
    pricePerUnit: 100,
    totalUnits: 500000000,
    soldUnits: 325000000,
    issuer: "TechCorp Nigeria Limited",
    sector: "Technology",
    description:
      "TechCorp Nigeria is a leading technology company specializing in fintech solutions, digital payments, and enterprise software. This IPO will fund expansion into West African markets and development of new AI-powered products.",
    underwriter: "FirstBank Capital Markets",
    hasSecondaryTrading: true,
    regulatoryApproval: "SEC Approved",
    votingRights: true,
    dividendRights: true,
    eligibleInvestors: ["INSTITUTIONAL", "QUALIFIED", "ACCREDITED"],
  },
  {
    id: "mock-2",
    name: "Energy Corp Bond",
    type: "Corporate Bond",
    securityType: "DEBT",
    issuerType: "CORPORATE",
    marketType: "PRIMARY",
    instrumentType: "BOND",
    couponType: "FIXED",
    couponRate: 12,
    couponFrequency: "SEMI_ANNUAL",
    targetAmount: 100000000000,
    raisedAmount: 78000000000,
    subscriptionRate: 78,
    status: "active",
    createdAt: new Date("2024-12-20"),
    startDate: new Date("2025-01-05"),
    endDate: new Date("2025-02-28"),
    investors: 890,
    minInvestment: 10000000,
    maxInvestment: 1000000000,
    pricePerUnit: 1000,
    totalUnits: 100000000,
    soldUnits: 78000000,
    issuer: "Energy Corporation Plc",
    sector: "Energy",
    description:
      "10-year corporate bond offering 12% annual coupon rate. Proceeds will fund construction of 500MW solar power plant in Northern Nigeria.",
    underwriter: "Access Bank Investment Banking",
    hasSecondaryTrading: true,
    regulatoryApproval: "SEC Approved",
    maturityDate: new Date("2035-01-05"),
    creditRating: "AA",
  },
  {
    id: "mock-3",
    name: "FinTech Solutions Rights Issue",
    type: "Rights Issue",
    securityType: "EQUITY",
    issuerType: "CORPORATE",
    marketType: "PRIVATE",
    equityType: "ORDINARY",
    targetAmount: 25000000000,
    raisedAmount: 0,
    subscriptionRate: 0,
    status: "upcoming",
    createdAt: new Date("2025-01-10"),
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-15"),
    investors: 0,
    minInvestment: 2000000,
    maxInvestment: 100000000,
    pricePerUnit: 50,
    totalUnits: 500000000,
    soldUnits: 0,
    issuer: "FinTech Solutions Ltd",
    sector: "Financial Services",
    description:
      "Rights issue offering existing shareholders the opportunity to purchase additional shares at a discounted price. Funds will support expansion of mobile banking platform.",
    hasSecondaryTrading: false,
    regulatoryApproval: "Pending",
    votingRights: true,
    dividendRights: true,
  },
  {
    id: "mock-4",
    name: "AgriTech Nigeria Seed Round",
    type: "Private Placement",
    securityType: "EQUITY",
    issuerType: "CORPORATE",
    marketType: "PRIVATE",
    equityType: "PREFERENCE",
    targetAmount: 5000000000,
    raisedAmount: 5000000000,
    subscriptionRate: 100,
    status: "completed",
    createdAt: new Date("2024-09-15"),
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-12-15"),
    investors: 45,
    minInvestment: 50000000,
    maxInvestment: 500000000,
    pricePerUnit: 500,
    totalUnits: 10000000,
    soldUnits: 10000000,
    issuer: "AgriTech Nigeria Limited",
    sector: "Agriculture",
    description:
      "Private placement for qualified investors. Funds supported development of precision agriculture technology platform now serving 50,000+ farmers.",
    underwriter: "Coronation Securities",
    hasSecondaryTrading: false,
    regulatoryApproval: "SEC Approved",
    preMoneyValuation: 20000000000,
    postMoneyValuation: 25000000000,
    valuationMethod: "COMPARABLES",
  },
];

export default function OfferManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<CreatedOffer | null>(null);
  const { offers: storeOffers } = useOfferStore();

  // Merge store offers with mock data
  const allOffers = useMemo(() => {
    return [...storeOffers, ...mockOfferings];
  }, [storeOffers]);

  // Filter offers by status
  const upcomingOffers = allOffers.filter(
    (o) => o.status === "upcoming" || o.status === "pending_approval"
  );
  const activeOffers = allOffers.filter((o) => o.status === "active");
  const closedOffers = allOffers.filter(
    (o) => o.status === "completed" || o.status === "cancelled"
  );

  // Filter by search
  const filterBySearch = (offers: CreatedOffer[]) => {
    if (!searchQuery) return offers;
    const query = searchQuery.toLowerCase();
    return offers.filter(
      (o) =>
        o.name.toLowerCase().includes(query) ||
        o.type.toLowerCase().includes(query) ||
        o.issuer?.toLowerCase().includes(query)
    );
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `₦${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `₦${(value / 1000000).toFixed(0)}M`;
    return `₦${value.toLocaleString()}`;
  };

  const getStatusBadgeVariant = (status: CreatedOffer["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "secondary";
      case "upcoming":
        return "outline";
      case "pending_approval":
        return "outline";
      case "cancelled":
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const OfferCard = ({ offer }: { offer: CreatedOffer }) => (
    <Card
      className="p-6 hover:border-primary/50 transition-colors cursor-pointer"
      onClick={() => setSelectedOffer(offer)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{offer.name}</h3>
            <Badge variant={getStatusBadgeVariant(offer.status)}>
              {offer.status === "pending_approval" ? "Pending" : offer.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {offer.type} • {offer.securityType}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Target</p>
          <p className="font-medium">{formatCurrency(offer.targetAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Raised</p>
          <p className="font-medium text-success">
            {formatCurrency(offer.raisedAmount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Investors</p>
          <p className="font-medium">{offer.investors.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Subscription</span>
          <span className="font-medium">{offer.subscriptionRate}%</span>
        </div>
        <Progress value={offer.subscriptionRate} className="h-2" />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {offer.startDate
            ? format(new Date(offer.startDate), "MMM d, yyyy")
            : format(new Date(offer.createdAt), "MMM d, yyyy")}
        </div>
        <span className="text-primary font-medium">View Details →</span>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Offer Management</h1>
          <p className="text-muted-foreground">
            Create and manage securities offerings
          </p>
        </div>
        <Button
          onClick={() => navigate("/issuing-house/dashboard/new-offering")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Offer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{upcomingOffers.length}</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeOffers.length}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{closedOffers.length}</p>
              <p className="text-xs text-muted-foreground">Closed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  allOffers.reduce((sum, o) => sum + o.raisedAmount, 0)
                )}
              </p>
              <p className="text-xs text-muted-foreground">Total Raised</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search offers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingOffers.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeOffers.length})
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed ({closedOffers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {filterBySearch(upcomingOffers).length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filterBySearch(upcomingOffers).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Upcoming Offers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a new offer to get started
              </p>
              <Button
                onClick={() =>
                  navigate("/issuing-house/dashboard/new-offering")
                }
              >
                Create New Offer
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {filterBySearch(activeOffers).length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filterBySearch(activeOffers).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Active Offers</h3>
              <p className="text-sm text-muted-foreground">
                Active offers will appear here once approved
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          {filterBySearch(closedOffers).length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filterBySearch(closedOffers).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Closed Offers</h3>
              <p className="text-sm text-muted-foreground">
                Completed and cancelled offers will appear here
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Offer Detail Sheet */}
      <Sheet open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-2">
              <SheetTitle>{selectedOffer?.name}</SheetTitle>
              {selectedOffer && (
                <Badge variant={getStatusBadgeVariant(selectedOffer.status)}>
                  {selectedOffer.status === "pending_approval"
                    ? "Pending Approval"
                    : selectedOffer.status}
                </Badge>
              )}
            </div>
            <SheetDescription>
              {selectedOffer?.type} • {selectedOffer?.issuer}
            </SheetDescription>
          </SheetHeader>

          {selectedOffer && (
            <div className="py-6 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Target Amount
                    </span>
                  </div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(selectedOffer.targetAmount)}
                  </p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">
                      Amount Raised
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-success">
                    {formatCurrency(selectedOffer.raisedAmount)}
                  </p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Investors
                    </span>
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedOffer.investors.toLocaleString()}
                  </p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Subscription Rate
                    </span>
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedOffer.subscriptionRate}%
                  </p>
                </Card>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subscription Progress
                  </span>
                  <span className="font-medium">
                    {formatCurrency(selectedOffer.raisedAmount)} of{" "}
                    {formatCurrency(selectedOffer.targetAmount)}
                  </span>
                </div>
                <Progress
                  value={selectedOffer.subscriptionRate}
                  className="h-3"
                />
              </div>

              <Separator />

              {/* Security Type Specific Details */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Security Details
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Security Type</span>
                    <p className="font-medium">{selectedOffer.securityType}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Issuer Type</span>
                    <p className="font-medium">{selectedOffer.issuerType}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Market Type</span>
                    <p className="font-medium">{selectedOffer.marketType}</p>
                  </div>
                  {selectedOffer.instrumentType && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Instrument</span>
                      <p className="font-medium">
                        {selectedOffer.instrumentType.replace(/_/g, " ")}
                      </p>
                    </div>
                  )}
                  {selectedOffer.equityType && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Equity Type</span>
                      <p className="font-medium">{selectedOffer.equityType}</p>
                    </div>
                  )}
                  {selectedOffer.couponType && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Coupon Type</span>
                      <p className="font-medium">{selectedOffer.couponType}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Debt-specific fields */}
              {selectedOffer.securityType === "DEBT" && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Debt Instrument Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {selectedOffer.couponRate && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-muted-foreground">
                            Coupon Rate
                          </span>
                          <p className="font-medium">
                            {selectedOffer.couponRate}%
                          </p>
                        </div>
                      )}
                      {selectedOffer.couponFrequency && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-muted-foreground">
                            Coupon Frequency
                          </span>
                          <p className="font-medium">
                            {selectedOffer.couponFrequency.replace(/_/g, " ")}
                          </p>
                        </div>
                      )}
                      {selectedOffer.maturityDate && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-muted-foreground">
                            Maturity Date
                          </span>
                          <p className="font-medium">
                            {format(
                              new Date(selectedOffer.maturityDate),
                              "MMM d, yyyy"
                            )}
                          </p>
                        </div>
                      )}
                      {selectedOffer.creditRating && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-muted-foreground">
                            Credit Rating
                          </span>
                          <p className="font-medium">
                            {selectedOffer.creditRating}
                          </p>
                        </div>
                      )}
                      {selectedOffer.discountRate && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-muted-foreground">
                            Discount Rate
                          </span>
                          <p className="font-medium">
                            {selectedOffer.discountRate}%
                          </p>
                        </div>
                      )}
                      {selectedOffer.spread && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-muted-foreground">Spread</span>
                          <p className="font-medium">{selectedOffer.spread}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Equity-specific fields */}
              {selectedOffer.securityType === "EQUITY" && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Vote className="w-4 h-4" />
                      Equity Rights & Features
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Vote
                          className={`w-5 h-5 mx-auto mb-1 ${
                            selectedOffer.votingRights
                              ? "text-success"
                              : "text-muted-foreground"
                          }`}
                        />
                        <p className="text-xs text-muted-foreground">
                          Voting Rights
                        </p>
                        <p className="font-medium text-sm">
                          {selectedOffer.votingRights ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <DollarSign
                          className={`w-5 h-5 mx-auto mb-1 ${
                            selectedOffer.dividendRights
                              ? "text-success"
                              : "text-muted-foreground"
                          }`}
                        />
                        <p className="text-xs text-muted-foreground">
                          Dividend Rights
                        </p>
                        <p className="font-medium text-sm">
                          {selectedOffer.dividendRights ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Lock
                          className={`w-5 h-5 mx-auto mb-1 ${
                            selectedOffer.transferRestriction
                              ? "text-warning"
                              : "text-muted-foreground"
                          }`}
                        />
                        <p className="text-xs text-muted-foreground">
                          Transfer Restriction
                        </p>
                        <p className="font-medium text-sm">
                          {selectedOffer.transferRestriction ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Valuation */}
                  {(selectedOffer.preMoneyValuation ||
                    selectedOffer.postMoneyValuation) && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-3">Valuation</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {selectedOffer.preMoneyValuation && (
                            <div className="p-3 rounded-lg bg-muted/50">
                              <span className="text-muted-foreground">
                                Pre-money Valuation
                              </span>
                              <p className="font-medium">
                                {formatCurrency(selectedOffer.preMoneyValuation)}
                              </p>
                            </div>
                          )}
                          {selectedOffer.postMoneyValuation && (
                            <div className="p-3 rounded-lg bg-muted/50">
                              <span className="text-muted-foreground">
                                Post-money Valuation
                              </span>
                              <p className="font-medium">
                                {formatCurrency(
                                  selectedOffer.postMoneyValuation
                                )}
                              </p>
                            </div>
                          )}
                          {selectedOffer.valuationMethod && (
                            <div className="p-3 rounded-lg bg-muted/50">
                              <span className="text-muted-foreground">
                                Valuation Method
                              </span>
                              <p className="font-medium">
                                {selectedOffer.valuationMethod}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <Separator />

              {/* Description */}
              {selectedOffer.description && (
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedOffer.description}
                  </p>
                </div>
              )}

              {/* Use of Proceeds */}
              {selectedOffer.useOfProceeds && (
                <div>
                  <h4 className="font-semibold mb-2">Use of Proceeds</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedOffer.useOfProceeds}
                  </p>
                </div>
              )}

              <Separator />

              {/* Investment Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Sector</span>
                  <p className="font-medium">{selectedOffer.sector}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Price per Unit</span>
                  <p className="font-medium">
                    ₦{selectedOffer.pricePerUnit?.toLocaleString() || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Min Investment</span>
                  <p className="font-medium">
                    {selectedOffer.minInvestment
                      ? formatCurrency(selectedOffer.minInvestment)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Investment</span>
                  <p className="font-medium">
                    {selectedOffer.maxInvestment
                      ? formatCurrency(selectedOffer.maxInvestment)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Units</span>
                  <p className="font-medium">
                    {selectedOffer.totalUnits?.toLocaleString() || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Units Sold</span>
                  <p className="font-medium">
                    {selectedOffer.soldUnits?.toLocaleString() || 0}
                  </p>
                </div>
              </div>

              {/* Eligible Investors */}
              {selectedOffer.eligibleInvestors &&
                selectedOffer.eligibleInvestors.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Eligible Investors</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOffer.eligibleInvestors.map((investor) => (
                        <Badge key={investor} variant="secondary">
                          {investor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              <Separator />

              {/* Additional Info */}
              <div className="space-y-3">
                {selectedOffer.underwriter && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Underwriter
                      </p>
                      <p className="font-medium">{selectedOffer.underwriter}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Regulatory Status
                    </p>
                    <p className="font-medium">
                      {selectedOffer.regulatoryApproval}
                    </p>
                  </div>
                </div>
                {selectedOffer.listingReference && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Listing Reference
                      </p>
                      <p className="font-medium">
                        {selectedOffer.listingReference}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Secondary Trading
                    </p>
                    <p className="font-medium">
                      {selectedOffer.hasSecondaryTrading ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Prospectus
                </Button>
                <Button className="flex-1">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
