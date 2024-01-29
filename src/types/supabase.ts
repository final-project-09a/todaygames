import { createClient } from '@supabase/supabase-js';
import { Typedata } from 'types/supabaseTable';

type supabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};
const supabaseConfig = <supabaseConfig>{
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseKey: process.env.REACT_APP_SUPABASE_APIKEY
};

export const supabase = createClient<Typedata>(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);
