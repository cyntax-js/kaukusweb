/**
 * BROKER TRADING PAGE - Pro Layout
 * DIV1: Markets | Chart + BuySell | OrderBook (swappable positions based on config)
 * DIV2: UserTrades | EquityBalance with Deposit/Withdraw modals
 */

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/broker-theme/config";
import { useBrokerPaths } from "@/broker-theme/hooks/useBrokerPaths";
import { mockMarkets, Market } from "@/data/mockTradingData";

import { AppHeader, DepositWithdrawModal } from "@/broker-theme/components";
import TradingChart from "./trading/TradingChart";
import OrderBook from "./trading/OrderBook";
import TradingPanel from "./trading/TradingPanel";
import MarketsList from "./trading/MarketsList";
import PriceInfo from "./trading/PriceInfo";
import OrderHistory from "./trading/OrderHistory";
import EquityBalance from "./trading/EquityBalance";
import { TradingGrid } from "./trading/TradingGrid";
import { useTradeHistoryStore } from "@/broker-theme/stores/tradeHistoryStore";

const TradingPage = () => {
  const { config } = useTheme();
  const { marketType: marketTypeParam, pair: pairParam } = useParams<{
    marketType?: string;
    pair?: string;
  }>();
  const navigate = useNavigate();
  const { appPrefix } = useBrokerPaths();

  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [ngnBalance] = useState(1000000);
  const [portfolio] = useState<Record<string, number>>({});
  const trades = useTradeHistoryStore((state) => state.trades);

  // Deposit/Withdraw modal state
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const orderBookPosition = config.theme.layout.orderBookPosition || "right";

  const availableMarkets = useMemo(() => {
    return mockMarkets.filter((m) => {
      if (m.type === "stock" && config.services.includes("stock")) return true;
      if (
        m.type === "derivative" &&
        (config.services.includes("futures") ||
          config.services.includes("options"))
      )
        return true;
      if (
        m.type === "private_market" &&
        config.services.includes("private_market")
      )
        return true;
      if (m.type === "crypto" && config.services.includes("stock")) return true;
      return false;
    });
  }, [config.services]);

  useEffect(() => {
    if (pairParam) {
      const found = availableMarkets.find(
        (m) => m.symbol.toLowerCase() === pairParam.toLowerCase()
      );
      if (found) {
        setSelectedMarket(found);
        return;
      }
    }
    if (!selectedMarket && availableMarkets.length > 0) {
      setSelectedMarket(availableMarkets[0]);
    }
  }, [pairParam, availableMarkets, selectedMarket]);

  const handleSelectMarket = (market: Market) => {
    setSelectedMarket(market);
    const serviceType = market.type === "derivative" ? "futures" : "stock";
    navigate(`${appPrefix}/trade/${serviceType}/${market.symbol}`, {
      replace: true,
    });
  };

  const handlePlaceOrder = async (order: any) => {
    return { success: true };
  };

  const getMarketType = (): "stock" | "futures" | "options" => {
    if (marketTypeParam === "options") return "options";
    if (marketTypeParam === "futures" || selectedMarket?.type === "derivative")
      return "futures";
    return "stock";
  };

  if (config.services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium">No trading services available</p>
        </div>
      </div>
    );
  }

  if (!selectedMarket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          Loading markets...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <PriceInfo market={selectedMarket} />

      {/* Deposit/Withdraw Modals */}
      <DepositWithdrawModal
        open={depositModalOpen}
        onOpenChange={setDepositModalOpen}
        mode="deposit"
      />
      <DepositWithdrawModal
        open={withdrawModalOpen}
        onOpenChange={setWithdrawModalOpen}
        mode="withdraw"
        availableBalance={ngnBalance}
      />

      {/* DIV1: Main Trading Workspace */}
      <TradingGrid
        orderBookPosition={orderBookPosition}
        marketsPanel={
          <MarketsList
            markets={availableMarkets}
            selectedMarket={selectedMarket}
            onSelectMarket={handleSelectMarket}
            enabledServices={config.services}
          />
        }
        chartPanel={
          <>
            <div className="flex-1">
              <TradingChart market={selectedMarket} />
            </div>
            <div className="border-t border-border h-[20%]">
              <TradingPanel
                market={selectedMarket}
                onPlaceOrder={handlePlaceOrder}
                ngnBalance={ngnBalance}
                portfolio={portfolio}
                marketType={getMarketType()}
              />
            </div>
          </>
        }
        orderbookPanel={
          <OrderBook
            market={selectedMarket}
            isDerivative={selectedMarket.type === "derivative"}
          />
        }
      />

      {/* DIV2: User Activity & Funds */}
      <div className="bg-card border-t border-border grid grid-cols-12 gap-px min-h-[200px]">
        <div className="col-span-10 bg-card overflow-hidden">
          <OrderHistory
            userTrades={trades}
            isDerivative={selectedMarket.type === "derivative"}
          />
        </div>
        <div className="col-span-2 bg-card overflow-hidden">
          <EquityBalance
            ngnBalance={ngnBalance}
            portfolio={portfolio}
            onDeposit={() => setDepositModalOpen(true)}
            onWithdraw={() => setWithdrawModalOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default TradingPage;
