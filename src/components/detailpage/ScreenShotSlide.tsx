import { DataContext } from 'pages/detail/Detail';
import { useContext } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1
};

const ScreenShotSlide = () => {
  const data = useContext(DataContext);
  const screenShots = data?.screenshots;

  return (
    <Slider {...settings}>
      {screenShots?.map((screenShot, index) => (
        <div key={index}>
          <StImageWrapper>
            <img src={screenShot.path_thumbnail} />
          </StImageWrapper>
        </div>
      ))}
    </Slider>
  );
};

export default ScreenShotSlide;

const StImageWrapper = styled.figure`
  width: 220px;
  height: 160px;
  border-radius: 10px;
  display: flex;
  margin-left: 10px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
