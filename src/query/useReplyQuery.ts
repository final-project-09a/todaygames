import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComments, updateComments } from 'api/comments';
import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import { QUERY_KEYS } from './keys';

export const useCommentQuery = () => {
  const queryClient = useQueryClient();
  const createCommentsMutation = useMutation({
    mutationFn: createComments
  });
  return createCommentsMutation;
};
