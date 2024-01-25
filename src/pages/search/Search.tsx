import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { QUERY_KEYS } from 'query/keys';
import { useParams } from 'react-router-dom';
import { StContainer, StSearchResultWrapper, StNoResultWrapper } from './styles';
import SelectedGenreCard from 'components/homepage/SelectedGenreCard';
import { Typedata } from 'types/supabaseTable';
import folderIcon from 'assets/icons/folderIcon.svg';

const Search = () => {
  const { searchText = '' } = useParams();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: getGames
    // enabled: isModalOpen
  });

  const filteredGames = data?.filter((game) => {
    return game.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <StContainer>
      {filteredGames && filteredGames.length > 0 ? (
        <>
          <p>{`${filteredGames?.length}개의 일치하는 게임`}</p>
          <StSearchResultWrapper>
            {filteredGames?.map((game: Typedata['public']['Tables']['games']['Row']) => (
              <li key={game.app_id}>
                <SelectedGenreCard gameInfoList={game} size="small" />
              </li>
            ))}
          </StSearchResultWrapper>
        </>
      ) : (
        <StNoResultWrapper>
          <img src={folderIcon} alt="폴더아이콘" />
          <p>검색 결과가 없습니다.</p>
        </StNoResultWrapper>
      )}
    </StContainer>
  );
};

export default Search;
