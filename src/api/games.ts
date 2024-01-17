import { supabase } from 'shared/supabase';
import { QUERY_KEYS } from 'query/keys';
import { setData, setError, setLoading } from '../redux/modules/gameSlice';
import { getGameDetails } from './steamApis';

export const getGames = async () => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.GAMES).select('*');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// // 리덕스툴킷 전역상태로 data 저장
// export const fetchGameData = (appid: number) => async (dispatch: any) => {
//   dispatch(setLoading(true));
//   try {
//     const data = await getGameDetails(appid);
//     dispatch(setData(data));
//   } catch (error) {
//     dispatch(setError(true));
//   } finally {
//     dispatch(setLoading(false));