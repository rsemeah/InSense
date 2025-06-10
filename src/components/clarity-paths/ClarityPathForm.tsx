'use client'

import { useState } from 'react'

export default function ClarityPathForm() {
  const [spark, setSpark] = useState('')
  const [sense, setSense] = useState('')
  const [mirror, setMirror] = useState('')
  const [shape, setShape] = useState('')
  const [anchor, setAnchor] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/clarity-paths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'demo-user',
        spark,
        sense,
        mirror,
        shape,
        anchor
      })
    })

    if (res.ok) {
      setStatus('Saved to Inner Horizon ✅')
      setSpark('')
      setSense('')
      setMirror('')
      setShape('')
      setAnchor('')
    } else {
      setStatus('Error saving 😞')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <input value={spark} onChange={e => setSpark(e.target.value)} placeholder="What’s calling you?" className="w-full p-2 border rounded" />
      <input value={sense} onChange={e => setSense(e.target.value)} placeholder="Why does this matter?" className="w-full p-2 border rounded" />
      <input value={mirror} onChange={e => setMirror(e.target.value)} placeholder="What’s blocking it?" className="w-full p-2 border rounded" />
      <input value={shape} onChange={e => setShape(e.target.value)} placeholder="One tiny move?" className="w-full p-2 border rounded" />
      <input value={anchor} onChange={e => setAnchor(e.target.value)} placeholder="Reminder/cue" className="w-full p-2 border rounded" />
      <button type="submit" className="bg-red-brand text-white px-4 py-2 rounded">Save</button>
      <p className="text-sm text-gray-600">{status}</p>
    </form>
  )
}
