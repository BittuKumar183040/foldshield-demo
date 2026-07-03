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
  const listRef = useRef<HTMLDivElement>(null);

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

    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
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
            trigger: listRef.current,
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
      className="w-full py-24 px-4 md:px-8 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Label */}

        <div className="mb-14">
          <GradientLabel
            label="Who Uses FoldShield++"
            size="3xl"
            weight="normal"
          />

          <h2
            ref={headingRef}
            className="mt-6 max-w-3xl text-xl md:text-2xl lg:text-3xl font-semibold leading-[1.45] text-black dark:text-white"
          >
            Built for researchers, biotech teams, and AI platform builders who
            need explainable structural intelligence.
          </h2>
        </div>

        {/* Audience List */}

        <div ref={listRef}>

          {WHO_ITS_FOR.map((item) => (
            <div
              key={item.id}
              className="
                group
                relative
                border-t
                border-black/10
                dark:border-white/10
                py-9
                transition-all
                duration-300
              "
            >
              {/* Left Accent */}

              <div className="absolute left-0 top-8 h-0 w-[2px] bg-[#E8B9A3] transition-all duration-300 group-hover:h-[65%]" />

              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 pl-6">

                <div className="max-w-4xl">

                  <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white transition-colors duration-300 group-hover:text-[#E8B9A3]">
                    {item.audience}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-black/65 dark:text-white/65">
                    {item.description}
                  </p>

                </div>

                <div className="flex justify-end md:block">

                  <span className="text-sm font-semibold tracking-[0.25em] text-black/25 dark:text-white/25 transition-colors duration-300 group-hover:text-[#E8B9A3]">
                    {item.id}
                  </span>

                </div>

              </div>
            </div>
          ))}

          <div className="border-t border-black/10 dark:border-white/10" />

        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;