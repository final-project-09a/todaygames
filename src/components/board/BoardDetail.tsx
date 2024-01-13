// 게시판 상세정보  디자인 미정

// import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export const Detail = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        throw error;
      }
    };
  });

  return (
    <React.Fragment>
      <StboardDetailContainer>
        <Link to="">
          <StregisterLinkButton>게시글 작성</StregisterLinkButton>
        </Link>
      </StboardDetailContainer>
      <Comment />
    </React.Fragment>
  );
};

const StboardDetailContainer = styled.div`
  display: flex;
`;

const StregisterLinkButton = styled.div`
  display: flex;
  padding: 20px;
  width: 35%;
`;
