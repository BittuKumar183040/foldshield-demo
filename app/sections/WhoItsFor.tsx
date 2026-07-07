"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GradientLabel from "../components/GradientLabel";
import HorizontalEntity from "../components/HorizontalEntity";
import { heading, subHeading, WHO_ITS_FOR } from "../config/whoItsFor";
import MediaReveal from "../components/ui/MediaReveal";

gsap.registerPlugin(ScrollTrigger);

const WhoItsFor = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: -16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="who-its-for"
      className="flex flex-col gap-8 md:gap-10 w-full pb-20 pt-20 px-2.5 md:px-6 lg:px-25"
    >
      <div ref={labelRef} style={{ opacity: 0 }}>
        <GradientLabel
          label={heading}
          size="3xl"
          weight="normal"
        />
      </div>

      <p
        ref={headingRef}
        className="max-w-xl md:max-w-2xl text-lg md:text-xl text-black/50 dark:text-white/50 leading-relaxed"
        style={{ opacity: 0 }}
      >
        {subHeading}
      </p>

      <div className="flex flex-col relative" style={{ paddingLeft: 24 }}>
        {WHO_ITS_FOR.map((item, index) => (
          <MediaReveal src={item.hoveredContentURL} type={item.mediaType} key={item.title}>
          <HorizontalEntity
            key={item.title}
            title={item.title}
            desc={item.desc}
            index={index}        
          />
          </MediaReveal>
        ))}

        <div className="border-t border-black/10 dark:border-white/10" />
      </div>
    </section>
  );
};

export default WhoItsFor;