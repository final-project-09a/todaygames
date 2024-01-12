import { createClient } from '@supabase/supabase-js';
import { Typedata } from './supabase.type';

type supabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};
const supabaseConfig = <supabaseConfig>{
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseKey: process.env.REACT_APP_SUPABASE_APIKEY
};
console.log('Supabase URL:', supabaseConfig.supabaseUrl);
console.log('Supabase API Key:', supabaseConfig.supabaseKey);

export const supabase = createClient<Typedata>(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);
