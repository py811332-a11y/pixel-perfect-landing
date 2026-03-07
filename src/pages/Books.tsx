import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ncertBooks } from "@/data/mockData";

export default function Books() {
  const classes = [6, 7, 8, 9, 10];
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">NCERT Textbooks</h1>
        <div className="flex gap-2 mb-6">
          {classes.map(c => (
            <button key={c} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${c === 9 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {ncertBooks.map(book => (
            <Link key={book.id} to={`/books/${book.class}/${book.subject.toLowerCase().replace(" ", "-")}`}>
              <Card className="card-hover h-full">
                <CardContent className="p-6 text-center">
                  <span className="text-5xl block mb-3">{book.icon}</span>
                  <h3 className="font-display font-semibold text-foreground">{book.subject}</h3>
                  <p className="text-sm text-muted-foreground">Class {book.class}</p>
                  <p className="text-xs text-muted-foreground mt-1">{book.chapters} chapters</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">Read →</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
