// SecondaryMarket.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mock data types
interface TokenData {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  network: string;
  networkIcon: string;
  lastPrice: number;
  priceChange: number;
  isPriceChangePositive: boolean;
  volume24h: number;
  volume24hChange: number;
  isVolume24hChangePositive: boolean;
  totalVolume: number;
  totalVolumeChange: number;
  isTotalVolumeChangePositive: boolean;
  impliedFDV: string | null;
  settleTime: string;
}

interface ActivityData {
  id: string;
  time: string;
  orderType: "Open" | "Filled";
  side: "Buy" | "Sell";
  tokenSymbol: string;
  tokenLogo: string;
  pair: string;
  price: number;
  amount: number;
  collateral: number;
  collateralSymbol: string;
}

// Mock data
const mockTokenData: TokenData[] = [
  {
    id: "1",
    name: "Fogo",
    symbol: "FOGO",
    logo: "https://cdn.whales.market/icon/8a4ca1b9-928d-484e-a29a-493a8856bd4e.jpg",
    network: "Solana",
    networkIcon: "https://cdn.whales.market/network-icons/Solana.png",
    lastPrice: 0.0894,
    priceChange: -87.2,
    isPriceChangePositive: false,
    volume24h: 2786.1,
    volume24hChange: 106.4,
    isVolume24hChangePositive: true,
    totalVolume: 18745,
    totalVolumeChange: 17.5,
    isTotalVolumeChangePositive: true,
    impliedFDV: "895M",
    settleTime: "TBA",
  },
  {
    id: "2",
    name: "Billions Network",
    symbol: "BILL",
    logo: "https://cdn.whales.market/icon/79c3f4b4-1ad0-4482-9e98-1d5b9abe9334.jpg",
    network: "Ethereum",
    networkIcon: "https://cdn.whales.market/network-icons/Ethereum.png",
    lastPrice: 0.012,
    priceChange: 14.3,
    isPriceChangePositive: true,
    volume24h: 770,
    volume24hChange: 130.9,
    isVolume24hChangePositive: true,
    totalVolume: 46515,
    totalVolumeChange: 1.68,
    isTotalVolumeChangePositive: true,
    impliedFDV: null,
    settleTime: "TBA",
  },
  {
    id: "3",
    name: "Gensyn",
    symbol: "AI",
    logo: "https://cdn.whales.market/icon/b89de5f5-2de8-445b-85d8-096f6fc22691.jpg",
    network: "Ethereum",
    networkIcon: "https://cdn.whales.market/network-icons/Ethereum.png",
    lastPrice: 0,
    priceChange: 0,
    isPriceChangePositive: false,
    volume24h: 210,
    volume24hChange: 0,
    isVolume24hChangePositive: false,
    totalVolume: 10458,
    totalVolumeChange: 2.05,
    isTotalVolumeChangePositive: true,
    impliedFDV: null,
    settleTime: "TBA",
  },
];

const mockActivityData: ActivityData[] = [
  {
    id: "1",
    time: "4h ago",
    orderType: "Open",
    side: "Sell",
    tokenSymbol: "AI",
    tokenLogo:
      "https://cdn.whales.market/icon/b89de5f5-2de8-445b-85d8-096f6fc22691.jpg",
    pair: "AI/USDT",
    price: 0.07,
    amount: 3000,
    collateral: 210,
    collateralSymbol: "USDT",
  },
  {
    id: "2",
    time: "5h ago",
    orderType: "Open",
    side: "Buy",
    tokenSymbol: "FOGO",
    tokenLogo:
      "https://cdn.whales.market/icon/8a4ca1b9-928d-484e-a29a-493a8856bd4e.jpg",
    pair: "FOGO/USDC",
    price: 0.069,
    amount: 5000,
    collateral: 345,
    collateralSymbol: "USDC",
  },
  {
    id: "3",
    time: "7h ago",
    orderType: "Filled",
    side: "Buy",
    tokenSymbol: "FOGO",
    tokenLogo:
      "https://cdn.whales.market/icon/8a4ca1b9-928d-484e-a29a-493a8856bd4e.jpg",
    pair: "FOGO/USDC",
    price: 0.0894,
    amount: 1700,
    collateral: 152.1,
    collateralSymbol: "USDC",
  },
];

