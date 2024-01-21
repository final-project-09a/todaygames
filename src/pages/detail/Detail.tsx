import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/steamApis';
import { useParams } from 'react-router-dom';
import { StContainer, StInfoBox } from './styles';
import GameTitle from 'components/detailpage/GameTitle';
import GameInfo from 'components/detailpage/GameInfo';
import GameDescription from 'components/detailpage/GameDescription';
import ScreenShotSlide from 'components/detailpage/ScreenShotSlide';
import RelatedGames from 'components/detailpage/RelatedGames';
import React from 'react';
import SystemRequirements from 'components/detailpage/SystemRequirements';
import { GenreType } from 'components/Header/Header';

export const DataContext = React.createContext<GameData | null>(null);

interface GameData {
  name: string;
  background_raw: string;
  screenshots?: { path_thumbnail: string }[];
  genres: { description: string }[];
  short_description: string;
  about_the_game: string;
  developers?: string[] | undefined;
  publishers: string;
  release_date: { date: string };
  detailed_description: string;
  pc_requirements: { minimum: string };
}

const Detail = () => {
  const { appid } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gameDetailInfo', appid],
    queryFn: () => getGameDetails(Number(appid))
  });

  if (isLoading) {
    return <div>게임 정보 로딩중...</div>;
  }

  if (isError) {
    return <div>게임 정보를 가져올 수 없습니다.</div>;
  }

  const genres = data.genres.map((genre: GenreType) => genre.description);

  return (
    <DataContext.Provider value={data}>
      <StContainer>
        <GameTitle />
        <ScreenShotSlide />
        <StInfoBox>
          <GameInfo />
        </StInfoBox>
        <StInfoBox>
          <GameDescription />
        </StInfoBox>
        <StInfoBox>
          <SystemRequirements appid={appid} />
        </StInfoBox>
        <RelatedGames genres={genres} appid={appid} />
      </StContainer>
    </DataContext.Provider>
  );
};

export default Detail;
