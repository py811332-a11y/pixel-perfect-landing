import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

/* Floating particle */
function Particle({ index }: { index: number }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: 4 + Math.random() * 8,
    height: 4 + Math.random() * 8,
    borderRadius: "50%",
    background: `hsl(${200 + Math.random() * 60}, 80%, ${50 + Math.random() * 30}%)`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animation: `float ${3 + Math.random() * 5}s ease-in-out infinite`,
    animationDelay: `${index * 0.3}s`,
    opacity: 0.4 + Math.random() * 0.4,
    filter: `blur(${Math.random() * 2}px)`,
  };
  return <div style={style} />;
}

/* Glitch text effect */
function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <span className="font-display font-black text-[12rem] md:text-[16rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/30 to-primary/5 select-none">
        {text}
      </span>
      {glitch && (
        <>
          <span className="absolute inset-0 font-display font-black text-[12rem] md:text-[16rem] leading-none text-primary/20 select-none" style={{ transform: "translate(4px, -2px)", clipPath: "inset(20% 0 30% 0)" }}>
            {text}
          </span>
          <span className="absolute inset-0 font-display font-black text-[12rem] md:text-[16rem] leading-none text-accent/20 select-none" style={{ transform: "translate(-4px, 2px)", clipPath: "inset(50% 0 10% 0)" }}>
            {text}
          </span>
        </>
      )}
    </div>
  );
}

/* Mouse-following spotlight */
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current) {
      ref.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, hsl(var(--primary) / 0.06), transparent 70%)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 transition-all duration-300" />;
}

export default function NotFound() {
  const location = useLocation();
  const [typed, setTyped] = useState("");
  const fullPath = location.pathname;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(fullPath.slice(0, i + 1));
      i++;
      if (i >= fullPath.length) clearInterval(timer);
    }, 80);
    return () => clearInterval(timer);
  }, [fullPath]);

  return (
    <div className="relative min-h-screen bg-[#0A0F1E] flex items-center justify-center overflow-hidden">
      <Spotlight />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/15 rounded-full blur-[150px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center px-6">
        <GlitchText text="404" />

        <div className="mt-[-2rem] md:mt-[-3rem]">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-4 animate-fade-up">
            Lost in the cosmos
          </h2>
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 mb-6 animate-fade-up stagger-1">
            <Search className="w-4 h-4 text-white/40" />
            <span className="text-white/40 font-mono text-sm">{typed}<span className="animate-pulse text-primary">|</span></span>
          </div>
          <p className="text-white/50 text-lg max-w-md mx-auto mb-8 animate-fade-up stagger-2">
            This page doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up stagger-3">
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8 glow-hover">
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2 h-12 px-8" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </div>
        </div>

        {/* Floating code snippets */}
        <div className="absolute -top-20 -left-20 text-white/5 font-mono text-xs rotate-12 select-none hidden md:block">
          {"<Route path=\"*\" />"}<br />
          {"// page not found"}<br />
          {"return <NotFound />;"}
        </div>
        <div className="absolute -bottom-10 -right-20 text-white/5 font-mono text-xs -rotate-6 select-none hidden md:block">
          {"HTTP/1.1 404"}<br />
          {"Content-Type: text/html"}<br />
          {"X-Error: not-found"}
        </div>
      </div>
    </div>
  );
}
