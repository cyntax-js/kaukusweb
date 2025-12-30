import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { CheckCircle2, ExternalLink, Copy, Rocket, BarChart3, Users, Settings, Loader2, Monitor, Smartphone, Globe, LogIn, UserPlus, TrendingUp, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PREVIEW_PAGES = [
  { id: 'landing', label: 'Landing', icon: Home },
  { id: 'login', label: 'Login', icon: LogIn },
  { id: 'signup', label: 'Sign Up', icon: UserPlus },
  { id: 'trading', label: 'Trading', icon: TrendingUp },
] as const;

export default function DeployPreview() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { config, isDeployed, deployBroker, getPreviewUrl } = useBrokerDeploymentStore();
  const [isDeploying, setIsDeploying] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activePage, setActivePage] = useState<string>('landing');

  useEffect(() => {
    if (!isDeployed) {
      setIsDeploying(true);
      deployBroker().then(() => setIsDeploying(false));
    }
  }, [isDeployed, deployBroker]);

  const platformUrl = getPreviewUrl(activePage === 'landing' ? '' : activePage);
  const displayUrl = getPreviewUrl(''); // Show base URL

  const copyUrl = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: 'URL Copied', description: `${label} has been copied to clipboard` });
  };

  if (isDeploying) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6 animate-pulse"><Rocket className="w-10 h-10 text-primary-foreground" /></div>
        <h2 className="text-2xl font-bold mb-2">Deploying Your Platform...</h2>
        <p className="text-muted-foreground mb-6">This usually takes just a few seconds</p>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 animate-bounce"><CheckCircle2 className="w-10 h-10 text-green-600" /></div>
        <h2 className="text-3xl font-bold mb-2">Your Platform is Live!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">Your <span className="font-semibold text-foreground">{config.brokerName || 'broker'}</span> trading platform has been successfully deployed.</p>
      </div>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-primary" /><h3 className="font-semibold">Your Platform URL</h3></div>
        <div className="bg-muted rounded-lg p-3 font-mono text-sm mb-4 flex items-center justify-between"><span className="text-primary truncate">{displayUrl}</span><div className="flex items-center gap-2 shrink-0 ml-2"><Button variant="ghost" size="icon" onClick={() => copyUrl(platformUrl, 'Platform URL')}><Copy className="w-4 h-4" /></Button><Button variant="ghost" size="icon" onClick={() => window.open(platformUrl, '_blank')}><ExternalLink className="w-4 h-4" /></Button></div></div>
        <div className="flex flex-wrap gap-2">{PREVIEW_PAGES.map(({ id, label, icon: Icon }) => (<Button key={id} variant={activePage === id ? 'default' : 'outline'} size="sm" onClick={() => setActivePage(id)}><Icon className="w-4 h-4 mr-1" />{label}</Button>))}</div>
      </Card>
      <Card className="overflow-hidden">
        <div className="bg-muted p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" /></div></div>
          <div className="flex items-center gap-2"><Button variant={previewDevice === 'desktop' ? 'secondary' : 'ghost'} size="sm" onClick={() => setPreviewDevice('desktop')}><Monitor className="w-4 h-4" /></Button><Button variant={previewDevice === 'mobile' ? 'secondary' : 'ghost'} size="sm" onClick={() => setPreviewDevice('mobile')}><Smartphone className="w-4 h-4" /></Button></div>
        </div>
        <div className={`bg-muted/30 transition-all ${previewDevice === 'mobile' ? 'flex justify-center py-4' : ''}`}><div className={`${previewDevice === 'mobile' ? 'w-[375px] rounded-xl overflow-hidden shadow-2xl border' : 'w-full'}`}><iframe src={platformUrl} className={`w-full border-0 bg-background ${previewDevice === 'mobile' ? 'h-[600px]' : 'h-[500px]'}`} title="Platform Preview" /></div></div>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Configuration Summary</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div><span className="text-muted-foreground">Template</span><p className="font-medium capitalize">{config.template}</p></div>
          <div><span className="text-muted-foreground">Logo</span><p className="font-medium">{config.branding.logoUrl ? 'Uploaded' : 'Default'}</p></div>
          <div><span className="text-muted-foreground">Services</span><p className="font-medium">{config.services.length} active</p></div>
          <div><span className="text-muted-foreground">Colors</span><div className="flex gap-1 mt-1"><div className="w-5 h-5 rounded-full border" style={{ backgroundColor: `hsl(${config.theme.colors.primary})` }} /><div className="w-5 h-5 rounded-full border" style={{ backgroundColor: `hsl(${config.theme.colors.accent})` }} /></div></div>
        </div>
      </Card>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/broker/dashboard/users')}><Users className="w-6 h-6 text-primary mb-2" /><div className="font-medium">Manage Users</div></Card>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/broker/dashboard/analytics')}><BarChart3 className="w-6 h-6 text-green-600 mb-2" /><div className="font-medium">View Analytics</div></Card>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/broker/dashboard/settings')}><Settings className="w-6 h-6 text-amber-600 mb-2" /><div className="font-medium">Settings</div></Card>
      </div>
      <div className="text-center"><Button variant="outline" onClick={() => navigate('/broker/dashboard')}>Go to Dashboard</Button></div>
    </div>
  );
}
