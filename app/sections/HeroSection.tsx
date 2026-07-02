"use client";

import GradientLabel from "../components/GradientLabel";
import Button from "../components/Button";
import ArrowIcon from "../components/ArrowIcon";
import Slider from "./Slider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pages } from "../config/pages";

const HeroSection = () => {
  const [active, setActive] = useState(0);
  const current = Pages[active];

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      }
    );
  }, [active]);

  return (
    <section
      id="home"
      className="relative flex w-full lg:min-h-10/12"
    >
      <div className="flex z-10 flex-col justify-between gap-20 p-4 lg:py-50 py-30 lg:pl-25 lg:w-10/12 transition-all">

        <div className="absolute top-0 left-0 h-11 w-full -z-10 hidden dark:block opacity-50 scale-150">
          <video
            src="/slider/particle.mkv"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-full object-fill dark:invert-0 dark:grayscale-0 invert-100 grayscale-100 rotate-180"
          />
        </div>

        <div
          ref={textRef}
          className="flex flex-col gap-6 w-fit max-w-2xl overflow-visible dark:text-white/80"
        >
          <div className="flex items-center gap-2 text-md">
            <svg
              className="hidden lg:block"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <p data-cursor="read">{current.tagline}</p>
          </div>

          <GradientLabel
            label={current.title}
            size="4xl"
            weight="bold"
          />

          <p className="text-md font-medium text-black/70 dark:text-white/80 leading-relaxed">
            {current.desc}
          </p>
        </div>

        <div className="flex items-center gap-8">

          {/* Book a Demo */}
          <Button
            label={current.cta}
            onClick={() => {
              window.location.href = current.ctaLink;
            }}
          />

          {current.secondaryCta && (
            <button
              onClick={() => {
                if (current.secondaryCtaLink) {
                  window.location.href = current.secondaryCtaLink;
                }
              }}
              className="group flex items-center justify-between gap-4 rounded-full bg-transparent backdrop-blur-sm border border-black dark:border-white/20 text-black dark:text-white pl-6 pr-2 py-2 min-w-[230px] cursor-pointer transition-all duration-300 hover:border-[#E8B9A3] hover:text-[#E8B9A3] hover:bg-black/5 dark:hover:bg-white/5"
            >
              <span className="text-base font-medium whitespace-nowrap">
                {current.secondaryCta}
              </span>

              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black dark:border-white/20 text-black dark:text-white shrink-0 transition-all duration-300 group-hover:border-[#E8B9A3] group-hover:text-[#E8B9A3] group-hover:translate-x-1">
                <ArrowIcon />
              </div>
            </button>
          )}

        </div>

        <p className="text-sm italic text-black/50 dark:text-white/50 max-w-xl">
          Not a replacement for AlphaFold or ESMFold. The analysis layer that
          runs on top.
        </p>

      </div>

      <Slider
        data={Pages}
        active={active}
        setActive={setActive}
      />
    </section>
  );
};

export default HeroSection; 