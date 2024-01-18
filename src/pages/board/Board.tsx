import { BoardCategory } from 'components/board/BoardCategory';
import { Main } from 'components/board/Main';
import styled from 'styled-components';

export const Board = () => {
  return (
    <>
      <StboardListContainer>
        <StCategoryContainer>
          <BoardCategory />
        </StCategoryContainer>
        <StContentContainer>
          <Main />
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
