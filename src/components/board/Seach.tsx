import React from 'react';
import styled from 'styled-components';

export const Seach = () => {
  return (
    <React.Fragment>
      <StlightContainer>
        <input type="seach" value="검색" />
      </StlightContainer>
    </React.Fragment>
  );
};
const StlightContainer = styled.div`
  display: flex;
`;
