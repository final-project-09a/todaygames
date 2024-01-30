import React, { useState } from 'react';
import styled from 'styled-components';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { getComments } from 'api/comments';

function ReplyBox() {
  const [isLiked, setIsLiked] = useState(false);
  const { data: commentData } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: getComments
  });

  console.log();
  return (
    <div>
      <WrappingBox>
        <ProfileImage />
        <WrappingTextBox>
          <NameAndDate>
            {commentData?.map((comment) => {
              return (
                <>
                  <NameText>{comment.comment_nickname}</NameText>
                  <DateText>{comment.created_at}</DateText>
                </>
              );
            })}
          </NameAndDate>
          <ConmmentContent>댓글내용@@@@@@</ConmmentContent>
          <ReplyLikeIcon>{isLiked ? <StLike /> : <StUnLike />}</ReplyLikeIcon>
        </WrappingTextBox>
      </WrappingBox>
    </div>
  );
}

const WrappingBox = styled.div`
  width: 1240px;
  height: fit-content;
  display: flex;
  flex-direction: row;
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
const ConmmentContent = styled.div`
  display: flex;
  width: 1200px;
  height: fit-content;
  margin: 10px 0px 8px 0px;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const ReplyLikeIcon = styled.div`
  display: flex;
  align-items: center;
  width: 18px;
  height: 18px;
  cursor: pointer;
  justify-content: center;
`;

const StLike = styled(BiSolidLike)`
  font-size: 20px;
`;

const StUnLike = styled(BiLike)`
  font-size: 20px;
`;

export default ReplyBox;
