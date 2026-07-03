"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientLabel from "../components/GradientLabel";
import { WHO_ITS_FOR } from "../config/whoItsFor";

gsap.registerPlugin(ScrollTrigger);

const WhoItsFor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      className="w-full py-28 px-2.5 md:px-6 lg:px-25"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Label */}

        <div className="mb-12">
          <GradientLabel
            label="Who Uses FoldShield++"
            size="3xl"
            weight="normal"
          />

          <h2
            ref={headingRef}
            className="mt-6 max-w-4xl text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.80] text-black dark:text-white"
            >
            Built for researchers, biotech teams, and AI platform builders who need
            explainable structural intelligence.
          </h2>
        </div>

        {/* Table */}

        <div
          ref={tableRef}
          className="overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0E0E0E] shadow-sm"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-[#151515]">
                <th className="w-[260px] border border-black/10 dark:border-white/10 px-8 py-6 text-left text-lg uppercase tracking-wide font-semibold text-black dark:text-white">
                  Audience
                </th>

                <th className="border border-black/10 dark:border-white/10 px-8 py-6 text-left text-lg uppercase tracking-wide font-semibold text-black dark:text-white">
                  What FoldShield++ gives you
                </th>
              </tr>
            </thead>

            <tbody>
              {WHO_ITS_FOR.map((item, index) => (
                <tr
                  key={index}
                  className="transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#171717]"
                >
                  <td className="w-[260px] border border-black/10 dark:border-white/10 px-8 py-8 align-top text-2xl font-bold text-black dark:text-white">
                    {item.audience}
                  </td>

                  <td className="border border-black/10 dark:border-white/10 px-8 py-8 text-lg leading-9 text-black/70 dark:text-white/80">
                    {item.benefit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;