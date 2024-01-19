import { StContainer, StFigure, StTitle, StTagWrapper, StGameInfo, StInfoWrapper, StCarouselWrapper } from './styles';
import { getGameDetails } from 'api/steamApis';
import { useQueries } from '@tanstack/react-query';
import Button from 'common/Button';
import Tag from 'common/Tag';
import CustomCarousel from 'common/CustomCarousel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  mostPlayedGames: any;
}

const Header = ({ mostPlayedGames }: HeaderProps) => {
  const navigate = useNavigate();
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const handleCarouselSlideChange = (index: number) => {
    setCurrentGameIndex(index);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleCarouselSlideChange,
    // centerMode: true,
    // centerPadding: '50',
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: false
    // fade: true
    // prevArrow: $('#prevArrow'),
    // nextArrow: $('#nextArrow')
    // 반응형 설정
    //   responsive: [
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         arrows: false,
    //         centerMode: true,
    //         centerPadding: '0',
    //         slidesToShow: 1
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         arrows: false,
    //         centerMode: true,
    //         centerPadding: '0',
    //         slidesToShow: 1
    //       }
    //     }
    //   ]
  };

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

  return (
    <StContainer>
      {/* <StWrapper> */}
      <StCarouselWrapper>
        <CustomCarousel settings={settings}>
          {gameDetailsArray &&
            gameDetailsArray?.map((game, index) => (
              <StFigure key={game.steam_appid}>
                <img src={game.background_raw} alt={game.name} />
              </StFigure>
            ))}
        </CustomCarousel>
      </StCarouselWrapper>
      {/* </StWrapper> */}

      {gameDetailsArray &&
        gameDetailsArray?.map((game, index) => (
          <div key={game.steam_appid}>
            {index === currentGameIndex && (
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
                <Button size="large" onClick={() => navigate(`/detail/${game.steam_appid}`)}>
                  More Info
                </Button>
              </StInfoWrapper>
            )}
          </div>
        ))}
    </StContainer>
  );
};

export default Header;
