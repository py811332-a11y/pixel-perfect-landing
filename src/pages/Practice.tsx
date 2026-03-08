import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { diagnosticQuestions } from "@/data/mockData";

export default function Practice() {
  const [mode, setMode] = useState("weak");
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [qIndex, setQIndex] = useState(0);

  const q = diagnosticQuestions[qIndex % diagnosticQuestions.length];
  const modes = [
    { id: "weak", label: "Weak Focus" },
    { id: "chapter", label: "Chapter Drill" },
    { id: "mixed", label: "Mixed" },
    { id: "jee", label: "JEE Simulation" },
  ];

  const handleSubmit = () => {
    if (selected === null) return;
    if (selected === q.correct) {
      setCorrect(correct + 1);
      setStreak(streak + 1);
    } else {
      setWrong(wrong + 1);
      setStreak(0);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    setSelected(null);
    setSubmitted(false);
    setQIndex(qIndex + 1);
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Problem Practice</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {modes.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                mode === m.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}>
              {m.label}
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Question {qIndex + 1}</span>
              <Badge variant="secondary">{q.subject} · Medium</Badge>
            </div>
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => !submitted && setSelected(i)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    submitted && i === q.correct ? "border-success bg-success/5" :
                    submitted && i === selected && i !== q.correct ? "border-destructive bg-destructive/5" :
                    selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}>
                  <span className="font-semibold text-sm mr-3">{String.fromCharCode(65 + i)})</span>
                  <span className="text-foreground">{opt}</span>
                </button>
              ))}
            </div>
            {!submitted ? (
              <Button className="w-full h-11 mt-6" onClick={handleSubmit} disabled={selected === null}>Submit Answer</Button>
            ) : (
              <Button className="w-full h-11 mt-6 gap-2" onClick={handleNext}>Next Question <ArrowRight className="w-4 h-4" /></Button>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
          <span>Correct: <strong className="text-success">{correct}</strong></span>
          <span>Wrong: <strong className="text-destructive">{wrong}</strong></span>
          <span>Streak: <strong className="text-accent">{streak} 🔥</strong></span>
        </div>
      </div>
    </AppLayout>
  );
}
