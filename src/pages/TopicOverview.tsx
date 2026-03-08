import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, FileText, Layers, BookOpen } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function TopicOverview() {
  const { topicId } = useParams();

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Link to="/chapters/ch1" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Chapter 1 › Topic 2
        </Link>

        <h1 className="font-display font-bold text-2xl text-foreground">States of Matter</h1>
        <p className="text-sm text-muted-foreground mt-1">Science · Class 9 · Chapter 1</p>
        <div className="flex items-center gap-3 mt-3">
          <Progress value={75} className="w-40 h-2" />
          <span className="text-sm font-semibold text-foreground">75% Mastered</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Link to={`/topics/${topicId}/lesson`}>
            <Card className="card-hover h-full">
              <CardContent className="p-6">
                <Play className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground">Watch AI Lecture</h3>
                <p className="text-sm text-muted-foreground mt-1">~12 minutes</p>
                <Button className="mt-4 gap-2">Start Lesson <Play className="w-3 h-3" /></Button>
              </CardContent>
            </Card>
          </Link>
          <Link to={`/topics/${topicId}/test`}>
            <Card className="card-hover h-full">
              <CardContent className="p-6">
                <FileText className="w-8 h-8 text-success mb-3" />
                <h3 className="font-display font-semibold text-foreground">Topic Test</h3>
                <p className="text-sm text-muted-foreground mt-1">10 questions</p>
                <Button variant="outline" className="mt-4">Take Test</Button>
              </CardContent>
            </Card>
          </Link>
          <Link to="/flashcards/fd1">
            <Card className="card-hover h-full">
              <CardContent className="p-6">
                <Layers className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-display font-semibold text-foreground">Flashcards</h3>
                <p className="text-sm text-muted-foreground mt-1">23 cards due today</p>
                <Button variant="outline" className="mt-4">Review Now</Button>
              </CardContent>
            </Card>
          </Link>
          <Link to="/books/9/science">
            <Card className="card-hover h-full">
              <CardContent className="p-6">
                <BookOpen className="w-8 h-8 text-primary-light mb-3" />
                <h3 className="font-display font-semibold text-foreground">NCERT Textbook</h3>
                <p className="text-sm text-muted-foreground mt-1">Page 4–18</p>
                <Button variant="outline" className="mt-4">Open Book</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="font-display font-semibold text-foreground mb-2">Key Formulas</h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground space-y-1">
              <p>PV = nRT</p>
              <p>Boyle's Law: P₁V₁ = P₂V₂</p>
            </div>
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground mb-2">Key Terms</h2>
            <div className="flex flex-wrap gap-2">
              {["Evaporation", "Condensation", "Sublimation", "Diffusion"].map(t => (
                <span key={t} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground mb-2">Common Mistakes to Avoid</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Don't confuse evaporation with boiling</p>
              <p className="text-sm text-muted-foreground">Brownian motion proves particles exist, not that liquids expand</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
