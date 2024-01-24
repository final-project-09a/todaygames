import { useQueries, useQuery } from '@tanstack/react-query';
import { getGameDetails, getTopReleases } from 'api/steamApis';
import NewGameCard from './NewGameCard';
import styled from 'styled-components';
import { Game } from './RecommendList';

interface DataType {
  appid: number | undefined;
}

const NewGames = () => {
  // 월별 최신 출시 게임 30개
  const { isLoading, isError, data } = useQuery({
    queryKey: ['topReleases'],
    queryFn: getTopReleases
  });
  const appids = data?.map((item: DataType) => item.appid).slice(0, 2) || [];

  if (isLoading) {
    <p>게임 정보를 불러오는 중입니다...</p>;
  }

  if (isError) {
    <p>게임 정보를 불러오지 못했습니다.</p>;
  }

  // 최신 게임 2개 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids?.map((appid: number) => ({
      queryKey: ['topReleasesInfo', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  const gameDetailsArray = gameDetailsQueries?.map((query) => query.data as Game);

  return (
    <StListContainer>
      {gameDetailsArray
        .filter((gameDetails) => gameDetails && gameDetails.steam_appid)
        .map((gameDetails) => (
          <li key={gameDetails?.steam_appid}>{gameDetails && <NewGameCard gameDetails={gameDetails} />}</li>
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
