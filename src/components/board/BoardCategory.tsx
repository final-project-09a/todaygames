import { GENRE_NAME } from 'constants/genre';
import styled from 'styled-components';
import cancelIcon from 'assets/icons/cancelIcon.svg';
import { useDispatch } from 'react-redux';
import { setSelectedGenres, setSortOption, SortOption } from '../../redux/modules/boardSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';

export const BoardCategory = () => {
  const dispatch = useDispatch();
  const { selectedGenres, sortOption } = useSelector((state: RootState) => state.boardSlice);

  const genrefilterOnClick = async (genre: string) => {
    if (selectedGenres.includes(genre)) return;
    dispatch(setSelectedGenres([...selectedGenres, genre]));
  };

  const handleCancelIconClick = async (genre: string) => {
    if (!selectedGenres.includes(genre)) return;
    dispatch(setSelectedGenres(selectedGenres.filter((item) => item !== genre)));
  };

  const handleSortOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as SortOption;
    dispatch(setSortOption(value));
  };

  return (
    <>
      <StboardCategory>
        <div>
          <label>정렬</label>
          <StRadio>
            <input
              type="radio"
              name="sort"
              value="최근순"
              checked={sortOption === '최근순'}
              onChange={handleSortOption}
            />
            <p>최근순</p>
          </StRadio>
          <StRadio>
            <input
              type="radio"
              name="sort"
              value="인기순"
              checked={sortOption === '인기순'}
              onChange={handleSortOption}
            />
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
