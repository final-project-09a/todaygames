import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { useEffect, useState } from 'react';
import SelectedGenreCard from './SelectedGenreCard';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { GameData, setGame } from '../../redux/modules/gameSlice';
import MoreViewButton from 'common/MoreViewButton';

interface SelectedGenreListProps {
  selectedTag: string | null;
}

const SelectedGenreList = ({ selectedTag }: SelectedGenreListProps) => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.gameSlice.data);
  const [displayedGames, setDisplayedGames] = useState(8);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['selectedGenre', selectedTag],
    queryFn: getGames,
    enabled: selectedTag !== null
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const filteredGames = data.filter((game) => game.genres.includes(selectedTag));
      dispatch(setGame(filteredGames));
    }
  }, [data, isLoading, isError, selectedTag]);

  if (isLoading) {
    return <p>게임 정보를 로딩중입니다...</p>;
  }

  if (isError) {
    return <p>게임 정보를 불러오지 못했습니다.</p>;
  }

  const initialDisplayedGames = games.slice(0, displayedGames);

  const handleLoadMore = () => {
    setDisplayedGames((prev) => (prev === 0 ? 8 : prev + 8));
  };

  return (
    <div>
      {games ? (
        <StContainer>
          {initialDisplayedGames?.map((game: GameData) => (
            <li key={game.app_id}>
              <SelectedGenreCard gameInfoList={game} />
            </li>
          ))}
        </StContainer>
      ) : (
        <p>해당 장르의 게임을 찾지 못했습니다.</p>
      )}

      {initialDisplayedGames.length < games.length && <MoreViewButton onClick={handleLoadMore}>더보기</MoreViewButton>}
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
