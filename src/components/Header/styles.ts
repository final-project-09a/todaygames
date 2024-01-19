import styled from 'styled-components';

const StContainer = styled.div`
  width: 100%;
  height: 800px;
  gap: 60px;
`;

const StWrapper = styled.div`
  width: 100%;
`;

const StCarouselWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StFigure = styled.figure`
  width: 1440px;
  height: 600px;
  border-radius: 20px;
  margin-top: 50px;
  overflow: hidden;
  & img {
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
