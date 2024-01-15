import { useQueries, useQuery } from '@tanstack/react-query';
import { getGameDetails, getTopReleases } from 'api/steamApis';
import NewGameCard from './NewGameCard';
import styled from 'styled-components';

const NewGames = () => {
  // 월별 최신 출시 게임 30개
  const { isLoading, isError, data } = useQuery({
    queryKey: ['topReleases'],
    queryFn: getTopReleases
  });

  const appids = data?.map((item: any) => item.appid).slice(0, 2) || [];

  // // 100개 중 가장 최근에 출시된 게임 2개 sorting
  // const appids = mostPlayedGames
  //   ?.map((game: any) => game.appid)
  //   .sort((a: any, b: any) => b - a)
  //   .slice(0, 2);

  if (isLoading) {
    <p>게임 정보를 불러오는 중입니다...</p>;
  }

  if (isError) {
    <p>게임 정보를 불러오지 못했습니다.</p>;
  }

  // 최신 게임 2개 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids?.map((appid: any) => ({
      queryKey: ['topReleasesInfo', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  const gameDetailsArray = gameDetailsQueries?.map((query: any) => query.data);

  return (
    <StListContainer>
      {gameDetailsArray
        .filter((gameDetals) => gameDetals && gameDetals.steam_appid)
        .map((gameDetails) => (
          <li key={gameDetails?.steam_appid}>{gameDetails && <NewGameCard $imageUrl={gameDetails?.header_image} />}</li>
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
