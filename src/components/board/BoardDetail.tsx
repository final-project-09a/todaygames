// 게사판 리스트
import { useEffect } from 'react';
import { Typedata } from 'shared/supabase.type';
import styled from 'styled-components';
import React from 'react';
import { Seach } from './Seach';
import { getPosts } from 'api/post';

interface PostType {
  data: Typedata['public']['Tables']['posts']['Row'];
}

export const BoardDetail = () => {
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <React.Fragment>
      <StRegister>게시글 작성</StRegister>
      <Seach />
    </React.Fragment>
  );
};

const StRegister = styled.label`
  display: flex;
  padding: 15px;
  background: #2d4fa6;
  width: 700px;
  border-radius: 10px;
  margin-top: 30px;
`;
