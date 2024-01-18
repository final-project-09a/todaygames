import React from 'react';
import Slider, { Settings } from 'react-slick';

interface CustomCarouselProps {
  customStyle: React.ComponentType<any>;
  settings: Settings;
  children: React.ReactNode;
}

const CustomCarousel = ({ customStyle, settings, children }: CustomCarouselProps) => {
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default CustomCarousel;
