import { StContainer, StHeader, StFigure, StTitle, StTagWrapper, StGameInfo, StInfoWrapper } from './styles';
import { getGameDetails } from 'api/steamApis';
import { useQueries } from '@tanstack/react-query';
import Button from 'common/Button';
import Tag from 'common/Tag';

interface HeaderProps {
  mostPlayedGames: any;
}

const Header = ({ mostPlayedGames }: HeaderProps) => {
  // // 가장 많이 플레이된 게임 100개 중 top 4만 가져오기
  const topTen = mostPlayedGames?.slice(0, 4);
  const appids = topTen?.map((game: any) => game.appid) || [];

  // top 10 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids.map((appid: any) => ({
      queryKey: ['gameDetails', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  const gameDetailsArray = gameDetailsQueries.map((query: any) => query.data);

  if (!gameDetailsArray[0]) {
    return <div>게임 상세 정보를 가져오는 중입니다...</div>;
  }

  const handleMoreButtonClick = () => {
    console.log('button click');
  };

  return (
    <StContainer>
      <StHeader>
        <StFigure $imageUrl={gameDetailsArray[0]?.background_raw}></StFigure>
        <StInfoWrapper>
          <StGameInfo>
            <StTitle>{gameDetailsArray[0]?.name}</StTitle>
            <StTagWrapper>
              {gameDetailsArray[0]?.genres.map((category: any, index: number) => (
                <Tag size="large" key={index}>
                  <p>{category.description}</p>
                </Tag>
              ))}
            </StTagWrapper>
          </StGameInfo>
          <Button size="large" onClick={handleMoreButtonClick}>
            Play Now
          </Button>
        </StInfoWrapper>
      </StHeader>
    </StContainer>
  );
};

export default Header;