// Dashboard stats component
const DashboardStats: React.FC = () => {
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-auto scroll-smooth md:grid md:grid-cols-2 xl:grid-cols-4">
      {/* Pre-market Volume Card */}
      <div className="flex h-40 min-w-[324px] flex-shrink-0 snap-start flex-col gap-3 rounded-xl border border-solid bg-overlay-3 p-3 md:flex-shrink lg:min-w-[unset] lg:p-2 xl:px-3 xl:pb-4 xl:pt-3 2xl:px-5 2xl:pb-5 2xl:pt-4">
        <p className="text-[12px] font-medium leading-[16px] tracking-[0px] text-neutral-tertiary">
          Pre-market Vol
        </p>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-end gap-1">
            <div className="text-[28px] font-medium leading-[36px] tracking-[0px] text-[#F9F9FA]">
              $338.7M
            </div>
            <div className="mb-1 text-xs font-medium text-success">
              + $156.2K
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end">
            <div className="relative">
              {/* Chart placeholder - In real app, you'd use a charting library like recharts or tradingview */}
              <div className="h-[68px] w-full rounded bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  Chart would appear here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fear & Greed Card */}
      <div className="h-40 min-w-[324px] flex-shrink-0 snap-start rounded-xl border border-solid bg-overlay-3 p-3 md:flex-shrink lg:min-w-[unset] lg:p-2 xl:px-3 xl:pb-4 xl:pt-3 2xl:px-5 2xl:pb-5 2xl:pt-4">
        <p className="mb-3 text-[12px] font-medium leading-[16px] tracking-[0px] text-neutral-tertiary">
          Fear & Greed
        </p>
        <div className="relative bottom-10 flex items-center justify-center">
          <div className="relative w-40 h-24">
            {/* Gauge SVG simplified */}
            <svg
              width="200"
              height="140"
              viewBox="0 0 200 140"
              className="w-full h-full"
            >
              <defs>
                <linearGradient
                  id="gaugeGradient-43"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="2.5%" stopColor="#16C284" />
                  <stop offset="50%" stopColor="#FDBA74" />
                  <stop offset="97.5%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path
                d="M 10 130 A 90 90 0 0 1 190 130"
                fill="none"
                stroke="#333333"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 10 130 A 90 90 0 0 1 190 130"
                fill="none"
                stroke="url(#gaugeGradient-43)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="565.4866776461628 565.4866776461628"
              />
              <circle
                cx="80.36710827431119"
                cy="42.167491425512736"
                r="10"
                strokeWidth="4"
                stroke="oklch(26.9% 0 0)"
                fill="white"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              />
            </svg>
            <div className="absolute -bottom-4 left-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1">
              <p className="text-[28px] font-medium leading-[36px] text-white">
                43
              </p>
              <p className="text-xs font-normal text-neutral-tertiary">
                Neutral
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Altcoin Season Card */}
      <div className="h-40 min-w-[324px] flex-shrink-0 snap-start rounded-xl border border-solid bg-overlay-3 p-3 md:flex-shrink lg:min-w-[unset] lg:p-2 xl:px-3 xl:pb-4 xl:pt-3 2xl:px-5 2xl:pb-5 2xl:pt-4">
        <p className="mb-3 text-[12px] font-medium leading-[16px] tracking-[0px] text-neutral-tertiary">
          Altcoin Season
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <span className="text-[28px] font-medium text-neutral-primary">
              22
            </span>
            <span className="text-[28px] font-medium text-neutral-tertiary">
              /100
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-primary">
                Bitcoin
              </span>
              <span className="text-xs font-medium text-neutral-primary">
                Altcoin
              </span>
            </div>
            <div className="relative h-5 w-full">
              <div
                className="relative h-2 flex-grow rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(249, 249, 250) 1.44%, rgb(22, 194, 132) 100%)",
                }}
              >
                <div
                  className="absolute h-full rounded-full"
                  style={{ left: "0%", right: "78%" }}
                ></div>
              </div>
              <div
                className="absolute block h-[24px] w-[24px] rounded-full border-4 border-solid border-[oklch(26.9%_0_0)] bg-white"
                style={{ left: "calc(22% + 6.72px)", top: "-12px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Settlement Card */}
      <div className="h-40 min-w-[324px] flex-shrink-0 snap-start rounded-xl border border-solid bg-overlay-3 p-3 md:flex-shrink lg:min-w-[unset] lg:p-2 xl:px-3 xl:pb-4 xl:pt-3 2xl:px-5 2xl:pb-5 2xl:pt-4">
        <div className="flex h-full flex-col gap-3">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-1">
              <p className="text-[12px] font-medium leading-[16px] tracking-[0px] text-neutral-tertiary">
                Next Settlement
              </p>
            </div>
          </div>
          <div
            className="flex h-[30px] flex-1 items-center justify-center overflow-hidden rounded-lg bg-cover bg-center text-sm text-neutral-tertiary"
            style={{ backgroundImage: 'url("/images/bg-no-settle.svg")' }}
          >
            <p className="font-medium text-sm max-w-[149px] text-center text-neutral-primary">
              No markets in upcoming settlements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Token table row component for mobile
const MobileTokenRow: React.FC<{ token: TokenData }> = ({ token }) => {
  return (
    <tr className="md:hidden hover:bg-white/5 transition-colors cursor-pointer py-4">
      <td colSpan={6} className="py-3 md:py-2">
        <div className="space-y-2">
          {/* Token */}
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">
              <p className="text-xs w-full text-left font-normal text-neutral-tertiary">
                Token
              </p>
            </span>
            <span className="text-gray-600">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="relative overflow-hidden p-1"
                    style={{ width: "44px", height: "44px" }}
                  >
                    <img
                      alt={token.name}
                      src={token.logo}
                      className="aspect-square rounded-full object-cover"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="z-1 absolute bottom-[-4px] left-[-2px] rounded bg-neutral-1 p-[2px]">
                    <img
                      alt={token.network}
                      src={token.networkIcon}
                      className="block rounded object-cover"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
                <div className="text-sm text-neutral-primary">
                  <p className="font-medium text-sm text-neutral-primary">
                    {token.symbol}
                  </p>
                  <p className="text-sm font-normal text-neutral-tertiary">
                    {token.name}
                  </p>
                </div>
              </div>
            </span>
          </div>

          {/* Last Price */}
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">
              <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                Last Price
              </p>
            </span>
            <span className="text-gray-600">
              <div className="flex flex-col items-end gap-1 text-right">
                <p className="font-medium text-sm text-neutral-primary">
                  ${token.lastPrice.toFixed(4)}
                </p>
                <p
                  className={`text-sm font-normal ${
                    token.isPriceChangePositive ? "text-success" : "text-danger"
                  }`}
                >
                  {token.priceChange > 0 ? "+" : ""}
                  {token.priceChange}%
                </p>
              </div>
            </span>
          </div>

          {/* 24h Volume */}
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">
              <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                24h Vol. ($)
              </p>
            </span>
            <span className="text-gray-600">
              <div className="flex flex-col items-end gap-1 text-right">
                <p className="font-medium text-sm text-neutral-primary">
                  {token.volume24h.toLocaleString()}
                </p>
                <p
                  className={`text-sm font-normal ${
                    token.isVolume24hChangePositive
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {token.volume24hChange > 0 ? "+" : ""}
                  {token.volume24hChange}%
                </p>
              </div>
            </span>
          </div>

          {/* Total Volume */}
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">
              <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                Total Vol. ($)
              </p>
            </span>
            <span className="text-gray-600">
              <div className="flex flex-col items-end gap-1 text-right">
                <p className="font-medium text-sm text-neutral-primary">
                  {token.totalVolume.toLocaleString()}
                </p>
                <p
                  className={`text-sm font-normal ${
                    token.isTotalVolumeChangePositive
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {token.totalVolumeChange > 0 ? "+" : ""}
                  {token.totalVolumeChange}%
                </p>
              </div>
            </span>
          </div>

          {/* Implied FDV */}
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">
              <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                Implied FDV ($)
              </p>
            </span>
            <span className="text-gray-600">
              <div className="flex flex-col items-end gap-1 text-right">
                <p
                  className={`font-medium text-sm ${
                    token.impliedFDV
                      ? "text-neutral-primary"
                      : "text-neutral-secondary"
                  }`}
                >
                  {token.impliedFDV || "N/A"}
                </p>
              </div>
            </span>
          </div>

          {/* Settle Time */}
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">
              <div className="w-full cursor-pointer text-right">
                <p className="text-xs inline-block border-b border-dashed border-neutral-2 font-normal text-neutral-tertiary hover:border-neutral-4">
                  Settle Time (UTC)
                </p>
              </div>
            </span>
            <span className="text-gray-600">
              <div className="px-2 py-1 text-right">
                <p className="font-medium text-xs flex w-full items-center justify-end uppercase text-neutral-secondary">
                  {token.settleTime}
                </p>
              </div>
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};

// Token table row component for desktop
const DesktopTokenRow: React.FC<{ token: TokenData }> = ({ token }) => {
  const routePrefix = location.pathname.includes("/preview/app")
    ? "/preview/app"
    : "/app";
  return (
    <Link to={`${routePrefix}/markets/secondary/${token.id}`}>
      <tr className="hidden md:table-row hover:bg-white/5 transition-colors cursor-pointer py-4">
        {/* Token */}
        <td className="px-2 py-3" style={{ width: "200px", minWidth: "200px" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="relative overflow-hidden p-1"
                style={{ width: "44px", height: "44px" }}
              >
                <img
                  alt={token.name}
                  src={token.logo}
                  className="aspect-square rounded-full object-cover"
                  width={44}
                  height={44}
                />
              </div>
              <div className="z-1 absolute bottom-[-4px] left-[-2px] rounded bg-neutral-1 p-[2px]">
                <img
                  alt={token.network}
                  src={token.networkIcon}
                  className="block rounded object-cover"
                  width={16}
                  height={16}
                />
              </div>
            </div>
            <div className="text-sm text-neutral-primary">
              <p className="font-medium text-sm text-neutral-primary">
                {token.symbol}
              </p>
              <p className="text-sm font-normal text-neutral-tertiary">
                {token.name}
              </p>
            </div>
          </div>
        </td>

        {/* Last Price */}
        <td className="px-2 py-3" style={{ width: "150px", minWidth: "150px" }}>
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="font-medium text-sm text-neutral-primary">
              ${token.lastPrice.toFixed(4)}
            </p>
            <p
              className={`text-sm font-normal ${
                token.isPriceChangePositive ? "text-success" : "text-danger"
              }`}
            >
              {token.priceChange > 0 ? "+" : ""}
              {token.priceChange}%
            </p>
          </div>
        </td>

        {/* 24h Volume */}
        <td className="px-2 py-3" style={{ width: "150px", minWidth: "150px" }}>
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="font-medium text-sm text-neutral-primary">
              {token.volume24h.toLocaleString()}
            </p>
            <p
              className={`text-sm font-normal ${
                token.isVolume24hChangePositive ? "text-success" : "text-danger"
              }`}
            >
              {token.volume24hChange > 0 ? "+" : ""}
              {token.volume24hChange}%
            </p>
          </div>
        </td>

        {/* Total Volume */}
        <td className="px-2 py-3" style={{ width: "150px", minWidth: "150px" }}>
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="font-medium text-sm text-neutral-primary">
              {token.totalVolume.toLocaleString()}
            </p>
            <p
              className={`text-sm font-normal ${
                token.isTotalVolumeChangePositive
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {token.totalVolumeChange > 0 ? "+" : ""}
              {token.totalVolumeChange}%
            </p>
          </div>
        </td>

        {/* Implied FDV */}
        <td className="px-2 py-3" style={{ width: "150px", minWidth: "150px" }}>
          <div className="flex flex-col items-end gap-1 text-right">
            <p
              className={`font-medium text-sm ${
                token.impliedFDV
                  ? "text-neutral-primary"
                  : "text-neutral-secondary"
              }`}
            >
              {token.impliedFDV || "N/A"}
            </p>
          </div>
        </td>

        {/* Settle Time */}
        <td className="px-2 py-3" style={{ width: "150px", minWidth: "150px" }}>
          <div className="px-2 py-1 text-right">
            <p className="font-medium text-xs flex w-full items-center justify-end uppercase text-neutral-secondary">
              {token.settleTime}
            </p>
          </div>
        </td>
      </tr>
    </Link>
  );
};

// Mobile activity row component
const MobileActivityRow: React.FC<{ activity: ActivityData }> = ({
  activity,
}) => {
  return (
    <tr className="md:hidden hover:bg-white/5 transition-colors duration-200 cursor-pointer">
      <td colSpan={8} className="py-3 md:py-2">
        <div className="flex justify-between">
          <div className="font-medium text-gray-900">
            <div className="flex items-center gap-2 pb-3">
              <span className="text-sm font-normal text-neutral-primary">
                {activity.orderType} Order
              </span>
              <p
                className={`text-sm font-normal ${
                  activity.side === "Buy" ? "text-success" : "text-danger"
                }`}
              >
                {activity.side}
              </p>
              <div className="flex cursor-pointer items-center gap-2">
                <img
                  alt={activity.tokenSymbol}
                  src={activity.tokenLogo}
                  className="h-4 w-4 rounded-full object-cover"
                  width={16}
                  height={16}
                />
                <p className="text-sm font-normal text-neutral-primary">
                  {activity.pair}
                </p>
              </div>
            </div>
            <div className="mb-1 flex items-center gap-1">
              <p className="text-xs font-normal text-neutral-tertiary">Price</p>
              <p className="text-xs font-normal text-neutral-primary">
                ${activity.price}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-xs font-normal text-neutral-tertiary">
                Amount / Collateral
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs font-normal text-neutral-primary">
                  {activity.amount.toLocaleString()}/{activity.collateral}
                </p>
                <span className="font-medium text-xs text-neutral-tertiary">
                  {activity.collateralSymbol}
                </span>
                <div>
                  <img
                    alt="shrimp"
                    src="/icons/shark/shrimp.svg"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-gray-600">
            <div className="flex h-full flex-col items-end justify-between gap-2">
              <p className="text-sm font-normal text-neutral-tertiary">
                {activity.time}
              </p>
              <div className="flex justify-end">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-40 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none border border-overlay text-neutral-primary hover:border-secondary-muted hover:bg-btn-secondary-outline-hover active:bg-btn-secondary-outline-active active:border-secondary-muted disabled:border-secondary-muted h-7 px-3 py-1.5 text-xs has-[&gt;svg]:px-1.5 rounded-md min-w-[52px]">
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
                    className="lucide lucide-arrow-up-right !w-3 text-neutral-primary"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

// Desktop activity row component
const DesktopActivityRow: React.FC<{ activity: ActivityData }> = ({
  activity,
}) => {
  return (
    <tr className="hidden md:table-row hover:bg-white/5 transition-colors duration-200 cursor-pointer">
      <td className="px-2 py-3" style={{ width: "100px", minWidth: "100px" }}>
        <p className="text-sm font-normal text-neutral-tertiary">
          {activity.time}
        </p>
      </td>
      <td className="px-2 py-3" style={{ width: "100px", minWidth: "100px" }}>
        <div className="text-left text-sm font-normal text-neutral-primary">
          {activity.orderType}
        </div>
      </td>
      <td className="px-2 py-3" style={{ width: "100px", minWidth: "100px" }}>
        <div className="flex items-center gap-2">
          <p
            className={`text-sm font-normal ${
              activity.side === "Buy" ? "text-success" : "text-danger"
            }`}
          >
            {activity.side}
          </p>
        </div>
      </td>
      <td className="px-2 py-3" style={{ width: "200px", minWidth: "200px" }}>
        <div className="flex cursor-pointer items-center gap-2">
          <img
            alt={activity.tokenSymbol}
            src={activity.tokenLogo}
            className="rounded-full"
            width={16}
            height={16}
          />
          <p className="text-sm flex-1 font-normal text-neutral-primary">
            {activity.pair}
          </p>
        </div>
      </td>
      <td className="px-2 py-3" style={{ width: "100px", minWidth: "100px" }}>
        <p className="text-sm text-right font-normal text-neutral-primary">
          ${activity.price}
        </p>
      </td>
      <td className="px-2 py-3" style={{ width: "100px", minWidth: "100px" }}>
        <p className="text-sm text-right font-normal text-neutral-primary">
          {activity.amount.toLocaleString()}
        </p>
      </td>
      <td className="px-2 py-3" style={{ width: "120px", minWidth: "120px" }}>
        <div className="flex items-center justify-end gap-2">
          <p className="text-sm text-right font-normal text-neutral-primary">
            {activity.collateral}
          </p>
          <img
            alt={activity.collateralSymbol}
            src={`https://cdn.whales.market/icon/${
              activity.collateralSymbol === "USDC"
                ? "ffe5b564-5455-4a22-9ed0-ea49a87b8e51"
                : "558f1f59-22de-4b80-88c7-da4b6c95e88e"
            }.png`}
            className="rounded-full"
            width={16}
            height={16}
          />
          <div>
            <img
              alt="shrimp"
              src="/icons/shark/shrimp.svg"
              width={16}
              height={16}
            />
          </div>
        </div>
      </td>
      <td className="px-2 py-3" style={{ width: "100px", minWidth: "100px" }}>
        <div className="flex justify-end">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-40 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none border border-overlay text-neutral-primary hover:border-secondary-muted hover:bg-btn-secondary-outline-hover active:bg-btn-secondary-outline-active active:border-secondary-muted disabled:border-secondary-muted h-7 px-3 py-1.5 text-xs has-[&gt;svg]:px-1.5 rounded-md min-w-[52px] !rounded-[6px]">
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
              className="lucide lucide-arrow-up-right !w-3 text-neutral-primary"
              aria-hidden="true"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main component
const SecondaryMarket: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Live" | "Upcoming" | "Ended">(
    "Live"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "Live", label: "Live", count: 20 },
    { id: "Upcoming", label: "Upcoming", count: 13 },
    { id: "Ended", label: "Ended", count: 300 },
  ];

  return (
    <div className="container mx-auto space-y-6 px-4 py-4 md:space-y-4 lg:px-12">
      {/* Dashboard Stats Section */}
      <DashboardStats />

      {/* Tokens Table Section */}
      <div className="w-full md:py-4">
        {/* Table Header */}
        <div className="mb-4 flex items-center justify-between">
          {/* Tabs */}
          <div className="flex items-center gap-4 md:gap-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex cursor-pointer items-center gap-2 rounded-full text-lg font-medium md:border md:px-4 md:py-2 md:text-sm ${
                  activeTab === tab.id
                    ? "text-neutral-primary md:border-primary-muted md:bg-primary-muted-10 md:!text-primary"
                    : "text-neutral-tertiary md:border md:border-neutral-1 md:bg-overlay-3 md:text-neutral-primary"
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.label}
                <div
                  className={`flex items-center justify-center rounded-full px-2 py-1 text-2xs font-medium ${
                    activeTab === tab.id
                      ? "md:bg-primary md:text-neutral-primary"
                      : "md:bg-neutral-3 md:text-neutral-secondary"
                  }`}
                >
                  {tab.count}
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
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
                className="lucide lucide-search absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-tertiary"
                aria-hidden="true"
              >
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
              <input
                placeholder="Search"
                className="h-9 rounded-lg border border-neutral-1 bg-transparent pl-10 pr-4 text-sm text-neutral-primary placeholder:text-neutral-tertiary focus:outline-none md:w-[256px]"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-2 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search text-sm text-neutral-primary"
                aria-hidden="true"
              >
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Tokens Table */}
        <div className="h-fitcontent max-h-[1000px]">
          <div className="scrollbar-thin [&:has(~_div[style*='overflow-y:_auto'])]_pr-1 custom-scrollbar h-full overflow-auto no-scrollbar max-h-[1000px]">
            <table className="w-full">
              <thead className="sticky top-0 z-10 !bg-neutral-1 bg-transparent">
                <tr className="border-b">
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "200px", minWidth: "200px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-left font-normal text-neutral-tertiary">
                        Token
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium cursor-pointer select-none"
                    style={{ width: "150px", minWidth: "150px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        Last Price
                      </p>
                      <div className="flex flex-col gap-[2px]">
                        <svg
                          className="w-[6px] h-[4px] text-neutral-tertiary"
                          viewBox="0 0 6 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.44604 0.242534C2.59297 0.0872397 2.79223 0 3 0C3.20777 0 3.40703 0.0872397 3.55396 0.242534L5.77059 2.58598C5.88018 2.70188 5.9548 2.84954 5.98499 3.01028C6.01519 3.17102 5.9996 3.33762 5.94022 3.48899C5.88083 3.64037 5.7803 3.76972 5.65136 3.86068C5.52242 3.95165 5.37086 4.00013 5.21585 4H0.784155C0.629143 4.00013 0.477579 3.95165 0.348637 3.86068C0.219696 3.76972 0.119171 3.64037 0.059784 3.48899C0.000396493 3.33762 -0.0151856 3.17102 0.0150086 3.01028C0.0452028 2.84954 0.119816 2.70188 0.22941 2.58598L2.44604 0.242534Z"
                            fill="currentColor"
                          />
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
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium cursor-pointer select-none"
                    style={{ width: "150px", minWidth: "150px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        24h Vol. ($)
                      </p>
                      <div className="flex flex-col gap-[2px]">
                        <svg
                          className="w-[6px] h-[4px] text-neutral-tertiary"
                          viewBox="0 0 6 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.44604 0.242534C2.59297 0.0872397 2.79223 0 3 0C3.20777 0 3.40703 0.0872397 3.55396 0.242534L5.77059 2.58598C5.88018 2.70188 5.9548 2.84954 5.98499 3.01028C6.01519 3.17102 5.9996 3.33762 5.94022 3.48899C5.88083 3.64037 5.7803 3.76972 5.65136 3.86068C5.52242 3.95165 5.37086 4.00013 5.21585 4H0.784155C0.629143 4.00013 0.477579 3.95165 0.348637 3.86068C0.219696 3.76972 0.119171 3.64037 0.059784 3.48899C0.000396493 3.33762 -0.0151856 3.17102 0.0150086 3.01028C0.0452028 2.84954 0.119816 2.70188 0.22941 2.58598L2.44604 0.242534Z"
                            fill="currentColor"
                          />
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
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium cursor-pointer select-none"
                    style={{ width: "150px", minWidth: "150px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        Total Vol. ($)
                      </p>
                      <div className="flex flex-col gap-[2px]">
                        <svg
                          className="w-[6px] h-[4px] text-neutral-tertiary"
                          viewBox="0 0 6 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.44604 0.242534C2.59297 0.0872397 2.79223 0 3 0C3.20777 0 3.40703 0.0872397 3.55396 0.242534L5.77059 2.58598C5.88018 2.70188 5.9548 2.84954 5.98499 3.01028C6.01519 3.17102 5.9996 3.33762 5.94022 3.48899C5.88083 3.64037 5.7803 3.76972 5.65136 3.86068C5.52242 3.95165 5.37086 4.00013 5.21585 4H0.784155C0.629143 4.00013 0.477579 3.95165 0.348637 3.86068C0.219696 3.76972 0.119171 3.64037 0.059784 3.48899C0.000396493 3.33762 -0.0151856 3.17102 0.0150086 3.01028C0.0452028 2.84954 0.119816 2.70188 0.22941 2.58598L2.44604 0.242534Z"
                            fill="currentColor"
                          />
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
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "150px", minWidth: "150px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        Implied FDV ($)
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "150px", minWidth: "150px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <div className="w-full cursor-pointer text-right">
                        <p className="text-xs inline-block border-b border-dashed border-neutral-2 font-normal text-neutral-tertiary hover:border-neutral-4">
                          Settle Time (UTC)
                        </p>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-1">
                {mockTokenData.map((token) => (
                  <React.Fragment key={token.id}>
                    <MobileTokenRow token={token} />
                    <DesktopTokenRow token={token} />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="md:py-4">
        <div className="flex items-center justify-between pb-0 md:pb-4">
          <div className="text-xl font-medium text-neutral-primary">
            Recent Activities
          </div>
          <div className="hidden md:block">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none bg-btn-secondary-tonal text-neutral-primary shadow-xs hover:bg-btn-secondary-tonal-hover hover:brightness-110 active:bg-btn-secondary-tonal-active h-9 has-[&gt;svg]:px-2 gap-2 rounded-lg px-2 py-2"
              type="button"
            >
              <svg
                className="w-4 h-4 text-neutral-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M14 17a1 1 0 0 1 .117 1.993L14 19h-4a1 1 0 0 1-.117-1.993L10 17zm3-6a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zm3-6a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                </g>
              </svg>
              <p className="font-medium text-sm text-neutral-primary">Filter</p>
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
                />
              </svg>
            </button>
          </div>
          <div className="block md:hidden">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none bg-btn-secondary-tonal text-neutral-primary shadow-xs hover:bg-btn-secondary-tonal-hover hover:brightness-110 active:bg-btn-secondary-tonal-active h-9 has-[&gt;svg]:px-2 gap-2 rounded-lg px-2 py-2"
              type="button"
            >
              <svg
                className="w-4 h-4 text-neutral-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M14 17a1 1 0 0 1 .117 1.993L14 19h-4a1 1 0 0 1-.117-1.993L10 17zm3-6a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zm3-6a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                </g>
              </svg>
              <p className="font-medium text-sm text-neutral-primary">Filter</p>
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
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Activities Table */}
        <div className="h-[500px]">
          <div className="scrollbar-thin [&:has(~_div[style*='overflow-y:_auto'])]_pr-1 custom-scrollbar h-full max-h-[600px] overflow-auto no-scrollbar">
            <table className="w-full">
              <thead className="sticky top-0 z-10 !bg-neutral-1 bg-transparent">
                <tr className="border-b">
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full font-normal text-neutral-tertiary">
                        Time
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full font-normal text-neutral-tertiary">
                        Order Type
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full font-normal text-neutral-tertiary">
                        Side
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "200px", minWidth: "200px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full font-normal text-neutral-tertiary">
                        Pair
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        Price ($)
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        Amount
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "120px", minWidth: "120px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        Collateral
                      </p>
                    </div>
                  </th>
                  <th
                    className="p-2 text-left text-xs font-medium"
                    style={{ width: "100px", minWidth: "100px" }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <p className="text-xs w-full text-right font-normal text-neutral-tertiary">
                        Tx.ID
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-1">
                {mockActivityData.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <MobileActivityRow activity={activity} />
                    <DesktopActivityRow activity={activity} />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryMarket;
