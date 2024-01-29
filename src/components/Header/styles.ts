import styled from 'styled-components';
import headerNextIcon from 'assets/icons/headerNextIcon.svg';
import headerPrevIcon from 'assets/icons/headerLeftIcon.svg';

const StContainer = styled.div`
  width: 100%;
  height: 750px;
`;

const StCarouselWrapper = styled.div`
  width: 100%;
  height: 600px;
  margin-top: 50px;
  overflow: hidden;
  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 0.9;
  }

  .slick-prev:before {
    opacity: 0.6;
    content: url(${headerPrevIcon});
    width: 100px;
    height: 100px;
    z-index: 20;
  }
  .slick-next:before {
    opacity: 0.6;
    content: url(${headerNextIcon});
    width: 100px;
    height: 100px;
    z-index: 20;
  }

  .slick-prev {
    left: 145px;
    z-index: 20;
  }
  [dir='rtl'] .slick-prev {
    right: -25px;
    left: auto;
  }

  .slick-track {
    height: 600px;
  }

  .slick-list .slick-track {
    width: 100%;
    height: 600px;
  }

  .slick-next {
    right: 210px;
    z-index: 20;
  }

  [dir='rtl'] .slick-next {
    right: auto;
    left: -25px;
  }

  .slick-slider {
    width: 100%;
    transition: transform 1s, opacity 1s;
    will-change: transform, opacity;
  }

  .slick-slide img {
    width: 1440px;
    height: 600px;
    border-radius: 20px;
    object-fit: cover;
    transition: transform 1s;
    margin: 0 auto;
  }

  .slick-slide:not(.slick-center) {
    transition: transform 1s opacity 1s;
    transform: scale(0.9);
    filter: blur(1px);
    opacity: 0.6;
  }

  .slick-slide.slick-center {
    width: 100%;
    transition: transform 1s;
  }
`;

const StFigure = styled.figure`
  width: 1440px;
  max-height: 600px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
`;

const StInfoWrapper = styled.div`
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 40px;
`;

const StGameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StTitle = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-size: 34px;
  font-weight: 700;
`;

const StTagWrapper = styled.div`
  display: flex;
  gap: 7px;
`;

export { StCarouselWrapper, StContainer, StFigure, StTitle, StTagWrapper, StGameInfo, StInfoWrapper };
