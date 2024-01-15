import RecommendList from 'components/homepage/RecommendList';
import NewGames from 'components/homepage/NewGames';
import GenreSlider from 'components/homepage/GenreSlider';
import Header from 'components/Header';
import { StContainer, StMainWrapper, StSection } from './styles';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMostPlayedGames } from 'api/games';
import SelectedGenreList from 'components/homepage/SelectedGenreList';

const Home = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 마운트 될 때 캐시삭제
    queryClient.invalidateQueries({ queryKey: ['recommendGames'] });
  }, [queryClient]);

  // 가장 많이 플레이된 게임 100개 불러오기
  const {
    isLoading,
    isError,
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

  if (isLoading) {
    <p>게임 정보를 불러오는 중입니다...</p>;
  }

  if (isError) {
    <p>게임 정보를 불러오지 못했습니다.</p>;
  }

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
          <NewGames />
        </StSection>
        <StSection>
          <h1>장르별 탐색</h1>
          <GenreSlider />
          <SelectedGenreList mostPlayedGames={mostPlayedGames} />
        </StSection>
      </StMainWrapper>
    </StContainer>
  );
};

export default Home;
