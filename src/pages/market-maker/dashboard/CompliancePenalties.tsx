/**
 * Compliance & Penalties Page
 * 
 * Track obligations, warnings, and fines.
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  FileText,
  Clock,
  AlertCircle,
  Download,
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
const obligationStatus = {
  overallCompliance: 92,
  activeObligations: 5,
  pendingWarnings: 1,
  totalFines: 50000,
};

const obligations = [
  { 
    id: 1, 
    obligation: "Minimum Quote Uptime", 
    requirement: "95% during trading hours",
    current: 98.2,
    target: 95,
    status: "compliant"
  },
  { 
    id: 2, 
    obligation: "Maximum Spread", 
    requirement: "≤ 0.25% for assigned securities",
    current: 0.22,
    target: 0.25,
    status: "compliant"
  },
  { 
    id: 3, 
    obligation: "Minimum Volume", 
    requirement: "5,000 units per quote level",
    current: 8500,
    target: 5000,
    status: "compliant"
  },
  { 
    id: 4, 
    obligation: "Response Time", 
    requirement: "Update quotes within 5 seconds",
    current: 2.3,
    target: 5,
    status: "compliant"
  },
  { 
    id: 5, 
    obligation: "Participation Rate", 
    requirement: "Present 90% of trading session",
    current: 94.5,
    target: 90,
    status: "compliant"
  },
];

const warnings = [
  { 
    id: 1, 
    date: "2024-01-14", 
    type: "Spread Violation", 
    description: "Exceeded max spread on MTNN for 2 minutes",
    severity: "minor",
    status: "acknowledged",
    resolution: "System adjusted"
  },
];

const fines = [
  { 
    id: 1, 
    date: "2024-01-12", 
    reason: "Quote withdrawal during active session",
    amount: 25000,
    status: "paid",
    appealable: false
  },
  { 
    id: 2, 
    date: "2024-01-12", 
    reason: "Spread violation - cumulative",
    amount: 15000,
    status: "paid",
    appealable: false
  },
  { 
    id: 3, 
    date: "2024-01-08", 
    reason: "Volume below minimum threshold",
    amount: 10000,
    status: "paid",
    appealable: false
  },
];

const regulatoryDocs = [
  { name: "Market Maker Agreement 2024", date: "2024-01-01", type: "Contract" },
  { name: "Spread Compliance Guidelines", date: "2024-01-01", type: "Policy" },
  { name: "Monthly Compliance Report - Dec 2023", date: "2024-01-05", type: "Report" },
  { name: "Incentive Program Terms", date: "2024-01-01", type: "Terms" },
];

export default function CompliancePenalties() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-chart-5" />
            Compliance & Penalties
          </h1>
          <p className="text-muted-foreground">
            Monitor obligations, track warnings, and manage fines
          </p>
        </div>
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">{obligationStatus.overallCompliance}%</p>
            <Progress value={obligationStatus.overallCompliance} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Active Obligations</p>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{obligationStatus.activeObligations}</p>
            <p className="text-xs text-muted-foreground mt-2">All compliant</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Pending Warnings</p>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning">{obligationStatus.pendingWarnings}</p>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Fines (MTD)</p>
              <XCircle className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-destructive">
              ₦{obligationStatus.totalFines.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">All paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="obligations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="obligations">Obligations</TabsTrigger>
          <TabsTrigger value="warnings">Warnings</TabsTrigger>
          <TabsTrigger value="fines">Fines</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="obligations">
          <Card>
            <CardHeader>
              <CardTitle>Market Maker Obligations</CardTitle>
              <CardDescription>Your regulatory requirements and current compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {obligations.map((ob) => (
                  <div
                    key={ob.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium">{ob.obligation}</p>
                        <p className="text-sm text-muted-foreground">{ob.requirement}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        Current: {typeof ob.current === "number" && ob.current < 10 
                          ? `${ob.current}%` 
                          : ob.current.toLocaleString()}
                      </p>
                      <Badge className="bg-success/10 text-success">Compliant</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warnings">
          <Card>
            <CardHeader>
              <CardTitle>Warnings</CardTitle>
              <CardDescription>Compliance warnings and their resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              {warnings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-success" />
                  <p>No active warnings</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warnings.map((w) => (
                      <TableRow key={w.id}>
                        <TableCell>{w.date}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{w.type}</Badge>
                        </TableCell>
                        <TableCell>{w.description}</TableCell>
                        <TableCell>
                          <Badge className={
                            w.severity === "minor" 
                              ? "bg-warning/10 text-warning" 
                              : "bg-destructive/10 text-destructive"
                          }>
                            {w.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{w.status}</Badge>
                        </TableCell>
                        <TableCell>{w.resolution}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fines">
          <Card>
            <CardHeader>
              <CardTitle>Fine History</CardTitle>
              <CardDescription>Record of penalties and their payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fines.map((fine) => (
                    <TableRow key={fine.id}>
                      <TableCell>{fine.date}</TableCell>
                      <TableCell>{fine.reason}</TableCell>
                      <TableCell className="text-right text-destructive">
                        ₦{fine.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-success/10 text-success">{fine.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" disabled={!fine.appealable}>
                          Appeal
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="text-muted-foreground">Total Fines This Month</span>
                <span className="font-bold text-destructive">
                  ₦{fines.reduce((acc, f) => acc + f.amount, 0).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Documents</CardTitle>
              <CardDescription>Important compliance documents and agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {regulatoryDocs.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
