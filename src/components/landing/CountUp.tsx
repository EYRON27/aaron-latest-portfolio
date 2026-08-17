import { useState, useEffect, useRef } from 'react';

export interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
}

export const CountUp = ({ to, suffix = '' }: CountUpProps) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let n = 0;
      const step = Math.max(1, Math.ceil(to / 40));
      const t = setInterval(() => {
        n += step;
        if (n >= to) {
          setVal(to);
          clearInterval(t);
        } else {
          setVal(n);
        }
      }, 24);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
};
