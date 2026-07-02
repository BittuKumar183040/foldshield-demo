'use client'

import { useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  label: string;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
  showIcon?: boolean;
}

const Button = ({
  label,
  type = "button",
  onClick,
  showIcon = true,
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
      className="group flex items-center justify-between gap-4 rounded-full border border-white/20 bg-[#161616] text-white font-semibold text-base pl-6 pr-2 py-2 min-w-[210px] cursor-pointer transition-all duration-300 hover:border-[#E8B9A3] hover:bg-[#1D1D1D]"
    >
      <span className="text-base font-semibold whitespace-nowrap">
        {label}
      </span>

      {showIcon && (
        <div
          ref={iconRef}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E8B9A3] text-black shrink-0 transition-all duration-300"
        >
          <ArrowRight
            size={20}
            strokeWidth={2.8}
            className="relative top-[1px]"
          />
        </div>
      )}
    </button>
  );
};

export default Button;