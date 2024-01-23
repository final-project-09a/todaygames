import React from 'react';
import styled from 'styled-components';

type GenreCardProps = {
  imageUrl: string;
  tag: string;
  onClick?: () => void;
  isSelected: boolean;
};

const GenreCard = React.memo(({ imageUrl, tag, onClick, isSelected }: GenreCardProps) => {
  return (
    <StCardWrapper onClick={onClick} $isSelected={isSelected}>
      <img src={imageUrl} alt="tag" />
      <StTagName>{tag}</StTagName>
    </StCardWrapper>
  );
});
GenreCard.displayName = 'GenreCard';
export default GenreCard;

const StCardWrapper = styled.div<{ $isSelected: boolean }>`
  position: relative;
  overflow: hidden;
  width: 220px;
  height: 300px;
  margin-left: 10px;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0.17%, rgba(0, 0, 0, 0) 99.93%);
  border: ${(props) => (props.$isSelected ? '5px solid white' : 'none')};
  overflow: hidden;
  cursor: pointer;
  & img {
    object-fit: cover;
  }
`;

const StTagName = styled.h2`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: 500;
`;
