import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/post';
import { GENRE_NAME } from 'constants/genre';
import { QUERY_KEYS } from 'query/keys';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typedata } from 'shared/supabase.type';

interface GenreType {
  postsData: Typedata['public']['Tables']['posts'][];
  tag: string;
  onClick: () => void;
}
export const BoardCategory = () => {
  const [selectorGenre, useSelectorGenre] = useState<string | null>('액션');
  useEffect(() => {
    getPosts();
  });
  const { data: postsData = [] } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  const handleGenreCardClick = useCallback((tag: string) => {
    useSelectorGenre(tag);
  }, []);
  // incluses 로   postsData 와 GENRE_NAME.tag와 일치하는 장르 필터링 하기
  const genrefilterOnClick = GENRE_NAME.filter((genre) => {
    postsData.some((post) => post.category.includes(genre.tag));
  });

  return (
    <>
      <StboardLeftCategory>
        <label>정렬</label>
        <StLabel>
          <StvideoInput type="radio" id="recent" name="sort" value="최근순" />
          최근순
        </StLabel>
        <StLabel>
          <StvideoInput type="radio" id="popular" name="sort" value="인기순" />
          인기순
        </StLabel>
        <label>장르</label>
        {GENRE_NAME.map((list, index) => (
          <button onClick={() => genrefilterOnClick(list.tag)} key={index}>
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
  align-items: center;
  margin: 5px auto 10px auto;
  transform: translate(-20%, -50%);
`;
const StboardLeftCategory = styled.form`
  display: flex;
  flex-direction: column;
  width: 25%;
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
  h3 {
  }
`;
