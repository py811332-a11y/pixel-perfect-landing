import { useEffect, useRef, useState } from "react";

const aboutText = "We empower brands to achieve more by shaping consumer experiences at every touchpoint: online, in-store, and on the move. With a unique blend of strategy, creativity, technical skill, and dedicated service, we deliver physical and digital retail solutions that achieve exceptional commercial success.";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = aboutText.split(" ");

  return (
    <section id="about" ref={sectionRef} className="px-6 md:px-16 py-24 md:py-36">
      <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-12">
        About us
      </h2>

      <div className="max-w-5xl">
        <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.3em] transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0.1,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: `${i * 20}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-12">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
        >
          Learn more
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
