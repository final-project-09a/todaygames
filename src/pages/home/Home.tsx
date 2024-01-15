import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { useState } from 'react';
import RecommendList from 'components/homepage/RecommendList';
import RecommendList from 'components/homepage/recommendList';
import NewGames from 'components/homepage/NewGames';
import GenreFilter from 'components/homepage/GenreFilter';
import Header from 'components/Header';
import { StContainer, StMainWrapper, StSection } from './styles';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMostPlayedGames } from 'api/games';

const Home = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 마운트 될 때 캐시삭제
    queryClient.invalidateQueries({ queryKey: ['recommendGames'] });
  }, [queryClient]);

  // 가장 많이 플레이된 게임 100개 불러오기
  const {
    isLoading: mostPlayedLoading,
    isError: mostPlayedError,
    data: mostPlayedGames
  } = useQuery({
    queryKey: ['recommendGames'],
    queryFn: async () => {
      try {
        const data = await getMostPlayedGames();
        return data;
      } catch (error) {
        console.error('most played games 패치 에러: ', error);
        throw error;
      }
    }
  });

  return (
    <StContainer>
      <StSection>
        <Header mostPlayedGames={mostPlayedGames} />
      </StSection>
      <StMainWrapper>
        <StSection>
          <h1>이번 주 추천 리스트</h1>
          <RecommendList mostPlayedGames={mostPlayedGames} />
        </StSection>
        <StSection>
          <h1>새로나온 게임</h1>
          <NewGames mostPlayedGames={mostPlayedGames} />
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
