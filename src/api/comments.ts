import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
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

// 댓글 데이터 삭제
export const deleteComments = async ({ comment_id, user_id }: { comment_id: string, user_id: string }): Promise<void> => {
  try {
    await supabase
      .from(QUERY_KEYS.COMMENTS)
      .delete()
      .eq('comment_id', comment_id)
      .eq('user_id', user_id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//대댓글데이터 삭제
export const deleteReply = async (
  { for_delete }: { for_delete: string }
): Promise<Typedata['public']['Tables']['comments']['Control']['delete_replies'][]> => {
  try {
    const { data } = await supabase.from('replies').delete().match({ for_delete});
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 대댓글데이터 삽입
export const createReply = async (newReply: Typedata['public']['Tables']['comments']['Control']['replies']) => {
  await supabase.from(QUERY_KEYS.REPLIES).insert(newReply);
};

