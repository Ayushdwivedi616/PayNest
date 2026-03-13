import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
async function check() {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (data && data.length > 0) {
        fs.writeFileSync('schema_columns.txt', Object.keys(data[0]).join(', '));
    } else if (data) {
        // try an insert to get columns
        const { data: iData } = await supabase.from('users').insert([{ email: 'test_col@example.com', password: 'abc' }]).select();
        if (iData && iData.length > 0) fs.writeFileSync('schema_columns.txt', Object.keys(iData[0]).join(', '));
    }
}
check();
