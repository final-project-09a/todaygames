import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import { QUERY_KEYS } from 'query/keys';
import { useDispatch } from 'react-redux';

export const getPosts = async (): Promise<Typedata['public']['Tables']['posts']['Row'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).select(`*`);
    // .order('create_At', { ascending: false }); // 날짜 컬럼
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePosts = async (): Promise<Typedata['public']['Tables']['posts']['Update'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).update('*');
    //.order('create_At', { ascending: false }); // 날짜 컬럼
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
console.log('updatePosts', updatePosts);

// export const deletePosts = async (): Promise<Typedata['public']['Tables']['posts']['Delete'][]> => {
//   try {
//     const { data } = await supabase
//       .from(QUERY_KEYS.POSTS)
//       .delete('content')
//       .eq('id', 1)
//       .single()
//       .then((response) => dispatch(response.data));
//     //.order('create_At', { ascending: false }); // 날짜 컬럼
//     return data || [];
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// getPosts()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
