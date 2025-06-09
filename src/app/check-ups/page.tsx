'use client'

import { useState } from 'react'

export default function CheckUps() {
  const [formData, setFormData] = useState({
    emotional: '',
    mental: '',
    physical: '',
    spiritual: '',
    reflection: '',
  })

  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const prompt = `
Today’s emotional rating: ${formData.emotional}/10
Mental rating: ${formData.mental}/10
Physical rating: ${formData.physical}/10
Spiritual rating: ${formData.spiritual}/10

Reflection:
${formData.reflection}

Please provide a warm, intuitive summary of this state to support gentle growth.
    `

    const res = await fetch('/api/generate-reflection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    const data = await res.json()
    setSummary(data.summary)
    setLoading(false)
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-4">Daily Check-In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['emotional', 'mental', 'physical', 'spiritual'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field} (1–10)</label>
            <input
              type="number"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              min={1}
              max={10}
              className="w-full p-2 rounded border"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">Your Reflection</label>
          <textarea
            name="reflection"
            value={formData.reflection}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          {loading ? 'Reflecting...' : 'Submit & Reflect'}
        </button>
      </form>

      {summary && (
        <div className="mt-8 bg-white/10 backdrop-blur p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Your Reflection Summary:</h2>
          <p className="whitespace-pre-line text-white">{summary}</p>
        </div>
      )}
    </main>
  )
}
