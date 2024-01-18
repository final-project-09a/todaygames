import { StContainer, StFigure, StTitle, StTagWrapper, StGameInfo, StInfoWrapper } from './styles';
import { getGameDetails } from 'api/steamApis';
import { useQueries } from '@tanstack/react-query';
import Button from 'common/Button';
import Tag from 'common/Tag';
import Slider from 'react-slick';

interface HeaderProps {
  mostPlayedGames: any;
}

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Header = ({ mostPlayedGames }: HeaderProps) => {
  // // 가장 많이 플레이된 게임 100개 중 top 5 appid 가져오기
  const topTen = mostPlayedGames?.slice(0, 5);
  const appids = topTen?.map((game: any) => game.appid) || [];

  // top 5 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids.map((appid: any) => ({
      queryKey: ['gameDetails', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  const allQueriesSuccessful = gameDetailsQueries.every((query: any) => query.isSuccess);

  const gameDetailsArray = allQueriesSuccessful ? gameDetailsQueries.map((query: any) => query.data) : undefined;
  console.log(gameDetailsArray);

  const handleMoreButtonClick = () => {
    alert('더보기');
  };

  return (
    <StContainer>
      <Slider {...settings}>
        {gameDetailsArray &&
          gameDetailsArray?.map((game) => (
            <div key={game.steam_appid}>
              <StFigure>
                <img src={game.background_raw} alt={game.name} />
              </StFigure>
              <StInfoWrapper>
                <StGameInfo>
                  <StTitle>{game?.name}</StTitle>
                  <StTagWrapper>
                    {game.genres.map((category: any, index: number) => (
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
            </div>
          ))}
      </Slider>
    </StContainer>
  );
};

export default Header;
