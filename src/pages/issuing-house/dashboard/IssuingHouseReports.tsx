/**
 * Reports Page - Issuing House
 * Capital raised reports, offer performance, and regulator-ready exports
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  TrendingUp,
  BarChart3,
  Calendar,
  Building2,
  DollarSign,
  Users,
  ArrowUpRight,
  FileDown,
} from "lucide-react";

export default function IssuingHouseReports() {
  // Mock report data
  const capitalReports = [
    { id: 'cr1', name: 'Q4 2024 Capital Raised Summary', period: 'Q4 2024', totalRaised: 3500000000, offerings: 4 },
    { id: 'cr2', name: 'Annual Capital Report 2024', period: 'FY 2024', totalRaised: 12800000000, offerings: 15 },
  ];

  const performanceReports = [
    { id: 'pr1', offer: 'TechCorp Nigeria IPO', subscriptionRate: 92.5, status: 'active' },
    { id: 'pr2', offer: 'FirstBank Rights Issue', subscriptionRate: 100, status: 'completed' },
    { id: 'pr3', offer: 'Energy Corp Bond', subscriptionRate: 70, status: 'active' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and export reports for stakeholders and regulators</p>
        </div>
        <Button>
          <FileDown className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Raised YTD</span>
            <DollarSign className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">₦5.2B</p>
          <div className="flex items-center mt-2 text-xs text-success">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +45% vs last year
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Successful Offers</span>
            <TrendingUp className="w-5 h-5 text-chart-4" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-xs text-muted-foreground mt-2">94% success rate</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Investors</span>
            <Users className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">1,240</p>
          <div className="flex items-center mt-2 text-xs text-success">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +180 this quarter
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Reports Generated</span>
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">28</p>
          <p className="text-xs text-muted-foreground mt-2">this month</p>
        </Card>
      </div>

      <Tabs defaultValue="capital" className="space-y-4">
        <TabsList>
          <TabsTrigger value="capital">Capital Raised</TabsTrigger>
          <TabsTrigger value="performance">Offer Performance</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory Exports</TabsTrigger>
        </TabsList>

        {/* Capital Raised Tab */}
        <TabsContent value="capital" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Capital Raised Reports</h3>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Custom Date Range
              </Button>
            </div>

            <div className="space-y-4">
              {capitalReports.map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.offerings} offerings • ₦{(report.totalRaised / 1000000000).toFixed(1)}B raised
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{report.period}</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Offer Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Offer Performance Summary</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b">
                    <th className="pb-3 font-medium">Offer</th>
                    <th className="pb-3 font-medium">Subscription Rate</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceReports.map(report => (
                    <tr key={report.id} className="border-b border-border/50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{report.offer}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${Math.min(report.subscriptionRate, 100)}%` }} 
                            />
                          </div>
                          <span className="text-sm font-medium">{report.subscriptionRate}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant={report.status === 'completed' ? 'secondary' : 'default'}>
                          {report.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Regulatory Exports Tab */}
        <TabsContent value="regulatory" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Regulator-Ready Exports</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-chart-4" />
                </div>
                <h4 className="font-semibold mb-2">SEC Quarterly Report</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive report formatted for Securities and Exchange Commission submission
                </p>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              <div className="p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-chart-2" />
                </div>
                <h4 className="font-semibold mb-2">Exchange Compliance Report</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Listing compliance and post-offer obligations report for stock exchange
                </p>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              <div className="p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <h4 className="font-semibold mb-2">Investor Distribution Report</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed breakdown of investor types, allocations, and geographic distribution
                </p>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              <div className="p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <h4 className="font-semibold mb-2">Capital Market Activity Report</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Summary of all capital market activities and performance metrics
                </p>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
