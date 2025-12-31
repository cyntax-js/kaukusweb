import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBrokerDeploymentStore } from "@/stores/brokerDeploymentStore";
import { TrendingUp, LineChart, Layers, Lock, Check, Plus } from "lucide-react";
import type { BrokerService } from "@/broker-theme/config/types";

const iconMap: Record<string, any> = { TrendingUp, LineChart, Layers, Lock };

const serviceIcons: Record<BrokerService, string> = {
  stock: "TrendingUp",
  futures: "LineChart",
  options: "Layers",
  private_markets: "Lock",
};

export default function DeployServices() {
  const { config, toggleService, totalCost, availableServices } =
    useBrokerDeploymentStore();

  const isSelected = (serviceId: BrokerService) =>
    config.services.includes(serviceId);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Select Trading Services</h2>
        <p className="text-muted-foreground">
          Choose the trading products you want to offer to your users
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {availableServices.map((service) => {
          const Icon = iconMap[serviceIcons[service.id]] || Layers;
          const selected = isSelected(service.id);
          return (
            <Card
              key={service.id}
              className={`p-6 cursor-pointer transition-all hover-lift ${
                selected
                  ? "border-primary bg-primary/5 shadow-glow"
                  : "hover:border-primary/50"
              }`}
              onClick={() => toggleService(service.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selected ? "gradient-primary" : "bg-secondary"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        selected ? "text-primary-foreground" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="text-lg font-bold text-primary">
                      ${service.price.toLocaleString()}/mo
                    </div>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant={selected ? "default" : "outline"}
                  className={selected ? "bg-success hover:bg-success/90" : ""}
                >
                  {selected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </Card>
          );
        })}
      </div>
      <Card className="p-4 bg-secondary/30">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-muted-foreground">Selected Services:</span>{" "}
            <span className="font-medium">
              {config.services.length === 0
                ? "None"
                : config.services.join(", ")}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Monthly Total</div>
            <div className="text-xl font-bold">
              ${totalCost.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
