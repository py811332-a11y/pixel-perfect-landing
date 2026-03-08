import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, BarChart3, AlertTriangle, CheckCircle, Settings } from "lucide-react";

const stats = [
  { icon: Users, label: "Total Students", value: "50,234", change: "+1,204 this week", color: "text-primary" },
  { icon: BookOpen, label: "Active Courses", value: "79", change: "5 subjects · Class 6–10", color: "text-accent" },
  { icon: BarChart3, label: "Tests Taken Today", value: "3,412", change: "+18% vs yesterday", color: "text-success" },
  { icon: AlertTriangle, label: "Flagged Content", value: "7", change: "Needs review", color: "text-destructive" },
];

const recentUsers = [
  { name: "Sneha Sharma", class: 9, plan: "PRO", joined: "2 hours ago" },
  { name: "Rahul Verma", class: 10, plan: "FREE", joined: "5 hours ago" },
  { name: "Priya Gupta", class: 8, plan: "BASIC", joined: "1 day ago" },
  { name: "Dev Singh", class: 9, plan: "JEE_ELITE", joined: "1 day ago" },
];

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">SG</div>
          <h1 className="font-display font-bold text-lg text-foreground">ShikshaGuruji Admin</h1>
          <Badge className="bg-destructive/10 text-destructive border-0 text-xs">Admin Panel</Badge>
        </div>
        <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
      </header>

      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Recent Registrations</h3>
              <div className="space-y-3">
                {recentUsers.map((u, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {u.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">Class {u.class} · {u.joined}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{u.plan}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Content Status</h3>
              <div className="space-y-4">
                {[
                  { subject: "Science", chapters: 15, ready: 15 },
                  { subject: "Math", chapters: 15, ready: 12 },
                  { subject: "Social Studies", chapters: 27, ready: 20 },
                  { subject: "English", chapters: 10, ready: 10 },
                  { subject: "Hindi", chapters: 12, ready: 8 },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{s.subject}</span>
                      <span className="text-muted-foreground">{s.ready}/{s.chapters} chapters</span>
                    </div>
                    <Progress value={(s.ready / s.chapters) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Flagged AI Content</h3>
            <div className="space-y-3">
              {[
                { topic: "Atoms and Molecules — Step 4", issue: "Incorrect molecular weight value", status: "pending" },
                { topic: "Laws of Motion — Step 12", issue: "Diagram missing labels", status: "pending" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.topic}</p>
                    <p className="text-xs text-muted-foreground">{item.issue}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><CheckCircle className="w-4 h-4 mr-1" /> Approve</Button>
                    <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
