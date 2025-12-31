import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTradeHistoryStore } from "@/broker-theme/stores/tradeHistoryStore";

interface TradingPanelProps {
  market?: any;
  onPlaceOrder?: (order: {
    type: "buy" | "sell" | "long" | "short" | "call" | "put";
    amount: number;
    price: number;
    marketSymbol: string;
    leverage?: number;
    strikePrice?: number;
    expiry?: string;
  }) => Promise<any>;
  ngnBalance?: number;
  portfolio?: Record<string, number>;
  marketType?: "stock" | "futures" | "options";
}

const TradingPanel = ({
  market,
  onPlaceOrder,
  ngnBalance,
  portfolio,
  marketType = "stock",
}: TradingPanelProps) => {
  const isDerivative = marketType === "futures";
  const isOptions = marketType === "options";

  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [buyOrderType, setBuyOrderType] = useState<"limit" | "market">("limit");
  const [sellOrderType, setSellOrderType] = useState<"limit" | "market">(
    "limit"
  );

  const [loadingBuy, setLoadingBuy] = useState(false);
  const [loadingSell, setLoadingSell] = useState(false);

  // Derivative trading state
  const [longAmount, setLongAmount] = useState(0);
  const [shortAmount, setShortAmount] = useState(0);
  const [longLeverage, setLongLeverage] = useState(1);
  const [shortLeverage, setShortLeverage] = useState(1);
  const [loadingLong, setLoadingLong] = useState(false);
  const [loadingShort, setLoadingShort] = useState(false);

  // Options trading state
  const [optionType, setOptionType] = useState<"call" | "put">("call");
  const [strikePrice, setStrikePrice] = useState(0);
  const [optionAmount, setOptionAmount] = useState(0);
  const [selectedExpiry, setSelectedExpiry] = useState("1w");
  const [loadingOption, setLoadingOption] = useState(false);

  const price = market?.price ?? 0;
  const effectiveBuyPrice = buyOrderType === "limit" ? buyPrice : price;
  const effectiveSellPrice = sellOrderType === "limit" ? sellPrice : price;
  const maxBuyUnits =
    effectiveBuyPrice > 0
      ? Math.floor((ngnBalance ?? 0) / effectiveBuyPrice)
      : 0;
  const availableUnits =
    portfolio && market ? portfolio[market.symbol] || 0 : 0;

  const buyMax = Math.max(100, maxBuyUnits);
  const sellMax = Math.max(100, Math.ceil(availableUnits));

  const totalBuy = effectiveBuyPrice * buyAmount;
  const totalSell = effectiveSellPrice * sellAmount;

  useEffect(() => {
    setBuyPrice(price);
    setSellPrice(price);
    setStrikePrice(price);
  }, [price]);

  const addTrade = useTradeHistoryStore((state) => state.addTrade);

  const handleBuy = async () => {
    if (!onPlaceOrder) return;
    setLoadingBuy(true);
    try {
      await onPlaceOrder({
        type: "buy",
        amount: buyAmount,
        price: effectiveBuyPrice,
        marketSymbol: market?.symbol ?? "",
      });
      addTrade({
        type: "buy",
        symbol: market?.symbol ?? "",
        amount: buyAmount,
        price: effectiveBuyPrice,
        total: buyAmount * effectiveBuyPrice,
        status: "filled",
      });
      toast.success("Buy Order Executed", {
        description: `Bought ${buyAmount} ${
          market?.baseAsset ?? "units"
        } at ${effectiveBuyPrice.toLocaleString()} ${
          market?.quoteAsset ?? "NGN"
        }`,
      });
      setBuyAmount(0);
    } catch (e: any) {
      toast.error("Buy Order Failed", {
        description: e?.message || "Could not execute buy order",
      });
    } finally {
      setLoadingBuy(false);
    }
  };

  const handleSell = async () => {
    if (!onPlaceOrder) return;
    setLoadingSell(true);
    try {
      await onPlaceOrder({
        type: "sell",
        amount: sellAmount,
        price: effectiveSellPrice,
        marketSymbol: market?.symbol ?? "",
      });
      addTrade({
        type: "sell",
        symbol: market?.symbol ?? "",
        amount: sellAmount,
        price: effectiveSellPrice,
        total: sellAmount * effectiveSellPrice,
        status: "filled",
      });
      toast.success("Sell Order Executed", {
        description: `Sold ${sellAmount} ${
          market?.baseAsset ?? "units"
        } at ${effectiveSellPrice.toLocaleString()} ${
          market?.quoteAsset ?? "NGN"
        }`,
      });
      setSellAmount(0);
    } catch (e: any) {
      toast.error("Sell Order Failed", {
        description: e?.message || "Could not execute sell order",
      });
    } finally {
      setLoadingSell(false);
    }
  };

  const handleOpenLong = async () => {
    if (!onPlaceOrder) return;
    setLoadingLong(true);
    try {
      await onPlaceOrder({
        type: "long",
        amount: longAmount,
        price: price,
        marketSymbol: market?.symbol ?? "",
        leverage: longLeverage,
      });
      addTrade({
        type: "long",
        symbol: market?.symbol ?? "",
        amount: longAmount,
        price: price,
        total: longAmount * price,
        leverage: longLeverage,
        status: "filled",
      });
      toast.success("Long Position Opened", {
        description: `Opened ${longAmount} ${
          market?.baseAsset ?? "units"
        } long at ${longLeverage}x leverage`,
      });
      setLongAmount(0);
    } catch (e: any) {
      toast.error("Long Position Failed", {
        description: e?.message || "Could not open long position",
      });
    } finally {
      setLoadingLong(false);
    }
  };

  const handleOpenShort = async () => {
    if (!onPlaceOrder) return;
    setLoadingShort(true);
    try {
      await onPlaceOrder({
        type: "short",
        amount: shortAmount,
        price: price,
        marketSymbol: market?.symbol ?? "",
        leverage: shortLeverage,
      });
      addTrade({
        type: "short",
        symbol: market?.symbol ?? "",
        amount: shortAmount,
        price: price,
        total: shortAmount * price,
        leverage: shortLeverage,
        status: "filled",
      });
      toast.success("Short Position Opened", {
        description: `Opened ${shortAmount} ${
          market?.baseAsset ?? "units"
        } short at ${shortLeverage}x leverage`,
      });
      setShortAmount(0);
    } catch (e: any) {
      toast.error("Short Position Failed", {
        description: e?.message || "Could not open short position",
      });
    } finally {
      setLoadingShort(false);
    }
  };

  const handlePlaceOption = async () => {
    if (!onPlaceOrder) return;
    setLoadingOption(true);
    try {
      const premium = optionAmount * price * 0.05; // Mock 5% premium
      await onPlaceOrder({
        type: optionType,
        amount: optionAmount,
        price: premium,
        marketSymbol: market?.symbol ?? "",
        strikePrice,
        expiry: selectedExpiry,
      });
      addTrade({
        type: optionType === "call" ? "buy" : "sell",
        symbol: market?.symbol ?? "",
        amount: optionAmount,
        price: premium,
        total: premium,
        status: "filled",
      });
      toast.success(`${optionType.toUpperCase()} Option Placed`, {
        description: `${optionAmount} contracts at strike ${strikePrice.toLocaleString()}, expiry ${selectedExpiry}`,
      });
      setOptionAmount(0);
    } catch (e: any) {
      toast.error("Option Order Failed", {
        description: e?.message || "Could not place option order",
      });
    } finally {
      setLoadingOption(false);
    }
  };

  // Options UI
  if (isOptions) {
    const premium = optionAmount * price * 0.05;
    const greeks = {
      delta: optionType === "call" ? 0.55 : -0.45,
      gamma: 0.02,
      theta: -0.03,
      vega: 0.15,
    };

    return (
      <div className="w-full bg-card border-t border-border overflow-y-auto">
        <div className="flex items-center gap-4 px-4 py-2 border-b border-border">
          <span className="text-xs text-foreground font-medium">Options</span>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Option Type & Strike */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOptionType("call")}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded transition-colors",
                  optionType === "call"
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                Call
              </button>
              <button
                onClick={() => setOptionType("put")}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded transition-colors",
                  optionType === "put"
                    ? "bg-red-500 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                Put
              </button>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Strike Price
              </div>
              <div className="bg-muted border border-border rounded px-3 py-2 flex items-center justify-between">
                <input
                  type="number"
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(Number(e.target.value))}
                  className="bg-transparent text-foreground text-sm outline-none flex-1"
                />
                <span className="text-muted-foreground text-xs">
                  {market?.quoteAsset ?? "NGN"}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Expiry</div>
              <div className="flex gap-2">
                {["1d", "1w", "2w", "1m", "3m"].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setSelectedExpiry(exp)}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded transition-colors",
                      selectedExpiry === exp
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {exp.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Contracts
              </div>
              <div className="bg-muted border border-border rounded px-3 py-2 flex items-center justify-between">
                <input
                  type="number"
                  value={optionAmount}
                  onChange={(e) =>
                    setOptionAmount(Math.max(0, Number(e.target.value)))
                  }
                  min={0}
                  className="bg-transparent text-foreground text-sm outline-none flex-1"
                />
              </div>
            </div>
          </div>

          {/* Premium & Greeks */}
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Premium (Cost)
              </div>
              <div className="bg-muted border border-border rounded px-3 py-2">
                <span className="text-foreground font-medium">
                  {premium.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-xs ml-2">
                  {market?.quoteAsset ?? "NGN"}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-2">Greeks</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded p-2">
                  <div className="text-xs text-muted-foreground">Delta</div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      greeks.delta > 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {greeks.delta.toFixed(2)}
                  </div>
                </div>
                <div className="bg-muted rounded p-2">
                  <div className="text-xs text-muted-foreground">Gamma</div>
                  <div className="text-sm font-medium text-foreground">
                    {greeks.gamma.toFixed(3)}
                  </div>
                </div>
                <div className="bg-muted rounded p-2">
                  <div className="text-xs text-muted-foreground">Theta</div>
                  <div className="text-sm font-medium text-red-500">
                    {greeks.theta.toFixed(3)}
                  </div>
                </div>
                <div className="bg-muted rounded p-2">
                  <div className="text-xs text-muted-foreground">Vega</div>
                  <div className="text-sm font-medium text-foreground">
                    {greeks.vega.toFixed(3)}
                  </div>
                </div>
              </div>
            </div>

            <Button
              className={cn(
                "w-full h-11 text-sm font-medium",
                optionType === "call"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              )}
              onClick={handlePlaceOption}
              disabled={loadingOption || optionAmount < 1}
            >
              {loadingOption
                ? "Processing..."
                : `Buy ${optionType.toUpperCase()}`}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Futures UI
  if (isDerivative) {
    return (
      <div className="w-full bg-card border-t border-border overflow-y-auto">
        <div className="flex items-center gap-4 px-4 py-2 border-b border-border">
          <span className="text-xs text-foreground font-medium">
            Derivatives
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Long Position */}
          <div className="space-y-3">
            <div className="text-xs text-foreground font-semibold mb-2">
              Long Position
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Entry Price
              </div>
              <div className="bg-muted border border-border rounded px-3 py-2 flex items-center justify-between">
                <span className="text-foreground text-sm">
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-muted-foreground text-xs">
                  {market?.quoteAsset ?? "NGN"}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Leverage</span>
                <span>{longLeverage.toFixed(1)}x</span>
              </div>
              <div className="bg-muted border border-border rounded px-3 py-2">
                <Slider
                  value={[longLeverage]}
                  onValueChange={(v) =>
                    setLongLeverage(Math.min(100, Math.max(1, v[0])))
                  }
                  max={100}
                  min={1}
                  step={0.1}
                />
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Amount</div>
              <div className="bg-muted border border-border rounded px-3 py-2">
                <input
                  type="number"
                  value={longAmount}
                  onChange={(e) =>
                    setLongAmount(Math.max(0, Number(e.target.value)))
                  }
                  className="bg-transparent text-foreground text-sm outline-none w-full"
                />
              </div>
            </div>

            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white h-11 text-sm font-medium"
              onClick={handleOpenLong}
              disabled={
                loadingLong ||
                longAmount < 1 ||
                longAmount * price > (ngnBalance ?? 0)
              }
            >
              {loadingLong ? "Opening..." : "Open Long"}
            </Button>
          </div>

          {/* Short Position */}
          <div className="space-y-3">
            <div className="text-xs text-foreground font-semibold mb-2">
              Short Position
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Entry Price
              </div>
              <div className="bg-muted border border-border rounded px-3 py-2 flex items-center justify-between">
                <span className="text-foreground text-sm">
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-muted-foreground text-xs">
                  {market?.quoteAsset ?? "NGN"}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Leverage</span>
                <span>{shortLeverage.toFixed(1)}x</span>
              </div>
              <div className="bg-muted border border-border rounded px-3 py-2">
                <Slider
                  value={[shortLeverage]}
                  onValueChange={(v) =>
                    setShortLeverage(Math.min(100, Math.max(1, v[0])))
                  }
                  max={100}
                  min={1}
                  step={0.1}
                />
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Amount</div>
              <div className="bg-muted border border-border rounded px-3 py-2">
                <input
                  type="number"
                  value={shortAmount}
                  onChange={(e) =>
                    setShortAmount(Math.max(0, Number(e.target.value)))
                  }
                  className="bg-transparent text-foreground text-sm outline-none w-full"
                />
              </div>
            </div>

            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white h-11 text-sm font-medium"
              onClick={handleOpenShort}
              disabled={
                loadingShort ||
                shortAmount < 1 ||
                shortAmount * price > (ngnBalance ?? 0)
              }
            >
              {loadingShort ? "Opening..." : "Open Short"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Stock UI
  return (
    <div className="w-full bg-card border-t border-border overflow-y-auto">
      <div className="flex items-center gap-4 px-4 py-2 border-b border-border">
        <span className="text-xs text-foreground font-medium">Trade</span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Buy Panel */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs mb-2">
            <button
              onClick={() => setBuyOrderType("limit")}
              className={cn(
                "font-medium transition-colors",
                buyOrderType === "limit"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Limit
            </button>
            <button
              onClick={() => setBuyOrderType("market")}
              className={cn(
                "font-medium transition-colors",
                buyOrderType === "market"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Market
            </button>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Price</div>
            <div className="bg-muted border border-border rounded px-3 py-2 flex items-center justify-between">
              {buyOrderType === "limit" ? (
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="bg-transparent text-foreground text-sm outline-none flex-1"
                />
              ) : (
                <span className="text-foreground text-sm">
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
              <span className="text-muted-foreground text-xs">
                {market?.quoteAsset ?? "NGN"}
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Amount</div>
            <div className="bg-muted border border-border rounded px-3 py-2">
              <input
                type="number"
                value={buyAmount}
                onChange={(e) =>
                  setBuyAmount(Math.max(0, Number(e.target.value)))
                }
                className="bg-transparent text-foreground text-sm outline-none w-full"
              />
            </div>
            <div className="mt-2">
              <Slider
                value={[buyAmount]}
                onValueChange={(v) => setBuyAmount(v[0])}
                max={buyMax}
                step={1}
              />
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Total</div>
            <div className="bg-muted border border-border rounded px-3 py-2">
              <span className="text-foreground text-sm">
                {totalBuy.toFixed(2)}
              </span>
              <span className="text-muted-foreground text-xs ml-2">
                {market?.quoteAsset ?? "NGN"}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white h-11 text-sm font-medium"
            onClick={handleBuy}
            disabled={
              loadingBuy || totalBuy > (ngnBalance ?? 0) || buyAmount < 1
            }
          >
            {loadingBuy
              ? "Processing..."
              : `Buy ${market?.baseAsset ?? "ASSET"}`}
          </Button>
        </div>

        {/* Sell Panel */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs mb-2">
            <button
              onClick={() => setSellOrderType("limit")}
              className={cn(
                "font-medium transition-colors",
                sellOrderType === "limit"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Limit
            </button>
            <button
              onClick={() => setSellOrderType("market")}
              className={cn(
                "font-medium transition-colors",
                sellOrderType === "market"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Market
            </button>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Price</div>
            <div className="bg-muted border border-border rounded px-3 py-2 flex items-center justify-between">
              {sellOrderType === "limit" ? (
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="bg-transparent text-foreground text-sm outline-none flex-1"
                />
              ) : (
                <span className="text-foreground text-sm">
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
              <span className="text-muted-foreground text-xs">
                {market?.quoteAsset ?? "NGN"}
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Amount</div>
            <div className="bg-muted border border-border rounded px-3 py-2">
              <input
                type="number"
                value={sellAmount}
                onChange={(e) =>
                  setSellAmount(Math.max(0, Number(e.target.value)))
                }
                className="bg-transparent text-foreground text-sm outline-none w-full"
              />
            </div>
            <div className="mt-2">
              <Slider
                value={[sellAmount]}
                onValueChange={(v) => setSellAmount(v[0])}
                max={sellMax}
                step={1}
              />
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Total</div>
            <div className="bg-muted border border-border rounded px-3 py-2">
              <span className="text-foreground text-sm">
                {totalSell.toFixed(2)}
              </span>
              <span className="text-muted-foreground text-xs ml-2">
                {market?.quoteAsset ?? "NGN"}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white h-11 text-sm font-medium"
            onClick={handleSell}
            disabled={
              loadingSell || sellAmount > availableUnits || sellAmount < 1
            }
          >
            {loadingSell
              ? "Processing..."
              : `Sell ${market?.baseAsset ?? "ASSET"}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;
