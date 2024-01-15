// 게사판 리스트
import { useEffect, useState } from 'react';
import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
import { QUERY_KEYS } from 'query/keys';
import styled from 'styled-components';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface PostType {
  data: Typedata['public']['Tables']['posts']['Row'];
}

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
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

  const moveToPosting = () => {
    navigate(`/register`);
  };

  const { data: postData } = useQuery({
    queryKey: [QUERY_KEYS.POST],
    queryFn: getPosts
  });

  return (
    <>
      <React.Fragment>
        <button onClick={moveToPosting}>새 글 작성하기</button>
      </React.Fragment>
    </>
  );
};
