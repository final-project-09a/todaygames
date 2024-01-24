import GenreCard from './GenreCard';
import { GENRE_NAME } from 'constants/genre';
import { useCallback, useState } from 'react';
import SelectedGenreList from './SelectedGenreList';
import { GenreNameType } from 'types/games';
import CustomCarousel from 'common/CustomCarousel';
import styled from 'styled-components';
import nextIcon from 'assets/icons/nextIcon.svg';
import prevIcon from 'assets/icons/prevIcon.svg';

const GenreSlider = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>('액션');
  const [activeSlide, setActiveSlide] = useState<number>(0);
  console.log(activeSlide);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '0px',
    beforeChange: (current: number, next: number) => {
      setActiveSlide(next);
      setSelectedTag(GENRE_NAME[next].tag);
    },
    afterChange: (current: number) => {
      setActiveSlide(current);
      setSelectedTag(GENRE_NAME[current].tag);
    }
  };

  const handleGenreCardClick = (index: number, tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <StCarouselWrapper>
      <CustomCarousel settings={settings}>
        {GENRE_NAME.map(({ index, tag, englishTag, imageUrl }: GenreNameType) => (
          <GenreCard
            imageUrl={imageUrl}
            key={englishTag}
            tag={englishTag}
            onClick={() => handleGenreCardClick(index, tag)}
            isSelected={selectedTag === tag}
          />
        ))}
      </CustomCarousel>
      <SelectedGenreList selectedTag={selectedTag} />
    </StCarouselWrapper>
  );
};

export default GenreSlider;

const StCarouselWrapper = styled.div`
  width: 1440px;
  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 0.6;
  }

  .slick-prev:before {
    opacity: 1;
    content: url(${prevIcon});
    width: 50px;
    height: 50px;
    z-index: 20;
  }
  .slick-next:before {
    opacity: 1;
    content: url(${nextIcon});
    width: 50px;
    height: 50px;
    z-index: 20;
  }

  .slick-prev {
    left: -70px;
    z-index: 30;
  }

  .slick-next {
    right: -70px;
    z-index: 30;
  }
`;
