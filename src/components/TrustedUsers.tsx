import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "./CountUp";

export interface TrustedUsersProps {
  avatars: string[];
  rating?: number;
  totalUsersText?: number;
  caption?: string;
  className?: string;
  starColorClass?: string;
  ringColors?: string[];
  linkText?: string;
  linkHref?: string;
}

export const TrustedUsers: React.FC<TrustedUsersProps> = ({
  avatars,
  rating = 5,
  totalUsersText = 1000,
  caption = "Trusted by over",
  className = "",
  starColorClass = "text-yellow-400",
  ringColors = [],
  linkText = "Enterprise Partners",
  linkHref = "#contact",
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-5 sm:gap-6 bg-transparent text-white py-4 px-4 select-none",
        className
      )}
    >
      <div className="flex -space-x-3 sm:-space-x-4">
        {avatars.map((src, i) => (
          <div
            key={i}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-[#041626] transition-transform duration-300 hover:scale-110 hover:z-20 ${
              ringColors[i] || "ring-[#00A3E0]"
            }`}
          >
            <img
              src={src}
              alt={`Client avatar ${i + 1}`}
              width={44}
              height={44}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-1">
        <div className={`flex gap-1 ${starColorClass}`}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} fill="currentColor" className="w-4.5 h-4.5" aria-hidden="true" />
          ))}
        </div>
        <div className="text-white text-xs sm:text-sm font-medium flex items-center flex-wrap gap-1">
          <span>{caption}</span>
          <CountUp
            value={totalUsersText}
            duration={2.5}
            separator=","
            className="text-base sm:text-lg text-[#00A3E0]"
            suffix="+"
            colorScheme="gradient"
          />
          {linkText && (
            <a
              href={linkHref}
              onClick={(e) => {
                if (linkHref.startsWith("#")) {
                  e.preventDefault();
                  const target = document.querySelector(linkHref);
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="underline text-[#00A3E0] hover:text-white transition-colors"
            >
              {linkText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrustedUsers;
