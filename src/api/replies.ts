import { QUERY_KEYS } from 'query/keys';
import { supabase } from 'types/supabase';

export const getReplies = async () => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.REPLIES).select('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
