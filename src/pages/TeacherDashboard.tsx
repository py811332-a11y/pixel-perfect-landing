import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/components/layout/AppLayout";

export default function TeacherDashboard() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Mrs. Sharma · Class 9-A · 42 Students</p>
        <div className="mt-8 space-y-6">
          <Card><CardContent className="p-6">
            <h2 className="font-display font-semibold text-foreground mb-4">Class Heatmap — Weak Topics</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between"><span className="text-sm text-foreground">Ch.3: Atoms and Molecules</span><Badge variant="destructive">42% accuracy</Badge></div>
              <div className="flex items-center justify-between"><span className="text-sm text-foreground">Ch.8: Motion</span><Badge className="bg-accent/20 text-accent border-0">58% accuracy</Badge></div>
              <div className="flex items-center justify-between"><span className="text-sm text-foreground">Ch.1: States of Matter</span><Badge className="bg-success/20 text-success border-0">76% accuracy</Badge></div>
            </div>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <h2 className="font-display font-semibold text-foreground mb-4">Students Needing Help</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-foreground">Dev Sharma</p><p className="text-xs text-muted-foreground">0 activity last 5 days</p></div><Button variant="outline" size="sm">Message</Button></div>
              <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-foreground">Ananya Singh</p><p className="text-xs text-muted-foreground">35% on last test</p></div><Button variant="outline" size="sm">View Report</Button></div>
            </div>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <h2 className="font-display font-semibold text-foreground mb-2">Pending Approvals</h2>
            <p className="text-sm text-muted-foreground">2 AI-generated questions await your review</p>
            <Button size="sm" className="mt-3">Review →</Button>
          </CardContent></Card>
        </div>
      </div>
    </AppLayout>
  );
}
