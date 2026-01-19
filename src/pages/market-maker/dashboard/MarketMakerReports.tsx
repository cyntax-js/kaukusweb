/**
 * Market Maker Reports Page
 * 
 * Generate liquidity reports and exchange submissions.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Upload,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

// Mock data
const reportTypes = [
  { id: "liquidity", name: "Liquidity Report", description: "Daily/weekly liquidity provision summary" },
  { id: "spread", name: "Spread Compliance Report", description: "Bid-ask spread tracking and violations" },
  { id: "performance", name: "Performance Report", description: "Participation rates and quote uptime" },
  { id: "inventory", name: "Inventory Report", description: "Position and exposure summary" },
  { id: "regulatory", name: "Regulatory Submission", description: "Exchange-required compliance report" },
];

const recentReports = [
  { 
    id: 1, 
    name: "Daily Liquidity Report - Jan 15", 
    type: "Liquidity Report",
    date: "2024-01-15",
    status: "ready",
    format: "PDF"
  },
  { 
    id: 2, 
    name: "Weekly Performance Summary", 
    type: "Performance Report",
    date: "2024-01-14",
    status: "ready",
    format: "Excel"
  },
  { 
    id: 3, 
    name: "Spread Compliance - Week 2", 
    type: "Spread Compliance Report",
    date: "2024-01-14",
    status: "ready",
    format: "PDF"
  },
  { 
    id: 4, 
    name: "Monthly Regulatory Submission", 
    type: "Regulatory Submission",
    date: "2024-01-10",
    status: "submitted",
    format: "XML"
  },
];

const scheduledSubmissions = [
  { 
    id: 1, 
    name: "Weekly Liquidity Summary",
    frequency: "Weekly",
    nextDue: "2024-01-21",
    recipient: "Nigerian Exchange (NGX)",
    status: "scheduled"
  },
  { 
    id: 2, 
    name: "Monthly Compliance Report",
    frequency: "Monthly",
    nextDue: "2024-02-05",
    recipient: "SEC Nigeria",
    status: "scheduled"
  },
  { 
    id: 3, 
    name: "Quarterly Performance Review",
    frequency: "Quarterly",
    nextDue: "2024-04-15",
    recipient: "Internal Audit",
    status: "scheduled"
  },
];

export default function MarketMakerReports() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-chart-5" />
            Reports
          </h1>
          <p className="text-muted-foreground">
            Generate liquidity reports and manage exchange submissions
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>Select report type and date range</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select defaultValue="liquidity">
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xml">XML (Regulatory)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Types</CardTitle>
                <CardDescription>Available report templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportTypes.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{type.name}</p>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.format}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          report.status === "ready" 
                            ? "bg-success/10 text-success" 
                            : "bg-primary/10 text-primary"
                        }>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Submissions</CardTitle>
                <CardDescription>Regulatory and exchange submissions</CardDescription>
              </div>
              <Button size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Add Submission
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Submission Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledSubmissions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{sub.frequency}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {sub.nextDue}
                        </div>
                      </TableCell>
                      <TableCell>{sub.recipient}</TableCell>
                      <TableCell>
                        <Badge className="bg-success/10 text-success">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Prepare Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
