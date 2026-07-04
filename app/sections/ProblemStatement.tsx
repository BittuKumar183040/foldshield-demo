"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientLabel from "../components/GradientLabel";

gsap.registerPlugin(ScrollTrigger);

const ProblemStatement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      className="w-full bg-zinc-50 dark:bg-[#0B0B0B] py-28 px-4 md:px-8 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">

        <GradientLabel
          label="Problem Statement"
          size="3xl"
          weight="normal"
        />

        <h2
          ref={headingRef}
          className="mt-6 max-w-4xl text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.25] text-black dark:text-white"
        >
          A single mutation can abolish a protein's function while TM-score
          stays above 0.97.
        </h2>

        <div
          ref={contentRef}
          className="mt-12 max-w-5xl space-y-8"
        >
          <p className="text-lg leading-9 text-black/70 dark:text-white/70">
            TM-score, RMSD, and LDDT are foundational tools. But they share a
            common blind spot: they measure coordinate overlap, not structural
            grammar.
          </p>

          <p className="text-lg leading-9 text-black/70 dark:text-white/70">
            When geometry barely changes but function does—which is precisely
            the case in the most clinically important mutations—these tools
            return a false negative.
          </p>

                    {/* Case Studies */}

          <div className="mt-14 space-y-5 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-8 backdrop-blur-sm">

            <div className="border-b border-black/10 dark:border-white/10 pb-5">
              <p className="font-mono text-[15px] leading-8 text-black dark:text-white">
                <span className="font-semibold text-[#D89267]">
                  KRAS G12C
                </span>
                {"    "}·{"    "}
                TM-score &gt; 0.97, RMSD &lt; 1 Å.
                {"    "}
                Switch-I dynamics altered. Drug target.
              </p>
            </div>

            <div className="border-b border-black/10 dark:border-white/10 py-5">
              <p className="font-mono text-[15px] leading-8 text-black dark:text-white">
                <span className="font-semibold text-[#D89267]">
                  BRCA1 C61G
                </span>
                {"    "}·{"    "}
                TM-score ≈ 0.93.
                {"    "}
                Zinc coordination destroyed.
                E3 ligase activity abolished.
              </p>
            </div>

            <div className="pt-5">
              <p className="font-mono text-[15px] leading-8 text-black dark:text-white">
                <span className="font-semibold text-[#D89267]">
                  SERCA + SLN
                </span>
                {"    "}·{"    "}
                TM-score barely moves.
                {"    "}
                Regulatory function fundamentally shifted.
              </p>
            </div>

          </div>

          {/* Closing */}

          <div className="pt-10 border-t border-black/10 dark:border-white/10">

            <p className="max-w-5xl text-xl md:text-2xl font-medium leading-[1.8] text-black dark:text-white">

              In each case,

              <span className="text-black/50 dark:text-white/50">
                {" "}geometry says nothing changed.
              </span>

              <br />

              <span className="text-[#D89267]">
                Biology says everything changed.
              </span>

              {" "}FoldShield++ reads the structural grammar—not just the
              coordinates.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProblemStatement;