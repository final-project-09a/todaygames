import { BoardCategory } from 'components/board/BoardCategory';
import { Seach } from 'components/board/Seach';
import styled from 'styled-components';
export const BoardDetail = () => {
  return (
    <>
      <StdetailContainer>
        <BoardCategory />
        <BoardDetail />
        <Seach />
      </StdetailContainer>
    </>
  );
};

const StdetailContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const Category = styled.div`
  flex: 1;
  background-color: white;
`;
const Detail = styled.div`
  flex: 1;
  background-color: greenyellow;
`;
