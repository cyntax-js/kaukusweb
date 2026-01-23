import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useBrokerDeploymentStore } from "@/stores/brokerDeploymentStore";
import {
  Check,
  ExternalLink,
  Plus,
  TrendingUp,
  LineChart,
  Layers,
  Lock,
} from "lucide-react";

const iconMap: Record<string, any> = { TrendingUp, LineChart, Layers, Lock };

const serviceInfo: Record<
  string,
  { name: string; description: string; icon: string }
> = {
  stock: {
    name: "Stock Trading",
    description: "Buy and sell assets at current market prices",
    icon: "TrendingUp",
  },
  futures: {
    name: "Futures Trading",
    description: "Trade contracts for future delivery",
    icon: "LineChart",
  },
  options: {
    name: "Options Trading",
    description: "Trade options contracts",
    icon: "Layers",
  },
  private_market: {
    name: "Private Markets",
    description: "Access to private market offerings",
    icon: "Lock",
  },
};

export default function BrokerServices() {
  const navigate = useNavigate();
  const { config, isDeployed } = useBrokerDeploymentStore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">
            Manage your active trading services
          </p>
        </div>
        {!isDeployed && (
          <Button onClick={() => navigate("/broker/dashboard/deploy")}>
            <Plus className="w-4 h-4 mr-2" /> Setup Services
          </Button>
        )}
      </div>
      {isDeployed && config.subdomain && (
        <Card className="p-4 bg-success/5 border-success/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-medium">Platform Live</span>
              <span className="text-sm text-muted-foreground">
                {config.subdomain}.ContiSX.com
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://${config.subdomain}.ContiSX.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" /> Visit
              </a>
            </Button>
          </div>
        </Card>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(serviceInfo).map(([serviceId, info]) => {
          const Icon = iconMap[info.icon] || Layers;
          const isActive = config.services.includes(serviceId as any);
          return (
            <Card
              key={serviceId}
              className={`p-6 ${
                isActive ? "border-success/30 bg-success/5" : "opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isActive ? "gradient-primary" : "bg-secondary"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{info.name}</h3>
                  </div>
                </div>
                {isActive ? (
                  <span className="flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                    Not Active
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {info.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
