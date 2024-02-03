import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { createComments, createReply, getComments } from 'api/comments';
import { useParams } from 'react-router-dom';
import { UserInfo } from 'api/user';
import { getFormattedDate } from 'util/date';
import { supabase } from 'types/supabase';
import { Typedata } from 'types/supabaseTable';
import commentIcon from '../../assets/img/comment.png';
import sendImg from '../../assets/img/send.png';
import { RootState } from 'redux/config/configStore';
import { useSelector } from 'react-redux';
import { getReplies } from 'api/replies';
import { isVisible } from '@testing-library/user-event/dist/utils';

interface Comment {
  user_id: string;
  reply_text: string;
  comment_id: string;
}

function ReplyBox() {
  const [reply, setReply] = useState<Comment[]>([]);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [replyText, setReplyText] = useState('');
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const queryClient = useQueryClient();
  const { id } = useParams();
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const { data: replyData } = useQuery({
    queryKey: [QUERY_KEYS.REPLIES],
    queryFn: getReplies
  });
  const { data: commentData } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: getComments
  });

  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.USERINFO],
    queryFn: UserInfo
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const handleCommentVisibility = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  const handleClickReplyBtn = (commentId: string) => {
    handleCommentVisibility();
  };

  const mutation = useMutation<void, Error, Typedata['public']['Tables']['comments']['Control']['replies'], Error>({
    mutationFn: async (newReply) => {
      await createReply(newReply);
    },
    onSuccess: (newReply) => {
      setReply((prevComments) => [...prevComments, newReply] as Comment[]);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPLIES] });
    },
    onError: (error: Error) => {
      console.error('댓글 추가 에러', error);
    }
  });

  const handleReplySubmit = async (comentId: string) => {
    if (id === undefined || user === null) return; // 해당 페이지의 id(useParams)가 undefined이거나 user가 null일 경우 return 해줌으로써 예외처리
    const newReply: Comment = {
      user_id: user.id,
      reply_text: replyText,
      comment_id: comentId
    } as Comment;
    mutation.mutateAsync(newReply);
    setReplyText('');
  };

  // const filteredReply = replyData?.filter((replies) => replies.comment_id === )

  const filteredComment = commentData?.filter((comment) => comment.id === id);

  // const filteredUser = userData?.filter((user) => user.id === )\

  return (
    <div>
      {filteredComment?.map((comment, index) => {
        const commentReplies = replyData?.filter((reply) => reply.comment_id === comment.comment_id);
        return (
          <>
            <WrappingBox key={index}>
              <ProfileImage />
              <WrappingTextBox>
                <NameAndDate>
                  <NameText>{comment.comment_nickname ? comment.comment_nickname : '무명'}</NameText>
                  <DateText>{getFormattedDate(comment.created_at)}</DateText>
                </NameAndDate>
                <CommentContent>{comment.comments}</CommentContent>
                {replyData
                  ?.filter((replies) => replies.comment_id === comment.comment_id)
                  .map((filteredReplies) => (
                    <>
                      <WrappingCommentCount>
                        <ReplyIcon>
                          <img src={commentIcon} />
                        </ReplyIcon>
                        <StNum>{commentReplies?.length}</StNum>
                        <ReplyBtn onClick={() => handleClickReplyBtn(comment.comment_id)}>답글</ReplyBtn>
                      </WrappingCommentCount>
                    </>
                  ))}
              </WrappingTextBox>
            </WrappingBox>
            {/*  */}
            <WrappingInputAndComments>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReplySubmit(comment.comment_id);
                }}
              >
                {isCommentVisible ? (
                  <InputAndSend key={comment.comment_id}>
                    <ReplyInput placeholder="댓글 남기기..." value={replyText} onChange={handleChange} />
                    <SendReplyBtn />
                  </InputAndSend>
                ) : (
                  <div></div>
                )}
              </form>

              {isCommentVisible &&
                filteredComment.map((comment, index) => (
                  <>
                    {replyData
                      ?.filter((reply) => reply.comment_id === comment.comment_id)
                      .map((filteredReply) =>
                        filteredReply ? (
                          <WrappingReplyBox key={index}>
                            <ProfileImage />
                            <WrappingTextBox>
                              <NameAndDate>
                                <NameText>
                                  {filteredReply.comment_nickname ? filteredReply.comment_nickname : '무명'}
                                </NameText>
                                <DateText>{getFormattedDate(filteredReply.created_at)}</DateText>
                              </NameAndDate>
                              <CommentContent>{filteredReply.reply_text}</CommentContent>
                              {/* <WrappingCommentCount>
                              <ReplyIcon>
                                <img src={commentIcon} />
                              </ReplyIcon>
                              <NumberText></NumberText>
                              <StNum>{}</StNum>
                            </WrappingCommentCount> */}
                            </WrappingTextBox>
                          </WrappingReplyBox>
                        ) : (
                          // eslint-disable-next-line react/jsx-key
                          <div></div>
                        )
                      )}
                  </>
                ))}
            </WrappingInputAndComments>
          </>
        );
      })}
    </div>
  );
}

const WrappingInputAndComments = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: fit-content;
  gap: 15px;
`;

const InputAndSend = styled.div`
  display: flex;
  flex-direction: row;
  width: 1240px;
  height: 40px;
  position: relative;
`;

const ReplyInput = styled.input`
  width: 1240px;
  height: 40px;
  border: 0px;
  border-radius: 10px;
  margin-left: 40px;
  background-color: ${(props) => props.theme.color.inputcolor};
  text-indent: 15px;
  color: ${(props) => props.theme.color.white};
`;

const WrappingBox = styled.div`
  display: flex;
  width: 1240px;
  height: fit-content;
  flex-direction: row;
  margin-bottom: 15px;
  gap: 10px;
`;

const WrappingReplyBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 1220px;
  height: fit-content;
  padding-left: 40px;
  gap: 10px;
`;

const ReplyBtn = styled.button`
  align-items: center;
  display: flex;
  border: 0px;
  background-color: transparent;
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

const NumberText = styled.div`
  display: flex;
  flex-direction: row;
  width: 43px;
  height: 24px;
  object-fit: cover;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50px;
  background-color: aqua;
  border: 0px;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
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

const WrappingTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: fit-content;
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

const WrappingCommentCount = styled.div`
  width: 37px;
  height: 24px;
  display: flex;
  flex-direction: row;
  gap: 4px;
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

const SendReplyBtn = styled.button`
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

const StNum = styled.div`
  display: flex;
  margin-top: 3px;
  width: 9px;
  height: 14px;
`;

export default ReplyBox;
