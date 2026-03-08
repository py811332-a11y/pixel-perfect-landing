import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pricingPlans } from "@/data/mockData";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">SG</div><span className="font-display font-bold text-foreground">ShikshaGuruji</span></Link>
        <div className="ml-auto"><Link to="/login"><Button size="sm">Login</Button></Link></div>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-3xl text-center text-foreground mb-2">Simple, Transparent Pricing</h1>
        <p className="text-center text-muted-foreground mb-8">Start free. Upgrade when you're ready.</p>
        <div className="flex justify-center gap-2 mb-10">
          <button onClick={() => setAnnual(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${!annual ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Monthly</button>
          <button onClick={() => setAnnual(true)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${annual ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Annual <Badge variant="secondary" className="ml-1 text-[10px]">Save 2 months</Badge></button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingPlans.map(plan => (
            <Card key={plan.id} className={`card-hover relative ${plan.popular ? "border-primary shadow-md" : ""}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground">Most Popular</Badge></div>}
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                <div className="mt-2"><span className="font-display text-3xl font-bold text-foreground">₹{annual ? Math.round(plan.price * 10) : plan.price}</span><span className="text-sm text-muted-foreground">/{annual ? "year" : plan.period}</span></div>
                <ul className="mt-4 space-y-2">{plan.features.map((f, i) => (
                  <li key={i} className="text-sm flex items-start gap-2"><span>{f.included ? "✅" : "❌"}</span><span className={f.included ? "text-foreground" : "text-muted-foreground"}>{f.text}</span></li>
                ))}</ul>
                <Link to="/register"><Button variant={plan.popular ? "default" : "outline"} className="w-full mt-4">{plan.cta}</Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">FAQ</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="change"><AccordionTrigger>Can I change plans?</AccordionTrigger><AccordionContent className="text-muted-foreground">Yes, upgrade or downgrade anytime.</AccordionContent></AccordionItem>
            <AccordionItem value="refund"><AccordionTrigger>Refund policy?</AccordionTrigger><AccordionContent className="text-muted-foreground">7-day full refund on all paid plans.</AccordionContent></AccordionItem>
            <AccordionItem value="payment"><AccordionTrigger>Payment methods?</AccordionTrigger><AccordionContent className="text-muted-foreground">UPI, cards, net banking all supported.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
