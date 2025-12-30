import { Card } from '@/components/ui/card';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { Check, PanelLeft, PanelRight, LayoutPanelTop } from 'lucide-react';
import type { BrokerTheme } from '@/broker-theme/config/types';

const orderBookOptions: { id: BrokerTheme['layout']['orderBookPosition']; name: string; description: string; icon: React.ReactNode }[] = [
  { id: 'left', name: 'Order Book Left', description: 'Order book panel on the left side', icon: <PanelLeft className="w-8 h-8" /> },
  { id: 'right', name: 'Order Book Right', description: 'Order book panel on the right side', icon: <PanelRight className="w-8 h-8" /> },
];

export default function DeployLayout() {
  const { config, setLayoutVariant } = useBrokerDeploymentStore();

  return (
    <div className="space-y-8">
      {/* Order Book Position Selection */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Trading Layout</h2>
          <p className="text-muted-foreground">Choose where to place the order book in your professional trading view</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {orderBookOptions.map((option) => {
            const selected = config.theme.layout.orderBookPosition === option.id;
            return (
              <Card 
                key={option.id} 
                className={`overflow-hidden cursor-pointer transition-all hover-lift ${selected ? 'border-primary ring-2 ring-primary shadow-glow' : 'hover:border-primary/50'}`} 
                onClick={() => setLayoutVariant('orderBookPosition', option.id)}
              >
                <div className={`h-48 p-4 ${selected ? 'bg-primary/5' : 'bg-secondary/50'}`}>
                  {/* Layout preview */}
                  <div className="h-full flex gap-2">
                    {option.id === 'left' ? (
                      <>
                        <div className="w-1/4 rounded bg-primary/20 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground">Order Book</span>
                        </div>
                        <div className="flex-1 rounded bg-muted flex items-center justify-center">
                          <LayoutPanelTop className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <div className="w-1/4 rounded bg-muted flex flex-col gap-1">
                          <div className="flex-1 rounded-sm bg-background/50" />
                          <div className="flex-1 rounded-sm bg-background/50" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/4 rounded bg-muted flex flex-col gap-1">
                          <div className="flex-1 rounded-sm bg-background/50" />
                          <div className="flex-1 rounded-sm bg-background/50" />
                        </div>
                        <div className="flex-1 rounded bg-muted flex items-center justify-center">
                          <LayoutPanelTop className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <div className="w-1/4 rounded bg-primary/20 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground">Order Book</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{option.name}</h3>
                    {selected && (
                      <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                        <Check className="w-4 h-4 text-success-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Layout Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          All brokers use the professional trading layout with advanced multi-panel view
        </p>
      </div>
    </div>
  );
}