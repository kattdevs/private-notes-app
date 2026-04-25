const { createClient } = require ('@supabase/supabase-js');
require ('dotenv').config();

//This client uses the SERVICE ROLE key - it bypasses RLS 
//ONLY used on the backend server, never in the frontend !

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;