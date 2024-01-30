import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';
import { QUERY_KEYS } from 'query/keys';
import { useParams } from 'react-router-dom';

import SelectedGenreCard from 'components/homepage/SelectedGenreCard';
import { Typedata } from 'types/supabaseTable';
import folderIcon from 'assets/icons/folderIcon.svg';
import styled from 'styled-components';

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

const StContainer = styled.div`
  width: 1280px;
  margin: 50px auto;
  & p {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

const StSearchResultWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 13px;
`;

const StNoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;
