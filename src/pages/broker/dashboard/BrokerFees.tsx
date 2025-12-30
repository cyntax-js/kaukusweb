import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { defaultFees, type FeeConfig } from '@/mocks/brokerData';
import { DollarSign, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BrokerFees() {
  const { toast } = useToast();
  const [fees, setFees] = useState<FeeConfig>(defaultFees);
  const [isSaving, setIsSaving] = useState(false);

  const handleFeeChange = (key: keyof FeeConfig, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFees(prev => ({ ...prev, [key]: numValue }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: 'Fees Updated',
      description: 'Your fee configuration has been saved successfully.',
    });
  };

  const handleReset = () => {
    setFees(defaultFees);
    toast({
      title: 'Fees Reset',
      description: 'Fee configuration has been reset to defaults.',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Fee Management</h1>
          <p className="text-muted-foreground">Configure trading fees and commissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" /> Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Spot Trading Fees */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Spot Trading Fees</h2>
              <p className="text-sm text-muted-foreground">Fees for spot market trades</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="spotMaker">Maker Fee (%)</Label>
              <Input
                id="spotMaker"
                type="number"
                step="0.01"
                value={fees.spotMakerFee}
                onChange={(e) => handleFeeChange('spotMakerFee', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Fee charged for limit orders that add liquidity</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="spotTaker">Taker Fee (%)</Label>
              <Input
                id="spotTaker"
                type="number"
                step="0.01"
                value={fees.spotTakerFee}
                onChange={(e) => handleFeeChange('spotTakerFee', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Fee charged for market orders that remove liquidity</p>
            </div>
          </div>
        </Card>

        {/* Futures Trading Fees */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Futures Trading Fees</h2>
              <p className="text-sm text-muted-foreground">Fees for futures/derivatives trades</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="futuresMaker">Maker Fee (%)</Label>
              <Input
                id="futuresMaker"
                type="number"
                step="0.01"
                value={fees.futuresMakerFee}
                onChange={(e) => handleFeeChange('futuresMakerFee', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="futuresTaker">Taker Fee (%)</Label>
              <Input
                id="futuresTaker"
                type="number"
                step="0.01"
                value={fees.futuresTakerFee}
                onChange={(e) => handleFeeChange('futuresTakerFee', e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Deposit/Withdrawal Fees */}
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold">Deposit & Withdrawal Fees</h2>
              <p className="text-sm text-muted-foreground">Fees for deposits and withdrawals</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="depositFee">Deposit Fee (%)</Label>
              <Input
                id="depositFee"
                type="number"
                step="0.01"
                value={fees.depositFee}
                onChange={(e) => handleFeeChange('depositFee', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdrawalFee">Withdrawal Fee (%)</Label>
              <Input
                id="withdrawalFee"
                type="number"
                step="0.01"
                value={fees.withdrawalFee}
                onChange={(e) => handleFeeChange('withdrawalFee', e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Fee Preview */}
      <Card className="p-6 bg-secondary/30">
        <h3 className="font-semibold mb-4">Fee Summary Preview</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Spot Maker</div>
            <div className="text-lg font-bold">{fees.spotMakerFee}%</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Spot Taker</div>
            <div className="text-lg font-bold">{fees.spotTakerFee}%</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Futures Maker</div>
            <div className="text-lg font-bold">{fees.futuresMakerFee}%</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Futures Taker</div>
            <div className="text-lg font-bold">{fees.futuresTakerFee}%</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Deposit</div>
            <div className="text-lg font-bold">{fees.depositFee}%</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Withdrawal</div>
            <div className="text-lg font-bold">{fees.withdrawalFee}%</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
