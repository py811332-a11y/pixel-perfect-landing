import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

/* ── Human Anatomy Explorer ───────────── */
type Organ = { id: string; name: string; x: number; y: number; w: number; h: number; color: string; info: string; system: string };

const organs: Organ[] = [
  { id: "brain", name: "Brain", x: 145, y: 30, w: 50, h: 40, color: "hsl(330, 60%, 65%)", info: "The control centre of the body. Weighs ~1.4kg. Contains ~86 billion neurons. Controls thinking, memory, movement, and all body functions.", system: "Nervous System" },
  { id: "lungs-l", name: "Left Lung", x: 110, y: 130, w: 45, h: 70, color: "hsl(200, 70%, 60%)", info: "2 lobes (left lung). Performs gas exchange — O₂ in, CO₂ out. Surface area ~70m² (half a tennis court!). Contains ~300 million alveoli.", system: "Respiratory System" },
  { id: "lungs-r", name: "Right Lung", x: 185, y: 125, w: 50, h: 75, color: "hsl(200, 70%, 55%)", info: "3 lobes (right lung). Slightly larger than left lung. Diaphragm contracts to pull air in. Breathing rate: 12-20 breaths/min.", system: "Respiratory System" },
  { id: "heart", name: "Heart", x: 152, y: 145, w: 36, h: 36, color: "hsl(0, 75%, 55%)", info: "A muscular pump with 4 chambers (2 atria, 2 ventricles). Beats ~100,000 times/day. Pumps ~5 litres of blood/minute. Size of your fist.", system: "Circulatory System" },
  { id: "liver", name: "Liver", x: 115, y: 210, w: 55, h: 35, color: "hsl(15, 60%, 45%)", info: "Largest internal organ (~1.5kg). Produces bile for fat digestion. Detoxifies blood. Stores glycogen. Has over 500 functions!", system: "Digestive System" },
  { id: "stomach", name: "Stomach", x: 170, y: 215, w: 45, h: 45, color: "hsl(40, 65%, 55%)", info: "J-shaped muscular bag. pH 1.5-3.5 (very acidic!). Can hold ~1 litre of food. Secretes HCl and pepsin to digest proteins.", system: "Digestive System" },
  { id: "kidneys", name: "Kidneys", x: 130, y: 265, w: 80, h: 30, color: "hsl(0, 50%, 55%)", info: "2 bean-shaped organs. Filter ~180 litres of blood/day. Each has ~1 million nephrons. Produce 1-2 litres of urine/day. Regulate water & electrolytes.", system: "Excretory System" },
  { id: "intestines", name: "Intestines", x: 130, y: 300, w: 80, h: 60, color: "hsl(30, 50%, 60%)", info: "Small intestine: ~6m long, absorbs nutrients. Large intestine: ~1.5m, absorbs water. Villi increase surface area 600x. Contains gut bacteria.", system: "Digestive System" },
];

