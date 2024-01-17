import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import SelectedGenreCard from 'components/homepage/SelectedGenreCard';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Game {
  app_id: number;
}

const RelatedGames = ({ genres }: any) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['selectedGenre'],
    queryFn: getGames
  });

  const [relatedGameLists, setRelatedGameLists] = useState<Game[] | undefined>();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const filteredGames: any = data
        .filter((game) => genres.some((genre: string) => game.genres.includes(genre)))
        .slice(0, 4);
      setRelatedGameLists(filteredGames);
    }
  }, [data, genres]);

  return (
    <>
      <StTitle>연관 게임</StTitle>
      <StContainer>
        {relatedGameLists?.map((game: any) => (
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
