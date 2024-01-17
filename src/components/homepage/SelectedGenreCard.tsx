import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import styled from 'styled-components';

interface SelectedGenreCardProps {
  gameInfoList: any;
}

const SelectedGenreCard = ({ gameInfoList }: SelectedGenreCardProps) => {
  const games = useSelector((state: RootState) => state.gameSlice.data);

  return (
    <StContainer>
      <StCardWrapper>
        <StImageFigure $imageUrl={gameInfoList.header_image}></StImageFigure>
        <StGameName>{gameInfoList.name}</StGameName>
      </StCardWrapper>
    </StContainer>
  );
};

export default SelectedGenreCard;

const StContainer = styled.div`
  height: 304px;
  width: 350px;
  background-color: ${(props) => props.theme.color.postback};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 7px;
`;

const StCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StImageFigure = styled.figure<{ $imageUrl: string }>`
  height: 200px;
  width: 100%;
  background: url(${(props) => props.$imageUrl}) center/cover no-repeat;
  border-radius: 10px 10px 0px 0px;
`;

const StGameName = styled.div`
  position: absolute;
  bottom: 14%;
  left: 0;
  width: 100%;
  padding: 20px;
  font-size: 18px;
  line-height: normal;
  color: ${(props) => props.theme.color.white};
`;
