import styled from 'styled-components';

const StContainer = styled.div`
  width: 1280px;
  margin: 50px auto;
  & p {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

const StSearchResultWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 13px;
`;

const StNoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export { StContainer, StSearchResultWrapper, StNoResultWrapper };
