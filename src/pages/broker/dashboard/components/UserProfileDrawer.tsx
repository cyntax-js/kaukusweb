import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { BrokerUser } from '@/mocks/brokerData';
import {
  ShieldCheck, Crown, Mail, Phone, MapPin, Calendar, Clock, 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  DollarSign, BarChart3, Activity, AlertTriangle, UserCheck, UserX
} from 'lucide-react';

interface UserProfileDrawerProps {
  user: BrokerUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (userId: string, status: BrokerUser['status']) => void;
}

// Generate mock trading history for a user
const generateMockTrades = (userId: string, count: number = 15) => {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'AMD'];
  const types = ['buy', 'sell'] as const;
  
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - i * Math.floor(Math.random() * 24));
    const type = types[Math.floor(Math.random() * 2)];
    const price = 100 + Math.random() * 400;
    const quantity = Math.floor(1 + Math.random() * 50);
    const pnl = type === 'sell' ? (Math.random() - 0.4) * 500 : 0;
    
    return {
      id: `${userId}-trade-${i}`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      type,
      price,
      quantity,
      total: price * quantity,
      pnl,
      date,
      status: 'completed' as const,
    };
  });
};

export function UserProfileDrawer({ user, open, onOpenChange, onStatusChange }: UserProfileDrawerProps) {
  const trades = useMemo(() => user ? generateMockTrades(user.id) : [], [user?.id]);
  
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate = trades.filter(t => t.pnl > 0).length / trades.filter(t => t.type === 'sell').length * 100;
  
  if (!user) return null;

  const getStatusBadge = (status: BrokerUser['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Blocked</Badge>;
      case 'restricted':
        return <Badge className="bg-warning/10 text-warning">Restricted</Badge>;
    }
  };

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case 'platinum':
        return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20"><Crown className="w-3 h-3 mr-1" />Platinum</Badge>;
      case 'gold':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Gold</Badge>;
      case 'silver':
        return <Badge className="bg-slate-400/10 text-slate-400 border-slate-400/20">Silver</Badge>;
      default:
        return <Badge variant="outline">Standard</Badge>;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-hidden flex flex-col">
        <SheetHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <SheetTitle className="flex items-center gap-2 text-xl">
                {user.name}
                {user.verified && <ShieldCheck className="w-5 h-5 text-blue-500" />}
              </SheetTitle>
              <SheetDescription className="mt-1">{user.email}</SheetDescription>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge(user.status)}
                {getTierBadge(user.tier)}
              </div>
            </div>
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="overview" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="overview" className="mt-0 space-y-4">
              {/* Account Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <DollarSign className="w-4 h-4" />
                    Balance
                  </div>
                  <div className="text-xl font-bold">
                    ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <BarChart3 className="w-4 h-4" />
                    Volume
                  </div>
                  <div className="text-xl font-bold">
                    ${user.tradingVolume.toLocaleString()}
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Activity className="w-4 h-4" />
                    Total Trades
                  </div>
                  <div className="text-xl font-bold">
                    {user.trades?.toLocaleString() || 0}
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    {totalPnL >= 0 ? <TrendingUp className="w-4 h-4 text-success" /> : <TrendingDown className="w-4 h-4 text-destructive" />}
                    Total P&L
                  </div>
                  <div className={`text-xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
                  </div>
                </Card>
              </div>

              {/* User Details */}
              <Card className="p-4 space-y-3">
                <h3 className="font-semibold">Contact Information</h3>
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>+1 (555) {Math.floor(100 + Math.random() * 900)}-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{user.country || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined {user.joinedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Last active {user.lastActive.toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => onStatusChange(user.id, 'active')}>
                    <UserCheck className="w-4 h-4 mr-1" /> Set Active
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onStatusChange(user.id, 'restricted')}>
                    <AlertTriangle className="w-4 h-4 mr-1" /> Restrict
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onStatusChange(user.id, 'blocked')}>
                    <UserX className="w-4 h-4 mr-1" /> Block
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-1" /> Email User
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="trades" className="mt-0 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Recent trades</span>
                <span className="text-sm font-medium">Win Rate: {isNaN(winRate) ? '0' : winRate.toFixed(0)}%</span>
              </div>
              {trades.map((trade) => (
                <Card key={trade.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${trade.type === 'buy' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {trade.type === 'buy' ? (
                          <ArrowUpRight className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {trade.symbol}
                          <Badge variant="outline" className="text-xs capitalize">{trade.type}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {trade.quantity} shares @ ${trade.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium">${trade.total.toFixed(2)}</div>
                      {trade.pnl !== 0 && (
                        <div className={`text-xs ${trade.pnl > 0 ? 'text-success' : 'text-destructive'}`}>
                          {trade.pnl > 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {trade.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="mt-0 space-y-3">
              {[
                { action: 'Logged in', time: '2 hours ago', icon: UserCheck },
                { action: 'Executed buy order: 10 AAPL', time: '3 hours ago', icon: ArrowUpRight },
                { action: 'Deposited $5,000', time: '1 day ago', icon: DollarSign },
                { action: 'Updated profile settings', time: '2 days ago', icon: UserCheck },
                { action: 'Executed sell order: 25 TSLA', time: '3 days ago', icon: ArrowDownRight },
                { action: 'Enabled 2FA authentication', time: '1 week ago', icon: ShieldCheck },
                { action: 'Account verified', time: '2 weeks ago', icon: ShieldCheck },
                { action: 'Account created', time: user.joinedAt.toLocaleDateString(), icon: Calendar },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
