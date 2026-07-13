'use client'

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UniversalCardProps = {
  tag?: string;
  title: string;
  version?: string;
  description?: string;
  footerLabel?: string;
  onClick?: () => void;
  index?: number;
  showLine?: boolean;
  showBar?: boolean;
  className?: string;
};

const UniversalCard = ({
  tag,
  title,
  version,
  description,
  footerLabel,
  onClick,
  index = 0,
  showLine = true,
  showBar = true,
  className = "",
}: UniversalCardProps) => {
  const [hovered, setHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (barRef.current)
      gsap.to(barRef.current, {
        scaleY: hovered ? 1 : 0,
        duration: 0.35,
        ease: "power3.out",
      });
  }, [hovered]);

  useEffect(() => {
    if (titleRef.current)
      gsap.to(titleRef.current, {
        opacity: hovered ? 1 : 0.75,
        duration: 0.25,
      });
  }, [hovered]);

  useEffect(() => {
    if (!descRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");

    gsap.to(descRef.current, {
      color: hovered
        ? (isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)")
        : (isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.38)"),
      duration: 0.25,
    });
  }, [hovered]);

  useEffect(() => {
    if (!tagRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");

    gsap.to(tagRef.current, {
      color: hovered
        ? "#06b6d4" : (isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"),
      duration: 0.25,
    });
  }, [hovered]);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col gap-4 p-5 border border-black/10 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white rounded-lg cursor-pointer ${className}`}
    >
      {showBar && (
        <div
          ref={barRef}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%) scaleY(0)",
            transformOrigin: "center",
            width: 2,
            height: "60%",
            background: "#22d3ee",
            borderRadius: 999,
          }}
        />
      )}

      <div className="flex items-center justify-between">
        {tag && (
          <span
            ref={tagRef}
            className="text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/50"
          >
            {tag}
          </span>
        )}

        {version && (
          <span className="
            inline-flex items-center px-2 py-0.5 w-fit
            text-[10px] font-medium rounded-full uppercase tracking-wider
            border

            text-cyan-500 border-cyan-400/30 bg-cyan-400/10
            dark:border-cyan-300/90 dark:bg-gray-900 dark:text-white
          ">
            {version}
          </span>
        )}
      </div>

      {showLine && (
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cyan-400"
            style={{
              transform: hovered ? "translateX(0%)" : "translateX(-100%)",
              transition: "transform 0.5s ease-out",
            }}
          />
        </div>
      )}

      <h3
        ref={titleRef}
        className="text-sm font-semibold leading-snug text-black dark:text-white"
        style={{ opacity: 0.75 }}
      >
        {title}
      </h3>

      {description && (
        <p
          ref={descRef}
          className="text-xs leading-relaxed flex-1 text-black/40 dark:text-white/60"
        >
          {description}
        </p>
      )}

      {footerLabel && (
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[11px] uppercase tracking-widest font-medium text-black dark:text-white">
            {footerLabel}
          </span>

          <svg
            className="w-3 h-3 transition-transform duration-200"
            style={{ transform: hovered ? "translateX(2px)" : "translateX(0)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default UniversalCard;