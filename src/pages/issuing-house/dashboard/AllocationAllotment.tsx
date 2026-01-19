/**
 * Allocation & Allotment Page - Issuing House
 * Manage allotment rules, pro-rata calculations, and final allocation approval
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activeOfferings } from "@/mocks/rolesDashboardData";
import {
  Calculator,
  CheckCircle2,
  Clock,
  FileCheck,
  Settings,
  Users,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function AllocationAllotment() {
  const [selectedOffer, setSelectedOffer] = useState(activeOfferings[0]?.id || '');

  // Mock allotment data
  const allotmentRules = [
    { id: '1', name: 'Retail Priority', description: 'First 30% reserved for retail investors', status: 'active' },
    { id: '2', name: 'Pro-rata Distribution', description: 'Remaining allocated proportionally to subscription', status: 'active' },
    { id: '3', name: 'Minimum Allocation', description: 'Minimum 100 units per investor', status: 'active' },
  ];

  const pendingAllocations = [
    { id: 'pa1', offer: 'TechCorp Nigeria IPO', investors: 456, totalAmount: 1850000000, status: 'pending_approval' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Allocation & Allotment</h1>
        <p className="text-muted-foreground">Manage allotment rules and approve allocations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Pending Approvals</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">{pendingAllocations.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Active Rules</span>
            <Settings className="w-5 h-5 text-chart-4" />
          </div>
          <p className="text-3xl font-bold">{allotmentRules.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Completed Allotments</span>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">12</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Allocated</span>
            <FileCheck className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">₦8.5B</p>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Allotment Rules</TabsTrigger>
          <TabsTrigger value="prorata">Pro-rata Calculator</TabsTrigger>
          <TabsTrigger value="approval">Final Approval</TabsTrigger>
        </TabsList>

        {/* Allotment Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Active Allotment Rules</h3>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure Rules
              </Button>
            </div>

            <div className="space-y-4">
              {allotmentRules.map((rule, index) => (
                <div key={rule.id} className="flex items-center gap-4 p-4 rounded-lg border border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{rule.name}</h4>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                  <Badge variant="outline" className="text-success">
                    {rule.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Pro-rata Calculator Tab */}
        <TabsContent value="prorata" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-chart-4" />
              <h3 className="font-semibold">Pro-rata Distribution Calculator</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Offering</label>
                  <select 
                    className="w-full p-2 rounded-md border border-input bg-background"
                    value={selectedOffer}
                    onChange={(e) => setSelectedOffer(e.target.value)}
                  >
                    {activeOfferings.map(offer => (
                      <option key={offer.id} value={offer.id}>{offer.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Total Subscribed Amount</label>
                  <Input value="₦1,850,000,000" disabled />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Available Units</label>
                  <Input value="2,000,000,000" disabled />
                </div>

                <Button className="w-full">
                  Calculate Allocation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-secondary/30">
                <h4 className="font-medium mb-4">Calculation Preview</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subscription Ratio</span>
                    <span className="font-medium">92.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pro-rata Factor</span>
                    <span className="font-medium">1.00x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Allocation per ₦1M</span>
                    <span className="font-medium">₦1,000,000</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Full allocation possible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Final Approval Tab */}
        <TabsContent value="approval" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Pending Allocation Approvals</h3>
              <Badge variant="outline" className="text-warning">
                <AlertCircle className="w-3 h-3 mr-1" />
                {pendingAllocations.length} Pending
              </Badge>
            </div>

            {pendingAllocations.length > 0 ? (
              <div className="space-y-4">
                {pendingAllocations.map(allocation => (
                  <div key={allocation.id} className="p-6 rounded-lg border border-warning/50 bg-warning/5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{allocation.offer}</h4>
                        <p className="text-sm text-muted-foreground">
                          {allocation.investors} investors • ₦{(allocation.totalAmount / 1000000000).toFixed(2)}B total
                        </p>
                      </div>
                      <Badge variant="outline">Pending Approval</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="p-3 rounded bg-background">
                        <p className="text-muted-foreground">Institutional</p>
                        <p className="font-semibold">₦1.15B (62%)</p>
                      </div>
                      <div className="p-3 rounded bg-background">
                        <p className="text-muted-foreground">Retail</p>
                        <p className="font-semibold">₦540M (29%)</p>
                      </div>
                      <div className="p-3 rounded bg-background">
                        <p className="text-muted-foreground">HNWI</p>
                        <p className="font-semibold">₦160M (9%)</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve Allocation
                      </Button>
                      <Button variant="outline">Review Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold mb-2">All Caught Up!</h3>
                <p className="text-sm text-muted-foreground">No pending allocations to approve</p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
