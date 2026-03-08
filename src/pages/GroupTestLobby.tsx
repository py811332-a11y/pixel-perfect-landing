import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Users } from "lucide-react";
import { useState } from "react";

const participants = [
  { name: "Sneha", isHost: true, ready: true },
  { name: "Arjun (You)", isHost: false, ready: true },
  { name: "Priya", isHost: false, ready: true },
  { name: "Dev", isHost: false, ready: false },
];

export default function GroupTestLobby() {
  const { code } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code || "ABC123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <Link to="/group-test" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Group Test
        </Link>

        <div className="text-center">
          <h1 className="font-display font-bold text-2xl text-foreground">Waiting Room</h1>
          <p className="text-sm text-muted-foreground mt-1">Science · 10 Questions · 15 Minutes</p>
        </div>

        <Card className="border-2 border-dashed border-primary/30">
          <CardContent className="p-6 text-center">
            <p className="text-xs text-muted-foreground mb-2">Share this code with friends</p>
            <p className="font-mono font-bold text-4xl tracking-[0.3em] text-primary">{code?.toUpperCase() || "ABC123"}</p>
            <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={handleCopy}>
              <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy Code"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Participants ({participants.length}/6)</h3>
            </div>
            <div className="space-y-3">
              {participants.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${p.ready ? "bg-success" : "bg-muted-foreground animate-pulse"}`} />
                  <span className="text-sm text-foreground flex-1">{p.name}</span>
                  {p.isHost && <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-0">Host</Badge>}
                  <span className="text-xs text-muted-foreground">{p.ready ? "Ready" : "Joining..."}</span>
                </div>
              ))}
              {Array.from({ length: 6 - participants.length }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 opacity-40">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Waiting...</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3 animate-pulse">Waiting for Sneha to start the test...</p>
          <Link to={`/group-test/${code}/test`}>
            <Button className="w-full" disabled>Start Test</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
