import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
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

getGames()
  .then((data) => {
    console.log('supabasegameData', data);
  })
  .catch((error) => {
    console.error(error);
  });

// const getTopTenGameDetails = async () => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/top-ten`);
//     console.log('most played games 데이터 :', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('top ten fetch error: ', error);
//     throw error;
//   }
// };
