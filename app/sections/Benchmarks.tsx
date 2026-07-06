"use client";

import { useEffect, useRef, useState } from "react";
import GradientLabel from "../components/GradientLabel";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import ResultCard from "../components/ResultCard";
import ValidationSection from "../components/ValidationItems";
import ParticleCanvas from "../components/ParticleCanvas";
import dynamic from "next/dynamic";

import { benchmarkLabel, type Mesh, meshes } from "../config/benchmark";

gsap.registerPlugin(ScrollTrigger);

const PDBModels = dynamic(() => import("../components/canvas/PDBModels"), {
  ssr: false,
});

const Benchmarks = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const projectTextRef = useRef<HTMLParagraphElement | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  const [model, setModel] = useState<Mesh>(meshes[0]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !labelRef.current || !isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        projectTextRef.current,
        {
          x: "100%",
          scale: 0.95,
        },
        {
          x: "-150%",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "1000 bottom",
            end: "4000 top",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      id="benchmarks"
      ref={sectionRef}
      className="relative w-full px-2.5 md:px-2.5 lg:px-25 py-20 overflow-hidden"
    >
      {isDesktop && (
        <div className="absolute font-bold top-100 inset-0 overflow-hidden pointer-events-none">
          <p
            ref={projectTextRef}
            className="fixed bottom-0 left-0 text-[300px] md:text-[600px] opacity-10 whitespace-nowrap bg-linear-to-b from-gray-400 dark:from-white to-transparent bg-clip-text text-transparent"
          >
            FOLDSHIELD++
          </p>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 " ref={labelRef}>
        <GradientLabel
          label={benchmarkLabel.title}
          size="3xl"
          weight="normal"
          centered
        />
        <p className=" text-center lg:w-8/12 w-11/12 text-md dark:text-white/80">
          {benchmarkLabel.desc}
        </p>
      </div>
      {isDesktop && (
        <div className="absolute top-0 left-0 w-screen h-full">
          <ParticleCanvas />
        </div>
      )}

      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 lg:gap-5 mt-10 dark:text-white backdrop-blur-md">
        <div className="relative ">
          <PDBModels model={model.mesh} />
          { meshes.length > 1 && (
          <div className=" absolute overflow-auto flex gap-4 bottom-0 left-0 w-full h-20 p-2 text-xs bg-gray-100/10 backdrop-blur-sm rounded-b-3xl">
            {meshes.map((mesh, idx) => (
              <button
                key={mesh.name}
                onClick={() => setModel(mesh)}
                className={` bg-black p-2 px-4 h-full text-[#D89267] rounded-xl border border-[#E8B9A3]/20 hover:border-[#E8B9A3]/60 transition-all
                  ${model.name === meshes[idx].name ? "opacity-20 pointer-events-none" : "opacity-90"}`}
              >
                {mesh.name}
              </button>
            ))}
          </div>
          )}
        </div>
        <div className=" flex flex-col justify-between">
          <p></p>
          <div className="grid grid-cols-2 gap-2 my-0">
            {model.statsCard.map((stats) => (
              <ResultCard
                key={stats.component}
                percentage={stats.percentage}
                component={stats.component}
                rate={stats.rate}
              />
            ))}
          </div>

          <div className="overflow-auto rounded-2xl mt-2 text-xs border border-[#E8B9A3]/20 backdrop-blur-md">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E8B9A3]/20 text-[#D89267]">
                  {Object.keys(model.statsTable).map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 font-semibold tracking-wide"
                    >
                      {header !== "Category" && header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {model.statsTable.Category.map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-[#E8B9A3]/10">
                    {Object.keys(model.statsTable).map((column, idx) => (
                      <td
                        key={`${column}-${rowIndex}`}
                        className={`px-4 py-4 whitespace-nowrap ${idx === 0 && " text-[#E8B9A3] "}`}
                      >
                        {
                          model.statsTable[
                            column as keyof typeof model.statsTable
                          ][rowIndex]
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ValidationSection />
    </section>
  );
};

export default Benchmarks;
