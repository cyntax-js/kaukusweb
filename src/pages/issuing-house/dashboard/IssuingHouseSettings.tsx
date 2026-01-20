/**
 * Issuing House Settings Page
 *
 * Configuration options for offering preferences, notifications, and API access.
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Landmark,
  Bell,
  Coins,
  Shield,
  Save,
  User,
  FileText,
  Key,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Settings2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function IssuingHouseSettings() {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [subscriptionAlerts, setSubscriptionAlerts] = useState(true);
  const [investorUpdates, setInvestorUpdates] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [regulatoryAlerts, setRegulatoryAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);

  // Offering preferences
  const [offeringSettings, setOfferingSettings] = useState({
    defaultAllocationMethod: "pro-rata",
    minSubscription: "10000",
    autoCloseOversubscribed: true,
    investorKycRequired: true,
    autoSendAllotmentLetters: true,
  });

  // Mock API credentials
  const apiCredentials = {
    apiKey: "ih_live_aB2cD4eF6gH8iJ0kL",
    secretKey: "sk_live_1mN3oP5qR7sT9uV1wX3yZ5aB7cD9eF1g",
    webhookUrl: "https://api.contisex.ng/webhooks/issuing-house/ghi789",
    lastRotated: "2024-01-05",
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard.`,
    });
  };

  const handleRotateKey = () => {
    toast({
      title: "Key Rotation Initiated",
      description:
        "Your new API keys will be generated. Please save them securely.",
      variant: "destructive",
    });
  };

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Landmark className="w-6 h-6 text-chart-4" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your issuing house account settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-3xl grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="offerings">Offerings</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="documents">Docs</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
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
              <CardDescription>
                Update your issuing house information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    defaultValue="Capital Trust Issuing House"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ihCode">Issuing House Code</Label>
                  <Input id="ihCode" defaultValue="IH-001" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="offerings@capitaltrust.com"
                  />
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
                <Textarea
                  id="description"
                  rows={3}
                  defaultValue="Leading issuing house specializing in IPOs, rights issues, and private placements across West Africa."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secReg">SEC Registration</Label>
                  <Input id="secReg" defaultValue="SEC/IH/2024/001" />
                </div>
                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge className="bg-success/10 text-success">Active</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={() => handleSave("profile")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offering Preferences Tab */}
        <TabsContent value="offerings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="w-5 h-5" />
                Offering Preferences
              </CardTitle>
              <CardDescription>
                Configure default settings for new offerings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Allocation Method</Label>
                  <Select
                    value={offeringSettings.defaultAllocationMethod}
                    onValueChange={(value) =>
                      setOfferingSettings({
                        ...offeringSettings,
                        defaultAllocationMethod: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pro-rata">Pro-Rata</SelectItem>
                      <SelectItem value="first-come">
                        First Come First Served
                      </SelectItem>
                      <SelectItem value="lottery">Lottery</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minSubscription">
                    Minimum Subscription (₦)
                  </Label>
                  <Input
                    id="minSubscription"
                    type="number"
                    value={offeringSettings.minSubscription}
                    onChange={(e) =>
                      setOfferingSettings({
                        ...offeringSettings,
                        minSubscription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Automation Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Close When Oversubscribed</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically close offer when target is exceeded
                      </p>
                    </div>
                    <Switch
                      checked={offeringSettings.autoCloseOversubscribed}
                      onCheckedChange={(checked) =>
                        setOfferingSettings({
                          ...offeringSettings,
                          autoCloseOversubscribed: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Investor KYC</Label>
                      <p className="text-sm text-muted-foreground">
                        Mandate KYC verification before subscription
                      </p>
                    </div>
                    <Switch
                      checked={offeringSettings.investorKycRequired}
                      onCheckedChange={(checked) =>
                        setOfferingSettings({
                          ...offeringSettings,
                          investorKycRequired: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Send Allotment Letters</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically email allotment letters to investors
                      </p>
                    </div>
                    <Switch
                      checked={offeringSettings.autoSendAllotmentLetters}
                      onCheckedChange={(checked) =>
                        setOfferingSettings({
                          ...offeringSettings,
                          autoSendAllotmentLetters: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("offering preferences")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Offering Settings
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
                <Coins className="w-5 h-5" />
                Fee Configuration
              </CardTitle>
              <CardDescription>
                Configure offering fees and commissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Standard Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="ipoFee">IPO Commission (%)</Label>
                    <Input
                      id="ipoFee"
                      type="number"
                      step="0.1"
                      defaultValue="2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rightsFee">Rights Issue Fee (%)</Label>
                    <Input
                      id="rightsFee"
                      type="number"
                      step="0.1"
                      defaultValue="2.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bondFee">Bond Issue Fee (%)</Label>
                    <Input
                      id="bondFee"
                      type="number"
                      step="0.1"
                      defaultValue="1.5"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Additional Services</h4>
                  <div className="space-y-2">
                    <Label htmlFor="advisoryFee">Advisory Fee (%)</Label>
                    <Input
                      id="advisoryFee"
                      type="number"
                      step="0.1"
                      defaultValue="0.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="underwritingFee">
                      Underwriting Fee (%)
                    </Label>
                    <Input
                      id="underwritingFee"
                      type="number"
                      step="0.1"
                      defaultValue="1.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minFee">Minimum Fee (₦)</Label>
                    <Input id="minFee" type="number" defaultValue="5000000" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("fee")}>
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
              <CardDescription>
                Manage document templates for offerings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Prospectus Template</p>
                    <p className="text-sm text-muted-foreground">
                      Standard IPO prospectus template
                    </p>
                  </div>
                  <Button variant="outline">Edit Template</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Rights Circular</p>
                    <p className="text-sm text-muted-foreground">
                      Rights issue circular template
                    </p>
                  </div>
                  <Button variant="outline">Edit Template</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Investor Communication</p>
                    <p className="text-sm text-muted-foreground">
                      Email templates for investors
                    </p>
                  </div>
                  <Button variant="outline">Edit Template</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Allotment Letter</p>
                    <p className="text-sm text-muted-foreground">
                      Share allotment letter template
                    </p>
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
              <CardDescription>
                Configure how you receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Alert Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Subscription Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified for new subscriptions
                      </p>
                    </div>
                    <Switch
                      checked={subscriptionAlerts}
                      onCheckedChange={setSubscriptionAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Investor Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        New investor registrations
                      </p>
                    </div>
                    <Switch
                      checked={investorUpdates}
                      onCheckedChange={setInvestorUpdates}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Regulatory Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        SEC and regulatory notifications
                      </p>
                    </div>
                    <Switch
                      checked={regulatoryAlerts}
                      onCheckedChange={setRegulatoryAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly offering summary
                      </p>
                    </div>
                    <Switch
                      checked={weeklyReport}
                      onCheckedChange={setWeeklyReport}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Browser push notifications
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Critical alerts via SMS
                      </p>
                    </div>
                    <Switch
                      checked={smsAlerts}
                      onCheckedChange={setSmsAlerts}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("notification")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Access Tab */}
        <TabsContent value="api">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Credentials
                </CardTitle>
                <CardDescription>
                  Your API keys for programmatic access to the issuing house
                  platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-warning">
                      Keep your keys secure
                    </p>
                    <p className="text-muted-foreground">
                      Never share your secret key. If compromised, rotate
                      immediately.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value={apiCredentials.apiKey}
                          readOnly
                          className="pr-10 font-mono"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleCopyToClipboard(
                            apiCredentials.apiKey,
                            "API Key"
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secret Key</Label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          type={showSecretKey ? "text" : "password"}
                          value={apiCredentials.secretKey}
                          readOnly
                          className="pr-10 font-mono"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                          onClick={() => setShowSecretKey(!showSecretKey)}
                        >
                          {showSecretKey ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleCopyToClipboard(
                            apiCredentials.secretKey,
                            "Secret Key"
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-muted-foreground">
                      Last rotated: {apiCredentials.lastRotated}
                    </div>
                    <Button variant="outline" onClick={handleRotateKey}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Rotate Keys
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>
                  Receive real-time updates for subscriptions and offering
                  events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={apiCredentials.webhookUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleCopyToClipboard(
                          apiCredentials.webhookUrl,
                          "Webhook URL"
                        )
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Subscribed Events</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      subscription.received
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      offer.opened
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      offer.closed
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      allotment.completed
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      investor.registered
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full md:w-auto">
                  Configure Webhooks
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  API Security
                </CardTitle>
                <CardDescription>
                  Additional security settings for API access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>IP Whitelist</Label>
                  <Input placeholder="Enter IP addresses (comma-separated)" />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to allow all IPs (not recommended for
                    production)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Rate Limit</Label>
                  <Select defaultValue="500">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 requests/min</SelectItem>
                      <SelectItem value="500">500 requests/min</SelectItem>
                      <SelectItem value="1000">1,000 requests/min</SelectItem>
                      <SelectItem value="5000">5,000 requests/min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={() => handleSave("API security")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
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
                    <p className="text-sm">
                      Status:{" "}
                      <Badge className="bg-success/10 text-success ml-1">
                        Enabled
                      </Badge>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Using authenticator app
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Session Management</h4>
                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("security")}>
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
