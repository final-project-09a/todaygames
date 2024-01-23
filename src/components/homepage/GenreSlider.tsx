import GenreCard from './GenreCard';
import { GENRE_NAME } from 'constants/genre';
import { useCallback, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SelectedGenreList from './SelectedGenreList';
import { GenreNameType } from 'types/games';

const GenreSlider = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>('액션');
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    beforeChange: (currentSlide: number, nextSlide: number) => {
      console.log(currentSlide);
      console.log(nextSlide);

      if (nextSlide === 0 && currentSlide === GENRE_NAME.length - 1) {
        return false;
      }
      setSliderIndex(nextSlide);
      return true;
    },
    afterChange: (currentSlide: number) => {
      console.log(sliderIndex);
      setSelectedTag(GENRE_NAME[currentSlide]?.tag || null);
    }
  };

  const handleGenreCardClick = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  return (
    <>
      <Slider {...settings}>
        {GENRE_NAME.map(({ tag, englishTag, imageUrl }: GenreNameType) => (
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
