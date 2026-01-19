/**
 * Post-Listing Page - Issuing House
 * Manage listing confirmation, lock-up periods, and corporate actions
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  Lock,
  Unlock,
  Calendar,
  Building2,
  TrendingUp,
  Bell,
  ArrowUpRight,
} from "lucide-react";

export default function PostListing() {
  // Mock data
  const listedSecurities = [
    { 
      id: 'ls1', 
      name: 'FirstBank Rights Issue', 
      ticker: 'FIRSTBANK', 
      listingDate: new Date('2025-01-16'), 
      status: 'listed',
      openingPrice: 25.50,
      currentPrice: 27.80,
    },
  ];

  const lockUpPeriods = [
    { 
      id: 'lp1', 
      security: 'TechCorp Nigeria', 
      type: 'Founder Shares', 
      startDate: new Date('2025-01-15'), 
      endDate: new Date('2025-07-15'), 
      percentComplete: 10,
      unitsLocked: 50000000,
    },
    { 
      id: 'lp2', 
      security: 'TechCorp Nigeria', 
      type: 'Pre-IPO Investors', 
      startDate: new Date('2025-01-15'), 
      endDate: new Date('2025-04-15'), 
      percentComplete: 35,
      unitsLocked: 20000000,
    },
  ];

  const corporateActions = [
    { id: 'ca1', type: 'Dividend', security: 'FirstBank', exDate: new Date('2025-02-01'), status: 'upcoming', amount: '₦1.50/share' },
    { id: 'ca2', type: 'AGM', security: 'FirstBank', exDate: new Date('2025-03-15'), status: 'scheduled', amount: null },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Post-Listing Management</h1>
        <p className="text-muted-foreground">Manage listed securities, lock-ups, and corporate actions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Listed Securities</span>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">{listedSecurities.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Active Lock-ups</span>
            <Lock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">{lockUpPeriods.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Upcoming Actions</span>
            <Calendar className="w-5 h-5 text-chart-4" />
          </div>
          <p className="text-3xl font-bold">{corporateActions.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Locked Value</span>
            <TrendingUp className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">₦1.75B</p>
        </Card>
      </div>

      <Tabs defaultValue="listings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="listings">Listing Confirmation</TabsTrigger>
          <TabsTrigger value="lockups">Lock-up Periods</TabsTrigger>
          <TabsTrigger value="actions">Corporate Actions</TabsTrigger>
        </TabsList>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Listed Securities</h3>

            <div className="space-y-4">
              {listedSecurities.map(security => (
                <div key={security.id} className="p-6 rounded-lg border border-success/30 bg-success/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg">{security.name}</h4>
                        <Badge className="bg-success/10 text-success">{security.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ticker: {security.ticker} • Listed: {security.listingDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₦{security.currentPrice.toFixed(2)}</p>
                      <div className="flex items-center text-sm text-success">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +{((security.currentPrice - security.openingPrice) / security.openingPrice * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 rounded bg-background">
                      <p className="text-muted-foreground">Opening Price</p>
                      <p className="font-semibold">₦{security.openingPrice.toFixed(2)}</p>
                    </div>
                    <div className="p-3 rounded bg-background">
                      <p className="text-muted-foreground">Current Price</p>
                      <p className="font-semibold">₦{security.currentPrice.toFixed(2)}</p>
                    </div>
                    <div className="p-3 rounded bg-background">
                      <p className="text-muted-foreground">Day Volume</p>
                      <p className="font-semibold">2.5M</p>
                    </div>
                    <div className="p-3 rounded bg-background">
                      <p className="text-muted-foreground">Market Cap</p>
                      <p className="font-semibold">₦45.2B</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Lock-up Periods Tab */}
        <TabsContent value="lockups" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Active Lock-up Periods</h3>

            <div className="space-y-4">
              {lockUpPeriods.map(lockup => (
                <div key={lockup.id} className="p-4 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-medium">{lockup.type}</h4>
                        <p className="text-sm text-muted-foreground">{lockup.security}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{lockup.unitsLocked.toLocaleString()} units</p>
                      <p className="text-muted-foreground">locked</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lock-up Progress</span>
                      <span className="font-medium">{lockup.percentComplete}%</span>
                    </div>
                    <Progress value={lockup.percentComplete} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{lockup.startDate.toLocaleDateString()}</span>
                      <span>{lockup.endDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Corporate Actions Tab */}
        <TabsContent value="actions" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Corporate Actions Calendar</h3>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Set Alerts
              </Button>
            </div>

            <div className="space-y-4">
              {corporateActions.map(action => (
                <div key={action.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-chart-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{action.type}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {action.security}
                        <span>• Ex-Date: {action.exDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {action.amount && (
                      <span className="font-medium text-success">{action.amount}</span>
                    )}
                    <Badge variant="outline">{action.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
