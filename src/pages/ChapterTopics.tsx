import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { chapterTopics } from "@/data/mockData";

export default function ChapterTopics() {
  const mastered = chapterTopics.filter(t => t.status === "mastered").length;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Link to="/subjects/science" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Chapter 1: Matter in Our Surroundings
        </Link>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Matter in Our Surroundings</h1>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={(mastered / chapterTopics.length) * 100} className="h-2 w-32" />
              <span className="text-sm text-muted-foreground">{mastered} of {chapterTopics.length} topics mastered</span>
            </div>
          </div>
          <Link to="/books/9/science">
            <Button variant="outline" size="sm">Open NCERT Book</Button>
          </Link>
        </div>
        <div className="space-y-3">
          {chapterTopics.map((topic) => (
            <Link key={topic.id} to={`/topics/${topic.id}`}>
              <Card className="card-hover">
                <CardContent className="p-4 flex items-center gap-4">
                  <span className="text-sm font-mono text-muted-foreground w-6">{topic.number}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{topic.name}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {topic.status === "mastered" ? "⭐ Mastered" : topic.status === "in-progress" ? "✅ In Progress" : topic.status === "not-started" ? "○ Not started" : "🔒 Locked"}
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
