import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import { QUERY_KEYS } from 'query/keys';

export const getPosts = async (): Promise<Typedata['public']['Tables']['posts']['Row'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).select('*').order('created_At', { ascending: true });

    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 무한스크롤 구현을 위한 post 데이터
export const getPostsWithCount = async (limit = 5, offset = 0) => {
  const { data } = await supabase
    .from('posts_with_counts')
    .select('*')
    .range(offset, offset + limit - 1)
    .order('created_At', { ascending: false });
  return data;
};

// 장르 필터를 위한 post 데이터
export const genreFilterPosts = async (
  selectedGenres: string[],
  limit = 5,
  offset = 0
): Promise<Typedata['public']['Tables']['posts']['Row'][]> => {
  if (selectedGenres.length === 0) {
    const { data, error } = await supabase
      .from('posts_with_counts')
      .select('*')
      .range(offset * limit, (offset + 1) * limit - 1)
      .order('created_At', { ascending: false });
    if (error) throw error;
    return data;
  }
  const { data, error } = await supabase
    .from('posts_with_counts')
    .select('*')
    .range(offset * limit, (offset + 1) * limit - 1)
    .order('created_At', { ascending: false })
    .like('category', `%${selectedGenres.join(', ')}%`);
  if (error) throw error;
  return data;
};

// export const genreFilterPosts = async (genre: string[], limit = 5, offset = 0) => {
//   const { data } = await supabase
//     .from('posts_with_counts')
//     .select('*')
//     .range(offset, offset + limit - 1)
//     .order('created_At', { ascending: false })
//     .in('category', genre);
//   return data;
// };

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
  user_id: string
): Promise<Typedata['public']['Tables']['posts']['Delete'][]> => {
  try {
    const { data } = await supabase.from('posts').delete().eq('id', id).eq('user_id', user_id);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
