import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import React from 'react';

const Home = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['games'],
    queryFn: getGames
  });

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>알 수 없는 오류가 발생했습니다...</p>;
  }

  console.log(data);

  return <div>Home</div>;
};

export default Home;
