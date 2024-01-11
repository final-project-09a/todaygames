import { useQueries, useQuery } from '@tanstack/react-query';
import { getGameDetails, getGames, getMostPlayedGames } from 'api/games';
import React, { useState } from 'react';

const RecommendList = () => {
  const [recommendGames, setRecommendGames] = useState([]);

  // 전체 게임 리스트
  const {
    isLoading: gamesLoading,
    isError: gamesError,
    data: games
  } = useQuery({
    queryKey: ['games'],
    queryFn: getGames
  });

  // 가장 많이 플레이된 게임 100개
  const {
    isLoading: mostPlayedLoading,
    isError: mostPlayedError,
    data: mostPlayedGames
  } = useQuery({
    queryKey: ['recommendGames'],
    queryFn: getMostPlayedGames
  });

  console.log(games);
  console.log(mostPlayedGames);

  // 가장 많이 플레이된 게임 100개 중 top 10만 가져오기
  const topTen = mostPlayedGames?.slice(0, 10);
  console.log(topTen);

  const appids = topTen?.map((game: any) => game.appid);
  console.log(appids);

  // // top 10 게임 details
  // const gameDetailsQueries = useQueries(
  //   (appids ?? []).map((appid: any) => ({
  //     queryKey: ['gameDetails', appid],
  //     queryFn: () => getGameDetails(appid),
  //     enabled: appid !== undefined
  //   }))
  // );

  if (gamesLoading || mostPlayedLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (gamesError || mostPlayedError) {
    return <p>알 수 없는 오류가 발생했습니다...</p>;
  }

  return (
    <div>
      <ul>
        {topTen.map((game: any, index: number) => (
          <li key={game.appid}>{game.appid}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendList;
