import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Video, MessageSquare } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const groups = [
  { id: "g1", name: "Science Toppers", members: 6, subject: "Science", lastActive: "2 hours ago", online: 3 },
  { id: "g2", name: "Math Warriors", members: 4, subject: "Math", lastActive: "1 day ago", online: 0 },
  { id: "g3", name: "JEE Prep Squad", members: 8, subject: "All", lastActive: "30 min ago", online: 5 },
];

export default function StudyGroups() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Study Groups</h1>
            <p className="text-sm text-muted-foreground mt-1">Study together, score together</p>
          </div>
          <Button className="gap-2"><Plus className="w-4 h-4" /> Create Group</Button>
        </div>

        <div className="space-y-4">
          {groups.map((g) => (
            <Card key={g.id} className="card-hover">
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-foreground">{g.name}</h3>
                    {g.online > 0 && (
                      <Badge className="bg-success/10 text-success border-0 text-xs">{g.online} online</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{g.members} members · {g.subject} · Last active {g.lastActive}</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/study-groups/${g.id}/session`}>
                    <Button size="sm" className="gap-1"><Video className="w-4 h-4" /> Join Session</Button>
                  </Link>
                  <Button size="sm" variant="outline" className="gap-1"><MessageSquare className="w-4 h-4" /> Chat</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6 text-center">
            <h3 className="font-display font-bold text-lg text-foreground">Join a friend's group</h3>
            <p className="text-sm text-muted-foreground mt-1">Ask your friend for the invite code and join their study group</p>
            <Button variant="outline" className="mt-4">Enter Invite Code</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
