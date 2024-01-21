import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { GenreType } from 'components/Header/Header';
import { Game } from 'components/homepage/RecommendList';
import SelectedGenreCard from 'components/homepage/SelectedGenreCard';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameData } from './SystemRequirements';

type RelatedGamesProps = {
  appid: string | undefined;
  genres: GenreType[];
};

const RelatedGames = ({ genres, appid }: RelatedGamesProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['selectedGenre'],
    queryFn: getGames
  });

  console.log(genres);

  const [relatedGameLists, setRelatedGameLists] = useState<GameData[] | undefined>();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const filteredGames: any = data
        .filter((game) => genres.some((genre: GenreType) => game.genres.includes(genre)))
        .filter((game) => game.app_id != appid)
        .slice(0, 4);
      setRelatedGameLists(filteredGames);
    }
  }, [data, genres, appid]);

  return (
    <>
      <StTitle>연관 게임</StTitle>
      <StContainer>
        {relatedGameLists?.map((game) => (
          <SelectedGenreCard key={game.app_id} gameInfoList={game} />
        ))}
      </StContainer>
    </>
  );
};

export default RelatedGames;

const StTitle = styled.h1`
  color: ${(props) => props.theme.color.white};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-top: 30px;
`;

const StContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 13px;
  margin: 20px auto;
`;
