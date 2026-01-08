import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Types
interface Order {
  id: string;
  price: number;
  amount: number;
  collateral: number;
  collateralToken: string;
  type: "buy" | "sell";
}

interface MarketData {
  currentPrice: number;
  priceChange24h: number;
  volume24h: number;
  volume24hChange: number;
  totalVolume: number;
  impliedFDV: number;
  settleTime: string;
}

interface RecentActivity {
  id: string;
  time: string;
  orderType: string;
  side: "buy" | "sell";
  pair: string;
  price: number;
  amount: number;
  collateral: number;
  collateralToken: string;
}

// Mock data
const mockMarketData: MarketData = {
  currentPrice: 0.0894,
  priceChange24h: -87.221,
  volume24h: 2786.1,
  volume24hChange: 106.4,
  totalVolume: 18800,
  impliedFDV: 895000000,
  settleTime: "TBA",
};

const mockBuyOrders: Order[] = [
  {
    id: "1",
    price: 0.0889,
    amount: 790,
    collateral: 70.2,
    collateralToken: "USDC",
    type: "buy",
  },
  {
    id: "2",
    price: 0.089,
    amount: 5000,
    collateral: 445,
    collateralToken: "USDC",
    type: "buy",
  },
  {
    id: "3",
    price: 0.096,
    amount: 2000,
    collateral: 192,
    collateralToken: "USDC",
    type: "buy",
  },
  {
    id: "4",
    price: 0.097,
    amount: 10000,
    collateral: 970,
    collateralToken: "USDC",
    type: "buy",
  },
  {
    id: "5",
    price: 0.25,
    amount: 200,
    collateral: 50,
    collateralToken: "USDC",
    type: "buy",
  },
];

const mockSellOrders: Order[] = [
  {
    id: "6",
    price: 0.069,
    amount: 5000,
    collateral: 345,
    collateralToken: "USDC",
    type: "sell",
  },
  {
    id: "7",
    price: 0.065,
    amount: 5000,
    collateral: 325,
    collateralToken: "USDC",
    type: "sell",
  },
  {
    id: "8",
    price: 0.05,
    amount: 10000,
    collateral: 500,
    collateralToken: "USDC",
    type: "sell",
  },
  {
    id: "9",
    price: 0.02,
    amount: 1000,
    collateral: 20,
    collateralToken: "USDC",
    type: "sell",
  },
];

const mockRecentActivities: RecentActivity[] = [
  {
    id: "1",
    time: "3m ago",
    orderType: "Open",
    side: "sell",
    pair: "FOGO/USDC",
    price: 0.0889,
    amount: 790,
    collateral: 70.2,
    collateralToken: "USDC",
  },
  {
    id: "2",
    time: "6h ago",
    orderType: "Open",
    side: "buy",
    pair: "FOGO/USDC",
    price: 0.069,
    amount: 5000,
    collateral: 345,
    collateralToken: "USDC",
  },
  {
    id: "3",
    time: "8h ago",
    orderType: "Open",
    side: "sell",
    pair: "FOGO/USDC",
    price: 0.089,
    amount: 5000,
    collateral: 445,
    collateralToken: "USDC",
  },
  {
    id: "4",
    time: "8h ago",
    orderType: "Filled",
    side: "buy",
    pair: "FOGO/USDC",
    price: 0.0894,
    amount: 1700,
    collateral: 152.1,
    collateralToken: "USDC",
  },
  {
    id: "5",
    time: "10h ago",
    orderType: "Open",
    side: "sell",
    pair: "FOGO/USDC",
    price: 0.096,
    amount: 2000,
    collateral: 192,
    collateralToken: "USDC",
  },
];

const SecondaryMarketDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"market" | "about" | "rules">(
    "market"
  );
  const [orderType, setOrderType] = useState<"regular" | "resell" | "all">(
    "regular"
  );
  const [viewMode, setViewMode] = useState<"price" | "prediction">("price");
  const [timeRange, setTimeRange] = useState<"7d" | "1M" | "3M">("7d");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { marketId } = useParams<{ marketId: string }>();

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number): string => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number): string => {
    return value.toLocaleString("en-US");
  };

  console.log("====================================");
  console.log(marketId, "marketId");
  console.log("====================================");
  return (
    <div className="container mx-auto max-w-full pb-4 md:px-6 lg:px-12 lg:pt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="md:mb-4 hidden lg:block">
        <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5 !gap-1">
          <li className="inline-flex items-center gap-1.5">
            <a
              className="transition-colors hover:text-neutral-primary text-xs text-neutral-300"
              href="/"
            >
              Whales.Market
            </a>
          </li>
          <li className="[&>svg]:size-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right text-neutral-secondary"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <a
              className="transition-colors hover:text-neutral-primary text-xs text-neutral-secondary"
              href="/"
            >
              Premarket
            </a>
          </li>
          <li className="[&>svg]:size-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right text-neutral-secondary"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </li>
          <li className="inline-flex items-center gap-1.5 text-xs text-neutral-primary">
            FOGO
          </li>
        </ol>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col items-center justify-between gap-4 border-neutral-1 py-3 md:border-b-[4px] md:py-4 md:pt-8 lg:px-0 lg:pt-4 xl:flex-row xl:gap-8">
        <div className="flex w-full flex-col items-start gap-0 border-neutral-1 md:flex-row md:gap-8 md:border-b md:pb-4 xl:flex-1 xl:border-b-0 xl:pb-0">
          {/* Token Info */}
          <div className="relative flex w-full items-center justify-between gap-4 pb-4 md:w-auto md:p-0">
            <div className="flex items-center gap-2 pl-4 md:pl-0">
              <a
                className="flex items-center justify-center md:hidden"
                href="/en"
              >
                <svg
                  className="w-5 h-5 text-neutral-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="nonzero">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z"></path>
                    <path
                      fill="currentColor"
                      d="M3.636 11.293a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414L6.757 13H20a1 1 0 1 0 0-2H6.757l3.95-3.95a1 1 0 0 0-1.414-1.414l-5.657 5.657Z"
                    ></path>
                  </g>
                </svg>
              </a>
              <div className="relative">
                <div
                  className="relative overflow-hidden p-1"
                  style={{ width: "44px", height: "44px" }}
                >
                  <img
                    alt="FOGO Token"
                    src="https://cdn.whales.market/icon/8a4ca1b9-928d-484e-a29a-493a8856bd4e.jpg"
                    className="aspect-square rounded-full object-cover"
                    width={44}
                    height={44}
                  />
                </div>
                <div className="z-1 absolute bottom-[-4px] left-[-2px] rounded bg-neutral-1 p-[2px]">
                  <img
                    alt="Solana Network"
                    src="https://cdn.whales.market/network-icons/Solana.png"
                    className="block rounded object-cover"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
              <div>
                <p className="font-medium whitespace-pre text-lg text-neutral-primary">
                  FOGO
                </p>
                <div className="whitespace-pre py-0.5 text-xs text-neutral-tertiary">
                  Fogo
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-4 md:hidden">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out bg-btn-secondary text-neutral-inverse shadow-xs hover:bg-btn-secondary-hover hover:brightness-110 active:bg-btn-secondary-active active:brightness-100 px-4 py-2 has-[>svg]:px-2 rounded-lg h-9 w-9 md:w-fit md:min-w-[119px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Market Stats */}
          <div className="flex w-full items-start justify-between md:justify-start md:gap-8">
            <div className="flex max-w-[171px] flex-col items-start justify-between pl-4 pt-3 md:max-w-none md:pl-0 md:pt-0">
              <div className="text-2xl font-medium text-neutral-primary md:text-lg">
                ${mockMarketData.currentPrice.toFixed(4)}
              </div>
              <div
                className={`py-0.5 text-xs ${
                  mockMarketData.priceChange24h >= 0
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {formatPercentage(mockMarketData.priceChange24h)}
              </div>
            </div>
            <div className="flex min-w-[205px] flex-col items-center justify-between gap-y-2 pr-4 pt-3 md:w-full md:flex-row md:items-start md:justify-start md:gap-8 md:p-0 md:pt-0">
              <div className="flex w-full items-center gap-x-4 md:w-auto md:gap-8">
                <div className="mb-auto flex w-full flex-col items-start justify-between gap-1 p-0 md:w-auto md:gap-0">
                  <div className="text-[10px] text-neutral-tertiary md:py-[6px] md:text-xs">
                    24h Vol.
                  </div>
                  <div className="flex-1 text-[10px] text-neutral-primary md:py-0.5 md:text-xs">
                    <span>{formatCurrency(mockMarketData.volume24h)}</span>
                    <span
                      className={`ml-2 text-[10px] md:text-xs ${
                        mockMarketData.volume24hChange >= 0
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {formatPercentage(mockMarketData.volume24hChange)}
                    </span>
                  </div>
                </div>
                <div className="mb-auto flex w-full flex-col items-start justify-between gap-1 p-0 md:w-auto md:gap-0">
                  <div className="text-[10px] text-neutral-tertiary md:py-[6px] md:text-xs">
                    Total Vol.
                  </div>
                  <div className="text-[10px] text-neutral-primary md:py-0.5 md:text-xs">
                    {formatCurrency(mockMarketData.totalVolume)}
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center gap-x-4 md:w-auto md:gap-8">
                <div className="mb-auto flex w-full flex-col items-start justify-between gap-1 p-0 md:w-auto md:gap-0">
                  <div className="text-[10px] text-neutral-tertiary md:py-[6px] md:text-xs">
                    Implied FDV
                  </div>
                  <div className="text-[10px] text-neutral-primary md:py-0.5 md:text-xs">
                    {formatCurrency(mockMarketData.impliedFDV)}
                  </div>
                </div>
                <div className="mb-auto flex w-full flex-col items-start justify-between gap-1 p-0 md:w-auto md:gap-0">
                  <div className="hover-underline-dashed cursor-pointer text-[10px] text-neutral-tertiary md:py-[6px] md:text-xs">
                    Settle Time (UTC)
                  </div>
                  <div className="text-sm text-neutral-primary">
                    <div className="rounded-full md:bg-neutral-2 md:px-2 md:py-1">
                      <p className="font-medium text-[10px] uppercase leading-[23px] text-neutral-secondary md:leading-4">
                        {mockMarketData.settleTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden w-full items-center justify-between gap-2 md:flex xl:w-[40%] xl:justify-end xl:gap-3">
          <div className="flex items-center gap-2">
            <div className="hidden cursor-pointer items-center justify-between gap-[6px] rounded-lg border border-neutral-2 py-2 pl-4 pr-2 xl:flex">
              <p className="font-medium text-[14px] leading-5 text-neutral-primary">
                On
              </p>
              <img
                alt="Polymarket"
                className="hidden h-5 w-auto xl:block"
                src="/_next/image?url=%2Fimages%2FpolyIcon.png"
              />
            </div>
            <div className="flex items-center gap-0 rounded-lg border border-neutral-2">
              <div className="flex cursor-pointer items-center gap-2 py-2 pl-4 pr-2">
                <p className="font-medium text-sm text-neutral-primary">
                  <span className="hidden md:block">About FOGO</span>
                  <span className="block md:hidden">About</span>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down text-neutral-tertiary"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="hidden h-[18px] w-[2px] bg-neutral-2 xl:block"></div>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out bg-btn-secondary text-neutral-inverse shadow-xs hover:bg-btn-secondary-hover hover:brightness-110 active:bg-btn-secondary-active active:brightness-100 px-4 py-2 has-[>svg]:px-2 rounded-lg h-9 w-9 md:w-fit md:min-w-[119px]">
            <span className="block md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </span>
            <span className="hidden md:block">Create Order</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-4 flex gap-4 border-neutral-1">
        {/* Left Panel */}
        <div className="flex w-full max-w-full flex-col gap-4 lg:max-w-[calc(100%-384px)] lg:gap-4 lg:border-r lg:border-neutral-1 lg:px-6 lg:pl-0 lg:pr-4 xl:gap-4 xl:border-r xl:px-6 xl:pl-0 xl:pr-4">
          {/* Tabs */}
          <div className="flex h-12 items-center gap-6 border-b border-[#1B1B1C] max-md:px-4">
            <button
              className={`h-full border-b-2 ${
                activeTab === "market"
                  ? "border-[#f9f9fa]"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("market")}
            >
              <p
                className={`text-sm font-medium ${
                  activeTab === "market"
                    ? "text-neutral-primary"
                    : "text-neutral-tertiary"
                }`}
              >
                Market
              </p>
            </button>
            <button
              className={`h-full ${
                activeTab === "about" ? "border-b-2 border-[#f9f9fa]" : ""
              }`}
              onClick={() => setActiveTab("about")}
            >
              <p
                className={`text-sm font-medium ${
                  activeTab === "about"
                    ? "text-neutral-primary"
                    : "text-neutral-tertiary"
                }`}
              >
                About
              </p>
            </button>
            <button
              className={`h-full ${
                activeTab === "rules" ? "border-b-2 border-[#f9f9fa]" : ""
              }`}
              onClick={() => setActiveTab("rules")}
            >
              <p
                className={`text-sm font-medium ${
                  activeTab === "rules"
                    ? "text-neutral-primary"
                    : "text-neutral-tertiary"
                }`}
              >
                Rules
              </p>
            </button>
          </div>

          {/* Chart Placeholder */}
          <div className="min-h-[431px] w-full border-y border-[#1B1B1C] bg-transparent md:rounded-lg md:border">
            <div className="flex items-center justify-between border-b border-[#1B1B1C] py-2 pl-2 pr-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <button
                    className={`flex items-center gap-1 rounded px-2 py-[2px] text-xs font-medium transition-colors ${
                      viewMode === "price"
                        ? "bg-[#1B1B1C] text-[#F9F9FA]"
                        : "text-neutral-tertiary hover:text-[#F9F9FA]"
                    }`}
                    onClick={() => setViewMode("price")}
                  >
                    Price
                  </button>
                  <button
                    className={`flex items-center gap-1 rounded px-2 py-[2px] text-xs font-medium transition-colors ${
                      viewMode === "prediction"
                        ? "bg-[#1B1B1C] text-[#F9F9FA]"
                        : "text-neutral-tertiary hover:text-[#F9F9FA]"
                    }`}
                    onClick={() => setViewMode("prediction")}
                  >
                    Prediction
                    <span className="rounded border border-[#FACC15] px-1 py-[2px] text-[10px] font-medium uppercase leading-3 text-[#FACC15]">
                      New
                    </span>
                  </button>
                </div>
                <div className="h-5 w-[1px] bg-[#1B1B1C]"></div>
                <div className="flex gap-1">
                  {(["7d", "1M", "3M"] as const).map((range) => (
                    <button
                      key={range}
                      className={`rounded px-2 py-[2px] text-xs transition-colors ${
                        timeRange === range
                          ? "bg-[#1B1B1C] text-[#F9F9FA]"
                          : "text-neutral-tertiary hover:text-[#F9F9FA]"
                      }`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-neutral-tertiary">Time</span>
                  <span className="text-xs text-[#F9F9FA] min-w-[120px]">
                    08/01/2026 22:08:24
                  </span>
                </div>
              </div>
            </div>
            <div className="flex h-[360px] items-center justify-center">
              <div className="text-neutral-tertiary">
                Chart would be displayed here
              </div>
            </div>
          </div>

          {/* Order Type Selector */}
          <div className="flex shrink justify-between px-4 pt-4 md:px-0 xl:pt-0">
            <div>
              <div className="flex items-center">
                <div className="flex items-center rounded-lg border border-neutral-2">
                  {(["Regular", "Resell", "All"] as const).map((type) => {
                    const key = type.toLowerCase() as
                      | "regular"
                      | "resell"
                      | "all";
                    return (
                      <button
                        key={type}
                        className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          orderType === key
                            ? "border-primary-muted bg-primary-muted-10 text-primary"
                            : "border-transparent text-neutral-primary"
                        }`}
                        onClick={() => setOrderType(key)}
                      >
                        {type}
                        {type === "Resell" && (
                          <svg
                            className="h-4 w-4 text-neutral-tertiary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <g id="information_line" fill="none">
                              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"></path>
                              <path
                                fill="currentColor"
                                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2zM12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                              ></path>
                            </g>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                  <div className="h-4 w-px bg-neutral-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Buy/Sell Buttons (Mobile) */}
          <div className="my-2 flex items-center justify-between px-4 md:my-4 md:px-0 xl:mb-6 xl:hidden">
            <div className="flex w-full items-center rounded-lg border border-neutral-2">
              <button className="flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 border border-primary-muted bg-primary-muted-10 text-primary">
                Buy
              </button>
              <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-transparent px-4 py-2 text-sm font-medium transition-all duration-200 text-neutral-primary">
                Sell
              </button>
            </div>
          </div>

          {/* Order Books */}
          <div className="flex items-center gap-4 border-neutral-1 px-4 py-2 pb-4 md:px-0 lg:border-b-4 lg:pt-0">
            {/* Buy Orders */}
            <div className="custom-scrollbar h-[600px] max-h-[600px] min-h-[600px] flex-1 border-b-4 border-neutral-1 pb-4 lg:border-b-0 lg:!pr-0 lg:pb-0 block">
              <div className="relative h-full w-full">
                <div className="scrollbar-thin custom-scrollbar h-full max-h-[600px] overflow-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 z-10 [&_tr]:border-b-0 !bg-neutral-1 bg-transparent">
                      <tr className="border-b">
                        <th className="p-2 text-left text-xs font-medium cursor-pointer select-none">
                          <div className="flex items-center gap-[5px]">
                            <span className="text-neutral-tertiary">
                              Price ($)
                            </span>
                            <div className="flex flex-col gap-[2px]">
                              <svg
                                className="w-[6px] h-[4px] text-neutral-primary"
                                viewBox="0 0 6 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.44604 0.242534C2.59297 0.0872397 2.79223 0 3 0C3.20777 0 3.40703 0.0872397 3.55396 0.242534L5.77059 2.58598C5.88018 2.70188 5.9548 2.84954 5.98499 3.01028C6.01519 3.17102 5.9996 3.33762 5.94022 3.48899C5.88083 3.64037 5.7803 3.76972 5.65136 3.86068C5.52242 3.95165 5.37086 4.00013 5.21585 4H0.784155C0.629143 4.00013 0.477579 3.95165 0.348637 3.86068C0.219696 3.76972 0.119171 3.64037 0.059784 3.48899C0.000396493 3.33762 -0.0151856 3.17102 0.0150086 3.01028C0.0452028 2.84954 0.119816 2.70188 0.22941 2.58598L2.44604 0.242534Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <svg
                                className="w-[6px] h-[4px] text-neutral-tertiary"
                                viewBox="0 0 6 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.55396 3.75747C3.40703 3.91276 3.20777 4 3 4C2.79223 4 2.59297 3.91276 2.44604 3.75747L0.22941 1.41402C0.119816 1.29812 0.0452028 1.15046 0.0150086 0.98972C-0.0151856 0.828979 0.000396493 0.662381 0.059784 0.511005C0.119171 0.359629 0.219696 0.230277 0.348637 0.139316C0.477579 0.0483546 0.629143 -0.000128678 0.784155 2.56496e-07H5.21585C5.37086 -0.000128678 5.52242 0.0483546 5.65136 0.139316C5.7803 0.230277 5.88083 0.359629 5.94022 0.511005C5.9996 0.662381 6.01519 0.828979 5.98499 0.98972C5.9548 1.15046 5.88018 1.29812 5.77059 1.41402L3.55396 3.75747Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium cursor-pointer select-none">
                          <div className="flex items-center gap-[5px]">
                            <div className="flex w-full items-center justify-end gap-2">
                              <span className="text-neutral-tertiary">
                                Amount
                              </span>
                            </div>
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium cursor-pointer select-none">
                          <div className="flex items-center gap-[5px]">
                            <div className="flex w-full items-center justify-end gap-2">
                              <span className="text-neutral-tertiary">
                                Collateral
                              </span>
                            </div>
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium">
                          <div className="flex items-center gap-[5px]">
                            <div className="flex w-full min-w-[101px] items-center justify-end gap-2"></div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr]:border-b-2 [&_tr]:border-b-neutral-0">
                      {mockBuyOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="w-full hidden hover:bg-neutral-2 md:table-row cursor-pointer relative rounded-[8px] bg-overlay-3 transition-all duration-200 hover:!bg-neutral-2"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-neutral-primary">
                                {order.price.toFixed(4)}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="text-right text-sm text-neutral-primary">
                              {formatNumber(order.amount)}
                            </div>
                          </td>
                          <td className="p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="flex items-center justify-end gap-1">
                              <span className="text-sm text-neutral-primary">
                                {order.collateral.toFixed(1)}
                              </span>
                              <img
                                alt="collateral"
                                className="rounded-full"
                                src="https://cdn.whales.market/icon/ffe5b564-5455-4a22-9ed0-ea49a87b8e51.png"
                                width={16}
                                height={16}
                              />
                            </div>
                          </td>
                          <td className="rounded-tr-[10px] rounded-br-[10px] p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-in-out bg-btn-success-tonal text-success shadow-xs hover:bg-btn-success-tonal-hover active:bg-btn-success-tonal-active h-7 px-3 py-1.5 text-xs has-[>svg]:px-1.5 rounded-md min-w-13">
                                Buy
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="hidden h-[600px] w-[1px] bg-[#1B1B1C] xl:block"></div>

            {/* Sell Orders */}
            <div className="custom-scrollbar h-[600px] max-h-[600px] min-h-[600px] flex-1 border-b-4 pb-4 lg:border-b-0 lg:pb-0 block">
              <div className="relative h-full w-full">
                <div className="scrollbar-thin custom-scrollbar h-full max-h-[600px] overflow-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 z-10 [&_tr]:border-b-0 !bg-neutral-1 bg-transparent">
                      <tr className="border-b">
                        <th className="p-2 text-left text-xs font-medium cursor-pointer select-none">
                          <div className="flex items-center gap-[5px]">
                            <span className="text-neutral-tertiary">
                              Price ($)
                            </span>
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium cursor-pointer select-none">
                          <div className="flex items-center gap-[5px]">
                            <div className="flex w-full items-center justify-end gap-2">
                              <span className="text-neutral-tertiary">
                                Amount
                              </span>
                            </div>
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium cursor-pointer select-none">
                          <div className="flex items-center gap-[5px]">
                            <div className="flex w-full items-center justify-end gap-2">
                              <span className="text-neutral-tertiary">
                                Collateral
                              </span>
                            </div>
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium">
                          <div className="flex items-center gap-[5px]">
                            <div className="flex w-full min-w-[101px] items-center justify-end gap-2"></div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr]:border-b-2 [&_tr]:border-b-neutral-0">
                      {mockSellOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="w-full hidden md:table-row cursor-pointer relative rounded-[8px] bg-overlay-3 transition-all duration-200 hover:bg-neutral-2"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-neutral-primary">
                                {order.price.toFixed(3)}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="text-right text-sm text-neutral-primary">
                              {formatNumber(order.amount)}
                            </div>
                          </td>
                          <td className="p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="flex items-center justify-end gap-1">
                              <span className="text-sm text-neutral-primary">
                                {order.collateral}
                              </span>
                              <img
                                alt="collateral"
                                className="rounded-full"
                                src="https://cdn.whales.market/icon/ffe5b564-5455-4a22-9ed0-ea49a87b8e51.png"
                                width={16}
                                height={16}
                              />
                            </div>
                          </td>
                          <td className="rounded-tr-[10px] rounded-br-[10px] p-2 first:rounded-tl-[8px] first:rounded-bl-[8px] last:rounded-tr-[8px] last:rounded-br-[8px] w-1/4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-in-out bg-btn-danger-tonal text-danger shadow-xs hover:bg-btn-danger-tonal-hover active:bg-btn-danger-tonal-active h-7 px-3 py-1.5 text-xs has-[>svg]:px-1.5 rounded-md min-w-13">
                                Sell
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="relative w-full px-4 lg:px-0">
            <div className="relative box-border flex w-full flex-col items-start justify-start gap-2 px-0 pb-4 lg:py-4">
              <div className="mb-2 flex w-full items-center justify-between">
                <p className="font-medium text-lg text-neutral-primary lg:px-2">
                  Recent Activities
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out bg-btn-secondary-tonal text-neutral-primary shadow-xs hover:bg-btn-secondary-tonal-hover hover:brightness-110 active:bg-btn-secondary-tonal-active h-9 has-[>svg]:px-2 gap-2 rounded-lg px-2 py-2">
                  Filter
                  <svg
                    className="w-4 h-4 text-neutral-primary"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.7066 10.7068C8.5191 10.894 8.26493 10.9992 7.99993 10.9992C7.73493 10.9992 7.48077 10.894 7.29327 10.7068L3.52127 6.93609C3.33376 6.74849 3.22845 6.49409 3.22852 6.22885C3.22858 5.96361 3.334 5.70926 3.5216 5.52176C3.7092 5.33425 3.9636 5.22894 4.22884 5.229C4.49407 5.22907 4.74843 5.33449 4.93593 5.52209L7.99993 8.58609L11.0639 5.52209C11.2524 5.33984 11.505 5.23892 11.7672 5.24108C12.0294 5.24323 12.2803 5.34828 12.4658 5.5336C12.6513 5.71893 12.7565 5.96969 12.7589 6.23189C12.7613 6.49408 12.6607 6.74673 12.4786 6.93542L8.70727 10.7074L8.7066 10.7068Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="relative h-[500px] w-full">
                <div className="scrollbar-thin custom-scrollbar h-full max-h-[600px] overflow-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 z-10 !bg-neutral-1 bg-transparent">
                      <tr className="border-b hidden md:table-row">
                        <th
                          className="p-2 text-left text-xs font-medium"
                          style={{ width: "100px", minWidth: "100px" }}
                        >
                          <p className="text-xs w-full font-normal text-neutral-tertiary">
                            Time
                          </p>
                        </th>
                        <th
                          className="p-2 text-left text-xs font-medium"
                          style={{ width: "100px", minWidth: "100px" }}
                        >
                          <p className="text-xs w-full font-normal text-neutral-tertiary">
                            Order Type
                          </p>
                        </th>
                        <th
                          className="p-2 text-left text-xs font-medium"
                          style={{ width: "100px", minWidth: "100px" }}
                        >
                          <div className="w-full text-left text-neutral-tertiary">
                            Side
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium">
                          <div className="w-full text-left text-neutral-tertiary">
                            Pair
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium">
                          <div className="w-full min-w-[50px] text-right text-neutral-tertiary">
                            Price ($)
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium">
                          <div className="w-full text-right text-neutral-tertiary">
                            Amount
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium">
                          <div className="w-full text-right text-neutral-tertiary">
                            Collateral
                          </div>
                        </th>
                        <th className="p-2 text-left text-xs font-medium">
                          <div className="w-full text-right text-neutral-tertiary">
                            Tx.ID
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-3">
                      {mockRecentActivities.map((activity) => (
                        <tr
                          key={activity.id}
                          className="hidden md:table-row hover:bg-white/5 transition-colors duration-200"
                        >
                          <td
                            className="p-2 w-1/7"
                            style={{ width: "100px", minWidth: "100px" }}
                          >
                            <p className="text-sm font-normal text-neutral-tertiary">
                              {activity.time}
                            </p>
                          </td>
                          <td
                            className="p-2 w-1/7"
                            style={{ width: "100px", minWidth: "100px" }}
                          >
                            <div className="text-left text-sm font-normal text-neutral-primary">
                              {activity.orderType}
                            </div>
                          </td>
                          <td
                            className="p-2 w-1/7"
                            style={{ width: "100px", minWidth: "100px" }}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-medium ${
                                  activity.side === "buy"
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                              >
                                {activity.side === "buy" ? "Buy" : "Sell"}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 w-1/7">
                            <div className="text-sm font-medium text-neutral-primary">
                              {activity.pair}
                            </div>
                          </td>
                          <td className="p-2 w-1/7">
                            <div className="text-right text-sm font-medium text-neutral-primary">
                              ${activity.price.toFixed(4)}
                            </div>
                          </td>
                          <td className="p-2 w-1/7">
                            <div className="text-right text-sm font-medium text-neutral-primary">
                              {formatNumber(activity.amount)}
                            </div>
                          </td>
                          <td className="p-2 w-1/7">
                            <div className="flex items-center justify-end gap-1">
                              <span className="text-sm font-medium text-neutral-primary">
                                {activity.collateral}
                              </span>
                              <img
                                alt="token"
                                className="rounded-full"
                                src="https://cdn.whales.market/icon/ffe5b564-5455-4a22-9ed0-ea49a87b8e51.png"
                                width={16}
                                height={16}
                              />
                            </div>
                          </td>
                          <td className="p-2 w-1/7">
                            <div className="flex justify-end">
                              <div className="flex h-[28px] w-[52px] cursor-pointer items-center justify-center rounded-md border border-neutral-2 p-1.5 transition-all duration-200 hover:border-neutral-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-arrow-up-right h-3 w-3"
                                  aria-hidden="true"
                                >
                                  <path d="M7 7h10v10"></path>
                                  <path d="M7 17 17 7"></path>
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Trading Widget */}
        <div className="hidden w-[384px] lg:block">
          <div className="flex flex-col gap-2 border-neutral-1 lg:mb-4 lg:border-b-4 lg:py-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-lg">Trade FOGO</div>
                  </div>
                  <div className="font-normal text-xs text-neutral-tertiary">
                    Price -{" "}
                    {selectedOrder ? `$${selectedOrder.price.toFixed(4)}` : "-"}
                  </div>
                </div>
              </div>

              {selectedOrder ? (
                <>
                  <div className="flex flex-col items-center justify-center rounded-[10px] border border-neutral-1 p-8">
                    <div className="text-center">
                      <p className="font-medium text-lg text-neutral-primary">
                        Selected Order
                      </p>
                      <p className="text-sm text-neutral-tertiary mt-2">
                        Price: ${selectedOrder.price.toFixed(4)}
                      </p>
                      <p className="text-sm text-neutral-tertiary">
                        Amount: {formatNumber(selectedOrder.amount)}
                      </p>
                      <p className="text-sm text-neutral-tertiary">
                        Collateral: {selectedOrder.collateral}{" "}
                        {selectedOrder.collateralToken}
                      </p>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-in-out bg-btn-secondary text-neutral-inverse shadow-xs hover:bg-btn-secondary-hover hover:brightness-110 active:bg-btn-secondary-active active:brightness-100 h-11 px-5 py-2.5 text-base has-[>svg]:px-2.5 rounded-[10px]">
                    Trade FOGO
                  </button>
                </>
              ) : (
                <>
                  <div className="flex min-h-[216px] flex-col items-center justify-center rounded-[10px] border border-neutral-1 p-8 text-neutral-tertiary">
                    <img
                      alt="no-offer"
                      className="min-h-24 min-w-24"
                      src="/icons/mascot.svg"
                    />
                    <p className="font-normal text-xs text-center text-neutral-tertiary mt-4">
                      No order selected yet.
                      <br />
                      Pick one from the list to start trading.
                    </p>
                  </div>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-in-out bg-btn-secondary text-neutral-inverse shadow-xs hover:bg-btn-secondary-hover hover:brightness-110 active:bg-btn-secondary-active active:brightness-100 h-11 px-5 py-2.5 text-base has-[>svg]:px-2.5 rounded-[10px]"
                    disabled
                  >
                    Trade FOGO
                  </button>
                </>
              )}

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-normal text-sm text-neutral-tertiary">
                    Price
                  </p>
                  <p className="font-medium text-sm text-neutral-primary">
                    {selectedOrder ? `$${selectedOrder.price.toFixed(4)}` : "-"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-normal text-sm text-neutral-tertiary">
                    Amount Deliver
                  </p>
                  <p className="font-medium text-sm text-neutral-primary">
                    {selectedOrder ? `${selectedOrder.amount} FOGO` : "-"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-normal text-sm text-neutral-tertiary">
                    To be Received
                  </p>
                  <p className="font-medium text-sm text-neutral-primary">
                    {selectedOrder
                      ? `${selectedOrder.collateral} ${selectedOrder.collateralToken}`
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* My Orders Tabs */}
          <div className="relative flex h-full w-full flex-col lg:h-auto lg:gap-4">
            <div className="flex flex-col w-full gap-0">
              <div className="flex h-[52px] w-full items-center gap-6 border-b border-neutral-2">
                <div className="relative flex h-[52px] cursor-pointer flex-col items-center justify-between text-neutral-primary">
                  <div className="h-0.5 w-4"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      My Filled Orders
                    </span>
                    <div className="inline-flex items-center justify-center rounded-full font-medium w-fit uppercase px-2 py-1 bg-success-muted-10 text-success hover:bg-success-muted-20/150 h-5 min-w-[20px] text-2xs">
                      0
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-success"></div>
                </div>
                <div className="relative flex h-[52px] cursor-pointer flex-col items-center justify-between text-neutral-tertiary">
                  <div className="h-0.5 w-4"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">My Open Orders</span>
                    <div className="inline-flex items-center justify-center rounded-full font-medium w-fit uppercase px-2 py-1 bg-secondary-muted-20 text-neutral-secondary hover:bg-secondary-muted-20/150 h-5 min-w-[20px] text-2xs">
                      0
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-transparent"></div>
                </div>
              </div>
              <div className="flex-1 outline-none mt-4">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex h-[240px] flex-col items-center justify-center gap-4 rounded-[10px] border border-neutral-2 px-16 py-6">
                    <img alt="empty" src="/icons/empty.svg" />
                    <div className="text-center text-[12px] text-neutral-tertiary">
                      Please connect your wallet to view orders
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryMarketDetail;
