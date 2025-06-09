'use client'
import React from 'react'
import { CheckupForm } from '@/components/CheckupForm'

export default function CheckupPage() {
  return (
    <div className="px-5 py-6">
      <h1 className="text-2xl font-semibold mb-4">Daily Check-In</h1>
      <CheckupForm />
    </div>
  )
}
