import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Atom, FlaskConical, Ruler, Microscope, Beaker, Zap, PenTool, Dna } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const labs = [
  {
    id: "physics",
    title: "Physics Lab",
    icon: <Atom className="w-8 h-8" />,
    color: "from-[hsl(217,91%,60%)] to-[hsl(224,76%,40%)]",
    bgGlow: "bg-[hsl(217,91%,60%)]/10",
    experiments: [
      "Circuit Builder — Drag & drop resistors, bulbs, batteries",
      "Pendulum Simulator — Adjust length, mass, gravity",
      "Velocity-Time Graph Plotter — Real-time motion analysis",
      "Wave Interference — Visualize constructive & destructive patterns",
    ],
    count: 12,
    badge: "Class 9-10",
  },
  {
    id: "chemistry",
    title: "Chemistry Lab",
    icon: <FlaskConical className="w-8 h-8" />,
    color: "from-[hsl(160,84%,39%)] to-[hsl(160,84%,25%)]",
    bgGlow: "bg-[hsl(160,84%,39%)]/10",
    experiments: [
      "Acid-Base Reactions — Mix chemicals, watch colour changes",
      "Electrolysis — Set up electrodes and observe gas collection",
      "pH Indicator Lab — Test solutions with universal indicator",
      "Chemical Equilibrium — Shift reactions with Le Chatelier's principle",
    ],
    count: 10,
    badge: "NCERT Aligned",
  },
  {
    id: "math",
    title: "Mathematics Lab",
    icon: <Ruler className="w-8 h-8" />,
    color: "from-[hsl(258,90%,66%)] to-[hsl(258,90%,50%)]",
    bgGlow: "bg-[hsl(258,90%,66%)]/10",
    experiments: [
      "Coordinate Grid Plotter — Plot points, draw lines, find slopes",
      "Geometry Construction — Compass, protractor, ruler tools",
      "Fraction Bar Visualizer — Compare and operate on fractions",
      "Number Line Explorer — Integers, decimals, and operations",
    ],
    count: 8,
    badge: "Interactive",
  },
  {
    id: "biology",
    title: "Biology Lab",
    icon: <Microscope className="w-8 h-8" />,
    color: "from-[hsl(38,92%,50%)] to-[hsl(25,90%,45%)]",
    bgGlow: "bg-[hsl(38,92%,50%)]/10",
    experiments: [
      "Human Anatomy Explorer — Click organs to learn functions",
      "Virtual Microscope — Observe stomata, cells, tissues",
      "Genetics & DNA — Punnett squares, DNA structure",
      "Virtual Dissection — Explore frog anatomy layer by layer",
    ],
    count: 9,
    badge: "3D Models",
  },
];

export default function VirtualLab() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">No Equipment Needed</Badge>
          <h1 className="font-display font-extrabold text-4xl text-foreground">Virtual PCMB Lab</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">
            Perform real NCERT experiments right in your browser. Physics circuits, chemistry reactions, math tools, and biology dissections — all interactive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {labs.map((lab) => (
            <Link key={lab.id} to={`/virtual-lab/${lab.id}`}>
              <Card className="card-hover glow-hover group h-full overflow-hidden border-2 hover:border-primary/30 transition-all duration-500">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${lab.color} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-float" style={{
                          left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`,
                          animationDelay: `${i * 0.4}s`, animationDuration: `${2 + i * 0.5}s`
                        }} />
                      ))}
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          {lab.icon}
                        </div>
                        <h2 className="font-display font-bold text-2xl">{lab.title}</h2>
                        <p className="text-white/70 mt-1">{lab.count} experiments</p>
                      </div>
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">{lab.badge}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {lab.experiments.map((exp, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{exp}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" variant="outline">
                      Enter Lab <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
