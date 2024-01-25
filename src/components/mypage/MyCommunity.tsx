import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { supabase } from 'types/supabase';
import { RootState } from 'redux/config/configStore';

const MyCommunity = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from('posts').select().eq('user_id', user?.id);

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
    if (user?.id) {
      fetchPosts();
    }
  }, [user?.id]);
  console.log(posts);
  console.log(user?.id);

  return (
    <StUserInfoContainer>
      <StContentBox>
        <h1>등록된게시물{posts.length}개</h1>
        <div>
          {posts.map((post, index) => (
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
          ))}
        </div>
        {/* {posts.map((post, index) => (
          <div key={index}>
            <h3>카테고리: {post.category}</h3>
            <h4>제목: {post.title}</h4>
            {post.image && post.image.length > 0 && (
              <img src={JSON.parse(post.image)[0]} alt="Post" /> // 이미지 URL이 있다면 이미지를 출력합니다.
            )}
            <p>내용: {post.content}</p>
            <p>게임: {post.game}</p>
          </div>
        ))} */}
      </StContentBox>
    </StUserInfoContainer>
  );
};

export default MyCommunity;

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
