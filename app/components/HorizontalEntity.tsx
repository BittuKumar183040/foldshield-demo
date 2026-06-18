'use client'

import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Solution = {
  title: string
  desc: string
  images?: string[]
}

const HorizontalEntity = ({ title, desc, images = [], index }: Solution & { index: number }) => {
  const [hovered, setHovered] = useState(false)

  const rowRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])

  // entry animation
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
      }
    )
  }, [index])

  // mobile hover trigger
  useEffect(() => {
    if (!rowRef.current) return;
    if (window.innerWidth >= 768) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rowRef.current!,
        start: "top 70%",
        end: "bottom 40%",
        onEnter: () => setHovered(true),
        onEnterBack: () => setHovered(true),
        onLeave: () => setHovered(false),
        onLeaveBack: () => setHovered(false),
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  // bar animation
  useEffect(() => {
    if (barRef.current)
      gsap.to(barRef.current, {
        scaleY: hovered ? 1 : 0,
        duration: 0.35,
        ease: 'power3.out'
      })
  }, [hovered])

  // title animation
  useEffect(() => {
    if (!titleRef.current) return

    const isDark = document.documentElement.classList.contains("dark")

    gsap.to(titleRef.current, {
      color: hovered
        ? (isDark ? '#ffffff' : '#000000')
        : (isDark ? '#d1d5db' : '#4b5563'),
      duration: 0.25
    })
  }, [hovered])

  // ✅ FIXED desc animation
  useEffect(() => {
    if (!descRef.current) return

    const isDark = document.documentElement.classList.contains("dark")

    gsap.to(descRef.current, {
      color: hovered
        ? (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)')
        : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)'),
      duration: 0.25,
    })
  }, [hovered])

  // index animation
  useEffect(() => {
    if (!indexRef.current) return

    const isDark = document.documentElement.classList.contains("dark")

    gsap.to(indexRef.current, {
      color: hovered
        ? '#E8B9A3'
        : (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'),
      duration: 0.25,
    })
  }, [hovered])

  // images animation
  useEffect(() => {
    const container = imagesRef.current
    const imgs = imgRefs.current.filter(Boolean)
    if (!container || imgs.length === 0) return

    if (hovered) {
      gsap.to(container, { opacity: 1, duration: 0.2 })
      gsap.fromTo(
        imgs,
        { opacity: 0, y: 16, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.07,
        }
      )
    } else {
      gsap.to(imgs, {
        opacity: 0,
        y: 10,
        scale: 0.96,
        duration: 0.25,
        ease: 'power2.in',
        stagger: { each: 0.04, from: 'end' },
      })
      gsap.to(container, { opacity: 0, duration: 0.25, delay: 0.15 })
    }
  }, [hovered])

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="read"
      className="relative flex items-center justify-between gap-8 py-8 border-t border-black/10 dark:border-white/10"
      style={{
        borderTopColor: hovered ? '#D8926755' : undefined,
        transition: 'border-color 0.3s',
        opacity: 0,
      }}
    >
      {/* side bar */}
      <div
        ref={barRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: -24,
          top: '50%',
          transform: 'translateY(-50%) scaleY(0)',
          transformOrigin: 'center',
          width: 2,
          height: '60%',
          background: '#E8B9A3',
          borderRadius: 999,
        }}
      />

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-6">
          <h3
            ref={titleRef}
            className="text-lg md:text-xl lg:text-2xl font-semibold leading-snug text-gray-600 dark:text-gray-300"
          >
            {title}
          </h3>

          <span
            ref={indexRef}
            className="text-[11px] tracking-[0.15em] font-mono text-black/20 dark:text-white/20 mt-1 shrink-0"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p
          ref={descRef}
          className="text-sm md:text-base leading-relaxed text-black/50 dark:text-white/50"
        >
          {desc}
        </p>
      </div>

      {images.length > 0 && (
        <div
          ref={imagesRef}
          className="hidden md:flex items-center gap-3 shrink-0"
          style={{ opacity: 0 }}
        >
          {images.map((src: string | StaticImport, i: number) => (
            <div
              key={i}
              ref={el => { imgRefs.current[i] = el }}
              className="relative overflow-hidden rounded-xl bg-black/5 dark:bg-white/5"
              style={{
                width: i === 1 ? 120 : 96,
                height: i === 1 ? 80 : 68,
                flexShrink: 0,
                opacity: 0,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
                unoptimized
              />

              <div className="absolute inset-0 rounded-xl border border-black/10 dark:border-white/10 bg-white/10 dark:bg-white/5" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HorizontalEntity