/**
 * Regulatory Filings Page - Issuing House
 * Manage prospectus uploads, amendments, and post-offer reports
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  Calendar,
  Building2,
} from "lucide-react";

export default function RegulatoryFilings() {
  // Mock filing data
  const prospectusFiles = [
    { id: 'p1', name: 'TechCorp Nigeria IPO Prospectus', status: 'approved', uploadedAt: new Date('2024-12-15'), approvedAt: new Date('2024-12-20') },
    { id: 'p2', name: 'Energy Corp Bond Offering Document', status: 'pending', uploadedAt: new Date('2025-01-05'), approvedAt: null },
  ];

  const amendments = [
    { id: 'a1', offer: 'TechCorp Nigeria IPO', type: 'Price Amendment', status: 'approved', filedAt: new Date('2025-01-02') },
    { id: 'a2', offer: 'Energy Corp Bond', type: 'Terms Amendment', status: 'pending', filedAt: new Date('2025-01-10') },
  ];

  const postOfferReports = [
    { id: 'r1', offer: 'FirstBank Rights Issue', type: 'Final Allotment Report', status: 'submitted', submittedAt: new Date('2025-01-16') },
    { id: 'r2', offer: 'FirstBank Rights Issue', type: 'Listing Report', status: 'pending', submittedAt: null },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
      case 'submitted':
        return <Badge className="bg-success/10 text-success">{status}</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning">{status}</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive/10 text-destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Regulatory Filings</h1>
        <p className="text-muted-foreground">Manage regulatory documents and compliance filings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Filings</span>
            <FileText className="w-5 h-5 text-chart-4" />
          </div>
          <p className="text-3xl font-bold">{prospectusFiles.length + amendments.length + postOfferReports.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Approved</span>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">4</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Pending Review</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">3</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Action Required</span>
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-3xl font-bold">1</p>
        </Card>
      </div>

      <Tabs defaultValue="prospectus" className="space-y-4">
        <TabsList>
          <TabsTrigger value="prospectus">Prospectus</TabsTrigger>
          <TabsTrigger value="amendments">Amendments</TabsTrigger>
          <TabsTrigger value="reports">Post-Offer Reports</TabsTrigger>
        </TabsList>

        {/* Prospectus Tab */}
        <TabsContent value="prospectus" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Prospectus Documents</h3>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
            </div>

            <div className="space-y-4">
              {prospectusFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-chart-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        Uploaded: {file.uploadedAt.toLocaleDateString()}
                        {file.approvedAt && (
                          <span>• Approved: {file.approvedAt.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(file.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Amendments Tab */}
        <TabsContent value="amendments" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Filed Amendments</h3>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                File Amendment
              </Button>
            </div>

            <div className="space-y-4">
              {amendments.map(amendment => (
                <div key={amendment.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-medium">{amendment.type}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {amendment.offer}
                        <span>• Filed: {amendment.filedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(amendment.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Post-Offer Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Post-Offer Reports</h3>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>

            <div className="space-y-4">
              {postOfferReports.map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.type}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {report.offer}
                        {report.submittedAt && (
                          <span>• Submitted: {report.submittedAt.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(report.status)}
                    {report.status === 'pending' ? (
                      <Button size="sm">Submit</Button>
                    ) : (
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
