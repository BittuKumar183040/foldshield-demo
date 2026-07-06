'use client';

import { useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import ArrowIcon from "./ArrowIcon";

interface ButtonProps {
  label: string;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
  showIcon?: boolean;
  btnType?: "primary" | "secondary";
}

const Button = ({
  label,
  type = "button",
  onClick,
  showIcon = true,
  btnType = "primary",
}: ButtonProps) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!iconRef.current) return;

    gsap.to(iconRef.current, {
      x: 5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!iconRef.current) return;

    gsap.to(iconRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group flex items-center justify-between gap-4 font-semibold rounded-full border h-10 text-base pl-4 pr-2 cursor-pointer transition-all duration-300 ease-out
        ${
          btnType === "primary"
            ? "border-[#E8B9A3] bg-[#E8B9A3] text-black hover:border-white hover:bg-[#F5F5F5]"
            : "bg-transparent backdrop-blur-sm border-black/15 dark:border-[#E8B9A3]/25 text-black dark:text-white hover:border-[#E8B9A3]/55 hover:bg-[#E8B9A3]/5"
        }`}
    >
      <span className="text-base font-semibold whitespace-nowrap">
        {label}
      </span>

      {showIcon &&
        (btnType === "primary" ? (
          <div
            ref={iconRef}
            className="flex items-center justify-center h-3/4 aspect-square rounded-full bg-black text-[#E8B9A3] transition-all duration-300"
          >
            <ArrowRight
              size={20}
              strokeWidth={2.8}
              className="relative"
            />
          </div>
        ) : (
          <div
            ref={iconRef}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-500/30 dark:border-white/15 bg-transparent text-black dark:text-white shrink-0 transition-all duration-300 ease-out group-hover:border-[#E8B9A3]/70 group-hover:bg-[#E8B9A3]/10"
          >
            <ArrowIcon />
          </div>
        ))}
    </button>
  );
};

export default Button;