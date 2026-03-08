import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, RotateCcw, Droplets, FlaskConical, Beaker } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

type Chemical = { id: string; name: string; color: string; type: "acid" | "base" | "salt" | "indicator" | "neutral" };

const chemicals: Chemical[] = [
  { id: "hcl", name: "HCl (Hydrochloric Acid)", color: "hsla(0, 0%, 90%, 0.9)", type: "acid" },
  { id: "naoh", name: "NaOH (Sodium Hydroxide)", color: "hsla(210, 50%, 85%, 0.9)", type: "base" },
  { id: "h2so4", name: "H₂SO₄ (Sulfuric Acid)", color: "hsla(0, 0%, 80%, 0.9)", type: "acid" },
  { id: "phenol", name: "Phenolphthalein", color: "hsla(0, 0%, 95%, 0.5)", type: "indicator" },
  { id: "litmus", name: "Litmus Solution", color: "hsla(258, 60%, 55%, 0.8)", type: "indicator" },
  { id: "water", name: "Distilled Water", color: "hsla(200, 80%, 85%, 0.6)", type: "neutral" },
  { id: "cuso4", name: "CuSO₄ (Copper Sulfate)", color: "hsla(210, 90%, 55%, 0.8)", type: "salt" },
  { id: "naoh2", name: "NaOH Solution", color: "hsla(210, 30%, 90%, 0.9)", type: "base" },
];

type Reaction = { result: string; color: string; gas?: string; temp?: string; equation: string };

