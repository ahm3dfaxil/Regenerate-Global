import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export interface StickyScrollCardsProps<T> {
  data: T[];
  renderItem: (item: T, index: number, isFocused: boolean) => React.ReactNode;
  visibleCount?: number; // Number of cards visible at once (default: 4)
  itemHeight?: number; // Height of each card in px (default: 115)
  gap?: number; // Gap between cards in px (default: 12)
  sectionHeader: React.ReactNode; // Left side content
  bgColor?: string; // Section background color
  id?: string; // Section DOM id
}

export const StickyScrollCards = <T,>({
  data,
  renderItem,
  visibleCount = 4,
  itemHeight = 115,
  gap = 12,
  sectionHeader,
  bgColor = "bg-[#F7F6F3]",
  id,
}: StickyScrollCardsProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Track window scroll through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalSteps = Math.max(1, data.length - visibleCount);
  const viewportHeight = visibleCount * itemHeight + (visibleCount - 1) * gap;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to active card index
    const rawStep = latest * totalSteps;
    const currentStep = Math.min(
      totalSteps,
      Math.max(0, Math.floor(rawStep + 0.3))
    );
    setActiveIndex(currentStep);
  });

  // Calculate track height: ensures ample scroll distance for smooth card stepping
  const scrollSectionHeight = `${Math.max(180, (data.length - visibleCount + 2) * 35)}vh`;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${bgColor}`}
      style={{ height: scrollSectionHeight }}
    >
      {/* Sticky Viewport pinned at top while window scrolls */}
      <div className="sticky top-20 sm:top-24 h-[calc(100vh-96px)] max-h-[820px] min-h-[550px] w-full flex items-center py-6 sm:py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Side Content - Stays Pinned */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {sectionHeader}
          </div>

          {/* Right Side Cards Container - Driven by main window scroll */}
          <div className="lg:col-span-7 flex items-center justify-center w-full">
            <div
              className="relative w-full overflow-hidden py-1"
              style={{ height: `${viewportHeight + 8}px` }}
            >
              <div
                className="flex flex-col transition-transform duration-500 ease-out"
                style={{
                  gap: `${gap}px`,
                  transform: `translateY(-${Math.min(activeIndex, totalSteps) * (itemHeight + gap)}px)`,
                }}
              >
                {data.map((item, index) => {
                  const isFocused = index === activeIndex;
                  const isVisible = index >= activeIndex && index < activeIndex + visibleCount;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.4, scale: 0.94 }}
                      animate={{
                        opacity: isVisible ? (isFocused ? 1 : 0.85) : 0.2,
                        scale: isFocused ? 1 : isVisible ? 0.97 : 0.92,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      style={{
                        height: `${itemHeight}px`,
                        boxSizing: "border-box",
                      }}
                    >
                      {renderItem(item, index, isFocused)}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyScrollCards;
