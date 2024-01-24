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
  const [sliderIndex, setSliderIndex] = useState(0);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: false,
    beforeChange: (currentSlide: number, nextSlide: number) => {
      console.log('현재 인덱스', currentSlide);
      console.log('다음 인덱스', nextSlide);
      console.log('슬라이더인덱스', sliderIndex);
      if (currentSlide !== sliderIndex) {
        currentSlide = sliderIndex;
      }

      console.log(currentSlide);
      // if (currentSlide === 0 || sliderIndex === 0) {
      //   setSelectedTag(GENRE_NAME[nextSlide]?.tag);
      // }

      // if (currentSlide === 6 || sliderIndex >= 6) {
      //   setSelectedTag(GENRE_NAME[sliderIndex + 1]?.tag);
      //   nextSlide = 7;
      // }

      // If the current slide is the clicked index, adjust the currentSlide
      // if (currentSlide === sliderIndex) {
      //   if (sliderIndex === 0) {
      //     currentSlide = 5;
      //   } else if (sliderIndex === 5) {
      //     currentSlide = 0;
      //   }
      // }
    },
    afterChange: (currentSlide: number) => {
      console.log('after 현재 인덱스', currentSlide);
      // If the current slide is 0 or 5, update the selected tag accordingly
      if (currentSlide === 0) {
        setSelectedTag(GENRE_NAME[currentSlide + 1]?.tag || null);
      }
      if (currentSlide === 6) {
        setSelectedTag(GENRE_NAME[currentSlide + 1]?.tag || null);
      }
    }
  };

  const handleGenreCardClick = useCallback((index: number, tag: string) => {
    setSliderIndex(index);
    setSelectedTag(tag);
  }, []);

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
