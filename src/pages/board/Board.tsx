import { BoardCategory } from 'components/board/BoardCategory';
import { Main } from 'components/board/Main';
import { getPosts } from 'api/post';
import { useState } from 'react';
import { QUERY_KEYS } from 'query/keys';
import styled from 'styled-components';
import { GENRE_NAME } from 'constants/genre';
import { useQuery } from '@tanstack/react-query';
import { Typedata } from 'shared/supabase.type';
// 1. BoardCategory에 있는 filteredPosts 얘를 Board 컴포넌트에서 선언 후 props 넘기기 -> 채텍
// 2. 전역상태관리 -> Redux toolkit -> 세팅 -> useSelector, useDispatch
interface GenreType {
  postsData: Typedata['public']['Tables']['posts'][];
}
type Genre = (typeof GENRE_NAME)[number]['tag'];
export const Board = () => {
  const [filteredPosts, setFilteredPosts] = useState<(string | undefined)[]>([]);
  const { data: postsData = [] } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });
  const genrefilterOnClick = (tag: Genre) => {
    const newFilteredPosts: (string | undefined)[] = postsData
      .filter((post) => post.category.includes(tag))
      .map((post) => post.category);
    setFilteredPosts(newFilteredPosts); // 상태가 업데이트 되면 렌더링
    // dispatch()
  };
  return (
    <>
      <StboardListContainer>
        <StCategoryContainer>
          <BoardCategory genrefilterOnClick={genrefilterOnClick} />
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
