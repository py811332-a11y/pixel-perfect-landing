import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Flame, CheckCircle, Zap, Layers, MapPin } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { studentProfile, badges } from "@/data/mockData";

export default function Profile() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">{studentProfile.name}</h1>
          <p className="text-muted-foreground">Class {studentProfile.class} · {studentProfile.track} Track · <Badge className="bg-primary/10 text-primary border-0">{studentProfile.plan}</Badge></p>
          <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1"><MapPin className="w-3.5 h-3.5" /> {studentProfile.location}</p>
          <div className="mt-3 max-w-xs mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>XP: {studentProfile.xp}/{studentProfile.xpToNext}</span><span>Level {studentProfile.level}</span></div>
            <Progress value={(studentProfile.xp / studentProfile.xpToNext) * 100} className="h-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-4 text-center"><div className="flex items-center justify-center gap-1"><Flame className="w-4 h-4 text-accent" /><p className="font-display font-bold text-xl text-foreground">{studentProfile.streak}</p></div><p className="text-xs text-muted-foreground">Day Streak</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4 text-success" /><p className="font-display font-bold text-xl text-foreground">{studentProfile.topicsDone}</p></div><p className="text-xs text-muted-foreground">Topics Done</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="flex items-center justify-center gap-1"><Zap className="w-4 h-4 text-primary" /><p className="font-display font-bold text-xl text-foreground">{studentProfile.xp.toLocaleString()}</p></div><p className="text-xs text-muted-foreground">XP Total</p></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="flex items-center justify-center gap-1"><Layers className="w-4 h-4 text-accent" /><p className="font-display font-bold text-xl text-foreground">{studentProfile.cardsReviewed}</p></div><p className="text-xs text-muted-foreground">Cards Reviewed</p></CardContent></Card>
        </div>
        <div className="mb-8">
          <h2 className="font-display font-semibold text-foreground mb-3">Badges Earned ({badges.filter(b=>b.earned).length}/{badges.length})</h2>
          <div className="flex flex-wrap gap-3">
            {badges.map((b, i) => (
              <div key={i} className={`w-16 text-center ${!b.earned ? "opacity-30" : ""}`}>
                <div className="w-12 h-12 rounded-xl bg-accent/10 mx-auto flex items-center justify-center text-xs font-display font-bold text-accent">{b.icon}</div>
                <p className="text-[10px] font-medium text-foreground mt-1">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-display font-semibold text-foreground">Settings</h2>
            <div><label className="text-sm font-medium text-foreground block mb-1">Name</label><Input defaultValue={studentProfile.name} /></div>
            <div><label className="text-sm font-medium text-foreground block mb-1">Email</label><Input defaultValue={studentProfile.email} /></div>
            <Button>Save Changes</Button>
            <div className="pt-4 border-t border-border space-y-2">
              <Button variant="outline" className="w-full">Change Password</Button>
              <Button variant="outline" className="w-full">Notification Settings</Button>
              <Button variant="ghost" className="w-full text-destructive">Logout</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
