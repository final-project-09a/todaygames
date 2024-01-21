import Tag from 'common/Tag';
import styled from 'styled-components';
import { Game } from './RecommendList';
import { GenreType } from 'components/Header/Header';
import { useNavigate } from 'react-router-dom';

interface NewGameCardProps {
  gameDetails: Game;
}

function NewGameCard({ gameDetails }: NewGameCardProps) {
  const gneres = gameDetails.genres;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${gameDetails.steam_appid}`);
  };

  return (
    <StCardWrapper onClick={handleCardClick}>
      <StImageWrapper>
        <StImage src={gameDetails.header_image} />
      </StImageWrapper>
      <StGameInfo>
        <div>
          <StTagWrapper>
            {gneres.map((genre: GenreType, index: number) => (
              <Tag backgroundColor="lightgray" size="small" key={index} prefix="#">
                <p>{genre.description}</p>
              </Tag>
            ))}
          </StTagWrapper>
          <StGameTitle>{gameDetails.name}</StGameTitle>
          <StDescription>{gameDetails.short_description}</StDescription>
        </div>
        <StReleaseDate>{gameDetails.release_date.date}</StReleaseDate>
      </StGameInfo>
    </StCardWrapper>
  );
}

export default NewGameCard;

const StCardWrapper = styled.div`
  position: relative;
  width: 710px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${(prosp) => prosp.theme.color.gray};
`;

const StImageWrapper = styled.div`
  width: 250px;
  height: 300px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 10px 0px 0px 10px;
`;

const StImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  opacity: 0.7;
  ${StCardWrapper}:hover & {
    opacity: 1;
  }
`;

const StGameInfo = styled.div`
  position: absolute;
  top: 0;
  left: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  ${StCardWrapper}:hover & {
    opacity: 1;
  }
`;

const StTagWrapper = styled.div`
  display: flex;
  gap: 7px;
`;

const StGameTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.xl};
  margin-top: 16px;
  font-size: 24px;
  font-weight: 700;
`;

const StDescription = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  margin-top: 10px;
  color: #eee;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

const StReleaseDate = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  color: #999;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;
