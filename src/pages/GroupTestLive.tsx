import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { diagnosticQuestions } from "@/data/mockData";

export default function GroupTestLive() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft] = useState("08:34");
  const q = diagnosticQuestions[current % diagnosticQuestions.length];
  const total = 10;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Science Group Test</span>
        <span className="font-mono font-bold text-lg text-destructive">{timeLeft}</span>
      </div>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-2">
          {Array(total).fill(0).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i <= current ? "bg-primary" : "bg-border"}`} />
          ))}
          <span className="text-sm text-muted-foreground ml-2">Question {current + 1} of {total}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-xl w-full space-y-6">
          <h2 className="font-display font-semibold text-xl text-foreground">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                <span className="font-semibold text-sm mr-3">{String.fromCharCode(65 + i)})</span>
                <span className="text-foreground">{opt}</span>
              </button>
            ))}
          </div>
          <Button className="w-full h-11" disabled={selected === null} onClick={() => {
            setSelected(null);
            if (current < total - 1) setCurrent(current + 1);
          }}>Submit Answer</Button>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-sm text-muted-foreground text-center">
          👥 ✓ Sneha submitted · ✓ Dev submitted · ⌛ Priya... · ⌛ Ananya...
        </p>
      </div>
    </div>
  );
}
