import { useEffect, useRef, useState } from "react";

export function useScrollReveal(totalWords: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startPoint = windowHeight * 0.85;
      const endPoint = windowHeight * 0.25;
      
      const progress = Math.min(
        Math.max((startPoint - rect.top) / (startPoint - endPoint), 0),
        1
      );

      setRevealedCount(Math.floor(progress * totalWords));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalWords]);

  return { containerRef, revealedCount };
}
