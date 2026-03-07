import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { scienceChapters } from "@/data/mockData";

export default function SubjectChapters() {
  const { subjectId } = useParams();
  const subjectName = subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : "Subject";
  const started = scienceChapters.filter(c => c.progress > 0).length;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Link to="/subjects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {subjectName}
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl text-foreground">{subjectName}</h1>
          <span className="text-sm text-muted-foreground">Class 9</span>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
            <span>Overall Progress</span>
            <span>{started}/{scienceChapters.length} chapters started</span>
          </div>
          <Progress value={(started / scienceChapters.length) * 100} className="h-2" />
        </div>
        <div className="space-y-3">
          {scienceChapters.map((ch) => (
            <Link key={ch.id} to={`/chapters/${ch.id}`}>
              <Card className="card-hover">
                <CardContent className="p-4 flex items-center gap-4">
                  <span className="text-sm font-mono text-muted-foreground w-6">Ch.{ch.number}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{ch.name}</p>
                    <Progress value={ch.progress} className="h-1 mt-1.5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{ch.topics} topics</span>
                  <Badge variant="secondary" className="text-xs">
                    {ch.status === "mastered" ? "⭐ Mastered" : ch.status === "in-progress" ? "✅ In Progress" : "🔒 Locked"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
