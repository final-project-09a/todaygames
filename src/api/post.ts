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
  limit: number,
  offset: number,
  orderType: '최근순' | '인기순'
): Promise<Typedata[ 'public' ][ 'Tables' ][ 'posts' ][ 'Row' ][]> =>
{
  let query = supabase
  .from('posts_with_counts')
  .select('*')
  .range(offset * limit, (offset + 1) * limit - 1)
  .order(orderType === '최근순' ? 'created_At' : 'like_count', { ascending: false });
  if ( selectedGenres.length > 0 )
  {
    query = query.like('category', `%${selectedGenres.join(', ')}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const updatedataPosts = async (
  postId: string,
  postTitle: string,
  postGame: string,
  postCategory: string,
  postContent: string,
  postImage: string[],
  review:string,
  star_rating:string
) => {
  try {
    const { data } = await supabase
      .from('posts')
      .update({
        title: postTitle,
        game: postGame,
        category: postCategory,
        content: postContent,
        image: postImage,
        review, star_rating
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

// 게임 이름과 일치하는 게시글만 불러오기
export const getPostsWithGameName = async (gameName: string) => {
  try {
    const response = await supabase.from(QUERY_KEYS.POSTS).select('id, user_id, star_rating, review').eq('game', gameName);
    if (response.data && response.data.length > 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
