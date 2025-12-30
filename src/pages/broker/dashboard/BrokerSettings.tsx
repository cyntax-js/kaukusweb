import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useBrokerStore } from "@/stores/brokerStore";
import { useBrokerDeploymentStore } from "@/stores/brokerDeploymentStore";
import { 
  Settings, Globe, Bell, Shield, Save, Building2, Mail, 
  Lock, Key, Webhook, AlertTriangle, CheckCircle, ExternalLink, Palette 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BrokerSettings() {
  const { toast } = useToast();
  const { application } = useBrokerStore();
  const { config, isDeployed, getPreviewUrl } = useBrokerDeploymentStore();
  const [isSaving, setIsSaving] = useState(false);

  const platformUrl = getPreviewUrl();
  const platformLabel = (() => {
    try {
      const u = new URL(platformUrl);
      return `${u.host}${u.pathname}${u.search}`;
    } catch {
      return platformUrl;
    }
  })();

  const [generalSettings, setGeneralSettings] = useState({
    companyName: application?.companyName || "My Broker",
    legalName: application?.companyName || "My Broker Inc.",
    contactEmail: application?.contactEmail || "",
    supportEmail: "support@mybroker.com",
    phone: "+1 (555) 123-4567",
    address: "123 Financial District, New York, NY 10004",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    tradeAlerts: true,
    userRegistrations: true,
    largeDeposits: true,
    securityAlerts: true,
    marketingUpdates: false,
    weeklyDigest: true,
    instantAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    require2FA: true,
    sessionTimeout: 30,
    ipWhitelist: false,
    loginAttempts: 5,
    passwordExpiry: 90,
    auditLogging: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    webhookUrl: "",
    apiRateLimit: 1000,
    sandboxMode: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({ title: "Settings Saved", description: "Your settings have been updated successfully." });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your broker platform settings</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" /> {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Platform Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isDeployed ? (
              <>
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Platform Status</span>
                    <Badge className="bg-success/10 text-success">Live</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your platform is live at {platformLabel}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Platform Status</span>
                    <Badge variant="outline">Not Deployed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete the deployment wizard to go live
                  </p>
                </div>
              </>
            )}
          </div>
          {isDeployed && (
            <Button variant="outline" size="sm" asChild>
              <a href={platformUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Platform
              </a>
            </Button>
          )}
        </div>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="domain" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Domain</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Webhook className="w-4 h-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">Company Information</h2>
                <p className="text-sm text-muted-foreground">Basic business details</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Display Name</Label>
                <Input id="companyName" value={generalSettings.companyName} onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legalName">Legal Name</Label>
                <Input id="legalName" value={generalSettings.legalName} onChange={(e) => setGeneralSettings({ ...generalSettings, legalName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" value={generalSettings.contactEmail} onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input id="supportEmail" type="email" value={generalSettings.supportEmail} onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={generalSettings.phone} onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea id="address" value={generalSettings.address} onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })} rows={2} />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">Domain Settings</h2>
                <p className="text-sm text-muted-foreground">Configure your platform domain</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Kaukus Subdomain</div>
                    <div className="text-sm text-muted-foreground">
                      {config.subdomain ? platformLabel : "Not configured"}
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success">Active</Badge>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-dashed">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Custom Domain</div>
                    <div className="text-sm text-muted-foreground">Connect your own domain</div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold">Theme & Branding</h2>
                <p className="text-sm text-muted-foreground">Customize your platform appearance</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-2">Primary Color</div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: config.theme?.colors?.primary || '#6366f1' }} />
                  <span className="font-mono text-sm">{config.theme?.colors?.primary || '#6366f1'}</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-2">Template</div>
                <div className="font-medium capitalize">{config.template || 'modern'}</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold">Email Notifications</h2>
                <p className="text-sm text-muted-foreground">Configure which emails you receive</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'tradeAlerts', label: 'Trade Alerts', desc: 'Get notified for large or unusual trades' },
                { key: 'userRegistrations', label: 'New User Registrations', desc: 'Receive alerts when new users sign up' },
                { key: 'largeDeposits', label: 'Large Deposits', desc: 'Notifications for deposits over $10,000' },
                { key: 'securityAlerts', label: 'Security Alerts', desc: 'Critical security notifications' },
                { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of platform activity' },
                { key: 'marketingUpdates', label: 'Marketing Updates', desc: 'Platform updates and feature announcements' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                  <Switch 
                    checked={notificationSettings[item.key as keyof typeof notificationSettings]} 
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, [item.key]: checked })} 
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="font-semibold">Authentication</h2>
                <p className="text-sm text-muted-foreground">Configure login and authentication settings</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <div className="font-medium">Require 2FA for All Users</div>
                  <div className="text-sm text-muted-foreground">Force two-factor authentication</div>
                </div>
                <Switch checked={securitySettings.require2FA} onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, require2FA: checked })} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <div className="font-medium">IP Whitelist</div>
                  <div className="text-sm text-muted-foreground">Only allow access from specific IPs</div>
                </div>
                <Switch checked={securitySettings.ipWhitelist} onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, ipWhitelist: checked })} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <div className="font-medium">Audit Logging</div>
                  <div className="text-sm text-muted-foreground">Log all admin actions</div>
                </div>
                <Switch checked={securitySettings.auditLogging} onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLogging: checked })} />
              </div>
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" value={securitySettings.sessionTimeout} onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input id="loginAttempts" type="number" value={securitySettings.loginAttempts} onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: parseInt(e.target.value) })} />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="font-semibold">API Configuration</h2>
                <p className="text-sm text-muted-foreground">Manage API access and webhooks</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input id="webhookUrl" placeholder="https://your-server.com/webhook" value={integrationSettings.webhookUrl} onChange={(e) => setIntegrationSettings({ ...integrationSettings, webhookUrl: e.target.value })} />
                <p className="text-xs text-muted-foreground">Receive real-time notifications for trades and user events</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiRateLimit">API Rate Limit (requests/min)</Label>
                <Input id="apiRateLimit" type="number" value={integrationSettings.apiRateLimit} onChange={(e) => setIntegrationSettings({ ...integrationSettings, apiRateLimit: parseInt(e.target.value) })} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <div className="font-medium">Sandbox Mode</div>
                  <div className="text-sm text-muted-foreground">Enable test environment for API development</div>
                </div>
                <Switch checked={integrationSettings.sandboxMode} onCheckedChange={(checked) => setIntegrationSettings({ ...integrationSettings, sandboxMode: checked })} />
              </div>
              <div className="p-4 rounded-lg border border-dashed">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">API Keys</div>
                    <div className="text-sm text-muted-foreground">Manage API keys for external access</div>
                  </div>
                  <Button variant="outline" size="sm">Manage Keys</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
