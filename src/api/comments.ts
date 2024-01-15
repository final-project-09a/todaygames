import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
import { QUERY_KEYS } from 'query/keys';

export const getComments = async (): Promise<Typedata['public']['Tables']['comments']['Row'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.COMMENTS).select('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
