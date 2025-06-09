'use client'
import React from 'react'
import { CheckupForm } from '../components/CheckupForm'
import { ReflectionResponse } from '../components/ReflectionResponse'

export const CheckupScreen = () => {
  return (
    <div className="px-5 py-6">
      <h2 className="text-2xl font-medium mb-4">Daily Check-Up</h2>
      <p className="text-[#1E1B2E]/70 mb-6">
        How are you feeling across your emotional, mental, physical, and spiritual dimensions?
      </p>
      <CheckupForm />
      <ReflectionResponse />
    </div>
  )
}
