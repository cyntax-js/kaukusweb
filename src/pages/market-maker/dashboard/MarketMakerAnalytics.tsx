import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Package,
} from "lucide-react";

// Hourly quoting activity data
const quotingActivityData = [
  { hour: "9AM", volume: 45, quotes: 8500, fillRate: 98.2 },
  { hour: "10AM", volume: 82, quotes: 15200, fillRate: 99.1 },
  { hour: "11AM", volume: 125, quotes: 22100, fillRate: 98.8 },
  { hour: "12PM", volume: 98, quotes: 18500, fillRate: 97.5 },
  { hour: "1PM", volume: 75, quotes: 14200, fillRate: 98.9 },
  { hour: "2PM", volume: 110, quotes: 20500, fillRate: 99.2 },
  { hour: "3PM", volume: 145, quotes: 26800, fillRate: 98.6 },
  { hour: "4PM", volume: 88, quotes: 16200, fillRate: 99.0 },
];

// Weekly spread performance data
const spreadPerformanceData = [
  {
    day: "Mon",
    avgSpread: 0.11,
    targetSpread: 0.12,
    volume: 180,
    pnl: 8500000,
  },
  {
    day: "Tue",
    avgSpread: 0.1,
    targetSpread: 0.12,
    volume: 220,
    pnl: 12200000,
  },
  {
    day: "Wed",
    avgSpread: 0.15,
    targetSpread: 0.12,
    volume: 95,
    pnl: -3500000,
  },
  {
    day: "Thu",
    avgSpread: 0.12,
    targetSpread: 0.12,
    volume: 175,
    pnl: 9800000,
  },
  {
    day: "Fri",
    avgSpread: 0.09,
    targetSpread: 0.12,
    volume: 245,
    pnl: 15000000,
  },
];

// Monthly spread trend
const monthlySpreadTrend = [
  { week: "Week 1", spread: 0.14, fillRate: 97.5 },
  { week: "Week 2", spread: 0.12, fillRate: 98.2 },
  { week: "Week 3", spread: 0.11, fillRate: 98.8 },
  { week: "Week 4", spread: 0.1, fillRate: 99.1 },
];

// Quote fill rates by symbol
const fillRatesBySymbol = [
  {
    name: "DANGOTE",
    fillRate: 99.2,
    quotes: 45000,
    volume: 125,
    color: "hsl(var(--chart-1))",
  },
  {
    name: "GTCO",
    fillRate: 98.5,
    quotes: 38000,
    volume: 89,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "MTN",
    fillRate: 99.0,
    quotes: 52000,
    volume: 156,
    color: "hsl(var(--chart-3))",
  },
  {
    name: "ZENITH",
    fillRate: 97.8,
    quotes: 29000,
    volume: 67,
    color: "hsl(var(--chart-4))",
  },
  {
    name: "UBA",
    fillRate: 98.1,
    quotes: 21000,
    volume: 45,
    color: "hsl(var(--chart-5))",
  },
  {
    name: "AIRTEL",
    fillRate: 99.5,
    quotes: 18000,
    volume: 78,
    color: "hsl(var(--primary))",
  },
];

// Spread distribution data
const spreadDistribution = [
  { name: "0.05-0.10%", value: 35, color: "hsl(var(--chart-2))" },
  { name: "0.10-0.15%", value: 40, color: "hsl(var(--chart-1))" },
  { name: "0.15-0.20%", value: 15, color: "hsl(var(--chart-4))" },
  { name: "0.20%+", value: 10, color: "hsl(var(--chart-3))" },
];

// Inventory positions over time
const inventoryData = [
  {
    time: "9:00",
    DANGOTE: 150000,
    GTCO: 500000,
    MTN: 75000,
    ZENITH: 300000,
    UBA: 800000,
  },
  {
    time: "10:00",
    DANGOTE: 145000,
    GTCO: 520000,
    MTN: 72000,
    ZENITH: 290000,
    UBA: 850000,
  },
  {
    time: "11:00",
    DANGOTE: 160000,
    GTCO: 480000,
    MTN: 80000,
    ZENITH: 310000,
    UBA: 780000,
  },
  {
    time: "12:00",
    DANGOTE: 155000,
    GTCO: 510000,
    MTN: 78000,
    ZENITH: 305000,
    UBA: 820000,
  },
  {
    time: "13:00",
    DANGOTE: 148000,
    GTCO: 530000,
    MTN: 70000,
    ZENITH: 280000,
    UBA: 860000,
  },
  {
    time: "14:00",
    DANGOTE: 165000,
    GTCO: 490000,
    MTN: 85000,
    ZENITH: 320000,
    UBA: 790000,
  },
  {
    time: "15:00",
    DANGOTE: 170000,
    GTCO: 475000,
    MTN: 88000,
    ZENITH: 335000,
    UBA: 760000,
  },
  {
    time: "16:00",
    DANGOTE: 158000,
    GTCO: 505000,
    MTN: 82000,
    ZENITH: 315000,
    UBA: 810000,
  },
];

