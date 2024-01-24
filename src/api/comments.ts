import { supabase } from 'shared/supabase';
import { Typedata } from 'types/supabase.type';
import { QUERY_KEYS } from 'query/keys';

// 댓글 && userid mix (2Table)
export const mappingComments = async (): Promise<
  | {
      userid: string;
      comment_id: number;
      comments: string;
      created_at: Date;
      avatar_url: string;
      nickname: string;
    }[]
  | null
> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.COMMENTS).select('*, userinfo(avatar_url, nickname)');
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComments = async (): Promise<Typedata['public']['Tables']['comments']['Select'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.COMMENTS).select('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//댓글데이터 삽입
export const createComments = async (): Promise<Typedata['public']['Tables']['comments']['CommentsUrl'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.COMMENTS).insert('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 댓글데이터 수정
export const updateComments = async (): Promise<Typedata['public']['Tables']['comments']['CommentsUrl'][]> => {
  try {
    const { data } = await supabase.from(QUERY_KEYS.COMMENTS).update('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
