import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/post';
import { GENRE_NAME } from 'constants/genre';
import { QUERY_KEYS } from 'query/keys';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typedata } from 'shared/supabase.type';
import cancelIcon from 'assets/icons/cancelIcon.svg';

// type Genre = typeof GENRE_NAME;
type BoardCategoryProps = {
  setFilteredPosts: any;
  filteredPosts: any;
};

export const BoardCategory = ({ setFilteredPosts, filteredPosts }: BoardCategoryProps) => {
  const [sortOption, setSortOption] = useState('최근순');
  const [selectedGenres, setSelectedGenres] = useState('');

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setFilteredPosts(data.reverse());
  };

  const genrefilterOnClick = (tag: any) => {
    const newFilteredPosts = data?.filter((post: any) => post.category.includes(tag));
    setFilteredPosts(newFilteredPosts?.reverse());
    setSelectedGenres(tag);
  };
  // 최근순

  const handleCancelIconClick = (genre: string) => {
    setSelectedGenres('');
  };

  return (
    <>
      <StboardCategory>
        <div>
          <label>정렬</label>
          <StRadio>
            <input
              type="radio"
              id="recent"
              name="sort"
              value={sortOption}
              checked={sortOption === '최근순'}
              onChange={() => setSortOption('최근순')}
            />
            <p>최근순</p>
          </StRadio>
          <StRadio>
            <input type="radio" id="recent" name="sort" value="인기순" onChange={() => setSortOption('인기순')} />
            <p>인기순</p>
          </StRadio>
        </div>
        <div>
          <label>장르</label>
          {GENRE_NAME.map((list, index) => (
            <StGenreContainer key={index}>
              <button
                onClick={() => genrefilterOnClick(list.tag)}
                type="button"
                style={{ borderColor: selectedGenres === list.tag ? 'white' : '#666' }}
              >
                {list.tag}
                <StCancelIcon src={cancelIcon} alt="취소버튼" onClick={() => handleCancelIconClick(list.tag)} />
              </button>
            </StGenreContainer>
          ))}
        </div>
      </StboardCategory>
    </>
  );
};

const StboardCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  gap: 30px;
  button {
    display: flex;
    align-items: center;
    width: 230px;
    height: 46px;
    background: transparent;
    color: ${(props) => props.theme.color.white};
    border: 1px solid;
    border-radius: 10px;
    background: transparent;
    padding-left: 20px;
    cursor: pointer;
  }
  label {
    background-color: ${(props) => props.theme.color.postback};
    height: 60px;
    width: 230px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: ${(props) => props.theme.color.white};
    border-radius: 7px;
  }
`;

const StRadio = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const StGenreContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  position: relative;
`;

const StCancelIcon = styled.img`
  width: 18px;
  height: 18px;
  color: #999999;
  margin-left: 7px;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
`;
