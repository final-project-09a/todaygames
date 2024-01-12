import { useQueries, useQuery } from '@tanstack/react-query';
import { getGameDetails, getMostPlayedGames } from 'api/games';

const RecommendList = () => {
  // const [recommendGames, setRecommendGames] = useState([]);

  // // 전체 게임 리스트
  // const {
  //   isLoading: gamesLoading,
  //   isError: gamesError,
  //   data: games
  // } = useQuery({
  //   queryKey: ['games'],
  //   queryFn: () => getGames()
  // });

  // 가장 많이 플레이된 게임 100개
  const {
    isLoading: mostPlayedLoading,
    isError: mostPlayedError,
    data: mostPlayedGames
  } = useQuery({
    queryKey: ['recommendGames'],
    queryFn: () => getMostPlayedGames()
  });

  if (mostPlayedLoading) {
    return <p>게임 리스트를 로딩중입니다...</p>;
  }
  if (mostPlayedError) {
    return <p>게임 리스트를 가져오는데 오류가 발생했습니다...</p>;
  }

  // 가장 많이 플레이된 게임 100개 중 top 10만 가져오기
  const topTen = mostPlayedGames?.slice(0, 10);
  console.log(topTen);

  // top 10 게임 details
  // const gameDetailsQueryConfigs =
  //   topTen?.map((game: any) => {
  //     const appid = game.appid;
  //     return {
  //       queryKey: ['gameDetails', appid],
  //       queryFn: () => getGameDetails(appid),
  //       enabled: appid !== undefined
  //     };
  //   }) || [];

  // const gameDetailsQueries = useQueries(gameDetailsQueryConfigs);

  // if (gameDetailsQueries.some((query) => query.isLoading)) {
  //   return <p>게임 상세 정보를 로딩중입니다...</p>;
  // }
  // if (gameDetailsQueries.some((query) => query.isError)) {
  //   return <p>게임 상세 정보를 가져오는데 오류가 발생했습니다...</p>;
  // }

  // console.log(gameDetailsQueries);

  return (
    <div>
      <ul>
        {/* {gameDetailsQueries.map((query: any) => {
          const appid = query.queryKey[1];
          const gameDetails = query.data;

          return (
            <li key={appid}>
              <h3>{gameDetails?.name}</h3>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};

export default RecommendList;
