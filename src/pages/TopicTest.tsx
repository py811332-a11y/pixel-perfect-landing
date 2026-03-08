import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { topicTestQuestions } from "@/data/mockData";

type Phase = "test" | "feedback" | "results";

export default function TopicTest() {
  const [phase, setPhase] = useState<Phase>("test");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrongQs, setWrongQs] = useState<number[]>([]);

  const q = topicTestQuestions[current];
  const total = topicTestQuestions.length;

  const handleSubmit = () => {
    if (selected === null) return;
    if (selected === q.correct) {
      setScore(score + 1);
    } else {
      setWrongQs([...wrongQs, current + 1]);
    }
    setPhase("feedback");
  };

  const handleNext = () => {
    setSelected(null);
    if (current < total - 1) {
      setCurrent(current + 1);
      setPhase("test");
    } else {
      setPhase("results");
    }
  };

  if (phase === "results") {
    const passed = score / total >= 0.5;
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-up">
          <div className="text-6xl">{passed ? <CheckCircle className="w-16 h-16 text-success" /> : <TrendingUp className="w-16 h-16 text-primary" />}</div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            {passed ? "Topic Mastered!" : "Almost there!"}
          </h1>
          <p className="text-lg text-foreground">You scored <strong>{score}/{total}</strong> — {Math.round((score / total) * 100)}%</p>
          {passed && (
            <div className="flex gap-3 justify-center">
              <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-semibold">+30 XP</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">+1 Streak</span>
            </div>
          )}
          {wrongQs.length > 0 && (
            <div className="text-left bg-muted rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">Questions you got wrong:</p>
              {wrongQs.map(n => (
                <p key={n} className="text-sm text-muted-foreground">• Q{n}: {topicTestQuestions[n - 1]?.question.slice(0, 50)}...</p>
              ))}
            </div>
          )}
          <div className="flex gap-3 justify-center">
            {passed ? (
              <Link to="/chapters/ch1"><Button className="gap-2">Continue to Next Topic <ArrowRight className="w-4 h-4" /></Button></Link>
            ) : (
              <Link to="/topics/t1/lesson"><Button>Watch Lesson Again</Button></Link>
            )}
            <Button variant="outline" onClick={() => { setCurrent(0); setScore(0); setWrongQs([]); setPhase("test"); setSelected(null); }}>
              {passed ? "Review Wrong Answers" : "Try New Questions"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 border-b border-border">
        <p className="text-sm text-muted-foreground mb-2">States of Matter — Topic Test</p>
        <div className="flex items-center gap-2">
          {Array(total).fill(0).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < current ? "bg-primary" : i === current ? "bg-primary animate-pulse" : "bg-border"}`} />
          ))}
          <span className="text-sm text-muted-foreground ml-2">Question {current + 1} of {total}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-xl w-full space-y-6">
          {phase === "test" && (
            <div className="animate-fade-up">
              <h2 className="font-display font-semibold text-xl text-foreground mb-6">{q.question}</h2>
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="font-semibold text-sm mr-3">{String.fromCharCode(65 + i)})</span>
                    <span className="text-foreground">{opt}</span>
                  </button>
                ))}
              </div>
              <Button className="w-full h-11 mt-6" onClick={handleSubmit} disabled={selected === null}>Submit Answer</Button>
            </div>
          )}

          {phase === "feedback" && (
            <div className="animate-fade-up space-y-4">
              {selected === q.correct ? (
                <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-success animate-scale-check" />
                  <p className="font-semibold text-success">Correct!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-lg">
                    <XCircle className="w-6 h-6 text-destructive" />
                    <p className="font-semibold text-destructive">Incorrect</p>
                  </div>
                  <p className="text-sm text-muted-foreground">You chose: {String.fromCharCode(65 + (selected ?? 0))}) {q.options[selected ?? 0]}</p>
                  <p className="text-sm text-foreground">Correct: {String.fromCharCode(65 + q.correct)}) {q.options[q.correct]}</p>
                </div>
              )}
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{q.explanation}</p>
              <Button className="w-full h-11 gap-2" onClick={handleNext}>
                {current < total - 1 ? "Next Question" : "See Results"} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
