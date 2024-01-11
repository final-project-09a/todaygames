import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

interface GameDetails {
  name: string;
}

const Home = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['games'],
    queryFn: getGames
  });

  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);

  console.log(data);

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>알 수 없는 오류가 발생했습니다...</p>;
  }

  return <div>게임리스트</div>;
};

export default Home;
