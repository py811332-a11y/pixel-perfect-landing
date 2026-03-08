import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function BookViewer() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Link to="/books" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Link>
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Science — Class 9</h1>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            <div className="border-r border-border p-8 bg-[#FFF8F0]">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">Chapter 1</h2>
              <h3 className="font-display font-semibold text-foreground mb-3">Matter in Our Surroundings</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Everything in this universe is made up of material which scientists have named "matter". The air we breathe, the food we eat, stones, clouds, stars, plants and animals, even a small drop of water or a particle of sand – every thing is matter.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                We can also observe that we are able to see through some matter, while this is not possible with others. For example, we can see through glass but not through wood.
              </p>
              <p className="text-xs text-muted-foreground mt-6">Page 1</p>
            </div>
            <div className="p-8 bg-[#FFF8F0]">
              <h3 className="font-display font-semibold text-foreground mb-3">Physical Nature of Matter</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Activity 1.1: Take a beaker of water. Mark the level of water. Add a teaspoonful of sugar. Stir the contents. Observe the sugar dissolving in the water. Mark the new level of water.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                <strong>What do you observe?</strong> The level of water does not change! This means that the particles of sugar got adjusted in the spaces between particles of water.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                <strong>Conclusion:</strong> Matter is made up of particles and these particles are very small.
              </p>
              <p className="text-xs text-muted-foreground mt-6">Page 2</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
