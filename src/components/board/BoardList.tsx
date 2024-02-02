import styled from 'styled-components';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { Typedata } from 'types/supabaseTable';
import React, { useEffect, useState, useMemo } from 'react';
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
import { deletedata, getPosts } from 'api/post';
import { getFormattedDate } from 'util/date';
import { genreFilterPosts } from 'api/post';
import { getGames } from 'api/games';
import { RootState } from 'redux/config/configStore';
import { useDispatch } from 'react-redux';
import { setFilteredPosts } from '../../redux/modules/boardSlice';

export const BoardList = () => {
  const navigate = useNavigate();
  const selectedGenres = useSelector((state: RootState) => state.boardSlice.selectedGenres);
  const filteredPosts = useSelector((state: RootState) => state.boardSlice.filteredPosts);
  const dispatch = useDispatch();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['posts', selectedGenres.join(',')],
    queryFn: ({ pageParam }) => genreFilterPosts(selectedGenres, 5, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    }
  });

  const posts = useMemo(() => {
    if (!data) return [];
    const page = data.pages.reduce((prev, current) => {
      return [...prev, ...current];
    }, []);
    return [...page];
  }, [data]);

  const user = useSelector((state: any) => state.userSlice.userInfo);

  const [searchText, SetSearchText] = useState<string>('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.USERINFO],
    queryFn: UserInfo
  });

  const { data: games } = useQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: getGames
  });

  // const { data: postsData } = useQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: getPosts
  // });

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

  // 무한스크롤
  // const handleLoadMore = async () => {
  //   try {
  //     if (!hasMorePosts) {
  //       console.log('No more posts to load.');
  //       return;
  //     }

  //     const offset = filteredPosts.length || 0;
  //     let additionalData;

  //     if (selectedGenres && selectedGenres.length > 0) {
  //       additionalData = await genreFilterPosts(selectedGenres, 5, offset);
  //     } else {
  //       additionalData = await getPostsWithCount(5, offset);
  //     }

  //     if (additionalData && additionalData.length > 0) {
  //       dispatch(setFilteredPosts([...filteredPosts, ...additionalData]));
  //     } else {
  //       console.log('No more posts to load.');
  //       setHasMorePosts(false);
  //     }
  //   } catch (error) {
  //     console.error('additionalData 패칭 에러:', error);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (hasNextPage) fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetSearchText(e.target.value);
  };

  const isOwner = (userId: string) => {
    return user && user.id === userId;
  };

  const handleMoreInfoClick = (postId: string) => {
    setEditingPostId((prev) => (prev === postId ? null : postId));
  };

  const handleEditButtonClick = (postId: string) => {
    const postToEdit = filteredPosts.find((post: Typedata['public']['Tables']['posts']['Row']) => post.id === postId);
    navigate(`/board/edit/${postId}`, { state: { post: postToEdit } });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetSearchText('');
  };

  const handleDeletePostButton = async (id: string, user_id: string) => {
    const answer = window.confirm('정말로 삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    await deletedata(id, user_id);
    const deletedFilterItems = posts?.filter((item) => item.id !== id);
    console.log('deletedFilterItems', deletedFilterItems);
    dispatch(setFilteredPosts(deletedFilterItems));
  };

  const editdeleteForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleReport = () => {
    alert('신고기능 구현중...');
  };

  // console.log(selectedGenres);

  return (
    <div>
      <StSeachContainer onSubmit={handleFormSubmit}>
        <div>
          <p>{posts.length}개의 일치하는 게시물</p>
        </div>
        <StsearchBox>
          <StseachInput value={searchText} onChange={handleOnChange} placeholder="게시글 검색" />
          <div onClick={() => navigate(`/search/${searchText}`)}>
            <StSearchIcon type="submit" />
          </div>
          <Button type="button" size="small" onClick={moveregisterPageOnClick}>
            글쓰기
          </Button>
        </StsearchBox>
      </StSeachContainer>

      {posts.length > 0 ? (
        posts.map((post: Typedata['public']['Tables']['posts']['Row']) => {
          const userInfo = userInfoData?.find((user) => user.id === post?.user_id);

          if (userInfo) {
            const postIsOwner = isOwner(post.user_id);
            return (
              <StcontentBox key={post?.id} defaultValue={post.id}>
                <EditBtn onClick={() => handleMoreInfoClick(post.id)} />
                {postIsOwner && editingPostId === post.id && (
                  <StfetchForm onSubmit={editdeleteForm}>
                    <StButton onClick={() => handleEditButtonClick(post.id)}>수정</StButton>
                    <StButton onClick={() => handleDeletePostButton(post.id, post.user_id)}>삭제</StButton>
                  </StfetchForm>
                )}

                {!postIsOwner && editingPostId === post.id && (
                  <StfetchForm>
                    <StButton onClick={handleReport}>신고하기</StButton>
                  </StfetchForm>
                )}
                <StProfileWrapper>
                  <section>
                    <StUserImageWrapper>
                      <img src={userInfo.avatar_url ? userInfo.avatar_url : userimg} alt="프로필 이미지" />
                    </StUserImageWrapper>
                    <StUserNameWrapper>
                      <h2>{userInfo.nickname ? userInfo.nickname : 'KAKAO USER'}</h2>
                      <p>{getFormattedDate(post.created_At)}</p>
                    </StUserNameWrapper>
                  </section>
                </StProfileWrapper>
                <StContentWrapper>
                  <StContent>
                    <StText onClick={() => movedetailPageOnClick(post?.id)}>
                      <h3>{post?.title}</h3>
                      <StHiddenText>
                        <p>{post?.content}</p>
                      </StHiddenText>
                    </StText>
                    <StTagWrapper>
                      {games?.map((game) => {
                        if (game.name === post.game) {
                          const appId = game.app_id;
                          return (
                            <Tag
                              key={appId}
                              onClick={() => navigate(`/detail/${appId}`)}
                              size="small"
                              backgroundColor="secondary"
                            >
                              {post.game}
                            </Tag>
                          );
                        }
                      })}
                      {post?.category
                        .split(',')
                        .map((item) => item.trim())
                        .map((genre: string) => (
                          <Tag key={genre} prefix="#" size="small" backgroundColor="lightgray">
                            {genre}
                          </Tag>
                        ))}
                    </StTagWrapper>
                  </StContent>
                  {post?.image && (
                    <StImageWrapper onClick={() => movedetailPageOnClick(post?.id)}>
                      <img src={post?.image} alt={post.game} />
                    </StImageWrapper>
                  )}
                </StContentWrapper>
                <StPostInfoWrapper>
                  <div>
                    <img src={comments} />
                    <p>{post.comment_count}</p>
                  </div>
                  <div>
                    <img src={thumsUp} />
                    <p>{post.like_count}</p>
                  </div>
                </StPostInfoWrapper>
              </StcontentBox>
            );
          }
        })
      ) : (
        <StNullboard>게시물이 없습니다.</StNullboard>
      )}
    </div>
  );
};

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
const StfetchForm = styled.form`
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
  left: 1100px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-image: url(${editBtn});
  cursor: pointer;
`;
const StSeachContainer = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StsearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  gap: 10px;
`;

const StseachInput = styled.input`
  height: 48px;
  width: 400px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 10px;
  border: none;
  padding-left: 20px;
  position: relative;
`;

const StSearchIcon = styled.button`
  display: flex;
  position: absolute;
  top: 50%;
  right: 24%;
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
  height: fit-content;
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
  height: fit-content;
  display: flex;
  gap: 20px;
  width: 100%;
`;

const StContent = styled.div`
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
    font-size: 14px;
    font-weight: 400;
    /* line-height: 1.1; */
    max-height: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StHiddenText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StText = styled.div`
  width: 920px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
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
  cursor: pointer;
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
