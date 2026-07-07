"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientLabel from "../components/GradientLabel";
import { problemStatement } from "../config/problemstatement";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const PDBModels = dynamic(() => import("../components/canvas/PDBModels"), {
  ssr: false,
});

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
        },
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
        },
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
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex justify-between items-center w-full pb-20 px-2.5 md:px-6 lg:px-25"
    >
      <div className="flex flex-col gap-5 ">
        <div ref={labelRef} style={{ opacity: 0 }}>
          <GradientLabel
            label={problemStatement.label}
            size="3xl"
            weight="normal"
          />
        </div>

        <h2
          ref={headingRef}
          style={{ opacity: 0 }}
          className="text-md text-black dark:text-white"
        >
          {problemStatement.heading}
        </h2>

        <div ref={contentRef} className="max-w-4xl space-y-2">
          {problemStatement.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-md text-black/70 dark:text-white/70">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
            {problemStatement.examples.map((example, index) => (
              <div
                key={example.title}
                className={`${
                  index !== problemStatement.examples.length - 1
                    ? "border-b border-black/10 pb-4 dark:border-white/10"
                    : ""
                } 
                  ${index !== 0 ? "pt-4" : ""}
                `}
              >
                <p className="font-mono md:text-lg text-md leading-7 tracking-tight text-black dark:text-white">
                  <span className="inline-block font-semibold text-[#D89267]">
                    {example.title}
                  </span>

                  <span className="mx-2 text-black/40 dark:text-white/40">
                    ·
                  </span>

                  <span className="text-black/70 dark:text-white/70">
                    {example.desc}
                  </span>
                  <br className="md:hidden block" />
                  <span className="md:ml-3 font-medium text-black dark:text-white">
                    {example.outcome}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white/10 p-6 backdrop-blur-md">
            <p className="max-w-5xl text-md font-medium leading-[1.6] text-black md:text-xl dark:text-white">
              {problemStatement.conclusion.intro}
              <span className="text-black/50 dark:text-white/50">
                {problemStatement.conclusion.muted}
              </span>
              <br />
              <span className="text-[#D89267]">
                {problemStatement.conclusion.highlight}
              </span>
              {problemStatement.conclusion.ending}
            </p>
          </div>
        </div>
      </div>

      <div className=" h-full w-1/3 xl:block hidden aspect-square">
        <PDBModels
          autoRotate={true}
          model={problemStatement.meshUrl}
          nomouse={true}
        />
      </div>
    </section>
  );
};

export default ProblemStatement;
