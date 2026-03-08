import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { flashcardDecks } from "@/data/mockData";

export default function Flashcards() {
  const [filter, setFilter] = useState("All");
  const totalDue = flashcardDecks.reduce((sum, d) => sum + d.due, 0);
  const filters = ["All", "Science", "Math", "Social", "English", "Hindi"];

  const filtered = filter === "All" ? flashcardDecks : flashcardDecks.filter(d => d.subject === filter);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-4">Flashcard Decks</h1>

        {totalDue > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Today's Review: {totalDue} cards due</span>
            <Link to={`/flashcards/${flashcardDecks.find(d => d.due > 0)?.id}`}>
              <Button size="sm">Review Now</Button>
            </Link>
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(deck => (
            <Link key={deck.id} to={`/flashcards/${deck.id}`}>
              <Card className="card-hover h-full">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground">{deck.name}</h3>
                  <p className="text-sm text-muted-foreground">{deck.subject} · {deck.chapter}</p>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="text-foreground">{deck.cards} cards</p>
                    <p className={deck.due > 0 ? "text-destructive font-medium" : "text-success"}>
                      {deck.due > 0 ? `${deck.due} due today 🔴` : "0 due ✅"}
                    </p>
                    <p className="text-muted-foreground">Mastery: {deck.mastery}%</p>
                  </div>
                  <Button variant={deck.due > 0 ? "default" : "outline"} size="sm" className="mt-4 w-full">
                    {deck.due > 0 ? "Review Now" : "Browse"}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
