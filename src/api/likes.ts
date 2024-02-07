import { QUERY_KEYS } from 'query/keys';
import { supabase } from 'types/supabase';

// 좋아요 전체 데이터 조회
export const fetchLike = async () => {
  const { data } = await supabase.from(QUERY_KEYS.LIKE).select('*');
  return data;
};

// // 장르 필터 적용
// export const genreFilterPosts = async (limit = 5, offset = 0) => {
//   const { data } = await supabase
//     .from('posts_with_counts')
//     .select('category')
//     .range(offset, offset + limit - 1)
//     .order('created_At', { ascending: false });
//   return data;
// };

// 해당 포스트(post_id)와 유저(user_id)가 일치하는 좋아요 조회
export const matchLikes = async (userId: string, postId: string) => {
  const { data } = await supabase
    .from('user_likes')
    .select('post_id, user_id')
    .eq('post_id', postId)
    .eq('user_id', userId);
  return data;
};

// 좋아요 추가
export const createLike = async (userId: string, postId: string) => {
  await supabase.from('user_likes').upsert([
    {
      user_id: userId,
      post_id: postId
    }
  ]);
};

// 좋아요 삭제
export const deleteLike = async (userId: string, postId: string) => {
  await supabase.from('user_likes').delete().eq('user_id', userId).eq('post_id', postId);
};
