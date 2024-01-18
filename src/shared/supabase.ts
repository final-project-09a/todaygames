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

export const supabase = createClient<Typedata>(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey); // 타입 선언
