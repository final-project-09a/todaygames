import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';

export const UserInfo = async (): Promise<Typedata['public']['Tables']['userinfo']['Row'][]> => {
  try {
    const { data } = await supabase.from('userinfo').select('*');
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
