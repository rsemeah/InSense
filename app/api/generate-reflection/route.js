import { NextResponse } from 'next/server';
import OpenAI from 'openai';
// Use relative path instead of path-alias to work in minimal setup
// import { supabaseAdmin } from '../../../lib/supabase'; // Removed database dependency
// Ensure DB tables exist
// import setupDatabase from '../../../lib/setupDatabase'; // Removed database dependency

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // ------------------------------------------------------------------
    // 1. Sanity-check required environment variables before doing work
    // ------------------------------------------------------------------
    if (!process.env.OPENAI_API_KEY) {
      console.error('[generate-reflection] Missing OPENAI_API_KEY env var');
      // Return a generic error message without exposing sensitive details
      return NextResponse.json(
        { error: 'Server misconfiguration: AI service not available' },
        { status: 500 }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { emotional, mental, physical, spiritual, reflection } = body;

    // Validate inputs - ensure basic fields are present, even if we're simplifying
    if (!emotional || !mental || !physical || !spiritual) {
      return NextResponse.json(
        { error: 'Missing required rating fields' },
        { status: 400 }
      );
    }

    // Removed database setup call for simplification
    // try {
    //   await setupDatabase();
    // } catch (setupErr) {
    //   console.error('Database setup error (continuing anyway):', setupErr);
    // }

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

    // ------------------------------------------------------------------
    // 2. Call OpenAI and capture any potential errors explicitly
    // ------------------------------------------------------------------
    let aiResponse = '';
    const fallbackInsight = "Take a deep breath and allow stillness to guide your next step. Trust that clarity will follow. Remember, every moment is a new opportunity for growth and self-discovery. You are on the right path.";

    try {
      console.log('[generate-reflection] Calling OpenAI …');
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4', // Using gpt-4 as specified in previous context
        temperature: 0.7,
        max_tokens: 300,
      });
      aiResponse = completion.choices?.[0]?.message?.content || '';

      // If AI response is empty, use fallback
      if (!aiResponse.trim()) {
        console.warn('[generate-reflection] OpenAI returned empty response, using fallback.');
        aiResponse = fallbackInsight;
      }

    } catch (openAiErr) {
      console.error('[generate-reflection] OpenAI error:', openAiErr);
      // Always return a response, even if OpenAI fails
      aiResponse = fallbackInsight;
      // Optionally, log the detailed error for debugging but don't send to client
      // return NextResponse.json(
      //   { error: 'Failed to generate AI insight', detail: `${openAiErr?.message || openAiErr}` },
      //   { status: 502 } // Use 502 Bad Gateway for upstream errors
      // );
    }

    // Removed Supabase persistence logic for simplification
    // try {
    //   console.log('[generate-reflection] Saving entry to Supabase …');
    //   await supabaseAdmin.from('inner_pulse_entries').insert({
    //     emotional,
    //     mental,
    //     physical,
    //     spiritual,
    //     reflection,
    //     ai_response: aiResponse,
    //     // In a real auth setup, replace null with the authenticated user id.
    //     user_id: null,
    //     created_at: new Date().toISOString(),
    //   });
    // } catch (dbErr) {
    //   console.error('Supabase insert error:', dbErr);
    //   // We do not fail the request if DB write fails; insight is still returned.
    // }

    // Return the AI-generated insight (or fallback)
    return NextResponse.json({ insight: aiResponse });
  } catch (error) {
    // Top-level catch – unexpected runtime failure
    console.error('[generate-reflection] Uncaught error:', error);
    // Always return a response, even for uncaught errors
    return NextResponse.json(
      { error: 'Failed to generate reflection due to an unexpected server error', detail: `${error?.message || error}` },
      { status: 500 }
    );
  }
}
