"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pages } from "../config/pages";
import Button from "../components/Button";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 48, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          eyebrowRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.55"
        )
        .fromTo(
          headingRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35"
        )
        .fromTo(
          bodyRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 12, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.35"
        );

      gsap.to(glowRef.current, {
        x: 40,
        y: -20,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const btn = ctaRef.current;
      if (btn) {
        const onEnter = () =>
          gsap.to(btn, { scale: 1.05, duration: 0.35, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(btn, { scale: 1, x: 0, y: 0, duration: 0.4, ease: "power2.out" });
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: relX * 0.25,
            y: relY * 0.25,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        btn.addEventListener("mousemove", onMove);

        return () => {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
          btn.removeEventListener("mousemove", onMove);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 py-20 md:px-8 lg:px-24"
    >
      <div
        ref={cardRef}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md px-8 py-16 dark:text-white text-black md:px-16 md:py-20"
        style={{ visibility: "hidden" }}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #D89267 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <p
              ref={eyebrowRef}
              className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D89267]"
              style={{ visibility: "hidden" }}
            >
              Ready to Evaluate FoldShield++
            </p>

            <h2
              ref={headingRef}
              className="text-2xl font-semibold leading-tight md:text-4xl"
              style={{ visibility: "hidden" }}
            >
              See what your current tools are missing.
            </h2>

            <p
              ref={bodyRef}
              className="mt-6 max-w-2xl text-lg leading-8 dark:text-white/70 text-black"
              style={{ visibility: "hidden" }}
            >
              Book a 30-minute demo. We&apos;ll run FoldShield++ on structures from
              your own dataset.
            </p>
          </div>

          <a
            ref={ctaRef}
            href={Pages[0].ctaLink}
            style={{ visibility: "hidden", display: "inline-block" }}
          >
            <Button label={Pages[0].cta} btnType="secondary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;