import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

export default function ParentDashboard() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Parent Dashboard</h1>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">👤</div>
              <div><p className="font-display font-semibold text-foreground">Arjun · Class 9</p><p className="text-sm text-muted-foreground">🔥 12 Day Streak · ⚡ 2,450 XP this month</p></div>
            </div>
            <div className="space-y-3">
              {[
                { subject: "Science", progress: 78, trend: "↑ improving" },
                { subject: "Math", progress: 62, trend: "→ steady" },
                { subject: "Social", progress: 48, trend: "↓ needs focus" },
              ].map(s => (
                <div key={s.subject} className="flex items-center gap-3">
                  <span className="text-sm w-16 text-foreground">{s.subject}</span>
                  <Progress value={s.progress} className="flex-1 h-2" />
                  <span className="text-sm font-semibold text-foreground w-10">{s.progress}%</span>
                  <span className="text-xs text-muted-foreground">{s.trend}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Last active: Today, 9:30 PM</p>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm">View Full Report</Button>
              <Button variant="outline" size="sm">Download PDF</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
