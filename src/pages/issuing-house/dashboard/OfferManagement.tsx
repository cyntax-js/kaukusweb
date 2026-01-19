/**
 * Offer Management Page - Issuing House
 * Create, manage, and track securities offerings
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { activeOfferings } from "@/mocks/rolesDashboardData";
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
  DollarSign,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OfferManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const draftOffers = activeOfferings.filter(o => o.status === 'upcoming');
  const activeOffers = activeOfferings.filter(o => o.status === 'active');
  const closedOffers = activeOfferings.filter(o => o.status === 'completed' || o.status === 'cancelled');

  const OfferCard = ({ offer }: { offer: typeof activeOfferings[0] }) => (
    <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{offer.name}</h3>
            <Badge variant={
              offer.status === 'active' ? 'default' :
              offer.status === 'completed' ? 'secondary' :
              offer.status === 'upcoming' ? 'outline' : 'destructive'
            }>
              {offer.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{offer.type}</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {offer.type}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Target</p>
          <p className="font-medium">₦{(offer.targetAmount / 1000000000).toFixed(1)}B</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Raised</p>
          <p className="font-medium text-success">₦{(offer.raisedAmount / 1000000000).toFixed(2)}B</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Investors</p>
          <p className="font-medium">{offer.investors}</p>
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
          {offer.startDate.toLocaleDateString()} - {offer.endDate.toLocaleDateString()}
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          View Details <ArrowUpRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Offer Management</h1>
          <p className="text-muted-foreground">Create and manage securities offerings</p>
        </div>
        <Button onClick={() => navigate("/issuing-house/dashboard/new-offering")}>
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
              <p className="text-2xl font-bold">{draftOffers.length}</p>
              <p className="text-xs text-muted-foreground">Draft Offers</p>
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
              <p className="text-xs text-muted-foreground">Active Offers</p>
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
              <p className="text-xs text-muted-foreground">Closed Offers</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-2xl font-bold">₦5.2B</p>
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
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="draft">Draft ({draftOffers.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeOffers.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({closedOffers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="draft" className="space-y-4">
          {draftOffers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {draftOffers.map(offer => <OfferCard key={offer.id} offer={offer} />)}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Draft Offers</h3>
              <p className="text-sm text-muted-foreground mb-4">Create a new offer to get started</p>
              <Button onClick={() => navigate("/issuing-house/dashboard/new-offering")}>
                Create New Offer
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {activeOffers.map(offer => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {closedOffers.map(offer => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
