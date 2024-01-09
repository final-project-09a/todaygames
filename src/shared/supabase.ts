import { createClient } from '@supabase/supabase-js';

type supabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};
const supabaseConfig = <supabaseConfig>{
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseKey: process.env.REACT_APP_SUPABASE_APIKEY
};

export const supabasedata = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);
