import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';

// supabase에 저장된 전체 user 정보 가져오기
export const UserInfo = async (): Promise<Typedata['public']['Tables']['userinfo']['Row'][]> => {
  try {
    const { data } = await supabase.from('userinfo').select('*');
    const userinfoData = data;
    // console.log('userinfo', userinfoData);
    return userinfoData || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
