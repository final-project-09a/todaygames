import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import { QUERY_KEYS } from 'query/keys';
interface Post {
  id: string;
  content: string;
}
export const getPosts = async (): Promise<Typedata['public']['Tables']['posts']['Row'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).select('*');

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updatedataPosts = async (
  postId: string,
  content: string
): Promise<Typedata['public']['Tables']['posts']['Insert']> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ id: postId, content: content })
      .eq('id', postId)
      .single();

    if (error) {
      throw new Error(`게시물 업데이트 중 오류가 발생했습니다: ${error.message}`);
    }
    console.log(data);

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletedata = async (id: string, user_id: string) => {
  // try {
  await supabase.from('posts').delete().eq('user_id', user_id).eq('id', id);

  // const { data } = await supabase.from('posts').delete().eq('id', id).eq('user_id', user_id);
  //   return data || [];
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }
};
