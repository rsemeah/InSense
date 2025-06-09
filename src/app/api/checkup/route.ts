import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { emotional, mental, physical, spiritual, reflection } = body

  const prompt = `
You are a compassionate wellness coach. Given the following states:
- Emotional: ${emotional}/10
- Mental: ${mental}/10
- Physical: ${physical}/10
- Spiritual: ${spiritual}/10
Reflection: "${reflection}"

Provide a short motivational and insightful response.
`

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    })

    const feedback = completion.choices[0].message.content
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('OpenAI error:', error)
    return NextResponse.json({ feedback: 'Sorry, something went wrong.' }, { status: 500 })
  }
}
