import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What does a retail design agency do?",
    answer: "A retail design agency helps brands translate who they are into physical spaces that people can experience. This includes store layouts, customer journeys, shop-in-shop concepts, fixtures, visual merchandising and digital touchpoints.",
  },
  {
    question: "How can retail design increase sales?",
    answer: "Thoughtful retail design removes friction and builds connection. When shoppers feel comfortable, inspired and confident in a space, they stay longer, engage more deeply and are more likely to convert.",
  },
  {
    question: "Do you handle global rollouts?",
    answer: "Yes. ISI Global works with international brands to deliver consistent retail experiences across multiple markets, spanning design, development, production and delivery.",
  },
  {
    question: "How do you know if the new design is working?",
    answer: "We measure success both emotionally and commercially — looking at dwell time, engagement, navigation ease, conversion, and gathering feedback from clients and store teams.",
  },
  {
    question: "What is your process for designing a retail space?",
    answer: "Every project starts with understanding the brand, the customer and the challenge. We move through insight-led strategy, creative concepting and detailed development via our 5D methodology: Define, Design, Digital, Develop, Deliver.",
  },
];

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="faq" className="px-6 md:px-16 py-24 md:py-36">
      <div
        ref={headerRef}
        className="transition-all duration-700"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-16">
          Any questions?
        </h2>
      </div>

      <div className="max-w-4xl">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
          />
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

function FAQItem({ faq, index, isExpanded, onToggle }: {
  faq: { question: string; answer: string };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="border-t border-border transition-all duration-600"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-7 text-left group"
      >
        <div className="flex items-baseline gap-6 md:gap-10">
          <span className="text-sm text-muted-foreground font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg md:text-xl font-normal pr-4">{faq.question}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isExpanded ? "200px" : "0",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="pl-12 md:pl-20 pb-7">
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
