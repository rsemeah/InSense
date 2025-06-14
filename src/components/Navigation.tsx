'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import {
  HomeIcon,
  SparklesIcon,
  UserIcon,
  BookIcon,
  HeartIcon
} from 'lucide-react'

export const Navigation = () => {
  const router = useRouter()
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, href: '/' },
    { id: 'insight', label: 'Insights', icon: SparklesIcon, href: '/insight' },
    { id: 'profile', label: 'Blueprint', icon: UserIcon, href: '/profile' },
    { id: 'journal', label: 'Journal', icon: BookIcon, href: '/journal' },
    { id: 'checkup', label: 'Checkup', icon: HeartIcon, href: '/checkup' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FCFCFC] border-t border-[#F8EBDD] px-2 py-3 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className="flex flex-col items-center justify-center px-3 py-1 text-[#1E1B2E]/60 hover:text-[#B76E79] transition-all"
              onClick={() => router.push(item.href)}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
