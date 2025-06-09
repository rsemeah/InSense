import { NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { fullName, birthDate, birthTime, birthLocation } = await req.json()

    if (!fullName || !birthDate || !birthLocation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const prompt = `
Generate a spiritual profile in JSON format only:

Full Name: ${fullName}
Birth Date: ${birthDate}
Birth Time: ${birthTime || 'N/A'}
Birth Location: ${birthLocation}

Format (strict!):

{
  "human_design": { "type": "", "authority": "", "strategy": "" },
  "astrology": { "sun": "", "moon": "", "rising": "" },
  "numerology": { "life_path": "", "destiny": "", "soul_urge": "", "birthday_number": "" }
}
`

    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
    })

    const raw = chat.choices[0].message.content || ''
    console.log("🧾 RAW GPT OUTPUT >>>", raw)

    const firstBrace = raw.indexOf('{')
    const lastBrace = raw.lastIndexOf('}')
    const jsonString = raw.slice(firstBrace, lastBrace + 1)

    const parsed = JSON.parse(jsonString)

    return NextResponse.json({ profiles: parsed })
  } catch (err) {
    console.error("❌ JSON Parse Error:", err)
    return NextResponse.json({ error: "Failed to parse profile data" }, { status: 500 })
  }
}
