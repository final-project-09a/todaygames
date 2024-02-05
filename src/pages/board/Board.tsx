import { BoardCategory } from 'components/board/BoardCategory';
import { BoardList } from 'components/board/BoardList';
import { StCommunityContainer, StboardListContainer } from './styles';

export const Board = () => {
  return (
    <StCommunityContainer>
      <StboardListContainer>
        <BoardCategory />
        <BoardList />
      </StboardListContainer>
    </StCommunityContainer>
  );
};
