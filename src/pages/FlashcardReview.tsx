import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { sampleFlashcards } from "@/data/mockData";

export default function FlashcardReview() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState({ again: 0, hard: 0, good: 0, easy: 0 });

  const card = sampleFlashcards[index];

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    setResults({ ...results, [rating]: results[rating] + 1 });
    setFlipped(false);
    if (index < sampleFlashcards.length - 1) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-up">
          <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-success" /></div>
          <h1 className="font-display font-bold text-2xl text-foreground">Session Complete!</h1>
          <p className="text-muted-foreground">{sampleFlashcards.length} cards reviewed</p>
          <div className="flex justify-center gap-6 text-sm">
            <span className="text-destructive">Again: {results.again}</span>
            <span className="text-accent">Hard: {results.hard}</span>
            <span className="text-primary">Good: {results.good}</span>
            <span className="text-success">Easy: {results.easy}</span>
          </div>
          <p className="text-sm text-muted-foreground">Next review: Tomorrow at 8:00 AM</p>
          <p className="text-sm font-semibold text-success">+15 XP earned!</p>
          <Link to="/flashcards"><Button>Back to Decks</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-14 border-b border-border flex items-center px-4">
        <Link to="/flashcards" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="ml-4 text-sm text-muted-foreground">Card {index + 1} of {sampleFlashcards.length}</span>
      </div>

      <div className="p-4">
        <Progress value={((index + 1) / sampleFlashcards.length) * 100} className="h-1.5" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className="w-full max-w-xl min-h-[300px] bg-card border border-border rounded-xl p-8 cursor-pointer flex flex-col items-center justify-center text-center card-hover shadow-md"
          onClick={() => setFlipped(!flipped)}
        >
          {!flipped ? (
            <div className="space-y-4 animate-fade-up">
              <p className="font-display font-semibold text-xl text-foreground">{card.front}</p>
              <p className="text-sm text-muted-foreground">Tap to reveal answer ↑</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-up">
              <p className="text-foreground whitespace-pre-line">{card.back}</p>
            </div>
          )}
        </div>
      </div>

      {flipped && (
        <div className="border-t border-border p-6 animate-fade-up">
          <p className="text-center text-sm text-muted-foreground mb-4">How well did you know this?</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10" onClick={() => handleRate("again")}>Again</Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10" onClick={() => handleRate("hard")}>Hard</Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" onClick={() => handleRate("good")}>Good</Button>
            <Button variant="outline" className="border-success text-success hover:bg-success/10" onClick={() => handleRate("easy")}>Easy</Button>
          </div>
        </div>
      )}
    </div>
  );
}
