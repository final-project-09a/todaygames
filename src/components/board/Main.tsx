// 게사판 리스트
import { useEffect, useState } from 'react';
import { supabase } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
import { QUERY_KEYS } from 'query/keys';
import styled from 'styled-components';
import React from 'react';

interface PostType {
  data: Typedata['public']['Tables']['posts']['Row'];
}

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);

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

  return (
    <React.Fragment>
      <div></div>
    </React.Fragment>
  );
};
