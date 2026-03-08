import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle, BookOpen, Users, Brain, Sparkles, BarChart3, Trophy, ChevronRight, Star, Zap, Target, Layers, Atom, FlaskConical, Ruler, Microscope, Check, X, Shield, Download, TrendingUp, Globe, Flag, Rocket } from "lucide-react";
import { subjects, testimonials, pricingPlans, faqItems } from "@/data/mockData";
import logo from "@/assets/logo.png";
import indiaFlagGlow from "@/assets/india-flag-glow.png";
import globeIndia from "@/assets/globe-india.png";
import indiaRocket from "@/assets/india-rocket.png";
import indiaAiWhiteboard from "@/assets/india-ai-whiteboard.png";
import indiaStudentFuture from "@/assets/india-student-future.png";
import indiaVirtualLab from "@/assets/india-virtual-lab.png";
import indiaFlashcards from "@/assets/india-flashcards.png";
import indiaGroupBattle from "@/assets/india-group-battle.png";
import indiaServers from "@/assets/india-servers.png";
import heroStudent from "@/assets/hero-student.png";
import landingAiTutor from "@/assets/landing-ai-tutor.png";
import landingGroupTest from "@/assets/landing-group-test.png";
import landingFlashcards from "@/assets/landing-flashcards.png";
import landingParent from "@/assets/landing-parent.png";
import parentDashboardUi from "@/assets/parent-dashboard-ui.png";
import parentCheckingProgress from "@/assets/parent-checking-progress.png";
import studentSneha from "@/assets/student-sneha.png";
import studentArjun from "@/assets/student-arjun.png";
import studentPriya from "@/assets/student-priya.png";
import studentRohan from "@/assets/student-rohan.png";
import studentKavya from "@/assets/student-kavya.png";
import studentDev from "@/assets/student-dev.png";
import studentAnanya from "@/assets/student-ananya.png";
import studentVikram from "@/assets/student-vikram.png";
import studentMeera from "@/assets/student-meera.png";

const studentAvatars: Record<string, string> = {
  sneha: studentSneha, arjun: studentArjun, priya: studentPriya,
  rohan: studentRohan, kavya: studentKavya, dev: studentDev,
  ananya: studentAnanya, vikram: studentVikram, meera: studentMeera,
};

import subjectScience from "@/assets/subject-science.png";
import subjectMath from "@/assets/subject-math.png";
import subjectSocial from "@/assets/subject-social.png";

const subjectImages: Record<string, string> = {
  science: subjectScience, math: subjectMath, social: subjectSocial,
};
import { useMemo, lazy, Suspense } from "react";
const Hyperspeed = lazy(() => import("@/components/Hyperspeed"));

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Counter({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.floor(ease * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);
  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

function FuzzyText({ text, className = "" }: { text: string; className?: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <span className={className}>
      {text.split("").map((char, i) => {
        const dist = hoveredIdx !== null ? Math.abs(i - hoveredIdx) : 999;
        const weight = Math.max(300, Math.min(900, 900 - dist * 100));
        const blur = hoveredIdx !== null ? Math.max(0, dist * 0.3 - 0.5) : 0;
        return (
          <span key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}
            style={{ fontWeight: weight, filter: blur > 0 ? `blur(${blur}px)` : "none", transition: "font-weight 0.2s ease, filter 0.2s ease", display: "inline-block", cursor: "default" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

function TypingText({ texts, className = "" }: { texts: string[]; className?: string }) {
  const [currentText, setCurrentText] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const text = texts[textIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        setCurrentText(text.slice(0, charIdx + 1));
        if (charIdx + 1 >= text.length) { setTimeout(() => setDeleting(true), 2000); } else { setCharIdx(charIdx + 1); }
      } else {
        setCurrentText(text.slice(0, charIdx));
        if (charIdx <= 0) { setDeleting(false); setTextIdx((textIdx + 1) % texts.length); } else { setCharIdx(charIdx - 1); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx, texts]);
  return (<span className={className}>{currentText}<span className="animate-pulse text-accent">|</span></span>);
}

function ElectricBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "conic-gradient(from var(--angle, 0deg), hsl(var(--primary)), hsl(var(--accent)), hsl(217, 91%, 60%), hsl(var(--primary)))", animation: "electric-spin 3s linear infinite" }} />
      <div className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-md"
        style={{ background: "conic-gradient(from var(--angle, 0deg), hsl(var(--primary)), hsl(var(--accent)), hsl(217, 91%, 60%), hsl(var(--primary)))", animation: "electric-spin 3s linear infinite" }} />
      <div className="relative bg-card rounded-2xl">{children}</div>
    </div>
  );
}

function AntigravityParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, size: 2 + Math.random() * 6,
    duration: `${8 + Math.random() * 15}s`, delay: `${Math.random() * 8}s`,
    opacity: 0.1 + Math.random() * 0.4, blur: Math.random() * 2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full" style={{
          left: p.left, bottom: "-20px", width: p.size, height: p.size,
          background: `hsl(${200 + Math.random() * 40}, 80%, ${60 + Math.random() * 30}%)`,
          opacity: p.opacity, filter: `blur(${p.blur}px)`,
          animation: `antigravity-rise ${p.duration} linear infinite`, animationDelay: p.delay,
        }} />
      ))}
    </div>
  );
}

