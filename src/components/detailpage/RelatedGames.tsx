import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import SelectedGenreCard from 'components/homepage/SelectedGenreCard';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GenreType } from 'types/games';
import { Typedata } from 'types/supabaseTable';

type RelatedGamesProps = {
  appid: number | undefined;
  genres: GenreType[];
};

const RelatedGames = ({ genres, appid }: RelatedGamesProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['selectedGenre'],
    queryFn: getGames
  });

  const [relatedGameLists, setRelatedGameLists] = useState<
    Typedata['public']['Tables']['games']['Row'][] | undefined
  >();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const filteredGames: Typedata['public']['Tables']['games']['Row'][] = data
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
