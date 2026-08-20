"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, animate, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface AngledSliderItem {
  id: string | number;
  url?: string;
  alt?: string;
  title?: string;
  badge?: string;
  description?: string;
  warranty?: string;
  customContent?: React.ReactNode;
}

export interface AngledSliderProps {
  /**
   * Array of items or URLs
   */
  items?: AngledSliderItem[];
  /**
   * Optional custom node elements to render in slider
   */
  childrenNodes?: React.ReactNode[];
  /**
   * Speed of auto-scroll (seconds for full loop). Lower is faster.
   * @default 10
   */
  speed?: number;
  /**
   * Direction of scroll
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Height of the slider container
   * @default "450px"
   */
  containerHeight?: string;
  /**
   * Width of each card
   * @default "320px"
   */
  cardWidth?: string;
  /**
   * Gap between cards
   * @default "40px"
   */
  gap?: string;
  /**
   * Angle of the 3D skew/rotation
   * @default 20
   */
  angle?: number;
  /**
   * Scale on hover
   * @default 1.05
   */
  hoverScale?: number;
  /**
   * Show arrow buttons
   * @default true
   */
  showControls?: boolean;
  className?: string;
}

const cardVariants: Variants = {
  offHover: (angle: number) => ({
    rotateY: angle,
    z: 40,
    opacity: 0.95,
    scale: 1,
    zIndex: 30,
    transition: {
      type: "spring",
      mass: 1.5,
      stiffness: 300,
      damping: 30,
    },
  }),
  onHover: (hoverScale: number) => ({
    rotateY: 0,
    z: 100,
    opacity: 1,
    scale: hoverScale,
    zIndex: 50,
    transition: {
      type: "spring",
      mass: 1.5,
      stiffness: 300,
      damping: 30,
    },
  }),
};

const AngledCard = React.memo(({
  item,
  customNode,
  angle,
  hoverScale,
  cardWidth,
}: {
  item?: AngledSliderItem;
  customNode?: React.ReactNode;
  angle: number;
  hoverScale: number;
  cardWidth: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 group overflow-visible cursor-pointer select-none"
      style={{
        width: cardWidth,
        height: "100%",
        transformStyle: "preserve-3d",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
      custom={isHovered ? hoverScale : angle}
      variants={cardVariants}
      initial="offHover"
      animate={isHovered ? "onHover" : "offHover"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {customNode ? (
        <div className="h-full w-full">{customNode}</div>
      ) : item?.customContent ? (
        <div className="h-full w-full">{item.customContent}</div>
      ) : (
        <div className="relative h-full w-full overflow-hidden border border-black/10 rounded-2xl bg-white min-h-[280px] shadow-xl">
          {item?.url && (
            <img
              src={item.url}
              alt={item.alt || item.title || "Slider Image"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          )}
          {item?.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-lg font-bold">{item.title}</h3>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
});

AngledCard.displayName = "AngledCard";

export const AngledSlider: React.FC<AngledSliderProps> = ({
  items = [],
  childrenNodes,
  speed = 10,
  direction: _direction = "left",
  containerHeight = "450px",
  cardWidth = "340px",
  gap = "32px",
  angle = 18,
  hoverScale = 1.08,
  showControls = true,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute responsive dimensions
  const effectiveCardWidth = isMobile ? "270px" : cardWidth;
  const effectiveGap = isMobile ? "20px" : gap;
  const effectiveAngle = isMobile ? Math.min(angle, 8) : angle;
  const effectiveHeight = isMobile ? "390px" : containerHeight;

  // Duplicate items 4 times for seamless infinite loop
  const duplicatedNodes = childrenNodes
    ? [...childrenNodes, ...childrenNodes, ...childrenNodes, ...childrenNodes]
    : null;
  const duplicatedItems = items.length
    ? [...items, ...items, ...items, ...items]
    : [];

  const baseCount = childrenNodes ? childrenNodes.length : items.length;
  const cardWidthNum = isMobile ? 270 : (parseInt(effectiveCardWidth, 10) || 340);
  const gapNum = isMobile ? 20 : (parseInt(effectiveGap, 10) || 32);
  const stepWidth = cardWidthNum + gapNum;
  const totalSetWidth = baseCount * stepWidth;

  // Wrap position safely
  const wrapValue = useCallback((val: number) => {
    if (!totalSetWidth) return val;
    let wrapped = val % totalSetWidth;
    if (wrapped > 0) wrapped -= totalSetWidth;
    return wrapped;
  }, [totalSetWidth]);

  // Continuous linear auto-scroll animation
  useEffect(() => {
    if (isHovered || isInteracting || !totalSetWidth) return;

    const targetX = x.get() - totalSetWidth;
    const animation = animate(x, targetX, {
      duration: speed,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (latest) => {
        if (latest <= -totalSetWidth) {
          x.set(latest + totalSetWidth);
        }
      },
    });

    return () => animation.stop();
  }, [isHovered, isInteracting, speed, totalSetWidth, x]);

  // Handle manual arrow navigation
  const triggerInteractionPause = () => {
    setIsInteracting(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2800);
  };

  const handleNext = () => {
    triggerInteractionPause();
    const current = x.get();
    const target = wrapValue(current) - stepWidth;
    animate(x, target, {
      duration: 0.45,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        x.set(wrapValue(x.get()));
      }
    });
  };

  const handlePrev = () => {
    triggerInteractionPause();
    const current = x.get();
    const target = wrapValue(current) + stepWidth;
    animate(x, target, {
      duration: 0.45,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        x.set(wrapValue(x.get()));
      }
    });
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white py-6 sm:py-10 select-none group/slider",
        className
      )}
      style={{
        height: effectiveHeight,
        perspective: isMobile ? "800px" : "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Left & Right Navigation Arrow Buttons */}
      {showControls && baseCount > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-[#041626]/90 hover:bg-[#00A3E0] text-white rounded-full flex items-center justify-center border border-[#00A3E0]/40 z-50 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-[#041626]/90 hover:bg-[#00A3E0] text-white rounded-full flex items-center justify-center border border-[#00A3E0]/40 z-50 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      <motion.div
        className="flex items-center h-full will-change-transform"
        style={{
          x,
          gap: effectiveGap,
          transformStyle: "preserve-3d",
        }}
      >
        {duplicatedNodes
          ? duplicatedNodes.map((node, index) => (
              <AngledCard
                key={`node-${index}`}
                customNode={node}
                angle={effectiveAngle}
                hoverScale={hoverScale}
                cardWidth={effectiveCardWidth}
              />
            ))
          : duplicatedItems.map((item, index) => (
              <AngledCard
                key={`${item.id}-${index}`}
                item={item}
                angle={effectiveAngle}
                hoverScale={hoverScale}
                cardWidth={effectiveCardWidth}
              />
            ))}
      </motion.div>
    </div>
  );
};

export default AngledSlider;
