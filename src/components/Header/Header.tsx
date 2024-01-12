import React from 'react';
import {
  StContainer,
  StHeaderWrapper,
  StHeader,
  StImage,
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
      <StHeaderWrapper>
        <StHeader>
          <StImage></StImage>
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
      </StHeaderWrapper>
    </StContainer>
  );
};

export default Header;
