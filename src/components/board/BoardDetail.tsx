// 게사판 리스트
import { useEffect, useState } from 'react';
import { supabase, supabasedata } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
import { QUERY_KEYS } from 'query/keys';
import styled from 'styled-components';
import React from 'react';
import { BoardCategory } from './BoardCategory';
import { Seach } from './Seach';

interface PostType {
  data: Typedata['public']['Tables']['posts']['Row'];
}

export const BoardDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getPosts();
    const authListener = supabasedata.auth.onAuthStateChange((event, session) => {
      const userId = session?.user?.id;
    });
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await supabase.from(QUERY_KEYS.POSTS).select();
      console.log('data 연결', data);
      return data;
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
      return null;
    }
  };

  return (
    <React.Fragment>
      <BoardCategory />
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
