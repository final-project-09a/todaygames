import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserInfo } from 'api/user';
import { createComments, mappingComments } from 'api/comments';
import { getComments } from 'api/comments';
import { QUERY_KEYS } from 'query/keys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import sendImg from '../../assets/img/send.png';
import { getReplies } from 'api/replies';
import ReplyBox from './ReplyBox';

type userInfotypelist = {
  userInfoData: React.ReactNode;
};

interface Comment {
  userid: string;
  comment_id: number;
  comments: string;
  created_at: Date;
}

interface replies {
  user_id: string;
  reply_id: number;
  reply_text: string;
  created_at: string;
  comment_id: string;
}
interface ButtonProps {
  onClick(): () => ButtonProps;
}

const Comment = () => {
  const [actionComment, setActionComment] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });

  const handleCommentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  const handleReplySubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newComment = {
      user_id: user!.id,
      comment_nickname: user!.nickname,
      comment_id: 3,
      comments: commentContent
    };
    createComments(newComment);
    setCommentContent('');
    alert('댓글입력을 완료했습니다!');
  };

  // 댓글 정보 가져오기
  useEffect(() => {
    getComments(); // 댓글 data 실행?
  }, []);
  // 댓글과 대댓글을 담을 이차원 배열 선언
  // const commentArrayContent: [Comment[], replies[]] = [[], []];
  // const { data: repliesData } = useQuery({ queryKey: [QUERY_KEYS.REPLIES], queryFn: getReplies });
  // const { data: commentData } = useQuery({
  //   queryKey: [QUERY_KEYS.COMMENTS],
  //   queryFn: getComments
  // });

  return (
    <>
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

        {/* <form onClick={handleReplySubmit}>
          <input value={commentContent} onChange={handleCommentOnChange} placeholder="댓글 남기기" />
          <button>제출</button>
        </form> */}
      </StcommentContainer>
    </>
  );
};

export default Comment;

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
  height: 479px;
  margin-bottom: 30px;
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 10px;
  white-space: nowrap;
  color: ${(props) => props.theme.color.white};
  padding: 20px;
`;
