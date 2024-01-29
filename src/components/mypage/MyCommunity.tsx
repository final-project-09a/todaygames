import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { supabase } from 'types/supabase';
import { RootState } from 'redux/config/configStore';
import { Link } from 'react-router-dom';
import { Typedata } from 'types/supabaseTable';
import Button from 'common/Button';

const MyCommunity = () => {
  const [posts, setPosts] = useState<Typedata['public']['Tables']['posts']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select().eq('user_id', user?.id);
        if (data && data.length > 0) {
          setPosts(data);
          console.log(data);
        } else {
          console.warn('No posts found.');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchPosts();
    }
  }, [user?.id]);

  if (loading) {
    return <StUserInfoContainer />;
  }

  return (
    <StUserInfoContainer>
      <StContentBox>
        <h1>등록된게시물{posts.length}개</h1>
        <div>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostContainer key={index}>
                <StyledH2>{post.title}</StyledH2>
                <StyledH3>{post.content}</StyledH3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  {post.category.split(',').map((category: string, idx: number) => (
                    <StCategory key={idx}>#{category.trim()}</StCategory>
                  ))}
                </div>
                <div style={{ textAlign: 'left' }}>등록시간: {post.created_At.split('T')[0]}</div>
              </PostContainer>
            ))
          ) : (
            <StyledDiv>
              <h3>등록된 게시글이 없습니다.</h3>
              <Link to="/register">
                <StyledButton>게시물 등록하기</StyledButton>
              </Link>
            </StyledDiv>
          )}
        </div>
      </StContentBox>
    </StUserInfoContainer>
  );
};

export default MyCommunity;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
`;

const StyledButton = styled.button`
  border-radius: 50px;
  background: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.white};
  font-size: 14px;
  font-weight: 500;
  width: 250px;
  height: 50px;
  cursor: pointer;
  transition: 0.3s;
  flex-shrink: 0;
  &:hover {
    color: ${(props) => props.theme.color.gray};
    background: ${(props) => props.theme.color.white};
  }
`;

const PostContainer = styled.div`
  width: 1020px;
  margin: 10px auto;
  border-bottom: 1px solid #ccc;
  padding: 15px;
  border-color: #333;
`;
const StCategory = styled.div`
  padding: 7px 16px;
  border-radius: 10px;
  background-color: #363636;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const StyledH3 = styled.h3`
  color: #eee;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 10px;
`;

const StyledH2 = styled.h2`
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin-left: 20px;
`;

const StContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  width: 1100px;
  min-height: 800px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.gray};
  margin-bottom: 30px;
  align-content: flex-start;
  flex-direction: row;
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
