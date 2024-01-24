import styled from 'styled-components';
import headerNextIcon from 'assets/icons/headerNextIcon.svg';
import headerPrevIcon from 'assets/icons/headerLeftIcon.svg';

const StContainer = styled.div`
  width: 100%;
  height: 800px;
  gap: 60px;
`;

// 삭제
const StWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StCarouselWrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
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
    left: -110px;
    z-index: 10;
  }
  [dir='rtl'] .slick-prev {
    right: -25px;
    left: auto;
  }

  .slick-next {
    right: -20;
    z-index: 10;
  }
  [dir='rtl'] .slick-next {
    right: auto;
    left: -25px;
  }
`;

const StFigure = styled.figure`
  width: 1440px;
  height: 600px;
  border-radius: 20px;
  margin-top: 50px;
  overflow: hidden;
  & img {
    width: 100%;
    object-fit: cover;
  }
`;

const StInfoWrapper = styled.div`
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 50px;
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

export { StWrapper, StCarouselWrapper, StContainer, StFigure, StTitle, StTagWrapper, StGameInfo, StInfoWrapper };
