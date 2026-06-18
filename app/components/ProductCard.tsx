'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Button from './Button'
import GradientLabel from './GradientLabel'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ProductCardProps = {
  logo?: string
  title: string
  description: string
  capabilitiesLabel?: string
  bullets: string[]
  buttonLabel?: string
  buttonHref?: string
  onButtonClick?: () => void
  index?: number
  getCurrent?: number
}

const ProductCard = ({
  logo,
  title,
  description,
  capabilitiesLabel = 'Capabilities:',
  bullets,
  buttonLabel = 'Know More',
  buttonHref,
  onButtonClick,
  index = 0,
  getCurrent
}: ProductCardProps) => {
  const [hovered, setHovered] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const capLabelRef = useRef<HTMLParagraphElement>(null)
  const bulletsRef = useRef<(HTMLLIElement | null)[]>([])
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (barRef.current)
      gsap.to(barRef.current, { scaleY: hovered ? 1 : 0, duration: 0.35, ease: 'power3.out' })
  }, [hovered])

  useEffect(() => {
    if (titleRef.current)
      gsap.to(titleRef.current, { opacity: hovered ? 1 : 0.75, duration: 0.25 })
  }, [hovered])

  useEffect(() => {
    if (!descRef.current) return

    const isDark = document.documentElement.classList.contains("dark")

    gsap.to(descRef.current, {
      color: hovered
        ? (isDark ? '#ffffff' : '#000000')
        : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'),
      duration: 0.25,
    })
  }, [hovered])

  useEffect(() => {
    if (indexRef.current) {
      const isDark = document.documentElement.classList.contains("dark")

      gsap.to(indexRef.current, {
        color: hovered
          ? '#06b6d4'
          : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)'),
        duration: 0.25,
      })
    }
  }, [hovered])

  useEffect(() => {
    const items = bulletsRef.current.filter(Boolean)
    if (!items.length) return

    if (hovered) {
      gsap.to(items, {
        x: 4,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.04,
      })
    } else {
      gsap.to(items, {
        x: 0,
        duration: 0.25,
        ease: 'power2.in',
        stagger: { each: 0.03, from: 'end' },
      })
    }
  }, [hovered])

  useEffect(() => {
    if (logoRef.current)
      gsap.to(logoRef.current, {
        scale: hovered ? 1.06 : 1,
        duration: 0.4,
        ease: 'power2.out',
      })
  }, [hovered])

  useEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;

    const ctx = gsap.context(() => {
      gsap.set(el, {
        scale: 0.92,
        transformOrigin: "center center",
      });

      gsap.to(el, {
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "center 50%",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress > 0.95) setHovered(true);
            else setHovered(false);
          }
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    console.log("Clicked on index: " + index + " project: " + title)
    if (onButtonClick) onButtonClick()
    else if (buttonHref) window.open(buttonHref, '_blank', 'noopener noreferrer')
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="read"
      className=" product-card relative backdrop-blur-xl flex flex-col gap-5 p-6 bg-gray-50/20 dark:bg-black/10 text-black dark:text-white border border-black/10 dark:border-white/10 border-t-black/10 dark:border-t-white/10 hover:border-t-cyan-400/40 transition-all duration-300"
    >
      <div
        ref={barRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%) scaleY(0)',
          transformOrigin: 'center',
          width: 2,
          height: '60%',
          background: '#22d3ee',
          borderRadius: 999,
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div ref={logoRef} className="shrink-0 h-12 w-12">
            {logo ? <img src={logo} alt={title} /> : null}
          </div>
          <div ref={titleRef} style={{ opacity: 0.75 }}>
            <GradientLabel label={title} size="2xl" weight="bold" />
          </div>
        </div>
      </div>

      <div className='h-px w-full bg-gray-200 dark:bg-gray-700' />

      {/* ✅ Tailwind base + GSAP override */}
      <p
        ref={descRef}
        className="text-md leading-relaxed text-black/60 dark:text-white/60"
      >
        {description}
      </p>

      <div className="flex flex-col gap-2">
        <p
          ref={capLabelRef}
          className="text-sm font-semibold tracking-widest uppercase text-black dark:text-white"
        >
          {capabilitiesLabel}
        </p>

        <ul className="flex flex-col gap-1.5">
          {bullets.map((point, i) => (
            <li
              key={i}
              ref={el => { bulletsRef.current[i] = el }}
              className="flex items-start gap-3 text-sm text-black/80 dark:text-white/80"
            >
              <span className="mt-0.5 shrink-0">—</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-end mt-auto pt-2">
        <Button label={buttonLabel} onClick={handleClick} showIcon />
      </div>
    </div>
  )
}

export default ProductCard