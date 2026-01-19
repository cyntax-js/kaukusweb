import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Search,
  Building2,
  Briefcase,
  User,
  TrendingUp,
  Mail,
  UserPlus,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Eye,
  PieChart,
  Calendar,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'institutional' | 'retail' | 'hnwi';
  totalInvested: number;
  kycStatus: 'verified' | 'pending' | 'expired';
  subscriptions: InvestorSubscription[];
  documents: InvestorDocument[];
  lastActivity: Date;
  joinedAt: Date;
}

interface InvestorSubscription {
  id: string;
  offeringName: string;
  offeringType: 'IPO' | 'Rights Issue' | 'Private Placement' | 'Bond';
  amount: number;
  units: number;
  pricePerUnit: number;
  status: 'subscribed' | 'allocated' | 'allotted' | 'refunded' | 'pending';
  allottedUnits?: number;
  allottedAmount?: number;
  subscriptionDate: Date;
  allotmentDate?: Date;
}

interface InvestorDocument {
  id: string;
  name: string;
  type: 'prospectus' | 'allotment_letter' | 'refund_advice' | 'share_certificate' | 'statement';
  offeringName?: string;
  uploadedAt: Date;
  size: string;
}

const mockInvestors: Investor[] = [
  {
    id: 'inv1',
    name: 'Pension Fund Alpha',
    email: 'invest@pfa.com',
    phone: '+234 800 123 4567',
    type: 'institutional',
    totalInvested: 500000000,
    kycStatus: 'verified',
    lastActivity: new Date(),
    joinedAt: new Date('2024-01-15'),
    subscriptions: [
      { id: 's1', offeringName: 'TechCorp Nigeria IPO', offeringType: 'IPO', amount: 300000000, units: 12000000, pricePerUnit: 25, status: 'allocated', allottedUnits: 10500000, allottedAmount: 262500000, subscriptionDate: new Date('2025-01-05'), allotmentDate: new Date('2025-02-16') },
      { id: 's2', offeringName: 'Energy Corp Bond', offeringType: 'Bond', amount: 200000000, units: 200000, pricePerUnit: 1000, status: 'subscribed', subscriptionDate: new Date('2025-01-12') },
    ],
    documents: [
      { id: 'd1', name: 'TechCorp Nigeria IPO Prospectus', type: 'prospectus', offeringName: 'TechCorp Nigeria IPO', uploadedAt: new Date('2024-12-20'), size: '4.2 MB' },
      { id: 'd2', name: 'Allotment Letter - TechCorp IPO', type: 'allotment_letter', offeringName: 'TechCorp Nigeria IPO', uploadedAt: new Date('2025-02-16'), size: '156 KB' },
      { id: 'd3', name: 'Q4 2024 Investment Statement', type: 'statement', uploadedAt: new Date('2025-01-05'), size: '89 KB' },
    ]
  },
  {
    id: 'inv2',
    name: 'Chief Adebayo Holdings',
    email: 'chief@adebayo.com',
    phone: '+234 803 456 7890',
    type: 'hnwi',
    totalInvested: 150000000,
    kycStatus: 'verified',
    lastActivity: new Date(Date.now() - 86400000),
    joinedAt: new Date('2024-03-20'),
    subscriptions: [
      { id: 's3', offeringName: 'TechCorp Nigeria IPO', offeringType: 'IPO', amount: 75000000, units: 3000000, pricePerUnit: 25, status: 'allotted', allottedUnits: 2800000, allottedAmount: 70000000, subscriptionDate: new Date('2025-01-03'), allotmentDate: new Date('2025-02-16') },
      { id: 's4', offeringName: 'FirstBank Rights Issue', offeringType: 'Rights Issue', amount: 50000000, units: 10000000, pricePerUnit: 5, status: 'allotted', allottedUnits: 10000000, allottedAmount: 50000000, subscriptionDate: new Date('2024-12-05'), allotmentDate: new Date('2025-01-20') },
      { id: 's5', offeringName: 'FinTech Startup Private Placement', offeringType: 'Private Placement', amount: 25000000, units: 500000, pricePerUnit: 50, status: 'pending', subscriptionDate: new Date('2025-01-20') },
    ],
    documents: [
      { id: 'd4', name: 'TechCorp Nigeria IPO Prospectus', type: 'prospectus', offeringName: 'TechCorp Nigeria IPO', uploadedAt: new Date('2024-12-20'), size: '4.2 MB' },
      { id: 'd5', name: 'Share Certificate - FirstBank', type: 'share_certificate', offeringName: 'FirstBank Rights Issue', uploadedAt: new Date('2025-01-25'), size: '234 KB' },
    ]
  },
  {
    id: 'inv3',
    name: 'Mrs. Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+234 812 345 6789',
    type: 'retail',
    totalInvested: 2500000,
    kycStatus: 'verified',
    lastActivity: new Date(Date.now() - 172800000),
    joinedAt: new Date('2024-06-10'),
    subscriptions: [
      { id: 's6', offeringName: 'TechCorp Nigeria IPO', offeringType: 'IPO', amount: 1500000, units: 60000, pricePerUnit: 25, status: 'allocated', allottedUnits: 45000, allottedAmount: 1125000, subscriptionDate: new Date('2025-01-08'), allotmentDate: new Date('2025-02-16') },
      { id: 's7', offeringName: 'Energy Corp Bond', offeringType: 'Bond', amount: 1000000, units: 1000, pricePerUnit: 1000, status: 'subscribed', subscriptionDate: new Date('2025-01-15') },
    ],
    documents: [
      { id: 'd6', name: 'TechCorp Nigeria IPO Prospectus', type: 'prospectus', offeringName: 'TechCorp Nigeria IPO', uploadedAt: new Date('2024-12-20'), size: '4.2 MB' },
      { id: 'd7', name: 'Refund Advice - TechCorp IPO', type: 'refund_advice', offeringName: 'TechCorp Nigeria IPO', uploadedAt: new Date('2025-02-18'), size: '78 KB' },
    ]
  },
  {
    id: 'inv4',
    name: 'Investment Trust Beta',
    email: 'trust@itb.com',
    phone: '+234 809 876 5432',
    type: 'institutional',
    totalInvested: 750000000,
    kycStatus: 'verified',
    lastActivity: new Date(),
    joinedAt: new Date('2023-11-01'),
    subscriptions: [
      { id: 's8', offeringName: 'TechCorp Nigeria IPO', offeringType: 'IPO', amount: 400000000, units: 16000000, pricePerUnit: 25, status: 'allocated', allottedUnits: 14000000, allottedAmount: 350000000, subscriptionDate: new Date('2025-01-02'), allotmentDate: new Date('2025-02-16') },
      { id: 's9', offeringName: 'Energy Corp Bond', offeringType: 'Bond', amount: 350000000, units: 350000, pricePerUnit: 1000, status: 'subscribed', subscriptionDate: new Date('2025-01-11') },
    ],
    documents: [
      { id: 'd8', name: 'TechCorp Nigeria IPO Prospectus', type: 'prospectus', offeringName: 'TechCorp Nigeria IPO', uploadedAt: new Date('2024-12-20'), size: '4.2 MB' },
      { id: 'd9', name: 'Energy Corp Bond Prospectus', type: 'prospectus', offeringName: 'Energy Corp Bond', uploadedAt: new Date('2025-01-08'), size: '3.8 MB' },
    ]
  },
  {
    id: 'inv5',
    name: 'Dr. Emeka Okafor',
    email: 'emeka@doctor.com',
    phone: '+234 805 234 5678',
    type: 'hnwi',
    totalInvested: 85000000,
    kycStatus: 'pending',
    lastActivity: new Date(Date.now() - 259200000),
    joinedAt: new Date('2024-08-25'),
    subscriptions: [
      { id: 's10', offeringName: 'FirstBank Rights Issue', offeringType: 'Rights Issue', amount: 35000000, units: 7000000, pricePerUnit: 5, status: 'allotted', allottedUnits: 7000000, allottedAmount: 35000000, subscriptionDate: new Date('2024-12-08'), allotmentDate: new Date('2025-01-20') },
      { id: 's11', offeringName: 'Energy Corp Bond', offeringType: 'Bond', amount: 50000000, units: 50000, pricePerUnit: 1000, status: 'subscribed', subscriptionDate: new Date('2025-01-14') },
    ],
    documents: [
      { id: 'd10', name: 'FirstBank Rights Issue Circular', type: 'prospectus', offeringName: 'FirstBank Rights Issue', uploadedAt: new Date('2024-11-25'), size: '2.1 MB' },
    ]
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(date);
};

const getTypeBadge = (type: Investor['type']) => {
  switch (type) {
    case 'institutional':
      return <Badge className="bg-primary/20 text-primary border-primary/30"><Building2 className="w-3 h-3 mr-1" />Institutional</Badge>;
    case 'hnwi':
      return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30"><Briefcase className="w-3 h-3 mr-1" />HNWI</Badge>;
    case 'retail':
      return <Badge variant="secondary"><User className="w-3 h-3 mr-1" />Retail</Badge>;
  }
};

const getKycBadge = (status: Investor['kycStatus']) => {
  switch (status) {
    case 'verified':
      return <Badge className="bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3 mr-1" />Verified</Badge>;
    case 'pending':
      return <Badge className="bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    case 'expired':
      return <Badge variant="destructive">Expired</Badge>;
  }
};

const getSubscriptionStatusBadge = (status: InvestorSubscription['status']) => {
  switch (status) {
    case 'subscribed':
      return <Badge className="bg-primary/20 text-primary border-primary/30">Subscribed</Badge>;
    case 'allocated':
      return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Allocated</Badge>;
    case 'allotted':
      return <Badge className="bg-success/20 text-success border-success/30">Allotted</Badge>;
    case 'refunded':
      return <Badge variant="secondary">Refunded</Badge>;
    case 'pending':
      return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
  }
};

const getDocumentIcon = (type: InvestorDocument['type']) => {
  switch (type) {
    case 'prospectus':
      return <FileText className="w-4 h-4 text-primary" />;
    case 'allotment_letter':
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case 'refund_advice':
      return <CreditCard className="w-4 h-4 text-warning" />;
    case 'share_certificate':
      return <FileText className="w-4 h-4 text-chart-4" />;
    case 'statement':
      return <PieChart className="w-4 h-4 text-chart-2" />;
  }
};

export default function Investors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  const filteredInvestors = mockInvestors.filter((investor) => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || investor.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalInvested = mockInvestors.reduce((sum, i) => sum + i.totalInvested, 0);
  const institutionalCount = mockInvestors.filter((i) => i.type === 'institutional').length;
  const hnwiCount = mockInvestors.filter((i) => i.type === 'hnwi').length;
  const retailCount = mockInvestors.filter((i) => i.type === 'retail').length;
  const totalSubscriptions = mockInvestors.reduce((sum, i) => sum + i.subscriptions.length, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Investor Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive investor management and tracking</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Investor
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Investors</p>
              <p className="text-xl font-bold">{mockInvestors.length}</p>
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

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Subscriptions</p>
              <p className="text-xl font-bold">{totalSubscriptions}</p>
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
              <CardDescription>Click on any investor to view detailed information</CardDescription>
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
              <TabsTrigger value="all">All ({mockInvestors.length})</TabsTrigger>
              <TabsTrigger value="institutional">Institutional ({institutionalCount})</TabsTrigger>
              <TabsTrigger value="hnwi">HNWI ({hnwiCount})</TabsTrigger>
              <TabsTrigger value="retail">Retail ({retailCount})</TabsTrigger>
            </TabsList>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead className="text-right">Total Invested</TableHead>
                  <TableHead className="text-right">Subscriptions</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvestors.map((investor) => (
                  <TableRow 
                    key={investor.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedInvestor(investor)}
                  >
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
                    <TableCell>{getKycBadge(investor.kycStatus)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(investor.totalInvested)}</TableCell>
                    <TableCell className="text-right">{investor.subscriptions.length}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(investor.lastActivity)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tabs>
        </CardContent>
      </Card>

      {/* Investor Detail Dialog */}
      <Dialog open={!!selectedInvestor} onOpenChange={() => setSelectedInvestor(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedInvestor?.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span>{selectedInvestor?.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  {selectedInvestor && getTypeBadge(selectedInvestor.type)}
                  {selectedInvestor && getKycBadge(selectedInvestor.kycStatus)}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedInvestor && (
            <ScrollArea className="max-h-[calc(90vh-120px)]">
              <div className="space-y-6 pr-4">
                {/* Contact Info */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-lg border border-border bg-secondary/20">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedInvestor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedInvestor.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{formatDate(selectedInvestor.joinedAt)}</p>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Total Invested</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(selectedInvestor.totalInvested)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Subscriptions</p>
                      <p className="text-2xl font-bold">{selectedInvestor.subscriptions.length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Documents</p>
                      <p className="text-2xl font-bold">{selectedInvestor.documents.length}</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Subscriptions */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Subscription Details
                  </h3>
                  <div className="space-y-3">
                    {selectedInvestor.subscriptions.map((sub) => (
                      <div key={sub.id} className="p-4 rounded-lg border border-border">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{sub.offeringName}</span>
                              <Badge variant="outline">{sub.offeringType}</Badge>
                              {getSubscriptionStatusBadge(sub.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Subscribed: {formatDate(sub.subscriptionDate)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(sub.amount)}</p>
                            <p className="text-sm text-muted-foreground">{sub.units.toLocaleString()} units @ {formatCurrency(sub.pricePerUnit)}</p>
                          </div>
                        </div>
                        
                        {(sub.status === 'allocated' || sub.status === 'allotted') && sub.allottedUnits && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Allocation Progress</span>
                              <span className="font-medium">{((sub.allottedUnits / sub.units) * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={(sub.allottedUnits / sub.units) * 100} className="h-2" />
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Allotted: {sub.allottedUnits.toLocaleString()} units</span>
                              <span className="text-success font-medium">{formatCurrency(sub.allottedAmount || 0)}</span>
                            </div>
                            {sub.allottedAmount && sub.allottedAmount < sub.amount && (
                              <div className="flex items-center gap-2 text-sm text-warning">
                                <ArrowUpRight className="w-3 h-3" />
                                <span>Refund due: {formatCurrency(sub.amount - sub.allottedAmount)}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Documents */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documents
                  </h3>
                  <div className="space-y-2">
                    {selectedInvestor.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          {getDocumentIcon(doc.type)}
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.offeringName && `${doc.offeringName} • `}
                              {formatDate(doc.uploadedAt)} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
