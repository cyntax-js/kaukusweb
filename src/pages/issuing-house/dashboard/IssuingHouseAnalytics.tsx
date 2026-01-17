import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Briefcase, DollarSign } from "lucide-react";

const capitalRaisedData = [
  { month: "Jan", raised: 1200000000 },
  { month: "Feb", raised: 800000000 },
  { month: "Mar", raised: 1500000000 },
  { month: "Apr", raised: 2200000000 },
  { month: "May", raised: 1800000000 },
  { month: "Jun", raised: 2500000000 },
];

const subscriptionData = [
  { week: "W1", subscriptions: 120 },
  { week: "W2", subscriptions: 180 },
  { week: "W3", subscriptions: 250 },
  { week: "W4", subscriptions: 320 },
];

const offeringTypeData = [
  { name: "IPO", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Rights Issue", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Private Placement", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Bond", value: 10, color: "hsl(var(--chart-4))" },
];

const investorTypeData = [
  { type: "Institutional", count: 45, volume: 3500 },
  { type: "HNWI", count: 120, volume: 1200 },
  { type: "Retail", count: 850, volume: 500 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `₦${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(0)}M`;
  return `₦${value.toLocaleString()}`;
};

export default function IssuingHouseAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track offering performance and investor metrics</p>
        </div>
        <Select defaultValue="6m">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-chart-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <p className="text-xl font-bold">₦10.0B</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +38.5%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Offerings</p>
              <p className="text-xl font-bold">12</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 3 active
              </p>
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
              <p className="text-xl font-bold">1,240</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +125 new
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Subscription</p>
              <p className="text-xl font-bold">145%</p>
              <p className="text-xs text-muted-foreground">oversubscription rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="capital" className="space-y-4">
        <TabsList>
          <TabsTrigger value="capital">Capital Raised</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="offerings">Offering Types</TabsTrigger>
          <TabsTrigger value="investors">Investor Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="capital">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Capital Raised</CardTitle>
              <CardDescription>Total capital raised per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={capitalRaisedData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-xs" />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="raised"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Subscription Trend</CardTitle>
              <CardDescription>Number of subscriptions per week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subscriptionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="subscriptions"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-2))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offerings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Offering Type Distribution</CardTitle>
                <CardDescription>Breakdown by offering type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={offeringTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {offeringTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offering Summary</CardTitle>
                <CardDescription>By type this period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {offeringTypeData.map((offering) => (
                  <div key={offering.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: offering.color }} />
                      <span className="font-medium">{offering.name}</span>
                    </div>
                    <span className="font-medium">{offering.value}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investors">
          <Card>
            <CardHeader>
              <CardTitle>Investor Type Analysis</CardTitle>
              <CardDescription>Volume by investor category (₦M)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investorTypeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="type" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="volume" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} name="Volume (₦M)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
