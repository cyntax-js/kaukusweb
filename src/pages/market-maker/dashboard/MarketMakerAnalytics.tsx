import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Activity, Zap, Target, DollarSign } from "lucide-react";

const volumeData = [
  { hour: "9AM", volume: 45, quotes: 8500 },
  { hour: "10AM", volume: 82, quotes: 15200 },
  { hour: "11AM", volume: 125, quotes: 22100 },
  { hour: "12PM", volume: 98, quotes: 18500 },
  { hour: "1PM", volume: 75, quotes: 14200 },
  { hour: "2PM", volume: 110, quotes: 20500 },
  { hour: "3PM", volume: 145, quotes: 26800 },
  { hour: "4PM", volume: 88, quotes: 16200 },
];

const pnlData = [
  { day: "Mon", pnl: 8500000, spread: 0.11 },
  { day: "Tue", pnl: 12200000, spread: 0.10 },
  { day: "Wed", pnl: -3500000, spread: 0.15 },
  { day: "Thu", pnl: 9800000, spread: 0.12 },
  { day: "Fri", pnl: 15000000, spread: 0.09 },
];

const symbolPerformance = [
  { name: "DANGOTE", fillRate: 99.2, volume: 125, color: "hsl(var(--chart-1))" },
  { name: "GTCO", fillRate: 98.5, volume: 89, color: "hsl(var(--chart-2))" },
  { name: "MTN", fillRate: 99.0, volume: 156, color: "hsl(var(--chart-3))" },
  { name: "ZENITH", fillRate: 97.8, volume: 67, color: "hsl(var(--chart-4))" },
  { name: "UBA", fillRate: 98.1, volume: 45, color: "hsl(var(--chart-5))" },
];

const spreadData = [
  { name: "0.05-0.10%", value: 35 },
  { name: "0.10-0.15%", value: 40 },
  { name: "0.15-0.20%", value: 15 },
  { name: "0.20%+", value: 10 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `₦${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(0)}M`;
  return `₦${value.toLocaleString()}`;
};

export default function MarketMakerAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track quoting performance and market making metrics</p>
        </div>
        <Select defaultValue="today">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
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
              <p className="text-sm text-muted-foreground">Daily Volume</p>
              <p className="text-xl font-bold">₦890M</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +15.2%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quotes Today</p>
              <p className="text-xl font-bold">142K</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8.5%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fill Rate</p>
              <p className="text-xl font-bold">98.7%</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +0.2%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Spread</p>
              <p className="text-xl font-bold">0.12%</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> -0.02%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="volume" className="space-y-4">
        <TabsList>
          <TabsTrigger value="volume">Quoting Activity</TabsTrigger>
          <TabsTrigger value="pnl">P&L Analysis</TabsTrigger>
          <TabsTrigger value="symbols">Symbol Performance</TabsTrigger>
          <TabsTrigger value="spreads">Spread Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Quoting Activity</CardTitle>
              <CardDescription>Volume (₦M) and quote count throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="volume" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Volume (₦M)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pnl">
          <Card>
            <CardHeader>
              <CardTitle>Daily P&L Trend</CardTitle>
              <CardDescription>Profit and loss over the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnlData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-xs" />
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

        <TabsContent value="symbols">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Volume by Symbol</CardTitle>
                <CardDescription>Trading volume distribution (₦M)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={symbolPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="name" type="category" width={80} className="text-xs" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                      />
                      <Bar dataKey="volume" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fill Rate by Symbol</CardTitle>
                <CardDescription>Quote fill performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {symbolPerformance.map((symbol) => (
                  <div key={symbol.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${symbol.color}20`, color: symbol.color }}>
                          {symbol.name.slice(0, 2)}
                        </div>
                        <span className="font-medium">{symbol.name}</span>
                      </div>
                      <span className="font-medium text-chart-2">{symbol.fillRate}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${symbol.fillRate}%`, backgroundColor: symbol.color }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spreads">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spread Distribution</CardTitle>
                <CardDescription>Percentage of quotes by spread range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spreadData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="hsl(var(--chart-1))" />
                        <Cell fill="hsl(var(--chart-2))" />
                        <Cell fill="hsl(var(--chart-3))" />
                        <Cell fill="hsl(var(--chart-4))" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spread Trend</CardTitle>
                <CardDescription>Average spread over the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pnlData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis domain={[0, 0.2]} tickFormatter={(v) => `${v}%`} className="text-xs" />
                      <Tooltip
                        formatter={(value: number) => `${value}%`}
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="spread"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-4))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
