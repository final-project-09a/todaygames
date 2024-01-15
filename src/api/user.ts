import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';

export const UserInfo = async (): Promise<Typedata['public']['Tables']['userinfo']['Row'][]> => {
  const { data } = await supabase.from('userinfo').select('*');
  const userinfoData = data;
  console.log('userinfo', userinfoData);
  return userinfoData || [];
};
