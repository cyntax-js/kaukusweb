import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { templatePresets } from '@/broker-theme/config';
import { Check, Palette, Paintbrush, RotateCcw, Eye, Type, Upload, Image, LayoutGrid, PanelLeft, PanelRight } from 'lucide-react';
import type { BrokerTemplate } from '@/broker-theme/config';
import { ThemePreviewCard } from '../components/ThemePreviewCard';
import LogoUploader from '../components/LogoUploader';

const fontOptions = [
  { id: 'Inter', name: 'Inter', style: 'Modern Sans' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', style: 'Contemporary' },
  { id: 'JetBrains Mono', name: 'JetBrains Mono', style: 'Monospace' },
  { id: 'Roboto', name: 'Roboto', style: 'Clean Sans' },
  { id: 'Space Grotesk', name: 'Space Grotesk', style: 'Geometric' },
  { id: 'DM Sans', name: 'DM Sans', style: 'Friendly' },
];

export default function DeployTheme() {
  const { config, setTemplate, setThemeColors, setTypography, setLogo, setLayout } = useBrokerDeploymentStore();
  const [activeTab, setActiveTab] = useState<'themes' | 'colors' | 'branding' | 'layout'>('themes');

  const hslToHex = (hsl: string): string => {
    const parts = hsl.split(' ').map(p => parseFloat(p));
    if (parts.length < 3) return '#3b82f6';
    const [h, s, l] = parts;
    const sNorm = s / 100, lNorm = l / 100;
    const a = sNorm * Math.min(lNorm, 1 - lNorm);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hexToHsl = (hex: string): string => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; }
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const resetColors = () => {
    const preset = templatePresets.find(p => p.id === config.template);
    if (preset) setThemeColors(preset.theme.colors);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customize Your Theme</h2>
          <p className="text-muted-foreground text-sm">Choose a template, customize colors, and set your branding</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Selection */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="w-full">
              <TabsTrigger value="themes" className="flex-1">
                <Palette className="w-4 h-4 mr-2" /> Templates
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex-1">
                <Paintbrush className="w-4 h-4 mr-2" /> Colors
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex-1">
                <LayoutGrid className="w-4 h-4 mr-2" /> Layout
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex-1">
                <Image className="w-4 h-4 mr-2" /> Branding
              </TabsTrigger>
            </TabsList>

            <TabsContent value="themes" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {templatePresets.map((preset) => {
                  const selected = config.template === preset.id;
                  return (
                    <Card 
                      key={preset.id} 
                      className={`p-3 cursor-pointer transition-all hover-lift ${selected ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`} 
                      onClick={() => setTemplate(preset.id)}
                    >
                      <div 
                        className="h-16 rounded-md mb-2 relative overflow-hidden" 
                        style={{ backgroundColor: `hsl(${preset.theme.colors.background})` }}
                      >
                        <div 
                          className="absolute top-0 left-0 right-0 h-3" 
                          style={{ backgroundColor: `hsl(${preset.theme.colors.primary})` }} 
                        />
                        {selected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-2 h-2 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-sm">{preset.name}</div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{preset.description}</p>
                      <div className="flex gap-1 mt-2">
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: `hsl(${preset.theme.colors.primary})` }} />
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: `hsl(${preset.theme.colors.accent})` }} />
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: `hsl(${preset.theme.colors.background})` }} />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="colors" className="mt-4 space-y-4">
              <Card className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">Custom Colors</Label>
                  <Button variant="ghost" size="sm" onClick={resetColors}>
                    <RotateCcw className="w-3 h-3 mr-1" />Reset
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Primary</Label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={hslToHex(config.theme.colors.primary)} 
                        onChange={(e) => setThemeColors({ primary: hexToHsl(e.target.value) })} 
                        className="w-10 h-10 rounded border cursor-pointer" 
                      />
                      <Input value={config.theme.colors.primary} onChange={(e) => setThemeColors({ primary: e.target.value })} className="font-mono text-xs h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Accent</Label>
                    <div className="flex gap-2">
                      <input type="color" value={hslToHex(config.theme.colors.accent)} onChange={(e) => setThemeColors({ accent: hexToHsl(e.target.value) })} className="w-10 h-10 rounded border cursor-pointer" />
                      <Input value={config.theme.colors.accent} onChange={(e) => setThemeColors({ accent: e.target.value })} className="font-mono text-xs h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Background</Label>
                    <div className="flex gap-2">
                      <input type="color" value={hslToHex(config.theme.colors.background)} onChange={(e) => setThemeColors({ background: hexToHsl(e.target.value) })} className="w-10 h-10 rounded border cursor-pointer" />
                      <Input value={config.theme.colors.background} onChange={(e) => setThemeColors({ background: e.target.value })} className="font-mono text-xs h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Foreground</Label>
                    <div className="flex gap-2">
                      <input type="color" value={hslToHex(config.theme.colors.foreground)} onChange={(e) => setThemeColors({ foreground: hexToHsl(e.target.value) })} className="w-10 h-10 rounded border cursor-pointer" />
                      <Input value={config.theme.colors.foreground} onChange={(e) => setThemeColors({ foreground: e.target.value })} className="font-mono text-xs h-10" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Font Family */}
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-muted-foreground" />
                  <Label className="font-medium">Font Family</Label>
                </div>
                <Select value={config.theme.typography.fontFamily} onValueChange={(v) => setTypography({ fontFamily: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map(font => (
                      <SelectItem key={font.id} value={font.id}>
                        <div className="flex justify-between items-center w-full">
                          <span style={{ fontFamily: font.id }}>{font.name}</span>
                          <span className="text-xs text-muted-foreground ml-4">{font.style}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="mt-4 space-y-4">
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-muted-foreground" />
                  <Label className="font-medium">Order Book Position</Label>
                </div>
                <p className="text-xs text-muted-foreground">Choose where the order book appears in the trading interface</p>
                <div className="grid grid-cols-2 gap-3">
                  <Card 
                    className={`p-4 cursor-pointer transition-all ${config.theme.layout.orderBookPosition === 'left' ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`}
                    onClick={() => setLayout({ orderBookPosition: 'left' })}
                  >
                    <div className="flex items-center gap-3">
                      <PanelLeft className="w-8 h-8 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Left Side</div>
                        <p className="text-xs text-muted-foreground">Order book on the left</p>
                      </div>
                    </div>
                    {config.theme.layout.orderBookPosition === 'left' && (
                      <div className="mt-3 flex justify-end">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </Card>
                  <Card 
                    className={`p-4 cursor-pointer transition-all ${config.theme.layout.orderBookPosition === 'right' ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`}
                    onClick={() => setLayout({ orderBookPosition: 'right' })}
                  >
                    <div className="flex items-center gap-3">
                      <PanelRight className="w-8 h-8 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Right Side</div>
                        <p className="text-xs text-muted-foreground">Order book on the right</p>
                      </div>
                    </div>
                    {config.theme.layout.orderBookPosition === 'right' && (
                      <div className="mt-3 flex justify-end">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </Card>

              {/* Visual layout preview */}
              <Card className="p-4 space-y-3">
                <Label className="font-medium text-sm">Layout Preview</Label>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="grid grid-cols-12 gap-1 h-24">
                    {config.theme.layout.orderBookPosition === 'left' ? (
                      <>
                        <div className="col-span-2 bg-primary/20 rounded flex items-center justify-center text-[10px] text-muted-foreground">Order Book</div>
                        <div className="col-span-8 bg-accent/20 rounded flex items-center justify-center text-[10px] text-muted-foreground">Chart</div>
                        <div className="col-span-2 bg-primary/10 rounded flex items-center justify-center text-[10px] text-muted-foreground">Trade</div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-2 bg-primary/10 rounded flex items-center justify-center text-[10px] text-muted-foreground">Markets</div>
                        <div className="col-span-8 bg-accent/20 rounded flex items-center justify-center text-[10px] text-muted-foreground">Chart</div>
                        <div className="col-span-2 bg-primary/20 rounded flex items-center justify-center text-[10px] text-muted-foreground">Order Book</div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="branding" className="mt-4">
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <Label className="font-medium">Company Logo</Label>
                </div>
                <p className="text-xs text-muted-foreground">Upload your logo or paste a URL. Recommended size: 200x50px</p>
                <LogoUploader 
                  value={config.branding.logoUrl} 
                  onChange={(url) => setLogo(url)} 
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Eye className="w-4 h-4" />
            Live Preview
          </div>
          <ThemePreviewCard theme={config.theme} brokerName={config.brokerName} />
        </div>
      </div>
    </div>
  );
}