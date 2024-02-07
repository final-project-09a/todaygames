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
import { TbAlertSquareFilled } from 'react-icons/tb';

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

  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.USERINFO],
    queryFn: UserInfo
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const replyDeleteMutation = useMutation({
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
    await replyDeleteMutation.mutateAsync({ for_delete });
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

  const isOwner = (userId: string) => {
    return user && user.id === userId;
  };

  const handleReport = () => {
    alert('신고기능 구현중...');
  };

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
                    .map((filteredReply, index) => {
                      const filteredUserInfo = userInfoData?.find((user) => user.id === comment.user_id);
                      if (filteredUserInfo) {
                        const postIsOwner = isOwner(filteredReply.user_id);
                        return filteredReply ? (
                          <WrappingReplyBox key={index}>
                            {filteredReply?.reply_avatar_url ? (
                              <ProfileImage src={filteredReply.reply_avatar_url} />
                            ) : (
                              <ProfileImage src={userImage} />
                            )}
                            <WrappingTextBox>
                              <NameAndDate>
                                <NameText>
                                  {filteredReply.reply_nickname
                                    ? filteredReply.reply_nickname
                                    : '닉네임을 설정해주세요'}
                                </NameText>
                                <DateText>{getFormattedDate(filteredReply.created_at)}</DateText>
                                {postIsOwner && filteredReply.comment_id && (
                                  <DeleteBtn onClick={() => handleDeleteReplyButton(filteredReply.for_delete)}>
                                    삭제
                                  </DeleteBtn>
                                )}
                                {!postIsOwner && filteredReply.comment_id && (
                                  <DeleteBtn onClick={handleReport}>
                                    <TbAlertSquareFilled />
                                  </DeleteBtn>
                                )}
                              </NameAndDate>
                              {selectedCommentId === comment.comment_id ? (
                                <CommentContent>{filteredReply.reply_text}</CommentContent>
                              ) : (
                                <div></div>
                              )}
                            </WrappingTextBox>
                          </WrappingReplyBox>
                        ) : (
                          <div></div>
                        );
                      }
                    })}
              </>
            </WrappingInputAndComments>
          </>
        );
      })}
    </div>
  );
}

const DeleteBtn = styled.button`
  display: flex;
  position: absolute;
  flex-direction: row;
  top: 3px;
  left: 1060px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  cursor: pointer;
  color: white;
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
  width: 1140px;
  height: 40px;
  border: 0px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.inputcolor};
  text-indent: 15px;
  color: ${(props) => props.theme.color.white};
  margin: 10px 0px 0px 0px;
`;

const WrappingReplyBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 1220px;
  height: fit-content;
  gap: 10px;
  margin: 10px 0px 0px 0px;
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
  width: 1100px;
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

const SendReplyBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 0px;
  background-color: transparent;
  position: absolute;
  right: 110px;
  top: 15px;
  z-index: 3;
  background-image: url(${sendImg});
  cursor: pointer;
`;

export default ReplyBox;
