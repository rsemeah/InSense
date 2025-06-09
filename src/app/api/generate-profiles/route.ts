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
Based on the following birth data, generate a spiritual self-discovery profile:

Full Name: ${fullName}
Birthday: ${birthDate}
Birth Time: ${birthTime || 'N/A'}
Birth Location: ${birthLocation}

Return ONLY valid JSON in this format (no text outside curly braces):

{
  "human_design": {
    "type": "",
    "authority": "",
    "strategy": ""
  },
  "astrology": {
    "sun": "",
    "moon": "",
    "rising": ""
  },
  "numerology": {
    "life_path": "",
    "destiny": "",
    "soul_urge": "",
    "birthday_number": ""
  }
}
`

    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
    })

    const raw = chat.choices[0].message.content || ''
    const firstBrace = raw.indexOf('{')
    const lastBrace = raw.lastIndexOf('}')

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in OpenAI response.")
    }

    const jsonString = raw.slice(firstBrace, lastBrace + 1)
    const parsed = JSON.parse(jsonString)

    const { error } = await supabase.from('profiles').insert({
      full_name: fullName,
      birth_date: birthDate,
      birth_time: birthTime,
      birth_location: birthLocation,
      profile_data: parsed,
    })

    if (error) {
      console.error("Supabase insert error:", error)
    }

    return NextResponse.json({ profiles: parsed })
  } catch (err) {
    console.error("🔥 Parsing error:", err)
    return NextResponse.json({ error: "Invalid OpenAI format or quota issue. Try again." }, { status: 500 })
  }
}