// Inventory value by symbol (for pie chart)
const inventoryValueData = [
  { name: "DANGOTE", value: 38500000, shares: 158000 },
  { name: "GTCO", value: 21360000, shares: 505000 },
  { name: "MTN", value: 15990000, shares: 82000 },
  { name: "ZENITH", value: 12200000, shares: 315000 },
  { name: "UBA", value: 18700000, shares: 810000 },
];

// Daily P&L breakdown
const pnlBreakdown = [
  { symbol: "DANGOTE", pnl: 4200000, trades: 156, avgSpread: 0.09 },
  { symbol: "GTCO", pnl: 2800000, trades: 234, avgSpread: 0.11 },
  { symbol: "MTN", pnl: 3500000, trades: 189, avgSpread: 0.08 },
  { symbol: "ZENITH", pnl: -850000, trades: 145, avgSpread: 0.14 },
  { symbol: "UBA", pnl: 1950000, trades: 178, avgSpread: 0.12 },
  { symbol: "AIRTEL", pnl: 900000, trades: 67, avgSpread: 0.1 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `₦${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(0)}M`;
  return `₦${value.toLocaleString()}`;
};

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function MarketMakerAnalytics() {
  const totalPnL = pnlBreakdown.reduce((sum, s) => sum + s.pnl, 0);
  const totalInventoryValue = inventoryValueData.reduce(
    (sum, s) => sum + s.value,
    0
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Performance</h1>
          <p className="text-muted-foreground">
            Comprehensive market making metrics and analysis
          </p>
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
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-chart-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily P&L</p>
              <p
                className={`text-xl font-bold ${
                  totalPnL >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {formatCurrency(totalPnL)}
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
              <p className="text-sm text-muted-foreground">Total Quotes</p>
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
              <p className="text-sm text-muted-foreground">Avg Fill Rate</p>
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
              <p className="text-xl font-bold">0.11%</p>
              <p className="text-xs text-chart-2 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> -0.01%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <p className="text-xl font-bold">
                {formatCurrency(totalInventoryValue)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-chart-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Pairs</p>
              <p className="text-xl font-bold">6</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="spread" className="space-y-4">
        <TabsList>
          <TabsTrigger value="spread">Spread Performance</TabsTrigger>
          <TabsTrigger value="fillrate">Quote Fill Rates</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Positions</TabsTrigger>
          <TabsTrigger value="pnl">P&L Analysis</TabsTrigger>
        </TabsList>

        {/* Spread Performance Tab */}
        <TabsContent value="spread" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Spread vs Target</CardTitle>
                <CardDescription>
                  Average spread compared to target spread threshold
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={spreadPerformanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis
                        yAxisId="left"
                        domain={[0, 0.2]}
                        tickFormatter={(v) => `${(v * 100).toFixed(1)}%`}
                        className="text-xs"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={(v) => `${v}M`}
                        className="text-xs"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                        }}
                        formatter={(value: number, name: string) => {
                          if (name.includes("Spread"))
                            return [`${(value * 100).toFixed(2)}%`, name];
                          return [`₦${value}M`, name];
                        }}
                      />
                      <Legend />
                      <Bar
                        yAxisId="right"
                        dataKey="volume"
                        fill="hsl(var(--muted-foreground))"
                        opacity={0.3}
                        name="Volume (₦M)"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="avgSpread"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        name="Avg Spread"
                        dot={{ fill: "hsl(var(--chart-1))" }}
                      />
                      <ReferenceLine
                        yAxisId="left"
                        y={0.12}
                        stroke="hsl(var(--destructive))"
                        strokeDasharray="5 5"
                        label={{
                          value: "Target",
                          fill: "hsl(var(--destructive))",
                          fontSize: 10,
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spread Distribution</CardTitle>
                <CardDescription>
                  Breakdown of quotes by spread range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spreadDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {spreadDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [
                          `${value}%`,
                          "Percentage",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {spreadDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Spread Trend</CardTitle>
              <CardDescription>
                Spread improvement and fill rate correlation over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySpreadTrend}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="week" className="text-xs" />
                    <YAxis
                      yAxisId="left"
                      domain={[0.08, 0.16]}
                      tickFormatter={(v) => `${(v * 100).toFixed(1)}%`}
                      className="text-xs"
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[96, 100]}
                      tickFormatter={(v) => `${v}%`}
                      className="text-xs"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="spread"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={2}
                      name="Avg Spread"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="fillRate"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Fill Rate %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quote Fill Rates Tab */}
        <TabsContent value="fillrate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fill Rate by Symbol</CardTitle>
                <CardDescription>
                  Quote fill performance across all traded symbols
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fillRatesBySymbol.map((symbol) => (
                  <div key={symbol.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: `${symbol.color}20`,
                            color: symbol.color,
                          }}
                        >
                          {symbol.name.slice(0, 2)}
                        </div>
                        <div>
                          <span className="font-medium">{symbol.name}</span>
                          <p className="text-xs text-muted-foreground">
                            {symbol.quotes.toLocaleString()} quotes
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className="font-bold text-lg"
                          style={{ color: symbol.color }}
                        >
                          {symbol.fillRate}%
                        </span>
                        <p className="text-xs text-muted-foreground">
                          ₦{symbol.volume}M vol
                        </p>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${symbol.fillRate}%`,
                          backgroundColor: symbol.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Fill Rate Trend</CardTitle>
                <CardDescription>
                  Fill rate performance throughout the trading day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={quotingActivityData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="hour" className="text-xs" />
                      <YAxis
                        domain={[96, 100]}
                        tickFormatter={(v) => `${v}%`}
                        className="text-xs"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                        }}
                        formatter={(value: number) => [
                          `${value.toFixed(1)}%`,
                          "Fill Rate",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="fillRate"
                        stroke="hsl(var(--chart-2))"
                        fill="hsl(var(--chart-2))"
                        fillOpacity={0.2}
                      />
                      <ReferenceLine
                        y={98}
                        stroke="hsl(var(--warning))"
                        strokeDasharray="3 3"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quoting Volume by Hour</CardTitle>
              <CardDescription>
                Number of quotes and trading volume throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={quotingActivityData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                      className="text-xs"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="volume"
                      fill="hsl(var(--chart-1))"
                      name="Volume (₦M)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="quotes"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Quote Count"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Positions Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Value Distribution</CardTitle>
                <CardDescription>
                  Current inventory value by symbol
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryValueData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {inventoryValueData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(
                          value: number,
                          name: string,
                          props: any
                        ) => [
                          `${formatCurrency(
                            value
                          )} (${props.payload.shares.toLocaleString()} shares)`,
                          name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Inventory Positions</CardTitle>
                <CardDescription>
                  Real-time inventory levels by symbol
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryValueData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        >
                          {item.name.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.shares.toLocaleString()} shares
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {formatCurrency(item.value)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((item.value / totalInventoryValue) * 100).toFixed(
                            1
                          )}
                          % of total
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Intraday Inventory Movement</CardTitle>
              <CardDescription>
                Position changes throughout the trading day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={inventoryData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                      className="text-xs"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      formatter={(value: number) => [
                        value.toLocaleString(),
                        "Shares",
                      ]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="DANGOTE"
                      stackId="1"
                      stroke={COLORS[0]}
                      fill={COLORS[0]}
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="GTCO"
                      stackId="1"
                      stroke={COLORS[1]}
                      fill={COLORS[1]}
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="MTN"
                      stackId="1"
                      stroke={COLORS[2]}
                      fill={COLORS[2]}
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="ZENITH"
                      stackId="1"
                      stroke={COLORS[3]}
                      fill={COLORS[3]}
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="UBA"
                      stackId="1"
                      stroke={COLORS[4]}
                      fill={COLORS[4]}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* P&L Analysis Tab */}
        <TabsContent value="pnl" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily P&L by Symbol</CardTitle>
                <CardDescription>
                  Profit and loss breakdown across traded symbols
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pnlBreakdown} layout="vertical">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        type="number"
                        tickFormatter={(v) => formatCurrency(v)}
                        className="text-xs"
                      />
                      <YAxis
                        dataKey="symbol"
                        type="category"
                        width={80}
                        className="text-xs"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                        }}
                        formatter={(value: number) => [
                          formatCurrency(value),
                          "P&L",
                        ]}
                      />
                      <Bar
                        dataKey="pnl"
                        radius={[0, 4, 4, 0]}
                        fill="hsl(var(--chart-2))"
                      >
                        {pnlBreakdown.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.pnl >= 0
                                ? "hsl(var(--chart-2))"
                                : "hsl(var(--destructive))"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>P&L Performance Details</CardTitle>
                <CardDescription>
                  Detailed breakdown with trade metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pnlBreakdown.map((item, index) => (
                    <div
                      key={item.symbol}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        >
                          {item.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{item.symbol}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.trades} trades •{" "}
                            {(item.avgSpread * 100).toFixed(2)}% avg spread
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={item.pnl >= 0 ? "default" : "destructive"}
                          className={
                            item.pnl >= 0 ? "bg-success/20 text-success" : ""
                          }
                        >
                          {item.pnl >= 0 ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          )}
                          {formatCurrency(Math.abs(item.pnl))}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-lg bg-secondary/30 flex items-center justify-between">
                  <span className="font-medium">Total Daily P&L</span>
                  <span
                    className={`text-xl font-bold ${
                      totalPnL >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {formatCurrency(totalPnL)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly P&L Trend</CardTitle>
              <CardDescription>
                Profit and loss performance over the week with volume
                correlation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={spreadPerformanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis
                      yAxisId="left"
                      tickFormatter={(v) => formatCurrency(v)}
                      className="text-xs"
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(v) => `${v}M`}
                      className="text-xs"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === "P&L")
                          return [formatCurrency(value), name];
                        return [`₦${value}M`, name];
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="right"
                      dataKey="volume"
                      fill="hsl(var(--muted-foreground))"
                      opacity={0.3}
                      name="Volume (₦M)"
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="pnl"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      name="P&L"
                    />
                    <ReferenceLine
                      yAxisId="left"
                      y={0}
                      stroke="hsl(var(--border))"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
