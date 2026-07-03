"use client";

import { useEffect, useRef } from "react";
import {
  ShieldCheck,
  Dna,
  Crosshair,
  Share2,
  Activity,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const validationItems = [
  {
    icon: ShieldCheck,
    text: "Structural similarity preserved",
  },
  {
    icon: Dna,
    text: "Mutation impact remains interpretable",
  },
  {
    icon: Crosshair,
    text: "Cross-family separation maintained",
  },
  {
    icon: Share2,
    text: "Symbolic topology remains stable",
  },
  {
    icon: Activity,
    text: "Folding captured without molecular dynamics",
  },
];

const ValidationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".validation-card");

    gsap.set(cards, {
      opacity: 0,
      y: 40,
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-10 rounded-[32px] border border-[#E8B9A3]/20 bg-white/5 dark:bg-[#111111] backdrop-blur-xl p-8"
    >
      <h3 className="mb-8 text-lg font-semibold uppercase tracking-[0.18em] text-[#D89267]">
        What This Validates
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {validationItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.text}
              className="
                validation-card
                group
                rounded-2xl
                border
                border-[#E8B9A3]/10
                bg-white/5
                dark:bg-[#171717]
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[#E8B9A3]/40
                hover:shadow-[0_12px_40px_rgba(232,185,163,0.12)]
              "
            >
              <Icon
                size={42}
                strokeWidth={1.4}
                className="mb-6 text-[#E8B9A3]"
              />

              <p className="leading-7 text-black/70 dark:text-white/80">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ValidationSection;