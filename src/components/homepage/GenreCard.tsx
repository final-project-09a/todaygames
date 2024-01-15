import React from 'react';
import styled from 'styled-components';

const GenreCard = () => {
  return <StCardWrapper>GenreCard</StCardWrapper>;
};

export default GenreCard;

const StCardWrapper = styled.div`
  width: 220px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0.17%, rgba(0, 0, 0, 0) 99.93%);
`;
