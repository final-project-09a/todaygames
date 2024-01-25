import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typedata } from 'types/supabaseTable';

interface SelectedGenreCardProps {
  gameInfoList: Typedata['public']['Tables']['games']['Row'];
  size?: string;
}

const SelectedGenreCard = ({ size, gameInfoList }: SelectedGenreCardProps) => {
  const navigate = useNavigate();

  const handleGameCardClick = () => {
    navigate(`/detail/${gameInfoList.app_id}`);
  };

  return (
    <StContainer size={size} onClick={handleGameCardClick}>
      <StCardWrapper>
        <StImageFigure size={size} $imageUrl={gameInfoList.header_image}></StImageFigure>
        <StGameName size={size}>{gameInfoList.name}</StGameName>
        <StGameGenres size={size}>{gameInfoList.genres}</StGameGenres>
      </StCardWrapper>
    </StContainer>
  );
};

export default SelectedGenreCard;

const StContainer = styled.div<{ size?: string }>`
  height: ${({ size }) => (size === 'small' ? '260px' : '300px')};
  width: ${({ size }) => (size === 'small' ? '240px' : '340px')};
  background-color: ${(props) => props.theme.color.postback};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 7px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    scale: calc(1.03);
  }
`;

const StCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StImageFigure = styled.figure<{ $imageUrl: string; size?: string }>`
  height: ${({ size }) => (size === 'small' ? '170px' : '200px')};
  width: 100%;
  background: url(${(props) => props.$imageUrl}) center/cover no-repeat;
  border-radius: 10px 10px 0px 0px;
`;

const StGameName = styled.div<{ size?: string }>`
  position: absolute;
  bottom: ${({ size }) => (size === 'small' ? '16%' : '18%')};
  left: 0;
  width: 100%;
  padding-left: 20px;
  font-size: 18px;
  line-height: normal;
  color: ${(props) => props.theme.color.white};
`;

const StGameGenres = styled.div<{ size?: string }>`
  position: absolute;
  bottom: ${({ size }) => (size === 'small' ? '8%' : '10%')};
  left: 0;
  width: 100%;
  color: #eee;
  padding-left: 20px;
  font-size: 12px;
  font-weight: 100;
  line-height: normal;
  color: ${(props) => props.theme.color.white};
`;
