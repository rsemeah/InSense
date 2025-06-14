'use client'
import React from 'react'

interface Props {
  text: string
}

export const ReflectionResponse = ({ text }: Props) => {
  return (
    <div className="mt-6 p-4 bg-[#F8EBDD] rounded-xl border border-[#E6D5C3] shadow-sm">
      <h2 className="text-lg font-semibold text-[#1E1B2E] mb-2">Insight from Within</h2>
      <p className="text-sm text-[#1E1B2E]/80 whitespace-pre-line">{text}</p>
    </div>
  )
}
