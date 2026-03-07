import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppLayout from "@/components/layout/AppLayout";
import { groupTestResults } from "@/data/mockData";

export default function GroupTestResults() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Science Battle — Results 🏆</h1>

        <div className="space-y-3 mb-8">
          {groupTestResults.map((r) => (
            <Card key={r.rank} className={r.isYou ? "border-primary" : ""}>
              <CardContent className="p-4 flex items-center gap-4">
                <span className="text-2xl w-8 text-center">{r.badge || r.rank}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{r.name} {r.isYou && <Badge className="ml-1 text-xs">You</Badge>}</p>
                  <p className="text-xs text-muted-foreground">{r.correct}/{r.total} · {r.time}</p>
                </div>
                <span className="font-display font-bold text-lg text-primary">{r.score}%</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="analysis">
            <AccordionTrigger className="font-display font-semibold text-foreground">Question Analysis</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><span className="text-sm text-foreground">Q1: 5/6 correct</span><div className="flex-1 bg-muted rounded-full h-2"><div className="bg-success h-2 rounded-full" style={{ width: "83%" }} /></div></div>
                <div className="flex items-center gap-2"><span className="text-sm text-foreground">Q3: 2/6 correct</span><div className="flex-1 bg-muted rounded-full h-2"><div className="bg-destructive h-2 rounded-full" style={{ width: "33%" }} /></div></div>
                <div className="flex items-center gap-2"><span className="text-sm text-foreground">Q8: 1/6 correct</span><div className="flex-1 bg-muted rounded-full h-2"><div className="bg-destructive h-2 rounded-full" style={{ width: "17%" }} /></div></div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-foreground mb-2">🤖 AI Group Insight</p>
            <p className="text-sm text-muted-foreground">Most of you struggled with Newton's 3rd Law (only 2/6 correct). Sneha — you could help Dev with this! Next, try studying 'Laws of Motion' together as a group.</p>
          </CardContent>
        </Card>

        <div className="flex gap-3 mt-6">
          <Link to="/group-test/create"><Button variant="outline">🔄 Play Again</Button></Link>
          <Button variant="outline">📤 Share Result</Button>
          <Link to="/subjects/science"><Button>📚 Study This Topic</Button></Link>
        </div>
      </div>
    </AppLayout>
  );
}