function CurvedLoop() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none">
      <path d="M0,400 C200,100 400,700 600,400 C800,100 1000,700 1200,400" fill="none" stroke="url(#loopGrad)" strokeWidth="1.5" opacity="0.15" className="animate-dash" />
      <path d="M0,350 C300,150 500,650 700,350 C900,50 1100,650 1200,350" fill="none" stroke="url(#loopGrad)" strokeWidth="1" opacity="0.08" className="animate-dash" style={{ animationDelay: "2s" }} />
      <defs>
        <linearGradient id="loopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(224, 76%, 40%)" />
          <stop offset="50%" stopColor="hsl(38, 92%, 50%)" />
          <stop offset="100%" stopColor="hsl(224, 76%, 40%)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(800px at ${e.clientX}px ${e.clientY}px, hsl(var(--primary) / 0.04), transparent 60%)`;
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return <div ref={ref} className="fixed inset-0 pointer-events-none z-[1] transition-all duration-150" />;
}

function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.25;
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      setRevealedCount(Math.floor(progress * words.length));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);
  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.3em] transition-all duration-500" style={{
          opacity: i < revealedCount ? 1 : 0.15,
          transform: i < revealedCount ? "translateY(0)" : "translateY(8px)",
          filter: i < revealedCount ? "blur(0)" : "blur(2px)",
        }}>{word}</span>
      ))}
    </div>
  );
}

