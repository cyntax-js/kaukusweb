/**
 * Subscription Monitoring Page - Issuing House
 * Track total subscriptions, breakdown, and oversubscription ratio
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { activeOfferings, issuingHouseInvestors } from "@/mocks/rolesDashboardData";
import {
  Users,
  Building2,
  UserCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function SubscriptionMonitoring() {
  // Calculate totals
  const totalSubscriptions = activeOfferings
    .filter(o => o.status === 'active')
    .reduce((sum, o) => sum + o.raisedAmount, 0);
  
  const totalTarget = activeOfferings
    .filter(o => o.status === 'active')
    .reduce((sum, o) => sum + o.targetAmount, 0);

  const oversubscriptionRatio = totalTarget > 0 ? (totalSubscriptions / totalTarget * 100).toFixed(1) : 0;

  // Mock breakdown data
  const subscriptionBreakdown = {
    institutional: { count: 45, amount: 3200000000, percentage: 62 },
    retail: { count: 890, amount: 1500000000, percentage: 29 },
    hnwi: { count: 25, amount: 500000000, percentage: 9 },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Subscription Monitoring</h1>
        <p className="text-muted-foreground">Track subscriptions across all active offerings</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Subscriptions</span>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">₦{(totalSubscriptions / 1000000000).toFixed(2)}B</p>
          <div className="flex items-center mt-2 text-xs text-success">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +12.5% from last week
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Investors</span>
            <Users className="w-5 h-5 text-chart-4" />
          </div>
          <p className="text-3xl font-bold">{issuingHouseInvestors.length * 50}</p>
          <div className="flex items-center mt-2 text-xs text-success">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +85 this week
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Oversubscription Ratio</span>
            <BarChart3 className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">{oversubscriptionRatio}%</p>
          <Progress value={Number(oversubscriptionRatio)} className="h-2 mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Active Offerings</span>
            <PieChart className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">{activeOfferings.filter(o => o.status === 'active').length}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {activeOfferings.filter(o => o.status === 'upcoming').length} upcoming
          </p>
        </Card>
      </div>

      {/* Subscription Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-chart-4" />
            Subscription Breakdown
          </h3>
          
          <div className="space-y-6">
            {/* Institutional */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-chart-1" />
                  <span className="font-medium">Institutional</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{(subscriptionBreakdown.institutional.amount / 1000000000).toFixed(1)}B</p>
                  <p className="text-xs text-muted-foreground">{subscriptionBreakdown.institutional.count} investors</p>
                </div>
              </div>
              <Progress value={subscriptionBreakdown.institutional.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{subscriptionBreakdown.institutional.percentage}% of total</p>
            </div>

            {/* Retail */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-chart-2" />
                  <span className="font-medium">Retail</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{(subscriptionBreakdown.retail.amount / 1000000000).toFixed(1)}B</p>
                  <p className="text-xs text-muted-foreground">{subscriptionBreakdown.retail.count} investors</p>
                </div>
              </div>
              <Progress value={subscriptionBreakdown.retail.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{subscriptionBreakdown.retail.percentage}% of total</p>
            </div>

            {/* HNWI */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-chart-4" />
                  <span className="font-medium">High Net Worth</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{(subscriptionBreakdown.hnwi.amount / 1000000).toFixed(0)}M</p>
                  <p className="text-xs text-muted-foreground">{subscriptionBreakdown.hnwi.count} investors</p>
                </div>
              </div>
              <Progress value={subscriptionBreakdown.hnwi.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{subscriptionBreakdown.hnwi.percentage}% of total</p>
            </div>
          </div>
        </Card>

        {/* Active Offerings Performance */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-chart-4" />
            Offering Performance
          </h3>
          
          <div className="space-y-4">
            {activeOfferings.filter(o => o.status === 'active').map(offer => (
              <div key={offer.id} className="p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{offer.name}</h4>
                    <p className="text-xs text-muted-foreground">{offer.type}</p>
                  </div>
                  <Badge variant={offer.subscriptionRate >= 100 ? 'default' : 'secondary'}>
                    {offer.subscriptionRate >= 100 ? 'Oversubscribed' : 'Open'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Raised / Target</span>
                    <span>₦{(offer.raisedAmount / 1000000000).toFixed(2)}B / ₦{(offer.targetAmount / 1000000000).toFixed(1)}B</span>
                  </div>
                  <Progress value={offer.subscriptionRate} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{offer.investors} investors</span>
                    <span>{offer.subscriptionRate}% subscribed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
