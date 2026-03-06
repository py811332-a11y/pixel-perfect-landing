import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -50px 0px" } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { setRef, isVisible };
}
