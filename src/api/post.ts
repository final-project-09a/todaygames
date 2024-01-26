import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import { QUERY_KEYS } from 'query/keys';
interface Post {
  id: string;
  content: string;
}
export const getPosts = async (): Promise<Typedata['public']['Tables']['posts']['Row'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).select(`*`);
    // .order('create_At', { ascending: false }); // 날짜 컬럼

    const { data } = await supabase.from(QUERY_KEYS.POSTS).select('*');

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updatedataPosts = async (postId: string): Promise<Typedata['public']['Tables']['posts']['Update'][]> => {
  try {
    const { data, error } = await supabase.from('posts').update('content, id').eq('id', postId).single();

    if (error) {
      throw new Error(`게시물 업데이트 중 오류가 발생했습니다: ${error.message}`);
    }
    console.log(data); // 수정된 게시물 데이터 출력
    // 수정된 게시물 데이터 반환

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
