import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Bell, DollarSign, Shield, Save, User, Zap, AlertTriangle } from "lucide-react";

export default function MarketMakerSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [engineAlerts, setEngineAlerts] = useState(true);
  const [performanceReports, setPerformanceReports] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your market maker account settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="engine">Engine</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Company Profile
              </CardTitle>
              <CardDescription>Update your market maker information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Quantum Market Makers Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mmCode">Market Maker Code</Label>
                  <Input id="mmCode" defaultValue="MM-001" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="trading@quantummm.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 803 456 7890" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" defaultValue="45 Broad Street, Lagos Island, Lagos" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secReg">SEC Registration</Label>
                  <Input id="secReg" defaultValue="SEC/MM/2024/001" />
                </div>
                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge className="bg-chart-2/20 text-chart-2">Active</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Fee Configuration
              </CardTitle>
              <CardDescription>Configure trading fees and rebates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Maker Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="makerRebate">Maker Rebate (%)</Label>
                    <Input id="makerRebate" type="number" step="0.001" defaultValue="0.025" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="takerFee">Taker Fee (%)</Label>
                    <Input id="takerFee" type="number" step="0.001" defaultValue="0.050" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Exchange Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="exchangeFee">Exchange Fee (%)</Label>
                    <Input id="exchangeFee" type="number" step="0.001" defaultValue="0.010" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clearingFee">Clearing Fee (%)</Label>
                    <Input id="clearingFee" type="number" step="0.001" defaultValue="0.005" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Fee Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engine Tab */}
        <TabsContent value="engine">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Engine Configuration
              </CardTitle>
              <CardDescription>Configure quoting engine parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Quote Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="refreshRate">Refresh Rate (ms)</Label>
                    <Input id="refreshRate" type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quoteSize">Default Quote Size</Label>
                    <Input id="quoteSize" type="number" defaultValue="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxQuoteSize">Max Quote Size</Label>
                    <Input id="maxQuoteSize" type="number" defaultValue="100000" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Spread Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="minSpread">Min Spread (%)</Label>
                    <Input id="minSpread" type="number" step="0.01" defaultValue="0.05" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxSpread">Max Spread (%)</Label>
                    <Input id="maxSpread" type="number" step="0.01" defaultValue="0.50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetSpread">Target Spread (%)</Label>
                    <Input id="targetSpread" type="number" step="0.01" defaultValue="0.12" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-chart-4" />
                  Risk Limits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxPosition">Max Position Size (₦)</Label>
                    <Input id="maxPosition" type="number" defaultValue="500000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dailyLoss">Daily Loss Limit (₦)</Label>
                    <Input id="dailyLoss" type="number" defaultValue="50000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="concentration">Concentration Limit (%)</Label>
                    <Input id="concentration" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Engine Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Risk Alerts</p>
                    <p className="text-sm text-muted-foreground">Alerts when risk limits are approached</p>
                  </div>
                  <Switch checked={riskAlerts} onCheckedChange={setRiskAlerts} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Engine Alerts</p>
                    <p className="text-sm text-muted-foreground">Notifications for engine status changes</p>
                  </div>
                  <Switch checked={engineAlerts} onCheckedChange={setEngineAlerts} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Performance Reports</p>
                    <p className="text-sm text-muted-foreground">Daily performance summaries</p>
                  </div>
                  <Switch checked={performanceReports} onCheckedChange={setPerformanceReports} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Status: <Badge className="bg-chart-2/20 text-chart-2 ml-1">Enabled</Badge></p>
                    <p className="text-sm text-muted-foreground mt-1">Using authenticator app</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">API Access</h4>
                <p className="text-sm text-muted-foreground">Manage API keys for algorithmic trading</p>
                <Button variant="outline">Manage API Keys</Button>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Update Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
