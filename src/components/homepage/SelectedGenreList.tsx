import { useQueries, useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { getSelectedGenre, getGameDetails } from 'api/steamApis';
import React, { useEffect, useState } from 'react';
import { GENRE_NAME } from 'constants/genre';
import SelectedGenreCard from './SelectedGenreCard';
import styled from 'styled-components';

interface SelectedGenreListProps {
  selectedTag: string | null;
}

interface GameInfo {
  app_id: number;
  capsule_image: string;
  genres: string[];
  header_image: string;
  id: number;
  is_free: boolean;
  name: string;
  required_age: number;
  short_description: string;
}

const SelectedGenreList = ({ selectedTag }: SelectedGenreListProps) => {
  const [gameInfoList, setGameInfoList] = useState<GameInfo[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['selectedGenre', selectedTag],
    queryFn: getGames,
    enabled: selectedTag !== null
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const filteredGames = data.filter((game) => game.genres.includes(selectedTag));
      setGameInfoList(
        filteredGames.map((game) => ({
          app_id: game.app_id,
          capsule_image: game.capsule_image,
          genres: game.genres,
          header_image: game.header_image,
          id: game.id,
          is_free: game.is_free,
          name: game.name,
          required_age: game.required_age,
          short_description: game.short_description
        }))
      );
    }
  }, [data, isLoading, isError, selectedTag]);

  if (isLoading) {
    return <p>게임 정보를 로딩중입니다...</p>;
  }

  if (isError) {
    return <p>게임 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <div>
      {gameInfoList.length > 0 ? (
        <StContainer>
          {gameInfoList.map((game) => (
            <li key={game.app_id}>
              <SelectedGenreCard gameInfoList={game} />
            </li>
          ))}
        </StContainer>
      ) : (
        <p>해당 장르의 게임을 찾지 못했습니다.</p>
      )}
    </div>
  );
};

export default SelectedGenreList;

const StContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 13px;
  margin: 70px auto;
`;
