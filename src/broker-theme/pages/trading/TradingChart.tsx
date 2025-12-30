import React, { useRef, useState, useEffect } from "react";
import { Market, type CandleData, generateCandlestickData } from "@/data/mockTradingData";
import { cn } from "@/lib/utils";
import { useTheme } from "@/broker-theme/config";
import Overview from "./Overview";

function parseInterval(interval: string): number {
  const value = parseFloat(interval.slice(0, -1));
  const unit = interval.slice(-1).toLowerCase();
  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 3600 * 1000;
    case "d":
      return value * 86400 * 1000;
    default:
      return 5 * 60 * 1000;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function nextCandle(prev: CandleData, stepMs: number, volatility = 0.004): CandleData {
  const open = prev.close;
  const pct = (Math.random() - 0.5) * volatility * 2;
  const close = open * (1 + pct);
  const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.6);
  const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.6);

  return {
    timestamp: prev.timestamp + stepMs,
    open,
    high,
    low,
    close,
    volume: Math.max(1, Math.round(prev.volume * (0.7 + Math.random() * 0.9))),
  };
}

interface TradingChartProps {
  market?: Market | null;
}

const TradingChart = ({ market }: TradingChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);
  const liveTimerRef = useRef<number | null>(null);
  const lastCandleRef = useRef<CandleData | null>(null);

  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<"chart" | "overview">("chart");
  const [selectedInterval, setSelectedInterval] = useState("5m");
  const [chartType, setChartType] = useState<"candle" | "line">("candle");
  const [loading, setLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);
  const [selectedIndicators] = useState<string[]>(["MA", "VOL"]);

  useEffect(() => {
    if (!chartRef.current || activeTab !== "chart") return;

    let chart: any = null;
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 5;

    const clearLive = () => {
      if (liveTimerRef.current) {
        window.clearInterval(liveTimerRef.current);
        liveTimerRef.current = null;
      }
    };

    const initChart = async () => {
      try {
        setLoading(true);
        setChartError(null);

        const container = chartRef.current;
        if (!container) return;

        // Wait for container to have dimensions
        const waitForDimensions = async (): Promise<boolean> => {
          for (let i = 0; i < 20; i++) {
            if (container.offsetWidth > 50 && container.offsetHeight > 50) {
              return true;
            }
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
          return false;
        };

        const hasDimensions = await waitForDimensions();
        if (!hasDimensions && retryCount < maxRetries) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, 300));
          initChart();
          return;
        }

        if (!hasDimensions) {
          setChartError("Chart container has no dimensions");
          setLoading(false);
          return;
        }

        // Use klinecharts v9 API
        const klinecharts = await import("klinecharts");

        if (!isMounted || !chartRef.current) return;

        clearLive();

        // Dispose previous chart if exists
        if (chartInstance.current) {
          try {
            klinecharts.dispose(chartRef.current);
          } catch {
            // ignore
          }
          chartInstance.current = null;
        }

        const gridColor = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)";
        const textColor = isDark ? "#9a9a9a" : "#666666";
        const crosshairLineColor = isDark ? "#555555" : "#cccccc";

        // klinecharts v9 init with simple styles to avoid type issues
        chart = klinecharts.init(container);

        if (!chart) {
          throw new Error("Failed to initialize chart");
        }

        chartInstance.current = chart;

        // Apply styles using setStyles method (v9 compatible)
        chart.setStyles({
          grid: {
            show: true,
            horizontal: { show: true, size: 1, color: gridColor },
            vertical: { show: true, size: 1, color: gridColor },
          },
          candle: {
            bar: {
              upColor: "#26a69a",
              downColor: "#ef5350",
              noChangeColor: "#888888",
              upBorderColor: "#26a69a",
              downBorderColor: "#ef5350",
              noChangeBorderColor: "#888888",
              upWickColor: "#26a69a",
              downWickColor: "#ef5350",
              noChangeWickColor: "#888888",
            },
            priceMark: {
              show: true,
              last: {
                show: true,
                upColor: "#26a69a",
                downColor: "#ef5350",
                noChangeColor: "#888888",
                line: { show: true, size: 1 },
                text: {
                  show: true,
                  size: 12,
                  paddingLeft: 2,
                  paddingTop: 2,
                  paddingRight: 2,
                  paddingBottom: 2,
                  color: "#FFFFFF",
                  borderRadius: 2,
                },
              },
            },
          },
          xAxis: {
            show: true,
            axisLine: { show: true, color: gridColor, size: 1 },
            tickText: { show: true, color: textColor, size: 10 },
            tickLine: { show: true, size: 1, length: 3, color: gridColor },
          },
          yAxis: {
            show: true,
            axisLine: { show: true, color: gridColor, size: 1 },
            tickText: { show: true, color: textColor, size: 10 },
            tickLine: { show: true, size: 1, length: 3, color: gridColor },
          },
          crosshair: {
            show: true,
            horizontal: {
              show: true,
              line: { show: true, size: 1, color: crosshairLineColor },
              text: {
                show: true,
                color: "#FFFFFF",
                size: 12,
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 2,
                backgroundColor: "#2196f3",
              },
            },
            vertical: {
              show: true,
              line: { show: true, size: 1, color: crosshairLineColor },
              text: {
                show: true,
                color: "#FFFFFF",
                size: 12,
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 2,
                backgroundColor: "#2196f3",
              },
            },
          },
        });

        // Seed candles
        const basePrice = market?.price && market.price > 0 ? market.price : 500;
        const intervalMs = parseInterval(selectedInterval);
        const stepMs = clamp(intervalMs, 60_000, 5 * 60_000);

        const data = generateCandlestickData(220, stepMs, basePrice);
        lastCandleRef.current = data[data.length - 1] ?? null;
        chart.applyNewData(data);

        // Add indicators
        if (selectedIndicators.includes("MA")) {
          chart.createIndicator("MA", false, { id: "candle_pane" });
        }
        if (selectedIndicators.includes("VOL")) {
          chart.createIndicator("VOL");
        }

        // Live candles (dummy stream)
        liveTimerRef.current = window.setInterval(() => {
          if (!chartInstance.current) return;
          const prev = lastCandleRef.current;
          if (!prev) return;

          const vol = market?.type === "crypto" ? 0.008 : 0.004;
          const next = nextCandle(prev, stepMs, vol);
          lastCandleRef.current = next;
          try {
            chartInstance.current.updateData(next);
          } catch {
            // ignore
          }
        }, 1200);

        setLoading(false);
      } catch (e) {
        console.error("Failed to load chart:", e);
        if (retryCount < maxRetries) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, 500));
          initChart();
        } else {
          setChartError("Failed to load chart");
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(initChart, 150);

    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        try {
          chartInstance.current.resize();
        } catch {
          // ignore
        }
      }
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      clearTimeout(timer);
      isMounted = false;
      resizeObserver.disconnect();
      if (liveTimerRef.current) {
        window.clearInterval(liveTimerRef.current);
        liveTimerRef.current = null;
      }
      if (chartRef.current && chartInstance.current) {
        import("klinecharts").then((kc) => {
          try {
            kc.dispose(chartRef.current!);
          } catch {
            // ignore
          }
        });
      }
    };
  }, [activeTab, chartType, selectedInterval, selectedIndicators.join(","), market?.symbol, isDark]);

  return (
    <div className="w-full h-full bg-card border-r border-border flex flex-col overflow-hidden">
      {/* Chart Controls */}
      <div className="bg-card border-b border-border p-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("chart")}
                className={cn(
                  "text-xs font-medium transition-colors",
                  activeTab === "chart" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Chart
              </button>
              <button
                onClick={() => setActiveTab("overview")}
                className={cn(
                  "text-xs font-medium transition-colors",
                  activeTab === "overview" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Overview
              </button>
            </div>
            {activeTab === "chart" && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-muted rounded px-2 py-1">
                  {["1m", "5m", "15m", "1H", "4H", "1D"].map((interval) => (
                    <button
                      key={interval}
                      onClick={() => setSelectedInterval(interval)}
                      className={cn(
                        "px-2 py-1 text-xs rounded transition-colors",
                        selectedInterval === interval
                          ? "bg-background text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {interval}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setChartType(chartType === "candle" ? "line" : "candle")}
                  className="px-3 py-1 text-xs bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                >
                  {chartType === "candle" ? "Line" : "Candle"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeTab === "chart" && (
        <>
          {/* OHLC Info */}
          <div className="px-3 py-2 border-b border-border flex items-center gap-4 text-xs bg-card shrink-0">
            <div>
              <span className="text-muted-foreground mr-2">O</span>
              <span className="text-foreground">{market?.price?.toFixed(2) ?? "—"}</span>
            </div>
            <div>
              <span className="text-green-500 mr-2">H</span>
              <span className="text-foreground">{market?.high24h?.toFixed(2) ?? "—"}</span>
            </div>
            <div>
              <span className="text-red-500 mr-2">L</span>
              <span className="text-foreground">{market?.low24h?.toFixed(2) ?? "—"}</span>
            </div>
            <div className="text-muted-foreground">
              Change:{" "}
              <span className={(market?.change24h ?? 0) >= 0 ? "text-green-500" : "text-red-500"}>
                {(market?.change24h ?? 0) >= 0 ? "+" : ""}
                {market?.change24h?.toFixed(2) ?? "0.00"}%
              </span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="relative flex-1 w-full min-h-[300px] bg-card">
            {loading && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/50">
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  <span className="text-muted-foreground text-sm">Loading chart...</span>
                </div>
              </div>
            )}
            {chartError && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/50">
                <div className="text-destructive text-sm">{chartError}</div>
              </div>
            )}
            <div ref={chartRef} className="absolute inset-0" style={{ minHeight: "300px" }} />
          </div>
        </>
      )}

      {activeTab === "overview" && <Overview market={market} />}
    </div>
  );
};

export default TradingChart;
