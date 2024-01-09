import { createClient } from '@supabase/supabase-js';
import { postsTypedata } from './supabase.type';

type supabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};
const supabaseConfig = <supabaseConfig>{
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseKey: process.env.REACT_APP_SUPABASE_APIKEY
};

export const supabasedata = createClient<postsTypedata>(supabaseConfig.supabaseKey, supabaseConfig.supabaseUrl);
