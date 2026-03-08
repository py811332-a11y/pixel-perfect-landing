import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Battery, Lightbulb, RotateCcw, Play, Pause, Zap } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

/* ── Circuit Builder ──────────────────── */
type CircuitComponent = { id: string; type: "battery" | "bulb" | "resistor" | "wire"; x: number; y: number };

function CircuitBuilder() {
  const [components, setComponents] = useState<CircuitComponent[]>([
    { id: "bat1", type: "battery", x: 80, y: 200 },
  ]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const [circuitClosed, setCircuitClosed] = useState(false);

  const palette: { type: CircuitComponent["type"]; label: string }[] = [
    { type: "battery", label: "Battery" },
    { type: "bulb", label: "Bulb" },
    { type: "resistor", label: "Resistor" },
    { type: "wire", label: "Wire" },
  ];

  const addComponent = (type: CircuitComponent["type"]) => {
    const id = `${type}-${Date.now()}`;
    setComponents(prev => [...prev, { id, type, x: 200 + Math.random() * 200, y: 100 + Math.random() * 200 }]);
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    const comp = components.find(c => c.id === id);
    if (!comp) return;
    setDragging(id);
    setOffset({ x: e.clientX - comp.x, y: e.clientY - comp.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setComponents(prev => prev.map(c =>
      c.id === dragging ? { ...c, x: e.clientX - rect.left - offset.x + c.x - (e.clientX - offset.x - rect.left - c.x) * 0 + (e.clientX - offset.x) - (e.clientX - offset.x), y: e.clientY - rect.top - offset.y + c.y - (e.clientY - offset.y - rect.top - c.y) * 0 + (e.clientY - offset.y) - (e.clientY - offset.y) } : c
    ));
    // Simplified: just update position
    setComponents(prev => prev.map(c =>
      c.id === dragging ? { ...c, x: e.clientX - rect.left, y: e.clientY - rect.top } : c
    ));
  }, [dragging, offset]);

  const hasBattery = components.some(c => c.type === "battery");
  const hasBulb = components.some(c => c.type === "bulb");
  const hasWire = components.filter(c => c.type === "wire").length >= 2;

  useEffect(() => {
    setCircuitClosed(hasBattery && hasBulb && hasWire);
  }, [hasBattery, hasBulb, hasWire]);

  const getComponentShape = (comp: CircuitComponent) => {
    const isGlowing = circuitClosed && comp.type === "bulb";
    switch (comp.type) {
      case "battery":
        return (
          <g>
            <rect x={-25} y={-15} width={50} height={30} rx={4} fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth={2} />
            <line x1={-8} y1={-8} x2={-8} y2={8} stroke="hsl(var(--primary))" strokeWidth={3} />
            <line x1={8} y1={-12} x2={8} y2={12} stroke="hsl(var(--primary))" strokeWidth={2} />
            <text x={0} y={-20} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">9V</text>
          </g>
        );
      case "bulb":
        return (
          <g>
            <circle r={18} fill={isGlowing ? "hsl(38, 92%, 50%)" : "hsl(var(--muted))"} stroke="hsl(var(--accent))" strokeWidth={2} opacity={isGlowing ? 1 : 0.6} />
            {isGlowing && <circle r={28} fill="hsl(38, 92%, 50%)" opacity={0.2} />}
            {isGlowing && <circle r={38} fill="hsl(38, 92%, 50%)" opacity={0.1} />}
            <line x1={-8} y1={-8} x2={8} y2={8} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
            <line x1={8} y1={-8} x2={-8} y2={8} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          </g>
        );
      case "resistor":
        return (
          <g>
            <path d="M-25,0 L-15,-10 L-5,10 L5,-10 L15,10 L25,0" fill="none" stroke="hsl(var(--destructive))" strokeWidth={2} />
            <text x={0} y={-15} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">100Ω</text>
          </g>
        );
      case "wire":
        return (
          <g>
            <line x1={-20} y1={0} x2={20} y2={0} stroke={circuitClosed ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} strokeWidth={3} strokeLinecap="round" />
            <circle r={4} cx={-20} fill="hsl(var(--primary))" />
            <circle r={4} cx={20} fill="hsl(var(--primary))" />
          </g>
        );
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {palette.map(p => (
          <Button key={p.type} variant="outline" size="sm" onClick={() => addComponent(p.type)} className="gap-1.5">
            {p.type === "battery" && <Battery className="w-3.5 h-3.5" />}
            {p.type === "bulb" && <Lightbulb className="w-3.5 h-3.5" />}
            {p.type === "resistor" && <Zap className="w-3.5 h-3.5" />}
            {p.label}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={() => setComponents([{ id: "bat1", type: "battery", x: 80, y: 200 }])}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
        </Button>
      </div>

      {circuitClosed && (
        <div className="mb-3 p-3 rounded-lg bg-success/10 border border-success/20 text-sm text-success font-medium flex items-center gap-2">
          <Zap className="w-4 h-4" /> Circuit complete! The bulb is glowing. Current = V/R = 9V/100Ω = 0.09A
        </div>
      )}

      <div className="border-2 border-dashed border-border rounded-xl bg-muted/30 relative overflow-hidden">
        <svg
          ref={svgRef}
          width="100%" height={400}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setDragging(null)}
          onMouseLeave={() => setDragging(null)}
          className="cursor-default"
        >
          {/* Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Draw connections */}
          {components.length > 1 && components.map((c, i) => {
            if (i === 0) return null;
            const prev = components[i - 1];
            return (
              <line key={`wire-${i}`} x1={prev.x} y1={prev.y} x2={c.x} y2={c.y}
                stroke={circuitClosed ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={circuitClosed ? 2 : 1}
                strokeDasharray={circuitClosed ? "0" : "6 4"} />
            );
          })}

          {/* Components */}
          {components.map(comp => (
            <g key={comp.id} transform={`translate(${comp.x}, ${comp.y})`}
              onMouseDown={(e) => handleMouseDown(comp.id, e)}
              className="cursor-grab active:cursor-grabbing"
            >
              {getComponentShape(comp)}
            </g>
          ))}

          {components.length <= 1 && (
            <text x="50%" y="50%" textAnchor="middle" fontSize={14} fill="hsl(var(--muted-foreground))">
              Add components above and drag them to build your circuit
            </text>
          )}
        </svg>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Drag components to position them. Add a battery + bulb + 2 wires to complete the circuit.</p>
    </div>
  );
}

/* ── Pendulum ─────────────────────────── */
function PendulumSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [length, setLength] = useState([200]);
  const [gravity, setGravity] = useState([9.8]);
  const [running, setRunning] = useState(true);
  const angleRef = useRef(Math.PI / 4);
  const velRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const pivotX = w / 2;
    const pivotY = 60;
    const dt = 0.03;

    const draw = () => {
      if (running) {
        const g = gravity[0];
        const l = length[0] / 100;
        const acc = -(g / l) * Math.sin(angleRef.current);
        velRef.current += acc * dt;
        velRef.current *= 0.999; // damping
        angleRef.current += velRef.current * dt;
      }

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "hsl(210, 40%, 98%)";
      ctx.fillRect(0, 0, w, h);

      // Pivot
      ctx.fillStyle = "hsl(215, 16%, 47%)";
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // String
      const L = length[0];
      const bobX = pivotX + L * Math.sin(angleRef.current);
      const bobY = pivotY + L * Math.cos(angleRef.current);

      ctx.strokeStyle = "hsl(222, 84%, 5%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Bob
      ctx.fillStyle = "hsl(224, 76%, 40%)";
      ctx.beginPath();
      ctx.arc(bobX, bobY, 16, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      const gradient = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, 30);
      gradient.addColorStop(0, "hsla(224, 76%, 40%, 0.3)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(bobX, bobY, 30, 0, Math.PI * 2);
      ctx.fill();

      // Info
      const period = 2 * Math.PI * Math.sqrt((length[0] / 100) / gravity[0]);
      ctx.fillStyle = "hsl(215, 16%, 47%)";
      ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(`T = 2π√(L/g) = ${period.toFixed(2)}s`, 10, h - 15);
      ctx.fillText(`θ = ${(angleRef.current * 180 / Math.PI).toFixed(1)}°`, 10, h - 35);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [length, gravity, running]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Length: {length[0]}cm</label>
          <Slider value={length} onValueChange={setLength} min={80} max={300} step={10} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Gravity: {gravity[0]} m/s²</label>
          <Slider value={gravity} onValueChange={setGravity} min={1} max={20} step={0.1} />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Button size="sm" variant="outline" onClick={() => setRunning(!running)} className="gap-1.5">
          {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {running ? "Pause" : "Play"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { angleRef.current = Math.PI / 4; velRef.current = 0; }}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
        </Button>
      </div>
      <canvas ref={canvasRef} width={600} height={400} className="w-full border border-border rounded-xl" />
      <p className="text-xs text-muted-foreground mt-2">Adjust length and gravity to see how they affect the pendulum's period.</p>
    </div>
  );
}

/* ── Velocity-Time Graph ──────────────── */
function VelocityTimeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [velocity, setVelocity] = useState([0]);
  const [acceleration, setAcceleration] = useState([2]);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [points, setPoints] = useState<{ t: number; v: number }[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    let t = time;
    const tick = () => {
      t += 0.05;
      const v = velocity[0] + acceleration[0] * t;
      setTime(t);
      setPoints(prev => [...prev, { t, v }]);
      if (t < 10) animRef.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const padL = 50, padB = 40, padT = 20, padR = 20;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "hsl(210, 40%, 98%)";
    ctx.fillRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = "hsl(222, 84%, 5%)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, h - padB);
    ctx.lineTo(w - padR, h - padB);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "hsl(215, 16%, 47%)";
    ctx.font = "12px sans-serif";
    ctx.fillText("Time (s)", w / 2, h - 5);
    ctx.save();
    ctx.translate(12, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Velocity (m/s)", 0, 0);
    ctx.restore();

    // Grid
    ctx.strokeStyle = "hsl(214, 32%, 91%)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = padL + (i / 10) * (w - padL - padR);
      ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, h - padB); ctx.stroke();
      ctx.fillStyle = "hsl(215, 16%, 47%)";
      ctx.fillText(`${i}`, x - 3, h - padB + 15);
    }
    for (let i = 0; i <= 5; i++) {
      const y = h - padB - (i / 5) * (h - padT - padB);
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
      ctx.fillText(`${i * 10}`, padL - 25, y + 4);
    }

    // Plot
    if (points.length > 1) {
      ctx.strokeStyle = "hsl(224, 76%, 40%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      points.forEach((p, i) => {
        const x = padL + (p.t / 10) * (w - padL - padR);
        const y = h - padB - (p.v / 50) * (h - padT - padB);
        if (i === 0) ctx.moveTo(x, Math.max(padT, y));
        else ctx.lineTo(x, Math.max(padT, y));
      });
      ctx.stroke();

      // Area under curve
      ctx.fillStyle = "hsla(224, 76%, 40%, 0.1)";
      ctx.beginPath();
      ctx.moveTo(padL + (points[0].t / 10) * (w - padL - padR), h - padB);
      points.forEach(p => {
        const x = padL + (p.t / 10) * (w - padL - padR);
        const y = h - padB - (p.v / 50) * (h - padT - padB);
        ctx.lineTo(x, Math.max(padT, y));
      });
      ctx.lineTo(padL + (points[points.length - 1].t / 10) * (w - padL - padR), h - padB);
      ctx.fill();
    }

    // Current values
    if (points.length > 0) {
      const last = points[points.length - 1];
      ctx.fillStyle = "hsl(224, 76%, 40%)";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(`v = ${last.v.toFixed(1)} m/s | t = ${last.t.toFixed(1)}s | Distance = ${(0.5 * acceleration[0] * last.t * last.t + velocity[0] * last.t).toFixed(1)}m`, padL + 5, padT + 15);
    }
  }, [points]);

  const reset = () => { setTime(0); setPoints([]); setRunning(false); };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Initial Velocity: {velocity[0]} m/s</label>
          <Slider value={velocity} onValueChange={(v) => { setVelocity(v); reset(); }} min={0} max={20} step={1} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Acceleration: {acceleration[0]} m/s²</label>
          <Slider value={acceleration} onValueChange={(v) => { setAcceleration(v); reset(); }} min={-5} max={5} step={0.5} />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Button size="sm" onClick={() => { if (!running) { reset(); setRunning(true); } else setRunning(false); }} className="gap-1.5">
          {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
        </Button>
      </div>
      <canvas ref={canvasRef} width={700} height={350} className="w-full border border-border rounded-xl" />
      <p className="text-xs text-muted-foreground mt-2">v = u + at | Area under v-t graph = distance travelled</p>
    </div>
  );
}

/* ── Main ─────────────────────────────── */
export default function PhysicsLab() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/virtual-lab"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Physics Lab</h1>
            <p className="text-muted-foreground text-sm">Build circuits, swing pendulums, plot motion graphs</p>
          </div>
        </div>

        <Tabs defaultValue="circuit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="circuit">Circuit Builder</TabsTrigger>
            <TabsTrigger value="pendulum">Pendulum</TabsTrigger>
            <TabsTrigger value="vt-graph">V-T Graph</TabsTrigger>
          </TabsList>

          <TabsContent value="circuit">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Build a Circuit</h2>
              <CircuitBuilder />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="pendulum">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Simple Pendulum</h2>
              <PendulumSim />
            </CardContent></Card>
          </TabsContent>

          <TabsContent value="vt-graph">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Velocity-Time Graph</h2>
              <VelocityTimeGraph />
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
