import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Landmark, Bell, DollarSign, Shield, Save, User, FileText } from "lucide-react";

export default function IssuingHouseSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [subscriptionAlerts, setSubscriptionAlerts] = useState(true);
  const [investorUpdates, setInvestorUpdates] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your issuing house account settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="documents">Docs</TabsTrigger>
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
              <CardDescription>Update your issuing house information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Capital Trust Issuing House" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ihCode">Issuing House Code</Label>
                  <Input id="ihCode" defaultValue="IH-001" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="offerings@capitaltrust.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 802 345 6789" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" defaultValue="25 Victoria Island, Lagos" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea id="description" rows={3} defaultValue="Leading issuing house specializing in IPOs, rights issues, and private placements across West Africa." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secReg">SEC Registration</Label>
                  <Input id="secReg" defaultValue="SEC/IH/2024/001" />
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
              <CardDescription>Configure offering fees and commissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Standard Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="ipoFee">IPO Commission (%)</Label>
                    <Input id="ipoFee" type="number" step="0.1" defaultValue="2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rightsFee">Rights Issue Fee (%)</Label>
                    <Input id="rightsFee" type="number" step="0.1" defaultValue="2.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bondFee">Bond Issue Fee (%)</Label>
                    <Input id="bondFee" type="number" step="0.1" defaultValue="1.5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Additional Services</h4>
                  <div className="space-y-2">
                    <Label htmlFor="advisoryFee">Advisory Fee (%)</Label>
                    <Input id="advisoryFee" type="number" step="0.1" defaultValue="0.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="underwritingFee">Underwriting Fee (%)</Label>
                    <Input id="underwritingFee" type="number" step="0.1" defaultValue="1.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minFee">Minimum Fee (₦)</Label>
                    <Input id="minFee" type="number" defaultValue="5000000" />
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

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Templates
              </CardTitle>
              <CardDescription>Manage document templates for offerings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Prospectus Template</p>
                    <p className="text-sm text-muted-foreground">Standard IPO prospectus template</p>
                  </div>
                  <Button variant="outline">Edit Template</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Rights Circular</p>
                    <p className="text-sm text-muted-foreground">Rights issue circular template</p>
                  </div>
                  <Button variant="outline">Edit Template</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Investor Communication</p>
                    <p className="text-sm text-muted-foreground">Email templates for investors</p>
                  </div>
                  <Button variant="outline">Edit Template</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Allotment Letter</p>
                    <p className="text-sm text-muted-foreground">Share allotment letter template</p>
                  </div>
                  <Button variant="outline">Edit Template</Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                + Add New Template
              </Button>
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
                    <p className="font-medium">Subscription Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified for new subscriptions</p>
                  </div>
                  <Switch checked={subscriptionAlerts} onCheckedChange={setSubscriptionAlerts} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Investor Updates</p>
                    <p className="text-sm text-muted-foreground">New investor registrations</p>
                  </div>
                  <Switch checked={investorUpdates} onCheckedChange={setInvestorUpdates} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Report</p>
                    <p className="text-sm text-muted-foreground">Weekly offering summary</p>
                  </div>
                  <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
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
