"use client";

import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
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
   * Speed of auto-scroll (seconds for full loop). Higher is slower.
   * @default 20
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
  speed = 20,
  direction = "left",
  containerHeight = "450px",
  cardWidth = "320px",
  gap = "40px",
  angle = 20,
  hoverScale = 1.05,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute responsive dimensions for mobile vs desktop
  const effectiveCardWidth = isMobile ? "270px" : cardWidth;
  const effectiveGap = isMobile ? "20px" : gap;
  const effectiveAngle = isMobile ? Math.min(angle, 8) : angle;
  const effectiveHeight = isMobile ? "390px" : containerHeight;

  // Duplicate items 4 times for flawless 60fps infinite marquee loop
  const duplicatedNodes = childrenNodes
    ? [...childrenNodes, ...childrenNodes, ...childrenNodes, ...childrenNodes]
    : null;
  const duplicatedItems = items.length
    ? [...items, ...items, ...items, ...items]
    : [];

  const animateRange =
    direction === "left"
      ? ["0%", "-25%"]
      : ["-25%", "0%"];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white py-6 sm:py-10 select-none",
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
      <motion.div
        className="flex items-center h-full will-change-transform"
        style={{
          gap: effectiveGap,
          transformStyle: "preserve-3d",
        }}
        animate={{
          x: animateRange,
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isHovered ? speed * 1000 : speed,
            ease: "linear",
          },
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
