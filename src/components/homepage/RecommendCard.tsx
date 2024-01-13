import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface RecommendCardProps {
  children: ReactNode;
  imageUrl: string;
}

function RecommendCard({ children, imageUrl }: RecommendCardProps) {
  return (
    <StCardWrapper>
      <StImageWrapper>
        <StImage imageUrl={imageUrl} />
      </StImageWrapper>
      <StNameOverlay>
        <h3>{children}</h3>
      </StNameOverlay>
    </StCardWrapper>
  );
}

export default RecommendCard;

const StCardWrapper = styled.div`
  position: relative;
  width: 275px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
`;

const StImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const StImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.imageUrl}) center/cover no-repeat;
  transition: transform 0.3s ease;
  ${StCardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const StNameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${StCardWrapper}:hover & {
    opacity: 1;
  }
`;