import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, School, Calendar, Target } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { leaderboard } from "@/data/mockData";

export default function Leaderboard() {
  const [tab, setTab] = useState("global");
  const tabs = [
    { id: "global", label: "Global", icon: <Globe className="w-4 h-4" /> },
    { id: "class", label: "Class 9", icon: <School className="w-4 h-4" /> },
    { id: "week", label: "This Week", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Leaderboard</h1>
        <div className="flex gap-2 mb-8">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-end gap-4 mb-8">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((entry, i) => (
            <div key={entry.rank} className={`text-center ${i === 1 ? "order-2" : i === 0 ? "order-1" : "order-3"}`}>
              <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center text-lg font-display font-bold mx-auto mb-2 ${i === 1 ? "ring-4 ring-accent" : ""}`}>
                {entry.name[0]}
              </div>
              <p className="font-display font-semibold text-sm text-foreground">{entry.name.split(" ")[0]}</p>
              <p className="text-xs text-primary font-semibold">{entry.xp.toLocaleString()} XP</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {leaderboard.slice(3).map(entry => (
            <div key={entry.rank} className={`flex items-center gap-3 p-3 rounded-lg ${entry.isYou ? "bg-primary/5 border border-primary/20" : "hover:bg-muted"}`}>
              <span className="font-display font-bold text-sm w-6 text-center text-muted-foreground">{entry.rank}</span>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{entry.name[0]}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{entry.name} {entry.isYou && <Badge variant="secondary" className="text-[10px] ml-1">You</Badge>}</p>
              </div>
              <span className="text-sm font-semibold text-primary">{entry.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg text-center flex items-center justify-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <p className="text-sm text-foreground">Your rank: <strong>#4</strong> this week · Top 15%</p>
        </div>
      </div>
    </AppLayout>
  );
}
