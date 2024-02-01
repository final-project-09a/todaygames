import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { supabase } from 'types/supabase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyBookMark = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data, error } = await supabase.from('user_bookmarks').select('app_id').eq('user_id', user?.id);

        if (error) {
          console.error('Error fetching bookmarks:', error.message);
        } else {
          if (data && data.length > 0) {
            setBookmarks(data);
            console.log(data);
            console.log(bookmarks[0].app_id);
          } else {
            console.warn('No bookmarks found.');
          }
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
    if (user?.id) {
      fetchBookmarks();
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const appIds = bookmarks.map((bookmark) => bookmark.app_id);
        const { data, error } = await supabase.from('games').select('*').in('app_id', appIds);

        if (error) {
          console.error('Error fetching game details:', error);
        } else {
          if (data) {
            setGames(data);
            console.log(games);
          } else {
            console.warn('No game details found.');
          }
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };
    if (bookmarks.length > 0) {
      fetchGameDetails();
    }
  }, [bookmarks]);

  console.log(games);

  return (
    <StContentBox>
      {games.length > 0 ? (
        <>
          <h2>찜한 게임 {games.length}개</h2>
          <StGameList>
            {games.map((game: any, index: number) => (
              <div key={index}>
                <GameItem>
                  <Link to={`/detail/${game.app_id}`}>
                    <img src={game.header_image} alt={game.name} />
                  </Link>
                </GameItem>
                <p>{game.name}</p>
              </div>
            ))}
          </StGameList>
        </>
      ) : (
        <StyledDiv>
          <h3>찜한 게임이 없습니다.</h3>
        </StyledDiv>
      )}
    </StContentBox>
  );
};

export default MyBookMark;

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 40px;
`;

const StContentBox = styled.div`
  margin-left: 20px;
  width: 1100px;
  min-height: 600px;
  border-radius: 10px;
  padding: 40px;
  background-color: ${(props) => props.theme.color.gray};
  & h2 {
    font-size: 14px;
    font-weight: 700;
  }
  & p {
    font-size: 14px;
    font-weight: 400;
    margin-top: 8px;
    margin-bottom: 15px;
  }
`;

const StGameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;

const GameItem = styled.div`
  width: 200px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
