import { GENRE_NAME } from 'constants/genre';
import { useState } from 'react';
import styled from 'styled-components';
import cancelIcon from 'assets/icons/cancelIcon.svg';
import { useDispatch } from 'react-redux';
import { setFilteredPosts, setSelectedGenres } from '../../redux/modules/boardSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { genreFilterPosts } from 'api/post';

export const BoardCategory = () => {
  const [sortOption, setSortOption] = useState('최근순');
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state: RootState) => state.boardSlice.selectedGenres);

  const genrefilterOnClick = async (tag: string) => {
    const updatedGenres = selectedGenres.includes(tag)
      ? selectedGenres.filter((selectedGenre: string) => selectedGenre)
      : [...selectedGenres, tag];
    console.log(updatedGenres);

    dispatch(setSelectedGenres(updatedGenres));
    const newFilteredPosts = await genreFilterPosts(updatedGenres);
    dispatch(setFilteredPosts(newFilteredPosts));
  };

  const handleCancelIconClick = async (genre: string) => {
    const updatedGenres = selectedGenres.filter((selectedGenre: string) => selectedGenre !== genre);
    console.log(updatedGenres);
    dispatch(setSelectedGenres(updatedGenres));
    const newFilteredPosts = await genreFilterPosts(updatedGenres);
    console.log(newFilteredPosts);
    dispatch(setFilteredPosts(newFilteredPosts));
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
          <StGenreContainer>
            {GENRE_NAME.map((list, index) => (
              <StGenre
                key={index}
                onClick={() => genrefilterOnClick(list.tag)}
                selected={selectedGenres.includes(list.tag)}
              >
                {list.tag}
                {selectedGenres.includes(list.tag) && (
                  <StCancelIcon
                    src={cancelIcon}
                    alt="취소버튼"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelIconClick(list.tag);
                    }}
                  />
                )}
              </StGenre>
            ))}
          </StGenreContainer>
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
  flex-direction: column;
  gap: 10px;
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

const StGenre = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 230px;
  height: 46px;
  border-radius: 10px;
  background: transparent;
  padding-left: 20px;
  color: ${(props) => (props.selected ? props.theme.color.white : '#666')};
  border: 1px solid ${(props) => (props.selected ? props.theme.color.white : '#666')};
`;
