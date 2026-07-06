import React from "react";

const CTA = () => {
  return (
    <section className="w-full px-4 py-20 md:px-8 lg:px-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-neutral-950 px-8 py-16 text-white md:px-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#D89267]">
              Ready to Evaluate FoldShield++
            </p>

            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              See what your current tools are missing.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Book a 30-minute demo. We'll run FoldShield++ on structures from
              your own dataset.
            </p>
          </div>

          <a
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#D89267] hover:text-white"
          >
            Book a Demo
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
