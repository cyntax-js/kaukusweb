import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { CreditCard, Lock, Check, Loader2 } from 'lucide-react';

export default function DeployPayment() {
  const { config, totalCost, isProcessingPayment, processPayment, nextStep, availableServices, templatePrice } = useBrokerDeploymentStore();

  const handlePayment = async () => {
    const success = await processPayment();
    if (success) nextStep();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8"><h2 className="text-2xl font-bold mb-2">Complete Your Order</h2><p className="text-muted-foreground">Review your selection and complete payment</p></div>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3 mb-6">
          {config.services.map(serviceId => {
            const service = availableServices.find(s => s.id === serviceId);
            return service ? (
              <div key={serviceId} className="flex items-center justify-between py-2 border-b border-border">
                <div><span className="font-medium">{service.name}</span><span className="text-xs text-muted-foreground ml-2">Trading Service</span></div>
                <span className="font-mono">${service.price.toLocaleString()}/mo</span>
              </div>
            ) : null;
          })}
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div><span className="font-medium capitalize">{config.template} Template</span><span className="text-xs text-muted-foreground ml-2">Platform Theme</span></div>
            <span className="font-mono">${templatePrice}/mo</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-lg font-bold pt-4 border-t border-border"><span>Total Monthly</span><span className="text-primary">${totalCost.toLocaleString()}/mo</span></div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6"><CreditCard className="w-5 h-5 text-muted-foreground" /><h3 className="font-semibold">Payment Details</h3></div>
        <div className="space-y-4">
          <div className="space-y-2"><Label htmlFor="cardName">Cardholder Name</Label><Input id="cardName" placeholder="John Doe" defaultValue={config.brokerName} /></div>
          <div className="space-y-2"><Label htmlFor="cardNumber">Card Number</Label><Input id="cardNumber" placeholder="4242 4242 4242 4242" /></div>
          <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="expiry">Expiry Date</Label><Input id="expiry" placeholder="MM/YY" /></div><div className="space-y-2"><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" /></div></div>
        </div>
        <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground"><Lock className="w-4 h-4" /><span>Your payment is secured with 256-bit encryption</span></div>
      </Card>
      <Button size="lg" className="w-full" onClick={handlePayment} disabled={isProcessingPayment}>
        {isProcessingPayment ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing Payment...</> : <><Check className="w-4 h-4 mr-2" />Pay ${totalCost.toLocaleString()} & Deploy</>}
      </Button>
    </div>
  );
}
