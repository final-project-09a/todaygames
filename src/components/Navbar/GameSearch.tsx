import React from 'react';
import styled from 'styled-components';
import searchIcon from '../../assets/icons/searchIcon.svg';
import { Link } from 'react-router-dom';

interface GameSearchProps {
  searchedText: string;
  setSearchedText: React.Dispatch<React.SetStateAction<string>>;
}

const GameSearch = ({ searchedText, setSearchedText }: GameSearchProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedText('');
  };

  return (
    <StSearchBox onSubmit={handleFormSubmit}>
      <input value={searchedText} onChange={handleOnChange} placeholder="검색" />
      <Link to={`/search/${searchedText}`}>
        <StSearchIcon type="submit" />
      </Link>
    </StSearchBox>
  );
};

export default GameSearch;

const StSearchBox = styled.form`
  position: relative;
  width: 300px;
  height: 46px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin-right: 25px;
  & input {
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: 400;
  }
`;

const StSearchIcon = styled.button`
  position: absolute;
  top: 50%;
  right: 5%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  background: url(${searchIcon}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;
