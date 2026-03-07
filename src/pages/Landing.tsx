import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Play, BookOpen, Users, Brain, Sparkles, BarChart3, Trophy, ChevronRight, Star, Zap } from "lucide-react";
import { subjects, testimonials, pricingPlans, faqItems } from "@/data/mockData";

function HeroParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${6 + Math.random() * 8}s`,
    delay: `${Math.random() * 5}s`,
    tx: `${(Math.random() - 0.5) * 200}px`,
    ty: `${(Math.random() - 0.5) * 200}px`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            "--duration": p.duration,
            "--delay": p.delay,
            "--tx": p.tx,
            "--ty": p.ty,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-display font-bold text-white text-lg">ShikshaGuruji</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/features" className="text-sm text-white/70 hover:text-white transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</Link>
          <Link to="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Free</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0A0F1E] flex items-center overflow-hidden">
      <HeroParticles />
      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-5 gap-12 items-center relative z-10">
        <div className="lg:col-span-3">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-6 animate-fade-up">
            🇮🇳 Made in Kota, Rajasthan
          </Badge>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight animate-fade-up stagger-1">
            India's Smartest<br />
            <span className="text-accent">AI NCERT Tutor</span>
          </h1>
          <p className="text-lg text-white/60 mt-6 max-w-xl animate-fade-up stagger-2">
            Personalized AI lectures, real CBSE questions, and group tests with friends. Free for every Indian student.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 animate-fade-up stagger-3">
            <Link to="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8">
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2 h-12 px-8">
              <Play className="w-4 h-4" /> Watch Demo
            </Button>
          </div>
          <div className="flex flex-wrap gap-8 mt-10 animate-fade-up stagger-4">
            <div><span className="text-2xl font-display font-bold text-white">50,000+</span><p className="text-sm text-white/50">Students</p></div>
            <div><span className="text-2xl font-display font-bold text-white">567+</span><p className="text-sm text-white/50">Questions</p></div>
            <div><span className="text-2xl font-display font-bold text-white">Class 6–10</span><p className="text-sm text-white/50">CBSE</p></div>
          </div>
        </div>
        <div className="lg:col-span-2 hidden lg:block">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 animate-pulse-glow">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="h-1 w-16 bg-primary/20 rounded mb-4" />
              <h3 className="font-display font-bold text-foreground text-lg typewriter" style={{ maxWidth: "200px" }}>
                States of Matter
              </h3>
              <div className="mt-4 space-y-2 opacity-0 animate-fade-up" style={{ animationDelay: "3.5s" }}>
                <p className="text-sm text-muted-foreground">Solid → Liquid → Gas</p>
                <div className="flex gap-2 mt-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs">🧊</div>
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs">💧</div>
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs">💨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubjectsStrip() {
  const subjectColors: Record<string, string> = {
    science: "bg-[#3B82F6]",
    math: "bg-[#8B5CF6]",
    social: "bg-[#10B981]",
    english: "bg-[#F59E0B]",
    hindi: "bg-[#EF4444]",
  };

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-center text-foreground mb-12">Choose Your Subject</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {subjects.map((s, i) => (
            <Link key={s.id} to={`/subjects/${s.id}`}>
              <Card className={`card-hover cursor-pointer group animate-fade-up stagger-${i + 1}`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-lg ${subjectColors[s.id]} mx-auto flex items-center justify-center text-2xl mb-3`}>
                    {s.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.chapters * 5}+ chapters</p>
                  <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Learning <ArrowRight className="inline w-3 h-3" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "🧪", title: "Take Diagnostic", desc: "40 questions, AI maps your weak areas" },
    { icon: "🎓", title: "Watch AI Lecture", desc: "Personalized whiteboard lecture just for you" },
    { icon: "🎯", title: "Test Yourself", desc: "Topic tests + challenge friends" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-center text-foreground mb-4">How It Works</h2>
        <p className="text-center text-muted-foreground mb-12">3 simple steps to better grades</p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className={`text-center animate-fade-up stagger-${i + 1}`}>
              <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center text-4xl mb-4">
                {step.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">{step.title}</h3>
              <p className="text-muted-foreground mt-2">{step.desc}</p>
              {i < 2 && <ChevronRight className="w-6 h-6 text-muted-foreground mx-auto mt-4 hidden md:block rotate-0" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureHighlights() {
  const features = [
    { icon: <Brain className="w-6 h-6" />, title: "AI Whiteboard Lectures", desc: "Teacher writes explanations on screen, adapts to your mistakes" },
    { icon: <Target className="w-6 h-6" />, title: "Group Test", desc: "Challenge 5 friends with 1 code. See who wins in real time" },
    { icon: <Layers className="w-6 h-6" />, title: "Smart Flashcards", desc: "FSRS algorithm — study smarter, not more" },
    { icon: <BookOpen className="w-6 h-6" />, title: "NCERT Flipbook", desc: "Read your textbook right inside the app" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Progress Analytics", desc: "Radar chart, error patterns, AI study tips" },
    { icon: <Trophy className="w-6 h-6" />, title: "JEE Foundation", desc: "Class 9-10 JEE track, rank predictor, 3-hour mocks" },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-center text-foreground mb-12">Everything You Need to Score Big</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className={`card-hover animate-fade-up stagger-${i + 1}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-center text-white mb-12">What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className={`bg-white/5 border-white/10 animate-fade-up stagger-${i + 1}`}>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-white/80 italic">"{t.quote}"</p>
                <p className="text-white/50 text-sm mt-4">— {t.name}, {t.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-center text-foreground mb-4">Simple, Transparent Pricing</h2>
        <p className="text-center text-muted-foreground mb-12">Start free. Upgrade when you're ready.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, i) => (
            <Card key={plan.id} className={`card-hover relative animate-fade-up stagger-${i + 1} ${plan.popular ? "border-primary shadow-md" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                <div className="mt-2">
                  <span className="font-display text-3xl font-bold text-foreground">₹{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.slice(0, 4).map((f, j) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <span className={f.included ? "text-success" : "text-destructive"}>{f.included ? "✅" : "❌"}</span>
                      <span className={f.included ? "text-foreground" : "text-muted-foreground"}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" className="block mt-4">
                  <Button variant={plan.popular ? "default" : "outline"} className="w-full">{plan.cta}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/pricing" className="text-primary hover:underline text-sm font-medium">
            See Full Pricing <ArrowRight className="inline w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-center text-foreground mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="font-display font-semibold text-left text-foreground">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 bg-[#0A0F1E]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl text-white mb-4">Start your free account in 30 seconds</h2>
        <p className="text-white/60 mb-8">No credit card required. Class 6-10 CBSE. Made in India 🇮🇳</p>
        <Link to="/register">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8">
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    Product: [
      { label: "Features", path: "/features" },
      { label: "Pricing", path: "/pricing" },
      { label: "Group Test", path: "/group-test" },
      { label: "NCERT Books", path: "/books" },
    ],
    Resources: [
      { label: "Blog", path: "#" },
      { label: "Help Center", path: "#" },
      { label: "Community", path: "#" },
      { label: "API", path: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Refund Policy", path: "#" },
    ],
    Connect: [
      { label: "Twitter", path: "#" },
      { label: "YouTube", path: "#" },
      { label: "Instagram", path: "#" },
      { label: "WhatsApp", path: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="font-display font-bold text-foreground">ShikshaGuruji</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">India's Smartest AI Tutor</p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-foreground text-sm mb-3">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ASN StarChem Pvt Ltd, Kota, Rajasthan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <Hero />
      <SubjectsStrip />
      <HowItWorks />
      <FeatureHighlights />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
