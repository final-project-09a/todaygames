import React from 'react';
import {
  StContainer,
  StHeader,
  StFigure,
  StTitle,
  StTagWrapper,
  StTag,
  StGameInfo,
  StButton,
  StInfoWrapper
} from './styles';

const Header = () => {
  return (
    <StContainer>
      <StHeader>
        <StFigure></StFigure>
        <StInfoWrapper>
          <StGameInfo>
            <StTitle>Game Name</StTitle>
            <StTagWrapper>
              <StTag>
                <p>tag1</p>
              </StTag>
              <StTag>
                <p>tag1</p>
              </StTag>
              <StTag>
                <p>tag1</p>
              </StTag>
              <StTag>
                <p>tag1</p>
              </StTag>
            </StTagWrapper>
          </StGameInfo>
          <StButton>Play Now</StButton>
        </StInfoWrapper>
      </StHeader>
    </StContainer>
  );
};

export default Header;
