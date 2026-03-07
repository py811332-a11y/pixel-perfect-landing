import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Flame, Zap, CheckCircle, Layers, TrendingUp, Trophy } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import AppLayout from "@/components/layout/AppLayout";
import { studentProfile, subjects, weeklyXP, leaderboard, badges } from "@/data/mockData";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Welcome back, {studentProfile.name.split(" ")[0]}! 👋</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Flame className="w-5 h-5 text-orange-500" />, label: "Day Streak", value: studentProfile.streak, color: "text-orange-500" },
            { icon: <Zap className="w-5 h-5 text-primary" />, label: "XP", value: studentProfile.xp.toLocaleString(), color: "text-primary" },
            { icon: <CheckCircle className="w-5 h-5 text-success" />, label: "Topics Done", value: studentProfile.topicsDone, color: "text-success" },
            { icon: <Layers className="w-5 h-5 text-accent" />, label: "Cards Due", value: studentProfile.cardsDue, color: "text-accent" },
          ].map((stat, i) => (
            <Card key={i} className="card-hover">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">{stat.icon}</div>
                <div>
                  <p className={`font-display font-bold text-xl ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Learning */}
        <Card className="bg-gradient-to-r from-primary to-primary-light border-0">
          <CardContent className="p-6 text-primary-foreground">
            <p className="text-sm opacity-80">▶ Continue where you left off</p>
            <h3 className="font-display font-bold text-xl mt-1">States of Matter — Science Chapter 1</h3>
            <div className="mt-3 flex items-center gap-3">
              <Progress value={75} className="flex-1 h-2 bg-white/20" />
              <span className="text-sm font-semibold">75%</span>
            </div>
            <Link to="/topics/t2/lesson">
              <Button className="mt-4 bg-white text-primary hover:bg-white/90 gap-2">
                Resume Lesson <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Today's Study Plan */}
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-3">Today's Study Plan</h2>
          <div className="space-y-3">
            {[
              { icon: "📖", task: "Watch lesson: Atoms and Molecules", time: "~12 min", path: "/topics/t2/lesson" },
              { icon: "⚡", task: "Review 23 flashcards", time: "~8 min", path: "/flashcards" },
              { icon: "🎯", task: "Topic test: States of Matter", time: "~10 min", path: "/topics/t1/test" },
            ].map((item, i) => (
              <Link key={i} to={item.path}>
                <Card className="card-hover">
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item.task}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-3">Your Subjects</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {subjects.map((s) => (
              <Link key={s.id} to={`/subjects/${s.id}`}>
                <Card className="card-hover">
                  <CardContent className="p-4 text-center">
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="font-display font-semibold text-sm text-foreground mt-2">{s.name}</h3>
                    <Progress value={s.progress} className="h-1.5 mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">{s.topicsMastered}/{s.totalTopics} topics</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Challenge Friends */}
        <Card className="bg-gradient-to-r from-accent/20 to-accent/5 border-accent/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg text-foreground">🎯 Challenge Your Classmates!</h3>
              <p className="text-sm text-muted-foreground mt-1">Start a Group Test and see who's the real topper</p>
            </div>
            <div className="flex gap-3">
              <Link to="/group-test/create"><Button className="gap-2">Create Test <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/group-test/join"><Button variant="outline">Join Test</Button></Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Progress */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Weekly XP</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyXP}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line type="monotone" dataKey="xp" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Leaderboard Peek */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">Leaderboard</h3>
                <Link to="/leaderboard" className="text-sm text-primary hover:underline">See all →</Link>
              </div>
              <div className="space-y-3">
                {leaderboard.slice(0, 5).map((entry) => (
                  <div key={entry.rank} className={`flex items-center gap-3 p-2 rounded-lg ${entry.isYou ? "bg-primary/5 border border-primary/20" : ""}`}>
                    <span className="font-display font-bold text-sm w-6 text-center">{entry.badge || entry.rank}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{entry.name} {entry.isYou && <Badge variant="secondary" className="text-[10px] ml-1">You</Badge>}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{entry.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-3">Recent Achievements</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {badges.filter(b => b.earned).slice(0, 6).map((badge, i) => (
              <div key={i} className="flex-shrink-0 w-20 text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 mx-auto flex items-center justify-center text-2xl">{badge.icon}</div>
                <p className="text-xs font-medium text-foreground mt-1">{badge.name}</p>
                <p className="text-[10px] text-muted-foreground">{badge.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
