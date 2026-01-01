import { createClient } from '@supabase/supabase-js';


let supabase;

export function getSupabaseClient() {
    if (supabase) return supabase;

    const supabaseUrl = process.env.SUPABASE_URL;
    const dbKey = process.env.SUPABASE_SECRET_KEY;

    supabase = createClient(supabaseUrl, dbKey);
    console.log("supabase connected");
    
    
    return supabase;
}

