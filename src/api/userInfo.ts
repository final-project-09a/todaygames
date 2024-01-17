// import { QUERY_KEYS } from 'query/keys';
// import { supabase } from 'shared/supabase';
// import { Typedata } from 'shared/supabase.type';

// // export const UserInfo = async (): Promise<Typedata['public']['Tables']['userinfo']['Row'][]> => {
// //   const { data } = await supabase.from('userinfo').select('*');
// //   const userinfoData = data;
// //   console.log('userinfo', userinfoData);
// //   return userinfoData || [];
// // };
// // UserInfo()
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((error) => {
// //     console.error(error);
// //   });

// export const getUserInfo = async () => {
//   try {
//     const { data } = await supabase.from(QUERY_KEYS.USERINFO).select();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
