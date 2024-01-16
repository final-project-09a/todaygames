import { useQueries } from '@tanstack/react-query';
import { getGameDetails } from 'api/steamApis';
import RecommendCard from './RecommendCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Game {
  appid: number;
  header_image: string;
  name: string;
  steam_appid: number;
}

interface NewGamesProps {
  mostPlayedGames: Game[];
}

const RecommendList = ({ mostPlayedGames }: NewGamesProps) => {
  const navigate = useNavigate();

  // // 가장 많이 플레이된 게임 100개 중 top 10만 가져오기
  const topTen = mostPlayedGames?.slice(0, 10);
  const appids = topTen?.map((game: Game) => game.appid) || [];

  // top 10 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids.map((appid: number) => ({
      queryKey: ['gameDetails', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  const gameDetailsArray = gameDetailsQueries.map((query: any) => query.data);

  if (gameDetailsQueries.some((query) => query.isLoading)) {
    return <p>게임 상세 정보를 로딩중입니다...</p>;
  }
  if (gameDetailsQueries.some((query) => query.isError)) {
    return <p>게임 상세 정보를 가져오는데 오류가 발생했습니다...</p>;
  }

  return (
    <div>
      <StListContainer>
        {gameDetailsArray.map((gameDetails) => (
          <li key={gameDetails?.steam_appid}>
            <RecommendCard
              onClick={() => navigate(`/detail/${gameDetails?.steam_appid}`)}
              $imageUrl={gameDetails?.header_image}
              alt={gameDetails?.name}
            >
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
