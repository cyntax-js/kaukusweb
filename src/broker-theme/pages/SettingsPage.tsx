/**
 * ============================================================
 * BROKER SETTINGS PAGE
 * ============================================================
 * 
 * User account settings for broker theme.
 * Modern, sleek design with profile management.
 * 
 * Route: /preview/settings
 */

import { useState } from 'react';
import { useTheme } from '@/broker-theme/config';
import { useBrokerAuthStore } from '@/broker-theme/stores';
import { DashboardLayout } from '@/broker-theme/layouts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, Shield, Bell, CreditCard, Key, Settings, Globe, Moon, Sun,
  Camera, CheckCircle2, ChevronRight, Lock, Smartphone, Mail, 
  AlertTriangle, Trash2, LogOut, Eye, EyeOff, Building2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ============================================================
// COMPONENT
// ============================================================

const SettingsPage = () => {
  const { config } = useTheme();
  const { user, logout } = useBrokerAuthStore();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    trades: true,
    deposits: true,
    marketing: false,
    priceAlerts: true,
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');

  const userInitials = user 
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : 'JD';

  const handleSaveChanges = () => {
    toast.success('Changes saved successfully');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>

          {/* Profile Card - Hero Section */}
          <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-border overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-foreground">
                      {user?.firstName || 'John'} {user?.lastName || 'Doe'}
                    </h2>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{user?.email || 'john@example.com'}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm text-muted-foreground">Member since Jan 2024</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">Tier: Pro</span>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-background">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-background">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-background">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2 data-[state=active]:bg-background">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2 data-[state=active]:bg-background">
                <Globe className="h-4 w-4" />
                Preferences
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={user?.firstName || 'John'} className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={user?.lastName || 'Doe'} className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                      <Input id="email" type="email" defaultValue={user?.email || 'john@example.com'} className="bg-muted/50" />
                      <Button variant="outline" size="sm">Verify</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-muted/50" />
                      <Button variant="outline" size="sm">Verify</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Street address" className="bg-muted/50" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="ZIP" className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Change Password</CardTitle>
                  <CardDescription>Update your password regularly for better security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showCurrentPassword ? 'text' : 'password'} 
                        className="bg-muted/50 pr-10" 
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input 
                        id="newPassword" 
                        type={showNewPassword ? 'text' : 'password'} 
                        className="bg-muted/50 pr-10" 
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="bg-muted/50" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingRow
                    icon={<Smartphone className="h-5 w-5" />}
                    title="Authenticator App"
                    description="Use Google Authenticator or similar apps"
                    action={<Button variant="outline" size="sm">Enable</Button>}
                  />
                  <SettingRow
                    icon={<Mail className="h-5 w-5" />}
                    title="Email Verification"
                    description="Receive codes via email for login"
                    action={
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Enabled
                      </Badge>
                    }
                  />
                  <SettingRow
                    icon={<Key className="h-5 w-5" />}
                    title="Security Keys"
                    description="Use hardware security keys for login"
                    action={<Button variant="outline" size="sm">Add Key</Button>}
                  />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Active Sessions</CardTitle>
                  <CardDescription>Manage devices where you're logged in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Chrome on MacOS</p>
                          <p className="text-sm text-muted-foreground">San Francisco, CA • Current session</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Safari on iPhone</p>
                          <p className="text-sm text-muted-foreground">New York, NY • Last active 2 days ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Notification Preferences</CardTitle>
                  <CardDescription>Choose how and when you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <NotificationRow
                    title="Email Notifications"
                    description="Receive important updates via email"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                  <NotificationRow
                    title="Push Notifications"
                    description="Get real-time alerts on your device"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                  <NotificationRow
                    title="Trade Confirmations"
                    description="Notifications when orders are executed"
                    checked={notifications.trades}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, trades: checked }))}
                  />
                  <NotificationRow
                    title="Deposit & Withdrawal Alerts"
                    description="Get notified about fund movements"
                    checked={notifications.deposits}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, deposits: checked }))}
                  />
                  <NotificationRow
                    title="Price Alerts"
                    description="Alerts when assets hit target prices"
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, priceAlerts: checked }))}
                  />
                  <NotificationRow
                    title="Marketing & Promotions"
                    description="News, offers, and promotional content"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods for deposits and withdrawals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Default</Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Chase Checking ••••6789</p>
                        <p className="text-sm text-muted-foreground">Bank Account</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>

                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Billing History</CardTitle>
                  <CardDescription>View your past transactions and invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: 'Dec 15, 2024', type: 'Deposit', amount: '+$5,000.00', status: 'Completed' },
                      { date: 'Dec 10, 2024', type: 'Withdrawal', amount: '-$1,200.00', status: 'Completed' },
                      { date: 'Nov 28, 2024', type: 'Deposit', amount: '+$2,500.00', status: 'Completed' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "font-medium",
                            tx.amount.startsWith('+') ? 'text-green-500' : 'text-foreground'
                          )}>{tx.amount}</p>
                          <p className="text-sm text-muted-foreground">{tx.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Display Settings</CardTitle>
                  <CardDescription>Customize your visual preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light', icon: Sun, label: 'Light' },
                        { value: 'dark', icon: Moon, label: 'Dark' },
                        { value: 'system', icon: Settings, label: 'System' },
                      ].map(({ value, icon: Icon, label }) => (
                        <button
                          key={value}
                          onClick={() => setTheme(value as typeof theme)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                            theme === value 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <Icon className={cn("h-5 w-5", theme === value ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-sm", theme === value ? "text-primary font-medium" : "text-muted-foreground")}>
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="bg-muted/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="bg-muted/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="NGN">NGN (₦)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-lg text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div>
                      <p className="font-medium text-foreground">Log out of all devices</p>
                      <p className="text-sm text-muted-foreground">This will sign you out everywhere</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out All
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div>
                      <p className="font-medium text-foreground">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

interface SettingRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

const SettingRow = ({ icon, title, description, action }: SettingRowProps) => (
  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    {action}
  </div>
);

interface NotificationRowProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const NotificationRow = ({ title, description, checked, onCheckedChange }: NotificationRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
    <div>
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

export default SettingsPage;
