import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../../assets/icons/searchIcon.svg';

const Search = () => {
  const [searchedText, setSearchedText] = useState('');

  const handelSearchButtonClick = () => {
    alert('dd');
    setSearchedText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StSearchBox onSubmit={handleFormSubmit}>
      <input value={searchedText} onChange={handleOnChange} placeholder="검색" />
      <StSearchIcon onClick={handelSearchButtonClick} />
    </StSearchBox>
  );
};

export default Search;

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

const StSearchIcon = styled.div`
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
