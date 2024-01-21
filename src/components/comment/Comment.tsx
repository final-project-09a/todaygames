import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserInfo } from 'api/user';
import { mappingComments } from 'api/comments';
import { getComments } from 'api/comments';
import { QUERY_KEYS } from 'query/keys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { getReplies } from 'api/replies';
import { Typedata } from 'shared/supabase.type';
type userInfotypelist = {
  userInfoData: React.ReactNode;
};

interface Comment {
  userid: string;
  comment_id: number;
  comments: string;
  created_at: Date;
}
interface mappingComment {
  Select: {
    userid: string;
    comment_id: number;
    comments: string;
    created_at: Date;
  };
  Userinfo: {
    avatar_url: string;
    nickname: string;
  };
}

interface replies {
  user_id: string;
  reply_id: number;
  reply_text: string;
  created_at: string;
  comment_id: string;
}

const Comment = () => {
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });

  const { data: mappingData } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: mappingComments
  });

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
  // 데이터 요청

  // 댓글,대댓글 filter
  // const filterArrayComments = commentArrayContent.filter(); // 댓글 필터링
  //댓글 테이블 저장 기능
  // 1. 먼저 댓글 ui부터하자
  // 2. 해당 유저가 댓글입력하면 본인 프로플이랑 내용 나오는지 테이블에 잘 들어가는지 확인
  // 댓글 테이블
  // 댓글 조회
  // 조회된 댓글 시각화
  //대댓글 기능 추가 =>댓글의 하위 항목으로
  if (commentData)
    return (
      <>
        <StcommentContainer>
          <div>
            {mappingData?.map((comm, index) => (
              <div key={index}>
                <div>{comm.avatar_url}</div>
                <div>{comm.nickname}</div>
                <form>
                  <p>{comm.comments}</p>
                </form>
              </div>
            ))}
          </div>
        </StcommentContainer>
      </>
    );
};

export default Comment;

const StcommentContainer = styled.div`
  display: flex;
  background-color: #292929;
  max-width: 1281px;
  max-height: 479px;
`;
// 댓글 구현 로직
//1. 테이블 확인
//.2 css 구현
//3. 유저정보 불러오기
// 4. 로그인 할시 댓글 가능
