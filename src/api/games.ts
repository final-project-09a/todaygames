import { supabase } from 'types/supabase';
import { QUERY_KEYS } from 'query/keys';

export const getGames = async () => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.GAMES).select('*');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
