import React from 'react';
import styled from 'styled-components';

type GenreCardProps = {
  tag: string;
  onClick: () => void;
  isSelected: boolean;
};

const GenreCard = React.memo(({ tag, onClick, isSelected }: GenreCardProps) => {
  return (
    <StCardWrapper onClick={onClick} $isSelected={isSelected}>
      {tag}
    </StCardWrapper>
  );
});
GenreCard.displayName = 'GenreCard';
export default GenreCard;

const StCardWrapper = styled.div<{ $isSelected: boolean }>`
  height: 300px;
  flex-shrink: 0;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0.17%, rgba(0, 0, 0, 0) 99.93%);
  border: ${(props) => (props.$isSelected ? '5px solid white' : 'none')};
  cursor: pointer;
`;
