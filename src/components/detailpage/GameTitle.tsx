import CustomCarousel from 'common/CustomCarousel';
import { DataContext } from 'pages/detail/Detail';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import nextIcon from 'assets/icons/nextIcon.svg';
import prevIcon from 'assets/icons/prevIcon.svg';
import Button from 'common/Button';
import heartIcon from 'assets/icons/heartIcon.svg';
import redHeartIcon from 'assets/icons/redHeartIcon.svg';
import { supabase } from 'types/supabase';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { GameType } from 'types/games';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '100px'
};

const GameTitle = () => {
  const data = useContext(DataContext) as GameType;
  const screenShots = data?.screenshots;
  const [currentCenter, setCurrentCenter] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  useEffect(() => {
    const checkBookmarked = async () => {
      if (user?.id && data?.steam_appid) {
        const { data: bookmark, error } = await supabase
          .from('user_bookmarks')
          .select('user_id, app_id')
          .eq('user_id', user.id)
          .eq('app_id', data.steam_appid);

        if (error) {
          console.error('Error checking bookmark:', error);
          return;
        }

        setIsBookmarked(bookmark.length > 0);
      }
    };

    checkBookmarked();
  }, [user?.id, data?.appid]);

  const handleAfterChange = (currentSlide: number) => {
    setCurrentCenter(currentSlide);
  };

  const handleGameSiteButtonClick = () => {
    if (data?.website) {
      window.open(data.website, '_blank');
    }
  };

  const handleBookmarkClick = async (userId: string, appId: number) => {
    if (user) {
      try {
        if (isBookmarked) {
          await supabase.from('user_bookmarks').delete().eq('user_id', userId).eq('app_id', appId);
        } else {
          await supabase.from('user_bookmarks').upsert([
            {
              user_id: userId,
              app_id: appId
            }
          ]);
        }

        setIsBookmarked(!isBookmarked);
      } catch (error) {
        console.error('Error handling bookmark:', error);
      }
    }
  };

  return (
    <div>
      <StTitleWrpapper>
        <StTitle>{data?.name}</StTitle>
        <StButtonWrapper>
          <Button type="button" size="medium" onClick={handleGameSiteButtonClick}>
            공식사이트
          </Button>
          <StHeartIconWrapper
            onClick={() => user?.id && handleBookmarkClick(user?.id, data.steam_appid)}
            $isBookmarked={isBookmarked}
          >
            <img src={isBookmarked ? redHeartIcon : heartIcon} alt="찜하기" />
          </StHeartIconWrapper>
        </StButtonWrapper>
      </StTitleWrpapper>
      <StMainImageWrapper>
        <img src={screenShots?.[currentCenter]?.path_thumbnail} alt={data?.name} />
      </StMainImageWrapper>
      <StCarouselWrapper>
        <CustomCarousel settings={{ ...settings, afterChange: handleAfterChange }}>
          {screenShots?.map((screenShot, index) => (
            <div key={index}>
              <StImageWrapper $isCenter={index === currentCenter}>
                <img src={screenShot.path_thumbnail} />
              </StImageWrapper>
            </div>
          ))}
        </CustomCarousel>
      </StCarouselWrapper>
    </div>
  );
};

export default GameTitle;

const StTitleWrpapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const StButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StHeartIconWrapper = styled.div<{ $isBookmarked: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & img {
    color: ${(props) => (props.$isBookmarked ? 'red' : props.theme.color.white)};
  }
`;

const StMainImageWrapper = styled.figure`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 30px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StTitle = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-size: 50px;
  font-weight: 700;
`;

const StImageWrapper = styled.figure<{ $isCenter: boolean }>`
  width: 220px;
  height: 160px;
  border-radius: 10px;
  display: flex;
  margin-left: 14px;
  overflow: hidden;
  border: ${(props) => (props.$isCenter ? '3px solid white' : 'none')};
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StCarouselWrapper = styled.div`
  width: 1440px;
  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 0.9;
  }
  .slick-arrow,
  .slick-next:before,
  .slick-prev:before {
    font-size: 30px;
  }

  .slick-prev:before {
    opacity: 0.6;
    /* content: url(${prevIcon}); */
    width: 30px;
    height: 30px;
    z-index: 20;
  }
  .slick-next:before {
    opacity: 0.6;
    /* content: url(${nextIcon}); */
    width: 40px;
    height: 40px;
    z-index: 20;
  }

  .slick-prev {
    left: -50px;
    z-index: 30;
  }

  .slick-next {
    right: -40px;
    z-index: 30;
  }
`;
