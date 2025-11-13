import { useState } from "react";
import {
  DollarSign,
  Clock,
  TrendingUp,
  CreditCard,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";
import { MetricCard } from "@/components/billing/MetricCard";
import { UserTypeSelector, UserType } from "@/components/billing/UserTypeSelector";
import { PaymentHistory, PaymentStatus } from "@/components/billing/PaymentHistory";
import { BillingChart } from "@/components/billing/BillingChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data generators
const generateMockData = (userType: UserType) => {
  const baseData = {
    patient: {
      metrics: [
        { title: "Total Balance", value: "$1,245.00", change: "+$120 this month", changeType: "positive" as const, icon: DollarSign, iconColor: "text-primary" },
        { title: "Pending Payments", value: "$340.00", change: "2 invoices", changeType: "neutral" as const, icon: Clock, iconColor: "text-warning" },
        { title: "This Year", value: "$3,890.00", change: "+15% vs last year", changeType: "positive" as const, icon: TrendingUp, iconColor: "text-success" },
        { title: "Last Payment", value: "$180.00", change: "3 days ago", changeType: "neutral" as const, icon: CreditCard, iconColor: "text-primary" },
      ],
      payments: [
        { id: "1", date: "2025-11-10", description: "Consultation - Dr. Smith", amount: "$180.00", status: "paid" as PaymentStatus },
        { id: "2", date: "2025-11-05", description: "Lab Tests Package", amount: "$240.00", status: "paid" as PaymentStatus },
        { id: "3", date: "2025-10-28", description: "Wellness Program - Monthly", amount: "$100.00", status: "pending" as PaymentStatus },
        { id: "4", date: "2025-10-20", description: "Prescription Refill", amount: "$45.00", status: "paid" as PaymentStatus },
        { id: "5", date: "2025-10-15", description: "Telehealth Session", amount: "$120.00", status: "paid" as PaymentStatus },
      ],
      chartData: [
        { month: "Jul", amount: 320 },
        { month: "Aug", amount: 280 },
        { month: "Sep", amount: 390 },
        { month: "Oct", amount: 420 },
        { month: "Nov", amount: 465 },
      ],
      upcomingCharges: [
        { title: "Wellness Program Renewal", amount: "$100.00", date: "Nov 28, 2025" },
        { title: "Annual Check-up", amount: "$250.00", date: "Dec 5, 2025" },
      ],
    },
    doctor: {
      metrics: [
        { title: "Total Earnings", value: "$24,580.00", change: "+$3,200 this month", changeType: "positive" as const, icon: DollarSign, iconColor: "text-success" },
        { title: "Pending Payouts", value: "$4,120.00", change: "Processing", changeType: "neutral" as const, icon: Clock, iconColor: "text-warning" },
        { title: "This Year", value: "$186,420.00", change: "+22% vs last year", changeType: "positive" as const, icon: TrendingUp, iconColor: "text-success" },
        { title: "Service Fees", value: "$2,340.00", change: "8.5% of revenue", changeType: "neutral" as const, icon: CreditCard, iconColor: "text-muted-foreground" },
      ],
      payments: [
        { id: "1", date: "2025-11-10", description: "Patient Services Payout", amount: "$3,200.00", status: "paid" as PaymentStatus },
        { id: "2", date: "2025-11-05", description: "Consultation Fees", amount: "$1,840.00", status: "paid" as PaymentStatus },
        { id: "3", date: "2025-10-28", description: "Monthly Payout", amount: "$4,120.00", status: "pending" as PaymentStatus },
        { id: "4", date: "2025-10-20", description: "Telehealth Services", amount: "$2,650.00", status: "paid" as PaymentStatus },
        { id: "5", date: "2025-10-15", description: "Specialty Consultations", amount: "$3,890.00", status: "paid" as PaymentStatus },
      ],
      chartData: [
        { month: "Jul", amount: 18200 },
        { month: "Aug", amount: 19800 },
        { month: "Sep", amount: 21400 },
        { month: "Oct", amount: 20600 },
        { month: "Nov", amount: 24580 },
      ],
      upcomingCharges: [
        { title: "Platform Service Fee", amount: "$320.00", date: "Nov 30, 2025" },
        { title: "Professional Insurance", amount: "$450.00", date: "Dec 1, 2025" },
      ],
    },
    hospital: {
      metrics: [
        { title: "Total Revenue", value: "$458,920.00", change: "+$52,400 this month", changeType: "positive" as const, icon: DollarSign, iconColor: "text-success" },
        { title: "Pending Collections", value: "$82,450.00", change: "124 invoices", changeType: "neutral" as const, icon: Clock, iconColor: "text-warning" },
        { title: "This Year", value: "$3.2M", change: "+18% vs last year", changeType: "positive" as const, icon: TrendingUp, iconColor: "text-success" },
        { title: "Operational Costs", value: "$124,680.00", change: "27% of revenue", changeType: "neutral" as const, icon: CreditCard, iconColor: "text-muted-foreground" },
      ],
      payments: [
        { id: "1", date: "2025-11-10", description: "Patient Services Revenue", amount: "$52,400.00", status: "paid" as PaymentStatus },
        { id: "2", date: "2025-11-05", description: "Insurance Reimbursements", amount: "$38,200.00", status: "paid" as PaymentStatus },
        { id: "3", date: "2025-10-28", description: "Outstanding Invoices", amount: "$82,450.00", status: "pending" as PaymentStatus },
        { id: "4", date: "2025-10-20", description: "Equipment & Supplies", amount: "$28,900.00", status: "paid" as PaymentStatus },
        { id: "5", date: "2025-10-15", description: "Staff Payouts", amount: "$156,300.00", status: "paid" as PaymentStatus },
      ],
      chartData: [
        { month: "Jul", amount: 382000 },
        { month: "Aug", amount: 396000 },
        { month: "Sep", amount: 418000 },
        { month: "Oct", amount: 406000 },
        { month: "Nov", amount: 458920 },
      ],
      upcomingCharges: [
        { title: "Monthly Staff Payroll", amount: "$165,000.00", date: "Nov 30, 2025" },
        { title: "Equipment Lease", amount: "$12,500.00", date: "Dec 1, 2025" },
        { title: "Facility Maintenance", amount: "$8,900.00", date: "Dec 5, 2025" },
      ],
    },
    admin: {
      metrics: [
        { title: "Platform Revenue", value: "$892,340.00", change: "+$102,450 this month", changeType: "positive" as const, icon: DollarSign, iconColor: "text-success" },
        { title: "Pending Transactions", value: "$156,820.00", change: "342 transactions", changeType: "neutral" as const, icon: Clock, iconColor: "text-warning" },
        { title: "This Year", value: "$8.4M", change: "+28% vs last year", changeType: "positive" as const, icon: TrendingUp, iconColor: "text-success" },
        { title: "Total Users", value: "12,456", change: "+1,234 this month", changeType: "positive" as const, icon: CreditCard, iconColor: "text-primary" },
      ],
      payments: [
        { id: "1", date: "2025-11-10", description: "Platform Service Fees", amount: "$102,450.00", status: "paid" as PaymentStatus },
        { id: "2", date: "2025-11-05", description: "Subscription Revenue", amount: "$68,900.00", status: "paid" as PaymentStatus },
        { id: "3", date: "2025-10-28", description: "Pending Settlements", amount: "$156,820.00", status: "pending" as PaymentStatus },
        { id: "4", date: "2025-10-20", description: "Transaction Fees", amount: "$45,600.00", status: "paid" as PaymentStatus },
        { id: "5", date: "2025-10-15", description: "Marketplace Revenue", amount: "$89,200.00", status: "paid" as PaymentStatus },
      ],
      chartData: [
        { month: "Jul", amount: 682000 },
        { month: "Aug", amount: 728000 },
        { month: "Sep", amount: 789000 },
        { month: "Oct", amount: 812000 },
        { month: "Nov", amount: 892340 },
      ],
      upcomingCharges: [
        { title: "Server Infrastructure", amount: "$18,500.00", date: "Nov 30, 2025" },
        { title: "Support Team Salaries", amount: "$65,000.00", date: "Dec 1, 2025" },
        { title: "Marketing Budget", amount: "$25,000.00", date: "Dec 5, 2025" },
      ],
    },
  };

  return baseData[userType];
};

const Index = () => {
  const [userType, setUserType] = useState<UserType>("patient");
  const data = generateMockData(userType);

  const getUserTitle = () => {
    const titles = {
      patient: "Patient Billing Dashboard",
      doctor: "Doctor Earnings Dashboard",
      hospital: "Hospital Revenue Dashboard",
      admin: "Super Admin Dashboard",
    };
    return titles[userType];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Billing & Payments</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {getUserTitle()}
              </p>
            </div>
            <Badge variant="outline" className="text-success border-success">
              <CheckCircle className="h-3 w-3 mr-1" />
              All Systems Operational
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* User Type Selector */}
        <UserTypeSelector selectedType={userType} onTypeChange={setUserType} />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BillingChart
            title={userType === "patient" ? "Monthly Spending" : "Revenue Trend"}
            data={data.chartData}
          />
          
          {/* Upcoming Charges Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-warning" />
              Upcoming Charges
            </h3>
            <div className="space-y-4">
              {data.upcomingCharges.map((charge, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{charge.title}</p>
                    <p className="text-sm text-muted-foreground">{charge.date}</p>
                  </div>
                  <p className="font-semibold text-foreground">{charge.amount}</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View All Upcoming
            </Button>
          </Card>
        </div>

        {/* Payment History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {userType === "patient" ? "Payment History" : "Transaction History"}
            </h2>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          <PaymentHistory payments={data.payments} />
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/20 border-primary/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="w-full">Make Payment</Button>
            <Button variant="outline" className="w-full">Download Invoice</Button>
            <Button variant="outline" className="w-full">Payment Methods</Button>
            <Button variant="outline" className="w-full">Support</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
