/**
 * ============================================================
 * DEPOSIT / WITHDRAW MODAL
 * ============================================================
 * 
 * Modal for depositing or withdrawing funds.
 * Includes transaction flow with confirmation.
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowDownRight, ArrowUpRight, Wallet, CreditCard, Building2, 
  CheckCircle2, Loader2, AlertCircle, Copy, Shield
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ============================================================
// TYPES
// ============================================================

interface DepositWithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'deposit' | 'withdraw';
  availableBalance?: number;
}

type Step = 'amount' | 'method' | 'confirm' | 'processing' | 'success';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'crypto';
  name: string;
  details: string;
  icon: React.ReactNode;
}

// ============================================================
// MOCK DATA
// ============================================================

const paymentMethods: PaymentMethod[] = [
  { id: 'card1', type: 'card', name: 'Visa ending 4242', details: 'Expires 12/25', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'bank1', type: 'bank', name: 'Chase Checking', details: '••••6789', icon: <Building2 className="h-5 w-5" /> },
  { id: 'crypto1', type: 'crypto', name: 'USDT (TRC20)', details: 'Tether USD', icon: <Wallet className="h-5 w-5" /> },
];

const cryptoAddresses = {
  BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  USDT: 'TN2XtFPJkNKpLXFvDwVHAVo4KqNYzRzXXX',
};

// ============================================================
// COMPONENT
// ============================================================

const DepositWithdrawModal = ({ 
  open, 
  onOpenChange, 
  mode,
  availableBalance = 15010.90
}: DepositWithdrawModalProps) => {
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('USDT');

  const isDeposit = mode === 'deposit';
  const maxAmount = isDeposit ? 100000 : availableBalance;
  const minAmount = 10;

  const resetState = () => {
    setStep('amount');
    setAmount('');
    setSelectedMethod('');
    setSelectedCrypto('USDT');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetState, 300);
  };

  const handleAmountSubmit = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < minAmount) {
      toast.error(`Minimum amount is $${minAmount}`);
      return;
    }
    if (numAmount > maxAmount) {
      toast.error(`Maximum amount is $${maxAmount.toLocaleString()}`);
      return;
    }
    setStep('method');
  };

  const handleMethodSubmit = () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setStep('processing');
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep('success');
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  const quickAmounts = isDeposit ? [100, 500, 1000, 5000] : [100, 500, 1000, availableBalance];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            {isDeposit ? (
              <ArrowDownRight className="h-5 w-5 text-green-500" />
            ) : (
              <ArrowUpRight className="h-5 w-5 text-orange-500" />
            )}
            {isDeposit ? 'Deposit Funds' : 'Withdraw Funds'}
          </DialogTitle>
          <DialogDescription>
            {step === 'amount' && (isDeposit ? 'Enter the amount you want to deposit' : 'Enter the amount you want to withdraw')}
            {step === 'method' && 'Select your payment method'}
            {step === 'confirm' && 'Review and confirm your transaction'}
            {step === 'processing' && 'Processing your transaction...'}
            {step === 'success' && 'Transaction completed successfully'}
          </DialogDescription>
        </DialogHeader>

        {/* Amount Step */}
        {step === 'amount' && (
          <div className="space-y-6 py-4">
            {!isDeposit && (
              <div className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available Balance</span>
                <span className="font-medium text-foreground">${availableBalance.toLocaleString()}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label>Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-lg h-12"
                  min={minAmount}
                  max={maxAmount}
                />
              </div>
            </div>

            <div className="flex gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setAmount(amt.toString())}
                >
                  {amt === availableBalance ? 'Max' : `$${amt}`}
                </Button>
              ))}
            </div>

            <Button className="w-full" onClick={handleAmountSubmit} disabled={!amount}>
              Continue
            </Button>
          </div>
        )}

        {/* Method Step */}
        {step === 'method' && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border transition-all flex items-center gap-4",
                    selectedMethod === method.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    selectedMethod === method.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {method.icon}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-foreground">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Crypto deposit address */}
            {isDeposit && selectedMethod === 'crypto1' && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="space-y-2">
                  <Label>Select Network</Label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger className="bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="USDT">USDT (TRC20)</SelectItem>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Deposit Address</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses]} 
                      readOnly 
                      className="font-mono text-xs bg-card"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleCopyAddress(cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses])}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Only send {selectedCrypto} to this address
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('amount')}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleMethodSubmit} disabled={!selectedMethod}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Confirm Step */}
        {step === 'confirm' && (
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium text-foreground">{isDeposit ? 'Deposit' : 'Withdrawal'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium text-foreground">${parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium text-foreground">
                  {paymentMethods.find(m => m.id === selectedMethod)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium text-foreground">$0.00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-foreground font-medium">Total</span>
                <span className="text-xl font-bold text-foreground">${parseFloat(amount).toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Your transaction is secured with 256-bit encryption. Funds typically arrive within 1-3 business days.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('method')}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleConfirm}>
                Confirm {isDeposit ? 'Deposit' : 'Withdrawal'}
              </Button>
            </div>
          </div>
        )}

        {/* Processing Step */}
        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-foreground font-medium">Processing your transaction...</p>
            <p className="text-sm text-muted-foreground">Please wait, do not close this window</p>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">
                {isDeposit ? 'Deposit Initiated' : 'Withdrawal Initiated'}
              </p>
              <p className="text-2xl font-bold text-primary mt-1">${parseFloat(amount).toLocaleString()}</p>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {isDeposit 
                ? 'Your deposit is being processed. Funds will be available in your account within 1-3 business days.'
                : 'Your withdrawal is being processed. Funds will arrive in your account within 1-3 business days.'
              }
            </p>
            <Button className="w-full mt-4" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DepositWithdrawModal;
