import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { generateSP500TradeData } from "@/lib/generateTradeData";
import { TooltipProps } from "recharts";

function TradingViewTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const price = payload[0].value as number;

  return (
    <div className="rounded-md bg-white/90 backdrop-blur px-3 py-2 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-gray-900">
        ₦{price.toFixed(2)}
      </div>
    </div>
  );
}

export default function MarketSummaryChart() {
  const data = generateSP500TradeData(200, 4800);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
        {/* Gradient */}
        <defs>
          <linearGradient id="tvGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5a4" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#0ea5a4" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* X Axis */}
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 11 }}
          interval={24} // reduces clutter like TradingView
        />

        {/* Tooltip */}
        <Tooltip
          content={<TradingViewTooltip />}
          cursor={{ stroke: "#00000014", strokeWidth: 1 }}
        />

        {/* Area */}
        <Area
          type="linear"
          dataKey="price"
          stroke="#0ea5a4"
          strokeWidth={2}
          fill="url(#tvGradient)"
          dot={false}
          activeDot={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
