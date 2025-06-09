'use client'
import React, { useState } from 'react'
import { ReflectionResponse } from './ReflectionResponse'

export const CheckupForm = () => {
  const [formData, setFormData] = useState({
    emotional: 5,
    mental: 5,
    physical: 5,
    spiritual: 5,
    reflection: '',
  })
  const [response, setResponse] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

const handleSubmit = async () => {
  const res = await fetch('/api/checkup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  const data = await res.json()
  setResponse(data.feedback || "Something went wrong. Please try again.")
}
}
  }

  return (
    <div className="space-y-5">
      {['emotional', 'mental', 'physical', 'spiritual'].map((aspect) => (
        <div key={aspect}>
          <label className="block font-medium capitalize mb-1">{aspect} state (1–10)</label>
          <input
            type="number"
            name={aspect}
            min={1}
            max={10}
            value={(formData as any)[aspect]}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>
      ))}

      <div>
        <label className="block font-medium mb-1">Reflection</label>
        <textarea
          name="reflection"
          value={formData.reflection}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-[#B76E79] text-white rounded shadow-md hover:opacity-90"
      >
        Save & Reflect
      </button>

      {response && <ReflectionResponse text={response} />}
    </div>
  )
}
