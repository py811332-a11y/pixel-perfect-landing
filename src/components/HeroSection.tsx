import { ArrowUpRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Abstract creative background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-16 pb-20 md:pb-28">
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] tracking-tight max-w-4xl"
            style={{ color: 'white' }}>
          Elevating brand
          <br />
          <span className="font-normal">experiences across retail</span>
        </h1>

        <div className="mt-8">
          <button className="inline-flex items-center gap-3 bg-foreground/90 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium tracking-wider uppercase transition-all hover:bg-foreground group"
                  style={{ color: 'hsl(var(--primary-foreground))' }}>
            Watch Showreel
            <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center group-hover:bg-background/30 transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-16">
          <div className="w-8 h-12 border border-white/40 rounded-full flex items-center justify-center">
            <div className="w-0.5 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
