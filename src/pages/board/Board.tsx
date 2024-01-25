import { BoardCategory } from 'components/board/BoardCategory';
import { BoardList } from 'components/board/BoardList';
import { useState } from 'react';
import { StCommunityContainer, StboardListContainer, Sttitle } from './styles';
import { updatedataPosts } from 'api/post';
// 1. BoardCategory에 있는 filteredPosts 얘를 Board 컴포넌트에서 선언 후 props 넘기기 -> 채텍
// 2. 전역상태관리 -> Redux toolkit -> 세팅 -> useSelector, useDispatch

export const Board = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [editingText, setEditText] = useState([updatedataPosts]);

  return (
    <StCommunityContainer>
      <Sttitle>커뮤니티</Sttitle>
      <StboardListContainer>
        <BoardCategory setFilteredPosts={setFilteredPosts} filteredPosts={filteredPosts} />
        <BoardList filteredPosts={filteredPosts} setEditText={setEditText} editingText={editingText} />
      </StboardListContainer>
    </StCommunityContainer>
  );
};
