import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export interface CountUpProps {
  value: number;
  duration?: number;
  separator?: string;
  className?: string;
  suffix?: string;
  prefix?: string;
  colorScheme?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 2,
  separator = ",",
  className = "",
  suffix = "",
  prefix = "",
  colorScheme,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTimestamp: number | null = null;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * endValue);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const formatted = displayValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  const colorClass =
    colorScheme === "gradient"
      ? "bg-gradient-to-r from-[#00A3E0] via-cyan-300 to-white bg-clip-text text-transparent font-bold"
      : "";

  return (
    <span ref={ref} className={`${colorClass} ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default CountUp;
