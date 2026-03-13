import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
async function check() {
    const { data, error } = await supabase.from('users').insert([{ email: 'test12345@example.com', password: 'abc' }]).select();
    console.log('Result:', JSON.stringify({ data, error }, null, 2));
}
check();
