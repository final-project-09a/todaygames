import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postContents, upsertPost } from '../api/supabaseData';

// export const usePostQuery = () => {
//   const queryClient = useQueryClient();
//   const { mutate: addPostMutation } = useMutation(postContents);
//   const {mutate: upsertPostMutation} = useMutation(upsertPost, {
//     onSuc
//   })
//   return { addPostMutation };
// };
