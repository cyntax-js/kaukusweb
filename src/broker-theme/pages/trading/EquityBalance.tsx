import { Button } from "@/components/ui/button";

const EquityBalance = ({ ngnBalance, onDeposit, onWithdraw, portfolio }: { ngnBalance?: number; onDeposit?: () => void; onWithdraw?: () => void; portfolio?: Record<string, number> }) => {
  return (
    <div className="h-full bg-card border-l border-border p-4 flex flex-col gap-3">
      <div>
        <div className="text-xs text-muted-foreground mb-1">
          Total equity
        </div>
        <div className="text-2xl font-bold text-foreground">₦{(ngnBalance ?? 0).toLocaleString(undefined, {minimumFractionDigits:2})}</div>
        <div className="text-sm text-muted-foreground">
          {Object.keys(portfolio || {}).length} shares
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button className="bg-green-500 hover:bg-green-600 text-white text-sm h-9" onClick={onDeposit}>
          Deposit
        </Button>
        <Button variant="outline" className="text-sm h-9" onClick={onWithdraw}>
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default EquityBalance;
