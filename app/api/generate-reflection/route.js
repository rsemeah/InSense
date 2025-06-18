import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { emotional, mental, physical, spiritual, reflection } = body;

    // Validate inputs
    if (!emotional || !mental || !physical || !spiritual) {
      return NextResponse.json(
        { error: 'Missing required rating fields' },
        { status: 400 }
      );
    }

    // Create a prompt for the OpenAI model
    const prompt = `
As a compassionate wellness coach and spiritual guide, analyze the following self-assessment:

Ratings (1-10 scale):
- Emotional: ${emotional}/10
- Mental: ${mental}/10
- Physical: ${physical}/10
- Spiritual: ${spiritual}/10

Personal Reflection: "${reflection || 'No reflection provided'}"

Based on this information, provide a thoughtful, personalized insight that:
1. Acknowledges their current state with empathy
2. Identifies potential patterns or imbalances
3. Offers 1-2 specific suggestions for improvement
4. Ends with an encouraging affirmation

Keep the response concise (150-200 words), warm, and supportive.
`;

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 300,
    });

    // Extract the response
    const aiResponse = completion.choices[0].message.content;

    // Return the AI-generated insight
    return NextResponse.json({ insight: aiResponse });
  } catch (error) {
    console.error('Error generating reflection:', error);
    return NextResponse.json(
      { error: 'Failed to generate reflection' },
      { status: 500 }
    );
  }
}
