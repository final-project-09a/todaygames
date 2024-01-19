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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  const handleGenreCardClick = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  return (
    <>
      <Slider {...settings}>
        {GENRE_NAME.map(({ tag, englishTag }: { tag: string; englishTag: string }) => (
          <GenreCard
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