function getReaction(a: string, b: string): Reaction | null {
  const key = [a, b].sort().join("+");
  const reactions: Record<string, Reaction> = {
    "hcl+naoh": { result: "NaCl + H₂O (Salt + Water)", color: "hsla(0, 0%, 90%, 0.7)", temp: "Exothermic — beaker feels warm!", equation: "HCl + NaOH → NaCl + H₂O" },
    "hcl+naoh2": { result: "NaCl + H₂O", color: "hsla(0, 0%, 90%, 0.7)", temp: "Exothermic", equation: "HCl + NaOH → NaCl + H₂O" },
    "hcl+litmus": { result: "Litmus turns RED (Acidic)", color: "hsla(0, 80%, 50%, 0.8)", equation: "Acid + Litmus → Red colour" },
    "naoh+litmus": { result: "Litmus turns BLUE (Basic)", color: "hsla(220, 80%, 45%, 0.8)", equation: "Base + Litmus → Blue colour" },
    "naoh+phenol": { result: "Turns PINK (Basic detected!)", color: "hsla(330, 80%, 65%, 0.8)", equation: "Phenolphthalein + Base → Pink" },
    "hcl+phenol": { result: "Stays COLORLESS (Acidic)", color: "hsla(0, 0%, 95%, 0.5)", equation: "Phenolphthalein + Acid → Colourless" },
    "cuso4+naoh": { result: "Cu(OH)₂ precipitate — BLUE solid!", color: "hsla(210, 80%, 45%, 0.9)", equation: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄" },
    "cuso4+naoh2": { result: "Cu(OH)₂ blue precipitate!", color: "hsla(210, 80%, 45%, 0.9)", equation: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄" },
    "h2so4+naoh": { result: "Na₂SO₄ + H₂O", color: "hsla(0, 0%, 88%, 0.7)", temp: "Exothermic", equation: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O" },
    "h2so4+naoh2": { result: "Na₂SO₄ + H₂O", color: "hsla(0, 0%, 88%, 0.7)", temp: "Exothermic", equation: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O" },
    "h2so4+litmus": { result: "Litmus turns RED", color: "hsla(0, 80%, 50%, 0.8)", equation: "Strong acid + Litmus → Red" },
    "cuso4+water": { result: "Blue solution — dissolves", color: "hsla(210, 85%, 60%, 0.6)", equation: "CuSO₄ dissolves in water → blue solution" },
  };
  return reactions[key] || null;
}

function ChemicalMixer() {
  const [beaker, setBeaker] = useState<Chemical[]>([]);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [mixing, setMixing] = useState(false);
  const [bubbles, setBubbles] = useState(false);

  const addToBeaker = (chem: Chemical) => {
    if (beaker.length >= 2) return;
    const next = [...beaker, chem];
    setBeaker(next);

    if (next.length === 2) {
      setMixing(true);
      setBubbles(true);
      setTimeout(() => {
        const r = getReaction(next[0].id, next[1].id);
        setReaction(r);
        setMixing(false);
        setTimeout(() => setBubbles(false), 2000);
      }, 1500);
    }
  };

  const reset = () => { setBeaker([]); setReaction(null); setMixing(false); setBubbles(false); };

  const beakerColor = reaction ? reaction.color : beaker.length === 1 ? beaker[0].color : "hsla(200, 80%, 90%, 0.3)";

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chemical shelf */}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" /> Chemical Shelf
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {chemicals.map(chem => (
              <button
                key={chem.id}
                onClick={() => addToBeaker(chem)}
                disabled={beaker.length >= 2}
                className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left disabled:opacity-40 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-border" style={{ background: chem.color }} />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{chem.name}</span>
                </div>
                <Badge variant="secondary" className="mt-1 text-[10px]">{chem.type}</Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Beaker */}
        <div className="flex flex-col items-center">
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Beaker className="w-4 h-4 text-primary" /> Reaction Beaker
          </h3>
          <div className="relative w-48 h-64">
            {/* Beaker shape */}
            <svg viewBox="0 0 200 260" className="w-full h-full">
              {/* Beaker outline */}
              <path d="M40,20 L40,200 Q40,240 80,240 L120,240 Q160,240 160,200 L160,20" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
              <line x1="30" y1="20" x2="170" y2="20" stroke="hsl(var(--border))" strokeWidth="4" strokeLinecap="round" />

              {/* Liquid */}
              <path d={`M43,${beaker.length > 0 ? 100 : 200} L43,200 Q43,237 80,237 L120,237 Q157,237 157,200 L157,${beaker.length > 0 ? 100 : 200}`}
                fill={beakerColor}
                className={`transition-all duration-1000 ${mixing ? "animate-pulse" : ""}`}
              />

              {/* Bubbles */}
              {bubbles && Array.from({ length: 12 }).map((_, i) => (
                <circle key={i}
                  cx={70 + Math.random() * 60}
                  cy={220 - Math.random() * 100}
                  r={2 + Math.random() * 4}
                  fill="white"
                  opacity={0.6}
                  className="animate-float"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: `${1 + Math.random()}s` }}
                />
              ))}

              {/* Precipitate */}
              {reaction && reaction.result.includes("precipitate") && (
                <ellipse cx="100" cy="230" rx="35" ry="6" fill={reaction.color} opacity={0.8} />
              )}

              {/* Markings */}
              {[100, 140, 180].map((y, i) => (
                <g key={i}>
                  <line x1="42" y1={y} x2="55" y2={y} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                  <text x="58" y={y + 4} fontSize="8" fill="hsl(var(--muted-foreground))">{300 - i * 100}ml</text>
                </g>
              ))}
            </svg>
          </div>

          {/* Status */}
          <div className="mt-4 text-center w-full">
            {beaker.length === 0 && <p className="text-sm text-muted-foreground">Select 2 chemicals to mix</p>}
            {beaker.length === 1 && <p className="text-sm text-foreground">Added: <strong>{beaker[0].name}</strong> — pick one more</p>}
            {mixing && (
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 animate-pulse">
                <p className="text-sm font-medium text-accent flex items-center justify-center gap-2">
                  <Droplets className="w-4 h-4" /> Mixing in progress...
                </p>
              </div>
            )}
            {reaction && !mixing && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/20 space-y-2">
                <p className="text-sm font-bold text-success">{reaction.result}</p>
                <p className="text-xs font-mono text-foreground">{reaction.equation}</p>
                {reaction.temp && <p className="text-xs text-accent">{reaction.temp}</p>}
              </div>
            )}
            {reaction === null && beaker.length === 2 && !mixing && (
              <div className="p-3 rounded-lg bg-muted text-sm text-muted-foreground">No known reaction between these chemicals.</div>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={reset} className="mt-3 gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset Beaker
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── pH Lab ──────────────────────────────── */
function PHLab() {
  const solutions = [
    { name: "Lemon Juice", ph: 2, color: "hsl(0, 85%, 55%)" },
    { name: "Vinegar", ph: 3, color: "hsl(15, 80%, 55%)" },
    { name: "Coffee", ph: 5, color: "hsl(30, 70%, 50%)" },
    { name: "Milk", ph: 6.5, color: "hsl(45, 60%, 55%)" },
    { name: "Pure Water", ph: 7, color: "hsl(120, 50%, 50%)" },
    { name: "Blood", ph: 7.4, color: "hsl(140, 45%, 50%)" },
    { name: "Baking Soda", ph: 8.5, color: "hsl(200, 60%, 50%)" },
    { name: "Soap", ph: 10, color: "hsl(230, 70%, 55%)" },
    { name: "Bleach", ph: 13, color: "hsl(270, 80%, 45%)" },
  ];
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">Click a solution to dip the pH paper and see the result.</p>

      {/* pH scale */}
      <div className="flex mb-6 rounded-lg overflow-hidden h-8">
        {Array.from({ length: 14 }, (_, i) => i + 1).map(ph => (
          <div key={ph} className="flex-1 flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: `hsl(${(14 - ph) * 20}, 70%, 50%)` }}>
            {ph}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mb-8">
        <span>Acidic</span><span>Neutral</span><span>Basic</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {solutions.map((sol, i) => (
          <button key={i} onClick={() => setSelected(i)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${selected === i ? "border-primary bg-primary/5 shadow-lg scale-[1.02]" : "border-border hover:border-primary/30"}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full" style={{ background: sol.color }} />
              <span className="text-sm font-medium text-foreground">{sol.name}</span>
            </div>
            {selected === i && (
              <div className="animate-fade-up">
                <p className="text-2xl font-display font-bold" style={{ color: sol.color }}>pH {sol.ph}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {sol.ph < 7 ? "Acidic" : sol.ph === 7 ? "Neutral" : "Basic"}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChemistryLab() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/virtual-lab"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Chemistry Lab</h1>
            <p className="text-muted-foreground text-sm">Mix chemicals, observe reactions, test pH</p>
          </div>
        </div>

        <Tabs defaultValue="mixer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mixer">Chemical Mixer</TabsTrigger>
            <TabsTrigger value="ph">pH Indicator Lab</TabsTrigger>
          </TabsList>
          <TabsContent value="mixer">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Mix Chemicals & Observe Reactions</h2>
              <ChemicalMixer />
            </CardContent></Card>
          </TabsContent>
          <TabsContent value="ph">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">pH Indicator Lab</h2>
              <PHLab />
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
