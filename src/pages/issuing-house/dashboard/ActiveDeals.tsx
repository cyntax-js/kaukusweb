import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Calendar, BarChart3, ExternalLink } from "lucide-react";
import { activeOfferings, SecurityOffering } from "@/mocks/rolesDashboardData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(date);
};

const getStatusBadge = (status: SecurityOffering['status']) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">Active</Badge>;
    case 'completed':
      return <Badge className="bg-primary/20 text-primary border-primary/30">Completed</Badge>;
    case 'upcoming':
      return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Upcoming</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
  }
};

function OfferingCard({ offering }: { offering: SecurityOffering }) {
  const progressPercent = (offering.raisedAmount / offering.targetAmount) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{offering.name}</CardTitle>
            <CardDescription>{offering.type}</CardDescription>
          </div>
          {getStatusBadge(offering.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressPercent.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{formatCurrency(offering.raisedAmount)}</span>
            <span className="text-muted-foreground">of {formatCurrency(offering.targetAmount)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{offering.investors} investors</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{offering.subscriptionRate}% subscribed</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(offering.startDate)} - {formatDate(offering.endDate)}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {offering.status === 'active' && (
            <Button className="flex-1">Manage</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ActiveDeals() {
  const active = activeOfferings.filter((o) => o.status === 'active');
  const completed = activeOfferings.filter((o) => o.status === 'completed');
  const upcoming = activeOfferings.filter((o) => o.status === 'upcoming');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Active Deals</h1>
          <p className="text-muted-foreground">Manage your securities offerings</p>
        </div>
        <Button>
          <TrendingUp className="w-4 h-4 mr-2" />
          New Offering
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Offerings</p>
              <p className="text-xl font-bold">{active.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <p className="text-xl font-bold">{formatCurrency(active.reduce((sum, o) => sum + o.raisedAmount, 0))}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming</p>
              <p className="text-xl font-bold">{upcoming.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Investors</p>
              <p className="text-xl font-bold">{activeOfferings.reduce((sum, o) => sum + o.investors, 0)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offerings Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((offering) => (
              <OfferingCard key={offering.id} offering={offering} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((offering) => (
              <OfferingCard key={offering.id} offering={offering} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map((offering) => (
              <OfferingCard key={offering.id} offering={offering} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
