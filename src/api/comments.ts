import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import { QUERY_KEYS } from 'query/keys';
import exp from 'constants';

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
export const createComments = async (newComment: Typedata['public']['Tables']['comments']['CommentsUrl']['Select']) => {
  await supabase.from(QUERY_KEYS.COMMENTS).insert(newComment);
};

// 대댓글데이터 삽입
export const createReply = async (newReply: Typedata['public']['Tables']['comments']['Control']['replies']) => {
  await supabase.from(QUERY_KEYS.REPLIES).insert(newReply);
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
