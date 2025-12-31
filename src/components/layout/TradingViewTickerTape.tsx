import { useEffect, useRef } from "react";

export default function TradingViewTickerTape() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("tradingview-ticker-script")) return;

    const script = document.createElement("script");
    script.id = "tradingview-ticker-script";
    script.type = "module";
    script.src =
      "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
    script.async = true;

    containerRef.current?.appendChild(script);

    return () => {
      // Optional cleanup if component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      <tv-ticker-tape
        symbols="NSENG:BUAFOODS,NSENG:DANGCEM,NSENG:WEMABANK,NSENG:OANDO,NSENG:UBA,NSENG:JAPAULGOLD,NSENG:FCMB,NSENG:JBERGER,NSENG:NSLTECH"
        item-size="compact"
        show-hover="true"
        theme="light"
      ></tv-ticker-tape>
    </div>
  );
}
