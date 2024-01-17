import styled from 'styled-components';

const StContainer = styled.div`
  display: block;
  /* flex-direction: column; */
`;

const StMainWrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
  & h1 {
    font-size: ${(props) => props.theme.fontSize.xxxl};
    font-weight: 500;
  }
`;

const StSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  gap: 30px;
`;

export { StContainer, StMainWrapper, StSection };
