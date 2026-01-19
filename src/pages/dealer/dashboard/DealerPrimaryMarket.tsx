/**
 * Primary Market Page - Dealer
 * View available offers, dealer subscriptions, and allotted securities
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { activeOfferings } from "@/mocks/rolesDashboardData";
import {
  Search,
  Filter,
  FileText,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function DealerPrimaryMarket() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock dealer subscriptions
  const mySubscriptions = [
    { id: 's1', offer: 'TechCorp Nigeria IPO', subscribed: 50000000, allotted: 45000000, status: 'allotted' },
    { id: 's2', offer: 'Energy Corp Bond', subscribed: 100000000, allotted: null, status: 'pending' },
  ];

  const allottedSecurities = [
    { id: 'a1', security: 'TechCorp Nigeria', units: 450000, pricePerUnit: 100, totalValue: 45000000, date: new Date('2025-01-15') },
  ];

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
          <p className="text-3xl font-bold">{activeOfferings.filter(o => o.status === 'active').length}</p>
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
            {activeOfferings.filter(o => o.status === 'active' || o.status === 'upcoming').map(offer => (
              <Card key={offer.id} className="p-6 hover:border-chart-2/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{offer.name}</h3>
                    <p className="text-sm text-muted-foreground">{offer.type}</p>
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
                    <p className="font-medium">₦5M</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subscription Progress</span>
                    <span>{offer.subscriptionRate}%</span>
                  </div>
                  <Progress value={offer.subscriptionRate} className="h-2" />
                </div>

                <Button className="w-full" disabled={offer.status !== 'active'}>
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
    </div>
  );
}
