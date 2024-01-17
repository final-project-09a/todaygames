import styled from 'styled-components';

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1440px;
  margin: 10px auto;
`;

const StImageWrapper = styled.figure`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export { StContainer, StImageWrapper };
