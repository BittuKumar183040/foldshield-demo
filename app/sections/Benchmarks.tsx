"use client";

import { useEffect, useRef, useState } from "react";
import GradientLabel from "../components/GradientLabel";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import ResultCard from "../components/ResultCard";
import ValidationSection from "../components/ValidationItems";
import ParticleCanvas from "../components/ParticleCanvas";
import dynamic from "next/dynamic";
import { Pages } from "../config/pages";
import { type Mesh, meshes } from "../config/benchmark";

gsap.registerPlugin(ScrollTrigger);

const PDBModels = dynamic(() => import("../components/canvas/PDBModels"), {
  ssr: false,
});

const Benchmarks = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const projectTextRef = useRef<HTMLParagraphElement | null>(null);
  const current = Pages[0];

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
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pinSpacing: false,
      });

      const cards = gsap.utils.toArray(".product-card");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      cards.forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { scale: 0.92 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "center 50%",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  console.log(meshes);

  return (
    <section
      id="benchmarks"
      ref={sectionRef}
      className="relative w-full px-2.5 md:px-2.5 lg:px-25 py-20 overflow-hidden"
    >
      {isDesktop && (
        <div className="absolute font-bold inset-0 overflow-hidden pointer-events-none">
          <p
            ref={projectTextRef}
            className="fixed bottom-0 left-0 text-[300px] md:text-[600px] opacity-10 whitespace-nowrap bg-linear-to-b from-gray-400 dark:from-white to-transparent bg-clip-text text-transparent"
          >
            FOLDSHIELD++
          </p>
        </div>
      )}

      <div
        className="flex flex-col items-center gap-8 mb-16"
        ref={labelRef}
      >
        <GradientLabel
          label="Independent Benchmark Results"
          size="3xl"
          weight="normal"
          centered
        />
        <p className="max-w-4xl text-center text-lg leading-9 text-black/70 dark:text-white/70">
          <>
          FoldShield++ has been validated across mutation prediction,
          fold classification, structural comparison, and conformational
          state detection—demonstrating interpretable performance beyond
          traditional geometric metrics.
          </>
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
          <div className=" absolute overflow-auto flex gap-4 bottom-0 left-0 w-full h-20 p-2 text-xs bg-gray-100/10 backdrop-blur-sm rounded-b-3xl">
            {meshes.map((mesh, idx) => (
              <button
                key={mesh.name}
                onClick={() => setModel(mesh)}
                className={` bg-black/20 p-2 px-4 h-full text-[#D89267] rounded-xl border border-[#E8B9A3]/20 hover:border-[#E8B9A3]/60 transition-all
                  ${model.name === meshes[idx].name ? "opacity-20 pointer-events-none" : "opacity-90"}`}
              >
                {mesh.name}
              </button>
            ))}
          </div>
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

          <div className="overflow-hidden rounded-2xl mt-2 text-xs border border-[#E8B9A3]/20 backdrop-blur-md">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E8B9A3]/20 text-[#D89267]">
                  {Object.keys(model.statsTable).map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 font-semibold tracking-wide"
                    >
                      {header}
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
