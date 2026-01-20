/**
 * Primary Market Page - Dealer
 * View available offers, dealer subscriptions, and allotted securities
 * Includes subscription drawer for participating in offerings
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { activeOfferings } from "@/mocks/rolesDashboardData";
import { toast } from "sonner";
import {
  Search,
  Filter,
  FileText,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Banknote,
  Calendar,
  Building2,
  Info,
} from "lucide-react";

interface Offering {
  id: string;
  name: string;
  type: string;
  targetAmount: number;
  raisedAmount: number;
  subscriptionRate: number;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  minInvestment: number;
  pricePerUnit: number;
  availableUnits: number;
  issuer: string;
  sector: string;
}

const enhancedOfferings: Offering[] = [
  {
    id: 'o1',
    name: 'TechCorp Nigeria IPO',
    type: 'IPO',
    targetAmount: 50000000000,
    raisedAmount: 32500000000,
    subscriptionRate: 65,
    status: 'active',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-02-15'),
    minInvestment: 5000000,
    pricePerUnit: 100,
    availableUnits: 175000000,
    issuer: 'TechCorp Nigeria Limited',
    sector: 'Technology',
  },
  {
    id: 'o2',
    name: 'Energy Corp Bond',
    type: 'Bond',
    targetAmount: 100000000000,
    raisedAmount: 78000000000,
    subscriptionRate: 78,
    status: 'active',
    startDate: new Date('2025-01-05'),
    endDate: new Date('2025-02-28'),
    minInvestment: 10000000,
    pricePerUnit: 1000,
    availableUnits: 22000000,
    issuer: 'Energy Corporation Plc',
    sector: 'Energy',
  },
  {
    id: 'o3',
    name: 'FinTech Solutions Rights Issue',
    type: 'Rights Issue',
    targetAmount: 25000000000,
    raisedAmount: 0,
    subscriptionRate: 0,
    status: 'upcoming',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-15'),
    minInvestment: 2000000,
    pricePerUnit: 50,
    availableUnits: 500000000,
    issuer: 'FinTech Solutions Ltd',
    sector: 'Financial Services',
  },
];

export default function DealerPrimaryMarket() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
  const [subscriptionAmount, setSubscriptionAmount] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const mySubscriptions = [
    { id: 's1', offer: 'TechCorp Nigeria IPO', subscribed: 50000000, allotted: 45000000, status: 'allotted' },
    { id: 's2', offer: 'Energy Corp Bond', subscribed: 100000000, allotted: null, status: 'pending' },
  ];

  const allottedSecurities = [
    { id: 'a1', security: 'TechCorp Nigeria', units: 450000, pricePerUnit: 100, totalValue: 45000000, date: new Date('2025-01-15') },
  ];

  const handleSubscribe = async () => {
    if (!selectedOffering || !subscriptionAmount) return;
    
    const amount = parseFloat(subscriptionAmount);
    if (amount < selectedOffering.minInvestment) {
      toast.error("Amount below minimum", {
        description: `Minimum investment is ₦${(selectedOffering.minInvestment / 1000000).toFixed(0)}M`
      });
      return;
    }

    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubscribing(false);
    
    toast.success("Subscription submitted!", {
      description: `Your subscription of ₦${(amount / 1000000).toFixed(0)}M for ${selectedOffering.name} has been submitted.`
    });
    
    setSelectedOffering(null);
    setSubscriptionAmount("");
  };

  const calculateUnits = () => {
    if (!selectedOffering || !subscriptionAmount) return 0;
    return Math.floor(parseFloat(subscriptionAmount) / selectedOffering.pricePerUnit);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Primary Market</h1>
        <p className="text-muted-foreground">Subscribe to new offerings and manage allotments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Available Offers</span>
            <FileText className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">{enhancedOfferings.filter(o => o.status === 'active').length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">My Subscriptions</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">{mySubscriptions.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Allotted Securities</span>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">{allottedSecurities.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Invested</span>
            <DollarSign className="w-5 h-5 text-chart-4" />
          </div>
          <p className="text-3xl font-bold">₦150M</p>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Offers</TabsTrigger>
          <TabsTrigger value="subscriptions">My Subscriptions</TabsTrigger>
          <TabsTrigger value="allotted">Allotted Securities</TabsTrigger>
        </TabsList>

        {/* Available Offers Tab */}
        <TabsContent value="available" className="space-y-4">
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
              Filter
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {enhancedOfferings.map(offer => (
              <Card key={offer.id} className="p-6 hover:border-chart-2/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{offer.name}</h3>
                    <p className="text-sm text-muted-foreground">{offer.issuer}</p>
                  </div>
                  <Badge variant={offer.status === 'active' ? 'default' : 'outline'}>
                    {offer.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-medium">₦{(offer.targetAmount / 1000000000).toFixed(1)}B</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Investment</p>
                    <p className="font-medium">₦{(offer.minInvestment / 1000000).toFixed(0)}M</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price/Unit</p>
                    <p className="font-medium">₦{offer.pricePerUnit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{offer.type}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subscription Progress</span>
                    <span>{offer.subscriptionRate}%</span>
                  </div>
                  <Progress value={offer.subscriptionRate} className="h-2" />
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>{offer.startDate.toLocaleDateString()} - {offer.endDate.toLocaleDateString()}</span>
                </div>

                <Button 
                  className="w-full" 
                  disabled={offer.status !== 'active'}
                  onClick={() => setSelectedOffering(offer)}
                >
                  {offer.status === 'active' ? 'Subscribe Now' : 'Coming Soon'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">My Subscriptions</h3>

            <div className="space-y-4">
              {mySubscriptions.map(sub => (
                <div key={sub.id} className="p-4 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{sub.offer}</h4>
                      <p className="text-sm text-muted-foreground">
                        Subscribed: ₦{(sub.subscribed / 1000000).toFixed(0)}M
                      </p>
                    </div>
                    <Badge variant={sub.status === 'allotted' ? 'default' : 'secondary'}>
                      {sub.status}
                    </Badge>
                  </div>

                  {sub.allotted && (
                    <div className="p-3 rounded bg-success/10 text-sm">
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Allotted: ₦{(sub.allotted / 1000000).toFixed(0)}M</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Allotted Securities Tab */}
        <TabsContent value="allotted" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Allotted Securities</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b">
                    <th className="pb-3 font-medium">Security</th>
                    <th className="pb-3 font-medium">Units</th>
                    <th className="pb-3 font-medium">Price/Unit</th>
                    <th className="pb-3 font-medium">Total Value</th>
                    <th className="pb-3 font-medium">Allotment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allottedSecurities.map(security => (
                    <tr key={security.id} className="border-b border-border/50">
                      <td className="py-4 font-medium">{security.security}</td>
                      <td className="py-4">{security.units.toLocaleString()}</td>
                      <td className="py-4">₦{security.pricePerUnit.toFixed(2)}</td>
                      <td className="py-4 font-medium">₦{(security.totalValue / 1000000).toFixed(0)}M</td>
                      <td className="py-4 text-muted-foreground">{security.date.toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Subscription Drawer */}
      <Sheet open={!!selectedOffering} onOpenChange={() => setSelectedOffering(null)}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Subscribe to Offering</SheetTitle>
            <SheetDescription>
              Complete your subscription for {selectedOffering?.name}
            </SheetDescription>
          </SheetHeader>

          {selectedOffering && (
            <div className="py-6 space-y-6">
              {/* Offering Summary */}
              <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedOffering.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedOffering.issuer}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type</span>
                    <p className="font-medium">{selectedOffering.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sector</span>
                    <p className="font-medium">{selectedOffering.sector}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price/Unit</span>
                    <p className="font-medium">₦{selectedOffering.pricePerUnit.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Available Units</span>
                    <p className="font-medium">{selectedOffering.availableUnits.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Amount */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Subscription Amount (₦)</Label>
                  <div className="relative">
                    <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      className="pl-10"
                      value={subscriptionAmount}
                      onChange={(e) => setSubscriptionAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Minimum: ₦{(selectedOffering.minInvestment / 1000000).toFixed(0)}M
                  </p>
                </div>

                {subscriptionAmount && parseFloat(subscriptionAmount) > 0 && (
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-4 h-4 text-primary" />
                      <span className="font-medium">Subscription Summary</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium">₦{parseFloat(subscriptionAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price/Unit</span>
                        <span className="font-medium">₦{selectedOffering.pricePerUnit.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Units</span>
                        <span className="font-semibold text-primary">{calculateUnits().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-warning/10 text-sm">
                  <p className="text-warning">
                    <strong>Note:</strong> Final allotment is subject to oversubscription rules and regulatory approval.
                  </p>
                </div>
              </div>
            </div>
          )}

          <SheetFooter>
            <Button variant="outline" onClick={() => setSelectedOffering(null)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubscribe} 
              disabled={!subscriptionAmount || isSubscribing}
            >
              {isSubscribing ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm Subscription
                </>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
