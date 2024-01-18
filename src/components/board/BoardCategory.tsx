import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/post';
import { GENRE_NAME } from 'constants/genre';
import { QUERY_KEYS } from 'query/keys';
import { MouseEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typedata } from 'shared/supabase.type';

export const BoardCategory = () => {
  useEffect(() => {
    getPosts();
  });
  const { isLoading: postsLoading, data: postsData = [] } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    const genrefilterButton = GENRE_NAME.filter((genre) => postsData.some((post) => post.category === genre.tag));
    console.log(genrefilterButton);
    if (genrefilterButton.length === 0) {
      return null;
    }
  };

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
        {GENRE_NAME.map((list, index) => (
          <button onClick={handleButtonClick} key={index}>
            {list.tag}
          </button>
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
  margin: 5px auto 10px auto;
  transform: translate(-20%, -50%);
`;
const StboardLeftCategory = styled.form`
  display: flex;
  flex-direction: column;
  width: 25%;
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
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: #ffffff;
    border-radius: 7px;
  }
  h3 {
  }
`;
// BoardCategory의 카테고리의 버튼을 클릭 할 경우
//  해당장르의  Main component에서  게시판리스트 필터링해서 보여줌 여기서 defalut는 모든 게시판 출력된 상태
//  궁금증: 카테고리만 클릭해도 Main 에서 게시판 리스트에서 렌더링되면서  장르에 맞는 게시판리스트가 출력될까?
