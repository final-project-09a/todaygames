import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/post';
import { QUERY_KEYS } from 'query/keys';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const BoardCategory = () => {
  const [initCategory, setInitCategory] = useState(['액션']);
  useEffect(() => {
    getPosts();
  });

  const { isLoading: postsLoading, data: postsData = [] } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  return (
    <>
      <StboardLeftCategory>
        <label>정렬</label>
        <StLabel>
          <StvideoInput type="radio" id="recent" name="sort" value="최근순" />
          최근순
        </StLabel>
        <StLabel>
          <StvideoInput type="radio" id="popular" name="sort" value="인기순" />
          인기순
        </StLabel>
        <label>장르</label>
        {postsData.map((list) => (
          <button key={list.id}>{list.category}</button>
        ))}
      </StboardLeftCategory>
    </>
  );
};
const StvideoInput = styled.input`
  height: 17px;
  width: 39px;
  background-color: #2d4ea5;
`;
const StLabel = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  transform: translate(-20%, -50%);
`;
const StboardLeftCategory = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
  button {
    display: inline-flex;
    flex-direction: column;
    width: 232px;
    height: 46px;
    color: #ffffff;
    border-color: #666666;
    border: 1px solid;
    border-radius: 10px;
    background-color: #191919;
    line-height: normal;
    align-items: center;
    padding: 15px 0 0 10px;
    cursor: pointer;
  }
  label {
    margin-top: 40px;
    background-color: #232323;
    height: 60px;
    width: 230px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: #ffffff;
    border-radius: 7px;
  }
  h3 {
  }
`;
