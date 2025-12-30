import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { Rocket, Globe, Upload, Image, X, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DeployWelcome() {
  const { config, setBrokerName, setLogo, setFavicon } = useBrokerDeploymentStore();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | undefined>(config.branding.logoUrl);
  const [faviconPreview, setFaviconPreview] = useState<string | undefined>(config.branding.faviconUrl);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast({ title: 'File too large', description: 'Please upload an image smaller than 2MB', variant: 'destructive' }); return; }
    if (!file.type.startsWith('image/')) { toast({ title: 'Invalid file type', description: 'Please upload an image file', variant: 'destructive' }); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (type === 'logo') { setLogo(base64); setLogoPreview(base64); } 
      else { setFavicon(base64); setFaviconPreview(base64); }
      toast({ title: `${type === 'logo' ? 'Logo' : 'Favicon'} uploaded` });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-6 shadow-lg"><Rocket className="w-10 h-10 text-primary-foreground" /></div>
        <h2 className="text-2xl font-bold mb-2">Let's Build Your Broker Platform</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Set up your platform identity, select services, choose a theme, and go live.</p>
      </div>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2"><Label htmlFor="brokerName" className="text-base font-medium">Platform Name</Label><Input id="brokerName" placeholder="e.g., Apex Trading" value={config.brokerName} onChange={(e) => setBrokerName(e.target.value)} className="text-lg h-12" /></div>
            {config.subdomain && <div className="p-4 rounded-lg bg-muted/50 border"><div className="flex items-center gap-2 text-sm text-muted-foreground mb-1"><Globe className="w-4 h-4" />Your Platform URL</div><div className="font-mono text-primary font-medium">https://{config.subdomain}.Kaukus.com</div></div>}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />Brand Assets</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Logo</Label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 ${logoPreview ? 'border-primary bg-primary/5' : 'border-border'}`} onClick={() => logoInputRef.current?.click()}>
                {logoPreview ? <div className="relative inline-block"><img src={logoPreview} alt="Logo" className="max-h-20 mx-auto rounded" /><button onClick={(e) => { e.stopPropagation(); setLogo(undefined); setLogoPreview(undefined); }} className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button></div> : <div className="py-4"><Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground">Click to upload logo</p></div>}
              </div>
              <input ref={logoInputRef} type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="hidden" />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Favicon</Label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 ${faviconPreview ? 'border-primary bg-primary/5' : 'border-border'}`} onClick={() => faviconInputRef.current?.click()}>
                {faviconPreview ? <div className="relative inline-block"><img src={faviconPreview} alt="Favicon" className="w-16 h-16 mx-auto rounded border" /><button onClick={(e) => { e.stopPropagation(); setFavicon(undefined); setFaviconPreview(undefined); }} className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button></div> : <div className="py-4"><Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground">Click to upload favicon</p></div>}
              </div>
              <input ref={faviconInputRef} type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'favicon')} className="hidden" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
