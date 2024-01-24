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
import { GameType } from 'types/games';

export const DataContext = React.createContext<GameType | null>(null);

const Detail = () => {
  const { appid } = useParams();
  const numberAppId = Number(appid);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gameDetailInfo', appid],
    queryFn: () => getGameDetails(numberAppId)
  });

  if (isLoading) {
    return <div>게임 정보 로딩중...</div>;
  }

  if (isError) {
    return <div>게임 정보를 가져올 수 없습니다.</div>;
  }

  const genres = data.genres.map((genre: { description: string }) => genre.description);

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
          <SystemRequirements appid={numberAppId} />
        </StInfoBox>
        <RelatedGames genres={genres} appid={numberAppId} />
      </StContainer>
    </DataContext.Provider>
  );
};

export default Detail;
