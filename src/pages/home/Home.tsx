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

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && !isError && data && data.length > 0) {
        const appid = data[100].appid;
        // const steamApiUrl = 'https://store.steampowered.com/api/appdetails?appids=${appid}&l=korean';
        try {
          const config: AxiosRequestConfig = {
            headers: { 'Content-Type': 'application/xml' }
          };
          const response = await axios.get(`/api/appdetails?appids=${appid}&l=korean`, config);
          console.log(response);

          // 데이터 처리
          const responseData: GameDetails = response.data[appid]?.data;
          if (responseData) {
            setGameDetails(responseData);
          } else {
            console.error('데이터 결과 없음: ', response);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [isLoading, isError, data]);

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>알 수 없는 오류가 발생했습니다...</p>;
  }

  return <div>{gameDetails ? <h1>{gameDetails.name}</h1> : <p>게임 정보를 불러오는 중입니다...</p>} </div>;
};

export default Home;
