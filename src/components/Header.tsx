'use client'
import React from 'react'
import { MoonIcon } from 'lucide-react'

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 px-5 py-4 bg-[#FCFCFC]/80 backdrop-blur-sm border-b border-[#F8EBDD]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-medium text-[#1E1B2E]">
            <span className="text-[#B76E79]">In</span>Sense
          </h1>
          <span className="text-xs text-[#B76E79] opacity-80">by Red</span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8EBDD] text-[#1E1B2E]">
          <MoonIcon size={18} />
        </button>
      </div>
    </header>
  )
}
