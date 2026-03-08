import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Plus, RotateCcw, Trash2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

/* ── Coordinate Grid Plotter ──────────── */
function CoordinatePlotter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [showLine, setShowLine] = useState(false);
  const [inputX, setInputX] = useState("");
  const [inputY, setInputY] = useState("");

  const scale = 30;
  const cx = 350, cy = 250;

  const addPoint = () => {
    const x = parseFloat(inputX), y = parseFloat(inputY);
    if (!isNaN(x) && !isNaN(y) && x >= -10 && x <= 10 && y >= -7 && y <= 7) {
      setPoints(prev => [...prev, { x, y }]);
      setInputX(""); setInputY("");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "hsl(210, 40%, 98%)";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "hsl(214, 32%, 91%)";
    ctx.lineWidth = 0.5;
    for (let x = -10; x <= 10; x++) {
      ctx.beginPath(); ctx.moveTo(cx + x * scale, 0); ctx.lineTo(cx + x * scale, h); ctx.stroke();
    }
    for (let y = -8; y <= 8; y++) {
      ctx.beginPath(); ctx.moveTo(0, cy + y * scale); ctx.lineTo(w, cy + y * scale); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "hsl(222, 84%, 5%)";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

    // Axis labels
    ctx.fillStyle = "hsl(215, 16%, 47%)";
    ctx.font = "10px sans-serif";
    for (let x = -10; x <= 10; x++) {
      if (x !== 0) ctx.fillText(`${x}`, cx + x * scale - 3, cy + 14);
    }
    for (let y = -7; y <= 7; y++) {
      if (y !== 0) ctx.fillText(`${-y}`, cx + 5, cy + y * scale + 4);
    }
    ctx.fillText("O", cx + 4, cy + 14);
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("X", w - 15, cy - 8);
    ctx.fillText("Y", cx + 8, 15);

    // Line between points
    if (showLine && points.length >= 2) {
      ctx.strokeStyle = "hsla(224, 76%, 40%, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const sorted = [...points].sort((a, b) => a.x - b.x);
      sorted.forEach((p, i) => {
        const px = cx + p.x * scale, py = cy - p.y * scale;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Slope
      if (points.length === 2) {
        const dx = points[1].x - points[0].x;
        const dy = points[1].y - points[0].y;
        if (dx !== 0) {
          const slope = dy / dx;
          const intercept = points[0].y - slope * points[0].x;
          ctx.fillStyle = "hsl(224, 76%, 40%)";
          ctx.font = "bold 12px sans-serif";
          ctx.fillText(`Slope = ${slope.toFixed(2)} | y = ${slope.toFixed(1)}x + ${intercept.toFixed(1)}`, 10, 20);
        }
      }
    }

    // Points
    points.forEach((p, i) => {
      const px = cx + p.x * scale, py = cy - p.y * scale;
      ctx.fillStyle = "hsl(224, 76%, 40%)";
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 8px sans-serif";
      ctx.fillText(`${i + 1}`, px - 3, py + 3);
      ctx.fillStyle = "hsl(224, 76%, 40%)";
      ctx.font = "10px sans-serif";
      ctx.fillText(`(${p.x},${p.y})`, px + 9, py + 4);
    });
  }, [points, showLine]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const scaleX = 700 / rect.width;
    const scaleY = 500 / rect.height;
    const x = Math.round((rawX * scaleX - cx) / scale);
    const y = Math.round(-(rawY * scaleY - cy) / scale);
    if (x >= -10 && x <= 10 && y >= -7 && y <= 7) {
      setPoints(prev => [...prev, { x, y }]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 items-end">
        <div className="flex gap-1 items-center">
          <Input placeholder="x" value={inputX} onChange={e => setInputX(e.target.value)} className="w-16 h-8 text-sm" />
          <span className="text-muted-foreground">,</span>
          <Input placeholder="y" value={inputY} onChange={e => setInputY(e.target.value)} className="w-16 h-8 text-sm"
            onKeyDown={e => e.key === "Enter" && addPoint()} />
          <Button size="sm" onClick={addPoint} className="h-8 gap-1"><Plus className="w-3 h-3" /> Plot</Button>
        </div>
        <Button size="sm" variant={showLine ? "default" : "outline"} onClick={() => setShowLine(!showLine)} className="h-8">
          {showLine ? "Hide Line" : "Connect Points"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setPoints([])} className="h-8 gap-1">
          <Trash2 className="w-3 h-3" /> Clear All
        </Button>
      </div>
      <canvas ref={canvasRef} width={700} height={500} className="w-full border border-border rounded-xl cursor-crosshair" onClick={handleCanvasClick} />
      <p className="text-xs text-muted-foreground mt-2">Click on the grid or enter coordinates to plot points. Connect points to find slope.</p>
    </div>
  );
}

/* ── Fraction Bars ────────────────────── */
function FractionBars() {
  const [num1, setNum1] = useState([1]);
  const [den1, setDen1] = useState([4]);
  const [num2, setNum2] = useState([2]);
  const [den2, setDen2] = useState([4]);

  const frac1 = num1[0] / den1[0];
  const frac2 = num2[0] / den2[0];

  const renderBar = (num: number, den: number, color: string) => (
    <div className="flex rounded-lg overflow-hidden h-10 border border-border">
      {Array.from({ length: den }, (_, i) => (
        <div key={i} className="flex-1 flex items-center justify-center text-[10px] font-bold text-white border-r border-white/30 last:border-0 transition-all duration-300"
          style={{ background: i < num ? color : "hsl(var(--muted))", color: i < num ? "white" : "hsl(var(--muted-foreground))" }}>
          {i < num ? "1" : ""}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-xl text-foreground">{num1[0]}/{den1[0]}</span>
          <span className="text-sm text-muted-foreground">= {(frac1 * 100).toFixed(0)}%</span>
        </div>
        {renderBar(num1[0], den1[0], "hsl(224, 76%, 40%)")}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div><label className="text-xs text-muted-foreground">Numerator: {num1[0]}</label>
            <Slider value={num1} onValueChange={setNum1} min={0} max={den1[0]} step={1} /></div>
          <div><label className="text-xs text-muted-foreground">Denominator: {den1[0]}</label>
            <Slider value={den1} onValueChange={v => { setDen1(v); if (num1[0] > v[0]) setNum1(v); }} min={1} max={12} step={1} /></div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm font-display font-bold text-muted-foreground">
          {frac1 > frac2 ? ">" : frac1 < frac2 ? "<" : "="} Compare
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-xl text-foreground">{num2[0]}/{den2[0]}</span>
          <span className="text-sm text-muted-foreground">= {(frac2 * 100).toFixed(0)}%</span>
        </div>
        {renderBar(num2[0], den2[0], "hsl(160, 84%, 39%)")}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div><label className="text-xs text-muted-foreground">Numerator: {num2[0]}</label>
            <Slider value={num2} onValueChange={setNum2} min={0} max={den2[0]} step={1} /></div>
          <div><label className="text-xs text-muted-foreground">Denominator: {den2[0]}</label>
            <Slider value={den2} onValueChange={v => { setDen2(v); if (num2[0] > v[0]) setNum2(v); }} min={1} max={12} step={1} /></div>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm text-foreground font-medium">
            {num1[0]}/{den1[0]} + {num2[0]}/{den2[0]} = {((num1[0] * den2[0] + num2[0] * den1[0]))} / {den1[0] * den2[0]}
            {den1[0] === den2[0] && ` = ${num1[0] + num2[0]}/${den1[0]}`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/* ── Number Line ──────────────────────── */
function NumberLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState([0]);
  const [rangeMin] = useState(-10);
  const [rangeMax] = useState(10);
  const [operation, setOperation] = useState<"none" | "add" | "sub">("none");
  const [opValue, setOpValue] = useState([3]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const cy = h / 2;
    const pad = 40;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "hsl(210, 40%, 98%)";
    ctx.fillRect(0, 0, w, h);

    // Line
    ctx.strokeStyle = "hsl(222, 84%, 5%)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(w - pad, cy); ctx.stroke();

    // Arrowheads
    ctx.beginPath(); ctx.moveTo(w - pad, cy); ctx.lineTo(w - pad - 8, cy - 5); ctx.lineTo(w - pad - 8, cy + 5); ctx.fill();
    ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(pad + 8, cy - 5); ctx.lineTo(pad + 8, cy + 5); ctx.fill();

    // Ticks
    const range = rangeMax - rangeMin;
    for (let i = rangeMin; i <= rangeMax; i++) {
      const x = pad + ((i - rangeMin) / range) * (w - 2 * pad);
      const isZero = i === 0;
      ctx.strokeStyle = isZero ? "hsl(224, 76%, 40%)" : "hsl(215, 16%, 47%)";
      ctx.lineWidth = isZero ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(x, cy - (isZero ? 12 : 8)); ctx.lineTo(x, cy + (isZero ? 12 : 8)); ctx.stroke();
      ctx.fillStyle = isZero ? "hsl(224, 76%, 40%)" : "hsl(215, 16%, 47%)";
      ctx.font = `${isZero ? "bold " : ""}11px sans-serif`;
      ctx.fillText(`${i}`, x - (i < 0 ? 6 : 3), cy + 25);
    }

    // Value marker
    const vx = pad + ((value[0] - rangeMin) / range) * (w - 2 * pad);
    ctx.fillStyle = "hsl(224, 76%, 40%)";
    ctx.beginPath(); ctx.arc(vx, cy, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "white"; ctx.font = "bold 9px sans-serif";
    ctx.fillText(`${value[0]}`, vx - (value[0] < 0 ? 5 : 3), cy + 3);

    // Operation arrow
    if (operation !== "none") {
      const result = operation === "add" ? value[0] + opValue[0] : value[0] - opValue[0];
      const rx = pad + ((Math.min(rangeMax, Math.max(rangeMin, result)) - rangeMin) / range) * (w - 2 * pad);

      ctx.strokeStyle = operation === "add" ? "hsl(160, 84%, 39%)" : "hsl(0, 84%, 60%)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      const arcY = cy - 35;
      ctx.moveTo(vx, cy - 10);
      ctx.quadraticCurveTo((vx + rx) / 2, arcY - 20, rx, cy - 10);
      ctx.stroke();
      ctx.setLineDash([]);

      // Result point
      ctx.fillStyle = operation === "add" ? "hsl(160, 84%, 39%)" : "hsl(0, 84%, 60%)";
      ctx.beginPath(); ctx.arc(rx, cy, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "white"; ctx.font = "bold 9px sans-serif";
      ctx.fillText(`${result}`, rx - (result < 0 ? 5 : 3), cy + 3);

      ctx.fillStyle = "hsl(222, 84%, 5%)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(`${value[0]} ${operation === "add" ? "+" : "−"} ${opValue[0]} = ${result}`, w / 2 - 40, 20);
    }
  }, [value, operation, opValue]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-1 block">Position: {value[0]}</label>
        <Slider value={value} onValueChange={setValue} min={-10} max={10} step={1} />
      </div>
      <div className="flex gap-2 mb-4">
        <Button size="sm" variant={operation === "add" ? "default" : "outline"} onClick={() => setOperation(operation === "add" ? "none" : "add")}>
          + Add
        </Button>
        <Button size="sm" variant={operation === "sub" ? "default" : "outline"} onClick={() => setOperation(operation === "sub" ? "none" : "sub")}>
          − Subtract
        </Button>
        {operation !== "none" && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-sm text-muted-foreground">by</span>
            <Slider value={opValue} onValueChange={setOpValue} min={1} max={10} step={1} className="w-32" />
            <span className="text-sm font-medium text-foreground">{opValue[0]}</span>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} width={700} height={120} className="w-full border border-border rounded-xl" />
    </div>
  );
}

export default function MathLab() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/virtual-lab"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Mathematics Lab</h1>
            <p className="text-muted-foreground text-sm">Plot coordinates, compare fractions, explore number lines</p>
          </div>
        </div>

        <Tabs defaultValue="plotter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plotter">Coordinate Plotter</TabsTrigger>
            <TabsTrigger value="fractions">Fraction Bars</TabsTrigger>
            <TabsTrigger value="numberline">Number Line</TabsTrigger>
          </TabsList>
          <TabsContent value="plotter">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Coordinate Grid Plotter</h2>
              <CoordinatePlotter />
            </CardContent></Card>
          </TabsContent>
          <TabsContent value="fractions">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Fraction Bar Visualizer</h2>
              <FractionBars />
            </CardContent></Card>
          </TabsContent>
          <TabsContent value="numberline">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Number Line Explorer</h2>
              <NumberLine />
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
