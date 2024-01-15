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
`;

const StContentContainer = styled.div`
  flex-basis: 70%;
`;
const StboardListContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  text-align: center;
  flex-direction: row;
  margin-top: 40px;
`;
