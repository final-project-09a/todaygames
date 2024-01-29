// 게시판 리스트

import styled from 'styled-components';
import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { Typedata } from 'types/supabaseTable';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import searchIcon from '../../assets/icons/searchIcon.svg';
import MoreViewButton from 'common/MoreViewButton';
import Button from 'common/Button';
import userimg from 'assets/img/userimg.png';
import Tag from 'common/Tag';
import comments from 'assets/icons/comments.svg';
import thumsUp from 'assets/icons/thumsUp.svg';
import editBtn from '../../assets/img/editBtn.png';
import { deletedata } from 'api/post';
import { useDispatch } from 'react-redux';
import { deletePost } from 'redux/modules/postSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Post } from 'types/global.d';

interface UserInfo {
  userInfo: Typedata['public']['Tables']['userinfo']['Row'];
}

interface PostDetail {
  user_id: string;
  post: string;
  id: string;
  created_At: string;
  title: string;
  content: string;
  category: string;
  image: string;
  game: string;
}
interface Data {
  id: number;
  user_id: string;
  content: string;
  image: string;
  title: string;
  category: string;
  game: string;
  created_At: Date;
}
interface MypostApi {
  deletedata: (id: string) => Promise<Data>;
}

export const BoardList = ({ filteredPosts }: any) => {
  const [displayedPosts, setDisplayedPosts] = useState(5);
  const [searchText, SetSearchText] = useState<string>('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [dropdownVisibleMap, setDropdownVisibleMap] = useState<{ [postId: string]: boolean }>({});
  const [deletefetching, setDeletefetching] = useState({ deletedata });

  const user = useSelector((state: any) => state.userSlice.userInfo);

  const navigate = useNavigate();

  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.USERINFO],
    queryFn: UserInfo
  });

  // 글쓰기 이동
  const moveregisterPageOnClick = () => {
    if (user) {
      navigate(`/register`);
    } else {
      navigate('/login');
    }
  };

  const movedetailPageOnClick = (item: string) => {
    navigate(`/boarddetail/${item}`);
  };

  const initialDisplayedPosts = filteredPosts.slice(0, displayedPosts);

  const handleLoadMore = () => {
    setDisplayedPosts((prev) => (prev === 0 ? 5 : prev + 5));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetSearchText(e.target.value);
  };

  // -----------------------------------------------------------

  const isOwner = (userId: string) => {
    return user && user.id === userId;
  };

  const handleMoreInfoClick = (postId: string) => {
    setEditingPostId((prev) => (prev === postId ? null : postId));
    setDropdownVisibleMap((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleEditButtonClick = (postId: string) => {
    const postToEdit = filteredPosts.find((post: Typedata['public']['Tables']['posts']['Row']) => post.id === postId);
    navigate(`/board/edit/${postId}`, { state: { post: postToEdit } });
  };

  const { data } = useQuery({ queryKey: ['posts'], queryFn: () => deletedata('id', 'user_id') });
  console.log(data);
  const handleDeletePostButton: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const answer = window.confirm('정말로 삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    await deletedata('id', 'user_id');
  };

  const handleReport = () => {
    alert('신고기능 구현중...');
  };

  return (
    <div>
      <StSeachContainer>
        <p>{filteredPosts.length}개의 일치하는 게시물</p>
        <StsearchBox>
          <StseachInput value={searchText} onChange={handleOnChange} placeholder="게시글 검색" />
          <StSearchIcon />
          <Button size="small" onClick={moveregisterPageOnClick}>
            글쓰기
          </Button>
        </StsearchBox>
      </StSeachContainer>

      {filteredPosts.length > 0 ? (
        initialDisplayedPosts.map((post: PostDetail) => {
          const userInfo = userInfoData?.find((user) => user.id === post?.user_id);

          if (userInfo) {
            const postIsOwner = isOwner(post.user_id);
            return (
              <StcontentBox key={post?.id}>
                <EditBtn onClick={() => handleMoreInfoClick(post.id)} />
                {postIsOwner && editingPostId === post.id && (
                  <StfetchForm>
                    <StButton onClick={() => handleEditButtonClick(post.id)}>수정</StButton>
                    <StButton onClick={handleDeletePostButton}>삭제</StButton>
                  </StfetchForm>
                )}

                {!postIsOwner && editingPostId === post.id && (
                  <StfetchForm>
                    <StButton onClick={handleReport}>신고하기</StButton>
                  </StfetchForm>
                )}
                <Stdetailmoveline onClick={() => movedetailPageOnClick(post?.id)}>
                  <StProfileWrapper>
                    <section>
                      <StUserImageWrapper>
                        <img src={userInfo.avatar_url ? userInfo.avatar_url : userimg} alt="프로필 이미지" />
                      </StUserImageWrapper>
                      <StUserNameWrapper>
                        <h2>{userInfo.nickname ? userInfo.nickname : 'KAKAO USER'}</h2>
                        <p>{post.created_At}</p>
                      </StUserNameWrapper>
                    </section>
                  </StProfileWrapper>
                  <StContentWrapper>
                    <StText>
                      <h3>{post?.title}</h3>
                      <p>{post?.content}</p>
                      <StTagWrapper>
                        <Tag size="small" backgroundColor="secondary">
                          {post.game}
                        </Tag>
                        {post?.category
                          .split(',')
                          .map((item) => item.trim())
                          .map((genre: string) => (
                            <Tag key={genre} prefix="#" size="small" backgroundColor="lightgray">
                              {genre}
                            </Tag>
                          ))}
                      </StTagWrapper>
                    </StText>
                    {post?.image && (
                      <StImageWrapper>
                        <img src={post?.image} alt={post.game} />
                      </StImageWrapper>
                    )}
                  </StContentWrapper>
                </Stdetailmoveline>
                <StPostInfoWrapper>
                  <div>
                    <img src={comments} />
                    <p>5</p>
                  </div>
                  <div>
                    <img src={thumsUp} />
                    <p>5</p>
                  </div>
                </StPostInfoWrapper>
              </StcontentBox>
            );
          }
        })
      ) : (
        <StNullboard>게시물이 없습니다.</StNullboard>
      )}

      {initialDisplayedPosts.length < filteredPosts.length && (
        <MoreViewButton onClick={handleLoadMore}>더보기</MoreViewButton>
      )}
    </div>
  );
};
const Stdetailmoveline = styled.div`
  cursor: pointer;
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
const StrefetchForm = styled.form`
  flex-direction: column;
  justify-content: space-between;
  display: flex;
`;
const EditBtn = styled.button`
  display: flex;
  position: relative;
  flex-direction: row;
  top: 10px;
  left: 1100px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-image: url(${editBtn});
  cursor: pointer;
`;
const StSeachContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StsearchBox = styled.div`
  display: flex;
  position: relative;
  gap: 20px;
`;

const StseachInput = styled.input`
  height: 48px;
  width: 400px;
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 10px;
  border: none;
  padding-left: 20px;
  position: relative;
`;

const StSearchIcon = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  right: 23%;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  background: url(${searchIcon});
  cursor: pointer;
`;

const StcontentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1180px;
  height: max-content;
  margin-bottom: 30px;
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 10px;
  white-space: nowrap;
  color: ${(props) => props.theme.color.white};
  padding: 20px;
`;

const StProfileWrapper = styled.div`
  width: 920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & section {
    display: flex;
    align-items: center;
    gap: 5px;
  }
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

const StUserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & h2 {
    font-size: 17px;
    font-weight: 400;
  }
  & p {
    color: #999;
    font-size: 13px;
    font-weight: 400;
  }
`;

const StContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const StText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0;
  width: 920px;
  overflow: hidden;
  & h3 {
    font-size: 18px;
    font-weight: 700;
  }
  & p {
    color: #eee;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StTagWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;

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

const StPostInfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  & div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const StNullboard = styled.div`
  display: flex;
  position: relative;
  bottom: 800px;
  left: 500px;
`;
