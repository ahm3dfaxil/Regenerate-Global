"use client";

import React, {
  useRef,
  useEffect,
  useState,
  type TouchEvent,
  type MouseEvent,
} from "react";
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export interface ThreeDCarouselItem {
  id: number;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  icon?: React.ReactNode;
  features?: string[];
}

interface ThreeDCarouselProps {
  items: ThreeDCarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  title?: string;
  subtitle?: string;
  tagline?: string;
  isMobileSwipe?: boolean;
  onSelect?: (item: ThreeDCarouselItem) => void;
}

const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  items = [],
  autoRotate = true,
  rotateInterval = 3500,
  cardHeight = 490,
  title,
  subtitle,
  tagline,
  isMobileSwipe = true,
  onSelect,
}) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Touch & Drag state
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobile();
  const minSwipeDistance = 35;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-Rotate Timer (Runs reliably, pauses only during active drag/touch or when offscreen)
  useEffect(() => {
    if (!autoRotate || isDragging || isInteracting || !isVisible || items.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, isDragging, isInteracting, isVisible, rotateInterval, items.length]);

  // Touch gesture handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (!isMobileSwipe) return;
    setIsInteracting(true);
    setStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isMobileSwipe || startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const distance = startX - endX;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        setActive((prev) => (prev + 1) % items.length);
      } else {
        setActive((prev) => (prev - 1 + items.length) % items.length);
      }
    }
    setStartX(null);
    setTimeout(() => setIsInteracting(false), 2000);
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
    setIsInteracting(true);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging || startX === null) return;
    const distance = startX - e.clientX;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        setActive((prev) => (prev + 1) % items.length);
      } else {
        setActive((prev) => (prev - 1 + items.length) % items.length);
      }
    }
    setStartX(null);
    setIsDragging(false);
    setTimeout(() => setIsInteracting(false), 2000);
  };

  // Ultra-Smooth 3D Layout calculations for 3 active cards (Left, Center, Right)
  const getCardStyle = (index: number) => {
    const total = items.length;
    if (total === 0) return {};

    let diff = (index - active) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Center active card
    if (diff === 0) {
      return {
        transform: "translate3d(0%, 0, 0px) scale(1) rotateY(0deg)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
      };
    }

    // Immediate Right card
    if (diff === 1) {
      const translateX = isMobile ? 38 : 52;
      return {
        transform: `translate3d(${translateX}%, 0, -100px) scale(0.85) rotateY(-15deg)`,
        opacity: 0.55,
        zIndex: 20,
        pointerEvents: "auto" as const,
        cursor: "pointer",
        visibility: "visible" as const,
      };
    }

    // Immediate Left card
    if (diff === -1) {
      const translateX = isMobile ? -38 : -52;
      return {
        transform: `translate3d(${translateX}%, 0, -100px) scale(0.85) rotateY(15deg)`,
        opacity: 0.55,
        zIndex: 20,
        pointerEvents: "auto" as const,
        cursor: "pointer",
        visibility: "visible" as const,
      };
    }

    // All other background cards hidden cleanly to prevent text bleed and lag
    return {
      transform: `translate3d(${diff > 0 ? 90 : -90}%, 0, -250px) scale(0.6) rotateY(0deg)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none" as const,
      visibility: "hidden" as const,
    };
  };

  return (
    <section id="ThreeDCarousel" className="w-full relative py-4">
      {/* Optional Section Header */}
      {(title || subtitle || tagline) && (
        <div className="text-center max-w-3xl mx-auto mb-8 px-4">
          {subtitle && (
            <span className="text-[#00A3E0] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 block">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              {title}
            </h2>
          )}
          {tagline && (
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {tagline}
            </p>
          )}
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={carouselRef}
          className="relative overflow-hidden w-full select-none"
          style={{
            height: `${cardHeight + 60}px`,
            perspective: "1000px",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Main 3D Card Stack */}
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => {
              const cardStyle = getCardStyle(index);
              const isActive = index === active;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (!isActive) {
                      setActive(index);
                      setIsInteracting(true);
                      setTimeout(() => setIsInteracting(false), 2500);
                    } else if (onSelect) {
                      onSelect(item);
                    }
                  }}
                  className="absolute top-2 w-full max-w-[340px] sm:max-w-[400px] md:max-w-[430px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                  style={cardStyle}
                >
                  <Card
                    className={`relative overflow-hidden bg-[#041626] text-white border rounded-2xl flex flex-col transition-colors duration-500 ${
                      isActive
                        ? "border-[#00A3E0] shadow-[0_12px_40px_rgba(0,163,224,0.3)]"
                        : "border-[#00A3E0]/30 shadow-md"
                    }`}
                    style={{ height: `${cardHeight}px` }}
                  >
                    {/* Top Image Banner */}
                    <div
                      className="relative h-44 sm:h-48 overflow-hidden bg-[#020b14] flex items-center justify-center p-6"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(4, 22, 38, 0.4), rgba(4, 22, 38, 0.95)), url(${item.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-[#041626]/40" />

                      {/* Banner Icon & Title */}
                      <div className="relative z-10 text-center flex flex-col items-center">
                        {item.icon && (
                          <div className="w-11 h-11 rounded-2xl bg-[#00A3E0]/20 border border-[#00A3E0]/50 text-[#00A3E0] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,163,224,0.3)]">
                            {item.icon}
                          </div>
                        )}
                        <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#00A3E0] uppercase mb-0.5">
                          {item.brand}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content & Features */}
                    <CardContent className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-[#041626]">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3.5">
                          {item.description}
                        </p>

                        {/* Bullet point list */}
                        {item.features && item.features.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {item.features.map((feat, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-xs text-gray-200 font-medium"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-[#00A3E0] shrink-0"
                                />
                                <span className="line-clamp-1">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Footer Tags & Link */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-3.5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 bg-[#00A3E0]/10 text-[#00A3E0] border border-[#00A3E0]/25 rounded-full text-[10px] font-semibold tracking-wide"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {item.link && (
                          <a
                            href={item.link}
                            onClick={(e) => {
                              if (item.link?.startsWith("#")) {
                                e.preventDefault();
                                const target = document.querySelector(item.link);
                                if (target) target.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                            className="inline-flex items-center text-xs font-semibold text-[#00A3E0] hover:text-white transition-colors group"
                          >
                            <span>Explore Capability</span>
                            <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>
                    </CardContent>

                    {/* Dark Overlay on Non-Active Side Cards for Crisp Depth & Contrast */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-[#041626]/75 pointer-events-none rounded-2xl transition-opacity duration-500" />
                    )}
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#041626]/90 hover:bg-[#00A3E0] text-white rounded-full flex items-center justify-center border border-[#00A3E0]/40 z-40 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md"
                onClick={() => {
                  setActive((prev) => (prev - 1 + items.length) % items.length);
                  setIsInteracting(true);
                  setTimeout(() => setIsInteracting(false), 2500);
                }}
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#041626]/90 hover:bg-[#00A3E0] text-white rounded-full flex items-center justify-center border border-[#00A3E0]/40 z-40 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md"
                onClick={() => {
                  setActive((prev) => (prev + 1) % items.length);
                  setIsInteracting(true);
                  setTimeout(() => setIsInteracting(false), 2500);
                }}
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}

          {/* Pagination Indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center space-x-2 z-40">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-500 ${
                  active === idx
                    ? "bg-[#00A3E0] w-7 shadow-[0_0_12px_#00A3E0]"
                    : "bg-white/30 hover:bg-white/60 w-2"
                }`}
                onClick={() => {
                  setActive(idx);
                  setIsInteracting(true);
                  setTimeout(() => setIsInteracting(false), 2500);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDCarousel;
