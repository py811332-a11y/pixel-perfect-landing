import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

export default function GroupTestJoin() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [joined, setJoined] = useState(false);

  const handleInput = (i: number, v: string) => {
    if (v.length > 1) return;
    const newCode = [...code];
    newCode[i] = v.toUpperCase();
    setCode(newCode);
    if (v && i < 5) {
      const next = document.getElementById(`code-${i + 1}`);
      next?.focus();
    }
  };

  if (joined) {
    return (
      <AppLayout>
        <div className="p-6 lg:p-8 max-w-lg mx-auto text-center">
          <h1 className="font-display font-bold text-2xl text-foreground mb-6">Waiting for host to start...</h1>
          <p className="text-muted-foreground mb-6">Science · 10 Questions · 15 Minutes</p>
          <div className="text-left mb-6">
            <h3 className="font-display font-semibold text-foreground mb-3">Participants (4/6):</h3>
            <div className="space-y-2">
              {["Sneha (host)", "Arjun (you)", "Priya", "Dev"].map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm text-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
            <span className="text-sm text-muted-foreground ml-2">Waiting for Sneha to start...</span>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-lg mx-auto text-center">
        <h1 className="font-display font-bold text-2xl text-foreground mb-2">Join a Test</h1>
        <p className="text-muted-foreground mb-8">Enter the 6-character code from your friend</p>
        <div className="flex justify-center gap-3 mb-8">
          {code.map((c, i) => (
            <input
              key={i}
              id={`code-${i}`}
              type="text"
              value={c}
              onChange={e => handleInput(i, e.target.value)}
              className="w-14 h-16 text-center text-2xl font-mono font-bold bg-card border-2 border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
              maxLength={1}
            />
          ))}
        </div>
        <Button className="w-full h-11" onClick={() => setJoined(true)} disabled={code.some(c => !c)}>Join Test →</Button>
      </div>
    </AppLayout>
  );
}
