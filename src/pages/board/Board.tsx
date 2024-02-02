import { BoardCategory } from 'components/board/BoardCategory';
import { BoardList } from 'components/board/BoardList';
import { useEffect, useState } from 'react';
import { StCommunityContainer, StboardListContainer, Sttitle } from './styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPostsWithCount } from 'api/post';
import { setFilteredPosts } from '../../redux/modules/boardSlice';
import { RootState } from 'redux/config/configStore';
// 1. BoardCategory에 있는 filteredPosts 얘를 Board 컴포넌트에서 선언 후 props 넘기기 -> 채텍
// 2. 전역상태관리 -> Redux toolkit -> 세팅 -> useSelector, useDispatch

export const Board = () => {
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state: RootState) => state.boardSlice.selectedGenres);
  const filteredPosts = useSelector((state: RootState) => state.boardSlice.filteredPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostsWithCount();
        if (data && data.length > 0) {
          dispatch(setFilteredPosts(data));
        } else {
          console.log('포스트 불러오기 오류');
        }
      } catch (error) {
        console.error('Error fetching likes data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StCommunityContainer>
      <Sttitle>커뮤니티</Sttitle>
      <StboardListContainer>
        <BoardCategory />
        <BoardList />
      </StboardListContainer>
    </StCommunityContainer>
  );
};
