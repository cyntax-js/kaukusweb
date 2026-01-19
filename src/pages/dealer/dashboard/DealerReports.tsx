/**
 * Reports Page - Dealer
 * Position reports and trade history exports
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dealerInventory, dealerRecentTrades } from "@/mocks/rolesDashboardData";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Package,
  ArrowUpRight,
  FileDown,
} from "lucide-react";

export default function DealerReports() {
  // Mock report templates
  const reportTemplates = [
    { id: 'r1', name: 'Daily Position Report', description: 'End-of-day position snapshot', lastGenerated: new Date() },
    { id: 'r2', name: 'Weekly P&L Summary', description: 'Profit and loss breakdown by security', lastGenerated: new Date(Date.now() - 86400000 * 3) },
    { id: 'r3', name: 'Monthly Trade Volume', description: 'Aggregate trading volume and commissions', lastGenerated: new Date(Date.now() - 86400000 * 15) },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate position and trade reports</p>
        </div>
        <Button>
          <FileDown className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Positions</span>
            <Package className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">{dealerInventory.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Portfolio Value</span>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">₦2.4B</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total P&L</span>
            <ArrowUpRight className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-success">+₦52.5M</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Trades</span>
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">2,450</p>
        </Card>
      </div>

      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="positions">Position Reports</TabsTrigger>
          <TabsTrigger value="trades">Trade History</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>

        {/* Position Reports Tab */}
        <TabsContent value="positions">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Current Positions</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b">
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Quantity</th>
                    <th className="pb-3 font-medium">Avg Cost</th>
                    <th className="pb-3 font-medium">Current Price</th>
                    <th className="pb-3 font-medium">Market Value</th>
                    <th className="pb-3 font-medium text-right">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {dealerInventory.map(item => (
                    <tr key={item.symbol} className="border-b border-border/50">
                      <td className="py-4 font-medium">{item.symbol}</td>
                      <td className="py-4">{item.quantity.toLocaleString()}</td>
                      <td className="py-4">₦{item.avgCost.toFixed(2)}</td>
                      <td className="py-4">₦{item.currentPrice.toFixed(2)}</td>
                      <td className="py-4 font-medium">
                        ₦{(item.quantity * item.currentPrice / 1000000).toFixed(2)}M
                      </td>
                      <td className={`py-4 text-right font-medium ${item.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                        <div className="flex items-center justify-end gap-1">
                          {item.pnl >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {item.pnl >= 0 ? '+' : ''}₦{item.pnl.toLocaleString()} ({item.pnlPercent.toFixed(2)}%)
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold">
                    <td className="pt-4">Total</td>
                    <td colSpan={3}></td>
                    <td className="pt-4">₦{(dealerInventory.reduce((sum, i) => sum + i.quantity * i.currentPrice, 0) / 1000000000).toFixed(2)}B</td>
                    <td className="pt-4 text-right text-success">
                      +₦{(dealerInventory.reduce((sum, i) => sum + i.pnl, 0) / 1000000).toFixed(2)}M
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Trade History Tab */}
        <TabsContent value="trades">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Recent Trade History</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Side</th>
                    <th className="pb-3 font-medium">Quantity</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Value</th>
                    <th className="pb-3 font-medium">Counterparty</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dealerRecentTrades.map(trade => (
                    <tr key={trade.id} className="border-b border-border/50">
                      <td className="py-4 text-muted-foreground text-sm">
                        {trade.timestamp.toLocaleTimeString()}
                      </td>
                      <td className="py-4 font-medium">{trade.symbol}</td>
                      <td className="py-4">
                        <Badge variant="outline" className={trade.side === 'buy' ? 'text-success' : 'text-destructive'}>
                          {trade.side.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-4">{trade.quantity.toLocaleString()}</td>
                      <td className="py-4">₦{trade.price.toFixed(2)}</td>
                      <td className="py-4 font-medium">₦{(trade.price * trade.quantity).toLocaleString()}</td>
                      <td className="py-4 text-muted-foreground">{trade.broker}</td>
                      <td className="py-4">
                        <Badge className={
                          trade.status === 'filled' ? 'bg-success/10 text-success' :
                          trade.status === 'partial' ? 'bg-warning/10 text-warning' :
                          'bg-muted text-muted-foreground'
                        }>
                          {trade.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Report Templates Tab */}
        <TabsContent value="templates">
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Report Templates</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map(template => (
                <div key={template.id} className="p-6 rounded-lg border border-border/50 hover:border-chart-2/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-chart-2" />
                  </div>
                  <h4 className="font-semibold mb-2">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Last: {template.lastGenerated.toLocaleDateString()}
                    </span>
                    <Button size="sm">Generate</Button>
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
