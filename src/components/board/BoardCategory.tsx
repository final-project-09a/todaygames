import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/post';
import { GENRE_NAME } from 'constants/genre';
import { QUERY_KEYS } from 'query/keys';
import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typedata } from 'shared/supabase.type';

interface GenreType {
  postsData: Typedata['public']['Tables']['posts'][];
}
// type Genre = typeof GENRE_NAME;
type BoardCategoryProps = {
  setFilteredPosts: any;
  filteredPosts: any;
};

export const BoardCategory = ({ setFilteredPosts, filteredPosts }: BoardCategoryProps) => {
  const [sortOption, setSortOption] = useState('최근순');

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
    console.log(newFilteredPosts);
    setFilteredPosts(newFilteredPosts?.reverse());
  };
  // 최근순

  return (
    <>
      <StboardLeftCategory>
        <label>정렬</label>
        <StLabel>
          <StvideoInput type="radio" id="recent" name="sort" value={sortOption} checked={sortOption === '최근순'} />
          {sortOption}
        </StLabel>
        <StLabel>
          <StvideoInput type="radio" id="popular" name="sort" value="인기순" />
          인기순
        </StLabel>
        <label>장르</label>
        {GENRE_NAME.map((list, index) => (
          // 문제: button 태그는 컴포넌트가 아니다.
          <button onClick={() => genrefilterOnClick(list.tag)} key={index} type="button">
            {list.tag}
          </button>
        ))}
      </StboardLeftCategory>
    </>
  );
};

const StvideoInput = styled.input`
  height: 17px;
  width: 39px;
  background-color: #2d4ea5;
`;
const StLabel = styled.div`
  display: flex;
  margin: 3px auto 15px 10px;
  transform: translate(-20%, -50%);
  flex-direction: row;
  align-content: stretch;
  align-items: flex-end;
`;
const StboardLeftCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 90px;
  margin-left: 150px;
  button {
    display: inline-flex;
    flex-direction: column;
    width: 232px;
    height: 46px;
    color: #ffffff;
    border-color: #666666;
    border: 1px solid;
    border-radius: 10px;
    background-color: #191919;
    line-height: normal;
    align-items: center;
    padding: 15px 0 0 10px;
    cursor: pointer;
  }
  label {
    margin-top: 40px;
    background-color: #232323;
    height: 60px;
    width: 230px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: #ffffff;
    border-radius: 7px;
  }
`;
