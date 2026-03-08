import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Pause, Play, Bookmark, FileText, CheckCircle } from "lucide-react";
import { whiteboardSteps } from "@/data/mockData";

export default function LessonPlayer() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [done, setDone] = useState(false);
  const current = whiteboardSteps[step];

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-6 animate-fade-up">
          <div className="text-6xl animate-scale-check"><CheckCircle className="w-16 h-16 text-success" /></div>
          <h1 className="font-display font-bold text-2xl text-foreground">Great job! You finished the lecture</h1>
          <p className="text-muted-foreground">Ready to test what you learned?</p>
          <div className="flex gap-4 justify-center">
            <Link to="/topics/t1/test"><Button className="gap-2">Take Topic Test <ArrowRight className="w-4 h-4" /></Button></Link>
            <Button variant="outline" onClick={() => { setStep(0); setDone(false); }}>Review Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4">
        <Link to="/topics/t1" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <p className="text-sm text-muted-foreground">Science › Ch.1 › States of Matter</p>
        <Button variant="ghost" size="sm" onClick={() => setShowNotes(!showNotes)} className="gap-1">
          <FileText className="w-4 h-4" /> Notes
        </Button>
      </div>

      <div className="flex-1 flex relative">
        {/* Whiteboard */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-card border border-border rounded-xl p-8 shadow-sm min-h-[400px]"
            style={{ backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
            {current.title && (
              <h2 className="font-display font-bold text-xl text-foreground mb-4 border-b border-border pb-2">
                {current.title}
              </h2>
            )}
            <pre className="font-sans text-foreground whitespace-pre-wrap leading-relaxed animate-fade-up">
              {current.content}
            </pre>
          </div>
        </div>

        {/* Notes panel */}
        {showNotes && (
          <div className="w-80 border-l border-border bg-card p-4 animate-fade-up">
            <h3 className="font-display font-semibold text-foreground mb-3">My Notes</h3>
            <textarea
              className="w-full h-64 bg-muted rounded-lg p-3 text-sm text-foreground resize-none border-0 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Type your notes here... Auto-saves every 5 sec"
            />
            <Button variant="outline" size="sm" className="mt-2 w-full">Export as PDF</Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-muted-foreground">Step {step + 1} of {whiteboardSteps.length}</span>
            <Progress value={((step + 1) / whiteboardSteps.length) * 100} className="flex-1 h-1.5" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>◀◀ Prev</Button>
              <Button variant="outline" size="sm" onClick={() => setPaused(!paused)}>
                {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                if (step < whiteboardSteps.length - 1) setStep(step + 1);
                else setDone(true);
              }}>Next ▶▶</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm"><Bookmark className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
