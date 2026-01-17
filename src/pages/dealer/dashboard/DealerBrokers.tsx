import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Building2, TrendingUp, CheckCircle2, Clock, UserPlus } from "lucide-react";

interface ConnectedBroker {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'pending' | 'inactive';
  totalVolume: number;
  trades: number;
  lastActivity: Date;
  commission: number;
}

const connectedBrokers: ConnectedBroker[] = [
  { id: 'b1', name: 'Alpha Securities Ltd', code: 'ALPHA', status: 'active', totalVolume: 450000000, trades: 342, lastActivity: new Date(), commission: 0.5 },
  { id: 'b2', name: 'Beta Investments', code: 'BETA', status: 'active', totalVolume: 320000000, trades: 256, lastActivity: new Date(Date.now() - 3600000), commission: 0.45 },
  { id: 'b3', name: 'Gamma Trading Co', code: 'GAMMA', status: 'active', totalVolume: 280000000, trades: 198, lastActivity: new Date(Date.now() - 7200000), commission: 0.55 },
  { id: 'b4', name: 'Delta Markets', code: 'DELTA', status: 'pending', totalVolume: 0, trades: 0, lastActivity: new Date(Date.now() - 86400000), commission: 0.5 },
  { id: 'b5', name: 'Epsilon Capital', code: 'EPSILON', status: 'active', totalVolume: 180000000, trades: 145, lastActivity: new Date(Date.now() - 1800000), commission: 0.48 },
  { id: 'b6', name: 'Zeta Stockbrokers', code: 'ZETA', status: 'inactive', totalVolume: 95000000, trades: 78, lastActivity: new Date(Date.now() - 604800000), commission: 0.52 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'short', timeStyle: 'short' }).format(date);
};

export default function DealerBrokers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrokers = connectedBrokers.filter(
    (broker) => broker.name.toLowerCase().includes(searchTerm.toLowerCase()) || broker.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeBrokers = connectedBrokers.filter((b) => b.status === 'active').length;
  const totalVolume = connectedBrokers.reduce((sum, b) => sum + b.totalVolume, 0);
  const totalTrades = connectedBrokers.reduce((sum, b) => sum + b.trades, 0);

  const getStatusBadge = (status: ConnectedBroker['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Broker Network</h1>
          <p className="text-muted-foreground">Manage your broker connections and relationships</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Broker
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Brokers</p>
                <p className="text-xl font-bold">{connectedBrokers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{activeBrokers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-xl font-bold">{formatCurrency(totalVolume)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Trades</p>
                <p className="text-xl font-bold">{totalTrades.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brokers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected Brokers</CardTitle>
              <CardDescription>Brokers in your trading network</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search brokers..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Broker</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Trades</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrokers.map((broker) => (
                <TableRow key={broker.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {broker.code.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{broker.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">{broker.code}</TableCell>
                  <TableCell>{getStatusBadge(broker.status)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(broker.totalVolume)}</TableCell>
                  <TableCell className="text-right">{broker.trades.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{broker.commission}%</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{formatDate(broker.lastActivity)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
