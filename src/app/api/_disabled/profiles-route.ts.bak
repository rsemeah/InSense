import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ profiles: data })
  } catch (err: any) {
    console.error('🔥 Error fetching profiles:', err)
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 })
  }
}
