import React from 'react'

interface ResultCardProps {
  percentage: string,
  component: string,
  rate: string,
}

const ResultCard = ({percentage, component, rate}:ResultCardProps) => {
  return (    <div className=' flex flex-col justify-between gap-1 p-4 rounded-2xl text-xs border border-[#E8B9A3]/20 backdrop-blur-md'>
      <p className=' text-3xl text-[#E8B9A3] font-bold'>{percentage}%</p>
      <p className=' text-xl'>{component}</p>
      <p>Pass Rate</p>
      <p className=' text-md text-[#D89267]'>{rate}</p>
    </div>
  )
}

export default ResultCard