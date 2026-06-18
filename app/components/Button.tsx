'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { ArrowRight } from "lucide-react"

interface ButtonProps {
  label: string
  type?: "button" | "reset" | "submit"
  onClick?: () => void
  showIcon?: boolean
}

const Button = ({
  label,
  type = "button",
  onClick,
  showIcon = true,
}: ButtonProps) => {
  const iconRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    if (!iconRef.current) return

    gsap.to(iconRef.current, {
      x: 6,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleLeave = () => {
    if (!iconRef.current) return

    gsap.to(iconRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className=" group flex items-center gap-2 rounded-full bg-[#E8B9A3] text-white pl-4 pr-1 h-10 cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
      <span className="text-sm font-medium whitespace-nowrap">
        {label}
      </span>

      {showIcon && (
        <div
          ref={iconRef}
          className=" flex items-center justify-center w-12 h-8 rounded-full bg-[#D89267] ">
          <ArrowRight size={20} strokeWidth={2.5} />
        </div>
      )}
    </button>
  )
}

export default Button