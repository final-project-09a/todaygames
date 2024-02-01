import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserInfo } from 'api/user';
import { createComments, mappingComments } from 'api/comments';
import { getComments } from 'api/comments';
import { QUERY_KEYS } from 'query/keys';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import sendImg from '../../assets/img/send.png';
import { getReplies } from 'api/replies';
import ReplyBox from './ReplyBox';
import { useParams } from 'react-router-dom';
import { Typedata } from 'types/supabaseTable';
import { error } from 'console';
import AlertModal from 'components/register/AlertModal';
import noCommentIcon from '../../assets/img/comments_icon.png';
import { TfiComments } from 'react-icons/tfi';

type userInfotypelist = {
  userInfoData: React.ReactNode;
};

interface Comment {
  user_id: string;
  comment_nickname: string;
  comments: string;
  id: string;
}

const Comment = () => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentContent, setCommentContent] = useState('');
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [modalContent, setModalContent] = useState('');
  const [isAlertModalOpen, setisAlertModalOpen] = useState(false);
  const { id } = useParams();
  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });

  const { data: commentData } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: getComments
  });

  const handleCommentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  const mutation = useMutation<void, Error, Typedata['public']['Tables']['comments']['CommentsUrl']['Select'], Error>({
    mutationFn: async (newComment) => {
      await createComments(newComment);
      setCommentCount((prevCount) => prevCount + 1);
    },
    onSuccess: (newComment) => {
      setComment((prevComments) => [...prevComments, newComment] as Comment[]);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS] });
    },
    onError: (error: Error) => {
      console.error('댓글 추가 에러', error);
    }
  });
  const filteredComment = commentData?.filter((comment) => comment.id === id);

  const handleReplySubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (id === undefined || user === null) return; // 해당 페이지의 id(useParams)가 undefined이거나 user가 null일 경우 return 해줌으로써 예외처리
    const newComment: Comment = {
      id: id,
      user_id: user.id,
      comment_nickname: user.nickname,
      comments: commentContent
    } as Comment;
    mutation.mutateAsync(newComment);
    setCommentContent('');
  };
  console.log(filteredComment);

  // 댓글 정보 가져오기
  // useEffect(() => {
  //   getComments(); // 댓글 data 실행?
  // }, []);
  // 댓글과 대댓글을 담을 이차원 배열 선언
  // const commentArrayContent: [Comment[], replies[]] = [[], []];
  // const { data: repliesData } = useQuery({ queryKey: [QUERY_KEYS.REPLIES], queryFn: getReplies });
  // const { data: commentData } = useQuery({
  //   queryKey: [QUERY_KEYS.COMMENTS],
  //   queryFn: getComments
  // });

  return (
    <>
      {filteredComment?.length === 0 ? (
        <StcommentContainer>
          <NoComment>
            <StNoComment />
            아직 댓글이 없습니다.
          </NoComment>
          <form onSubmit={handleReplySubmit}>
            <StProfileAndInput>
              <ProfileImage src={user?.avatar_url} />
              <InputAndSend>
                <CommentInput value={commentContent} onChange={handleCommentOnChange} placeholder="댓글 남기기..." />
                <SendBtn />
              </InputAndSend>
            </StProfileAndInput>
          </form>
        </StcommentContainer>
      ) : (
        <StcommentContainer>
          <ReplyBox />
          <form onSubmit={handleReplySubmit}>
            <StProfileAndInput>
              <ProfileImage src={user?.avatar_url} />
              <InputAndSend>
                <CommentInput value={commentContent} onChange={handleCommentOnChange} placeholder="댓글 남기기..." />
                <SendBtn />
              </InputAndSend>
            </StProfileAndInput>
          </form>
        </StcommentContainer>
      )}
      {/* <form onClick={handleReplySubmit}>
          <input value={commentContent} onChange={handleCommentOnChange} placeholder="댓글 남기기" />
          <button>제출</button>
        </form> */}
    </>
  );
};

export default Comment;

const NoComment = styled.div`
  display: flex;
  flex-direction: column;
  width: 1281px;
  height: 479px;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  margin-bottom: 20px;
  font-family: Pretendard;
  color: #999999;
  gap: 30px;
`;

const StProfileAndInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1240px;
  height: 40px;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50px;
  background-color: aqua;
  border: 0px;
`;

const InputAndSend = styled.div`
  display: flex;
  flex-direction: row;
  width: 1200px;
  height: 40px;
  position: relative;
`;

const SendBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 0px;
  background-color: transparent;
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 3;
  background-image: url(${sendImg});
  cursor: pointer;
`;

const CommentInput = styled.input`
  width: 1200px;
  height: 40px;
  border: 0px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.inputcolor};
  text-indent: 15px;
  color: ${(props) => props.theme.color.white};
`;

const StcommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1281px;
  height: fit-content;
  margin-bottom: 30px;
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 10px;
  white-space: nowrap;
  color: ${(props) => props.theme.color.white};
  padding: 20px;
`;

const StNoComment = styled(TfiComments)`
  font-size: 300px;
`;
