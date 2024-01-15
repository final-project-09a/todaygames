import { useQueries, useQuery } from '@tanstack/react-query';
import { getFilteredGenre, getGameDetails } from 'api/games';
import React from 'react';

interface SelectedGenreListProps {
  mostPlayedGames: any;
}

const SelectedGenreList = ({ mostPlayedGames }: SelectedGenreListProps) => {
  console.log(mostPlayedGames);

  // // const topTen = mostPlayedGames?.slice(0, 10);
  // const appids = mostPlayedGames?.map((game: any) => game.appid) || [];

  // // top 10 상세 정보 가져오기
  // const gameDetailsQueries = useQueries({
  //   queries: appids.map((appid: any) => ({
  //     queryKey: ['selectedGenre', appid],
  //     queryFn: () => getGameDetails(appid),
  //     enabled: appid !== undefined
  //     // staleTime: Infinity
  //   }))
  // });

  // // console.log(data);
  // const gameDetailsArray = gameDetailsQueries.map((query: any) => query.data);
  // console.log(gameDetailsArray);

  // if (isLoading) {
  //   <p>게임 정보를 불러오는 중입니다...</p>;
  // }

  // if (isError) {
  //   <p>게임 정보를 불러오지 못했습니다.</p>;
  // }

  // console.log(data);

  return <div>selectedTag</div>;
};

export default SelectedGenreList;
