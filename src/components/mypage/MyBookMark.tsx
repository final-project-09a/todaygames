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
  return (
    <StUserInfoContainer>
      <StContentBox>
        <StTitle>찜한 게임 {games.length}</StTitle>
        <StGameList>
          {' '}
          {games.map((game: any, index: number) => (
            <GameItem key={index}>
              <Link to={`/detail/${game.app_id}`}>
                <img src={game.header_image} alt={game.name} />
                <h3>Game: {game.name}</h3>
              </Link>
            </GameItem>
          ))}
        </StGameList>{' '}
      </StContentBox>
    </StUserInfoContainer>
  );
};

export default MyBookMark;

const StTitle = styled.h1`
  margin-bottom: 20px;
`;

const StGameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
`;

const GameItem = styled.div`
  width: calc((100% - 3 * 2%) / 4);
  height: calc((100% - 3 * 2%) / 4);
  margin-right: 2%;
  margin-bottom: 2%;
  margin-top: 5%;

  &:nth-child(4n) {
    margin-right: 0;
  }

  & h3 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  & img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 1000px;
  margin-left: 20px;
`;

const StContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  width: 1100px;
  min-height: 800px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.gray};
  margin-bottom: 30px;
  align-content: flex-start;
  flex-direction: row;
  & h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    user-select: none;
  }
  & label {
    font-size: 14px;
    font-weight: 400;
    margin-top: 30px;
    margin-bottom: 10px;
    user-select: none;
  }
  & input {
    position: relative;
    width: 100%;
    padding: 18px;
    border-radius: 10px;
    height: 48px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
    &:focus {
      outline: none;
    }
  }
  & textarea {
    width: 100%;
    height: 144px;
    border-radius: 10px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
    padding: 18px;
    resize: none;
    line-height: 1.5;
  }
  & p {
    color: #999;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
    margin-top: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  & select {
    width: 355px;
    padding: 18px;
    border-radius: 10px;
    height: 53px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
  }
`;
