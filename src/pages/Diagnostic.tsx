import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { diagnosticQuestions, subjects } from "@/data/mockData";

type Phase = "intro" | "test" | "results";

export default function Diagnostic() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = diagnosticQuestions;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setPhase("results");
    }
  };

  const radarData = subjects.map(s => ({ subject: s.name.split(" ")[0], score: s.progress, fullMark: 100 }));

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 animate-fade-up">
          <div className="text-6xl">🧪</div>
          <h1 className="font-display font-bold text-3xl text-foreground">Let's find your strengths</h1>
          <p className="text-muted-foreground">{questions.length} questions across 5 subjects. No timer. Be honest!</p>
          <p className="text-sm text-muted-foreground">This helps us personalize your lessons</p>
          <Button size="lg" className="gap-2 h-12 px-8" onClick={() => setPhase("test")}>
            Start Diagnostic <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "test") {
    const q = questions[current];
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="p-6 border-b border-border">
          <Progress value={((current + 1) / questions.length) * 100} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">Question {current + 1} of {questions.length}</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-xl w-full space-y-6 animate-fade-up">
            <p className="text-sm text-primary font-medium">{q.subject} — {q.chapter}</p>
            <h2 className="font-display font-semibold text-xl text-foreground">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selected === i ? "border-primary bg-primary/5 text-foreground" : "border-border hover:border-primary/30 text-foreground"
                  }`}
                >
                  <span className="font-semibold text-sm mr-3">{String.fromCharCode(65 + i)})</span>
                  {opt}
                </button>
              ))}
            </div>
            <Button className="w-full h-11 gap-2" onClick={handleNext} disabled={selected === null}>
              {current < questions.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-6 animate-fade-up">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl text-foreground">Here's what we found about you! 🎉</h1>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {subjects.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-20 text-sm font-medium text-foreground">{s.name.split(" ")[0]}</span>
              <Progress value={s.progress} className="flex-1 h-2" />
              <span className="text-sm font-semibold text-foreground w-10 text-right">{s.progress}%</span>
              <span className="text-xs">
                {s.progress >= 70 ? "💪" : s.progress >= 50 ? "👍" : "⚠️"}
              </span>
            </div>
          ))}
        </div>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-sm text-foreground">
            We recommend starting with: <strong>Social Studies — Chapter 2</strong>
          </CardContent>
        </Card>
        <Link to="/dashboard">
          <Button className="w-full h-11 gap-2">Go to My Dashboard <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
