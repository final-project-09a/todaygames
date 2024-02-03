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

export const getGamesWithGameName = async (gameName: string) => {
  try {
    const response = await supabase.from(QUERY_KEYS.GAMES).select('*').eq('name', gameName);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};