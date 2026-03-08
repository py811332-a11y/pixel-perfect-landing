import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Share2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function GroupTestCreate() {
  const [step, setStep] = useState<"config" | "share">("config");
  const [subject, setSubject] = useState("Science");
  const [questions, setQuestions] = useState(20);
  const [time, setTime] = useState(15);
  const code = "ABC123";

  if (step === "share") {
    return (
      <AppLayout>
        <div className="p-6 lg:p-8 max-w-lg mx-auto text-center">
          <h1 className="font-display font-bold text-2xl text-foreground mb-8">Your test is ready!</h1>
          <Card className="mb-6">
            <CardContent className="p-8">
              <p className="text-sm text-muted-foreground mb-4">Share this code with friends:</p>
              <p className="font-mono font-bold text-5xl text-primary tracking-[0.3em]">{code}</p>
              <div className="flex gap-3 justify-center mt-6">
                <Button variant="outline" className="gap-2"><Copy className="w-4 h-4" /> Copy Code</Button>
                <Button className="gap-2 bg-success hover:bg-success/90 text-success-foreground"><Share2 className="w-4 h-4" /> Share on WhatsApp</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">Code expires in 29:45</p>
            </CardContent>
          </Card>
          <div className="text-left">
            <h3 className="font-display font-semibold text-foreground mb-3">Waiting for friends (1/6):</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success" /><span className="text-sm text-foreground">Arjun (you)</span><span className="text-xs text-muted-foreground ml-auto">host</span></div>
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-border" /><span className="text-sm text-muted-foreground">Waiting...</span></div>
              ))}
            </div>
          </div>
          <Link to={`/group-test/${code}/test`}>
            <Button className="mt-6 w-full" disabled>Start Test (need 2+ players)</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-lg mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-8">Create a Group Test</h1>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Subject</label>
            <div className="flex flex-wrap gap-2">
              {["Science", "Math", "Social", "English", "Hindi"].map(s => (
                <button key={s} onClick={() => setSubject(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${subject === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Questions</label>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map(n => (
                <button key={n} onClick={() => setQuestions(n)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${questions === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Time Limit</label>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map(n => (
                <button key={n} onClick={() => setTime(n)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${time === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{n} min</button>
              ))}
            </div>
          </div>
          <Button className="w-full h-11" onClick={() => setStep("share")}>Create Test →</Button>
        </div>
      </div>
    </AppLayout>
  );
}
