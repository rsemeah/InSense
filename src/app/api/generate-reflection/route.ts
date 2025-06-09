import { NextResponse } from 'next/server'
import { openai } from '@/lib/openai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  })

  const summary = chat.choices[0].message.content
  return NextResponse.json({ summary })
}
