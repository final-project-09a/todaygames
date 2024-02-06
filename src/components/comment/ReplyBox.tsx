import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { createComments, createReply, deleteReply, getComments } from 'api/comments';
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
import userImage from '../../assets/img/userimg.png';
import editBtn from '../../assets/img/editBtn.png';
import { error } from 'console';

interface Comment {
  user_id: string;
  reply_text: string;
  comment_id: string;
  reply_nickname: string;
  reply_avatar_url: string;
}

function ReplyBox({ selectedCommentId }: { selectedCommentId: string | null }) {
  const [reply, setReply] = useState<Comment[]>([]);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [replyText, setReplyText] = useState('');
  const [isCommentVisible, setIsCommentVisible] = useState<Record<string, boolean>>({});

  const queryClient = useQueryClient();
  const { id } = useParams();
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

  // const handleCommentVisibility = () => {
  //   setIsCommentVisible(!isCommentVisible);
  // };

  const deleteMutation = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPLIES] });
    },
    onError: (error: Error) => {
      console.log('댓글 삭제 에러', error);
    }
  });

  const handleDeleteReplyButton = async (for_delete: string) => {
    const answer = window.confirm('정말로 삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    await deleteMutation.mutateAsync({ for_delete });
    // dispatch(setFilteredPosts(deletedFilterItems));
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
      comment_id: comentId,
      reply_nickname: user.nickname,
      reply_avatar_url: user.avatar_url
    } as Comment;
    mutation.mutateAsync(newReply);
    setReplyText('');
  };

  const filteredComment = commentData?.filter((comment) => comment.id === id);
  console.log(filteredComment);

  return (
    <div>
      {filteredComment?.map((comment, index) => {
        const commentReplies = replyData?.filter((reply) => reply.comment_id === comment.comment_id);
        console.log(commentReplies);
        return (
          <>
            {/*  */}
            <WrappingInputAndComments>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReplySubmit(comment.comment_id);
                }}
              >
                {selectedCommentId === comment.comment_id ? (
                  <InputAndSend key={comment.comment_id}>
                    <ReplyInput placeholder="답글 남기기..." value={replyText} onChange={handleChange} />
                    <SendReplyBtn />
                  </InputAndSend>
                ) : (
                  <div></div>
                )}
              </form>

              <>
                {selectedCommentId === comment.comment_id &&
                  replyData
                    ?.filter((reply) => reply.comment_id === comment.comment_id)
                    .map((filteredReply, index) =>
                      filteredReply ? (
                        <WrappingReplyBox key={index}>
                          {filteredReply?.reply_avatar_url ? (
                            <ProfileImage src={filteredReply.reply_avatar_url} />
                          ) : (
                            <ProfileImage src={userImage} />
                          )}
                          <WrappingTextBox>
                            <NameAndDate>
                              <NameText>
                                {filteredReply.reply_nickname ? filteredReply.reply_nickname : '닉네임을 설정해주세요'}
                              </NameText>
                              <DateText>{getFormattedDate(filteredReply.created_at)}</DateText>
                              <EditBtn onClick={() => handleDeleteReplyButton(filteredReply.for_delete)}>삭제</EditBtn>
                            </NameAndDate>
                            {selectedCommentId === comment.comment_id ? (
                              <CommentContent>{filteredReply.reply_text}</CommentContent>
                            ) : (
                              <div></div>
                            )}
                          </WrappingTextBox>
                        </WrappingReplyBox>
                      ) : (
                        // eslint-disable-next-line react/jsx-key
                        <div></div>
                      )
                    )}
              </>
            </WrappingInputAndComments>
          </>
        );
      })}
    </div>
  );
}

const EditBtn = styled.button`
  display: flex;
  position: absolute;
  flex-direction: row;
  top: 3px;
  left: 950px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  cursor: pointer;
  color: white;
`;

const StDeleteForm = styled.form`
  flex-direction: column;
  padding: 10px;
  justify-content: flex-end;
  display: flex;
  position: absolute;
  z-index: 20;
  right: 1.5%;
  top: 20%;
`;

const StDeleteBtn = styled.button`
  position: flex;
  height: 40px;
  width: 90px;
  background-color: #3a3a3a;
  color: ${(props) => props.theme.color.white};
  transition: 0.3s ease;
  cursor: pointer;
  & p {
    color: ${(props) => props.theme.color.white};
    font-weight: 500;
  }
  &:hover {
    & h4 {
      color: ${(props) => props.theme.color.gray};
    }
    background-color: ${(props) => props.theme.color.gray};
  }
`;

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
  width: 1100px;
  height: 40px;
  border: 0px;
  border-radius: 10px;
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
  text-align: center;
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
  background-color: transparent;
  border: 0px;
`;

const NameAndDate = styled.div`
  position: relative;
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
  align-items: center;
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
  right: 150px;
  top: 8px;
  z-index: 3;
  background-image: url(${sendImg});
  cursor: pointer;
`;

const StNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
  width: 9px;
  height: 14px;
`;

export default ReplyBox;
