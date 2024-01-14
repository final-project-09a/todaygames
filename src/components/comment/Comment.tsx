import { useQuery } from '@tanstack/react-query';
import { getComments } from 'api/comments';
import { supabase } from 'shared/supabase';
export const Comment = () => {
  const { data, isError } = useQuery({ queryKey: ['COMMENTLIST'], queryFn: getComments });
  return (
    <>
      {/* 댓글수,
        댓글입력창
        닉네임,날짜
        댓글내용
        댓글달기
        대댓글 */}
    </>
  );
};
