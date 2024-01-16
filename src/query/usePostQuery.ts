import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postContents, upsertPost } from '../api/supabaseData';
import { Post } from 'types/global.d';

export const usePostQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: addPostMutation } = useMutation({ mutationFn: postContents });
  const { mutate: upsertPostMutation } = useMutation({});
  return { addPostMutation, upsertPostMutation };
};
