import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BuySellPressure = () => {
  const [buyPercentage, setBuyPercentage] = useState(70);
  const [sellPercentage, setSellPercentage] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 40;
      let newBuy = buyPercentage + randomChange;
      if (newBuy < 10) newBuy = 10;
      if (newBuy > 90) newBuy = 90;
      const newSell = 100 - newBuy;
      setBuyPercentage(newBuy);
      setSellPercentage(newSell);
    }, 1000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [buyPercentage]);

  return (
    <div className="w-full bg-card border-t border-border p-3">
      <div className="flex items-center gap-2 h-8">
        <div className="flex items-center justify-center border border-green-500 text-green-500 px-2 py-1 text-xs font-medium rounded">
          B
        </div>

        <div className="flex-1 flex h-6 rounded overflow-hidden bg-muted">
          <div
            className="bg-green-500 flex items-center justify-start px-2 text-xs font-medium text-white transition-all duration-[800ms] ease-in-out"
            style={{ width: `${buyPercentage}%` }}
          >
            {buyPercentage.toFixed(1)}%
          </div>
          <div
            className="bg-red-500 flex items-center justify-end px-2 text-xs font-medium text-white transition-all duration-[800ms] ease-in-out"
            style={{ width: `${sellPercentage}%` }}
          >
            {sellPercentage.toFixed(1)}%
          </div>
        </div>

        <div className="flex items-center justify-center border border-red-500 text-red-500 px-2 py-1 text-xs font-medium rounded">
          S
        </div>
      </div>
    </div>
  );
};

export default BuySellPressure;
