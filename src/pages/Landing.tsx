import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle, BookOpen, Users, Brain, Sparkles, BarChart3, Trophy, ChevronRight, Star, Zap, Target, Layers, Atom, FlaskConical, Ruler, Microscope, Check, X, Shield, Download, TrendingUp } from "lucide-react";
import { subjects, testimonials, pricingPlans, faqItems } from "@/data/mockData";

/* ── Scroll reveal hook ───────────────────────────── */
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

/* ── Animated counter ─────────────────────────────── */
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

/* ── Magnetic cursor effect ───────────────────────── */
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

/* ── Text Pressure / Fuzzy Text ───────────────────── */
function FuzzyText({ text, className = "" }: { text: string; className?: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <span className={className}>
      {text.split("").map((char, i) => {
        const dist = hoveredIdx !== null ? Math.abs(i - hoveredIdx) : 999;
        const weight = Math.max(300, Math.min(900, 900 - dist * 100));
        const blur = hoveredIdx !== null ? Math.max(0, dist * 0.3 - 0.5) : 0;
        return (
          <span
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              fontWeight: weight,
              filter: blur > 0 ? `blur(${blur}px)` : "none",
              transition: "font-weight 0.2s ease, filter 0.2s ease",
              display: "inline-block",
              cursor: "default",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

/* ── Typing text effect ───────────────────────────── */
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
        if (charIdx + 1 >= text.length) {
          setTimeout(() => setDeleting(true), 2000);
        } else {
          setCharIdx(charIdx + 1);
        }
      } else {
        setCurrentText(text.slice(0, charIdx));
        if (charIdx <= 0) {
          setDeleting(false);
          setTextIdx((textIdx + 1) % texts.length);
        } else {
          setCharIdx(charIdx - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx, texts]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
}

/* ── Electric Border ──────────────────────────────── */
function ElectricBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "conic-gradient(from var(--angle, 0deg), hsl(var(--primary)), hsl(var(--accent)), hsl(217, 91%, 60%), hsl(var(--primary)))",
          animation: "electric-spin 3s linear infinite",
        }}
      />
      <div className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-md"
        style={{
          background: "conic-gradient(from var(--angle, 0deg), hsl(var(--primary)), hsl(var(--accent)), hsl(217, 91%, 60%), hsl(var(--primary)))",
          animation: "electric-spin 3s linear infinite",
        }}
      />
      <div className="relative bg-card rounded-2xl">{children}</div>
    </div>
  );
}

/* ── Antigravity floating elements ────────────────── */
function AntigravityParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 6,
    duration: `${8 + Math.random() * 15}s`,
    delay: `${Math.random() * 8}s`,
    opacity: 0.1 + Math.random() * 0.4,
    blur: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            background: `hsl(${200 + Math.random() * 40}, 80%, ${60 + Math.random() * 30}%)`,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            animation: `antigravity-rise ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Curved Loop SVG ──────────────────────────────── */
function CurvedLoop() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none">
      <path
        d="M0,400 C200,100 400,700 600,400 C800,100 1000,700 1200,400"
        fill="none"
        stroke="url(#loopGrad)"
        strokeWidth="1.5"
        opacity="0.15"
        className="animate-dash"
      />
      <path
        d="M0,350 C300,150 500,650 700,350 C900,50 1100,650 1200,350"
        fill="none"
        stroke="url(#loopGrad)"
        strokeWidth="1"
        opacity="0.08"
        className="animate-dash"
        style={{ animationDelay: "2s" }}
      />
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

/* ── Mouse spotlight ──────────────────────────────── */
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

/* ── Scroll word reveal ───────────────────────────── */
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
        }}>
          {word}
        </span>
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
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">SG</div>
          <span className="font-display font-bold text-white text-lg">ShikshaGuruji</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[
            { to: "/features", label: "Features" },
            { to: "/virtual-lab", label: "Virtual Lab" },
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
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-6 animate-fade-up">
            Made in Kota, Rajasthan
          </Badge>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight animate-fade-up stagger-1">
            <FuzzyText text="India's Smartest" /><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-primary-light" style={{ WebkitBackgroundClip: "text" }}>
              <TypingText texts={["AI NCERT Tutor", "Virtual Lab", "Study Partner", "Exam Cracker"]} />
            </span>
          </h1>
          <ScrollRevealText
            text="Personalized AI lectures, real CBSE questions, virtual PCMB labs, and group tests with friends. Free for every Indian student."
            className="text-lg text-white/60 mt-6 max-w-xl"
          />
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
          <div className="flex flex-wrap gap-6 mt-10 animate-fade-up stagger-4">
            {[
              { end: 10000, suffix: "+", label: "Active Students" },
              { end: 5000, suffix: "+", label: "Practice Questions" },
              { end: 80, suffix: "+", label: "NCERT Chapters" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <span className="text-2xl font-display font-bold text-white"><Counter end={stat.end} suffix={stat.suffix} /></span>
                <span className="text-sm text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 hidden lg:block">
          <ElectricBorder>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-1 animate-float">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <div className="bg-white rounded-lg p-6 shadow-xl">
                  <div className="h-1 w-16 bg-primary/20 rounded mb-4" />
                  <h3 className="font-display font-bold text-foreground text-lg typewriter" style={{ maxWidth: "200px" }}>
                    States of Matter
                  </h3>
                  <div className="mt-4 space-y-2 opacity-0 animate-fade-up" style={{ animationDelay: "3.5s" }}>
                    <p className="text-sm text-muted-foreground">Solid → Liquid → Gas</p>
                    <div className="flex gap-2 mt-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">S</div>
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">L</div>
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">G</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}

/* ── Subjects Strip ────────────────────────────────── */
function SubjectsStrip() {
  const { ref, visible } = useReveal();
  const subjectColors: Record<string, string> = {
    science: "bg-[hsl(217,91%,60%)]",
    math: "bg-[hsl(258,90%,66%)]",
    social: "bg-[hsl(160,84%,39%)]",
    english: "bg-[hsl(38,92%,50%)]",
    hindi: "bg-[hsl(0,84%,60%)]",
  };

  return (
    <section ref={ref} className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 shimmer-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-3 reveal-base reveal-up ${visible ? "revealed" : ""}`}>
          Choose Your Subject
        </h2>
        <p className={`text-center text-muted-foreground mb-12 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>
          5 subjects, 80+ chapters, Class 6-10 CBSE
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {subjects.map((s, i) => (
            <Link key={s.id} to={`/subjects/${s.id}`}>
              <Card className={`card-hover glow-hover cursor-pointer group reveal-base reveal-scale ${visible ? "revealed" : ""}`} style={{ transitionDelay: `${200 + i * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-xl ${subjectColors[s.id]} mx-auto flex items-center justify-center text-2xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    {s.icon}
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

/* ── Virtual Lab Showcase ──────────────────────────── */
function VirtualLabShowcase() {
  const { ref, visible } = useReveal();
  const [activeTab, setActiveTab] = useState(0);

  const labs = [
    {
      icon: <Atom className="w-6 h-6" />,
      title: "Physics",
      color: "from-[hsl(217,91%,60%)] to-[hsl(224,76%,40%)]",
      features: ["Drag & drop circuit builder", "Pendulum simulator with adjustable gravity", "Real-time velocity-time graph plotter", "Wave interference patterns"],
      demo: (
        <div className="relative h-full flex items-center justify-center">
          <svg viewBox="0 0 300 200" className="w-full max-w-xs">
            <rect x="30" y="80" width="240" height="2" rx="1" fill="hsl(224, 76%, 40%)" opacity={0.3} />
            <rect x="30" y="120" width="240" height="2" rx="1" fill="hsl(224, 76%, 40%)" opacity={0.3} />
            <rect x="30" y="70" width="40" height="30" rx="4" fill="hsl(var(--muted))" stroke="hsl(224, 76%, 40%)" strokeWidth="2" />
            <line x1="42" y1="76" x2="42" y2="94" stroke="hsl(224, 76%, 40%)" strokeWidth="3" />
            <line x1="58" y1="72" x2="58" y2="98" stroke="hsl(224, 76%, 40%)" strokeWidth="2" />
            <circle cx="150" cy="80" r="18" fill="hsl(38, 92%, 50%)" />
            <circle cx="150" cy="80" r="28" fill="hsl(38, 92%, 50%)" opacity="0.2" className="animate-pulse" />
            <circle cx="150" cy="80" r="38" fill="hsl(38, 92%, 50%)" opacity="0.1" className="animate-pulse" />
            <line x1="142" y1="72" x2="158" y2="88" stroke="white" strokeWidth="1.5" />
            <line x1="158" y1="72" x2="142" y2="88" stroke="white" strokeWidth="1.5" />
            <path d="M220,80 L230,70 L240,90 L250,70 L260,90 L270,80" fill="none" stroke="hsl(0, 84%, 60%)" strokeWidth="2" />
            <line x1="70" y1="85" x2="132" y2="81" stroke="hsl(224, 76%, 40%)" strokeWidth="2" />
            <line x1="168" y1="81" x2="220" y2="81" stroke="hsl(224, 76%, 40%)" strokeWidth="2" />
            <line x1="270" y1="81" x2="270" y2="120" stroke="hsl(224, 76%, 40%)" strokeWidth="2" />
            <line x1="270" y1="120" x2="30" y2="120" stroke="hsl(224, 76%, 40%)" strokeWidth="2" />
            <line x1="30" y1="100" x2="30" y2="120" stroke="hsl(224, 76%, 40%)" strokeWidth="2" />
            <text x="150" y="140" textAnchor="middle" fontSize="10" fill="hsl(224, 76%, 40%)" fontWeight="bold">Circuit Complete</text>
          </svg>
        </div>
      ),
    },
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Chemistry",
      color: "from-[hsl(160,84%,39%)] to-[hsl(160,84%,25%)]",
      features: ["Mix chemicals in virtual beakers", "Watch real-time colour changes", "pH indicator testing lab", "Acid-base neutralization"],
      demo: (
        <div className="relative h-full flex items-center justify-center">
          <svg viewBox="0 0 300 200" className="w-full max-w-xs">
            <path d="M100,40 L100,150 Q100,170 120,170 L180,170 Q200,170 200,150 L200,40" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
            <line x1="90" y1="40" x2="210" y2="40" stroke="hsl(var(--border))" strokeWidth="3" strokeLinecap="round" />
            <path d="M103,80 L103,150 Q103,167 120,167 L180,167 Q197,167 197,150 L197,80" fill="hsla(330, 80%, 65%, 0.7)" className="animate-pulse" />
            {[120, 140, 160, 175, 130, 155, 145].map((x, i) => (
              <circle key={i} cx={x} cy={150 - i * 12} r={2 + Math.random() * 3} fill="white" opacity={0.7} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
            <text x="150" y="195" textAnchor="middle" fontSize="10" fill="hsl(160, 84%, 39%)" fontWeight="bold">NaOH + Phenolphthalein</text>
          </svg>
        </div>
      ),
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Mathematics",
      color: "from-[hsl(258,90%,66%)] to-[hsl(258,90%,50%)]",
      features: ["Interactive coordinate grid plotter", "Fraction bar visualizer", "Number line with operations", "Geometry construction tools"],
      demo: (
        <div className="relative h-full flex items-center justify-center">
          <svg viewBox="0 0 300 200" className="w-full max-w-xs">
            {Array.from({ length: 11 }).map((_, i) => (
              <g key={i}>
                <line x1={30 + i * 24} y1="10" x2={30 + i * 24} y2="190" stroke="hsl(var(--border))" strokeWidth="0.5" />
                <line x1="30" y1={10 + i * 18} x2="270" y2={10 + i * 18} stroke="hsl(var(--border))" strokeWidth="0.5" />
              </g>
            ))}
            <line x1="150" y1="10" x2="150" y2="190" stroke="hsl(222, 84%, 5%)" strokeWidth="1.5" />
            <line x1="30" y1="100" x2="270" y2="100" stroke="hsl(222, 84%, 5%)" strokeWidth="1.5" />
            <line x1="78" y1="136" x2="222" y2="64" stroke="hsl(258, 90%, 66%)" strokeWidth="2.5" />
            <circle cx="78" cy="136" r="5" fill="hsl(258, 90%, 66%)" />
            <circle cx="150" cy="100" r="5" fill="hsl(258, 90%, 66%)" />
            <circle cx="222" cy="64" r="5" fill="hsl(258, 90%, 66%)" />
            <text x="150" y="195" textAnchor="middle" fontSize="10" fill="hsl(258, 90%, 66%)" fontWeight="bold">y = (2/3)x</text>
          </svg>
        </div>
      ),
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Biology",
      color: "from-[hsl(38,92%,50%)] to-[hsl(25,90%,45%)]",
      features: ["Interactive human anatomy explorer", "Virtual microscope with zoom", "Genetics Punnett square lab", "Cell structure exploration"],
      demo: (
        <div className="relative h-full flex items-center justify-center">
          <svg viewBox="0 0 300 200" className="w-full max-w-xs">
            <circle cx="150" cy="100" r="85" fill="white" stroke="hsl(var(--border))" strokeWidth="3" />
            {[[110, 70], [170, 60], [130, 120], [180, 130], [100, 140]].map(([cx, cy], i) => (
              <g key={i}>
                <ellipse cx={cx} cy={cy} rx={30} ry={25} fill="hsl(120, 30%, 88%)" stroke="hsl(120, 40%, 60%)" strokeWidth="1.5" />
                <ellipse cx={cx} cy={cy} rx={8} ry={6} fill="hsl(270, 50%, 50%)" />
              </g>
            ))}
            <text x="150" y="195" textAnchor="middle" fontSize="10" fill="hsl(38, 92%, 50%)" fontWeight="bold">Leaf Stomata — 400x</text>
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0A0F1E] relative overflow-hidden">
      <AntigravityParticles />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className={`bg-primary/20 text-primary-light border-primary/30 mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`}>
            New — No Equipment Required
          </Badge>
          <h2 className={`font-display font-extrabold text-4xl md:text-5xl text-white mb-4 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "100ms" }}>
            Virtual PCMB Lab
          </h2>
          <ScrollRevealText
            text="Perform real NCERT experiments right in your browser. Build circuits, mix chemicals, plot graphs, and explore anatomy — all interactive."
            className="text-lg text-white/60 max-w-2xl mx-auto"
          />
        </div>

        <div className={`flex justify-center gap-3 mb-10 reveal-base reveal-up ${visible ? "revealed" : ""}`} style={{ transitionDelay: "300ms" }}>
          {labs.map((lab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-300 ${activeTab === i
                ? `bg-gradient-to-r ${lab.color} text-white shadow-lg scale-105`
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}>
              {lab.icon}
              <span className="hidden md:inline">{lab.title}</span>
            </button>
          ))}
        </div>

        <div className={`reveal-base reveal-scale ${visible ? "revealed" : ""}`} style={{ transitionDelay: "400ms" }}>
          <ElectricBorder>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden rounded-2xl">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  <div className={`bg-gradient-to-br ${labs[activeTab].color} p-8 min-h-[320px] flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-float" style={{
                          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.3}s`, animationDuration: `${2 + Math.random() * 3}s`
                        }} />
                      ))}
                    </div>
                    <div className="relative z-10 w-full">{labs[activeTab].demo}</div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="font-display font-bold text-2xl text-white mb-2">{labs[activeTab].title} Lab</h3>
                    <p className="text-white/50 text-sm mb-6">Interactive experiments aligned with NCERT curriculum</p>
                    <ul className="space-y-4">
                      {labs[activeTab].features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-white/80 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/virtual-lab" className="mt-8">
                      <Button size="lg" className="bg-white text-foreground hover:bg-white/90 gap-2 glow-hover">
                        Enter Virtual Lab <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ElectricBorder>
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
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 icon-target transition-transform duration-300">
                    {f.icon}
                  </div>
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

/* ── Parent Section ────────────────────────────────── */
function ParentSection() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`reveal-base reveal-left ${visible ? "revealed" : ""}`}>
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              <Shield className="w-3 h-3 mr-1" /> For Parents
            </Badge>
            <h2 className="font-display font-extrabold text-4xl text-foreground mb-6 leading-tight">
              Stay connected to your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" style={{ WebkitBackgroundClip: "text" }}>
                child's progress
              </span>
            </h2>
            <ScrollRevealText
              text="Track subjects, monitor streaks, download PDF reports, and identify weak areas — all from your own secure parent dashboard."
              className="text-lg text-muted-foreground mb-8"
            />
            <div className="space-y-4 mb-8">
              {[
                { icon: <BarChart3 className="w-5 h-5 text-primary" />, text: "Subject-wise progress tracking with trends" },
                { icon: <Users className="w-5 h-5 text-accent" />, text: "Monitor multiple children from one account" },
                { icon: <Download className="w-5 h-5 text-success" />, text: "Download detailed PDF progress reports" },
                { icon: <TrendingUp className="w-5 h-5 text-primary" />, text: "AI-powered weak area identification" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <span className="text-foreground">{f.text}</span>
                </div>
              ))}
            </div>
            <Link to="/parent/login">
              <Button size="lg" className="gap-2 h-12 px-8 glow-hover">
                <Shield className="w-4 h-4" /> Parent Login <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className={`reveal-base reveal-right ${visible ? "revealed" : ""}`} style={{ transitionDelay: "300ms" }}>
            <ElectricBorder>
              <div className="bg-card rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">AK</div>
                  <div>
                    <p className="font-display font-semibold text-foreground">Arjun Kumar</p>
                    <p className="text-sm text-muted-foreground">Class 9 - CBSE</p>
                  </div>
                  <Badge className="ml-auto bg-success/10 text-success border-success/20">12 Day Streak</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { subject: "Science", progress: 78, color: "bg-[hsl(217,91%,60%)]" },
                    { subject: "Math", progress: 62, color: "bg-[hsl(258,90%,66%)]" },
                    { subject: "Social", progress: 48, color: "bg-[hsl(160,84%,39%)]" },
                    { subject: "English", progress: 71, color: "bg-[hsl(38,92%,50%)]" },
                  ].map((s) => (
                    <div key={s.subject} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground w-16">{s.subject}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full transition-all duration-1000`} style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-sm font-bold text-foreground w-10">{s.progress}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Last active: Today, 9:30 PM</span>
                  <Button variant="outline" size="sm" className="gap-1 text-xs"><Download className="w-3 h-3" /> PDF</Button>
                </div>
              </div>
            </ElectricBorder>
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
        <h2 className={`font-display font-bold text-3xl text-center text-foreground mb-12 reveal-base reveal-up ${visible ? "revealed" : ""}`}>What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className={`card-hover transition-all duration-500 group reveal-base reveal-rotate ${visible ? "revealed" : ""}`} style={{ transitionDelay: `${200 + i * 180}ms` }}>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${j * 50}ms` }} />
                  ))}
                </div>
                <p className="text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <p className="text-sm text-muted-foreground">{t.name}, {t.location}</p>
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
          <Link to="/pricing" className="text-primary hover:underline text-sm font-medium">
            See Full Pricing <ArrowRight className="inline w-4 h-4" />
          </Link>
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
      { label: "Virtual Lab", path: "/virtual-lab" },
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
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">SG</div>
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
      <SubjectsStrip />
      <VirtualLabShowcase />
      <HowItWorks />
      <FeatureHighlights />
      <ParentSection />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
