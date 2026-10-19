'use client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
let client: SupabaseClient | null = null;
/** Intentionally never stores credentials in localStorage, sessionStorage or cookies.
 * A full refresh creates a new JS runtime and requires a new admin login. */
export function browserSupabase(): SupabaseClient {
 if (!client) {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!key) throw new Error('Supabase browser environment variables are not configured.');
  client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
 }
 return client;
}
