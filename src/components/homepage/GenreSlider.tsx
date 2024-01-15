import React from 'react';
import { useQuery } from '@tanstack/react-query';
import GenreCard from './GenreCard';
import { getFilteredGenre } from 'api/games';
import { GENRE_ENGLISH_NAME } from 'constants/genre';
import { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SelectedGenreList from './SelectedGenreList';

const GenreSlider = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  const handleGenreCardClick = (tag: any) => {
    setSelectedTag(tag);
  };

  console.log(selectedTag);

  // const gameGenreArray = gameDetailsQueries?.map((query: any) => query.data);
  // console.log(gameGenreArray);

  return (
    <div>
      <Slider {...settings}>
        {GENRE_ENGLISH_NAME.map((tag: any) => (
          <GenreCard key={tag} tag={tag} onClick={() => handleGenreCardClick(tag)} />
        ))}
      </Slider>
      {/* <SelectedGenreList selectedTag={selectedTag} /> */}
    </div>
  );
};

export default GenreSlider;
