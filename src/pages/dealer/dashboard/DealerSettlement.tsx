/**
 * Settlement & Clearing Page - Dealer
 * Trade confirmations and settlement status tracking
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function DealerSettlement() {
  // Mock settlement data
  const pendingSettlements = [
    { id: 's1', tradeId: 'TRD-001234', symbol: 'DANGOTE', side: 'buy', quantity: 10000, value: 2455000, settlementDate: new Date(Date.now() + 86400000 * 2), status: 'pending' },
    { id: 's2', tradeId: 'TRD-001235', symbol: 'GTCO', side: 'sell', quantity: 25000, value: 1057500, settlementDate: new Date(Date.now() + 86400000 * 2), status: 'pending' },
  ];

  const completedSettlements = [
    { id: 's3', tradeId: 'TRD-001230', symbol: 'MTN', side: 'buy', quantity: 5000, value: 975000, settlementDate: new Date(Date.now() - 86400000), status: 'settled' },
    { id: 's4', tradeId: 'TRD-001229', symbol: 'ZENITH', side: 'sell', quantity: 15000, value: 581250, settlementDate: new Date(Date.now() - 86400000 * 2), status: 'settled' },
  ];

  const tradeConfirmations = [
    { id: 'tc1', tradeId: 'TRD-001234', counterparty: 'Alpha Securities', confirmed: true, timestamp: new Date() },
    { id: 'tc2', tradeId: 'TRD-001235', counterparty: 'Beta Investments', confirmed: true, timestamp: new Date(Date.now() - 3600000) },
    { id: 'tc3', tradeId: 'TRD-001236', counterparty: 'Gamma Trading', confirmed: false, timestamp: new Date(Date.now() - 7200000) },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settlement & Clearing</h1>
        <p className="text-muted-foreground">Track trade confirmations and settlement status</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Pending Settlements</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">{pendingSettlements.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Due within T+2</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Pending Value</span>
            <AlertTriangle className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">₦{(pendingSettlements.reduce((sum, s) => sum + s.value, 0) / 1000000).toFixed(2)}M</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Confirmed Trades</span>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">{tradeConfirmations.filter(t => t.confirmed).length}</p>
          <p className="text-xs text-muted-foreground mt-2">of {tradeConfirmations.length} total</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Settled Today</span>
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-xs text-muted-foreground mt-2">₦45.2M value</p>
        </Card>
      </div>

      <Tabs defaultValue="confirmations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="confirmations">Trade Confirmations</TabsTrigger>
          <TabsTrigger value="pending">Pending Settlements</TabsTrigger>
          <TabsTrigger value="completed">Completed Settlements</TabsTrigger>
        </TabsList>

        {/* Trade Confirmations Tab */}
        <TabsContent value="confirmations">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Trade Confirmations</h3>

            <div className="space-y-3">
              {tradeConfirmations.map(confirmation => (
                <div key={confirmation.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                  confirmation.confirmed ? 'border-success/30 bg-success/5' : 'border-warning/30 bg-warning/5'
                }`}>
                  <div className="flex items-center gap-4">
                    {confirmation.confirmed ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Clock className="w-5 h-5 text-warning" />
                    )}
                    <div>
                      <p className="font-medium">{confirmation.tradeId}</p>
                      <p className="text-sm text-muted-foreground">Counterparty: {confirmation.counterparty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {confirmation.timestamp.toLocaleTimeString()}
                    </span>
                    <Badge variant={confirmation.confirmed ? 'default' : 'outline'}>
                      {confirmation.confirmed ? 'Confirmed' : 'Awaiting'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Pending Settlements Tab */}
        <TabsContent value="pending">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Pending Settlements</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b">
                    <th className="pb-3 font-medium">Trade ID</th>
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Side</th>
                    <th className="pb-3 font-medium">Quantity</th>
                    <th className="pb-3 font-medium">Value</th>
                    <th className="pb-3 font-medium">Settlement Date</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSettlements.map(settlement => (
                    <tr key={settlement.id} className="border-b border-border/50">
                      <td className="py-4 font-medium">{settlement.tradeId}</td>
                      <td className="py-4">{settlement.symbol}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1">
                          {settlement.side === 'buy' ? (
                            <ArrowUpRight className="w-4 h-4 text-success" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-destructive" />
                          )}
                          {settlement.side.toUpperCase()}
                        </div>
                      </td>
                      <td className="py-4">{settlement.quantity.toLocaleString()}</td>
                      <td className="py-4 font-medium">₦{settlement.value.toLocaleString()}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {settlement.settlementDate.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge className="bg-warning/10 text-warning">Pending</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Completed Settlements Tab */}
        <TabsContent value="completed">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Completed Settlements</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b">
                    <th className="pb-3 font-medium">Trade ID</th>
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Side</th>
                    <th className="pb-3 font-medium">Quantity</th>
                    <th className="pb-3 font-medium">Value</th>
                    <th className="pb-3 font-medium">Settlement Date</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {completedSettlements.map(settlement => (
                    <tr key={settlement.id} className="border-b border-border/50">
                      <td className="py-4 font-medium">{settlement.tradeId}</td>
                      <td className="py-4">{settlement.symbol}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1">
                          {settlement.side === 'buy' ? (
                            <ArrowUpRight className="w-4 h-4 text-success" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-destructive" />
                          )}
                          {settlement.side.toUpperCase()}
                        </div>
                      </td>
                      <td className="py-4">{settlement.quantity.toLocaleString()}</td>
                      <td className="py-4 font-medium">₦{settlement.value.toLocaleString()}</td>
                      <td className="py-4 text-muted-foreground">
                        {settlement.settlementDate.toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <Badge className="bg-success/10 text-success">Settled</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
