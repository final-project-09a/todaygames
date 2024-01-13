import { useEffect } from 'react';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGameDetails, getMostPlayedGames } from 'api/games';
import RecommendCard from './RecommendCard';
import styled from 'styled-components';

const RecommendList = () => {
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

  // // 가장 많이 플레이된 게임 100개 중 top 10만 가져오기
  const topTen = mostPlayedGames?.slice(0, 10);
  const appids = topTen?.map((game: any) => game.appid) || [];

  // if (isLoading) {
  //   return <p>게임 상세 정보를 로딩중입니다...</p>;
  // }
  // if (isError) {
  //   return <p>게임 상세 정보를 가져오는데 오류가 발생했습니다...</p>;
  // }
  // console.log(data);

  // top-ten 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids.map((appid: any) => ({
      queryKey: ['gameDetails', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  const gameDetailsArray = gameDetailsQueries.map((query: any) => query.data);

  // if (gameDetailsQueries.some((query) => query.isLoading)) {
  //   return <p>게임 상세 정보를 로딩중입니다...</p>;
  // }
  // if (gameDetailsQueries.some((query) => query.isError)) {
  //   return <p>게임 상세 정보를 가져오는데 오류가 발생했습니다...</p>;
  // }

  return (
    <div>
      <StListContainer>
        {gameDetailsArray.map((gameDetails) => (
          <li key={gameDetails?.appid}>
            <RecommendCard imageUrl={gameDetails?.header_image}>
              <h3>{gameDetails?.name}</h3>
            </RecommendCard>
          </li>
        ))}
      </StListContainer>
    </div>
  );
};

export default RecommendList;

const StListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;
