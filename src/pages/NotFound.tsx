import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const Hyperspeed = lazy(() => import("@/components/Hyperspeed"));

/* Glitch text effect */
function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block select-none">
      <span
        className="font-display font-black text-[10rem] md:text-[16rem] leading-none text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)",
          WebkitBackgroundClip: "text",
        }}
      >
        {text}
      </span>
      {glitch && (
        <>
          <span
            className="absolute inset-0 font-display font-black text-[10rem] md:text-[16rem] leading-none"
            style={{
              color: "hsl(var(--primary) / 0.4)",
              transform: "translate(6px, -3px)",
              clipPath: "inset(15% 0 35% 0)",
              textShadow: "0 0 20px hsl(var(--primary) / 0.6)",
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 font-display font-black text-[10rem] md:text-[16rem] leading-none"
            style={{
              color: "hsl(var(--accent) / 0.4)",
              transform: "translate(-6px, 3px)",
              clipPath: "inset(55% 0 5% 0)",
              textShadow: "0 0 20px hsl(var(--accent) / 0.6)",
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 font-display font-black text-[10rem] md:text-[16rem] leading-none"
            style={{
              color: "hsl(38, 92%, 50%, 0.3)",
              transform: "translate(3px, 5px)",
              clipPath: "inset(40% 0 25% 0)",
              textShadow: "0 0 15px hsl(38, 92%, 50%, 0.5)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
}

/* Scanlines overlay */
function Scanlines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
      }}
    />
  );
}

/* Mouse-following spotlight */
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current) {
      ref.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, hsl(var(--primary) / 0.08), transparent 70%)`;
    }
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);
  return <div ref={ref} className="fixed inset-0 pointer-events-none z-[2] transition-all duration-300" />;
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

  const hyperspeedOptions = useMemo(() => ({
    distortion: "turbulentDistortion",
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
      leftCars: [0xff3040, 0xd82050, 0xff1030],
      rightCars: [0x3060ff, 0x2040d8, 0x4080ff],
      sticks: 0xff3040,
    },
  }), []);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Hyperspeed BG */}
      <div className="absolute inset-0 opacity-30">
        <Suspense fallback={null}>
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </Suspense>
      </div>

      <Scanlines />
      <Spotlight />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[hsl(var(--primary)/0.12)] rounded-full blur-[150px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-[hsl(var(--accent)/0.08)] rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center px-6">
        <GlitchText text="404" />

        <div className="mt-[-2rem] md:mt-[-4rem]">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-4 animate-fade-up">
            Lost in the cosmos
          </h2>
          <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-lg px-4 py-2.5 mb-6 animate-fade-up stagger-1">
            <Search className="w-4 h-4 text-white/40" />
            <span className="text-white/50 font-mono text-sm">
              {typed}
              <span className="animate-pulse text-[hsl(var(--primary))]">|</span>
            </span>
          </div>
          <p className="text-white/50 text-lg max-w-md mx-auto mb-8 animate-fade-up stagger-2">
            This page doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up stagger-3">
            <Link to="/">
              <Button
                size="lg"
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] text-[hsl(var(--primary-foreground))] gap-2 h-12 px-8 shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-shadow"
              >
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 gap-2 h-12 px-8"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </div>
        </div>

        {/* Floating code snippets */}
        <div className="absolute -top-20 -left-20 text-white/[0.04] font-mono text-xs rotate-12 select-none hidden md:block whitespace-pre">
          {"<Route path=\"*\" />\n"}
          {"// page not found\n"}
          {"return <NotFound />;"}
        </div>
        <div className="absolute -bottom-10 -right-20 text-white/[0.04] font-mono text-xs -rotate-6 select-none hidden md:block whitespace-pre">
          {"HTTP/1.1 404\n"}
          {"Content-Type: text/html\n"}
          {"X-Error: not-found"}
        </div>
      </div>
    </div>
  );
}
