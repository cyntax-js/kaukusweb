import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { TrendingUp, Building2, ArrowRight } from "lucide-react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuthStore();

  const handleSelectRole = (role: "broker" | "dealer") => {
    setSelectedRole(role);
    navigate(
      role === "broker" ? "/broker/requirements" : "/dealer/application"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-muted-foreground">
            Select how you want to participate in the ContisX ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="p-8 hover-lift cursor-pointer group"
            onClick={() => handleSelectRole("broker")}
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Become a Broker</h2>
            <p className="text-muted-foreground mb-6">
              Launch your own trading platform with our Broker-as-a-Service
              solution. Serve retail and institutional clients.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>• White-label trading platforms</li>
              <li>• Customizable templates</li>
              <li>• User & fee management</li>
            </ul>
            <Button className="w-full group-hover:shadow-glow">
              Select Broker <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          <Card
            className="p-8 hover-lift cursor-pointer group"
            onClick={() => handleSelectRole("dealer")}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Become a Dealer</h2>
            <p className="text-muted-foreground mb-6">
              Provide liquidity to the marketplace. Connect your institution and
              participate in market making.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>• Direct market access</li>
              <li>• Institutional-grade API</li>
              <li>• Risk management tools</li>
            </ul>
            <Button variant="outline" className="w-full">
              Select Dealer <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
