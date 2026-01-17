import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, BarChart3, Activity, DollarSign, Users } from "lucide-react";

const volumeData = [
  { name: "Mon", volume: 125000000, trades: 45 },
  { name: "Tue", volume: 180000000, trades: 62 },
  { name: "Wed", volume: 145000000, trades: 51 },
  { name: "Thu", volume: 220000000, trades: 78 },
  { name: "Fri", volume: 195000000, trades: 69 },
];

const pnlData = [
  { name: "Week 1", pnl: 12500000 },
  { name: "Week 2", pnl: 8200000 },
  { name: "Week 3", pnl: -3500000 },
  { name: "Week 4", pnl: 15800000 },
];

const symbolData = [
  { name: "DANGOTE", value: 35, color: "hsl(var(--chart-1))" },
  { name: "GTCO", value: 25, color: "hsl(var(--chart-2))" },
  { name: "MTN", value: 20, color: "hsl(var(--chart-3))" },
  { name: "ZENITH", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 8, color: "hsl(var(--chart-5))" },
];

const brokerPerformance = [
  { name: "Alpha Securities", volume: 450, trades: 342 },
  { name: "Beta Investments", volume: 320, trades: 256 },
  { name: "Gamma Trading", volume: 280, trades: 198 },
  { name: "Delta Markets", volume: 180, trades: 145 },
  { name: "Epsilon Capital", volume: 120, trades: 89 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `₦${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(0)}M`;
  return `₦${value.toLocaleString()}`;
};

export default function DealerAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track performance and trading metrics</p>
        </div>
        <Select defaultValue="7d">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
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
              <p className="text-sm text-muted-foreground">Total Volume</p>
              <p className="text-xl font-bold">₦865M</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.5%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Trades</p>
              <p className="text-xl font-bold">305</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8.2%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net P&L</p>
              <p className="text-xl font-bold text-chart-2">+₦33M</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5.8%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Brokers</p>
              <p className="text-xl font-bold">45</p>
              <p className="text-xs text-muted-foreground">5 new this week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="volume" className="space-y-4">
        <TabsList>
          <TabsTrigger value="volume">Trading Volume</TabsTrigger>
          <TabsTrigger value="pnl">P&L Analysis</TabsTrigger>
          <TabsTrigger value="breakdown">Symbol Breakdown</TabsTrigger>
          <TabsTrigger value="brokers">Broker Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle>Daily Trading Volume</CardTitle>
              <CardDescription>Volume and trade count over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-xs" />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="volume" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pnl">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Trend</CardTitle>
              <CardDescription>Weekly P&L performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnlData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-xs" />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="pnl"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Volume by Symbol</CardTitle>
                <CardDescription>Distribution of trading volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={symbolData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {symbolData.map((entry, index) => (
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
                <CardTitle>Top Traded Symbols</CardTitle>
                <CardDescription>By volume this period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {symbolData.map((symbol, index) => (
                  <div key={symbol.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-4">{index + 1}</span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${symbol.color}20`, color: symbol.color }}>
                        {symbol.name.slice(0, 2)}
                      </div>
                      <span className="font-medium">{symbol.name}</span>
                    </div>
                    <span className="font-medium">{symbol.value}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="brokers">
          <Card>
            <CardHeader>
              <CardTitle>Broker Performance</CardTitle>
              <CardDescription>Volume by connected broker (₦M)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={brokerPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="name" type="category" width={120} className="text-xs" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="volume" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
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
