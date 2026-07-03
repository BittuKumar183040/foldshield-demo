// import React, { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// interface ResultCardProps {
//   percentage: string
//   component: string
//   rate: string
//   index?: number
// }

// const ResultCard = ({ percentage, component, rate, index = 0 }: ResultCardProps) => {
//   const cardRef = useRef<HTMLDivElement>(null)
//   const percentageRef = useRef<HTMLParagraphElement>(null)
//   const [displayValue, setDisplayValue] = useState('0')

//   const numericValue = parseFloat(percentage)
//   const isDecimal = percentage.includes('.')
//   const decimalPlaces = isDecimal ? (percentage.split('.')[1]?.length ?? 1) : 0

//   useEffect(() => {
//     const card = cardRef.current
//     const percentEl = percentageRef.current
//     if (!card || !percentEl) return

//     gsap.set(card, { opacity: 0})

//     const counter = { value: 0 }

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: card,
//         start: 'top 85%',
//         toggleActions: 'play none none none',
//       },
//     })

//     tl.to(card, {
//       opacity: 1,
//       duration: 0.6,
//       delay: index * 0.12,
//       ease: 'power3.out',
//     })

//     tl.to(
//       counter,
//       {
//         value: numericValue,
//         duration: 1.4,
//         ease: 'power2.out',
//         onUpdate: () => {
//           setDisplayValue(counter.value.toFixed(decimalPlaces))
//         },
//       },
//       '-=0.35'
//     )

//     return () => {
//       tl.kill()
//       ScrollTrigger.getAll().forEach((st) => {
//         if (st.trigger === card) st.kill()
//       })
//     }
//   }, [numericValue, decimalPlaces, index])


//   return (
//     <div
//       ref={cardRef}
//       className="flex flex-col justify-between gap-1 p-4 rounded-2xl text-xs border border-[#E8B9A3]/20 backdrop-blur-md cursor-default"
//       style={{ willChange: 'transform, opacity' }}
//     >
//       <p
//         ref={percentageRef}
//         className="text-3xl text-[#E8B9A3] font-bold tabular-nums"
//         style={{ letterSpacing: '-0.5px' }}
//       >
//         {displayValue}%
//       </p>
//       <p className="text-xl">{component}</p>
//       <p>Pass Rate</p>
//       <p className="text-md text-[#D89267]">{rate}</p>
//     </div>
//   )
// }

// export default ResultCard

"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ResultCardProps {
  percentage: string;
  component: string;
  rate: string;
  index?: number;
}

const ResultCard = ({
  percentage,
  component,
  rate,
  index = 0,
}: ResultCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLParagraphElement>(null);

  const [displayValue, setDisplayValue] = useState("0");

  const numericValue = parseFloat(percentage);
  const isDecimal = percentage.includes(".");
  const decimalPlaces = isDecimal
    ? percentage.split(".")[1]?.length ?? 1
    : 0;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, {
      opacity: 0,
      y: 30,
    });

    const counter = { value: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });

    tl.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power3.out",
    });

    tl.to(
      counter,
      {
        value: numericValue,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(counter.value.toFixed(decimalPlaces));
        },
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [numericValue, decimalPlaces, index]);

  return (
    <div
      ref={cardRef}
      className="
      group
      flex
      flex-col
      justify-between
      rounded-3xl
      border
      border-[#E8B9A3]/20
      bg-white/5
      dark:bg-[#111111]
      p-6
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-[#E8B9A3]/50
      hover:shadow-[0_10px_40px_rgba(232,185,163,0.15)]
      "
    >
      <p
        ref={percentageRef}
        className="text-5xl font-bold text-[#E8B9A3]"
      >
        {displayValue}%
      </p>

      <div className="mt-6 space-y-2">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {component}
        </h3>

        <p className="text-sm uppercase tracking-[0.18em] text-black/50 dark:text-white/40">
          Pass Rate
        </p>

        <p className="text-lg font-medium text-[#D89267]">
          {rate}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;