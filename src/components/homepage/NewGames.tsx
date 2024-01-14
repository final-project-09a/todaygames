import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGameDetails, getMostPlayedGames } from 'api/games';
import React, { useEffect } from 'react';
import NewGameCard from './NewGameCard';
import styled from 'styled-components';

interface NewGamesProps {
  mostPlayedGames: any;
}

const NewGames = ({ mostPlayedGames }: NewGamesProps) => {
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   // 마운트 될 때 캐시삭제
  //   queryClient.invalidateQueries({ queryKey: ['newGames'] });
  // }, [queryClient]);

  // // 가장 많이 플레이된 게임 100개 불러오기
  // const {
  //   isLoading: mostPlayedLoading,
  //   isError: mostPlayedError,
  //   data: mostPlayedGames
  // } = useQuery({
  //   queryKey: ['newGames'],
  //   queryFn: async () => {
  //     try {
  //       const data = await getMostPlayedGames();
  //       return data;
  //     } catch (error) {
  //       console.error('most played games 패치 에러: ', error);
  //       throw error;
  //     }
  //   }
  // });

  const appids = mostPlayedGames
    ?.map((game: any) => game.appid)
    .sort((a: any, b: any) => b - a)
    .slice(0, 2);

  console.log(appids);

  if (!appids) {
    return null;
  }

  // 최신 게임 2개 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids?.map((appid: any) => ({
      queryKey: ['gameDetails', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  const gameDetailsArray = gameDetailsQueries?.map((query: any) => query.data);
  console.log(gameDetailsArray);

  return (
    <StListContainer>
      {gameDetailsArray.map((gameDetails) => (
        <li key={gameDetails?.appid}>{gameDetails && <NewGameCard imageUrl={gameDetails?.header_image} />}</li>
      ))}
    </StListContainer>
  );
};

export default NewGames;

const StListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;
