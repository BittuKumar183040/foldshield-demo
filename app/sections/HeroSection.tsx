"use client";

import GradientLabel from "../components/GradientLabel";
import Button from "../components/Button";
import Slider from "./Slider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pages } from "../config/pages";
import TextResolver from "../components/ui/TextResolverAnimation";

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
      },
    );
  }, [active]);

  return (
    <section id="home" className="relative flex w-full lg:min-h-10/12">
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
            <TextResolver strings={[current.tagline]} 
              iterations = {1}
              timeout = {25}
              interval={5000} 
              className="text-md h-10 font-medium text-black/70 dark:text-white/80 leading-relaxed" />
          </div>

          <GradientLabel label={current.title} size="4xl" weight="bold" />

          <p className="text-md font-medium text-black/70 dark:text-white/80 leading-relaxed">
            {current.desc}
          </p>
        </div>

        <div className="flex items-center gap-8 relative">
          <Button
            label={current.cta}
            onClick={() => {
              window.location.href = current.ctaLink;
            }}
          />

          {current.secondaryCta && (
            <Button
              label={current.cta}
              btnType="secondary"
              onClick={() => {
                if (current.secondaryCtaLink) {
                  window.location.href = current.secondaryCtaLink;
                }
              }}
            />
          )}
        <p className=" absolute top-20 text-xs font-medium text-black/50 dark:text-white/50">
          {current.infoLine}
        </p>
        </div>
      </div>
        
      <Slider data={Pages} active={active} setActive={setActive} />
    </section>
  );
};

export default HeroSection;
