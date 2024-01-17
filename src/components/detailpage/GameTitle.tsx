import { DataContext } from 'pages/detail/Detail';
import { useContext } from 'react';
import styled from 'styled-components';

const GameTitle = () => {
  const data = useContext(DataContext);

  return (
    <div>
      <StTitle>{data?.name}</StTitle>
      <StImageWrapper>
        <img src={data?.background_raw} alt={data?.name} />
      </StImageWrapper>
    </div>
  );
};

export default GameTitle;

const StImageWrapper = styled.figure`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 30px;
  & img {
    object-fit: cover;
  }
`;

const StTitle = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 40px;
`;
