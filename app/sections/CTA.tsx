import React from "react";
import { Pages } from "../config/pages";
import Button from "../components/Button";

const CTA = () => {
  return (
    <section className="w-full px-4 py-20 md:px-8 lg:px-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xs px-8 py-16 text-white md:px-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D89267]">
              Ready to Evaluate FoldShield++
            </p>

            <h2 className="text-2xl font-semibold leading-tight md:text-4xl">
              See what your current tools are missing.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Book a 30-minute demo. We&apos;ll run FoldShield++ on structures from
              your own dataset.
            </p>
          </div>

          <a
            href={Pages[0].ctaLink}
          >
            <Button label={Pages[0].cta} btnType="secondary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
