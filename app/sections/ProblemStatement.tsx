"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientLabel from "../components/GradientLabel";

gsap.registerPlugin(ScrollTrigger);

const ProblemStatement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        {
          opacity: 0,
          y: -16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 90%",
          },
        }
      );
    }

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-6 md:gap-8 w-full py-16 px-2.5 md:px-6 lg:px-25"
    >
      <div ref={labelRef} style={{ opacity: 0 }}>
        <GradientLabel
          label="Problem Statement"
          size="3xl"
          weight="normal"
        />
      </div>

      <h2
        ref={headingRef}
        style={{ opacity: 0 }}
        className="max-w-xl md:max-w-2xl text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.25] text-black dark:text-white"
      >
        A single mutation can abolish a protein's function while TM-score
        stays above 0.97.
      </h2>

      <div
        ref={contentRef}
        className="max-w-4xl space-y-6"
      >
        <p className="text-lg leading-8 text-black/70 dark:text-white/70">
          TM-score, RMSD, and LDDT are foundational tools. But they share a
          common blind spot: they measure coordinate overlap, not structural
          grammar.
        </p>

        <p className="text-lg leading-8 text-black/70 dark:text-white/70">
          When geometry barely changes but function does—which is precisely
          the case in the most clinically important mutations—these tools
          return a false negative.
        </p>


        <div className="mt-8 space-y-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-6 backdrop-blur-sm">

          <div className="border-b border-black/10 dark:border-white/10 pb-4">
            <p className="font-mono text-[15px] leading-7 text-black dark:text-white">
              <span className="font-semibold text-[#D89267]">
                KRAS G12C
              </span>
              {" · "}
              TM-score &gt; 0.97, RMSD &lt; 1 Å.
              {" "}
              Switch-I dynamics altered. Drug target.
            </p>
          </div>

          <div className="border-b border-black/10 dark:border-white/10 py-4">
            <p className="font-mono text-[15px] leading-7 text-black dark:text-white">
              <span className="font-semibold text-[#D89267]">
                BRCA1 C61G
              </span>
              {" · "}
              TM-score ≈ 0.93.
              {" "}
              Zinc coordination destroyed.
              {" "}
              E3 ligase activity abolished.
            </p>
          </div>

          <div className="pt-4">
            <p className="font-mono text-[15px] leading-7 text-black dark:text-white">
              <span className="font-semibold text-[#D89267]">
                SERCA + SLN
              </span>
              {" · "}
              TM-score barely moves.
              {" "}
              Regulatory function fundamentally shifted.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-black/10 dark:border-white/10">

          <p className="max-w-5xl text-xl md:text-2xl font-medium leading-[1.6] text-black dark:text-white">

            In each case,

            <span className="text-black/50 dark:text-white/50">
              {" "}geometry says nothing changed.
            </span>

            <br />

            <span className="text-[#D89267]">
              Biology says everything changed.
            </span>

            {" "}FoldShield++ reads the structural grammar—not just the coordinates.

          </p>

        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;