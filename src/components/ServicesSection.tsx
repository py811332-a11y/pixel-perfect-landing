import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    number: "01",
    title: "Define",
    subtitle: "Insights, Planning & Strategy",
    description: "Always evolving, we stay ahead by being in the know with latest trends and insights in retail design & sociology. We tackle visual and contextual challenges, always seeking solutions that align with our overarching vision of relevance and innovation.",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Customer-centric storytelling & design",
    description: "We curate your brand story along the customer journey, delivering multi-sensory experience with authentic engagement that stay true to your brand. Through inspiring campaigns, we connect your brand to your community.",
  },
  {
    number: "03",
    title: "Digital",
    subtitle: "Storytelling-centric UX",
    description: "We bring ideas to life that allow your customer to truly experience your brand. With an in-house digital team, we provide a full-service for omnichannel retail — from content creation and app development, to social media campaigns and analytics.",
  },
  {
    number: "04",
    title: "Develop",
    subtitle: "Technical expertise",
    description: "It's all in the detail. Our in-house technical design team turn visuals into a reality and help deliver quality projects which are commercially sound.",
  },
  {
    number: "05",
    title: "Deliver",
    subtitle: "Translate visions into reality",
    description: "Our expertise seamlessly merges design and retail know-how with years of project management, production, and logistics experience. Our agile global network ensures efficient, cost-effective production runs.",
  },
];

const introText = "Our end-to-end service gives us a holistic view of the entire consumer journey, enabling us to produce data-driven, result-focused deliverables every time.";
const introWords = introText.split(" ");

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { containerRef, revealedCount } = useScrollReveal(introWords.length);

  return (
    <section id="services" className="px-6 md:px-16 py-24 md:py-36 transition-colors duration-500" style={{ backgroundColor: 'hsl(var(--services-bg))', color: 'hsl(var(--services-fg))' }}>
      <h2 className="text-sm font-semibold tracking-[0.15em] uppercase opacity-60 mb-6">
        What We Offer
      </h2>

      <div ref={containerRef} className="max-w-3xl mb-16">
        <p className="text-xl md:text-2xl font-light leading-relaxed">
          {introWords.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.3em] transition-opacity duration-300"
              style={{ opacity: i < revealedCount ? 1 : 0.15 }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="space-y-0">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            service={service}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
          />
        ))}
        <div style={{ borderTop: '1px solid hsl(var(--services-fg) / 0.15)' }} />
      </div>
    </section>
  );
};

function ServiceItem({ service, index, isExpanded, onToggle }: {
  service: typeof services[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="border-t transition-all duration-600"
      style={{
        borderColor: 'hsl(var(--services-fg) / 0.15)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 text-left group"
      >
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="text-sm opacity-40 font-mono">{service.number}</span>
          <h3 className="text-2xl md:text-3xl font-light">{service.title}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 opacity-40 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isExpanded ? "300px" : "0",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="pl-12 md:pl-24 pb-8 max-w-2xl">
          <h4 className="text-sm font-semibold tracking-wider uppercase opacity-60 mb-3">
            {service.subtitle}
          </h4>
          <p className="text-base font-light leading-relaxed opacity-70">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
