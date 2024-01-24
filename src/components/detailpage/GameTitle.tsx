import CustomCarousel from 'common/CustomCarousel';
import { DataContext } from 'pages/detail/Detail';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '100px'
};

const GameTitle = () => {
  const data = useContext(DataContext);
  const screenShots = data?.screenshots;
  const [currentCenter, setCurrentCenter] = useState(0);

  console.log(currentCenter);

  const handleAfterChange = (currentSlide: number) => {
    setCurrentCenter(currentSlide);
  };

  return (
    <div>
      <StTitle>{data?.name}</StTitle>
      <StMainImageWrapper>
        <img src={screenShots?.[currentCenter]?.path_thumbnail} alt={data?.name} />
      </StMainImageWrapper>
      <CustomCarousel settings={{ ...settings, afterChange: handleAfterChange }}>
        {screenShots?.map((screenShot, index) => (
          <div key={index}>
            <StImageWrapper isCenter={index === currentCenter}>
              <img src={screenShot.path_thumbnail} />
            </StImageWrapper>
          </div>
        ))}
      </CustomCarousel>
    </div>
  );
};

export default GameTitle;

const StMainImageWrapper = styled.figure`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 30px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StTitle = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const StImageWrapper = styled.figure<{ isCenter: boolean }>`
  width: 220px;
  height: 160px;
  border-radius: 10px;
  display: flex;
  margin-left: 14px;
  overflow: hidden;
  border: ${(props) => (props.isCenter ? '3px solid white' : 'none')};
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
