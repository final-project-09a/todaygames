import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { useState } from 'react';
import RecommendList from 'components/homepage/RecommendList';
import RecommendList from 'components/homepage/recommendList';
import NewGames from 'components/homepage/NewGames';
import GenreFilter from 'components/homepage/GenreFilter';
import Header from 'components/Header';
import { StContainer, StMainWrapper, StSection } from './styles';

const Home = () => {
  return (
    <StContainer>
      <StSection>
        <Header />
      </StSection>
      <StMainWrapper>
        <StSection>
          <h1>이번 주 추천 리스트</h1>
          <RecommendList />
        </StSection>
        <StSection>
          <h1>새로나온 게임</h1>
          <NewGames />
        </StSection>
        <StSection>
          <h1>장르별 탐색</h1>
          <GenreFilter />
        </StSection>
      </StMainWrapper>
    </StContainer>
  );
};

export default Home;
