import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-2"><span className="text-2xl">🎓</span><span className="font-display font-bold text-foreground">ShikshaGuruji</span></Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="font-display font-bold text-3xl text-foreground">Making Kota's coaching accessible to every student</h1>
        <p className="text-muted-foreground leading-relaxed">ShikshaGuruji was born from a simple belief: every student in India deserves access to quality, personalized education — not just those who can afford expensive coaching classes in Kota.</p>
        <p className="text-muted-foreground leading-relaxed">We use local AI technology (Ollama) that runs on Indian servers, ensuring your data never leaves the country. Our AI generates personalized whiteboard lectures that adapt to each student's learning pace and weak areas.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: "💰", title: "Affordable", desc: "Free forever plan. Premium starts at ₹299/mo" },
            { icon: "🎯", title: "Personalized", desc: "AI adapts to your strengths and weaknesses" },
            { icon: "🇮🇳", title: "Indian", desc: "Built in Kota, data stays in India" },
            { icon: "🔒", title: "Private", desc: "Your data is yours. No selling, no ads" },
          ].map((v, i) => (
            <div key={i} className="p-6 bg-card rounded-xl border border-border">
              <span className="text-3xl block mb-2">{v.icon}</span>
              <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Founded by ASN StarChem Pvt Ltd, Kota, Rajasthan</p>
      </div>
    </div>
  );
}