/* ── Navbar ────────────────────────────────────────── */
function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0F1E]/95 backdrop-blur-lg shadow-lg" : "bg-transparent"} border-b border-white/10`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ShikshaGuruji" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-display font-bold text-white text-lg">ShikshaGuruji</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[
            { to: "/features", label: "Features" },
            { to: "/pricing", label: "Pricing" },
            { to: "/chatbot", label: "AI Chatbot", icon: <MessageCircle className="w-3.5 h-3.5" /> },
            { to: "/about", label: "About" },
            { to: "/parent/login", label: "Parent Portal", icon: <Shield className="w-3.5 h-3.5" /> },
          ].map(l => (
            <Link key={l.to} to={l.to} className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1">
              {l.icon}{l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login"><Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">Login</Button></Link>
          <Link to="/register"><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Free</Button></Link>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ──────────────────────────────────────────── */
function Hero() {
  const magnetic = useMagnetic();
  return (
    <section className="relative min-h-screen bg-[#0A0F1E] flex items-center overflow-hidden">
      <AntigravityParticles />
      <CurvedLoop />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-5 gap-12 items-center relative z-10">
        <div className="lg:col-span-3">
          
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight animate-fade-up stagger-1">
            <FuzzyText text="India's Smartest" /><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-primary-light" style={{ WebkitBackgroundClip: "text" }}>
              <TypingText texts={["AI NCERT Tutor", "Study Partner", "Exam Cracker"]} />
            </span>
          </h1>
          <ScrollRevealText text="Personalized AI lectures, real CBSE questions, and group tests with friends. Free for every Indian student." className="text-lg text-white/60 mt-6 max-w-xl" />
          <div className="flex flex-wrap gap-4 mt-8 animate-fade-up stagger-3">
            <div {...magnetic} ref={magnetic.ref}>
              <Link to="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8 glow-hover transition-transform duration-200">
                  Start Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <Link to="/chatbot">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 h-12 px-8 glow-hover">
                <MessageCircle className="w-4 h-4" /> Try Free AI Chatbot
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-2 hidden lg:block">
          <div className="relative animate-fade-up stagger-2">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-3xl blur-2xl" />
            <img
              src={heroStudent}
              alt="Indian student learning with AI"
              className="relative w-full rounded-2xl shadow-2xl shadow-primary/20 border border-white/10 animate-float"
            />
            <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2 animate-fade-up" style={{ animationDelay: "1.5s" }}>
              <div className="w-8 h-8 rounded-lg bg-[hsl(140,70%,40%)] flex items-center justify-center text-white text-xs font-bold">✓</div>
              <div>
                <p className="text-white text-xs font-semibold">CBSE Aligned</p>
                <p className="text-white/50 text-[10px]">Class 6-10</p>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2 animate-fade-up" style={{ animationDelay: "2s" }}>
              <div className="w-8 h-8 rounded-lg bg-[hsl(38,92%,50%)] flex items-center justify-center text-white text-xs font-bold">AI</div>
              <div>
                <p className="text-white text-xs font-semibold">Live Whiteboard</p>
                <p className="text-white/50 text-[10px]">Personalized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Visual Showcase ──────────────────────────────── */
function VisualShowcase() {
  const { ref, visible } = useReveal();
  const features = [
    { img: landingAiTutor, title: "AI Whiteboard Lectures", desc: "Watch your AI teacher explain on a real whiteboard", color: "from-[hsl(24,90%,55%)] to-[hsl(38,92%,50%)]" },
    { img: landingGroupTest, title: "Group Test Battles", desc: "Challenge friends in real-time quiz competitions", color: "from-[hsl(217,91%,60%)] to-[hsl(224,76%,40%)]" },
    { img: landingFlashcards, title: "FSRS Smart Flashcards", desc: "Never forget — AI schedules your revisions perfectly", color: "from-[hsl(258,90%,66%)] to-[hsl(280,80%,50%)]" },
    { img: landingParent, title: "Parent Dashboard", desc: "Parents track progress, streaks, and weak areas", color: "from-[hsl(160,84%,39%)] to-[hsl(140,70%,40%)]" },
  ];
  return (
    <section ref={ref} className="py-20 bg-[#0A0F1E] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className={`font-display font-bold text-3xl md:text-4xl text-center text-white mb-3 reveal-base reveal-up ${visible ? "revealed" : ""}`}>
          Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary" style={{ WebkitBackgroundClip: "text" }}>Ace Your Exams</span>
        </h2>
        <p className={`text-center text-white/50 mb-14 max-w-2xl mx-auto reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>
          Built by Kota educators and AI engineers — every feature designed for Indian students
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 reveal-base ${i % 2 === 0 ? "reveal-left" : "reveal-right"} ${visible ? "revealed" : ""}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${f.color} text-white text-xs font-semibold mb-3`}>
                  <Sparkles className="w-3 h-3" /> {f.title}
                </div>
                <p className="text-white/70 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function SubjectsStrip() {
  const { ref, visible } = useReveal();
  const subjectColors: Record<string, string> = {
    science: "bg-[hsl(217,91%,60%)]",
    math: "bg-[hsl(258,90%,66%)]",
    social: "bg-[hsl(160,84%,39%)]",
  };
  return (
    <section ref={ref} className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 shimmer-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-3 reveal-base reveal-up ${visible ? "revealed" : ""}`}>Choose Your Subject</h2>
        <p className={`text-center text-muted-foreground mb-12 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>3 subjects, 50+ chapters, Class 6-10 CBSE</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map((s, i) => (
            <Link key={s.id} to={`/subjects/${s.id}`}>
              <Card className={`card-hover glow-hover cursor-pointer group reveal-base reveal-scale ${visible ? "revealed" : ""}`} style={{ transitionDelay: `${200 + i * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <img src={subjectImages[s.id]} alt={s.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.chapters * 5}+ chapters</p>
                  <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
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

/* ── How It Works ──────────────────────────────────── */
function HowItWorks() {
  const { ref, visible } = useReveal();
  const steps = [
    { icon: <Target className="w-8 h-8 text-primary" />, title: "Take Diagnostic", desc: "40 questions, AI maps your weak areas", color: "from-primary/20 to-primary/5" },
    { icon: <BookOpen className="w-8 h-8 text-accent" />, title: "Watch AI Lecture", desc: "Personalized whiteboard lecture just for you", color: "from-accent/20 to-accent/5" },
    { icon: <Trophy className="w-8 h-8 text-success" />, title: "Test Yourself", desc: "Topic tests + challenge friends", color: "from-success/20 to-success/5" },
  ];
  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`}>How It Works</h2>
        <p className={`text-center text-muted-foreground mb-14 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>3 simple steps to better grades</p>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/3 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-primary/30 via-accent/30 to-success/30" />
          {steps.map((step, i) => (
            <div key={i} className={`text-center relative reveal-base ${i === 0 ? "reveal-left" : i === 2 ? "reveal-right" : "reveal-up"} ${visible ? "revealed" : ""}`} style={{ transitionDelay: `${200 + i * 200}ms` }}>
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} mx-auto flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-110 hover:-rotate-3`}>
                {step.icon}
              </div>
              <div className="absolute -top-2 -right-2 md:right-auto md:left-1/2 md:-translate-x-1/2 md:-top-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center shadow-lg">
                {i + 1}
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mt-2">{step.title}</h3>
              <p className="text-muted-foreground mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Feature Highlights ────────────────────────────── */
function FeatureHighlights() {
  const { ref, visible } = useReveal();
  const features = [
    { icon: <Brain className="w-6 h-6" />, title: "AI Whiteboard Lectures", desc: "Teacher writes explanations on screen, adapts to your mistakes", gradient: "from-primary/10 to-primary/5" },
    { icon: <Target className="w-6 h-6" />, title: "Group Test", desc: "Challenge 5 friends with 1 code. See who wins in real time", gradient: "from-accent/10 to-accent/5" },
    { icon: <Layers className="w-6 h-6" />, title: "Smart Flashcards", desc: "FSRS algorithm — study smarter, not more", gradient: "from-success/10 to-success/5" },
    { icon: <BookOpen className="w-6 h-6" />, title: "NCERT Flipbook", desc: "Read your textbook right inside the app", gradient: "from-[hsl(258,90%,66%)]/10 to-[hsl(258,90%,66%)]/5" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Progress Analytics", desc: "Radar chart, error patterns, AI study tips", gradient: "from-primary/10 to-primary/5" },
    { icon: <Trophy className="w-6 h-6" />, title: "JEE Foundation", desc: "Class 9-10 JEE track, rank predictor, 3-hour mocks", gradient: "from-accent/10 to-accent/5" },
  ];
  return (
    <section ref={ref} className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`}>Everything You Need to Score Big</h2>
        <p className={`text-center text-muted-foreground mb-12 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>Powerful features designed for Indian students</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className={`card-hover glow-hover group icon-spin-hover overflow-hidden reveal-base ${i % 2 === 0 ? "reveal-left" : "reveal-right"} ${visible ? "revealed" : ""}`} style={{ transitionDelay: `${200 + i * 120}ms` }}>
              <CardContent className="p-6 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 icon-target transition-transform duration-300">{f.icon}</div>
                  <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Virtual PCMB Labs ─────────────────────────────── */
function VirtualLabsShowcase() {
  const { ref, visible } = useReveal();
  const labs = [
    {
      title: "Physics Lab",
      img: labPhysics,
      color: "from-[hsl(217,91%,60%)] to-[hsl(224,76%,40%)]",
      experiments: ["Circuit Builder", "Pendulum Simulator", "Wave Interference"],
      desc: "Build circuits, simulate pendulums, and visualize wave patterns — all without equipment.",
      count: 12,
    },
    {
      title: "Chemistry Lab",
      img: labChemistry,
      color: "from-[hsl(160,84%,39%)] to-[hsl(160,84%,25%)]",
      experiments: ["Acid-Base Reactions", "Electrolysis", "pH Indicator"],
      desc: "Mix chemicals, watch colour changes, and observe gas collection in real time.",
      count: 10,
    },
    {
      title: "Biology Lab",
      img: labBiology,
      color: "from-[hsl(24,90%,55%)] to-[hsl(38,92%,50%)]",
      experiments: ["3D Anatomy Explorer", "Virtual Microscope", "DNA Structure"],
      desc: "Explore human organs, observe cells under a microscope, and build Punnett squares.",
      count: 9,
    },
    {
      title: "Mathematics Lab",
      img: labMath,
      color: "from-[hsl(258,90%,66%)] to-[hsl(258,90%,50%)]",
      experiments: ["Coordinate Plotter", "Geometry Tools", "Fraction Visualizer"],
      desc: "Plot graphs, construct geometric figures, and visualize fractions interactively.",
      count: 8,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0A0F1E] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[hsl(258,90%,66%)]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[hsl(217,91%,60%)]/8 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className={`bg-[hsl(258,90%,66%)]/20 text-[hsl(258,90%,66%)] border-[hsl(258,90%,66%)]/30 mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`}>
            <Atom className="w-3 h-3 mr-1" /> No Equipment Needed
          </Badge>
          <h2 className={`font-display font-extrabold text-4xl md:text-5xl text-white mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>
            Virtual <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(217,91%,60%)] via-[hsl(258,90%,66%)] to-[hsl(38,92%,50%)]" style={{ WebkitBackgroundClip: "text" }}>PCMB Labs</span>
          </h2>
          <p className={`text-white/50 text-lg max-w-2xl mx-auto reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "200ms" }}>
            Perform real NCERT experiments right in your browser. 39 interactive experiments across Physics, Chemistry, Biology, and Mathematics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {labs.map((lab, i) => (
            <Link key={i} to={`/virtual-lab/${lab.title.split(" ")[0].toLowerCase()}`}>
              <div
                className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-500 reveal-base ${i % 2 === 0 ? "reveal-left" : "reveal-right"} ${visible ? "revealed" : ""}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={lab.img} alt={lab.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${lab.color} text-white text-xs font-bold`}>
                    {lab.count} experiments
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 bg-white/[0.03]">
                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[hsl(38,92%,50%)] transition-colors">{lab.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{lab.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {lab.experiments.map((exp, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-white/[0.08] text-white/70 text-xs border border-white/10 group-hover:border-white/20 transition-colors">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/virtual-lab">
            <Button size="lg" className="bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(258,90%,66%)] hover:opacity-90 text-white gap-2 h-12 px-8 shadow-[0_0_30px_hsl(258,90%,66%,0.3)]">
              <FlaskConical className="w-4 h-4" /> Explore All Labs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}


function ParentSection() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`reveal-base reveal-left ${visible ? "revealed" : ""}`}>
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4"><Shield className="w-3 h-3 mr-1" /> For Parents</Badge>
            <h2 className="font-display font-extrabold text-4xl text-foreground mb-6 leading-tight">
              Stay connected to your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" style={{ WebkitBackgroundClip: "text" }}>child's progress</span>
            </h2>
            <ScrollRevealText text="Track subjects, monitor streaks, download PDF reports, and identify weak areas — all from your own secure parent dashboard." className="text-lg text-muted-foreground mb-8" />
            <div className="space-y-4 mb-8">
              {[
                { icon: <BarChart3 className="w-5 h-5 text-primary" />, text: "Subject-wise progress tracking with trends" },
                { icon: <Users className="w-5 h-5 text-accent" />, text: "Monitor multiple children from one account" },
                { icon: <Download className="w-5 h-5 text-success" />, text: "Download detailed PDF progress reports" },
                { icon: <TrendingUp className="w-5 h-5 text-primary" />, text: "AI-powered weak area identification" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                  <span className="text-foreground">{f.text}</span>
                </div>
              ))}
            </div>
            <Link to="/parent/login">
              <Button size="lg" className="gap-2 h-12 px-8 glow-hover"><Shield className="w-4 h-4" /> Parent Login <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
          {/* Right column — images */}
          <div className={`space-y-4 reveal-base reveal-right ${visible ? "revealed" : ""}`} style={{ transitionDelay: "400ms" }}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <img src={parentDashboardUi} alt="Parent dashboard showing student analytics" className="relative w-full rounded-2xl border border-border/50 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-xl border border-border/50">
                <img src={parentCheckingProgress} alt="Parent checking child's progress" className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-semibold">Real-time Tracking</p>
              </div>
              <div className="relative group overflow-hidden rounded-xl border border-border/50">
                <img src={landingParent} alt="Parent and child reviewing progress together" className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-semibold">PDF Reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────── */
function Testimonials() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="py-20 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`}>What Students Say</h2>
        <p className={`text-center text-muted-foreground mb-12 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>
          Real results from real students across India
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className={`card-hover transition-all duration-500 group reveal-base reveal-rotate ${visible ? "revealed" : ""}`} style={{ transitionDelay: `${200 + i * 120}ms` }}>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${j * 50}ms` }} />
                  ))}
                </div>
                <p className="text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={studentAvatars[t.avatar]} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
                    <p className="text-sm text-muted-foreground">{t.name}, {t.location}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Class {t.class}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing Preview ───────────────────────────────── */
function PricingPreview() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`}>Simple, Transparent Pricing</h2>
        <p className={`text-center text-muted-foreground mb-12 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>Start free. Upgrade when you're ready.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, i) => (
            <Card key={plan.id} className={`card-hover relative overflow-hidden group reveal-base reveal-up ${visible ? "revealed" : ""} ${plan.popular ? "border-primary shadow-lg gradient-border" : ""}`} style={{ transitionDelay: `${200 + i * 120}ms` }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-6 relative">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${plan.popular ? "bg-primary/5" : "bg-muted/50"}`} />
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="font-display text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {plan.features.slice(0, 4).map((f, j) => (
                      <li key={j} className="text-sm flex items-start gap-2">
                        {f.included ? <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />}
                        <span className={f.included ? "text-foreground" : "text-muted-foreground"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing" className="block mt-4">
                    <Button variant={plan.popular ? "default" : "outline"} className={`w-full ${plan.popular ? "glow-hover" : ""}`}>{plan.cta}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className={`text-center mt-8 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "700ms" }}>
          <Link to="/pricing" className="text-primary hover:underline text-sm font-medium">See Full Pricing <ArrowRight className="inline w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────── */
function FAQ() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="py-20 bg-card">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-12 reveal-base reveal-up ${visible ? "revealed" : ""}`}>Frequently Asked Questions</h2>
        <div className={`reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "200ms" }}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4 transition-shadow duration-300 hover:shadow-md">
                <AccordionTrigger className="font-display font-semibold text-left text-foreground">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ── Made in India ──────────────────────────────────── */
function MadeInIndia() {
  const { ref, visible } = useReveal();
  const hyperspeedOptions = useMemo(() => ({
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5] as [number, number],
    lightStickHeight: [1.3, 1.7] as [number, number],
    movingAwaySpeed: [60, 80] as [number, number],
    movingCloserSpeed: [-120, -160] as [number, number],
    carLightsLength: [12, 80] as [number, number],
    carLightsRadius: [0.05, 0.14] as [number, number],
    carWidthPercentage: [0.3, 0.5] as [number, number],
    carShiftX: [-0.8, 0.8] as [number, number],
    carFloorSeparation: [0, 5] as [number, number],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff6b35, 0xff8c42, 0xe85d26],
      rightCars: [0x138808, 0x1a9e0e, 0x0f6b06],
      sticks: 0xff9933
    }
  }), []);

  const achievements = [
    { icon: <Globe className="w-6 h-6" />, title: "First in the World", desc: "AI-powered NCERT tutor with real-time whiteboard lectures — no one else has done this" },
    { icon: <Flag className="w-6 h-6" />, title: "100% Made in India", desc: "All data stays on Indian servers. Designed for Indian students, by Indian engineers" },
    { icon: <Rocket className="w-6 h-6" />, title: "Pioneering EdTech", desc: "Virtual PCMB labs, FSRS flashcards, and group test battles — technology India hasn't seen before" },
  ];

  return (
    <section ref={ref} className="relative min-h-[80vh] overflow-hidden bg-black">
      {/* Hyperspeed background */}
      <div className="absolute inset-0 opacity-40">
        <Suspense fallback={null}>
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0F1E] to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0F1E] to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 flex flex-col items-center">
        {/* Indian flag ribbon */}
        <div className={`mb-8 reveal-base reveal-scale ${visible ? "revealed" : ""}`}>
          <img src={indiaFlagGlow} alt="Indian tricolor" className="w-64 md:w-80 h-auto opacity-90" />
        </div>

        {/* Main heading */}
        <div className="text-center mb-16">
          <Badge className={`bg-[hsl(38,92%,50%)]/20 text-[hsl(38,92%,50%)] border-[hsl(38,92%,50%)]/30 mb-6 reveal-base reveal-up ${visible ? "revealed" : ""}`}>
            🇮🇳 Proudly Indian
          </Badge>
          <h2 className={`font-display font-extrabold text-5xl md:text-7xl text-white mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>
            Made in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(24,90%,55%)] via-white to-[hsl(140,70%,40%)]" style={{ WebkitBackgroundClip: "text" }}>India</span>
          </h2>
          <h3 className={`font-display font-bold text-2xl md:text-4xl text-white/70 mb-6 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "200ms" }}>
            First in the <span className="text-[hsl(38,92%,50%)]">World</span>
          </h3>
          <ScrollRevealText
            text="The world's first AI tutor that writes on a whiteboard, explains like a real teacher, and adapts to every Indian student's unique learning style."
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          />
        </div>

        {/* Globe + achievements grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-5xl">
          {/* Globe image */}
          <div className={`flex justify-center reveal-base reveal-left ${visible ? "revealed" : ""}`} style={{ transitionDelay: "400ms" }}>
            <div className="relative">
              <img src={globeIndia} alt="India on the globe" className="w-56 md:w-72 h-auto drop-shadow-[0_0_60px_rgba(255,153,51,0.3)] animate-float" />
              <img src={indiaRocket} alt="Indian rocket" className="absolute -top-8 -right-8 w-20 md:w-28 h-auto animate-float drop-shadow-[0_0_30px_rgba(255,153,51,0.4)]" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          {/* Achievement cards */}
          <div className="space-y-5">
            {achievements.map((item, i) => (
              <div
                key={i}
                className={`group reveal-base reveal-right ${visible ? "revealed" : ""}`}
                style={{ transitionDelay: `${500 + i * 150}ms` }}
              >
                <div className="p-5 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 flex items-start gap-4 transition-all duration-300 group-hover:bg-white/[0.14] group-hover:border-[hsl(38,92%,50%)]/30 group-hover:shadow-[0_0_30px_rgba(255,153,51,0.1)]">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(24,90%,55%)] to-[hsl(38,92%,50%)] flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-white mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature showcase gallery */}
        <div className={`mt-20 w-full max-w-6xl reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "800ms" }}>
          <h3 className="font-display font-bold text-2xl text-white text-center mb-10">
            What Makes Us <span className="text-[hsl(38,92%,50%)]">Different</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { img: indiaAiWhiteboard, label: "AI Whiteboard Lectures", delay: "0s" },
              { img: indiaStudentFuture, label: "Future-Ready Learning", delay: "0.1s" },
              { img: indiaVirtualLab, label: "Virtual PCMB Labs", delay: "0.2s" },
              { img: indiaFlashcards, label: "Smart Flashcards", delay: "0.3s" },
              { img: indiaGroupBattle, label: "Group Test Battles", delay: "0.4s" },
              { img: indiaServers, label: "100% Indian Servers", delay: "0.5s" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[hsl(38,92%,50%)]/30 transition-all duration-500"
                style={{ animationDelay: item.delay }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-40 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-display font-semibold text-sm md:text-base">{item.label}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[hsl(38,92%,50%)]/5 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>


        <div className={`mt-16 grid grid-cols-3 gap-8 text-center reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "900ms" }}>
          <div>
            <p className="font-display font-extrabold text-3xl md:text-4xl text-[hsl(38,92%,50%)]"><Counter end={100} suffix="%" /></p>
            <p className="text-white/40 text-sm mt-1">Indian Data Servers</p>
          </div>
          <div>
            <p className="font-display font-extrabold text-3xl md:text-4xl text-white"><Counter end={1} suffix="st" /></p>
            <p className="text-white/40 text-sm mt-1">AI Whiteboard Tutor</p>
          </div>
          <div>
            <p className="font-display font-extrabold text-3xl md:text-4xl text-[hsl(140,70%,40%)]"><Counter end={0} suffix="" /></p>
            <p className="text-white/40 text-sm mt-1">Data Sent Abroad</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────── */
function FinalCTA() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="py-24 bg-[#0A0F1E] relative overflow-hidden">
      <AntigravityParticles />
      <CurvedLoop />
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-accent/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <div className={`max-w-3xl mx-auto px-6 text-center relative z-10 reveal-base reveal-scale ${visible ? "revealed" : ""}`}>
        <div className="inline-flex items-center gap-2 bg-accent/20 text-accent text-sm px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-4 h-4" /> Join 10,000+ students
        </div>
        <h2 className="font-display font-bold text-4xl text-white mb-4">
          <FuzzyText text="Start your free account in 30 seconds" />
        </h2>
        <p className="text-white/60 mb-8 text-lg">No credit card required. Class 6-10 CBSE. Made in India.</p>
        <Link to="/register">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-14 px-10 text-lg glow-hover">
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────── */
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
      { label: "Parent Portal", path: "/parent/login" },
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
              <img src={logo} alt="ShikshaGuruji" className="w-8 h-8 rounded-lg object-contain" />
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
                    <Link to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ASN StarChem Pvt Ltd, Kota, Rajasthan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ── Landing Page ──────────────────────────────────── */
export default function Landing() {
  return (
    <div className="min-h-screen">
      <MouseSpotlight />
      <LandingNavbar />
      <Hero />
      <VisualShowcase />
      <SubjectsStrip />
      <HowItWorks />
      <FeatureHighlights />
      <ParentSection />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <MadeInIndia />
      <FinalCTA />
      <Footer />
    </div>
  );
}
