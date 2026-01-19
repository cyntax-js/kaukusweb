/**
 * Underwriters Management Page - Issuing House
 * View and manage underwriters for securities offerings
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users,
  Search,
  Building2,
  TrendingUp,
  CheckCircle2,
  Clock,
  UserPlus,
  Briefcase,
  DollarSign,
  Star,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

interface Underwriter {
  id: string;
  name: string;
  code: string;
  type: 'investment_bank' | 'commercial_bank' | 'broker_dealer';
  status: 'active' | 'pending' | 'suspended';
  totalUnderwritten: number;
  activeDeals: number;
  successRate: number;
  rating: number;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  specializations: string[];
  lastDeal: Date;
}

const mockUnderwriters: Underwriter[] = [
  { 
    id: 'uw1', 
    name: 'First Capital Alliance', 
    code: 'FCA', 
    type: 'investment_bank',
    status: 'active', 
    totalUnderwritten: 25000000000, 
    activeDeals: 3,
    successRate: 98.5,
    rating: 4.8,
    contact: { email: 'deals@fca.com', phone: '+234 1 234 5678', website: 'www.fca.com' },
    specializations: ['IPO', 'Bond Issuance', 'Rights Issue'],
    lastDeal: new Date(Date.now() - 604800000)
  },
  { 
    id: 'uw2', 
    name: 'Continental Securities', 
    code: 'CONTSEC', 
    type: 'broker_dealer',
    status: 'active', 
    totalUnderwritten: 18500000000, 
    activeDeals: 2,
    successRate: 95.2,
    rating: 4.5,
    contact: { email: 'underwriting@contsec.com', phone: '+234 1 345 6789', website: 'www.contsec.com' },
    specializations: ['Private Placement', 'IPO'],
    lastDeal: new Date(Date.now() - 1209600000)
  },
  { 
    id: 'uw3', 
    name: 'Heritage Bank Capital', 
    code: 'HBC', 
    type: 'commercial_bank',
    status: 'active', 
    totalUnderwritten: 32000000000, 
    activeDeals: 4,
    successRate: 99.1,
    rating: 4.9,
    contact: { email: 'capital@heritage.com', phone: '+234 1 456 7890', website: 'www.heritagebank.com' },
    specializations: ['Bond Issuance', 'Commercial Paper', 'Rights Issue'],
    lastDeal: new Date(Date.now() - 259200000)
  },
  { 
    id: 'uw4', 
    name: 'Prime Securities Ltd', 
    code: 'PRIME', 
    type: 'broker_dealer',
    status: 'pending', 
    totalUnderwritten: 8500000000, 
    activeDeals: 0,
    successRate: 92.3,
    rating: 4.2,
    contact: { email: 'info@primesec.com', phone: '+234 1 567 8901', website: 'www.primesec.com' },
    specializations: ['Private Placement', 'SME Listings'],
    lastDeal: new Date(Date.now() - 2592000000)
  },
  { 
    id: 'uw5', 
    name: 'Zenith Capital Markets', 
    code: 'ZCM', 
    type: 'commercial_bank',
    status: 'active', 
    totalUnderwritten: 45000000000, 
    activeDeals: 5,
    successRate: 97.8,
    rating: 4.7,
    contact: { email: 'underwriting@zenithcm.com', phone: '+234 1 678 9012', website: 'www.zenithcm.com' },
    specializations: ['IPO', 'Bond Issuance', 'Rights Issue', 'Private Placement'],
    lastDeal: new Date()
  },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) {
    return `₦${(value / 1000000000).toFixed(1)}B`;
  }
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(date);
};

export default function Underwriters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnderwriter, setSelectedUnderwriter] = useState<Underwriter | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredUnderwriters = mockUnderwriters.filter(
    (uw) => uw.name.toLowerCase().includes(searchTerm.toLowerCase()) || uw.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUnderwriters = mockUnderwriters.filter((uw) => uw.status === 'active').length;
  const totalUnderwritten = mockUnderwriters.reduce((sum, uw) => sum + uw.totalUnderwritten, 0);
  const totalActiveDeals = mockUnderwriters.reduce((sum, uw) => sum + uw.activeDeals, 0);

  const getStatusBadge = (status: Underwriter['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge className="bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'suspended':
        return <Badge variant="secondary">Suspended</Badge>;
    }
  };

  const getTypeBadge = (type: Underwriter['type']) => {
    switch (type) {
      case 'investment_bank':
        return <Badge variant="outline">Investment Bank</Badge>;
      case 'commercial_bank':
        return <Badge variant="outline">Commercial Bank</Badge>;
      case 'broker_dealer':
        return <Badge variant="outline">Broker-Dealer</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
          />
        ))}
        <span className="text-sm ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Underwriters</h1>
          <p className="text-muted-foreground">Manage underwriters for your securities offerings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Underwriter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Underwriter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input placeholder="First Capital Alliance" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input placeholder="FCA" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investment_bank">Investment Bank</SelectItem>
                      <SelectItem value="commercial_bank">Commercial Bank</SelectItem>
                      <SelectItem value="broker_dealer">Broker-Dealer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="deals@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+234 1 234 5678" />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input placeholder="www.company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Specializations</Label>
                <Textarea placeholder="IPO, Bond Issuance, Rights Issue..." rows={2} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button>Add Underwriter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                <p className="text-sm text-muted-foreground">Total Underwriters</p>
                <p className="text-xl font-bold">{mockUnderwriters.length}</p>
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
                <p className="text-xl font-bold">{activeUnderwriters}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Underwritten</p>
                <p className="text-xl font-bold">{formatCurrency(totalUnderwritten)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <p className="text-xl font-bold">{totalActiveDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Underwriters Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registered Underwriters</CardTitle>
              <CardDescription>Vetted underwriters available for your offerings</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search underwriters..."
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
                <TableHead>Underwriter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Underwritten</TableHead>
                <TableHead className="text-right">Active Deals</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Last Deal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnderwriters.map((underwriter) => (
                <TableRow key={underwriter.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-chart-4/10 text-chart-4 text-xs">
                          {underwriter.code.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium">{underwriter.name}</span>
                        <p className="text-xs text-muted-foreground">{underwriter.code}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(underwriter.type)}</TableCell>
                  <TableCell>{getStatusBadge(underwriter.status)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(underwriter.totalUnderwritten)}</TableCell>
                  <TableCell className="text-right">{underwriter.activeDeals}</TableCell>
                  <TableCell>{renderStars(underwriter.rating)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{formatDate(underwriter.lastDeal)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedUnderwriter(underwriter)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Underwriter Detail Dialog */}
      <Dialog open={!!selectedUnderwriter} onOpenChange={() => setSelectedUnderwriter(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Underwriter Details</DialogTitle>
          </DialogHeader>
          {selectedUnderwriter && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-chart-4/10 text-chart-4 text-lg">
                    {selectedUnderwriter.code.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedUnderwriter.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeBadge(selectedUnderwriter.type)}
                    {getStatusBadge(selectedUnderwriter.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Total Underwritten</p>
                  <p className="font-semibold">{formatCurrency(selectedUnderwriter.totalUnderwritten)}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Success Rate</p>
                  <p className="font-semibold">{selectedUnderwriter.successRate}%</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Active Deals</p>
                  <p className="font-semibold">{selectedUnderwriter.activeDeals}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground mb-1">Rating</p>
                  {renderStars(selectedUnderwriter.rating)}
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-medium mb-3">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUnderwriter.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary">{spec}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{selectedUnderwriter.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{selectedUnderwriter.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{selectedUnderwriter.contact.website}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedUnderwriter(null)}>Close</Button>
                <Button className="flex-1">Select for Offering</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
