/**
 * Risk & Compliance Page - Dealer
 * Monitor exposure limits, regulatory thresholds, and alerts
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  BarChart3,
} from "lucide-react";

export default function DealerRiskCompliance() {
  // Mock risk data
  const exposureLimits = {
    totalExposure: 1200000000,
    maxExposure: 2000000000,
    utilizationPercent: 60,
  };

  const positionLimits = [
    { symbol: 'DANGOTE', currentPosition: 150000, maxPosition: 200000, utilizationPercent: 75 },
    { symbol: 'GTCO', currentPosition: 500000, maxPosition: 750000, utilizationPercent: 67 },
    { symbol: 'MTN', currentPosition: 75000, maxPosition: 100000, utilizationPercent: 75 },
    { symbol: 'ZENITH', currentPosition: 300000, maxPosition: 500000, utilizationPercent: 60 },
  ];

  const alerts = [
    { id: 'a1', type: 'warning', message: 'DANGOTE position approaching 80% limit', time: '10 mins ago' },
    { id: 'a2', type: 'info', message: 'Daily VaR within acceptable range', time: '1 hour ago' },
    { id: 'a3', type: 'success', message: 'Margin requirements met for all positions', time: '2 hours ago' },
  ];

  const regulatoryThresholds = [
    { name: 'Capital Adequacy Ratio', current: 15.5, required: 10, status: 'compliant' },
    { name: 'Liquidity Coverage Ratio', current: 125, required: 100, status: 'compliant' },
    { name: 'Net Stable Funding Ratio', current: 108, required: 100, status: 'compliant' },
    { name: 'Large Exposure Limit', current: 18, required: 25, status: 'compliant' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Risk & Compliance</h1>
          <p className="text-muted-foreground">Monitor exposure limits and regulatory compliance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Alert Settings
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure Limits
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Exposure</span>
            <TrendingUp className="w-5 h-5 text-chart-2" />
          </div>
          <p className="text-3xl font-bold">₦{(exposureLimits.totalExposure / 1000000000).toFixed(2)}B</p>
          <Progress value={exposureLimits.utilizationPercent} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{exposureLimits.utilizationPercent}% of limit</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Available Capacity</span>
            <BarChart3 className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold">₦{((exposureLimits.maxExposure - exposureLimits.totalExposure) / 1000000000).toFixed(2)}B</p>
          <p className="text-xs text-muted-foreground mt-2">{100 - exposureLimits.utilizationPercent}% remaining</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Active Alerts</span>
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold">{alerts.filter(a => a.type === 'warning').length}</p>
          <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Compliance Status</span>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-success">100%</p>
          <p className="text-xs text-muted-foreground mt-2">All thresholds met</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Position Limits */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-4 h-4 text-chart-2" />
            Position Limits
          </h3>

          <div className="space-y-4">
            {positionLimits.map(position => (
              <div key={position.symbol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{position.symbol}</span>
                  <span className="text-sm text-muted-foreground">
                    {position.currentPosition.toLocaleString()} / {position.maxPosition.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={position.utilizationPercent} 
                  className={`h-2 ${position.utilizationPercent > 80 ? '[&>div]:bg-warning' : ''}`}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{position.utilizationPercent}% utilized</span>
                  {position.utilizationPercent > 70 && (
                    <span className="text-warning">Approaching limit</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Regulatory Thresholds */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Regulatory Thresholds
          </h3>

          <div className="space-y-4">
            {regulatoryThresholds.map(threshold => (
              <div key={threshold.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <p className="font-medium">{threshold.name}</p>
                  <p className="text-xs text-muted-foreground">Required: {threshold.required}%</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold">{threshold.current}%</span>
                  <Badge className="bg-success/10 text-success">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Compliant
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4 text-chart-2" />
            Recent Alerts
          </h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>

        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className={`flex items-center gap-4 p-4 rounded-lg ${
              alert.type === 'warning' ? 'bg-warning/10 border border-warning/30' :
              alert.type === 'success' ? 'bg-success/10 border border-success/30' :
              'bg-secondary/30'
            }`}>
              {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning" />}
              {alert.type === 'success' && <CheckCircle2 className="w-5 h-5 text-success" />}
              {alert.type === 'info' && <Bell className="w-5 h-5 text-muted-foreground" />}
              <div className="flex-1">
                <p className="font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
              {alert.type === 'warning' && (
                <Button size="sm" variant="outline">Review</Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
