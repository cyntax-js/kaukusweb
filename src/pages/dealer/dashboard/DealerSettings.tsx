/**
 * Dealer Settings Page
 *
 * Configuration options for trading preferences, notifications, and API access.
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Bell,
  Coins,
  Shield,
  Save,
  User,
  Key,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DealerSettings() {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [tradeAlerts, setTradeAlerts] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [settlementAlerts, setSettlementAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);

  // Trading preferences
  const [tradingSettings, setTradingSettings] = useState({
    defaultOrderType: "limit",
    autoConfirm: false,
    maxOrderSize: "100000000",
    tradingHoursStart: "09:30",
    tradingHoursEnd: "14:30",
    autoSettlement: true,
  });

  // Mock API credentials
  const apiCredentials = {
    apiKey: "dlr_live_pQ8rS4tU6vW2xY0zA",
    secretKey: "sk_live_3iK5mO7qS9uW1yA3cE5gI7kM9oQ1sU3w",
    webhookUrl: "https://api.contisex.ng/webhooks/dealer/def456",
    lastRotated: "2024-01-08",
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
          <Building2 className="w-6 h-6 text-chart-2" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your dealer account settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
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
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contact@alphadealer.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 801 234 5678" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  defaultValue="123 Marina Street, Lagos Island, Lagos"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regNumber">SEC Registration Number</Label>
                  <Input id="regNumber" defaultValue="SEC/DLR/2024/001" />
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

        {/* Trading Preferences Tab */}
        <TabsContent value="trading">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trading Preferences
              </CardTitle>
              <CardDescription>
                Configure your trading behavior and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Order Type</Label>
                  <Select
                    value={tradingSettings.defaultOrderType}
                    onValueChange={(value) =>
                      setTradingSettings({
                        ...tradingSettings,
                        defaultOrderType: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                      <SelectItem value="stop">Stop Order</SelectItem>
                      <SelectItem value="stop-limit">
                        Stop-Limit Order
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxOrderSize">Maximum Order Size (₦)</Label>
                  <Input
                    id="maxOrderSize"
                    type="number"
                    value={tradingSettings.maxOrderSize}
                    onChange={(e) =>
                      setTradingSettings({
                        ...tradingSettings,
                        maxOrderSize: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tradingHoursStart">Trading Hours Start</Label>
                  <Input
                    id="tradingHoursStart"
                    type="time"
                    value={tradingSettings.tradingHoursStart}
                    onChange={(e) =>
                      setTradingSettings({
                        ...tradingSettings,
                        tradingHoursStart: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tradingHoursEnd">Trading Hours End</Label>
                  <Input
                    id="tradingHoursEnd"
                    type="time"
                    value={tradingSettings.tradingHoursEnd}
                    onChange={(e) =>
                      setTradingSettings({
                        ...tradingSettings,
                        tradingHoursEnd: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Automation</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Confirm Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Skip confirmation dialog for orders under limit
                      </p>
                    </div>
                    <Switch
                      checked={tradingSettings.autoConfirm}
                      onCheckedChange={(checked) =>
                        setTradingSettings({
                          ...tradingSettings,
                          autoConfirm: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Settlement</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically settle trades at T+2
                      </p>
                    </div>
                    <Switch
                      checked={tradingSettings.autoSettlement}
                      onCheckedChange={(checked) =>
                        setTradingSettings({
                          ...tradingSettings,
                          autoSettlement: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("trading preferences")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Trading Settings
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
                Configure trading fees and commissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Trading Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="buyFee">Buy Commission (%)</Label>
                    <Input
                      id="buyFee"
                      type="number"
                      step="0.01"
                      defaultValue="0.50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellFee">Sell Commission (%)</Label>
                    <Input
                      id="sellFee"
                      type="number"
                      step="0.01"
                      defaultValue="0.50"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Broker Fees</h4>
                  <div className="space-y-2">
                    <Label htmlFor="brokerSpread">Broker Spread (%)</Label>
                    <Input
                      id="brokerSpread"
                      type="number"
                      step="0.01"
                      defaultValue="0.10"
                    />
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
                    <p className="text-xs text-muted-foreground">
                      Up to ₦10M volume
                    </p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Premium</p>
                    <p className="text-xl font-bold">0.35%</p>
                    <p className="text-xs text-muted-foreground">
                      ₦10M - ₦100M volume
                    </p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Enterprise</p>
                    <p className="text-xl font-bold">0.20%</p>
                    <p className="text-xs text-muted-foreground">
                      Above ₦100M volume
                    </p>
                  </Card>
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
                      <Label>Trade Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified for trade executions
                      </p>
                    </div>
                    <Switch
                      checked={tradeAlerts}
                      onCheckedChange={setTradeAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Risk Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Alerts when risk limits are approached
                      </p>
                    </div>
                    <Switch
                      checked={riskAlerts}
                      onCheckedChange={setRiskAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Settlement Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications for settlement status
                      </p>
                    </div>
                    <Switch
                      checked={settlementAlerts}
                      onCheckedChange={setSettlementAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Summary of daily activity
                      </p>
                    </div>
                    <Switch
                      checked={dailyDigest}
                      onCheckedChange={setDailyDigest}
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

              <div className="space-y-2">
                <Label htmlFor="alertEmail">Alert Email Address</Label>
                <Input
                  id="alertEmail"
                  type="email"
                  defaultValue="alerts@alphadealer.com"
                />
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
                  Your API keys for programmatic access to the dealer platform
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
                  Receive real-time updates for trades and settlements
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
                      trade.executed
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      order.placed
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      settlement.completed
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      inventory.updated
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
                  <Select defaultValue="1000">
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
