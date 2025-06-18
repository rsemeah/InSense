import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tslrqgfhclhxolvzodkk.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbHJxZ2ZoY2xoeG9sdnpvZGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxODk3MjIsImV4cCI6MjA2NDc2NTcyMn0.vAljdHiR6CRPtg1L15Yfaa0YLIBG4QJPvPrkQDNKLQQ';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbHJxZ2ZoY2xoeG9sdnpvZGtrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTE4OTcyMiwiZXhwIjoyMDY0NzY1NzIyfQ.-kI7uRZNJ6_UvobxMFAGZeJG-Gax6Serm4xkYJY9pJU';

// Create a standard client with anonymous user privileges (for client-side operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Don't persist the session in localStorage by default
  },
});

// Create an admin client with service role privileges (for server-side operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

// Export default client for convenience
export default supabase;
