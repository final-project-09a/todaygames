import { BoardCategory } from 'components/board/BoardCategory';
import { Main } from 'components/board/Main';
import { useState } from 'react';
import styled from 'styled-components';
import { GENRE_NAME } from 'constants/genre';
// 1. BoardCategory에 있는 filteredPosts 얘를 Board 컴포넌트에서 선언 후 props 넘기기 -> 채텍
// 2. 전역상태관리 -> Redux toolkit -> 세팅 -> useSelector, useDispatch

type Genre = (typeof GENRE_NAME)[number]['tag'];
export const Board = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  return (
    <>
      <StboardListContainer>
        <StCategoryContainer>
          <BoardCategory setFilteredPosts={setFilteredPosts} />
        </StCategoryContainer>
        <StContentContainer>
          <Main filteredPosts={filteredPosts} />
        </StContentContainer>
      </StboardListContainer>
    </>
  );
};
const StCategoryContainer = styled.div`
  display: flex;
  flex-basis: 30%;
  margin-top: 80px;
`;

const StContentContainer = styled.div`
  flex-basis: 70%;
`;
const StboardListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px;
  position: absolute;
  width: 1440px;
`;
