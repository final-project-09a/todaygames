import { BoardCategory } from 'components/board/BoardCategory';
import { BoardList } from 'components/board/BoardList';
import { useEffect } from 'react';
import { StCommunityContainer, StboardListContainer } from './styles';
import { useDispatch } from 'react-redux';
import { getPostsWithCount } from 'api/post';
import { setFilteredPosts } from '../../redux/modules/boardSlice';

export const Board = () => {
  const dispatch = useDispatch();

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
      <StboardListContainer>
        <BoardCategory />
        <BoardList />
      </StboardListContainer>
    </StCommunityContainer>
  );
};
