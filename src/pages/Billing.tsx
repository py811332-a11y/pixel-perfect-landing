import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, CreditCard, IndianRupee } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const invoices = [
  { id: "INV-2024-003", date: "Mar 1, 2024", plan: "PRO", amount: 599, status: "Paid" },
  { id: "INV-2024-002", date: "Feb 1, 2024", plan: "PRO", amount: 599, status: "Paid" },
  { id: "INV-2024-001", date: "Jan 1, 2024", plan: "BASIC", amount: 299, status: "Paid" },
];

export default function Billing() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/subscription" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="font-display font-bold text-2xl text-foreground">Billing History</h1>
        </div>

        <Card>
          <CardContent className="p-6 space-y-2">
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <div className="flex items-center gap-3">
              <h2 className="font-display font-bold text-xl text-foreground">PRO Plan</h2>
              <Badge className="bg-primary/10 text-primary border-0">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Next billing date: <span className="text-foreground font-medium">April 1, 2024</span></p>
            <p className="text-sm text-muted-foreground">Payment method: <span className="text-foreground font-medium">UPI — arjun@paytm</span></p>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm">Update Payment Method</Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-3">Invoices</h2>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <Card key={inv.id} className="card-hover">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date} · {inv.plan} Plan</p>
                  </div>
                  <p className="font-display font-bold text-foreground">₹{inv.amount}</p>
                  <Badge variant="secondary" className="bg-success/10 text-success border-0">{inv.status}</Badge>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
