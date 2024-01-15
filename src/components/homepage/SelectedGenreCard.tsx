import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import React from 'react';
import styled from 'styled-components';

interface SelectedGenreCardProps {
  gameInfoList: any;
}

const SelectedGenreCard = ({ gameInfoList }: SelectedGenreCardProps) => {
  return (
    <StContainer>
      <StCardWrapper>
        <StImageFigure $imageUrl={gameInfoList.header_image}></StImageFigure>
        <StGameName>{gameInfoList.name}</StGameName>
        <StGameName>{gameInfoList.name}</StGameName>
      </StCardWrapper>
    </StContainer>
  );
};

export default SelectedGenreCard;

const StContainer = styled.div`
  height: 304px;
  width: 350px;
  background-color: #232323;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 7px;
`;

const StCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StImageFigure = styled.figure<{ $imageUrl: string }>`
  height: 200px;
  width: 100%;
  background: url(${(props) => props.$imageUrl}) center/cover no-repeat;
  border-radius: 10px 10px 0px 0px;
`;

const StGameName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  color: #fff;
`;
