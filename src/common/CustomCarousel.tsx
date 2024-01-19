import React from 'react';
import Slider, { Settings } from 'react-slick';

interface CustomCarouselProps {
  settings: Settings;
  children: React.ReactNode;
}

const CustomCarousel = ({ settings, children }: CustomCarouselProps) => {
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default CustomCarousel;
