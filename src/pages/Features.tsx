import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Features() {
  const comparison = [
    { feature: "AI Personalized Lectures", sg: true, pw: false, bj: false, un: false },
    { feature: "Group Test with Friends", sg: true, pw: false, bj: false, un: false },
    { feature: "FSRS Flashcards", sg: true, pw: false, bj: false, un: false },
    { feature: "Local AI (Data in India)", sg: true, pw: false, bj: false, un: false },
    { feature: "Free Forever Plan", sg: true, pw: true, bj: false, un: false },
    { feature: "NCERT Flipbook", sg: true, pw: false, bj: false, un: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-2"><img src={logo} alt="ShikshaGuruji" className="w-8 h-8 rounded-lg object-contain" /><span className="font-display font-bold text-foreground">ShikshaGuruji</span></Link>
        <div className="ml-auto flex gap-4 items-center">
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link to="/login"><Button size="sm">Login</Button></Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {[
          { title: "AI Whiteboard Lectures", desc: "Lectures that know your weaknesses", points: ["Personalized per student", "Bilingual EN/Hindi", "Pauses for doubts", "Adjusts difficulty"], reverse: false },
          { title: "Group Test Challenge", desc: "Study alone is boring. Challenge your friends.", points: ["Create test in 30 seconds", "Share 6-digit code", "Real-time leaderboard"], reverse: true },
          { title: "FSRS Smart Flashcards", desc: "Review cards just before you forget them", points: ["Spaced repetition algorithm", "Optimal review scheduling", "Track mastery per topic"], reverse: false },
          { title: "NCERT Flipbook", desc: "Your textbook. Right here. Page-turn and everything.", points: ["All NCERT books Class 6-10", "Linked to lessons and tests", "Bookmark and highlight"], reverse: true },
          { title: "Progress Analytics", desc: "Radar chart, error patterns, AI study tips", points: ["5-subject radar chart", "Weekly improvement tracking", "AI-powered study recommendations"], reverse: false },
        ].map((f, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${f.reverse ? "direction-rtl" : ""}`}>
            <div className={f.reverse ? "md:order-2" : ""}>
              <h2 className="font-display font-bold text-2xl text-foreground mb-3">{f.title}</h2>
              <p className="text-muted-foreground mb-4">{f.desc}</p>
              <ul className="space-y-2">{f.points.map((p, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-foreground"><CheckCircle className="w-4 h-4 text-success" />{p}</li>
              ))}</ul>
            </div>
            <div className={`bg-muted rounded-xl p-12 flex items-center justify-center ${f.reverse ? "md:order-1" : ""}`}>
              <span className="font-display font-bold text-4xl text-primary">{f.title.split(" ")[0]}</span>
            </div>
          </div>
        ))}

        <div>
          <h2 className="font-display font-bold text-2xl text-foreground text-center mb-8">How We Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-display font-semibold text-foreground">Feature</th>
                <th className="py-3 px-4 font-display font-semibold text-primary">ShikshaGuruji</th>
                <th className="py-3 px-4 font-display font-semibold text-muted-foreground">Physics Wallah</th>
                <th className="py-3 px-4 font-display font-semibold text-muted-foreground">Byju's</th>
                <th className="py-3 px-4 font-display font-semibold text-muted-foreground">Unacademy</th>
              </tr></thead>
              <tbody>{comparison.map((r, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-3 px-4 text-foreground">{r.feature}</td>
                  <td className="py-3 px-4 text-center">{r.sg ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-destructive mx-auto" />}</td>
                  <td className="py-3 px-4 text-center">{r.pw ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-destructive mx-auto" />}</td>
                  <td className="py-3 px-4 text-center">{r.bj ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-destructive mx-auto" />}</td>
                  <td className="py-3 px-4 text-center">{r.un ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-destructive mx-auto" />}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>

        <div className="text-center py-12">
          <Link to="/register"><Button size="lg" className="gap-2 h-12 px-8">Start Free <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </div>
    </div>
  );
}
