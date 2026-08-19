"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/* -------------------------
   Utility: wrap (Continuous modular wrap)
   ------------------------- */
export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/* -----------------------------------
   Context to share velocity between rows
   ----------------------------------- */
const ThreeDScrollTriggerContext =
  React.createContext<MotionValue<number> | null>(null);

/* --------------------------
   Container that provides velocity
   -------------------------- */
export function ThreeDScrollTriggerContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 300,
  });

  // map to a bounded factor [0...4] with smooth acceleration
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    return Math.min(4, (Math.abs(v) / 1000) * 3);
  });

  return (
    <ThreeDScrollTriggerContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full overflow-hidden", className)} {...props}>
        {children}
      </div>
    </ThreeDScrollTriggerContext.Provider>
  );
}

/* --------------------------
   Row entry that chooses shared or local velocity
   -------------------------- */
export function ThreeDScrollTriggerRow(props: ThreeDScrollTriggerRowProps) {
  const sharedVelocityFactor = useContext(ThreeDScrollTriggerContext);
  if (sharedVelocityFactor) {
    return (
      <ThreeDScrollTriggerRowImpl
        {...props}
        velocityFactor={sharedVelocityFactor}
      />
    );
  }
  return <ThreeDScrollTriggerRowLocal {...props} />;
}

/* --------------------------
   Props
   -------------------------- */
interface ThreeDScrollTriggerRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  resetIntervalMs?: number;
}

interface ThreeDScrollTriggerRowImplProps extends ThreeDScrollTriggerRowProps {
  velocityFactor: MotionValue<number>;
}

function ThreeDScrollTriggerRowImpl({
  children,
  baseVelocity = 3,
  direction = 1,
  className,
  velocityFactor,
  ...props
}: ThreeDScrollTriggerRowImplProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numCopies, setNumCopies] = useState(4);
  const x = useMotionValue(0);

  const prevTimeRef = useRef<number | null>(null);
  const unitWidthRef = useRef(0);
  const baseXRef = useRef(0);

  // Memoized children
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const BlockContent = useMemo(() => {
    return (
      <div className="inline-flex shrink-0" style={{ contain: "paint" }}>
        {childrenArray}
      </div>
    );
  }, [childrenArray]);

  // Measure single block width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const block = container.querySelector(".threed-scroll-trigger-block") as HTMLElement;
    if (block) {
      unitWidthRef.current = block.scrollWidth;
      const containerWidth = container.offsetWidth || window.innerWidth;
      const needed = Math.max(4, Math.ceil(containerWidth / (unitWidthRef.current || 1)) + 3);
      setNumCopies(needed);
    }
  }, [childrenArray]);

  // Check if row is visible in viewport
  const isInView = useInView(containerRef, { margin: "30%" });

  // Smooth sub-pixel 60fps Animation Loop
  useAnimationFrame((time) => {
    if (!isInView) return;

    if (prevTimeRef.current == null) {
      prevTimeRef.current = time;
      return;
    }
    const dt = Math.min(0.1, Math.max(0.001, (time - prevTimeRef.current) / 1000));
    prevTimeRef.current = time;

    const unitWidth = unitWidthRef.current;
    if (unitWidth <= 0) return;

    // Continuous velocity calculations (Normal, comfortable reading pace)
    const vFactor = velocityFactor.get();
    const speedBoost = 1 + Math.min(0.5, Math.abs(vFactor) * 0.3);
    const pixelsPerSecond = baseVelocity * 4.5 * speedBoost;
    const moveBy = direction * pixelsPerSecond * dt;


    baseXRef.current += moveBy;

    // Seamless continuous wrapping using Framer Motion wrap helper
    const wrappedX = wrap(-unitWidth, 0, -baseXRef.current);
    x.set(wrappedX);
  });

  const xTransform = useTransform(x, (v) => `translate3d(${v}px, 0, 0)`);

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap select-none", className)}
      {...props}
    >
      <motion.div
        className="inline-flex will-change-transform transform-gpu"
        style={{ transform: xTransform }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "inline-flex shrink-0",
              i === 0 ? "threed-scroll-trigger-block" : ""
            )}
          >
            {BlockContent}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* --------------------------
   Local row fallback
   -------------------------- */
function ThreeDScrollTriggerRowLocal(props: ThreeDScrollTriggerRowProps) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 60,
    stiffness: 300,
  });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    return Math.min(4, (Math.abs(v) / 1000) * 3);
  });

  return (
    <ThreeDScrollTriggerRowImpl
      {...props}
      velocityFactor={localVelocityFactor}
    />
  );
}

export default ThreeDScrollTriggerRow;
