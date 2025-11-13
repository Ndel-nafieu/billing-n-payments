import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentStatus = "paid" | "pending" | "overdue" | "failed";

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: PaymentStatus;
  invoiceUrl?: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

const statusConfig: Record<PaymentStatus, { variant: string; className: string }> = {
  paid: { variant: "default", className: "bg-success text-success-foreground" },
  pending: { variant: "secondary", className: "bg-warning text-warning-foreground" },
  overdue: { variant: "destructive", className: "bg-destructive text-destructive-foreground" },
  failed: { variant: "destructive", className: "bg-destructive text-destructive-foreground" },
};

export const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{payment.date}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell className="font-semibold">{payment.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize",
                      statusConfig[payment.status].className
                    )}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
