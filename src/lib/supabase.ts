import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oebjgyaqodmzhfypzxed.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lYmpneWFxb2RtemhmeXB6eGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzIwNTYsImV4cCI6MjA4ODUwODA1Nn0.k73ClvCFtnVRtyc4Eh7c0ygE688KHAL6pS0SdQWHn80'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Submission {
  id?: number
  name: string
  flower: string
  created_at?: string
}

export async function saveSubmission(submission: Omit<Submission, 'id' | 'created_at'>) {
  // Check if Supabase is configured
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url_here') {
    console.log('Supabase not configured. Skipping database save.')
    console.log('Submission data:', submission)
    return { data: submission, error: null }
  }

  const { data, error } = await supabase
    .from('submissions')
    .insert([submission])
    .select()

  if (error) {
    console.error('Error saving submission:', error)
  }

  return { data, error }
}
