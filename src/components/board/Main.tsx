// 게시판 상세정보  디자인 미정

// import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { supabase } from 'shared/supabase';
import { useQuery } from '@tanstack/react-query';
import { Comment } from 'components/comment/Comment';

interface Post {
  id: number;
  title: string;
  content: string;
}

export const Main = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        throw error;
      }
    };
  });

  return (
    <StboardListContainer>
      <Stselectcontainer>
        <StyledBox>
          <option>최신순</option>
          <option>인기순</option>
        </StyledBox>
        <StBox>
          <option>RPG</option>
          <option>액션</option>
          <option>어드벤처</option>
          <option>전략</option>
          <option>레이싱 시뮬레이션</option>
        </StBox>
        <Stseach />
        <Stbutton>글쓰기</Stbutton>
      </Stselectcontainer>
      <StcontentBox></StcontentBox>
    </StboardListContainer>
  );
};

const StboardListContainer = styled.div`
  display: flex;
  margin: 30px 50px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  flex-direction: column;
`;

const Stselectcontainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledBox = styled.select`
  height: 42px;
  width: 101px;
  margin-right: 10px;
  background-color: #232323;
  color: #ffffff;
  border-radius: 50px;
  line-height: normal;
`;

const StBox = styled.select`
  background-color: #232323;
  border-radius: 50px;
  height: 42px;
  width: 89px;
  line-height: normal;
  margin-right: 140px;
  color: #ffffff;
`;

const Stseach = styled.input`
  height: 48px;
  width: 438px;
  background-color: #232323;
  border-radius: 10px;
  color: white;
  height: 48px;
  margin-left: 40px;
  margin-right: 10px; /* 여기에 margin을 추가 */
`;

const Stbutton = styled.button`
  height: 48px;
  width: 80px;
  background-color: #2d4ea5;
  border-radius: 10px;
  margin-left: 10px; /* 여기에 margin을 추가 */
`;

const StcontentBox = styled.div`
  display: flex;
  height: 283px;
  width: 1281px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #232323;
  border-radius: 10px;
  margin-top: 30px;
`;
