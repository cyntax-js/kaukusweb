import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building2, Bell, DollarSign, Shield, Save, User } from "lucide-react";

export default function DealerSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [tradeAlerts, setTradeAlerts] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your dealer account settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
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
              <CardDescription>Update your company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Alpha Dealer Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealerCode">Dealer Code</Label>
                  <Input id="dealerCode" defaultValue="DLR-001" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="contact@alphadealer.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 801 234 5678" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" defaultValue="123 Marina Street, Lagos Island, Lagos" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regNumber">SEC Registration Number</Label>
                  <Input id="regNumber" defaultValue="SEC/DLR/2024/001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Account Status</Label>
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
              <CardDescription>Configure trading fees and commissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Trading Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="buyFee">Buy Commission (%)</Label>
                    <Input id="buyFee" type="number" step="0.01" defaultValue="0.50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellFee">Sell Commission (%)</Label>
                    <Input id="sellFee" type="number" step="0.01" defaultValue="0.50" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Broker Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="brokerSpread">Broker Spread (%)</Label>
                    <Input id="brokerSpread" type="number" step="0.01" defaultValue="0.10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minFee">Minimum Fee (₦)</Label>
                    <Input id="minFee" type="number" defaultValue="500" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Fee Tiers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Standard</p>
                    <p className="text-xl font-bold">0.50%</p>
                    <p className="text-xs text-muted-foreground">Up to ₦10M volume</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Premium</p>
                    <p className="text-xl font-bold">0.35%</p>
                    <p className="text-xs text-muted-foreground">₦10M - ₦100M volume</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Enterprise</p>
                    <p className="text-xl font-bold">0.20%</p>
                    <p className="text-xs text-muted-foreground">Above ₦100M volume</p>
                  </Card>
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
                    <p className="font-medium">Trade Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified for trade executions</p>
                  </div>
                  <Switch checked={tradeAlerts} onCheckedChange={setTradeAlerts} />
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
                    <p className="font-medium">Daily Digest</p>
                    <p className="text-sm text-muted-foreground">Summary of daily activity</p>
                  </div>
                  <Switch checked={dailyDigest} onCheckedChange={setDailyDigest} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alertEmail">Alert Email Address</Label>
                <Input id="alertEmail" type="email" defaultValue="alerts@alphadealer.com" />
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
                <h4 className="font-medium">API Keys</h4>
                <p className="text-sm text-muted-foreground">Manage API access for integrations</p>
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
