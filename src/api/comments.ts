import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';

export const getComments = async (): Promise<Typedata['public']['Tables']['comments']['Row'][]> => {
  try {
    const { data } = await supabase.from('comments').select('*');
    console.log(data);
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
