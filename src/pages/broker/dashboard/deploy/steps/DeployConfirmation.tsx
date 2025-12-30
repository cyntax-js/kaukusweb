/**
 * Theme Confirmation Step - Shows final Landing + Markets UI preview before payment
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { Check, Monitor, Smartphone, Home, BarChart3, Lock, AlertCircle, ChevronRight } from 'lucide-react';

const PREVIEW_TABS = [
  { id: 'landing', label: 'Landing Page', icon: Home },
  { id: 'markets', label: 'Markets', icon: BarChart3 },
] as const;

export default function DeployConfirmation() {
  const { config, getPreviewUrl, nextStep } = useBrokerDeploymentStore();
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const previewUrl = getPreviewUrl(activeTab === 'landing' ? '' : activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lock In Your Theme</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Review your platform's final appearance. This is exactly how your users will see it.
        </p>
      </div>

      {/* Configuration Summary */}
      <Card className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground block mb-1">Broker Name</span>
            <p className="font-semibold">{config.brokerName || 'Not set'}</p>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Template</span>
            <p className="font-semibold capitalize">{config.template}</p>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Services</span>
            <p className="font-semibold">{config.services.length} enabled</p>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Colors</span>
            <div className="flex gap-1">
              <div 
                className="w-6 h-6 rounded-full border-2 border-background shadow-sm" 
                style={{ backgroundColor: `hsl(${config.theme.colors.primary})` }} 
                title="Primary"
              />
              <div 
                className="w-6 h-6 rounded-full border-2 border-background shadow-sm" 
                style={{ backgroundColor: `hsl(${config.theme.colors.accent})` }} 
                title="Accent"
              />
              <div 
                className="w-6 h-6 rounded-full border-2 border-background shadow-sm" 
                style={{ backgroundColor: `hsl(${config.theme.colors.background})` }} 
                title="Background"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Preview Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {PREVIEW_TABS.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={previewDevice === 'desktop' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setPreviewDevice('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={previewDevice === 'mobile' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setPreviewDevice('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <Card className="overflow-hidden">
        <div className="bg-muted p-3 border-b flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center text-xs text-muted-foreground font-mono truncate">
            {config.subdomain || 'yourbroker'}.kaukus.com/{activeTab === 'landing' ? '' : activeTab}
          </div>
        </div>
        <div className={`bg-muted/30 transition-all ${previewDevice === 'mobile' ? 'flex justify-center py-4' : ''}`}>
          <div className={`${previewDevice === 'mobile' ? 'w-[375px] rounded-xl overflow-hidden shadow-2xl border' : 'w-full'}`}>
            <iframe
              src={previewUrl}
              className={`w-full border-0 bg-background ${previewDevice === 'mobile' ? 'h-[600px]' : 'h-[500px]'}`}
              title="Theme Preview"
            />
          </div>
        </div>
      </Card>

      {/* Confirmation Checkbox */}
      <Card className={`p-4 transition-all ${isConfirmed ? 'border-primary bg-primary/5' : ''}`}>
        <label className="flex items-start gap-3 cursor-pointer">
          <div 
            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              isConfirmed ? 'bg-primary border-primary' : 'border-muted-foreground'
            }`}
            onClick={() => setIsConfirmed(!isConfirmed)}
          >
            {isConfirmed && <Check className="w-3 h-3 text-primary-foreground" />}
          </div>
          <div onClick={() => setIsConfirmed(!isConfirmed)}>
            <p className="font-medium">I confirm this is the theme I want</p>
            <p className="text-sm text-muted-foreground">
              I've reviewed my platform's appearance and I'm ready to proceed to payment.
            </p>
          </div>
        </label>
      </Card>

      {/* Warning */}
      {!isConfirmed && (
        <div className="flex items-start gap-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
          <p>
            Please confirm your theme selection above before proceeding. You can still go back and make changes.
          </p>
        </div>
      )}

      {/* Proceed Button */}
      <div className="flex justify-end">
        <Button 
          size="lg" 
          disabled={!isConfirmed}
          onClick={nextStep}
          className="gap-2"
        >
          Proceed to Payment
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}