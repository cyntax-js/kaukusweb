import { Search, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrokerLanguageSwitcher from "@/broker-theme/components/BrokerLanguageSwitcher";

const TradingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-[hsl(var(--trading-bg))] border-b border-[hsl(var(--trading-border))] flex items-center justify-between px-4">
      <div className="flex items-center gap-6">
        <div
          className="text-white font-bold text-xl cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          ContiSX
        </div>
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-sm text-[hsl(var(--trading-text-primary))] hover:text-white"
            onClick={() => navigate("/markets")}
          >
            Markets
          </Button>
          {/* <Button
            variant="ghost"
            className="text-sm text-[hsl(var(--trading-text-primary))] hover:text-white"
          >
            Trade <ChevronDown className="w-4 h-4 ml-1" />
          </Button> */}

          <Button
            variant="ghost"
            className="text-sm text-[hsl(var(--trading-text-primary))] hover:text-white"
          >
            Institutional <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-[hsl(var(--trading-text-primary))] hover:text-white"
          >
            Learn
          </Button>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[hsl(var(--trading-text-secondary))]" />
          <input
            type="text"
            placeholder="Search stocks"
            className="bg-[hsl(var(--trading-panel))] text-sm text-[hsl(var(--trading-text-primary))] pl-10 pr-4 py-2 rounded border border-[hsl(var(--trading-border))] w-48 focus:outline-none focus:border-[hsl(var(--trading-text-secondary))]"
          />
        </div>

        <BrokerLanguageSwitcher />

        <Button
          variant="ghost"
          className="text-sm text-[hsl(var(--trading-text-primary))]"
        >
          Assets <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5 text-[hsl(var(--trading-text-primary))]" />
        </Button>
      </div>
    </header>
  );
};

export default TradingHeader;
