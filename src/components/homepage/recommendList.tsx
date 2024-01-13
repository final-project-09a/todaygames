import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGameDetails, getMostPlayedGames, getTopTenGameDetails } from 'api/games';
import React, { useEffect } from 'react';

const RecommendList = () => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    // 마운트 될 때 캐시삭제
    queryClient.invalidateQueries({ queryKey: ['recommendGames'] });
  }, [queryClient]);

  // 가장 많이 플레이된 게임 100개
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
      // combine: (results: any) => {
      //   return {
      //     data: results.map((result: any) => result.data),
      //     pending: results.some((result: any) => result.state === 'loading')
      //   };
      // }
    }))
  });

  // console.log('Combined Data Array:', gameDetailsQueries[0]?.data);

  // if (gameDetailsQueries.some((query) => query.isLoading)) {
  //   return <p>게임 상세 정보를 로딩중입니다...</p>;
  // }
  // if (gameDetailsQueries.some((query) => query.isError)) {
  //   return <p>게임 상세 정보를 가져오는데 오류가 발생했습니다...</p>;
  // }

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
