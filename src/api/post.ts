import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
import { QUERY_KEYS } from 'query/keys';

export const getPosts = async (): Promise<Typedata['public']['Tables']['posts']['Update'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).select('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
