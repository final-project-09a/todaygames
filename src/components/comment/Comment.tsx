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
import ReplyBox from './ReplyBox';
import { useParams } from 'react-router-dom';
import { Typedata } from 'types/supabaseTable';
import { TfiComments } from 'react-icons/tfi';
import userImage from '../../assets/img/userimg.png';
import commentIcon from '../../assets/img/comment.png';
import { getFormattedDate } from 'util/date';
import { getReplies } from 'api/replies';

type userInfotypelist = {
  userInfoData: React.ReactNode;
};

interface Comment {
  user_id: string;
  comment_nickname: string;
  comments: string;
  id: string;
  avatar_url: string;
}

const Comment = () => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentContent, setCommentContent] = useState('');
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const { id } = useParams();
  const { data: replyData } = useQuery({
    queryKey: [QUERY_KEYS.REPLIES],
    queryFn: getReplies
  });
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

  const handleClickReplyBtn = (commentId: string) => {
    setSelectedCommentId((prev) => (prev === commentId ? null : commentId));
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

  const handleCommentSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (id === undefined || user === null) return; // 해당 페이지의 id(useParams)가 undefined이거나 user가 null일 경우 return 해줌으로써 예외처리
    const newComment: Comment = {
      id: id,
      user_id: user.id,
      comment_nickname: user.nickname,
      comments: commentContent,
      avatar_url: user.avatar_url
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
  console.log(replyData);

  return (
    <>
      {filteredComment?.length === 0 ? (
        <StcommentContainer>
          <NoComment>
            <StNoComment />
            아직 댓글이 없습니다.
          </NoComment>
          <form onSubmit={handleCommentSubmit}>
            <StProfileAndInput>
              {user?.avatar_url ? <ProfileImage src={user?.avatar_url} /> : <ProfileImage src={userImage} />}
              <InputAndSend>
                <CommentInput value={commentContent} onChange={handleCommentOnChange} placeholder="댓글 남기기..." />
                <SendBtn />
              </InputAndSend>
            </StProfileAndInput>
          </form>
        </StcommentContainer>
      ) : (
        <>
          {filteredComment?.map((comment, index) => {
            const filteredReplies = replyData?.filter((reply) => reply.comment_id === comment.comment_id);
            return (
              <StcommentContainer key={index}>
                <WrappingBox key={index}>
                  {comment.avatar_url ? <ProfileImage src={user?.avatar_url} /> : <ProfileImage src={userImage} />}
                  <WrappingTextBox>
                    <NameAndDate>
                      <NameText>
                        {comment.comment_nickname ? comment.comment_nickname : '닉네임을 설정해주세요'}
                      </NameText>
                      <DateText>{getFormattedDate(comment.created_at)}</DateText>
                    </NameAndDate>
                    <CommentContent>{comment.comments}</CommentContent>
                    <>
                      <WrappingCommentCount>
                        <ReplyIcon>
                          <img src={commentIcon} />
                        </ReplyIcon>
                        <StNum>{filteredReplies?.length}</StNum>
                        <ReplyBtn onClick={() => handleClickReplyBtn(comment.comment_id)}>답글</ReplyBtn>
                      </WrappingCommentCount>
                    </>
                    {selectedCommentId === comment.comment_id && <ReplyBox selectedCommentId={selectedCommentId} />}
                  </WrappingTextBox>
                </WrappingBox>
              </StcommentContainer>
            );
          })}
          <form onSubmit={handleCommentSubmit}>
            <StProfileAndInput>
              {user?.avatar_url ? <ProfileImage src={user?.avatar_url} /> : <ProfileImage src={userImage} />}
              <InputAndSend>
                <CommentInput value={commentContent} onChange={handleCommentOnChange} placeholder="댓글 남기기..." />
                <SendBtn />
              </InputAndSend>
            </StProfileAndInput>
          </form>
        </>
      )}
    </>
  );
};

export default Comment;

const WrappingBox = styled.div`
  display: flex;
  width: 1240px;
  height: fit-content;
  flex-direction: row;
  gap: 10px;
`;

const WrappingTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: fit-content;
`;

const WrappingCommentCount = styled.div`
  align-items: center;
  width: 37px;
  height: 24px;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const StNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
  width: 9px;
  height: 14px;
`;

const ReplyIcon = styled.div`
  display: flex;
  align-items: center;
  width: 18px;
  height: 18px;
  cursor: pointer;
  justify-content: center;
  font-size: 13px;
`;

const CommentContent = styled.div`
  display: flex;
  width: 1200px;
  height: fit-content;
  margin: 10px 0px 8px 0px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 8px;
`;

const NameText = styled.div`
  width: fit-content;
  height: 16px;
  color: #dddddd;
  font-size: 13px;
`;

const DateText = styled.div`
  width: fit-content;
  height: 16px;
  color: #999999;
  font-size: 13px;
`;

const NoComment = styled.div`
  display: flex;
  flex-direction: column;
  width: 1281px;
  height: 130px;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-bottom: 20px;
  font-family: Pretendard;
  color: #999999;
  gap: 30px;
`;

const ReplyBtn = styled.button`
  display: flex;
  border: 0px;
  background-color: transparent;
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

const StProfileAndInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1240px;
  height: 40px;
  margin: 5px 0px 10px 20px;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50px;
  background-color: transparent;
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
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 10px;
  white-space: nowrap;
  color: ${(props) => props.theme.color.white};
  padding: 20px;
`;

const StNoComment = styled(TfiComments)`
  font-size: 55px;
`;
