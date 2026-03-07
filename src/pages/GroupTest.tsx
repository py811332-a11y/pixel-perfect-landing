import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { groupTestHistory } from "@/data/mockData";

export default function GroupTest() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground">Group Test</h1>
        <p className="text-muted-foreground mt-1">Challenge your classmates. See who's the real topper.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link to="/group-test/create">
            <Card className="card-hover h-full">
              <CardContent className="p-8 text-center">
                <span className="text-4xl block mb-3">🎯</span>
                <h3 className="font-display font-bold text-lg text-foreground">Create a Test</h3>
                <p className="text-sm text-muted-foreground mt-2">Set questions, invite friends, start the battle</p>
                <Button className="mt-4 gap-2">Create Test <ArrowRight className="w-4 h-4" /></Button>
              </CardContent>
            </Card>
          </Link>
          <Link to="/group-test/join">
            <Card className="card-hover h-full">
              <CardContent className="p-8 text-center">
                <span className="text-4xl block mb-3">🔑</span>
                <h3 className="font-display font-bold text-lg text-foreground">Join a Test</h3>
                <p className="text-sm text-muted-foreground mt-2">Have a code from a friend? Join here</p>
                <Button variant="outline" className="mt-4 gap-2">Join with Code <ArrowRight className="w-4 h-4" /></Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <h2 className="font-display font-semibold text-lg text-foreground mt-10 mb-4">Past Tests</h2>
        {groupTestHistory.map((test, i) => (
          <Link key={i} to={`/group-test/${test.code}/results`}>
            <Card className="card-hover">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{test.subject} · {test.chapter} · {test.questions} questions · {test.timeLimit} min</p>
                  <p className="text-xs text-muted-foreground mt-1">{test.date}</p>
                </div>
                <Badge variant="secondary">🥇 {test.rank}st / {test.total}</Badge>
                <span className="text-sm font-semibold text-primary">{test.score}%</span>
                <span className="font-mono text-xs text-muted-foreground">{test.code}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
