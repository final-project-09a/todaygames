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
import GenreListSkeleton from 'components/skeletons/GenreListSkeleton';
import { Typedata } from 'types/supabaseTable';

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
    enabled: true
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const filteredGames = data.filter((game) => game.genres.includes(selectedTag));
      dispatch(setGame(filteredGames));
    }
  }, [selectedTag, isLoading, isError]);

  if (isError) {
    return <p>게임 정보를 불러오지 못했습니다.</p>;
  }

  const initialDisplayedGames = games.slice(0, displayedGames);

  const handleLoadMore = () => {
    setDisplayedGames((prev) => (prev === 0 ? 8 : prev + 8));
  };

  return (
    <StContainer>
      {games ? (
        <StListWrapper>
          {initialDisplayedGames?.map((game: Typedata['public']['Tables']['games']['Row']) => (
            <li key={game.app_id}>{isLoading ? <GenreListSkeleton /> : <SelectedGenreCard gameInfoList={game} />}</li>
          ))}
        </StListWrapper>
      ) : (
        <p>해당 장르의 게임을 찾지 못했습니다.</p>
      )}

      {initialDisplayedGames.length < games.length && <MoreViewButton onClick={handleLoadMore}>더보기</MoreViewButton>}
    </StContainer>
  );
};

export default SelectedGenreList;

const StContainer = styled.div`
  width: 1420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 10px;
`;

const StListWrapper = styled.ul`
  display: grid;
  height: fit-content;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
  gap: 18px;
`;
