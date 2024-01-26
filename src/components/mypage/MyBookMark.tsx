import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { supabase } from 'types/supabase';
import styled from 'styled-components';

const MyBookMark = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
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
  return (
    <StUserInfoContainer>
      <StContentBox>
        <h2>찜 목록</h2>
        {bookmarks.map((bookmark: any, index: number) => (
          <h3 key={index}>Bookmark ID: {bookmark.app_id}</h3>
        ))}
      </StContentBox>
    </StUserInfoContainer>
  );
};

export default MyBookMark;

const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 1000px;
  margin-left: 20px;
`;

const StContentBox = styled.div`
  position: relative;
  width: 1100px;
  height: 800px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.gray};
  margin-bottom: 30px;
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
