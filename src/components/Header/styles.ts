import styled from 'styled-components';

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
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 0.6;
  }

  .slick-prev:before,
  .slick-next:before {
    height: 0;
    font-size: 50px;
    color: white;
    opacity: 0.3;
  }

  .slick-prev {
    left: -70px;
    z-index: 10;
  }
  [dir='rtl'] .slick-prev {
    right: -25px;
    left: auto;
  }

  .slick-next {
    right: -50px;
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
  margin-top: 15px;
`;

export { StWrapper, StCarouselWrapper, StContainer, StFigure, StTitle, StTagWrapper, StGameInfo, StInfoWrapper };
