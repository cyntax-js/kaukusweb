/**
 * Theme Gallery Page - Preview all 6 templates side-by-side
 */

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { templatePresets } from '@/broker-theme/config';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { Check, Eye, Palette, ExternalLink, Moon, Sun, Upload, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { BrokerTheme } from '@/broker-theme/config';
import { ThemePreviewCard } from './deploy/components/ThemePreviewCard';

export default function ThemeGallery() {
  const navigate = useNavigate();
  const { config, setTemplate, setLogo, setBrokerName } = useBrokerDeploymentStore();
  const [selectedTemplate, setSelectedTemplate] = useState(config.template);
  const [previewLogo, setPreviewLogo] = useState(config.branding.logoUrl || '');
  const [previewName, setPreviewName] = useState(config.brokerName || 'Your Broker');

  // Create preview configs for each template with broker's customizations
  const templatePreviews = useMemo(() => {
    return templatePresets.map(preset => ({
      ...preset,
      customTheme: {
        ...preset.theme,
        // Apply broker's custom colors if they differ from defaults
      } as BrokerTheme,
    }));
  }, []);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId as typeof config.template);
  };

  const handleApplyTemplate = () => {
    setTemplate(selectedTemplate);
    if (previewLogo) setLogo(previewLogo);
    if (previewName) setBrokerName(previewName);
    navigate('/broker/dashboard/deploy');
  };

  const isDarkTemplate = (theme: BrokerTheme) => {
    const parts = theme.colors.background.split(' ');
    if (parts.length >= 3) {
      const lightness = parseFloat(parts[2]);
      return lightness < 50;
    }
    return false;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Palette className="w-8 h-8 text-primary" />
            Theme Gallery
          </h1>
          <p className="text-muted-foreground mt-1">
            Preview all available templates with your branding applied
          </p>
        </div>
        <Button onClick={handleApplyTemplate} className="gap-2">
          Apply Selected Theme
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Customization Panel */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <Label htmlFor="previewName">Preview Broker Name</Label>
            <Input
              id="previewName"
              value={previewName}
              onChange={(e) => setPreviewName(e.target.value)}
              placeholder="Your Broker Name"
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="previewLogo">Preview Logo URL</Label>
            <div className="flex gap-2">
              <Input
                id="previewLogo"
                value={previewLogo}
                onChange={(e) => setPreviewLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <Button variant="outline" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatePreviews.map((preset) => {
          const isSelected = selectedTemplate === preset.id;
          const isDark = isDarkTemplate(preset.theme);

          return (
            <Card
              key={preset.id}
              className={`overflow-hidden cursor-pointer transition-all hover-lift ${
                isSelected ? 'ring-2 ring-primary border-primary shadow-lg' : 'hover:border-primary/50'
              }`}
              onClick={() => handleSelectTemplate(preset.id)}
            >
              {/* Template Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `hsl(${preset.theme.colors.primary})` }}
                  >
                    <Palette className="w-5 h-5" style={{ color: isDark ? '#000' : '#fff' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{preset.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs">
                        {isDark ? <Moon className="w-3 h-3 mr-1" /> : <Sun className="w-3 h-3 mr-1" />}
                        {isDark ? 'Dark' : 'Light'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{preset.theme.typography.fontFamily}</span>
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>

              {/* Theme Preview */}
              <div className="p-4">
                <ThemePreviewCard 
                  theme={preset.theme} 
                  brokerName={previewName} 
                />
              </div>

              {/* Template Info */}
              <div className="p-4 border-t bg-muted/30">
                <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Object.values(preset.theme.colors).slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-background shadow-sm"
                        style={{ backgroundColor: `hsl(${color})` }}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Template Actions */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">
              Selected: <span className="text-primary capitalize">{selectedTemplate}</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Click "Apply Selected Theme" to use this template in your deployment
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/broker/dashboard/deploy')}>
              Back to Deployment
            </Button>
            <Button onClick={handleApplyTemplate} className="gap-2">
              <Check className="w-4 h-4" />
              Apply & Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}