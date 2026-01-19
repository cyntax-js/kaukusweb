/**
 * Performance Metrics Page
 * 
 * Track participation rate, spread violations, and incentives earned.
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const performanceMetrics = {
  participationRate: 94.5,
  targetParticipation: 90,
  quoteUptime: 98.2,
  targetUptime: 95,
  avgSpread: 0.22,
  targetSpread: 0.25,
  spreadViolations: 3,
  incentivesEarned: 2450000,
  incentivesPending: 850000,
};

const dailyPerformance = [
  { date: "2024-01-15", participation: 96.2, uptime: 99.1, violations: 0, incentive: 180000 },
  { date: "2024-01-14", participation: 93.8, uptime: 98.5, violations: 1, incentive: 165000 },
  { date: "2024-01-13", participation: 95.1, uptime: 97.8, violations: 0, incentive: 175000 },
  { date: "2024-01-12", participation: 91.2, uptime: 96.2, violations: 2, incentive: 145000 },
  { date: "2024-01-11", participation: 97.5, uptime: 99.5, violations: 0, incentive: 195000 },
];

const violationDetails = [
  { 
    id: 1, 
    symbol: "MTNN", 
    time: "2024-01-14 11:32:15", 
    type: "Spread Violation", 
    actual: 0.45,
    threshold: 0.25,
    duration: "2m 15s",
    penalty: 15000,
    status: "Resolved"
  },
  { 
    id: 2, 
    symbol: "DANGCEM", 
    time: "2024-01-12 14:18:42", 
    type: "Quote Withdrawal", 
    actual: null,
    threshold: null,
    duration: "5m 30s",
    penalty: 25000,
    status: "Resolved"
  },
  { 
    id: 3, 
    symbol: "GTCO", 
    time: "2024-01-12 09:45:00", 
    type: "Volume Below Min", 
    actual: 2500,
    threshold: 5000,
    duration: "8m 00s",
    penalty: 10000,
    status: "Resolved"
  },
];

const incentiveBreakdown = [
  { category: "Quote Uptime Bonus", amount: 850000, status: "Earned" },
  { category: "Spread Compliance Bonus", amount: 650000, status: "Earned" },
  { category: "Volume Achievement", amount: 450000, status: "Earned" },
  { category: "Participation Rate Bonus", amount: 500000, status: "Earned" },
  { category: "Monthly Performance", amount: 850000, status: "Pending" },
];

export default function PerformanceMetrics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-chart-5" />
            Performance Metrics
          </h1>
          <p className="text-muted-foreground">
            Track your market making performance and incentives
          </p>
        </div>
        <Badge className="bg-success/10 text-success text-sm py-1 px-3">
          Rating: A+
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Participation Rate</p>
              <Target className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-success">{performanceMetrics.participationRate}%</p>
            <Progress value={performanceMetrics.participationRate} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-1">
              Target: {performanceMetrics.targetParticipation}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Quote Uptime</p>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-success">{performanceMetrics.quoteUptime}%</p>
            <Progress value={performanceMetrics.quoteUptime} className="mt-2 h-1" />
            <p className="text-xs text-muted-foreground mt-1">
              Target: {performanceMetrics.targetUptime}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Spread Violations</p>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning">{performanceMetrics.spreadViolations}</p>
            <p className="text-xs text-muted-foreground mt-3">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Incentives Earned</p>
              <DollarSign className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">
              ₦{(performanceMetrics.incentivesEarned / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              +₦{(performanceMetrics.incentivesPending / 1000).toFixed(0)}K pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Performance</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="incentives">Incentives</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Performance Summary</CardTitle>
              <CardDescription>Track your daily market making metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Participation</TableHead>
                    <TableHead className="text-right">Uptime</TableHead>
                    <TableHead className="text-right">Violations</TableHead>
                    <TableHead className="text-right">Incentive</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyPerformance.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="text-right">
                        <span className={day.participation >= 90 ? "text-success" : "text-warning"}>
                          {day.participation}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={day.uptime >= 95 ? "text-success" : "text-warning"}>
                          {day.uptime}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={day.violations === 0 ? "text-success" : "text-warning"}>
                          {day.violations}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-success">
                        ₦{day.incentive.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {day.violations === 0 && day.participation >= 90 ? (
                          <Badge className="bg-success/10 text-success">Excellent</Badge>
                        ) : (
                          <Badge variant="secondary">Good</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations">
          <Card>
            <CardHeader>
              <CardTitle>Violation History</CardTitle>
              <CardDescription>Track spread violations and penalties</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actual</TableHead>
                    <TableHead className="text-right">Threshold</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Penalty</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violationDetails.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="text-sm">{v.time}</TableCell>
                      <TableCell className="font-medium">{v.symbol}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{v.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {v.actual !== null ? (
                          typeof v.actual === "number" && v.actual < 1 
                            ? `${v.actual}%` 
                            : v.actual.toLocaleString()
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {v.threshold !== null ? (
                          typeof v.threshold === "number" && v.threshold < 1 
                            ? `${v.threshold}%` 
                            : v.threshold.toLocaleString()
                        ) : "—"}
                      </TableCell>
                      <TableCell>{v.duration}</TableCell>
                      <TableCell className="text-right text-destructive">
                        -₦{v.penalty.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{v.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incentives">
          <Card>
            <CardHeader>
              <CardTitle>Incentive Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of your earned incentives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incentiveBreakdown.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      {item.status === "Earned" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <Clock className="w-5 h-5 text-warning" />
                      )}
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.status === "Earned" ? "Credited to account" : "Awaiting settlement"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        item.status === "Earned" ? "text-success" : "text-warning"
                      }`}>
                        ₦{item.amount.toLocaleString()}
                      </p>
                      <Badge variant={item.status === "Earned" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between">
                <span className="text-muted-foreground">Total Incentives</span>
                <span className="text-xl font-bold text-success">
                  ₦{incentiveBreakdown.reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
