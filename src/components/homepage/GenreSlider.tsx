import GenreCard from './GenreCard';
import { GENRE_NAME } from 'constants/genre';
import { useCallback, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SelectedGenreList from './SelectedGenreList';
import styled from 'styled-components';

const GenreSlider = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>('액션');
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    afterChange: (currentSlide: number) => {
      setSliderIndex(currentSlide);
      setSelectedTag(GENRE_NAME[currentSlide]?.tag || null);
    }
  };

  const handleGenreCardClick = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  return (
    <>
      <Slider {...settings}>
        {GENRE_NAME.map(({ tag, englishTag, imageUrl }: { tag: string; englishTag: string; imageUrl: string }) => (
          <GenreCard
            imageUrl={imageUrl}
            key={englishTag}
            tag={englishTag}
            onClick={() => handleGenreCardClick(tag)}
            isSelected={selectedTag === tag}
          />
        ))}
      </Slider>
      <SelectedGenreList selectedTag={selectedTag} />
    </>
  );
};

export default GenreSlider;
