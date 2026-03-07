import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AppLayout from "@/components/layout/AppLayout";
import { subjects } from "@/data/mockData";

export default function Subjects() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">What do you want to study today?</h1>
            <p className="text-muted-foreground mt-1">Class 9 · CBSE Track</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {subjects.map((s, i) => (
            <Link key={s.id} to={`/subjects/${s.id}`}>
              <Card className={`card-hover h-full animate-fade-up stagger-${i + 1}`}>
                <CardContent className="p-6 text-center">
                  <span className="text-4xl block mb-3">{s.icon}</span>
                  <h3 className="font-display font-semibold text-foreground">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.chapters} chapters</p>
                  <Progress value={s.progress} className="h-1.5 mt-3" />
                  <p className="text-xs text-muted-foreground mt-1">{s.progress}%</p>
                  <p className="text-sm text-primary font-medium mt-3">
                    {s.progress > 0 ? "Continue →" : "Start →"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
