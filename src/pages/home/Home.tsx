import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { useState } from 'react';
import RecommendList from 'components/homepage/RecommendList';
import NewGames from 'components/homepage/NewGames';
import GenreFilter from 'components/homepage/GenreFilter';
import Header from 'components/Header';

interface GameDetails {
  name: string;
}

const Home = () => {
  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ['games'],
  //   queryFn: getGames
  // });

  // const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);

  // console.log(data);

  // if (isLoading) {
  //   return <p>로딩중입니다...</p>;
  // }
  // if (isError) {
  //   return <p>알 수 없는 오류가 발생했습니다...</p>;
  // }

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <h1>추천리스트</h1>
        <RecommendList />
      </div>
      <div>
        <h1>새로나온 게임</h1>
        <NewGames />
      </div>
      <div>
        <h1>장르별 탐색</h1>
        <GenreFilter />
      </div>
    </>
  );
};

export default Home;
