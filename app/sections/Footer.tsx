import Image from 'next/image'
import GradientLabel from '../components/GradientLabel'
import { SocialIcon } from '../components/SocialIcons'
import ParticleGrid from '../components/ParticleGrid'
import SlidingPillToggle from '../components/SlidingPillToggle'

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    <footer className="relative px-2.5 md:px-2.5 lg:px-25 pt-14 flex gap-10 justify-between w-full">
      <div className='absolute left-0 top-0 h-full w-full z-0'>
        <ParticleGrid />  
      </div> 
      <div className="flex flex-col space-y-4 z-10">
        <div className="flex flex-col gap-6 max-w-md">
          <div className="flex items-center gap-2">
            <Image src="/rexcrux/foldshield.png" width={32} height={32} alt="Rexcrux logo" />
            <GradientLabel label="FOLDSHIELD++" />
          </div>

          <p className="text-lg leading-relaxed dark:text-gray-300">
            A Symbolic – Topological Structural Intelligence Engine for Protein Analysis
          </p>

          <div className="flex flex-col gap-1">
            <p className="text-sm dark:text-gray-400">Email</p>
            <p className="text-2xl dark:text-white">info@rexcrux.com</p>
          </div>

          <div className="flex items-center gap-4 mt-2 cursor-pointer">
            <SocialIcon href="https://www.facebook.com/620183561187722" src="/icon/facebook.png" />
            <SocialIcon href="https://www.linkedin.com/in/marcos-guerrero-ceo-rpa-86740b25" src="/icon/linkedin.png" />
          </div>
        </div>
        <div className="h-px w-full bg-gray-200 dark:bg-white/10" />
        <p className="text-xs w-full text-gray-500 dark:text-gray-400 mb-4">
          Copyright © {year} Rexcrux - All Rights Reserved.
        </p>
      </div>
      <div className=' absolute right-10 hidden md:block'>
        <SlidingPillToggle />
      </div>
    </footer>
  )
}

export default Footer