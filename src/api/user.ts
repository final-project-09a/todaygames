import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';

export const UserInfo = async (): Promise<Typedata['public']['Tables']['userinfo']['Row'][]> => {
  try {
    const { data } = await supabase.from('userinfo').select('*');
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// useId와 일치하는 유저 정보(닉네임, 아바타)만 가져오기
export const UserInfoById = async (userId: string) => {
  try {
    const { data } = await supabase.from('userinfo').select('id, nickname, avatar_url').eq('id', userId);
    if (data && data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};