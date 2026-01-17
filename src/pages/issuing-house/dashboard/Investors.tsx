import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, Building2, Briefcase, User, TrendingUp, Mail, UserPlus } from "lucide-react";
import { issuingHouseInvestors, IssuingHouseInvestor } from "@/mocks/rolesDashboardData";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(date);
};

const getTypeBadge = (type: IssuingHouseInvestor['type']) => {
  switch (type) {
    case 'institutional':
      return <Badge className="bg-primary/20 text-primary border-primary/30"><Building2 className="w-3 h-3 mr-1" />Institutional</Badge>;
    case 'hnwi':
      return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30"><Briefcase className="w-3 h-3 mr-1" />HNWI</Badge>;
    case 'retail':
      return <Badge variant="secondary"><User className="w-3 h-3 mr-1" />Retail</Badge>;
  }
};

export default function Investors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredInvestors = issuingHouseInvestors.filter((investor) => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || investor.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalInvested = issuingHouseInvestors.reduce((sum, i) => sum + i.totalInvested, 0);
  const institutionalCount = issuingHouseInvestors.filter((i) => i.type === 'institutional').length;
  const hnwiCount = issuingHouseInvestors.filter((i) => i.type === 'hnwi').length;
  const retailCount = issuingHouseInvestors.filter((i) => i.type === 'retail').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Investor Relations</h1>
          <p className="text-muted-foreground">Manage your investor base and relationships</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Investor
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Investors</p>
              <p className="text-xl font-bold">{issuingHouseInvestors.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Invested</p>
              <p className="text-xl font-bold">{formatCurrency(totalInvested)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-chart-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Institutional</p>
              <p className="text-xl font-bold">{institutionalCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">HNWI</p>
              <p className="text-xl font-bold">{hnwiCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investors Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Investor Directory</CardTitle>
              <CardDescription>All registered investors</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search investors..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={typeFilter} onValueChange={setTypeFilter} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All ({issuingHouseInvestors.length})</TabsTrigger>
              <TabsTrigger value="institutional">Institutional ({institutionalCount})</TabsTrigger>
              <TabsTrigger value="hnwi">HNWI ({hnwiCount})</TabsTrigger>
              <TabsTrigger value="retail">Retail ({retailCount})</TabsTrigger>
            </TabsList>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Total Invested</TableHead>
                  <TableHead className="text-right">Offerings</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvestors.map((investor) => (
                  <TableRow key={investor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {investor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{investor.name}</p>
                          <p className="text-sm text-muted-foreground">{investor.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(investor.type)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(investor.totalInvested)}</TableCell>
                    <TableCell className="text-right">{investor.offerings}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(investor.lastActivity)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
