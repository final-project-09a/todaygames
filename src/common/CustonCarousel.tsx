import React from 'react';
import Slider, { Settings } from 'react-slick';

interface CustomCarouselProps {
  items: any[];
  customStyle: React.CSSProperties;
  settings: Settings;
  children: React.ReactNode;
}

const CustonCarousel = ({ items, customStyle, settings, children }: CustomCarouselProps) => {
  return (
    <div style={customStyle}>
      <Slider {...settings}>
        {items.map((item: any, index: number) => (
          <div key={index}>{children} </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustonCarousel;
