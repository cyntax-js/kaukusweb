import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface StockLogoProps {
  symbol: string;
  baseAsset: string;
  image?: string;
  logoUrl?: string;
  color?: string;
  className?: string;
}

const StockLogo = ({
  symbol,
  baseAsset,
  image,
  logoUrl,
  color,
  className,
}: StockLogoProps) => {
  const [imageError, setImageError] = useState(false);
  const initial = image || baseAsset[0].toUpperCase();
  const bgColor = color || "#4ECDC4";

  if (logoUrl && !imageError) {
    return (
      <img
        src={logoUrl}
        alt={`${baseAsset} logo`}
        title={`${baseAsset} (${symbol})`}
        onError={() => setImageError(true)}
        className={cn(
          "w-10 h-10 rounded-full object-cover flex-shrink-0",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm",
        className
      )}
      style={{ backgroundColor: bgColor }}
      title={`${baseAsset} (${symbol})`}
    >
      {initial}
    </div>
  );
};

export default StockLogo;
