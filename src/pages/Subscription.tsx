import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppLayout from "@/components/layout/AppLayout";
import { pricingPlans } from "@/data/mockData";

export default function Subscription() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-2xl text-foreground mb-2">Your Plan: <Badge className="bg-muted text-foreground">FREE</Badge></h1>
        <p className="text-muted-foreground mb-8">Upgrade to unlock AI lectures, flashcards, and more</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {pricingPlans.map(plan => (
            <Card key={plan.id} className={`card-hover relative ${plan.popular ? "border-primary shadow-md" : ""}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground">Most Popular</Badge></div>}
              <CardContent className="p-5">
                <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                <div className="mt-1"><span className="font-display text-2xl font-bold text-foreground">₹{plan.price}</span><span className="text-sm text-muted-foreground">/{plan.period}</span></div>
                <ul className="mt-3 space-y-1.5">{plan.features.map((f, i) => (
                  <li key={i} className="text-xs flex items-start gap-1.5"><span>{f.included ? "✅" : "❌"}</span><span className={f.included ? "text-foreground" : "text-muted-foreground"}>{f.text}</span></li>
                ))}</ul>
                <Button variant={plan.popular ? "default" : "outline"} size="sm" className="w-full mt-4">{plan.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="cancel"><AccordionTrigger className="text-sm">Can I cancel anytime?</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground">Yes, cancel anytime from settings. No questions asked.</AccordionContent></AccordionItem>
          <AccordionItem value="refund"><AccordionTrigger className="text-sm">Refund policy?</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground">7-day refund policy on all paid plans.</AccordionContent></AccordionItem>
          <AccordionItem value="payment"><AccordionTrigger className="text-sm">Payment methods?</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground">UPI, credit/debit cards, net banking supported.</AccordionContent></AccordionItem>
        </Accordion>
      </div>
    </AppLayout>
  );
}
