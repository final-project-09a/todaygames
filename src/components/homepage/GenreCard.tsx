import React from 'react';
import styled from 'styled-components';

type GenreCardProps = {
  tag: string;
  onClick: () => void;
};

const GenreCard = ({ tag, onClick }: GenreCardProps) => {
  return <StCardWrapper onClick={onClick}>{tag}</StCardWrapper>;
};

export default GenreCard;

const StCardWrapper = styled.div`
  width: 220px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0.17%, rgba(0, 0, 0, 0) 99.93%);
  cursor: pointer;
`;
