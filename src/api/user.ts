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
