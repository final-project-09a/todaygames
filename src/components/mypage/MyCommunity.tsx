import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { supabase } from 'types/supabase';

const MyCommunity = () => {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select();

        if (error) {
          console.error('Error fetching posts:', error.message);
        } else {
          if (data && data.length > 0) {
            setPosts(data);
            console.log(data);
          } else {
            console.warn('No posts found.');
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <StUserInfoContainer>
      <StContentBox>
        <h2>내가 쓴 글</h2>
      </StContentBox>
    </StUserInfoContainer>
  );
};

export default MyCommunity;

const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 1000px;
  margin-left: 20px;
`;

const StContentBox = styled.div`
  position: relative;
  width: 1100px;
  height: 800px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.gray};
  margin-bottom: 30px;
  & h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    user-select: none;
  }
  & label {
    font-size: 14px;
    font-weight: 400;
    margin-top: 30px;
    margin-bottom: 10px;
    user-select: none;
  }
  & input {
    position: relative;
    width: 100%;
    padding: 18px;
    border-radius: 10px;
    height: 48px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
    &:focus {
      outline: none;
    }
  }
  & textarea {
    width: 100%;
    height: 144px;
    border-radius: 10px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
    padding: 18px;
    resize: none;
    line-height: 1.5;
  }
  & p {
    color: #999;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
    margin-top: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  & select {
    width: 355px;
    padding: 18px;
    border-radius: 10px;
    height: 53px;
    background: ${(props) => props.theme.color.inputcolor};
    color: ${(props) => props.theme.color.white};
    border: none;
  }
`;
