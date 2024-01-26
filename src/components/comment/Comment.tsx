import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserInfo } from 'api/user';
import { mappingComments } from 'api/comments';
import { getComments } from 'api/comments';
import { QUERY_KEYS } from 'query/keys';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { getReplies } from 'api/replies';
import comments from 'assets/icons/comments.svg';
import thumsUp from 'assets/icons/thumsUp.svg';
import send from 'assets/icons/send.svg';
import Button from 'common/Button';
import { useCommentQuery } from 'query/useReplyQuery';
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
  console.log('userinfoData', userInfoData);
  const { data: mappingData } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: mappingComments
  });
  console.log('mappingData', mappingData);
  const addReplyMutate = useCommentQuery();

  const handleCommentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  const handleReplySubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newReply = {
      comments: commentContent,
      user_id: user?.id,
      comment_id: 8
    };
  };

  // 댓글 정보 가져오기
  useEffect(() => {
    getComments(); // 댓글 data 실행?
  }, []);
  // 댓글과 대댓글을 담을 이차원 배열 선언
  const commentArrayContent: [Comment[], replies[]] = [[], []];
  const { data: repliesData } = useQuery({ queryKey: [QUERY_KEYS.REPLIES], queryFn: getReplies });
  const { data: commentData } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: getComments
  });

  console.log('commentData', commentData);
  // 댓글 0 대댓글 1 저장
  commentArrayContent[0] = commentData || [];
  commentArrayContent[1] = repliesData || [];
  console.log('commentArrayContent', commentArrayContent);
  // 데이터 요청
  // const commentButtoneventHandler = () => {
  //   mappingData?.map((comm, index) => (
  //     <div key={index}>
  //       <div>{comm.avatar_url}</div>
  //       <div>{comm.nickname}</div>
  //       <form>
  //         <p>{comm.comments}</p>
  //         <div>
  //           <img src={comments} />
  //           <p>5</p>
  //         </div>
  //         <div>
  //           <img src={thumsUp} />
  //           <p>5</p>
  //         </div>
  //       </form>
  //     </div>
  //   ));
  // };
  // 댓글,대댓글 filter
  const filtercommentData = mappingData?.filter((comm) => comm.userid === user?.id);
  // const filterArrayComments = commentArrayContent.filter(); // 댓글 필터링

  //댓글 테이블 저장 기능
  // 1. 먼저 댓글 ui부터하자
  // 2. 해당 유저가 댓글입력하면 본인 프로플이랑 내용 나오는지 테이블에 잘 들어가는지 확인
  // 댓글 테이블
  // 댓글 조회
  // 조회된 댓글 시각화
  //대댓글 기능 추가 =>댓글의 하위 항목으로

  return (
    <>
      <StcommentContainer>
        {/* <form onClick={handleReplySubmit}>
          <input value={commentContent} onChange={handleCommentOnChange} placeholder="댓글 남기기" />
          <button>제출</button>
        </form> */}
        <StUpdateSoon>댓글 기능은</StUpdateSoon>
        <StUpdateSoon>곧 업데이트 될 예정입니다</StUpdateSoon>
      </StcommentContainer>
    </>
  );
};

export default Comment;

const StUpdateSoon = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 90%;
  height: 100%;
  font-size: 100px;
  color: #999;
`;

const StcommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
// 댓글 구현 로직
//1. 테이블 확인
//.2 css 구현
//3. 유저정보 불러오기
// 4. 로그인 할시 댓글 가능
