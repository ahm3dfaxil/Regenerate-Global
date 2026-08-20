import React, { useRef, useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

// Define the props for the ScrollList component
export interface ScrollListProps<T> {
  data: T[]; // The array of data items to display
  renderItem: (item: T, index: number) => React.ReactNode; // Function to render each item's content
  itemHeight?: number; // Optional: Fixed height for each item in pixels. Defaults to 120px.
  height?: string; // Container height (e.g. "500px")
  className?: string;
}

export const ScrollList = <T,>({
  data,
  renderItem,
  itemHeight = 120, // Height formatted to comfortably show ~4 cards in container
  height = "500px",
  className = "",
}: ScrollListProps<T>) => {
  // useRef to get a reference to the scrollable div element
  const listRef = useRef<HTMLDivElement>(null);
  // useState to keep track of the index of the currently focused item
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useEffect(() => {
    const updateFocusedItem = () => {
      if (!listRef.current) return;

      const container = listRef.current;
      const children = Array.from(container.children) as HTMLDivElement[];
      const scrollTop = container.scrollTop;
      const containerCenter = container.clientHeight / 2;

      let closestItemIndex = 0;
      let minDistanceToCenter = Infinity;

      children.forEach((child, index) => {
        const itemTop = child.offsetTop;
        const actualItemHeight = child.offsetHeight;
        const itemCenter = itemTop + actualItemHeight / 2;

        const distanceToCenter = Math.abs(
          itemCenter - scrollTop - containerCenter
        );

        if (distanceToCenter < minDistanceToCenter) {
          minDistanceToCenter = distanceToCenter;
          closestItemIndex = index;
        }
      });

      setFocusedIndex(closestItemIndex);
    };

    updateFocusedItem();

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", updateFocusedItem);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", updateFocusedItem);
      }
    };
  }, [data, itemHeight]);

  // Handle smooth scroll-thru: roll through cards, then release to normal page scroll at boundaries
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 4;
      const isAtTop = scrollTop <= 4;

      if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
        e.preventDefault();
        container.scrollTop += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Framer Motion Variants for defining animation states for each item
  const itemVariants: Variants = {
    hidden: {
      opacity: 0.35,
      scale: 0.9,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    focused: {
      opacity: 1,
      scale: 1,
      zIndex: 10,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    next: {
      opacity: 0.85,
      scale: 0.96,
      zIndex: 5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      opacity: 0.7,
      scale: 0.93,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={listRef}
      className={`scroll-list__wrp scrollbar-none overflow-y-auto w-full select-none pr-1 ${className}`}
      style={{ height, scrollBehavior: "smooth" }}
    >
      {data.map((item, index) => {
        let variant = "hidden";

        if (index === focusedIndex) {
          variant = "focused";
        } else if (index === focusedIndex + 1) {
          variant = "next";
        } else {
          const isWithinVisibleRange = Math.abs(index - focusedIndex) <= 3;
          if (isWithinVisibleRange) {
            variant = "visible";
          }
        }

        return (
          <motion.div
            key={index}
            className="scroll-list__item mx-auto w-full py-1.5"
            variants={itemVariants}
            initial="hidden"
            animate={variant}
            style={{
              height: itemHeight ? `${itemHeight}px` : "auto",
              boxSizing: "border-box",
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollList;
