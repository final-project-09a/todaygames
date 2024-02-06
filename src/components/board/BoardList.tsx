import styled from 'styled-components';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { Typedata } from 'types/supabaseTable';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import searchIcon from '../../assets/icons/searchIcon.svg';
import Button from 'common/Button';
import userimg from 'assets/img/userimg.png';
import Tag from 'common/Tag';
import comments from 'assets/icons/comments.svg';
import thumsUp from 'assets/icons/thumsUp.svg';
import editBtn from '../../assets/img/editBtn.png';
import { deletedata } from 'api/post';
import { getFormattedDate } from 'util/date';
import { genreFilterPosts } from 'api/post';
import { getGamesWithGameName } from 'api/games';
import { RootState } from 'redux/config/configStore';
import folderIcon from 'assets/icons/folderIcon.svg';

type GameInfoMap = {
  [appId: string]: Typedata['public']['Tables']['games']['Row'];
};

export const BoardList = () => {
  const navigate = useNavigate();
  const { selectedGenres, sortOption } = useSelector((state: RootState) => state.boardSlice);
  const filteredPosts = useSelector((state: RootState) => state.boardSlice.filteredPosts);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [gameInfoMap, setGameInfoMap] = useState<GameInfoMap>({});
  const [searchTerm, setSearchTerm] = useState(''); // 검색기능

  // useInfiniteQuery를 이용한 무한스크롤 구현
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts', selectedGenres.join(','), sortOption],
    queryFn: ({ pageParam }) => genreFilterPosts(selectedGenres, 5, pageParam, sortOption),
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
    const listpostfiltered = page.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase().slice(0, 1)) ||
        post.game.toLowerCase().includes(searchTerm.toLowerCase().slice(0, 1))
    );
    return listpostfiltered;
  }, [data, searchTerm]);

  // posts 데이터의 게임정보만 가져오기(게임 클릭 시 상세페이지 이동을 위함)
  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const infoMap: GameInfoMap = {};
        await Promise.all(
          posts.map(async (post: Typedata['public']['Tables']['posts']['Row']) => {
            try {
              const gameInfo = await getGamesWithGameName(post.game);
              infoMap[post.game] = gameInfo;
            } catch (error) {
              console.error(`${post.game} 게임 정보 패칭오류:`, error);
            }
          })
        );
        setGameInfoMap(infoMap);
      } catch (error) {
        console.error('게임 정보 패칭 에러:', error);
      }
    };

    fetchGameInfo();
  }, [posts]);

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
    setSearchTerm(e.target.value);
  };

  const isOwner = (userId: string) => {
    return user && user.id === userId;
  };

  const handleMoreInfoClick = (postId: string) => {
    setEditingPostId((prev) => (prev === postId ? null : postId));
  };

  //검색
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm('');
  };

  //수정
  const handleEditButtonClick = (postId: string) => {
    const postToEdit = filteredPosts.find((post: Typedata['public']['Tables']['posts']['Row']) => post.id === postId);
    navigate(`/board/edit/${postId}`, { state: { post: postToEdit } });
  };

  //삭제
  const handleDeletePostButton = async (id: string, user_id: string) => {
    const answer = window.confirm('정말로 삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    await deletedata(id, user_id);
  };

  const editdeleteForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleReport = () => {
    alert('신고기능 구현중...');
  };
  const handleSearch = () => {
    setSearchTerm('검색어');
  };

  return (
    <StBoardListContainer>
      <StSeachContainer onSubmit={handleFormSubmit}>
        <StseachInput value={searchTerm} onChange={handleOnChange} placeholder="게시글 검색" />
        <StSearchIcon value={searchTerm} type="submit" onClick={handleSearch} />
        <Button type="button" size="small" onClick={moveregisterPageOnClick}>
          글쓰기
        </Button>
      </StSeachContainer>
      {posts.length > 0 ? (
        filteredPosts &&
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
                      <Tag
                        onClick={() => navigate(`/detail/${gameInfoMap[post.game]?.app_id}`)}
                        size="small"
                        backgroundColor="secondary"
                      >
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
                  </StContent>
                  {post?.image && post.image.length > 0 && (
                    <StImageWrapper onClick={() => movedetailPageOnClick(post?.id)}>
                      <img src={post?.image[0]} alt={post.game} />
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
        <StNoResultWrapper>
          <img src={folderIcon} alt="폴더아이콘" />
          <p>해당 장르의 포스트가 없습니다.</p>
        </StNoResultWrapper>
      )}
    </StBoardListContainer>
  );
};

const StBoardListContainer = styled.div`
  width: 100%;
`;

const StNoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
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
const StfetchForm = styled.form`
  flex-direction: column;
  padding: 10px;
  justify-content: flex-end;
  display: flex;
  position: absolute;
  z-index: 20;
  right: 1.5%;
  top: 20%;
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
  justify-content: flex-end;
  margin-bottom: 20px;
  gap: 10px;
  position: relative;
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
  right: 9%;
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
  padding: 30px;
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
  margin-top: 20px;
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