function AnatomyExplorer() {
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <svg viewBox="0 0 340 420" className="w-full max-w-sm">
          {/* Body outline */}
          <ellipse cx="170" cy="45" rx="35" ry="42" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <rect x="130" y="85" width="80" height="130" rx="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          {/* Torso */}
          <path d="M130,215 Q130,380 150,400 L190,400 Q210,380 210,215" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          {/* Arms */}
          <path d="M130,95 Q80,100 70,180 Q65,210 75,220" fill="none" stroke="hsl(var(--border))" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
          <path d="M210,95 Q260,100 270,180 Q275,210 265,220" fill="none" stroke="hsl(var(--border))" strokeWidth="8" strokeLinecap="round" opacity="0.5" />

          {/* Organs */}
          {organs.map(organ => (
            <g key={organ.id}
              onClick={() => setSelectedOrgan(organ)}
              onMouseEnter={() => setHoveredOrgan(organ.id)}
              onMouseLeave={() => setHoveredOrgan(null)}
              className="cursor-pointer"
            >
              <rect
                x={organ.x} y={organ.y} width={organ.w} height={organ.h} rx={organ.h / 4}
                fill={organ.color}
                opacity={hoveredOrgan === organ.id || selectedOrgan?.id === organ.id ? 1 : 0.7}
                stroke={selectedOrgan?.id === organ.id ? "hsl(var(--foreground))" : "transparent"}
                strokeWidth={2}
                className="transition-all duration-200"
              />
              {(hoveredOrgan === organ.id) && (
                <text x={organ.x + organ.w / 2} y={organ.y - 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--foreground))">
                  {organ.name}
                </text>
              )}
              {/* Pulse effect on selected */}
              {selectedOrgan?.id === organ.id && (
                <rect x={organ.x - 3} y={organ.y - 3} width={organ.w + 6} height={organ.h + 6} rx={organ.h / 4 + 2}
                  fill="none" stroke={organ.color} strokeWidth="1" opacity="0.5" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div>
        {selectedOrgan ? (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: selectedOrgan.color }}>
                <span className="text-white text-sm font-bold">{selectedOrgan.name[0]}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">{selectedOrgan.name}</h3>
                <Badge variant="secondary">{selectedOrgan.system}</Badge>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{selectedOrgan.info}</p>
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => setSelectedOrgan(null)}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear Selection
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-4">
                <ZoomIn className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">Click on any organ to learn about it</p>
              <p className="text-xs text-muted-foreground mt-2">{organs.length} organs available to explore</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Virtual Microscope ───────────────── */
type Slide = { id: string; name: string; desc: string; magnification: string; structures: { name: string; color: string; desc: string }[] };

const slides: Slide[] = [
  {
    id: "stomata", name: "Leaf Stomata", desc: "Guard cells on the underside of a leaf",
    magnification: "400x",
    structures: [
      { name: "Guard Cells", color: "hsl(120, 60%, 40%)", desc: "Bean-shaped cells that open/close the stomatal pore" },
      { name: "Stomatal Pore", color: "hsl(120, 40%, 70%)", desc: "Opening for gas exchange — CO₂ in, O₂ out, water vapour out" },
      { name: "Epidermal Cells", color: "hsl(120, 30%, 80%)", desc: "Flat, irregular cells forming the leaf surface" },
      { name: "Chloroplasts", color: "hsl(120, 80%, 30%)", desc: "Green organelles in guard cells (absent in epidermal cells)" },
    ],
  },
  {
    id: "onion", name: "Onion Epidermal Cells", desc: "Single layer of cells from onion skin",
    magnification: "100x",
    structures: [
      { name: "Cell Wall", color: "hsl(40, 50%, 60%)", desc: "Rigid outer boundary made of cellulose" },
      { name: "Cell Membrane", color: "hsl(40, 30%, 70%)", desc: "Thin, semi-permeable membrane inside the cell wall" },
      { name: "Nucleus", color: "hsl(270, 50%, 50%)", desc: "Control centre of the cell, contains DNA" },
      { name: "Cytoplasm", color: "hsl(40, 20%, 85%)", desc: "Jelly-like substance where chemical reactions occur" },
    ],
  },
  {
    id: "cheek", name: "Human Cheek Cells", desc: "Epithelial cells from inside the cheek",
    magnification: "400x",
    structures: [
      { name: "Cell Membrane", color: "hsl(15, 40%, 65%)", desc: "No cell wall — animal cells have only cell membrane" },
      { name: "Nucleus", color: "hsl(270, 60%, 45%)", desc: "Stained dark with methylene blue" },
      { name: "Cytoplasm", color: "hsl(15, 30%, 80%)", desc: "Contains organelles like mitochondria, ribosomes" },
    ],
  },
];

function VirtualMicroscope() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [selectedStructure, setSelectedStructure] = useState<number | null>(null);
  const slide = slides[currentSlide];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {slides.map((s, i) => (
          <Button key={s.id} variant={currentSlide === i ? "default" : "outline"} size="sm"
            onClick={() => { setCurrentSlide(i); setSelectedStructure(null); setZoom(1); }}>
            {s.name}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Microscope view */}
        <div className="relative">
          <div className="aspect-square rounded-full border-4 border-foreground/20 overflow-hidden bg-white relative" style={{ maxWidth: 400, margin: "0 auto" }}>
            <svg viewBox="0 0 400 400" className="w-full h-full" style={{ transform: `scale(${zoom})`, transition: "transform 0.3s" }}>
              {/* Background - cell pattern */}
              {slide.id === "stomata" && (
                <g>
                  {/* Epidermal cells */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <rect key={i} x={30 + (i % 4) * 90} y={30 + Math.floor(i / 4) * 110} width={80} height={100} rx={5}
                      fill="hsl(120, 30%, 85%)" stroke="hsl(120, 40%, 60%)" strokeWidth={1.5}
                      className={selectedStructure === 2 ? "animate-pulse" : ""}
                      onClick={() => setSelectedStructure(2)} cursor="pointer" />
                  ))}
                  {/* Stomata */}
                  {[[150, 160], [280, 280], [100, 320]].map(([cx, cy], i) => (
                    <g key={i} onClick={() => setSelectedStructure(i === 0 ? 0 : 1)} cursor="pointer">
                      <ellipse cx={cx} cy={cy} rx={25} ry={15} fill="hsl(120, 60%, 40%)" className={selectedStructure === 0 ? "animate-pulse" : ""} />
                      <ellipse cx={cx} cy={cy} rx={10} ry={5} fill="hsl(120, 40%, 70%)" className={selectedStructure === 1 ? "animate-pulse" : ""} />
                      {/* Chloroplasts */}
                      {[[-12, -5], [12, -5], [-8, 5], [8, 5]].map(([dx, dy], j) => (
                        <circle key={j} cx={cx + dx} cy={cy + dy} r={3} fill="hsl(120, 80%, 30%)"
                          className={selectedStructure === 3 ? "animate-pulse" : ""}
                          onClick={(e) => { e.stopPropagation(); setSelectedStructure(3); }} cursor="pointer" />
                      ))}
                    </g>
                  ))}
                </g>
              )}
              {slide.id === "onion" && (
                <g>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <g key={i} onClick={() => setSelectedStructure(0)} cursor="pointer">
                      <rect x={20 + (i % 3) * 120} y={20 + Math.floor(i / 3) * 95} width={110} height={85} rx={3}
                        fill="hsl(40, 20%, 90%)" stroke="hsl(40, 50%, 60%)" strokeWidth={2}
                        className={selectedStructure === 0 ? "animate-pulse" : ""} />
                      <rect x={24 + (i % 3) * 120} y={24 + Math.floor(i / 3) * 95} width={102} height={77} rx={2}
                        fill="none" stroke="hsl(40, 30%, 70%)" strokeWidth={0.5} strokeDasharray="3 2"
                        onClick={(e) => { e.stopPropagation(); setSelectedStructure(1); }} cursor="pointer" />
                      <ellipse cx={75 + (i % 3) * 120} cy={55 + Math.floor(i / 3) * 95} rx={12} ry={8}
                        fill="hsl(270, 50%, 50%)" onClick={(e) => { e.stopPropagation(); setSelectedStructure(2); }} cursor="pointer"
                        className={selectedStructure === 2 ? "animate-pulse" : ""} />
                    </g>
                  ))}
                </g>
              )}
              {slide.id === "cheek" && (
                <g>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const cx = 80 + (i % 3) * 120 + Math.random() * 20;
                    const cy = 80 + Math.floor(i / 3) * 120 + Math.random() * 20;
                    return (
                      <g key={i} onClick={() => setSelectedStructure(0)} cursor="pointer">
                        <ellipse cx={cx} cy={cy} rx={50} ry={40} fill="hsl(15, 30%, 85%)" stroke="hsl(15, 40%, 65%)" strokeWidth={1.5}
                          className={selectedStructure === 0 ? "animate-pulse" : ""} />
                        <ellipse cx={cx} cy={cy} rx={12} ry={10} fill="hsl(270, 60%, 45%)"
                          onClick={(e) => { e.stopPropagation(); setSelectedStructure(1); }} cursor="pointer"
                          className={selectedStructure === 1 ? "animate-pulse" : ""} />
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
          </div>
          {/* Zoom controls */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={() => setZoom(z => Math.max(1, z - 0.5))}><ZoomOut className="w-4 h-4" /></Button>
            <span className="text-sm font-mono text-muted-foreground">{slide.magnification} ({zoom}x zoom)</span>
            <Button size="sm" variant="outline" onClick={() => setZoom(z => Math.min(3, z + 0.5))}><ZoomIn className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Info panel */}
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">{slide.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{slide.desc}</p>

          <div className="space-y-2">
            {slide.structures.map((s, i) => (
              <button key={i} onClick={() => setSelectedStructure(i)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${selectedStructure === i ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/30"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                </div>
                {selectedStructure === i && (
                  <p className="text-xs text-muted-foreground mt-2 ml-7 animate-fade-up">{s.desc}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Genetics / DNA ───────────────────── */
function GeneticsLab() {
  const [parent1, setParent1] = useState<[string, string]>(["B", "b"]);
  const [parent2, setParent2] = useState<[string, string]>(["B", "b"]);

  const alleles = ["B", "b"];
  const offspring = [
    [parent1[0] + parent2[0], parent1[0] + parent2[1]],
    [parent1[1] + parent2[0], parent1[1] + parent2[1]],
  ];
  const flat = offspring.flat();
  const dominant = flat.filter(g => g.includes("B")).length;
  const recessive = flat.filter(g => !g.includes("B")).length;

  const getPhenotype = (genotype: string) => genotype.includes("B") ? "Brown Eyes" : "Blue Eyes";
  const getColor = (genotype: string) => genotype.includes("B") ? "hsl(30, 50%, 35%)" : "hsl(210, 70%, 55%)";

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-display font-semibold text-foreground mb-3">Parent 1</h4>
            <div className="flex gap-2">
              {parent1.map((a, i) => (
                <button key={i} onClick={() => { const next = [...parent1] as [string, string]; next[i] = next[i] === "B" ? "b" : "B"; setParent1(next); }}
                  className={`w-14 h-14 rounded-xl font-display font-bold text-xl border-2 transition-all ${a === "B" ? "bg-[hsl(30,50%,35%)] text-white border-[hsl(30,50%,25%)]" : "bg-[hsl(210,70%,55%)] text-white border-[hsl(210,70%,45%)]"}`}>
                  {a}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Genotype: {parent1.join("")} | Phenotype: {getPhenotype(parent1.join(""))}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h4 className="font-display font-semibold text-foreground mb-3">Parent 2</h4>
            <div className="flex gap-2">
              {parent2.map((a, i) => (
                <button key={i} onClick={() => { const next = [...parent2] as [string, string]; next[i] = next[i] === "B" ? "b" : "B"; setParent2(next); }}
                  className={`w-14 h-14 rounded-xl font-display font-bold text-xl border-2 transition-all ${a === "B" ? "bg-[hsl(30,50%,35%)] text-white border-[hsl(30,50%,25%)]" : "bg-[hsl(210,70%,55%)] text-white border-[hsl(210,70%,45%)]"}`}>
                  {a}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Genotype: {parent2.join("")} | Phenotype: {getPhenotype(parent2.join(""))}</p>
          </CardContent>
        </Card>
      </div>

      {/* Punnett Square */}
      <h3 className="font-display font-semibold text-foreground mb-3">Punnett Square</h3>
      <div className="inline-grid grid-cols-3 gap-0 mb-6">
        <div className="w-20 h-12 flex items-center justify-center bg-muted rounded-tl-lg font-display font-bold text-muted-foreground text-sm">P1 \ P2</div>
        <div className="w-20 h-12 flex items-center justify-center bg-muted font-display font-bold text-foreground">{parent2[0]}</div>
        <div className="w-20 h-12 flex items-center justify-center bg-muted rounded-tr-lg font-display font-bold text-foreground">{parent2[1]}</div>
        <div className="w-20 h-12 flex items-center justify-center bg-muted font-display font-bold text-foreground">{parent1[0]}</div>
        {offspring[0].map((g, i) => (
          <div key={i} className="w-20 h-12 flex items-center justify-center border border-border font-display font-bold text-lg" style={{ color: getColor(g) }}>{g}</div>
        ))}
        <div className="w-20 h-12 flex items-center justify-center bg-muted rounded-bl-lg font-display font-bold text-foreground">{parent1[1]}</div>
        {offspring[1].map((g, i) => (
          <div key={i} className={`w-20 h-12 flex items-center justify-center border border-border font-display font-bold text-lg ${i === 1 ? "rounded-br-lg" : ""}`} style={{ color: getColor(g) }}>{g}</div>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm text-foreground"><strong>Phenotype Ratio:</strong> {dominant} Brown Eyes : {recessive} Blue Eyes ({dominant}:{recessive})</p>
          <p className="text-sm text-foreground mt-1"><strong>Genotype Ratio:</strong> {flat.filter(g => g === "BB").length} BB : {flat.filter(g => g === "Bb" || g === "bB").length} Bb : {flat.filter(g => g === "bb").length} bb</p>
          <p className="text-xs text-muted-foreground mt-2">Click alleles to toggle B (dominant/brown) and b (recessive/blue)</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BiologyLab() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/virtual-lab"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Biology Lab</h1>
            <p className="text-muted-foreground text-sm">Explore anatomy, view slides under microscope, study genetics</p>
          </div>
        </div>

        <Tabs defaultValue="anatomy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="anatomy">Human Anatomy</TabsTrigger>
            <TabsTrigger value="microscope">Virtual Microscope</TabsTrigger>
            <TabsTrigger value="genetics">Genetics Lab</TabsTrigger>
          </TabsList>
          <TabsContent value="anatomy">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Human Body — Click to Explore</h2>
              <AnatomyExplorer />
            </CardContent></Card>
          </TabsContent>
          <TabsContent value="microscope">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Virtual Microscope</h2>
              <VirtualMicroscope />
            </CardContent></Card>
          </TabsContent>
          <TabsContent value="genetics">
            <Card><CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4">Genetics — Punnett Square</h2>
              <GeneticsLab />
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
