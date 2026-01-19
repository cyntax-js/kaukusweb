import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  FileText,
  Users,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";

export default function NewOffering() {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const steps = [
    { id: 1, title: "Basic Info", icon: FileText },
    { id: 2, title: "Pricing", icon: DollarSign },
    { id: 3, title: "Timeline", icon: CalendarIcon },
    { id: 4, title: "Review", icon: CheckCircle2 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create New Offering</h1>
        <p className="text-muted-foreground">
          Launch a new securities offering
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 ${
                step >= s.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              <span className="font-medium hidden sm:inline">{s.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  step > s.id ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Progress value={(step / steps.length) * 100} className="max-w-2xl" />

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the details of your offering
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Offering Name</Label>
              <Input id="name" placeholder="e.g., TechCorp Nigeria IPO" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Offering Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ipo">
                    Initial Public Offering (IPO)
                  </SelectItem>
                  <SelectItem value="rights">Rights Issue</SelectItem>
                  <SelectItem value="private">Private Placement</SelectItem>
                  <SelectItem value="bond">Bond Issuance</SelectItem>
                </SelectContent>
              </Select>
              a
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Company</Label>
              <Input id="issuer" placeholder="Company name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the offering"
                rows={4}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Pricing */}
      {step === 2 && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Pricing Details</CardTitle>
            <CardDescription>Set the financial parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount (₦)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="2,000,000,000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minAmount">Minimum Amount (₦)</Label>
                <Input
                  id="minAmount"
                  type="number"
                  placeholder="1,500,000,000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sharePrice">Price per Share (₦)</Label>
                <Input id="sharePrice" type="number" placeholder="25.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minSubscription">Min. Subscription (₦)</Label>
                <Input
                  id="minSubscription"
                  type="number"
                  placeholder="10,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commission">Issuing House Commission (%)</Label>
              <Input id="commission" type="number" placeholder="2.5" />
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Timeline */}
      {step === 3 && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Offering Timeline</CardTitle>
            <CardDescription>Set the offering period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allotmentDate">Allotment Date</Label>
              <Input
                id="allotmentDate"
                type="text"
                placeholder="5 business days after closing"
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Review & Submit</CardTitle>
            <CardDescription>Confirm your offering details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Offering Name</span>
                <span className="font-medium">TechCorp Nigeria IPO</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">Initial Public Offering</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Target Amount</span>
                <span className="font-medium">₦2,000,000,000</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Price per Share</span>
                <span className="font-medium">₦25.00</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Period</span>
                <span className="font-medium">
                  {startDate ? format(startDate, "MMM d") : "TBD"} -{" "}
                  {endDate ? format(endDate, "MMM d, yyyy") : "TBD"}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button className="bg-chart-2 hover:bg-chart-2/90">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Launch Offering
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
