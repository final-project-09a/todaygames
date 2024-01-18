import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postContents } from '../api/supabaseData';

export const usePostQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: addPostMutation } = useMutation({ mutationFn: postContents });
  const { mutate: upsertPostMutation } = useMutation({});
  return { addPostMutation, upsertPostMutation };
};
