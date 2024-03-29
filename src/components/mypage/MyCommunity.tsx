import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { supabase } from 'types/supabase';
import { RootState } from 'redux/config/configStore';
import { Link } from 'react-router-dom';
import { Typedata } from 'types/supabaseTable';

import editBtn from '../../assets/img/editBtn.png';
import { useNavigate } from 'react-router-dom';
import { deletedata } from 'api/post';

const MyCommunity = () => {
  const [posts, setPosts] = useState<Typedata['public']['Tables']['posts']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [dropdownVisibleMap, setDropdownVisibleMap] = useState<{ [postId: string]: boolean }>({});
  const filteredPosts = useSelector((state: RootState) => state.boardSlice.filteredPosts);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase.from('posts').select().eq('user_id', user?.id);
        if (data && data.length > 0) {
          setPosts(data);
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

  const handleDeletePostButton = async (postId: string) => {
    if (!user?.id) return;
    const answer = window.confirm('정말로 삭제하시겠습니까?');
    if (!answer) return;

    await deletedata(postId, user.id);
    const deletedPosts = posts.filter((post) => post.id !== postId);
    setPosts(deletedPosts);
  };

  const handleEditButtonClick = (postId: string) => {
    const postToEdit = posts.find((post) => post.id === postId);
    navigate(`/board/edit/${postId}`, { state: { post: postToEdit } });
  };

  const handleMoreInfoClick = (postId: string) => {
    setEditingPostId((prev) => (prev === postId ? null : postId));
    setDropdownVisibleMap((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <StUserInfoContainer>
      <StContentBox>
        <h1>등록된 게시물{posts.length}개</h1>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index}>
              <PostContainer>
                <EditBtn onClick={() => handleMoreInfoClick(post.id)} />
                {editingPostId === post.id && (
                  <StfetchForm>
                    <StButton onClick={() => handleEditButtonClick(post.id)}>수정</StButton>
                    <StButton onClick={() => handleDeletePostButton(post.id)}>삭제</StButton>
                  </StfetchForm>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/boarddetail/${post.id}`)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <StUserImageWrapper>
                        <img src={user?.avatar_url} alt="프로필이미지" />
                      </StUserImageWrapper>
                      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                        <div>{user?.nickname}</div>
                        <div>{post.created_At.split('T')[0]}</div>
                      </div>
                    </div>
                    <StyledH2>{post.title}</StyledH2>

                    <StyledH3>{post.content}</StyledH3>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      {post.category.split(',').map((category: string, idx: number) => (
                        <StCategory key={idx}>#{category.trim()}</StCategory>
                      ))}
                    </div>
                  </div>
                  <StImageWrapper style={{ cursor: 'pointer' }} onClick={() => navigate(`/boarddetail/${post.id}`)}>
                    <img src={post?.image[0]} alt={post.game} />
                  </StImageWrapper>
                </div>
              </PostContainer>
            </div>
          ))
        ) : (
          <StyledDiv>
            <h3>등록된 게시글이 없습니다.</h3>
            <Link to="/register">
              <StyledButton>게시물 등록하기</StyledButton>
            </Link>
          </StyledDiv>
        )}
      </StContentBox>
    </StUserInfoContainer>
  );
};

export default MyCommunity;

const StImageWrapper = styled.figure`
  width: 200px;
  height: 168px;
  border-radius: 10px;
  background: #646466;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StButton = styled.button`
  position: flex;
  height: 40px;
  width: 90px;
  background-color: #3a3a3a;
  color: ${(props) => props.theme.color.white};
  transition: 0.3s ease;
  cursor: pointer;
  & p {
    color: ${(props) => props.theme.color.white};
    font-weight: 500;
  }
  &:hover {
    & h4 {
      color: ${(props) => props.theme.color.gray};
    }
    background-color: ${(props) => props.theme.color.gray};
  }
`;

const StfetchForm = styled.div`
  flex-direction: column;
  padding: 10px;
  justify-content: flex-end;
  display: flex;
  position: absolute;
  z-index: 20;
  right: 2%;
  top: 16%;
`;

const EditBtn = styled.button`
  display: flex;
  position: relative;
  flex-direction: row;
  top: 10px;
  left: 970px;
  width: 24px;
  height: 24px;
  margin-bottom: 20px;
  background-color: transparent;
  background-image: url(${editBtn});
  cursor: pointer;
`;
const StUserImageWrapper = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 5px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 25px;
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
  position: relative;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 10px;
`;

const StyledH2 = styled.h2`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  min-height: 600px;
  margin-left: 20px;
`;

const StContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  width: 1100px;
  min-height: 600px;
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
