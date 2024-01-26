import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { supabase } from 'types/supabase';

// 북마크 전체 데이터 조회
export const fetchBookmark = async () => {
  const { data } = await supabase.from(QUERY_KEYS.BOOKMARK).select('*');
  return data;
};

// 해당 게임(app_id)의 북마크 조회
export const matchGameBookmark = async (userId: string) => {
  const { data } = await supabase.from(QUERY_KEYS.BOOKMARK).select().match({ user_id: userId });
  return data;
};

// 해당 유저(user_id)의 북마크 조회
export const matchUserBookmark = async (appId: number) => {
  const { data } = await supabase.from(QUERY_KEYS.BOOKMARK).select().match({ app_id: appId });
  return data;
};

// 해당 게임(app_id)과 유저(user_id)가 일치하는 북마크 조회
export const matchBookmark = async (userId: string, appId: number) => {
  const { data } = await supabase
    .from('user_bookmarks')
    .select('user_id, app_id')
    .eq('user_id', userId)
    .eq('app_id', appId);
  return data;
};

// 북마크 추가
export const createBookmark = async (userId: string, appId: number) => {
  await supabase.from('user_bookmarks').upsert([
    {
      user_id: userId,
      app_id: appId
    }
  ]);
};

// 북마크 삭제
export const deleteBookmark = async (userId: string, appId: number) => {
  await supabase.from('user_bookmarks').delete().eq('user_id', userId).eq('app_id', appId);
};
