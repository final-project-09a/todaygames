import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import { QUERY_KEYS } from 'query/keys';
interface Post {
  id: string;
  content: string;
}
export const getPosts = async (): Promise<Typedata['public']['Tables']['posts']['Row'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).select('*').order('user_id', { ascending: true });

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatedataPosts = async (
  postId: string,
  postTitle: string,
  postGame: string,
  postCategory: string,
  postContent: string,
  postImage: string[]
) => {
  try {
    const { data } = await supabase
      .from('posts')
      .update({
        title: postTitle,
        game: postGame,
        category: postCategory,
        content: postContent,
        image: postImage
      })
      .eq('id', postId);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletedata = async (
  id: string,
  user_id: string,
): Promise<Typedata['public']['Tables']['posts']['Delete'][]> => {
  try {
    const { data } = await supabase.from('posts').delete().eq('id', id).eq('user_id', user_id);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
