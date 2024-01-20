// 게시판 리스트

import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { Typedata } from 'shared/supabase.type';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from 'util/date';
import { AiFillLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import searchIcon from '../../assets/icons/searchIcon.svg';
import { formatRelativeTime } from 'util/date';
import { getPosts } from 'api/post';
import MoreViewButton from 'common/MoreViewButton';

interface UserInfo {
  userInfo: Typedata['public']['Tables']['userinfo']['Row'];
}

interface GameImageProps extends React.HTMLProps<HTMLImageElement> {
  src: string;
}

export const BoardList = ({ filteredPosts }: any) => {
  const [displayedGames, setDisplayedGames] = useState(1);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const navigate = useNavigate();

  const { data: userInfoData = [] } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
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
  const handleLoadMore = () => {
    setDisplayedGames((prev: number) => (prev === 0 ? 4 : prev + 1));
  };
  return (
    <>
      <div>
        <Sttitle>커뮤니티</Sttitle>
        <StSeachContainer>
          <StseachBox placeholder="게시글 검색" />
          <StSearchIcon />
          <Stbutton onClick={moveregisterPageOnClick}>글쓰기</Stbutton>
        </StSeachContainer>
        <Stzeropost>{filteredPosts.length}개의 일치하는 게시물.</Stzeropost>

        {filteredPosts.length > 0 ? (
          filteredPosts.map(
            (post: {
              users_id: string;
              post: string;
              id: string;
              create_At: string;
              title: string;
              content: string;
              category: string;
            }) => {
              const userInfo = userInfoData.find((user) => user.id === post?.users_id);
              if (userInfo) {
                return (
                  <>
                    <StcontentBox key={post?.id} onClick={() => movedetailPageOnClick(post?.id)}>
                      <Profileline>
                        <UserImage src={userInfo.avatar_url} alt="프로필 이미지" />
                        <Stnickname>
                          <p>{userInfo.nickname}</p>
                          <p>{post.create_At}</p>
                        </Stnickname>
                        <Stuserinfo>
                          <h1>{post?.title}</h1>
                          <p>{post?.content}</p>
                          <Stgenre>#{post?.category}</Stgenre>
                        </Stuserinfo>
                        <div>
                          <IoChatbubbleOutline />5
                          <AiFillLike />5
                        </div>
                        {/* <GameImage src={post.image} /> */}
                      </Profileline>
                    </StcontentBox>
                  </>
                );
              }
            }
          )
        ) : (
          <Stnullboard>{filteredPosts.length + 1}개의 일치하는 게시물.</Stnullboard>
        )}
        {4 < filteredPosts.length && <MoreViewButton onClick={handleLoadMore}>더보기</MoreViewButton>}
      </div>
    </>
  );
};
const Sttitle = styled.strong`
  display: flex;
  font-weight: 700;
  line-height: normal;
  margin-left: 26px;
`;
const StcontentBox = styled.div`
  display: flex;
  float: inherit;
  box-sizing: border-box;
  flex-direction: column;
  table-layout: auto;
  width: 1180px;
  height: 283px;
  margin: 15px;
  background-color: #232323;
  border-radius: 10px;
  white-space: nowrap;
  grid-template-columns: repeat(3, 2fr);
  font-size: 15px;
  color: ${(props) => props.theme.color.white};
`;
const Stuserinfo = styled.div``;

const Profileline = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 210px;
  height: 150px;
  margin: 15px;
  & div {
    flex-direction: column;
    max-width: 500px;
    margin-bottom: 15px;
  }
  & h1 {
    margin-bottom: 20px;
  }
  & p {
    margin: 0;
  }
`;
const Stgenre = styled.span`
  display: flex;
  margin-top: 10px;
  line-height: normal;
  margin: 5px;
  width: fit-content;
  color: #eeeeee;
  font-family: 'pretendard-Regular', Heivetica;
  background-color: #363636;
  border-radius: 5px;
`;
const Stnickname = styled.div`
  display: flex;
  position: relative;
  bottom: 80px;
  margin-left: 90px;
  margin-top: 5px;
  & > p {
    margin-bottom: 8px;
  }
`;
const UserImage = styled.img`
  display: flex;
  width: 75px;
  height: 75px;
  border-radius: 10px;
  box-sizing: border-box;

  margin-right: 5px;
`;
export const GameComponent = styled.div`
  display: flex;
`;

const StSeachContainer = styled.form`
  display: flex;
  position: relative;
  left: 550px;
  margin: 30px;
`;

const StseachBox = styled.input`
  height: 48px;
  width: 438px;
  background-color: #232323;
  border-radius: 10px;
`;
const StSearchIcon = styled.div`
  display: flex;
  position: relative;
  top: 25px;
  right: 20px;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  background: url(${searchIcon});
  background-size: contain;
  cursor: pointer;
`;

const Stbutton = styled.button`
  height: 48px;
  width: 80px;
  background-color: #2d4ea5;
  border-radius: 10px;
  margin-left: 20px;
  cursor: grab;
`;

const GameImage = styled.img`
  position: absolute;
  top: 110px;
  left: 920px;
  width: 100%;
  height: 100%;
  margin-left: 15px;
  object-fit: cover;
  border-radius: 10px;
`;
const Stnullboard = styled.div`
  display: flex;
  position: relative;
  bottom: 800px;
  left: 500px;
`;
const Stzeropost = styled.div`
  display: flex;
  position: relative;
  top: -35px;
`;
