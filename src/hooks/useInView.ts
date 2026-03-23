import { useEffect, useState, useRef, RefObject } from 'react';

interface UseInViewOptions {
  triggerOnce?: boolean;
  threshold?: number;
}

export function useInView(
  options: UseInViewOptions = {}
): [RefObject<HTMLDivElement>, boolean] {
  const { triggerOnce = false, threshold = 0 } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [triggerOnce, threshold]);

  return [ref, inView];
}
