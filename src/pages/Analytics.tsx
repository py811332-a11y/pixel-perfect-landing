import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Brain, Download, Printer } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import AppLayout from "@/components/layout/AppLayout";
import { subjects, weeklyXP } from "@/data/mockData";

export default function Analytics() {
  const radarData = subjects.map(s => ({ subject: s.name.split(" ")[0], score: s.progress, fullMark: 100 }));

  const monthlyData = [
    { week: "W1", Science: 60, Math: 50, Social: 30, English: 55, Hindi: 20 },
    { week: "W2", Science: 65, Math: 55, Social: 35, English: 60, Hindi: 25 },
    { week: "W3", Science: 72, Math: 58, Social: 42, English: 65, Hindi: 32 },
    { week: "W4", Science: 78, Math: 62, Social: 48, English: 71, Hindi: 38 },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Your Progress Report</h1>
            <p className="text-muted-foreground">Class 9 · CBSE · Last 30 days</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Download PDF</Button>
            <Button variant="outline" size="sm" className="gap-2"><Printer className="w-4 h-4" /> Print</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Subject Radar</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Subject Performance</h3>
              <div className="space-y-4">
                {subjects.map(s => (
                  <div key={s.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="font-semibold text-foreground">{s.progress}%</span>
                    </div>
                    <Progress value={s.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-0.5">Mastered {s.topicsMastered}/{s.totalTopics} topics</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <h3 className="font-display font-semibold text-foreground">Top 3 Weak Areas</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Social: Democratic Politics Chapter 2 — 35% accuracy</p>
              <p className="text-sm text-muted-foreground">Hindi: Vyakaran — 40% accuracy</p>
              <p className="text-sm text-muted-foreground">Math: Coordinate Geometry — 42% accuracy</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-2">Error Patterns</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">You often skip units in Physics problems</p>
              <p className="text-sm text-muted-foreground">Sign errors in Math — double-check negatives</p>
              <p className="text-sm text-muted-foreground">Social answers lack CBSE keywords</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">4-Week Improvement</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="Science" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="Math" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="Social" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="English" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="Hindi" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">AI Study Tip</p>
            </div>
            <p className="text-sm text-muted-foreground">Focus on Social Studies this week. 3 hours can push you from 48% to 60%. Start with Chapter 2 — it's the most scoring.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
